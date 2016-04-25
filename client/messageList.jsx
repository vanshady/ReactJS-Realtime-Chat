
const React = require('react');
const Message = require('./Message.jsx');

let shouldScrollBottom;

const MessageList = React.createClass({
  propTypes: {
    messages: React.PropTypes.array,
  },
  componentWillUpdate: () => {
    const node = document.getElementById('messageList');
    shouldScrollBottom = Math.abs(node.scrollTop + node.offsetHeight - node.scrollHeight) < 5;
  },
  componentDidUpdate: () => {
    if (shouldScrollBottom) {
      const node = document.getElementById('messageList');
      node.scrollTop = node.scrollHeight;
    }
  },
  render() {
    return (
      <ul className="messages" id="messageList" style={{ paddingLeft: '20px' }} >
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
