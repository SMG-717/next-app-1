import {NextApiRequest, NextApiResponse} from "next";

const sqlite = require('sqlite');
const sqlite3 = require('sqlite3');


export default async function getPersonById(req: NextApiRequest, res: NextApiResponse) {
    const db = await sqlite.open({
        filename: './mydb.sqlite',
        driver: sqlite3.Database
    });

    if (req.method === 'PUT') {
        db.getDatabaseInstance().serialize(async function () {
            const statement = await db.prepare('UPDATE Person SET name = ?, email = ? WHERE id = ?');
            const result = await statement.run(req.body.name, req.body.email, req.query.id);
            result.finalize();
        });
        const person = await db.all('SELECT * FROM Person');
        res.json(person);
    }
}