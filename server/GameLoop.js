import GameLoop3D from './GameLoop3D';

export default class GameLoop {

    constructor() {
        this.gameLoop3D = new GameLoop3D();
        setTimeout(this.theLoop.bind(this), 1000);

        this.timePreviousReset = 0;
        this.tickFunctionCallback = () => {
            console.log('tick');
        };

        this.users = [];
        this.spaceShips = [];
        this.spaceStations = [];

        this.gameDataSectors = {t:'todo'}; // To send partial data (io room selection)
        this.waitForDataStage = true;
    }

    getDataSectors() {
        return this.gameDataSectors;
    }
    getDataForSector(sector) {
        return this.gameDataSectors[sector];
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

            this.gameLoop3D.animate();
            if (this.timePreviousReset + 1000 < this.getTime()) {
                console.log('frames per second     ' + this.frameCount);
                this.timePreviousReset = this.getTime();
                this.frameCount = 0;
            }
            this.tickFunctionCallback();
            setTimeout(this.theLoop.bind(this), 10);
        }
    }

    addUser(gameUser) {
        this.users.push(gameUser);
    }
    addSpaceShip(spaceShip) {
        this.spaceShips.push(spaceShip);
    }
    addSpaceStation(spaceStation) {
        this.spaceStations.push(spaceStation);
    }

    getGameData() {
        return 'gameLoop text';
    }

    getTime() {
        const d = new Date();
        return d.getTime();
    }
}
