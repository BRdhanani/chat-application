import React from 'react';

class Messages extends React.Component {
  render(){
    const activeclass = this.props.currentUser === this.props.username ? 'replies' : 'sent'
    return (
        <li className={"message " + activeclass}>
          <span className="message-username">{this.props.username}</span>
          <p className="message-text">{this.props.text}</p>
        </li>
    );
  }
}

export default Messages;
