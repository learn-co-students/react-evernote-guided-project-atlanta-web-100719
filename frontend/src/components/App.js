import React, { Component } from 'react';
import Header from './Header';
import NoteContainer from './NoteContainer';

class App extends Component {
  state = {
    notes: [],
    newMessageTitle: "Default",
    newMessageBody: "Body"
  };

  componentDidMount() {
    fetch("http://localhost:3000/api/v1/notes")
      .then(response => response.json())
      .then(notes => {
        this.setState({
          notes: notes
        });
      });
  }

  handleNewNote = () => {
    const newNoteTitle = this.state.newMessageTitle;
    const newNoteBody = this.state.newMessageBody;

    fetch("http://localhost:3000/api/v1/notes", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        body: newNoteBody,
        title: newNoteTitle,
        user_id: 1
      })
    })
      .then(response => response.json())
      .then(noteObj => {

        let newNotes = this.state.notes.concat({
          body: newNoteBody,
          title: newNoteTitle,
          id: noteObj.id
        });
        this.setState({
          notes: newNotes
        });
      });
  }; 
  
  handleUpdate = (id, title, body) => {

    fetch(`http://localhost:3000/api/v1/notes/${id}`, {
      method: 'PATCH',
      headers: {
        "Accept": 'application/json',
        "Content-Type": 'application/json'
      },
      body: JSON.stringify({
        title,
        body,
        id
      })
    })
      .then((response) => {
        return response.json()
      })
      .then((note) => {
        const otherNotes = this.state.notes.filter(n => n.id !== note.id)
        const notes = [...otherNotes, note].sort((a, b) => {
          if (a.id > b.id) {
            return 1
          } else if (a.id < b.id) {
            return -1
          } else {
            return 0
          }
        })
        this.setState({
          notes
        })
      })
  }


  handleDelete(noteId) {
    fetch(`http://localhost:3000/api/v1/notes/${noteId}`, {
      method: 'DELETE',
      headers: {
        "Accept": 'application/json',
        "Content-Type": 'application/json'
      }
    })
      .then((response) => {
        console.log('item deleted')
      })
  }

  render() {
    return (
      <div className="app">
        <Header />
        <NoteContainer notes={this.state.notes} newNote={this.handleNewNote} handleUpdate={this.handleUpdate} handleDelete={this.handleDelete} />
      </div>
    );
  }
}

export default App;
