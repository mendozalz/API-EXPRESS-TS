import { Request, Response } from "express";
import { Cursos } from "../models/cursosModels";
import { AppDataSource } from "../db/conexion";
import { Profesores } from "../models/profesoresModels";
import { Estudiantes } from "../models/estudiantesModels";

const curso  = AppDataSource.getRepository(Cursos)
const profesoData = AppDataSource.getRepository(Profesores)
const estudianteData = AppDataSource.getRepository(Estudiantes)
class CursosControllers {
    constructor(){}

    async consultar(req: Request, res: Response){
        try {
            const data = await curso.find({relations: {profesor: true, estudiantes: true}})
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
            const registro = await curso.findOneBy({id: Number(id)})
            res.status(200).json(registro)
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).send(error.message)
            }
        }
    }
    async ingresar(req: Request, res: Response){
        try {
            const {profesor} = req.body;
            const profesores = await profesoData.findOneBy({id: Number(profesor)})
            if (!profesores) {
                throw new Error('Profesor no encontrado');
            }
            const registro = await curso.save(req.body);
            res.status(201).json(registro);
        } catch (err) {
            if (err instanceof Error)
                res.status(500).send(err.message);
        }
    }
    async actualizar(req: Request, res: Response){
        const {id} = req.params
        try {
            const {profesor_id} = req.body;
            const profesores = await profesoData.findOneBy({id: Number(profesor_id)})
            if (!profesores) {
                throw new Error('Profesor no encontrado');
            }
            const registro = await curso.findOneBy({id: Number(id)})
            if (!registro) {
                throw new Error('curso no encontrado')
            }
            await curso.update({id: Number(id)}, req.body);
            const registroActualizado = await curso.findOneBy({id: Number(id)});
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
            const registro = await curso.findOneBy({id: Number(id)})
            if (!registro) {
                throw new Error('Estudiante no encontrado')
            }
            await curso.delete({id: Number(id)});
            res.status(204);
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).send(error.message)
            }
        }
    }

    async asociarEstudiante(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const { estudiante_id, curso_id } = req.body;
            const estudiante = await estudianteData.findOne({ where: { id: Number(estudiante_id) } });
            const cursoEncontrado = await curso.findOne({ 
                where: { id: Number(curso_id) },
                relations: ['estudiantes']
            });
    
            if (!estudiante) {
                return res.status(404).json({ message: 'Estudiante no encontrado' });
            }
            if (!cursoEncontrado) {
                return res.status(404).json({ message: 'Curso no encontrado' });
            }
    
            if (!cursoEncontrado.estudiantes) {
                cursoEncontrado.estudiantes = [];
            }
            cursoEncontrado.estudiantes.push(estudiante);
    
            const registro = await curso.save(cursoEncontrado);
            res.status(200).json(registro);
    
        } catch (err) {
            if (err instanceof Error)
                res.status(500).json({ message: err.message });
        }
    }
}

export default new CursosControllers;