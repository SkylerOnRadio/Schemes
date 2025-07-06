import express from 'express';
import cookieParser from 'cookie-parser';
import { errorHandler, notFound } from './middleware/errorHandler.js';
import { connectDB } from './config/connectDB.js';
import users from './routes/userRoutes.js';
import schemes from './routes/schemeRoutes.js';
import details from './routes/userDetailsRoutes.js';
import eligibility from './routes/schemeEligibilityRoutes.js';
const PORT = process.env.PORT;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

app.use('/api/users', users);
app.use('/api/schemes', schemes);
app.use('/api/user/', details);
app.use('/api/eligibility/', eligibility);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
	console.log(`Server stared on ${PORT}`);
});
