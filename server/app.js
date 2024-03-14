const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 8080;
 // todo: add app.use logict
const startApp = async (port=PORT) => {
    app.listen(port, async () => {
        console.log(`Example app listening at http://localhost:${port}`);
        // await runDbTests();
    })

};

const stopApp = async () => {
    console.log('APP STOPED');
}

module.exports = {startApp, stopApp, PORT};
