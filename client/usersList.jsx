
const React = require('react');

const UsersList = React.createClass({
  propTypes: {
    users: React.PropTypes.array.isRequired,
  },

  render() {
    return (
      <div className="users">
        <h3> Online Users </h3>
        <ul id="usersList">
          {
            this.props.users.map((user, i) =>
                <li key={i}>
                  {user}
                </li>
              )
          }
        </ul>
      </div>
    );
  },
});

module.exports = UsersList;
