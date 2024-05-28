// src/server.ts
import { config } from "dotenv";
import app from "./app";

config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
