<div align="center">

[English](./en_CHANGELOG.md) · [العربية](./ar_CHANGELOG.md) · [Беларуская](./be_CHANGELOG.md) · [Български](./bg_CHANGELOG.md) · [Čeština](./cs_CHANGELOG.md) · [Dansk](./da_CHANGELOG.md) · [Deutsch](./de_CHANGELOG.md) · [Ελληνικά](./el_CHANGELOG.md) · **Español** · [Suomi](./fi_CHANGELOG.md) · [Français](./fr_CHANGELOG.md) · [हिन्दी](./hi_CHANGELOG.md) · [English (India)](./en-in_CHANGELOG.md) · [Hrvatski](./hr_CHANGELOG.md) · [Magyar](./hu_CHANGELOG.md) · [Bahasa Indonesia](./id_CHANGELOG.md) · [Italiano](./it_CHANGELOG.md) · [日本語](./ja_CHANGELOG.md) · [한국어](./ko_CHANGELOG.md) · [Lietuvių](./lt_CHANGELOG.md) · [Latviešu](./lv_CHANGELOG.md) · [Македонски](./mk_CHANGELOG.md) · [Монгол](./mn_CHANGELOG.md) · [Bahasa Melayu](./ms_CHANGELOG.md) · [Nederlands](./nl_CHANGELOG.md) · [Norsk](./no_CHANGELOG.md) · [Polski](./pl_CHANGELOG.md) · [Português](./pt_CHANGELOG.md) · [Română](./ro_CHANGELOG.md) · [Русский](./ru_CHANGELOG.md) · [Slovenčina](./sk_CHANGELOG.md) · [Srpski](./sr_CHANGELOG.md) · [Svenska](./sv_CHANGELOG.md) · [ไทย](./th_CHANGELOG.md) · [Türkçe](./tr_CHANGELOG.md) · [Tiếng Việt](./vi_CHANGELOG.md) · [简体中文](./zh-cn_CHANGELOG.md) · [繁體中文](./zh-tw_CHANGELOG.md)
</div>

# Ajustes de Kick Stream: registro de cambios

Notas de la versión para [Kick Stream Tweaks](https://github.com/ebayybe/kick-stream-tweaks), un script de usuario que recuerda las preferencias del jugador Kick y agrega un panel de control configurable.

## v1.3.1 — 2026-11-06

> Diseño reforzado para cada idioma y tamaño de texto, un estilo minimalista verdaderamente distintivo, recompensas y ayudas de diseño, una alarma de congelación del reproductor y un idioma predeterminado más inteligente.

### Agregado

- **Alarma de congelación del reproductor.** Detecta un reproductor bloqueado o una pantalla negra (el tiempo del video se mueve sin cuadros decodificados), reproduce un sonido de alarma fuerte y muestra una notificación, incluso cuando la pestaña está minimizada. Tiempo de detección configurable (5–60 s), cambio de sonido independiente y botón de prueba.
- **Reclamar recompensas automáticamente** (desactivado de forma predeterminada): abre la ventana de recompensas, reclama lo que está disponible, la cierra nuevamente y regresa a la transmisión. También se reclaman los premios que aparecen en el panel de recompensas. Incluye un botón *Reclamar ahora*.
- **Programación de recompensas.** De forma predeterminada, el script espera la notificación "reclama tu recompensa" de Kick y la reclama de inmediato (con un retraso opcional de 0 a 60 s), en lugar de sondear. También está disponible un modo programado (cada 5 a 60 minutos).
- **Botón de reclamo rápido.** Un pequeño botón flotante en la transmisión que reclama tu recompensa con un solo clic. Arrástrelo a cualquier lugar (se recuerda la posición), elija uno de los cuatro diseños (Orbe, Píldora, Vidrio, Plano), cinco íconos integrados, un tamaño y una opacidad, muéstrelo opcionalmente solo cuando haya una recompensa disponible. Se ilumina y muestra un punto cuando aparece la notificación de recompensa de Kick. La página de configuración tiene una vista previa en vivo.
- **Tu propio ícono.** Sube un archivo PNG, JPG, WebP, GIF o SVG (hasta 2 MB) como ícono del botón, opcionalmente llenando todo el botón. La imagen se vuelve a codificar en un pequeño cuadrado y se almacena únicamente en su navegador.
- **Rueda del mouse en los controles deslizantes.** Cada control deslizante se puede ajustar con la rueda del mouse mientras se coloca sobre él, sin desplazarse por el panel.
- **Referencia de función.** El nuevo `en_FUNCTIONS.md` documenta la arquitectura, cada configuración, cada función y las partes de la página de Kick de las que depende el script.
- **Guardado guiado de canales.** Una tarjeta paso a paso sobre "Cómo funcionan los canales guardados", un único botón **Guardar este canal** que almacena la calidad, el volumen, la velocidad y el sonido actuales del canal que estás viendo, una sugerencia de un clic en Reproducción para canales no guardados, un brindis de confirmación, botones etiquetados *Editar* / *Listo* en la lista y un interruptor para pausar las configuraciones guardadas sin eliminarlas.
- **Reproducción silenciosa.** Silencia la transmisión sin silenciar el reproductor, por lo que sigue reproduciéndose en una pestaña en segundo plano. Funciona globalmente y por canal guardado (se muestra una etiqueta *Silencio* en la lista de canales).
- **Búsqueda de configuración multilingüe.** La búsqueda no distingue acentos y también coincide con los nombres en inglés, por lo que al escribir `volumen` se encuentra la configuración en cualquier idioma de la interfaz. La búsqueda por sección o título de tarjeta muestra toda la sección.
- **Controles de diseño de página**: oculta el chat y contrae el menú izquierdo desde el panel o con teclas de acceso rápido (`Alt+C`, `Alt+S`), con una opción para recordar el diseño de cada transmisión.
- **Animaciones de íconos** para la barra lateral, los íconos de reinicio y ayuda, con su propio interruptor (también parte de los ajustes preestablecidos de animación).
- Los **avatares de canales** se capturan desde Kick y se muestran en la lista de canales guardados.
- 14 colores de acento (antes eran 6).
- Cuadro de diálogo de confirmación en el panel que parece idéntico en todos los navegadores.

### Cambiado

- **Idioma de la interfaz** ahora sigue el idioma del navegador en la primera ejecución. Una vez que eliges un idioma, se recuerda. Las configuraciones migradas desde versiones anteriores siguen el navegador hasta que se elige explícitamente un idioma.
- El script ahora comienza en `document-start`, por lo que el aislamiento del teclado se registra ante los propios oyentes de la página.
- Las filas de configuración están apiladas (etiqueta encima del control) para que el texto nunca pueda superponerse ni recortarse, en cualquier idioma, tamaño de texto o ancho de panel. Las etiquetas de la barra lateral se ajustan a los límites de las palabras.
- Los selectores de animación se reconstruyen como filas de ancho completo con íconos, por lo que las traducciones largas se ajustan.
- El estilo del panel **Mínimo** ahora es plano y cuadrado sin brillo, los bordes se reemplazaron por divisores y la selección de estilo de subrayado, por lo que la diferencia con **Kick** es obvia.
- El panel tiene un ancho fijo de 680 px (se reduce para adaptarse a ventanas pequeñas). Se eliminaron la configuración del ancho del panel y el controlador de cambio de tamaño, por lo que los diseños son los mismos para todos.
- El título de la animación del indicador ya no dice "verde" cuando se utiliza un color de acento diferente.

### Fijo

- Cambiar el volumen, el silencio, la reproducción silenciosa, el volumen automático o la velocidad también volvió a aplicar la calidad (reabre el menú de calidad y muestra una notificación). Esas configuraciones ahora solo tocan lo que cambiaste; La calidad se vuelve a aplicar sólo cuando cambia una configuración de calidad.
- Escribir en la búsqueda de configuración podría activar las teclas de acceso rápido de Kick (por ejemplo, Space cambió la transmisión a pantalla completa). Las pulsaciones de teclas dentro del panel ya no llegan a la página.
- El volumen preferido se sobrescribió cuando Kick restableció el reproductor a su propio 50% después de una recarga, y el control deslizante del panel mostró 50%. Los cambios que la página realiza por sí sola ahora se revierten al volumen guardado; sólo tus propias acciones lo actualizan.
- Recorte y superposición de texto en Apariencia, Animaciones y Teclas de acceso rápido (etiquetas largas, tamaños de texto grandes, paneles estrechos, traducciones largas).
- El estilo Minimal deshabilitó silenciosamente la configuración de desenfoque del fondo; el desenfoque ahora funciona en ambos estilos.
- Cambiar la opacidad del botón de reclamo rápido no actualizó la vista previa.
- Los controles deslizantes no reaccionaron a la rueda del mouse.
- Mosaicos de animación ("Scale", "Pop") que desbordan sus tarjetas.
- La confirmación de eliminación del perfil utilizó el diálogo nativo del navegador.
- Los chips del temporizador de apagado no estaban localizados.
- Los canales guardados no mostraron avatares y el canal actual no mostró ninguno hasta que se guardó su perfil.

### Compatibilidad

- Las configuraciones existentes y los canales guardados se conservan al actualizar desde v1.3.0, v1.2.0 y v1.1.0.
- El script aún no envía telemetría ni realiza solicitudes de red propias.

### Enlaces

- [Repositorio](https://github.com/ebayybe/kick-stream-tweaks)
- [Lanzamientos](https://github.com/ebayybe/kick-stream-tweaks/releases)
- [Problemas](https://github.com/ebayybe/kick-stream-tweaks/issues)

## v1.3.0 — 2026-11-03

> Rediseño completo, una estructura de configuración lógica, un sistema de animación reconstruido y una ronda de correcciones de confiabilidad para la automatización del reproductor.

### Agregado

- Panel rediseñado con una barra lateral agrupada: **Reproductor** (Reproducción, Canales, Herramientas), **Alertas** (Notificaciones, Sonidos), **Interfaz** (Apariencia, Animaciones, Accesos directos) y **Sistema** (Diagnóstico, Datos y acerca de).
- Nueva página **Animaciones**: una etapa de vista previa en vivo, tres ajustes preestablecidos con un solo clic (Completo, Reducido, Desactivado) y selectores separados para el efecto de apertura (Ninguno, Fundido, Deslizamiento, Escala, Pop), efecto de desplazamiento, animación del indicador y velocidad.
- Ajustes preestablecidos rápidos para ahorrar ancho de banda, mejor calidad, visualización silenciosa y VOD, que se aplican al instante.
- Selector de calidad rediseñado como rejilla de virutas; La velocidad, la escala de texto y el temporizador de apagado utilizan chips y controles segmentados en lugar de menús desplegables.
- Administrador de canales en línea: búsqueda, clasificación, fijación, grupos, notas, edición por canal y copia de seguridad/restauración completa, todo sin cuadros de diálogo anidados.
- Configuraciones de sonido en línea con un interruptor por evento, volumen y botón de vista previa.
- Escaneo de calidad en diagnóstico: abre el menú del reproductor, registra las calidades disponibles y lo vuelve a cerrar.
- Las teclas de acceso rápido ahora funcionan en cualquier diseño de teclado (coinciden con una tecla física).
- La configuración se sincroniza entre las pestañas Kick abiertas.
- Muestras de color acentuadas junto al selector de color personalizado, un rango de escala de texto más alto y una protección de preferencia de movimiento reducido.

### Cambiado

- Los ajustes se almacenan en un formato más sencillo; la configuración 1.2.x, las teclas de acceso rápido y las opciones de animación se migran automáticamente.
- La velocidad de reproducción solo se aplica cuando difiere de 1×, por lo que la recuperación del borde en vivo de Kick ya no se anula.
- El historial de deshacer se guarda en la memoria en lugar de escribirse en el almacenamiento local.
- Los eventos de sonido, las notificaciones y las teclas de acceso rápido comparten un conjunto consistente de controles.
- El selector "Perfil de situación" se reemplaza por ajustes preestablecidos con un solo clic.

### Fijo

- Cerrar el menú del reproductor después de aplicar la calidad ya no corre el riesgo de volver a abrirlo.
- Una calidad alternativa (por ejemplo, 720p en lugar de 1080p no disponible) ya no sobrescribe la calidad preferida guardada para un canal.
- Sólo los clics reales en artículos de calidad actualizan la calidad del "último uso"; los clics automáticos se ignoran.
- La búsqueda de configuraciones ya no falla después de escribir (el objetivo del evento se perdió dentro de Shadow DOM).
- Los cambios realizados en una pestaña ya no pueden sobrescribir la configuración de otra pestaña.
- Las teclas de acceso rápido del panel ya no fallan en diseños no latinos.
- Etiquetas incorrectas en los controles del registro de diagnóstico y una palabra coreana perdida en el título en escritura japonesa.
- Comprobaciones de reproducción detenida y pausa de sincronización de transmisión mientras la pestaña está oculta.

### Eliminado

- Funciones que no se pudieron verificar con el reproductor de Kick ni duplicarlo: preferencia de baja latencia, ocultar los controles del reproductor en estado inactivo y la verificación de actualizaciones en el panel basada en GitHub (use las actualizaciones de su administrador de script de usuario o la página de Lanzamientos).
- Opciones sobrediseñadas: perfiles de apariencia guardados, mostrar/ocultar/reordenar secciones, modos de navegación alternativos, comprobaciones de compatibilidad y cobertura de traducción, animaciones aleatorias/desplazamiento/sección, duraciones de notificaciones por evento, avatares de canal, colores de grupo, pedidos manuales, selección masiva, historial por canal y limpieza automática.

### Compatibilidad

- Las configuraciones existentes y los canales guardados se conservan al actualizar desde v1.2.0 y v1.1.0.
- La configuración permanece local para el navegador; el script no envía telemetría ni realiza solicitudes de red.

### Enlaces

- [Repositorio](https://github.com/ebayybe/kick-stream-tweaks)
- [Lanzamientos](https://github.com/ebayybe/kick-stream-tweaks/releases)
- [Problemas](https://github.com/ebayybe/kick-stream-tweaks/issues)

## v1.2.0 — 2026-10-07

> Se amplió el asistente de calidad y volumen original a un conjunto completo de herramientas de configuración del reproductor.

### Agregado

- Perfiles por canal para calidad, volumen, velocidad de reproducción y estado de silencio.
- Lista de canales guardados con notas, grupos, edición de perfiles e importación/exportación.
- Efectos de sonido con interruptor global, interruptores de eventos individuales, vistas previas y volumen por evento.
- Notificaciones de cambios de calidad, volumen restaurado y acciones fallidas.
- Historial de notificaciones, registro de acciones y herramientas de diagnóstico con controles claros.
- Comprobaciones de disponibilidad de calidad, comprobaciones de conflictos y comprobaciones de compatibilidad.
- Modo seguro para deshabilitar temporalmente los cambios automáticos de reproductor.
- Teclas de acceso rápido, arrastrar paneles, cambiar el tamaño del panel y una acción en el panel central.
- Estilos de panel Kick y Minimal, diseño compacto y controles de animación.
- Temporizador de apagado, modo de enfoque de pantalla completa, resincronización del reproductor y controles de reproducción.
- Importación/exportación de configuraciones y perfiles de canales.
- Navegación por teclado, escalado de texto, anuncios en lector de pantalla y alto contraste.
- Localización de interfaz para 38 idiomas admitidos.

### Fijo

- Se evitó que aparecieran múltiples cuadros de diálogo secundarios al mismo tiempo.
- Se corrigió un cuadro de diálogo vacío que aparecía encima de la ventana de configuración de sonido.
- Se ignoraron los mensajes de notificación vacíos en lugar de mostrar superposiciones en blanco.
- Se mejoró el ajuste de etiquetas largas en paneles estrechos y diseños localizados.
- Se corrigió el reemplazo de los marcadores de posición `{quality}` y `{q}` en las notificaciones.
- Se actualizó la etiqueta de la versión en el panel y se actualizó la comparación a 1.2.0.

### Compatibilidad

- La configuración existente se conserva al actualizar desde la versión 1.1.0.
- La configuración permanece local para el navegador; el script no envía telemetría.
- El verificador de actualizaciones lee la etiqueta de versión más reciente de GitHub y no instala las actualizaciones automáticamente.

### Enlaces

- [Repositorio](https://github.com/ebayybe/kick-stream-tweaks)
- [Lanzamientos](https://github.com/ebayybe/kick-stream-tweaks/releases)
- [Problemas](https://github.com/ebayybe/kick-stream-tweaks/issues)

## v1.1.0

La versión pública original se centró en recordar la calidad y el volumen del vídeo en Kick, aplicarlos automáticamente a nuevas transmisiones y proporcionar un panel de configuración F2.
