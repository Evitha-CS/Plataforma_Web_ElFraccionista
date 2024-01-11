import { obtenerRegiones, obtenerComunasPorRegion } from '../controllers/regiones.js';
import express from 'express';

const router = express.Router();

router.get('/regiones', obtenerRegiones);
router.get('/regiones/:regionId/comunas', obtenerComunasPorRegion);

export default router;