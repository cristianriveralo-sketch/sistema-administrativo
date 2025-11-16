import { Op } from 'sequelize';
import { Venta } from '../models/venta.model';
import { ArticuloVenta } from '../models/producto_x_venta.model';
import { ProductoCompleto } from '../models/producto_x_completo.model';
import { Producto } from '../models/producto.model';
import { Categoria } from '../models/categoria.model';
import { Talla } from '../models/talla.model';
import { Color } from '../models/color.model';

export type ReportGroupBy = 'producto' | 'categoria' | 'color' | 'talla';
export type ReportPeriod = 'dia' | 'semana' | 'mes' | 'año';

interface GetSalesReportParams {
  start: string;
  end: string;
  groupBy: ReportGroupBy;
  period: ReportPeriod;
}

export interface SalesReportResponse {
  range: { start: string; end: string };
  groupBy: ReportGroupBy;
  period: ReportPeriod;
  byDimension: { label: string; total: number }[];
  byPeriod: { period: string; total: number }[];
}

export const getSalesReport = async (params: GetSalesReportParams): Promise<SalesReportResponse> => {
  const startDate = new Date(params.start);
  const endDate = new Date(params.end);

  const ventas = await Venta.findAll({
    where: { fecha: { [Op.between]: [startDate, endDate] } },
    include: [
      {
        model: ArticuloVenta,
        as: 'articulosVenta',
        include: [
          {
            model: ProductoCompleto,
            as: 'productoVenta',
            include: [
              { model: Producto, as: 'producto', include: [{ model: Categoria, as: 'categoria' }] },
              { model: Talla, as: 'talla' },
              { model: Color, as: 'color' },
            ],
          },
        ],
      },
    ],
    order: [['fecha', 'ASC']],
  }) as any[];

  type Row = {
    fecha: Date;
    total: number;
    producto?: string;
    categoria?: string;
    color?: string;
    talla?: string;
  };

  const rows: Row[] = [];
  for (const v of ventas) {
    for (const a of v.articulosVenta || []) {
      const pc = a.productoVenta;
      rows.push({
        fecha: new Date(v.fecha),
        total: Number(a.cantidad_vendida) * Number(a.precio_unitario),
        producto: pc?.producto?.nombre,
        categoria: pc?.producto?.categoria?.nombre,
        color: pc?.color?.color,
        talla: pc?.talla?.talla,
      });
    }
  }

  const formatPeriodKey = (d: Date, period: ReportPeriod) => {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    if (period === 'dia') return `${y}-${m}-${day}`;
    if (period === 'mes') return `${y}-${m}`;
    if (period === 'año') return `${y}`;
    const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    const dayNum = date.getUTCDay() || 7;
    date.setUTCDate(date.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
    const weekNo = Math.ceil((((date as any) - (yearStart as any)) / 86400000 + 1) / 7);
    return `${date.getUTCFullYear()}-W${String(weekNo).padStart(2, '0')}`;
  };

  const byPeriodMap = new Map<string, number>();
  for (const r of rows) {
    const k = formatPeriodKey(r.fecha, params.period);
    byPeriodMap.set(k, (byPeriodMap.get(k) || 0) + r.total);
  }
  const byPeriod = Array.from(byPeriodMap.entries())
    .sort((a, b) => (a[0] > b[0] ? 1 : -1))
    .map(([period, total]) => ({ period, total }));

  const byDimensionMap = new Map<string, number>();
  const labelOf = (r: Row) =>
    params.groupBy === 'producto' ? (r.producto || 'N/D') :
    params.groupBy === 'categoria' ? (r.categoria || 'N/D') :
    params.groupBy === 'color' ? (r.color || 'N/D') :
    (r.talla || 'N/D');

  for (const r of rows) {
    const k = labelOf(r);
    byDimensionMap.set(k, (byDimensionMap.get(k) || 0) + r.total);
  }
  const byDimension = Array.from(byDimensionMap.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([label, total]) => ({ label, total }));

  return {
    range: { start: params.start, end: params.end },
    groupBy: params.groupBy,
    period: params.period,
    byDimension,
    byPeriod,
  };
};