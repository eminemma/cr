import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CroppPage } from './cropp.page';

describe('CroppPage', () => {
  let component: CroppPage;
  let fixture: ComponentFixture<CroppPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CroppPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CroppPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
