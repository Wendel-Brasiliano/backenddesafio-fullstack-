const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/db');
const userRoutes = require('./src/routes/userRoutes');
const taskRoutes = require('./src/routes/taskRoutes');

const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);

app.get('/api/health', (req, res) => {
    res.status(200).json({ message: "API funcionando perfeitamente! 🚀" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
});