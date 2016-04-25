
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
        <form onSubmit={this.handleSubmit} className="form-inline">
          <div className="form-group">
            <label for="name" style={{ marginRight: '10px' }}> Change Name </label>
            <input
              type="name"
              className="form-control"
              id="name"
              placeholder="your name"
              onChange={this.onKey}
              value={this.state.newName}
            />
          </div>
        </form>
      </div>
    );
  },
});

module.exports = ChangeNameForm;
