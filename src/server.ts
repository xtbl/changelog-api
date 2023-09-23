import express from 'express';
import router from './router';
import morgan from 'morgan';

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
  res.status(200).send('Hello World!');
  res.send('Hello World!');
  res.json({ message: 'Hello World!' });
});


app.use('/api', router);

export default app;

