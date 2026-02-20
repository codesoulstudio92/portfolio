import * as THREE from "https://unpkg.com/three@0.160.0/build/three.module.js";

const canvas = document.querySelector("#orbCanvas");

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const scene = new THREE.Scene();
scene.background = new THREE.Color("#05070f");

const camera = new THREE.PerspectiveCamera(
  55,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
camera.position.z = 5;

// Light
const ambient = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambient);

const point = new THREE.PointLight(0x7c3aed, 2);
point.position.set(2, 2, 3);
scene.add(point);

const rimLight = new THREE.PointLight(0x2563eb, 3);
rimLight.position.set(-3, -2, -4);
scene.add(rimLight);

// Orb
const orbGeo = new THREE.SphereGeometry(1, 64, 64);
const orbMat = new THREE.MeshStandardMaterial({
    color: 0x0f172a,
    emissive: 0x3b82f6,
    emissiveIntensity: 2.5,
    roughness: 0.1,
    metalness: 0.4
  });
const orb = new THREE.Mesh(orbGeo, orbMat);
scene.add(orb);

// Animate
let t = 0;

function animate() {
  t += 0.02;

  // rotation
  orb.rotation.y += 0.01;
  orb.rotation.x += 0.005;

  orb.position.y = Math.sin(t * 0.5) * 0.2;

  // breathing glow pulse
  orb.material.emissiveIntensity = 2.2 + Math.sin(t) * 0.6;

  // subtle scale pulse
  const s = 1 + Math.sin(t) * 0.02;
  orb.scale.set(s, s, s);

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
animate();

// Resize
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
