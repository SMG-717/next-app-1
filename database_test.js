const sqlite = require('sqlite');
const sqlite3 = require('sqlite3');

(async () => {
    // open the database
    const db = await sqlite.open({
        filename: './mydb.sqlite',
        driver: sqlite3.Database
    });
    await db.migrate({force: true});

    const people = await db.all('SELECT * FROM Person');
    console.log('ALL PEOPLE ' + JSON.stringify(people, null, 4));

    const vehicles = await db.all('SELECT * FROM Vehicle');
    console.log('ALL VEHICLES ' + JSON.stringify(vehicles, null, 4));
})();