
// DOM Elements
const voiceASelect = document.getElementById('voiceA');
const voiceBSelect = document.getElementById('voiceB');
const scriptInput = document.getElementById('scriptInput');
const btnPlay = document.getElementById('btnPlay');
const btnExport = document.getElementById('btnExport');
const downloadSection = document.getElementById('downloadSection');
const previewAudio = document.getElementById('previewAudio');
const downloadLink = document.getElementById('downloadLink');

// Language Switcher DOM
const btnLang = document.getElementById('btnLang');
const langMenu = document.getElementById('langMenu');

// Modules
const i18n = new I18nManager();
const voiceManager = new VoiceManager();
const ttsController = new TTSController(voiceManager);
const recorder = new AudioRecorder();
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const sharedSFXManager = new SFXManager(audioCtx);

// --- Language Switcher Logic ---
btnLang.textContent = getLangName(i18n.getCurrentLang());

btnLang.addEventListener('click', (e) => {
    e.stopPropagation();
    langMenu.classList.toggle('show');
});

document.addEventListener('click', () => {
    langMenu.classList.remove('show');
});

langMenu.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', () => {
        const lang = btn.getAttribute('data-lang');
        i18n.setLanguage(lang);
        btnLang.textContent = getLangName(lang);
        
        // Update Voices Dropdown text (append lang code if needed)
        populateVoiceSelects(voiceManager.getVoices());
    });
});

function getLangName(code) {
    const names = {
        'zh-CN': '中文',
        'zh-TW': '繁體',
        'en': 'English',
        'ja': '日本語'
    };
    return names[code] || 'Language';
}

// --- Voice Logic ---
function populateVoiceSelects(voices) {
    const selectedA = voiceASelect.value;
    const selectedB = voiceBSelect.value;

    voiceASelect.innerHTML = '';
    voiceBSelect.innerHTML = '';
    
    voices.forEach((v, idx) => {
        const option = document.createElement('option');
        option.value = idx;
        option.textContent = `${v.name} (${v.lang})`;
        
        const optionA = option.cloneNode(true);
        const optionB = option.cloneNode(true);
        
        voiceASelect.appendChild(optionA);
        voiceBSelect.appendChild(optionB);
        
        // Auto-select logic only on first load
        if (selectedA === "" && v.gender === 'male' && voiceASelect.selectedIndex === -1) voiceASelect.selectedIndex = idx;
        if (selectedB === "" && v.gender === 'female' && voiceBSelect.selectedIndex === -1) voiceBSelect.selectedIndex = idx;
    });

    // Restore selection if valid
    if (selectedA !== "") voiceASelect.value = selectedA;
    if (selectedB !== "") voiceBSelect.value = selectedB;
    
    // Fallback
    if (voiceASelect.value === '' && voices.length > 0) voiceASelect.selectedIndex = 0;
    if (voiceBSelect.value === '' && voices.length > 0) voiceBSelect.selectedIndex = Math.min(1, voices.length - 1);
}

voiceManager.onVoicesChanged = populateVoiceSelects;
if (voiceManager.voices.length > 0) {
    populateVoiceSelects(voiceManager.getVoices());
}

// --- Action Handlers ---
btnPlay.addEventListener('click', async () => {
    const scriptText = scriptInput.value;
    const parsedScript = ScriptParser.parse(scriptText);
    
    if (parsedScript.length === 0) {
        return;
    }

    btnPlay.disabled = true;
    btnExport.disabled = true;

    ttsController.setScript(parsedScript);
    ttsController.onComplete = () => {
        btnPlay.disabled = false;
        btnExport.disabled = false;
    };

    await ttsController.play(voiceASelect.value, voiceBSelect.value);
});

btnExport.addEventListener('click', async () => {
    const scriptText = scriptInput.value;
    const parsedScript = ScriptParser.parse(scriptText);
    
    if (parsedScript.length === 0) {
        return;
    }

    btnExport.disabled = true;
    const originalText = btnExport.textContent;
    btnExport.textContent = "...";
    downloadSection.classList.add('hidden');

    try {
        const blob = await recorder.generateAudioTrack(parsedScript, sharedSFXManager);
        
        if (blob) {
            const url = URL.createObjectURL(blob);
            previewAudio.src = url;
            downloadLink.href = url;
            downloadSection.classList.remove('hidden');
        }
    } catch (e) {
        console.error(e);
        alert("Export failed: " + e.message);
    } finally {
        btnExport.disabled = false;
        btnExport.textContent = originalText;
    }
});

// Default Script
const defaultScript = `[A:男:调侃] 你听说了吗？
[B:女:冷静] 听说什么？
[A:男:大笑] 隔壁老王昨天掉沟里了！
[音效:laugh]
[B:女:冷静] ...这有什么好笑的。`;

if (!scriptInput.value) {
    scriptInput.value = defaultScript;
}
