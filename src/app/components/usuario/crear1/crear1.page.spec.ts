import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Crear1Page } from './crear1.page';

describe('Crear1Page', () => {
  let component: Crear1Page;
  let fixture: ComponentFixture<Crear1Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Crear1Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Crear1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
