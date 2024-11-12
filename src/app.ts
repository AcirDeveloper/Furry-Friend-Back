import express, { Express, Request, Response } from 'express';
import routes from './shared/routes/routes';
import { errorResponse } from './shared/utils/response.utils';
const app: Express = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/', (req: Request, res: Response) => {
    res.send('¡Hola Furry Friend!');
});

app.use('/api', routes);

app.use((req, res, next) => {
    errorResponse({ message: "Ruta no encontrada", res, status: 404 });
});

app.listen(port, () => {
    console.log(`Servidor iniciado en el puerto ${port}`);
});