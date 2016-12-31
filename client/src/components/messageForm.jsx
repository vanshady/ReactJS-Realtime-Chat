import React from 'react';
import { connect } from 'react-redux';
import { sendMessage } from 'actions/message';

const MessageForm = React.createClass({
  propTypes: {
    sendMessage: React.PropTypes.func.isRequired,
  },

  getInitialState() {
    return { text: '' };
  },

  changeHandler(e) {
    this.setState({ text: e.target.value });
  },

  render() {
    return (
      <div className="message_form_div">
        <form className="message_form" onSubmit={this.sendMessage} autoComplete="off">
          <input
            type="message"
            placeholder="Type a message..."
            id="messageFormInput"
            onChange={this.changeHandler}
            value={this.state.text}
          />
        </form>
      </div>
    );
  },
});

const mapStateToProps = state => ({
  name: state.name,
});

const mapDispatchToProps = dispatch => ({
  sendMessage: (name) => {
    dispatch(sendMessage(name));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MessageForm);
