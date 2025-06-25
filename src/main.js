import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
//import { Renderer } from 'three/webgpu';
// initialize the scene
const scene = new THREE.Scene();

// add objects to the scene

const cubeGeometry = new THREE.BoxGeometry(1,1,1);
const cubeMaterial = new THREE.MeshBasicMaterial({color: "red"});
const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);
scene.add(cubeMesh);

// creating custom geometry (si al const cubeMesh le meto la info del const geometry, puedo hacer que se genere eso en lugar del cubo)
const geometry = new THREE.BufferGeometry();
const vertices = new Float32Array([0, 0, 0, 0, 2, 0, 2, 0, 0]);
const bufferAtribute = new THREE.BufferAttribute(vertices, 3);
geometry.setAttribute('position', bufferAtribute);


// initialize camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  200
)

// camera transforms
camera.position.z = 5;
camera.position.x = 0;

// aspect ratio
const aspectRatio = window.innerWidth / window.innerHeight;



// initialize renderer
const canvas = document.querySelector('canvas.threejs')
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
})
// llamamos a esta funcion en el bucle para que se adapte en cada frame
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// initialize the controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true;
controls.autoRotate = true;

window.addEventListener('resize', () => {
  console.log('resized');
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight)

})

// initialize the clock
const clock = new THREE.Clock();
let previousTime = 0;

// renderloop es la función para que pueda funcionar el OrbitControls, lo que hace es actualizar frame a frame (gracias al request animation frame lo hace al framerate del window)
// con el renderer.render se renderiza la pantalla dentro del loop
const renderloop = () => {
  const currentTime = clock.getElapsedTime();
  const delta = currentTime - previousTime;
  previousTime = currentTime;

  cubeMesh.rotation.y += THREE.MathUtils.degToRad(1) * delta * 20;

  // al ponerle damping y autorotate, necesita la siguiente funcion:
  controls.update();
  renderer.render(scene, camera)
  window.requestAnimationFrame(renderloop)
} 

renderloop()