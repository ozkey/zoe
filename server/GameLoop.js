import GameLoopHelpers from './GameLoopHelpers';

export default class GameLoop {

    constructor() {
        this.gameLoopHelpers = new GameLoopHelpers();
        setTimeout(this.theLoop.bind(this), 1000);

        this.timePreviousReset = 0;
        this.tickFunction = () => {
            console.log('tick');
        };
        this.users = [];
    }

    setTickFunction(func) {
        this.tickFunction = func;
    }

    theLoop() {
        this.count ++;
        this.tickFunction();
        this.gameLoopHelpers.animate();
        if (this.timePreviousReset + 1000 < this.getTime()) {
            console.log('frames per second     ' + this.count);
            this.timePreviousReset = this.getTime();
            this.count = 0;
        }
        setTimeout(this.theLoop.bind(this), 50);
    }

    addUser(userSettings) {
        this.users.push(userSettings);
    }
    getGameData() {
        return 'gameLoop text';
    }

    getTime() {
        const d = new Date();
        return d.getTime();
    }
}
