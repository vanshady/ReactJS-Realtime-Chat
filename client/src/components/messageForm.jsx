import React from 'react';
import { connect } from 'react-redux';
import { sendMessage } from '../actions/message';

const MessageForm = React.createClass({
  propTypes: {
    name: React.PropTypes.string.isRequired,
    sendMessage: React.PropTypes.func.isRequired,
  },

  getInitialState() {
    return { text: '' };
  },

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.text && this.state.text.length > 0) {
      this.props.sendMessage({ user: this.props.name, text: this.state.text });
      this.setState({ text: '' });
    }
  },

  changeHandler(e) {
    this.setState({ text: e.target.value });
  },

  render() {
    return (
      <div className="message_form_div">
        <form className="message_form" onSubmit={this.handleSubmit} autoComplete="off">
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
  sendMessage: (message) => {
    dispatch(sendMessage(message));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MessageForm);

