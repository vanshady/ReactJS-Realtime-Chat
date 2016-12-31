import Cookies from 'jakobmattsson-client-cookies';
import React from 'react';
import { connect } from 'react-redux';
import { changeName } from 'actions/message';

const UsersList = require('components/UsersList.jsx');
const MessageList = require('components/MessageList.jsx');
const MessageForm = require('components/MessageForm.jsx');
const ChangeNameForm = require('components/ChangeNameForm.jsx');

const ChatApp = React.createClass({
  propTypes: {
    name: React.PropTypes.string.isRequired,
    changeName: React.PropTypes.func.isRequired,
  },

  componentDidMount() {
    if (Cookies.get('name')) this.props.changeName(Cookies.get('name'));
  },

  render() {
    return (
      <div className="container-fluid" style={{ height: '100%', minHeight: '100%' }} >
        <div className="row" id="nav">
          <div className="col-md-2 col-xs-4" id="githubDiv">
            <a id="github" href="https://github.com/vanshady/ReactJS-Realtime-Chat/">Code on Github</a>
          </div>
          <div className="col-md-10 col-xs-8" id="userNameDiv">
            <h4 id="userName"> {this.props.name} </h4>
          </div>
        </div>
        <div className="row" style={{ height: '92%' }}>
          <div className="col-md-2 col-xs-4" id="UsersBox">
            <UsersList />
            <ChangeNameForm
              className="row"
            />
          </div>
          <div className="col-md-10 col-xs-8" id="MessageBox">
            <MessageList
              id="MessageList"
              className="row"
            />
            <MessageForm className="row" />
          </div>
        </div>
      </div>
    );
  },
});

const mapStateToProps = state => ({
  name: state.name,
});

const mapDispatchToProps = dispatch => ({
  changeName: (name) => {
    dispatch(changeName(name));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatApp);
