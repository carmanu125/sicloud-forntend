export interface Presupuesto {
  rubro: string;
  fuente: string;
  tipoPre: string;
  sector: string;
  producto: string;
  programa: string;
  codCpc: string;
  bpin: string;
  nombre: string;
  tipo: string;
  rm: string;
  inicial: number;
  empresaId: number;
  denominacionCcpt: string;
  dependencia: string;

  // opcional (si el backend lo devuelve)
  id?: number;
}