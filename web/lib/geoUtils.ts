/**
 * Utility to generate realistic, organic, ragged / jagged natural boundary coordinates
 * for geographical polygons (Districts & Kingdoms) instead of straight clean edges.
 */
export function generateRaggedPolygon(
  controlVertices: [number, number][],
  jitterAmplitude: number = 0.035,
  subdivisions: number = 5
): [number, number][] {
  if (!controlVertices || controlVertices.length < 3) return controlVertices;

  const result: [number, number][] = [];

  for (let i = 0; i < controlVertices.length; i++) {
    const p1 = controlVertices[i];
    const p2 = controlVertices[(i + 1) % controlVertices.length];

    const dLat = p2[0] - p1[0];
    const dLng = p2[1] - p1[1];
    const dist = Math.hypot(dLat, dLng);

    // Normal vector perpendicular to edge p1 -> p2
    const normLat = dist > 0 ? -dLng / dist : 0;
    const normLng = dist > 0 ? dLat / dist : 0;

    // Push start vertex
    result.push(p1);

    // Insert intermediate micro-jittered vertices between p1 and p2
    for (let s = 1; s < subdivisions; s++) {
      const t = s / subdivisions;
      const baseLat = p1[0] + t * dLat;
      const baseLng = p1[1] + t * dLng;

      // Deterministic organic pseudo-noise formula based on lat, lng, and vertex index
      const seed = Math.sin(baseLat * 83.1 + baseLng * 149.3 + s * 17.7) * 43758.5453;
      const noise = (seed - Math.floor(seed)) * 2 - 1; // range [-1, 1]

      // Fade jitter near endpoints p1 and p2 so polygon closes seamlessly without tearing
      const fade = Math.sin(t * Math.PI);
      const amp = jitterAmplitude * fade;

      const raggedLat = baseLat + normLat * noise * amp;
      const raggedLng = baseLng + normLng * noise * amp;

      result.push([raggedLat, raggedLng]);
    }
  }

  return result;
}
