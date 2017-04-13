import {UP, DOWN} from '../gameHelpers/events';

export default class GameUser {

    constructor(userSettings, socket) {
        this.socket = socket;
        this.settings = userSettings;

        this.setEvents();
    }

    setEvents() {
        document.addEventListener('keyup', (event) => {
            const keyName = event.key;


            if (keyName === 'Control') {
                console.log('>up');
                this.socket.emit(UP, { my: 'data' });
            }

            if (keyName === 'Control') {
                console.log('>up');
                this.socket.emit(DOWN, { my: 'data' });
            }
        }, false);

    }

}
