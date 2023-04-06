import DOMPurify from "dompurify";

export const formatHTML = (text: string, formatURLS = false): string => {
  let formattedText = "";
  let lines = text.split("\n");
  let isList = false;
  let listTag = "";

  for (let line of lines) {
    line = line.trim();
    if (line.startsWith("-")) {
      if (!isList) {
        isList = true;
        listTag = "ul";
        formattedText += `<${ listTag } class="list-disc ml-8 mb-4">`;
      }
      formattedText += `<li>${ line.slice(1).trim() }</li>`;
    } else if (line.match(/^\d+[\.\)]/)) {
      if (!isList) {
        isList = true;
        listTag = "ol";
        formattedText += `<${ listTag } class="list-decimal ml-8 mb-4">`;
      }
      formattedText += `<li>${ line.replace(/^\d+[\.\)]/, "").trim() }</li>`;
    } else {
      if (isList) {
        isList = false;
        formattedText += `</${ listTag }>`;
      }
      if (line !== "") {
        if (line.match(/^[A-Z][\w\s]*:/)) {
          line = `<strong class="font-bold">${ line }</strong>`;
        }
        formattedText += `<p class="mb-4">${ line }</p>`;
      }
    }
  }

  if (formatURLS) {
    // Replace URLs with <a> tags
    formattedText = formattedText.replace(
      /(http:\/\/[^\s]+)/g,
      "<a href=\"$1\" target=\"_blank\">$1</a>",
    );
    formattedText = formattedText.replace(
      /(https:\/\/[^\s]+)/g,
      "<a href=\"$1\" target=\"_blank\">$1</a>",
    );
  }

  const sanitizedHTML = DOMPurify.sanitize(formattedText, {
    ALLOWED_TAGS: ["br", "ul", "ol", "li", "p", "strong"],
  });

  return sanitizedHTML;
};
