import express from 'express';
import { json, urlencoded } from 'body-parser';
import cookieParser = require('cookie-parser');
import mongoose from 'mongoose';

// env variables
import dotenv = require('dotenv');
dotenv.config();

import config from './config';

import { authRouter } from './router/auth';
import { userRouter } from './router/user';

const app = express();
const PORT = process.env.PORT || 3000;

// for parsing application/json and url-enocded bodies
app.use(json());
app.use(urlencoded({ extended: false }));

app.use(cookieParser());

// database connection
mongoose.Promise = global.Promise;
mongoose.connect(config.DATABASE, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) {
        console.error(err);
    }
    console.log("Connected to database");
});

app.use(authRouter);
app.use(userRouter);

app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
}).on('error', (e) => {
    console.log('Error while starting the server: ', e.message)
});