export class Producto {
    public id: number;
    public categoria: number;
    public nombre: string;
    public precio: number;
    public stock: number;
    public activo: number;
    public unidad_medida: string;
    public comision_barbero: number;
    public created_at: string;
    public updated_at: string;

    public bar_codes: Array<any>;
    public get_unidad_medida?: any;
    public presentaciones?: any[];
}