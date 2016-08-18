import GameLoop3D from './GameLoop3D';
import {gameDataTo3D} from './gameDataTo3D';

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


        // =========================== test

        this.addSpaceShip(
            {
                id: 1,
                owner: 'ozkey.com@gmail.com',
                weight: 10,
                powerCunsumption: 10,
                x: 1,
                y: 1,
                z: 1,
                bluePrint: [
                    {
                        c: [0, 0, 0], // cordinates
                        m: 'metal1'   // material
                    },
                    {
                        c: [1, 0, 1], // cordinates
                        m: 'metal1'   // material
                    },
                    {
                        c: [1, 0, -1], // cordinates
                        m: 'metal1'   // material
                    },
                    {
                        c: [1, 1, 1], // cordinates
                        m: 'metal1'   // material
                    },
                ]
            }
        );
        this.addSpaceShip(
            {
                id: 2,
                owner: 'ozkey.com@gmail.com',
                weight: 10,
                powerCunsumption: 10,
                x: 3,
                y: 3,
                z: 3,
                bluePrint: [
                    {
                        c: [0, 0, 0], // cordinates
                        m: 'metal1'   // material
                    },
                    {
                        c: [1, 0, 1], // cordinates
                        m: 'metal1'   // material
                    },
                    {
                        c: [1, 0, -1], // cordinates
                        m: 'metal1'   // material
                    },
                    {
                        c: [1, 1, 1], // cordinates
                        m: 'metal1'   // material
                    },
                ]
            }
        );
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
        this.gameLoop3D.addObject(gameDataTo3D(spaceShip,true));
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
