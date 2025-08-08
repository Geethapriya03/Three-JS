console.log('First Application')

import * as THREE from 'three'
//canvas
const canvas = document.querySelector('canvas.webgl')

//scene
const scene = new THREE.Scene()

//Object 1
const geometry = new THREE.BoxGeometry(1,1,1)

// While specifying depthWrite to false in the parent mesh, we can able to place child mesh over another mesh
const material = new THREE.MeshBasicMaterial({color: 0xff0000, depthWrite: false}) 
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

//Object 2
const sphereGeometry  = new THREE.SphereGeometry(0.5)
const material1 = new THREE.MeshBasicMaterial({color: 'white'})
const mesh1 = new THREE.Mesh(sphereGeometry, material1)
scene.add(mesh1)

//sizes
const sizes = {
    height: 600,
    width: 800
}

//camera
const camera = new THREE.PerspectiveCamera(75,sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

//renderer
const renderer = new THREE.WebGLRenderer({canvas})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene,camera)

//For placing scene over a scene
//renderer.clear()
//render.clearDepth()
//renderer.renderer(child_scene,child_camera)