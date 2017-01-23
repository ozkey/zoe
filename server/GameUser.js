import {UP, DOWN} from '../app/game/gameHelpers/events';
import {getSector} from '../app/game/gameHelpers/gameSectors';


export default class GameUser {

    constructor(userSettings, socket) {
        this.socket = socket;
        this.settings = userSettings;
        this.sector = this.getSector(userSettings);
        this.ioRooms = [];
        this.setEvents();
        const sector = getSector();
        this.ioRooms.push(sector);
        socket.join(sector);
    }

    getSector() {
        return getSector(this);
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

}
