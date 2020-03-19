import { Component } from '@angular/core';
import { trigger, keyframes, animate, transition, state,style } from '@angular/animations';
import * as kf from './keyframes';
import {ChildComponent} from './child';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  animations: [
    trigger('cardAnimator', [
      transition('* => slideOutLeft', animate(1000, keyframes(kf.slideOutLeft))),
      transition('* => slideOutRight', animate(1000, keyframes(kf.slideOutRight)))
    ]),
    trigger('openClose', [
      state('open', style({
          height: '*',
          opacity: 1,
      })),
      state('right', style({
         transform: 'translate3d(100%, 0, 0)',
          opacity: 0
      })),
      transition('open => right', [
          animate('0.55s')
      ]),
  ]),
  ]
})
export class Tab1Page {
  animationState: string;

  showCardBody = true;

  constructor() {}
  startAnimation(state) {
    if (!this.animationState) {
      this.animationState = state;
    }
  }

  resetAnimationState() {
    this.animationState = '';
  }

  

  showDetails() {
    this.showCardBody = !this.showCardBody;
}
}
