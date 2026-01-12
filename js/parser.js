// js/parser.js
export function parseScript(scriptText) {
  const lines = scriptText.split("\n").filter(Boolean);
  return lines.map(line => {
    const match = line.match(/\[(A|B):(.*?)(?::(.*?))?\]/);
    const sfxMatch = line.match(/\[音效:(.*?)\]/);
    if(match) {
      return {
        type: "voice",
        role: match[1],
        text: match[2],
        emotion: match[3] || "normal"
      };
    } else if(sfxMatch) {
      return {
        type: "sfx",
        name: sfxMatch[1]
      };
    } else {
      return { type: "text", text: line };
    }
  });
}
