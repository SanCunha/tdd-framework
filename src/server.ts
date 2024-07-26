import express from 'express';
import bodyParser from 'body-parser';
import testSuitesRouter from './routes/testSuiteRoutes';

const app = express();
app.use(bodyParser.json());

app.use('/api', testSuitesRouter); // Ensure the prefix matches

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

export { app, server };
