import GameLoop3D from './GameLoop3D';
import {gameDataTo3D} from '../app/game/gameHelpers/gameDataTo3D';
import {getSector} from '../app/game/gameHelpers/gameSectors';

export default class GameLoop {

    constructor() {
        this.gameLoop3D = new GameLoop3D();
        // setTimeout(this.theLoop.bind(this), 1000);

        this.timePreviousReset = 0;
        this.tickFunctionCallback = () => {
            console.log('tick');
        };

        this.users = [];
        this.spaceShips = [];
        this.spaceStations = [];

        this.gameDataSectors = {t:'todo'}; // To send partial data (io room selection)
        this.waitForDataStage = false;
        // Start loop
        this.theLoop();

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
                velocity:[0,0.1,0],
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
                        c: [1, 0, 0], // cordinates
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
                x: 4,
                y: 4,
                z: 4,
                velocity:[0,0,0],
                bluePrint: [
                    {
                        c: [0, 0, 0], // cordinates
                        m: 'metal1'   // material
                    },
                    {
                        c: [1, 0, 1], // cordinates //back right
                        m: 'metal1'   // material
                    },
                    {
                        c: [1, 0, -1], // cordinates //back left
                        m: 'metal1'   // material
                    },
                    {
                        c: [1, 0, 0], // cordinates //back
                        m: 'metal1'   // material
                    },
                    {
                        c: [0, 1, 0], // cordinates
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

            // ===Animate
            this.gameLoop3D.animateSpaceShips(this.spaceShips);

            // ===Sort Data per sector
            this.gameDataSectors = {};
            let length = this.spaceShips.length;
            while (length--) {
                const obj = this.spaceShips[length];
                const sector = getSector(obj);
                if (this.gameDataSectors[sector]) {
                    this.gameDataSectors[sector].push(obj);
                } else {
                    this.gameDataSectors[sector] = [obj]; // new array
                }
            }


            this.frameCount ++;

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
        let object3D = gameDataTo3D(spaceShip,true);
        this.gameLoop3D.addObject(object3D);
        object3D.spaceShip = spaceShip;
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
