export class ProductoPresentacion {
    public id: number;
    public producto_id: number;
    public unidad_medida_id: number;
    public costo: number;
    public precio_venta: number;
    public margen_ganancia: number;
    public comision_barbero: number;
    public stock: number;
    public puede_vender: number;
    public puede_comprar: number;
    public puede_consumir: number;
    public puede_asignar: number;
    public created_at: string;
    public updated_at: string;

    public bar_codes: any[];
}