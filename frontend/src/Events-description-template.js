const events = {
  // keys are hardcoded in components
  // structure is needed, not flexible
  "monday": {
    "day": "Montag", // name / heading of card
    "start": new Date(0, 0, 0, 10, 0, 0, 0), // start 10 am
    "end": new Date(0, 0, 0, 13, 0, 0, 0),   // end 1 pm
    "info": [
      {
        "id": "10", // id for react
        "text": "Guild action" // rendered text in UI
      },
      {
        "id": "11", // id for react
        "text": "Another Guild action" // rendered text in UI
      }
    ]
  },
  "tuesday": {
    "day": "Dienstag",
    "start": new Date(0, 0, 0, 18, 0, 0, 0),
    "end": new Date(0, 0, 0, 20, 0, 0, 0),
    "info": [
      {
        "id": "20",
        "text": "Guild action 3?"
      }
    ]
  },
  "wednesday": {
    "day": "Mittwoch",
    "start": new Date(0, 0, 0, 18, 0, 0, 0),
    "end": new Date(0, 0, 0, 20, 0, 0, 0),
    "info": [
      // empty is valid too, dummy message will be shown
    ]
  },
  "thursday": {
    "day": "Donnerstag",
    "start": new Date(0, 0, 0, 18, 0, 0, 0),
    "end": new Date(0, 0, 0, 20, 0, 0, 0),
    "info": [
      {
        "id": "40",
        "text": "Guild action"
      }
    ]
  },
  "friday": {
    "day": "Freitag",
    "start": new Date(0, 0, 0, 18, 0, 0, 0),
    "end": new Date(0, 0, 0, 20, 0, 0, 0),
    "info": [
      {
        "id": "50",
        "text": "Guild action"
      }
    ]
  },
  "saturday": {
    "day": "Samstag",
    "start": new Date(0, 0, 0, 18, 0, 0, 0),
    "end": new Date(0, 0, 0, 20, 0, 0, 0),
    "info": [
      {
        "id": "60",
        "text": "Guild action"
      }
    ]
  },
  "sunday": {
    "day": "Sonntag",
    "start": new Date(0, 0, 0, 18, 0, 0, 0),
    "end": new Date(0, 0, 0, 20, 0, 0, 0),
    "info": [
      {
        "id": "70",
        "text": "Guild action"
      }
    ]
  }
}

export default events