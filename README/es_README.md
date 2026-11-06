<div align="center">

[English](./en_README.md) · [العربية](./ar_README.md) · [Беларуская](./be_README.md) · [Български](./bg_README.md) · [Čeština](./cs_README.md) · [Dansk](./da_README.md) · [Deutsch](./de_README.md) · [Ελληνικά](./el_README.md) · **Español** · [Suomi](./fi_README.md) · [Français](./fr_README.md) · [हिन्दी](./hi_README.md) · [English (India)](./en-in_README.md) · [Hrvatski](./hr_README.md) · [Magyar](./hu_README.md) · [Bahasa Indonesia](./id_README.md) · [Italiano](./it_README.md) · [日本語](./ja_README.md) · [한국어](./ko_README.md) · [Lietuvių](./lt_README.md) · [Latviešu](./lv_README.md) · [Македонски](./mk_README.md) · [Монгол](./mn_README.md) · [Bahasa Melayu](./ms_README.md) · [Nederlands](./nl_README.md) · [Norsk](./no_README.md) · [Polski](./pl_README.md) · [Português](./pt_README.md) · [Română](./ro_README.md) · [Русский](./ru_README.md) · [Slovenčina](./sk_README.md) · [Srpski](./sr_README.md) · [Svenska](./sv_README.md) · [ไทย](./th_README.md) · [Türkçe](./tr_README.md) · [Tiếng Việt](./vi_README.md) · [简体中文](./zh-cn_README.md) · [繁體中文](./zh-tw_README.md)

# Kick Stream Tweaks

**Tu reproductor Kick, recordado.** La calidad, el volumen y la velocidad se restauran automáticamente en cada transmisión, con un panel de control rápido y completamente localizado.

[![Kick Stream Tweaks preview](https://raw.githubusercontent.com/ebayybe/kick-stream-tweaks/main/Photo/kick-stream.png)](https://github.com/ebayybe/kick-stream-tweaks/blob/main/Photo/kick-stream.png)


[![Version](https://img.shields.io/badge/version-1.3.1-53fc18?style=flat-square)](https://github.com/ebayybe/kick-stream-tweaks/releases)
[![License](https://img.shields.io/badge/license-MIT-blue?style=flat-square)](./LICENSE)
[![Languages](https://img.shields.io/badge/languages-38-8a5cf6?style=flat-square)](#languages)
[![Userscript](https://img.shields.io/badge/Tampermonkey%20%7C%20Violentmonkey-supported-orange?style=flat-square)](#installation)

[Instalar](#installation) · [Características](#features) · [Mapa de configuración](#settings-map) · [Atajos](#shortcuts) · [Referencia de función](../docs/es_FUNCTIONS.md) · [Registro de cambios](../CHANGELOG/es_CHANGELOG.md) · [Lanzamientos](https://github.com/ebayybe/kick-stream-tweaks/releases)

</div>

<a id="features"></a>
## Características

- **Calidad que se mantiene.** Elige una calidad en vivo y VOD una vez; se aplica a cada nueva corriente. Si falta la calidad exacta, el script vuelve al siguiente inferior (o a Auto).
- **Volumen que se mantiene.** El volumen y el silencio se restauran por transmisión, con una advertencia de volumen alto y un control deslizante en vivo que permanece sincronizado con el reproductor.
- **Perfiles por canal.** Abra una transmisión, presione **Guardar este canal** y ese canal recordará su propia calidad, volumen, velocidad y sonido. Agregue un grupo y una nota, pausar la configuración guardada o excluir el canal de la automatización por completo.
- **Ajustes preestablecidos rápidos.** Ahorre ancho de banda, mejor calidad, visualización silenciosa y VOD con un solo clic.
- **Herramientas.** Temporizador, vista de enfoque, resincronización del reproductor, controles de diseño de página (ocultar chat, contraer el menú de la izquierda) y un modo seguro que pausa todos los cambios automáticos.
- **Alarma de congelación.** Reproduce una alarma fuerte y muestra una notificación cuando el reproductor se congela o muestra una pantalla negra, incluso si la pestaña está minimizada.
- **Botón de reclamo rápido.** Un botón flotante que se puede arrastrar y que reclama tu recompensa con un solo clic. Cuatro diseños, cinco iconos o tu propia imagen, tamaño y opacidad ajustables.
- **Reclamar recompensas automáticamente.** Opcional: espera la notificación de recompensa de Kick (o verifica según un cronograma), reclama lo que está disponible y cierra la ventana nuevamente (desactivada de manera predeterminada).
- **Reproducción silenciosa.** Silencia una transmisión sin silenciar el reproductor, por lo que sigue reproduciéndose en una pestaña en segundo plano. Configúrelo globalmente o por canal guardado.
- **Alertas.** Notificaciones que puedes arrastrar, cambiar de tamaño y silenciar, además de efectos de sonido opcionales con volumen por evento.
- **Interfaz rediseñada.** Barra lateral agrupada, búsqueda de configuraciones, temas claros y oscuros, colores de acento, modo compacto, escala de texto y alto contraste.
- **Animaciones que controlas.** Vista previa en vivo, tres ajustes preestablecidos y efectos de apertura, desplazamiento e indicador separados. Respeta la configuración del sistema "reducir movimiento".
- **38 idiomas** con banderas. La interfaz sigue el idioma de su navegador la primera vez que se ejecuta y recuerda su elección después.
- **Privado por diseño.** Todo permanece en tu navegador. Sin telemetría, sin solicitudes de red.

<a id="installation"></a>
## Instalación

1. Instale un administrador de scripts de usuario: [Tampermonkey](https://www.tampermonkey.net/) o [Violentmonkey](https://violentmonkey.github.io/).
2. Abierto [`kick-stream-tweaks.user.js`](https://github.com/ebayybe/kick-stream-tweaks/raw/main/kick-stream-tweaks.user.js) y confirme la instalación.
3. Abra cualquier transmisión en [kick.com](https://kick.com) y presione **F2**.

Las actualizaciones las entrega su administrador de scripts de usuario. También puedes ver el [Releases](https://github.com/ebayybe/kick-stream-tweaks/releases) página.

## Guardar la configuración de un canal

1. Abre la transmisión del canal que deseas personalizar.
2. Abra el panel (`F2`) y presiona **Guardar este canal** (en la página **Canales**, o desde la pista en la página **Reproducción**). La configuración actual de calidad, volumen, velocidad y sonido se almacena para ese canal.
3. Ajústelos en el editor debajo del botón. Se aplican automáticamente cada vez que abres ese canal.

Utilice el interruptor **Aplicar la configuración guardada en este canal** para pausar un perfil sin eliminarlo, o **Eliminar** para eliminarlo. Todos los canales guardados se enumeran en **Canales → Canales guardados**, donde puede buscarlos, ordenarlos, fijarlos, agruparlos, agregar notas, realizar copias de seguridad y restaurarlos.

<a id="settings-map"></a>
## Mapa de configuración

| Grupo | Página | que hay dentro |
| --- | --- | --- |
| Jugador | **Reproducción** | Presets, calidad en vivo/VOD, respaldo, volumen, silencio, advertencia de volumen alto, velocidad |
| Jugador | **Canales** | Perfil del canal actual, canales guardados, búsqueda, grupos, notas, copia de seguridad |
| Jugador | **Herramientas** | Temporizador de apagado, diseño de página, recompensas de reclamo automático, botón de reclamo rápido, alarma de congelación, acciones rápidas, vista de enfoque |
| Alertas | **Notificaciones** | No molestar, tamaño, duración, opacidad, posición, historial |
| Alertas | **Sonidos** | Cambio maestro y volumen, cambio por evento, volumen y vista previa |
| Interfaz | **Apariencia** | Tema, estilo de panel, color de acento, densidad, contraste, desenfoque, escala de texto, idioma |
| Interfaz | **Animaciones** | Vista previa en vivo, ajustes preestablecidos, efectos de apertura/desplazamiento/indicador, velocidad |
| Interfaz | **Atajos** | Teclas de acceso rápido de menú y teclas de acceso rápido de acción |
| Sistema | **Diagnóstico** | Estado en vivo, escaneo de calidad, verificación de conflictos, modo seguro, registro de acciones |
| Sistema | **Datos y sobre** | Exportar, importar, deshacer, restablecer, restaurar copias de seguridad, enlaces |

Cada control deslizante también responde a la rueda del mouse mientras lo mueves. Utilice el cuadro de búsqueda en la parte superior del panel para buscar cualquier configuración por nombre. La búsqueda también comprende los nombres en inglés, por lo que funciona igual en todos los idiomas de la interfaz y las claves escritas allí nunca llegan a la página.

## Botón de reclamo rápido

Habilítelo en **Herramientas → Botón de reclamo rápido en la página**. Aparece un pequeño botón en la transmisión:

- **Arrástralo** a cualquier lugar; se recuerda su posición.
- **Haz clic** para reclamar tu recompensa (abre la ventana de recompensas, presiona *Reclamar*, cierra la ventana y regresa a la transmisión).
- **Brilla y muestra un punto rojo** cuando aparece la notificación de recompensa de Kick. Active *Mostrar solo cuando haya una recompensa disponible* para mantenerla oculta el resto del tiempo.
- Elija un **estilo** (Orbe, Píldora, Vidrio, Plano), un **icono** incorporado o **su propia imagen** (PNG, JPG, WebP, GIF o SVG de hasta 2 MB; las imágenes cuadradas con un fondo transparente se ven mejor), un **tamaño** y una **opacidad**. Una vista previa en vivo muestra cada cambio.

El botón es independiente de *Reclamar recompensas automáticamente*, por lo que puedes reclamar manualmente, automáticamente o ambas cosas.

<a id="shortcuts"></a>
## Atajos

| Acción | Por defecto |
| --- | --- |
| Abrir/cerrar el panel | `F2` |
| Alternar notificaciones | `Alt+N` |
| Alternar chat | `Alt+C` |
| Alternar menú hacia la izquierda | `Alt+S` |
| Vista de enfoque | `Alt+F` |
| Restablecer calidad | `Alt+Q` |
| Restaurar volumen | `Alt+V` |

Cada atajo se puede recuperar en **Atajos**. Los enlaces siguen la tecla física, por lo que funcionan en cualquier distribución de teclado.

<a id="languages"></a>
## Idiomas

Alemán, árabe, bielorruso, búlgaro, chino (simplificado), chino (tradicional), croata, checo, danés, holandés, inglés, inglés (India), finlandés, francés, griego, hindi, húngaro, indonesio, italiano, japonés, coreano, letón, lituano, macedonio, malayo, mongol, noruego, polaco, portugués, rumano, ruso, serbio, serbio, sueco, tailandés, turco y vietnamita.

## Solución de problemas

- **La calidad no se aplica.** Abra **Diagnóstico**, presione *Actualizar diagnóstico* para escanear las calidades que ofrece Kick, luego *Verifique la calidad seleccionada*. Si un canal está excluido o el modo seguro está activado, la línea de estado lo indica.
- **Las recompensas no se reclaman.** La reclamación automática está desactivada de forma predeterminada. Habilítelo en **Herramientas → Recompensas** y pruebe *Reclamar ahora*. Solo funciona en canales en vivo, mientras la pestaña está visible y no estás escribiendo en el chat. En el modo *notificación*, el script reacciona al propio banner de recompensa de Kick.
- **Reproducción y audio silenciosos.** La reproducción silenciosa dirige el vídeo a través del motor de audio del navegador con ganancia cero. Si un sitio bloquea eso, el panel le informa y el sonido normal no se modifica.
- **Algo se comporta de manera extraña.** Ejecute *Buscar conflictos* o use la *sección Restablecer* en la página en cuestión.
- **La configuración se ve incorrecta después de una actualización.** Utilice **Datos y acerca de → Deshacer** o **Restaurar copia de seguridad**.
- **¿Encontró un error?** Presione *Copiar diagnóstico* y adjúntelo a un [new issue](https://github.com/ebayybe/kick-stream-tweaks/issues).

## Privacidad

Las configuraciones y los perfiles de canales se almacenan en el almacenamiento local de su navegador en kick.com. El script nunca envía datos a ninguna parte y no solicita permisos adicionales (`@grant none`).

## Contribuyendo

Los problemas y las solicitudes de extracción son bienvenidos. El script es un archivo único e independiente, por lo que no se requiere ningún paso de compilación para intentar un cambio: editar `kick-stream-tweaks.user.js` y recargar la página.

## Licencia

[MIT](./LICENSE)
