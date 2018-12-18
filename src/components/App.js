import React, { Component } from 'react';
import SwaggerUI from 'swagger-ui'
import SwaggerLayout from './SwaggerLayout'
import IDPSpec from '../swagger-files/petstore.swagger.json';

import 'swagger-ui/dist/swagger-ui.css';

const DOM_ID = "swagger-ui-mountpoint"

const CustomLayoutPlugin = {
  components: {
    CustomLayout: SwaggerLayout
  }
}

class App extends Component {
  componentDidMount() {
    const test = Object.assign({}, IDPSpec, { host: 'petstore.swagger.io' })

    SwaggerUI({
      dom_id: `#${DOM_ID}`,
      spec: test,
      plugins: [
        CustomLayoutPlugin
      ],
      layout: 'CustomLayout'
    })
  }

  render() {
    return (
      <div id={DOM_ID} />
    );
  }
}

export default App;
