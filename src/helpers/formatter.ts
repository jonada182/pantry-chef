import DOMPurify from "dompurify";

export const formatHTML = (text: string, formatURLS = false): string => {
  let formattedText = "";
  let lines = text.split("\n");
  let isList = false;
  let listTag = "";

  for (let line of lines) {
    line = line.trim();
    if (line.startsWith("-")) {
      // Format unordered lists as <ul>
      if (!isList) {
        isList = true;
        listTag = "ul";
        formattedText += `<${ listTag } class="list-disc ml-8 mb-4">`;
      }
      formattedText += `<li>${ line.slice(1).trim() }</li>`;
    } else if (line.match(/^\d+[\.\)]/)) {
      // Format ordered lists as <ol> Eg. 1. or 1)
      if (!isList) {
        isList = true;
        listTag = "ol";
        formattedText += `<${ listTag } class="list-decimal ml-8 mb-4">`;
      }
      formattedText += `<li>${ line.replace(/^\d+[\.\)]/, "").trim() }</li>`;
    } else {
      // Close <ul> and <ol> tags
      if (isList) {
        isList = false;
        formattedText += `</${ listTag }>`;
      }
      // Format any other lines
      if (line !== "") {
        if (line.match(/(http:\/\/[^\s]+)/g) || line.match(/(https:\/\/[^\s]+)/g)) {
          // Format links as <a>
          if (formatURLS) {
            line = line.replace(/(http:\/\/[^\s]+)/g, `<a href="$1" target="_blank">$1</a>`);
            line = line.replace(/(https:\/\/[^\s]+)/g, `<a href="$1" target="_blank">$1</a>`);
          }
        } else if (line.match(/^[A-Z][\w\s]*:/)) {
          // Format titles as bold Eg. "This is a title:"
          line = `<strong class="font-bold">${ line }</strong>`;
        }
        formattedText += `<p class="mb-4">${ line }</p>`;
      }
    }
  }

  // Sanitize the formatted text by allowed tags/attributes

  const sanitizedHTML = DOMPurify.sanitize(formattedText, {
    ALLOWED_TAGS: ["br", "ul", "ol", "li", "p", "strong", "a"],
    ALLOWED_ATTR: ["href", "target", "class"],
  });

  return sanitizedHTML;
};
