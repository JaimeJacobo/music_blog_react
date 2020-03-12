import React, {useState} from 'react';
import './Searchbar.scss';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const data = require('../../data.json');

function Searchbar(){

  const [myState, updateState] = useState({
    data: data,
    modalOpen: false,
    thisModalInfo: '',
    actualSearchWord: '',
    dataShown: data,
    selectValue: 'artist'
  })

  const renderAlbumTitles = ()=>{

    return myState.dataShown.map((album, index)=>{
      return (
        <Button key={index} color="link" onClick={()=>toggle(album)}><img src={album.albumLink} alt={album.imageAlt} /></Button>
      )
    })
  }

  const toggle = (albumInfo = '')=>{

    updateState((prevState)=>({
      ...prevState,
      modalOpen: !myState.modalOpen,
      thisModalInfo: albumInfo,
    }))
  }

  const showModal = (status)=>{
    const thisAlbum = myState.thisModalInfo
    return(
        <div>
          <Modal isOpen={status} >
            <ModalHeader toggle={()=>toggle()}>{thisAlbum.imageAlt}</ModalHeader>
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
              <Button color="secondary" onClick={()=>toggle()}>Cerrar</Button>
            </ModalFooter>
          </Modal>
        </div>          
    )
  }

  const changeActualSearchWord = (eventTargetValue)=>{

    let searchedElement = myState.selectValue

    let searchedAlbums = myState.data.filter((album)=>{
      return album[searchedElement].toLowerCase().includes(eventTargetValue)
    })

    // this.setState({
    //   actualSearchWord: eventTargetValue,
    //   dataShown: searchedAlbums
    // })

    updateState((prevState)=>({
      ...prevState,
      actualSearchWord: eventTargetValue,
      dataShown: searchedAlbums
    }))
  }

  const changeTypeOfSearch = (eventTargetValue)=> {

    document.getElementById('searchbarInput').value = '';
    if(eventTargetValue === 'artist'){
      document.getElementById('searchbarInput').placeholder = 'Dream Theater, Mago de Oz, fernandocosta...';
    } else if(eventTargetValue === 'album'){
      document.getElementById('searchbarInput').placeholder = 'Moonglow, The Ashtonishing, Ira Dei...';
    } else if(eventTargetValue === 'genre'){
      document.getElementById('searchbarInput').placeholder = 'Metal, Rock, Rap, Pop...';    
    }

    updateState((prevState)=>({
      ...prevState,
      selectValue: eventTargetValue,
      dataShown: data
    }))
  }

    return (
      <div className="Searchbar">
        {showModal(myState.modalOpen)}
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText> <span className="inputSpan">Search by: </span>
              <select name="typeOfSearch" id="typeOfSearch" onChange={(event)=>changeTypeOfSearch(event.target.value)}>
                <option value="artist">Artist</option>
                <option value="album">Album</option>
                <option value="genre">Genre</option>
              </select>
            </InputGroupText>
          </InputGroupAddon>
          <Input id="searchbarInput" placeholder="Dream Theater, Mago de Oz, fernandocosta..." onChange={(event)=>changeActualSearchWord(event.target.value.toLowerCase())}/>
        </InputGroup>
        {renderAlbumTitles()}
      </div>
    );
}

export default Searchbar;
