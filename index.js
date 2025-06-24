import * as THREE from "./node_modules/three/build/three.module.js"

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, .1, 1000);
const canvas = document.querySelector('#background');
const renderer = new THREE.WebGLRenderer({antialias: true, canvas});
renderer.setSize(window.innerWidth, window.innerHeight);


const numStars = 400;
const stars = new Array(numStars);

const starSize = .4;
const loader = new THREE.TextureLoader();
const texture = loader.load("./star.png");
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.magFilter = THREE.NearestFilter;
texture.colorSpace = THREE.SRGBColorSpace;
texture.repeat.set(1, 1);
const starGeom = new THREE.PlaneGeometry(starSize, starSize);

const cameraPos = 5;
camera.position.z = cameraPos;

const mats = [
    new THREE.MeshBasicMaterial( {color: 0x00ff44, map: texture, side: THREE.DoubleSide} ),
    new THREE.MeshBasicMaterial( {color: 0x0000ff, map: texture, side: THREE.DoubleSide} ),
    new THREE.MeshBasicMaterial( {color: 0xff0015, map: texture, side: THREE.DoubleSide} ),
    new THREE.MeshBasicMaterial( {color: 0xffffff, map: texture, side: THREE.DoubleSide} ),
    new THREE.MeshBasicMaterial( {color: 0x00f2ff, map: texture, side: THREE.DoubleSide} ),
    new THREE.MeshBasicMaterial( {color: 0xff00ff, map: texture, side: THREE.DoubleSide} ),
    new THREE.MeshBasicMaterial( {color: 0xffee00, map: texture, side: THREE.DoubleSide} ) ];

const startingPlaneZ = -100;
const starSpread = 30;

for(let i = 0; i < numStars; i++){
    stars[i] = new THREE.Mesh(starGeom, mats[getRndInteger(0, 6)]);
    scene.add(stars[i]);

    stars[i].position.x = getRndInteger(-starSpread, starSpread);
    stars[i].position.y = getRndInteger(-starSpread, starSpread);
    stars[i].position.z = getRndInteger(startingPlaneZ, cameraPos);
}

window.addEventListener("resize", onWindowResize);

function onWindowResize() {
    camera.aspect = (window.innerWidth) / (window.innerHeight);
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

const starSpeed = .17

setInterval(twinkleStars, 150);

function animate() {
    renderer.render( scene, camera );
    for(let i = 0; i < numStars; i++){
        stars[i].position.z += starSpeed;
        if(stars[i].position.z >= cameraPos + 1) {
            stars[i].position.z = -100;
        }
    }
}
renderer.setAnimationLoop( animate );

function twinkleStars(){
    for(let i = 0; i < numStars; i++){
        stars[i].rotation.z += Math.PI / 2;
    }
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}