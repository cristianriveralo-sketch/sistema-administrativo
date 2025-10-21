"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticuloCompra = exports.Compra = exports.Proveedor = exports.ArticuloVenta = exports.Venta = exports.ProductoCompleto = exports.Talla = exports.Color = exports.Producto = exports.Categoria = exports.Cliente = exports.Usuario = exports.Persona = exports.Pais = void 0;
const pais_model_1 = require("./pais.model");
Object.defineProperty(exports, "Pais", { enumerable: true, get: function () { return pais_model_1.Pais; } });
const persona_model_1 = require("./persona.model");
Object.defineProperty(exports, "Persona", { enumerable: true, get: function () { return persona_model_1.Persona; } });
const usuario_model_1 = require("./usuario.model");
Object.defineProperty(exports, "Usuario", { enumerable: true, get: function () { return usuario_model_1.Usuario; } });
const cliente_model_1 = require("./cliente.model");
Object.defineProperty(exports, "Cliente", { enumerable: true, get: function () { return cliente_model_1.Cliente; } });
const categoria_model_1 = require("./categoria.model");
Object.defineProperty(exports, "Categoria", { enumerable: true, get: function () { return categoria_model_1.Categoria; } });
const producto_model_1 = require("./producto.model");
Object.defineProperty(exports, "Producto", { enumerable: true, get: function () { return producto_model_1.Producto; } });
const color_model_1 = require("./color.model");
Object.defineProperty(exports, "Color", { enumerable: true, get: function () { return color_model_1.Color; } });
const talla_model_1 = require("./talla.model");
Object.defineProperty(exports, "Talla", { enumerable: true, get: function () { return talla_model_1.Talla; } });
const producto_x_completo_model_1 = require("./producto_x_completo.model");
Object.defineProperty(exports, "ProductoCompleto", { enumerable: true, get: function () { return producto_x_completo_model_1.ProductoCompleto; } });
const venta_model_1 = require("./venta.model");
Object.defineProperty(exports, "Venta", { enumerable: true, get: function () { return venta_model_1.Venta; } });
const producto_x_venta_model_1 = require("./producto_x_venta.model");
Object.defineProperty(exports, "ArticuloVenta", { enumerable: true, get: function () { return producto_x_venta_model_1.ArticuloVenta; } });
const proveedor_model_1 = require("./proveedor.model");
Object.defineProperty(exports, "Proveedor", { enumerable: true, get: function () { return proveedor_model_1.Proveedor; } });
const compra_inventario_model_1 = require("./compra_inventario.model");
Object.defineProperty(exports, "Compra", { enumerable: true, get: function () { return compra_inventario_model_1.Compra; } });
const producto_x_compra_model_1 = require("./producto_x_compra.model");
Object.defineProperty(exports, "ArticuloCompra", { enumerable: true, get: function () { return producto_x_compra_model_1.ArticuloCompra; } });
// ------------------- RELACIONES -------------------
// Pais ↔ Persona
pais_model_1.Pais.hasMany(persona_model_1.Persona, { foreignKey: "id_pais", as: "personas", onDelete: "SET NULL" });
persona_model_1.Persona.belongsTo(pais_model_1.Pais, { foreignKey: "id_pais", as: "pais" });
// Persona ↔ Usuario
persona_model_1.Persona.hasOne(usuario_model_1.Usuario, { foreignKey: "id_persona", as: "usuario", onDelete: "CASCADE" });
usuario_model_1.Usuario.belongsTo(persona_model_1.Persona, { foreignKey: "id_persona", as: "persona" });
// Persona ↔ Cliente
persona_model_1.Persona.hasOne(cliente_model_1.Cliente, { foreignKey: "id_persona", as: "cliente", onDelete: "CASCADE" });
cliente_model_1.Cliente.belongsTo(persona_model_1.Persona, { foreignKey: "id_persona", as: "persona" });
// Persona ↔ Proveedor
persona_model_1.Persona.hasOne(proveedor_model_1.Proveedor, { foreignKey: "id_persona", as: "proveedor", onDelete: "CASCADE" });
proveedor_model_1.Proveedor.belongsTo(persona_model_1.Persona, { foreignKey: "id_persona", as: "persona" });
// Categoria ↔ Producto
categoria_model_1.Categoria.hasMany(producto_model_1.Producto, { foreignKey: "id_categoria", as: "productos", onDelete: "CASCADE" });
producto_model_1.Producto.belongsTo(categoria_model_1.Categoria, { foreignKey: "id_categoria", as: "categoria" });
// Producto ↔ ProductoCompleto
producto_model_1.Producto.hasMany(producto_x_completo_model_1.ProductoCompleto, { foreignKey: "id_producto", as: "variantes", onDelete: "CASCADE" });
producto_x_completo_model_1.ProductoCompleto.belongsTo(producto_model_1.Producto, { foreignKey: "id_producto", as: "producto" });
// Color ↔ ProductoCompleto
color_model_1.Color.hasMany(producto_x_completo_model_1.ProductoCompleto, { foreignKey: "id_color", as: "variantes" });
producto_x_completo_model_1.ProductoCompleto.belongsTo(color_model_1.Color, { foreignKey: "id_color", as: "color" });
// Talla ↔ ProductoCompleto
talla_model_1.Talla.hasMany(producto_x_completo_model_1.ProductoCompleto, { foreignKey: "id_talla", as: "variantes" });
producto_x_completo_model_1.ProductoCompleto.belongsTo(talla_model_1.Talla, { foreignKey: "id_talla", as: "talla" });
// Cliente ↔ Venta
cliente_model_1.Cliente.hasMany(venta_model_1.Venta, { foreignKey: "id_cliente", as: "ventas", onDelete: "CASCADE" });
venta_model_1.Venta.belongsTo(cliente_model_1.Cliente, { foreignKey: "id_cliente", as: "cliente" });
// Usuario ↔ Venta
usuario_model_1.Usuario.hasMany(venta_model_1.Venta, { foreignKey: "id_usuario", as: "ventas" });
venta_model_1.Venta.belongsTo(usuario_model_1.Usuario, { foreignKey: "id_usuario", as: "usuario" });
// Venta ↔ ArticuloVenta
venta_model_1.Venta.hasMany(producto_x_venta_model_1.ArticuloVenta, { foreignKey: "id_venta", as: "articulosVenta", onDelete: "CASCADE" });
producto_x_venta_model_1.ArticuloVenta.belongsTo(venta_model_1.Venta, { foreignKey: "id_venta", as: "venta" });
// ProductoCompleto ↔ ArticuloVenta
producto_x_completo_model_1.ProductoCompleto.hasMany(producto_x_venta_model_1.ArticuloVenta, { foreignKey: "id_pxc", as: "articulosVenta", onDelete: "CASCADE" });
producto_x_venta_model_1.ArticuloVenta.belongsTo(producto_x_completo_model_1.ProductoCompleto, { foreignKey: "id_pxc", as: "productoVenta" });
// Proveedor ↔ Compra
proveedor_model_1.Proveedor.hasMany(compra_inventario_model_1.Compra, { foreignKey: "id_proveedor", as: "compras", onDelete: "CASCADE" });
compra_inventario_model_1.Compra.belongsTo(proveedor_model_1.Proveedor, { foreignKey: "id_proveedor", as: "proveedor" });
// Usuario ↔ Compra
usuario_model_1.Usuario.hasMany(compra_inventario_model_1.Compra, { foreignKey: "id_usuario", as: "compras" });
compra_inventario_model_1.Compra.belongsTo(usuario_model_1.Usuario, { foreignKey: "id_usuario", as: "usuario" });
// Compra ↔ ArticuloCompra
compra_inventario_model_1.Compra.hasMany(producto_x_compra_model_1.ArticuloCompra, { foreignKey: "id_compra_inventario", as: "articulosCompra", onDelete: "CASCADE" });
producto_x_compra_model_1.ArticuloCompra.belongsTo(compra_inventario_model_1.Compra, { foreignKey: "id_compra_inventario", as: "compra" });
// ProductoCompleto ↔ ArticuloCompra
producto_x_completo_model_1.ProductoCompleto.hasMany(producto_x_compra_model_1.ArticuloCompra, { foreignKey: "id_pxc", as: "articulosCompra", onDelete: "CASCADE" });
producto_x_compra_model_1.ArticuloCompra.belongsTo(producto_x_completo_model_1.ProductoCompleto, { foreignKey: "id_pxc", as: "productoCompra" });
