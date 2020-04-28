import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TrackspotifyPage } from './trackspotify.page';

describe('TrackspotifyPage', () => {
  let component: TrackspotifyPage;
  let fixture: ComponentFixture<TrackspotifyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackspotifyPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TrackspotifyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
