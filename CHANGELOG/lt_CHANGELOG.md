<div align="center">

[English](./en_CHANGELOG.md) · [العربية](./ar_CHANGELOG.md) · [Беларуская](./be_CHANGELOG.md) · [Български](./bg_CHANGELOG.md) · [Čeština](./cs_CHANGELOG.md) · [Dansk](./da_CHANGELOG.md) · [Deutsch](./de_CHANGELOG.md) · [Ελληνικά](./el_CHANGELOG.md) · [Español](./es_CHANGELOG.md) · [Suomi](./fi_CHANGELOG.md) · [Français](./fr_CHANGELOG.md) · [हिन्दी](./hi_CHANGELOG.md) · [English (India)](./en-in_CHANGELOG.md) · [Hrvatski](./hr_CHANGELOG.md) · [Magyar](./hu_CHANGELOG.md) · [Bahasa Indonesia](./id_CHANGELOG.md) · [Italiano](./it_CHANGELOG.md) · [日本語](./ja_CHANGELOG.md) · [한국어](./ko_CHANGELOG.md) · **Lietuvių** · [Latviešu](./lv_CHANGELOG.md) · [Македонски](./mk_CHANGELOG.md) · [Монгол](./mn_CHANGELOG.md) · [Bahasa Melayu](./ms_CHANGELOG.md) · [Nederlands](./nl_CHANGELOG.md) · [Norsk](./no_CHANGELOG.md) · [Polski](./pl_CHANGELOG.md) · [Português](./pt_CHANGELOG.md) · [Română](./ro_CHANGELOG.md) · [Русский](./ru_CHANGELOG.md) · [Slovenčina](./sk_CHANGELOG.md) · [Srpski](./sr_CHANGELOG.md) · [Svenska](./sv_CHANGELOG.md) · [ไทย](./th_CHANGELOG.md) · [Türkçe](./tr_CHANGELOG.md) · [Tiếng Việt](./vi_CHANGELOG.md) · [简体中文](./zh-cn_CHANGELOG.md) · [繁體中文](./zh-tw_CHANGELOG.md)
</div>

# Kick Stream Tweaks – pakeitimų žurnalas

Išleidimo pastabos, skirtos [Kick Stream Tweaks](https://github.com/ebayybe/kick-stream-tweaks), vartotojo scenarijus, kuris prisimena „Kick“ grotuvo nuostatas ir prideda konfigūruojamą valdymo skydelį.

## v1.3.1 — 2026-11-06

> Išdėstymo sugriežtinimas kiekvienai kalbai ir teksto dydžiui, tikrai išskirtinis minimalus stilius, apdovanojimai ir išdėstymo pagalbinės priemonės, žaidėjo užšalimo signalas ir išmanesnė numatytoji kalba.

### Pridėta

– **Leistuvės užstrigimo signalas.** Aptinka užstrigusį grotuvą arba juodą ekraną (vaizdo įrašo laikas juda be iššifruotų kadrų), leidžia garsiai pavojaus signalą ir rodo pranešimą, net kai skirtukas sumažintas. Konfigūruojamas aptikimo laikas (5–60 s), nepriklausomas garso perjungimas ir bandymo mygtukas.
– **Automatinis atlygių reikalavimas** (pagal numatytuosius nustatymus išjungtas): atidaromas premijų langas, pareikalaujama, kas yra, vėl uždaroma ir grįžtama į srautą. Taip pat pareikalaujama už lašus, kurie rodomi apdovanojimų skydelyje. Yra mygtukas *Pareikšti pretenziją dabar*.
– **Atlygio tvarkaraštis.** Pagal numatytuosius nustatymus scenarijus laukia paties Kick pranešimo „paimk savo atlygį“ ir iš karto jį pareikalauja (su pasirenkama 0–60 s vėlavimu), o ne apklausa. Taip pat galimas suplanuotas režimas (kas 5–60 min.).
– **Greito paraiškos pateikimo mygtukas.** Mažas slankiojantis mygtukas sraute, kuris vienu spustelėjimu reikalauja atlygio. Vilkite jį bet kur (pozicija įsimenama), pasirinkite vieną iš keturių dizainų (Orb, Pill, Glass, Flat), penkias integruotas piktogramas, dydį ir neskaidrumą, pasirinktinai rodyti jį tik tada, kai yra atlygis. Jis šviečia ir rodo tašką, kai pasirodo „Kick“ apdovanojimo pranešimas. Nustatymų puslapyje yra tiesioginė peržiūra.
– **Jūsų piktograma.** Įkelkite PNG, JPG, WebP, GIF arba SVG (iki 2 MB) kaip mygtuko piktogramą, pasirinktinai užpildydami visą mygtuką. Vaizdas iš naujo užkoduojamas į mažą kvadratą ir saugomas tik jūsų naršyklėje.
- **Pelės ratukas ant slankiklių.** Kiekvieną slankiklį galima reguliuoti pelės ratuku užvedus jį, neslenkant skydelio.
- **Funkcijos nuoroda.** Naujas `en_FUNCTIONS.md` dokumentuoja architektūrą, kiekvieną nustatymą, kiekvieną funkciją ir Kick puslapio dalis, nuo kurių priklauso scenarijus.
– **Kanalų išsaugojimas pagal nurodymus.** Žingsnis po žingsnio kortelė „Kaip veikia išsaugoti kanalai“, vienas mygtukas **Išsaugoti šį kanalą**, kuriame išsaugoma dabartinė žiūrimo kanalo kokybė, garsumas, greitis ir garsas, užuomina vienu spustelėjimu skiltyje „Atkūrimas“ neišsaugotiems kanalams, patvirtinimo tostas, pažymėtas mygtukas *Redaguoti* / *Atlikta, nustatymų ištrynimo mygtukas ir išsaugotas*.
- **Tylus atkūrimas.** Nutildo srautą nenutildant grotuvo, todėl jis toliau grojamas fono skirtuke. Veikia visame pasaulyje ir kiekviename išsaugotame kanale (kanalų sąraše rodoma žyma *Silent*).
– **Kelių kalbų nustatymų paieška.** Paieškoje nenaudojami kirčiai, ji taip pat atitinka angliškus pavadinimus, todėl įvedus `volume` nustatymas randamas bet kuria sąsajos kalba. Ieškant pagal skyrių arba kortelės pavadinimą rodomas visas skyrius.
– **Puslapio išdėstymo valdikliai**: slėpkite pokalbį ir sutraukite kairįjį meniu skydelyje arba sparčiaisiais klavišais (`Alt+C`, `Alt+S`), su galimybe įsiminti kiekvieno srauto išdėstymą.
- **Piktogramų animacijos** šoninei juostai, iš naujo nustatyti ir pagalbos piktogramos su savo jungikliu (taip pat yra animacijos nustatymų dalis).
- **Kanalo pseudoportretai** yra užfiksuoti iš Kick ir rodomi išsaugotų kanalų sąraše.
- 14 akcentinių spalvų (buvo 6).
- Patvirtinimo dialogo langas skydelyje, kuris kiekvienoje naršyklėje atrodo identiškas.

### Pakeista

– **Sąsajos kalba** dabar atitinka naršyklės kalbą pirmą kartą paleidus. Kai pasirenkate kalbą, ji prisimenama. Nustatymai, perkelti iš senesnių versijų, seka naršyklę, kol aiškiai pasirenkama kalba.
– Dabar scenarijus prasideda nuo `document-start`, todėl jo klaviatūros izoliacija užregistruojama prieš paties puslapio klausytojus.
- Nustatymų eilutės yra sukrautos (etiketė virš valdiklio), todėl tekstas niekada negali persidengti arba iškirpti bet kokia kalba, teksto dydžiu ar skydelio plotiu. Šoninės juostos etiketės apgaubia žodžių ribas.
- Animacijos rinkikliai perdaryti į viso pločio eilutes su piktogramomis, todėl tinka ilgi vertimai.
- **Minimalus** skydelio stilius dabar yra plokščias ir kvadratinis, be švytėjimo, kraštinės pakeistos pertvaromis ir pabraukimo stiliaus pasirinkimu, todėl skirtumas nuo **Kick** yra akivaizdus.
- Skydelio plotis yra 680 px (jis susitraukia, kad tilptų mažiems langams). Skydelio pločio nustatymas ir dydžio keitimo rankenėlė buvo pašalinti, todėl išdėstymai yra vienodi visiems.
- Indikatoriaus animacijos pavadinime nebesakoma „žalia“, kai naudojama kita akcento spalva.

### Ištaisyta

- Pakeitus garsumą, nutildymą, tylų atkūrimą, automatinį garsumą ar greitį, kokybė taip pat vėl buvo pritaikyta (iš naujo atidarius kokybės meniu ir parodžius pranešimą). Tie nustatymai dabar liečia tik tai, ką pakeitėte; kokybė vėl taikoma tik pasikeitus kokybės nustatymui.
- Įvesdami nustatymų paiešką, galite suaktyvinti Kick sparčiuosius klavišus (pavyzdžiui, Space perjungė srautą į viso ekrano režimą). Klavišų paspaudimai skydelyje nebepasiekia puslapio.
- Pageidaujamas garsumas buvo perrašytas, kai „Kick“ atstatė grotuvą į savo 50% po pakartotinio įkėlimo, o skydelio slankiklis parodė 50%. Pakeitimai, kuriuos daro pats puslapis, dabar grąžinami į išsaugotą tomą; only your own actions update it.
- Teksto iškirpimas ir sutapimas išvaizdoje, animacijoje ir sparčiuosiuose klavišuose (ilgos etiketės, dideli teksto dydžiai, siauros plokštės, ilgi vertimai).
- Minimalus stilius tyliai išjungė fono suliejimo nustatymą; blur now works in both styles.
– Pakeitus greitojo paraiškos mygtuko neskaidrumą peržiūra neatnaujinta.
- Sliders did not react to the mouse wheel.
- Animacijos plytelės ("Skalė", "Pop"), perpildytos jų kortomis.
– Profilio ištrynimo patvirtinimui buvo naudojamas naršyklės vietinis dialogo langas.
- Sleep timer chips were not localized.
– Išsaugotuose kanaluose nebuvo pseudoportretų, o dabartiniame kanale – tol, kol nebuvo išsaugotas jo profilis.

### Suderinamumas

- Esami nustatymai ir išsaugoti kanalai išsaugomi atnaujinant iš v1.3.0, v1.2.0 ir v1.1.0.
- Scenarijus vis tiek nesiunčia telemetrijos ir neteikia jokių tinklo užklausų.

### Nuorodos

– [Saugykla](https://github.com/ebayybe/kick-stream-tweaks)
– [Leidimai](https://github.com/ebayybe/kick-stream-tweaks/releases)
– [Problemos] (https://github.com/ebayybe/kick-stream-tweaks/issues)

## v1.3.0 — 2026-11-03

> Visiškas pertvarkymas, logiška nustatymų struktūra, atkurta animacijos sistema ir daugybė patikimumo pataisymų, skirtų grotuvo automatizavimui.

### Pridėta

– Pertvarkytas skydelis su sugrupuota šonine juosta: **Leistuvė** (atkūrimas, kanalai, įrankiai), **perspėjimai** (pranešimai, garsai), **sąsaja** (išvaizda, animacijos, spartieji klavišai) ir **sistema** (diagnostika, duomenys ir apie tai).
- Naujas puslapis **Animacijos**: tiesioginės peržiūros etapas, trys išankstiniai nustatymai vienu spustelėjimu (Visas, Sumažintas, Išjungtas) ir atskiri atidarymo efekto rinkikliai (Nėra, Išblukimas, Skaidrė, Mastelis, Populiarumas), užvedimo efektas, indikatoriaus animacija ir greitis.
- Greiti išankstiniai nustatymai, skirti išsaugoti pralaidumą, geriausią kokybę, tylų žiūrėjimą ir VOD, taikomi akimirksniu.
- Quality picker redesigned as a chip grid; greitis, teksto skalė ir miego laikmatis naudoja lustus ir segmentuotus valdiklius, o ne išskleidžiamuosius meniu.
- Tiesioginė kanalų tvarkyklė: paieška, rūšiavimas, prisegimas, grupės, pastabos, redagavimas kiekviename kanale ir visa atsarginė kopija / atkūrimas, visa tai be įdėtų dialogų.
- Integruoti garso nustatymai su įvykio jungikliu, garsumo ir peržiūros mygtuku.
- Kokybės nuskaitymas diagnostikoje: atidaro grotuvo meniu, įrašo turimas savybes ir vėl uždaro.
- Spartieji klavišai dabar veikia naudojant bet kokį klaviatūros išdėstymą (jie atitinka fizinį klavišą).
- Settings sync between open Kick tabs.
- Akcentinių spalvų pavyzdžiai šalia pasirinktinio spalvų rinkiklio, didesnis teksto skalės diapazonas ir pirmenybės sumažinto judesio apsauga.

### Pakeista

- Nustatymai saugomi plonesniu formatu; 1.2.x konfigūracija, spartieji klavišai ir animacijos pasirinkimai perkeliami automatiškai.
- Atkūrimo greitis taikomas tik tada, kai jis skiriasi nuo 1×, todėl paties Kick tiesioginio krašto pasivijimas nebepaisomas.
- Anuliavimo istorija saugoma atmintyje, o ne įrašoma į vietinę saugyklą.
- Garso įvykiai, pranešimai ir spartieji klavišai turi vieną nuoseklų valdiklių rinkinį.
– „Situacijos profilio“ parinkiklis pakeičiamas išankstiniais nustatymais vienu spustelėjimu.

### Ištaisyta

- Uždarius grotuvo meniu pritaikius kokybę neberizikuoja jį atidaryti iš naujo.
- Atsarginė kokybė (pvz., 720p vietoj nepasiekiamos 1080p) nebeperrašo pageidaujamos kanalo kokybės.
- Tik tikri kokybiškų prekių paspaudimai atnaujina „paskutinį kartą naudotą“ kokybę; automatiniai paspaudimai ignoruojami.
- Įvedus nustatymų paieška nebepavyksta (įvykio tikslas buvo prarastas šešėliniame DOM).
– Viename skirtuke atlikti pakeitimai nebegali perrašyti kito skirtuko nustatymų.
- Skydelių spartieji klavišai nebeveikia, kai išdėstymai nėra lotyniški.
– Neteisingos etiketės diagnostikos žurnalo valdikliuose ir paklydęs korėjiečių kalbos žodis japoniško rašto pavadinime.
- Sustojo atkūrimo patikrinimai ir srauto sinchronizavimas pristabdytas, kol skirtukas paslėptas.

### Pašalinta

– Funkcijos, kurių nepavyko patikrinti pagal „Kick's“ grotuvą arba jos buvo dubliuojamos: mažos delsos parinktis, neaktyvaus grotuvo valdiklių slėpimas ir „GitHub“ pagrindu veikianti skydelio atnaujinimo patikra (naudokite vartotojo scenarijų tvarkyklės naujinimus arba leidimų puslapį).
- Per daug suprojektuotos parinktys: išsaugoti išvaizdos profiliai, skyrių rodymas / slėpimas / pertvarkymas, alternatyvūs naršymo režimai, suderinamumo ir vertimo aprėpties patikros, atsitiktinės / slinkties / skilties animacijos, pranešimų apie įvykį trukmė, kanalo pseudoportretai, grupių spalvos, rankinis užsakymas, masinis pasirinkimas, kiekvieno kanalo istorija ir automatinis valymas.

### Suderinamumas

- Esami nustatymai ir išsaugoti kanalai išsaugomi atnaujinant iš v1.2.0 ir v1.1.0.
- Nustatymai lieka vietiniai naršyklėje; scenarijus nesiunčia telemetrijos ir neteikia tinklo užklausų.

### Nuorodos

– [Saugykla](https://github.com/ebayybe/kick-stream-tweaks)
– [Leidimai](https://github.com/ebayybe/kick-stream-tweaks/releases)
– [Problemos] (https://github.com/ebayybe/kick-stream-tweaks/issues)

## v1.2.0 — 2026-10-07

> Išplėtė originalų kokybės ir garsumo pagalbininką į visą grotuvo nustatymų rinkinį.

### Pridėta

- Kanalo profiliai, skirti kokybei, garsumui, atkūrimo greičiui ir nutildymo būsenai.
- Išsaugotas kanalų sąrašas su pastabomis, grupėmis, profilio redagavimu ir importavimu / eksportu.
- Garso efektai su visuotiniu jungikliu, atskirų įvykių jungikliais, peržiūromis ir kiekvieno įvykio garsumu.
- Pranešimai apie kokybės pokyčius, atkurtą garsumą ir nesėkmingus veiksmus.
- Pranešimų istorija, veiksmų žurnalas ir diagnostikos įrankiai su aiškiais valdikliais.
- Kokybės prieinamumo patikrinimai, konfliktų patikrinimai ir suderinamumo patikros.
- Saugus režimas, skirtas laikinai išjungti automatinius grotuvo keitimus.
- Spartieji klavišai, skydelio vilkimas, skydelio dydžio keitimas ir centrinio skydelio veiksmas.
- „Kick“ ir „Minimal“ skydelių stiliai, kompaktiškas išdėstymas ir animacijos valdikliai.
- Išjungimo laikmatis, viso ekrano fokusavimo režimas, grotuvo pakartotinis sinchronizavimas ir atkūrimo valdikliai.
- Nustatymų ir kanalų profilių importavimas / eksportavimas.
- Klaviatūros naršymas, teksto mastelio keitimas, ekrano skaitytuvo pranešimai ir didelis kontrastas.
- Sąsajos lokalizavimas 38 palaikomoms kalboms.

### Ištaisyta

- Neleido atsirasti keliems antriniams dialogo langams vienu metu.
- Ištaisytas tuščias dialogo langas, pasirodantis virš garso nustatymų lango.
- Nepaisoma tuščių pranešimų pranešimų, o ne rodomos tuščios perdangos.
- Patobulintas ilgų etikečių vyniojimas ant siaurų plokščių ir lokalizuotas išdėstymas.
– Ištaisytas `{quality}` ir `{q}` rezervuotos vietos pakeitimas pranešimuose.
- Atnaujinta skydelio versijos etiketė ir atnaujintas palyginimas iki 1.2.0.

### Suderinamumas

- Esami nustatymai išsaugomi atnaujinant iš v1.1.0.
- Nustatymai lieka vietiniai naršyklėje; scenarijus nesiunčia telemetrijos.
- Atnaujinimo tikrintuvas nuskaito naujausią „GitHub“ leidimo žymą ir automatiškai neįdiegia naujinimų.

### Nuorodos

– [Saugykla](https://github.com/ebayybe/kick-stream-tweaks)
– [Leidimai](https://github.com/ebayybe/kick-stream-tweaks/releases)
– [Problemos] (https://github.com/ebayybe/kick-stream-tweaks/issues)

## v1.1.0

Originalioje viešoje versijoje pagrindinis dėmesys buvo skiriamas vaizdo įrašų kokybės ir garsumo atsiminimui „Kick“, automatiškai pritaikant juos naujiems srautams ir pateikiant F2 nustatymų skydelį.
