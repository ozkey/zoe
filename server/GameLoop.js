
var THREE = require('three');


export default class GameLoop {


    constructor() {
        var collidableMeshList =[];


        setTimeout(this.theLoop.bind(this), 1000);

        this.count = 0;
        this.timePreviousReset = this.getTime();


        this.scene = new THREE.Scene();
        // Cube
        var geometry = new THREE.BoxGeometry( 20, 20, 20 );
        var cube = new THREE.Mesh( geometry );
        // cube.position.y = 10;
        // cube.position.x = 10;
        // cube.position.z = 10;
        this.scene.add( cube );
        collidableMeshList.push(cube);


        var geometry2 = new THREE.BoxGeometry( 20, 20, 20 );
        var cube2 = new THREE.Mesh( geometry2 );
        cube2.position.y = 1;
        this.scene.add( cube2 );
        collidableMeshList.push(cube2);



        console.log("collisionDetect" , this.collisionDetect(cube,collidableMeshList));

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
            console.log("x");
        }
        return false;


    }


    theLoop(){
        this.count ++;



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