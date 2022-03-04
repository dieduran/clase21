import mongoose from "mongoose";
import logger from "../logger.js"

const myModel = mongoose.model("tests", {
  nombre: { type: String, required: true },
  precio: { type: Number, required: true },
  foto: { type: String, required: true },
});

export function crearDao() {
  const cosasDao = {
    init: async () => {
      await mongoose.connect(
        "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false",
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          serverSelectionTimeoutMS: 5000,
        }
      );
      logger.info("Base de datos conectada...");
    },
    listar: async () => {
      try {
        return await myModel.find({}, { _id: 0, __v: 0 });
      } catch (error) {
        logger.info(`Error al listar los productos: ${error}`);
      }
    },
    buscar: async (nombreProducto) => {
      try {
        const buscado = await myModel.find(
          { nombre: nombreProducto },
          { _id: 0, __v: 0 }
        );
        if (buscado.length === 0) {
          return { error: "producto no encontrado" };
        } else {
          return buscado;
        }
      } catch (error) {
        logger.error(`Error en operación de base de datos ${error}`);
      }
    },
    insertar: async (productoNuevo) => {
      try {
        await myModel.create(productoNuevo);
      } catch (error) {
        logger.info(`Error al insertar un nuevo producto: ${error}`);
      }
    },
    borrar: async (nombreProducto) => {
      const buscado = await myModel.find({ nombre: nombreProducto });
      if (buscado.length === 0) {
        return { error: "elemento no encontrado" };
      }
      try {
        await myModel.deleteMany({ nombre: nombreProducto });
      } catch (error) {
        logger.info(`Error en operación de base de datos ${error}`);
      }
    },
    actualizar: async (nuevoElem, nombreElemento) => {
      const buscado = await myModel.find({ nombre: nombreElemento });
      let updateElem;
      if (buscado.length === 0) {
        return { error: "producto no encontrado" };
      } else {
        updateElem = { ...nuevoElem };
      }

      try {
        await myModel.updateOne(
          { nombre: nombreElemento },
          { $set: updateElem }
        );
      } catch (error) {
        logger.error(`Error en operación de base de datos ${error}`);
      }
    },
  };
  return cosasDao;
}
