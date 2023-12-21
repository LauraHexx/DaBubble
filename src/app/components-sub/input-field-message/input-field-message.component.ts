import { Component } from '@angular/core';
import { Message } from 'src/app/models/message';
import { MessageTime } from 'src/app/models/message-time';
import { User } from 'src/app/models/user';
import { ChannelService } from 'src/app/shared/services/channel.service';
import { InputService } from 'src/app/shared/services/input.service';
import { UserService } from 'src/app/shared/services/user.service';
import { WorkspaceService } from 'src/app/shared/services/workspace.service';

@Component({
  selector: 'app-input-field-message',
  templateUrl: './input-field-message.component.html',
  styleUrls: ['./input-field-message.component.scss']
})
export class InputFieldMessageComponent {
  clickedContact!: User;
  // allContacts: User[] = [];
  input: string = '';
  isInputSelected: boolean = false;
  showEmojis: boolean = false;
  showUserList: boolean = false;
  constructor(public service: InputService, public us: UserService, private cs: ChannelService, public ws: WorkspaceService) { }

  ngOnInit(): void {
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.us.clickedContact.subscribe((user: User) => {
      this.clickedContact = user;
    });
  }

  sendDirectMessage(clickedContact: User) {
    let unixId = Date.now(); // id einer Nachricht im Zeitstempel createdTime
    // Nachricht bei Empfänger hinterlegen
    this.us.updateUser({ chats: this.getAllChatsOfUser(clickedContact, unixId) }, clickedContact);
    // Nachricht bei Sender hinterlegen
    this.us.updateUser({ chats: this.getAllChatsOfUser(this.us.userLoggedIn(), unixId) }, this.us.userLoggedIn());
    this.input = '';
  }

  getAllChatsOfUser(forUser: User, unixId: number) {
    let allChats = [];

    for (let index = 0; index < forUser.chats!.length; index++) {
      const chat = forUser.chats![index];
      allChats.push(chat);
    }
    allChats.push(this.addNewMessage(unixId));

    return allChats;
  }

  addNewMessage(unixId: number) {
    return this.us.getCleanMessageJson(new Message(this.us.userLoggedIn().customId, this.input, this.cs.getCleanMessageTimeJson(new MessageTime(new Date().getDate(), this.cs.todaysDate(), this.cs.getTime(), unixId))));
  }

  // Für emojis und @
  addEmoji($event: any) {
    this.input += $event.emoji.native;
    this.showEmojis = !this.showEmojis;
  }


  toggleBtn(target: string) {
    this.showEmojis = target === 'emojis' ? !this.showEmojis : false;
    this.showUserList = target === 'userList' ? !this.showUserList : false;
  }

  openFileExplorer() {
    console.log('openFileExplorer');
  }

}