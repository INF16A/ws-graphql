import {Router, Request, Response} from "express";
import {Database} from "../Database";

export const validationRouter = Router();

const findUserByToken = async (db, token) => {
    return await db.getDatabase().collection('User').findOne({"validation.token": token});
};

validationRouter.get('/verify/:token', async (req: Request, res: Response) => {
    const db: Database = req.app.locals.db;
    const token = req.params.token;
    if(token == null) {
        res.status(400).send('Token required').end();
        return;
    }
    const user = await findUserByToken(db, token);
    if(user == null) {
        res.status(400).send('Wrong Token').end();
        return;
    }

    res.status(200).send(`<!DOCTYPE html>
<html>
<head>
    <title>Email validieren</title>
</head>
<body>
    <form action="/verify/${user.validation.token}" method="POST">
        <button>Email validieren</button>
    </form>
</body>
</html>`).end();
});

validationRouter.post('/verify/:token', async (req: Request, res: Response) => {
    const token = req.params.token;
    if(token == null) {
        res.status(400).send('Token required').end();
        return;
    }

    const db = req.app.locals.db;
    const user = await findUserByToken(db, token);
    if(user == null) {
        res.status(400).send('Wrong Token').end();
        return;
    }

    await db
        .getDatabase()
        .collection('User')
        .updateOne(
            {_id: user._id},
            {
                $set: {"validation.verified": true},
                $unset: {"validation.token": ""}
            }
        );

    res.status(200).send(`<!DOCTYPE html>
<html>
<head>
    <title>Email validierung erfolgreich</title>
</head>
<body>
    <p>Erfolgreich</p>
</body>
</html>`).end();
});