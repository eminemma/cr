import { Injectable } from "@angular/core";
import { of } from "rxjs";
import { delay } from "rxjs/operators";
@Injectable({
  providedIn: "root"
})


export class NaranjaService {
  personas: Array<object> = [
    {
      id: 1,
      name: "Conor McGregor",
      descripcion:
        "Sit deserunt tempor aliqua laborum aliqua laborum enim ex consectetur ex. Nostrud esse commodo officia do amet aliqua do aute sint eu laborum officia elit incididunt. Ad dolor ipsum laborum nisi ullamco cupidatat consequat enim magna. Duis est consectetur ad duis excepteur sit eu proident id irure. Proident laboris reprehenderit ad in. Labore mollit elit ullamco pariatur. Magna consectetur id sunt quis ea do mollit tempor consequat ad.",
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
        "Sit deserunt tempor aliqua laborum aliqua laborum enim ex consectetur ex. Nostrud esse commodo officia do amet aliqua do aute sint eu laborum officia elit incididunt. Ad dolor ipsum laborum nisi ullamco cupidatat consequat enim magna. Duis est consectetur ad duis excepteur sit eu proident id irure. Proident laboris reprehenderit ad in. Labore mollit elit ullamco pariatur. Magna consectetur id sunt quis ea do mollit tempor consequat ad.",
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
        "Sit deserunt tempor aliqua laborum aliqua laborum enim ex consectetur ex. Nostrud esse commodo officia do amet aliqua do aute sint eu laborum officia elit incididunt. Ad dolor ipsum laborum nisi ullamco cupidatat consequat enim magna. Duis est consectetur ad duis excepteur sit eu proident id irure. Proident laboris reprehenderit ad in. Labore mollit elit ullamco pariatur. Magna consectetur id sunt quis ea do mollit tempor consequat ad.",
      images: [
        { src: "https://placeimg.com/600/600/any", title: "Title 1" },
        { src: "https://placeimg.com/600/600/nature", title: "Title 1" }
      ]
    },
    {
      id: 4,
      name: "Jon Jones",
      descripcion:
        "Sit deserunt tempor aliqua laborum aliqua laborum enim ex consectetur ex. Nostrud esse commodo officia do amet aliqua do aute sint eu laborum officia elit incididunt. Ad dolor ipsum laborum nisi ullamco cupidatat consequat enim magna. Duis est consectetur ad duis excepteur sit eu proident id irure. Proident laboris reprehenderit ad in. Labore mollit elit ullamco pariatur. Magna consectetur id sunt quis ea do mollit tempor consequat ad.",
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
        "Sit deserunt tempor aliqua laborum aliqua laborum enim ex consectetur ex. Nostrud esse commodo officia do amet aliqua do aute sint eu laborum officia elit incididunt. Ad dolor ipsum laborum nisi ullamco cupidatat consequat enim magna. Duis est consectetur ad duis excepteur sit eu proident id irure. Proident laboris reprehenderit ad in. Labore mollit elit ullamco pariatur. Magna consectetur id sunt quis ea do mollit tempor consequat ad.",
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
        "Sit deserunt tempor aliqua laborum aliqua laborum enim ex consectetur ex. Nostrud esse commodo officia do amet aliqua do aute sint eu laborum officia elit incididunt. Ad dolor ipsum laborum nisi ullamco cupidatat consequat enim magna. Duis est consectetur ad duis excepteur sit eu proident id irure. Proident laboris reprehenderit ad in. Labore mollit elit ullamco pariatur. Magna consectetur id sunt quis ea do mollit tempor consequat ad.",
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
