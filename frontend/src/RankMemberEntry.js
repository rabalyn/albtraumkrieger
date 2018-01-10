import React, { Component } from 'react'

class RankMemberEntry extends Component {
  render() {
    const memberSince = this.props.memberjoined
      ? "Mitglied seit dem " + new Date(this.props.memberjoined).toLocaleDateString('de')
      : "Gildengründer"
    return (
      <span className="guildmember" data-toggle="tooltip" data-placement="right" title={memberSince}>
        {this.props.membername}
      </span>
    )
  }
}

export default RankMemberEntry