import express from 'express';
import { json } from 'body-parser';
import { userRouter } from './router/user';

const app = express();
const PORT = process.env.PORT || 3000;

// for parsing application/json
app.use(json());

app.use(userRouter);

app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
}).on('error', (e) => {
    console.log('Error while starting the server: ', e.message)
});