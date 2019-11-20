import * as React from 'react';

import Socket from '~/ui/Services/socket'

export default class Scoreboard extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      io: new Socket()
    };
  }

  render() {
    return (
      <div>
        <h1>Scoreboard</h1>
      </div>
    );
  }
}
