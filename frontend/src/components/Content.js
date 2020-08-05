import React, { Component } from 'react';
import NoteEditor from './NoteEditor';
import NoteViewer from './NoteViewer';
import Instructions from './Instructions';

class Content extends Component {


  renderContent = (usrInput) => {
    
    if (usrInput === 'edit') {
      return <NoteEditor editBody={this.props.editBody} editTitle={this.props.editTitle} notes={this.props.notes} selectedNote={this.props.selectedNote}
      handleTitleEditChange={this.props.handleTitleEditChange} handleSaveClick={this.props.handleSaveClick}
      handleBodyEditChange={this.props.handleBodyEditChange} handleCancelClick={this.props.handleCancelClick}/> 
    } 
    else if (usrInput === 'show') {
      return <NoteViewer allProps={this.props}
      handleEditClick={this.props.handleEditClick}
      />;
    } 
    else {
      return <Instructions />;
    }
  }

  render() {
    return (
      <div className='master-detail-element detail'>
        {this.renderContent(this.props.status)}
      </div>
    );
  }
}

export default Content;

