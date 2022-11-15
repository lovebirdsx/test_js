import express = require("express");
import dgram from 'dgram';

function sendEditorCommand(cmd: unknown) {
    const client = dgram.createSocket('udp4');
    client.send(JSON.stringify(cmd), 8889, 'localhost', (err) => {
        client.close();
    });
}

var app = express();
const port = 8886;

app.get("/", (req, res) => {
    res.send("Process function on main thread.");
});

app.get("/seprate-thread", (req, res) => {
    res.send("Process function on seprate thread.");
});

app.get('/level/:levelId/entity/:entityId', (req, res) => {
    const cmd = {
        Type: 'NavToEntity',
        EntityId: Number.parseInt(req.params.entityId),
        LevelId: Number.parseInt(req.params.levelId),
    }
    sendEditorCommand(cmd);
    res.send('<script>window.close();</script>');
})

app.listen(port, () => {
    console.log(`editor cmd bridge listening at http://localhost:${port}`);
});

// http://localhost:8886/level/8/entity/310000150
// http://localhost:8886/level/37/entity/14000014
// http://localhost:8886/level/37/entity/14000040
