import * as DOMPurify from 'dompurify';
import {HtmlFilter} from "./types";

export const defaultHtmlFilter: HtmlFilter = (html) => {
  const cleaned = DOMPurify.sanitize(html);
  return cleaned;
}
