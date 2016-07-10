import User from '../models/user';

export default (id, done) => {
    console.log("//deserialize user");
    User.findById(id, (err, user) => {
        done(err, user);
    });
};
