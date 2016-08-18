import GameLoop3D from './GameLoop3D';
import GameUserClient from './GameUserClient';

export default class GameLoopClient {
    constructor(DOMcontainer) {
        this.container = DOMcontainer;

        this.socket = require('socket.io-client')('http://localhost:3000');

        this.socket.on('userSettings', (data) => {
            console.log('recived userSettings', data);
            this.userSettings = data;
            this.gameUser = new GameUserClient(this.userSettings, this.socket);
            this.gameLoop3D = new GameLoop3D(this.container, this.gameUser);
            this.startTicking = true;
        });

        this.socket.on('tick', (data) => {
            // console.log(data);
            // TODO track data to remove or add new objects (space ships) in data


            // Let the game update the data and animate at the same time (one loop pass)
            if (this.startTicking) this.gameLoop3D.animate(data);
        });
    }

    destroy() {
        // var container = document.getElementById( 'container' ).innerHTML = "";
        this.container.innerHTML = '';
        this.gameLoop3D.destroy();
        this.startTicking = false;
        console.log('close game');
        // this.socket.emit('close');
        this.socket.close();
    }
}
