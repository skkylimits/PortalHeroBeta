import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import * as gui from 'dat.gui'


class PortalHero {
    constructor() {
        this._Initialize()
    }

    _Initialize() {
        console.log('%c Initializing Skeleton..', 'font-size: 18px')
        /**
        * Window resizes
        */
        this._sizes = {
            width: window.innerWidth,
            height: window.innerHeight,
        }
        window.addEventListener("resize", () => {
            this._OnWindowResize(this._sizes)
        },
            false
        )


        /**
         * Base
         */
        // Clock
        this._clock = new THREE.Clock();

        // Canvas
        this._canvas = document.querySelector("canvas.webgl")

        // Scene
        this._scene = new THREE.Scene()
        this._scene.background = new THREE.Color(0xa0a0a0);
        this._scene.fog = new THREE.Fog(0xa0a0a0, 1000, 5000);


        /**
        * Lights
        */
        let light = new THREE.HemisphereLight(0xffffff, 0x444444);
        light.position.set(0, 200, 0);
        this._scene.add(light);

        const shadowSize = 200;
        light = new THREE.DirectionalLight(0xffffff);
        light.position.set(0, 200, 100);
        light.castShadow = true;
        light.shadow.camera.top = shadowSize;
        light.shadow.camera.bottom = -shadowSize;
        light.shadow.camera.left = -shadowSize;
        light.shadow.camera.right = shadowSize;
        this._scene.add(light);
        this._sun = light;


        /**
         * Camera
         */
        const fov = 30;
        const aspect = 1920 / 1080
        const near = 1.0
        const far = 3000.0

        this._camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
        this._camera.position.set(112, 100, 600);

        // Helper
        const axesHelper = new THREE.AxesHelper(120);
        this._scene.add(axesHelper)


        /**
         * Orbit Controls
         */
        const controls = new OrbitControls(this._camera, this._canvas)
        controls.enableDamping = true


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
         * Objects
         */
        // Floor
        let floor = new THREE.Mesh(new THREE.PlaneBufferGeometry(10000, 10000), new THREE.MeshPhongMaterial({ color: 0x999999, depthWrite: false }));
        floor.rotation.x = - Math.PI / 2;
        floor.receiveShadow = true;
        this._scene.add(floor);

        // Grid
        let grid = new THREE.GridHelper(4000, 40, 0x000000, 0x000000);
        grid.material.opacity = 0.2;
        grid.material.transparent = true;
        this._scene.add(grid);


        /**
        * Models
        */


        /**
         * The Magic Happens HERE
         */
        this._RAF()
    }

    _OnWindowResize() {
        console.log('%c Window resizing..', 'font-size: 18px');
        // Update sizes
        this._sizes.width = window.innerWidth
        this._sizes.height = window.innerHeight

        // Update camera
        this._camera.aspect = this._sizes.width / this._sizes.height
        this._camera.updateProjectionMatrix()

        // Update renderer
        this._renderer.setSize(this._sizes.width, this._sizes.height)
        this._renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    }

    _RAF() {
        requestAnimationFrame(() => {
            // Call RAF on every next frame
            this._RAF();
            this._renderer.render(this._scene, this._camera);
        });
    }
}


let _APP = null

window.addEventListener("DOMContentLoaded", () => {
    console.log('%c loading DOM content..', 'font-size:21px')
    _APP = new PortalHero()
})
