# Spec: Sprint 2 — Jugabilidad Completa

## Objetivo
Añadir sistema de puntuación, persistencia de high score, estados del juego completos (MENU, PLAYING, GAME_OVER) y pantalla de inicio.

---

## RF-006 · Sistema de puntuación

**Qué construir**
- Contador de score que incrementa al pasar cada tubería
- Persistencia de high score en localStorage
- Clase `ScoreManager` responsable de gestión de puntuación (SRP)

**Criterios de aceptación**
- [ ] El score incrementa en 1 al pasar el centro de cada tubería
- [ ] El high score se guarda en localStorage
- [ ] El high score se carga al iniciar el juego
- [ ] Si el score actual supera el high score, se actualiza

---

## HU-004 · Ver puntuación

**Qué construir**
- Mostrar score actual durante el juego
- Mostrar high score en pantalla de Game Over
- Indicador visual cuando se supera el high score

**Criterios de aceptación**
- [ ] El score se muestra en pantalla durante PLAYING
- [ ] En Game Over se muestra score actual y high score
- [ ] Si se supera el record, se muestra mensaje "New Record!"

---

## RF-007 · Estados del juego

**Qué construir**
- Enum o constantes para estados: MENU, PLAYING, GAME_OVER
- Clase `GameStateMachine` para gestionar transiciones (SRP, OCP)
- Lógica de transición entre estados

**Criterios de aceptación**
- [ ] El juego inicia en estado MENU
- [ ] Desde MENU, presionar espacio/clic → PLAYING
- [ ] Desde PLAYING, colisión → GAME_OVER
- [ ] Desde GAME_OVER, presionar espacio/clic → MENU

---

## HU-005 · Reiniciar juego

**Qué construir**
- Función `reset()` que reinicia todos los componentes
- Transición de GAME_OVER → MENU → PLAYING

**Criterios de aceptación**
- [ ] Al reiniciar, el score vuelve a 0
- [ ] Kiro vuelve a posición inicial
- [ ] Las tuberías se limpian
- [ ] El high score se mantiene

---

## HU-009 · Pantalla de inicio

**Qué construir**
- Pantalla MENU con título del juego
- Instrucciones de control
- Animación idle de Kiro (opcional)

**Criterios de aceptación**
- [ ] Se muestra título "Flappy Kiro"
- [ ] Se muestran instrucciones: "Presiona ESPACIO o CLIC para comenzar"
- [ ] Se muestra el high score actual
- [ ] Kiro está visible en posición inicial

---

## Estructura de archivos esperada

```
flappy-kiro/
├── index.html
├── game.js
└── src/
    ├── config.js
    ├── physics.js
    ├── pipes.js
    ├── collision.js
    ├── input.js
    ├── renderer.js
    ├── score.js          ← NUEVO
    └── state-machine.js  ← NUEVO
```

---

## Orden de implementación sugerido

1. Crear `ScoreManager` con localStorage (RF-006)
2. Actualizar `Renderer` para mostrar high score (HU-004)
3. Crear `GameStateMachine` (RF-007)
4. Integrar estados en `game.js` (RF-007)
5. Implementar pantalla MENU en `Renderer` (HU-009)
6. Actualizar lógica de reset (HU-005)

---

## Principios SOLID aplicados

- **SRP**: `ScoreManager` solo gestiona puntuación, `GameStateMachine` solo gestiona estados
- **OCP**: Nuevos estados se pueden añadir sin modificar código existente
- **LSP**: No aplica (no hay herencia)
- **ISP**: Interfaces mínimas y específicas
- **DIP**: `game.js` depende de abstracciones, no de implementaciones concretas
