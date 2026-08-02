import { Pass, ThreeMFLoader } from 'three/examples/jsm/Addons.js';
import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import emailjs from '@emailjs/browser';
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
const imageLimit = 39;
const loadButton = document.querySelector('.load-btn')
var currentIndex = 0
const loadLimit = 5
const initialLimit = 2
var loadIndex = 0


for(let i = currentIndex; loadIndex <= initialLimit;loadIndex++ ,currentIndex++ ,i++){
    const image = document.createElement('img');

    image.src = `./art_gal_img_${i}.png`;
    image.alt = `Art Cover #${i}`;
    image.loading = 'lazy'
    image.classList.add('galleryImage');
    image.classList.toggle('animate-pop');

    image.addEventListener('click', () =>{
    //popUp
        popUp.classList.toggle('active')
        selectedImage.src = image.src
        selectedImage.alt = image.alt
    })

    gallery.appendChild(image)
}
loadIndex = 0

loadButton.addEventListener('click', () =>{
    if(currentIndex <= imageLimit){
        for(let i = currentIndex; loadIndex <= loadLimit;loadIndex++ ,currentIndex++ ,i++){
            if(currentIndex > imageLimit){
                break
            }
            const image = document.createElement('img');

            image.src = `./art_gal_img_${i}.png`;
            image.alt = `Art Cover #${i}`;
            image.loading = 'lazy'
            image.classList.add('galleryImage');
            image.classList.toggle('animate-pop');

            image.addEventListener('click', () =>{
                //popUp
                popUp.classList.toggle('active')
                selectedImage.src = image.src
                selectedImage.alt = image.alt
            })

            gallery.appendChild(image)
        }

        loadIndex =0
    }
    else{
        //display message or smth
    }
})


popUp.onclick = () => {
    popUp.classList.toggle('active')
    selectedImage.src = ''
    selectedImage.alt = ''
}


//Contact Form
emailjs.init({
                publicKey: "nvH01GUFbHOCM9RpN",
            });

const form  = document.querySelector(".contact-form");
const responseFail = document.querySelector('#fail-response');
const responseSuccess = document.querySelector('#success-response');
const fail_box = document.querySelector('#fail-response .response-box');
const success_box = document.querySelector('#success-response .response-box');

responseSuccess.addEventListener('click', () => {
    responseSuccess.classList.toggle('active');
})

responseFail.addEventListener('click', () => {
    responseFail.classList.toggle('active');
})

form.addEventListener('submit', (e) => {
    e.preventDefault();
    emailjs.sendForm('service_2x833qv', 'template_g2f4yqb', form).then(
        (response) => {
            console.log("SUCCESS ", response.status, response.text);
            responseSuccess.classList.toggle('active');
            success_box.classList.toggle('animate-pop-nodelay');
        }, 
        (error) => {
            console.log("Failure...", error);
            responseFail.classList.toggle('active');
            fail_box.classList.toggle('animate-pop-nodelay');
        }
    );
    form.reset();
})




//animations

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

//nav buttons
const nav_abt = document.querySelector('.nav-about');
const nav_wrk = document.querySelector('.nav-work');
const nav_art = document.querySelector('.nav-art');
const nav_tct = document.querySelector('.nav-contact');

//headers
const abt_header = document.querySelector('.pfp');
const wrk_header = document.querySelector('.work-header');
const art_header = document.querySelector('.art-header');
const tct_header = document.querySelector('.contact-header');

//whole sections
const about_sect = document.querySelector('#about');
const work_sect = document.querySelector('#work');
const art_sect = document.querySelector('#art');
const contact_sect = document.querySelector('#contact');

//buffers
var isClickableAbout = true
var isClickableWork = true
var isClickableArt = true
var isClickableContact = true


nav_abt.addEventListener('click', async() => {
    if(isClickableAbout){
        isClickableAbout = false
        about_sect.classList.toggle('animate-regular');
        abt_header.classList.toggle('animate-delay');
        await sleep(1200);
        about_sect.classList.toggle('animate-regular');
        abt_header.classList.toggle('animate-delay');
        isClickableAbout = true
    }
    

});

nav_wrk.addEventListener('click', async() => {
    if(isClickableWork){
        isClickableWork = false
        work_sect.classList.toggle('animate-regular');
        wrk_header.classList.toggle('animate-delay');
        await sleep(1200);
        work_sect.classList.toggle('animate-regular');
        wrk_header.classList.toggle('animate-delay');
        isClickableWork = true
    }

});

nav_art.addEventListener('click', async() => {
    if(isClickableArt){
        isClickableArt = false
        art_sect.classList.toggle('animate-regular');
        art_header.classList.toggle('animate-delay');
        await sleep(1200);
        art_sect.classList.toggle('animate-regular');
        art_header.classList.toggle('animate-delay');
        isClickableArt = true
    }
    
});

nav_tct.addEventListener('click', async() => {
    if(isClickableContact){
        isClickableContact = false
        contact_sect.classList.toggle('animate-regular');
        tct_header.classList.toggle('animate-delay');
        await sleep(1200);
        contact_sect.classList.toggle('animate-regular');
        tct_header.classList.toggle('animate-delay');
        isClickableContact = true
    }
    
});

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