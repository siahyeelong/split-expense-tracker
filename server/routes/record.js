import express from "express";
import db from "../db/connection.js";
import { ObjectId } from "mongodb"; // This help convert the id from string to ObjectId for the _id.

// router is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const router = express.Router();

// This section will help you get a list of all the records.
router.get("/", async (req, res) => {
    try {
        let collection = await db.collection(process.env.COLLECTION);
        let results = await collection.find({}).toArray();
        res.send(results).status(200);
    } catch (error) {
        console.log(`get error:\n${error}`.red);
    }
});

router.get("/test", async (req, res) => {
    res.send('hello from server!').status(200);
});

// This section will help you get a single record by id
router.get("/:id", async (req, res) => {
    try {
        let collection = await db.collection(process.env.COLLECTION);
        let query = { _id: new ObjectId(req.params.id) };
        let result = await collection.findOne(query);

        if (!result) res.send("Not found").status(404);
        else res.send(result).status(200);
    } catch (error) {
        console.log(`get id error:\n${error}`.red);
        res.send("Not found").status(404);
    }
});

// This section will help you create a new record.
/** example body structure:
{
    "recipients": ["person1", "person2", "person4"],
    "category": "Category",
    "price": 13.45,
    "description": "text",
    "payer": "person",
}
 */
router.post("/", async (req, res) => {
    try {
        let newRecord = {
            recipients: req.body.recipients,
            category: req.body.category,
            price: req.body.price,
            description: req.body.description,
            payer: req.body.payer,
            timestamp: new Date(),
        };
        let collection = await db.collection(process.env.COLLECTION);
        let result = await collection.insertOne(newRecord);
        res.send(result).status(204);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error adding record");
    }
});

// This section will help you update a record by id.
router.patch("/:id", async (req, res) => {
    try {
        const query = { _id: new ObjectId(req.params.id) };
        const updates = {
            $set: {
                recipients: req.body.recipients,
                category: req.body.category,
                price: req.body.price,
                description: req.body.description,
                payer: req.body.payer,
                timestamp: new Date(),
            },
        };

        let collection = await db.collection(process.env.COLLECTION);
        let result = await collection.updateOne(query, updates);
        res.send(result).status(200);
    } catch (err) {
        console.error(err.red);
        res.status(500).send("Error updating record");
    }
});

// This section will help you delete a record
router.delete("/:id", async (req, res) => {
    try {
        const query = { _id: new ObjectId(req.params.id) };

        const collection = db.collection(process.env.COLLECTION);
        let result = await collection.deleteOne(query);

        res.send(result).status(200);
    } catch (err) {
        console.error(err.red);
        res.status(500).send("Error deleting record");
    }
});

export default router;