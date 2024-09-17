import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';
import cookieParser from 'cookie-parser';
import routes from './routes/index.js';
import { CONSTANTS } from './utils/constants.js';

const __dirname = path.resolve();

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(cookieParser());
app.use(bodyParser.json({ limit: CONSTANTS.MAX_JSON_BODY_REQUEST }));
app.use(cors({ origin: "*" }));

app.use('/publics', express.static(path.join(__dirname, 'publics')));
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));
app.use('/swiperJs', express.static(path.join(__dirname, 'public/swiperJs')));


app.use('/', routes);

app.listen(CONSTANTS.APP_PORT, () => {
  console.log(`Server is running on port ${CONSTANTS.APP_PORT}`);
});
