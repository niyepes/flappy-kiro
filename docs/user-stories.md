# Historias de Usuario - Flappy Kiro

## Épica: Mecánica de Juego Core

### HU-001: Controlar al personaje
**Como** jugador  
**Quiero** hacer que Kiro vuele al presionar una tecla o hacer clic  
**Para** navegar a través de los obstáculos

**Criterios de aceptación:**
- Al presionar espacio o hacer clic, Kiro salta/aletea hacia arriba
- Kiro cae por gravedad cuando no se presiona nada
- La física del salto se siente responsiva y predecible

### HU-002: Evitar obstáculos
**Como** jugador  
**Quiero** esquivar tuberías que se mueven de derecha a izquierda  
**Para** mantenerme vivo y aumentar mi puntuación

**Criterios de aceptación:**
- Las tuberías aparecen con espacios aleatorios entre ellas
- Las tuberías se mueven a velocidad constante de derecha a izquierda
- Si Kiro toca una tubería, el juego termina
- El espacio entre tuberías es suficiente para pasar

### HU-003: Detectar colisiones
**Como** jugador  
**Quiero** que el juego termine cuando choque con obstáculos o bordes  
**Para** tener un desafío claro

**Criterios de aceptación:**
- El juego termina si Kiro toca el suelo
- El juego termina si Kiro toca el techo
- El juego termina si Kiro toca una tubería
- Se muestra una pantalla de "Game Over"

### HU-004: Ver mi puntuación
**Como** jugador  
**Quiero** ver cuántos obstáculos he superado  
**Para** medir mi progreso y competir conmigo mismo

**Criterios de aceptación:**
- El puntaje aumenta en 1 cada vez que paso una tubería
- El puntaje se muestra en pantalla durante el juego
- Al terminar, veo mi puntaje final

### HU-005: Reiniciar el juego
**Como** jugador  
**Quiero** poder reiniciar rápidamente después de perder  
**Para** intentarlo de nuevo sin fricción

**Criterios de aceptación:**
- Después de Game Over, puedo presionar una tecla para reiniciar
- El juego vuelve al estado inicial (puntaje en 0, Kiro en posición inicial)

## Épica: Experiencia Visual y Audio

### HU-006: Ver animaciones fluidas
**Como** jugador  
**Quiero** ver animaciones suaves del personaje y el entorno  
**Para** disfrutar de una experiencia visual agradable

**Criterios de aceptación:**
- Kiro tiene animación de aleteo
- El fondo se desplaza para dar sensación de movimiento
- El juego corre a 60 FPS

### HU-007: Escuchar efectos de sonido
**Como** jugador  
**Quiero** escuchar sonidos cuando salto, paso tuberías o pierdo  
**Para** tener retroalimentación auditiva de mis acciones

**Criterios de aceptación:**
- Sonido al saltar/aletear
- Sonido al pasar una tubería
- Sonido al colisionar (Game Over)

## Épica: Progresión y Records

### HU-008: Ver mi mejor puntuación
**Como** jugador  
**Quiero** que se guarde mi mejor puntaje  
**Para** intentar superarlo en futuras partidas

**Criterios de aceptación:**
- El high score se guarda en localStorage
- Se muestra el high score en la pantalla de Game Over
- Si supero mi record, se actualiza automáticamente

### HU-009: Pantalla de inicio
**Como** jugador  
**Quiero** ver una pantalla de inicio antes de jugar  
**Para** prepararme y entender los controles

**Criterios de aceptación:**
- Pantalla inicial con título del juego
- Instrucciones básicas (cómo jugar)
- El juego inicia al presionar espacio o hacer clic

---

# Requerimientos Técnicos

## Funcionales

### RF-001: Renderizado con Canvas
El juego debe renderizarse usando HTML5 Canvas API

### RF-002: Loop de juego
Implementar game loop con requestAnimationFrame para 60 FPS

### RF-003: Sistema de física
- Gravedad constante aplicada al jugador
- Impulso hacia arriba al saltar
- Velocidad terminal para evitar aceleración infinita

### RF-004: Detección de colisiones
Implementar detección de colisiones rectangulares (AABB) entre:
- Jugador y tuberías
- Jugador y límites de pantalla

### RF-005: Generación de obstáculos
- Generar tuberías a intervalos regulares
- Altura aleatoria con espacio fijo entre tubería superior e inferior
- Reciclar tuberías fuera de pantalla

### RF-006: Sistema de puntuación
- Incrementar score al pasar el centro de cada tubería
- Persistir high score en localStorage

### RF-007: Estados del juego
Manejar estados: MENU, PLAYING, GAME_OVER

### RF-008: Entrada del usuario
Soportar múltiples métodos de entrada:
- Click del mouse
- Tecla Espacio
- Touch (para móviles)

## No Funcionales

### RNF-001: Rendimiento
El juego debe mantener 60 FPS en navegadores modernos

### RNF-002: Compatibilidad
Funcionar en Chrome, Firefox, Safari y Edge (últimas 2 versiones)

### RNF-003: Responsive
Adaptarse a diferentes tamaños de pantalla manteniendo aspect ratio

### RNF-004: Sin dependencias
Usar únicamente JavaScript vanilla, HTML5 y CSS3

### RNF-005: Código limpio
- Código modular y organizado
- Comentarios en funciones clave
- Nombres de variables descriptivos

---

# Backlog Priorizado

## Sprint 1 - MVP (Mínimo Producto Viable)
1. RF-001: Setup Canvas y estructura básica
2. RF-002: Game loop
3. RF-003: Física del jugador (gravedad + salto)
4. HU-001: Control del personaje
5. RF-004: Detección de colisiones básica
6. RF-005: Generación de tuberías
7. HU-002: Evitar obstáculos
8. HU-003: Detectar colisiones

## Sprint 2 - Jugabilidad completa
9. RF-006: Sistema de puntuación
10. HU-004: Ver puntuación
11. RF-007: Estados del juego
12. HU-005: Reiniciar juego
13. HU-009: Pantalla de inicio

## Sprint 3 - Polish
14. HU-006: Animaciones y sprites
15. HU-007: Efectos de sonido
16. HU-008: High score persistente
17. RNF-003: Responsive design
