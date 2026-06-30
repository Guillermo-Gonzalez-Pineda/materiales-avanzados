# Esquema de `preguntas.json`

Fuente unica de las preguntas tipo test. La web lee de aqui; para ampliar el banco, basta con anadir objetos al array `preguntas`.

## Estructura general

- `asignatura`, `version`, `nota`: metadatos.
- `temas`: lista de los 7 temas (`id`, `nombre`, `rango_preguntas`).
- `preguntas`: array con todas las preguntas.

## Campos de cada pregunta

| Campo         | Tipo    | Descripcion |
|---------------|---------|-------------|
| `id`          | string  | Identificador unico, p. ej. `T1-Q01`. |
| `tema`        | number  | Numero de tema (1-7). Permite filtrar el test por tema. |
| `subtema`     | string  | Apartado concreto dentro del tema. |
| `dificultad`  | string  | `facil` \| `media` \| `dificil`. |
| `enunciado`   | string  | Texto de la pregunta. |
| `opciones`    | array   | 3-4 opciones de respuesta (texto). |
| `respuesta`   | number  | Indice (base 0) de la opcion correcta dentro de `opciones`. |
| `explicacion` | string  | Justificacion basada en los apuntes (se muestra al corregir). |
| `fuente`      | string  | De donde sale (tema/apartado y/o n.o de pregunta del examen). |

## Para anadir una pregunta nueva

```json
{
  "id": "T1-Q21",
  "tema": 1,
  "subtema": "Cobre",
  "dificultad": "media",
  "enunciado": "...",
  "opciones": ["...", "...", "...", "..."],
  "respuesta": 0,
  "explicacion": "...",
  "fuente": "Tema 1 - Cobre"
}
```

Reglas:
- `respuesta` cuenta desde 0 (la primera opcion es 0).
- Mantener las dificultades en minusculas y sin acentos (`facil`, `media`, `dificil`).
- Las explicaciones deben salir de los apuntes, no inventarse.
