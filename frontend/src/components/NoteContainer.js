import React, { Component, Fragment } from 'react';
import Search from './Search';
import Sidebar from './Sidebar';
import Content from './Content';

class NoteContainer extends Component {

state = {
  notes: [],
  status: " ",
  editTitle: "Ciao",
  editBody: "Body of object",
  search: ""
}


componentDidMount() {
    fetch("http://localhost:3000/api/v1/notes")
    .then(res=>res.json())
    .then(notes=>this.setState({notes:notes}))
  }


  handleClick = (noteId) => {
    this.setState({clickedNote: noteId, status: "show"})
  }

  handleEditClick = () => {
    this.setState({status: "edit"})
    const allNotes = this.state.notes
    const targetId = this.state.clickedNote
    const targetNote = allNotes.find(function(note){return note.id === targetId})
    this.setState({editTitle: targetNote.title, editBody: targetNote.body})
    
  }

  handleSaveClick = (e) => {
      e.preventDefault()
      fetch(`http://localhost:3000/api/v1/notes/${this.state.clickedNote}`,{
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'},
        body: JSON.stringify({
          title: this.state.editTitle,
          body: this.state.editBody
        
        })
        }
      ).then(res=>{this.componentDidMount()})


  }

  handleTitleEditChange = (e) => {
      this.setState({editTitle:e.target.value})
    }

   handleBodyEditChange = (e) =>{
    this.setState({editBody:e.target.value})

   } 

   handleCancelClick = (e) => {
    this.setState({status: "show"})
   }

   handleNewClick = () => {
    fetch("http://localhost:3000/api/v1/notes", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'},
        body: JSON.stringify({
          title: 'New Note',
          body: 'default description'
        
        })
        }).then(res=>{this.componentDidMount()})
   }

   handleSearchInput = (e) => {
    this.setState({search:e.target.value})
   }

   filterNotes = (searchInput) => {
    return this.state.notes.filter(note => {
      return note.title.toLowerCase().includes(this.state.search.toLowerCase())
    })
   }

   sortNotes = () => {

    const sortNotes = [...this.state.notes]
    sortNotes.sort(function(a, b) {
        var nameA = a.title.toUpperCase(); 
        var nameB = b.title.toUpperCase(); 
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }

        return 0;
      });

    this.setState({notes:sortNotes})
    
   }


  render() {

    return (
      <Fragment>
        <button onClick={()=>{this.sortNotes()}}>sort Notes</button>
        <Search handleSearchInput={this.handleSearchInput} search={this.state.search}/>
        <div className='container'>
          <Sidebar notes={this.filterNotes(this.state.search)} handleClick={this.handleClick} handleNewClick={this.handleNewClick} />
          <Content editTitle={this.state.editTitle} editBody={this.state.editBody} notes={this.state.notes} selectedNote={this.state.clickedNote} status={this.state.status} 
            handleEditClick={this.handleEditClick} handleSaveClick={this.handleSaveClick} handleTitleEditChange={this.handleTitleEditChange}
            handleBodyEditChange={this.handleBodyEditChange} handleCancelClick={this.handleCancelClick}
          />
        </div>
      </Fragment>
    );
  }
}

export default NoteContainer;