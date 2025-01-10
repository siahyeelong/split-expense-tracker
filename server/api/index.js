import express from "express";
import cors from "cors";
import records from "../routes/record.js";
import colors from "colors";

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/record", records);

// start the Express server
if (process.env.NODE_ENV === 'dev') {
    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`.green.bold);
    });
}

export default app