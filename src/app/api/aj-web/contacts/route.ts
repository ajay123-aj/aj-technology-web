import { NextRequest, NextResponse } from "next/server";
import { validateContactInput } from "@/lib/contactValidation";

function getContactsUpstreamUrl(): string | null {
  const explicit = process.env.AJ_WEB_CONTACTS_API_URL?.trim();
  if (explicit) return explicit;
  const leads = process.env.NEXT_PUBLIC_LEADS_COLLECT_URL?.trim();
  if (leads?.includes("/leads/collect")) {
    return leads.replace(/\/leads\/collect\/?$/, "/contacts");
  }
  return null;
}

export async function POST(req: NextRequest) {
  const upstream = getContactsUpstreamUrl();
  if (!upstream) {
    return NextResponse.json(
      { error: "Contact API not configured. Set AJ_WEB_CONTACTS_API_URL in .env" },
      { status: 503 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const b = body as Record<string, unknown>;
  const name = typeof b.name === "string" ? b.name.trim() : "";
  const email = typeof b.email === "string" ? b.email.trim() : "";
  const phone = typeof b.phone === "string" ? b.phone.trim() : "";
  const message = typeof b.message === "string" ? b.message.trim() : "";

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "name, email, and message are required" },
      { status: 400 }
    );
  }

  const contactCheck = validateContactInput({ email, phone });
  if (!contactCheck.ok) {
    return NextResponse.json(
      { error: "Invalid email or phone", errors: contactCheck.errors },
      { status: 400 }
    );
  }

  const payload = {
    name,
    email,
    phone,
    subject:
      typeof b.subject === "string" && b.subject.trim()
        ? b.subject.trim()
        : "Website contact form",
    message,
    pageUrl:
      typeof b.pageUrl === "string" && b.pageUrl.trim()
        ? b.pageUrl.trim()
        : req.headers.get("referer") || "",
    extra:
      typeof b.extra === "object" && b.extra !== null && !Array.isArray(b.extra)
        ? b.extra
        : {},
  };

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  const apiKey = process.env.AJ_WEB_BACKEND_API_KEY?.trim();
  if (apiKey) {
    (headers as Record<string, string>).Authorization = `Bearer ${apiKey}`;
  }

  try {
    const res = await fetch(upstream, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
    });

    const text = await res.text();
    let data: unknown = {};
    if (text) {
      try {
        data = JSON.parse(text);
      } catch {
        data = { message: text };
      }
    }

    return NextResponse.json(data, { status: res.status });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Upstream request failed";
    return NextResponse.json({ error: msg }, { status: 502 });
  }
}
