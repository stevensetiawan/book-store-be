// src/app.ts
import express, { Request, Response } from 'express';
import cors from 'cors';
import mainRouter from './routes/index';
import session from 'express-session';
import { createClient } from 'redis';
import RedisStore from 'connect-redis';
import passport from 'passport';
import swaggerUi from 'swagger-ui-express';
import dotenv from 'dotenv';
import * as yaml from 'yamljs';

dotenv.config();
const app = express();
const redisClient = createClient();;
redisClient.connect().catch(console.error)

app.use(express.json());
app.use(cors());
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript!');
});

const sessionOptions: session.SessionOptions = {
  // Your session options here
  secret: 'your-secret', // Change this to a secure secret
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 30 * 24 * 60 * 60 * 1000
  }
};

// Read Swagger YAML file
const swaggerDocument = yaml.load('/Users/stevensetiawan/Documents/github/book-store-be/swagger.yaml');
// Serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(session({
  store: new RedisStore({ client: redisClient }), 
  ...sessionOptions
}));

app.use(passport.initialize());
app.use(passport.session());
app.use('/api/v1/book-store', mainRouter)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
