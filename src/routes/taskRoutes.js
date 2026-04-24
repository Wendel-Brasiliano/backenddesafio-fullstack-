const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const auth = require('../middlewares/authMiddleware');

// Todas as rotas abaixo exigem login (token)
router.post('/', auth, taskController.createTask);
router.get('/', auth, taskController.getTasks);
router.delete('/:id', auth, taskController.deleteTask);

module.exports = router;