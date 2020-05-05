import mongoose from 'mongoose';

const initDB = () => {
    mongoose.connect('mongodb://localhost:27017/person', {
    useNewUrlParser: true
    });

    mongoose.connection.once('open', () => {
        console.log('connected to database');
      });
};

export default initDB;