
var THREE = require('three');
var Projector = require('../app/gameHelpers/Projector');
var CanvasRenderer = require('../app/gameHelpers/CanvasRenderer');
import GameLoopHelpers from './GameLoopHelpers';

export default class GameLoop {


    constructor() {

        global.performance = false; //three js requires this
        this.gameLoopHelpers = new GameLoopHelpers();
        setTimeout(this.theLoop.bind(this), 1000);

   
    }

 

    theLoop(){
        this.count ++;

        this.gameLoopHelpers.animate();
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