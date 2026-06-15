// GLSL for the Cursor.zip vaporwave neon grid floor.
// Kept out of the scene component so the R3F file stays readable. A single flat
// plane (1×1 segments) is enough — the grid pattern, distance fade and scroll are
// all computed per-fragment, so there is no geometry cost as the floor recedes.

export const gridVertexShader = /* glsl */ `
  varying vec2 vGrid;   // plane-local coords → drives the grid pattern
  varying float vDepth; // view-space depth → drives the distance fade

  void main() {
    vGrid = position.xy;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vDepth = -mv.z;
    gl_Position = projectionMatrix * mv;
  }
`;

export const gridFragmentShader = /* glsl */ `
  precision mediump float;

  uniform float uTime;       // seconds — scrolls the floor toward the camera
  uniform float uScroll;     // scroll speed (world units / sec)
  uniform float uCell;       // world units per grid cell
  uniform float uLineHalf;   // half line thickness (cell units)
  uniform float uNear;       // view depth where the floor starts
  uniform float uFar;        // view depth where the floor has faded out
  uniform vec3 uColorNear;   // foreground line colour (magenta)
  uniform vec3 uColorFar;    // horizon line colour (cyan)
  uniform float uOpacity;    // master opacity

  varying vec2 vGrid;
  varying float vDepth;

  // Anti-aliased line: 1.0 on a grid line, 0.0 between lines.
  float gridLine(float coord) {
    float dist = 0.5 - abs(fract(coord) - 0.5);
    return smoothstep(uLineHalf, 0.0, dist);
  }

  void main() {
    float gx = vGrid.x / uCell;
    float gz = (vGrid.y + uTime * uScroll) / uCell;
    float lines = max(gridLine(gx), gridLine(gz));

    float depthT = clamp((vDepth - uNear) / (uFar - uNear), 0.0, 1.0);
    float fade = pow(1.0 - depthT, 1.6); // floor melts into the distance
    vec3 col = mix(uColorNear, uColorFar, depthT);

    float alpha = lines * fade * uOpacity;
    if (alpha < 0.003) discard;          // skip empty cells (cheap + clean)

    // A touch of extra brightness on the line core for the neon "tube" feel.
    gl_FragColor = vec4(col * (0.65 + lines * 0.45), alpha);
  }
`;
