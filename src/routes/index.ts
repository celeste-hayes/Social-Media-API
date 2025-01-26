import { Router } from 'express';
const router = Router();
import apiRoutes from './api';

router.use('/api', apiRoutes);

router.use((_req, res) => {
  res.status(404).send('Wrong route!');
});

export default router;

