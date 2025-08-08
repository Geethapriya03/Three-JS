console.log('Animations')

import * as THREE from 'three'
import gsap from 'gsap' 

//canvas
const canvas = document.querySelector('canvas.webgl')

//scene
const scene = new THREE.Scene()

//Object
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

//sizes
const sizes = {
    height: 600,
    width: 800
}

//camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

//renderer
const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(sizes.width, sizes.height)

// let time = Date.now()

//clock
const clock = new THREE.Clock()

gsap.to(mesh.position, {duration: 1, delay:1, x:2})
//animate 
const tick = () => {
    // const currentTime = Date.now()
    // const deltaTime = currentTime - time
    // time=currentTime

    const elapsedTime = clock.getElapsedTime()

    // mesh.position.x = Math.cos(elapsedTime)
    // mesh.position.y = Math.sin(elapsedTime)

    // mesh.rotation.y = elapsedTime
    // camera.lookAt(mesh.position)
    renderer.render(scene, camera)

    window.requestAnimationFrame(tick)
}
tick()