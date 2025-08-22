import 'dotenv/config';
import express from 'express';  
import cors from 'cors';
import connectDB from './configs/mongodb.js';


// config app

const PORT = process.env.PORT || 4000;
const app = express();
await connectDB();

// middlewares
app.use(express.json());
app.use(cors());

// api routes
app.get('/', (req, res) => {
  res.send('API is running...');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}   );