import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

export const userSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  contraseña: { type: String, required: true },
  empresa: { type: mongoose.Schema.Types.ObjectId, ref: 'Empresa'},
  rol: { type: String, enum: ['admin', 'empleado'], required: true},
  progreso: [
    {
      nivel: { type: mongoose.Schema.Types.ObjectId, ref: 'Nivel' },
      aristasCompletadas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Arista' }]
    }
  ]
}, { timestamps: true })

userSchema.pre('save', async function (next) {
  if (!this.isModified('contraseña')) return next()
  const salt = await bcrypt.genSalt(10)
  this.contraseña = await bcrypt.hash(this.contraseña, salt)
  next()
})

userSchema.methods.compararContraseña = function (input) {
  return bcrypt.compare(input, this.contraseña)
}

export const userModel = mongoose.model('usuario', userSchema)
