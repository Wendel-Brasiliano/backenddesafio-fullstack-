const StudyTask = require('../models/StudyTask');

// Criar nova tarefa 
exports.createTask = async (req, res) => {
    try {
        const { title, description } = req.body;
        const task = new StudyTask({
            title,
            description,
            user: req.user.id // Vincula a tarefa 
        });
        await task.save();
        res.status(201).json(task);
    } catch (error) {
        res.status(400).json({ message: "Erro ao criar tarefa de estudo" });
    }
};

// Listar todas as tarefas do usuário autenticado
exports.getTasks = async (req, res) => {
    try {
        const tasks = await StudyTask.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar tarefas" });
    }
};

// Deletar uma tarefa específica
exports.deleteTask = async (req, res) => {
    try {
        const task = await StudyTask.findById(req.params.id);
        if (!task || task.user.toString() !== req.user.id) {
            return res.status(404).json({ message: "Tarefa não encontrada" });
        }
        await task.deleteOne();
        res.json({ message: "Tarefa removida com sucesso!" });
    } catch (error) {
        res.status(500).json({ message: "Erro ao deletar tarefa" });
    }
};