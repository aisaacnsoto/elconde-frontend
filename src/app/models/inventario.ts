export class Inventario {
    public id: number;
    public fecha: string;
    public hora: string;
    public comentario: string;
    public created_at: string;
    public updated_at: string;

    public detalle: Array<any>;
    public detalle_old?: Array<any>;

    public changes = {
        to_insert: [],
        to_delete: [],
        to_update: []
    }; 
}