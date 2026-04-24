const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

// Rotas q (Qualquer um pode acessar)
router.post('/register', userController.register);
router.post('/login', userController.login);

//  Segurança (A partir daqui, só com token JWT)
router.use(authMiddleware);

// Rotas PRIVADAS
router.get('/me', userController.getProfile);
router.get('/', userController.getAllUsers);
router.put('/:id', userController.updateUser);
router.patch('/:id/password', userController.updatePassword);
router.delete('/:id', userController.deleteUser);

module.exports = router;