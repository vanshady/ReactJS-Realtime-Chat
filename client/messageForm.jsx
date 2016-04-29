
const React = require('react');

const MessageForm = React.createClass({
  propTypes: {
    user: React.PropTypes.string,
    text: React.PropTypes.string,
    onMessageSubmit: React.PropTypes.func.isRequired,
  },

  getInitialState() {
    return { text: '' };
  },

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.text) {
      const message = {
        user: this.props.user,
        text: this.state.text,
      };
      this.props.onMessageSubmit(message);
      this.setState({ text: '' });
    }
  },

  changeHandler(e) {
    this.setState({ text: e.target.value });
  },

  render() {
    return (
      <div className="message_form">
        <form onSubmit={this.handleSubmit}>
          <div>
            <input
              type="message"
              placeholder="Type a message..."
              id="messageFormInput"
              onChange={this.changeHandler}
              value={this.state.text}
            />
          </div>
        </form>
      </div>
    );
  },
});

module.exports = MessageForm;
