import app from './server';
import dotenv from 'dotenv';
dotenv.config();

app.listen(3001, () => {
  console.log('App running on port http://localhost:3001');
});

