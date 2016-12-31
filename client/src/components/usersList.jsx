import React from 'react';
import { connect } from 'react-redux';

const UsersList = React.createClass({
  propTypes: {
    users: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
  },

  render() {
    return (
      <div className="users">
        <h3 style={{ textAlign: 'center' }}> Online Users </h3>
        <ul id="usersList">
          {
            this.props.users.map((user, i) =>
                (<li key={i}>
                  {user}
                </li>))
          }
        </ul>
      </div>
    );
  },
});

const mapStateToProps = state => ({
  users: state.users,
});

export default connect(mapStateToProps)(UsersList);
