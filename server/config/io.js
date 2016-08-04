import deserializeUser from '../db/mongo/passport/deserializeUser';

export default (io,session,gameLoop) => {

    //console.log("session 2" , session);

    io.use(function(socket, next) {
        var req = socket.handshake;
        var res = {};
        session(req, res, next);

    });


    gameLoop.setTickFunction(()=>{
        io.emit('tick', {} ); // short form
    });



    io.on('connection', function (socket) {

        let req = socket.handshake;
        let id = req.session.passport.user;
        console.log("request email +++ ioi oioioioioioioioi+++++++++++++ ",id );
        deserializeUser(id,function(err,user){
            console.log("err?",err, user);
            req.user = user;
        });

        socket.on('close', function (data) {
            socket.disconnect(0);
        });
        
        socket.emit('news', { hello: 'world is in io :) '+gameLoop.getData() });
        socket.on('my other event', function (data) {
            console.log(data);
        });
    });

};
