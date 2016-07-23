


module.exports = clientGameLoop;
function clientGameLoop(container){


    var THREE = require('three');
    var Stats = require('../../node_modules/three/examples/js/libs/stats.min');
    var gui = require('../../node_modules/three/examples/js/libs/dat.gui.min');
    var OrbitControls = require('../gameHelpers/OrbitControls');
    var Detector = require('../gameHelpers/Detector');




    var camera, scene, renderer;

    var raycaster = new THREE.Raycaster();
    var mouse = new THREE.Vector2();
    var INTERSECTED;
    var group = new THREE.Group();

    var mesh, object , stats;
    var objects= [];
    var controls;
    var clock = new THREE.Clock();
    
    var bulbLight;

    init();
    animate();



    function setCamera() {
//        camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
//        camera.position.z = 40;

        camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 0.1, 100 );
        camera.position.x = -4;
        camera.position.z = 4;
        camera.position.y = 3;
    }

    function setup() {
        renderer = new THREE.WebGLRenderer();
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);


        renderer.physicallyCorrectLights = true;
        renderer.gammaInput = true;
        renderer.gammaOutput = true;
        renderer.shadowMap.enabled = true;
        renderer.toneMapping = THREE.ReinhardToneMapping;


        container.appendChild(renderer.domElement);
        scene = new THREE.Scene();
        window.addEventListener( 'resize', onWindowResize, false );

    }

    function lights() {
        var bulbGeometry = new THREE.SphereGeometry(.05, 16, 8);
        bulbLight = new THREE.PointLight(0xffee88, 1, 100, 2);
        var bulbMat = new THREE.MeshStandardMaterial({
            emissive: 0xffffee,
            emissiveIntensity: 50,
            color: 0x000000
        });
        bulbLight.add(new THREE.Mesh(bulbGeometry, bulbMat));
        bulbLight.position.set(0, 0, 0);
        bulbLight.castShadow = true;
        scene.add(bulbLight);

        var hemiLight = new THREE.HemisphereLight(0xddeeff, 0x0f0e0d, 0.045);
        scene.add(hemiLight);


//        scene.fog = new THREE.Fog( 0x050505, 10, 10 );
    }



    function mat() {


        var floorMat = new THREE.MeshStandardMaterial( {
            roughness: 0.8,
            color: 0xffffff,
            metalness: 0.2,
            bumpScale: 0.01,
            side: THREE.DoubleSide
        });
        var textureLoader = new THREE.TextureLoader();
        textureLoader.load(require('../images/textures/hardwood2_diffuse.jpg'), function( map ) {
            map.wrapS = THREE.RepeatWrapping;
            map.wrapT = THREE.RepeatWrapping;
            map.anisotropy = 4;
            map.repeat.set( 1, 1 );
            floorMat.map = map;
            floorMat.needsUpdate = true;
        } );
        textureLoader.load(require('../images/textures/hardwood2_bump.jpg'), function( map ) {
            map.wrapS = THREE.RepeatWrapping;
            map.wrapT = THREE.RepeatWrapping;
            map.anisotropy = 4;
            map.repeat.set( 1, 1 );
            floorMat.bumpMap = map;
            floorMat.needsUpdate = true;
        } );
        textureLoader.load(require('../images/textures/hardwood2_roughness.jpg'), function( map ) {
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
        textureLoader.load(require('../images/textures/earth_atmos_2048.jpg'), function (map) {
            map.wrapS = THREE.RepeatWrapping;
            map.wrapT = THREE.RepeatWrapping;
            map.anisotropy = 4;
            map.repeat.set(1, 1);
            ballMat.map = map;
            ballMat.needsUpdate = true;
        });
        textureLoader.load(require('../images/textures/earth_specular_2048.jpg'), function (map) {
            map.wrapS = THREE.RepeatWrapping;
            map.wrapT = THREE.RepeatWrapping;
            map.anisotropy = 4;
            map.repeat.set(1, 1);
            ballMat.roughnessMap = map;
            ballMat.needsUpdate = true;
        });

        var ballGeometry = new THREE.SphereGeometry(0.1213, 32, 32);



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
                group.add( floorMesh );
            }
        }


        group.position.set(- mapLengthHalf, 0,  - mapLengthHalf);

        scene.add( group );











    }
    function earth() {
        var ballMat = new THREE.MeshStandardMaterial({
            roughness: 0,
            metalness: 0.0,
            color: 0xffffff
        });

        var textureLoader = new THREE.TextureLoader();
        textureLoader.load(require('../images/textures/earth_atmos_2048.jpg'), function (map) {
            map.wrapS = THREE.RepeatWrapping;
            map.wrapT = THREE.RepeatWrapping;
            map.anisotropy = 4;
            map.repeat.set(1, 1);
            ballMat.map = map;
            ballMat.needsUpdate = true;
        });
        textureLoader.load(require('../images/textures/earth_specular_2048.jpg'), function (map) {
            map.wrapS = THREE.RepeatWrapping;
            map.wrapT = THREE.RepeatWrapping;
            map.anisotropy = 4;
            map.repeat.set(1, 1);
            ballMat.roughnessMap = map;
            ballMat.needsUpdate = true;
        });

        var ballGeometry = new THREE.SphereGeometry(0.1213, 32, 32);
        var ballMesh = new THREE.Mesh(ballGeometry, ballMat);
        ballMesh.position.set(1, 0.1213, 1);
        ballMesh.castShadow = true;
        scene.add(ballMesh);
    }
    function statsBox() {
        stats = new Stats();
        container.appendChild(stats.dom);
    }
    function controls() {
//        container.appendChild( renderer.domElement );
        controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.target.set(0, 0, 0);
        controls.update();



        document.addEventListener( 'mousemove', onDocumentMouseMove, false );

    }

    function onDocumentMouseMove( event ) {
        event.preventDefault();
        mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    }


    function collisionDetect(obj,collidableMeshList){

        // collision detection:
        //   determines if any of the rays from the cube's origin to each vertex
        //		intersects any face of a mesh in the array of target meshes
        //   for increased collision accuracy, add more vertices to the cube;
        //		for example, new THREE.CubeGeometry( 64, 64, 64, 8, 8, 8, wireMaterial )
        //   HOWEVER: when the origin of the ray is within the target mesh, collisions do not occur
        var originPoint = obj.position.clone();

        for (var vertexIndex = 0; vertexIndex < obj.geometry.vertices.length; vertexIndex++)
        {
            var localVertex = obj.geometry.vertices[vertexIndex].clone();
            var globalVertex = localVertex.applyMatrix4( obj.matrix );
            var directionVector = globalVertex.sub( obj.position );
            var ray = new THREE.Raycaster( originPoint, directionVector.clone().normalize() );
            var collisionResults = ray.intersectObjects( collidableMeshList );
            if ( collisionResults.length > 0 && collisionResults[0].distance < directionVector.length() )
            {
                return true;
            }

        }
        return false;


    }

    function init() {

        setCamera();
        setup();
        lights();
        statsBox();
        controls();

        //==================

        var materials = new THREE.MeshBasicMaterial( { color: 0xff00ff, wireframe: true, transparent: true, opacity: 1, side: THREE.DoubleSide } ) ;

        object = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1 ),  materials );
        // object = new THREE.Mesh( new THREE.SphereGeometry( 1, 16, 16 ),  materials );
        object.position.set( 0, 2, 1.1 );
        scene.add( object );
        objects.push(object);
        console.log(object.geometry.faces[0]);
        console.log("ball");



        var materials = new THREE.MeshBasicMaterial( { color: 0xff00ff, wireframe: true, transparent: true, opacity: 1, side: THREE.DoubleSide } ) ;
        object = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1 ),  materials );
        // object = new THREE.Mesh( new THREE.SphereGeometry( 1, 16, 16 ),  materials );
        object.position.set( 0, 2, 0 );
        scene.add( object );
        //objects.push(object);
        console.log(object.geometry.faces[0]);
        console.log("ball");



        //
        earth();
        mat();




    }

    function onWindowResize() {

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize( window.innerWidth, window.innerHeight );

    }

    function animate() {

        requestAnimationFrame( animate );


        object.rotation.x += 0.01;

        if (collisionDetect(object, objects)){
            console.log("+")
        }else{
            console.log("-")
        }

        render();
    }


    function render() {


        camera.lookAt( scene.position );
        camera.updateMatrixWorld();


        var time = Date.now() * 0.0005;
        var delta = clock.getDelta();
        bulbLight.position.y = Math.cos( time ) * 0.75 + 1.25;
        bulbLight.position.x = Math.sin( time ) * 0.75 + 1.25;

        renderer.render( scene, camera );
        stats.update();
    }




}
