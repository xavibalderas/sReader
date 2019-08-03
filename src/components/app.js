import React from 'react'
import {Grommet, Box, Heading, Button, Text, Chart} from 'grommet'
import io from 'socket.io-client';


const theme = {
  global: {
    font: {
      family: 'Roboto',
      size: '14px',
      height: '20px',
    },
  },
};

const socket_path = "http://fermentadora.local:3000";
//const socket_path = "http://localhost:3000";

class App extends React.Component {
  constructor(props) {
     super(props);
     this.socket = null;
     this.state = {
       message: 'Waiting for a message',
       temperatures: [],
       lastReceived: -1,
       led: false
     }

   }

    componentDidMount(){
      this.socket = new io(socket_path);
      this.socket.on('message', (data)=>{
        this.setState({message: data});
      });
      this.socket.on('temperature', (data)=>{
        var _t = this.state.temperatures;
        this.setState({
          lastReceived: data,
          temperatures: [...this.state.temperatures, data]
        });
      });
      this.socket.on('connect', ()=>{
        console.log('connected');
      })
    }

    switchLed(){
      var led = this.state.led;
      led =! led;
      this.setState({led: led});
      this.socket.emit("led", led);
    }

    render(){
      const message = this.state.message;
      const temperatures = this.state.temperatures;
      const lastReceived = this.state.lastReceived;
      const led = this.state.led;
      return <Grommet theme={theme}>
          <Box
            direction="column"
            justify="center"
            align="center"
            pad="xlarge"
            gap="medium"
          >
          <Heading>Let's ferment!!</Heading>
          <Text>{message}</Text>
          <Text>Current temperature: {lastReceived}</Text>
          <Button label="Led on" active={led} onClick={()=>{this.switchLed()}} />
          <Chart type="line" values={temperatures} thickness="xsmall" type="area" />
          </Box>
      </Grommet>;
    }
}


export default App;
