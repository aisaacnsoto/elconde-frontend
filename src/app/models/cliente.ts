export class Cliente {
    public id: number;
    public nombres: string;
    public apellidos: string;
    public num_doc: string;
    public tipo_doc: string;
    public telefono: string;
    public fecha_nac: string;
    public direccion: string;
    public correo: string;
    public descripcion: string;
    public activo: number;
    public created_at: string;
    public updated_at: string;

    public recomendador?: any;
}