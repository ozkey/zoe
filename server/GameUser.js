import {UP, DOWN} from '../app/game/gameHelpers/events';

export default class GameUser {

    constructor(userSettings, socket) {
        this.socket = socket;
        this.settings = userSettings;
        this.sector = this.getSector(userSettings);
        this.ioRooms = [];
        this.setEvents();
        const sector = this.getSector();
        this.ioRooms.push(sector);
        socket.join(sector);
    }

    getSector() {
        const sectorSize = 10000;
        const sectorZ = this.userSettings; // depth
        const sectorX = 0; // sides
        return sectorZ + '.' + sectorX + '-' + (sectorZ + sectorSize) + '.' + (sectorX + sectorSize);
    }

    loopTick() {
        // TODO check if moved to new sector
        // TODO adjust socket room


    }
    setEvents() {
        // EVENTS
        this.socket.on(UP, (data) => { console.log('-UP', data); });
        this.socket.on(DOWN, (data) => { console.log('-DOWN', data); });

        // console.log('userSettings created', userSettings);
        // socket.emit('news', {hello: 'world is in io :) ' + gameLoop.getGameData()});

        // You don't need to maintain a list of rooms, socket.io does that for you. Simply iterate through the keys of io.sockets.manager.roomClients[socket.id] and socket.leave

    }
    getSectorsSquare() {
        // TODO
        // send the the 3 closes squares the user may be going to
        //   [ ][ ][ ][ ]
        //   [ ][X][<][ ]
        //   [ ][X][X][ ]
        //   [ ][ ][ ][ ]

        const sectorSize = 10000;
        const sectorZ = this.userSettings; // depth
        const sectorX = 0; // sides
        return [sectorZ + '.' + sectorX + '-' + (sectorZ + sectorSize) + '.' + (sectorX + sectorSize)];
    }
}
