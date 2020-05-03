import { Component, OnInit, Input } from '@angular/core';
import { MediaInstagram } from 'src/app/models/MediaInstagram';

@Component({
  selector: 'app-instlastphotos',
  templateUrl: './instlastphotos.page.html',
  styleUrls: ['./instlastphotos.page.scss'],
})
export class InstlastphotosPage implements OnInit {
  marginLeft: number;
  marginLeftPorcentaje: string;
  @Input() mediaInstagrams: MediaInstagram[];
  imagenesSplice: Array<object>;
  cantidadSlider: number;
  cantidadSliderCollection: any;
  widthSlider: number;
  widthSliderPorcentaje: string;
  constructor() {
    this.marginLeft = 0;
    /*this.imagenes = [
      {
        id: 1,
        name: 'Conor McGregor',
        descripcion:
          'Sit deserunt tempor aliqua laborum aliqua laborum enim ex consectetur',
        src: 'https://placeimg.com/600/600/any',
        title: 'Title 1',
      },
    ];*/
    console.log('Instagram imagenes');
    console.log(this.mediaInstagrams);
    /*this.cantidadSlider = Math.ceil(this.mediaInstagrams.length / 6);
    this.cantidadSliderCollection = Array.from(
      { length: this.cantidadSlider },
      (v, k) => k + 1
    );
    this.widthSlider = 110 * this.cantidadSlider;
    this.widthSliderPorcentaje = this.widthSlider.toString() + '%';
    this.imagenesSplice = new Array();
    while (this.mediaInstagrams.length) {
      this.imagenesSplice.push(this.mediaInstagrams.splice(0, 6));
    }*/
  }

  ngOnChanges() {
    // Check if the data exists before using it
    console.log('Instagram imagenes');
    console.log(this.mediaInstagrams);
    if (this.mediaInstagrams) {
      this.cantidadSlider = Math.ceil(this.mediaInstagrams.length / 6);
      this.cantidadSliderCollection = Array.from(
        { length: this.cantidadSlider },
        (v, k) => k + 1
      );
      this.widthSlider = 110 * this.cantidadSlider;
      this.widthSliderPorcentaje = this.widthSlider.toString() + '%';
      this.imagenesSplice = new Array();
      while (this.mediaInstagrams.length) {
        this.imagenesSplice.push(this.mediaInstagrams.splice(0, 6));
      }
    }
  }

  ngOnInit() {}
  siguiente() {
    if (this.marginLeft === -220) {
      this.marginLeft = 0;
    } else {
      this.marginLeft = this.marginLeft - 110;
    }

    this.marginLeftPorcentaje = this.marginLeft.toString() + '%';
  }

  anterior() {
    console.log(this.marginLeft);

    if (this.marginLeft === 0) {
      this.marginLeft = 0;
    } else {
      this.marginLeft = this.marginLeft + 110;
    }

    console.log(this.marginLeft);
    this.marginLeftPorcentaje = this.marginLeft.toString() + '%';
  }
}
