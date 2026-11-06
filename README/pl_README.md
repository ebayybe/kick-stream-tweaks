<div align="center">

[English](./en_README.md) · [العربية](./ar_README.md) · [Беларуская](./be_README.md) · [Български](./bg_README.md) · [Čeština](./cs_README.md) · [Dansk](./da_README.md) · [Deutsch](./de_README.md) · [Ελληνικά](./el_README.md) · [Español](./es_README.md) · [Suomi](./fi_README.md) · [Français](./fr_README.md) · [हिन्दी](./hi_README.md) · [English (India)](./en-in_README.md) · [Hrvatski](./hr_README.md) · [Magyar](./hu_README.md) · [Bahasa Indonesia](./id_README.md) · [Italiano](./it_README.md) · [日本語](./ja_README.md) · [한국어](./ko_README.md) · [Lietuvių](./lt_README.md) · [Latviešu](./lv_README.md) · [Македонски](./mk_README.md) · [Монгол](./mn_README.md) · [Bahasa Melayu](./ms_README.md) · [Nederlands](./nl_README.md) · [Norsk](./no_README.md) · **Polski** · [Português](./pt_README.md) · [Română](./ro_README.md) · [Русский](./ru_README.md) · [Slovenčina](./sk_README.md) · [Srpski](./sr_README.md) · [Svenska](./sv_README.md) · [ไทย](./th_README.md) · [Türkçe](./tr_README.md) · [Tiếng Việt](./vi_README.md) · [简体中文](./zh-cn_README.md) · [繁體中文](./zh-tw_README.md)

# Kick Stream Tweaks

**Twój odtwarzacz Kick, pamiętaj.** Jakość, głośność i prędkość są przywracane automatycznie w każdym strumieniu dzięki szybkiemu, w pełni zlokalizowanemu panelowi sterowania.

[![Version](https://img.shields.io/badge/version-1.3.1-53fc18?style=flat-square)](https://github.com/ebayybe/kick-stream-tweaks/releases)
[![License](https://img.shields.io/badge/license-MIT-blue?style=flat-square)](./LICENSE)
[![Languages](https://img.shields.io/badge/languages-38-8a5cf6?style=flat-square)](#languages)
[![Userscript](https://img.shields.io/badge/Tampermonkey%20%7C%20Violentmonkey-supported-orange?style=flat-square)](#installation)

[Zainstalować](#installation) · [Cechy](#features) · [Mapa ustawień](#settings-map) · [Skróty](#shortcuts) · [Odniesienie do funkcji](../docs/pl_FUNCTIONS.md) · [Dziennik zmian](../CHANGELOG/pl_CHANGELOG.md) · [Wydania](https://github.com/ebayybe/kick-stream-tweaks/releases)

</div>

<a id="features"></a>
## Cechy

- 
- **Głośność, która się utrzymuje.** Głośność i wyciszenie są przywracane w każdym strumieniu, z ostrzeżeniem o dużej głośności i suwakiem na żywo, który pozostaje zsynchronizowany z odtwarzaczem.
- **Profile dla poszczególnych kanałów.** Otwórz strumień, naciśnij **Zapisz ten kanał**, a kanał ten zapamięta swoją jakość, głośność, prędkość i dźwięk. Dodaj grupę i notatkę, wstrzymaj zapisane ustawienia lub całkowicie wyłącz kanał z automatyzacji.
- **Szybkie ustawienia wstępne.** Oszczędzaj przepustowość, najlepszą jakość, ciche oglądanie i VOD jednym kliknięciem.
- **Narzędzia.** Wyłącznik czasowy, widok skupiony, ponowna synchronizacja odtwarzacza, sterowanie układem strony (ukryj czat, zwiń menu po lewej stronie) i tryb awaryjny, który wstrzymuje wszystkie automatyczne zmiany.
- **Zablokuj alarm.** Odtwarza głośny alarm i wyświetla powiadomienie, gdy odtwarzacz zawiesza się lub wyświetla czarny ekran, nawet jeśli karta jest zminimalizowana.
- **Przycisk szybkiego odbioru.** Pływający, przeciągany przycisk, który pozwala odebrać nagrodę jednym kliknięciem. Cztery projekty, pięć ikon lub własny obraz, regulowany rozmiar i krycie.
- **Automatycznie odbieraj nagrody.** Opcjonalnie: czeka na powiadomienie o nagrodzie przez Kick (lub sprawdza zgodnie z harmonogramem), odbiera to, co jest dostępne i ponownie zamyka okno (domyślnie wyłączone).
- **Ciche odtwarzanie.** Wycisza strumień bez wyciszania odtwarzacza, dzięki czemu odtwarzanie jest kontynuowane w zakładce w tle. Ustaw to globalnie lub dla każdego zapisanego kanału.
- **Alerty.** Powiadomienia, które możesz przeciągać, zmieniać ich rozmiar i wyciszać, a także opcjonalne efekty dźwiękowe z głośnością poszczególnych zdarzeń.
- **Przeprojektowany interfejs.** Zgrupowany pasek boczny, wyszukiwanie ustawień, jasne i ciemne motywy, kolory akcentujące, tryb kompaktowy, skalowanie tekstu i wysoki kontrast.
- **Animacje, którymi sterujesz.** Podgląd na żywo, trzy ustawienia wstępne i oddzielne efekty otwierania, najechania i wskaźników. Przestrzega ustawienia systemowego „ograniczania ruchu”.
- **38 języków** z flagami. Interfejs dostosowuje się do języka Twojej przeglądarki przy pierwszym uruchomieniu, a później zapamiętuje Twój wybór.
- **Prywatny z założenia.** Wszystko pozostaje w Twojej przeglądarce. Brak telemetrii, brak żądań sieciowych.

<a id="installation"></a>
## Instalacja

1. Zainstaluj menedżera skryptów użytkownika: [Tampermonkey](https://www.tampermonkey.net/) Lub [Violentmonkey](https://violentmonkey.github.io/).
2. Otwarte [`kick-stream-tweaks.user.js`](https://github.com/ebayybe/kick-stream-tweaks/raw/main/kick-stream-tweaks.user.js) i potwierdź instalację.
3. Otwórz dowolny strumień [kick.com](https://kick.com) i naciśnij **F2**.

Aktualizacje są dostarczane przez menedżera skryptów użytkownika. Można także obejrzeć [Releases](https://github.com/ebayybe/kick-stream-tweaks/releases) strona.

## Zapisywanie ustawień kanału

1. Otwórz strumień kanału, który chcesz dostosować.
2. Otwórz panel (`F2`) i naciśnij **Zapisz ten kanał** (na stronie **Kanały** lub zgodnie z podpowiedzią na stronie **Odtwarzanie**). Bieżące ustawienia jakości, głośności, szybkości i dźwięku są zapisywane dla tego kanału.
3. Dostosuj je w edytorze pod przyciskiem. Są one stosowane automatycznie przy każdym otwarciu tego kanału.

Użyj przełącznika **Zastosuj zapisane ustawienia na tym kanale**, aby wstrzymać profil bez jego usuwania, lub **Usuń**, aby go usunąć. Wszystkie zapisane kanały są wymienione w sekcji **Kanały → Zapisane kanały**, gdzie możesz wyszukiwać, sortować, przypinać, grupować, dodawać notatki, tworzyć kopie zapasowe i przywracać je.

<a id="settings-map"></a>
## Mapa ustawień

| Grupa | Strona | Co jest w środku |
| --- | --- | --- |
| Odtwarzacz | **Odtwarzanie nagranego dźwięku** | Zaprogramowane ustawienia, jakość na żywo/VOD, powrót, głośność, wyciszenie, ostrzeżenie o dużej głośności, prędkość |
| Odtwarzacz | **Kanały** | Aktualny profil kanału, zapisane kanały, wyszukiwanie, grupy, notatki, kopia zapasowa |
| Odtwarzacz | **Narzędzia** | Wyłącznik czasowy, układ strony, automatyczne odbieranie nagród, przycisk szybkiego odbierania, zamrażanie alarmu, szybkie akcje, widok fokusowy |
| Alerty | **Powiadomienia** | Nie przeszkadzać, rozmiar, czas trwania, nieprzezroczystość, pozycja, historia |
| Alerty | **Dźwięki** | Przełącznik główny i głośność, przełącznik dla poszczególnych zdarzeń, głośność i podgląd |
| Interfejs | **Wygląd** | Motyw, styl panelu, kolor akcentu, gęstość, kontrast, rozmycie, skala tekstu, język |
| Interfejs | **Animacje** | Podgląd na żywo, ustawienia wstępne, efekty otwierania/najechania/wskaźników, prędkość |
| Interfejs | **Skróty** | Klawisz skrótu menu i klawisze skrótu akcji |
| System | **Diagnostyka** | Stan na żywo, skanowanie jakości, sprawdzanie konfliktów, tryb awaryjny, dziennik działań |
| System | **Dane i informacje** | Eksportuj, importuj, cofaj, resetuj, przywracaj kopię zapasową, linki |

Każdy suwak reaguje także na ruch kółka myszy po najechaniu nim. Użyj pola wyszukiwania u góry panelu, aby znaleźć dowolne ustawienie według nazwy. Wyszukiwarka rozpoznaje także angielskie nazwy, więc działa tak samo w każdym języku interfejsu, a wpisane tam klawisze nigdy nie trafiają na stronę.

## Przycisk szybkiego zgłoszenia

Włącz tę opcję w **Narzędzia → Przycisk szybkiego zgłoszenia na stronie**. Na strumieniu pojawi się mały przycisk:

- **Przeciągnij** w dowolne miejsce; jego pozycja jest pamiętana.
- **Kliknij**, aby odebrać nagrodę (otwiera okno nagród, naciska *Odbierz*, zamyka okno i wraca do strumienia).
- **Świeci i pokazuje czerwoną kropkę**, gdy pojawia się powiadomienie o nagrodzie od Kopnięcia. Włącz opcję *Pokazuj tylko wtedy, gdy nagroda jest dostępna*, aby przez resztę czasu była ukryta.
- Wybierz **styl** (Kula, pigułka, szkło, płaski), wbudowaną **ikonę** lub **własny obraz** (PNG, JPG, WebP, GIF lub SVG do 2 MB; najlepiej wyglądają kwadratowe obrazy z przezroczystym tłem), **rozmiar** i **przezroczystość**. Podgląd na żywo pokazuje każdą zmianę.

Przycisk ten jest niezależny od przycisku *Automatyczne odbieranie nagród*, więc możesz odebrać je ręcznie, automatycznie lub w obu przypadkach.

<a id="shortcuts"></a>
## Skróty

| Działanie | Domyślny |
| --- | --- |
| Otwórz/zamknij panel | `F2` |
| Przełącz powiadomienia | `Alt+N` |
| Przełącz czat | `Alt+C` |
| Przełącz lewe menu | `Alt+S` |
| Widok ostrości | `Alt+F` |
| Zresetuj jakość | `Alt+Q` |
| Przywróć głośność | `Alt+V` |

Każdy skrót można odtworzyć w **Skrótach**. Powiązania są zgodne z klawiszem fizycznym, więc działają na dowolnym układzie klawiatury.

<a id="languages"></a>
## Języki

Arabski, białoruski, bułgarski, chiński (uproszczony), chiński (tradycyjny), chorwacki, czeski, duński, holenderski, angielski, angielski (Indie), fiński, francuski, niemiecki, grecki, hindi, węgierski, indonezyjski, włoski, japoński, koreański, łotewski, litewski, macedoński, malajski, mongolski, norweski, polski, portugalski, rumuński, rosyjski, serbski, słowacki, hiszpański, szwedzki, tajski, turecki i wietnamski.

## Rozwiązywanie problemów

- **Jakość nie jest stosowana.** Otwórz **Diagnostyka**, naciśnij *Odśwież diagnostykę*, aby przeskanować jakość oferowaną przez Kick, a następnie *Sprawdź wybraną jakość*. Jeśli kanał jest wykluczony lub włączony jest tryb bezpieczny, linia stanu informuje o tym.
- **Nagrody nie są odbierane.** Automatyczne odbieranie jest domyślnie wyłączone. Włącz tę opcję w **Narzędzia → Nagrody** i wypróbuj *Odbierz teraz*. Działa tylko na kanałach na żywo, gdy zakładka jest widoczna i nie piszesz na czacie. W trybie *powiadomienia* skrypt reaguje na baner z nagrodą Kick'a.
- **Ciche odtwarzanie i dźwięk.** Ciche odtwarzanie kieruje wideo przez silnik audio przeglądarki z zerowym wzmocnieniem. Jeśli witryna to blokuje, panel poinformuje Cię o tym, a normalny dźwięk pozostanie niezmieniony.
- **Coś zachowuje się dziwnie.** Uruchom *Sprawdź, czy nie ma konfliktów* lub użyj *Resetuj sekcję* na danej stronie.
- **Po aktualizacji ustawienia wyglądają nieprawidłowo.** Użyj opcji **Dane i informacje → Cofnij** lub **Przywróć kopię zapasową**.
- **Znalazłeś błąd?** Naciśnij *Kopiuj diagnostykę* i dołącz go do pliku [new issue](https://github.com/ebayybe/kick-stream-tweaks/issues).

## Prywatność

Ustawienia i profile kanałów są przechowywane w pamięci lokalnej Twojej przeglądarki na kick.com. Skrypt nigdy nigdzie nie wysyła danych i nie żąda żadnych dodatkowych uprawnień (`@grant none`).

## Wkład

Problemy i prośby o ściągnięcie są mile widziane. Skrypt jest pojedynczym, samodzielnym plikiem, więc próba zmiany nie wymaga żadnego etapu kompilacji: edycja `kick-stream-tweaks.user.js` i ponownie załaduj stronę.

## Licencja

[MIT](./LICENSE)
