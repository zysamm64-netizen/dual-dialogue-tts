// js/sfx.js
const sfxMap = {};

export async function loadSFX(name, url) {
  const audio = new Audio(url);
  await audio.load();
  sfxMap[name] = audio;
}

export function playSFX(name) {
  const audio = sfxMap[name];
  if(audio) {
    audio.currentTime = 0;
    audio.play();
  } else {
    console.warn("音效不存在:", name);
  }
}
