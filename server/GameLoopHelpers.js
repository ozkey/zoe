let THREE = require('three');
let Projector = require('../app/gameHelpers/Projector');


export default class GameLoopHelpers {


    constructor() {


        this.width = 600;
        this.height = 600;


        this.camera;
        this.scene;
        this.renderer;
        this.INTERSECTED;
        this.mesh;
        this.object ;
        this.objects= [];

        this.init();
        this.animate();

    }



    setCamera() {

        this.camera = new THREE.PerspectiveCamera( 50, this.width / this.height, 0.1, 100 );
        this.camera.position.x = -4;
        this.camera.position.z = 4;
        this.camera.position.y = 3;
    }

    setup() {

        this.scene = new THREE.Scene();

    }


    collisionDetect(obj,collidableMeshList){

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

    init() {

        this.setCamera();
        this.setup();




        //==================

        var materials = new THREE.MeshBasicMaterial( { color: 0xff00ff, wireframe: true, transparent: true, opacity: 1, side: THREE.DoubleSide } ) ;

        this.object = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1 ),  materials );
        // object = new THREE.Mesh( new THREE.SphereGeometry( 1, 16, 16 ),  materials );
        this.object.position.set( 0, 2, 1.1 );
        this.scene.add( this.object );
        this.objects.push(this.object);
        console.log("ball");


        var materials = new THREE.MeshBasicMaterial( { color: 0xff00ff, wireframe: true, transparent: true, opacity: 1, side: THREE.DoubleSide } ) ;
        this.object = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1 ),  materials );
        // object = new THREE.Mesh( new THREE.SphereGeometry( 1, 16, 16 ),  materials );
        this.object.position.set( 0, 2, 0 );
        this.scene.add( this.object );
        console.log("ball");

    }


    render() {


        this.camera.lookAt( this.scene.position );
        this.camera.updateMatrixWorld();
        this.scene.updateMatrixWorld();


    }

    animate() {

        this.object.rotation.x += 0.01;
        if (this.collisionDetect(this.object, this.objects)){
            console.log("+")
        }else{
            console.log("-")
        }

        this.render();
    }


}


