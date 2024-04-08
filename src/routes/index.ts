"use strict"
import express, { Router } from 'express';
import Books from '../routes/books';
import Users from '../routes/users';
import Orders from '../routes/orders';
// const {jwt_middleware}= require('../middlewares/passport.js');
const mainRouter : Router = express.Router();

// Define your routes here
mainRouter.use('/book', Books);
mainRouter.use('/user', Users);
mainRouter.use('/order', Orders);

export default mainRouter;