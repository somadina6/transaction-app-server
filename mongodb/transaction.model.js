const { Schema, model } = require("mongoose");

const senderSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  IDNumber: { type: String, required: true },
});

const recipientSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  accountNumber: { type: String, required: true },
  bank: { type: String, required: true },
});

const transactionSchema = new Schema({
  id: { type: String, required: true },
  date: { type: Number, required: true },
  sender: { type: senderSchema, required: true },
  recipient: { type: recipientSchema, required: true },
  Amount: { type: Number, required: true },
  CurrencyCd: { type: String, required: true },
  Comments: { type: String, required: false },
  status: {
    type: String,
    enum: ["COMPLETED", "IN PROGRESS", "REJECTED", "PENDING"],
    required: true,
  },
});

const TransactionModel = model("Transaction", transactionSchema);

module.exports = TransactionModel;