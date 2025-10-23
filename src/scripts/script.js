import * as THREE from 'three';
import Ferrari_Testarossa from './models/ferrari-testarossa';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Sizes
const sizes = { width: window.innerWidth, height: window.innerHeight };

// Scene
const scene = new THREE.Scene();

// Cube
const geometry = new THREE.PlaneGeometry(100, 100);
const material = new THREE.MeshStandardMaterial({ 
    color: 0x808080,
    wireframe: false
});
const plane = new THREE.Mesh(geometry, material);
plane.position.set(0, 0, 0);
plane.rotation.x = Math.PI * 1.5;
scene.add(plane);

// Ferrari
const ferrari = new Ferrari_Testarossa();
await ferrari.load(); // wait until it's fully loaded
const ferrariModel = ferrari.model;
scene.add(ferrariModel);

// Arrow key controls
const keysPressed = { ArrowUp: false, ArrowDown: false, ArrowLeft: false, ArrowRight: false };
window.addEventListener('keydown', (e) => {
    if (keysPressed.hasOwnProperty(e.code)) {
        keysPressed[e.code] = true;
    }
});
window.addEventListener('keyup', (e) => {
    if (keysPressed.hasOwnProperty(e.code)) {
        keysPressed[e.code] = false;
    }
});

// Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);
const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.set(0, 2, 10);
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true

// Renderer
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Track scroll
let scrollY = 0;
window.addEventListener('scroll', () => {
    scrollY = window.scrollY;
});

// Animate
function animate() {
    requestAnimationFrame(animate);

    // Update orbit controls
    controls.update()

    //update Ferrari controls
    ferrari.updateCar(keysPressed);

    renderer.render(scene, camera);
}

animate();

// Resize
window.addEventListener('resize', () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    renderer.setSize(sizes.width, sizes.height);
});
