import {Router} from "express";
import {Database} from "../Database";
import {sign} from "jsonwebtoken";
import * as bcrypt from "bcryptjs";

export const authenticationRouter = Router();

const JWT_SECRET = Buffer.from(process.env.JWT_SECRET, 'base64');

authenticationRouter.post('/authenticate', async (req, res) => {
    const {username, password} = req.body;
    console.log(req.body);
    if(username === undefined || password === undefined) {
        res.status(400).json({
            error: {
                type: 'Authentication',
                cause: 'invalidrequest',
                message: 'Username or password missing'
            }
        });
        return;
    }

    const db: Database = req.app.locals.db;
    try {
        const user = await db.getDatabase().collection('User').findOne({username: username});

        if(!user) {
            res.status(403).json({
                error: {
                    type: "Authentication",
                    cause: "credentials",
                    message: "Username invalid"
                }
            });
            return;
        }

        if(!("verified" in user) || !user.verified) {
            res.status(403).json({
                error: {
                    type: "Authentication",
                    cause: "verificationstate",
                    message: "User Mail not verified. Please verify before logging in."
                }
            });
            return;
        }

        const passwordValid: boolean = bcrypt.compare(password, user.password);

        if(!passwordValid) {
            res.status(403).json({
                error: {
                    type: "Authentication",
                    cause: "credentials",
                    message: "Password wrong"
                }
            });
            return;
        }

        sign({
            username: user.username
        }, JWT_SECRET, {
            issuer: 'prakt-graphql',
            subject: user._id.toString(),
            expiresIn: "30min"
        }, (err, encoded) => {
            if(err) {
                console.log(err);
                return;
            }

            res.setHeader('X-Next-Token', encoded);
            res.status(200).json({
                "data": {
                    "token": encoded
                }
            });
        });
    } catch (err) {
        console.log(err);
    }
});