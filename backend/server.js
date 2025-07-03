import express from 'express';
import { connectDB } from './config/connectDB.js';
import users from './routes/userRoutes.js';
const PORT = process.env.PORT;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/users', users);

app.listen(PORT, () => {
	console.log(`Server stared on ${PORT}`);
});
