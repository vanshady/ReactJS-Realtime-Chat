
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
          <div className="form-group">
            <label htmlFor="message">Write New Message</label>
            <input
              type="message"
              className="form-control"
              placeholder="message"
              id="message"
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
