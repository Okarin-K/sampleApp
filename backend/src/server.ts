import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import mongoose, { Schema } from 'mongoose';

mongoose.Promise = global.Promise;

const MessageSchema = new Schema({
    message: {
        type: String,
        require: true,
    },
    createdAt: {
        type: Date,
        require: true,
    },
});

const Message = mongoose.model('Message', MessageSchema);

const app = express();

app.use(
    cors({
        origin: '*',
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res, next) => {
    try {
        res.status(200).send({ message: 'Hello World!' });
    } catch (err) {
        next(err);
    }
});

const messages = ['test', 'hello', 'つぶやけるのじゃ！'];
app.get('/messages', async (req, res, next) => {
    try {
        const doc = new Message();
        const messages = await doc.collection.find().toArray();
        console.log(messages);

        res.status(200).send({ messages });
    } catch (err) {
        next(err);
    }
});

app.post('/messages', async (req, res, next) => {
    try {
        const body = req.body;

        const doc = new Message();
        await doc.collection.insertOne({
            message: body.message,
            createdAt: new Date()
                .toLocaleDateString('ja-JP', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                })
                .replace(/-/g, '/'),
        });

        console.log(body);
        res.status(200).send({ code: 'success', status: 200 });
    } catch (err) {
        next(err);
    }
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(5000, () => {
    // DB接続処理
    try {
        mongoose.connect('mongodb://localhost:27017', {
            auth: {
                username: 'okarin',
                password: 'password',
            },
            dbName: 'local',
        });
    } catch (err) {
        console.log('DBとの接続に失敗しました');
        console.log(err);
    }

    console.log('Listening to server...');
});
