import express from 'express';
import router from './router';
import morgan from 'morgan';
import {protect} from './../src/modules/auth';
import { createNewUser, signin } from './handlers/users';

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// using middleware to add a message to the request object
// but we also can use it directly in the routes like:
// app.get("/todo/:id", myMiddleware, my2ndMiddleware, handler);
// or
// app.get("/todo/:id", [myMiddleware, my2ndMiddleware], handler);
app.use((req, res, next) => {
  req.middlewareMsg = 'middlewareMsg';
  next();
});

const customLogger = (message) => (req, res, next) => {
  console.log(`customLogger: ${message}`);
  next();
};
app.use(customLogger('customLogger message'));


app.get('/', (req, res) => {
  res.status(200).send('hello');
  res.send('hello');
  res.json({ message: 'hello' });
});


app.use('/api', protect, router);
app.post('/user', createNewUser)
app.post('/signin', signin)

app.use((err, req, res, next) => {
  if (err.type === 'auth') {
    res.status(401).json({ error: 'unauthorized'});
  } else if(err.type === 'input') {
    res.status(400).json({ error: 'invalid input' });
  } else {
    res.status(500).json({ error: 'user error'});
  }
});

export default app;

