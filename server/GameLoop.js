
var THREE = require('three');
var Projector = require('../app/gameHelpers/Projector');
var CanvasRenderer = require('../app/gameHelpers/CanvasRenderer');


export default class GameLoop {


    constructor() {

    

        this.renderer = new THREE.CanvasRenderer( );
        let width = 600;
        let height = 600;

        this.renderer.setSize(width, height);
        this.camera = new THREE.PerspectiveCamera( 50, width / height, 0.1, 100 );

        this.collidableMeshList =[];


        setTimeout(this.theLoop.bind(this), 1000);

        this.count = 0;
        this.timePreviousReset = this.getTime();

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


    theLoop(){
        this.count ++;

        //requestAnimationFrame();
        // console.log("collisionDetect" , this.collisionDetect(this.cube,this.collidableMeshList));
        // this.renderer.render( this.scene, this.camera );

        if(this.timePreviousReset +1000 < this.getTime()){
            console.log("frames per second     " + this.count);
            this.timePreviousReset = this.getTime();
            this.count = 0;
        }
        setTimeout(this.theLoop.bind(this), 15);



    }


    getData(){
        return "gameLoop text";
    }
    

    getTime(){
        var d = new Date();
        return d.getTime();
    }
}