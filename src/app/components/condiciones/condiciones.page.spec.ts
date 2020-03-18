import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CondicionesPage } from './condiciones.page';

describe('CondicionesPage', () => {
  let component: CondicionesPage;
  let fixture: ComponentFixture<CondicionesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CondicionesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CondicionesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
