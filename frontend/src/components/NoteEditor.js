import React, { Component } from "react";

class NoteEditor extends Component {

    state = {
      title: this.props.currentNote.title,
      body: this.props.currentNote.body,
      id: this.props.currentNote.id
    }

  inputNewTitle = (event) => {
    this.setState({
      title: event.target.value
    })
  }

  inputNewBody = (event) => {
    this.setState({
      body: event.target.value
    })
  }

  handleFormSubmission = (event) => {
    event.preventDefault()
    const {id,title,body} = this.state
    this.props.handleUpdate(id,title,body)
  }


// <button type="button">Cancel</button>

  render() {
     return (
      <form className="note-editor" onSubmit={this.handleFormSubmission} >
        <input type="text" name="title" value={this.state.title} onChange={this.inputNewTitle} />
        <textarea name="body" value={this.state.body} onChange={this.inputNewBody}/>
        <div className="button-row">
          <input className="button" type="submit" value="Save" />
          <button type="button" onClick={this.props.handleDelete(this.props.currentNote.id)}>Delete</button>
        </div>
      </form>
    );
  }
}

export default NoteEditor;