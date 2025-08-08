// console.log('Debugging UI')
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import * as THREE from 'three'
import GUI from 'lil-gui'
import gsap from 'gsap'
import { debug } from 'three/tsl'


//GUI
const gui = new GUI({
    title: 'Cube',
    closeFolders: true
})
gui.close()
// gui.hide()
const debugObject = {}

//canvas
const canvas = document.querySelector('canvas.webgl')

//scene
const scene = new THREE.Scene()

debugObject.color = '#33a6ea6'

//object
const geometry = new THREE.BoxGeometry(1,1)
const material = new THREE.MeshBasicMaterial({color: debugObject.color})
const mesh = new THREE.Mesh(geometry,material)
scene.add(mesh)

const cubeTweaks = gui.addFolder('cube controls')
// cubeTweaks.close()

cubeTweaks.add(mesh.position,'y',-3,3,0.01)
cubeTweaks
    .add(mesh.position,'y')
    .min(-3)
    .max(3)
    .step(0.01)
    .name('y-axis')


//We cannot add variables on the gui, Can only add object properties
const myObject = {
    myVariable : 123
}

cubeTweaks.add(myObject,'myVariable')

cubeTweaks.add(mesh,'visible')
cubeTweaks.add(material,'wireframe')
cubeTweaks
    .addColor(material,'color')
    .onChange(()=>{
        material.color.set(debugObject.color)
    })

debugObject.spin = () =>{
    gsap.to(mesh.rotation, { duration: 1, y: mesh.rotation.y + Math.PI * 2 })
}
cubeTweaks.add(debugObject,'spin')

debugObject.subdivision = 2
cubeTweaks
    .add(debugObject,'subdivision')
    .min(1)
    .max(20)
    .step(1)
    .onFinishChange(()=>{
        mesh.geometry.dispose()
        mesh.geometry = new THREE.BoxGeometry(1,1,1,debugObject.subdivision,debugObject.subdivision,debugObject.subdivision)
    })

//sizes
const sizes = {
    height: window.innerHeight,
    width: window.innerWidth
}

window.addEventListener('resize',()=>{
    sizes.height = window,innerHeight
    sizes.width = window.innerWidth

    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    renderer.setSize(sizes.width,sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))
})

//camera
const camera = new THREE.PerspectiveCamera(75,sizes.width / sizes.height)
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
const tick = () =>{
    const elapsedTime = clock.getElapsedTime()

    controls.update()

    renderer.render(scene,camera)

    window.requestAnimationFrame(tick)
}
tick()

