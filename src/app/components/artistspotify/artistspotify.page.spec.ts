import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ArtistspotifyPage } from './artistspotify.page';

describe('ArtistspotifyPage', () => {
  let component: ArtistspotifyPage;
  let fixture: ComponentFixture<ArtistspotifyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtistspotifyPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ArtistspotifyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
