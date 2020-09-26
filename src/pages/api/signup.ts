import {NextApiRequest, NextApiResponse} from 'next';
import {hash} from 'bcrypt';
import {sign} from "jsonwebtoken";
import {secret} from "../../../api/secret";
import cookie from "cookie";

const sqlite = require('sqlite');
const sqlite3 = require('sqlite3');


export default async function signup(req: NextApiRequest, res: NextApiResponse) {
    const db = await sqlite.open({
        filename: './mydb.sqlite',
        driver: sqlite3.Database
    });

    if (req.method === 'POST') {
        await hash(req.body.password, 10, async function (err, hash) {

            db.getDatabaseInstance().serialize(async function () {
                const statement = await db.prepare('INSERT INTO Person (name, email, password) VALUES (?, ?, ?)');
                const result = await statement.run(req.body.name, req.body.email, hash);
                result.finalize();
            });

            const claims = {sub: req.body.email};
            const jwt = sign(claims, secret, {expiresIn: '1h'});
            res.setHeader('Set-Cookie', cookie.serialize('auth', jwt, {
                httpOnly: true,
                secure: process.env.NODE_ENV !== 'development',
                sameSite: 'strict',
                maxAge: 3600,
                path: '/'
            }));
            res.json({message:'Welcome to the app, ' + req.body.name});
        });
    } else {
        res.status(405).json({message: 'we only accept POST requests'})
    }
}