![image](https://github.com/ebayybe/kick-stream-tweaks/blob/4fa72c6ef1f40e3522b2508ec9b4c98ae728aac2/Photo/Kick%20stream%20tweaks%20preview%20.png)
<a id="top"></a>
<div align="center">

<a href="#top"><b>English</b></a> ·
<a href="#lang-ru">🇷🇺 Русский</a> ·
<a href="#lang-uk">🇺🇦 Українська</a> ·
<a href="#lang-de">🇩🇪 Deutsch</a> ·
<a href="#lang-zh">🇨🇳 中文</a> ·
<a href="#lang-ja">🇯🇵 日本語</a> ·
<a href="#lang-fr">🇫🇷 Français</a> ·
<a href="#lang-es">🇪🇸 Español</a> ·
<a href="#lang-it">🇮🇹 Italiano</a> ·
<a href="#lang-pt">🇧🇷 Português</a> ·
<a href="#lang-pl">🇵🇱 Polski</a> ·
<a href="#lang-tr">🇹🇷 Türkçe</a>

</div>

<br />

<div align="center">
  <img src="assets/preview.png" width="100%" alt="Kick Stream Tweaks" />
</div>

<br />

<div align="center">
  <h1>Kick Stream Tweaks</h1>
  <p>Quality and volume that actually stick, plus a control panel Kick should have shipped with.</p>

  <p>
    <img src="https://img.shields.io/badge/version-1.1.0-53fc18?style=flat-square" alt="Version 1.1.0" />
    <img src="https://img.shields.io/badge/license-MIT-blue?style=flat-square" alt="MIT License" />
    <img src="https://img.shields.io/badge/Tampermonkey-compatible-53fc18?style=flat-square" alt="Tampermonkey compatible" />
    <img src="https://img.shields.io/badge/Violentmonkey-compatible-53fc18?style=flat-square" alt="Violentmonkey compatible" />
  </p>

  <p>
    <a href="https://raw.githubusercontent.com/ebayybe/kick-stream-tweaks/main/kick-stream-tweaks.user.js"><img src="https://img.shields.io/badge/Install-Userscript-53fc18?style=for-the-badge&logo=tampermonkey&logoColor=white" alt="Install the userscript" /></a>
  </p>
</div>

<br />

Every time you reload a Kick stream, the player forgets what quality you picked and, occasionally, what volume you had it at. This script fixes both, and throws in a proper settings panel while it's at it.

<p align="center">
  <a href="https://github.com/ebayybe/kick-stream-tweaks/blob/main/Photo/Screenshot%20light%20.png">
    <img src="assets/screenshot-light.png" width="47%" alt="Kick Stream Tweaks — light theme" />
  </a>
  &nbsp;&nbsp;
  <a href="https://github.com/ebayybe/kick-stream-tweaks/blob/main/Photo/Screenshot%20dark.png">
    <img src="assets/screenshot-dark.png" width="47%" alt="Kick Stream Tweaks — dark theme" />
  </a>
</p>

## What it does

- **Remembers your quality.** Pick 1080p60 once, and every stream and VOD after that loads at 1080p60 — no more re-selecting it after every refresh or channel switch.
- **Remembers your volume.** Same idea, but for volume and mute state. Includes a slider and a numeric input if you'd rather type an exact percentage.
- **One settings panel, one hotkey.** Press <kbd>F2</kbd> (or rebind it to whatever you like) to open a small control panel over the player.
- **Auto-detects your manual choices.** Change quality or volume directly in Kick's own player and the script picks it up — you don't have to touch the panel at all if you don't want to.
- **Light and dark themes**, matching whichever mood your stream tab is in.
- **26 interface languages**, each with an actual vector flag icon in the language picker — not an emoji that turns into "US" and "DE" on Windows.
- Nothing phones home. Every setting lives in your browser's `localStorage`. No accounts, no analytics, no external requests.

## Installing

You'll need a userscript manager first — [Tampermonkey](https://www.tampermonkey.net/) or [Violentmonkey](https://violentmonkey.github.io/) both work fine.

1. Install one of the extensions above if you don't already have it.
2. Click **[Install the userscript](https://raw.githubusercontent.com/ebayybe/kick-stream-tweaks/main/kick-stream-tweaks.user.js)** above — your userscript manager will open its install prompt automatically.
3. Confirm the install, then head to any [kick.com](https://kick.com) stream.

That's it. There's nothing to configure to get quality/volume persistence working — it's on by default.

## Using it

Open any stream and press <kbd>F2</kbd>. That's the whole shortcut to learn.

| Setting | What it does |
|---|---|
| **Auto-apply saved quality** | Turn off if you'd rather the script leave quality alone entirely. |
| **Preferred quality** | Leave on `Auto` to always use whatever you last picked manually, or pin a specific quality so it's always forced regardless of what you picked last. |
| **Auto-apply saved volume** | Same toggle, for volume. |
| **Preferred volume** | Slider + numeric field, 0–100%. Drag it and the current stream's volume updates live. |
| **Theme** | Light or dark, your call. |
| **Language** | 26 languages, searchable by flag if that's easier than reading. |
| **Menu hotkey** | Click "Click to rebind," then press whatever key combo you want instead of F2. |

## How the persistence actually works

Kick's player doesn't expose a public API for quality selection, so the script simulates the same clicks you would make — opening the settings menu and picking the matching option — the first time a new stream loads. After that it leaves the player alone until you navigate to a different stream. If you change quality by hand at any point, that gets remembered too.

If Kick ships a redesign that breaks this, it'll fail quietly and log what happened to the console under a `[KickTweaks]` prefix rather than doing anything unexpected to the player. Selector definitions live in one place near the top of the script if you want to patch it yourself while a fix is pending.

## Contributing

Issues and pull requests are welcome. If something breaks after a Kick update, the most useful thing you can include in a bug report is the console output (look for lines starting with `[KickTweaks]`) and, ideally, a description of what Kick's settings menu looks like now.

## License

[MIT](LICENSE) — do what you want with it.

<br />

<div align="center">
<sub>Not affiliated with Kick.com. Just a userscript that talks to the page you're already on.</sub>
</div>


---

<div align="center"><sub>Prefer reading in another language? Pick one above — each section is fully translated, not machine-summarized.</sub></div>

---

<a name="lang-ru"></a>
<details>
<summary><b>🇷🇺 Русский</b></summary>
<div id="lang-ru">

При каждой перезагрузке стрима на Kick плеер забывает выбранное вами качество, а иногда и громкость. Этот скрипт чинит обе проблемы и заодно добавляет нормальную панель настроек.

## Что он делает

- **Запоминает качество.** Выберите 1080p60 один раз — и каждый следующий стрим или VOD будет открываться именно в этом качестве, без повторного выбора после каждого обновления страницы или переключения канала.
- **Запоминает громкость.** То же самое, но для громкости и состояния "без звука". Есть ползунок и поле для ввода точного процента.
- **Одна панель, одна горячая клавиша.** Нажмите <kbd>F2</kbd> (или назначьте свою клавишу), чтобы открыть небольшую панель управления поверх плеера.
- **Сам определяет ручные изменения.** Смените качество или громкость прямо в плеере Kick — скрипт это заметит. Трогать панель необязательно, если не хочется.
- **Светлая и тёмная темы** — под настроение вкладки со стримом.
- **26 языков интерфейса**, и у каждого — настоящая векторная иконка флага в выборе языка, а не эмодзи, превращающееся в буквы "US" и "DE" на Windows.
- Никуда ничего не отправляется. Все настройки хранятся в `localStorage` браузера. Без аккаунтов, аналитики и внешних запросов.

## Установка

Сначала понадобится менеджер юзерскриптов — подойдёт [Tampermonkey](https://www.tampermonkey.net/) или [Violentmonkey](https://violentmonkey.github.io/).

1. Установите одно из расширений выше, если ещё не установлено.
2. Нажмите **[Install the userscript](https://raw.githubusercontent.com/ebayybe/kick-stream-tweaks/main/kick-stream-tweaks.user.js)** выше — менеджер юзерскриптов сам откроет окно установки.
3. Подтвердите установку и откройте любой стрим на [kick.com](https://kick.com).

Готово. Ничего дополнительно настраивать не нужно — сохранение качества и громкости работает сразу.

## Как пользоваться

Откройте любой стрим и нажмите <kbd>F2</kbd>. Это всё, что нужно запомнить.

| Настройка | Что делает |
|---|---|
| **Автоприменение качества** | Отключите, если хотите, чтобы скрипт вообще не трогал качество. |
| **Предпочитаемое качество** | Оставьте `Авто`, чтобы всегда использовалось последнее выбранное вручную качество, либо зафиксируйте конкретное значение — тогда оно будет применяться всегда. |
| **Автоприменение громкости** | Тот же переключатель, но для громкости. |
| **Предпочитаемая громкость** | Ползунок и поле ввода, 0–100%. Двигаете — громкость текущего стрима меняется сразу. |
| **Тема** | Светлая или тёмная — как удобнее. |
| **Язык** | 26 языков, по флагу искать проще, чем по названию. |
| **Горячая клавиша меню** | Нажмите «Нажмите, чтобы изменить», затем — нужное сочетание клавиш вместо F2. |

## Как это работает технически

У плеера Kick нет публичного API для выбора качества, поэтому скрипт при первой загрузке нового стрима имитирует те же клики, что сделали бы вы сами — открывает меню настроек и выбирает нужный пункт. После этого он не трогает плеер, пока вы не перейдёте на другой стрим. Если вы в любой момент смените качество вручную, это тоже запомнится.

Если Kick выпустит редизайн, который это сломает, скрипт молча остановится и запишет, что произошло, в консоль с префиксом `[KickTweaks]`, вместо того чтобы делать с плеером что-то непредсказуемое. Все селекторы вынесены в одно место в начале файла — если понадобится починить самостоятельно до выхода официального исправления.

## Участие в разработке

Issues и pull request'ы приветствуются. Если что-то сломалось после обновления Kick, самое полезное, что можно приложить к багрепорту — вывод консоли (строки с `[KickTweaks]`) и, желательно, описание того, как теперь выглядит меню настроек Kick.

## Лицензия

[MIT](LICENSE) — используйте как хотите.

<br />

<div align="center">
<sub>Не связано с Kick.com. Просто юзерскрипт, который работает со страницей, которую вы уже открыли.</sub>
</div>

</div>
</details>

<a name="lang-uk"></a>
<details>
<summary><b>🇺🇦 Українська</b></summary>
<div id="lang-uk">

Щоразу після перезавантаження стріму на Kick плеєр забуває обрану вами якість, а іноді й гучність. Цей скрипт виправляє обидві проблеми і заразом додає нормальну панель налаштувань.

## Що він робить

- **Запам'ятовує якість.** Оберіть 1080p60 один раз — і кожен наступний стрім чи VOD відкриватиметься саме в цій якості, без повторного вибору після кожного оновлення сторінки чи перемикання каналу.
- **Запам'ятовує гучність.** Те саме, але для гучності та стану "без звуку". Є повзунок і поле для введення точного відсотка.
- **Одна панель, одна гаряча клавіша.** Натисніть <kbd>F2</kbd> (або призначте свою клавішу), щоб відкрити невелику панель керування поверх плеєра.
- **Сам розпізнає ручні зміни.** Змініть якість чи гучність прямо в плеєрі Kick — скрипт це помітить. Панель можна взагалі не чіпати, якщо не хочеться.
- **Світла та темна теми** — під настрій вкладки зі стрімом.
- **26 мов інтерфейсу**, і в кожної — справжня векторна іконка прапора у виборі мови, а не емодзі, що перетворюється на літери "US" та "DE" у Windows.
- Нікуди нічого не надсилається. Усі налаштування зберігаються в `localStorage` браузера. Без акаунтів, аналітики та зовнішніх запитів.

## Встановлення

Спочатку знадобиться менеджер юзерскриптів — підійде [Tampermonkey](https://www.tampermonkey.net/) або [Violentmonkey](https://violentmonkey.github.io/).

1. Встановіть одне з розширень вище, якщо ще не встановлено.
2. Натисніть **[Install the userscript](https://raw.githubusercontent.com/ebayybe/kick-stream-tweaks/main/kick-stream-tweaks.user.js)** вище — менеджер юзерскриптів сам відкриє вікно встановлення.
3. Підтвердіть встановлення та відкрийте будь-який стрім на [kick.com](https://kick.com).

Готово. Нічого додатково налаштовувати не потрібно — збереження якості й гучності працює одразу.

## Як користуватися

Відкрийте будь-який стрім і натисніть <kbd>F2</kbd>. Це все, що потрібно запам'ятати.

| Налаштування | Що робить |
|---|---|
| **Автозастосування якості** | Вимкніть, якщо хочете, щоб скрипт узагалі не чіпав якість. |
| **Бажана якість** | Залиште `Авто`, щоб завжди використовувалась остання обрана вручну якість, або зафіксуйте конкретне значення — тоді воно застосовуватиметься завжди. |
| **Автозастосування гучності** | Той самий перемикач, але для гучності. |
| **Бажана гучність** | Повзунок і поле введення, 0–100%. Рухаєте — гучність поточного стріму змінюється одразу. |
| **Тема** | Світла чи темна — як зручніше. |
| **Мова** | 26 мов, за прапором шукати простіше, ніж за назвою. |
| **Гаряча клавіша меню** | Натисніть «Натисніть, щоб змінити», потім — потрібне поєднання клавіш замість F2. |

## Як це працює технічно

У плеєра Kick немає публічного API для вибору якості, тому скрипт під час першого завантаження нового стріму імітує ті самі кліки, що зробили б ви — відкриває меню налаштувань і обирає потрібний пункт. Після цього він не чіпає плеєр, доки ви не перейдете на інший стрім. Якщо ви в будь-який момент зміните якість вручну, це теж запам'ятається.

Якщо Kick випустить редизайн, який це зламає, скрипт мовчки зупиниться і запише, що сталося, у консоль із префіксом `[KickTweaks]`, замість того щоб робити з плеєром щось непередбачуване. Усі селектори винесені в одне місце на початку файлу — якщо знадобиться полагодити самостійно до виходу офіційного виправлення.

## Участь у розробці

Issues та pull request'и вітаються. Якщо щось зламалося після оновлення Kick, найкорисніше, що можна додати до багрепорту — вивід консолі (рядки з `[KickTweaks]`) і, бажано, опис того, як тепер виглядає меню налаштувань Kick.

## Ліцензія

[MIT](LICENSE) — використовуйте як завгодно.

<br />

<div align="center">
<sub>Не пов'язано з Kick.com. Просто юзерскрипт, який працює зі сторінкою, яку ви вже відкрили.</sub>
</div>

</div>
</details>

<a name="lang-de"></a>
<details>
<summary><b>🇩🇪 Deutsch</b></summary>
<div id="lang-de">

Bei jedem Neuladen eines Kick-Streams vergisst der Player, welche Qualität ihr eingestellt hattet – und gelegentlich auch die Lautstärke. Dieses Script behebt beides und bringt gleich noch ein vernünftiges Einstellungspanel mit.

## Was es macht

- **Merkt sich die Qualität.** Einmal 1080p60 auswählen, und jeder folgende Stream und jedes VOD startet damit – kein erneutes Auswählen nach jedem Neuladen oder Kanalwechsel mehr.
- **Merkt sich die Lautstärke.** Gleiches Prinzip, nur für Lautstärke und Stummschaltung. Mit Schieberegler und Zahlenfeld für einen exakten Prozentwert.
- **Ein Panel, eine Taste.** <kbd>F2</kbd> drücken (oder eine andere Taste zuweisen) öffnet ein kleines Kontrollpanel über dem Player.
- **Erkennt manuelle Änderungen automatisch.** Qualität oder Lautstärke direkt im Kick-Player ändern, und das Script übernimmt es – das Panel muss man dafür gar nicht anfassen.
- **Helles und dunkles Theme**, je nachdem, wie der Stream-Tab gerade gestimmt ist.
- **26 Sprachen für die Oberfläche**, jede mit einem echten Vektor-Flaggensymbol in der Sprachauswahl – kein Emoji, das unter Windows zu "US" und "DE" wird.
- Nichts wird irgendwohin gesendet. Alle Einstellungen liegen im `localStorage` des Browsers. Keine Konten, keine Analytics, keine externen Anfragen.

## Installation

Zunächst braucht ihr einen Userscript-Manager – [Tampermonkey](https://www.tampermonkey.net/) oder [Violentmonkey](https://violentmonkey.github.io/) funktionieren beide problemlos.

1. Eine der beiden Erweiterungen installieren, falls noch nicht vorhanden.
2. Oben auf **[Install the userscript](https://raw.githubusercontent.com/ebayybe/kick-stream-tweaks/main/kick-stream-tweaks.user.js)** klicken – der Userscript-Manager öffnet automatisch den Installationsdialog.
3. Installation bestätigen und einen beliebigen Stream auf [kick.com](https://kick.com) öffnen.

Das war's. Für die Qualitäts- und Lautstärke-Persistenz muss nichts weiter konfiguriert werden – sie ist standardmäßig aktiv.

## Verwendung

Einen Stream öffnen und <kbd>F2</kbd> drücken. Mehr muss man sich nicht merken.

| Einstellung | Was sie macht |
|---|---|
| **Gespeicherte Qualität automatisch anwenden** | Ausschalten, wenn das Script die Qualität komplett in Ruhe lassen soll. |
| **Bevorzugte Qualität** | Bei `Auto` wird immer die zuletzt manuell gewählte Qualität verwendet, oder eine feste Qualität festlegen, die dann immer erzwungen wird. |
| **Gespeicherte Lautstärke automatisch anwenden** | Derselbe Schalter, nur für die Lautstärke. |
| **Bevorzugte Lautstärke** | Schieberegler und Zahlenfeld, 0–100 %. Beim Ziehen ändert sich die Lautstärke des aktuellen Streams sofort mit. |
| **Theme** | Hell oder dunkel, ganz nach Geschmack. |
| **Sprache** | 26 Sprachen, per Flagge schneller zu finden als über den Namen. |
| **Menü-Tastenkürzel** | Auf "Klicken zum Ändern" klicken, dann die gewünschte Tastenkombination statt F2 drücken. |

## Wie die Persistenz technisch funktioniert

Kicks Player bietet keine öffentliche API zur Qualitätsauswahl, daher simuliert das Script beim ersten Laden eines neuen Streams genau die Klicks, die man selbst machen würde – Einstellungsmenü öffnen, passende Option auswählen. Danach lässt es den Player in Ruhe, bis ihr zu einem anderen Stream wechselt. Ändert ihr die Qualität zwischendurch manuell, wird auch das gemerkt.

Sollte ein Kick-Redesign das mal kaputt machen, bricht das Script still ab und protokolliert, was passiert ist, in der Konsole mit dem Präfix `[KickTweaks]` – statt irgendetwas Unerwartetes mit dem Player anzustellen. Die Selektoren liegen alle an einer Stelle am Anfang der Datei, falls man selbst nachbessern möchte, bevor ein offizieller Fix kommt.

## Mitwirken

Issues und Pull Requests sind willkommen. Wenn nach einem Kick-Update etwas kaputtgeht, ist das Nützlichste, was man einem Bugreport beilegen kann, die Konsolenausgabe (Zeilen mit `[KickTweaks]`) und idealerweise eine Beschreibung, wie das Kick-Einstellungsmenü inzwischen aussieht.

## Lizenz

[MIT](LICENSE) — damit könnt ihr machen, was ihr wollt.

<br />

<div align="center">
<sub>Nicht mit Kick.com verbunden. Nur ein Userscript, das mit der Seite spricht, die ihr sowieso schon geöffnet habt.</sub>
</div>

</div>
</details>

<a name="lang-zh"></a>
<details>
<summary><b>🇨🇳 中文</b></summary>
<div id="lang-zh">

每次刷新 Kick 直播间，播放器都会忘记你之前选的画质，有时连音量也一起忘了。这个脚本把这两个问题都解决了，顺带还加上了一个像样的设置面板。

## 功能

- **记住画质。** 选一次 1080p60，之后每个直播间和 VOD 都会自动用这个画质打开，不用每次刷新或换台都重新选一遍。
- **记住音量。** 音量和静音状态同理。附带滑块和数字输入框，方便直接输入精确的百分比。
- **一个面板，一个快捷键。** 按 <kbd>F2</kbd>（或改绑成任意按键）即可在播放器上方打开一个小巧的控制面板。
- **自动识别手动修改。** 直接在 Kick 播放器里改画质或音量，脚本会自动记下来——如果不想用面板，完全可以不碰它。
- **浅色和深色主题**，看直播的心情决定。
- **界面支持 26 种语言**，语言选择器里配的是真正的矢量国旗图标，而不是在 Windows 上会变成 "US"、"DE" 字母的 emoji。
- 不联网上报任何东西。所有设置都存在浏览器的 `localStorage` 里,没有账号、没有统计、没有外部请求。

## 安装

需要先装一个用户脚本管理器——[Tampermonkey](https://www.tampermonkey.net/) 或 [Violentmonkey](https://violentmonkey.github.io/) 都可以。

1. 如果还没装,先装上面任意一个扩展。
2. 点击上方 **[Install the userscript](https://raw.githubusercontent.com/ebayybe/kick-stream-tweaks/main/kick-stream-tweaks.user.js)**,脚本管理器会自动弹出安装提示。
3. 确认安装,然后打开 [kick.com](https://kick.com) 上的任意直播间。

就这么简单。画质和音量的记忆功能默认开启,不需要额外配置。

## 使用方法

打开任意直播间,按 <kbd>F2</kbd>。要记住的就这一件事。

| 设置项 | 作用 |
|---|---|
| **自动应用已保存的画质** | 关闭后脚本完全不会干预画质。 |
| **首选画质** | 保持 `自动` 会一直使用你上次手动选的画质;也可以固定成某个具体画质,之后每次都强制使用它。 |
| **自动应用已保存的音量** | 同样的开关,针对音量。 |
| **首选音量** | 滑块 + 数字输入框,0–100%。拖动时当前直播间的音量会实时跟着变化。 |
| **主题** | 浅色或深色,随你喜欢。 |
| **语言** | 26 种语言,靠国旗找比认名字快。 |
| **菜单快捷键** | 点击"点击以更改",然后按下你想用来代替 F2 的按键组合。 |

## 记忆功能的实现原理

Kick 的播放器没有公开的画质切换 API,所以脚本会在每个新直播间第一次加载时,模拟你自己会做的操作——打开设置菜单、点击对应的画质选项。之后只要你不切换到别的直播间,脚本就不会再碰播放器。如果你中途手动改了画质,这个改动也会被记住。

如果 Kick 改版导致这套逻辑失效,脚本会默默停手,并在控制台里以 `[KickTweaks]` 为前缀记录发生的情况,而不会对播放器做出任何意料之外的操作。所有的选择器都集中写在脚本开头,方便你在官方修复出来之前自己动手改。

## 参与贡献

欢迎提 Issue 和 Pull Request。如果 Kick 更新后脚本出了问题,提交 bug 报告时最有用的信息是控制台输出(找 `[KickTweaks]` 开头的那些行),如果能顺便描述一下 Kick 设置菜单现在长什么样就更好了。

## 许可证

[MIT](LICENSE) — 随便怎么用。

<br />

<div align="center">
<sub>与 Kick.com 无关联,只是一个和你正打开的页面对话的用户脚本。</sub>
</div>

</div>
</details>

<a name="lang-ja"></a>
<details>
<summary><b>🇯🇵 日本語</b></summary>
<div id="lang-ja">

Kick の配信をリロードするたびに、プレイヤーは選んでいた画質を忘れてしまい、時には音量まで忘れることがあります。このスクリプトはその両方を解決し、ついでにまともな設定パネルも追加します。

## できること

- **画質を記憶する。** 一度 1080p60 を選べば、以降どの配信・VOD もその画質で再生されます。リロードやチャンネル切り替えのたびに選び直す必要はありません。
- **音量を記憶する。** 音量とミュート状態も同様です。スライダーと数値入力欄があるので、正確なパーセンテージを入力することもできます。
- **パネルもホットキーも1つだけ。** <kbd>F2</kbd>(好きなキーに変更可能)を押すとプレイヤーの上に小さなコントロールパネルが開きます。
- **手動での変更も自動検出。** Kick 本体のプレイヤーで直接画質や音量を変えても、スクリプトがそれを検知します。パネルを一切触らなくても構いません。
- **ライトテーマとダークテーマ**、配信タブの気分に合わせて。
- **26 言語のインターフェース**、それぞれに本物のベクター国旗アイコン付き。Windows で「US」「DE」の文字に化ける絵文字ではありません。
- どこにも送信されません。設定はすべてブラウザの `localStorage` に保存されます。アカウント登録も分析も外部通信もありません。

## インストール

まずユーザースクリプトマネージャーが必要です。[Tampermonkey](https://www.tampermonkey.net/) と [Violentmonkey](https://violentmonkey.github.io/) のどちらでも動作します。

1. 上記の拡張機能のどちらかをまだ入れていなければインストールします。
2. 上の **[Install the userscript](https://raw.githubusercontent.com/ebayybe/kick-stream-tweaks/main/kick-stream-tweaks.user.js)** をクリックすると、ユーザースクリプトマネージャーのインストール画面が自動的に開きます。
3. インストールを確定し、[kick.com](https://kick.com) の好きな配信を開きます。

これだけです。画質・音量の記憶機能は最初から有効なので、特に設定は必要ありません。

## 使い方

好きな配信を開いて <kbd>F2</kbd> を押すだけです。覚えることはそれだけです。

| 設定項目 | 内容 |
|---|---|
| **保存した画質を自動適用** | スクリプトに画質を一切触らせたくない場合はオフにします。 |
| **優先画質** | `自動` のままなら最後に手動で選んだ画質を常に使用し、特定の画質を固定すれば常にそれが強制されます。 |
| **保存した音量を自動適用** | 音量版の同じ切り替えです。 |
| **優先音量** | スライダーと数値入力、0〜100%。動かすと現在の配信の音量がリアルタイムで変わります。 |
| **テーマ** | ライトかダークか、お好みで。 |
| **言語** | 26 言語。名前より国旗のほうが探しやすいはずです。 |
| **メニューのホットキー** | 「クリックして変更」を押してから、F2 の代わりに使いたいキーを押します。 |

## 記憶機能の仕組み

Kick のプレイヤーには画質選択用の公開 API がないため、このスクリプトは新しい配信が最初に読み込まれたタイミングで、あなた自身が行うのと同じ操作――設定メニューを開いて該当のオプションを選ぶ――をシミュレートします。それ以降は、別の配信に移動するまでプレイヤーには一切触れません。途中で手動で画質を変更した場合も、その内容は記憶されます。

もし Kick のリデザインでこの仕組みが壊れた場合、スクリプトは静かに処理を止め、コンソールに `[KickTweaks]` というプレフィックス付きで状況を記録します。プレイヤーに対して予期しない動作をすることはありません。セレクターの定義はすべてファイル冒頭の1箇所にまとまっているので、公式の修正を待つ間に自分で直したい場合にも対応しやすくなっています。

## 貢献について

Issue や Pull Request はいつでも歓迎します。Kick のアップデート後に何か壊れた場合、バグレポートに含めると特に役立つのはコンソールの出力(`[KickTweaks]` で始まる行)と、できれば現在の Kick の設定メニューがどう見えるかの説明です。

## ライセンス

[MIT](LICENSE) — 自由に使ってください。

<br />

<div align="center">
<sub>Kick.com とは無関係です。すでに開いているページとやり取りするだけのユーザースクリプトです。</sub>
</div>

</div>
</details>

<a name="lang-fr"></a>
<details>
<summary><b>🇫🇷 Français</b></summary>
<div id="lang-fr">

À chaque rechargement d'un stream Kick, le lecteur oublie la qualité que vous aviez choisie, et parfois même le volume. Ce script corrige les deux, et ajoute au passage un vrai panneau de réglages.

## Ce qu'il fait

- **Se souvient de la qualité.** Choisissez 1080p60 une fois, et chaque stream ou VOD suivant se lancera dans cette qualité — plus besoin de la resélectionner à chaque rechargement ou changement de chaîne.
- **Se souvient du volume.** Même principe, pour le volume et l'état muet. Un curseur et un champ numérique permettent de saisir un pourcentage exact.
- **Un seul panneau, un seul raccourci.** Appuyez sur <kbd>F2</kbd> (ou réattribuez la touche de votre choix) pour ouvrir un petit panneau de contrôle par-dessus le lecteur.
- **Détecte automatiquement vos choix manuels.** Changez la qualité ou le volume directement dans le lecteur de Kick, et le script s'en souviendra — inutile de toucher au panneau si vous ne le souhaitez pas.
- **Thèmes clair et sombre**, selon l'humeur de votre onglet de stream.
- **26 langues d'interface**, chacune avec une véritable icône de drapeau vectorielle — pas un emoji qui se transforme en lettres "US" et "DE" sous Windows.
- Rien n'est envoyé nulle part. Tous les réglages vivent dans le `localStorage` du navigateur. Pas de compte, pas d'analytique, pas de requêtes externes.

## Installation

Il vous faudra d'abord un gestionnaire de scripts utilisateur — [Tampermonkey](https://www.tampermonkey.net/) ou [Violentmonkey](https://violentmonkey.github.io/) fonctionnent très bien tous les deux.

1. Installez l'une des deux extensions ci-dessus si ce n'est pas déjà fait.
2. Cliquez sur **[Install the userscript](https://raw.githubusercontent.com/ebayybe/kick-stream-tweaks/main/kick-stream-tweaks.user.js)** ci-dessus — votre gestionnaire de scripts ouvrira automatiquement sa fenêtre d'installation.
3. Confirmez l'installation, puis rendez-vous sur n'importe quel stream de [kick.com](https://kick.com).

Et voilà. Rien à configurer pour que la persistance de la qualité et du volume fonctionne — c'est activé par défaut.

## Utilisation

Ouvrez un stream et appuyez sur <kbd>F2</kbd>. C'est le seul raccourci à retenir.

| Réglage | Ce qu'il fait |
|---|---|
| **Appliquer automatiquement la qualité enregistrée** | À désactiver si vous préférez que le script ne touche jamais à la qualité. |
| **Qualité préférée** | Laissez sur `Auto` pour toujours utiliser la dernière qualité choisie manuellement, ou fixez une qualité précise pour qu'elle soit toujours forcée. |
| **Appliquer automatiquement le volume enregistré** | Le même interrupteur, pour le volume. |
| **Volume préféré** | Curseur et champ numérique, de 0 à 100 %. En le déplaçant, le volume du stream en cours change immédiatement. |
| **Thème** | Clair ou sombre, à vous de choisir. |
| **Langue** | 26 langues, plus rapides à repérer par leur drapeau que par leur nom. |
| **Raccourci du menu** | Cliquez sur « Cliquez pour modifier », puis appuyez sur la combinaison de touches voulue à la place de F2. |

## Comment fonctionne la persistance en coulisses

Le lecteur de Kick n'expose aucune API publique pour la sélection de la qualité, donc le script simule les mêmes clics que vous feriez vous-même — ouvrir le menu des réglages et choisir l'option correspondante — au premier chargement d'un nouveau stream. Ensuite, il laisse le lecteur tranquille jusqu'à ce que vous changiez de stream. Si vous modifiez la qualité manuellement à un moment donné, cela sera également mémorisé.

Si une refonte de Kick venait à casser ce mécanisme, le script s'arrêtera silencieusement et consignera ce qui s'est passé dans la console, sous le préfixe `[KickTweaks]`, plutôt que de faire quoi que ce soit d'imprévu sur le lecteur. Les sélecteurs sont tous regroupés au même endroit, en haut du fichier, si vous souhaitez corriger vous-même en attendant un correctif officiel.

## Contribuer

Les issues et pull requests sont les bienvenues. Si quelque chose casse après une mise à jour de Kick, le plus utile à joindre à un rapport de bug est la sortie de la console (les lignes commençant par `[KickTweaks]`) et, idéalement, une description de l'apparence actuelle du menu de réglages de Kick.

## Licence

[MIT](LICENSE) — faites-en ce que vous voulez.

<br />

<div align="center">
<sub>Aucun lien avec Kick.com. Juste un script utilisateur qui dialogue avec la page que vous avez déjà ouverte.</sub>
</div>

</div>
</details>

<a name="lang-es"></a>
<details>
<summary><b>🇪🇸 Español</b></summary>
<div id="lang-es">

Cada vez que recargas un stream en Kick, el reproductor olvida la calidad que habías elegido y, a veces, también el volumen. Este script arregla ambas cosas y de paso añade un panel de ajustes como Dios manda.

## Qué hace

- **Recuerda la calidad.** Elige 1080p60 una vez, y todos los streams y VODs siguientes se cargarán en esa calidad — nada de volver a seleccionarla tras cada recarga o cambio de canal.
- **Recuerda el volumen.** Misma idea, pero para el volumen y el estado de silencio. Incluye un control deslizante y un campo numérico por si prefieres escribir un porcentaje exacto.
- **Un panel, un atajo.** Pulsa <kbd>F2</kbd> (o reasigna la tecla que prefieras) para abrir un pequeño panel de control sobre el reproductor.
- **Detecta tus cambios manuales.** Cambia la calidad o el volumen directamente en el reproductor de Kick y el script lo captará — no hace falta tocar el panel si no quieres.
- **Temas claro y oscuro**, según el humor de tu pestaña de stream.
- **26 idiomas de interfaz**, cada uno con un icono de bandera vectorial real, no un emoji que en Windows se convierte en las letras "US" y "DE".
- No se envía nada a ningún sitio. Todos los ajustes viven en el `localStorage` del navegador. Sin cuentas, sin analíticas, sin peticiones externas.

## Instalación

Primero necesitarás un gestor de userscripts — tanto [Tampermonkey](https://www.tampermonkey.net/) como [Violentmonkey](https://violentmonkey.github.io/) funcionan bien.

1. Instala una de las dos extensiones anteriores si aún no la tienes.
2. Haz clic en **[Install the userscript](https://raw.githubusercontent.com/ebayybe/kick-stream-tweaks/main/kick-stream-tweaks.user.js)** de arriba — tu gestor de userscripts abrirá automáticamente el diálogo de instalación.
3. Confirma la instalación y entra en cualquier stream de [kick.com](https://kick.com).

Y ya está. No hay que configurar nada para que funcione la persistencia de calidad y volumen — viene activada por defecto.

## Cómo usarlo

Abre cualquier stream y pulsa <kbd>F2</kbd>. Ese es todo el atajo que hay que recordar.

| Ajuste | Qué hace |
|---|---|
| **Aplicar calidad guardada automáticamente** | Desactívalo si prefieres que el script no toque la calidad en absoluto. |
| **Calidad preferida** | Déjalo en `Auto` para usar siempre la última calidad elegida a mano, o fija una calidad concreta para que se aplique siempre. |
| **Aplicar volumen guardado automáticamente** | El mismo interruptor, para el volumen. |
| **Volumen preferido** | Control deslizante y campo numérico, de 0 a 100%. Al moverlo, el volumen del stream actual cambia al instante. |
| **Tema** | Claro u oscuro, como prefieras. |
| **Idioma** | 26 idiomas, más rápidos de encontrar por la bandera que por el nombre. |
| **Atajo del menú** | Haz clic en "Haz clic para cambiar" y luego pulsa la combinación de teclas que quieras usar en lugar de F2. |

## Cómo funciona la persistencia por dentro

El reproductor de Kick no expone ninguna API pública para elegir la calidad, así que el script simula los mismos clics que harías tú — abrir el menú de ajustes y elegir la opción correspondiente — la primera vez que carga un stream nuevo. A partir de ahí, no vuelve a tocar el reproductor hasta que cambies a otro stream. Si en algún momento cambias la calidad a mano, eso también se recuerda.

Si Kick saca un rediseño que rompe esto, el script se detendrá silenciosamente y dejará constancia de lo ocurrido en la consola con el prefijo `[KickTweaks]`, en lugar de hacer algo inesperado con el reproductor. Las definiciones de los selectores están todas juntas al principio del archivo, por si quieres arreglarlo tú mismo mientras llega una solución oficial.

## Contribuir

Se aceptan issues y pull requests. Si algo se rompe tras una actualización de Kick, lo más útil que puedes incluir en un reporte de error es la salida de la consola (las líneas que empiezan por `[KickTweaks]`) y, si es posible, una descripción de cómo es ahora el menú de ajustes de Kick.

## Licencia

[MIT](LICENSE) — haz con él lo que quieras.

<br />

<div align="center">
<sub>Sin relación con Kick.com. Solo un userscript que conversa con la página que ya tienes abierta.</sub>
</div>

</div>
</details>

<a name="lang-it"></a>
<details>
<summary><b>🇮🇹 Italiano</b></summary>
<div id="lang-it">

Ogni volta che ricarichi uno stream su Kick, il player dimentica la qualità che avevi scelto e, a volte, anche il volume. Questo script risolve entrambi i problemi e, già che c'è, aggiunge un pannello di impostazioni fatto come si deve.

## Cosa fa

- **Ricorda la qualità.** Scegli 1080p60 una volta, e ogni stream o VOD successivo si caricherà con quella qualità — niente più riselezione a ogni ricarica o cambio canale.
- **Ricorda il volume.** Stessa logica, ma per volume e stato muto. C'è uno slider e un campo numerico se preferisci digitare una percentuale esatta.
- **Un pannello, un tasto di scelta rapida.** Premi <kbd>F2</kbd> (o riassegna il tasto che preferisci) per aprire un piccolo pannello di controllo sopra il player.
- **Rileva automaticamente le modifiche manuali.** Cambia qualità o volume direttamente nel player di Kick, e lo script se ne accorge — non serve toccare il pannello se non vuoi.
- **Tema chiaro e scuro**, secondo l'umore della tua scheda dello stream.
- **26 lingue per l'interfaccia**, ognuna con una vera icona di bandiera vettoriale — non un'emoji che su Windows si trasforma nelle lettere "US" e "DE".
- Niente viene inviato da nessuna parte. Tutte le impostazioni vivono nel `localStorage` del browser. Nessun account, nessuna analisi, nessuna richiesta esterna.

## Installazione

Ti servirà prima un gestore di userscript — vanno bene sia [Tampermonkey](https://www.tampermonkey.net/) che [Violentmonkey](https://violentmonkey.github.io/).

1. Installa una delle due estensioni sopra, se non l'hai già fatto.
2. Clicca su **[Install the userscript](https://raw.githubusercontent.com/ebayybe/kick-stream-tweaks/main/kick-stream-tweaks.user.js)** qui sopra — il gestore di userscript aprirà automaticamente la finestra di installazione.
3. Conferma l'installazione, poi vai su uno stream qualsiasi su [kick.com](https://kick.com).

Fatto. Non c'è nulla da configurare perché la persistenza di qualità e volume funzioni — è attiva di default.

## Come si usa

Apri uno stream qualsiasi e premi <kbd>F2</kbd>. È l'unica cosa da ricordare.

| Impostazione | Cosa fa |
|---|---|
| **Applica automaticamente la qualità salvata** | Disattivala se preferisci che lo script non tocchi affatto la qualità. |
| **Qualità preferita** | Lascia su `Auto` per usare sempre l'ultima qualità scelta manualmente, oppure fissane una specifica perché venga sempre forzata. |
| **Applica automaticamente il volume salvato** | Lo stesso interruttore, per il volume. |
| **Volume preferito** | Slider e campo numerico, 0–100%. Trascinandolo, il volume dello stream corrente cambia in tempo reale. |
| **Tema** | Chiaro o scuro, come preferisci. |
| **Lingua** | 26 lingue, più veloci da individuare dalla bandiera che dal nome. |
| **Tasto di scelta rapida del menu** | Clicca su "Clicca per cambiare", poi premi la combinazione di tasti che vuoi usare al posto di F2. |

## Come funziona davvero la persistenza

Il player di Kick non espone alcuna API pubblica per la selezione della qualità, quindi lo script simula gli stessi click che faresti tu — aprire il menu delle impostazioni e scegliere l'opzione giusta — al primo caricamento di un nuovo stream. Dopodiché lascia il player in pace finché non passi a un altro stream. Se a un certo punto cambi la qualità manualmente, anche questo viene ricordato.

Se un redesign di Kick dovesse rompere questo meccanismo, lo script si fermerà silenziosamente e registrerà quanto accaduto in console con il prefisso `[KickTweaks]`, invece di fare qualcosa di imprevisto sul player. Tutte le definizioni dei selettori si trovano in un unico punto all'inizio del file, nel caso tu voglia sistemarle da solo in attesa di una correzione ufficiale.

## Contribuire

Issue e pull request sono benvenuti. Se qualcosa si rompe dopo un aggiornamento di Kick, la cosa più utile da allegare a una segnalazione di bug è l'output della console (le righe che iniziano con `[KickTweaks]`) e, idealmente, una descrizione di come appare ora il menu delle impostazioni di Kick.

## Licenza

[MIT](LICENSE) — usalo come preferisci.

<br />

<div align="center">
<sub>Non affiliato a Kick.com. Solo uno userscript che dialoga con la pagina che hai già aperto.</sub>
</div>

</div>
</details>

<a name="lang-pt"></a>
<details>
<summary><b>🇧🇷 Português</b></summary>
<div id="lang-pt">

Toda vez que você recarrega uma live na Kick, o player esquece a qualidade que você tinha escolhido e, às vezes, o volume também. Esse script resolve os dois problemas e já aproveita para trazer um painel de configurações decente.

## O que ele faz

- **Lembra da qualidade.** Escolha 1080p60 uma vez, e toda live ou VOD seguinte vai carregar nessa qualidade — sem precisar selecionar de novo a cada recarregamento ou troca de canal.
- **Lembra do volume.** Mesma ideia, mas para volume e estado de mudo. Tem um slider e um campo numérico para quem prefere digitar a porcentagem exata.
- **Um painel, um atalho.** Aperte <kbd>F2</kbd> (ou remapeie para a tecla que preferir) para abrir um pequeno painel de controle sobre o player.
- **Detecta suas mudanças manuais.** Troque a qualidade ou o volume direto no player da Kick, e o script percebe — nem precisa mexer no painel se você não quiser.
- **Temas claro e escuro**, de acordo com o clima da sua aba de live.
- **26 idiomas na interface**, cada um com um ícone de bandeira vetorial de verdade — não um emoji que vira as letras "US" e "DE" no Windows.
- Nada é enviado para lugar nenhum. Todas as configurações ficam no `localStorage` do navegador. Sem conta, sem analytics, sem requisições externas.

## Instalação

Primeiro você vai precisar de um gerenciador de userscripts — tanto o [Tampermonkey](https://www.tampermonkey.net/) quanto o [Violentmonkey](https://violentmonkey.github.io/) funcionam bem.

1. Instale uma das duas extensões acima, caso ainda não tenha.
2. Clique em **[Install the userscript](https://raw.githubusercontent.com/ebayybe/kick-stream-tweaks/main/kick-stream-tweaks.user.js)** acima — o gerenciador de userscripts vai abrir automaticamente a tela de instalação.
3. Confirme a instalação e acesse qualquer live em [kick.com](https://kick.com).

Pronto. Não precisa configurar nada para a persistência de qualidade e volume funcionar — ela já vem ativada por padrão.

## Como usar

Abra qualquer live e aperte <kbd>F2</kbd>. É o único atalho que você precisa decorar.

| Configuração | O que faz |
|---|---|
| **Auto-aplicar qualidade salva** | Desative se preferir que o script não mexa na qualidade de jeito nenhum. |
| **Qualidade preferida** | Deixe em `Auto` para sempre usar a última qualidade escolhida manualmente, ou fixe uma qualidade específica para que ela seja sempre forçada. |
| **Auto-aplicar volume salvo** | O mesmo interruptor, para o volume. |
| **Volume preferido** | Slider e campo numérico, de 0 a 100%. Ao arrastar, o volume da live atual muda na hora. |
| **Tema** | Claro ou escuro, como você preferir. |
| **Idioma** | 26 idiomas, mais rápidos de achar pela bandeira do que pelo nome. |
| **Atalho do menu** | Clique em "Clique para alterar" e depois pressione a combinação de teclas que quiser usar no lugar do F2. |

## Como a persistência funciona por baixo dos panos

O player da Kick não expõe nenhuma API pública para seleção de qualidade, então o script simula os mesmos cliques que você faria — abrir o menu de configurações e escolher a opção certa — na primeira vez que uma nova live carrega. Depois disso, ele deixa o player em paz até você mudar para outra live. Se em algum momento você trocar a qualidade manualmente, isso também é lembrado.

Se uma reformulação da Kick quebrar isso, o script vai parar silenciosamente e registrar o que aconteceu no console com o prefixo `[KickTweaks]`, em vez de fazer algo inesperado no player. As definições dos seletores ficam todas juntas no início do arquivo, caso você queira corrigir por conta própria enquanto uma correção oficial não sai.

## Contribuindo

Issues e pull requests são bem-vindos. Se algo quebrar depois de uma atualização da Kick, o mais útil que você pode incluir num relatório de bug é a saída do console (linhas começando com `[KickTweaks]`) e, se possível, uma descrição de como está o menu de configurações da Kick agora.

## Licença

[MIT](LICENSE) — use como quiser.

<br />

<div align="center">
<sub>Sem afiliação com a Kick.com. Só um userscript que conversa com a página que você já tem aberta.</sub>
</div>

</div>
</details>

<a name="lang-pl"></a>
<details>
<summary><b>🇵🇱 Polski</b></summary>
<div id="lang-pl">

Za każdym razem, gdy odświeżasz stream na Kick, odtwarzacz zapomina, jaką jakość wybrałeś, a czasem też głośność. Ten skrypt naprawia oba te problemy i przy okazji dorzuca porządny panel ustawień.

## Co robi

- **Zapamiętuje jakość.** Wybierz raz 1080p60, a każdy kolejny stream i VOD załaduje się właśnie w tej jakości — koniec z wybieraniem jej na nowo po każdym odświeżeniu czy zmianie kanału.
- **Zapamiętuje głośność.** Ta sama zasada, tylko dla głośności i stanu wyciszenia. Jest suwak i pole liczbowe, jeśli wolisz wpisać dokładny procent.
- **Jeden panel, jeden skrót.** Naciśnij <kbd>F2</kbd> (albo przypisz inny klawisz), żeby otworzyć mały panel sterowania nad odtwarzaczem.
- **Sam wykrywa ręczne zmiany.** Zmień jakość albo głośność bezpośrednio w odtwarzaczu Kick, a skrypt to zauważy — nie musisz w ogóle dotykać panelu, jeśli nie chcesz.
- **Jasny i ciemny motyw**, zależnie od nastroju karty ze streamem.
- **26 języków interfejsu**, każdy z prawdziwą wektorową ikoną flagi — a nie emoji, które na Windowsie zamienia się w litery "US" i "DE".
- Nic nigdzie nie jest wysyłane. Wszystkie ustawienia mieszkają w `localStorage` przeglądarki. Bez kont, bez analityki, bez zewnętrznych zapytań.

## Instalacja

Najpierw potrzebny będzie menedżer userscriptów — sprawdzi się zarówno [Tampermonkey](https://www.tampermonkey.net/), jak i [Violentmonkey](https://violentmonkey.github.io/).

1. Zainstaluj jedno z powyższych rozszerzeń, jeśli jeszcze go nie masz.
2. Kliknij **[Install the userscript](https://raw.githubusercontent.com/ebayybe/kick-stream-tweaks/main/kick-stream-tweaks.user.js)** powyżej — menedżer userscriptów sam otworzy okno instalacji.
3. Potwierdź instalację i wejdź na dowolny stream na [kick.com](https://kick.com).

To wszystko. Nie trzeba niczego konfigurować, żeby zapamiętywanie jakości i głośności działało — jest włączone domyślnie.

## Jak z tego korzystać

Otwórz dowolny stream i naciśnij <kbd>F2</kbd>. To jedyny skrót, który trzeba zapamiętać.

| Ustawienie | Co robi |
|---|---|
| **Automatycznie stosuj zapisaną jakość** | Wyłącz, jeśli wolisz, żeby skrypt w ogóle nie ruszał jakości. |
| **Preferowana jakość** | Zostaw na `Auto`, żeby zawsze używać ostatnio wybranej ręcznie jakości, albo ustaw konkretną wartość, żeby zawsze była wymuszana. |
| **Automatycznie stosuj zapisaną głośność** | Ten sam przełącznik, tylko dla głośności. |
| **Preferowana głośność** | Suwak i pole liczbowe, 0–100%. Przy przesuwaniu głośność aktualnego streamu zmienia się na żywo. |
| **Motyw** | Jasny albo ciemny, jak wygodniej. |
| **Język** | 26 języków, po fladze łatwiej znaleźć niż po nazwie. |
| **Skrót menu** | Kliknij „Kliknij, aby zmienić”, a potem naciśnij kombinację klawiszy, której chcesz używać zamiast F2. |

## Jak to działa pod maską

Odtwarzacz Kick nie udostępnia publicznego API do wyboru jakości, więc skrypt przy pierwszym załadowaniu nowego streamu symuluje te same kliknięcia, które sam byś wykonał — otwiera menu ustawień i wybiera odpowiednią opcję. Później zostawia odtwarzacz w spokoju, dopóki nie przejdziesz na inny stream. Jeśli w międzyczasie zmienisz jakość ręcznie, to również zostanie zapamiętane.

Gdyby przeprojektowanie Kick kiedyś to popsuło, skrypt po cichu się zatrzyma i zapisze, co się stało, w konsoli z prefiksem `[KickTweaks]`, zamiast robić z odtwarzaczem coś nieprzewidzianego. Wszystkie selektory są zebrane w jednym miejscu na początku pliku, na wypadek gdybyś chciał sam to naprawić, zanim pojawi się oficjalna poprawka.

## Współpraca

Issues i pull requesty są mile widziane. Jeśli coś się zepsuje po aktualizacji Kick, najbardziej przydatną rzeczą do dołączenia do zgłoszenia błędu jest wynik z konsoli (linie zaczynające się od `[KickTweaks]`) i, najlepiej, opis tego, jak obecnie wygląda menu ustawień Kick.

## Licencja

[MIT](LICENSE) — rób z tym, co chcesz.

<br />

<div align="center">
<sub>Brak powiązania z Kick.com. To po prostu userscript, który rozmawia ze stroną, którą już masz otwartą.</sub>
</div>

</div>
</details>

<a name="lang-tr"></a>
<details>
<summary><b>🇹🇷 Türkçe</b></summary>
<div id="lang-tr">

Kick'te bir yayını her yenilediğinizde, oynatıcı seçtiğiniz kaliteyi unutur; bazen ses seviyesini de. Bu script her ikisini de düzeltiyor ve üstüne düzgün bir ayarlar paneli ekliyor.

## Neler yapıyor

- **Kaliteyi hatırlar.** 1080p60'ı bir kez seçin, ondan sonraki her yayın ve VOD o kalitede açılır — her yenilemede veya kanal değiştirmede yeniden seçmeye gerek kalmaz.
- **Ses seviyesini hatırlar.** Aynı mantık, ses seviyesi ve sessize alma durumu için de geçerli. Tam bir yüzde girmek isteyenler için kaydırıcı ve sayısal giriş alanı var.
- **Tek panel, tek kısayol.** <kbd>F2</kbd> tuşuna basın (ya da istediğiniz tuşa yeniden atayın), oynatıcının üzerinde küçük bir kontrol paneli açılır.
- **Manuel değişiklikleri otomatik algılar.** Kaliteyi veya ses seviyesini doğrudan Kick'in kendi oynatıcısında değiştirin, script bunu yakalar — istemiyorsanız panele hiç dokunmanıza gerek yok.
- **Açık ve koyu tema**, yayın sekmenizin o anki havasına göre.
- **26 arayüz dili**, her birinde gerçek bir vektör bayrak simgesiyle — Windows'ta "US" ve "DE" harflerine dönüşen emoji değil.
- Hiçbir şey dışarı gönderilmiyor. Tüm ayarlar tarayıcının `localStorage`'ında yaşıyor. Hesap yok, analiz yok, dışarıya istek yok.

## Kurulum

Önce bir userscript yöneticisine ihtiyacınız olacak — [Tampermonkey](https://www.tampermonkey.net/) ya da [Violentmonkey](https://violentmonkey.github.io/), ikisi de sorunsuz çalışır.

1. Yukarıdaki uzantılardan birini henüz kurmadıysanız kurun.
2. Yukarıdaki **[Install the userscript](https://raw.githubusercontent.com/ebayybe/kick-stream-tweaks/main/kick-stream-tweaks.user.js)** bağlantısına tıklayın — userscript yöneticiniz kurulum penceresini otomatik olarak açacaktır.
3. Kurulumu onaylayın, ardından [kick.com](https://kick.com) üzerinde herhangi bir yayını açın.

Bu kadar. Kalite ve ses seviyesi kalıcılığının çalışması için hiçbir şey yapılandırmanıza gerek yok — varsayılan olarak açık.

## Nasıl kullanılır

Herhangi bir yayını açın ve <kbd>F2</kbd> tuşuna basın. Öğrenmeniz gereken tek kısayol bu.

| Ayar | Ne işe yarar |
|---|---|
| **Kaydedilen kaliteyi otomatik uygula** | Script'in kaliteye hiç dokunmamasını istiyorsanız kapatın. |
| **Tercih edilen kalite** | En son manuel seçtiğiniz kaliteyi her zaman kullanmak için `Otomatik` bırakın, ya da belirli bir kaliteyi sabitleyin — her zaman o zorlanır. |
| **Kaydedilen sesi otomatik uygula** | Ses seviyesi için aynı anahtar. |
| **Tercih edilen ses seviyesi** | Kaydırıcı ve sayısal giriş alanı, %0–100. Sürüklediğinizde mevcut yayının sesi anında değişir. |
| **Tema** | Açık ya da koyu, tercihinize göre. |
| **Dil** | 26 dil; isimden çok bayraktan bulmak daha hızlı. |
| **Menü kısayolu** | "Değiştirmek için tıklayın"a tıklayın, sonra F2 yerine kullanmak istediğiniz tuş kombinasyonuna basın. |

## Kalıcılık perde arkasında nasıl çalışıyor

Kick'in oynatıcısı kalite seçimi için herhangi bir genel API sunmuyor, bu yüzden script yeni bir yayın ilk yüklendiğinde tıpkı sizin yapacağınız gibi — ayarlar menüsünü açıp ilgili seçeneği tıklayarak — aynı tıklamaları simüle eder. Bundan sonra, başka bir yayına geçene kadar oynatıcıya dokunmaz. Bir noktada kaliteyi elle değiştirirseniz, bu da hatırlanır.

Kick bir gün bunu bozacak bir tasarım değişikliği yaparsa, script sessizce durur ve ne olduğunu konsola `[KickTweaks]` ön ekiyle kaydeder; oynatıcıda beklenmedik bir şey yapmak yerine. Tüm seçici tanımları dosyanın başında tek bir yerde toplanmış durumda — resmi bir düzeltme gelene kadar kendiniz onarmak isterseniz diye.

## Katkıda bulunma

Issue ve pull request'ler memnuniyetle karşılanır. Bir Kick güncellemesinden sonra bir şey bozulursa, bir hata raporuna eklenebilecek en faydalı şey konsol çıktısıdır (`[KickTweaks]` ile başlayan satırlar) ve mümkünse Kick'in ayarlar menüsünün şu anda nasıl göründüğünün bir açıklaması.

## Lisans

[MIT](LICENSE) — istediğiniz gibi kullanın.

<br />

<div align="center">
<sub>Kick.com ile bir bağlantısı yoktur. Zaten açık olan sayfayla konuşan bir userscript, o kadar.</sub>
</div>

</div>
</details>
