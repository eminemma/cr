import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Crear2Page } from './crear2.page';

describe('Crear2Page', () => {
  let component: Crear2Page;
  let fixture: ComponentFixture<Crear2Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Crear2Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Crear2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
