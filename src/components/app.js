import React from 'react'
import {Grommet, Box, Heading, Button, Text} from 'grommet'
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

//const socket_path = "http://fermentadora.local:3000";
const socket_path = "http://localhost:3000";

class App extends React.Component {
  constructor(props) {
     super(props);
     this.socket = null;
     this.state = {
       message: 'Waiting for a message'
     }

   }

    componentDidMount(){
      this.socket = new io(socket_path);
      this.socket.on('message', (data)=>{
        console.log(data);
        console.log()
        this.setState({message: data});
      });
      this.socket.on('connect', ()=>{
        console.log('connected');
      })
    }

    render(){
      const message = this.state.message;
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
          <Button label="Led on" onClick={() => {}} />
          </Box>
      </Grommet>;
    }
}


export default App;
