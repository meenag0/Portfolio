import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

// Canvas
const canvas = document.querySelector('canvas');

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(
70, // FOV - Field of view
  window.innerHeight / window.innerHeight, // Aspect Ratio
  0.001, // Near
  400 // Far
);
camera.position.z = 30; // Pull the camera back a bit, if not you cannot see
scene.add(camera);

// Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 2);
ambientLight.position.set(0, 0, 0);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 2);
pointLight.position.set(0, 0, 0);
scene.add(pointLight);

function handleScroll(event) {
  // Update controls based on scroll event
  controls.dollyIn(event.deltaY * 0.01); // Adjust the multiplier to control the sensitivity
}

// Add scroll event listener to the window
window.addEventListener('wheel', handleScroll);
// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true; // Set to true is used to give a sense of weight to the controls
controls.minDistance = 2; // Minimum distance the camera can zoom in
controls.maxDistance = 30;

// Particles
const particlesGeometry = new THREE.BufferGeometry(); // Geometry for the stars
const particlesCount = 7000; // number of particles to be created

const vertices = new Float32Array(particlesCount); // Float32Array is an array of 32-bit floats. This is used to represent an array of vertices. (we have 3 values for each vertex - coordinates x, y, z)

// Loop through all the vertices and set their random position
for (let i = 0; i < particlesCount; i++) {
  vertices[i] = (Math.random() - 0.5) * 90; // Adjust the range to make particles larger
}

particlesGeometry.setAttribute(
  'position',
  new THREE.BufferAttribute(vertices, 3) // 3 values for each vertex (x, y, z)
  // Check the documentation for more info about this.
);

// Texture
const textureLoader = new THREE.TextureLoader();
const particleTexture = textureLoader.load('/textures/particles/star.png'); // Add a texture to the particles

// Material
const particlesMaterial = new THREE.PointsMaterial({
  map: particleTexture, // Texture
  size: 0.5, // Size of the particles
  sizeAttenuation: true, // size of the particle will be smaller as it gets further away from the camera, and if it's closer to the camera, it will be bigger
});

const stars = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(stars);

// Import the planet Saturn 3D model
const gltfLoader = new GLTFLoader(); // Create a loader
gltfLoader.load('/scene.gltf', (gltf) => {
  console.log('success');
  console.log('SATURN HERE', gltf);

  const saturn = gltf.scene;
  saturn.position.set(0, 0, 0);
  saturn.scale.set(0.0014, 0.0014, 0.0014);

  scene.add(saturn);
});

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas, // canvas is the canvas element from the html
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // to avoid picelation on high resolution screenss

// Animate
const animate = () => {
  // Update the controls
  controls.update();

  // Rotate a bit the stars
  stars.rotation.y += -0.0001;

  renderer.render(scene, camera);

  window.requestAnimationFrame(animate);
};

animate();



document.addEventListener('DOMContentLoaded', function () {
  console.log("DOM content loaded");

  function AnimatedIntro() {
      // assuming traitsBox already exists in your HTML
      let traitsBox = document.querySelector("#traitsBox");
      console.log("traitsBox:", traitsBox); // Log the result of querySelector

      let words = traitsBox.querySelectorAll(".word");
      console.log("Words inside traitsBox:", words); // Log the elements with class '.word'
      let wordArray = [];
      words.forEach(function(word) {
          wordArray.push(word.innerHTML);
      });
      // traitsBox.innerHTML = ""; // Clearing the content of traitsBox
  
      // set timeout to initiate typewriter effect after a delay
      setTimeout(() => {
          // constructor function for the 'typewriter' effect
          let TxtTypeTraits = function (el, toAnimate, period) {
              this.toAnimate = toAnimate;
              this.el = el;
              this.loopNum = 0;
              this.period = parseInt(period, 10) || 2000;
              this.txt = '';
              this.tick();
              this.isDeleting = false;
          };
  
          // tick method for typewriter animation
          TxtTypeTraits.prototype.tick = function () {
              let i = this.loopNum % this.toAnimate.length;
              let fullTxt = this.toAnimate[i];
  
              if (this.isDeleting) {
                  this.txt = fullTxt.substring(0, this.txt.length - 1);
              } else {
                  this.txt = fullTxt.substring(0, this.txt.length + 1);
              }
  
              this.el.innerHTML = this.txt;
  
              let that = this;
              let delta = 300 - Math.random() * 20;
  
              if (this.isDeleting) {
                  delta /= 1.5;
              }
  
              if (!this.isDeleting && this.txt === fullTxt) {
                  delta = this.period;
                  this.isDeleting = true;
              } else if (this.isDeleting && this.txt === '') {
                  this.isDeleting = false;
                  this.loopNum++;
                  delta = 0;
              }
  
              setTimeout(function () {
                  that.tick();
              }, delta);
          };
  
          // create an instance of TxtTypeTraits with words array
          new TxtTypeTraits(traitsBox, wordArray, 200);
      }, 500);
  }
  

  // execute AnimatedIntro
  AnimatedIntro();


});