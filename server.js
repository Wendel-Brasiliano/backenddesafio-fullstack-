require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/db');
const userRoutes = require('./src/routes/userRoutes');

const app = express();

// Inicializa a conexão com o banco de dados
connectDB();

// Middlewares essenciais
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Vai Conectar as rotas de Usuário (Tudo que for de usuário começará com /api/users)
app.use('/api/users', userRoutes);

// teste para saber se a API está online
app.get('/api/health', (req, res) => {
  res.status(200).json({ message: 'API funcionando perfeitamente! 🚀' });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});

// 
const taskRoutes = require('./src/routes/taskRoutes');

// 
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes); // Adicione esta linha aqui!

// 