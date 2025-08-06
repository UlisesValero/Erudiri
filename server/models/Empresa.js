import mongoose from 'mongoose'

const empresaSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  createdAt: { type: Date, default: Date.now },
  assets: [String] // Links o paths a archivos subidos
})

export default mongoose.model('Empresa', empresaSchema)
