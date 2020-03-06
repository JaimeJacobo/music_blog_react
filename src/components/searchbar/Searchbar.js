import React, {Component} from 'react';
import './Searchbar.scss';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const data = require('../../data.json');

class Searchbar extends Component {

  state = {
    data: data,
    modalOpen: false,
    thisModalInfo: '',
    actualSearchWord: '',
    dataShown: data,
    selectValue: 'artist'
  }

  renderAlbumTitles(){

    return this.state.dataShown.map((album, index)=>{
      return (
        <Button key={index} color="link" onClick={()=>this.toggle(album)}><img src={album.albumLink} alt={album.imageAlt} /></Button>
      )
    })
  }

  toggle(albumInfo = ''){
    this.setState({
      modalOpen: !this.state.modalOpen,
      thisModalInfo: albumInfo,
    })
  }

  showModal(status){
    const thisAlbum = this.state.thisModalInfo
    return(
        <div>
          <Modal isOpen={status} >
            <ModalHeader toggle={()=>this.toggle()}>{thisAlbum.imageAlt}</ModalHeader>
            <ModalBody>
              <img src={thisAlbum.albumLink} alt={thisAlbum.imageAlt}/>
              <iframe title={thisAlbum.imageAlt} src={thisAlbum.spotifyPlaylist} width="100%" height="80" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
              <p className="title">Artista: {thisAlbum.artist}</p>
              <p className="title">Álbum: {thisAlbum.album}</p>
              <p className="title">Año: {thisAlbum.year}</p>
              <p className="title">Género: {thisAlbum.genre}</p>
            </ModalBody>
            <ModalFooter>
              <a href={thisAlbum.spotifyLink}><Button color="success" >Abrir en Spotify</Button></a>
              <Button color="secondary" onClick={()=>this.toggle()}>Cerrar</Button>
            </ModalFooter>
          </Modal>
        </div>          
    )
  }

  changeActualSearchWord(eventTargetValue){

    let searchedElement = this.state.selectValue
    console.log(searchedElement)

    let searchedAlbums = this.state.data.filter((album)=>{
      return album[searchedElement].toLowerCase().includes(eventTargetValue)
    })

    this.setState({
      actualSearchWord: eventTargetValue,
      dataShown: searchedAlbums
    })
  }

  changeTypeOfSearch(eventTargetValue){

    document.getElementById('searchbarInput').value = ''

    this.setState({
        selectValue: eventTargetValue,
        dataShown: data
      }
    )
  }



  render(){
    return (
      <div className="Searchbar">
        {this.showModal(this.state.modalOpen)}
        <select name="typeOfSearch" id="typeOfSearch" onChange={(event)=>this.changeTypeOfSearch(event.target.value)}>
          <option value="artist">Artist</option>
          <option value="album">Album</option>
          <option value="genre">Genre</option>
        </select>
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText> <span className="inputSpan">Search by: </span>
              <select name="typeOfSearch" id="typeOfSearch" onChange={(event)=>this.changeTypeOfSearch(event.target.value)}>
                <option value="artist">Artist</option>
                <option value="album">Album</option>
                <option value="genre">Genre</option>
              </select>
            </InputGroupText>
          </InputGroupAddon>
          <Input id="searchbarInput" placeholder="Look up some music here" onChange={(event)=>this.changeActualSearchWord(event.target.value.toLowerCase())}/>
        </InputGroup>
        {this.renderAlbumTitles()}
      </div>
    );
  }
}

export default Searchbar;
