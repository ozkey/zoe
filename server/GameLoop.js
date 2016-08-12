import GameLoopHelpers from './GameLoopHelpers';

export default class GameLoop {


    constructor() {

        //global.performance = false; //three js requires this
        this.gameLoopHelpers = new GameLoopHelpers();
        setTimeout(this.theLoop.bind(this), 1000);

        this.timePreviousReset = 0;
        this.tickFunction = () => { console.log("tick")};
    }


    setTickFunction(func){
        this.tickFunction = func;
    }

    theLoop(){
        this.count ++;
        this.tickFunction();

        this.gameLoopHelpers.animate();

        if(this.timePreviousReset +1000 < this.getTime()){
            console.log("frames per second     " + this.count);
            this.timePreviousReset = this.getTime();
            this.count = 0;

        }
        setTimeout(this.theLoop.bind(this), 50);



    }


    getData(){
        return "gameLoop text";
    }
    

    getTime(){
        var d = new Date();
        return d.getTime();
    }
}