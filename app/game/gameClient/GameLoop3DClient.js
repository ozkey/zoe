let THREE = require('three');
let Stats = require('../../../node_modules/three/examples/js/libs/stats.min.js');
import {collisionDetect,collisionDetectGroup} from '../gameHelpers/collisionDetect';


export default class GameLoopClient {
    constructor(domContainer) {

        this.cameraLimit = 1000000000;
        this.skySpherer = 1000000000;
        this.fogLimit = 1000;

        let gui = require('../../../node_modules/three/examples/js/libs/dat.gui.min.js');
        let OrbitControls = require('./../gameHelpers/OrbitControls');
        let Detector = require('./../gameHelpers/Detector');

        this.destroyed = false; //to stop frame animation
        this.container = domContainer;

        this.stats;
        this.clock = new THREE.Clock();

        this.camera;
        this.scene;
        this.renderer;
        this.scene = new THREE.Scene();
        this.raycaster = new THREE.Raycaster();

        this.mouse = new THREE.Vector2();
        this.controls;
        this.INTERSECTED;

        this.group = new THREE.Group();
        this.mesh;
        this.objects=[];
        this.object;
        this.bulbLight;


        this.setupRenderer();
        this.setCamera();
        this.lights();
        this.statsBox();
        this.setupControls();
        window.addEventListener('resize', () => { this.onWindowResize(); }, false );

        //



        // ==================
        let cube = null;

        var materials = new THREE.MeshBasicMaterial( { color: 0xff00ff, wireframe: true, transparent: false, opacity: 1, side: THREE.DoubleSide } ) ;

         cube = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1 ),  materials );
        // object = new THREE.Mesh( new THREE.SphereGeometry( 1, 16, 16 ),  materials );
        cube.position.set( 0, 0, 0 );
        this.object = new THREE.Group();
        this.object.add(cube);
        this.object.position.set( 0, 1, 1.1 );
        this.scene.add( this.object );
        this.objects.push(this.object );

        var materials = new THREE.MeshBasicMaterial( { color: 0x0000ff, wireframe: true, transparent: true, opacity: 1, side: THREE.DoubleSide } ) ;
         cube = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1 ),  materials );
        // object = new THREE.Mesh( new THREE.SphereGeometry( 1, 16, 16 ),  materials );
        cube.position.set( 0, 0, 0 );
        this.object = new THREE.Group();
        this.object.add(cube);
        this.object.position.set( 0, 1, 0 );
        this.scene.add( this.object );
        //this.objects.push(this.object );

        /// ================================

        this.earth();
        this.mat();

        /// ================================

        this.setupSky();
        this.animateLocal();
    }

    setupSky() {
        var skyGeo = new THREE.SphereGeometry(this.skySpherer, 25, 25);
        var texture = THREE.ImageUtils.loadTexture(require('../../images/textures/eso_dark.jpg'));


        var material = new THREE.MeshPhongMaterial({
            map: texture,
        });

        var sky = new THREE.Mesh(skyGeo, material);
        sky.material.side = THREE.BackSide;
        this.scene.add(sky);
    }

    addObject(game3DObject){
        this.scene.add(game3DObject);
    }


    setupRenderer() {
        this.renderer = new THREE.WebGLRenderer({logarithmicDepthBuffer: true });
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);

        this.renderer.physicallyCorrectLights = true;
        this.renderer.gammaInput = true;
        this.renderer.gammaOutput = true;
        this.renderer.shadowMap.enabled = true;
        this.renderer.toneMapping = THREE.ReinhardToneMapping;

        this.container.appendChild(this.renderer.domElement);
    }

    render() {


        this.camera.lookAt( this.scene.position );
        this.camera.updateMatrixWorld();


        // find intersections
        this.raycaster.setFromCamera( this.mouse, this.camera );
//        var intersects = raycaster.intersectObjects( scene.children );
        var intersects = this.raycaster.intersectObjects( this.group.children, true );
        if ( intersects.length > 0 ) {
            if ( this.INTERSECTED != intersects[ 0 ].object ) {
                this.INTERSECTED = intersects[ 0 ].object;
                this.INTERSECTED.rotation.x += 0.5;
            }
        } else {

        }




        var time = Date.now() * 0.0005;
        var delta = this.clock.getDelta();
        this.bulbLight.position.y = Math.cos( time ) * 0.75 + 1.25;
        this.bulbLight.position.x = Math.sin( time ) * 0.75 + 1.25;

        this.renderer.render( this.scene, this.camera );
        this.stats.update();
    }

    mat() {


        var floorMat = new THREE.MeshStandardMaterial( {
            roughness: 0.8,
            color: 0xffffff,
            metalness: 0.2,
            bumpScale: 0.01,
            side: THREE.DoubleSide
        });
        var textureLoader = new THREE.TextureLoader();
        textureLoader.load(require('../../images/textures/hardwood2_diffuse.jpg'), function(map ) {
            map.wrapS = THREE.RepeatWrapping;
            map.wrapT = THREE.RepeatWrapping;
            map.anisotropy = 4;
            map.repeat.set( 1, 1 );
            floorMat.map = map;
            floorMat.needsUpdate = true;
        } );
        textureLoader.load(require('../../images/textures/hardwood2_bump.jpg'), function(map ) {
            map.wrapS = THREE.RepeatWrapping;
            map.wrapT = THREE.RepeatWrapping;
            map.anisotropy = 4;
            map.repeat.set( 1, 1 );
            floorMat.bumpMap = map;
            floorMat.needsUpdate = true;
        } );
        textureLoader.load(require('../../images/textures/hardwood2_roughness.jpg'), function(map ) {
            map.wrapS = THREE.RepeatWrapping;
            map.wrapT = THREE.RepeatWrapping;
            map.anisotropy = 4;
            map.repeat.set( 1, 1 );
            floorMat.roughnessMap = map;
            floorMat.needsUpdate = true;
        } );


        //x, y, z, w
        var map = [[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0]];

        var mapLength =map.length;
        var mapLengthHalf =map.length/2;


        var ballMat = new THREE.MeshStandardMaterial({
            roughness: 0,
            metalness: 0.0,
            color: 0xffffff
        });

        var textureLoader = new THREE.TextureLoader();
        textureLoader.load(require('../../images/textures/earth_atmos_2048.jpg'), function (map) {
            map.wrapS = THREE.RepeatWrapping;
            map.wrapT = THREE.RepeatWrapping;
            map.anisotropy = 4;
            map.repeat.set(1, 1);
            ballMat.map = map;
            ballMat.needsUpdate = true;
        });
        textureLoader.load(require('../../images/textures/earth_specular_2048.jpg'), function (map) {
            map.wrapS = THREE.RepeatWrapping;
            map.wrapT = THREE.RepeatWrapping;
            map.anisotropy = 4;
            map.repeat.set(1, 1);
            ballMat.roughnessMap = map;
            ballMat.needsUpdate = true;
        });

        var ballGeometry = new THREE.SphereGeometry(.1, 32, 32);



        for (var x = 0; x < map.length; x++) {
            for (var z = 0; z < map[x].length; z++) {

                var floorGeometry = new THREE.PlaneBufferGeometry( 1, 1 );
                var floorMesh = new THREE.Mesh( floorGeometry, floorMat );
                floorMesh.receiveShadow = true;
                floorMesh.rotation.x = -Math.PI / 2.0;
                floorMesh.position.set(x, 0, z);
//                floorMesh.position.set(x - mapLengthHalf, 0, z - mapLengthHalf);

                var ballMesh = new THREE.Mesh(ballGeometry, ballMat);
                ballMesh.position.set(0, 0, 0.15);
                ballMesh.castShadow = true;


                floorMesh.add(ballMesh);
//                parent.add( object );
                this.group.add( floorMesh );
            }
        }

        this.group.position.set(- mapLengthHalf, 0,  - mapLengthHalf);
        this.scene.add( this.group );

    }

    destroy(){
        this.destroyed = true;
    }
    animateLocal(){
        if (!this.destroyed) requestAnimationFrame( this.animateLocal.bind(this) );
        this.render();
        // console.log("render?");
    }
    animate(data) {
        // console.log("tick tock 2");
        this.object.rotation.x += 0.01;
        // this.object.y += 1;
        if (collisionDetectGroup(this.object, this.objects[0])){
        //      console.log("+")
        // }else{
        //      console.log("-")
        }
    }

    lights() {
        var bulbGeometry = new THREE.SphereGeometry(.05, 16, 8);
        this.bulbLight = new THREE.PointLight(0xffee88, 1, 100, 2);
        var bulbMat = new THREE.MeshStandardMaterial({
            emissive: 0xffffee,
            emissiveIntensity: 50,
            color: 0x000000
        });
        this.bulbLight.add(new THREE.Mesh(bulbGeometry, bulbMat));
        this.bulbLight.position.set(0, 0, 0);
        this.bulbLight.castShadow = true;
        this.scene.add(this.bulbLight);

        var light = new THREE.AmbientLight( 0x303030 ); // soft white light
        this.scene.add( light );


        // this.scene.fog = new THREE.Fog( 0x000000, 2 , this.fogLimit );
    }


    setCamera() {

        const NEAR = 1e-6;
        const  FAR = 1e27;
        const SCREEN_WIDTH = window.innerWidth;
        const SCREEN_HEIGHT = window.innerHeight;

        this.camera = new THREE.PerspectiveCamera( 50, SCREEN_WIDTH / SCREEN_HEIGHT, NEAR,  this.cameraLimit  );

        // this.camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 0.1,);
        this.camera.position.x = -4;
        this.camera.position.z = 4;
        this.camera.position.y = 3;
    }
    earth() {
        var ballMat = new THREE.MeshStandardMaterial({
            roughness: 0,
            metalness: 0.0,
            color: 0xffffff
        });

        var textureLoader = new THREE.TextureLoader();
        textureLoader.load(require('../../images/textures/earth_atmos_2048.jpg'), function (map) {
            map.wrapS = THREE.RepeatWrapping;
            map.wrapT = THREE.RepeatWrapping;
            map.anisotropy = 4;
            map.repeat.set(1, 1);
            ballMat.map = map;
            ballMat.needsUpdate = true;
        });
        textureLoader.load(require('../../images/textures/earth_specular_2048.jpg'), function (map) {
            map.wrapS = THREE.RepeatWrapping;
            map.wrapT = THREE.RepeatWrapping;
            map.anisotropy = 4;
            map.repeat.set(1, 1);
            ballMat.roughnessMap = map;
            ballMat.needsUpdate = true;
        });

        const earthRadius = 6371000;
        var ballGeometry = new THREE.SphereGeometry(earthRadius, 32, 32);
        var ballMesh = new THREE.Mesh(ballGeometry, ballMat);
        ballMesh.position.set(earthRadius*2, earthRadius , earthRadius*2);
        ballMesh.castShadow = true;
        this.scene.add(ballMesh);

    }

    statsBox() {
        this.stats = new Stats();
        this.container.appendChild(this.stats.dom);
    }
    setupControls() {
//        container.appendChild( renderer.domElement );
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.target.set(0, 0, 0);
        this.controls.update();

        document.addEventListener( 'mousemove', this.onDocumentMouseMove.bind(this), false );

    }

    onDocumentMouseMove( event ) {
        event.preventDefault();
        this.mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        this.mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    }




    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize( window.innerWidth, window.innerHeight );
    }
}


//
// GameLoopClient.propTypes = {
//     user: PropTypes.object,
//
// };