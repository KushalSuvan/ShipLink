import express, { Request, Response, NextFunction } from 'express';

const app = express();

app.get("/", (_:Request, res: Response, next: NextFunction) => {
    res.json({
        response: "Hello, Vatar"
    })

    next()
})

export default app;
