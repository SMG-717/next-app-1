import {NextApiRequest, NextApiResponse} from "next";

const sqlite = require('sqlite');
const sqlite3 = require('sqlite3');


export default async function getAllVehiclesByPersonId(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        res.status(500).json({message: 'sorry, we only accept GET requests'});
        return;
    }

    const db = await sqlite.open({
        filename: './mydb.sqlite',
        driver: sqlite3.Database
    });
    const vehicles = await db.all('SELECT * FROM Vehicle WHERE ownerId = ?', [req.query.id]);

    res.json(vehicles);
}