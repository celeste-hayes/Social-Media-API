import express from 'express';
import db from './config/connection.js';
import routes from './routes/api/index.js';

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api', routes);

db().then((connection) => {
    connection.once('open', () => {
        app.listen(PORT, () => {
            console.log(`API server running on port ${PORT}!`);
        });
    });
}).catch((err) => {
    console.error('Failed to connect to the database', err);
});