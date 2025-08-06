import mongoose from 'mongoose';

const aristaSchema = new mongoose.Schema({
  level: { type: mongoose.Schema.Types.ObjectId, ref: 'Nivel', required: true },
  title: { type: String, required: true }, // Historia, Producto, Procesos internos...
  order: { type: Number, default: 1 }
});

export default mongoose.model('Arista', aristaSchema);
