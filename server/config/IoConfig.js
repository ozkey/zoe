import deserializeUser from '../db/mongo/passport/deserializeUser';
import Settings from '../db/mongo/helpers/Settings';

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

        gameLoop.setTickFunction(() => {
            io.emit('tick', {}); // short form
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
                        socket.emit('news', {hello: 'world is in io :) ' + gameLoop.getData()});

                        this.initUser(userSettings, gameLoop, socket);
                    });
                }
            });
        });

        socket.on('close', (data) => {
            console.log(data);
            socket.disconnect(0);
        });

        socket.on('my other event', (data) => {
            console.log(data);
        });
    }

    initUser(userSettings, gameLoop, socket) {
        gameLoop.addUser(userSettings);
        console.log('userSettings created', userSettings);
        socket.emit('news', {hello: 'world is in io :) ' + gameLoop.getGameData()});
    }
}
