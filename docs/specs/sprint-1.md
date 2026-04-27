# Spec: Sprint 1 — MVP

## Objetivo
Implementar el núcleo jugable de Flappy Kiro: un personaje controlable que cae por gravedad, tuberías que se generan y avanzan, y detección de colisiones que termina la partida.

---

## RF-001 · Setup Canvas y estructura básica

**Qué construir**
- Archivo `index.html` con un `<canvas>` centrado en pantalla.
- Archivo `game.js` como punto de entrada.
- El canvas debe tener un tamaño base de 480×640 px.

**Criterios de aceptación**
- [ ] El canvas se renderiza en el centro de la página.
- [ ] El fondo del canvas es de color sólido (ej. azul cielo).
- [ ] No hay dependencias externas; solo HTML, CSS y JS vanilla.

---

## RF-002 · Game loop

**Qué construir**
- Loop principal usando `requestAnimationFrame`.
- Cálculo de `deltaTime` para movimiento independiente del framerate.
- Función `update(dt)` y `render()` separadas.

**Criterios de aceptación**
- [ ] El loop corre a 60 FPS en navegadores modernos.
- [ ] `update` y `render` se invocan en cada frame.
- [ ] El loop puede detenerse (para estado GAME_OVER).

---

## RF-003 · Física del jugador

**Qué construir**
- Objeto `player` con propiedades: `x`, `y`, `vy` (velocidad vertical).
- Gravedad constante aplicada cada frame: `vy += GRAVITY * dt`.
- Velocidad terminal: `vy = Math.min(vy, MAX_FALL_SPEED)`.
- Impulso al saltar: `vy = JUMP_FORCE` (valor negativo).

**Valores de referencia**
| Constante | Valor sugerido |
|---|---|
| `GRAVITY` | 1800 px/s² |
| `JUMP_FORCE` | -500 px/s |
| `MAX_FALL_SPEED` | 600 px/s |

**Criterios de aceptación**
- [ ] Kiro cae progresivamente sin input.
- [ ] Al saltar, sube con impulso inmediato y luego vuelve a caer.
- [ ] La caída no se acelera infinitamente (velocidad terminal).

---

## HU-001 · Control del personaje

**Qué construir**
- Listener para `keydown` (tecla Espacio) → llama a `jump()`.
- Listener para `mousedown` / `touchstart` en el canvas → llama a `jump()`.
- `jump()` solo actúa si el estado del juego es `PLAYING`.

**Criterios de aceptación**
- [ ] Presionar Espacio hace saltar a Kiro.
- [ ] Hacer clic en el canvas hace saltar a Kiro.
- [ ] El salto se siente responsivo (sin delay perceptible).
- [ ] No se puede saltar en estado GAME_OVER o MENU.

---

## RF-004 · Detección de colisiones (AABB)

**Qué construir**
- Función `rectsOverlap(a, b)` que compara dos rectángulos `{x, y, w, h}`.
- Colisión jugador ↔ cada tubería (superior e inferior).
- Colisión jugador ↔ suelo (`y + h >= CANVAS_HEIGHT`).
- Colisión jugador ↔ techo (`y <= 0`).
- Al detectar colisión → cambiar estado a `GAME_OVER`.

**Criterios de aceptación**
- [ ] El juego termina al tocar una tubería.
- [ ] El juego termina al tocar el suelo.
- [ ] El juego termina al tocar el techo.
- [ ] No hay falsos positivos visibles (hitbox razonable).

---

## RF-005 · Generación de tuberías

**Qué construir**
- Array `pipes[]`; cada elemento: `{ x, topHeight, gap }`.
- Nueva tubería cada `PIPE_INTERVAL` px de desplazamiento horizontal.
- `topHeight` aleatorio dentro de un rango que garantice el gap.
- Todas las tuberías se mueven a `PIPE_SPEED` px/s hacia la izquierda.
- Tuberías con `x + PIPE_WIDTH < 0` se eliminan del array.

**Valores de referencia**
| Constante | Valor sugerido |
|---|---|
| `PIPE_SPEED` | 200 px/s |
| `PIPE_WIDTH` | 60 px |
| `PIPE_GAP` | 160 px |
| `PIPE_INTERVAL` | 250 px |
| Rango `topHeight` | 60 – (CANVAS_HEIGHT − GAP − 60) |

**Criterios de aceptación**
- [ ] Las tuberías aparecen desde el borde derecho.
- [ ] El espacio entre tubería superior e inferior es siempre `PIPE_GAP`.
- [ ] Las tuberías se mueven a velocidad constante.
- [ ] Las tuberías fuera de pantalla se eliminan (sin memory leak).

---

## HU-002 · Evitar obstáculos

> Cubierto por RF-005 (generación) + RF-004 (colisiones). No requiere código adicional.

**Criterios de aceptación**
- [ ] Las tuberías tienen un hueco suficiente para pasar.
- [ ] Tocar una tubería termina el juego (ver RF-004).

---

## HU-003 · Detectar colisiones y Game Over

**Qué construir**
- Estado `GAME_OVER` en el game loop.
- Al entrar en `GAME_OVER`: detener `update`, mostrar texto "Game Over" centrado en canvas.

**Criterios de aceptación**
- [ ] Se muestra "Game Over" al colisionar con tubería, suelo o techo.
- [ ] El juego deja de actualizar física y tuberías tras la colisión.

---

## Estructura de archivos esperada

```
flappy-kiro/
├── index.html
└── game.js
```

---

## Orden de implementación sugerido

1. `index.html` + canvas (RF-001)
2. Game loop con `requestAnimationFrame` (RF-002)
3. Objeto `player` + física (RF-003)
4. Input de salto (HU-001)
5. Generación y movimiento de tuberías (RF-005)
6. Detección de colisiones (RF-004)
7. Estado GAME_OVER + pantalla (HU-003)
