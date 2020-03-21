import { Component, Input,EventEmitter, Output  } from '@angular/core';
import { trigger, keyframes, animate, transition, state,style } from '@angular/animations';
import { AlertService } from 'src/app/services/alert.service';
@Component({
  selector: 'child-component',
  templateUrl: 'child.html',
  styleUrls: ['child.css'],
  animations: [
    trigger('slideLike', [
        state('open', style({
            transform: 'translate3d(0, 0, 0)',
           // opacity: 1,
        })),
        state('right', style({
           transform: 'translate3d(100%, 0, 0)',
           visibility: 'hidden'
         //   opacity: 0
        })),
        transition('open => right', [
            animate('0.55s')
        ]),
    ]),
    trigger('slideNotLike', [
        state('open', style({
            transform: 'translate3d(0, 0, 0)',
           // opacity: 1,
        })),
        state('left', style({
           transform: 'translate3d(-150%, 0, 0)',
           visibility: 'hidden'
         //   opacity: 0
        })),
        transition('open => left', [
            animate('0.55s')
        ]),
    ])
    ]
})
export class ChildComponent {
    counter = 0;
    animateLike = true;
    animateNotLike = true;
    animateUp = true;
    @Input() persona;
    @Output() persona_seleccionada:EventEmitter<Object>= new EventEmitter();  

    /*slideItems = [
      { src: 'https://placeimg.com/600/600/any', title: 'Title 1' },
      { src: 'https://placeimg.com/600/600/nature', title: 'Title 2' },
      { src: 'https://placeimg.com/600/600/sepia', title: 'Title 3' },
      { src: 'https://placeimg.com/600/600/people', title: 'Title 4' },
      { src: 'https://placeimg.com/600/600/tech', title: 'Title 5' }
    ];*/

    constructor(
        private alertService: AlertService
    ) {
        console.log('Pasaa');
    }

    showNextImage() {
        
        if (this.counter < this.persona.images.length -1) {
           this.counter += 1;
         }
       }
    showPreviousImage() {
         if (this.counter >= 1) {
            this.counter = this.counter - 1;
        }
       }

    startAnimationLike() {
        this.animateLike = false;
    }
    finishAnimationLike() {
        if(this.animateLike == false){
            this.persona_seleccionada.emit(this.persona); 
            this.alertService.presentToast('Like');
        }
    }

    startAnimationNotLike() {
        this.animateNotLike = false;
    }
    finishAnimationNotLike() {
        if(this.animateNotLike == false){
            this.persona_seleccionada.emit(this.persona); 
            this.alertService.presentToast('Not Like');
        }
    }

    like() {
        
        this.startAnimationLike();
        this.alertService.presentToast('Like'); 
      
    }

    notLike() {
        
        this.startAnimationNotLike();
        this.alertService.presentToast('Not Like');
       
    }
}