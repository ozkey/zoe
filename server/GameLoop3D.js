const THREE = require('three');
const Projector = require('../app/game/gameHelpers/Projector');


export default class GameLoop3D {


    constructor() {

        this.camera;
        this.scene;
        this.renderer;
        this.object ;
        this.objects3D;
        this.objects3D = [];
        this.scene = new THREE.Scene();

        this.createObjects();
        
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

    createObjects() {

        var materials = new THREE.MeshBasicMaterial( { color: 0xff00ff, wireframe: true, transparent: true, opacity: 1, side: THREE.DoubleSide } ) ;

        this.object = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1 ),  materials );
        // object = new THREE.Mesh( new THREE.SphereGeometry( 1, 16, 16 ),  materials );
        this.object.position.set( 0, 2, 1.1 );
        this.scene.add( this.object );
        this.objects3D.push(this.object);
        console.log("ball");


        var materials = new THREE.MeshBasicMaterial( { color: 0xff00ff, wireframe: true, transparent: true, opacity: 1, side: THREE.DoubleSide } ) ;
        this.object = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1 ),  materials );
        // object = new THREE.Mesh( new THREE.SphereGeometry( 1, 16, 16 ),  materials );
        this.object.position.set( 0, 2, 0 );
        this.scene.add( this.object );
        console.log("ball");

    }


    animate() {
        this.scene.updateMatrixWorld();
        this.object.rotation.x += 0.01;
        if (this.collisionDetect(this.object, this.objects3D)){
            // console.log("+")
        }else{
            // console.log("-")
        }
    }
}


