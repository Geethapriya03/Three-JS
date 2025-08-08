console.log('materials')
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'

//canvas
const canvas = document.querySelector('canvas.webgl')

//scene
const scene = new THREE.Scene()

//Environment map
const rgbeLoader = new RGBELoader()
rgbeLoader.load('../textures/environmentMap/2k.hdr', (environmentMap) => {
    environmentMap.mapping = THREE.EquirectangularReflectionMapping
    scene.background = environmentMap
    scene.environment = environmentMap
})

//Textures
const textureLoader = new THREE.TextureLoader()

const doorColorTexture = textureLoader.load('../textures/door/color.jpg')
const doorAlphaTexture = textureLoader.load('../textures/door/alpha.jpg')
const doorAmbientOcclusionTexture = textureLoader.load('../textures/door/ambientOcclusion.jpg')
const doorHeightTexture = textureLoader.load('../textures/door/height.jpg')
const doorNormalTexture = textureLoader.load('../textures/door/normal.jpg')
const doorMetalnessTexture = textureLoader.load('../textures/door/metalness.jpg')
const doorRoughnessTexture = textureLoader.load('../textures/door/roughness.jpg')
const matcapTexture = textureLoader.load('../textures/matcaps/1.png')
const gradientTexture = textureLoader.load('../textures/gradients/3.jpg')

doorColorTexture.colorSpace = THREE.SRGBColorSpace
matcapTexture.colorSpace = THREE.SRGBColorSpace

//object
const basicmaterial = new THREE.MeshBasicMaterial({ map: doorColorTexture, color: 0xff0000, transparent: true, opacity: 0.5 })
const matcapmaterial = new THREE.MeshMatcapMaterial({ matcap: matcapTexture })
const normalmaterial = new THREE.MeshNormalMaterial({ flatShading: true })
const depthmaterial = new THREE.MeshDepthMaterial()
const lambertmaterial = new THREE.MeshLambertMaterial()
const phongmaterial = new THREE.MeshPhongMaterial({ shininess: 100, specular: 0xff0000 })
const toonmaterial = new THREE.MeshPhongMaterial()
gradientTexture.minFilter = THREE.NearestFilter
gradientTexture.magFilter = THREE.NearestFilter
toonmaterial.gradientMap = gradientTexture
const standardmaterial = new THREE.MeshStandardMaterial({ map: doorColorTexture, aoMap: doorAmbientOcclusionTexture, aoMapIntensity: 1, displacementMap: doorHeightTexture , displacementScale: 0.5})
const physicalMaterial = new THREE.MeshPhysicalMaterial({
    map: doorColorTexture,
    metalness: 0,
    roughness: 0,
    aoMap: doorAmbientOcclusionTexture,
    clearcoat: 1,
    clearcoatRoughness: 0,
    sheen: 1,
    sheenRoughness: 0.25,
    iridescence: 1,
    iridescenceIOR: 1,
    transmission: 1,
    ior: 1.5,
    thickness: 0.5
})

//lights
const ambientLight = new THREE.AmbientLight(0xffffff, 1)
scene.add(ambientLight)

const pointLight = new THREE.PointLight(0xffffff, 30)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)

const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 16, 16), basicmaterial)
sphere.position.x = -1.2

const torus1 = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.2, 16, 32), matcapmaterial)

const torus2 = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.2, 16, 32), normalmaterial)
torus2.position.x = 1.2

// const sphere1 = new THREE.Mesh(new THREE.SphereGeometry(0.3,16,16),depthmaterial)
// sphere1.position.y = 1.2

const sphere2 = new THREE.Mesh(new THREE.SphereGeometry(0.5, 16, 16), lambertmaterial)
sphere2.position.y = 1.2

const torus3 = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.2, 16, 32), phongmaterial)
torus3.position.y = 1.2
torus3.position.x = -1.2

const plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), standardmaterial)
plane.position.y = 1.2
plane.position.x = 1.2

const plane2 = new THREE.Mesh(new THREE.PlaneGeometry(1,1),physicalMaterial)
plane2.position.y = - 1.2
scene.add(sphere, torus1, torus2, sphere2, torus3, plane,plane2)

//sizes
const sizes = {
    height: window.innerHeight,
    width: window.innerWidth
}

window.addEventListener('resize', () => {
    sizes.height = window.innerHeight
    sizes.width = window.innerWidth

    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

//camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

//controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

//renderer
const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

//clock
const clock = new THREE.Clock()

//animate
const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    sphere.rotation.y = 0.1 * elapsedTime
    sphere2.rotation.y = 0.1 * elapsedTime
    torus1.rotation.y = 0.1 * elapsedTime
    torus2.rotation.y = 0.1 * elapsedTime
    torus3.rotation.y = 0.1 * elapsedTime
    plane.rotation.y = 0.1 * elapsedTime

    sphere.rotation.x = - 0.15 * elapsedTime
    sphere2.rotation.x = - 0.15 * elapsedTime
    torus1.rotation.x = - 0.15 * elapsedTime
    torus2.rotation.x = - 0.15 * elapsedTime
    torus3.rotation.x = - 0.15 * elapsedTime
    plane.rotation.x = - 0.15 * elapsedTime

    controls.update()

    renderer.render(scene, camera)

    window.requestAnimationFrame(tick)
}
tick()