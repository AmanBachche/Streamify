import { useEffect, useRef } from 'react';
import { Mesh, Program, Renderer, Triangle } from 'ogl';

const hexToRgb = hex => {
  const value = hex.trim().replace(/^#/, '');
  const normalized = value.length === 3 ? value.replace(/./g, channel => channel + channel) : value;
  const match = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(normalized);
  if (!match) return [1, 1, 1];
  return [parseInt(match[1], 16) / 255, parseInt(match[2], 16) / 255, parseInt(match[3], 16) / 255];
};

const setColor = (uniform, hex) => {
  const color = hexToRgb(hex);
  uniform.value[0] = color[0];
  uniform.value[1] = color[1];
  uniform.value[2] = color[2];
};

const vertex = `#version 300 es
in vec2 position;
void main() { gl_Position = vec4(position, 0.0, 1.0); }`;

const fragment = `#version 300 es
precision highp float;
uniform vec2 uResolution;
uniform float uTime;
uniform float uSpeed;
uniform float uScale;
uniform float uRotation;
uniform float uLayers;
uniform float uWaveAmplitude;
uniform float uWaveFrequency;
uniform float uWaveSpeed;
uniform float uLayerSpeed;
uniform float uTwist;
uniform float uTwistFrequency;
uniform float uTwistSpeed;
uniform float uLineFrequency;
uniform float uLineSpacing;
uniform float uLineSharpness;
uniform float uGlowFalloff;
uniform float uGlowIntensity;
uniform float uBrightness;
uniform float uBlueBoost;
uniform float uVignette;
uniform float uGrain;
uniform float uRotationSpeed;
uniform float uLightMode;
uniform vec3 uLineColor;
uniform vec3 uGlowColor;
out vec4 fragColor;
#define MAX_LAYERS 10
mat2 rotate2d(float angle) {
  float s = sin(angle); float c = cos(angle);
  return mat2(c, -s, s, c);
}
float grainHash(vec2 p) {
  p = floor(p);
  return fract(52.9829189 * fract(dot(p, vec2(0.065, 0.005))));
}
float layeredGrain(vec2 f) {
  vec2 p = mod(f + vec2(uTime * 30.0, -uTime * 21.0), 1024.0);
  vec2 r = mat2(0.8, -0.5, 0.5, 0.8) * p;
  return 0.4*grainHash(r) + 0.25*grainHash(r*2.0+17.0) + 0.2*grainHash(r*4.0+47.0);
}
void main() {
  vec2 res = max(uResolution, vec2(1.0));
  vec2 uv = (2.0 * gl_FragCoord.xy - res) / res.y;
  float t = uTime * uSpeed;
  vec3 backdrop = mix(vec3(0.07, 0.06, 0.09), vec3(1.0), step(0.5, uLightMode));
  vec3 cTone = max(uLineColor * 0.85 - uGlowColor * 0.06, vec3(0.0));
  vec3 clTone = uLineColor * 0.2 + uGlowColor * 0.22;
  vec2 p = uv / max(uScale, 0.05);
  p = rotate2d(radians(uRotation) + t * uRotationSpeed) * p;
  vec3 col = vec3(0.0);
  float fField = 0.0;
  for (int i = 0; i < MAX_LAYERS; i++) {
    float fi = float(i) + 1.0;
    if (fi > uLayers) break;
    p += uWaveAmplitude * sin(p.yx * fi * uWaveFrequency + t * (uWaveSpeed + fi * uLayerSpeed));
    float rad = length(p);
    float ang = atan(p.y, p.x) + sin(rad * uTwistFrequency - t * uTwistSpeed + fi) * uTwist;
    p = vec2(cos(ang), sin(ang)) * rad;
    float l = pow(max(0.0, 1.0 - abs(sin(p.x * (uLineFrequency + fi * uLineSpacing) + sin(p.y * 3.0 + t)))), uLineSharpness);
    fField += l / fi; col += uLineColor * l / fi;
    col += uGlowColor * exp(-uGlowFalloff * abs(sin(p.x * 3.0 + t + fi))) * uGlowIntensity / (fi * 2.0);
  }
  float cent = exp(-2.2 * dot(uv, uv));
  col += cTone * cent;
  float vig = 1.0 - smoothstep(0.35, 1.45, length(uv));
  col *= mix(1.0 - uVignette, 1.0, vig);
  col = 1.0 - exp(-col * uBrightness);
  col.b *= uBlueBoost;
  fragColor = vec4(backdrop + col + (layeredGrain(gl_FragCoord.xy)-0.5)*uGrain, 1.0);
}
`;

const contexts = new WeakMap();

const GhostFibers = ({
  lineColor = '#140E35', glowColor = '#3437A0', speed = 0.2, scale = 2,
  rotation = 0, rotationSpeed = 0.25, layers = 4, waveAmplitude = 0.015,
  waveFrequency = 3, waveSpeed = 0.15, layerSpeed = 0.08, twist = 0.1,
  twistFrequency = 5, twistSpeed = 1.2, lineFrequency = 5, lineSpacing = 2,
  lineSharpness = 16, glowFalloff = 10, glowIntensity = 1.6, brightness = 2,
  blueBoost = 1.25, vignette = 0.8, grain = 0.05, lightMode = false,
  dpr = 1, fps = 60, paused = false, className = ''
}) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const renderer = new Renderer({ webgl: 2, alpha: false, antialias: false, dpr: Math.min(Math.max(dpr, 0.5), 2) });
    const gl = renderer.gl;
    const canvas = gl.canvas;
    Object.assign(canvas.style, { width: '100%', height: '100%', display: 'block' });
    container.appendChild(canvas);

    const geometry = new Triangle(gl);
    const program = new Program(gl, {
      vertex, fragment,
      uniforms: {
        uResolution: { value: new Float32Array([1, 1]) }, uTime: { value: 0 }, uSpeed: { value: speed },
        uScale: { value: scale }, uRotation: { value: rotation }, uRotationSpeed: { value: rotationSpeed },
        uLayers: { value: layers }, uWaveAmplitude: { value: waveAmplitude }, uWaveFrequency: { value: waveFrequency },
        uWaveSpeed: { value: waveSpeed }, uLayerSpeed: { value: layerSpeed }, uTwist: { value: twist },
        uTwistFrequency: { value: twistFrequency }, uTwistSpeed: { value: twistSpeed }, uLineFrequency: { value: lineFrequency },
        uLineSpacing: { value: lineSpacing }, uLineSharpness: { value: lineSharpness }, uGlowFalloff: { value: glowFalloff },
        uGlowIntensity: { value: glowIntensity }, uBrightness: { value: brightness }, uBlueBoost: { value: blueBoost },
        uVignette: { value: vignette }, uGrain: { value: grain }, uLightMode: { value: lightMode ? 1 : 0 },
        uLineColor: { value: new Float32Array(hexToRgb(lineColor)) },
        uGlowColor: { value: new Float32Array(hexToRgb(glowColor)) }
      }
    });
    const mesh = new Mesh(gl, { geometry, program });

    let frameId, elapsed = 0, lastTime = performance.now();
    const loop = now => {
      const delta = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;
      if (!paused) { elapsed += delta; program.uniforms.uTime.value = elapsed; renderer.render({ scene: mesh }); }
      frameId = requestAnimationFrame(loop);
    };
    const setSize = () => {
      const r = container.getBoundingClientRect();
      renderer.setSize(r.width, r.height);
      program.uniforms.uResolution.value.set([gl.drawingBufferWidth, gl.drawingBufferHeight]);
    };
    window.addEventListener('resize', setSize);
    setSize(); frameId = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(frameId); window.removeEventListener('resize', setSize); container.removeChild(canvas); };
  }, [dpr, paused]);

  return <div ref={containerRef} className={`relative h-full w-full ${className}`} />;
};

export default GhostFibers;