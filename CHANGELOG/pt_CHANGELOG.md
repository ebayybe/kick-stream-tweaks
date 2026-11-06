<div align="center">

[English](./en_CHANGELOG.md) · [العربية](./ar_CHANGELOG.md) · [Беларуская](./be_CHANGELOG.md) · [Български](./bg_CHANGELOG.md) · [Čeština](./cs_CHANGELOG.md) · [Dansk](./da_CHANGELOG.md) · [Deutsch](./de_CHANGELOG.md) · [Ελληνικά](./el_CHANGELOG.md) · [Español](./es_CHANGELOG.md) · [Suomi](./fi_CHANGELOG.md) · [Français](./fr_CHANGELOG.md) · [हिन्दी](./hi_CHANGELOG.md) · [English (India)](./en-in_CHANGELOG.md) · [Hrvatski](./hr_CHANGELOG.md) · [Magyar](./hu_CHANGELOG.md) · [Bahasa Indonesia](./id_CHANGELOG.md) · [Italiano](./it_CHANGELOG.md) · [日本語](./ja_CHANGELOG.md) · [한국어](./ko_CHANGELOG.md) · [Lietuvių](./lt_CHANGELOG.md) · [Latviešu](./lv_CHANGELOG.md) · [Македонски](./mk_CHANGELOG.md) · [Монгол](./mn_CHANGELOG.md) · [Bahasa Melayu](./ms_CHANGELOG.md) · [Nederlands](./nl_CHANGELOG.md) · [Norsk](./no_CHANGELOG.md) · [Polski](./pl_CHANGELOG.md) · **Português** · [Română](./ro_CHANGELOG.md) · [Русский](./ru_CHANGELOG.md) · [Slovenčina](./sk_CHANGELOG.md) · [Srpski](./sr_CHANGELOG.md) · [Svenska](./sv_CHANGELOG.md) · [ไทย](./th_CHANGELOG.md) · [Türkçe](./tr_CHANGELOG.md) · [Tiếng Việt](./vi_CHANGELOG.md) · [简体中文](./zh-cn_CHANGELOG.md) · [繁體中文](./zh-tw_CHANGELOG.md)
</div>

# Ajustes do Kick Stream - Registro de alterações

Notas de lançamento do [Kick Stream Tweaks](https://github.com/ebayybe/kick-stream-tweaks), um script de usuário que lembra as preferências do jogador do Kick e adiciona um painel de controle configurável.

## v1.3.1 — 06/11/2026

> Proteção de layout para cada idioma e tamanho de texto, um estilo Minimal verdadeiramente distinto, recompensas e auxiliares de layout, um alarme de congelamento do jogador e um idioma padrão mais inteligente.

### Adicionado

- **Alarme de congelamento do player.** Detecta um player travado ou uma tela preta (tempo de vídeo se movendo sem quadros decodificados), reproduz um som de alarme alto e mostra uma notificação, mesmo quando a guia está minimizada. Tempo de detecção configurável (5–60 s), alternância de som independente e botão de teste.
- **Reivindicação automática de recompensas** (desativado por padrão): abre a janela de recompensas, reivindica o que está disponível, fecha novamente e retorna ao stream. Os drops que aparecem no painel de recompensas também são reivindicados. Inclui um botão *Solicite agora*.
- **Programação de recompensas.** Por padrão, o script aguarda a notificação de "resgate sua recompensa" do próprio Kick e a reivindica imediatamente (com um atraso opcional de 0 a 60 s), em vez de fazer uma votação. Um modo programado (a cada 5–60 minutos) também está disponível.
- **Botão de reivindicação rápida.** Um pequeno botão flutuante no stream que reivindica sua recompensa com um clique. Arraste-o para qualquer lugar (a posição é lembrada), escolha um dos quatro designs (Orb, Pill, Glass, Flat), cinco ícones integrados, um tamanho e uma opacidade, opcionalmente mostre-o apenas quando uma recompensa estiver disponível. Ele brilha e mostra um ponto quando a notificação de recompensa do Kick aparece. A página de configurações tem uma visualização ao vivo.
- **Seu próprio ícone.** Faça upload de um PNG, JPG, WebP, GIF ou SVG (até 2 MB) como ícone do botão, opcionalmente preenchendo todo o botão. A imagem é recodificada em um pequeno quadrado e armazenada apenas no seu navegador.
- **Roda do mouse nos controles deslizantes.** Cada controle deslizante pode ser ajustado com a roda do mouse enquanto você passa o mouse sobre ele, sem rolar o painel.
- **Referência de função.** O novo `en_FUNCTIONS.md` documenta a arquitetura, cada configuração, cada função e as partes da página do Kick das quais o script depende.
- **Salvar canal guiado.** Um cartão passo a passo "Como funcionam os canais salvos", um único botão **Salvar este canal** que armazena a qualidade, volume, velocidade e som atuais do canal que você está assistindo, uma dica de um clique na reprodução para canais não salvos, um brinde de confirmação, rotulado como botões *Editar* / *Concluído* na lista e uma opção para pausar as configurações salvas sem excluí-las.
- **Reprodução silenciosa.** Silencia a transmissão sem silenciar o player, para que ele continue reproduzindo em uma guia em segundo plano. Funciona globalmente e por canal salvo (uma tag *Silent* é mostrada na lista de canais).
- **Pesquisa de configurações multilíngues.** A pesquisa não diferencia sotaques e também corresponde aos nomes em inglês, portanto, digitar `volume` encontra a configuração em qualquer idioma da interface. A pesquisa por seção ou título do cartão mostra a seção inteira.
- **Controles de layout de página**: oculte o chat e recolha o menu esquerdo do painel ou com teclas de atalho (`Alt+C`, `Alt+S`), com uma opção para lembrar o layout de cada stream.
- **Animações de ícones** para a barra lateral, ícones de redefinição e ajuda, com interruptor próprio (também faz parte das predefinições de animação).
- **Avatares de canais** são capturados do Kick e mostrados na lista de canais salvos.
- 14 cores de destaque (era 6).
- Caixa de diálogo de confirmação no painel que parece idêntica em todos os navegadores.

### Alterado

- **Idioma da interface** agora segue o idioma do navegador na primeira execução. Depois de escolher um idioma, ele será lembrado. As configurações migradas de versões mais antigas seguem o navegador até que um idioma seja escolhido explicitamente.
- O script agora inicia em `document-start` para que o isolamento do teclado seja registrado antes dos próprios ouvintes da página.
- As linhas de configurações são empilhadas (rótulo acima do controle) para que o texto nunca possa se sobrepor ou recortar, em qualquer idioma, tamanho de texto ou largura do painel. Os rótulos da barra lateral se ajustam aos limites das palavras.
- Os seletores de animação são reconstruídos como linhas de largura total com ícones, para que caibam traduções longas.
- O estilo do painel **Minimal** agora é plano e quadrado, sem brilho, bordas substituídas por divisórias e seleção de estilo de sublinhado, então a diferença do **Kick** é óbvia.
- O painel tem largura fixa de 680 px (encolhe para caber em pequenas janelas). A configuração da largura do painel e a alça de redimensionamento foram removidas, para que os layouts sejam iguais para todos.
- O título da animação do indicador não diz mais “verde” quando uma cor de destaque diferente é usada.

### Corrigido

- Alterar volume, mudo, reprodução silenciosa, volume automático ou velocidade também reaplicou a qualidade (reabrindo o menu de qualidade e mostrando uma notificação). Essas configurações agora afetam apenas o que você alterou; a qualidade é reaplicada somente quando uma configuração de qualidade é alterada.
- Digitar na pesquisa de configurações pode acionar as teclas de atalho do Kick (por exemplo, o Space mudou o stream para tela cheia). As teclas digitadas dentro do painel não alcançam mais a página.
- O volume preferido foi substituído quando o Kick redefiniu o player para 50% após uma recarga, e o controle deslizante do painel mostrou 50%. As alterações feitas pela própria página agora são revertidas para o volume salvo; apenas suas próprias ações o atualizam.
- Recorte e sobreposição de texto em Aparência, Animações e Teclas de atalho (rótulos longos, tamanhos de texto grandes, painéis estreitos, traduções longas).
- O estilo Minimal desativou silenciosamente a configuração de desfoque de fundo; desfoque agora funciona em ambos os estilos.
- A alteração da opacidade do botão de reivindicação rápida não atualizou a visualização.
- Os controles deslizantes não reagiram à roda do mouse.
- Blocos de animação ("Scale", "Pop") transbordando seus cartões.
- A confirmação de exclusão de perfil usou a caixa de diálogo nativa do navegador.
- Os chips do temporizador não foram localizados.
- Os canais salvos não mostraram nenhum avatar e o canal atual não mostrou nenhum até que seu perfil fosse salvo.

### Compatibilidade

- As configurações existentes e os canais salvos são preservados durante a atualização da v1.3.0, v1.2.0 e v1.1.0.
- O script ainda não envia telemetria e não faz solicitações próprias de rede.

### Links

- [Repositório](https://github.com/ebayybe/kick-stream-tweaks)
- [Lançamentos](https://github.com/ebayybe/kick-stream-tweaks/releases)
- [Problemas](https://github.com/ebayybe/kick-stream-tweaks/issues)

## v1.3.0 — 03/11/2026

> Redesenho completo, uma estrutura lógica de configurações, um sistema de animação reconstruído e uma rodada de correções de confiabilidade para a automação do player.

### Adicionado

- Painel redesenhado com uma barra lateral agrupada: **Player** (Reprodução, Canais, Ferramentas), **Alertas** (Notificações, Sons), **Interface** (Aparência, Animações, Atalhos) e **Sistema** (Diagnóstico, Dados e Sobre).
- Nova página **Animações**: um estágio de visualização ao vivo, três predefinições de um clique (Completo, Reduzido, Desativado) e seletores separados para o efeito de abertura (Nenhum, Fade, Slide, Escala, Pop), efeito de foco, animação de indicador e velocidade.
- Predefinições rápidas para economizar largura de banda, melhor qualidade, visualização silenciosa e VOD, aplicadas instantaneamente.
- Seletor de qualidade redesenhado como grade de chips; velocidade, escala de texto e temporizador usam chips e controles segmentados em vez de menus suspensos.
- Gerenciador de canais embutido: pesquisa, classificação, fixação, grupos, notas, edição por canal e backup/restauração completo, tudo sem caixas de diálogo aninhadas.
- Configurações de som inline com alternância por evento, botão de volume e visualização.
- Verificação de qualidade em diagnóstico: abre o menu do player, registra as qualidades disponíveis e fecha novamente.
- As teclas de atalho agora funcionam em qualquer layout de teclado (elas correspondem à tecla física).
- Sincronização de configurações entre guias abertas do Kick.
- Amostras de cores de destaque ao lado do seletor de cores personalizado, uma faixa de escala de texto mais alta e uma proteção de movimento reduzido.

### Alterado

- As configurações são armazenadas em um formato mais enxuto; a configuração 1.2.x, teclas de atalho e opções de animação são migradas automaticamente.
- A velocidade de reprodução só é aplicada quando difere de 1×, então a recuperação da borda ao vivo do próprio Kick não é mais substituída.
- O histórico de desfazer é mantido na memória em vez de ser gravado no armazenamento local.
- Eventos sonoros, notificações e teclas de atalho compartilham um conjunto consistente de controles.
- O seletor "Perfil de situação" foi substituído por predefinições de um clique.

### Corrigido

- Fechar o menu do player após aplicar a qualidade não corre mais o risco de reabri-lo.
- Uma qualidade substituta (por exemplo, 720p em vez de 1080p indisponível) não substitui mais a qualidade preferencial salva para um canal.
- Somente cliques reais em itens de qualidade atualizam a qualidade do “último uso”; cliques automatizados são ignorados.
- A pesquisa de configurações não falha mais após a digitação (o alvo do evento foi perdido dentro do Shadow DOM).
- As alterações feitas em uma guia não podem mais substituir as configurações de outra guia.
- As teclas de atalho do painel não quebram mais em layouts não latinos.
- Rótulos incorretos nos controles de log de diagnóstico e uma palavra coreana perdida no título do script japonês.
- Verificações de reprodução interrompida e pausa na sincronização do stream enquanto a guia está oculta.

### Removido

- Recursos que não puderam ser verificados no player do Kick ou duplicados: preferência de baixa latência, ocultar os controles do player no modo inativo e verificação de atualização no painel baseada no GitHub (use as atualizações do gerenciador de userscript ou a página Releases).
- Opções de engenharia excessiva: perfis de aparência salvos, mostrar/ocultar/reordenar seções, modos de navegação alternativos, verificações de compatibilidade e cobertura de tradução, animações aleatórias/rolagem/seção, durações de notificação por evento, avatares de canal, cores de grupo, ordenação manual, seleção em massa, histórico por canal e limpeza automática.

### Compatibilidade

- As configurações existentes e os canais salvos são preservados durante a atualização da v1.2.0 e v1.1.0.
- As configurações permanecem locais no navegador; o script não envia telemetria nem faz solicitações de rede.

### Links

- [Repositório](https://github.com/ebayybe/kick-stream-tweaks)
- [Lançamentos](https://github.com/ebayybe/kick-stream-tweaks/releases)
- [Problemas](https://github.com/ebayybe/kick-stream-tweaks/issues)

## v1.2.0 — 07/10/2026

> Expandiu o auxiliar original de qualidade e volume em um kit de ferramentas completo de configurações do player.

### Adicionado

- Perfis por canal para qualidade, volume, velocidade de reprodução e estado mudo.
- Lista de canais salva com notas, grupos, edição de perfil e importação/exportação.
- Efeitos sonoros com mudança global, mudanças de eventos individuais, pré-visualizações e volume por evento.
- Notificações para alterações de qualidade, volume restaurado e ações com falha.
- Histórico de notificações, registro de ações e ferramentas de diagnóstico com controles claros.
- Verificações de disponibilidade de qualidade, verificações de conflitos e verificações de compatibilidade.
- Modo de segurança para desativar temporariamente as alterações automáticas do player.
- Teclas de atalho, arrastar painel, redimensionar painel e ação no painel central.
- Estilos de painel Kick e Minimal, layout compacto e controles de animação.
- Temporizador, modo de foco em tela cheia, ressincronização do player e controles de reprodução.
- Importação/exportação de configurações e perfis de canais.
- Navegação pelo teclado, dimensionamento de texto, anúncios do leitor de tela e alto contraste.
- Localização de interface para 38 idiomas suportados.

### Corrigido

- Impediu que vários diálogos secundários aparecessem ao mesmo tempo.
- Corrigida uma caixa de diálogo vazia aparecendo acima da janela de configurações de som.
- Ignorou mensagens de notificação vazias em vez de mostrar sobreposições em branco.
- Melhor embalagem de etiquetas longas em painéis estreitos e layouts localizados.
- Correção da substituição de marcadores `{quality}` e `{q}` em notificações.
- Atualizado o rótulo da versão no painel e a comparação de atualizações para 1.2.0.

### Compatibilidade

- As configurações existentes são preservadas durante a atualização da v1.1.0.
- As configurações permanecem locais no navegador; o script não envia telemetria.
- O verificador de atualização lê a tag de lançamento mais recente do GitHub e não instala atualizações automaticamente.

### Links

- [Repositório](https://github.com/ebayybe/kick-stream-tweaks)
- [Lançamentos](https://github.com/ebayybe/kick-stream-tweaks/releases)
- [Problemas](https://github.com/ebayybe/kick-stream-tweaks/issues)

## v1.1.0

A versão pública original focava em lembrar a qualidade e o volume do vídeo no Kick, aplicando-os automaticamente a novos streams e fornecendo um painel de configurações F2.
