import {NextApiRequest, NextApiResponse} from 'next';
import {compare} from 'bcrypt';
import {sign} from 'jsonwebtoken';
import {secret} from "../../../api/secret";
import cookie from 'cookie';

const sqlite = require('sqlite');
const sqlite3 = require('sqlite3');


export default async function login(req: NextApiRequest, res: NextApiResponse) {
    const db = await sqlite.open({
        filename: './mydb.sqlite',
        driver: sqlite3.Database
    });

    if (req.method === 'POST') {
        const person = await db.get('SELECT * FROM Person WHERE email = ?', [req.body.email]);


        await compare(req.body.password, person.password, function (err, result) {
            if (!err && result) {
                const claims = {sub: person.id, myPersonEmail: person.email};
                const jwt = sign(claims, secret, {expiresIn: '1h'});
                res.setHeader('Set-Cookie', cookie.serialize('auth', jwt, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV !== 'development',
                    sameSite: 'strict',
                    maxAge: 3600,
                    path: '/'
                }));
                res.json({authToken: jwt});
            } else {
                res.json({message: "no"});
            }
        });
    } else {
        res.status(405).json({message: 'we only accept POST requests'})
    }
}