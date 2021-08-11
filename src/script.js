import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'


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
        this._renderer.setClearColor('#262837')
        this._renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
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
        // let light = new THREE.DirectionalLight(0xffffff, 1.0)
        // light.position.set(20, 100, 10)
        // light.target.position.set(0, 0, 0)
        // light.castShadow = true
        // light.shadow.bias = -0.001
        // light.shadow.mapSize.width = 2048
        // light.shadow.mapSize.height = 2048
        // light.shadow.camera.near = 0.1
        // light.shadow.camera.far = 500.0
        // light.shadow.camera.near = 0.5
        // light.shadow.camera.far = 500.0
        // light.shadow.camera.left = 100
        // light.shadow.camera.right = -100
        // light.shadow.camera.top = 100
        // light.shadow.camera.bottom = -100
        // this._scene.add(light)

        // light = new THREE.AmbientLight(0x101010)
        // this._scene.add(light)

        /**
        * Lights
        */

        // Ambient light
        const ambientLight = new THREE.AmbientLight('#b9c5ff', 0.12)
        // gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001)
        this._scene.add(ambientLight)

        // Directional light
        const moonLight = new THREE.DirectionalLight('#b9c5ff', 0.12)
        moonLight.position.set(4, 5, -2)
        // gui.add(moonLight, 'intensity').min(0).max(1).step(0.001)
        // gui.add(moonLight.position, 'x').min(- 5).max(5).step(0.001)
        // gui.add(moonLight.position, 'y').min(- 5).max(5).step(0.001)
        // gui.add(moonLight.position, 'z').min(- 5).max(5).step(0.001)
        this._scene.add(moonLight)

        const doorLight = new THREE.PointLight('#ff7d46', 1, 7)
        doorLight.position.set(0, 2.2, 2.7)
        this._scene.add(doorLight)


        /**
         * Camera
         */
        const fov = 30;
        const aspect = 1920 / 1080
        const near = 1.0
        const far = 3000.0

        this._camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
        this._camera.position.set(0, 18, 25);

        // Helper
        const axesHelper = new THREE.AxesHelper(5);
        this._scene.add(axesHelper)


        /**
         * Controls
         */
        // Controls
        const controls = new OrbitControls(this._camera, this._canvas)
        controls.enableDamping = true

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
        // this._scene.background = new THREE.Color('#0A97DD')

        /**
         * Objects
         */
        // Floor
        const floor = new THREE.Mesh(
            new THREE.PlaneGeometry(30, 30),
            new THREE.MeshStandardMaterial({
                color: '#000fff',
                side: THREE.DoubleSide,
            })
        )
        floor.castShadow = false
        floor.receiveShadow = true
        floor.rotation.x = Math.PI / 2
        this._scene.add(floor)

        /**
         * Models
         */
        const gundam = '/models/gundam-tai/scene.gltf'
        const sasuke = '/models/sasuke-uchiha/scene.gltf'

        const _CHARACTER_MODELS = {
            warrior: {
                base: 'mariaJuana.fbx',
                path: '/models/warrior/',
                animations: {
                    // idle: 'idle.fbx',
                    // walk: 'walk.fbx',
                    // run: 'run.fbx',
                    fastRun: 'fastRun.fbx',
                    // dance: 'dance.fbx',
                },
                // nameOffset: 25,
            },
            // shaman: {
            //     base: 'castle_guard_01.fbx',
            //     path: './resources/characters/guard/',
            //     animations: {
            //         idle: 'Sword And Shield Idle.fbx',
            //         walk: 'Sword And Shield Walk.fbx',
            //         run: 'Sword And Shield Run.fbx',
            //         dance: 'Macarena Dance.fbx',
            //     },
            //     nameOffset: 20,
            // }
        }

        // Animation Mixer
        this._mixers = [];
        this._previousRAF = null;
        let time = Date.now()


        this._LoadFBXModel()
        this._Controller()
        this._RAF()
    }
    _Controller() {
        // Controller
        document.addEventListener('keydown', (event) => {
            // console.log('pressingkeys..')                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
            switch (event.key) {
                case 'w':
                    // Do something for "down arrow" key press.
                    console.log('Pressing W')
                    this._LoadGLTFModel()
                    break;
                case 'a': // a
                    // this._move.left = true;
                    console.log('Pressing A')
                    break;
                case 's': // s
                    // this._move.backward = true;
                    console.log('Pressing S')
                    break;
                case 'd': // d
                    console.log('Pressing D')
                    // this._move.right = true;
                    break;


                // ! spacebar key not working!
                case 'Space': // Space
                    if (event.keycode == 32) {
                        // this._keys.shift = true;
                        console.log('TO SPACE AND BEYOND!!');
                    }
                    break;
                case 'Shift': // SHIFT
                    // this._keys.shift = true;
                    console.log('SHIFTING TO ANOTHER DIMENSION');
                    console.log(this._mixers);
                    break;



                case "Up": // IE/Edge specific value
                case "ArrowUp":
                    // Do something for "up arrow" key press.
                    console.log('Pressing ⬆️')
                    break;
                case "Down": // IE/Edge specific value
                case "ArrowDown":
                    // Do something for "down arrow" key press.
                    console.log('Pressing ⬇️')
                    break;
                case "Left": // IE/Edge specific value
                case "ArrowLeft":
                    console.log('Pressing ⬅️')
                    // Do something for "left arrow" key press.
                    break;
                case "Right": // IE/Edge specific value
                case "ArrowRight":
                    console.log('Pressing ➡️')
                    // Do something for "right arrow" key press.
                    break;


                case "Enter":
                    console.log('ENTER ThePromisedLAN..')
                    console.log(this._scene)
                    // Do something for "enter" or "return" key press.
                    break;
                case "Esc": // IE/Edge specific value
                case "Escape":
                    console.log('ESCAPING REALITY..')
                    this._scene.remove(this._scene.children[this._scene.children.length - 1])
                    // Do something for "esc" key press.
                    break;
            }
        }, false)

        // window.onkeypress = function (event) {
        //     if (event.which == 32) {
        //         console.log('TO SPACE!!')
        //     }
        // }

    }

    _LoadGLTFModel() {
        const sasuke = '/models/sasuke-uchiha/scene.gltf'

        // Instantiate a loader
        const loader = new GLTFLoader()
        // Load a glTF resource
        loader.load(
            // resource URL
            sasuke,
            // called when the resource is loaded
            (gltf) => {
                let model = gltf.scene
                model.scale.set(1.5, 1.5, 1.5)
                this._mixer = new THREE.AnimationMixer(model)
                const action = this._mixer.clipAction(gltf.animations[0])
                action.play()

                // position
                model.position.y = 0.01 // green
                model.position.x = 10 // red
                model.position.z = 10 // blue

                this._scene.add(model)
                this._mixers.push(this._mixer)


                gltf.scene  // THREE.Group
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

    _LoadFBXModel() {
        const loader = new FBXLoader();
        // const modelData = this._CHARACTER_MODELS
        // console.log(this._CHARACTER_MODELS)
        loader.setPath('/models/warrior/');
        loader.load('mariaJuana.fbx', (fbx) => {
            fbx.scale.setScalar(0.012)
            console.log('fbx loader:');
            console.log(fbx);

            const model = fbx
            model.position.y = 0 // green
            model.position.x = 0 // red
            model.position.z = -3 // blue

            // const params = {
            //     target: fbx,
            //     camera: camera,
            // }
            // this._controls = new BasicCharacterControls(params);

            const anim = new FBXLoader();
            anim.setPath('/models/warrior/');
            anim.load('fastRun.fbx', (anim) => {
                const m = new THREE.AnimationMixer(fbx);
                this._mixers.push(m);
                const fastRun = m.clipAction(anim.animations[0]);
                fastRun.play();
            });

            this._scene.add(model);
        },
            // called while loading is progressing
            function (xhr) {
                console.log((xhr.loaded / xhr.total * 100) + '% fbx loaded')
            },
            // called when loading has errors
            function (error) {
                console.log('An error happened with FBX loader')

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
