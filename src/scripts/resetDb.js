import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from '../models/Product.js';
import Cart from '../models/Cart.js';

dotenv.config();

const resetDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('🧼 Conectado a la base de datos');

    await Product.deleteMany({});
    await Cart.deleteMany({});

    console.log('✅ Productos y carritos eliminados correctamente');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error al limpiar la base de datos:', err);
    process.exit(1);
  }
};

resetDatabase();
