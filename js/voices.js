// js/voices.js
export const voices = { A: null, B: null };

export function initVoices() {
  const availableVoices = speechSynthesis.getVoices();
  voices.A = availableVoices.find(v => v.lang.includes("zh") && v.name.includes("Female")) || availableVoices[0];
  voices.B = availableVoices.find(v => v.lang.includes("zh") && v.name.includes("Male")) || availableVoices[1];
}

speechSynthesis.onvoiceschanged = initVoices;
