import React, {Component} from 'react';
import './Sidebar.css';

class Sidebar extends Component {
  render() {
    return (
      <div className='sidebar'>
        <div className="card">
          <article className="card-group-item">
            <header className="card-header">
              <h6 className="title">Brands </h6>
            </header>
            <div className="filter-content">
              <div className="card-body">
                <form>
                  <label className="form-check">
                    <input className="form-check-input" type="checkbox" value=""/>
                    <span className="form-check-label">
                                                Mersedes Benz
                                              </span>
                  </label>
                  <label className="form-check">
                    <input className="form-check-input" type="checkbox" value=""/>
                    <span className="form-check-label">
                                                Nissan Altima
                                              </span>
                  </label>
                  <label className="form-check">
                    <input className="form-check-input" type="checkbox" value=""/>
                    <span className="form-check-label">
                                                Another Brand
                                              </span>
                  </label>
                </form>
              </div>
            </div>
          </article>
        </div>
      </div>
    );
  }
}

export default Sidebar;