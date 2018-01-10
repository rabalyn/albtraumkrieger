import React, { Component } from 'react'

class Manga extends Component {
  render() {
    return (
      <div className="content">
        
        <table className="table table-hover table-striped table-dark">
          <thead>
            <tr>
              <th scope="col">Deutsch</th>
              <th scope="col">English</th>
            </tr>
          </thead>
          <tbody>
            <tr className="table-secondary">
              <td><a href="https://www.youtube.com/watch?v=ZL9NWvUHPjU&list=PLi0zWwMUyRznqFeVXzJV9LdF1KoqM_bOg&index=1">Kapitel 1-2</a></td>
              <td><a href="https://www.youtube.com/watch?v=4sl9bgLjtT8&index=3&list=PLi0zWwMUyRznqFeVXzJV9LdF1KoqM_bOg">Chapter 1-2</a></td>
            </tr>
            <tr className="table-secondary">
              <td><a href="https://www.youtube.com/watch?v=niBBv6dcPKU&list=PLi0zWwMUyRznqFeVXzJV9LdF1KoqM_bOg&index=2">Kapitel 3-4</a></td>
              <td><a href="https://www.youtube.com/watch?v=ZtZVWwh2vMg&feature=youtu.be">Chapter 3-4</a></td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

export default Manga