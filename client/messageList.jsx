
const React = require('react');
const Message = require('./Message.jsx');

const MessageList = React.createClass({
  propTypes: {
    messages: React.PropTypes.array.isRequried,
  },

  render() {
    return (
      <div className="messages" style={{ marginBottom: '20px' }} >
        <h2> Conversation: </h2>
        {
          this.props.messages.map((message, i) =>
              <Message
                key={i}
                user={message.user}
                text={message.text}
              />
            )
          })
        }
      </div>
    );
  },
});

module.exports = MessageList;
