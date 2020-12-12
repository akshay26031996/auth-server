import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send("Hello, world!");
});

app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
}).on('error', (e) => {
    console.log('Error while starting the server: ', e.message)
});