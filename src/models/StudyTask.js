const mongoose = require('mongoose');

const studyTaskSchema = new mongoose.Schema({
  title: { type: String, required: true }, // Ex: Inquérito Policial
  subject: { type: String, required: true }, // Ex: Processo Penal
  status: { type: String, enum: ['pendente', 'concluído'], default: 'pendente' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

module.exports = mongoose.model('StudyTask', studyTaskSchema);