export function url(literals: TemplateStringsArray, ...placeholders: string[]) {
  return placeholders
    .map(encodeURIComponent)
    .reduce(
      (url, placeholder, index) => url + placeholder + literals[index + 1],
      literals[0]
    );
}
