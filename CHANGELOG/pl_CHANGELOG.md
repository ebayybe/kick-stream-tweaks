<div align="center">

[English](./en_CHANGELOG.md) · [العربية](./ar_CHANGELOG.md) · [Беларуская](./be_CHANGELOG.md) · [Български](./bg_CHANGELOG.md) · [Čeština](./cs_CHANGELOG.md) · [Dansk](./da_CHANGELOG.md) · [Deutsch](./de_CHANGELOG.md) · [Ελληνικά](./el_CHANGELOG.md) · [Español](./es_CHANGELOG.md) · [Suomi](./fi_CHANGELOG.md) · [Français](./fr_CHANGELOG.md) · [हिन्दी](./hi_CHANGELOG.md) · [English (India)](./en-in_CHANGELOG.md) · [Hrvatski](./hr_CHANGELOG.md) · [Magyar](./hu_CHANGELOG.md) · [Bahasa Indonesia](./id_CHANGELOG.md) · [Italiano](./it_CHANGELOG.md) · [日本語](./ja_CHANGELOG.md) · [한국어](./ko_CHANGELOG.md) · [Lietuvių](./lt_CHANGELOG.md) · [Latviešu](./lv_CHANGELOG.md) · [Македонски](./mk_CHANGELOG.md) · [Монгол](./mn_CHANGELOG.md) · [Bahasa Melayu](./ms_CHANGELOG.md) · [Nederlands](./nl_CHANGELOG.md) · [Norsk](./no_CHANGELOG.md) · **Polski** · [Português](./pt_CHANGELOG.md) · [Română](./ro_CHANGELOG.md) · [Русский](./ru_CHANGELOG.md) · [Slovenčina](./sk_CHANGELOG.md) · [Srpski](./sr_CHANGELOG.md) · [Svenska](./sv_CHANGELOG.md) · [ไทย](./th_CHANGELOG.md) · [Türkçe](./tr_CHANGELOG.md) · [Tiếng Việt](./vi_CHANGELOG.md) · [简体中文](./zh-cn_CHANGELOG.md) · [繁體中文](./zh-tw_CHANGELOG.md)
</div>

# Ulepszenia strumienia kopnięcia — dziennik zmian

Informacje o wersji [Ulepszenia strumienia Kick](https://github.com/ebayybe/kick-stream-tweaks), skryptu użytkownika, który zapamiętuje preferencje odtwarzacza Kick i dodaje konfigurowalny panel sterowania.

## v1.3.1 — 2026-11-06

> Wzmocnienie układu dla każdego języka i rozmiaru tekstu, naprawdę wyraźny styl Minimal, nagrody i pomoce układu, alarm zawieszania gracza i inteligentniejszy język domyślny.

### Dodano

- **Alarm zamrożenia odtwarzacza.** Wykrywa zatrzymanie odtwarzacza lub czarny ekran (czas wideo przesuwa się bez zdekodowanych klatek), odtwarza głośny dźwięk alarmu i wyświetla powiadomienie, nawet gdy karta jest zminimalizowana. Konfigurowalny czas detekcji (5–60 s), niezależny przełącznik dźwięku i przycisk testowy.
- **Automatycznie odbieraj nagrody** (domyślnie wyłączone): otwiera okno nagród, odbiera dostępne rzeczy, zamyka je ponownie i wraca do strumienia. Odbierane są także krople widoczne w panelu nagród. Zawiera przycisk *Odbierz teraz*.
- **Harmonogram nagród.** Domyślnie skrypt czeka na powiadomienie Kicka „odbierz nagrodę” i odbiera je od razu (z opcjonalnym opóźnieniem 0–60 s), zamiast odpytywać. Dostępny jest również tryb zaplanowany (co 5–60 minut).
- **Przycisk szybkiego odbioru.** Mały pływający przycisk na strumieniu, który pozwala odebrać nagrodę jednym kliknięciem. Przeciągnij go w dowolne miejsce (pozycja zostanie zapamiętana), wybierz jeden z czterech projektów (Kula, Pigułka, Szkło, Płaski), pięć wbudowanych ikon, rozmiar i przezroczystość, opcjonalnie pokaż go tylko wtedy, gdy dostępna jest nagroda. Świeci i pokazuje kropkę, gdy pojawia się powiadomienie o nagrodzie Kick'a. Strona ustawień zawiera podgląd na żywo.
- **Twoja własna ikona.** Prześlij plik PNG, JPG, WebP, GIF lub SVG (do 2 MB) jako ikonę przycisku, opcjonalnie wypełniając cały przycisk. Obraz jest ponownie kodowany do małego kwadratu i przechowywany tylko w Twojej przeglądarce.
- **Kółko myszy na suwakach.** Każdy suwak można regulować za pomocą kółka myszy podczas najechania na niego, bez konieczności przewijania panelu.
- **Odniesienie do funkcji.** Nowy plik `en_FUNCTIONS.md` dokumentuje architekturę, każde ustawienie, każdą funkcję i części strony Kick, od których zależy skrypt.
- **Instrukcje zapisywania kanałów.** Karta krok po kroku „Jak działają zapisane kanały”, pojedynczy przycisk **Zapisz ten kanał** przechowujący bieżącą jakość, głośność, prędkość i dźwięk oglądanego kanału, wskazówka jednym kliknięciem w trybie odtwarzania niezapisanych kanałów, toast potwierdzający, przyciski z etykietą *Edytuj* / *Gotowe* na liście oraz przełącznik umożliwiający wstrzymywanie zapisanych ustawień bez ich usuwania.
- **Ciche odtwarzanie.** Wycisza strumień bez wyciszania odtwarzacza, dzięki czemu odtwarzanie jest kontynuowane w zakładce tła. Działa globalnie i dla każdego zapisanego kanału (na liście kanałów wyświetlany jest znacznik *Silent*).
- **Wyszukiwanie ustawień wielojęzycznych.** Wyszukiwanie nie uwzględnia akcentu i dopasowuje również nazwy w języku angielskim, więc wpisanie `volume` spowoduje wyszukanie ustawienia w dowolnym języku interfejsu. Wyszukiwanie według tytułu sekcji lub karty powoduje wyświetlenie całej sekcji.
- **Kontrola układu strony**: ukryj czat i zwiń lewe menu z panelu lub za pomocą klawiszy skrótu (`Alt+C`, `Alt+S`), z opcją zapamiętania układu dla każdego strumienia.
- **Animacje ikon** na pasku bocznym, ikony resetowania i pomocy, z własnym przełącznikiem (również część gotowych ustawień animacji).
- **Awatary kanałów** są przechwytywane z Kick i wyświetlane na liście zapisanych kanałów.
- 14 kolorów akcentujących (było 6).
- Okno dialogowe potwierdzenia w panelu, które wygląda identycznie w każdej przeglądarce.

### Zmieniono

- **Język interfejsu** jest teraz zgodny z językiem przeglądarki przy pierwszym uruchomieniu. Gdy wybierzesz język, zostanie on zapamiętany. Ustawienia przeniesione ze starszych wersji podążają za przeglądarką do momentu wyraźnego wybrania języka.
- Skrypt zaczyna się teraz od `document-start`, więc izolacja klawiatury jest rejestrowana przed własnymi słuchaczami strony.
- Wiersze ustawień są ułożone jedno na drugim (etykieta nad kontrolką), więc tekst nie może nakładać się ani przycinać, niezależnie od języka, rozmiaru tekstu i szerokości panelu. Etykiety na pasku bocznym zawijają się na granicach wyrazów.
- Selektory animacji są przebudowywane jako wiersze o pełnej szerokości z ikonami, więc pasują długie tłumaczenia.
- Styl panelu **Minimal** jest teraz płaski i kwadratowy, bez blasku, obramowania zastąpiono przekładkami i zaznaczonym stylem podkreślenia, więc różnica w stosunku do **Kick** jest oczywista.
- Panel ma stałą szerokość 680 px (zmniejsza się do małych okien). Usunięto ustawienie szerokości panelu i uchwyt zmiany rozmiaru, więc układy są takie same dla wszystkich.
- Tytuł animacji wskaźnika nie jest już wyświetlany jako „zielony”, gdy używany jest inny kolor akcentujący.

### Naprawiono

- Zmiana głośności, wyciszenie, ciche odtwarzanie, automatyczna głośność lub prędkość ponownie zastosowały jakość (ponowne otwarcie menu jakości i wyświetlenie powiadomienia). Te ustawienia dotyczą teraz tylko tego, co zmieniłeś; jakość zostanie ponownie zastosowana tylko w przypadku zmiany ustawienia jakości.
- Wpisanie wyszukiwania ustawień może uruchomić klawisze skrótu Kick (na przykład Space przełączył strumień na pełny ekran). Naciśnięcia klawiszy wewnątrz panelu nie powodują już dotarcia do strony.
- Preferowana głośność została nadpisana, gdy Kick zresetował odtwarzacz do własnych 50% po przeładowaniu, a suwak panelu pokazywał 50%. Zmiany dokonane samodzielnie przez stronę są teraz przywracane do zapisanego wolumenu; aktualizują go tylko Twoje własne działania.
- Przycinanie i nakładanie się tekstu w wyglądzie, animacjach i skrótach klawiszowych (długie etykiety, duże rozmiary tekstu, wąskie panele, długie tłumaczenia).
- Styl Minimal po cichu wyłączył ustawienie rozmycia tła; rozmycie działa teraz w obu stylach.
- Zmiana przezroczystości przycisku szybkiego zgłoszenia nie spowodowała aktualizacji podglądu.
- Suwaki nie reagowały na kółko myszy.
- Płytki animacji („Skala”, „Pop”) przepełnione kartami.
- Potwierdzenie usunięcia profilu korzystało z natywnego okna dialogowego przeglądarki.
— Nie zlokalizowano chipów wyłącznika czasowego.
- Zapisane kanały nie pokazywały żadnych awatarów, a bieżący kanał nie pokazywał żadnego, dopóki jego profil nie został zapisany.

### Zgodność

- Istniejące ustawienia i zapisane kanały zostają zachowane podczas aktualizacji z wersji 1.3.0, 1.2.0 i 1.1.0.
— Skrypt nadal nie wysyła żadnych danych telemetrycznych ani nie wysyła własnych żądań sieciowych.

### Linki

- [Repozytorium](https://github.com/ebayybe/kick-stream-tweaks)
- [Wersje](https://github.com/ebayybe/kick-stream-tweaks/releases)
– [Problemy] (https://github.com/ebayybe/kick-stream-tweaks/issues)

## v1.3.0 — 2026-11-03

> Całkowite przeprojektowanie, logiczna struktura ustawień, przebudowany system animacji i seria poprawek niezawodności automatyzacji odtwarzacza.

### Dodano

- Przeprojektowany panel z pogrupowanym paskiem bocznym: **Odtwarzacz** (Odtwarzanie, Kanały, Narzędzia), **Alerty** (Powiadomienia, Dźwięki), **Interfejs** (Wygląd, animacje, Skróty) i **System** (Diagnostyka, Dane i informacje).
- Nowa strona **Animacje**: etap podglądu na żywo, trzy ustawienia wstępne dostępne za jednym kliknięciem (Pełny, Zredukowany, Wyłączony) i oddzielne selektory efektu otwarcia (Brak, Zanikanie, Przesuwanie, Skalowanie, Pop), efekt najechania, animacja wskaźnika i prędkość.
- Szybkie ustawienia wstępne oszczędzania przepustowości, najlepszej jakości, cichego oglądania i VOD, stosowane natychmiast.
- Selektor jakości przeprojektowany jako siatka żetonów; prędkość, skala tekstu i wyłącznik czasowy wykorzystują chipy i elementy sterujące podzielone na segmenty zamiast list rozwijanych.
- Wbudowany menedżer kanałów: wyszukiwanie, sortowanie, przypinanie, grupowanie, notatki, edycja poszczególnych kanałów i pełna kopia zapasowa/przywracanie, a wszystko to bez zagnieżdżonych okien dialogowych.
- Wbudowane ustawienia dźwięku z przełącznikiem dla każdego zdarzenia, przyciskiem głośności i podglądu.
- Skanowanie jakości w diagnostyce: otwiera menu odtwarzacza, rejestruje dostępne jakości i zamyka je ponownie.
- Klawisze skrótu działają teraz na dowolnym układzie klawiatury (są dopasowane do klawisza fizycznego).
- Synchronizacja ustawień pomiędzy otwartymi zakładkami Kick.
- Próbki kolorów akcentujących obok niestandardowego próbnika kolorów, większy zakres skali tekstu i zabezpieczenie przed preferowanym ruchem.

### Zmieniono

- Ustawienia są przechowywane w bardziej oszczędnym formacie; konfiguracja 1.2.x, skróty klawiszowe i opcje animacji są migrowane automatycznie.
- Szybkość odtwarzania jest stosowana tylko wtedy, gdy różni się od 1×, więc własne nadrabianie zaległości na żywo przez Kick nie jest już zastępowane.
- Historia cofnięć jest przechowywana w pamięci, a nie zapisywana w pamięci lokalnej.
- Zdarzenia dźwiękowe, powiadomienia i klawisze skrótów mają wspólny zestaw elementów sterujących.
- Selektor „Profil sytuacji” został zastąpiony ustawieniami dostępnymi za pomocą jednego kliknięcia.

### Naprawiono

- Zamknięcie menu odtwarzacza po zastosowaniu jakości nie powoduje już ryzyka ponownego jego otwarcia.
- Jakość zastępcza (na przykład 720p zamiast niedostępnego 1080p) nie zastępuje już preferowanej jakości zapisanej dla kanału.
- Tylko prawdziwe kliknięcia na przedmioty wysokiej jakości aktualizują jakość „ostatnio używanego”; automatyczne kliknięcia są ignorowane.
- Wyszukiwanie ustawień nie kończy się już niepowodzeniem po wpisaniu (cel zdarzenia został utracony w Shadow DOM).
- Zmiany dokonane na jednej karcie nie mogą już zastępować ustawień z innej karty.
- Klawisze skrótu panelu nie psują się już w układach innych niż łacińskie.
- Nieprawidłowe etykiety w kontrolkach dziennika diagnostycznego i przypadkowe koreańskie słowo w tytule japońskiego pisma.
- Kontrola wstrzymanego odtwarzania i pauza synchronizacji strumienia, gdy karta jest ukryta.

### Usunięto

- Funkcje, których nie można było zweryfikować w stosunku do odtwarzacza Kick lub go zduplikować: preferencje dotyczące małych opóźnień, ukrywanie elementów sterujących odtwarzacza w stanie bezczynności oraz sprawdzanie aktualizacji w panelu w oparciu o GitHub (skorzystaj z aktualizacji menedżera skryptów użytkownika lub strony Wersje).
- Przeprojektowane opcje: zapisane profile wyglądu, pokazywanie/ukrywanie/zmiana kolejności sekcji, alternatywne tryby nawigacji, sprawdzanie zgodności i zasięgu tłumaczeń, animacje losowe/przewijania/sekcji, czas trwania powiadomień dla poszczególnych zdarzeń, awatary kanałów, kolory grup, porządkowanie ręczne, wybór zbiorczy, historia poszczególnych kanałów i automatyczne czyszczenie.

### Zgodność

- Istniejące ustawienia i zapisane kanały zostają zachowane podczas aktualizacji z wersji 1.2.0 i 1.1.0.
- Ustawienia pozostają lokalne dla przeglądarki; skrypt nie wysyła danych telemetrycznych ani nie wysyła żądań sieciowych.

### Linki

- [Repozytorium](https://github.com/ebayybe/kick-stream-tweaks)
- [Wersje](https://github.com/ebayybe/kick-stream-tweaks/releases)
– [Problemy] (https://github.com/ebayybe/kick-stream-tweaks/issues)

## v1.2.0 — 2026-10-07

> Rozszerzono oryginalny pomocnik dotyczący jakości i głośności do pełnego zestawu narzędzi ustawień odtwarzacza.

### Dodano

- Profile dla poszczególnych kanałów dotyczące jakości, głośności, szybkości odtwarzania i stanu wyciszenia.
- Zapisana lista kanałów z notatkami, grupami, edycją profilu i importem/eksportem.
- Efekty dźwiękowe z przełącznikiem globalnym, indywidualnymi przełącznikami zdarzeń, podglądami i głośnością poszczególnych zdarzeń.
- Powiadomienia o zmianach jakości, przywróconym wolumenie i nieudanych działaniach.
- Historia powiadomień, dziennik działań i narzędzia diagnostyczne z przejrzystymi kontrolami.
- Kontrole dostępności jakości, kontrole konfliktów i kontrole zgodności.
- Tryb awaryjny do tymczasowego wyłączenia automatycznych zmian graczy.
- Klawisze skrótu, przeciąganie panelu, zmiana rozmiaru panelu i działanie na panelu środkowym.
- Style paneli typu kick i minimal, kompaktowy układ i elementy sterujące animacjami.
- Wyłącznik czasowy, tryb ustawiania ostrości na pełnym ekranie, ponowna synchronizacja odtwarzacza i sterowanie odtwarzaniem.
- Import/eksport ustawień i profili kanałów.
- Nawigacja za pomocą klawiatury, skalowanie tekstu, komunikaty czytnika ekranu i wysoki kontrast.
- Lokalizacja interfejsu dla 38 obsługiwanych języków.

### Naprawiono

- Zapobiegnięto jednoczesnemu pojawianiu się wielu dodatkowych okien dialogowych.
- Naprawiono puste okno dialogowe pojawiające się nad oknem ustawień dźwięku.
- Ignorowano puste powiadomienia zamiast pokazywać puste nakładki.
- Ulepszone owijanie długimi etykietami na wąskich panelach i zlokalizowanych układach.
- Naprawiono zastępowanie symboli zastępczych `{quality` i `{q}` w powiadomieniach.
— Zaktualizowano etykietę wersji w panelu i porównanie aktualizacji do wersji 1.2.0.

### Zgodność

- Istniejące ustawienia zostaną zachowane podczas aktualizacji z wersji 1.1.0.
- Ustawienia pozostają lokalne dla przeglądarki; skrypt nie wysyła danych telemetrycznych.
— Narzędzie do sprawdzania aktualizacji odczytuje najnowszy tag wydania GitHub i nie instaluje aktualizacji automatycznie.

### Linki

- [Repozytorium](https://github.com/ebayybe/kick-stream-tweaks)
- [Wersje](https://github.com/ebayybe/kick-stream-tweaks/releases)
– [Problemy] (https://github.com/ebayybe/kick-stream-tweaks/issues)

## wersja 1.1.0

Oryginalna wersja publiczna skupiała się na zapamiętywaniu jakości i głośności wideo w Kick, automatycznym stosowaniu ich do nowych strumieni i udostępnianiu panelu ustawień F2.
