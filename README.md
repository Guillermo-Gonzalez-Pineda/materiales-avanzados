# Materiales Avanzados — guia de estudio

Sitio web estatico para estudiar la asignatura *Materiales Avanzados*. Pensado para publicarse en **GitHub Pages**. No necesita compilacion ni servidor: es HTML, CSS y JavaScript.

## Que incluye

- **Inicio** (`index.html`): los 7 temas con su progreso.
- **Teoria** (`tema.html`): teoria desarrollada a partir de los apuntes, con los puntos que mas se preguntan marcados. Tema 1 completo; el resto se ira anadiendo.
- **Test** (`test.html`): preguntas tipo examen, filtrables por tema y dificultad, con correccion y explicacion. Lee de `data/preguntas.json`.
- **Tarjetas** (`tarjetas.html`): repaso pregunta/respuesta con el mismo banco.
- Modo claro/oscuro y guardado del progreso en el propio navegador.

## Estructura

```
materiales-avanzados/
├── index.html          inicio (rejilla de temas)
├── tema.html           lector de teoria  (?tema=1)
├── test.html           test tipo examen
├── tarjetas.html       tarjetas de memoria
├── data/
│   ├── preguntas.json  banco de preguntas  (fuente unica del test/tarjetas)
│   ├── contenido.json  teoria por temas
│   └── ESQUEMA.md      como esta hecho el JSON de preguntas
├── assets/
│   ├── css/estilo.css
│   └── js/comun.js
└── README.md
```

## Verlo en local

Los navegadores bloquean la lectura de los JSON al abrir el `index.html` con doble clic (`file://`). Para verlo en tu ordenador, levanta un servidor sencillo dentro de la carpeta:

```bash
cd materiales-avanzados
python -m http.server 8000
```

Y abre `http://localhost:8000`.

## Publicar en GitHub Pages

1. Crea un repositorio nuevo en GitHub y sube todo el contenido de esta carpeta a la raiz.
2. En el repositorio: **Settings -> Pages**.
3. En *Build and deployment*, fuente **Deploy from a branch**, rama `main` y carpeta `/ (root)`. Guardar.
4. En un minuto estara disponible en `https://TU-USUARIO.github.io/NOMBRE-DEL-REPO/`.

## Ampliar el contenido

- **Mas preguntas:** anade objetos al array `preguntas` de `data/preguntas.json` (ver `data/ESQUEMA.md`).
- **Mas teoria:** rellena las `secciones` del tema correspondiente en `data/contenido.json`. Cada seccion es `{ "id", "titulo", "html" }`.

Todo el contenido sale de los apuntes de la asignatura; las explicaciones no se inventan.
