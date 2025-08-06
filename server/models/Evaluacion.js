import mongoose from 'mongoose';

const opcionSchema = new mongoose.Schema({
  texto: String,
  correcta: Boolean, // solo para multiple choice
});

const preguntaSchema = new mongoose.Schema({
  tipo: { type: String, enum: ['multiple-choice', 'desarrollo'], required: true },
  enunciado: { type: String, required: true },
  opciones: [opcionSchema], // solo se usa si es multiple-choice
});

const evaluacionSchema = new mongoose.Schema({
  arista: { type: mongoose.Schema.Types.ObjectId, ref: 'Arista', required: true },
  preguntas: [preguntaSchema],
  nivel: { type: mongoose.Schema.Types.ObjectId, ref: 'Nivel', required: true },
  tipo: { type: String, enum: ['multiple-choice', 'desarrollo'], required: true },
}, { timestamps: true });

export default mongoose.model('Evaluacion', evaluacionSchema);
