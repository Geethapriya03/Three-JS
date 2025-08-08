console.log('textures')
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import * as THREE from 'three'

//canvas
const canvas = document.querySelector('canvas.webgl')

//scene
const scene = new THREE.Scene()

//texture
// const image = new Image()
// const texture = new THREE.Texture(image)
// texture.colorSpace = THREE.SRGBColorSpace
// image.addEventListener('load',()=>{
//     texture.needsUpdate = true
// })
// image.src = '../textures/door/color.jpg'


const loadingManager = new THREE.LoadingManager()
loadingManager.onStart = () =>{
    console.log('onStart')
}

loadingManager.onLoad = () =>{
    console.log('onLoad')
}

loadingManager.onProgress = () =>{
    console.log('onProgress')
}

loadingManager.onError = () =>{
    console.log('onError')
}
const textureLoader = new THREE.TextureLoader(loadingManager)
const texture = textureLoader.load('../textures/door/color.jpg')


const colorTexture = textureLoader.load('/textures/door/color.jpg')
colorTexture.colorSpace = THREE.SRGBColorSpace
colorTexture.repeat.x = 2
colorTexture.repeat.y = 3
colorTexture.wrapS = THREE.MirroredRepeatWrapping
colorTexture.wrapT = THREE.MirroredRepeatWrapping
colorTexture.offset.x = 0.5
colorTexture.offset.y = 0.5
colorTexture.rotation = Math.PI * 0.25
const alphaTexture = textureLoader.load('/textures/door/alpha.jpg')
const heightTexture = textureLoader.load('/textures/door/height.jpg')
const normalTexture = textureLoader.load('/textures/door/normal.jpg')
const ambientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
const metalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
const roughnessTexture = textureLoader.load('/textures/door/roughness.jpg')

//object
const geometry = new THREE.BoxGeometry(1,1)
const material = new THREE.MeshBasicMaterial({map: colorTexture})

const mesh = new THREE.Mesh(geometry,material)
scene.add(mesh)

//sizes
const sizes = {
    height: window.innerHeight,
    width: window.innerWidth
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
const camera = new THREE.PerspectiveCamera(75,sizes.width / sizes.height)
camera.position.z = 2

//controls
const controls= new OrbitControls(camera,canvas)
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