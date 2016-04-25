
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
    const message = {
      user: this.props.user,
      text: this.state.text,
    };
    this.props.onMessageSubmit(message);
    this.setState({ text: '' });
  },

  changeHandler(e) {
    this.setState({ text: e.target.value });
  },

  render() {
    return (
      <div className="message_form">
        <h3>Write New Message</h3>
        <form onSubmit={this.handleSubmit}>
          <input
            onChange={this.changeHandler}
            value={this.state.text}
          />
        </form>
      </div>
    );
  },
});

module.exports = MessageForm;
