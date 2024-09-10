import express from "express";
import proseforesControllers from '../controllers/profesoresControllers';
const router = express.Router();

router.get('/', proseforesControllers.consultar);

router.post('/', proseforesControllers.ingresar);

router.route('/:id')
.get(proseforesControllers.consultar)
.put(proseforesControllers.actualizar)
.delete(proseforesControllers.eliminar)

export default router; 