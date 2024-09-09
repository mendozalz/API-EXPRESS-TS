import express, { Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import estudiantesRouter from './routes/estudiantesRoutes';
import profesoresRouter from './routes/profesoresRoutes';
import cursosRouter from './routes/cursosRoutes';

const app = express();
app.use(morgan('dev'));
app.use(cors());

app.get('/', (req:Request, res:Response)=>{
    console.log("Hola mi API");
    res.send("Hola mundo desde mi API TS")
})

app.use('/estudiantes', estudiantesRouter);
app.use('/profesores', profesoresRouter);
app.use('/cursos', cursosRouter);

export default app;