import express from 'express';
const app = express();
import { PORT, DB_URL } from './config'
import errorHandler from './middlewares/errorHandler';
import routes from './routes';
import mongoose from 'mongoose';

import path from 'path';

// Database connection

mongoose.connect(DB_URL, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error '));
db.once('open', () => {
     console.log('DB Connected...');
});

// approot
global.appRoot = path.resolve(__dirname);
//multipart data get file 

app.use(express.urlencoded({ extended: false }));
// json req body geter
app.use(express.json());

// use

app.use('/api', routes);

app.use('/uploads', express.static('uploads'));

// last 
app.use(errorHandler);
app.listen(PORT, () => console.log(`server running at PORT ${PORT}`))