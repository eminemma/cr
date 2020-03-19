import { Component } from '@angular/core';
import { trigger, keyframes, animate, transition, state,style } from '@angular/animations';
@Component({
  selector: 'child-component',
  templateUrl: 'child.html',
  animations: [
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
    ])
    ]
})
export class ChildComponent {
    showCardBody = true;

    showDetails() {
        this.showCardBody = !this.showCardBody;
    }
}