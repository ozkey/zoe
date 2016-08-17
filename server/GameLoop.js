import GameLoop3D from './GameLoop3D';

export default class GameLoop {

    constructor() {
        this.gameLoopHelpers = new GameLoop3D();
        setTimeout(this.theLoop.bind(this), 1000);

        this.timePreviousReset = 0;
        this.tickFunctionCallback = () => {
            console.log('tick');
        };
        this.users = [];
        this.gameDataPerSectors = {}; // To send partial data (io room selection)
        this.waitForDataStage = true;
    }

    setTickFunctionCallback(func) {
        this.tickFunctionCallback = func;
    }

    theLoop() {
        // http://stackoverflow.com/questions/1232040/how-do-i-empty-an-array-in-javascript
        if (this.waitForDataStage) {
            this.waitForDataStage = !this.waitForDataStage;
            // Waiting to collect data
            setTimeout(this.theLoop.bind(this), 50);
        } else {
            this.waitForDataStage = !this.waitForDataStage;
            this.frameCount ++;

            this.gameLoopHelpers.animate();
            if (this.timePreviousReset + 1000 < this.getTime()) {
                console.log('frames per second     ' + this.frameCount);
                this.timePreviousReset = this.getTime();
                this.frameCount = 0;
            }
            this.tickFunctionCallback(this.gameDataPerSectors);
            setTimeout(this.theLoop.bind(this), 10);
        }
    }

    addUser(gameUser) {
        this.users.push(gameUser);
    }

    getGameData() {
        return 'gameLoop text';
    }

    getTime() {
        const d = new Date();
        return d.getTime();
    }
}
