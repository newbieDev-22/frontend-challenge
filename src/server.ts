import express from "express";
import cors from "cors";
import userRoute from "./routes/user-route";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/users", userRoute);

const PORT = process.env.PORT || 8888;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
