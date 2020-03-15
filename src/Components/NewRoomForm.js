import React from 'react';

class NewRoomForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      roomname:''
    }
  }

  handleChange = (e) => {
    this.setState({roomname:e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.createRoom(this.state.roomname)
    this.setState({
      roomname:''
    })
  }

  render() {
    return (
      <div className="createRoom">
        <form className="new-room-form" onSubmit={this.handleSubmit} >
          <input type="text" placeholder="Create room" value={this.state.roomname} onChange={this.handleChange} />
        </form>
      </div>
    );
  }
}

export default NewRoomForm;
