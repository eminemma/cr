import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EdicionPage } from './edicion.page';

describe('EdicionPage', () => {
  let component: EdicionPage;
  let fixture: ComponentFixture<EdicionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EdicionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EdicionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
