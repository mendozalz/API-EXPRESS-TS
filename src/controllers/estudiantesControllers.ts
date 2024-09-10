import { Request, Response } from "express";
import { Estudiantes } from "../models/estudiantesModels";
import { AppDataSource } from "../db/conexion";


const estudiante  = AppDataSource.getRepository(Estudiantes)
class EstudiantesControllers {
    constructor(){}

    async consultar(req: Request, res: Response){
        try {
            const data = await estudiante.find()
            res.status(200).json(data);
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).send(error.message)
            }
        }
    }
    async consultarDetalles(req: Request, res: Response){
        const {id} = req.params;
        try {
            const registro = await estudiante.findOneBy({id: Number(id)})
            res.status(200).json(registro)
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).send(error.message)
            }
        }
    }
    async ingresar(req: Request, res: Response){
        try {
            const registro = await estudiante.save(req.body);
            res.status(201).json(registro);
        } catch (err) {
            if (err instanceof Error)
                res.status(500).send(err.message);
        }
    }
    async actualizar(req: Request, res: Response){
        const {id} = req.params
        try {
            const registro = await estudiante.findOneBy({id: Number(id)})
            if (!registro) {
                throw new Error('Estudiante no encontrado')
            }
            await estudiante.update({id: Number(id)}, req.body);
            const registroActualizado = await estudiante.findOneBy({id: Number(id)});
            res.status(200).json(registroActualizado);
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).send(error.message)
            }
        }
    }
    async eliminar(req: Request, res: Response){
        const {id} = req.params
        try {
            const registro = await estudiante.findOneBy({id: Number(id)})
            if (!registro) {
                throw new Error('Estudiante no encontrado')
            }
            await estudiante.delete({id: Number(id)});
            res.status(204);
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).send(error.message)
            }
        }
    }
}

export default new EstudiantesControllers;