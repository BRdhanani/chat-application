import React from 'react';

class SendMessageForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      message:''
    }
  }

  handleChange = (e) => {
    this.setState({message:e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.sendMessage(this.state.message)
    this.setState({
      message:''
    })
  }

  render() {
    return (
      <div className="message-input">
        <form className="send-message-form wrap" onSubmit={this.handleSubmit} >
          <input disabled={this.props.disabled} type="text" placeholder="Type your message here" value={this.state.message} onChange={this.handleChange} />
        </form>
      </div>
    );
  }
}

export default SendMessageForm;
