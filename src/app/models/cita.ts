export class Cita {
    public id: number;
    public codigo: string;
    public cliente: any;
    public empleado: any;
    public fecha: string;
    public hora: string;
    public estado: string;
    public promocion: any;
    public metodo_pago: string;
    public total: number;
    public created_by: number;
    public created_at: string;
    public updated_at: string;
    public detalles: any;
    public tiempo_promedio: number;

    public get_empleado: any;
    public get_cliente: any;
    public get_detalles: Array<any>;
}