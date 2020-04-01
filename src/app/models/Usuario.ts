import { ImagenCamera } from 'src/app/models/ImagenCamera';
export class Usuario {
    public id: string;
    public mujer: number;
    public hombre: number;
    public correo: string;
    public imagenes: Array<ImagenCamera>;
    public nombre: string;

    // Parametros de busqueda
    public distanciaBusqueda: number;
    public distancia: number;
    public edadBusqueda: number;
}
