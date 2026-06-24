import { ThreeMFLoader } from 'three/examples/jsm/Addons.js';
import './style.css'
import * as THREE from 'three'

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(80, window.innerWidth/window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
renderer.render(scene, camera)

const cshape = new THREE.IcosahedronGeometry(10, 1)
const cmaterial = new THREE.MeshBasicMaterial({color: 0xE895DC, wireframe: true});
const icos = new THREE.Mesh(cshape, cmaterial);

scene.add(icos)
function animate() {
    requestAnimationFrame(animate);

    icos.rotation.x += 0.005;
    icos.rotation.y += 0.001;
    icos.rotation.z += 0.002;

    renderer.render(scene, camera);
}

animate()