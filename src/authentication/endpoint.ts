import {Router} from "express";
import {Database} from "../Database";
import {sign} from "jsonwebtoken";
import * as bcrypt from "bcryptjs";

export const authenticationRouter = Router();

const JWT_SECRET = Buffer.from(process.env.JWT_SECRET, 'base64');

authenticationRouter.post('/authenticate', async (req, res) => {
    const {username, password} = req.body;
    if(!validateRequest(username, password, res))
        return;

    const db: Database = req.app.locals.db;
    try {
        const user = await getUser(username, db);

        if(!validateUser(user, res))
            return;
        if(!validateUserVerification(user, res))
            return;
        if(!validatePassword(user, password, res))
            return;
        await sendToken(user, res);
    } catch (err) {
        console.log(err);
    }
});

async function getUser(username, db) {
    return await db.getDatabase().collection('User').findOne({username: username});
}

function validateRequest(username, password, res) {
    if(username === undefined || password === undefined) {
        res.status(400).json({
            error: {
                type: 'Authentication',
                cause: 'invalidrequest',
                message: 'Username or password missing'
            }
        });
        return false;
    }
    return true;
}

function validateUser(user, res) {
    if(!user) {
        res.status(403).json({
            error: {
                type: "Authentication",
                cause: "credentials",
                message: "Username invalid"
            }
        });
        return false;
    }
    return true;
}

function validateUserVerification(user, res) {
    if(!("verified" in user) || !user.verified) {
        res.status(403).json({
            error: {
                type: "Authentication",
                cause: "verificationstate",
                message: "User Mail not verified. Please verify before logging in."
            }
        });
        return false;
    }
    return true;
}

async function validatePassword(user, password, res) {
    const passwordValid: boolean = await bcrypt.compare(password, user.password);

    if(!passwordValid) {
        res.status(403).json({
            error: {
                type: "Authentication",
                cause: "credentials",
                message: "Password wrong"
            }
        });
        return false;
    }
    return true;
}

function sendToken(user, res) {
    return new Promise((resolve, reject) => {
        sign({
            username: user.username
        }, JWT_SECRET, {
            issuer: 'prakt-graphql',
            subject: user._id.toString(),
            expiresIn: "30min"
        }, (err, encoded) => {
            if(err) {
                return reject(err);
            }
            resolve(encoded);
        });
    }).then(encoded => {
        res.setHeader('X-Next-Token', encoded);
        res.status(200).json({
            "data": {
                "token": encoded
            }
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: {
                type: "Internal"
            }
        })
    });
}

