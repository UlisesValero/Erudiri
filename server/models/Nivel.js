import mongoose from 'mongoose';

const nivelSchema = new mongoose.Schema({
  company: { type: mongoose.Schema.Types.ObjectId, ref: 'Empresa', required: true },
  title: { type: String, required: true }, // Introductorio, Intermedio, Avanzado
  description: { type: String },
  order: { type: Number, default: 1 }
});

export default mongoose.model('Nivel', nivelSchema);
