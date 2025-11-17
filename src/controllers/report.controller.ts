import { Request, Response } from 'express';
import { getSalesReport } from '../services/report.service';

class ResponseModel<T> {
  constructor(
    public message: string,
    public error: boolean,
    public status: number,
    public data: T | null
  ) {}
}

export const getSalesReportController = async (req: Request, res: Response) => {
  try {
    const { start, end, groupBy = 'producto', period = 'month' } = req.query as any;
    if (!start || !end) {
      return res
        .status(400)
        .json(new ResponseModel("Parámetros 'start' y 'end' requeridos (ISO)", true, 400, null));
    }
    const data = await getSalesReport({ start, end, groupBy, period } as any);
    res.status(200).json(new ResponseModel('Reporte obtenido', false, 200, data));
  } catch (e: any) {
    res.status(500).json(new ResponseModel(e?.message || 'Error al obtener reporte', true, 500, null));
  }
};