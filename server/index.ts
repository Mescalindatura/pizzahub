import express from "express";
import bodyParser from "body-parser";

export const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// todo: add app.use logics
app.listen(PORT, async () => {
    console.log(`Server is listening at http://localhost:${PORT}`);
    // await runDbTests();
});