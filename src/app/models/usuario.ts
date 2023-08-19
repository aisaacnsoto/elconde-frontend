export class Usuario {
    public id: number;
    public nombre_display: string;
    public empleado: any;
    public rol: any;
    public username: string;
    public password: string;
    public activo: number;
    public created_at: string;
    public updated_at: string;

    public permisos: Array<any>;
}