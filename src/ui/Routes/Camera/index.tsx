import * as React from 'react';

import Socket from '~/ui/Services/socket'

export default class Camera extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      io: new Socket()
    };
  }

  render() {
    return (
      <h1>Camera</h1>
    );
  }
}
