"use client";

import { useEffect } from "react";
import { useLanguage } from "@/i18n/context";

export function DynamicSEO() {
  const { t } = useLanguage();

  useEffect(() => {
    document.title = t.seoTitle;

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", t.seoDescription);

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute("content", t.seoTitle);

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute("content", t.seoDescription);
  }, [t]);

  return null;
}
