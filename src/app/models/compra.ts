export class Compra {
    public id: number;
    public fecha_emi: string;
    public fecha_inter: string;
    public hora_inter: string;
    public proveedor: number;
    public tipo_doc: string;
    public nro_doc_pref: string;
    public nro_doc_suf: string;
    public total: number;
    public created_at: string;
    public updated_at: string;

    public detalle: Array<any>;
    public get_proveedor: any;

    public changes = {
        to_insert: [],
        to_delete: [],
        to_update: []
    }; 
}