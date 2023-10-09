import { Router } from 'express';
import {body, oneOf, check, validationResult} from 'express-validator';
import { customMessage, handleInput } from './modules/middleware';

const router = Router();

router.get('/product', (req, res) => {
	res.json({ message: 'product' });
});
router.get('/product/:id', (req, res) => {});
// we use express-validator to validate the request body
// before we pass it to the handler. name is the name of the field `req.body.name`
// multiple middleware can be added in an array []

router.put('/product/:id',
	body('title').optional(),
	body('body').optional(),
	body('status').isIn(['IN_PROGRESS', 'LIVE', 'DEPRECATED', 'ARCHIVED']),
	body('version').optional(),
	customMessage('custom message'), handleInput,  (req, res) => {

});
router.post('/product', (req, res) => {});
router.delete('/product/:id', (req, res) => {});

router.get('/update', (req, res) => {});
router.get('/update/:id', (req, res) => {});
router.put('/update/:id', (req, res) => {});
router.post('/update',
	body('title').optional().isString(),
	body('body').optional().isString(),
 (req, res) => { });
router.delete('/update/:id', (req, res) => {});

router.get('/updatepoint', (req, res) => {});
router.get('/updatepoint/:id', (req, res) => {});
router.put('/updatepoint/:id', (req, res) => {});
router.post('/updatepoint', (req, res) => {});
router.delete('/updatepoint/:id', (req, res) => {});

export default router;