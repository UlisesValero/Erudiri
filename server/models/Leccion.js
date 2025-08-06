import mongoose from 'mongoose';

const leccionSchema = new mongoose.Schema({
  arista: { type: mongoose.Schema.Types.ObjectId, ref: 'Arista', required: true },
  content: { type: String, required: true },       // Texto generado por IA
  audioUrl: { type: String },                      // (opcional) URL al audio
  videoUrl: { type: String }                       // (opcional) URL al video
});

export default mongoose.model('Leccion', leccionSchema);
