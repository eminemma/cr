import { Directive, Output, EventEmitter, Input, SimpleChange} from '@angular/core';

@Directive({
  selector: '[onCreate]'
})
export class OnCreate {

  @Output() onCreate: EventEmitter<any> = new EventEmitter<any>();
  constructor() {}
  ionViewWillEnter() {      
     this.onCreate.emit('dummy'); 
  } 

}