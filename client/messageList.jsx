
const React = require('react');
const Message = require('./Message.jsx');

const MessageList = React.createClass({
  propTypes: {
    messages: React.PropTypes.array,
  },

  render() {
    return (
      <ul className="messages" id="messageList">
        <h2> Conversation: </h2>
        {
          this.props.messages.map((message, i) =>
              <Message
                key={i}
                user={message.user}
                text={message.text}
              />
            )
          }
      </ul>
    );
  },
});

module.exports = MessageList;
