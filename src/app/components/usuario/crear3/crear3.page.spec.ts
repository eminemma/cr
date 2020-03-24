import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Crear3Page } from './crear3.page';

describe('Crear3Page', () => {
  let component: Crear3Page;
  let fixture: ComponentFixture<Crear3Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Crear3Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Crear3Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
