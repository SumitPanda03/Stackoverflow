import mongoose from "mongoose";


const loginHistorySchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    browser: String,
    os: String,
    deviceType: String,
    ip: String,
    timestamp: { type: Date, default: Date.now },
});

export default mongoose.model("LoginHistory", loginHistorySchema);
