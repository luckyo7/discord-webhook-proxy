import express from "express";

export var router = express.Router();

router.post("/post", (req, res, next) => {
    // make sure they supplied everything needed
    if (!(req.query.message && req.query.webhook)) {
        res.status(400).send("Invalid Data. Missing message or webhook."); // return error status code
        return;
    } 
    var message = req.query.message;
    var webhook = "https://discord.com/api/webhooks/" + req.query.webhook; // webhook part should look like 863462515631849532/su8Udm1C-zorau4d3wV3Rq303TQ95uAWS7vHdVwy1r7DXFeMPqTKK9x9BIrAtxWMSCi7
    var username = (req.query.username && req.query.username != "") ? req.query.username : "Discord Integration"

    var xhr = new XMLHttpRequest();
    xhr.open("POST", webhook, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        "content": message,
        "username": username,
    }));
})