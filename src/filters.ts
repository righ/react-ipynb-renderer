import { sanitize } from 'dompurify';
import type { HtmlFilter } from "./types";

export const defaultHtmlFilter: HtmlFilter = (html) => {
  const cleaned = sanitize(html);
  return cleaned;
}
