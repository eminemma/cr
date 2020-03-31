import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
@Injectable({
  providedIn: "root"
})


export class NaranjaService {
  personas: Array<object> = [
    {
      id: 1,
      name: "Conor McGregor",
      descripcion:
        "Sit deserunt tempor aliqua laborum aliqua laborum enim ex consectetur",
      images: [
        { src: "https://placeimg.com/600/600/any", title: "Title 1" },
        { src: "https://placeimg.com/600/600/nature", title: "Title 1" },
        { src: "https://placeimg.com/600/600/any", title: "Title 1" },
        { src: "https://placeimg.com/600/600/any", title: "Title 1" }
      ]
    },
    {
      id: 2,
      name: "Tony Ferguson",
      descripcion:
        "Sit deserunt tempor aliqua laborum aliqua laborum enim ex consectetur",
      images: [
        { src: "https://placeimg.com/600/600/any", title: "Title 1" },
        { src: "https://placeimg.com/600/600/nature", title: "Title 1" },
        { src: "https://placeimg.com/600/600/sepia", title: "Title 1" }
      ]
    },
    {
      id: 3,
      name: "Max Holloway",
      descripcion:
        "Sit deserunt tempor aliqua laborum aliqua laborum enim ex consectetur",
      images: [
        { src: "https://placeimg.com/600/600/any", title: "Title 1" },
        { src: "https://placeimg.com/600/600/nature", title: "Title 1" }
      ]
    },
    {
      id: 4,
      name: "Jon Jones",
      descripcion:
        "Sit deserunt tempor aliqua laborum aliqua laborum enim ex consectetur",
      images: [
        { src: "https://placeimg.com/600/600/any", title: "Title 1" },
        { src: "https://placeimg.com/600/600/nature", title: "Title 1" },
        { src: "https://placeimg.com/600/600/sepia", title: "Title 1" },
        { src: "https://placeimg.com/600/600/people", title: "Title 1" }
      ]
    },
    {
      id: 5,
      name: "Daniel Cormier",
      descripcion:
        "Sit deserunt tempor aliqua laborum aliqua laborum enim ex consectetur",
      images: [
        { src: "https://placeimg.com/600/600/any", title: "Title 1" },
        { src: "https://placeimg.com/600/600/nature", title: "Title 1" },
        { src: "https://placeimg.com/600/600/sepia", title: "Title 1" },
        { src: "https://placeimg.com/600/600/people", title: "Title 1" },
        { src: "https://placeimg.com/600/600/tech", title: "Title 1" }
      ]
    },
    {
      id: 6,
      name: "Brock Lesnar",
      descripcion:
        "Sit deserunt tempor aliqua laborum aliqua laborum enim ex consectetur",
      images: [
        { src: "https://placeimg.com/600/600/any", title: "Title 1" },
        { src: "https://placeimg.com/600/600/nature", title: "Title 1" },
        { src: "https://placeimg.com/600/600/sepia", title: "Title 1" },
        { src: "https://placeimg.com/600/600/any", title: "Title 1" }
      ]
    }
  ];
  constructor() {}

  get() {
    return of(this.personas).pipe(delay(1000));
  }
}
