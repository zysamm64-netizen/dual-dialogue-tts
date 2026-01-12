// js/tts.js
import { voices } from "./voices.js";

export function speak(text, role = "A", emotion = "normal") {
  const utter = new SpeechSynthesisUtterance(text);
  utter.voice = voices[role];
  if(emotion === "laugh") utter.pitch = 1.5;
  else if(emotion === "calm") utter.rate = 0.9;
  speechSynthesis.speak(utter);
}
