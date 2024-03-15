import DOMPurify from 'dompurify';
import type {HtmlFilter} from "./types";

export const defaultHtmlFilter: HtmlFilter = (html) => {
  const cleaned = DOMPurify.sanitize(html);
  return cleaned;
}
