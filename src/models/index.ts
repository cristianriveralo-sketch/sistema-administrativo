import { Pais } from "./pais.model";
import { Persona } from "./persona.model";
import { Usuario } from "./usuario.model";
import { Cliente } from "./cliente.model";
import { Categoria } from "./categoria.model";
import { Producto } from "./producto.model";
import { Color } from "./color.model";
import { Talla } from "./talla.model";
import { ProductoCompleto } from "./producto_x_completo.model";
import { Venta } from "./venta.model";
import { ArticuloVenta } from "./producto_x_venta.model";
import { Proveedor } from "./proveedor.model";
import { Compra } from "./compra_inventario.model";
import { ArticuloCompra } from "./producto_x_compra.model";

// ------------------- RELACIONES -------------------

// Pais ↔ Persona
Pais.hasMany(Persona, { foreignKey: "id_pais", as: "personas", onDelete: "SET NULL" });
Persona.belongsTo(Pais, { foreignKey: "id_pais", as: "pais" });

// Persona ↔ Usuario
Persona.hasOne(Usuario, { foreignKey: "id_persona", as: "usuario", onDelete: "CASCADE" });
Usuario.belongsTo(Persona, { foreignKey: "id_persona", as: "persona" });

// Persona ↔ Cliente
Persona.hasOne(Cliente, { foreignKey: "id_persona", as: "cliente", onDelete: "CASCADE" });
Cliente.belongsTo(Persona, { foreignKey: "id_persona", as: "persona" });

// Persona ↔ Proveedor
Persona.hasOne(Proveedor, { foreignKey: "id_persona", as: "proveedor", onDelete: "CASCADE" });
Proveedor.belongsTo(Persona, { foreignKey: "id_persona", as: "persona" });

// Categoria ↔ Producto
Categoria.hasMany(Producto, { foreignKey: "id_categoria", as: "productos", onDelete: "CASCADE" });
Producto.belongsTo(Categoria, { foreignKey: "id_categoria", as: "categoria" });

// Producto ↔ ProductoCompleto
Producto.hasMany(ProductoCompleto, { foreignKey: "id_producto", as: "variantes", onDelete: "CASCADE" });
ProductoCompleto.belongsTo(Producto, { foreignKey: "id_producto", as: "producto" });

// Color ↔ ProductoCompleto
Color.hasMany(ProductoCompleto, { foreignKey: "id_color", as: "variantes" });
ProductoCompleto.belongsTo(Color, { foreignKey: "id_color", as: "color" });

// Talla ↔ ProductoCompleto
Talla.hasMany(ProductoCompleto, { foreignKey: "id_talla", as: "variantes" });
ProductoCompleto.belongsTo(Talla, { foreignKey: "id_talla", as: "talla" });

// Cliente ↔ Venta
Cliente.hasMany(Venta, { foreignKey: "id_cliente", as: "ventas", onDelete: "CASCADE" });
Venta.belongsTo(Cliente, { foreignKey: "id_cliente", as: "cliente" });

// Usuario ↔ Venta
Usuario.hasMany(Venta, { foreignKey: "id_usuario", as: "ventas" });
Venta.belongsTo(Usuario, { foreignKey: "id_usuario", as: "usuario" });

// Venta ↔ ArticuloVenta
Venta.hasMany(ArticuloVenta, { foreignKey: "id_venta", as: "articulosVenta", onDelete: "CASCADE" });
ArticuloVenta.belongsTo(Venta, { foreignKey: "id_venta", as: "venta" });

// ProductoCompleto ↔ ArticuloVenta
ProductoCompleto.hasMany(ArticuloVenta, { foreignKey: "id_pxc", as: "articulosVenta", onDelete: "CASCADE" });
ArticuloVenta.belongsTo(ProductoCompleto, { foreignKey: "id_pxc", as: "productoVenta" });

// Proveedor ↔ Compra
Proveedor.hasMany(Compra, { foreignKey: "id_proveedor", as: "compras", onDelete: "CASCADE" });
Compra.belongsTo(Proveedor, { foreignKey: "id_proveedor", as: "proveedor" });

// Usuario ↔ Compra
Usuario.hasMany(Compra, { foreignKey: "id_usuario", as: "compras" });
Compra.belongsTo(Usuario, { foreignKey: "id_usuario", as: "usuario" });

// Compra ↔ ArticuloCompra
Compra.hasMany(ArticuloCompra, { foreignKey: "id_compra_inventario", as: "articulosCompra", onDelete: "CASCADE" });
ArticuloCompra.belongsTo(Compra, { foreignKey: "id_compra_inventario", as: "compra" });

// ProductoCompleto ↔ ArticuloCompra
ProductoCompleto.hasMany(ArticuloCompra, { foreignKey: "id_pxc", as: "articulosCompra", onDelete: "CASCADE" });
ArticuloCompra.belongsTo(ProductoCompleto, { foreignKey: "id_pxc", as: "productoCompra" });

export {
  Pais,
  Persona,
  Usuario,
  Cliente,
  Categoria,
  Producto,
  Color,
  Talla,
  ProductoCompleto,
  Venta,
  ArticuloVenta,
  Proveedor,
  Compra,
  ArticuloCompra,
};
