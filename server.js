import express from 'express';
<<<<<<< HEAD
import Routes from './routes/index';

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
Routes(app);
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app;
=======
import dotenv from 'dotenv';
import routes from './routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use('/', routes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
>>>>>>> 7e86e1ceb75b48b7a720208d50989ec23efd901f
