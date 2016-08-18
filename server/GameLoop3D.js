const THREE = require('three');
const Projector = require('../app/game/gameHelpers/Projector');


export default class GameLoop3D {


    constructor() {
        this.camera = null;
        this.scene = null;
        this.renderer = null;

        this.objects3D = [];
        this.scene = new THREE.Scene();

        this.createObjects();
    }


    addObject(game3DObject){
        this.objects3D.push(game3DObject);
        this.scene.add(game3DObject);

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

    }


    animate() {
        this.scene.updateMatrixWorld();

        // TODO update objects (
        // TODO collision should be detected by peers

        let length = this.objects3D.length;
        while (length--) {
            // if (this.collisionDetect(this.objects3D[0], [this.objects3D[1]])) {
            //     console.log('+');
            // } else {
            //     console.log('-');
            // }
        }

        //
        // if (this.collisionDetect(this.object, this.objects3D)){
        //     // console.log("+")
        // }else{
        //     // console.log("-")
        // }
    }
}


