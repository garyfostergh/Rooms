import { UserService } from './../shared/user.service';
import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2';

@Injectable()
export class RoomService {
  createCount = 0;

  constructor(public af: AngularFire, private userService: UserService) { }

  createDB() {
    this.createCount = this.createCount + 1;
    if (this.createCount > 1) {
      console.log("Abort CreateDB");
      return;
    }

    let roomsRef = this.af.database.list("rooms/Green/messages").$ref;
    roomsRef.ref.push({
      "text": "Hello Green Room!",
      "username": "admin",
      "icon": "home"
    });

    roomsRef = this.af.database.list("rooms/Blue/messages").$ref;
    roomsRef.ref.push({
      "text": "Hello Blue Room!",
      "username": "admin",
      "icon": "home"
    });

    roomsRef = this.af.database.list("rooms/Orange/messages").$ref;
    roomsRef.ref.push({
      "text": "Hello Orange Room!",
      "username": "admin",
      "icon": "home"
    });

    roomsRef = this.af.database.list("rooms/Red/messages").$ref;
    roomsRef.ref.push({
      "text": "Hello Red Room!",
      "username": "admin",
      "icon": "home"
    });

  }

  ensureDBExists() {
    let rooms = this.af.database.object('rooms');
    rooms.subscribe(rooms => {
      if (rooms.$exists()) {
        console.log('ROOMS EXIST!');
      } else {
        console.log('NO ROOM :(');
        this.createDB();
      }
    });
  }

  getMessages(roomName: string) {
    this.ensureDBExists();

    return this.af.database.list(`rooms/${roomName}/messages`)
      .map(data => data.reverse());

    // return [
    //   roomName + " rocks!",
    //   roomName + " is awesome!",
    //   "Lunch & Learn fun"
    // ];

  }

  addMessage(roomName: string, message: string) {
    if (!roomName || roomName.trim() == '' ||
      !message || message.trim() == '') {
      return;
    }

    const messages = this.af.database.list(`rooms/${roomName}/messages`);
    messages.push({
      uid: this.userService.user.uid,
      text: message,
      photoURL: this.userService.user.photoURL,
      username: this.userService.user.name
    });
  }
}
