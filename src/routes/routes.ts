import { Router } from "express";

import * as categoriaController from "../controllers/categoria.controller";
import * as personaController from "../controllers/persona.controller";
import * as clienteController from "../controllers/cliente.controller";
import * as usuarioController from "../controllers/usuario.controller";
import * as productoController from "../controllers/producto.controller";
import * as tallaController from "../controllers/talla.controller";
import * as proveedorController from "../controllers/proveedor.controller";
import * as compraController from "../controllers/compra.controller";
import * as productoXCompraController from "../controllers/producto_x_compra.controller";
import * as ventaController from "../controllers/venta.controller";
import * as productoXVentaController from "../controllers/producto_x_venta.controller";
import * as paisController from "../controllers/pais.controller";
import * as colorController from "../controllers/color.controller";
import * as productoCompletoController from "../controllers/producto_x_completo.controller";


const router = Router();

// --- Categoría ---
router.get("/api/categoria", categoriaController.getAllCategorias);
router.get("/api/categoria/:id", categoriaController.getCategoriaById);
router.post("/api/categoria", categoriaController.createCategoria);
router.patch("/api/categoria/:id", categoriaController.updateCategoria);
router.delete("/api/categoria/:id", categoriaController.deleteCategoria);

// --- Persona ---
router.get("/api/personas", personaController.getAllPersonas);
router.get("/api/personas/:id", personaController.getPersonaById);
router.post("/api/personas", personaController.createPersona);
router.patch("/api/personas/:id", personaController.updatePersona);
router.delete("/api/personas/:id", personaController.deletePersona);

// --- Cliente ---
router.get("/api/clientes", clienteController.getAllClientes);
router.get("/api/clientes/:id", clienteController.getClienteById);
router.post("/api/clientes", clienteController.createCliente);
router.patch("/api/clientes/:id", clienteController.updateCliente);
router.delete("/api/clientes/:id", clienteController.deleteCliente);

// --- color ---
router.get("/api/colors", colorController.getAllColors);
router.get("/api/colors/:id", colorController.getColorById);
router.post("/api/colors", colorController.createColor);
router.patch("/api/colors/:id", colorController.updateColor);
router.delete("/api/colors/:id", colorController.deleteColor);

// --- Usuario ---
router.get("/api/usuarios", usuarioController.getAllUsuarios);
router.get("/api/usuarios/:id", usuarioController.getUsuarioById);
router.post("/api/usuarios", usuarioController.createUsuario);
router.patch("/api/usuarios/:id", usuarioController.updateUsuario);
router.delete("/api/usuarios/:id", usuarioController.deleteUsuario);

// --- Producto ---
router.get("/api/productos", productoController.getAllProductos);
router.get("/api/productos/:id", productoController.getProductoById);
router.post("/api/productos", productoController.createProducto);
router.patch("/api/productos/:id", productoController.updateProducto);
router.delete("/api/productos/:id", productoController.deleteProducto);

// --- Producto Completo ---
router.get("/api/productocompletos", productoCompletoController.getAllProductoCompletos);
router.get("/api/productocompletos/:id", productoCompletoController.getProductoCompletoById);
router.post("/api/productocompletos", productoCompletoController.createProductoCompleto);
router.patch("/api/productocompletos/:id", productoCompletoController.updateProductoCompleto);
router.delete("/api/productocompletos/:id", productoCompletoController.deleteProductoCompleto);
// --- Talla ---
router.get("/api/tallas", tallaController.getAllTallas);
router.get("/api/tallas/:id", tallaController.getTallaById);
router.post("/api/tallas", tallaController.createTalla);
router.patch("/api/tallas/:id", tallaController.updateTalla);
router.delete("/api/tallas/:id", tallaController.deleteTalla);

// --- Proveedor ---
router.get("/api/proveedores", proveedorController.getAllProveedores);
router.get("/api/proveedores/:id", proveedorController.getProveedorById);
router.post("/api/proveedores", proveedorController.createProveedor);
router.patch("/api/proveedores/:id", proveedorController.updateProveedor);
router.delete("/api/proveedores/:id", proveedorController.deleteProveedor);

// --- Compra ---
router.get("/api/compras", compraController.getAllCompras);
router.get("/api/compras/:id", compraController.getCompraById);
router.post("/api/compras", compraController.createCompra);
router.patch("/api/compras/:id", compraController.updateCompra);
router.delete("/api/compras/:id", compraController.deleteCompra);

// --- ProductoXCompra ---
router.get("/api/productoxcompras", productoXCompraController.getAllProductoXCompras);
router.get("/api/productoxcompras/:id", productoXCompraController.getProductoXCompraById);
router.post("/api/productoxcompras", productoXCompraController.createProductoXCompra);
router.patch("/api/productoxcompras/:id", productoXCompraController.updateProductoXCompra);
router.delete("/api/productoxcompras/:id", productoXCompraController.deleteProductoXCompra);

// --- Venta ---
router.get("/api/ventas", ventaController.getAllVentas);
router.get("/api/ventas/:id", ventaController.getVentaById);
router.post("/api/ventas", ventaController.createVenta);
router.patch("/api/ventas/:id", ventaController.updateVenta);
router.delete("/api/ventas/:id", ventaController.deleteVenta);

// --- ProductoXVenta ---
router.get("/api/productoxventas", productoXVentaController.getAllProductoXVentas);
router.get("/api/productoxventas/:id", productoXVentaController.getProductoXVentaById);
router.post("/api/productoxventas", productoXVentaController.createProductoXVenta);
router.patch("/api/productoxventas/:id", productoXVentaController.updateProductoXVenta);
router.delete("/api/productoxventas/:id", productoXVentaController.deleteProductoXVenta);

// --- Pais ---
router.get("/api/pais", paisController.getAllPais);
router.get("/api/pais/:id", paisController.getPaisById);
router.post("/api/pais", paisController.createPais);
router.patch("/api/pais/:id", paisController.updatePais);
router.delete("/api/pais/:id", paisController.deletePais);

export default router;

