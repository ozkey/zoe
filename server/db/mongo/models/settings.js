/**
 * Schema Definitions
 *
 */
import mongoose from 'mongoose';

const SettingsSchema = new mongoose.Schema({
    email: { type: String, unique: true, lowercase: true },
    text: String,
    count: { type: Number, min: 0, default: 0},
    loginDate: { type: Date, default: Date.now}

});

// Compiles the schema into a model, opening (or creating, if
//	nonexistent) the 'Topic' collection in the MongoDB database
export default mongoose.model('Settings', SettingsSchema);

