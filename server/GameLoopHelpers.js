var THREE = require('three');
var Projector = require('../app/gameHelpers/Projector');





module.exports = gameLoopHelpers;
function gameLoopHelpers(){



    var CanvasRenderer = require('../app/gameHelpers/CanvasRenderer');

    // var Detector = require('../gameHelpers/Detector');

    let width = 600;
    let height = 600;


    var camera, scene, renderer;

    var raycaster = new THREE.Raycaster();
    var mouse = new THREE.Vector2();
    var INTERSECTED;
    var group = new THREE.Group();

    var mesh, object ;
    var objects= [];
    var controls;
    var clock = new THREE.Clock();
    
    var bulbLight;

    init();
    animate();



    function setCamera() {
//        camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
//        camera.position.z = 40;

        camera = new THREE.PerspectiveCamera( 50, width / height, 0.1, 100 );
        camera.position.x = -4;
        camera.position.z = 4;
        camera.position.y = 3;
    }

    function setup() {

        renderer = new THREE.CanvasRenderer( );
        

        // renderer = new THREE.WebGLRenderer();
        // renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(width, height);


        // renderer.physicallyCorrectLights = true;
        // renderer.gammaInput = true;
        // renderer.gammaOutput = true;
        // renderer.shadowMap.enabled = true;
        // renderer.toneMapping = THREE.ReinhardToneMapping;


        // container.appendChild(renderer.domElement);
        scene = new THREE.Scene();
        // window.addEventListener( 'resize', onWindowResize, false );

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









    // function onDocumentMouseMove( event ) {
    //     event.preventDefault();
    //     mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    //     mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    // }


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






    }

    // function onWindowResize() {
    //
    //     camera.aspect = window.innerWidth / window.innerHeight;
    //     camera.updateProjectionMatrix();
    //
    //     renderer.setSize( window.innerWidth, window.innerHeight );
    //
    // }

    function animate() {

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


        // find intersections
        raycaster.setFromCamera( mouse, camera );
//        var intersects = raycaster.intersectObjects( scene.children );
        var intersects = raycaster.intersectObjects( group.children, true );
        if ( intersects.length > 0 ) {
            if ( INTERSECTED != intersects[ 0 ].object ) {
                INTERSECTED = intersects[ 0 ].object;
                INTERSECTED.rotation.x += 0.5;
            }
        } else {

        }

        


        var time = Date.now() * 0.0005;
        var delta = clock.getDelta();
        bulbLight.position.y = Math.cos( time ) * 0.75 + 1.25;
        bulbLight.position.x = Math.sin( time ) * 0.75 + 1.25;

        renderer.render( scene, camera );
        
    }




}
