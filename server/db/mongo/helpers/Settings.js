// import _ from 'lodash';
import settings from '../models/settings';


/**
 * Add a Settings
 */
export default class Settings {

    get(email, callback) {
        settings.findOne({email}, (err, data) => {
            if (err) {
                console.log(err, {email});
                callback(null);
            }
            callback(data);
        });
    }
    create(email, callback) {
        const query = {email, text: 'welcome to the game'};
        settings.create(query, (err, data) => {
            if (err) {
                callback(null);
            }
            callback(data);
        });
    }
    remove(id) {
        const query = {id};
        settings.findOneAndRemove(query, (err) => {
            if (err) {
                console.log('Error on delete');
                return false;
            }
            return true;
        });
    }

    update(id, data) {
        const query = { id };
        settings.findOneAndUpdate(query, data, (err) => {
            if (err) {
                console.log('Error on save!');
                return false;
            }
            return true;
        });
    }
}
