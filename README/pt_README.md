<div align="center">

[English](./en_README.md) · [العربية](./ar_README.md) · [Беларуская](./be_README.md) · [Български](./bg_README.md) · [Čeština](./cs_README.md) · [Dansk](./da_README.md) · [Deutsch](./de_README.md) · [Ελληνικά](./el_README.md) · [Español](./es_README.md) · [Suomi](./fi_README.md) · [Français](./fr_README.md) · [हिन्दी](./hi_README.md) · [English (India)](./en-in_README.md) · [Hrvatski](./hr_README.md) · [Magyar](./hu_README.md) · [Bahasa Indonesia](./id_README.md) · [Italiano](./it_README.md) · [日本語](./ja_README.md) · [한국어](./ko_README.md) · [Lietuvių](./lt_README.md) · [Latviešu](./lv_README.md) · [Македонски](./mk_README.md) · [Монгол](./mn_README.md) · [Bahasa Melayu](./ms_README.md) · [Nederlands](./nl_README.md) · [Norsk](./no_README.md) · [Polski](./pl_README.md) · **Português** · [Română](./ro_README.md) · [Русский](./ru_README.md) · [Slovenčina](./sk_README.md) · [Srpski](./sr_README.md) · [Svenska](./sv_README.md) · [ไทย](./th_README.md) · [Türkçe](./tr_README.md) · [Tiếng Việt](./vi_README.md) · [简体中文](./zh-cn_README.md) · [繁體中文](./zh-tw_README.md)

# Kick Stream Tweaks

**Seu player Kick, lembrado.** A qualidade, o volume e a velocidade são restaurados automaticamente em cada transmissão, com um painel de controle rápido e totalmente localizado.

[![Version](https://img.shields.io/badge/version-1.3.1-53fc18?style=flat-square)](https://github.com/ebayybe/kick-stream-tweaks/releases)
[![License](https://img.shields.io/badge/license-MIT-blue?style=flat-square)](./LICENSE)
[![Languages](https://img.shields.io/badge/languages-38-8a5cf6?style=flat-square)](#languages)
[![Userscript](https://img.shields.io/badge/Tampermonkey%20%7C%20Violentmonkey-supported-orange?style=flat-square)](#installation)

[Instalar](#installation) · [Características](#features) · [Mapa de configurações](#settings-map) · [Atalhos](#shortcuts) · [Referência de função](../docs/pt_FUNCTIONS.md) · [Registro de alterações](../CHANGELOG/pt_CHANGELOG.md) · [Lançamentos](https://github.com/ebayybe/kick-stream-tweaks/releases)

</div>

<a id="features"></a>
## Características

- **Qualidade que permanece.** Escolha uma qualidade ao vivo e uma qualidade VOD uma vez; ele é aplicado a cada novo fluxo. Se a qualidade exata estiver faltando, o script volta para a próxima qualidade inferior (ou para Auto).
- **Volume fixo.** O volume e o mudo são restaurados a cada transmissão, com um aviso de volume alto e um controle deslizante ao vivo que permanece sincronizado com o player.
- **Perfis por canal.** Abra um stream, pressione **Salvar este canal** e esse canal lembrará sua própria qualidade, volume, velocidade e som. Adicione um grupo e uma nota, pause as configurações salvas ou exclua totalmente o canal da automação.
- **Predefinições rápidas.** Economize largura de banda, melhor qualidade, visualização silenciosa e VOD com um clique.
- **Ferramentas.** Temporizador, visualização de foco, ressincronização do player, controles de layout de página (ocultar bate-papo, recolher o menu esquerdo) e um modo de segurança que pausa todas as alterações automáticas.
- **Alarme de congelamento.** Toca um alarme alto e mostra uma notificação quando o player congela ou mostra uma tela preta, mesmo que a guia esteja minimizada.
- **Botão de reivindicação rápida.** Um botão flutuante e arrastável que reivindica sua recompensa com um clique. Quatro designs, cinco ícones ou sua própria imagem, tamanho e opacidade ajustáveis.
- **Reivindicar recompensas automaticamente.** Opcional: aguarda a notificação de recompensa do Kick (ou verifica uma programação), reivindica o que está disponível e fecha a janela novamente (desativado por padrão).
- **Reprodução silenciosa.** Silencia uma transmissão sem silenciar o player, para que ele continue sendo reproduzido em uma guia em segundo plano. Defina-o globalmente ou por canal salvo.
- **Alertas.** Notificações que você pode arrastar, redimensionar e silenciar, além de efeitos sonoros opcionais com volume por evento.
- **Interface redesenhada.** Barra lateral agrupada, pesquisa de configurações, temas claros e escuros, cores de destaque, modo compacto, dimensionamento de texto e alto contraste.
- **Animações que você controla.** Visualização ao vivo, três predefinições e efeitos separados de abertura, foco e indicador. Respeita a configuração do sistema "reduzir movimento".
- **38 idiomas** com bandeiras. A interface segue o idioma do seu navegador na primeira execução e depois lembra sua escolha.
- **Privado por design.** Tudo permanece no seu navegador. Sem telemetria, sem solicitações de rede.

<a id="installation"></a>
## Instalação

1. Instale um gerenciador de userscript: [Tampermonkey](https://www.tampermonkey.net/) ou [Violentmonkey](https://violentmonkey.github.io/).
2. Abrir [`kick-stream-tweaks.user.js`](https://github.com/ebayybe/kick-stream-tweaks/raw/main/kick-stream-tweaks.user.js) e confirme a instalação.
3. Abra qualquer stream em [kick.com](https://kick.com) e pressione **F2**.

As atualizações são entregues pelo seu gerenciador de userscript. Você também pode assistir ao [Releases](https://github.com/ebayybe/kick-stream-tweaks/releases) página.

## Salvando configurações de um canal

1. Abra o stream do canal que deseja personalizar.
2. Abra o painel (`F2`) e pressione **Salvar este canal** (na página **Canais** ou na dica na página **Reprodução**). As configurações atuais de qualidade, volume, velocidade e som são armazenadas para esse canal.
3. Ajuste-os no editor abaixo do botão. Eles são aplicados automaticamente sempre que você abre esse canal.

Use a opção **Aplicar as configurações salvas neste canal** para pausar um perfil sem excluí-lo ou **Remover** para excluí-lo. Todos os canais salvos estão listados em **Canais → Canais salvos**, onde você pode pesquisar, classificar, fixar, agrupar, adicionar notas, fazer backup e restaurá-los.

<a id="settings-map"></a>
## Mapa de configurações

| Grupo | Página | O que há dentro |
| --- | --- | --- |
| Jogador | **Reprodução** | Predefinições, qualidade ao vivo/VOD, fallback, volume, mudo, aviso de volume alto, velocidade |
| Jogador | **Canais** | Perfil do canal atual, canais salvos, pesquisa, grupos, notas, backup |
| Jogador | **Ferramentas** | Temporizador, layout de página, recompensas de reivindicação automática, botão de reivindicação rápida, alarme de congelamento, ações rápidas, visualização de foco |
| Alertas | **Notificações** | Não perturbe, tamanho, duração, opacidade, posição, histórico |
| Alertas | **Sons** | Chave mestre e volume, chave por evento, volume e visualização |
| Interface | **Aparência** | Tema, estilo do painel, cor de destaque, densidade, contraste, desfoque, escala de texto, idioma |
| Interface | **Animações** | Visualização ao vivo, predefinições, efeitos de abertura/focagem/indicadores, velocidade |
| Interface | **Atalhos** | Teclas de atalho de menu e teclas de atalho de ação |
| Sistema | **Diagnóstico** | Status ao vivo, verificação de qualidade, verificação de conflitos, modo de segurança, registro de ações |
| Sistema | **Dados e sobre** | Exportar, importar, desfazer, redefinir, restaurar backup, links |

Cada controle deslizante também responde à roda do mouse enquanto você passa o mouse sobre ele. Use a caixa de pesquisa na parte superior do painel para encontrar qualquer configuração por nome. A pesquisa também entende os nomes em inglês, por isso funciona da mesma forma em todos os idiomas da interface e as chaves digitadas nunca chegam à página.

## Botão de reivindicação rápida

Ative-o em **Ferramentas → botão de reivindicação rápida na página**. Um pequeno botão aparece no stream:

- **Arraste** para qualquer lugar; sua posição é lembrada.
- **Clique** para resgatar sua recompensa (ele abre a janela de recompensas, pressiona *Reivindicar*, fecha a janela e retorna ao stream).
- Ele **brilha e mostra um ponto vermelho** quando a notificação de recompensa do Kick aparece. Ative *Mostrar apenas quando uma recompensa estiver disponível* para mantê-la oculta pelo resto do tempo.
- Escolha um **estilo** (Orb, Pill, Glass, Flat), um **ícone** integrado ou **sua própria imagem** (PNG, JPG, WebP, GIF ou SVG de até 2 MB; imagens quadradas com fundo transparente ficam melhores), um **tamanho** e uma **opacidade**. Uma visualização ao vivo mostra todas as alterações.

O botão é separado de *Reivindicação automática de recompensas*, então você pode reivindicar manualmente, automaticamente ou ambos.

<a id="shortcuts"></a>
## Atalhos

| Ação | Padrão |
| --- | --- |
| Abrir/fechar o painel | `F2` |
| Alternar notificações | `Alt+N` |
| Alternar bate-papo | `Alt+C` |
| Alternar menu à esquerda | `Alt+S` |
| Visualização de foco | `Alt+F` |
| Redefinir qualidade | `Alt+Q` |
| Restaurar volume | `Alt+V` |

Cada atalho pode ser recuperado em **Atalhos**. As ligações seguem a tecla física, portanto funcionam em qualquer layout de teclado.

<a id="languages"></a>
## Idiomas

Árabe, bielorrusso, búlgaro, chinês (simplificado), chinês (tradicional), croata, tcheco, dinamarquês, holandês, inglês, inglês (Índia), finlandês, francês, alemão, grego, hindi, húngaro, indonésio, italiano, japonês, coreano, letão, lituano, macedônio, malaio, mongol, norueguês, polonês, português, romeno, russo, sérvio, eslovaco, espanhol, sueco, tailandês, turco e vietnamita.

## Solução de problemas

- **A qualidade não é aplicada.** Abra **Diagnóstico**, pressione *Atualizar diagnóstico* para verificar as qualidades que o Kick oferece e, em seguida, *Verifique a qualidade selecionada*. Se um canal for excluído ou o modo de segurança estiver ativado, a linha de status indica isso.
- **As recompensas não são reivindicadas.** A reivindicação automática está desativada por padrão. Ative-o em **Ferramentas → Recompensas** e experimente *Resgatar agora*. Funciona apenas em canais ao vivo, enquanto a aba está visível e você não está digitando no chat. No modo *notificação*, o script reage ao banner de recompensa do próprio Kick.
- **Reprodução e áudio silenciosos.** A reprodução silenciosa roteia o vídeo através do mecanismo de áudio do navegador com ganho zero. Se um site bloquear isso, o painel avisa e o som normal permanece intacto.
- **Algo se comporta de maneira estranha.** Execute *Verificar conflitos* ou use *Redefinir seção* na página em questão.
- **As configurações parecem erradas após uma atualização.** Use **Dados e sobre → Desfazer** ou **Restaurar backup**.
- **Encontrou um bug?** Pressione *Copiar diagnóstico* e anexe-o a um [new issue](https://github.com/ebayybe/kick-stream-tweaks/issues).

## Privacidade

As configurações e os perfis dos canais são armazenados no armazenamento local do seu navegador em kick.com. O script nunca envia dados para lugar nenhum e não solicita permissões extras (`@grant none`).

## Contribuindo

Problemas e solicitações pull são bem-vindos. O script é um único arquivo independente, portanto, nenhuma etapa de construção é necessária para tentar uma alteração: edite `kick-stream-tweaks.user.js` e recarregue a página.

## Licença

[MIT](./LICENSE)
