import React from 'react';
import Chatkit from '@pusher/chatkit-client';
import './App.css';
import {tokenurl,instanceLocator} from './Config';
import Messagelist from './Components/Messagelist';
import SendMessageForm from './Components/SendMessageForm';
import Roomlist from './Components/Roomlist';
import NewRoomForm from './Components/NewRoomForm';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      messages:[],
      joinableRooms:[],
      joinedRooms:[],
      roomId:'',
      currentUser:[]
    }
  }

  componentDidMount(){
    const chatManager = new Chatkit.ChatManager({
      instanceLocator,
      userId:'brijesh',
      tokenProvider: new Chatkit.TokenProvider({
        url: tokenurl
      })
    })

    chatManager.connect()
    .then(currentUser => {
      this.currentUser = currentUser
      this.getRooms()
    })
    .catch(error => console.log("error on connecting",error))
  }

  getRooms = () => {
    this.currentUser.getJoinableRooms()
      .then(joinableRooms => {
        this.setState({
          joinableRooms,
          joinedRooms: this.currentUser.rooms,
          currentUser: this.currentUser
        })
      })
    .catch(error => console.log("error on joinableRooms",error))
  }

  subscribeToRoom = (roomId) => {
    this.currentUser.subscribeToRoomMultipart({
      roomId:roomId,
      hooks:{
        onMessage: message => {
            this.setState({
                messages: [...this.state.messages, message]
            })
        }
      }
    })
    .then(room => {
      this.setState({
        roomId: room.id
      })
      this.getRooms()
    })
    .catch(err => console.log("error on subscribing room",err))
  }

  sendMessage = (text) => {
    text &&
    this.currentUser.sendMessage({
      text,
      roomId:this.state.roomId
    })
  }

  createRoom = (name) => {
    this.currentUser.createRoom({
      name
    })
    .then(room => this.subscribeToRoom(room.id))
    .catch(err => console.log("error on creating room",err))
  }


  render(){
    return (
      <div className="App">
        <div className="sidepanel">
          <Roomlist roomId= {this.state.roomId} subscribeToRoom={this.subscribeToRoom} rooms={[...this.state.joinableRooms,...this.state.joinedRooms]} />
          <NewRoomForm createRoom={this.createRoom} />
        </div>
        <div className="content">
          <Messagelist currentUser={this.state.currentUser} roomId={this.state.roomId} messages={this.state.messages} />
          <SendMessageForm disabled={!this.state.roomId} sendMessage={this.sendMessage} />
        </div>
      </div>
    );
  }
}

export default App;
