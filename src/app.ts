import express, { Express, Request, Response } from 'express';

const app: Express = express();
const port = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
    res.send('¡Hola desde Express!');
});

app.listen(port, () => {
    console.log(`Servidor iniciado en el puerto ${port}`);
});