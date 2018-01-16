import React, { Component } from 'react'

class Home extends Component {
  render() {
    return (
      <div className="content row home justify-content-center">
        <div className="col-xs-12 col-sm-12 col-md-10 col-lg-9 col-xl-9 card">
          <h5 className="card-header">Willkommen</h5>
          <div className="card-body">
            <h5 className="card-title">Albtraumkrieger</h5>
            <p>
              Die Gilde Albtraumkrieger ist auf dem Server Elonaspitze (ehemalig Elonafels) zu Hause und bietet 
              allen einsam umherirrenden Seelen eine Patchwork-Familie.<br/>
              Gemeinschaft ist uns wichtig, daher messen wir unser Können zusammen im PvE, PvP und Roleplay. Wir 
              laufen Dungeons, klatschen Bosse, genießen die lebendige Welt, oder sitzen Abends einfach nur bei einem 
              gemütlichen Lagerfeuer zusammen und lauschen den Geschichten der Vergangenheit.
            </p>

            <p>
              Wir sind immer offen für Neues und Ideen von unseren Mitspielern, daher sind wir auch einige Bündnisse 
              und Allianzen eingegangen. Zu unseren Partnergilden gehören:
            </p>

            <ul>
              <li>Das Schwarze Kreuz [RP]</li>
              <li>Special Tricks And Rescue Squad [Star]</li>
              <li>Shadow Drake Hunters [SDH]</li>
            </ul>

            <p>
              Da wir alle von verschiedene Servern kommen und einfach nur Spaß am Spiel haben wollen, herrscht bei uns 
              keine Repräsentations- oder Online Pflicht. Teilnahme an Events und Raids sind rein freiwillig und nicht verpflichtend.
            </p>

            <p>
              Haben wir dein Interesse geweckt? Dann schreib doch Tahira.9385 oder ElMango.6328 ingame an.
            </p>

            <p>
              Wir freuen uns auf euch :)
            </p>
          </div>
        </div>
        <div className="col-8">
        </div>
      </div>
    )
  }
}

export default Home