import deserializeUser from '../../../server/db/mongo/passport/deserializeUser';
import Settings from '../../../server/db/mongo/helpers/Settings';
import GameUser from './GameUserServer';
// import {UP, DOWN, FOWARD, BACK, RIGHT, LEFT, ROL_RIGHT, ROL_LEFT} from '../../app/gameHelpers/events';

export default class IoConfig {
    constructor(io, session, gameLoop) {
        this.gameLoop = gameLoop;
        io.use((socket, next) => {
            const req = socket.handshake;
            const res = {};
            session(req, res, next);
        });

        io.on('connection', (socket) => {
            this.connectUser(socket, this.gameLoop);
        });

        this.gameLoop.setTickFunctionCallback(() => {
            this.ioTick(io);
        });

    }


    connectUser(socket, gameLoop) {
        const req = socket.handshake;
        const id = req.session.passport.user;
        const settings = new Settings();

        let userData = undefined;
        let userSettings = undefined;

        console.log('request email +++ ioi oioioioioioioioi+++++++++++++ ', id);
        deserializeUser(id, (err, user) => {
            console.log('err?', err, user);
            req.user = user;
            userData = user;

            // console.log(userData);
            // console.log('========================================');

            settings.get(userData.email, (savedUserSettings) => {
                userSettings = savedUserSettings;
                console.log('========================================');
                console.log('userSettings++++++', userSettings);
                if (userSettings === null) {
                    userSettings = settings.create(userData.email, (newUserSettings) => {
                        userSettings = newUserSettings;
                        console.log('userSettings created', userSettings);
                        if (userSettings === null) {
                            socket.emit('error', {text: 'world is in io :) ' + gameLoop.getData()});
                        } else {
                            this.initUser(userSettings, gameLoop, socket);
                        }
                    });
                } else {
                    this.initUser(userSettings, gameLoop, socket);
                }
            });
        });

        socket.on('close', (data) => {
            console.log(data);
            socket.disconnect(0);
        });
    }

    initUser(userSettings, gameLoop, socket) {

        socket.emit('userSettings', {email: userSettings.email});
        const gameUser = new GameUser(userSettings, socket);
        socket.emit('sectorData', gameLoop.getDataForSector(gameUser.getSector()));
        gameLoop.addUser(gameUser);

        // TODO ad user to io room for sector
    }

    ioTick(io) {
        // TODO Get users and check they are in the correct io room

        //
        const data = this.gameLoop.getDataSectors();
        io.emit('tick', data); // short form

        // Save user settings every few minutes
    }
}
