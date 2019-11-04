import React from 'react';
import '../App.css';
import Firebase from 'firebase';
import config from './config'


class App extends React.Component {
  
  constructor(props){
    super(props)
    Firebase.initializeApp(config);
    this.state = {
      name:'',
      last_name:'',
      birthay:'',
      dni: 0,
      message:'completa los campos',
    }

    this.chanteText = this.chanteText.bind(this)
    this.lastName = this.lastName.bind(this)
    this.dniNumber = this.dniNumber.bind(this)
    this.birthayDate = this.birthayDate.bind(this)
    this.enviarDate = this.enviarDate.bind(this)
    this.showList = this.showList.bind(this)
  }


  writeUserData = () => {
    Firebase.database().ref("contactos").set(this.state);
    console.log("DATA SAVED");
  };
  

  whriteUser(){
    const dateform = {
      name:this.state.name,
      last_name:this.state.last_name,
      birthay:this.state.birthay,
      dni:this.state.dni,

    }
    Firebase.database().ref('contactos').push(dateform)
    .then(function(){
      console.log('mensaje guardado'); 
    })
    .catch(function(){
      console.log('mensaje No guardado'); 
    });
  }

  getDate(){
    let shower = Firebase.database().ref('contactos');
    shower.on("value", (snapshot) => {
      
      const showerValue = snapshot.val()
      console.log(showerValue)
    
      this.setState(showerValue)
      
    })
 
  }


  
  chanteText(propName){
    this.setState({
      name:propName.target.value
    })
  }

  lastName(propLastName){
    this.setState({
      last_name:propLastName.target.value
    })
  }

  dniNumber(propDni){
    this.setState({
      dni:propDni.target.value
    })
    console.log(propDni.target.value)
  }

  birthayDate(propbirthay){
    this.setState({birthay:propbirthay.target.value})
  }
  

  enviarDate(e){
    // e.preventDefault(e)
    if(this.state.name.length >= 2 && this.state.last_name.length >= 2 && this.state.dni.length === 8 && this.state.birthay !== '' ){
      console.log('campos correctos')
      this.whriteUser();
    }else{
      console.log(this.state.message)
    }
  
  }
  showList(e){
    this.getDate(e)
  }
  



  render() {
    // const items = this.showerValue 


    return(
      <div className="App App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <label htmlFor="name">Nombre</label>
        <input type="text" className="form-control"  onChange={this.chanteText} name="name" id="name"/>
    
        <label htmlFor="apellido">Apellido</label>
        <input  type="text" className="form-control"   onChange={this.lastName} name="last_name" id="apellido"/> 

        <label htmlFor="dni">DNI</label>
        <input  type="number" className="form-control"   onChange={this.dniNumber} name="dni" />

        <label htmlFor="birthay">Fecha de nacimiento</label>
        <input  type="date" className="form-control"  onChange={this.birthayDate} name="birthay" /> 

         <br/>
        <button onClick={this.enviarDate} className="btn btn-primary" >Enviar</button> <br/>
        
        <button onClick={this.showList} className="btn btn-success" >Mostrar lista de usuarios</button>


        {/* <p>
          {items.map(item => (
            <div>
              <div className="card-body">
                <h5 className="card-title">{item.name}</h5>
                <p className="card-text">{item.dni}</p>
              </div>
            </div>
          ))}
        </p> */}
      </div>
      
    )
  }
}


export default App;
