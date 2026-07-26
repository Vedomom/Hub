import { ThreeMFLoader } from 'three/examples/jsm/Addons.js';
import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

//Menu button toggle

const menu = document.querySelector("#menu");
const links = document.querySelector(".links");

menu.onclick = () => {
    menu.classList.toggle('bx-x');
    links.classList.toggle('active')
}
links.onclick = () => {
    menu.classList.toggle('bx-x');
    links.classList.toggle('active')
}   


//Art Gallery

const gallery = document.querySelector('#gallery');
const selectedImage = document.querySelector('#selectedImage');
const popUp = document.querySelector('.PopUpContainer')
const imageIndexs = Array(40).keys();
console.log(imageIndexs)

imageIndexs.forEach((i) => {
    const image = document.createElement('img');
    if(import.meta.env.BASE_URL == '/'){
        image.src = `art/art_gal_img_${i}.png`;
    }
    else{
            image.src = `${import.meta.env.BASE_URL}/art/art_gal_img_${i}.png`;
    };
    image.alt = `Art Cover #${i}`;
    image.classList.add('galleryImage');

    image.addEventListener('click', () =>{
        //popUp
        popUp.classList.toggle('active')
        selectedImage.src = image.src
        selectedImage.alt = image.alt
    })

    gallery.appendChild(image)

})

popUp.onclick = () => {
    popUp.classList.toggle('active')
    selectedImage.src = ''
    selectedImage.alt = ''
}




//Three.js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(80, document.body.clientWidth/window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#tjsContainer'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(document.body.clientWidth, window.innerHeight);
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

    camera.aspect = Math.max(document.body.clientWidth, 1)/Math.max(window.innerHeight, 1)
    camera.updateProjectionMatrix()
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(document.body.clientWidth, window.innerHeight);
    controls.update()
    renderer.render(scene, camera);
}

animate()