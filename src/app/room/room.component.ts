import { RoomService } from './room.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'aap-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {
  room: string;
  messages: any[];
  newMessage: string;

  constructor(private route: ActivatedRoute, private roomService: RoomService) { }

  ngOnInit() {
    
    this.room = this.route.snapshot.params['name'];
    this.roomService.getMessages(this.room)
      .subscribe(roomServiceData => {
        this.messages = roomServiceData
      });
  }

  submitMessage() {
    console.log("newMessage =", this.newMessage);
    this.roomService.addMessage(this.room, this.newMessage);
    this.newMessage = '';
  }
}
