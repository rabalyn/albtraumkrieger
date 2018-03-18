import React, { Component } from 'react'
import Roleplay from './Roleplay'
import roleplay_descriptions from './roleplay_description'

class Roleplays extends Component {
  render() {
    const parentid = "accordion"

    return (
      <div className="content row justify-content-center">
        <div className="col-12" id={parentid}>
          {
            roleplay_descriptions.map((value, idx) => {
              return <Roleplay key={idx} dataparent={parentid} datatarget={value.target} cardtitle={value.title} show={value.show} description={value.description}/>
            })
          }
        </div>
      </div>
    )
  }
}

export default Roleplays