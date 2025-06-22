import { Category } from '../models/Category.js';

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    return res.json(categories);
  } catch (error) {
    return res.status(500).json({ message: 'Error al obtener las categorías', error });
  }
};

export const createCategory = async (req, res) => {
  try {
    const { name, icon, color } = req.body;

    if (!name || !icon || !color) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    const newCategory = new Category({ name, icon, color });
    await newCategory.save();

    return res.status(201).json({ message: 'Categoría creada exitosamente', category: newCategory });
  } catch (error) {
    return res.status(500).json({ message: 'Error al crear la categoría', error });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Category.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: 'Categoría no encontrada' });
    }

    return res.json({ message: 'Categoría eliminada correctamente' });
  } catch (error) {
    return res.status(500).json({ message: 'Error al eliminar la categoría', error });
  }
};
