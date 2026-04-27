const StudyTask = require('../models/StudyTask');

exports.createTask = async (req, res) => {
    try {
        const task = new StudyTask({ title: req.body.title, user: req.user.id });
        await task.save();
        res.status(201).json(task);
    } catch (error) {
        res.status(400).json({ message: "Erro ao criar tarefa" });
    }
};

exports.getTasks = async (req, res) => {
    try {
        const tasks = await StudyTask.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar tarefas" });
    }
};

exports.deleteTask = async (req, res) => {
    try {
        await StudyTask.findOneAndDelete({ _id: req.params.id, user: req.user.id });
        res.json({ message: "Tarefa removida!" });
    } catch (error) {
        res.status(500).json({ message: "Erro ao deletar" });
    }
};