import express from "express";
import cursosControllers from '../controllers/cursosControllers';
const router = express.Router();

router.get('/', cursosControllers.consultar);

router.post('/', cursosControllers.ingresar);

router.route('/:id')
    .get(cursosControllers.consultarDetalles)
    .put(cursosControllers.actualizar)
    .delete(cursosControllers.eliminar)

export default router; 