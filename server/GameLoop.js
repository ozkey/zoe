



export default class GameLoop {


    constructor() {
        process.nextTick(this.theLoop.bind(this));

        this.count = 0;
        this.timePreviousReset = this.getTime();

    }

    theLoop(){
        this.count ++;
        if(this.timePreviousReset +1000 < this.getTime()){
            console.log("Ticks per second     " + this.count);
            this.count = 0;
            this.timePreviousReset = this.getTime();



        }
        process.nextTick(this.theLoop.bind(this));
    }


    getData(){
        return "gameLoop text";
    }
    

    getTime(){
        var d = new Date();
        return d.getTime();
    }
}