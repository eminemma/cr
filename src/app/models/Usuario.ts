import { ImagenCamera } from 'src/app/models/ImagenCamera';
export class Usuario {
    public id: string;
    public mujer: boolean;
    public hombre: boolean;
    public correo: string;
    public imagenes: Array<ImagenCamera>;
    public distanciaBusqueda: number
    public nombre: string;
}
