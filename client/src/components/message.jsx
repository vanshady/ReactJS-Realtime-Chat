
const React = require('react');

const Message = React.createClass({
  propTypes: {
    user: React.PropTypes.string.isRequired,
    text: React.PropTypes.string.isRequired,
  },

  render() {
    return (
      <li className="message">
        <strong>{this.props.user}: </strong>
        <span>{this.props.text}</span>
      </li>
    );
  },
});

module.exports = Message;
