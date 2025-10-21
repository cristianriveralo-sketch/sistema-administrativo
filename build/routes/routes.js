"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const upload = (0, multer_1.default)({ storage: multer_1.default.memoryStorage() });
const categoriaController = __importStar(require("../controllers/categoria.controller"));
const personaController = __importStar(require("../controllers/persona.controller"));
const clienteController = __importStar(require("../controllers/cliente.controller"));
const usuarioController = __importStar(require("../controllers/usuario.controller"));
const productoController = __importStar(require("../controllers/producto.controller"));
const tallaController = __importStar(require("../controllers/talla.controller"));
const proveedorController = __importStar(require("../controllers/proveedor.controller"));
const compraController = __importStar(require("../controllers/compra.controller"));
const productoXCompraController = __importStar(require("../controllers/producto_x_compra.controller"));
const ventaController = __importStar(require("../controllers/venta.controller"));
const productoXVentaController = __importStar(require("../controllers/producto_x_venta.controller"));
const paisController = __importStar(require("../controllers/pais.controller"));
const colorController = __importStar(require("../controllers/color.controller"));
const productoCompletoController = __importStar(require("../controllers/producto_x_completo.controller"));
const authController = __importStar(require("../controllers/auth.controller"));
const router = (0, express_1.Router)();
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
router.get("/api/productocompleto", productoCompletoController.getAllProductoCompletos);
router.get("/api/productocompleto/:id", productoCompletoController.getProductoCompletoById);
router.post("/api/productocompleto", upload.single("foto"), productoCompletoController.createProductoCompleto);
router.patch("/api/productocompleto/:id", productoCompletoController.updateProductoCompleto);
router.delete("/api/productocompleto/:id", productoCompletoController.deleteProductoCompleto);
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
exports.default = router;
