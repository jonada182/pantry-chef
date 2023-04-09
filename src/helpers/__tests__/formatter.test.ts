import { formatHTML } from "../formatter";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import DOMPurify from "dompurify";

describe("formatHTML", () => {
  test("should sanitize the input and return sanitized HTML", () => {
    const input = "<script>alert(\"XSS Attack\")</script>Some text";
    const expectedOutput = `<p class="mb-4">Some text</p>`;
    const result = formatHTML(input);

    expect(result).toBe(expectedOutput);
  });

  test("should convert unordered lists", () => {
    const input = `- Item 1\n- Item 2`;
    const expectedOutput = `<ul class="list-disc ml-8 mb-4"><li>Item 1</li><li>Item 2</li></ul>`;
    const result = formatHTML(input);

    expect(result).toBe(expectedOutput);
  });

  test("should convert ordered lists", () => {
    const input = `1. Item 1\n2. Item 2`;
    const expectedOutput = `<ol class="list-decimal ml-8 mb-4"><li>Item 1</li><li>Item 2</li></ol>`;
    const result = formatHTML(input);

    expect(result).toBe(expectedOutput);
  });

  test("should convert URLs to <a> tags when formatURLS is true", () => {
    const input = "Visit https://example.com for more info.";
    const expectedOutput = "<p class=\"mb-4\">Visit <a target=\"_blank\" href=\"https://example.com\">https://example.com</a> for more info.</p>";
    const result = formatHTML(input, true);

    expect(result).toBe(expectedOutput);
  });

  test("should not convert URLs to <a> tags when formatURLS is false", () => {
    const input = "Visit https://example.com for more info.";
    const expectedOutput = "<p class=\"mb-4\">Visit https://example.com for more info.</p>";
    const result = formatHTML(input, false);

    expect(result).toBe(expectedOutput);
  });
});
