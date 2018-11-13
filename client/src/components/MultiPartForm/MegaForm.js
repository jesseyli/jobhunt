import React, { Component } from 'react';

import './MegaForm.css';


// {
//   title: 'First Name',                   // OPTIONAL
//   name: 'firstName',                     // REQUIRED
//   type: 'text',                          // Only option right now
//   required: true,                        // Will add special styling in future
//   placeholder: 'enter first name...'     // OPTIONAL
// }

class MegaForm extends Component {
  state = {
    fields: {}
  }

  componentDidMount() {
   this.initializeFields();
  }

  componentDidUpdate(prevProps) {
    // given all 'name' should be unique, this should be sufficient
    if (prevProps.inputs[0].name !== this.props.inputs[0].name) {
      this.initializeFields();
    }
  }

  initializeFields = () => {
    let fields = {};

    this.props.inputs.forEach(input => {
      fields[input.name] = { ...input, value: '' }
    });

    this.setState({ fields });
  }

  formSubmit = e => {
    e.preventDefault();

    let fieldsArr = Object.values(this.state.fields);

    let results = fieldsArr.map(({ name, type, required, value }) => ({
      name,
      type,
      required,
      value
    }))

    // clear inputs in copy
    let fields = { ...this.state.fields };
    Object.keys(this.state.fields).forEach(name => {
      fields[name] = { ...fields[name], value: '' }
    })

    this.props.submit(results);

    // clear inputs
    this.setState({ fields });
  }

  handleChange = e => {
    let { name, value } = e.target;

    let fields = { ...this.state.fields };

    // deeper copy; two-way binding 'value' change
    fields[name] = { ...fields[name], value };

    this.setState({ fields });
  }

  renderInputs = ({ title, ...inputAttr }) => {

    if (title) {
      return (
        <React.Fragment key={inputAttr.name}>
          <label htmlFor={inputAttr.name}>{title}</label>
          <input
            {...inputAttr}
            id={inputAttr.name}
            onChange={this.handleChange}
          />
        </React.Fragment>
      )
    }

    return (
      <input
        {...inputAttr}
        key={inputAttr.name}
        onChange={this.handleChange}
      />
    )

  }

  render() {
    const { fields } = this.state;

    return (
      <form onSubmit={this.formSubmit}>
        {Object.values(fields).map(this.renderInputs)}
        <button type='submit'>{this.props.submitText}</button>
      </form>
    );
  }
}

export default MegaForm;