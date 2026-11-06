<div align="center">

[English](./en_FUNCTIONS.md) · [العربية](./ar_FUNCTIONS.md) · [Беларуская](./be_FUNCTIONS.md) · [Български](./bg_FUNCTIONS.md) · [Čeština](./cs_FUNCTIONS.md) · [Dansk](./da_FUNCTIONS.md) · [Deutsch](./de_FUNCTIONS.md) · [Ελληνικά](./el_FUNCTIONS.md) · **Español** · [Suomi](./fi_FUNCTIONS.md) · [Français](./fr_FUNCTIONS.md) · [हिन्दी](./hi_FUNCTIONS.md) · [English (India)](./en-in_FUNCTIONS.md) · [Hrvatski](./hr_FUNCTIONS.md) · [Magyar](./hu_FUNCTIONS.md) · [Bahasa Indonesia](./id_FUNCTIONS.md) · [Italiano](./it_FUNCTIONS.md) · [日本語](./ja_FUNCTIONS.md) · [한국어](./ko_FUNCTIONS.md) · [Lietuvių](./lt_FUNCTIONS.md) · [Latviešu](./lv_FUNCTIONS.md) · [Македонски](./mk_FUNCTIONS.md) · [Монгол](./mn_FUNCTIONS.md) · [Bahasa Melayu](./ms_FUNCTIONS.md) · [Nederlands](./nl_FUNCTIONS.md) · [Norsk](./no_FUNCTIONS.md) · [Polski](./pl_FUNCTIONS.md) · [Português](./pt_FUNCTIONS.md) · [Română](./ro_FUNCTIONS.md) · [Русский](./ru_FUNCTIONS.md) · [Slovenčina](./sk_FUNCTIONS.md) · [Srpski](./sr_FUNCTIONS.md) · [Svenska](./sv_FUNCTIONS.md) · [ไทย](./th_FUNCTIONS.md) · [Türkçe](./tr_FUNCTIONS.md) · [Tiếng Việt](./vi_FUNCTIONS.md) · [简体中文](./zh-cn_FUNCTIONS.md) · [繁體中文](./zh-tw_FUNCTIONS.md)

</div>




# Ajustes de Kick Stream: referencia de funciones

Referencia para ajustes de Kick Stream 1.3.1. Describe qué hace cada área funcional, cómo se almacenan las configuraciones, de qué partes de la página de Kick depende el script y cómo funciona cada función o método nombrado en el script de usuario. Consulte el [repositorio](https://github.com/ebayybe/kick-stream-tweaks) y [el registro de cambios](../CHANGELOG/en_CHANGELOG.md) .

> Los nombres coinciden con la fuente. `void` significa que una función actúa a través de efectos secundarios. Un método escrito como `Object.method` vive en ese objeto ( `PlayerSync` , `Extras` , `GUI` , `Store` ).

## Contenidos

1. [Arquitectura](#architecture)
2. [Comportamiento de cara al usuario](#user-facing-behavior)
3. [Referencia de configuración](#settings-reference)
4. [Utilidades principales](#core-utilities)
5. [Almacenamiento de configuraciones](#settings-storage)
6. [Sincronización de jugadores ( `PlayerSync` )](#player-synchronization-playersync)
7. [Extras de página ( `Extras` )](#page-extras-extras)
8. [Bloques de construcción de la interfaz](#interface-building-blocks)
9. [Páginas de configuración ( `PAGES` )](#settings-pages-pages)
10. [Controlador del panel ( `GUI` )](#panel-controller-gui)
11. [Teclas de acceso rápido y inicio](#hotkeys-and-startup)
12. [Eliminar las dependencias de la página](#kick-page-dependencies)
13. [Localización](#localization)
14. [Seguridad, privacidad y compatibilidad](#safety-privacy-and-compatibility)

<a id="architecture"></a>
## Arquitectura

El script de usuario es un archivo autónomo que se ejecuta al `document-start` con `@grant none` . No tiene ningún paso de construcción y no realiza solicitudes de red propias.

| Capa | Objeto/área | Responsabilidad |
|---|---|---|
| Datos | `TR` , `DIAG` , `FLAGS` , `LANG_NAMES` | Traducciones para 38 idiomas, mensajes de diagnóstico localizados, SVG de banderas y nombres de idiomas. |
| Configuración | `CONFIG` , `DEFAULTS` | Constantes (selectores, límites de reintento, ajustes preestablecidos, secciones) y configuraciones predeterminadas. |
| Almacenamiento | `sanitizeSettings` , `Store` , `persist` | Valida y guarda la configuración en `localStorage` ; mantiene una pila de deshacer en memoria. |
| Lógica del jugador | `PlayerSync` | Encuentra el video, restaura la calidad, el volumen, la velocidad y el modo silencioso, mira si se congela. |
| Ayudantes de página | `Extras` | Botones de diseño, reclamo de recompensas, avatares de canal y programador en segundo plano. |
| Interfaz | `PAGES` , `GUI` , ayudantes | Panel Shadow-DOM, notificaciones, sonidos, botón flotante de reclamo rápido, teclas de acceso rápido. |

Flujo de datos: el bucle `PlayerSync.sync` de 1,5 segundos lee la configuración efectiva (primero el perfil del canal, luego global), las aplica al reproductor y llama a `Extras.tick` . Las acciones del usuario pasan por controladores `GUI` , que actualizan la configuración con `persist` y envían solo la parte afectada al reproductor ( `media` o `all` ).

<a id="user-facing-behavior"></a>
## Comportamiento de cara al usuario

| Área | Comportamiento |
|---|---|
| Persistencia del jugador | Guarda la calidad, el volumen, el estado de silencio, el modo silencioso y la velocidad en vivo/VOD y luego los aplica cuando se detecta una nueva transmisión. Los cambios que la página realiza por sí misma (por ejemplo, Kick restablece el volumen al 50%) se revierten; sólo las acciones del espectador actualizan los valores guardados. |
| Calidad | Selecciona la calidad preferida a través del menú del reproductor, vuelve a la siguiente inferior (o Auto) cuando no está disponible y cierra el menú nuevamente. Sólo los clics genuinos del usuario le enseñan al script una nueva calidad de "último uso". |
| Volumen y reproducción silenciosa | El volumen y el silencio se restablecen por transmisión. La reproducción silenciosa dirige el vídeo a través del motor Web Audio con ganancia cero, por lo que la transmisión sigue reproduciéndose en una pestaña de fondo sin ser silenciada. |
| Perfiles de canales | **Guardar este canal** almacena la calidad, el volumen, la velocidad y el sonido actuales del canal que se está viendo. Los perfiles también contienen notas, grupos, estado de pin, un avatar y las banderas habilitadas/excluidas. |
| Preajustes | Ahorre ancho de banda, mejor calidad, visualización silenciosa y aplicación VOD con un solo clic. |
| Paneles | `F2` o una tecla de acceso rápido personalizada abre un panel de ancho fijo (680 px) con una barra lateral agrupada, búsqueda, estilos Kick y Minimal, temas claros/oscuros, 14 colores de acento más un selector de color, diseño compacto, desenfoque de fondo, escala de texto, alto contraste y controles de animación. |
| Buscar | No distingue acentos, coincide con el idioma de la interfaz y los nombres en inglés, y coincide con los títulos de secciones o tarjetas. Las pulsaciones de teclas escritas en el panel nunca llegan a las teclas de acceso rápido de Kick. |
| Deslizadores | Cada control deslizante responde a clics, arrastres, flechas del teclado y la rueda del mouse. |
| Sonidos | Señales de audio web para acciones de menú, cambios de configuración, éxito/fracaso de calidad y restauración de volumen, cada uno con un interruptor, vista previa y volumen. |
| Notificaciones | Mensajes localizados que se pueden arrastrar, escalar, hacer transparentes, silenciar (no molestar, silencio en pantalla completa) y grabar en el historial. |
| Alarma de congelación | Detecta un reproductor bloqueado o una pantalla negra, reproduce una alarma fuerte (incluso en una pestaña oculta, independientemente del interruptor de efectos de sonido) y muestra una notificación. |
| Recompensas | El reclamo automático opcional espera la notificación de recompensa de Kick (o se ejecuta según un cronograma), abre la ventana de recompensas, reclama lo que está disponible y la cierra. Un botón de reclamo rápido flotante y arrastrable hace lo mismo con un solo clic. |
| Diseño | Oculta el chat y colapsa el menú izquierdo desde el panel o con teclas de acceso rápido, recordando opcionalmente la elección para cada transmisión. |
| Herramientas | Temporizador de apagado, vista de enfoque (pantalla completa), resincronización del reproductor y un modo seguro que pausa cada cambio automático. |
| Diagnóstico | Estado en vivo, calidades detectadas, resolución de video, escaneo de calidad, verificación de conflictos, registro de acciones y un informe copiable. |
| Datos | Exportar/importar configuraciones, deshacer, restaurar después de restablecer, realizar copias de seguridad/restaurar canales guardados. |
| Privacidad | Las configuraciones, perfiles, registros e historiales permanecen en el almacenamiento del navegador. No se envía nada a ninguna parte. |

<a id="settings-reference"></a>
## Referencia de configuración

Todos los valores son validados por `sanitizeSettings` ; cualquier cosa no válida vuelve al valor predeterminado. Se aplican rangos.

### Jugador

| Clave | Tipo / gama | Predeterminado | Significado |
|---|---|---|---|
| `autoQualityEnabled` | booleano | `true` | Aplique la calidad preferida automáticamente. |
| `preferredLiveQuality` , `preferredVodQuality` | `auto` , `1080p60` , `1080p` , `720p` , `480p` , `360p` , `160p` | `auto` | Calidad para solicitar transmisiones en vivo y VOD. `auto` significa "recordar mi última elección". |
| `lastLiveQuality` , `lastVodQuality` | mismo | `auto` | Última calidad que el espectador escogió a mano. |
| `qualityFallback` | `lower` , `auto` | `lower` | Qué hacer cuando no se ofrece la calidad preferida. |
| `autoVolumeEnabled` | booleano | `true` | Restaura y protege el volumen guardado. |
| `volume` | 0–1 | `1` | Volumen guardado. |
| `muted` | booleano | `false` | Estado de silencio guardado. |
| `silent` | booleano | `false` | Reproducción silenciosa (gráfico de audio de ganancia cero, reproductor no silenciado). |
| `playbackRate` | 0,25–2,5 | `1` | Velocidad guardada; `1` nunca es forzado. |
| `warnLoudVolume` , `loudVolumeThreshold` | booleano; 60–100, paso 5 | `true` ; `85` | Advertencia de alto volumen. |
| `safeMode` | booleano | `false` | Pausa cada cambio automático. |
| `channelProfiles` | objeto, hasta 200 | `{}` | Perfiles por canal (ver más abajo). |

Campos de perfil del canal: `enabled` , `excluded` , `liveQuality` , `vodQuality` , `volume` , `muted` , `silent` , `playbackRate` , `displayName` , `pinned` , `avatar` (solo `https://…kick.com/images/user/…` URL), `note` (240 caracteres), `group` (40 caracteres), `updatedAt` , `lastUsed` .

### Notificaciones y sonidos

| Clave | Tipo / gama | Predeterminado | Significado |
|---|---|---|---|
| `notificationsEnabled` | booleano | `true` | Mostrar notificaciones de resultados. |
| `doNotDisturb` , `quietFullscreen` | booleano | `false` , `true` | Suprime notificaciones y sonidos, o solo en pantalla completa. |
| `notificationScale` | 0,8–1,4 | `1` | Tamaño de notificación. |
| `notificationDuration` | 1500–12000 ms, paso 500 | `3500` | Cuánto tiempo permanece una notificación. |
| `notificationOpacity` | 0,35–1 | `0.95` | Transparencia en las notificaciones. |
| `notificationShowIcon` | booleano | `true` | Muestra el icono de estado. |
| `notificationPosition` | `{x, y}` o `null` | `null` | Posición arrastrada. |
| `notificationHistoryEnabled` , `notificationHistory` | booleano; hasta 30 entradas | `true` ; `[]` | Historial de notificaciones. |
| `soundEffectsEnabled` , `soundVolume` | booleano; 0–1 | `false` ; `0.35` | Interruptor maestro y volumen. |
| `soundEvents` , `soundEventVolumes` | por evento: `menu` , `settingChanged` , `qualityApplied` , `qualityFailed` , `volumeApplied` | todo encendido; `0.35` | Cambio y volumen por evento. |

### Apariencia, movimiento y atajos

| Clave | Tipo / gama | Predeterminado | Significado |
|---|---|---|---|
| `theme` | `dark` , `light` | `dark` | Tema de color. |
| `panelStyle` | `kick` , `minimal` | `kick` | Estilo visual del panel. |
| `accentColor` | `#rrggbb` | `#53fc18` | Color de acento. |
| `compactMode` , `highContrast` | booleano | `false` | Densidad y contraste. |
| `backdropBlur` | 0–12 píxeles | `6` | Fondo borroso detrás del panel (funciona en ambos estilos). |
| `textScale` | 0,9–1,3 | `1` | Tamaño del texto. |
| `language` , `languageChosen` | código local; booleano | idioma del navegador; `false` | La interfaz sigue el idioma del navegador hasta que se elige un idioma y luego se recuerda la elección. |
| `panelPosition` | `{x, y}` o `null` | `null` | Posición del panel arrastrado. |
| `motionSpeed` | `fast` , `normal` , `slow` | `normal` | Velocidad de animación. |
| `openEffect` | `none` , `fade` , `slide` , `scale` , `pop` | `scale` | Efecto de apertura/cierre del panel. |
| `hoverEffect` | `none` , `lift` , `glow` | `lift` | Efecto de desplazamiento. |
| `indicatorAnimation` | `glow` , `pulse` , `breathe` , `off` | `glow` | Animación de logotipo/indicador. |
| `iconAnimations` | booleano | `true` | Animar los íconos de barra lateral, reinicio y ayuda. |
| `hotkey` | cadena combinada | `F2` | Abre o cierra el panel. |
| `actionHotkeys` | cadenas combinadas | `Alt+N` , `Alt+F` , `Alt+Q` , `Alt+V` , `Alt+C` , `Alt+S` | Alternar notificaciones, vista de enfoque, restablecer calidad, restaurar volumen, alternar chat, alternar menú de la izquierda. |

Las combinaciones de teclas se almacenan como cadenas, como `Alt+Q` , y se combinan por tecla física, por lo que funcionan en cualquier diseño de teclado. Las configuraciones de versiones anteriores con una tecla de acceso rápido en forma de objeto se convierten automáticamente. El ancho del panel se fija en 680 px (limitado al tamaño de la ventana); la configuración de ancho anterior se ignora.

### Herramientas

| Clave | Tipo / gama | Predeterminado | Significado |
|---|---|---|---|
| `autoRecoverStall` | booleano | `false` | Pruebe `play()` cuando se detecte una congelación. |
| `freezeAlertEnabled` , `freezeSound` | booleano | `true` | Congelar notificación y sonido de alarma. |
| `freezeSeconds` | 5–60, paso 5 | `10` | Segundos sin avances antes de la alarma. |
| `layoutHideChat` , `layoutCollapseSidebar` | booleano | `false` | Diseño recordado, aplicado una vez por página. |
| `autoClaimRewards` | booleano | `false` | Habilite el reclamo automático de recompensas. |
| `claimMode` | `notify` , `interval` | `notify` | Reclama cuando Kick muestra su notificación, o según un cronograma. |
| `claimDelaySec` | 0–120, paso 5 | `5` | Espere hasta que aparezca la notificación (modo de notificación). |
| `claimIntervalMin` | 5–120, paso 5 | `10` | Minutos entre comprobaciones (modo programado). |

### Botón de reclamo rápido

| Clave | Tipo / gama | Predeterminado | Significado |
|---|---|---|---|
| `claimWidget` | booleano | `false` | Muestra el botón flotante. |
| `claimWidgetStyle` | `orb` , `pill` , `glass` , `flat` | `orb` | Diseño de botones. |
| `claimWidgetIcon` | `gift` , `crown` , `star` , `bolt` , `coin` , `custom` | `gift` | Icono incorporado o imagen propia del usuario. |
| `claimWidgetCustomIcon` | `data:image/(png\|webp\|jpeg);base64,…` , hasta 90.000 caracteres | vacío | Copia recodificada de la imagen cargada. Todo lo demás se rechaza. |
| `claimWidgetImageFill` | booleano | `false` | Deje que una imagen personalizada llene todo el botón (no utilizada por el diseño de la píldora). |
| `claimWidgetSize` | `s` , `m` , `l` | `m` | Tamaño del botón. |
| `claimWidgetOpacity` | 0,3–1 | `0.9` | Opacidad del botón (opacidad total mientras hay una recompensa disponible). |
| `claimWidgetAutoHide` | booleano | `false` | Muestra el botón solo cuando haya una recompensa disponible. |
| `claimWidgetPos` | `{x, y}` o `null` | `null` | Posición arrastrada. |

### Diagnóstico y estado

| Clave | Tipo / gama | Predeterminado | Significado |
|---|---|---|---|
| `diagnosticsLogEnabled` , `diagnosticsLog` | booleano; hasta 60 entradas | `true` ; `[]` | Registro de acciones. |
| `activeSection` | identificación de sección | `playback` | Última página abierta. |
| `resetBackup` | objeto de configuración | `null` | Instantánea tomada antes de un reinicio o una importación. |

<a id="core-utilities"></a>
## Utilidades principales

| Función | Parámetros / retorno | Qué y cómo lo hace |
|---|---|---|
| `detectLanguage` | — → localidad | Recorre `navigator.languages` , asigna variantes regionales ( `zh-HK` → `zh-tw` , `nb` / `nn` → `no` ) y devuelve la primera configuración regional admitida, o `en` . |
| `dictFor` | idioma → diccionario | Devuelve la tabla de traducción para una configuración regional, volviendo a su idioma base y luego al inglés. |
| `t` / `T` | lang, clave, vars → cadena | Resuelve una clave con sustitución de `{placeholder}` ; `T` utiliza el idioma actual. |
| `diagText` | índice, calidad → cadena | Devuelve una de las frases de diagnóstico localizadas. |
| `log` | …argumentos → vacío | Registro de consola con el prefijo de script. |
| `clamp` , `sleep` , `esc` | valor → valor | Limitación de rango, retraso basado en promesas y escape HTML. |
| `normalizeQuality` | texto → cadena | Reduce en minúscula una etiqueta de calidad y elimina los espacios en blanco. |
| `debounce` | fn, espera → función | Antirrebote final con un método `flush` . |
| `onLocationChange` | devolución de llamada → anular | Detecta la navegación de una sola página ajustando `pushState` / `replaceState` , escuchando `popstate` y sondeando una vez por segundo. |
| `keyLabelFromEvent` , `comboFromEvent` , `matchesCombo` | evento → cadena/booleano | Cree y compare combinaciones de claves a partir del código de clave física. |
| `mkPointer` | tipo, extra → evento | Crea un `PointerEvent` (o un `MouseEvent` cuando no está disponible) utilizado para controlar los menús ARIA de Kick. |
| `waitFor` | sonda, tiempo de espera, paso → valor/nulo | Sondea hasta que la sonda devuelve un valor o finaliza el tiempo de espera. |
| `imageToDataUrl` | imagen → cadena | Escala una imagen a un lienzo cuadrado (manteniendo proporciones, `willReadFrequently` ), intenta 128, 96 y 64 px y devuelve una URL de datos PNG que no supere los 70.000 caracteres. |

<a id="settings-storage"></a>
## Almacenamiento de configuración

| Función | Parámetros / retorno | Qué y cómo lo hace |
|---|---|---|
| `sanitizeProfiles` | objeto → objeto | Mantiene como máximo 200 perfiles con claves válidas y sujeta cada campo; el avatar debe ser una URL de imagen de Kick. |
| `sanitizeSettings` | objeto, conCopia de seguridad → objeto | Valida cada configuración (tipos, rangos, valores permitidos), migra las configuraciones 1.1 a 1.3 (calidad heredada, teclas de acceso rápido, animación y teclas de sección) y aplica la regla de idioma. |
| `legacyHotkey` | valor → cadena | Convierte una tecla de acceso rápido con forma de objeto en una cadena combinada. |
| `Store.load` / `Store.save` | — / configuración → configuración/void | Lea y escriba el objeto desinfectado en `localStorage` ( `kickTweaks.settings.v1` ). |
| `persist` | parche, `{undo}` → anular | Fusiona un parche, desinfecta, guarda con un breve rebote y, opcionalmente, envía una instantánea para deshacer (se mantiene solo en la memoria, hasta 15). |
| oyente `storage` | evento → nulo | Vuelve a cargar la configuración cuando otra pestaña Kick la cambia, para que las pestañas nunca se sobrescriban entre sí. |

<a id="player-synchronization-playersync"></a>
## Sincronización del reproductor ( `PlayerSync` )

### Ayudantes de canal y perfil

| Método | Parámetros / retorno | Qué y cómo lo hace |
|---|---|---|
| `isVod` | — → booleano | Detecta una página VOD a partir de la URL. |
| `channelKey` | — → cadena | Crea la clave estable `channel:slug` (o `vod:id` , `kick:home` ), almacenando en caché el resultado durante tres segundos. En las páginas VOD se utiliza el enlace del canal más cercano al reproductor. |
| `channelSlug` | — → cadena | Devuelve la parte slug de una clave de canal. |
| `profile` | clave → objeto/nulo | Lee un perfil guardado. |
| `profileActive` | — → objeto/nulo | Devuelve el perfil actual solo cuando está habilitado y no excluido. |
| `isExcluded` | — → booleano | Comprueba si la automatización está deshabilitada para este canal. |
| `updateProfile` | parche, clave → anular | Crea o fusiona un perfil y lo marca `updatedAt` . |
| `saveCurrentChannel` | — → objeto/nulo | Almacena la calidad, el volumen, el silencio, la velocidad y el estado de silencio actuales del espectador como un perfil habilitado y escanea la página en busca del avatar del canal. |
| `effective` | — → objeto | Resuelve volumen, silencio, velocidad y calidad en vivo/VOD desde el perfil activo o la configuración global. |
| `setStatus` | estado, resultado → nulo | Actualiza los códigos de estado y de último resultado que se muestran en el encabezado y diagnóstico. |

### Encontrar y conducir al jugador de Kick

| Método | Parámetros / retorno | Qué y cómo lo hace |
|---|---|---|
| `findMainVideo` principal | — → vídeo/nulo | Elige el `<video>` visible más grande. |
| `streamKey` | — → cadena | Devuelve la ruta de la página utilizada para aplicar la calidad una vez por transmisión. |
| `isAccountButton` | botón → booleano | Rechaza los botones de encabezado, avatar y cuenta. |
| `findSettingsButton` | vídeo → botón/nulo | Encuentra el botón de engranaje del reproductor por etiqueta o por proximidad a la esquina inferior derecha del video. |
| `revealControls` | vídeo → vacío | Distribuye eventos de desplazamiento para que aparezcan controles ocultos. |
| `simulateClick` | elemento → vacío | Envía la secuencia completa de eventos y punteros que los menús de Kick necesitan. |
| `menuItems` | — → elemento[] | Enumera las entradas `menuitemradio` visibles. |
| `openQualityMenu` | — → botón/nulo | Abre el menú de ajustes, ingresa a una entrada de calidad cuando aparece un menú de nivel superior y espera las opciones. |
| `closeMenu` | botón → Promesa | Cierra el menú solo si todavía está abierto (un segundo clic a ciegas podría volver a abrirlo), con un recurso de Escape. |
| `readMenu` | — → elemento[] | Registra las calidades ofrecidas y la comprobada. |
| `scanQualities` | — → Promesa<boolean> | Abre el menú, registra las calidades disponibles y lo cierra (utilizado por diagnóstico). |
| `activate` | artículo → Promesa | Hace clic en una opción y espera hasta que se marque. |
| `selectQuality` | deseado, respaldo → Promesa | Selecciona la calidad solicitada, en caso contrario la siguiente inferior, o Auto. |
| `desiredQuality` | — → cadena | Elige la calidad a aplicar desde el perfil, la preferencia o la última elección manual. |
| `applyQualityOnce` | streamKey → Promesa | Aplica la calidad deseada una vez por transmisión, cierra el menú y notifica sobre el éxito o el fracaso. |
| `watchManualQuality` | — → nulo | Aprende una nueva calidad de "último uso" únicamente a partir de clics genuinos (confiables), de modo que los clics automatizados y los respaldos nunca sobrescriban los valores guardados. |

### Volumen, modo silencio, velocidad y monitorización

| Método | Parámetros / retorno | Qué y cómo lo hace |
|---|---|---|
| `applyVolume` | vídeo, tranquilo → vacío | Escribe el volumen efectivo y el estado de silencio (marcado como cambio propio del script). |
| `trackInput` | — → nulo | Registra la hora de la última entrada confiable de puntero, rueda, toque o teclado. |
| `reassertVolume` | vídeo → vacío | Devuelve el volumen guardado cuando la página lo cambió sin ninguna intervención del usuario (velocidad limitada a ocho reversiones cada diez segundos). |
| `watchVolume` | vídeo → vacío | Escucha el `volumechange` : los cambios realizados por el usuario se guardan y los realizados por la página se revierten. |
| `checkLoud` | volumen, silenciado → vacío | Advierte una vez cuando el volumen cruza el umbral. |
| `buildGraph` | vídeo → gráfico/nulo | Conecta el vídeo a un `AudioContext` a través de un nodo de ganancia; informa cuando el sitio no lo permite. |
| `applySilent` | vídeo → vacío | Establece la ganancia en 0 para una reproducción silenciosa o vuelve a 1, reanudando el contexto cuando sea necesario. |
| `applyRate` | vídeo, fuerza → vacío | Establece la velocidad guardada; `1` no es forzado a menos que el espectador simplemente lo elija, por lo que se respeta la recuperación de Kick en vivo. |
| `applyMedia` | vídeo, `{rate}` → anular | Vuelve a aplicar volumen, modo silencio y opcionalmente velocidad sin tocar la calidad. |
| `monitorFreeze` | vídeo → vacío | Detecta un reproductor detenido (tiempo atascado) o una pantalla negra (tiempo en movimiento sin cuadros decodificados) y activa la alarma y la recuperación opcional. Funciona en pestañas ocultas. |

### Bucle y ciclo de vida

| Método | Parámetros / retorno | Qué y cómo lo hace |
|---|---|---|
| `sync` | — → Promesa | El bucle principal: los monitores se congelan, vinculan a los oyentes, aplican el modo silencioso, el volumen, la velocidad y la calidad, respetan el modo seguro y las exclusiones, luego llaman a `Extras.tick` . |
| `resync` | — → Promesa | Fuerza un nuevo pase (utilizado por ajustes preestablecidos, acciones rápidas y cambios de calidad). |
| `init` | — → nulo | Inicia la primera sincronización, el oyente de navegación y el intervalo de 1,5 segundos. |

<a id="page-extras-extras"></a>
## Extras de página ( `Extras` )

| Método | Parámetros / retorno | Qué y cómo lo hace |
|---|---|---|
| `root` , `layoutState` | — → elemento / `{chat, sidebar}` | Lea el estado del diseño de Kick desde `data-chat` y `data-sidebar` en el contenedor de la página. |
| `isDesktop` | — → booleano | La automatización del diseño solo se ejecuta en anchos de escritorio. |
| `click` | elemento → booleano | Clics a través de `PlayerSync.simulateClick` . |
| `chatHideButton` , `chatShowButton` | — → botón/nulo | Ubique el botón contraer dentro de la sala de chat y el botón "mostrar chat" (por icono, no por idioma). |
| `setChat` , `setSidebar` | mostrar → booleano | Lleva el chat o el menú de la izquierda al estado solicitado presionando los propios botones de Kick. |
| `applyLayout` | — → nulo | Aplica el diseño recordado una vez por página, sin luchar nunca contra los cambios manuales. |
| `isTyping` | — → booleano | Verdadero mientras el espectador escribe en un campo; los reclamos automáticos esperan. |
| `rewardTrigger` , `popoverCard` | — → botón/nulo | Busque el botón de regalo y la tarjeta emergente de recompensa. |
| `rewardAvailable` | — → booleano | Detecta la propia señal de "recompensa disponible" de Kick (la llamada a la acción animada). |
| `isEnabled` | botón → booleano | Visible y no deshabilitado. |
| `claimDrops` | — → Promesa<number> | Presiona los botones de reclamo habilitados para entregas completadas en el panel de recompensas. |
| `claimDaily` | disparador → Promesa<number> | Abre la ventana de recompensas, presiona cada botón de reclamo habilitado una vez (nunca el mismo botón dos veces) y luego cierra la ventana. |
| `claimRewards` | `{manual}` → Promesa<number> | Ejecuta un reclamo completo, informa el resultado y reproduce un sonido; Las ejecuciones manuales ignoran la escritura e informan cuando no hay nada que reclamar. |
| `normName` | texto → cadena | Normaliza los nombres para que coincidan ( `_` y espacios para `-` ). |
| `findAvatar` | babosa → cuerda | Devuelve el avatar del canal visible en la página (usado antes de guardar un canal). |
| `scanAvatars` | — → nulo | Almacena avatares para canales guardados que carecen de uno. |
| `tick` | streamKey → nulo | Programador llamado desde `sync` : aplica el diseño, escanea avatares, espera la notificación de recompensa (modo de notificación, con retraso y un tiempo de recuperación de dos minutos) o verifica el intervalo elegido y sondea el panel de caídas. |

<a id="interface-building-blocks"></a>
## Bloques de construcción de la interfaz

| Función | Parámetros / retorno | Qué y cómo lo hace |
|---|---|---|
| `I` | nombre → svg | Icono de trazo en línea. |
| `fmtValue` | formato, sin formato → cadena | Da formato a los valores del control deslizante (porcentaje, píxeles, segundos). |
| `normSearch` , `englishOf` , `searchText` | texto → cadena | Texto de búsqueda que no distingue acentos, incluido el nombre en inglés de una etiqueta traducida. |
| `row` | clave, etiqueta, control, opciones → html | Una fila de configuración; apilado de forma predeterminada, en línea solo para conmutadores, con un conmutador de ayuda opcional. |
| `sw` , `toggleRow` | … → html | Control de interruptores y una fila de interruptores ya preparada. |
| `chip` , `seg` , `qualityChips` | … → html | Chips, controles segmentados y la grilla de calidad. |
| `range` | atributo, clave, opciones → html | Control deslizante con pista de relleno y valor en vivo. |
| `card` , `btn` , `ib` | … → html | Tarjeta, botón de texto y botón de icono. |
| `timeStr` | marca de tiempo → cadena | Hora del reloj localizada. |
| `setPref` | clave, valor → nulo | Escribe una preferencia de jugador en el perfil del canal activo o en la configuración global. |
| `fxBtn` | clave, valor, etiqueta, en → html | Mosaico de selección de efectos con un pequeño glifo de vista previa. |
| `avatarHtml` | nombre, URL → html | Avatar con una letra alternativa; se elimina una imagen fallida. |
| `hasCustomIcon` , `cwAttrs` , `cwIcon` , `claimWidgetInner` | — → valor | Cree el marcado del botón de reclamo rápido tanto para el botón en vivo como para la vista previa de la configuración. |

<a id="settings-pages-pages"></a>
## Páginas de configuración ( `PAGES` )

| Página | Contenidos |
|---|---|
| `playback` | Sugerencia para guardar este canal, ajustes preestablecidos, calidad (aplicación automática, en vivo, VOD, respaldo), volumen (aplicación automática, control deslizante, silencio, reproducción silenciosa, advertencia fuerte) y velocidad. |
| `channels` | Pasos de cómo funciona, canal actual con el botón **Guardar este canal** , pausar/excluir interruptores y editor, luego la lista de canales guardados (buscar, ordenar, filtrar, grupos, Editar/Listo, eliminar) con copia de seguridad y restauración. |
| `tools` | Temporizador de apagado, diseño de página, recompensas (reclamo automático, modo, retraso o intervalo, Reclamar ahora), configuración del botón de reclamo rápido con vista previa en vivo, alarma de congelación y acciones rápidas. |
| `notifications` | Cambios, tamaño, duración, opacidad, vista previa, reinicio de posición e historial. |
| `sounds` | Cambio maestro y volumen, cambios por evento, volúmenes y vistas previas. |
| `appearance` | Tema, estilo, colores de acento, densidad, contraste, tamaño del texto, desenfoque, centrado e idioma. |
| `motion` | Vista previa en vivo, ajustes preestablecidos y selectores para animaciones de efecto abierto, efecto de desplazamiento, indicador, velocidad y íconos. |
| `shortcuts` | Teclas de acceso rápido de menú y teclas de acceso rápido de acción con reenlace. |
| `diagnostics` | Estado, análisis, informes, comprobaciones de calidad y conflictos, modo seguro y registro de acciones. |
| `about` | Versión, enlaces, exportar/importar, deshacer, restaurar y restablecer. |

<a id="panel-controller-gui"></a>
## Controlador de panel ( `GUI` )

### Construcción y renderizado

| Método | Parámetros / retorno | Qué y cómo lo hace |
|---|---|---|
| `build` | — → nulo | Crea el host, el panel, el sistema y la región en vivo de Shadow-DOM, luego conecta los eventos. |
| `applyLook` | — → nulo | Aplica tema, estilo, acento, desenfoque, escala de texto, efectos, atributos de idioma y configuraciones de brindis como atributos y variables CSS. |
| `renderChrome` | — → nulo | Representa el título, el marcador de posición de búsqueda, el botón de pausa, la sugerencia de pie de página y el botón de reclamo rápido. |
| `renderNav` | — → nulo | Representa la barra lateral agrupada. |
| `renderPage` | opciones → anular | Representa la página activa (o todas las páginas durante la búsqueda), conservando el desplazamiento y el foco del teclado. |
| `filterRows` | — → nulo | Aplica el filtro de búsqueda a filas, tarjetas y páginas. |
| `channelEditor` | clave, perfil → html | Editor para el perfil de un canal. |
| `refreshAll` , `onExternalChange` | — → nulo | Vuelva a renderizar todo después de restablecer, importar, deshacer o cambiar desde otra pestaña. |

### Eventos y cambios de configuración

| Método | Parámetros / retorno | Qué y cómo lo hace |
|---|---|---|
| `wire` | — → nulo | Adjunta controladores delegados de clic, entrada, cambio, rueda y desplazamiento y el arrastre del panel. |
| `onClick` , `onInput` , `onChange` | evento → nulo | Envíe clics, movimientos de controles deslizantes y ediciones de texto a configuraciones, perfiles o acciones. |
| `applyRange` | clave, valor → nulo | Aplica un valor del control deslizante (volumen, desenfoque, opacidad, duraciones…). |
| `setSetting` , `setChannel` | clave/parche → nulo | Guarde una configuración o un cambio de perfil y envíe la parte afectada al reproductor. |
| `pushToPlayer` | alcance, clave → nulo | `media` vuelven a aplicar volumen, modo silencioso y velocidad; `all` también vuelve a aplicar la calidad. El volumen, el silencio, el modo silencioso y la velocidad nunca vuelven a abrir el menú de calidad. |
| `act` | nombre, elemento → Promesa | Ejecuta acciones con nombre: ajustes preestablecidos, guardar y eliminar canales, copia de seguridad, importación/exportación, reclamos, temporizador de apagado, accesos directos, diagnósticos y más. |
| `resetSection` | identificación → nulo | Restaura los valores predeterminados de una sección. |
| `restoreVolume` | — → nulo | Vuelve a aplicar el volumen guardado. |
| `toggleLayout` | cual → nulo | Oculta o muestra el chat o el menú de la izquierda y recuerda la elección. |
| `confirm` , `closeModal` | mensaje, opciones/resultado → Promesa/anular | Cuadro de diálogo de confirmación en el panel (idéntico en todos los navegadores). |
| `download` , `pickFile` , `pickImage` | … → nulo | Guarde JSON, lea JSON y elija una imagen para el botón de reclamo rápido. |
| `startCapture` , `finishCapture` | id/combo → nulo | Vuelva a vincular una tecla de acceso rápido, rechazando duplicados. |
| `replayMock` | — → nulo | Reproduce el efecto abierto en la vista previa de la animación. |

### Herramientas y diagnóstico

| Método | Parámetros / retorno | Qué y cómo lo hace |
|---|---|---|
| `startSleep` , `cancelSleep` , `syncSleep` | minutos / — → nulo | Inicia, cancela y muestra el temporizador de apagado (pausa el vídeo al final). |
| `toggleFocusView` | — → Promesa | Entra o sale de pantalla completa en el contenedor del reproductor. |
| `statusText` , `resultText` , `syncDiagnostics` | — → cadena/nulo | Estado localizado para el encabezado y la página de diagnóstico. |
| `record` | mensaje, nivel → nulo | Agrega una entrada con marca de tiempo al registro de acciones. |
| `copyDiagnostics` | — → Promesa | Copia un informe breve (versión, estado, calidades, tipo de página, agente de usuario). |
| `checkQuality` , `checkConflicts` | — → Promesa/nulo | Verifique que se ofrezca la calidad preferida y enumere las configuraciones que funcionan entre sí. |

### Botón de reclamo rápido

| Método | Parámetros / retorno | Qué y cómo lo hace |
|---|---|---|
| `renderClaimWidget` | — → nulo | Crea, actualiza o elimina el botón flotante e inicia su encuesta de estado de un segundo. |
| `syncClaimWidget` | — → nulo | Muestra el anillo y el punto de "recompensa disponible", el estado de ocupado y la regla de ocultación automática. |
| `placeClaimWidget` | — → nulo | Coloca el botón sujetándolo a la ventana. |
| `wireClaimWidget` | elemento → vacío | Arrastre con un umbral de cinco píxeles (un arrastre nunca cuenta como un clic), guardado de posición y el clic que ejecuta un reclamo manual. |

### Notificaciones, sonido y comportamiento del panel

| Método | Parámetros / retorno | Qué y cómo lo hace |
|---|---|---|
| `notify` | mensaje, tipo, duración, fuerza → nulo | Muestra un brindis (a menos que se suprima), registra el historial y anuncia el texto en una región en vivo. |
| `notifyQuality` | aplicado, calidad → nulo | Reproduce el sonido del resultado, registra y muestra una notificación localizada. |
| `initToastPosition` , `wireToastDrag` | — → nulo | Restaura y guarda la posición de la tostada arrastrada. |
| `onAvatars` | — → nulo | Actualiza las páginas que muestran avatares. |
| `ensureAudio` | — → contexto | Crea y reanuda el `AudioContext` compartido (desbloqueado en el primer gesto del usuario). |
| `playSound` , `stopSounds` | nombre, vista previa → anular | Genera y detiene las señales de Web Audio. |
| `playFreezeAlarm` , `alertFrozen` | fuerza → vacío | Toca la alarma de cinco notas y activa la notificación de congelación. |
| `placePanel` , `wirePanelDrag` | posición → nula | Coloque el panel dentro de la ventana y haga que el encabezado se pueda arrastrar. |
| `open` , `close` , `toggle` | — → nulo | Controla los sonidos del panel, sondeo, enfoque y menú. |
| `syncVolumeControls` | — → nulo | Mantiene el control deslizante de volumen sincronizado con el reproductor mientras el panel está abierto. |

<a id="hotkeys-and-startup"></a>
## Teclas de acceso rápido y inicio

| Función | Parámetros / retorno | Qué y cómo lo hace |
|---|---|---|
| `isolateKeys` | — → nulo | Registrado al `document-start` en la fase de captura: los eventos de teclado que provienen del interior del panel dejan de propagarse a Kick (por lo que Espacio, F, M y las flechas nunca activan las teclas de acceso rápido del jugador) y Tab queda atrapado dentro del cuadro de diálogo. |
| `setupHotkeys` | — → nulo | Maneja la captura de teclas para volver a vincular, Escape (modal, menú desplegable, panel), la tecla de acceso rápido del menú y las teclas de acceso rápido de acción; Los combos con un modificador o una tecla F funcionan incluso mientras se escribe. |
| `init` | — → nulo | Construye el panel, instala teclas de acceso rápido e inicia `PlayerSync` ; protegido contra la doble inyección. |

<a id="kick-page-dependencies"></a>
## Dependencias de la página Kick

El guión se basa en el marcado actual de Kick. Siempre que es posible, utiliza iconos, atributos y estructuras en lugar de texto visible, por lo que sigue funcionando en todos los idiomas de la interfaz. Si Kick los cambia, la función de coincidencia deja de funcionar (el resto sigue funcionando).

| Característica | Lo que busca |
|---|---|
| Calidad | Un `<video>` visible, el `button[aria-haspopup="menu"]` y las entradas `[role="menuitemradio"]` . |
| Diseño | Un contenedor con `data-sidebar` y `data-chat` , `[data-testid="sidebar-collapse"]` / `sidebar-expand` , un botón con el ícono `CollapseRight` dentro de `#channel-chatroom` y un botón con el ícono `MessagesOutline` para mostrar el chat. |
| Notificación de recompensa | Un `video` cuya fuente contiene `reward-available` o una tarjeta `[role="group"]` que contiene un vídeo `daily-rewards` . |
| Reclamación de recompensas | Un `button[aria-haspopup="dialog"][aria-controls]` (ícono de regalo), el cuadro de diálogo que controla ( `data-state` ), botones de reclamo habilitados con un elemento secundario `.contents` y un botón de cierre con una etiqueta `.sr-only` . |
| Gotas | `#rewards-panel` enumera elementos con un `[role="progressbar"][data-state="complete"]` y un botón habilitado. |
| Avatares | Elementos `img[alt]` cuya fuente es `files.kick.com/images/user/…/profile_image/…` . |

<a id="localization"></a>
## Localización

Cada etiqueta, mensaje de ayuda, error, cuadro de diálogo y notificación pasa por el solucionador de traducción para 38 configuraciones regionales. Las claves que faltan vuelven al inglés. El nuevo texto de la interfaz se traduce a todos los idiomas admitidos junto con la función que lo agrega. El selector de idioma muestra banderas y nombres nativos; la interfaz sigue el idioma del navegador en la primera ejecución y luego recuerda una elección explícita.

<a id="safety-privacy-and-compatibility"></a>
## Seguridad, privacidad y compatibilidad

- Los ajustes se desinfectan antes del almacenamiento; los valores no válidos recurren a valores predeterminados seguros.
- Los nombres de canales, notas, texto de notificación y resultados de diagnóstico se escapan antes de la inserción HTML.
- El icono de un botón personalizado se vuelve a codificar desde un lienzo y se almacena como una URL de datos de un tipo de imagen permitido únicamente; nunca sale del navegador.
- Shadow DOM mantiene los estilos del script aislados de Kick; Los eventos de teclado del panel están aislados de las teclas de acceso rápido de Kick.
- Las acciones automáticas omiten canales excluidos, modo seguro y elementos faltantes del jugador. El reclamo de recompensa nunca presiona el mismo botón dos veces en una ejecución y espera mientras el espectador escribe.
- El script no realiza solicitudes de red; las actualizaciones provienen del administrador de scripts de usuario o de la página de lanzamientos.
- La configuración local existente se conserva al pasar de 1.1.0, 1.2.0 y 1.3.0.
