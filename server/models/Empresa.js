import mongoose from 'mongoose'

export const companySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  createdAt: { type: Date, default: Date.now },
  assets: [String] // Links o paths a archivos subidos
})

export const companyModel = mongoose.model('company', companySchema)
