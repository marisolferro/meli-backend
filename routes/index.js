import routerx from 'express-promise-router';

import itemRouter from './item';

const router=routerx();

router.use('/items',itemRouter);

export default router; 