 import { Transaction } from '../models/Transaction.js';

export const getTransactions = async (req, res) => {
  try {
    const userId = req.userId;

    const transactions = await Transaction.find({ user_id: userId })
      .populate('category') // trae los datos de la categoría
      .sort({ date: -1 });

    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener transacciones', error });
  }
};

export const getTransactionsByMonth = async (req, res) => {
  try {
    const userId = req.userId;
    const { month, year } = req.query;

    if (!month || !year) {
      return res.status(400).json({ message: 'Se requiere mes y año' });
    }

    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 1);

    const transactions = await Transaction.find({
      user_id: userId,
      date: { $gte: startDate, $lt: endDate }
    }).populate('category');

    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener transacciones por mes', error });
  }
};


export const createTransaction = async (req, res) => {
  try {
    const userId = req.userId;
    const { title, amount, type, category, date } = req.body;

    if (!title || !amount || !type || !category) {
      return res.status(400).json({ message: 'Todos los campos obligatorios deben estar presentes' });
    }

    // Validar la categoría
    const categoriaEncontrada = await Category.findById(category);

    if (!categoriaEncontrada) {
      return res.status(400).json({ message: 'Categoría no válida' });
    }

    if (type === 'ingreso' && categoriaEncontrada.name !== 'Ingreso') {
      return res.status(400).json({ message: 'Las transacciones de tipo ingreso solo pueden tener la categoría "Ingreso"' });
    }

    if (type === 'gasto' && categoriaEncontrada.name === 'Ingreso') {
      return res.status(400).json({ message: 'La categoría "Ingreso" no puede usarse para transacciones de tipo gasto' });
    }

    const newTransaction = new Transaction({
      user_id: userId,
      title,
      amount,
      type,
      category,
      date: date ? new Date(date) : new Date()
    });

    await newTransaction.save();

    res.status(201).json({ message: 'Transacción creada correctamente', transaction: newTransaction });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear transacción', error });
  }
};

export const getTransactionsByYear = async (req, res) => {
  try {
    const userId = req.userId;
    const { year } = req.query;

    if (!year) {
      return res.status(400).json({ message: 'Se requiere el año' });
    }

    const startDate = new Date(year, 0, 1);
    const endDate = new Date(Number(year) + 1, 0, 1);

    const transactions = await Transaction.find({
      user_id: userId,
      date: { $gte: startDate, $lt: endDate }
    }).populate('category');

    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener transacciones por año', error });
  }
};

export const getTransactionsByCategory = async (req, res) => {
  try {
    const userId = req.userId;
    const { categoryId } = req.params;

    const transactions = await Transaction.find({
      user_id: userId,
      category: categoryId
    }).populate('category');

    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener transacciones por categoría', error });
  }
};

export const getTransactionsByType = async (req, res) => {
  try {
    const userId = req.userId;
    const { type } = req.query;

    if (!type || !['ingreso', 'gasto'].includes(type)) {
      return res.status(400).json({ message: 'El tipo debe ser "ingreso" o "gasto"' });
    }

    const transactions = await Transaction.find({
      user_id: userId,
      type
    }).populate('category');

    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener transacciones por tipo', error });
  }
};

import { Category } from '../models/Category.js'; // Asegúrate de tener este import si no lo tienes ya

export const updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;
    const { title, amount, type, category, date } = req.body;

    if (!title || !amount || !type || !category) {
      return res.status(400).json({ message: 'Faltan campos requeridos' });
    }

    // Validar la categoría
    const categoriaEncontrada = await Category.findById(category);

    if (!categoriaEncontrada) {
      return res.status(400).json({ message: 'Categoría no válida' });
    }

    if (type === 'ingreso' && categoriaEncontrada.name !== 'Ingreso') {
      return res.status(400).json({ message: 'Las transacciones de tipo ingreso solo pueden tener la categoría "Ingreso"' });
    }

    if (type === 'gasto' && categoriaEncontrada.name === 'Ingreso') {
      return res.status(400).json({ message: 'La categoría "Ingreso" no puede usarse para transacciones de tipo gasto' });
    }

    const updated = await Transaction.findOneAndUpdate(
      { _id: id, user_id: userId },
      {
        title,
        amount,
        type,
        category,
        date: date ? new Date(date) : new Date()
      },
      { new: true } // Devuelve el documento actualizado
    );

    if (!updated) {
      return res.status(404).json({ message: 'Transacción no encontrada o no autorizada' });
    }

    res.json({ message: 'Transacción actualizada correctamente', transaction: updated });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar transacción', error });
  }
};





export const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const deleted = await Transaction.findOneAndDelete({ _id: id, user_id: userId });

    if (!deleted) {
      return res.status(404).json({ message: 'Transacción no encontrada o no autorizada' });
    }

    res.json({ message: 'Transacción eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar transacción', error });
  }
};
