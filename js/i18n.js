const translations = {
    "zh-CN": {
        title: "双人对话语音生成器",
        subtitle: "对话 / 相声 / 节奏音轨工具",
        scriptPlaceholder: "在这里粘贴你的对话脚本…",
        roleA: "角色 A 声线",
        roleB: "角色 B 声线",
        generate: "生成并试听",
        export: "导出音轨",
        tip: "导出的是用于剪辑的创作音轨（非真人配音）",
        lang: "语言"
    },
    "zh-TW": {
        title: "雙人對話語音產生器",
        subtitle: "對話 / 相聲 / 節奏音軌工具",
        scriptPlaceholder: "在這裡貼上你的對話腳本…",
        roleA: "角色 A 聲線",
        roleB: "角色 B 聲線",
        generate: "產生並試聽",
        export: "匯出音軌",
        tip: "匯出的是用於剪輯的創作音軌（非真人配音）",
        lang: "語言"
    },
    "en": {
        title: "Dual Dialogue Audio Generator",
        subtitle: "Dialogue / Comedy / Timing Track Tool",
        scriptPlaceholder: "Paste your dialogue script here...",
        roleA: "Voice for Role A",
        roleB: "Voice for Role B",
        generate: "Generate & Listen",
        export: "Export Audio Track",
        tip: "Exported audio is a timing track for editing",
        lang: "Language"
    },
    "ja": {
        title: "デュアル会話音声ジェネレーター",
        subtitle: "会話・漫才・タイミング音声ツール",
        scriptPlaceholder: "ここに会話スクリプトを貼り付けてください…",
        roleA: "役割Aの音声",
        roleB: "役割Bの音声",
        generate: "生成して再生",
        export: "音声トラックを書き出す",
        tip: "書き出されるのは編集用のタイミング音声です",
        lang: "言語"
    }
};

export class I18nManager {
    constructor() {
        this.currentLang = localStorage.getItem('app_lang') || 'zh-CN';
        this.init();
    }

    init() {
        this.updateUI();
    }

    setLanguage(lang) {
        if (!translations[lang]) return;
        this.currentLang = lang;
        localStorage.setItem('app_lang', lang);
        this.updateUI();
    }

    updateUI() {
        const t = translations[this.currentLang];
        
        // Update Text Content
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (t[key]) {
                el.textContent = t[key];
            }
        });

        // Update Placeholders
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            if (t[key]) {
                el.setAttribute('placeholder', t[key]);
            }
        });

        // Update HTML lang attribute
        document.documentElement.lang = this.currentLang;
    }

    getCurrentLang() {
        return this.currentLang;
    }
}
