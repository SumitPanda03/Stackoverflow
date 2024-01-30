import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import useragent from "express-useragent"; 
import userRoutes from "./routes/users.js";
import questionRoutes from "./routes/Questions.js";
import answerRoutes from "./routes/Answers.js";
import connectDB from "./connectMongoDb.js";
import expressListEndpoints from 'express-list-endpoints'

dotenv.config();
connectDB();
const app = express();
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use(useragent.express());

// app.use('/',(req, res) => {
//     res.send("This is a stack overflow clone API")
// })
app.get('/', (req,res) => {
  const response = {
    message: 'List of Endpoints:',
    paths: ['/user/getAllUsers', '/login', '/answer'],
  };
  res.json(response);
})
app.use("/user", userRoutes);
app.use("/questions", questionRoutes);
app.use("/answer", answerRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
