import deserializeUser from '../db/mongo/passport/deserializeUser';

export default (io, session, gameLoop) => {
    //  console.log("session 2" , session);

    io.use((socket, next) => {
        const req = socket.handshake;
        const res = {};
        session(req, res, next);
    });


    gameLoop.setTickFunction(() => {
        io.emit('tick', {}); // short form
    });

    io.on('connection', (socket) => {
        const req = socket.handshake;
        const id = req.session.passport.user;
        console.log('request email +++ ioi oioioioioioioioi+++++++++++++ ', id);
        deserializeUser(id, (err, user) => {
            console.log('err?', err, user);
            req.user = user;
        });

        socket.on('close', (data) => {
            console.log(data);
            socket.disconnect(0);
        });
        socket.emit('news', { hello: 'world is in io :) ' + gameLoop.getData() });
        socket.on('my other event', (data) => {
            console.log(data);
        });
    });
};
