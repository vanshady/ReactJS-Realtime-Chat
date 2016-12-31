import Cookies from 'jakobmattsson-client-cookies';

const React = require('react');
const ReactDOM = require('react-dom');
const UsersList = require('./usersList.jsx');
const MessageList = require('./messageList.jsx');
const MessageForm = require('./messageForm.jsx');
const ChangeNameForm = require('./changeNameForm.jsx');

const ChatApp = React.createClass({
  getInitialState() {
    return { users: [], messages: [], text: '', scrollTop: 0 };
  },

  componentDidMount() {
    if (Cookies.get('name')) this.handleChangeName(Cookies.get('name'));
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
              user={this.state.user}
            />
          </div>
        </div>
      </div>
    );
  },
});

ReactDOM.render(<ChatApp />, document.getElementById('app'));
