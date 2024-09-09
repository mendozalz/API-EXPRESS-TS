import express from "express";
import estudiantesControllers from '../controllers/estudiantesControllers';
const router = express.Router();

router.get('/', estudiantesControllers.consultar);

router.post('/', estudiantesControllers.ingresar);

router.put('/', estudiantesControllers.actualizar);

router.delete('/', estudiantesControllers.eliminar);

router.route('/:id')
    .get(estudiantesControllers.consultarDetalles)
    .put(estudiantesControllers.actualizar)
    .delete(estudiantesControllers.eliminar)

export default router;