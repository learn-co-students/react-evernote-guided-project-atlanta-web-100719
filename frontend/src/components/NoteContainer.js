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
  }


  handleDetailClick = (note) => {
    this.setState({
      currentNote: note
    })
  }


  render() {
    return (
      <Fragment>
        <Search />
        <div className='container'>
          <Sidebar userArray={this.props.userArray}/>
          <Content />
        </div>
      </Fragment>
    );
  }
}

export default NoteContainer;
