import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const usuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  contraseña: { type: String, required: true },
  empresa: { type: mongoose.Schema.Types.ObjectId, ref: 'Empresa', required: true },
  rol: { type: String, enum: ['admin', 'empleado'], default: 'empleado' },
  progreso: [
    {
      nivel: { type: mongoose.Schema.Types.ObjectId, ref: 'Nivel' },
      aristasCompletadas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Arista' }]
    }
  ]
}, { timestamps: true });

// Hashea contraseña antes de guardar
usuarioSchema.pre('save', async function (next) {
  if (!this.isModified('contraseña')) return next();
  const salt = await bcrypt.genSalt(10);
  this.contraseña = await bcrypt.hash(this.contraseña, salt);
  next();
});

// Comparar contraseña ingresada
usuarioSchema.methods.compararContraseña = function (input) {
  return bcrypt.compare(input, this.contraseña);
};

export default mongoose.model('Usuario', usuarioSchema);
