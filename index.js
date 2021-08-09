import express from "express";
import _XMLHttpRequest from "xmlhttprequest";
var XMLHttpRequest = _XMLHttpRequest.XMLHttpRequest;

var app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.post("/post", (req, res, next) => {
    var message = req.body.message || req.query.message || ""
    var webhook = req.body.webhook || req.query.webhook || ""
    var username = req.body.username || req.query.username || "Discord Integration"
    var avatar = req.body.avatar || req.query.avatar || "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Garry%27s_Mod_logo.svg/768px-Garry%27s_Mod_logo.svg.png"
    // make sure they supplied everything needed
    if (!(message && webhook)) {
        res.status(400).send("Invalid Data. Missing message or webhook."); // return error status code
        return;
    } 
    webhook = "https://discord.com/api/webhooks/" + webhook; // webhook part should look like 863462515631849532/su8Udm1C-zorau4d3wV3Rq303TQ95uAWS7vHdVwy1r7DXFeMPqTKK9x9BIrAtxWMSCi7

    var xhr = new XMLHttpRequest();
    xhr.open("POST", webhook, true);
    xhr.onreadystatechange = () => {
        if (xhr.status > 0) {
            res.status(xhr.status).send(xhr.response);
        };
    };
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        "content": message,
        "username": username,
        "avatar_url": avatar
    }));
})

app.get("/", (req, res) => {
    res.redirect("https://docs.google.com/document/d/1ri1cteadf0s-YbHAyKB5AdBNdkNnSeF9zSfAG90Xnz4/edit?usp=sharing");
})

app.listen(process.env.PORT, () => {
    console.log("running on port " + process.env.PORT);
});

// setInterval(function() {
//     console.log("timer that keeps nodejs processing running");
// }, 1000 * 60 * 60);