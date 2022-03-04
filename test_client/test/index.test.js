import axios from "axios";
import assert from "assert";

import { crearServidor } from "../src/server.js";

import { crearDao } from "../src/daos/productosDao.js";

const contenedor = crearDao();

describe("Test de pruebas de API de servidor", () => {
  const servidor = crearServidor({ puerto: 8080, contenedor });
  const productoNuevo = {
    nombre: "Producto1",
    precio: 27,
    foto: "https://thumbs.dreamstime.com/b/sello-de-goma-retro-original-79086470.jpg",
  };
  const productoActualizado = {
    nombre: "Producto1",
    precio: 32, 
    foto: "https://thumbs.dreamstime.com/b/sello-de-goma-retro-original-79086470.jpg",
  };

  before(async () => {
    await contenedor.init();
    await servidor.conectar();
    axios.defaults.baseURL = "http://localhost:8080";
  });

  after(async () => {
    await servidor.desconectar();
  });

  it("debería estar el contenedor vacío: GET", async () => {
    const { data: cosas } = await axios.get("/");
    assert.deepStrictEqual(cosas, []);
  });

  it("debería poder agregar cosas: POST", async () => {
    const cosasAntes = [...(await contenedor.listar())];

    const { data: cosasActualizada } = await axios.post("/", productoNuevo);
    assert.deepStrictEqual(cosasActualizada, [...cosasAntes, productoNuevo]);
  });

  it("debería poder leer: GET", async () => {
    const { data: cosas } = await axios.get("/");
  });

  it("debería poder actualizar cosas: PUT", async () => {
    const cosasAntes = [...(await contenedor.buscar(productoNuevo.nombre))];
    const { data: cosasActualizada } = await axios.put(
      "/",
      productoActualizado
    );
    assert.notDeepStrictEqual(cosasActualizada, cosasAntes);
  });

  it("debería poder borrar: DELETE", async () => {
    const { data: cosas } = await axios.delete("/", {
      data: { producto: productoActualizado.nombre },
    });
    assert.deepStrictEqual(cosas, []);
  });
});
