
const React = require('react');

const ChangeNameForm = React.createClass({

  propTypes: {
    onChangeName: React.PropTypes.func.isRequired,
  },

  getInitialState() {
    return { newName: '' };
  },

  onKey(e) {
    this.setState({ newName: e.target.value });
  },

  handleSubmit(e) {
    e.preventDefault();
    const newName = this.state.newName;
    this.props.onChangeName(newName);
    this.setState({ newName: '' });
  },

  render() {
    return (
      <div className="change_name_form">
        <h3> Change Name </h3>
        <form onSubmit={this.handleSubmit}>
          <input
            onChange={this.onKey}
            value={this.state.newName}
          />
        </form>
      </div>
    );
  },
});

module.exports = ChangeNameForm;
