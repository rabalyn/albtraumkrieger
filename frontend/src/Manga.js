import React, { Component } from 'react'

class Manga extends Component {
  render() {
    return (
      <div className="content row justify-content-center">
        <div className="col-12 card">
          <h5 className="card-header">Guild Wars 2 - Albtraumkrieger Manga</h5>
          <div className="card-body">
            <table className="col-12 table table-hover table-striped table-dark">
              <thead>
                <tr>
                  <th scope="col">Deutsch</th>
                  <th scope="col">English</th>
                </tr>
              </thead>
              <tbody>
                <tr className="table-secondary">
                  <td>
                    <iframe 
                      title="kapiel1-2" 
                      allowFullScreen="allowfullscreen"
                      mozallowfullscreen="mozallowfullscreen"
                      msallowfullscreen="msallowfullscreen"
                      oallowfullscreen="oallowfullscreen"
                      webkitallowfullscreen="webkitallowfullscreen" 
                      width="100%" 
                      src="https://www.youtube.com/embed/ZL9NWvUHPjU?rel=0" 
                      frameBorder="0" 
                      allow="autoplay; encrypted-media">
                    </iframe>
                  </td>
                  <td>
                    <iframe 
                      title="chapter1-2" 
                      allowFullScreen="allowfullscreen"
                      mozallowfullscreen="mozallowfullscreen"
                      msallowfullscreen="msallowfullscreen"
                      oallowfullscreen="oallowfullscreen"
                      webkitallowfullscreen="webkitallowfullscreen" 
                      width="100%" 
                      src="https://www.youtube.com/embed/4sl9bgLjtT8?rel=0" 
                      frameBorder="0" 
                      allow="autoplay; encrypted-media">
                    </iframe>
                  </td>
                </tr>
                <tr className="table-secondary">
                  <td>
                    <iframe 
                      title="kapiel3-4" 
                      allowFullScreen="allowfullscreen"
                      mozallowfullscreen="mozallowfullscreen"
                      msallowfullscreen="msallowfullscreen"
                      oallowfullscreen="oallowfullscreen"
                      webkitallowfullscreen="webkitallowfullscreen" 
                      width="480" 
                      height="360"
                      src="https://www.youtube.com/embed/niBBv6dcPKU?rel=0" 
                      frameBorder="0" 
                      allow="autoplay; encrypted-media">
                    </iframe>
                  </td>
                  <td>
                    <iframe 
                      title="chapter3-4" 
                      allowFullScreen="allowfullscreen"
                      mozallowfullscreen="mozallowfullscreen"
                      msallowfullscreen="msallowfullscreen"
                      oallowfullscreen="oallowfullscreen"
                      webkitallowfullscreen="webkitallowfullscreen" 
                      width="480" 
                      height="360" 
                      src="https://www.youtube.com/embed/ZtZVWwh2vMg?rel=0" 
                      frameBorder="0" 
                      allow="autoplay; encrypted-media">
                    </iframe>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}

export default Manga