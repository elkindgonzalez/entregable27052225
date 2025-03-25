// src/config/db.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('🟢 Conexión a MongoDB Atlas exitosa');
  } catch (error) {
    console.error('🔴 Error al conectar a MongoDB:', error.message);
    process.exit(1); // Detiene el servidor si falla la conexión
  }
};

export default connectDB;
