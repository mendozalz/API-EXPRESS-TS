import { Request, Response } from "express";
import { AppDataSource } from "../db/conexion";
import { Profesores } from "../models/profesoresModels";


const profesor  = AppDataSource.getRepository(Profesores)
class ProfesoresControllers {
    constructor(){}

    async consultar(req: Request, res: Response){
        try {
            const data = await profesor.find()
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
            const registro = await profesor.findOneBy({id: Number(id)})
            res.status(200).json(registro)
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).send(error.message)
            }
        }
    }
    async ingresar(req: Request, res: Response){
        try {
            const registro = await profesor.save(req.body);
            res.status(201).json(registro);
        } catch (err) {
            if (err instanceof Error)
                res.status(500).send(err.message);
        }
    }
    async actualizar(req: Request, res: Response){
        const {id} = req.params
        try {
            const registro = await profesor.findOneBy({id: Number(id)})
            if (!registro) {
                throw new Error('profesor no encontrado')
            }
            await profesor.update({id: Number(id)}, req.body);
            const registroActualizado = await profesor.findOneBy({id: Number(id)});
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
            const registro = await profesor.findOneBy({id: Number(id)})
            if (!registro) {
                throw new Error('profesor no encontrado')
            }
            await profesor.delete({id: Number(id)});
            res.status(204);
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).send(error.message)
            }
        }
    }
}

export default new ProfesoresControllers;