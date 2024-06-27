const express = require("express");
const connectToDatabase = require("../mongodb/connect");
const TransactionModel = require("../mongodb/transaction.model");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

// handle CORS
app.use(cors());
app.use(bodyParser.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.get('/',(req,res,next)=>{
  res.json({message:"App is Live!"})
})

// GET all transactions or transaction by ID
app.get("/transactions", async (req, res) => {
  const { id } = req.query;
  try {
    await connectToDatabase();
    if (!id) {
      const transactions = await TransactionModel.find().sort({ date: 1 }); // Sort by date ascending
      res.status(200).json(transactions);
    } else {
      const transaction = await TransactionModel.findOne({ id });
      res.status(200).json(transaction);
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: false,
      message: "Failed to retrieve transactions",
    });
  }
});

// PUT update transaction by ID
app.put("/transactions/:id", async (req, res) => {
  const transactionId = req.params.id;
  const updatedTransactionData = req.body;
  console.log(transactionId, updatedTransactionData);
  try {
    await connectToDatabase();
    const updatedTransaction = await TransactionModel.findOneAndUpdate(
      { id: transactionId },
      updatedTransactionData,
      { new: true } // to return the updated document
    );

    if (!updatedTransaction) {
      return res.status(404).json({
        success: false,
        message: "Transaction not found",
      });
    }

    res.status(200).json(updatedTransaction);
  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: false,
      message: "Failed to update transaction",
    });
  }
});

app.listen(4000, () => {
  console.log("Server listening on port 4000");
});