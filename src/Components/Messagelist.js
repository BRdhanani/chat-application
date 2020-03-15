import React from 'react';
import ReactDOM from 'react-dom';
import Messages from './Messages';

class Messagelist extends React.Component {

  componentDidUpdate() {
    const node = ReactDOM.findDOMNode(this)
    node.scrollTop = node.scrollHeight
  }

  render() {
    if(!this.props.roomId){
      return(
        <div className="message-list">
          <div className="join-room">
            &#8629; Join a room
          </div>
        </div>
      )
    }
    return (
      <div className="message-list">
        <ul>
          {
            this.props.messages.map((message, index) => {
              return (
                <Messages currentUser={this.props.currentUser.id} key={index} username={message.senderId} text={message.parts[0].payload.content} />
              )
            })
          }
        </ul>
      </div>
    );
  }
}

export default Messagelist;
