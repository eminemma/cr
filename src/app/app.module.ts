import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS  } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { Facebook } from '@ionic-native/facebook/ngx';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HammerGestureConfig, HAMMER_GESTURE_CONFIG} from '@angular/platform-browser';
import * as Hammer from 'hammerjs';

import { Geolocation } from '@ionic-native/geolocation/ngx';

import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Crop } from '@ionic-native/crop/ngx';
import { File } from '@ionic-native/file/ngx';

import { AngularFireDatabaseModule } from 'angularfire2/database';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { ImageCropperModule } from 'ngx-image-cropper';

import { AuthInterceptor } from 'src/app/services/AuthInterceptor';

export class CustomHammerConfig extends HammerGestureConfig{
  overrides = <any> {
    swipe: { direction: Hammer.DIRECTION_ALL },
  };
}



export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(), 
    AppRoutingModule, 
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,    
    AngularFireDatabaseModule,
    ReactiveFormsModule,
    FormsModule,
    ImageCropperModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    })],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    Crop,
    File,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Facebook,
    { provide: HAMMER_GESTURE_CONFIG, useClass: CustomHammerConfig},
    Geolocation,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

