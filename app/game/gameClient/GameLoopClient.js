import GameLoop3DClient from './GameLoop3DClient';
import GameUserClient from './GameUserClient';
import {gameDataTo3D} from '../gameHelpers/gameDataTo3D';

export default class GameLoopClient {
    constructor(DOMcontainer) {
        this.container = DOMcontainer;

        this.socket = require('socket.io-client')('http://localhost:3000');

        this.GameLoop3DClient = new GameLoop3DClient(this.container);

        this.socket.on('sectorData', (sectorData) => {


            let length = sectorData.length;
            while (length --) {
                const spaceShipBluePrint = sectorData[length];
                console.log('add spaceShip', length, spaceShipBluePrint);

                const spaceship3dObject = gameDataTo3D(spaceShipBluePrint, false);
                // this.spaceShips.push(spaceShip);
                this.GameLoop3DClient.addObject(spaceship3dObject);
            }
            // End loop
        });

        this.socket.on('userSettings', (data) => {
            console.log('recived userSettings', data);
            this.userSettings = data;
            this.gameUser = new GameUserClient(this.userSettings, this.socket);
            this.startTicking = true;
        });

        this.socket.on('tick', (data) => {
            // console.log(data);
            // TODO track data to remove or add new objects (space ships) in data


            // Let the game update the data and animate at the same time (one loop pass)
            if (this.startTicking) this.GameLoop3DClient.animate(data);
        });
    }

    destroy() {
        // var container = document.getElementById( 'container' ).innerHTML = "";
        this.container.innerHTML = '';
        this.GameLoop3DClient.destroy();
        this.startTicking = false;
        console.log('close game');
        // this.socket.emit('close');
        this.socket.close();
    }
}
