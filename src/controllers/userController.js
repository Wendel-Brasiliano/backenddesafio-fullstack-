const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// 1. Registrar Usuário
exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    // Criptografa a senha antes de salvar no banco
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const newUser = new User({ name, email, password: hashedPassword, role });
    await newUser.save();
    
    res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
  } catch (error) {
    res.status(400).json({ message: 'Erro ao cadastrar. O email pode já estar em uso.' });
  }
};

// 2. Fazer Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'Usuário não encontrado.' });

    // Compara a senha digitada com o hash salvo no banco
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Senha incorreta.' });

    // Gera o "crachá" de acesso (Token JWT)
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.status(200).json({ message: 'Login realizado com sucesso!', token });
  } catch (error) {
    res.status(500).json({ message: 'Erro interno no servidor.' });
  }
};

// 3. Carregar Meu Perfil
exports.getProfile = async (req, res) => {
  try {
    // req.user.id vem do nosso authMiddleware!
    const user = await User.findById(req.user.id).select('-password'); 
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar perfil.' });
  }
};

// 4. Listar Todos os Usuários
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao listar usuários.' });
  }
};

// 5. Atualizar Usuário
exports.updateUser = async (req, res) => {
  try {
    const { name, email, role } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id, 
      { name, email, role }, 
      { new: true } // Retorna o dado já atualizado
    ).select('-password');
    res.status(200).json({ message: 'Usuário atualizado!', updatedUser });
  } catch (error) {
    res.status(400).json({ message: 'Erro ao atualizar usuário.' });
  }
};

// 6. Atualizar Senha
exports.updatePassword = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    await User.findByIdAndUpdate(req.params.id, { password: hashedPassword });
    res.status(200).json({ message: 'Senha alterada com sucesso!' });
  } catch (error) {
    res.status(400).json({ message: 'Erro ao alterar senha.' });
  }
};

// 7. Deletar Usuário
exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Usuário removido com sucesso!' });
  } catch (error) {
    res.status(400).json({ message: 'Erro ao remover usuário.' });
  }
};