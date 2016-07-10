import deserializeUser from '../db/mongo/passport/deserializeUser';

export default (io,session) => {

    //console.log("session 2" , session);

    io.use(function(socket, next) {
        var req = socket.handshake;
        var res = {};
        session(req, res, next);

    });





    io.on('connection', function (socket) {

        let req = socket.handshake;
        let id = req.session.passport.user;
        console.log("request email +++ ioi oioioioioioioioi+++++++++++++ ",id );
        deserializeUser(id,function(err,user){
            console.log("err?",err, user);
            req.user = user;
        });

        socket.emit('news', { hello: 'world is in io :)' });
        socket.on('my other event', function (data) {
            console.log(data);
        });
    });

};
