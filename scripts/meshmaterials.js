import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
//import { Pane } from "tweakpane";

// initialize the pane
//const pane = new Pane();

// initialize the scene
const scene = new THREE.Scene();

// initialize the geo
const geometry = new THREE.BoxGeometry(1,1,1);

// initialize the mat
const material = new THREE.MeshBasicMaterial();

//puedo declarar las propiedades del material DESPUÉS
material.color = new THREE.Color('limeGreen');
material.transparent = true;
material.opacity = 0.1;

// initialize the mesh
const mesh = new THREE.Mesh(geometry, material);
const mesh2 = new THREE.Mesh(geometry, material);
mesh2.position.x = 2;
scene.add(mesh);
scene.add(mesh2);

// initialize the camera
const camera = new THREE.PerspectiveCamera(
    35,
    window.innerWidth / window.innerHeight,
    0.1,
    200
);
camera.position.z = 5;

// initialize the renderer
const canvas = document.querySelector("canvas.materials");
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

window.addEventListener('resize', () => {
  console.log('resized');
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight)

})

// initialize the controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true;
controls.autoRotate = true;

// initialize the clock
const clock = new THREE.Clock();
let previousTime = 0;

// renderloop es la función para que pueda funcionar el OrbitControls, lo que hace es actualizar frame a frame (gracias al request animation frame lo hace al framerate del window)
// con el renderer.render se renderiza la pantalla dentro del loop
const renderloop = () => {
  const currentTime = clock.getElapsedTime();
  const delta = currentTime - previousTime;
  previousTime = currentTime;

  mesh.rotation.y += THREE.MathUtils.degToRad(1) * delta * 20;

  // al ponerle damping y autorotate, necesita la siguiente funcion:
  controls.update();
  renderer.render(scene, camera)
  window.requestAnimationFrame(renderloop)
} 

renderloop()