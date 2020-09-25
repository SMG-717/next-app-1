var http = require('http');
var url = require('url');

const message = [
        {
            "vehicle": "Car",
            "ownerName": "Bruno Antunes",
            "details": "some detail about Bruno's Car"
        },
        {
            "vehicle": "Bike",
            "ownerName": "Bruno Antunes",
            "details": "some detail about Bruno's Bike"
        },
        {
            "vehicle": "Bike",
            "ownerName": "John Doe",
            "details": "some detail bile"
        },
        {
            "vehicle": "Airplane",
            "ownerName": "Bill Gates",
            "details": "some detail Bill Gates"
        } ,
        {
            "vehicle": "SpaceX",
            "ownerName": "Elon Musk",
            "details": "some detail Elon"
        }
    ];

var count = 1;

http.createServer(function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    let query = url.parse(req.url, true).query;
    let ownerName = query.ownerName;
    let vehicle = query.vehicle;
    let filteredResponse = message.concat();
    if (ownerName) {
        let length = filteredResponse.length;
        let deleted = 0;
        for (let i = 0; i < length; i++) {
            if (ownerName != filteredResponse[i - deleted].ownerName) {
                filteredResponse.splice(i - deleted, 1);
                deleted++;
            }
        }
    }

    if (vehicle) {
        let length = filteredResponse.length;
        let deleted = 0;
        for (let i = 0; i < length; i++) {
            if (vehicle != filteredResponse[i - deleted].vehicle) {
                filteredResponse.splice(i - deleted, 1);
                deleted++;
            }
        }
    }


    if (count - 1) {
        console.log("request recieved x" + count);
    } else {
        console.log("request recieved");
    }
    count++;
    res.write(JSON.stringify(filteredResponse));
    res.end();
}).listen(5001);