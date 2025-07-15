const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001
const cors = require("cors");
app.use(cors());
app.use(express.json()); 

const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);


app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
