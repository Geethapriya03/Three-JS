console.log('transform objects')

import * as THREE from 'three'

//canvas
const canvas = document.querySelector('canvas.webgl')

//scene
const scene = new THREE.Scene()

//objects
// const geometry = new THREE.BoxGeometry(1,1,1)
// const material = new THREE.MeshBasicMaterial({color: 0xff0000})
// const mesh = new THREE.Mesh(geometry,material)

// mesh.position.x = 0.7
// mesh.position.y = -0.6
// mesh.position.z = 1

// mesh.position.set(0.7,-0.6,1)
// scene.add(mesh)

// console.log(mesh.position.length())
// console.log(mesh.position.normalize())

// mesh.scale.x = 2
// mesh.scale.y = 0.25
// mesh.scale.z = 0.5

// mesh.scale.set(2, 0.25,0.5)

// mesh.rotation.reorder('XYZ')
// mesh.rotation.x = Math.PI * .25
// mesh.rotation.y = Math.PI * .25


//Group Objects
const group = new THREE.Group()
group.scale.y = 2
group.rotation.y = 0.2
scene.add(group)

const geometry = new THREE.BoxGeometry(1,1,1)
const material = new THREE.MeshBasicMaterial({color: 0xff0000})

const cube1 = new THREE.Mesh(geometry,material)
cube1.position.x = -1.5
group.add(cube1)

const cube2 = new THREE.Mesh(geometry, material)
cube2.position.x = 0
group.add(cube2)

const cube3 = new THREE.Mesh(geometry,material)
cube3.position.x = 1.5
group.add(cube3)

//Axes Helper
const axesHelper = new THREE.AxesHelper(2)
scene.add(axesHelper)

//sizes
const sizes = {
    height: 600,
    width: 800
}

//camera
const camera = new THREE.PerspectiveCamera(75,sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

// camera.lookAt(new THREE.Vector3(0,0,0))
// camera.lookAt(mesh.position)

// console.log(mesh.position.distanceTo(camera.position))


//renderer
const renderer = new THREE.WebGLRenderer({canvas})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene,camera)