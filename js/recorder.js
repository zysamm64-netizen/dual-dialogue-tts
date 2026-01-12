// js/recorder.js
export async function exportAudio(parsedScript) {
  const ctx = new OfflineAudioContext(1, 44100*60, 44100); // 1声道，最长60s
  let currentTime = 0;
  parsedScript.forEach(item => {
    if(item.type === "voice") {
      const osc = ctx.createOscillator();
      osc.frequency.value = item.role === "A" ? 440 : 330;
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.5, currentTime);
      osc.connect(gain).connect(ctx.destination);
      osc.start(currentTime);
      osc.stop(currentTime + 1.5); // 每条话语默认1.5秒
      currentTime += 1.5;
    } else if(item.type === "sfx") {
      // TODO: 可插入真实音效解码
      currentTime += 0.5;
    }
  });
  const buffer = await ctx.startRendering();
  // WAV 导出逻辑可用库或自写
  return buffer;
}
