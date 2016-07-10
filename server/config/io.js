
export default (io,session) => {

    //console.log("session 2" , session);

    io.use(function(socket, next) {
        var req = socket.handshake;
        var res = {};


        session(req, res, next);


    });


    io.on('connection', function (socket) {

        var req = socket.handshake;
        console.log("request email +++ ioi oioioioioioioioi+++++++++++++ ",req.session.passport );

        socket.emit('news', { hello: 'world is in io :)' });
        socket.on('my other event', function (data) {
            console.log(data);
        });
    });

};
