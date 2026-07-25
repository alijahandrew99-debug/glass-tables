"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

/* ---------- safe texture: real file if present, dark gradient if not ---------- */
function usePlaneTexture(url: string, label: string) {
  const [tex, setTex] = useState<THREE.Texture | null>(null);

  useEffect(() => {
    let alive = true;
    const loader = new THREE.TextureLoader();
    loader.load(
      url,
      (t) => {
        if (!alive) return;
        t.colorSpace = THREE.SRGBColorSpace;
        setTex(t);
      },
      undefined,
      () => {
        if (!alive) return;
        const c = document.createElement("canvas");
        c.width = 512;
        c.height = 682;
        const g = c.getContext("2d")!;
        const grad = g.createLinearGradient(0, 0, 512, 682);
        grad.addColorStop(0, "#16130f");
        grad.addColorStop(0.55, "#0c0b09");
        grad.addColorStop(1, "#1b1712");
        g.fillStyle = grad;
        g.fillRect(0, 0, 512, 682);
        g.strokeStyle = "rgba(250,247,242,0.12)";
        g.strokeRect(20, 20, 472, 642);
        g.fillStyle = "#E8B4B0";
        g.font = "28px Georgia";
        g.textAlign = "center";
        g.fillText("✦", 256, 320);
        g.fillStyle = "rgba(250,247,242,0.4)";
        g.font = "italic 20px Georgia";
        g.fillText(label, 256, 366);
        const t = new THREE.CanvasTexture(c);
        t.colorSpace = THREE.SRGBColorSpace;
        setTex(t);
      }
    );
    return () => {
      alive = false;
    };
  }, [url, label]);

  return tex;
}

/* ---------- ripple shader ---------- */
const vertex = /* glsl */ `
  uniform float uTime;
  uniform float uHover;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    vec3 pos = position;
    float w = sin(pos.x * 2.4 + uTime * 0.9) * cos(pos.y * 2.1 + uTime * 0.7);
    pos.z += w * (0.035 + uHover * 0.12);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;
const fragment = /* glsl */ `
  uniform sampler2D uMap;
  uniform float uHover;
  varying vec2 vUv;
  void main() {
    vec2 uv = vUv;
    uv.x += sin(uv.y * 12.0) * 0.004 * uHover;
    vec4 col = texture2D(uMap, uv);
    col.rgb *= 0.92 + uHover * 0.1;
    gl_FragColor = col;
  }
`;

function CampaignPlane({
  url,
  label,
  position,
  size,
  drift,
}: {
  url: string;
  label: string;
  position: [number, number, number];
  size: [number, number];
  drift: number;
}) {
  const tex = usePlaneTexture(url, label);
  const mesh = useRef<THREE.Mesh>(null);
  const hover = useRef(0);
  const [hovered, setHovered] = useState(false);

  const uniforms = useMemo(
    () => ({
      uMap: { value: null as THREE.Texture | null },
      uTime: { value: 0 },
      uHover: { value: 0 },
    }),
    []
  );

  useEffect(() => {
    if (tex) uniforms.uMap.value = tex;
  }, [tex, uniforms]);

  useFrame((state) => {
    if (!mesh.current) return;
    const t = state.clock.elapsedTime;
    uniforms.uTime.value = t;
    hover.current += ((hovered ? 1 : 0) - hover.current) * 0.08;
    uniforms.uHover.value = hover.current;
    mesh.current.position.y = position[1] + Math.sin(t * 0.5 + drift) * 0.07;
  });

  if (!tex) return null;

  return (
    <mesh
      ref={mesh}
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <planeGeometry args={[size[0], size[1], 32, 32]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={vertex}
        fragmentShader={fragment}
        transparent
      />
    </mesh>
  );
}

/* ---------- parallax rig: mouse on desktop, gyro on mobile ---------- */
function Rig() {
  const group = useRef<THREE.Group>(null);
  const target = useRef({ x: 0, y: 0 });
  const { viewport } = useThree();

  useEffect(() => {
    const onMouse = (e: MouseEvent) => {
      target.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      target.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    const onGyro = (e: DeviceOrientationEvent) => {
      if (e.gamma == null || e.beta == null) return;
      target.current.x = Math.max(-1, Math.min(1, e.gamma / 30));
      target.current.y = Math.max(-1, Math.min(1, (e.beta - 45) / 30));
    };
    window.addEventListener("mousemove", onMouse);
    window.addEventListener("deviceorientation", onGyro);
    return () => {
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("deviceorientation", onGyro);
    };
  }, []);

  useFrame(() => {
    const g = group.current;
    if (!g) return;
    g.rotation.y += (target.current.x * 0.18 - g.rotation.y) * 0.05;
    g.rotation.x += (target.current.y * 0.11 - g.rotation.x) * 0.05;
    g.position.x += (target.current.x * 0.45 - g.position.x) * 0.05;
    g.position.y += (target.current.y * -0.2 - g.position.y) * 0.05;
  });

  const s = Math.min(1, viewport.width / 8);

  return (
    <group ref={group} scale={s}>
      <CampaignPlane url="/campaign/hero-1.jpg" label="Campaign I"   position={[-2.9, 0.25, -1.3]} size={[1.9, 2.6]} drift={0} />
      <CampaignPlane url="/campaign/hero-2.jpg" label="Campaign II"  position={[0, 0, 0]}           size={[2.4, 3.2]} drift={2} />
      <CampaignPlane url="/campaign/hero-3.jpg" label="Campaign III" position={[2.95, -0.2, -0.9]}  size={[1.9, 2.6]} drift={4} />
      <CampaignPlane url="/campaign/hero-4.jpg" label="Campaign IV"  position={[-1.5, -0.1, -2.6]}  size={[1.7, 2.3]} drift={1} />
      <CampaignPlane url="/campaign/hero-5.jpg" label="Campaign V"   position={[1.6, 0.2, -2.9]}    size={[1.7, 2.3]} drift={3} />
      <CampaignPlane url="/campaign/hero-6.jpg" label="Campaign VI"  position={[0.1, -0.35, -4.2]}  size={[2.0, 2.7]} drift={5} />
    </group>
  );
}

export default function Hero3D() {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 4.2], fov: 42 }}
      gl={{ antialias: true, alpha: true }}
      className="!absolute inset-0"
    >
      <Suspense fallback={null}>
        <Rig />
      </Suspense>
    </Canvas>
  );
}
