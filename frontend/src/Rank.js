import React, { Component } from 'react'
import RankMemberEntry from './RankMemberEntry'

class Rank extends Component {
  render() {
    return (
      <div className={String().concat(this.props.cols, " card rank")}>
        <div className="card-header guildmember">
          {this.props.name}
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            {
              this.props.rankMembers.map((member) => {
                return (
                  <dd key={member.accountid}>
                    <RankMemberEntry membername={member.accountid.split('.')[0]} memberjoined={member.joinedAt}/>
                  </dd>
                )
              })
            }
          </li>
        </ul>
      </div>
    )
  }
}

export default Rank