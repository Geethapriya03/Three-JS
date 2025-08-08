console.log('Cameras')

import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

//canvas
const canvas = document.querySelector('canvas.webgl')

//scene
const scene = new THREE.Scene()

//object
const geometry = new THREE.BoxGeometry(1,1,1)
const material = new THREE.MeshBasicMaterial({color: 0xff0000})
const mesh = new THREE.Mesh(geometry,material)

scene.add(mesh)

const cursor = {
    x:0,
    y:0
}

window.addEventListener('mousemove',(event)=>{
    cursor.x = event.clientX / sizes.width - 0.5
    cursor.y = - ( event.clientY / sizes.height - 0.5)
})

//sizes
const sizes = {
    height: 600,
    width: 800
}

//camera
// const aspectRatio = sizes.width / sizes.height 
const camera = new THREE.PerspectiveCamera(75,sizes.width / sizes.height)
// const camera = new THREE.OrthographicCamera(- 1 * aspectRatio, 1 * aspectRatio, 1, - 1, 0.1, 100)
camera.position.z = 3
camera.lookAt(mesh.position)
scene.add(camera)

//controls 
const controls = new OrbitControls(camera,canvas)
controls.enableDamping = true

//renderer
const renderer = new THREE.WebGLRenderer({canvas})
renderer.setSize(sizes.width, sizes.height)

//clock
const clock = new THREE.Clock()

//animation
const tick = () =>{
    const elapsedTime = clock.getElapsedTime()

    camera.position.x = Math.sin(cursor.x * Math.PI* 2) * 2
    camera.position.z = Math.cos (cursor.x * Math.PI * 2) *2
    camera.position.y = cursor.y * 3
    camera.lookAt(mesh.position)

    renderer.render(scene,camera)

    window.requestAnimationFrame(tick)

}
tick()