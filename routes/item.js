import routerx from 'express-promise-router';
import itemController from '../controllers/itemController';

const router=routerx();

router.get('/', itemController.list);
router.get('/:id', itemController.find);

export default router;