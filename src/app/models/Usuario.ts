import { ImagenCamera } from 'src/app/models/ImagenCamera';
export class Usuario {
    public id: string;
    public mujer: boolean;
    public hombre: boolean;
    public correo: string;
    public imagenes: Array<ImagenCamera>;
    public nombre: string;

    // Parametros de busqueda
    public distanciaBusqueda: number;
    public edadBusqueda: number;
}
