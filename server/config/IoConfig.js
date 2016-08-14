import deserializeUser from '../db/mongo/passport/deserializeUser';
import Settings from '../db/mongo/helpers/Settings';
import GameUser from './../GameUser';
// import {UP, DOWN, FOWARD, BACK, RIGHT, LEFT, ROL_RIGHT, ROL_LEFT} from '../../app/gameHelpers/events';
import {UP, DOWN} from '../../app/gameHelpers/events';

export default class IoConfig {
    constructor(io, session, gameLoop) {
        io.use((socket, next) => {
            const req = socket.handshake;
            const res = {};
            session(req, res, next);
        });

        io.on('connection', (socket) => {
            this.connectUser(socket, gameLoop);
        });

        gameLoop.setTickFunctionCallback(() => {
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
                            socket.emit('error', {hello: 'world is in io :) ' + gameLoop.getData()});
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
        gameLoop.addUser(new GameUser(userSettings));
        // EVENTS


        socket.on(UP, (data) => { console.log('-UP', data); });
        socket.on(DOWN, (data) => { console.log('-DOWN', data); });

        // console.log('userSettings created', userSettings);
        // socket.emit('news', {hello: 'world is in io :) ' + gameLoop.getGameData()});
    }

    ioTick(io) {
        // Get users
        // Send data
        io.emit('tick', {}); // short form

        // Save user settings every few minutes
    }
}
