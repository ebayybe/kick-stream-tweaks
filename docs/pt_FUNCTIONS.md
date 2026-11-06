<div align="center">

[English](./en_FUNCTIONS.md) · [العربية](./ar_FUNCTIONS.md) · [Беларуская](./be_FUNCTIONS.md) · [Български](./bg_FUNCTIONS.md) · [Čeština](./cs_FUNCTIONS.md) · [Dansk](./da_FUNCTIONS.md) · [Deutsch](./de_FUNCTIONS.md) · [Ελληνικά](./el_FUNCTIONS.md) · [Español](./es_FUNCTIONS.md) · [Suomi](./fi_FUNCTIONS.md) · [Français](./fr_FUNCTIONS.md) · [हिन्दी](./hi_FUNCTIONS.md) · [English (India)](./en-in_FUNCTIONS.md) · [Hrvatski](./hr_FUNCTIONS.md) · [Magyar](./hu_FUNCTIONS.md) · [Bahasa Indonesia](./id_FUNCTIONS.md) · [Italiano](./it_FUNCTIONS.md) · [日本語](./ja_FUNCTIONS.md) · [한국어](./ko_FUNCTIONS.md) · [Lietuvių](./lt_FUNCTIONS.md) · [Latviešu](./lv_FUNCTIONS.md) · [Македонски](./mk_FUNCTIONS.md) · [Монгол](./mn_FUNCTIONS.md) · [Bahasa Melayu](./ms_FUNCTIONS.md) · [Nederlands](./nl_FUNCTIONS.md) · [Norsk](./no_FUNCTIONS.md) · [Polski](./pl_FUNCTIONS.md) · **Português** · [Română](./ro_FUNCTIONS.md) · [Русский](./ru_FUNCTIONS.md) · [Slovenčina](./sk_FUNCTIONS.md) · [Srpski](./sr_FUNCTIONS.md) · [Svenska](./sv_FUNCTIONS.md) · [ไทย](./th_FUNCTIONS.md) · [Türkçe](./tr_FUNCTIONS.md) · [Tiếng Việt](./vi_FUNCTIONS.md) · [简体中文](./zh-cn_FUNCTIONS.md) · [繁體中文](./zh-tw_FUNCTIONS.md)

</div>




# Kick Stream Tweaks – Referência de Função

Referência para ajustes no Kick Stream 1.3.1. Ele descreve o que cada área funcional faz, como as configurações são armazenadas, de quais partes da página do Kick o script depende e como funciona cada função ou método nomeado no script do usuário. Veja o [repositório](https://github.com/ebayybe/kick-stream-tweaks) e [o changelog](../CHANGELOG/en_CHANGELOG.md) .

> Os nomes correspondem à fonte. `void` significa que uma função atua por meio de efeitos colaterais. Um método escrito como `Object.method` reside nesse objeto ( `PlayerSync` , `Extras` , `GUI` , `Store` ).

## Conteúdo

1. [Arquitetura](#architecture)
2. [Comportamento voltado para o usuário](#user-facing-behavior)
3. [Referência de configurações](#settings-reference)
4. [Utilitários principais](#core-utilities)
5. [Armazenamento de configurações](#settings-storage)
6. [Sincronização de jogadores ( `PlayerSync` )](#player-synchronization-playersync)
7. [Extras da página ( `Extras` )](#page-extras-extras)
8. [Blocos de construção de interface](#interface-building-blocks)
9. [Páginas de configurações ( `PAGES` )](#settings-pages-pages)
10. [Controlador de painel ( `GUI` )](#panel-controller-gui)
11. [Teclas de atalho e inicialização](#hotkeys-and-startup)
12. [Eliminar dependências da página](#kick-page-dependencies)
13. [Localização](#localization)
14. [Segurança, privacidade e compatibilidade](#safety-privacy-and-compatibility)

<a id="architecture"></a>
## Arquitetura

O userscript é um arquivo independente executado no `document-start` com `@grant none` . Ele não possui etapa de construção e não faz solicitações próprias de rede.

| Camada | Objeto/área | Responsabilidade |
|---|---|---|
| Dados | `TR` , `DIAG` , `FLAGS` , `LANG_NAMES` | Traduções para 38 idiomas, mensagens de diagnóstico localizadas, SVGs de sinalizadores e nomes de idiomas. |
| Configuração | `CONFIG` , `DEFAULTS` | Constantes (seletores, limites de repetição, predefinições, seções) e configurações padrão. |
| Armazenamento | `sanitizeSettings` , `Store` , `persist` | Valida e salva configurações em `localStorage` ; mantém uma pilha de desfazer na memória. |
| Lógica do jogador | `PlayerSync` | Encontra o vídeo, restaura a qualidade, o volume, a velocidade e o modo silencioso, observa se há congelamentos. |
| Ajudantes de página | `Extras` | Botões de layout, reivindicação de recompensas, avatares de canal e agendador de plano de fundo. |
| Interface | `PAGES` , `GUI` , ajudantes | Painel Shadow-DOM, notificações, sons, botão flutuante de reivindicação rápida, teclas de atalho. |

Fluxo de dados: o loop `PlayerSync.sync` de 1,5 segundo lê as configurações efetivas (primeiro o perfil do canal, depois global), aplica-as ao player e chama `Extras.tick` . As ações do usuário passam por manipuladores `GUI` , que atualizam as configurações com `persist` e enviam apenas a parte afetada para o player ( `media` ou `all` ).

<a id="user-facing-behavior"></a>
## Comportamento voltado para o usuário

| Área | Comportamento |
|---|---|
| Persistência do jogador | Salva qualidade ao vivo/VOD, volume, estado mudo, modo silencioso e velocidade e, em seguida, aplica-os quando um novo fluxo é detectado. As alterações que a própria página faz (por exemplo, Kick redefinindo o volume para 50%) são revertidas; apenas as próprias ações do visualizador atualizam os valores salvos. |
| Qualidade | Seleciona a qualidade preferida através do menu do player, volta para a próxima qualidade inferior (ou Auto) quando indisponível e fecha o menu novamente. Somente cliques genuínos do usuário ensinam ao script uma nova qualidade de “último uso”. |
| Volume e reprodução silenciosa | O volume e o mudo são restaurados por stream. A reprodução silenciosa roteia o vídeo através do mecanismo de áudio da Web com ganho zero, para que o stream continue sendo reproduzido em uma guia em segundo plano sem ser silenciado. |
| Perfis de canais | **Salvar este canal** armazena a qualidade, volume, velocidade e som atuais do canal que está sendo assistido. Os perfis também contêm notas, grupos, estado de pin, um avatar e sinalizadores ativados/excluídos. |
| Predefinições | Economize largura de banda, melhor qualidade, visualização silenciosa e aplicação de VOD com um clique. |
| Painel | `F2` ou uma tecla de atalho personalizada abre um painel de largura fixa (680 px) com uma barra lateral agrupada, pesquisa, estilos Kick e Minimal, temas claros/escuros, 14 cores de destaque mais um seletor de cores, layout compacto, desfoque de fundo, dimensionamento de texto, alto contraste e controles de animação. |
| Pesquisar | Insensível ao sotaque, corresponde ao idioma da interface e aos nomes em inglês e corresponde aos títulos das seções ou dos cartões. As teclas digitadas no painel nunca alcançam as teclas de atalho do Kick. |
| Controles deslizantes | Cada controle deslizante responde a cliques, arrastar, setas do teclado e roda do mouse. |
| Sons | Dicas de áudio da Web para ações de menu, alterações de configuração, sucesso/falha de qualidade e restauração de volume, cada um com uma opção, visualização e volume. |
| Notificações | Mensagens localizadas que podem ser arrastadas, dimensionadas, transparentes, silenciadas (não perturbe, silencioso em tela cheia) e gravadas no histórico. |
| Alarme de congelamento | Detecta um player travado ou uma tela preta, toca um alarme alto (mesmo em uma aba oculta, independente do botão de efeitos sonoros) e mostra uma notificação. |
| Recompensas | A reivindicação automática opcional aguarda a notificação de recompensa do Kick (ou é executada de acordo com uma programação), abre a janela de recompensas, reivindica o que está disponível e fecha-a. Um botão de reivindicação rápida flutuante e arrastável faz o mesmo com um clique. |
| Disposição | Oculta o chat e recolhe o menu esquerdo do painel ou com teclas de atalho, lembrando opcionalmente a escolha para cada stream. |
| Ferramentas | Temporizador, visualização de foco (tela cheia), ressincronização do player e modo de segurança que pausa todas as alterações automáticas. |
| Diagnóstico | Status ao vivo, qualidades detectadas, resolução de vídeo, verificação de qualidade, verificação de conflitos, registro de ações e um relatório copiável. |
| Dados | Exportar/importar configurações, desfazer, restaurar após redefinição, fazer backup/restauração de canais salvos. |
| Privacidade | Configurações, perfis, registros e históricos permanecem no armazenamento do navegador. Nada é enviado para lugar nenhum. |

<a id="settings-reference"></a>
## Referência de configurações

Todos os valores são validados por `sanitizeSettings` ; qualquer coisa inválida volta ao padrão. Os intervalos são aplicados.

### Jogador

| Chave | Tipo/faixa | Padrão | Significado |
|---|---|---|---|
| `autoQualityEnabled` | booleano | `true` | Aplique a qualidade preferida automaticamente. |
| `preferredLiveQuality` , `preferredVodQuality` | `auto` , `1080p60` , `1080p` , `720p` , `480p` , `360p` , `160p` | `auto` | Qualidade para aplicar em transmissões ao vivo e VODs. `auto` significa "lembrar minha última escolha". |
| `lastLiveQuality` , `lastVodQuality` | mesmo | `auto` | Última qualidade que o visualizador escolheu manualmente. |
| `qualityFallback` | `lower` , `auto` | `lower` | O que fazer quando a qualidade preferida não é oferecida. |
| `autoVolumeEnabled` | booleano | `true` | Restaure e proteja o volume salvo. |
| `volume` | 0–1 | `1` | Volume salvo. |
| `muted` | booleano | `false` | Estado mudo salvo. |
| `silent` | booleano | `false` | Reprodução silenciosa (gráfico de áudio com ganho zero, player não silenciado). |
| `playbackRate` | 0,25–2,5 | `1` | Velocidade salva; `1` nunca é forçado. |
| `warnLoudVolume` , `loudVolumeThreshold` | booleano; 60–100, etapa 5 | `true` ; `85` | Aviso de alto volume. |
| `safeMode` | booleano | `false` | Pause cada alteração automática. |
| `channelProfiles` | objeto, até 200 | `{}` | Perfis por canal (veja abaixo). |

Campos de perfil do canal: `enabled` , `excluded` , `liveQuality` , `vodQuality` , `volume` , `muted` , `silent` , `playbackRate` , `displayName` , `pinned` , `avatar` (apenas `https://…kick.com/images/user/…` URLs), `note` (240 caracteres), `group` (40 caracteres), `updatedAt` , `lastUsed` .

### Notificações e sons

| Chave | Tipo/faixa | Padrão | Significado |
|---|---|---|---|
| `notificationsEnabled` | booleano | `true` | Mostrar notificações de resultados. |
| `doNotDisturb` , `quietFullscreen` | booleano | `false` , `true` | Suprimir notificações e sons ou apenas em tela cheia. |
| `notificationScale` | 0,8–1,4 | `1` | Tamanho da notificação. |
| `notificationDuration` | 1.500–12.000 ms, passo 500 | `3500` | Quanto tempo uma notificação permanece. |
| `notificationOpacity` | 0,35–1 | `0.95` | Transparência de notificação. |
| `notificationShowIcon` | booleano | `true` | Mostre o ícone de status. |
| `notificationPosition` | `{x, y}` ou `null` | `null` | Posição arrastada. |
| `notificationHistoryEnabled` , `notificationHistory` | booleano; até 30 entradas | `true` ; `[]` | Histórico de notificações. |
| `soundEffectsEnabled` , `soundVolume` | booleano; 0–1 | `false` ; `0.35` | Interruptor mestre e volume. |
| `soundEvents` , `soundEventVolumes` | por evento: `menu` , `settingChanged` , `qualityApplied` , `qualityFailed` , `volumeApplied` | tudo ligado; `0.35` | Mudança e volume por evento. |

### Aparência, movimento e atalhos

| Chave | Tipo/faixa | Padrão | Significado |
|---|---|---|---|
| `theme` | `dark` , `light` | `dark` | Tema de cores. |
| `panelStyle` | `kick` , `minimal` | `kick` | Estilo visual do painel. |
| `accentColor` | `#rrggbb` | `#53fc18` | Cor de destaque. |
| `compactMode` , `highContrast` | booleano | `false` | Densidade e contraste. |
| `backdropBlur` | 0–12 pixels | `6` | Desfoque de fundo atrás do painel (funciona em ambos os estilos). |
| `textScale` | 0,9–1,3 | `1` | Tamanho do texto. |
| `language` , `languageChosen` | código de localidade; booleano | idioma do navegador; `false` | A interface segue o idioma do navegador até que um idioma seja escolhido, então a escolha é lembrada. |
| `panelPosition` | `{x, y}` ou `null` | `null` | Posição do painel arrastado. |
| `motionSpeed` | `fast` , `normal` , `slow` | `normal` | Velocidade de animação. |
| `openEffect` | `none` , `fade` , `slide` , `scale` , `pop` | `scale` | Efeito de abertura/fechamento do painel. |
| `hoverEffect` | `none` , `lift` , `glow` | `lift` | Efeito de foco. |
| `indicatorAnimation` | `glow` , `pulse` , `breathe` , `off` | `glow` | Animação de logotipo/indicador. |
| `iconAnimations` | booleano | `true` | Animar a barra lateral, redefinir e ícones de ajuda. |
| `hotkey` | sequência de combinação | `F2` | Abre ou fecha o painel. |
| `actionHotkeys` | cordas combinadas | `Alt+N` , `Alt+F` , `Alt+Q` , `Alt+V` , `Alt+C` , `Alt+S` | Alternar notificações, visualizar foco, redefinir qualidade, restaurar volume, alternar bate-papo, alternar menu esquerdo. |

Os combos de teclas são armazenados como strings, como `Alt+Q` , e combinados por teclas físicas, para que funcionem em qualquer layout de teclado. As configurações de versões mais antigas com uma tecla de atalho em forma de objeto são convertidas automaticamente. A largura do painel é fixada em 680 px (limitada ao tamanho da janela); a configuração de largura anterior é ignorada.

### Ferramentas

| Chave | Tipo/faixa | Padrão | Significado |
|---|---|---|---|
| `autoRecoverStall` | booleano | `false` | Tente `play()` quando um congelamento for detectado. |
| `freezeAlertEnabled` , `freezeSound` | booleano | `true` | Congelar notificação e som de alarme. |
| `freezeSeconds` | 5–60, etapa 5 | `10` | Segundos sem progresso antes do alarme. |
| `layoutHideChat` , `layoutCollapseSidebar` | booleano | `false` | Layout lembrado, aplicado uma vez por página. |
| `autoClaimRewards` | booleano | `false` | Ative a reivindicação automática de recompensa. |
| `claimMode` | `notify` , `interval` | `notify` | Reivindique quando o Kick mostrar sua notificação ou de acordo com uma programação. |
| `claimDelaySec` | 0–120, etapa 5 | `5` | Aguarde até que a notificação apareça (modo de notificação). |
| `claimIntervalMin` | 5–120, etapa 5 | `10` | Minutos entre verificações (modo programado). |

### Botão de reivindicação rápida

| Chave | Tipo/faixa | Padrão | Significado |
|---|---|---|---|
| `claimWidget` | booleano | `false` | Mostre o botão flutuante. |
| `claimWidgetStyle` | `orb` , `pill` , `glass` , `flat` | `orb` | Projeto de botão. |
| `claimWidgetIcon` | `gift` , `crown` , `star` , `bolt` , `coin` , `custom` | `gift` | Ícone integrado ou imagem do próprio usuário. |
| `claimWidgetCustomIcon` | `data:image/(png\|webp\|jpeg);base64,…` , até 90.000 caracteres | vazio | Cópia recodificada da imagem carregada. Qualquer outra coisa é rejeitada. |
| `claimWidgetImageFill` | booleano | `false` | Deixe uma imagem personalizada preencher todo o botão (não usada pelo design da pílula). |
| `claimWidgetSize` | `s` , `m` , `l` | `m` | Tamanho do botão. |
| `claimWidgetOpacity` | 0,3–1 | `0.9` | Opacidade do botão (opacidade total enquanto uma recompensa estiver disponível). |
| `claimWidgetAutoHide` | booleano | `false` | Mostre o botão apenas quando uma recompensa estiver disponível. |
| `claimWidgetPos` | `{x, y}` ou `null` | `null` | Posição arrastada. |

### Diagnóstico e estado

| Chave | Tipo/faixa | Padrão | Significado |
|---|---|---|---|
| `diagnosticsLogEnabled` , `diagnosticsLog` | booleano; até 60 entradas | `true` ; `[]` | Registro de ações. |
| `activeSection` | ID da seção | `playback` | Última página aberta. |
| `resetBackup` | objeto de configurações | `null` | Instantâneo tirado antes de uma redefinição ou importação. |

<a id="core-utilities"></a>
## Utilitários principais

| Função | Parâmetros/retorno | O que e como faz |
|---|---|---|
| `detectLanguage` | — → localidade | Percorre `navigator.languages` ​​, mapeia variantes regionais ( `zh-HK` → `zh-tw` , `nb` / `nn` → `no` ) e retorna a primeira localidade suportada, ou `en` . |
| `dictFor` | idioma → dicionário | Retorna a tabela de tradução para um código de idioma, voltando ao idioma base e depois ao inglês. |
| `t` / `T` | lang, chave, vars → string | Resolve uma chave com substituição `{placeholder}` ; `T` usa o idioma atual. |
| `diagText` | índice, qualidade → string | Retorna uma das frases de diagnóstico localizadas. |
| `log` | …args → vazio | Registro em log do console com o prefixo do script. |
| `clamp` , `sleep` , `esc` | valor → valor | Limitação de intervalo, atraso baseado em promessa e escape de HTML. |
| `normalizeQuality` | texto → sequência | Coloca em minúscula um rótulo de qualidade e remove espaços em branco. |
| `debounce` | fn, espere → função | Trailing debounce com um método `flush` . |
| `onLocationChange` | retorno de chamada → vazio | Detecta a navegação de página única agrupando `pushState` / `replaceState` , ouvindo `popstate` e pesquisando uma vez por segundo. |
| `keyLabelFromEvent` , `comboFromEvent` , `matchesCombo` | evento → string/booleano | Crie e compare combinações de teclas a partir do código de chave físico. |
| `mkPointer` | tipo, extra → evento | Cria um `PointerEvent` (ou `MouseEvent` quando indisponível) usado para controlar os menus ARIA do Kick. |
| `waitFor` | sonda, tempo limite, etapa → valor/nulo | Pesquisa até que o probe retorne um valor ou o tempo limite termine. |
| `imageToDataUrl` | imagem → string | Dimensiona uma imagem em uma tela quadrada (mantendo proporções, `willReadFrequently` ), tenta 128, 96 e 64 px e retorna um URL de dados PNG com no máximo 70.000 caracteres. |

<a id="settings-storage"></a>
## Armazenamento de configurações

| Função | Parâmetros/retorno | O que e como faz |
|---|---|---|
| `sanitizeProfiles` | objeto → objeto | Mantém no máximo 200 perfis com chaves e pinças válidas em cada campo; o avatar deve ser um URL de imagem Kick. |
| `sanitizeSettings` | objeto, comBackup → objeto | Valida todas as configurações (tipos, intervalos, valores permitidos), migra configurações 1.1–1.3 (qualidade herdada, teclas de atalho, animação e teclas de seção) e aplica a regra de idioma. |
| `legacyHotkey` | valor → sequência | Converte uma tecla de atalho em forma de objeto em uma sequência de combinação. |
| `Store.load` / `Store.save` | — / configurações → configurações/void | Leia e grave o objeto higienizado em `localStorage` ( `kickTweaks.settings.v1` ). |
| `persist` | patch, `{undo}` → anular | Mescla um patch, limpa, salva com um breve debounce e, opcionalmente, envia um instantâneo de desfazer (mantido apenas na memória, até 15). |
| ouvinte `storage` | evento → nulo | Recarrega as configurações quando outra aba Kick as altera, para que as abas nunca se substituam. |

<a id="player-synchronization-playersync"></a>
## Sincronização de jogadores ( `PlayerSync` )

### Ajudantes de canal e perfil

| Método | Parâmetros/retorno | O que e como faz |
|---|---|---|
| `isVod` | — → booleano | Detecta uma página VOD do URL. |
| `channelKey` | — → sequência | Constrói a chave `channel:slug` estável (ou `vod:id` , `kick:home` ), armazenando em cache o resultado por três segundos. Nas páginas VOD é usado o link do canal mais próximo do player. |
| `channelSlug` | — → sequência | Retorna a parte slug de uma chave de canal. |
| `profile` | chave → objeto/nulo | Lê um perfil salvo. |
| `profileActive` | — → objeto/nulo | Retorna o perfil atual somente quando estiver habilitado e não excluído. |
| `isExcluded` | — → booleano | Verifica se a automação está desabilitada para este canal. |
| `updateProfile` | patch, chave → vazio | Cria ou mescla um perfil e carimba `updatedAt` . |
| `saveCurrentChannel` | — → objeto/nulo | Armazena a qualidade, o volume, o mudo, a velocidade e o estado silencioso atuais do espectador como um perfil ativado e verifica a página em busca do avatar do canal. |
| `effective` | — → objeto | Resolve volume, mudo, silêncio, velocidade e qualidade ao vivo/VOD do perfil ativo ou das configurações globais. |
| `setStatus` | status, resultado → nulo | Atualiza o status e os códigos do último resultado mostrados no cabeçalho e nos diagnósticos. |

### Encontrando e dirigindo o jogador do Kick

| Método | Parâmetros/retorno | O que e como faz |
|---|---|---|
| `findMainVideo` | — → vídeo/nulo | Escolhe o maior `<video>` visível. |
| `streamKey` | — → sequência | Retorna o caminho da página usado para aplicar qualidade uma vez por stream. |
| `isAccountButton` | botão → booleano | Rejeita botões de cabeçalho, avatar e conta. |
| `findSettingsButton` | vídeo → botão/nulo | Encontra o botão de engrenagem do player por rótulo ou por proximidade do canto inferior direito do vídeo. |
| `revealControls` | vídeo → vazio | Despacha eventos de foco para que os controles ocultos apareçam. |
| `simulateClick` | elemento → vazio | Envia a sequência completa de eventos de ponteiro que os menus do Kick precisam. |
| `menuItems` | — → elemento[] | Lista entradas `menuitemradio` visíveis. |
| `openQualityMenu` | — → botão/nulo | Abre o menu de engrenagem, entra em uma entrada de qualidade quando um menu de nível superior aparece e aguarda as opções. |
| `closeMenu` | botão → Promessa | Fecha o menu somente se ele ainda estiver aberto (um segundo clique cego pode reabri-lo), com um escape alternativo. |
| `readMenu` | — → elemento[] | Registra as qualidades oferecidas e as verificadas. |
| `scanQualities` | — → Promessa<boolean> | Abre o menu, registra as qualidades disponíveis e fecha (utilizado para diagnóstico). |
| `activate` | item → Promessa | Clica em uma opção e espera até que ela seja marcada. |
| `selectQuality` | desejado, substituto → Promessa | Seleciona a qualidade solicitada, caso contrário, a próxima inferior ou Auto. |
| `desiredQuality` | — → sequência | Escolhe a qualidade a aplicar a partir do perfil, da preferência ou da última escolha manual. |
| `applyQualityOnce` | streamKey → Promessa | Aplica a qualidade desejada uma vez por stream, fecha o menu e notifica sobre sucesso ou falha. |
| `watchManualQuality` | — → nulo | Aprende uma nova qualidade de "último uso" apenas com cliques genuínos (confiáveis), para que cliques automatizados e substitutos nunca substituam os valores salvos. |

### Volume, modo silencioso, velocidade e monitoramento

| Método | Parâmetros/retorno | O que e como faz |
|---|---|---|
| `applyVolume` | vídeo, silencioso → vazio | Grava o volume efetivo e o estado mudo (marcado como a própria alteração do script). |
| `trackInput` | — → nulo | Registra a hora da última entrada confiável de ponteiro, roda, toque ou teclado. |
| `reassertVolume` | vídeo → vazio | Devolve o volume salvo quando a página o alterou sem qualquer intervenção do usuário (taxa limitada a oito reversões por dez segundos). |
| `watchVolume` | vídeo → vazio | Escuta `volumechange` : as alterações feitas pelo usuário são salvas, as feitas pela página são revertidas. |
| `checkLoud` | volume, silenciado → vazio | Avisa uma vez quando o volume ultrapassa o limite. |
| `buildGraph` | vídeo → gráfico/nulo | Conecta o vídeo a um `AudioContext` por meio de um nó de ganho; relata quando o site não permite. |
| `applySilent` | vídeo → vazio | Define o ganho como 0 para reprodução silenciosa ou de volta para 1, retomando o contexto quando necessário. |
| `applyRate` | vídeo, forçar → anular | Define a velocidade salva; `1` não é forçado, a menos que o espectador apenas o escolha, então a atualização ao vivo de Kick é respeitada. |
| `applyMedia` | vídeo, `{rate}` → nulo | Reaplica volume, modo silencioso e, opcionalmente, velocidade sem tocar na qualidade. |
| `monitorFreeze` | vídeo → vazio | Detecta um player travado (tempo travado) ou uma tela preta (tempo em movimento sem frames decodificados) e aciona o alarme e recuperação opcional. Funciona em guias ocultas. |

### Loop e ciclo de vida

| Método | Parâmetros/retorno | O que e como faz |
|---|---|---|
| `sync` | — → Promessa | O loop principal: monitora congelamentos, vincula ouvintes, aplica modo silencioso, volume, velocidade e qualidade, respeita modo de segurança e exclusões e depois chama `Extras.tick` . |
| `resync` | — → Promessa | Força uma nova passagem (usada por predefinições, ações rápidas e alterações de qualidade). |
| `init` | — → nulo | Inicia a primeira sincronização, o ouvinte de navegação e o intervalo de 1,5 segundo. |

<a id="page-extras-extras"></a>
## Extras da página ( `Extras` )

| Método | Parâmetros/retorno | O que e como faz |
|---|---|---|
| `root` , `layoutState` | — → elemento / `{chat, sidebar}` | Leia o estado do layout do Kick no `data-chat` e `data-sidebar` no contêiner da página. |
| `isDesktop` | — → booleano | A automação de layout só funciona em larguras de desktop. |
| `click` | elemento → booleano | Cliques em `PlayerSync.simulateClick` . |
| `chatHideButton` , `chatShowButton` | — → botão/nulo | Localize o botão de recolher dentro da sala de chat e o botão "mostrar chat" (por ícone, não por idioma). |
| `setChat` , `setSidebar` | mostrar → booleano | Traga o chat ou o menu esquerdo para o estado solicitado pressionando os botões do próprio Kick. |
| `applyLayout` | — → nulo | Aplica o layout lembrado uma vez por página, nunca lutando contra alterações manuais. |
| `isTyping` | — → booleano | True enquanto o visualizador está digitando em um campo; reivindicações automáticas esperam. |
| `rewardTrigger` , `popoverCard` | — → botão/nulo | Encontre o botão de presente e o cartão popover de recompensa. |
| `rewardAvailable` | — → booleano | Detecta o sinal de "recompensa disponível" do próprio Kick (a frase de chamariz animada). |
| `isEnabled` | botão → booleano | Visível e não desativado. |
| `claimDrops` | — → Promessa<number> | Pressiona os botões de reivindicação habilitados para lançamentos concluídos no painel de recompensas. |
| `claimDaily` | gatilho → Promessa<number> | Abre a janela de recompensas, pressiona cada botão de reivindicação habilitado uma vez (nunca o mesmo botão duas vezes) e fecha a janela. |
| `claimRewards` | `{manual}` → Promessa<number> | Executa uma reclamação completa, informa o resultado e emite um som; as execuções manuais ignoram a digitação e relatam quando não há nada a reivindicar. |
| `normName` | texto → sequência | Normaliza nomes para correspondência ( `_` e espaços para `-` ). |
| `findAvatar` | lesma → string | Retorna o avatar do canal visível na página (usado antes de um canal ser salvo). |
| `scanAvatars` | — → nulo | Armazena avatares para canais salvos que não possuem um. |
| `tick` | streamKey → vazio | Agendador chamado a partir da `sync` : aplica o layout, verifica os avatares, aguarda a notificação da recompensa (modo de notificação, com atraso e resfriamento de dois minutos) ou verifica o intervalo escolhido e pesquisa o painel de drops. |

<a id="interface-building-blocks"></a>
## Blocos de construção de interface

| Função | Parâmetros/retorno | O que e como faz |
|---|---|---|
| `I` | nome → svg | Ícone de traço embutido. |
| `fmtValue` | formato, bruto → string | Formata os valores do controle deslizante (porcentagem, pixels, segundos). |
| `normSearch` , `englishOf` , `searchText` | texto → sequência | Texto de pesquisa sem distinção de acentos, incluindo o nome em inglês de uma etiqueta traduzida. |
| `row` | chave, rótulo, controle, opções → html | Uma linha de configuração; empilhados por padrão, embutidos apenas para switches, com uma alternância de ajuda opcional. |
| `sw` , `toggleRow` | …→html | Controle de interruptores e uma linha de interruptores prontos. |
| `chip` , `seg` , `qualityChips` | …→html | Chips, controles segmentados e grade de qualidade. |
| `range` | attr, chave, opções → html | Controle deslizante com faixa de preenchimento e valor ao vivo. |
| `card` , `btn` , `ib` | …→html | Cartão, botão de texto e botão de ícone. |
| `timeStr` | carimbo de data/hora → string | Hora do relógio localizada. |
| `setPref` | chave, valor → vazio | Grava uma preferência do jogador no perfil do canal ativo ou nas configurações globais. |
| `fxBtn` | chave, valor, rótulo, em → html | Bloco seletor de efeitos com um pequeno glifo de visualização. |
| `avatarHtml` | nome, url → html | Avatar com uma carta substituta; uma imagem com falha é removida. |
| `hasCustomIcon` , `cwAttrs` , `cwIcon` , `claimWidgetInner` | — → valor | Crie a marcação do botão de reivindicação rápida para o botão ativo e para a visualização das configurações. |

<a id="settings-pages-pages"></a>
## Páginas de configurações ( `PAGES` )

| Página | Conteúdo |
|---|---|
| `playback` | Dica para salvar este canal, predefinições, qualidade (aplicação automática, ao vivo, VOD, fallback), volume (aplicação automática, controle deslizante, mudo, reprodução silenciosa, aviso alto) e velocidade. |
| `channels` | Etapas de como funciona, canal atual com o botão **Salvar este canal** , opções de pausa/exclusão e editor e, em seguida, a lista de canais salvos (pesquisar, classificar, fixar filtro, grupos, Editar/Concluído, excluir) com backup e restauração. |
| `tools` | Temporizador, layout de página, recompensas (reivindicação automática, modo, atraso ou intervalo, reivindicar agora), configurações de botão de reivindicação rápida com visualização ao vivo, alarme de congelamento e ações rápidas. |
| `notifications` | Opções, tamanho, duração, opacidade, visualização, redefinição de posição e histórico. |
| `sounds` | Chave mestre e volume, chaves por evento, volumes e visualizações. |
| `appearance` | Tema, estilo, cores de destaque, densidade, contraste, tamanho do texto, desfoque, centralização e idioma. |
| `motion` | Visualização ao vivo, predefinições e seletores para efeito aberto, efeito de foco, indicador, velocidade e animações de ícones. |
| `shortcuts` | Teclas de atalho de menu e teclas de atalho de ação com religação. |
| `diagnostics` | Status, verificação, relatório, verificações de qualidade e conflitos, modo de segurança e registro de ações. |
| `about` | Versão, links, exportação/importação, desfazer, restaurar e redefinir. |

<a id="panel-controller-gui"></a>
## Controlador de painel ( `GUI` )

### Construção e renderização

| Método | Parâmetros/retorno | O que e como faz |
|---|---|---|
| `build` | — → nulo | Cria o host shadow-DOM, o painel, o brinde e a região ativa e, em seguida, conecta os eventos. |
| `applyLook` | — → nulo | Aplica tema, estilo, sotaque, desfoque, escala de texto, efeitos, atributos de idioma e configurações do sistema como atributos e variáveis ​​CSS. |
| `renderChrome` | — → nulo | Renderiza o título, o espaço reservado de pesquisa, o botão de pausa, a dica de rodapé e o botão de reivindicação rápida. |
| `renderNav` | — → nulo | Renderiza a barra lateral agrupada. |
| `renderPage` | opções → anular | Renderiza a página ativa (ou todas as páginas durante a pesquisa), preservando a rolagem e o foco do teclado. |
| `filterRows` | — → nulo | Aplica o filtro de pesquisa a linhas, cartões e páginas. |
| `channelEditor` | chave, perfil → html | Editor para um perfil de canal. |
| `refreshAll` , `onExternalChange` | — → nulo | Renderize tudo novamente após redefinir, importar, desfazer ou alterar de outra guia. |

### Eventos e alterações nas configurações

| Método | Parâmetros/retorno | O que e como faz |
|---|---|---|
| `wire` | — → nulo | Anexa manipuladores delegados de clique, entrada, alteração, roda e rolagem e arrastar o painel. |
| `onClick` , `onInput` , `onChange` | evento → nulo | Envie cliques, movimentos de controle deslizante e edições de texto em configurações, perfis ou ações. |
| `applyRange` | chave, valor → vazio | Aplica um valor de controle deslizante (volume, desfoque, opacidade, durações…). |
| `setSetting` , `setChannel` | chave/patch → vazio | Salve uma configuração ou alteração de perfil e envie a parte afetada para o player. |
| `pushToPlayer` | escopo, chave → vazio | `media` reaplica volume, modo silencioso e velocidade; `all` também reaplica qualidade. Volume, mudo, modo silencioso e velocidade nunca reabrem o menu de qualidade. |
| `act` | nome, elemento → Promessa | Executa ações nomeadas: predefinições, salvamento e remoção de canais, backup, importação/exportação, reivindicações, temporizador, atalhos, diagnósticos e muito mais. |
| `resetSection` | id → vazio | Restaura os padrões de uma seção. |
| `restoreVolume` | — → nulo | Aplica novamente o volume salvo. |
| `toggleLayout` | qual → nulo | Oculta ou mostra o chat ou o menu esquerdo e lembra a escolha. |
| `confirm` , `closeModal` | mensagem, opções/resultado → Promessa/void | Caixa de diálogo de confirmação no painel (idêntica em todos os navegadores). |
| `download` , `pickFile` , `pickImage` | … → nulo | Salve JSON, leia JSON e escolha uma imagem para o botão de reivindicação rápida. |
| `startCapture` , `finishCapture` | id/combo → vazio | Revincule uma tecla de atalho, rejeitando duplicatas. |
| `replayMock` | — → nulo | Reproduz o efeito aberto na visualização da animação. |

### Ferramentas e diagnósticos

| Método | Parâmetros/retorno | O que e como faz |
|---|---|---|
| `startSleep` , `cancelSleep` , `syncSleep` | minutos / — → nulo | Inicie, cancele e exiba o temporizador (pausa o vídeo no final). |
| `toggleFocusView` | — → Promessa | Entra ou sai da tela cheia no contêiner do player. |
| `statusText` , `resultText` , `syncDiagnostics` | — → string/vazio | Status localizado para o cabeçalho e a página de diagnóstico. |
| `record` | mensagem, nível → vazio | Adiciona uma entrada com carimbo de data/hora ao log de ações. |
| `copyDiagnostics` | — → Promessa | Copia um breve relatório (versão, status, qualidades, tipo de página, agente do usuário). |
| `checkQuality` , `checkConflicts` | — → Promessa/anulação | Verifique se a qualidade preferida é oferecida e liste as configurações que funcionam entre si. |

### Botão de reivindicação rápida

| Método | Parâmetros/retorno | O que e como faz |
|---|---|---|
| `renderClaimWidget` | — → nulo | Cria, atualiza ou remove o botão flutuante e inicia sua pesquisa de estado de um segundo. |
| `syncClaimWidget` | — → nulo | Mostra o anel e ponto de "recompensa disponível", o estado ocupado e a regra de ocultação automática. |
| `placeClaimWidget` | — → nulo | Posiciona o botão, fixando-o na janela. |
| `wireClaimWidget` | elemento → vazio | Arraste com um limite de cinco pixels (um arrasto nunca conta como um clique), salvando a posição e o clique que executa uma reivindicação manual. |

### Notificações, som e comportamento do painel

| Método | Parâmetros/retorno | O que e como faz |
|---|---|---|
| `notify` | mensagem, tipo, duração, força → nulo | Mostra um brinde (a menos que seja suprimido), registra o histórico e anuncia o texto em uma região ao vivo. |
| `notifyQuality` | aplicado, qualidade → nulo | Reproduz o som do resultado, registra e mostra uma notificação localizada. |
| `initToastPosition` , `wireToastDrag` | — → nulo | Restaure e salve a posição da torrada arrastada. |
| `onAvatars` | — → nulo | Atualiza páginas que mostram avatares. |
| `ensureAudio` | — → contexto | Cria e retoma o `AudioContext` compartilhado (desbloqueado no primeiro gesto do usuário). |
| `playSound` , `stopSounds` | nome, visualização → vazio | Gere e interrompa as dicas de áudio da Web. |
| `playFreezeAlarm` , `alertFrozen` | força → vazio | Toque o alarme de cinco notas e aumente a notificação de congelamento. |
| `placePanel` , `wirePanelDrag` | posição → vazio | Coloque o painel dentro da janela e torne o cabeçalho arrastável. |
| `open` , `close` , `toggle` | — → nulo | Controle o painel, a votação, o foco e os sons do menu. |
| `syncVolumeControls` | — → nulo | Mantém o controle deslizante de volume sincronizado com o player enquanto o painel está aberto. |

<a id="hotkeys-and-startup"></a>
## Teclas de atalho e inicialização

| Função | Parâmetros/retorno | O que e como faz |
|---|---|---|
| `isolateKeys` | — → nulo | Registrado no `document-start` na fase de captura: eventos de teclado que vêm de dentro do painel param de se propagar para Kick (portanto, Espaço, F, M e as setas nunca acionam as teclas de atalho do jogador) e Tab fica preso dentro da caixa de diálogo. |
| `setupHotkeys` | — → nulo | Lida com a captura de teclas para religação, Escape (modal, suspenso, painel), a tecla de atalho do menu e as teclas de atalho de ação; combos com um modificador ou tecla F funcionam mesmo durante a digitação. |
| `init` | — → nulo | Constrói o painel, instala teclas de atalho e inicia `PlayerSync` ; protegido contra injeção dupla. |

<a id="kick-page-dependencies"></a>
## Eliminar dependências da página

O script depende da marcação atual do Kick. Sempre que possível utiliza ícones, atributos e estrutura em vez de texto visível, por isso continua a funcionar em todas as linguagens de interface. Se o Kick alterar isso, o recurso correspondente para de funcionar (o resto continua funcionando).

| Recurso | O que procura |
|---|---|
| Qualidade | Um `<video>` visível, as entradas `button[aria-haspopup="menu"]` e `[role="menuitemradio"]` do player. |
| Disposição | Um contêiner com `data-sidebar` e `data-chat` , `[data-testid="sidebar-collapse"]` / `sidebar-expand` , um botão de ícone `CollapseRight` dentro de `#channel-chatroom` e um botão de ícone `MessagesOutline` para mostrar o chat. |
| Notificação de recompensa | Um `video` cuja fonte contém `reward-available` ou um cartão `[role="group"]` contendo um vídeo `daily-rewards` . |
| Reivindicação de recompensa | Um `button[aria-haspopup="dialog"][aria-controls]` (ícone de presente), a caixa de diálogo que ele controla ( `data-state` ), botões de reivindicação habilitados com um filho `.contents` e um botão fechar com um rótulo `.sr-only` . |
| Gotas | `#rewards-panel` lista itens com `[role="progressbar"][data-state="complete"]` e um botão ativado. |
| Avatares | Elementos `img[alt]` cuja fonte é `files.kick.com/images/user/…/profile_image/…` . |

<a id="localization"></a>
## Localização

Cada rótulo, mensagem de ajuda, erro, caixa de diálogo e notificação passa pelo resolvedor de tradução para 38 localidades. As chaves ausentes voltam para o inglês. O novo texto da interface é traduzido para todos os idiomas suportados junto com o recurso que o adiciona. O seletor de idioma mostra bandeiras e nomes nativos; a interface segue o idioma do navegador na primeira execução e depois lembra uma escolha explícita.

<a id="safety-privacy-and-compatibility"></a>
## Segurança, privacidade e compatibilidade

- As configurações são higienizadas antes do armazenamento; valores inválidos voltam para padrões seguros.
- Nomes de canais, notas, texto de notificação e saída de diagnóstico são escapados antes da inserção do HTML.
- Um ícone de botão personalizado é recodificado a partir de uma tela e armazenado como uma URL de dados apenas de um tipo de imagem permitido; ele nunca sai do navegador.
- Shadow DOM mantém os estilos do script isolados do Kick; os eventos de teclado do painel são isolados das teclas de atalho do Kick.
- Ações automáticas ignoram canais excluídos, modo de segurança e elementos ausentes do jogador. A reivindicação de recompensa nunca pressiona o mesmo botão duas vezes em uma corrida e espera enquanto o visualizador digita.
- O script não faz solicitações de rede; as atualizações vêm do gerenciador de userscript ou da página Releases.
- As configurações locais existentes são preservadas ao passar de 1.1.0, 1.2.0 e 1.3.0.
