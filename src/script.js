import "./style.css";
import * as THREE from 'three';
import { OrbitControls } from "../node_modules/three/examples/jsm/controls/OrbitControls.js";

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

const scene = new THREE.Scene();

const material = new THREE.MeshBasicMaterial({});

const plane = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(1,1),
    material
);

const torus = new THREE.Mesh(
    new THREE.TorusBufferGeometry(0.3,0.2,10,20),
    material
);
torus.position.x = 1.5

scene.add(plane,torus);

const camera = new THREE.PerspectiveCamera(60,sizes.width/sizes.height,0.1,1000);
camera.position.x = 10
// renderer 
const renderer = new THREE.WebGLRenderer(
    {canvas: document.querySelector(".bg")}
);
renderer.setSize(sizes.width,sizes.height);

// controls 
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

//clock 
const clock = new THREE.Clock();

// handle resizing 
window.addEventListener('resize',() =>{
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
    camera.aspect = sizes.width/sizes.height;
    camera.updateProjectionMatrix();
    renderer.setSize(sizes.width,sizes.height);
});



function animate(){
    const elapsedtime = clock.getElapsedTime();

    torus.rotation.x = 0.5 * elapsedtime;
    torus.rotation.y = 0.5 * elapsedtime;

    plane.rotation.x = 0.5 * elapsedtime;
    plane.rotation.y = 0.5 * elapsedtime;   

    controls.update();
    renderer.render(scene,camera);
    window.requestAnimationFrame(animate);
}

animate();

