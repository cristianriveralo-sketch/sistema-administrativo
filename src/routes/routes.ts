import { Router } from "express";
import multert from "multer";
const upload = multert({ storage: multert.memoryStorage()})

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
import * as authController from "../controllers/auth.controller";


const router = Router();


//login
router.post("/api/login", authController.login);

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
router.get("/api/cliente", clienteController.getAllClientes);
router.get("/api/cliente/:id", clienteController.getClienteById);
router.post("/api/cliente", clienteController.createCliente);
router.patch("/api/cliente/:id", clienteController.updateCliente);
router.delete("/api/cliente/:id", clienteController.deleteCliente);

// --- color ---
router.get("/api/color", colorController.getAllColors);
router.get("/api/color/:id", colorController.getColorById);
router.post("/api/color", colorController.createColor);
router.patch("/api/color/:id", colorController.updateColor);
router.delete("/api/color/:id", colorController.deleteColor);

// --- Usuario ---
router.get("/api/usuario", usuarioController.getAllUsuarios);
router.get("/api/usuario/:id", usuarioController.getUsuarioById);
router.post("/api/usuario", usuarioController.createUsuario);
router.patch("/api/usuario/:id", usuarioController.updateUsuario);
router.delete("/api/usuario/:id", usuarioController.deleteUsuario);

// --- Producto ---
router.get("/api/producto", productoController.getAllProductos);
router.get("/api/producto/:id", productoController.getProductoById);
router.post("/api/producto", productoController.createProducto);
router.patch("/api/producto/:id", productoController.updateProducto);
router.delete("/api/producto/:id", productoController.deleteProducto);

// --- Producto Completo ---
// --- Producto X Compra ---
router.get("/api/productoxcompras", productoXCompraController.getAllProductoXCompras);
router.get("/api/productoxcompras/:id", productoXCompraController.getProductoXCompraById);
router.post("/api/productoxcompras", productoXCompraController.createProductoXCompra);
router.patch("/api/productoxcompras/:id", productoXCompraController.updateProductoXCompra);
router.delete("/api/productoxcompras/:id", productoXCompraController.deleteProductoXCompra);

// --- Talla ---
router.get("/api/talla", tallaController.getAllTallas);
router.get("/api/talla/:id", tallaController.getTallaById);
router.post("/api/talla", tallaController.createTalla);
router.patch("/api/talla/:id", tallaController.updateTalla);
router.delete("/api/talla/:id", tallaController.deleteTalla);

// --- Proveedor ---
router.get("/api/proveedor", proveedorController.getAllProveedores);
router.get("/api/proveedor/:id", proveedorController.getProveedorById);
router.post("/api/proveedor", proveedorController.createProveedor);
router.patch("/api/proveedor/:id", proveedorController.updateProveedor);
router.delete("/api/proveedor/:id", proveedorController.deleteProveedor);

// --- Compra ---
router.get("/api/compra", compraController.getAllCompras);
router.get("/api/compra/:id", compraController.getCompraById);
router.post("/api/compra", compraController.createCompra);
router.delete("/api/compra/:id", compraController.deleteCompra);

// --- ProductoXCompra ---
router.get("/api/productoxcompras", productoXCompraController.getAllProductoXCompras);
router.get("/api/productoxcompras/ids/:id_compra_inventario", productoXCompraController.getIdsAxCByCompra);
router.get("/api/productoxcompras/:id", productoXCompraController.getProductoXCompraById);
router.post("/api/productoxcompras", productoXCompraController.createProductoXCompra);
router.patch("/api/productoxcompras/:id", productoXCompraController.updateProductoXCompra);
router.delete("/api/productoxcompras/:id", productoXCompraController.deleteProductoXCompra);

// --- Venta ---
router.get("/api/venta", ventaController.getAllVentas);
router.get("/api/venta/:id", ventaController.getVentaById);
router.post("/api/venta", ventaController.createVenta);
router.delete("/api/venta/:id", ventaController.deleteVenta);

// --- ProductoXVenta ---
router.get("/api/productoxventas", productoXVentaController.getAllProductoXVentas);
router.get("/api/productoxventas/:id", productoXVentaController.getProductoXVentaById);
router.post("/api/productoxventas", productoXVentaController.createProductoXVenta);
router.patch("/api/productoxventas/:id", productoXVentaController.updateProductoXVenta);
router.delete("/api/productoxventas/:id", productoXVentaController.deleteProductoXVenta);

// --- Pais ---
router.get("/api/pais", paisController.getAllPaiss);
router.get("/api/pais/:id", paisController.getPaisById);
router.post("/api/pais", paisController.createPais);
router.patch("/api/pais/:id", paisController.updatePais);
router.delete("/api/pais/:id", paisController.deletePais);

export default router;


