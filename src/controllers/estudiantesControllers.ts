import { Request, Response } from "express";


class EstudiantesControllers {
    constructor(){}

    consultar(req: Request, res: Response){
        try {
            res.send("Consultar");
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).send(error.message)
            }
        }
    }
    consultarDetalles(req: Request, res: Response){
        const {id} = req.params;
        try {
            res.send("Consultar detalles");
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).send(error.message)
            }
        }
    }
    ingresar(req: Request, res: Response){
        try {
            res.send("Ingresar");
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).send(error.message)
            }
        }
    }
    actualizar(req: Request, res: Response){
        const {id} = req.params
        try {
            res.send("Actualizar");
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).send(error.message)
            }
        }
    }
    eliminar(req: Request, res: Response){
        try {
            res.send("Eliminar");
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).send(error.message)
            }
        }
    }
}

export default new EstudiantesControllers;