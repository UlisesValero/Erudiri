import {companyModel} from '../models/Empresa.js'

export const createCompany = async (req, res) => {
  try {
    const empresa = await companyModel.create(req.body)
    res.status(201).json(empresa)
  } catch (error) {
    res.status(500).json({ message: 'Error al crear empresa' })
  }
}

export const getCompanies = async (req, res) => {
  try {
    const empresas = await companyModel.find()
    res.json(empresas)
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener empresas' })
  }
}

export const getCompanyById = async (req, res) => {
  try {
    const empresa = await companyModel.findById(req.params.id)
    if (!empresa) return res.status(404).json({ message: 'Empresa no encontrada' })
    res.json(empresa);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener empresa' })
  }
}

export const postCompany = async (req, res) => {
  try {
    const empresa = await companyModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!empresa) return res.status(404).json({ message: 'Empresa no encontrada' })
    res.json(empresa)
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar empresa' })
  }
}

export const deleteCompany = async (req, res) => {
  try {
    const empresa = await companyModel.findByIdAndDelete(req.params.id)
    if (!empresa) return res.status(404).json({ message: 'Empresa no encontrada' })
    res.json({ message: 'Empresa eliminada correctamente' })
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar empresa' })
  }
}
