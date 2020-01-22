import React, {Component} from 'react';
import './Sidebar.css';
import GemFilter from "../../../containers/GemFilter/GemFilter";

class Sidebar extends Component {
  render() {
    return (
      <div className='sidebar'>
        <div className="card">
          <article className="card-group-item">
            <GemFilter />
          </article>
        </div>
      </div>
    );
  }
}

export default Sidebar;