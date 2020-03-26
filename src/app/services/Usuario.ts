import { ImagenCamera } from './ImagenCamera';
export class Usuario {
    public id: string;
    public mujer: boolean = false;
    public hombre: boolean = false;
    public correo: string;
    public imagenes: Array<ImagenCamera>;
}
