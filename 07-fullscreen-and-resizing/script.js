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
    renderer.setPixelRatio(Math.min(window.devicePixelRatio , 2))
})

window.addEventListener('dblclick',()=>{
    const fullscreenElement = document.fullscreenElement || document.webkitFullScreenElement

    if(!fullscreenElement){
        if(canvas.requestFullscreen){
            canvas.requestFullscreen()
        }else if(canvas.webkitRequestFullScreen){
            canvas.webkitRequestFullScreen()
        }
        
    }else{
        if(document.exitFullscreen){
        document.exitFullscreen()
        } else if(document.webkitExitFullscreen) {
            document.webkitExitFullscreen()
        }
    }
})

//camera
const camera = new THREE.PerspectiveCamera(75,sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

//controls
const controls  = new OrbitControls(camera,canvas)
controls.enableDamping = true

//renderer
const renderer = new THREE.WebGLRenderer({canvas})
renderer.setSize(sizes.width,sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio , 2))

//clock
const clock = new THREE.Clock()

//animate
const tick = () =>{
    const elapsedTime = clock.getElapsedTime()

    controls.update()

    renderer.render(scene,camera)

    window.requestAnimationFrame(tick)
}
tick()

