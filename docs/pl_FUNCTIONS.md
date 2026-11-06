<div align="center">

[English](./en_FUNCTIONS.md) · [العربية](./ar_FUNCTIONS.md) · [Беларуская](./be_FUNCTIONS.md) · [Български](./bg_FUNCTIONS.md) · [Čeština](./cs_FUNCTIONS.md) · [Dansk](./da_FUNCTIONS.md) · [Deutsch](./de_FUNCTIONS.md) · [Ελληνικά](./el_FUNCTIONS.md) · [Español](./es_FUNCTIONS.md) · [Suomi](./fi_FUNCTIONS.md) · [Français](./fr_FUNCTIONS.md) · [हिन्दी](./hi_FUNCTIONS.md) · [English (India)](./en-in_FUNCTIONS.md) · [Hrvatski](./hr_FUNCTIONS.md) · [Magyar](./hu_FUNCTIONS.md) · [Bahasa Indonesia](./id_FUNCTIONS.md) · [Italiano](./it_FUNCTIONS.md) · [日本語](./ja_FUNCTIONS.md) · [한국어](./ko_FUNCTIONS.md) · [Lietuvių](./lt_FUNCTIONS.md) · [Latviešu](./lv_FUNCTIONS.md) · [Македонски](./mk_FUNCTIONS.md) · [Монгол](./mn_FUNCTIONS.md) · [Bahasa Melayu](./ms_FUNCTIONS.md) · [Nederlands](./nl_FUNCTIONS.md) · [Norsk](./no_FUNCTIONS.md) · **Polski** · [Português](./pt_FUNCTIONS.md) · [Română](./ro_FUNCTIONS.md) · [Русский](./ru_FUNCTIONS.md) · [Slovenčina](./sk_FUNCTIONS.md) · [Srpski](./sr_FUNCTIONS.md) · [Svenska](./sv_FUNCTIONS.md) · [ไทย](./th_FUNCTIONS.md) · [Türkçe](./tr_FUNCTIONS.md) · [Tiếng Việt](./vi_FUNCTIONS.md) · [简体中文](./zh-cn_FUNCTIONS.md) · [繁體中文](./zh-tw_FUNCTIONS.md)

</div>




# Ulepszenia strumienia kopnięcia — odniesienie do funkcji

Informacje na temat ulepszeń strumienia kick-stream 1.3.1. Opisuje, co robi każdy obszar funkcjonalny, jak przechowywane są ustawienia, od których części strony Kick zależy skrypt i jak działa każda nazwana funkcja lub metoda w skrypcie użytkownika. Zobacz [repozytorium](https://github.com/ebayybe/kick-stream-tweaks) i [dziennik zmian](../CHANGELOG/en_CHANGELOG.md) .

> Nazwy odpowiadają źródłu. `void` oznacza, że ​​funkcja działa poprzez skutki uboczne. Metoda napisana jako `Object.method` znajduje się na tym obiekcie ( `PlayerSync` , `Extras` , `GUI` , `Store` ).

## Spis treści

1. [Architektura](#architecture)
2. [Zachowanie wobec użytkownika](#user-facing-behavior)
3. [Informacje o ustawieniach](#settings-reference)
4. [Podstawowe narzędzia](#core-utilities)
5. [Pamięć ustawień](#settings-storage)
6. [Synchronizacja odtwarzaczy ( `PlayerSync` )](#player-synchronization-playersync)
7. [Dodatki do strony ( `Extras` )](#page-extras-extras)
8. [Elementy interfejsu](#interface-building-blocks)
9. [Strony ustawień ( `PAGES` )](#settings-pages-pages)
10. [Kontroler panelu ( `GUI` )](#panel-controller-gui)
11. [Skróty klawiaturowe i uruchamianie](#hotkeys-and-startup)
12. [Wyrzuć zależności stron](#kick-page-dependencies)
13. [Lokalizacja](#localization)
14. [Bezpieczeństwo, prywatność i kompatybilność](#safety-privacy-and-compatibility)

<a id="architecture"></a>
## Architektura

Skrypt użytkownika to jeden samodzielny plik, który jest uruchamiany na `document-start` z `@grant none` . Nie ma etapu kompilacji i nie generuje własnych żądań sieciowych.

| Warstwa | Obiekt / obszar | Odpowiedzialność |
|---|---|---|
| Dane | `TR` , `DIAG` , `FLAGS` , `LANG_NAMES` | Tłumaczenia na 38 języków, zlokalizowane komunikaty diagnostyczne, flagi SVG i nazwy języków. |
| Konfiguracja | `CONFIG` , `DEFAULTS` | Stałe (selektory, limity ponownych prób, ustawienia wstępne, sekcje) i ustawienia domyślne. |
| Przechowywanie | `sanitizeSettings` , `Store` , `persist` | Sprawdza i zapisuje ustawienia w `localStorage` ; przechowuje stos cofania w pamięci. |
| Logika gracza | `PlayerSync` | Znajduje wideo, przywraca jakość, głośność, prędkość i tryb cichy, ogląda pod kątem zawieszania się. |
| Pomocnicy strony | `Extras` | Układ przycisków, odbieranie nagród, awatary kanałów i harmonogram w tle. |
| Interfejs | `PAGES` , `GUI` , pomocnicy | Panel Shadow-DOM, powiadomienia, dźwięki, pływający przycisk szybkiego zgłoszenia, skróty klawiszowe. |

Przepływ danych: 1,5-sekundowa pętla `PlayerSync.sync` odczytuje efektywne ustawienia (najpierw profil kanału, potem globalne), stosuje je do odtwarzacza i wywołuje `Extras.tick` . Działania użytkownika przechodzą przez programy obsługi `GUI` , które aktualizują ustawienia za pomocą `persist` i wypychają do odtwarzacza tylko wybraną część ( `media` lub `all` ).

<a id="user-facing-behavior"></a>
## Zachowanie skierowane do użytkownika

| Powierzchnia | Zachowanie |
|---|---|
| Wytrwałość gracza | Zapisuje jakość na żywo/VOD, głośność, stan wyciszenia, tryb cichy i prędkość, a następnie stosuje je po wykryciu nowego strumienia. Zmiany, które sama wprowadza strona (np. Kick resetujący głośność do 50%), zostają cofnięte; jedynie własne działania widza aktualizują zapisane wartości. |
| Jakość | Wybiera preferowaną jakość w menu odtwarzacza, powraca do niższej jakości (lub automatycznej), gdy jest niedostępna, i ponownie zamyka menu. Tylko autentyczne kliknięcia użytkownika uczą skryptu nowej jakości „ostatnio używanej”. |
| Głośność i ciche odtwarzanie | Głośność i wyciszenie są przywracane dla każdego strumienia. Ciche odtwarzanie kieruje wideo przez silnik Web Audio przy zerowym wzmocnieniu, dzięki czemu strumień jest odtwarzany w tle bez wyciszenia. |
| Profile kanałów | **Zapisz ten kanał** przechowuje bieżącą jakość, głośność, prędkość i dźwięk oglądanego kanału. W profilach przechowywane są także notatki, grupy, stan pinów, awatar i flagi włączone/wyłączone. |
| Ustawienia wstępne | Oszczędzaj przepustowość, najlepszą jakość, ciche oglądanie i VOD za pomocą jednego kliknięcia. |
| panelu | `F2` lub niestandardowy klawisz skrótu otwiera panel o stałej szerokości (680 pikseli) z pogrupowanym paskiem bocznym, wyszukiwaniem, stylami Kick i Minimal, jasnymi/ciemnymi motywami, 14 kolorami akcentującymi oraz próbnikiem kolorów, kompaktowym układem, rozmyciem tła, skalowaniem tekstu, wysokim kontrastem i elementami sterującymi animacjami. |
| Szukaj | Niewrażliwy na akcent, dopasowuje język interfejsu i angielskie nazwy oraz dopasowuje tytuły sekcji lub kart. Naciśnięcia klawiszy wpisywane w panelu nigdy nie docierają do skrótów klawiszowych Kick'a. |
| Suwaki | Każdy suwak reaguje na kliknięcia, przeciąganie, strzałki klawiatury i kółko myszy. |
| Brzmi | Wskazówki Web Audio dotyczące czynności w menu, zmian ustawień, sukcesu/porażki jakości i przywracania głośności, każde z przełącznikiem, podglądem i głośnością. |
| Powiadomienia | Zlokalizowane wiadomości, które można przeciągać, skalować, ustawiać jako przezroczyste, wyciszać (nie przeszkadzać, cichy tryb pełnoekranowy) i zapisywać w historii. |
| Alarm zamrożenia | Wykrywa zablokowany odtwarzacz lub czarny ekran, odtwarza głośny alarm (nawet w ukrytej zakładce, niezależnie od przełącznika efektów dźwiękowych) i wyświetla powiadomienie. |
| Nagrody | Opcjonalne automatyczne odbieranie czeka na powiadomienie o nagrodzie przez Kick (lub działa zgodnie z harmonogramem), otwiera okno nagród, odbiera dostępne elementy i zamyka je. Pływający i przeciągany przycisk szybkiego zgłoszenia robi to samo jednym kliknięciem. |
| Układ | Ukrywa czat i zwija lewe menu z panelu lub za pomocą skrótów klawiszowych, opcjonalnie zapamiętując wybór dla każdego strumienia. |
| Narzędzia | Timer uśpienia, widok skupiony (pełnoekranowy), ponowna synchronizacja odtwarzacza i tryb awaryjny, który wstrzymuje każdą automatyczną zmianę. |
| Diagnostyka | Stan na żywo, wykryte jakości, rozdzielczość wideo, skanowanie jakości, sprawdzanie konfliktów, dziennik działań i raport do kopiowania. |
| Dane | Eksport/import ustawień, cofanie, przywracanie po zresetowaniu, tworzenie kopii zapasowych/przywracanie zapisanych kanałów. |
| Prywatność | Ustawienia, profile, dzienniki i historie pozostają w pamięci przeglądarki. Nic nie jest nigdzie wysyłane. |

<a id="settings-reference"></a>
## Informacje o ustawieniach

Wszystkie wartości są sprawdzane przez `sanitizeSettings` ; wszystko, co nieprawidłowe, powraca do wartości domyślnych. Zakresy są wymuszane.

### Gracz

| Klucz | Typ / zakres | Domyślne | Znaczenie |
|---|---|---|---|
| `autoQualityEnabled` | wartość logiczna | `true` | Automatycznie zastosuj preferowaną jakość. |
| `preferredLiveQuality` , `preferredVodQuality` | `auto` , `1080p60` , `1080p` , `720p` , `480p` , `360p` , `160p` | `auto` | Jakość stosowana w przypadku transmisji na żywo i VOD. `auto` oznacza „zapamiętaj mój ostatni wybór”. |
| `lastLiveQuality` , `lastVodQuality` | to samo | `auto` | Ostatnia jakość, którą widz wybrał ręcznie. |
| `qualityFallback` | `lower` , `auto` | `lower` | Co zrobić, gdy preferowana jakość nie jest oferowana. |
| `autoVolumeEnabled` | wartość logiczna | `true` | Przywróć i chroń zapisany wolumen. |
| `volume` | 0–1 | `1` | Zapisana objętość. |
| `muted` | wartość logiczna | `false` | Zapisano stan wyciszenia. |
| `silent` | wartość logiczna | `false` | Ciche odtwarzanie (wykres audio o zerowym wzmocnieniu, odtwarzacz nie wyciszony). |
| `playbackRate` | 0,25–2,5 | `1` | Zapisana prędkość; `1` nigdy nie jest wymuszone. |
| `warnLoudVolume` , `loudVolumeThreshold` | wartość logiczna; 60–100, krok 5 | `true` ; `85` | Ostrzeżenie o dużej głośności. |
| `safeMode` | wartość logiczna | `false` | Wstrzymaj każdą automatyczną zmianę. |
| `channelProfiles` | obiekt, do 200 | `{}` | Profile na kanał (patrz poniżej). |

Pola profilu kanału: `enabled` , `excluded` , `liveQuality` , `vodQuality` , `volume` , `muted` , `silent` , `playbackRate` , `displayName` , `pinned` , `avatar` (tylko `https://…kick.com/images/user/…` URL), `note` (240 znaków), `group` (40 znaków), `updatedAt` , `lastUsed` .

### Powiadomienia i dźwięki

| Klucz | Typ / zakres | Domyślne | Znaczenie |
|---|---|---|---|
| `notificationsEnabled` | wartość logiczna | `true` | Pokaż powiadomienia o wynikach. |
| `doNotDisturb` , `quietFullscreen` | wartość logiczna | `false` , `true` | Pomiń powiadomienia i dźwięki lub tylko na pełnym ekranie. |
| `notificationScale` | 0,8–1,4 | `1` | Rozmiar powiadomienia. |
| `notificationDuration` | 1500–12000 ms, krok 500 | `3500` | Jak długo trwa powiadomienie. |
| `notificationOpacity` | 0,35–1 | `0.95` | Przejrzystość powiadomień. |
| `notificationShowIcon` | wartość logiczna | `true` | Pokaż ikonę stanu. |
| `notificationPosition` | `{x, y}` lub `null` | `null` | Przeciągnięta pozycja. |
| `notificationHistoryEnabled` , `notificationHistory` | wartość logiczna; do 30 wpisów | `true` ; `[]` | Historia powiadomień. |
| `soundEffectsEnabled` , `soundVolume` | wartość logiczna; 0–1 | `false` ; `0.35` | Przełącznik główny i głośność. |
| `soundEvents` , `soundEventVolumes` | na zdarzenie: `menu` , `settingChanged` , `qualityApplied` , `qualityFailed` , `volumeApplied` | wszystko włączone; `0.35` | Przełącznik i głośność na każde zdarzenie. |

### Wygląd, ruch i skróty

| Klucz | Typ / zakres | Domyślne | Znaczenie |
|---|---|---|---|
| `theme` | `dark` , `light` | `dark` | Motyw koloru. |
| `panelStyle` | `kick` , `minimal` | `kick` | Styl wizualny panelu. |
| `accentColor` | `#rrggbb` | `#53fc18` | Kolor akcentujący. |
| `compactMode` , `highContrast` | wartość logiczna | `false` | Gęstość i kontrast. |
| `backdropBlur` | 0–12 pikseli | `6` | Rozmycie tła za panelem (działa w obu stylach). |
| `textScale` | 0,9–1,3 | `1` | Rozmiar tekstu. |
| `language` , `languageChosen` | kod lokalny; wartość logiczna | język przeglądarki; `false` | Interfejs podąża za językiem przeglądarki do momentu wybrania języka, po czym wybór zostaje zapamiętany. |
| `panelPosition` | `{x, y}` lub `null` | `null` | Przeciągnięta pozycja panelu. |
| `motionSpeed` | `fast` , `normal` , `slow` | `normal` | Szybkość animacji. |
| `openEffect` | `none` , `fade` , `slide` , `scale` , `pop` | `scale` | Efekt otwarcia/zamknięcia panelu. |
| `hoverEffect` | `none` , `lift` , `glow` | `lift` | Efekt najechania. |
| `indicatorAnimation` | `glow` , `pulse` , `breathe` , `off` | `glow` | Animacja logo/wskaźnika. |
| `iconAnimations` | wartość logiczna | `true` | Animuj pasek boczny, resetuj i ikony pomocy. |
| `hotkey` | ciąg kombinowany | `F2` | Otwiera lub zamyka panel. |
| `actionHotkeys` | ciągi kombinowane | `Alt+N` , `Alt+F` , `Alt+Q` , `Alt+V` , `Alt+C` , `Alt+S` | Przełącz powiadomienia, widok fokusowy, zresetuj jakość, przywróć głośność, przełącz czat, przełącz lewe menu. |

Kombinacje klawiszy są przechowywane jako ciągi znaków, takie jak `Alt+Q` i dopasowywane do klawisza fizycznego, dzięki czemu działają na dowolnym układzie klawiatury. Ustawienia ze starszych wersji z klawiszem skrótu w kształcie obiektu są konwertowane automatycznie. Szerokość panelu jest ustalona na 680 px (ograniczona rozmiarem okna); poprzednie ustawienie szerokości jest ignorowane.

### Narzędzia

| Klucz | Typ / zakres | Domyślne | Znaczenie |
|---|---|---|---|
| `autoRecoverStall` | wartość logiczna | `false` | Wypróbuj `play()` po wykryciu zawieszenia. |
| `freezeAlertEnabled` , `freezeSound` | wartość logiczna | `true` | Zatrzymaj dźwięk powiadomienia i alarmu. |
| `freezeSeconds` | 5–60, krok 5 | `10` | Sekundy braku postępu przed alarmem. |
| `layoutHideChat` , `layoutCollapseSidebar` | wartość logiczna | `false` | Zapamiętany układ, zastosowany raz na stronę. |
| `autoClaimRewards` | wartość logiczna | `false` | Włącz automatyczne odbieranie nagród. |
| `claimMode` | `notify` , `interval` | `notify` | Odbierz, gdy Kick wyświetli powiadomienie lub zgodnie z harmonogramem. |
| `claimDelaySec` | 0–120, krok 5 | `5` | Poczekaj, aż pojawi się powiadomienie (tryb powiadamiania). |
| `claimIntervalMin` | 5–120, krok 5 | `10` | Minuty pomiędzy kontrolami (tryb zaplanowany). |

### Przycisk szybkiego zgłoszenia

| Klucz | Typ / zakres | Domyślne | Znaczenie |
|---|---|---|---|
| `claimWidget` | wartość logiczna | `false` | Pokaż pływający przycisk. |
| `claimWidgetStyle` | `orb` , `pill` , `glass` , `flat` | `orb` | Projekt przycisku. |
| `claimWidgetIcon` | `gift` , `crown` , `star` , `bolt` , `coin` , `custom` | `gift` | Wbudowana ikona lub własny obraz użytkownika. |
| `claimWidgetCustomIcon` | `data:image/(png\|webp\|jpeg);base64,…` , do 90 000 znaków | pusty | Ponownie zakodowana kopia przesłanego obrazu. Wszystko inne jest odrzucane. |
| `claimWidgetImageFill` | wartość logiczna | `false` | Niech niestandardowy obraz wypełni cały przycisk (nieużywany w projekcie pigułki). |
| `claimWidgetSize` | `s` , `m` , `l` | `m` | Rozmiar przycisku. |
| `claimWidgetOpacity` | 0,3–1 | `0.9` | Nieprzezroczystość przycisku (pełne krycie, gdy dostępna jest nagroda). |
| `claimWidgetAutoHide` | wartość logiczna | `false` | Pokaż przycisk tylko wtedy, gdy dostępna jest nagroda. |
| `claimWidgetPos` | `{x, y}` lub `null` | `null` | Przeciągnięta pozycja. |

### Diagnostyka i stan

| Klucz | Typ / zakres | Domyślne | Znaczenie |
|---|---|---|---|
| `diagnosticsLogEnabled` , `diagnosticsLog` | wartość logiczna; do 60 wpisów | `true` ; `[]` | Dziennik akcji. |
| `activeSection` | identyfikator sekcji | `playback` | Ostatnia otwarta strona. |
| `resetBackup` | ustawienia obiektu | `null` | Migawka wykonana przed resetowaniem lub importem. |

<a id="core-utilities"></a>
## Podstawowe narzędzia

| Funkcja | Parametry / powrót | Co i jak to robi |
|---|---|---|
| `detectLanguage` język | — → ustawienia regionalne | Przechodzi przez `navigator.languages` ​​, mapuje warianty regionalne ( `zh-HK` → `zh-tw` , `nb` / `nn` → `no` ) i zwraca pierwsze obsługiwane ustawienia regionalne lub `en` . |
| `dictFor` | język → słownik | Zwraca tabelę tłumaczeń dla ustawień regionalnych, wracając do języka podstawowego, a następnie do języka angielskiego. |
| `t` / `T` | język, klucz, zmienne → ciąg | Rozwiązuje klucz z podstawieniem `{placeholder}` ; `T` używa bieżącego języka. |
| `diagText` | indeks, jakość → ciąg | Zwraca jedno ze zlokalizowanych zdań diagnostycznych. |
| `log` | …argumenty → nieważne | Rejestrowanie konsoli z prefiksem skryptu. |
| `clamp` , `sleep` , `esc` | wartość → wartość | Ograniczanie zakresu, opóźnienie oparte na obietnicach i ucieczka HTML. |
| `normalizeQuality` | tekst → ciąg | Zapisuje etykietę jakości małymi literami i usuwa białe znaki. |
| `debounce` | fn, czekaj → funkcja | Końcowe odbicie metodą `flush` . |
| `onLocationChange` | oddzwonienie → nieważne | Wykrywa nawigację na jednej stronie, zawijając `pushState` / `replaceState` , nasłuchując `popstate` i odpytując raz na sekundę. |
| `keyLabelFromEvent` , `comboFromEvent` , `matchesCombo` | zdarzenie → ciąg/boolean | Twórz i porównuj kombinacje klawiszy na podstawie kodu klucza fizycznego. |
| `mkPointer` | typ, ekstra → wydarzenie | Tworzy `PointerEvent` (lub `MouseEvent` jeśli jest niedostępny) używany do sterowania menu ARIA Kick'a. |
| `waitFor` | sonda, limit czasu, krok → wartość/null | Odpytuje do momentu, aż sonda zwróci wartość lub upłynie limit czasu. |
| `imageToDataUrl` | obraz → ciąg | Skaluje obraz do kwadratowego płótna (zachowując proporcje, `willReadFrequently` ), próbuje uzyskać rozmiar 128, 96 i 64 pikseli i zwraca adres URL danych PNG nie większy niż 70 000 znaków. |

<a id="settings-storage"></a>
## Przechowywanie ustawień

| Funkcja | Parametry / powrót | Co i jak to robi |
|---|---|---|
| `sanitizeProfiles` | obiekt → obiekt | Przechowuje maksymalnie 200 profili z ważnymi kluczami i zaciska każde pole; awatar musi być adresem URL obrazu kick. |
| `sanitizeSettings` | obiekt, z kopią zapasową → obiekt | Sprawdza każde ustawienie (typy, zakresy, dozwolone wartości), migruje ustawienia 1.1–1.3 (starsza jakość, klawisz skrótu, animacja i klawisze sekcji) oraz stosuje regułę językową. |
| `legacyHotkey` | wartość → ciąg | Konwertuje klawisz skrótu w kształcie obiektu na ciąg kombi. |
| `Store.load` / `Store.save` | — / ustawienia → ustawienia/void | Odczytaj i zapisz wyczyszczony obiekt w `localStorage` ( `kickTweaks.settings.v1` ). |
| `persist` | łatka, `{undo}` → nieważne | Łączy łatkę, oczyszcza, zapisuje z krótkim odrzuceniem i opcjonalnie przesyła migawkę cofania (przechowywaną tylko w pamięci, do 15). |
| słuchacz `storage` | wydarzenie → nieważność | Ładuje ponownie ustawienia, gdy zmieni je inna karta Kick, więc karty nigdy się nie nadpisują. |

<a id="player-synchronization-playersync"></a>
## Synchronizacja odtwarzacza ( `PlayerSync` )

### Pomocnicy kanałów i profili

| Metoda | Parametry / powrót | Co i jak to robi |
|---|---|---|
| `isVod` | — → wartość logiczna | Wykrywa stronę VOD na podstawie adresu URL. |
| `channelKey` | — → ciąg | Tworzy stabilny klucz `channel:slug` (lub `vod:id` , `kick:home` ), buforując wynik na trzy sekundy. Na stronach VOD używany jest link do kanału najbliżej odtwarzacza. |
| `channelSlug` | — → ciąg | Zwraca część klucza kanału. |
| `profile` | klawisz → obiekt/null | Odczytuje zapisany profil. |
| `profileActive` | — → obiekt/null | Zwraca bieżący profil tylko wtedy, gdy jest włączony i nie jest wykluczony. |
| `isExcluded` | — → wartość logiczna | Sprawdza, czy automatyzacja jest wyłączona dla tego kanału. |
| `updateProfile` | łatka, klucz → nieważna | Tworzy lub łączy profil i znaczki `updatedAt` . |
| `saveCurrentChannel` | — → obiekt/null | Zapisuje bieżącą jakość, głośność, wyciszenie, prędkość i stan ciszy widza jako włączony profil i skanuje stronę w poszukiwaniu awatara kanału. |
| `effective` | — → obiekt | Rozwiązuje problem głośności, wyciszenia, ciszy, szybkości i jakości na żywo/VOD z aktywnego profilu lub ustawień globalnych. |
| `setStatus` | status, wynik → nieważne | Aktualizuje kody stanu i ostatniego wyniku wyświetlane w nagłówku i diagnostyce. |

### Znalezienie i kierowanie graczem Kick'a

| Metoda | Parametry / powrót | Co i jak to robi |
|---|---|---|
| `findMainVideo` | — → wideo/null | Wybiera największy widoczny `<video>` . |
| `streamKey` | — → ciąg | Zwraca ścieżkę strony używaną do zastosowania jakości raz na strumień. |
| `isAccountButton` | przycisk → wartość logiczna | Odrzuca przyciski nagłówka, awatara i konta. |
| `findSettingsButton` | wideo → przycisk/null | Znajduje przycisk koła zębatego odtwarzacza według etykiety lub bliskości prawego dolnego rogu filmu. |
| `revealControls` | wideo → pustka | Wysyła zdarzenia najechane kursorem, aby wyświetlić ukryte elementy sterujące. |
| `simulateClick` | element → pustka | Wysyła pełną sekwencję zdarzeń wskaźnika potrzebną w menu Kick. |
| `menuItems` | — → element[] | Wyświetla widoczne wpisy `menuitemradio` . |
| `openQualityMenu` | — → przycisk/null | Otwiera menu koła zębatego, wchodzi do wpisu dotyczącego jakości, gdy pojawi się menu najwyższego poziomu, i czeka na opcje. |
| `closeMenu` | przycisk → Obietnica | Zamyka menu tylko wtedy, gdy jest nadal otwarte (drugie kliknięcie w ciemno może je ponownie otworzyć), z możliwością wyjścia awaryjnego. |
| `readMenu` | — → element[] | Rejestruje oferowane i sprawdzone jakości. |
| `scanQualities` | — → Obietnica<boolean> | Otwiera menu, rejestruje dostępne właściwości i zamyka je (wykorzystywane przez diagnostykę). |
| `activate` | pozycja → Obietnica | Klika jedną opcję i czeka, aż zostanie zaznaczona. |
| `selectQuality` | pożądane, awaryjne → Obietnica | Wybiera żądaną jakość, w przeciwnym razie następną niższą lub Auto. |
| `desiredQuality` | — → ciąg | Wybiera jakość do zastosowania z profilu, preferencji lub ostatniego ręcznego wyboru. |
| `applyQualityOnce` | streamKey → Obietnica | Stosuje żądaną jakość raz na strumień, zamyka menu i powiadamia o powodzeniu lub niepowodzeniu. |
| `watchManualQuality` | — → nieważne | Uczy się nowej jakości „ostatnio używanej” tylko na podstawie autentycznych (zaufanych) kliknięć, więc automatyczne kliknięcia i reklamy zastępcze nigdy nie zastępują zapisanych wartości. |

### Głośność, tryb cichy, prędkość i monitorowanie

| Metoda | Parametry / powrót | Co i jak to robi |
|---|---|---|
| `applyVolume` | wideo, cicho → pustka | Zapisuje efektywną głośność i stan wyciszenia (oznaczone jako własna zmiana skryptu). |
| `trackInput` | — → nieważne | Rejestruje czas ostatniego zaufanego wskaźnika, kółka, dotyku lub klawiatury. |
| `reassertVolume` | wideo → pustka | Przywraca zapisany wolumin, gdy strona go zmieniła bez udziału użytkownika (szybkość ograniczona do ośmiu przywróceń na dziesięć sekund). |
| `watchVolume` | wideo → pustka | Nasłuchuje `volumechange` : zmiany wprowadzone przez użytkownika są zapisywane, zmiany wprowadzane przez stronę są przywracane. |
| `checkLoud` | głośność, wyciszenie → nieważne | Ostrzega raz, gdy głośność przekroczy próg. |
| `buildGraph` | wideo → wykres/null | Łączy wideo z `AudioContext` poprzez węzeł wzmocnienia; raportuje, gdy witryna na to nie pozwala. |
| `applySilent` | wideo → pustka | Ustawia wzmocnienie na 0 dla cichego odtwarzania lub z powrotem na 1, wznawiając kontekst w razie potrzeby. |
| `applyRate` | wideo, siła → nieważność | Ustawia zapisaną prędkość; `1` nie jest wymuszony, chyba że widz go po prostu wybierze, więc nadrabianie zaległości przez Kicka na żywo jest szanowane. |
| `applyMedia` | wideo, `{rate}` → nieważne | Ponownie stosuje głośność, tryb cichy i opcjonalnie prędkość bez dotykania jakości. |
| `monitorFreeze` | wideo → pustka | Wykrywa zatrzymanie odtwarzacza (zatrzymanie czasu) lub czarny ekran (czas płynący bez zdekodowanych klatek) i wyzwala alarm oraz opcjonalne przywrócenie działania. Działa w ukrytych zakładkach. |

### Pętla i cykl życia

| Metoda | Parametry / powrót | Co i jak to robi |
|---|---|---|
| `sync` | — → Obietnica | Główna pętla: monitoruje zawieszanie się, wiąże słuchaczy, stosuje tryb cichy, głośność, prędkość i jakość, przestrzega trybu bezpiecznego i wykluczeń, a następnie wywołuje `Extras.tick` . |
| `resync` | — → Obietnica | Wymusza świeże przejście (używane przez ustawienia wstępne, szybkie akcje i zmiany jakości). |
| `init` | — → nieważne | Rozpoczyna pierwszą synchronizację, odbiornik nawigacji i 1,5-sekundowy interwał. |

<a id="page-extras-extras"></a>
## Dodatki do strony ( `Extras` )

| Metoda | Parametry / powrót | Co i jak to robi |
|---|---|---|
| `root` , `layoutState` | — → element / `{chat, sidebar}` | Przeczytaj stan układu Kick z `data-chat` i `data-sidebar` w kontenerze strony. |
| `isDesktop` | — → wartość logiczna | Automatyzacja układu działa tylko przy szerokościach pulpitu. |
| `click` | element → wartość logiczna | Kliknięcia poprzez `PlayerSync.simulateClick` . |
| `chatHideButton` , `chatShowButton` | — → przycisk/null | Znajdź przycisk zwijania w pokoju rozmów i przycisk „pokaż czat” (według ikony, a nie według języka). |
| `setChat` , `setSidebar` | pokaż → wartość logiczna | Doprowadź czat lub lewe menu do żądanego stanu, naciskając własne przyciski Kick'a. |
| `applyLayout` | — → nieważne | Stosuje zapamiętany układ raz na stronę, nigdy nie walcząc z ręcznymi zmianami. |
| `isTyping` | — → wartość logiczna | Prawda, gdy przeglądający pisze w polu; automatyczne roszczenia czekają. |
| `rewardTrigger` , `popoverCard` | — → przycisk/null | Znajdź przycisk prezentu i wyskakującą kartę z nagrodą. |
| `rewardAvailable` | — → wartość logiczna | Wykrywa sygnał „dostępnej nagrody” Kick’a (animowane wezwanie do działania). |
| `isEnabled` | przycisk → wartość logiczna | Widoczne i nie wyłączone. |
| `claimDrops` | — → Obietnica<number> | Naciska włączone przyciski odbioru dla ukończonych zrzutów w panelu nagród. |
| `claimDaily` | spust → Obietnica<number> | Otwiera okno nagród, naciska jeden raz każdy włączony przycisk odbioru (nigdy tego samego przycisku dwa razy), a następnie zamyka okno. |
| `claimRewards` | `{manual}` → Obietnica<number> | Uruchamia pełne zgłoszenie, raportuje wynik i odtwarza dźwięk; uruchamianie ręczne ignoruje pisanie i zgłasza, gdy nie ma nic do zarzucenia. |
| `normName` | tekst → ciąg | Normalizuje nazwy w celu dopasowania ( `_` i spacji do `-` ). |
| `findAvatar` | ślimak → sznurek | Zwraca awatar kanału widoczny na stronie (używany przed zapisaniem kanału). |
| `scanAvatars` | — → nieważne | Przechowuje awatary dla zapisanych kanałów, które ich nie posiadają. |
| `tick` | klucz strumienia → nieważny | Harmonogram wywoływany z `sync` : stosuje układ, skanuje awatary, czeka na powiadomienie o nagrodzie (tryb powiadomienia, z opóźnieniem i dwuminutowym opóźnieniem) lub sprawdza wybrany interwał i odpytuje panel zrzutów. |

<a id="interface-building-blocks"></a>
## Elementy składowe interfejsu

| Funkcja | Parametry / powrót | Co i jak to robi |
|---|---|---|
| `I` | nazwa → svg | Ikona obrysu wbudowanego. |
| `fmtValue` | format, surowy → ciąg | Formatuje wartości suwaków (procenty, piksele, sekundy). |
| `normSearch` , `englishOf` , `searchText` | tekst → ciąg | Wyszukiwany tekst bez akcentu, zawierający angielską nazwę przetłumaczonej etykiety. |
| `row` | klawisz, etykieta, kontrola, opcje → html | Rząd ustawień; domyślnie ułożone w stos, wbudowane tylko dla przełączników, z opcjonalnym przełącznikiem pomocy. |
| `sw` , `toggleRow` | … → HTML | Sterowanie przełącznikiem i gotowy rząd przełączników. |
| `chip` , `seg` , `qualityChips` | … → HTML | Chipy, podzielone na segmenty kontrole i siatka jakości. |
| `range` | attr, klucz, opcje → html | Suwak ze ścieżką wypełnienia i wartością na żywo. |
| `card` , `btn` , `ib` | … → HTML | Karta, przycisk tekstowy i przycisk z ikoną. |
| `timeStr` | znacznik czasu → ciąg | Zlokalizowany czas zegarowy. |
| `setPref` | klucz, wartość → nieważność | Zapisuje preferencje gracza w aktywnym profilu kanału lub w ustawieniach globalnych. |
| `fxBtn` | klucz, wartość, etykieta, na → html | Kafelek wyboru efektów z małym glifem podglądu. |
| `avatarHtml` | nazwa, adres URL → html | Awatar z zastępczą literą; nieudany obraz zostanie usunięty. |
| `hasCustomIcon` , `cwAttrs` , `cwIcon` , `claimWidgetInner` | — → wartość | Utwórz znaczniki przycisku szybkiego żądania zarówno dla przycisku aktywnego, jak i podglądu ustawień. |

<a id="settings-pages-pages"></a>
## Strony ustawień ( `PAGES` )

| Strona | Spis treści |
|---|---|
| `playback` | Wskazówka dotycząca zapisu tego kanału, ustawienia wstępne, jakość (automatyczne stosowanie, na żywo, VOD, awaryjna), głośność (automatyczne stosowanie, suwak, wyciszenie, ciche odtwarzanie, głośne ostrzeżenie) i prędkość. |
| `channels` | Jak to działa, bieżący kanał za pomocą przycisku **Zapisz ten kanał** , przełączniki pauzy/wykluczenia i edytor, a następnie lista zapisanych kanałów (wyszukiwanie, sortowanie, filtr przypinania, grupy, Edytuj/Gotowe, usuwanie) z kopią zapasową i przywracaniem. |
| `tools` | Timer uśpienia, układ strony, nagrody (automatyczne odbieranie, tryb, opóźnienie lub interwał, Odbierz teraz), ustawienia przycisku szybkiego odbioru z podglądem na żywo, zamrożenie alarmu i szybkie działania. |
| `notifications` | Przełączniki, rozmiar, czas trwania, nieprzezroczystość, podgląd, resetowanie pozycji i historia. |
| `sounds` | Przełącznik główny i głośność, przełączniki dla poszczególnych zdarzeń, głośności i podglądy. |
| `appearance` | Motyw, styl, kolory akcentujące, gęstość, kontrast, rozmiar tekstu, rozmycie, centrowanie i język. |
| `motion` | Podgląd na żywo, ustawienia wstępne i selektory efektu otwarcia, efektu najechania, animacji wskaźnika, prędkości i ikon. |
| `shortcuts` | Klawisz skrótu menu i klawisze skrótu akcji z ponownym wiązaniem. |
| `diagnostics` | Stan, skanowanie, raportowanie, kontrola jakości i konfliktów, tryb awaryjny i dziennik działań. |
| `about` | Wersja, łącza, eksport/import, cofanie, przywracanie i resetowanie. |

<a id="panel-controller-gui"></a>
## Kontroler panelu ( `GUI` )

### Budowa i renderowanie

| Metoda | Parametry / powrót | Co i jak to robi |
|---|---|---|
| `build` | — → nieważne | Tworzy hosta Shadow-DOM, panel, toast i aktywny region, a następnie łączy zdarzenia. |
| `applyLook` | — → nieważne | Stosuje motyw, styl, akcent, rozmycie, skalę tekstu, efekty, atrybuty języka i ustawienia tostów jako atrybuty i zmienne CSS. |
| `renderChrome` | — → nieważne | Renderuje tytuł, symbol zastępczy wyszukiwania, przycisk pauzy, podpowiedź w stopce i przycisk szybkiego zgłaszania roszczeń. |
| `renderNav` | — → nieważne | Renderuje zgrupowany pasek boczny. |
| `renderPage` | opcje → nieważne | Renderuje aktywną stronę (lub wszystkie strony podczas wyszukiwania), zachowując przewijanie i fokus klawiatury. |
| `filterRows` | — → nieważne | Stosuje filtr wyszukiwania do wierszy, kart i stron. |
| `channelEditor` | klucz, profil → html | Edytor jednego profilu kanału. |
| `refreshAll` , `onExternalChange` | — → nieważne | Wyrenderuj wszystko ponownie po zresetowaniu, zaimportowaniu, cofnięciu lub zmianie z innej karty. |

### Zmiany zdarzeń i ustawień

| Metoda | Parametry / powrót | Co i jak to robi |
|---|---|---|
| `wire` | — → nieważne | Dołącza delegowane procedury obsługi kliknięcia, wprowadzania danych, zmiany, kółka i przewijania oraz przeciągania panelu. |
| `onClick` , `onInput` , `onChange` | wydarzenie → nieważność | Wysyłaj kliknięcia, ruchy suwakami i edycje tekstu do ustawień, profili lub działań. |
| `applyRange` | klucz, wartość → nieważność | Stosuje wartość suwaka (objętość, rozmycie, krycie, czas trwania…). |
| `setSetting` , `setChannel` | klucz/łatka → nieważna | Zapisz ustawienie lub zmianę profilu i przesuń odpowiednią część do odtwarzacza. |
| `pushToPlayer` | zakres, klucz → nieważność | `media` ponownie stosują głośność, tryb cichy i prędkość; `all` również ponownie stosuje jakość. Głośność, wyciszenie, tryb cichy i prędkość nigdy nie otwierają ponownie menu jakości. |
| `act` | nazwa, element → Obietnica | Uruchamia nazwane akcje: ustawienia wstępne, zapisywanie i usuwanie kanałów, tworzenie kopii zapasowych, import/eksport, roszczenia, wyłącznik czasowy, skróty, diagnostyka i wiele innych. |
| `resetSection` | identyfikator → nieważny | Przywraca ustawienia domyślne jednej sekcji. |
| `restoreVolume` | — → nieważne | Ponownie stosuje zapisaną objętość. |
| `toggleLayout` | który → pustka | Ukrywa lub pokazuje czat lub lewe menu i zapamiętuje wybór. |
| `confirm` , `closeModal` | wiadomość, opcje / wynik → Obietnica/unieważnienie | Okno dialogowe potwierdzenia w panelu (identyczne w każdej przeglądarce). |
| `download` , `pickFile` , `pickImage` | … → pustka | Zapisz JSON, przeczytaj JSON i wybierz obraz dla przycisku szybkiego zgłoszenia. |
| `startCapture` , `finishCapture` | id / kombinacja → pustka | Połącz ponownie klawisz skrótu, odrzucając duplikaty. |
| `replayMock` | — → nieważne | Odtwarza efekt otwarcia w podglądzie animacji. |

### Narzędzia i diagnostyka

| Metoda | Parametry / powrót | Co i jak to robi |
|---|---|---|
| `startSleep` , `cancelSleep` , `syncSleep` | minuty / — → nieważne | Rozpocznij, anuluj i wyświetl timer uśpienia (wstrzymuje wideo na końcu). |
| `toggleFocusView` | — → Obietnica | Wchodzi lub wychodzi z trybu pełnoekranowego w kontenerze odtwarzacza. |
| `statusText` , `resultText` , `syncDiagnostics` | — → ciąg/pustka | Zlokalizowany stan nagłówka i strony diagnostycznej. |
| `record` | wiadomość, poziom → nieważność | Dodaje wpis ze znacznikiem czasu do dziennika akcji. |
| `copyDiagnostics` | — → Obietnica | Kopiuje krótki raport (wersja, status, jakość, typ strony, klient użytkownika). |
| `checkQuality` , `checkConflicts` | — → Obietnica/nieważność | Sprawdź, czy oferowana jest preferowana jakość, i wypisz ustawienia, które współdziałają ze sobą. |

### Przycisk szybkiego zgłoszenia

| Metoda | Parametry / powrót | Co i jak to robi |
|---|---|---|
| `renderClaimWidget` | — → nieważne | Tworzy, aktualizuje lub usuwa pływający przycisk i rozpoczyna jednosekundowe sondowanie stanu. |
| `syncClaimWidget` | — → nieważne | Pokazuje pierścień i kropkę „dostępna nagroda”, stan zajętości i regułę automatycznego ukrywania. |
| `placeClaimWidget` | — → nieważne | Pozycjonuje przycisk, mocując go do okna. |
| `wireClaimWidget` | element → pustka | Przeciągnij z progiem pięciu pikseli (przeciągnięcie nigdy nie liczy się jako kliknięcie), zapisywaniem pozycji i kliknięciem, które uruchamia ręczne roszczenie. |

### Powiadomienia, dźwięk i zachowanie panelu

| Metoda | Parametry / powrót | Co i jak to robi |
|---|---|---|
| `notify` | wiadomość, rodzaj, czas trwania, siła → nieważność | Pokazuje toast (chyba że jest wyłączony), zapisuje historię i ogłasza tekst w aktywnym regionie. |
| `notifyQuality` | zastosowany, jakość → nieważna | Odtwarza dźwięk wyniku, rejestruje i wyświetla zlokalizowane powiadomienie. |
| `initToastPosition` , `wireToastDrag` | — → nieważne | Przywróć i zapisz przeciągniętą pozycję tostu. |
| `onAvatars` | — → nieważne | Odświeża strony pokazujące awatary. |
| `ensureAudio` | — → kontekst | Tworzy i wznawia udostępniony `AudioContext` (odblokowany pierwszym gestem użytkownika). |
| `playSound` , `stopSounds` | nazwa, podgląd → nieważne | Generuj i zatrzymuj wskazówki Web Audio. |
| `playFreezeAlarm` , `alertFrozen` | siła → pustka | Zagraj w pięciodźwiękowy alarm i podnieś powiadomienie o zawieszeniu. |
| `placePanel` , `wirePanelDrag` | pozycja → nieważna | Umieść panel w oknie i umożliwij przeciąganie nagłówka. |
| `open` , `close` , `toggle` | — → nieważne | Kontroluj dźwięki panelu, odpytywania, fokusu i menu. |
| `syncVolumeControls` | — → nieważne | Synchronizuje suwak głośności z odtwarzaczem, gdy panel jest otwarty. |

<a id="hotkeys-and-startup"></a>
## Skróty klawiaturowe i uruchamianie

| Funkcja | Parametry / powrót | Co i jak to robi |
|---|---|---|
| `isolateKeys` | — → nieważne | Rejestrowane na `document-start` w fazie przechwytywania: zdarzenia klawiaturowe, które pochodzą z wnętrza panelu, przestają rozprzestrzeniać się do Kick (więc spacja, F, M i strzałki nigdy nie uruchamiają skrótów klawiszowych gracza), a Tab jest uwięziony w oknie dialogowym. |
| `setupHotkeys` | — → nieważne | Obsługuje przechwytywanie klawiszy w celu ponownego wiązania, Escape (modalny, rozwijany, panel), klawisz skrótu menu i klawisze skrótu akcji; kombinacje z modyfikatorem lub klawiszem F działają nawet podczas pisania. |
| `init` | — → nieważne | Tworzy panel, instaluje skróty klawiszowe i uruchamia `PlayerSync` ; chroniony przed podwójnym wtryskiem. |

<a id="kick-page-dependencies"></a>
## Usuń zależności strony

Skrypt opiera się na bieżących znacznikach Kicka. Tam, gdzie to możliwe, używa ikon, atrybutów i struktury zamiast widocznego tekstu, dzięki czemu działa w każdym języku interfejsu. Jeśli Kick je zmieni, dopasowująca funkcja przestanie działać (reszta będzie nadal działać).

| Funkcja | Czego szuka |
|---|---|
| Jakość | Widoczne `<video>` , `button[aria-haspopup="menu"]` i wpisy `[role="menuitemradio"]` . |
| Układ | Kontener z `data-sidebar` i `data-chat` , `[data-testid="sidebar-collapse"]` / `sidebar-expand` , przycisk z ikoną `CollapseRight` wewnątrz `#channel-chatroom` i przycisk z ikoną `MessagesOutline` do wyświetlania czatu. |
| Powiadomienie o nagrodzie | `video` , którego źródło zawiera `reward-available` lub karta `[role="group"]` zawierająca film `daily-rewards` . |
| Odbieranie nagród | `button[aria-haspopup="dialog"][aria-controls]` ikona prezentu), kontrolowane przez niego okno dialogowe ( `data-state` ), włączone przyciski roszczeń z elementem podrzędnym `.contents` i przycisk zamykania z etykietą `.sr-only` . |
| Krople | Elementy listy `#rewards-panel` z `[role="progressbar"][data-state="complete"]` i włączonym przyciskiem. |
| Awatary | `img[alt]` elementy, których źródłem jest `files.kick.com/images/user/…/profile_image/…` . |

<a id="localization"></a>
## Lokalizacja

Każda etykieta, komunikat pomocy, błąd, okno dialogowe i powiadomienie przechodzi przez moduł rozpoznawania tłumaczeń dla 38 ustawień regionalnych. Brakujące klucze wracają do języka angielskiego. Nowy tekst interfejsu jest tłumaczony na wszystkie obsługiwane języki wraz z funkcją, która go dodaje. Selektor języka pokazuje flagi i nazwy natywne; interfejs przy pierwszym uruchomieniu podąża za językiem przeglądarki, a później zapamiętuje wyraźny wybór.

<a id="safety-privacy-and-compatibility"></a>
## Bezpieczeństwo, prywatność i zgodność

- Ustawienia są odkażane przed przechowywaniem; nieprawidłowe wartości wracają do bezpiecznych wartości domyślnych.
- Nazwy kanałów, notatki, tekst powiadomienia i dane diagnostyczne są usuwane przed wstawieniem kodu HTML.
- Niestandardowa ikona przycisku jest ponownie kodowana z płótna i zapisywana jako adres URL danych wyłącznie dla dozwolonego typu obrazu; nigdy nie opuszcza przeglądarki.
- Shadow DOM oddziela style skryptu od Kick; zdarzenia klawiaturowe z panelu są izolowane od skrótów klawiszowych Kick'a.
- Automatyczne akcje pomijają wykluczone kanały, tryb awaryjny i brakujące elementy gracza. Odbierając nagrodę, nigdy nie naciskasz tego samego przycisku dwa razy za jednym razem i nie czekasz, aż widz napisze.
- Skrypt nie generuje żądań sieciowych; aktualizacje pochodzą z menedżera skryptów użytkownika lub ze strony Wersje.
- Istniejące ustawienia lokalne zostają zachowane przy przejściu z wersji 1.1.0, 1.2.0 i 1.3.0.
