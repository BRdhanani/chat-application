import React from 'react';

class Roomlist extends React.Component {
  render() {
    return (
      <div className="room-list">
        <ul>
          <h3>Your rooms:</h3>
          {
            this.props.rooms.map(room => {
              const active = this.props.roomId === room.id ? 'active' : ''
              return(
                <li key={room.id} className={"rooms " + active}>
                  <div className="wrap">
                    <div className="meta">
                      <a onClick={() => this.props.subscribeToRoom(room.id)} href="#" className="name"># {room.name}</a>
                    </div>
                  </div>
                </li>
              )
            })
          }
        </ul>
      </div>
    );
  }
}

export default Roomlist;
