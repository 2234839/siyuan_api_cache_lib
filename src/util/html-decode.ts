/**
 * @example
 * ```
 * htmlDecode("{&quot;source&quot;:&quot;&quot;}")
 * // '{"source":""}'
 * ```
 */
export function htmlDecode(input: string) {
  var doc = new DOMParser().parseFromString(input, "text/html");
  return doc.documentElement.textContent;
}
