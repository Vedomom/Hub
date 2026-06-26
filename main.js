import { ThreeMFLoader } from 'three/examples/jsm/Addons.js';
import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { array } from 'three/tsl';

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
const cmaterial = new THREE.MeshStandardMaterial({color: 0xE895DC});
const icos = new THREE.Mesh(cshape, cmaterial);
const pointlight = new THREE.PointLight(0xffffff,100)
pointlight.position.set(10, 10, 10)

const ambientlight = new THREE.AmbientLight(0xffffff)

const plighthelper = new THREE.PointLightHelper(pointlight)
const gridhelper = new THREE.GridHelper(200, 50)
scene.add(pointlight, ambientlight, plighthelper, gridhelper)

scene.add(icos)
const controls = new OrbitControls(camera, renderer.domElement)


function addstar() {
    const sphere = new THREE.SphereGeometry(0.2, 24, 24);
    const star_mat = new THREE.MeshStandardMaterial({color: 0xFFF8CC});
    const star = new THREE.Mesh(sphere, star_mat);

    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

    star.position.set(x, y, z);
    
    scene.add(star);
}

Array(200).fill().forEach(addstar)



function animate() {
    requestAnimationFrame(animate);

    icos.rotation.x += 0.005;
    icos.rotation.y += 0.001;
    icos.rotation.z += 0.002;

    controls.update()
    renderer.render(scene, camera);
}

animate()