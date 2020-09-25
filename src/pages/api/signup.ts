import {NextApiRequest, NextApiResponse} from 'next';
import {hash} from 'bcrypt';

const sqlite = require('sqlite');
const sqlite3 = require('sqlite3');


export default async function signup(req: NextApiRequest, res: NextApiResponse) {
    const db = await sqlite.open({
        filename: './mydb.sqlite',
        driver: sqlite3.Database
    });

    if (req.method === 'POST') {
        hash(req.body.password, 10, async function (err, hash) {

            db.getDatabaseInstance().serialize(async function () {
                const statement = await db.prepare('INSERT INTO Person (name, email, password) VALUES (?, ?, ?)');
                const result = await statement.run(req.body.name, req.body.email, hash);
                result.finalize();
            });
            const person = await db.all('SELECT * FROM Person');
            res.json(person);
        });
    } else {
        res.status(405).json({message: 'we only accept POST requests'})
    }
}