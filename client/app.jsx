const React = require('react');
const ReactDOM = require('react-dom');
const request = require('superagent');
const Cookies = require('jakobmattsson-client-cookies');
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
    socket.on('init', this.initialize);
    socket.on('send:message', this.messageRecieve);
    socket.on('user:join', this.userJoined);
    socket.on('user:left', this.userLeft);
    socket.on('change:name', this.userChangedName);
    if (Cookies.get('name')) this.handleChangeName(Cookies.get('name'));
  },

  initialize(data) {
    const { users, messages, name } = data;
    if (this.state.user) {
      console.log('we have name!!!');
      this.setState({ users, messages });
    } else {
      this.setState({ users, messages, user: name });
    }
  },

  messageRecieve(message) {
    const { messages } = this.state;
    messages.push(message);
    this.setState({ messages, scrollTop: document.getElementById('messageList').scrollHeight });
  },

  userJoined(data) {
    const { users, messages } = this.state;
    const { name } = data;
    users.push(name);
    users.sort();
    // messages.push({
    //   user: 'Application bot',
    //   text: name + ' Joined',
    // });
    this.setState({ users, messages });
  },

  userLeft(data) {
    const { users, messages } = this.state;
    const { name } = data;
    const index = users.indexOf(name);
    users.splice(index, 1);
    // messages.push({
    //   user: 'Application bot',
    //   text: name + ' Left',
    // });
    this.setState({ users, messages });
  },

  userChangedName(data) {
    const { oldName, newName } = data;
    const { users, messages } = this.state;
    const index = users.indexOf(oldName);
    users.splice(index, 1, newName);
    users.sort();
    // messages.push({
    //   user: 'Application bot',
    //   text: 'Change Name : ' + oldName + ' ==> ' + newName,
    // });
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
    console.log(`new name: ${newName}`);
    // request.post('/name')
    //   .send({ name: newName })
    //   .end(function (err, res) {
    //     if (err) console.log(err);
    //     console.log(res);
    //   });
    Cookies.set('name', newName);
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
      <div className="container-fluid" style={{ height: '100%', minHeight: '100%' }} >
        <div className="row" id="nav">
          <div className="col-md-2 col-xs-4" id="githubDiv">
            <a id="github" href="https://github.com/vanshady/ReactJS-Realtime-Chat/">Code on Github</a>
          </div>
          <div className="col-md-10 col-xs-8" id="userNameDiv">
            <h4 id="userName"> {this.state.user} </h4>
          </div>
        </div>
        <div className="row" style={{ height: '92%' }}>
          <div className="col-md-2 col-xs-4" id="UsersBox">
            <UsersList
              users={this.state.users}
              />
            <ChangeNameForm
              className="row"
              onChangeName={this.handleChangeName}
              />
          </div>
          <div className="col-md-10 col-xs-8" id="MessageBox">
            <MessageList
              id="MessageList"
              className="row"
              messages={this.state.messages}
              />
            <MessageForm
              className="row"
              onMessageSubmit={this.handleMessageSubmit}
              user={this.state.user}
              />
          </div>
        </div>
      </div>
    );
  },
});

ReactDOM.render(<ChatApp />, document.getElementById('app'));
