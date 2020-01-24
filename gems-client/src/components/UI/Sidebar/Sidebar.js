import React, {Component} from 'react';
import './Sidebar.css';
import GemFilter from "../../../containers/GemFilter/GemFilter";

class Sidebar extends Component {
  render() {
    return (
      <div className='sidebar'>
        <GemFilter />
      </div>
    );
  }
}

export default Sidebar;