import express, { Application  } from 'express';
import router from '../routes/routes';

const app:Application = express()


app.use(express.json())
app.use('/api',router)

app.listen(3000)