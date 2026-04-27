// SRP: única responsabilidad — detectar solapamiento entre dos rectángulos AABB
// OCP: función pura, extensible sin modificación
export function overlap(a, b) {
  return a.x < b.x + b.w && a.x + a.w > b.x &&
         a.y < b.y + b.h && a.y + a.h > b.y;
}
