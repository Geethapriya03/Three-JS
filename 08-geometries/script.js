import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

//canvas
const canvas = document.querySelector('canvas.webgl')

//scene
const scene = new THREE.Scene()

//object
// const geometry = new THREE.BoxGeometry(1,1,1)

const geometry = new THREE.BufferGeometry()
const count = 50
const positionArray = new Float32Array(count * 3 * 3)
for(let i=0; i < count * 3 * 3;i++){
    positionArray[i] = (Math.random() - 0.5) * 4
}
const positionAttribute = new THREE.BufferAttribute(positionArray,3)
geometry.setAttribute('position',positionAttribute)
const material = new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: true})
const mesh = new THREE.Mesh(geometry,material)
scene.add(mesh)

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize',()=>{
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    renderer.setSize(sizes.width,sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))
})

//camera
const camera = new THREE.PerspectiveCamera(75, sizes.width/sizes.height)
camera.position.z = 3
scene.add(camera)

//controls
const controls = new OrbitControls(camera,canvas)
controls.enableDamping = true

//renderer
const renderer = new THREE.WebGLRenderer({canvas})
renderer.setSize(sizes.width,sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))

//clock
const clock = new THREE.Clock()

//animate
const tick = () => {
    const elapsedTime = clock.getElapsedTime()
    controls.update()
    renderer.render(scene,camera)
    window.requestAnimationFrame(tick)
}
tick()