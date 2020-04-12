import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ConversacionPage } from './conversacion.page';

describe('ConversacionPage', () => {
  let component: ConversacionPage;
  let fixture: ComponentFixture<ConversacionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConversacionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ConversacionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
