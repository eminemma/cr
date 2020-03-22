import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { PerfilesPage } from './perfiles.page';

describe('Tab1Page', () => {
  let component: PerfilesPage;
  let fixture: ComponentFixture<PerfilesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PerfilesPage],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(PerfilesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
