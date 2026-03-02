"use client";

import { Renderer, Program, Mesh, Triangle } from "ogl";
import { useEffect, useRef } from "react";
import "./Galaxy.css";

interface GalaxyProps {
    density?: number;
    glowIntensity?: number;
    twinkleIntensity?: number;
    rotationSpeed?: number;
    repulsionStrength?: number;
    starSpeed?: number;
    speed?: number;
    hueShift?: number;
    saturation?: number;
    mouseRepulsion?: boolean;
    mouseInteraction?: boolean;
    transparent?: boolean;
}

const vertexShader = `
attribute vec2 uv;
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0, 1);
}
`;

const fragmentShader = `
precision highp float;

uniform float uTime;
uniform vec2 uMouse;

uniform float uDensity;
uniform float uGlowIntensity;
uniform float uTwinkleIntensity;
uniform float uRepulsionStrength;
uniform float uMouseActiveFactor;
uniform float uRotationSpeed;
uniform float uStarSpeed;
uniform float uGlobalSpeed;
uniform float uHueShift;
uniform float uSaturation;

varying vec2 vUv;

#define MAT45 mat2(0.7071,-0.7071,0.7071,0.7071)

float Hash21(vec2 p){
  p = fract(p*vec2(123.34,456.21));
  p += dot(p,p+45.32);
  return fract(p.x*p.y);
}

vec3 applyHue(vec3 color, float hue) {
  float angle = hue;
  float s = sin(angle), c = cos(angle);
  mat3 rot = mat3(
    vec3(0.299 + 0.701*c + 0.168*s, 0.587 - 0.587*c + 0.330*s, 0.114 - 0.114*c - 0.497*s),
    vec3(0.299 - 0.299*c - 0.328*s, 0.587 + 0.413*c + 0.035*s, 0.114 - 0.114*c + 0.292*s),
    vec3(0.299 - 0.300*c + 1.250*s, 0.587 - 0.588*c - 1.050*s, 0.114 + 0.886*c - 0.203*s)
  );
  return clamp(rot * color, 0.0, 1.0);
}

float Star(vec2 uv,float flare){
  float d = length(uv);
  float m = (0.05*uGlowIntensity)/d;
  uv*=MAT45;
  m *= smoothstep(1.0,0.2,d);
  return m;
}

vec3 StarLayer(vec2 uv){
  vec3 col=vec3(0.0);
  vec2 gv=fract(uv)-0.5;
  vec2 id=floor(uv);

  for(int y=-1;y<=1;y++){
    for(int x=-1;x<=1;x++){
      vec2 offset=vec2(float(x),float(y));
      vec2 si=id+offset;
      float seed=Hash21(si);
      float size=fract(seed*345.32);

      vec2 pad=vec2(
        fract(seed*34.0+uTime*uStarSpeed),
        fract(seed*38.0+uTime*uStarSpeed)
      )-0.5;

      float flareSize=smoothstep(0.9,1.0,size);
      float star=Star(gv-offset-pad,flareSize);

      float twinkle=sin(uTime*2.0+seed*10.0)*0.5+1.0;
      twinkle=mix(1.0,twinkle,uTwinkleIntensity);

      col+=star*size*vec3(1.0)*twinkle;
    }
  }
  return col;
}

void main(){
  vec2 uv = vUv - 0.5;

  // Mouse repulsion
  vec2 diff = uv - (uMouse - 0.5);
  float dist = length(diff);
  float force = uRepulsionStrength / max(dist,0.15);
  uv += normalize(diff) * force * 0.05 * uMouseActiveFactor;

  // Rotation
  float angle = uTime * uRotationSpeed;
  mat2 rot = mat2(cos(angle),-sin(angle),sin(angle),cos(angle));
  uv = rot * uv;

  #define NUM_LAYER 4.0

vec3 col = vec3(0.0);

for(float i = 0.0; i < NUM_LAYER; i++){
    float depth = fract((i / NUM_LAYER) + uTime * 0.1 * uGlobalSpeed);
    float scale = mix(15.0, 0.5, depth);
    col += StarLayer(uv * scale + i * 100.0) * depth * uDensity;
}

  col = applyHue(col, radians(uHueShift));
  col = mix(vec3(dot(col,vec3(0.299,0.587,0.114))), col, uSaturation);

  float brightness = max(col.r, max(col.g, col.b));
float alpha = smoothstep(0.02, 0.4, brightness);
gl_FragColor = vec4(col, alpha);
}
`;

export default function Galaxy({
    density = 1,
    glowIntensity = 0.35,
    twinkleIntensity = 0.5,
    rotationSpeed = 0.03,
    repulsionStrength = 0.6,
    starSpeed = 0.5,
    speed = 1,
    hueShift = 0,
    saturation = 1,
    mouseRepulsion = true,
    mouseInteraction = true,
    transparent = true,
}: GalaxyProps) {

    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!ref.current) return;

        const renderer = new Renderer({ alpha: transparent });
        const gl = renderer.gl;
        ref.current.appendChild(gl.canvas);

        const geometry = new Triangle(gl);

        const program = new Program(gl, {
            vertex: vertexShader,
            fragment: fragmentShader,
            uniforms: {
                uTime: { value: 0 },
                uMouse: { value: new Float32Array([0.5, 0.5]) },
                uDensity: { value: density },
                uGlowIntensity: { value: glowIntensity },
                uTwinkleIntensity: { value: twinkleIntensity },
                uRepulsionStrength: { value: repulsionStrength },
                uMouseActiveFactor: { value: mouseInteraction ? 1 : 0 },
                uRotationSpeed: { value: rotationSpeed },
                uStarSpeed: { value: starSpeed },
                uGlobalSpeed: { value: speed },
                uHueShift: { value: hueShift },
                uSaturation: { value: saturation },
            },
            transparent: true,
        });

        const mesh = new Mesh(gl, { geometry, program });

        renderer.setSize(
            ref.current!.clientWidth,
            ref.current!.clientHeight
        );


        function handleMouseMove(e: MouseEvent) {
            if (!mouseInteraction) return;
            const x = e.clientX / window.innerWidth;
            const y = 1 - e.clientY / window.innerHeight;
            program.uniforms.uMouse.value = new Float32Array([x, y]);
        }

        function handleResize() {
            if (!ref.current) return;
            renderer.setSize(
                ref.current.clientWidth,
                ref.current.clientHeight
            );
        }

        window.addEventListener("resize", handleResize);
        handleResize();

        window.addEventListener("mousemove", handleMouseMove);

        let frame: number;
        function update(t: number) {
            frame = requestAnimationFrame(update);
            program.uniforms.uTime.value = t * 0.001;
            renderer.render({ scene: mesh });
        }

        frame = requestAnimationFrame(update);

        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener("mousemove", handleMouseMove);
            if (ref.current && ref.current.contains(gl.canvas)) {
                ref.current.removeChild(gl.canvas);
            }
        }

    }, [
        density, glowIntensity, twinkleIntensity, rotationSpeed,
        repulsionStrength, starSpeed, speed, hueShift,
        saturation, mouseInteraction, transparent
    ]);

    return (
        <div
            ref={ref}
            style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                zIndex: 0
            }}
        />
    );
}
