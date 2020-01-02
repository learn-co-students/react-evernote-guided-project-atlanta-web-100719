import React, { Component, Fragment } from 'react';
import Search from './Search';
import Sidebar from './Sidebar';
import Content from './Content';

class NoteContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentNote: "",
      searchTerm: ""
    }
  }//end of constructor

  handleClickDetail = (note) => {
    this.setState({
      currentNote: note
    })
  }

  handleSearch = (event) => {
    const searchTerm = event.target.value
    this.setState({searchTerm})
  }

  notesToDisplay = () => {
    const results = this.props.notes.filter((note) => {
      return note.title.toLowerCase().includes(this.state.searchTerm.toLowerCase())
    })
    return results
  }//end of function


  render() {
    return (
      <Fragment>
        <Search filteredNotes={this.notesToDisplay()} handleSearch={this.handleSearch} />
        <div className='container'>
          <Sidebar notes={this.notesToDisplay()} handleClickDetail={this.handleClickDetail} newNote={this.props.newNote}/>
          <Content currentNote={this.state.currentNote} notes={this.props.notes} handleUpdate={this.props.handleUpdate} handleDelete={this.props.handleDelete}/>
        </div>
      </Fragment>
    );
  }
}

export default NoteContainer;