// ==UserScript==
// @name         Kick Stream Tweaks — Quality & Volume Persistence + Control Panel
// @namespace    https://github.com/ebayybe
// @version      1.1.0
// @description  Remembers your preferred video quality and volume on Kick.com, re-applies them automatically on every stream/page load, and adds a sleek F2 control panel with theme + language options.
// @author       ebayybe
// @match        https://kick.com/*
// @run-at       document-idle
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIACAYAAAD0eNT6AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAJjklEQVR4nO3ZIW5cZxiG0d/VhUYF1SArGyjvPqbZQYIDuoZuINg7aGYBgaWhKa9UNCo2HMklBgaR0oCZb5znHOnqp+9lj/TdrCu0P+0epzfAM+8O2/H99Aj+v/1p92qt9ff0Dnjm9WE7fpge8dwP0wMAgMsTAAAQJAAAIEgAAECQAACAIAEAAEECAACCBAAABAkAAAgSAAAQJAAAIEgAAECQAACAIAEAAEECAACCBAAABAkAAAgSAAAQJAAAIEgAAECQAACAIAEAAEECAACCBAAABAkAAAgSAAAQJAAAIEgAAECQAACAIAEAAEECAACCBAAABAkAAAgSAAAQJAAAIEgAAECQAACAIAEAAEECAACCBAAABAkAAAgSAAAQJAAAIEgAAECQAACAIAEAAEECAACCBAAABAkAAAgSAAAQJAAAIEgAAECQAACAIAEAAEECAACCtukBwJz9afdqesOZ/DQ9AK6dAIC2P9dad9MjgMtzAgCAIAEAAEECAACCBAAABAkAAAgSAAAQJAAAIEgAAECQAACAIAEAAEECAACCBAAABAkAAAgSAAAQJAAAIEgAAECQAACAIAEAAEECAACCBAAABAkAAAgSAAAQJAAAIEgAAECQAACAIAEAAEECAACCBAAABAkAAAgSAAAQJAAAIEgAAECQAACAIAEAAEECAACCBAAABAkAAAgSAAAQJAAAIEgAAECQAACAIAEAAEECAACCBAAABAkAAAgSAAAQJAAAIEgAAECQAACAIAEAAEECAACCBAAABAkAAAgSAAAQJAAAIGibHgAvwM/70+7X6RFn8uP0AGCGAICve/P0AXw3nAAAIEgAAECQAACAIAEAAEECAACCBAAABAkAAAgSAAAQJAAAIEgAAECQAACAIAEAAEECAACCBAAABAkAAAgSAAAQJAAAIEgAAECQAACAIAEAAEECAACCBAAABAkAAAgSAAAQJAAAIEgAAECQAACAIAEAAEECAACCBAAABAkAAAgSAAAQJAAAIEgAAECQAACAIAEAAEECAACCBAAABAkAAAgSAAAQJAAAIEgAAECQAACAIAEAAEECAACCBAAABAkAAAgSAAAQJAAAIEgAAECQAACAIAEAAEECAACCBAAABAkAAAjapgcAwDP/TA84k6v7LwEAwLW4P2zHt9MjKpwAACBIAABAkAAAgCABAABBAgAAggQAAAQJAAAIEgAAECQAACBIAABAkAAAgCABAABBAgAAggQAAAQJAAAIEgAAECQAACBIAABAkAAAgCABAABBAgAAggQAAAQJAAAIEgAAECQAACBIAABAkAAAgCABAABBAgAAggQAAAQJAAAIEgAAECQAACBIAABAkAAAgCABAABBAgAAggQAAAQJAAAIEgAAECQAACBIAABAkAAAgCABAABBAgAAggQAAAQJAAAIEgAAECQAACBIAABAkAAAgCABAABBAgAAggQAAAQJAAAI2qYHAPDN7qcHnMnH6QElAgDgZXk4bMe30yN4+ZwAACBIAABAkAAAgCABAABBAgAAggQAAAQJAAAIEgAAECQAACBIAABAkAAAgCABAABBAgAAggQAAAQJAAAIEgAAECQAACBIAABAkAAAgCABAABBAgAAggQAAAQJAAAIEgAAECQAACBIAABAkAAAgCABAABBAgAAggQAAAQJAAAIEgAAECQAACBIAABAkAAAgCABAABBAgAAggQAAAQJAAAIEgAAECQAACBIAABAkAAAgCABAABBAgAAggQAAAQJAAAIEgAAECQAACBIAABAkAAAgCABAABBAgAAggQAAAQJAAAIupke8CX70+5xegPAFbufHnAmHw/b8cP0iIptegAA3+zN0/uw1rr9jt611hIAF+IEAPBy3X5nLxckAAAgSAAAQJAAAIAgAQAAQQIAAIIEAAAECQAACBIAABAkAAAgSAAAQJAAAIAgAQAAQQIAAIIEAAAECQAACBIAABAkAAAgSAAAQJAAAIAgAQAAQQIAAIIEAAAECQAACBIAABAkAAAgSAAAQJAAAIAgAQAAQQIAAIIEAAAECQAACBIAABAkAAAgSAAAQJAAAIAgAQAAQQIAAIIEAAAECQAACBIAABAkAAAgSAAAQJAAAIAgAQAAQQIAAIIEAAAECQAACBIAABAkAAAgSAAAQJAAAIAgAQAAQQIAAIIEAAAE3UwP+JL9afc4vQGAi3tYa/01PeJM3h2246fpEc9t0wMA4MntWuuX6RFncrfWuqoAcAIAgCABAABBAgAAggQAAAQJAAAIEgAAECQAACBIAABAkAAAgCABAABBAgAAggQAAAQJAAAIEgAAECQAACBIAABAkAAAgCABAABBAgAAggQAAAQJAAAIEgAAECQAACBIAABAkAAAgCABAABBAgAAggQAAAQJAAAIEgAAECQAACBIAABAkAAAgCABAABBAgAAggQAAAQJAAAIEgAAECQAACBIAABAkAAAgCABAABBAgAAggQAAAQJAAAIEgAAECQAACBIAABAkAAAgCABAABBAgAAggQAAAQJAAAIEgAAECQAACBomx4AL8D9Wuvz9Igz+X2tdTs9Arg8AQBf9/mwHd9PjziH/Wn32xIAkOQEAABBAgAAggQAAAQJAAAIEgAAECQAACBIAABAkAAAgCABAABBAgAAggQAAAQJAAAIEgAAECQAACBIAABAkAAAgCABAABBAgAAggQAAAQJAAAIEgAAECQAACBIAABAkAAAgCABAABBAgAAggQAAAQJAAAIEgAAECQAACBIAABAkAAAgCABAABBAgAAggQAAAQJAAAIEgAAECQAACBIAABAkAAAgCABAABBAgAAggQAAAQJAAAIEgAAECQAACBIAABAkAAAgCABAABBAgAAggQAAAQJAAAIEgAAECQAACBIAABA0DY9ABj1enrAmdyttf6YHgHXTABA2GE7fprecA770+7f6Q1w7ZwAACBIAABAkAAAgCABAABBAgAAggQAAAQJAAAIEgAAECQAACBIAABAkAAAgCABAABBAgAAggQAAAQJAAAIEgAAECQAACBIAABAkAAAgCABAABBAgAAggQAAAQJAAAIEgAAECQAACBIAABAkAAAgCABAABBAgAAggQAAAQJAAAIEgAAECQAACBIAABAkAAAgCABAABBAgAAggQAAAQJAAAIEgAAECQAACBIAABAkAAAgCABAABBAgAAggQAAAQJAAAIEgAAECQAACBIAABAkAAAgCABAABBAgAAggQAAAQJAAAI+g9uolMnGmWPUQAAAABJRU5ErkJggg==
// @grant        none
// @license      MIT
// @homepageURL  https://github.com/ebayybe/kick-stream-tweaks
// @supportURL   https://github.com/ebayybe/kick-stream-tweaks/issues
// @updateURL    https://raw.githubusercontent.com/ebayybe/kick-stream-tweaks/main/kick-stream-tweaks.user.js
// @downloadURL  https://raw.githubusercontent.com/ebayybe/kick-stream-tweaks/main/kick-stream-tweaks.user.js
// ==/UserScript==

(function () {
  'use strict';

  /* ============================================================
   *  CONFIG
   *  Centralised constants. If Kick.com changes its player DOM,
   *  this is the first place to look — selectors are kept as
   *  arrays of fallbacks and text-matching heuristics rather
   *  than a single brittle class name.
   * ========================================================== */
  const CONFIG = {
    LOG_PREFIX: '[KickTweaks]',
    STORAGE_KEY: 'kickTweaks.settings.v1',
    DEFAULT_HOTKEY: { key: 'F2', code: 'F2' },
    QUALITY_OPTIONS: ['auto', '1080p60', '1080p', '720p', '480p', '360p', '160p'],

    // Kick's quality options render as ARIA radio-menu items. This is a
    // much more stable hook than guessing at class names, since it's
    // part of the accessibility contract of the menu component rather
    // than a styling detail that changes with every redesign.
    QUALITY_ITEM_SELECTOR: '[role="menuitemradio"]',

    // The player's settings ("gear") button is exposed as a menu
    // trigger. We narrow it down further by position (it sits over/near
    // the video, unlike the account/profile menu button which also uses
    // aria-haspopup="menu").
    SETTINGS_BUTTON_SELECTOR: 'button[aria-haspopup="menu"]',

    // How long (ms) / how many attempts to keep retrying DOM lookups
    // before giving up for this stream/VOD.
    RETRY_TIMEOUT_MS: 8000,
    RETRY_INTERVAL_MS: 250,
    MAX_FIND_ATTEMPTS: 20,
    MAX_MENU_WAIT_TICKS: 12,

    // Browsers (and Kick itself) often force a <video> to muted=true
    // briefly to satisfy autoplay policies. We ignore volumechange
    // events for this long after binding so that transient state never
    // gets persisted as "the user's saved volume".
    VOLUME_GRACE_MS: 1500,
  };

  const DEFAULT_SETTINGS = {
    autoQualityEnabled: true,
    autoVolumeEnabled: true,
    preferredQuality: 'auto', // 'auto' = keep whatever the user last picked manually
    lastKnownQuality: 'auto', // updated whenever the user changes quality by hand
    volume: 1,
    muted: false,
    theme: 'dark',
    language: 'en',
    hotkey: { ...CONFIG.DEFAULT_HOTKEY },
  };

  /* ============================================================
   *  I18N
   * ========================================================== */
  const TRANSLATIONS = {
    en: {
      panelTitle: 'Kick Stream Tweaks',
      sectionPlayback: 'Playback',
      autoQualityLabel: 'Auto-apply saved quality',
      autoVolumeLabel: 'Auto-apply saved volume',
      preferredQualityLabel: 'Preferred quality',
      preferredVolumeLabel: 'Preferred volume',
      qualityAuto: 'Auto (use last manually selected)',
      sectionAppearance: 'Appearance',
      themeLabel: 'Theme',
      themeDark: 'Dark',
      themeLight: 'Light',
      languageLabel: 'Language',
      sectionHotkey: 'Menu Hotkey',
      hotkeyChange: 'Click to rebind',
      hotkeyWaiting: 'Press any key…',
      footerClose: 'Close',
      footerHint: 'Press {key} to toggle this menu',
    },
    ru: {
      panelTitle: 'Kick Stream Tweaks',
      sectionPlayback: 'Воспроизведение',
      autoQualityLabel: 'Автоприменение качества',
      autoVolumeLabel: 'Автоприменение громкости',
      preferredQualityLabel: 'Предпочитаемое качество',
      preferredVolumeLabel: 'Предпочитаемая громкость',
      qualityAuto: 'Авто (последнее выбранное вручную)',
      sectionAppearance: 'Внешний вид',
      themeLabel: 'Тема',
      themeDark: 'Тёмная',
      themeLight: 'Светлая',
      languageLabel: 'Язык',
      sectionHotkey: 'Горячая клавиша',
      hotkeyChange: 'Нажмите, чтобы изменить',
      hotkeyWaiting: 'Нажмите любую клавишу…',
      footerClose: 'Закрыть',
      footerHint: 'Нажмите {key}, чтобы открыть/закрыть меню',
    },
    uk: {
      panelTitle: 'Kick Stream Tweaks',
      sectionPlayback: 'Відтворення',
      autoQualityLabel: 'Автозастосування якості',
      autoVolumeLabel: 'Автозастосування гучності',
      preferredQualityLabel: 'Бажана якість',
      preferredVolumeLabel: 'Бажана гучність',
      qualityAuto: 'Авто (останнє обране вручну)',
      sectionAppearance: 'Вигляд',
      themeLabel: 'Тема',
      themeDark: 'Темна',
      themeLight: 'Світла',
      languageLabel: 'Мова',
      sectionHotkey: 'Гаряча клавіша',
      hotkeyChange: 'Натисніть, щоб змінити',
      hotkeyWaiting: 'Натисніть будь-яку клавішу…',
      footerClose: 'Закрити',
      footerHint: 'Натисніть {key}, щоб відкрити/закрити меню',
    },
    de: {
      panelTitle: 'Kick Stream Tweaks',
      sectionPlayback: 'Wiedergabe',
      autoQualityLabel: 'Gespeicherte Qualität automatisch anwenden',
      autoVolumeLabel: 'Gespeicherte Lautstärke automatisch anwenden',
      preferredQualityLabel: 'Bevorzugte Qualität',
      preferredVolumeLabel: 'Bevorzugte Lautstärke',
      qualityAuto: 'Auto (zuletzt manuell gewählt)',
      sectionAppearance: 'Erscheinungsbild',
      themeLabel: 'Design',
      themeDark: 'Dunkel',
      themeLight: 'Hell',
      languageLabel: 'Sprache',
      sectionHotkey: 'Menü-Tastenkürzel',
      hotkeyChange: 'Klicken zum Ändern',
      hotkeyWaiting: 'Beliebige Taste drücken…',
      footerClose: 'Schließen',
      footerHint: '{key} drücken, um dieses Menü umzuschalten',
    },
    es: {
      panelTitle: 'Kick Stream Tweaks',
      sectionPlayback: 'Reproducción',
      autoQualityLabel: 'Aplicar calidad guardada automáticamente',
      autoVolumeLabel: 'Aplicar volumen guardado automáticamente',
      preferredQualityLabel: 'Calidad preferida',
      preferredVolumeLabel: 'Volumen preferido',
      qualityAuto: 'Auto (última seleccionada manualmente)',
      sectionAppearance: 'Apariencia',
      themeLabel: 'Tema',
      themeDark: 'Oscuro',
      themeLight: 'Claro',
      languageLabel: 'Idioma',
      sectionHotkey: 'Tecla de acceso rápido',
      hotkeyChange: 'Haz clic para cambiar',
      hotkeyWaiting: 'Presiona cualquier tecla…',
      footerClose: 'Cerrar',
      footerHint: 'Presiona {key} para mostrar/ocultar este menú',
    },
    fr: {
      panelTitle: 'Kick Stream Tweaks',
      sectionPlayback: 'Lecture',
      autoQualityLabel: 'Appliquer automatiquement la qualité enregistrée',
      autoVolumeLabel: 'Appliquer automatiquement le volume enregistré',
      preferredQualityLabel: 'Qualité préférée',
      preferredVolumeLabel: 'Volume préféré',
      qualityAuto: 'Auto (dernier choix manuel)',
      sectionAppearance: 'Apparence',
      themeLabel: 'Thème',
      themeDark: 'Sombre',
      themeLight: 'Clair',
      languageLabel: 'Langue',
      sectionHotkey: 'Raccourci du menu',
      hotkeyChange: 'Cliquez pour modifier',
      hotkeyWaiting: 'Appuyez sur une touche…',
      footerClose: 'Fermer',
      footerHint: 'Appuyez sur {key} pour afficher/masquer ce menu',
    },
    pt: {
      panelTitle: 'Kick Stream Tweaks',
      sectionPlayback: 'Reprodução',
      autoQualityLabel: 'Aplicar qualidade salva automaticamente',
      autoVolumeLabel: 'Aplicar volume salvo automaticamente',
      preferredQualityLabel: 'Qualidade preferida',
      preferredVolumeLabel: 'Volume preferido',
      qualityAuto: 'Auto (última escolha manual)',
      sectionAppearance: 'Aparência',
      themeLabel: 'Tema',
      themeDark: 'Escuro',
      themeLight: 'Claro',
      languageLabel: 'Idioma',
      sectionHotkey: 'Tecla de atalho',
      hotkeyChange: 'Clique para alterar',
      hotkeyWaiting: 'Pressione qualquer tecla…',
      footerClose: 'Fechar',
      footerHint: 'Pressione {key} para abrir/fechar este menu',
    },
    it: {
      panelTitle: 'Kick Stream Tweaks',
      sectionPlayback: 'Riproduzione',
      autoQualityLabel: 'Applica automaticamente la qualità salvata',
      autoVolumeLabel: 'Applica automaticamente il volume salvato',
      preferredQualityLabel: 'Qualità preferita',
      preferredVolumeLabel: 'Volume preferito',
      qualityAuto: 'Auto (ultima scelta manuale)',
      sectionAppearance: 'Aspetto',
      themeLabel: 'Tema',
      themeDark: 'Scuro',
      themeLight: 'Chiaro',
      languageLabel: 'Lingua',
      sectionHotkey: 'Tasto di scelta rapida',
      hotkeyChange: 'Clicca per cambiare',
      hotkeyWaiting: 'Premi un tasto qualsiasi…',
      footerClose: 'Chiudi',
      footerHint: 'Premi {key} per aprire/chiudere questo menu',
    },
    zh: {
      panelTitle: 'Kick Stream Tweaks',
      sectionPlayback: '播放设置',
      autoQualityLabel: '自动应用已保存的画质',
      autoVolumeLabel: '自动应用已保存的音量',
      preferredQualityLabel: '首选画质',
      preferredVolumeLabel: '首选音量',
      qualityAuto: '自动（使用上次手动选择）',
      sectionAppearance: '外观',
      themeLabel: '主题',
      themeDark: '深色',
      themeLight: '浅色',
      languageLabel: '语言',
      sectionHotkey: '菜单快捷键',
      hotkeyChange: '点击以更改',
      hotkeyWaiting: '请按任意键…',
      footerClose: '关闭',
      footerHint: '按 {key} 打开/关闭此菜单',
    },
    ja: {
      panelTitle: 'Kick Stream Tweaks',
      sectionPlayback: '再生設定',
      autoQualityLabel: '保存した画質を自動適用',
      autoVolumeLabel: '保存した音量を自動適用',
      preferredQualityLabel: '優先画質',
      preferredVolumeLabel: '優先音量',
      qualityAuto: '自動（最後に手動選択したもの）',
      sectionAppearance: '外観',
      themeLabel: 'テーマ',
      themeDark: 'ダーク',
      themeLight: 'ライト',
      languageLabel: '言語',
      sectionHotkey: 'メニューのホットキー',
      hotkeyChange: 'クリックして変更',
      hotkeyWaiting: '任意のキーを押してください…',
      footerClose: '閉じる',
      footerHint: '{key} を押してこのメニューを開閉',
    },
    ko: {
      panelTitle: 'Kick Stream Tweaks',
      sectionPlayback: '재생',
      autoQualityLabel: '저장된 화질 자동 적용',
      autoVolumeLabel: '저장된 볼륨 자동 적용',
      preferredQualityLabel: '선호 화질',
      preferredVolumeLabel: '선호 볼륨',
      qualityAuto: '자동 (마지막으로 수동 선택한 값)',
      sectionAppearance: '외형',
      themeLabel: '테마',
      themeDark: '다크',
      themeLight: '라이트',
      languageLabel: '언어',
      sectionHotkey: '메뉴 단축키',
      hotkeyChange: '클릭하여 변경',
      hotkeyWaiting: '아무 키나 누르세요…',
      footerClose: '닫기',
      footerHint: '{key}를 눌러 이 메뉴를 열고 닫기',
    },
    pl: {
      panelTitle: 'Kick Stream Tweaks',
      sectionPlayback: 'Odtwarzanie',
      autoQualityLabel: 'Automatycznie stosuj zapisaną jakość',
      autoVolumeLabel: 'Automatycznie stosuj zapisaną głośność',
      preferredQualityLabel: 'Preferowana jakość',
      preferredVolumeLabel: 'Preferowana głośność',
      qualityAuto: 'Auto (ostatnio wybrana ręcznie)',
      sectionAppearance: 'Wygląd',
      themeLabel: 'Motyw',
      themeDark: 'Ciemny',
      themeLight: 'Jasny',
      languageLabel: 'Język',
      sectionHotkey: 'Skrót menu',
      hotkeyChange: 'Kliknij, aby zmienić',
      hotkeyWaiting: 'Naciśnij dowolny klawisz…',
      footerClose: 'Zamknij',
      footerHint: 'Naciśnij {key}, aby otworzyć/zamknąć to menu',
    },
    tr: {
      panelTitle: 'Kick Stream Tweaks',
      sectionPlayback: 'Oynatma',
      autoQualityLabel: 'Kaydedilen kaliteyi otomatik uygula',
      autoVolumeLabel: 'Kaydedilen sesi otomatik uygula',
      preferredQualityLabel: 'Tercih edilen kalite',
      preferredVolumeLabel: 'Tercih edilen ses seviyesi',
      qualityAuto: 'Otomatik (son manuel seçilen)',
      sectionAppearance: 'Görünüm',
      themeLabel: 'Tema',
      themeDark: 'Koyu',
      themeLight: 'Açık',
      languageLabel: 'Dil',
      sectionHotkey: 'Menü kısayolu',
      hotkeyChange: 'Değiştirmek için tıklayın',
      hotkeyWaiting: 'Herhangi bir tuşa basın…',
      footerClose: 'Kapat',
      footerHint: 'Bu menüyü açmak/kapatmak için {key} tuşuna basın',
    },
    ar: {
      panelTitle: 'Kick Stream Tweaks',
      sectionPlayback: 'التشغيل',
      autoQualityLabel: 'تطبيق الجودة المحفوظة تلقائيًا',
      autoVolumeLabel: 'تطبيق مستوى الصوت المحفوظ تلقائيًا',
      preferredQualityLabel: 'الجودة المفضلة',
      preferredVolumeLabel: 'مستوى الصوت المفضل',
      qualityAuto: 'تلقائي (آخر اختيار يدوي)',
      sectionAppearance: 'المظهر',
      themeLabel: 'السمة',
      themeDark: 'داكن',
      themeLight: 'فاتح',
      languageLabel: 'اللغة',
      sectionHotkey: 'اختصار القائمة',
      hotkeyChange: 'انقر للتغيير',
      hotkeyWaiting: 'اضغط أي مفتاح…',
      footerClose: 'إغلاق',
      footerHint: 'اضغط {key} لفتح/إغلاق هذه القائمة',
    },
    nl: {
      panelTitle: 'Kick Stream Tweaks',
      sectionPlayback: 'Afspelen',
      autoQualityLabel: 'Opgeslagen kwaliteit automatisch toepassen',
      autoVolumeLabel: 'Opgeslagen volume automatisch toepassen',
      preferredQualityLabel: 'Voorkeurskwaliteit',
      preferredVolumeLabel: 'Voorkeursvolume',
      qualityAuto: 'Auto (laatst handmatig gekozen)',
      sectionAppearance: 'Weergave',
      themeLabel: 'Thema',
      themeDark: 'Donker',
      themeLight: 'Licht',
      languageLabel: 'Taal',
      sectionHotkey: 'Menu-sneltoets',
      hotkeyChange: 'Klik om te wijzigen',
      hotkeyWaiting: 'Druk op een willekeurige toets…',
      footerClose: 'Sluiten',
      footerHint: 'Druk op {key} om dit menu te openen/sluiten',
    },
    sv: {
      panelTitle: 'Kick Stream Tweaks',
      sectionPlayback: 'Uppspelning',
      autoQualityLabel: 'Applicera sparad kvalitet automatiskt',
      autoVolumeLabel: 'Applicera sparad volym automatiskt',
      preferredQualityLabel: 'Föredragen kvalitet',
      preferredVolumeLabel: 'Föredragen volym',
      qualityAuto: 'Auto (senast manuellt vald)',
      sectionAppearance: 'Utseende',
      themeLabel: 'Tema',
      themeDark: 'Mörkt',
      themeLight: 'Ljust',
      languageLabel: 'Språk',
      sectionHotkey: 'Menygenväg',
      hotkeyChange: 'Klicka för att ändra',
      hotkeyWaiting: 'Tryck på valfri tangent…',
      footerClose: 'Stäng',
      footerHint: 'Tryck på {key} för att växla den här menyn',
    },
    cs: {
      panelTitle: 'Kick Stream Tweaks',
      sectionPlayback: 'Přehrávání',
      autoQualityLabel: 'Automaticky použít uloženou kvalitu',
      autoVolumeLabel: 'Automaticky použít uloženou hlasitost',
      preferredQualityLabel: 'Preferovaná kvalita',
      preferredVolumeLabel: 'Preferovaná hlasitost',
      qualityAuto: 'Auto (naposledy ručně vybráno)',
      sectionAppearance: 'Vzhled',
      themeLabel: 'Motiv',
      themeDark: 'Tmavý',
      themeLight: 'Světlý',
      languageLabel: 'Jazyk',
      sectionHotkey: 'Klávesová zkratka nabídky',
      hotkeyChange: 'Klikněte pro změnu',
      hotkeyWaiting: 'Stiskněte libovolnou klávesu…',
      footerClose: 'Zavřít',
      footerHint: 'Stisknutím {key} přepnete toto menu',
    },
    el: {
      panelTitle: 'Kick Stream Tweaks',
      sectionPlayback: 'Αναπαραγωγή',
      autoQualityLabel: 'Αυτόματη εφαρμογή αποθηκευμένης ποιότητας',
      autoVolumeLabel: 'Αυτόματη εφαρμογή αποθηκευμένης έντασης',
      preferredQualityLabel: 'Προτιμώμενη ποιότητα',
      preferredVolumeLabel: 'Προτιμώμενη ένταση',
      qualityAuto: 'Αυτόματο (τελευταία χειροκίνητη επιλογή)',
      sectionAppearance: 'Εμφάνιση',
      themeLabel: 'Θέμα',
      themeDark: 'Σκούρο',
      themeLight: 'Ανοιχτό',
      languageLabel: 'Γλώσσα',
      sectionHotkey: 'Συντόμευση μενού',
      hotkeyChange: 'Κάντε κλικ για αλλαγή',
      hotkeyWaiting: 'Πατήστε οποιοδήποτε πλήκτρο…',
      footerClose: 'Κλείσιμο',
      footerHint: 'Πατήστε {key} για εναλλαγή αυτού του μενού',
    },
    hi: {
      panelTitle: 'Kick Stream Tweaks',
      sectionPlayback: 'प्लेबैक',
      autoQualityLabel: 'सहेजी गई गुणवत्ता स्वतः लागू करें',
      autoVolumeLabel: 'सहेजी गई वॉल्यूम स्वतः लागू करें',
      preferredQualityLabel: 'पसंदीदा गुणवत्ता',
      preferredVolumeLabel: 'पसंदीदा वॉल्यूम',
      qualityAuto: 'ऑटो (अंतिम बार मैन्युअल रूप से चुना गया)',
      sectionAppearance: 'दिखावट',
      themeLabel: 'थीम',
      themeDark: 'डार्क',
      themeLight: 'लाइट',
      languageLabel: 'भाषा',
      sectionHotkey: 'मेनू हॉटकी',
      hotkeyChange: 'बदलने के लिए क्लिक करें',
      hotkeyWaiting: 'कोई भी कुंजी दबाएँ…',
      footerClose: 'बंद करें',
      footerHint: 'यह मेनू खोलने/बंद करने के लिए {key} दबाएँ',
    },
    vi: {
      panelTitle: 'Kick Stream Tweaks',
      sectionPlayback: 'Phát lại',
      autoQualityLabel: 'Tự động áp dụng chất lượng đã lưu',
      autoVolumeLabel: 'Tự động áp dụng âm lượng đã lưu',
      preferredQualityLabel: 'Chất lượng ưa thích',
      preferredVolumeLabel: 'Âm lượng ưa thích',
      qualityAuto: 'Tự động (lần chọn thủ công gần nhất)',
      sectionAppearance: 'Giao diện',
      themeLabel: 'Chủ đề',
      themeDark: 'Tối',
      themeLight: 'Sáng',
      languageLabel: 'Ngôn ngữ',
      sectionHotkey: 'Phím tắt menu',
      hotkeyChange: 'Nhấp để đổi',
      hotkeyWaiting: 'Nhấn phím bất kỳ…',
      footerClose: 'Đóng',
      footerHint: 'Nhấn {key} để bật/tắt menu này',
    },
    id: {
      panelTitle: 'Kick Stream Tweaks',
      sectionPlayback: 'Pemutaran',
      autoQualityLabel: 'Terapkan kualitas tersimpan secara otomatis',
      autoVolumeLabel: 'Terapkan volume tersimpan secara otomatis',
      preferredQualityLabel: 'Kualitas pilihan',
      preferredVolumeLabel: 'Volume pilihan',
      qualityAuto: 'Otomatis (terakhir dipilih manual)',
      sectionAppearance: 'Tampilan',
      themeLabel: 'Tema',
      themeDark: 'Gelap',
      themeLight: 'Terang',
      languageLabel: 'Bahasa',
      sectionHotkey: 'Pintasan menu',
      hotkeyChange: 'Klik untuk mengubah',
      hotkeyWaiting: 'Tekan tombol apa saja…',
      footerClose: 'Tutup',
      footerHint: 'Tekan {key} untuk membuka/menutup menu ini',
    },
    th: {
      panelTitle: 'Kick Stream Tweaks',
      sectionPlayback: 'การเล่น',
      autoQualityLabel: 'ใช้คุณภาพที่บันทึกไว้โดยอัตโนมัติ',
      autoVolumeLabel: 'ใช้ระดับเสียงที่บันทึกไว้โดยอัตโนมัติ',
      preferredQualityLabel: 'คุณภาพที่ต้องการ',
      preferredVolumeLabel: 'ระดับเสียงที่ต้องการ',
      qualityAuto: 'อัตโนมัติ (เลือกด้วยตนเองล่าสุด)',
      sectionAppearance: 'ลักษณะที่ปรากฏ',
      themeLabel: 'ธีม',
      themeDark: 'มืด',
      themeLight: 'สว่าง',
      languageLabel: 'ภาษา',
      sectionHotkey: 'ปุ่มลัดเมนู',
      hotkeyChange: 'คลิกเพื่อเปลี่ยน',
      hotkeyWaiting: 'กดปุ่มใดก็ได้…',
      footerClose: 'ปิด',
      footerHint: 'กด {key} เพื่อเปิด/ปิดเมนูนี้',
    },
    ro: {
      panelTitle: 'Kick Stream Tweaks',
      sectionPlayback: 'Redare',
      autoQualityLabel: 'Aplică automat calitatea salvată',
      autoVolumeLabel: 'Aplică automat volumul salvat',
      preferredQualityLabel: 'Calitate preferată',
      preferredVolumeLabel: 'Volum preferat',
      qualityAuto: 'Auto (ultima selecție manuală)',
      sectionAppearance: 'Aspect',
      themeLabel: 'Temă',
      themeDark: 'Întunecată',
      themeLight: 'Deschisă',
      languageLabel: 'Limbă',
      sectionHotkey: 'Comandă rapidă meniu',
      hotkeyChange: 'Clic pentru a schimba',
      hotkeyWaiting: 'Apasă orice tastă…',
      footerClose: 'Închide',
      footerHint: 'Apasă {key} pentru a comuta acest meniu',
    },
    da: {
      panelTitle: 'Kick Stream Tweaks',
      sectionPlayback: 'Afspilning',
      autoQualityLabel: 'Anvend gemt kvalitet automatisk',
      autoVolumeLabel: 'Anvend gemt lydstyrke automatisk',
      preferredQualityLabel: 'Foretrukken kvalitet',
      preferredVolumeLabel: 'Foretrukken lydstyrke',
      qualityAuto: 'Auto (senest valgt manuelt)',
      sectionAppearance: 'Udseende',
      themeLabel: 'Tema',
      themeDark: 'Mørk',
      themeLight: 'Lys',
      languageLabel: 'Sprog',
      sectionHotkey: 'Menugenvej',
      hotkeyChange: 'Klik for at ændre',
      hotkeyWaiting: 'Tryk på en vilkårlig tast…',
      footerClose: 'Luk',
      footerHint: 'Tryk på {key} for at åbne/lukke denne menu',
    },
    fi: {
      panelTitle: 'Kick Stream Tweaks',
      sectionPlayback: 'Toisto',
      autoQualityLabel: 'Käytä tallennettua laatua automaattisesti',
      autoVolumeLabel: 'Käytä tallennettua äänenvoimakkuutta automaattisesti',
      preferredQualityLabel: 'Ensisijainen laatu',
      preferredVolumeLabel: 'Ensisijainen äänenvoimakkuus',
      qualityAuto: 'Automaattinen (viimeksi valittu manuaalisesti)',
      sectionAppearance: 'Ulkoasu',
      themeLabel: 'Teema',
      themeDark: 'Tumma',
      themeLight: 'Vaalea',
      languageLabel: 'Kieli',
      sectionHotkey: 'Valikon pikanäppäin',
      hotkeyChange: 'Napsauta vaihtaaksesi',
      hotkeyWaiting: 'Paina mitä tahansa näppäintä…',
      footerClose: 'Sulje',
      footerHint: 'Paina {key} avataksesi/sulkeaksesi tämän valikon',
    },
    he: {
      panelTitle: 'Kick Stream Tweaks',
      sectionPlayback: 'ניגון',
      autoQualityLabel: 'החל אוטומטית את האיכות השמורה',
      autoVolumeLabel: 'החל אוטומטית את עוצמת הקול השמורה',
      preferredQualityLabel: 'איכות מועדפת',
      preferredVolumeLabel: 'עוצמת קול מועדפת',
      qualityAuto: 'אוטומטי (הבחירה הידנית האחרונה)',
      sectionAppearance: 'מראה',
      themeLabel: 'ערכת נושא',
      themeDark: 'כהה',
      themeLight: 'בהיר',
      languageLabel: 'שפה',
      sectionHotkey: 'קיצור תפריט',
      hotkeyChange: 'לחץ לשינוי',
      hotkeyWaiting: 'לחץ על מקש כלשהו…',
      footerClose: 'סגור',
      footerHint: 'לחץ על {key} כדי לפתוח/לסגור תפריט זה',
    },
  };

  // Purely presentational metadata for the language picker: the
  // language's own native name. Kept separate from TRANSLATIONS so the
  // two concerns — "what the UI says" vs. "how to label the choice in
  // the dropdown" — don't get tangled together.
  const LANGUAGE_META = {
    en: { name: 'English' },
    ru: { name: 'Русский' },
    uk: { name: 'Українська' },
    de: { name: 'Deutsch' },
    es: { name: 'Español' },
    fr: { name: 'Français' },
    pt: { name: 'Português' },
    it: { name: 'Italiano' },
    zh: { name: '中文' },
    ja: { name: '日本語' },
    ko: { name: '한국어' },
    pl: { name: 'Polski' },
    tr: { name: 'Türkçe' },
    ar: { name: 'العربية' },
    nl: { name: 'Nederlands' },
    sv: { name: 'Svenska' },
    cs: { name: 'Čeština' },
    el: { name: 'Ελληνικά' },
    hi: { name: 'हिन्दी' },
    vi: { name: 'Tiếng Việt' },
    id: { name: 'Bahasa Indonesia' },
    th: { name: 'ไทย' },
    ro: { name: 'Română' },
    da: { name: 'Dansk' },
    fi: { name: 'Suomi' },
    he: { name: 'עברית' },
  };

  /**
   * Inline SVG flags, keyed by language code. Chromium on Windows (Chrome,
   * Brave, Edge) has no bundled color-emoji font, so Unicode flag emoji
   * render as plain two-letter region codes instead of flags. Real vector
   * flags sidestep that entirely — they're plain SVG shapes, not font
   * glyphs, so they render identically everywhere. Deliberately simplified
   * (no coats of arms, script, or fine detail) since these only ever show
   * at ~20x14px.
   */
  const FLAG_SVGS = {
    en: '<svg viewBox="0 0 30 20"><rect width="30" height="20" fill="#fff"/><g fill="#B22234"><rect y="0" width="30" height="1.54"/><rect y="3.08" width="30" height="1.54"/><rect y="6.15" width="30" height="1.54"/><rect y="9.23" width="30" height="1.54"/><rect y="12.31" width="30" height="1.54"/><rect y="15.38" width="30" height="1.54"/><rect y="18.46" width="30" height="1.54"/></g><rect width="12" height="10.77" fill="#3C3B6E"/></svg>',
    ru: '<svg viewBox="0 0 30 20"><rect width="30" height="6.67" fill="#fff"/><rect y="6.67" width="30" height="6.67" fill="#0039A6"/><rect y="13.34" width="30" height="6.66" fill="#D52B1E"/></svg>',
    uk: '<svg viewBox="0 0 30 20"><rect width="30" height="10" fill="#0057B7"/><rect y="10" width="30" height="10" fill="#FFD700"/></svg>',
    de: '<svg viewBox="0 0 30 20"><rect width="30" height="6.67" fill="#000"/><rect y="6.67" width="30" height="6.67" fill="#DD0000"/><rect y="13.34" width="30" height="6.66" fill="#FFCE00"/></svg>',
    es: '<svg viewBox="0 0 30 20"><rect width="30" height="5" fill="#AA151B"/><rect y="5" width="30" height="10" fill="#F1BF00"/><rect y="15" width="30" height="5" fill="#AA151B"/></svg>',
    fr: '<svg viewBox="0 0 30 20"><rect width="10" height="20" fill="#0055A4"/><rect x="10" width="10" height="20" fill="#fff"/><rect x="20" width="10" height="20" fill="#EF4135"/></svg>',
    pt: '<svg viewBox="0 0 30 20"><rect width="12" height="20" fill="#006600"/><rect x="12" width="18" height="20" fill="#FF0000"/></svg>',
    it: '<svg viewBox="0 0 30 20"><rect width="10" height="20" fill="#009246"/><rect x="10" width="10" height="20" fill="#fff"/><rect x="20" width="10" height="20" fill="#CE2B37"/></svg>',
    zh: '<svg viewBox="0 0 30 20"><rect width="30" height="20" fill="#DE2910"/><g fill="#FFDE00"><polygon points="5,3 6,6 9,6 6.5,8 7.5,11 5,9 2.5,11 3.5,8 1,6 4,6"/><circle cx="11" cy="2.2" r="0.8"/><circle cx="13" cy="4.7" r="0.8"/><circle cx="13" cy="7.7" r="0.8"/><circle cx="11" cy="9.7" r="0.8"/></g></svg>',
    ja: '<svg viewBox="0 0 30 20"><rect width="30" height="20" fill="#fff"/><circle cx="15" cy="10" r="6" fill="#BC002D"/></svg>',
    ko: '<svg viewBox="0 0 30 20"><rect width="30" height="20" fill="#fff"/><circle cx="15" cy="10" r="5" fill="#fff"/><path d="M15,5 A5,5 0 0,1 15,15 A2.5,2.5 0 0,1 15,10 A2.5,2.5 0 0,0 15,5 Z" fill="#CD2E3A"/><path d="M15,15 A5,5 0 0,1 15,5 A2.5,2.5 0 0,1 15,10 A2.5,2.5 0 0,0 15,15 Z" fill="#0047A0"/></svg>',
    pl: '<svg viewBox="0 0 30 20"><rect width="30" height="10" fill="#fff"/><rect y="10" width="30" height="10" fill="#DC143C"/></svg>',
    tr: '<svg viewBox="0 0 30 20"><rect width="30" height="20" fill="#E30A17"/><circle cx="12" cy="10" r="5" fill="#fff"/><circle cx="13.5" cy="10" r="4" fill="#E30A17"/><polygon points="18,10 19.5,10.6 19,9 20,7.8 18.4,8 18,6.4 17.6,8 16,7.8 17,9 16.5,10.6" fill="#fff"/></svg>',
    ar: '<svg viewBox="0 0 30 20"><rect width="30" height="20" fill="#006C35"/><rect x="6" y="14.5" width="18" height="1.2" fill="#fff"/></svg>',
    nl: '<svg viewBox="0 0 30 20"><rect width="30" height="6.67" fill="#AE1C28"/><rect y="6.67" width="30" height="6.67" fill="#fff"/><rect y="13.34" width="30" height="6.66" fill="#21468B"/></svg>',
    sv: '<svg viewBox="0 0 30 20"><rect width="30" height="20" fill="#006AA7"/><rect x="9" width="4" height="20" fill="#FECC00"/><rect y="8" width="30" height="4" fill="#FECC00"/></svg>',
    cs: '<svg viewBox="0 0 30 20"><rect width="30" height="10" fill="#fff"/><rect y="10" width="30" height="10" fill="#D7141A"/><polygon points="0,0 0,20 13,10" fill="#11457E"/></svg>',
    el: '<svg viewBox="0 0 30 20"><rect width="30" height="20" fill="#0D5EAF"/><rect y="2.22" width="30" height="2.22" fill="#fff"/><rect y="6.67" width="30" height="2.22" fill="#fff"/><rect y="11.11" width="30" height="2.22" fill="#fff"/><rect y="15.56" width="30" height="2.22" fill="#fff"/><rect width="11" height="11" fill="#0D5EAF"/><rect x="4.2" width="2.6" height="11" fill="#fff"/><rect y="4.2" width="11" height="2.6" fill="#fff"/></svg>',
    hi: '<svg viewBox="0 0 30 20"><rect width="30" height="6.67" fill="#FF9933"/><rect y="6.67" width="30" height="6.67" fill="#fff"/><rect y="13.34" width="30" height="6.66" fill="#138808"/><circle cx="15" cy="10" r="2.2" fill="none" stroke="#000080" stroke-width="0.4"/></svg>',
    vi: '<svg viewBox="0 0 30 20"><rect width="30" height="20" fill="#DA251D"/><polygon points="15,4 16.3,8 20.5,8 17.1,10.5 18.4,14.5 15,12 11.6,14.5 12.9,10.5 9.5,8 13.7,8" fill="#FFCD00"/></svg>',
    id: '<svg viewBox="0 0 30 20"><rect width="30" height="10" fill="#FF0000"/><rect y="10" width="30" height="10" fill="#fff"/></svg>',
    th: '<svg viewBox="0 0 30 20"><rect width="30" height="3.33" fill="#A51931"/><rect y="3.33" width="30" height="3.33" fill="#fff"/><rect y="6.67" width="30" height="6.67" fill="#2D2A4A"/><rect y="13.33" width="30" height="3.33" fill="#fff"/><rect y="16.67" width="30" height="3.33" fill="#A51931"/></svg>',
    ro: '<svg viewBox="0 0 30 20"><rect width="10" height="20" fill="#002B7F"/><rect x="10" width="10" height="20" fill="#FCD116"/><rect x="20" width="10" height="20" fill="#CE1126"/></svg>',
    da: '<svg viewBox="0 0 30 20"><rect width="30" height="20" fill="#C60C30"/><rect x="9" width="4" height="20" fill="#fff"/><rect y="8" width="30" height="4" fill="#fff"/></svg>',
    fi: '<svg viewBox="0 0 30 20"><rect width="30" height="20" fill="#fff"/><rect x="9" width="4" height="20" fill="#003580"/><rect y="8" width="30" height="4" fill="#003580"/></svg>',
    he: '<svg viewBox="0 0 30 20"><rect width="30" height="20" fill="#fff"/><rect y="2.5" width="30" height="2" fill="#0038B8"/><rect y="15.5" width="30" height="2" fill="#0038B8"/><polygon points="15,6 19,13 11,13" fill="none" stroke="#0038B8" stroke-width="0.5"/><polygon points="15,14 11,7 19,7" fill="none" stroke="#0038B8" stroke-width="0.5"/></svg>',
  };

  function t(lang, key, vars) {
    const dict = TRANSLATIONS[lang] || TRANSLATIONS.en;
    let str = dict[key] || TRANSLATIONS.en[key] || key;
    if (vars) {
      for (const [k, v] of Object.entries(vars)) {
        str = str.replace(`{${k}}`, v);
      }
    }
    return str;
  }

  /* ============================================================
   *  STORE — persistence layer (localStorage)
   * ========================================================== */
  const Store = {
    load() {
      try {
        const raw = localStorage.getItem(CONFIG.STORAGE_KEY);
        if (!raw) return { ...DEFAULT_SETTINGS };
        const parsed = JSON.parse(raw);
        // Merge with defaults so newly-added settings don't end up undefined
        // for users upgrading from an older version of the script.
        return {
          ...DEFAULT_SETTINGS,
          ...parsed,
          hotkey: { ...DEFAULT_SETTINGS.hotkey, ...(parsed.hotkey || {}) },
        };
      } catch (err) {
        console.warn(CONFIG.LOG_PREFIX, 'Failed to load settings, using defaults.', err);
        return { ...DEFAULT_SETTINGS };
      }
    },
    save(settings) {
      try {
        localStorage.setItem(CONFIG.STORAGE_KEY, JSON.stringify(settings));
      } catch (err) {
        console.error(CONFIG.LOG_PREFIX, 'Failed to save settings.', err);
      }
    },
  };

  // In-memory settings, kept in sync with localStorage.
  let settings = Store.load();
  function persist(patch) {
    settings = { ...settings, ...patch };
    Store.save(settings);
  }

  /* ============================================================
   *  UTILS
   * ========================================================== */
  function log(...args) {
    console.log(CONFIG.LOG_PREFIX, ...args);
  }

  function debounce(fn, wait) {
    let handle;
    return (...args) => {
      clearTimeout(handle);
      handle = setTimeout(() => fn(...args), wait);
    };
  }

  function normalizeQualityText(str) {
    return (str || '').trim().replace(/\s+/g, '').toLowerCase();
  }

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, Number.isFinite(value) ? value : min));
  }

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * Notifies listeners whenever the SPA changes "page" (Kick is built
   * as a single-page app, so a full document reload does not happen
   * when navigating between streams/VODs).
   */
  function onLocationChange(callback) {
    let lastHref = location.href;

    const check = () => {
      if (location.href !== lastHref) {
        lastHref = location.href;
        callback();
      }
    };

    const wrap = (method) => {
      const original = history[method];
      history[method] = function (...args) {
        const result = original.apply(this, args);
        check();
        return result;
      };
    };
    wrap('pushState');
    wrap('replaceState');
    window.addEventListener('popstate', check);

    // Fallback poll in case something navigates without touching the
    // History API (rare, but cheap to guard against).
    setInterval(check, 1000);
  }

  /* ============================================================
   *  PLAYER SYNC — quality & volume persistence
   *
   *  Kick's menu is built on ARIA primitives rather than descriptive
   *  class names, and it does not respond to a plain `.click()` call
   *  (its menu component listens for real pointer events). Both facts
   *  were confirmed against Kick's actual rendered markup, and drive
   *  the approach below:
   *    - quality options are `[role="menuitemradio"]` elements
   *    - the settings trigger is a `button[aria-haspopup="menu"]`
   *      positioned over the video (there's more than one such button
   *      on the page, e.g. the account menu, so we pick the one
   *      closest to the video's bottom-right corner)
   *    - clicks are simulated as a full pointer-event sequence
   * ========================================================== */
  const PlayerSync = {
    appliedStreamKeys: new Set(), // one-shot guard: "pathname::src" we've already forced
    manualPickDelegated: false,

    /** Picks the largest visible <video> on the page (main stream player). */
    findMainVideo() {
      const videos = Array.from(document.querySelectorAll('video')).filter(
        (v) => v.offsetParent !== null && v.clientWidth * v.clientHeight > 0
      );
      videos.sort((a, b) => b.clientWidth * b.clientHeight - a.clientWidth * a.clientHeight);
      return videos[0] || null;
    },

    /** A key that changes whenever the stream/VOD actually changes. */
    getStreamKey(video) {
      const src = (video.currentSrc || video.src || '').split('?')[0];
      return `${location.pathname}::${src || 'no-src'}`;
    },

    isLikelyAccountButton(btn) {
      if (btn.closest('header')) return true;
      if (btn.querySelector('img, [data-testid*="avatar" i]')) return true;
      return /\b(profile|account|avatar|user)\b/i.test(btn.getAttribute('aria-label') || '');
    },

    findSettingsButton(video) {
      const videoRect = video.getBoundingClientRect();
      const candidates = Array.from(
        document.querySelectorAll(CONFIG.SETTINGS_BUTTON_SELECTOR)
      ).filter((btn) => !this.isLikelyAccountButton(btn));

      // Prefer an explicit "Settings" label if present.
      const explicit = candidates.find((btn) => /settings/i.test(btn.getAttribute('aria-label') || ''));
      if (explicit) return explicit;

      // Otherwise pick whichever candidate sits closest to the video's
      // bottom-right corner — that's where Kick (and most players)
      // place the gear icon.
      const withDistance = candidates
        .map((btn) => {
          const r = btn.getBoundingClientRect();
          const cx = r.left + r.width / 2;
          const cy = r.top + r.height / 2;
          const insideOrNearVideo =
            cx >= videoRect.left && cx <= videoRect.right && cy >= videoRect.top && cy <= videoRect.bottom + 60;
          const dist = Math.hypot(videoRect.right - cx, videoRect.bottom - cy);
          return { btn, dist, insideOrNearVideo };
        })
        .filter((c) => c.insideOrNearVideo)
        .sort((a, b) => a.dist - b.dist);

      return withDistance.length ? withDistance[0].btn : null;
    },

    /** Dispatches a realistic pointer-event sequence (plain .click() is ignored by Kick's menu). */
    simulateClick(el) {
      if (!el) return;
      el.focus({ preventScroll: true });
      ['pointerover', 'pointerenter', 'pointerdown', 'mousedown', 'pointerup', 'mouseup', 'click'].forEach(
        (type) =>
          el.dispatchEvent(
            new PointerEvent(type, {
              bubbles: true,
              cancelable: true,
              composed: true,
              pointerId: 1,
              pointerType: 'mouse',
              isPrimary: true,
            })
          )
      );
    },

    getQualityMenuItems() {
      return Array.from(document.querySelectorAll(CONFIG.QUALITY_ITEM_SELECTOR));
    },

    /** Attempts to select `desired` among the currently-open quality menu items. Returns true on success. */
    selectQualityItem(desired) {
      const items = this.getQualityMenuItems();
      if (!items.length) return false;

      const wanted = normalizeQualityText(desired);
      const exact = items.find((i) => normalizeQualityText(i.textContent) === wanted);
      if (exact) {
        this.simulateClick(exact);
        return true;
      }

      // Fall back down the quality ladder (e.g. saved "1080p60" isn't
      // offered on this stream, so try "1080p", then "720p", etc.).
      const ladder = CONFIG.QUALITY_OPTIONS.filter((q) => q !== 'auto');
      const startIdx = ladder.indexOf(wanted);
      if (startIdx >= 0) {
        for (let i = startIdx; i < ladder.length; i++) {
          const node = items.find((it) => normalizeQualityText(it.textContent) === ladder[i]);
          if (node) {
            this.simulateClick(node);
            log(`Exact quality "${desired}" unavailable on this stream; used closest match "${ladder[i]}".`);
            return true;
          }
        }
      }
      return false;
    },

    /**
     * Runs the full one-shot sequence for the current stream: find the
     * video, find the settings button, open it, open the quality menu
     * if needed, and click the desired option. Retries with backoff
     * since the player can take a moment to mount after navigation.
     */
    async applyQualityOnce(streamKey) {
      const desired =
        settings.preferredQuality && settings.preferredQuality !== 'auto'
          ? settings.preferredQuality
          : settings.lastKnownQuality;

      if (!desired || desired === 'auto') {
        log('No specific quality to enforce (Auto is fine as-is).');
        this.appliedStreamKeys.add(streamKey);
        return;
      }

      for (let attempt = 0; attempt < CONFIG.MAX_FIND_ATTEMPTS; attempt++) {
        const video = this.findMainVideo();
        if (!video) {
          await sleep(CONFIG.RETRY_INTERVAL_MS);
          continue;
        }

        const cog = this.findSettingsButton(video);
        if (!cog) {
          await sleep(CONFIG.RETRY_INTERVAL_MS);
          continue;
        }

        this.simulateClick(cog); // open the menu

        let success = false;
        for (let tick = 0; tick < CONFIG.MAX_MENU_WAIT_TICKS; tick++) {
          await sleep(CONFIG.RETRY_INTERVAL_MS);
          if (this.selectQualityItem(desired)) {
            success = true;
            break;
          }
        }

        if (success) {
          this.simulateClick(cog); // close the menu again
          this.appliedStreamKeys.add(streamKey);
          log(`Applied saved quality "${desired}" for ${streamKey}`);
          return;
        }

        // Close whatever we opened and try the whole sequence again.
        this.simulateClick(cog);
        await sleep(CONFIG.RETRY_INTERVAL_MS);
      }

      log(
        `Could not locate a "${desired}" option in Kick's quality menu after several attempts. ` +
          'Open devtools and check the console for [KickTweaks] logs, or Kick may have changed its menu markup.'
      );
    },

    applyVolume(video) {
      if (!settings.autoVolumeEnabled) return;
      try {
        video.volume = clamp(settings.volume, 0, 1);
        video.muted = !!settings.muted;
      } catch (err) {
        console.error(CONFIG.LOG_PREFIX, 'Failed to apply saved volume:', err);
      }
    },

    watchVolumeChanges(video) {
      if (video.dataset.kickTweaksVolumeBound) return;
      video.dataset.kickTweaksVolumeBound = 'true';
      const boundAt = Date.now();

      const handler = debounce(() => {
        // Ignore changes in the first moments after we attach: this is
        // almost always the browser/Kick forcing muted=true to satisfy
        // autoplay policy, not a deliberate user action. Persisting it
        // would permanently lock future streams to muted.
        if (Date.now() - boundAt < CONFIG.VOLUME_GRACE_MS) return;
        persist({ volume: video.volume, muted: video.muted });
        GUI.syncVolumeControls();
      }, 250);
      video.addEventListener('volumechange', handler);
    },

    /**
     * One global, capture-phase click listener that recognises clicks on
     * quality menu items regardless of when they were added to the DOM
     * (Kick's menu may stay mounted and only toggle visibility, which
     * means a MutationObserver watching for *new* nodes can miss it
     * entirely — this delegation approach works either way).
     */
    watchManualQualityChanges() {
      if (this.manualPickDelegated) return;
      this.manualPickDelegated = true;

      document.addEventListener(
        'click',
        (e) => {
          const item = e.target.closest(CONFIG.QUALITY_ITEM_SELECTOR);
          if (!item) return;
          const text = normalizeQualityText(item.textContent);
          if (!text) return;
          persist({ lastKnownQuality: text });
          log(`Detected manual quality change: ${text}`);
        },
        true
      );
    },

    /** Main tick: called on init and whenever the SPA navigates or the player remounts. */
    async syncCurrentStream() {
      const video = this.findMainVideo();
      if (!video) return;

      // Apply the saved volume once per <video> element only. Re-running
      // this on every 1.5s poll would otherwise fight any manual
      // adjustment made via Kick's own controls in between ticks.
      if (!video.dataset.kickTweaksVolumeApplied) {
        video.dataset.kickTweaksVolumeApplied = 'true';
        this.applyVolume(video);
        // Kick sometimes re-asserts muted=true a moment after we set it
        // (autoplay policy re-check); a single delayed follow-up beats
        // that without becoming an ongoing fight with the user.
        setTimeout(() => this.applyVolume(video), 1000);
      }

      this.watchVolumeChanges(video);
      this.watchManualQualityChanges();

      const streamKey = this.getStreamKey(video);
      if (settings.autoQualityEnabled && !this.appliedStreamKeys.has(streamKey)) {
        await this.applyQualityOnce(streamKey);
      }
    },

    init() {
      this.syncCurrentStream();

      // Re-check whenever the SPA navigates, and periodically in case
      // the player remounts a new <video> without a URL change (e.g.
      // recovering from an ad break or a stream reconnect).
      onLocationChange(debounce(() => this.syncCurrentStream(), 400));
      setInterval(() => this.syncCurrentStream(), 1500);
    },
  };

  /* ============================================================
   *  GUI — Shadow-DOM control panel
   * ========================================================== */
  const GUI = {
    host: null,
    shadow: null,
    isOpen: false,
    capturingHotkey: false,
    volumePollHandle: null,

    build() {
      this.host = document.createElement('div');
      this.host.id = 'kick-tweaks-host';
      document.body.appendChild(this.host);
      this.shadow = this.host.attachShadow({ mode: 'open' });
      this.shadow.innerHTML = `
        <style>${this.css()}</style>
        <div class="kt-backdrop" part="backdrop"></div>
        <div class="kt-panel" role="dialog" aria-modal="true">
          <header class="kt-header">
            <h2 class="kt-title"></h2>
            <button class="kt-close" aria-label="Close">✕</button>
          </header>
          <div class="kt-body"></div>
          <footer class="kt-footer"></footer>
        </div>
      `;

      this.shadow.querySelector('.kt-backdrop').addEventListener('click', () => this.close());
      this.shadow.querySelector('.kt-close').addEventListener('click', () => this.close());

      this.render();
    },

    css() {
      // All styles are scoped inside the Shadow Root, so Kick's global
      // Tailwind classes can never leak in (and vice versa).
      return `
        :host { all: initial; }
        * { box-sizing: border-box; font-family: 'Inter', 'Segoe UI', Roboto, sans-serif; }

        :host([data-theme="dark"]) {
          --kt-bg: #17181c;
          --kt-bg-elevated: #1f2127;
          --kt-border: #2c2e35;
          --kt-text: #f2f3f5;
          --kt-text-muted: #9a9ca3;
          --kt-accent: #53fc18;
          --kt-accent-text: #0d0f0a;
        }
        :host([data-theme="light"]) {
          --kt-bg: #ffffff;
          --kt-bg-elevated: #f4f5f7;
          --kt-border: #e2e4e8;
          --kt-text: #17181c;
          --kt-text-muted: #6b6e76;
          --kt-accent: #17b90a;
          --kt-accent-text: #ffffff;
        }

        .kt-backdrop {
          position: fixed; inset: 0;
          background: rgba(0,0,0,0.55);
          backdrop-filter: blur(3px);
          opacity: 0; pointer-events: none;
          transition: opacity 0.2s ease;
          z-index: 2147483000;
        }
        .kt-panel {
          position: fixed; top: 50%; left: 50%;
          width: min(440px, 92vw);
          max-height: 85vh; overflow-y: auto; overflow-x: hidden;
          background: var(--kt-bg);
          color: var(--kt-text);
          border: 1px solid var(--kt-border);
          border-radius: 14px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.45);
          transform: translate(-50%, -48%) scale(0.96);
          opacity: 0;
          pointer-events: none;
          transition: transform 0.22s cubic-bezier(.2,.8,.25,1), opacity 0.18s ease;
          z-index: 2147483001;
        }
        :host([data-open="true"]) .kt-backdrop { opacity: 1; pointer-events: auto; }
        :host([data-open="true"]) .kt-panel {
          opacity: 1; pointer-events: auto;
          transform: translate(-50%, -50%) scale(1);
        }

        .kt-header {
          display: flex; align-items: center; justify-content: space-between;
          padding: 18px 20px; border-bottom: 1px solid var(--kt-border);
        }
        .kt-title { margin: 0; font-size: 16px; font-weight: 600; letter-spacing: .2px; }
        .kt-close {
          background: transparent; border: none; color: var(--kt-text-muted);
          font-size: 15px; cursor: pointer; padding: 6px; border-radius: 8px;
          line-height: 1; transition: background 0.15s ease, color 0.15s ease;
        }
        .kt-close:hover { background: var(--kt-bg-elevated); color: var(--kt-text); }

        .kt-body { padding: 16px 20px 6px; }
        .kt-section { margin-bottom: 18px; }
        .kt-section-title {
          font-size: 11px; text-transform: uppercase; letter-spacing: .08em;
          color: var(--kt-text-muted); margin: 0 0 10px;
          font-weight: 600;
        }
        .kt-row {
          display: flex; align-items: center; justify-content: space-between;
          padding: 10px 12px; background: var(--kt-bg-elevated);
          border: 1px solid var(--kt-border); border-radius: 10px; margin-bottom: 8px;
          min-width: 0;
        }
        .kt-row-label {
          font-size: 13.5px;
          overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
          margin-right: 10px;
        }

        /* Rows that stack a label above a wider control, e.g. the
           quality/volume group directly beneath their toggles, so the
           control never has to squeeze into half the panel width. */
        .kt-row-column { flex-direction: column; align-items: stretch; }
        .kt-row-column .kt-row-label { margin: 0 0 10px; white-space: normal; }
        .kt-row-column select.kt-select { width: 100%; max-width: none; }

        select.kt-select, button.kt-hotkey-btn {
          background: var(--kt-bg);
          color: var(--kt-text);
          border: 1px solid var(--kt-border);
          border-radius: 8px;
          padding: 6px 10px;
          font-size: 13px;
          cursor: pointer;
          max-width: 170px;
          overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
          flex-shrink: 0;
        }
        select.kt-select:focus, button.kt-hotkey-btn:focus { outline: 2px solid var(--kt-accent); }

        .kt-volume-control {
          display: flex; align-items: center; gap: 10px; min-width: 0;
        }
        .kt-slider {
          flex: 1; min-width: 0; height: 4px; border-radius: 999px;
          accent-color: var(--kt-accent); cursor: pointer;
        }
        .kt-number-wrap {
          display: flex; align-items: center; gap: 4px; flex-shrink: 0;
        }
        .kt-number {
          width: 52px; text-align: center; padding: 5px 4px;
          background: var(--kt-bg); color: var(--kt-text);
          border: 1px solid var(--kt-border); border-radius: 8px; font-size: 13px;
        }
        .kt-number:focus { outline: 2px solid var(--kt-accent); }
        .kt-percent-sign { color: var(--kt-text-muted); font-size: 12px; }

        .kt-flag {
          display: inline-flex; flex-shrink: 0;
          width: 20px; height: 14px; border-radius: 3px;
          overflow: hidden; box-shadow: 0 0 0 1px rgba(0,0,0,0.15) inset;
        }
        .kt-flag svg { width: 100%; height: 100%; display: block; }

        .kt-dropdown { position: relative; flex-shrink: 0; max-width: 190px; }
        .kt-dropdown-trigger {
          display: flex; align-items: center; gap: 8px;
          background: var(--kt-bg); color: var(--kt-text);
          border: 1px solid var(--kt-border); border-radius: 8px;
          padding: 6px 8px; font-size: 13px; cursor: pointer; width: 100%;
        }
        .kt-dropdown-trigger:focus { outline: 2px solid var(--kt-accent); }
        .kt-dropdown-trigger-text {
          flex: 1; text-align: left;
          overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
        }
        .kt-chevron {
          font-size: 10px; color: var(--kt-text-muted); flex-shrink: 0;
          transition: transform 0.15s ease;
        }
        .kt-dropdown[data-open="true"] .kt-chevron { transform: rotate(180deg); }

        .kt-dropdown-list {
          position: absolute; top: calc(100% + 6px); right: 0;
          width: 210px; max-height: 220px; overflow-y: auto;
          background: var(--kt-bg-elevated); border: 1px solid var(--kt-border);
          border-radius: 10px; box-shadow: 0 14px 34px rgba(0,0,0,0.4);
          padding: 6px; margin: 0; list-style: none;
          z-index: 5; display: none;
        }
        .kt-dropdown[data-open="true"] .kt-dropdown-list { display: block; }
        .kt-dropdown-item {
          display: flex; align-items: center; gap: 9px;
          padding: 7px 8px; border-radius: 7px; cursor: pointer; font-size: 13px;
        }
        .kt-dropdown-item-text { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .kt-dropdown-item:hover, .kt-dropdown-item[data-active="true"] { background: var(--kt-bg); }
        .kt-dropdown-item[data-active="true"] { font-weight: 600; }

        .kt-switch {
          position: relative; width: 38px; height: 22px;
          background: var(--kt-border); border-radius: 999px;
          cursor: pointer; transition: background 0.15s ease; flex-shrink: 0;
          border: none;
        }
        .kt-switch::after {
          content: ''; position: absolute; top: 2px; left: 2px;
          width: 18px; height: 18px; border-radius: 50%;
          background: #fff; transition: transform 0.18s ease;
        }
        .kt-switch[data-on="true"] { background: var(--kt-accent); }
        .kt-switch[data-on="true"]::after { transform: translateX(16px); }

        .kt-theme-toggle { display: flex; gap: 6px; }
        .kt-theme-btn {
          flex: 1; padding: 8px; border-radius: 8px; border: 1px solid var(--kt-border);
          background: var(--kt-bg); color: var(--kt-text); cursor: pointer; font-size: 13px;
          transition: all 0.15s ease;
        }
        .kt-theme-btn[data-active="true"] {
          background: var(--kt-accent); color: var(--kt-accent-text);
          border-color: var(--kt-accent); font-weight: 600;
        }

        .kt-footer {
          padding: 14px 20px 18px; border-top: 1px solid var(--kt-border);
          font-size: 11.5px; color: var(--kt-text-muted); text-align: center;
        }

        .kt-hotkey-btn.capturing { color: var(--kt-accent); border-color: var(--kt-accent); }
      `;
    },

    render() {
      const lang = settings.language;
      this.host.setAttribute('data-theme', settings.theme);
      this.shadow.querySelector('.kt-title').textContent = t(lang, 'panelTitle');

      const body = this.shadow.querySelector('.kt-body');
      body.innerHTML = `
        <div class="kt-section">
          <p class="kt-section-title">${t(lang, 'sectionPlayback')}</p>

          <div class="kt-row">
            <span class="kt-row-label">${t(lang, 'autoQualityLabel')}</span>
            <button class="kt-switch" data-key="autoQualityEnabled" data-on="${settings.autoQualityEnabled}"></button>
          </div>

          <div class="kt-row kt-row-column">
            <span class="kt-row-label">${t(lang, 'preferredQualityLabel')}</span>
            <select class="kt-select" data-key="preferredQuality">
              ${CONFIG.QUALITY_OPTIONS.map(
                (q) =>
                  `<option value="${q}" ${settings.preferredQuality === q ? 'selected' : ''}>${
                    q === 'auto' ? t(lang, 'qualityAuto') : q
                  }</option>`
              ).join('')}
            </select>
          </div>

          <div class="kt-row">
            <span class="kt-row-label">${t(lang, 'autoVolumeLabel')}</span>
            <button class="kt-switch" data-key="autoVolumeEnabled" data-on="${settings.autoVolumeEnabled}"></button>
          </div>

          <div class="kt-row kt-row-column">
            <span class="kt-row-label">${t(lang, 'preferredVolumeLabel')}</span>
            <div class="kt-volume-control">
              <input type="range" class="kt-slider" min="0" max="100" step="1"
                     value="${Math.round(settings.volume * 100)}" aria-label="${t(lang, 'preferredVolumeLabel')}" />
              <div class="kt-number-wrap">
                <input type="number" class="kt-number" min="0" max="100"
                       value="${Math.round(settings.volume * 100)}" aria-label="${t(lang, 'preferredVolumeLabel')}" />
                <span class="kt-percent-sign">%</span>
              </div>
            </div>
          </div>
        </div>

        <div class="kt-section">
          <p class="kt-section-title">${t(lang, 'sectionAppearance')}</p>

          <div class="kt-row">
            <span class="kt-row-label">${t(lang, 'themeLabel')}</span>
            <div class="kt-theme-toggle">
              <button class="kt-theme-btn" data-theme-choice="dark" data-active="${settings.theme === 'dark'}">${t(lang, 'themeDark')}</button>
              <button class="kt-theme-btn" data-theme-choice="light" data-active="${settings.theme === 'light'}">${t(lang, 'themeLight')}</button>
            </div>
          </div>

          <div class="kt-row">
            <span class="kt-row-label">${t(lang, 'languageLabel')}</span>
            <div class="kt-dropdown" id="kt-lang-dropdown" data-open="false">
              <button type="button" class="kt-dropdown-trigger" aria-haspopup="listbox" aria-expanded="false">
                <span class="kt-flag">${FLAG_SVGS[settings.language] || ''}</span>
                <span class="kt-dropdown-trigger-text">${(LANGUAGE_META[settings.language] || {}).name || settings.language}</span>
                <span class="kt-chevron">▾</span>
              </button>
              <ul class="kt-dropdown-list" role="listbox">
                ${Object.keys(TRANSLATIONS)
                  .map((code) => {
                    const meta = LANGUAGE_META[code] || { name: code.toUpperCase() };
                    const active = settings.language === code;
                    return `<li class="kt-dropdown-item" role="option" data-lang="${code}" data-active="${active}" aria-selected="${active}">
                      <span class="kt-flag">${FLAG_SVGS[code] || ''}</span>
                      <span class="kt-dropdown-item-text">${meta.name}</span>
                    </li>`;
                  })
                  .join('')}
              </ul>
            </div>
          </div>
        </div>

        <div class="kt-section">
          <p class="kt-section-title">${t(lang, 'sectionHotkey')}</p>
          <div class="kt-row">
            <span class="kt-row-label">${describeHotkey(settings.hotkey)}</span>
            <button class="kt-hotkey-btn" id="kt-rebind-btn">${t(lang, 'hotkeyChange')}</button>
          </div>
        </div>
      `;

      this.shadow.querySelector('.kt-footer').textContent = t(lang, 'footerHint', {
        key: describeHotkey(settings.hotkey),
      });

      const closeBtn = this.shadow.querySelector('.kt-close');
      closeBtn.setAttribute('aria-label', t(lang, 'footerClose'));
      closeBtn.title = t(lang, 'footerClose');

      this.wireEvents(lang);
    },

    wireEvents(lang) {
      const shadow = this.shadow;

      shadow.querySelectorAll('.kt-switch').forEach((btn) => {
        btn.addEventListener('click', () => {
          const key = btn.dataset.key;
          const next = !(settings[key]);
          persist({ [key]: next });
          btn.dataset.on = String(next);
        });
      });

      shadow.querySelectorAll('select[data-key]').forEach((select) => {
        select.addEventListener('change', () => {
          persist({ [select.dataset.key]: select.value });
        });
      });

      const langDropdown = shadow.querySelector('#kt-lang-dropdown');
      if (langDropdown) {
        const trigger = langDropdown.querySelector('.kt-dropdown-trigger');
        const list = langDropdown.querySelector('.kt-dropdown-list');

        const closeLangDropdown = () => {
          langDropdown.setAttribute('data-open', 'false');
          trigger.setAttribute('aria-expanded', 'false');
          document.removeEventListener('click', outsideClickHandler, true);
        };
        const outsideClickHandler = (e) => {
          const path = typeof e.composedPath === 'function' ? e.composedPath() : [e.target];
          if (!path.includes(langDropdown)) closeLangDropdown();
        };

        trigger.addEventListener('click', (e) => {
          e.stopPropagation();
          const isOpen = langDropdown.getAttribute('data-open') === 'true';
          if (isOpen) {
            closeLangDropdown();
            return;
          }
          langDropdown.setAttribute('data-open', 'true');
          trigger.setAttribute('aria-expanded', 'true');
          document.addEventListener('click', outsideClickHandler, true);
        });

        list.querySelectorAll('.kt-dropdown-item').forEach((item) => {
          item.addEventListener('click', (e) => {
            e.stopPropagation();
            persist({ language: item.dataset.lang });
            closeLangDropdown();
            this.render();
          });
        });
      }

      shadow.querySelectorAll('.kt-theme-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
          const theme = btn.dataset.themeChoice;
          persist({ theme });
          this.host.setAttribute('data-theme', theme);
          shadow.querySelectorAll('.kt-theme-btn').forEach((b) => {
            b.dataset.active = String(b.dataset.themeChoice === theme);
          });
        });
      });

      const slider = shadow.querySelector('.kt-slider');
      const numberInput = shadow.querySelector('.kt-number');

      const applyVolumeFromUI = (rawPercent) => {
        const percent = Math.min(100, Math.max(0, Math.round(Number(rawPercent) || 0)));
        slider.value = String(percent);
        numberInput.value = String(percent);

        const fraction = percent / 100;
        persist({ volume: fraction, muted: percent === 0 ? settings.muted : false });

        // Reflect the change on the live video immediately, the same
        // way Kick's own volume slider would.
        const video = PlayerSync.findMainVideo();
        if (video) {
          video.volume = fraction;
          if (percent > 0) video.muted = false;
        }
      };

      if (slider && numberInput) {
        slider.addEventListener('input', () => applyVolumeFromUI(slider.value));
        numberInput.addEventListener('input', () => applyVolumeFromUI(numberInput.value));
      }

      const rebindBtn = shadow.querySelector('#kt-rebind-btn');
      rebindBtn.addEventListener('click', () => {
        if (this.capturingHotkey) return;
        this.capturingHotkey = true;
        rebindBtn.classList.add('capturing');
        rebindBtn.textContent = t(lang, 'hotkeyWaiting');

        const captureHandler = (e) => {
          e.preventDefault();
          e.stopPropagation();
          persist({ hotkey: { key: e.key, code: e.code } });
          window.removeEventListener('keydown', captureHandler, true);
          this.capturingHotkey = false;
          this.render();
        };
        window.addEventListener('keydown', captureHandler, true);
      });
    },

    /**
     * Keeps the slider/number inputs in sync with the actual video.
     * Reads the live <video> element directly rather than trusting only
     * the `volumechange` event — some players adjust audio through a
     * separate gain node instead of the element's native volume, in
     * which case that event never fires and `settings.volume` would
     * silently go stale. Skips updating while the user has a finger on
     * either control, so it never fights a drag or an in-progress type.
     */
    syncVolumeControls() {
      if (!this.shadow) return;
      const slider = this.shadow.querySelector('.kt-slider');
      const numberInput = this.shadow.querySelector('.kt-number');
      if (!slider || !numberInput) return;

      const active = this.shadow.activeElement;
      if (active === slider || active === numberInput) return;

      const video = PlayerSync.findMainVideo();
      const fraction = video ? (video.muted ? 0 : video.volume) : settings.volume;
      const percent = String(Math.round(fraction * 100));
      if (slider.value !== percent) slider.value = percent;
      if (numberInput.value !== percent) numberInput.value = percent;
    },

    /** Starts a lightweight poll that keeps the volume controls live while the panel is visible; stops the moment it's closed. */
    startVolumePolling() {
      if (this.volumePollHandle) return;
      this.syncVolumeControls();
      this.volumePollHandle = setInterval(() => this.syncVolumeControls(), 400);
    },
    stopVolumePolling() {
      if (!this.volumePollHandle) return;
      clearInterval(this.volumePollHandle);
      this.volumePollHandle = null;
    },

    open() {
      this.isOpen = true;
      this.host.setAttribute('data-open', 'true');
      this.startVolumePolling();
    },
    close() {
      this.isOpen = false;
      this.host.setAttribute('data-open', 'false');
      this.stopVolumePolling();
    },
    toggle() {
      if (this.isOpen) this.close();
      else this.open();
    },
  };

  function describeHotkey(hotkey) {
    if (!hotkey) return CONFIG.DEFAULT_HOTKEY.key;
    return hotkey.key && hotkey.key.length === 1 ? hotkey.key.toUpperCase() : hotkey.key || hotkey.code;
  }

  /* ============================================================
   *  HOTKEY — global listener that opens/closes the panel
   * ========================================================== */
  function setupHotkeyListener() {
    window.addEventListener('keydown', (e) => {
      // Ignore keystrokes while the user is typing in an input/textarea
      // on the actual page (e.g. chat box) to avoid accidental toggles,
      // unless the configured hotkey is a function key (F1-F12), which
      // rarely conflicts with typing.
      const target = e.target;
      const isTyping =
        target &&
        (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable);
      const isFunctionKey = /^F\d{1,2}$/.test(settings.hotkey.code || '');

      if (isTyping && !isFunctionKey) return;

      const matches =
        e.code === settings.hotkey.code || e.key === settings.hotkey.key;
      if (matches) {
        e.preventDefault();
        GUI.toggle();
      }
    });
  }

  /* ============================================================
   *  INIT
   * ========================================================== */
  function init() {
    try {
      GUI.build();
      setupHotkeyListener();
      PlayerSync.init();

      log('Initialized.');
    } catch (err) {
      console.error(CONFIG.LOG_PREFIX, 'Initialization failed:', err);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
