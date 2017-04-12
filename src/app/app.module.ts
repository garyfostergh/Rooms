import { UserService } from './shared/user.service';
import { RoomService } from './room/room.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@angular/material';
import 'hammerjs';
import { AngularFireModule, AuthMethods, AuthProviders } from 'angularfire2';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { RoomListComponent } from './room-list/room-list.component';
import { RoomComponent } from './room/room.component';

const firebaseDatabaseConfig = {
  apiKey: "AIzaSyBIEjsWly6mOrEaewEGNwLxFceo7Id7EBY",
  authDomain: "fourrooms-cce77.firebaseapp.com",
  databaseURL: "https://fourrooms-cce77.firebaseio.com",
  storageBucket: "fourrooms-cce77.appspot.com",
  messagingSenderId: "321050506384"
};

const firebaseAuthConfig = {
  provider: AuthProviders.Google,
  method: AuthMethods.Redirect
};

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    RoomListComponent,
    RoomComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(firebaseDatabaseConfig, firebaseAuthConfig),
    HttpModule,
    MaterialModule.forRoot(),
    RouterModule.forRoot([
      { path: "welcome", component: WelcomeComponent },
      {
        path: "room", children: [
          { path: "", component: RoomListComponent },
          { path: ":name", component: RoomComponent }
        ]
      },
      { path: "**", redirectTo: "welcome" }
    ])
  ],
  providers: [RoomService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
