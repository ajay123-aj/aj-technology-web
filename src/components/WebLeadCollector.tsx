"use client";

import { useEffect, useRef } from "react";
import { postWebLeadCollect } from "@/lib/webLeadCollect";

/**
 * POST /api/aj-web/leads/collect once after mount with full collect payload.
 * deviceId: stable unique id in localStorage (`aj_web_lead_device_id`); all other fields from the browser.
 * URL: NEXT_PUBLIC_LEADS_COLLECT_URL or NEXT_PUBLIC_SITE_URL + /api/aj-web/leads/collect
 */
export default function WebLeadCollector() {
  const sent = useRef(false);

  useEffect(() => {
    if (sent.current) return;
    sent.current = true;
    void postWebLeadCollect().catch(() => {});
  }, []);

  return null;
}
