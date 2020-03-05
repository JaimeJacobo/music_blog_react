import React, {Component} from 'react';
import './App.scss';
import Searchbar from './components/searchbar/Searchbar'
import { Container } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


class App extends Component {


  render(){
    return (
      <Container className="App">
        <Searchbar />
      </Container>
    );
  }
}

export default App;
