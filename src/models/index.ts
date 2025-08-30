// 📌 Importación de modelos
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

// Relaciones

// Pais ↔ Persona
Pais.hasMany(Persona, { foreignKey: "id_pais" });
Persona.belongsTo(Pais, { foreignKey: "id_pais" });

// Pais ↔ Cliente
Pais.hasMany(Cliente, { foreignKey: "id_pais" });
Cliente.belongsTo(Pais, { foreignKey: "id_pais" });

// Persona ↔ Usuario
Persona.hasOne(Usuario, { foreignKey: "id_persona", as: "usuario", onDelete: "CASCADE", onUpdate: "CASCADE" });
Usuario.belongsTo(Persona, { foreignKey: "id_persona", as: "persona", onDelete: "CASCADE", onUpdate: "CASCADE" });

// Persona ↔ Cliente
Persona.hasOne(Cliente, { foreignKey: "id_persona", onDelete: "CASCADE", onUpdate: "CASCADE" });
Cliente.belongsTo(Persona, { foreignKey: "id_persona" });

// Categoria ↔ Producto
Categoria.hasMany(Producto, { foreignKey: "id_categoria", onDelete: "CASCADE", onUpdate: "CASCADE" });
Producto.belongsTo(Categoria, { foreignKey: "id_categoria" });

// Producto ↔ ProductoCompleto
Producto.hasMany(ProductoCompleto, { foreignKey: "id_producto", onDelete: "CASCADE", onUpdate: "CASCADE" });
ProductoCompleto.belongsTo(Producto, { foreignKey: "id_producto" });

// Color ↔ ProductoCompleto
Color.hasMany(ProductoCompleto, { foreignKey: "id_color" });
ProductoCompleto.belongsTo(Color, { foreignKey: "id_color" });

// Talla ↔ ProductoCompleto
Talla.hasMany(ProductoCompleto, { foreignKey: "id_talla" });
ProductoCompleto.belongsTo(Talla, { foreignKey: "id_talla" });

// Cliente ↔ Venta
Cliente.hasMany(Venta, { foreignKey: "id_cliente", onDelete: "CASCADE" });
Venta.belongsTo(Cliente, { foreignKey: "id_cliente" });

// Usuario ↔ Venta
Usuario.hasMany(Venta, { foreignKey: "id_usuario" });
Venta.belongsTo(Usuario, { foreignKey: "id_usuario" });

// Venta ↔ ArticuloVenta
Venta.hasMany(ArticuloVenta, { foreignKey: "id_venta", onDelete: "CASCADE" });
ArticuloVenta.belongsTo(Venta, { foreignKey: "id_venta" });

// ProductoCompleto ↔ ArticuloVenta
ProductoCompleto.hasMany(ArticuloVenta, { foreignKey: "id_pxc", onDelete: "CASCADE" });
ArticuloVenta.belongsTo(ProductoCompleto, { foreignKey: "id_pxc" });

// Proveedor ↔ Compra
Proveedor.hasMany(Compra, { foreignKey: "id_proveedor" });
Compra.belongsTo(Proveedor, { foreignKey: "id_proveedor" });

// Usuario ↔ Compra
Usuario.hasMany(Compra, { foreignKey: "id_usuario" });
Compra.belongsTo(Usuario, { foreignKey: "id_usuario" });

// Compra ↔ ArticuloCompra
Compra.hasMany(ArticuloCompra, { foreignKey: "id_compra_inventario", onDelete: "CASCADE" });
ArticuloCompra.belongsTo(Compra, { foreignKey: "id_compra_inventario" });

// ProductoCompleto ↔ ArticuloCompra
ProductoCompleto.hasMany(ArticuloCompra, { foreignKey: "id_pxc", onDelete: "CASCADE" });
ArticuloCompra.belongsTo(ProductoCompleto, { foreignKey: "id_pxc" });

// Exportar todos los modelos
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
