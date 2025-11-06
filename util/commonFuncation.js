
 const getMetaDescription=(content, maxLength = 330)=> {
  if (!content) return "";

  // Remove HTML tags
  let text = content.replace(/<[^>]*>/g, " ");

  // Collapse extra spaces & line breaks
  text = text.replace(/\s+/g, " ").trim();

  // Trim to 330 chars
  if (text.length > maxLength) {
    text = text.substring(0, maxLength);
    // Cut cleanly at word boundary
    text = text.substring(0, text.lastIndexOf(" "));
    text += "...";
  }

  return text;
}

export {getMetaDescription}