import config from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';


import categoryRoutes from './server/routes/CategoryRoutes';
import gemRoutes from './server/routes/gemRoutes';
import coatingRoutes from "./server/routes/CoatingRoutes";
import metalRoutes from "./server/routes/MetalRoutes";
import stoneRoutes from "./server/routes/StoneRoutes";


config.config();

const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const port = process.env.PORT || 8000;

app.use('/api/v1/categories', categoryRoutes);
app.use('/api/v1/gems', gemRoutes);
app.use('/api/v1/coatings', coatingRoutes);
app.use('/api/v1/metals', metalRoutes);
app.use('/api/v1/stones', stoneRoutes);

// when a random route is inputed
app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to this API.',
}));

app.listen(port, () => {
  console.log(`Server is running on PORT ${port}`);
});

export default app;