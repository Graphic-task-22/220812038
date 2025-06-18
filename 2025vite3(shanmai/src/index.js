import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import mesh, { updatePosition } from './mesh.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);
scene.add(mesh);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 1, 10000);
camera.position.set(800, 400, 800);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

function animate() {
    requestAnimationFrame(animate);
    updatePosition();
    controls.update();
    renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});