# Spec: Sprint 3 — Polish

## Objetivo
Añadir animaciones, efectos de sonido, y diseño responsive para completar la experiencia de juego.

---

## HU-006 · Animaciones fluidas

**Qué construir**
- Animación de rotación de Kiro basada en velocidad vertical
- Fondo parallax con desplazamiento continuo
- Clase `AnimationController` para gestionar animaciones (SRP)

**Criterios de aceptación**
- [ ] Kiro rota hacia arriba al saltar, hacia abajo al caer
- [ ] El fondo se desplaza continuamente
- [ ] Mantiene 60 FPS

---

## HU-007 · Efectos de sonido

**Qué construir**
- Clase `AudioManager` para gestionar reproducción de sonidos (SRP)
- Sonido al saltar
- Sonido al pasar tubería (score)
- Sonido al colisionar (game over)

**Criterios de aceptación**
- [ ] Se reproduce sonido al saltar
- [ ] Se reproduce sonido al incrementar score
- [ ] Se reproduce sonido al colisionar
- [ ] Los sonidos no se solapan de forma molesta

---

## RNF-003 · Responsive design

**Qué construir**
- Canvas escalable que mantiene aspect ratio
- Ajuste automático al tamaño de ventana
- Soporte para pantallas móviles

**Criterios de aceptación**
- [ ] El canvas se escala proporcionalmente
- [ ] Funciona en móviles y tablets
- [ ] Mantiene jugabilidad en diferentes resoluciones

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
    ├── score.js
    ├── state-machine.js
    ├── animation.js    ← NUEVO
    └── audio.js        ← NUEVO
```

---

## Orden de implementación sugerido

1. Crear `AudioManager` (HU-007)
2. Integrar sonidos en game loop
3. Añadir rotación de Kiro en `Renderer` (HU-006)
4. Añadir fondo parallax en `Renderer` (HU-006)
5. Implementar canvas responsive en `index.html` (RNF-003)

---

## Principios SOLID aplicados

- **SRP**: `AudioManager` solo gestiona audio
- **OCP**: Nuevos sonidos se pueden añadir sin modificar código existente
- **DIP**: `game.js` depende de abstracción AudioManager
