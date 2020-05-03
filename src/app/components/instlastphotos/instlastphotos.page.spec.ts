import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InstlastphotosPage } from './instlastphotos.page';

describe('InstlastphotosPage', () => {
  let component: InstlastphotosPage;
  let fixture: ComponentFixture<InstlastphotosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstlastphotosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InstlastphotosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
