import express from 'express';
import bodyParser from 'body-parser';
import dotEnv from 'dotenv';
import songsController from './controllers/songs.controller';
import cors from 'cors'
dotEnv.config();
const PORT = process.env.PORT ||  8080;

const app = express();

//middlewares
app.use(bodyParser.json());
app.use(cors({origin:"*"}))

app.get('/',songsController.getAll);
app.get('/searchsong',songsController.filter);
app.post('/addsong',songsController.insertSong)

app.listen(PORT, () => {
    console.log(`server started at http://localhost:${PORT}`);
});


