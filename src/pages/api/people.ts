import {NextApiHandler, NextApiRequest, NextApiResponse} from "next";
import {verify} from "jsonwebtoken";
import {secret} from "../../../api/secret";

const sqlite = require('sqlite');
const sqlite3 = require('sqlite3');

export const authenticated = (fn: NextApiHandler) => async (req: NextApiRequest, res: NextApiResponse) => {
    verify(req.headers.authorization!, secret, async function(err, decoded) {
        if (!err && decoded){
            return await fn(req, res);
        }

        res.status(401).json({message: "you are not authenticated"});
    })
};


export default authenticated(async function getAllPeople(req: NextApiRequest, res: NextApiResponse) {
    const db = await sqlite.open({
        filename: './mydb.sqlite',
        driver: sqlite3.Database
    });
    const people = await db.all('SELECT * FROM Person');
    res.json(people);
});