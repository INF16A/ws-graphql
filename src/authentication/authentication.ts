import {NextFunction, Request, RequestHandler, Response} from "express";
import {JsonWebTokenError, NotBeforeError, sign, TokenExpiredError, verify} from "jsonwebtoken";

if(process.env.JWT_SECRET===undefined){
    console.log("EMPTY:" + process.env.JWT_SECRET);
    process.env.JWT_SECRET='m8rVNIqQ0f0pbsdYhJ9lFQ==';
    console.log(process.env.JWT_SECRET);
}

const JWT_SECRET = Buffer.from(process.env.JWT_SECRET, 'base64');

export const authenticate: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    const token = extractToken(req.header('Authorization'));
    if (token === null) {
        return next();
    }

    verify(token, JWT_SECRET, {
        issuer: 'prakt-graphql',
        maxAge: '30min'
    }, (err, decoded) => {
        if (err) {
            handleTokenError(err, res);
            return;
        }
        console.log(decoded);
        const tokenData = decoded as any;

        (req as any).user = decoded;

        sign({username: tokenData.username}, JWT_SECRET, {
            issuer: 'prakt-graphql',
            subject: tokenData.sub,
            expiresIn: '30min'
        }, (err, newToken) => {
            if (err) {
                console.log('[Authorization] JWT Sign Error', err);
                return next();
            }
            res.setHeader('X-Next-Token', newToken);
            return next();
        });
    });
};

function extractToken(header) {
    if (header === undefined || !header.startsWith('Bearer ')) {
        return null;
    }

    return header.substr('Bearer '.length);
}

function handleTokenError(err: JsonWebTokenError | TokenExpiredError | NotBeforeError, res: Response) {
    if (err instanceof TokenExpiredError) {
        res.status(401).json({
            error: {
                type: "Authentication",
                cause: 'expired'
            }
        });
        return;
    }
    if (err instanceof NotBeforeError) {
        console.log('[Authentication] JWT not before error', err);
        res.status(403).json({
            error: {
                type: "Authentication",
                cause: 'notbefore'
            }
        });
        return;
    }
    if (err instanceof JsonWebTokenError) {
        console.log('[Authentication] JWT Error', err);
        res.status(403).json({
            error: {
                type: "Authentication",
                cause: 'invalid'
            }
        });
        return;
    }
}