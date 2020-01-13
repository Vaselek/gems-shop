import config from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import bearerToken from 'express-bearer-token';



import categoryRoutes from './server/routes/CategoryRoutes';
import gemRoutes from './server/routes/gemRoutes';
import coatingRoutes from "./server/routes/CoatingRoutes";
import metalRoutes from "./server/routes/MetalRoutes";
import stoneRoutes from "./server/routes/StoneRoutes";
import userRoutes from "./server/routes/UserRoutes";


config.config();

const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bearerToken());

const port = process.env.PORT || 8000;

// const clientDir = path.join(__dirname, '../../gems-client');
// app.use(express.static(`${clientDir}/public`));

app.use('/api/v1/categories', categoryRoutes);
app.use('/api/v1/gems', gemRoutes);
app.use('/api/v1/coatings', coatingRoutes);
app.use('/api/v1/metals', metalRoutes);
app.use('/api/v1/stones', stoneRoutes);
app.use('/api/v1/users', userRoutes);

// when a random route is inputed
app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to this API.',
}));

app.listen(port, () => {
  console.log(`Server is running on PORT ${port}`);
});

export default app;