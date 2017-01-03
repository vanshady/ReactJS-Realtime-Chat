import React from 'react';
import { connect } from 'react-redux';
import { changeName } from '../actions/message';

const ChangeNameForm = React.createClass({
  propTypes: {
    name: React.PropTypes.string.isRequired,
    changeName: React.PropTypes.func.isRequired,
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
    this.props.changeName(this.props.name, newName);
    this.setState({ newName: '' });
  },

  render() {
    return (
      <div className="change_name_form_div">
        <form className="change_name_form" onSubmit={this.handleSubmit} autoComplete="off" >
          <input
            type="name"
            id="nameFormInput"
            placeholder="Your name"
            onChange={this.onKey}
            value={this.state.newName}
          />
        </form>
      </div>
    );
  },
});

const mapStateToProps = state => ({
  name: state.name,
});

const mapDispatchToProps = dispatch => ({
  changeName: (oldName, newName) => {
    dispatch(changeName(oldName, newName));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ChangeNameForm);
