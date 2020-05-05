import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const PersonSchema = new Schema({
   name: String,
   work: String,
   nationality: String
});
export default mongoose.model('Person', PersonSchema);