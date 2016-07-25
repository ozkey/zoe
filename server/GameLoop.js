
var THREE = require('three');
var Projector = require('../app/gameHelpers/Projector');
var CanvasRenderer = require('../app/gameHelpers/CanvasRenderer');
import gameLoopHelpers from './gameLoopHelpers';

export default class GameLoop {


    constructor() {


        gameLoopHelpers();
        setTimeout(this.theLoop.bind(this), 1000);

   
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