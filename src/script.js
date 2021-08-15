import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'


class CharacterController {
    constructor(params) {
        console.log('%c Character is now controllable..', 'font-size: 18px');
        this._params = params
        console.log(console.log(this._params));
        this._input = new CharacterControllerInput()
    }
}

class CharacterControllerInput {
    constructor() {
        this._Init();
        console.log('inside controller input');
    }

    _Init() {
        this._keys = {
            forward: false,
            backward: false,
            left: false,
            right: false,
            space: false,
            shift: false,
        };
        document.addEventListener('keydown', (e) => this._onKeyDown(e), false);
        document.addEventListener('keyup', (e) => this._onKeyUp(e), false);
    }

    _onKeyDown(event) {
        switch (event.keyCode) {
            case 87: // w
                // this._keys.forward = true;
                console.log('pressing W..');
                break;
            case 65: // a
                // this._keys.left = true;
                console.log('pressing A..');
                break;
            case 83: // s
                // this._keys.backward = true;
                console.log('pressing S..');
                break;
            case 68: // d
                // this._keys.right = true;
                console.log('pressing D..');
                break;


            case 32: // SPACE
                console.log('OFF TOOOO SPAAACE! 🚀🚀🚀');
                break;
            case 16: // SHIFT
                console.log('SHIFTING TO ANOTHER DIMENSION 👽👽👽');
                // this._keys.shift = true;
                break;


            case 13:
                console.log('ENTER ThePromisedLAN..')
                console.log(this);
                // console.log(this._scene)
                break;
            case 27:
                console.log('ESCAPING REALITY 😷😷😷')
                // this._scene.remove(this._scene.children[this._scene.children.length - 1])
                break;
        }
    }

    _onKeyUp(event) {
        switch (event.keyCode) {
            case 87: // w
                // this._keys.forward = true;
                console.log('%c releasing W..', "color: orange");
                break;
            case 65: // a
                // this._keys.left = true;
                console.log('%c releasing A..', "color: orange");
                break;
            case 83: // s
                // this._keys.backward = true;
                console.log('%c releasing S..', "color: orange");
                break;
            case 68: // d
                // this._keys.right = true;
                console.log('%c releasing D..', "color: orange");
                break;


            case 32: // SPACE
                console.log('%c BACK FROM SPAAACE! 🚀🚀🚀', "color: orange");
                break;
            case 16: // SHIFT
                console.log('%c UNSHIFTING TO ANOTHER DIMENSION 👽👽👽', "color: orange");
                // this._keys.shift = true;
                break;


            case 13:
                console.log('%c losing the ThePromisedLAN..', "color: orange")
                console.log(this);
                // console.log(this._scene)
                break;
            case 27:
                console.log('%c UNSTUCKING THE MATRIX 😷😷😷', "color: orange")
                // this._scene.remove(this._scene.children[this._scene.children.length - 1])
                break;
        }
    }
}

class PortalHero {
    constructor() {
        this._Initialize()
    }

    _Initialize() {
        console.log('%c Initializing PortalHero..', 'font-size: 18px')

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
        const _CHARACTER_MODELS = {
            warrior: {
                base: 'mariaJuana.fbx',
                path: '/models/warrior/',
                animations: {
                    // idle: 'idle.fbx',
                    // walk: 'walk.fbx',
                    // run: 'run.fbx',
                    fastRun: 'drawAGreatAsword.fbx',
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

        // Animation
        this._previousRAF = null;
        let time = Date.now()

        // Animation Mixer
        this._mixers = [];

        /**
         * The Magic Happens HERE
         */
        this._LoadFBXModel()
        this._RAF()
    }

    _LoadGLTFModel(modelFile) {
        const sasuke = '/models/sasuke-uchiha/scene.gltf'
        const gundam = '/models/gundam-tai/scene.gltf'

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
        console.log('%c loading FBX Models ..', 'color: green; font-size: 18px')
        const loader = new FBXLoader();
        // const modelData = this._CHARACTER_MODELS
        // console.log(this._CHARACTER_MODELS)
        loader.setPath('/models/warrior/');
        loader.load('mariaJuana.fbx', (fbx) => {
            fbx.scale.setScalar(0.012)
            console.log(fbx);

            const model = fbx
            model.position.y = 0 // green
            model.position.x = 0 // red
            model.position.z = -6 // blue

            const anim = new FBXLoader();
            anim.setPath('/models/warrior/');
            anim.load('greatSwordIdle.fbx', (anim) => {
                const m = new THREE.AnimationMixer(fbx);
                this._mixers.push(m);
                const fastRun = m.clipAction(anim.animations[0]);
                fastRun.play();
            });

            this._scene.add(model);

            // Addin Character controls
            console.log('%c Character Controller Activated..', 'font-size: 18px')
            const params = {
                camera: this._camera,
                scene: this._scene,
            }
            this._controller = new CharacterController(params)
        },
            // called while loading is progressing
            function (xhr) {
                console.log((xhr.loaded / xhr.total * 100) + '% fbx loaded..')
            },
            // called when loading has errors
            function (error) {
                console.log('%c An error happened with FBX loader', 'color: red;font-size: 13px')

            })
    }

    _OnWindowResize() {
        console.log('%c window resizing..', 'font-size: 18px');
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
    console.log('%c loading DOM content ..', 'font-size:21px')
    _APP = new PortalHero()
})
