
const React = require('react');
const ReactDOM = require('react-dom');
const UsersList = require('./usersList.jsx');
const MessageList = require('./messageList.jsx');
const MessageForm = require('./messageForm.jsx');
const ChangeNameForm = require('./changeNameForm.jsx');
const socket = io.connect();

const ChatApp = React.createClass({

  getInitialState() {
    return { users: [], messages: [], text: '', scrollTop: 0 };
  },

  componentDidMount() {
    socket.on('init', this._initialize);
    socket.on('send:message', this._messageRecieve);
    socket.on('user:join', this._userJoined);
    socket.on('user:left', this._userLeft);
    socket.on('change:name', this._userChangedName);
  },

  _initialize(data) {
    const { users, messages, name } = data;
    this.setState({ users, messages, user: name });
  },

  _messageRecieve(message) {
    const { messages } = this.state;
    messages.push(message);
    this.setState({ messages, scrollTop: document.getElementById('messageList').scrollHeight });
  },

  _userJoined(data) {
    const { users, messages } = this.state;
    const { name } = data;
    users.push(name);
    users.sort();
    messages.push({
      user: 'Application bot',
      text: name + ' Joined',
    });
    this.setState({ users, messages });
  },

  _userLeft(data) {
    const { users, messages } = this.state;
    const { name } = data;
    const index = users.indexOf(name);
    users.splice(index, 1);
    messages.push({
      user: 'Application bot',
      text: name + ' Left',
    });
    this.setState({ users, messages });
  },

  _userChangedName(data) {
    const { oldName, newName } = data;
    const { users, messages } = this.state;
    const index = users.indexOf(oldName);
    users.splice(index, 1, newName);
    users.sort();
    messages.push({
      user: 'Application bot',
      text: 'Change Name : ' + oldName + ' ==> ' + newName,
    });
    this.setState({ users, messages });
  },

  handleMessageSubmit(message) {
    const { messages } = this.state;
    messages.push(message);
    this.setState({ messages });
    socket.emit('send:message', message);
  },

  handleChangeName(newName) {
    const oldName = this.state.user;
    socket.emit('change:name', { name: newName }, (result) => {
      if (!result) {
        return 'There was an error changing your name';
      }
      const { users } = this.state;
      const index = users.indexOf(oldName);
      users.splice(index, 1, newName);
      this.setState({ users, user: newName });
      return '';
    });
  },

  render() {
    return (
      <div className="col-md-offset-2 col-md-8">
        <h2 id="name"> Your name: {this.state.user} </h2>
        <div className="row" id="myapp">
          <div className="col-md-8">
            <MessageList
              messages={this.state.messages}
            />
            <MessageForm
              onMessageSubmit={this.handleMessageSubmit}
              user={this.state.user}
            />
            <ChangeNameForm
              onChangeName={this.handleChangeName}
            />
          </div>
          <div className="col-md-4">
            <UsersList
              users={this.state.users}
            />
          </div>
        </div>
      </div>
    );
  },
});

ReactDOM.render(<ChatApp />, document.getElementById('app'));
