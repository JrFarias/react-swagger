import React, { Component } from 'react';
import SwaggerUI from 'swagger-ui'
import SwaggerLayout from './SwaggerLayout'
import spec from './petstore.swagger.json';

import 'swagger-ui/dist/swagger-ui.css';

const DOM_ID = "swagger-ui-mountpoint"

const CustomLayoutPlugin = {
  components: {
    CustomLayout: SwaggerLayout
  }
}

class App extends Component {
  componentDidMount() {
    SwaggerUI({
      dom_id: `#${DOM_ID}`,
      spec,
      plugins: [
        CustomLayoutPlugin
      ],
      layout: "CustomLayout"
    })
  }

  render() {
    return (
      <div className="App">
        <div id={DOM_ID} />
      </div>
    );
  }
}

export default App;
