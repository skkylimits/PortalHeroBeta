import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

class PortalHero {
    constructor() {
        this._Initialize()
    }

    _Initialize() {
        /**
         * Base
         */

        // Canvas
        this._canvas = document.querySelector("canvas.webgl")

        // Scene
        this._scene = new THREE.Scene()

        // Clock
        this._clock = new THREE.Clock();

        /**
         * Renderer
         */
        this._renderer = new THREE.WebGLRenderer({
            anialias: true,
            canvas: this._canvas,
        })
        this._renderer.shadowMap.enabled = true
        this._renderer.shadowMap.type = THREE.PCFSoftShadowMap
        this._renderer.setPixelRatio(window.devicePixelRatio)
        this._renderer.setSize(window.innerWidth, window.innerHeight)

        /**
         * Window resizes
         */
        window.addEventListener("resize", () => {
            this._OnWindowResize()
        },
            false
        )

        /**
         * Light
         */
        let light = new THREE.DirectionalLight(0xffffff, 1.0)
        light.position.set(20, 100, 10)
        light.target.position.set(0, 0, 0)
        light.castShadow = true
        light.shadow.bias = -0.001
        light.shadow.mapSize.width = 2048
        light.shadow.mapSize.height = 2048
        light.shadow.camera.near = 0.1
        light.shadow.camera.far = 500.0
        light.shadow.camera.near = 0.5
        light.shadow.camera.far = 500.0
        light.shadow.camera.left = 100
        light.shadow.camera.right = -100
        light.shadow.camera.top = 100
        light.shadow.camera.bottom = -100
        this._scene.add(light)

        light = new THREE.AmbientLight(0x101010)
        this._scene.add(light)

        /**
         * Camera
         */
        const fov = 60;
        const aspect = 1920 / 1080
        const near = 1.0
        const far = 1000.0
        this._camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
        this._camera.position.set(75, 50, 0) // xyz


        /**
         * Controls
         */
        const controls = new OrbitControls(this._camera, this._canvas)
        controls.target.set(0, 20, 0)
        controls.update()

        /**
         * Background Textures
         */
        // const cubeTextureLoader = new THREE.CubeTextureLoader()
        // const environmentTexture = cubeTextureLoader.load([
        //   "/textures/cubeMaps/px.png",
        //   "/textures/cubeMaps/nx.png",
        //   "/textures/cubeMaps/py.png",
        //   "/textures/cubeMaps/ny.png",
        //   "/textures/cubeMaps/pz.png",
        //   "/textures/cubeMaps/nz.png",
        // ])
        // this._scene.background = environmentTexture;
        this._scene.background = new THREE.Color('#0A97DD')

        /**
         * Objects
         */
        // Floor
        const floor = new THREE.Mesh(
            new THREE.PlaneGeometry(100, 100, 10, 10),
            new THREE.MeshStandardMaterial({
                color: 0xffffff,
                side: THREE.DoubleSide,
            })
        )
        floor.castShadow = false
        floor.receiveShadow = true
        floor.rotation.x = Math.PI / 2
        this._scene.add(floor)

        // Animation Mixer
        this._mixers = [];
        this._previousRAF = null;
        let time = Date.now()

        this._Donkey()
        this._LoadModel()
        this._RAF()
    }
    _Donkey() {
        console.log('im a donkey')
        console.log("Yes indeed")
    }

    _LoadModel() {
        // Instantiate a loader
        const loader = new GLTFLoader()
        // Load a glTF resource
        loader.load(
            // resource URL
            '/resources/models/sasuke-uchiha/scene.gltf',
            // called when the resource is loaded
            (gltf) => {
                let model = gltf.scene
                this._mixer = new THREE.AnimationMixer(model)
                const action = this._mixer.clipAction(gltf.animations[0])
                action.play()

                this._scene.add(model)
                this._mixers.push(this._mixer)

                gltf.scene.scale.x = 9
                gltf.scene.scale.y = 9
                gltf.scene.scale.z = 9 // THREE.Group
                gltf.scenes // Array<THREE.Group>
                gltf.camera // Array<THREE.Camera>
                gltf.asset // Object
            },
            // called while loading is progressing
            function (xhr) {
                console.log((xhr.loaded / xhr.total * 100) + '% loaded')

            },
            // called when loading has errors
            function (error) {
                console.log('An error happened with GLTF loader')

            })
    }

    _OnWindowResize() {
        // Update camera
        this._camera.aspect = window.innerWidth / window.innerHeight
        this._camera.updateProjectionMatrix();

        // Update renderer
        this._renderer.setSize(window.innerWidth, window.innerHeight)
        this._renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    }

    _RAF() {
        // console.log(deltaTimeV2);
        requestAnimationFrame(() => {
            // Time 
            const currentTime = Date.now()
            const deltaTimeV2 = currentTime - this.time
            this.time = currentTime

            // Animate models
            for (const mixer of this._mixers) {
                mixer.update(deltaTimeV2 * 0.001);
            }

            // Call RAF on every next frame
            this._RAF();

            this._renderer.render(this._scene, this._camera);
        });
    }
}


let _APP = null

window.addEventListener("DOMContentLoaded", () => {
    _APP = new PortalHero()
})
