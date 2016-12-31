import React from 'react';
import { connect } from 'react-redux';

const Message = require('components/Message.jsx');

let shouldScrollBottom;

const MessageList = React.createClass({
  propTypes: {
    messages: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
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
      <ul className="messages" id="messageList" >
        {
          this.props.messages.map((message, i) =>
            (<Message
              key={i}
              user={message.user}
              text={message.text}
            />))
        }
      </ul>
    );
  },
});

const mapStateToProps = state => ({
  messages: state.messages,
});

export default connect(mapStateToProps)(MessageList);

