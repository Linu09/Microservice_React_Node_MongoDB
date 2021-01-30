import React, { Component } from "react";
import UserDataService from "../service/user.service";
import axios from 'axios';

export default class AddUser extends Component {
  constructor(props) {
    super(props);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeFullName = this.onChangeFullName.bind(this);
    this.onChangeBirthdate = this.onChangeBirthdate.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeprofileImage= this.onChangeprofileImage.bind(this);
    this.saveUser = this.saveUser.bind(this);
    this.newUser = this.newUser.bind(this);

    this.state = {
    
      id: null,
      Username: "",
      FullName: "", 
      Birthdate: "",
      Email: "",
      Password: "",
      profileImage : null,
      
      submitted: false
    };
  }

  onChangeUsername(e) {
    this.setState({
      Username: e.target.value
    });
  }

  onChangeFullName(e) {
    this.setState({
      FullName: e.target.value
    });
  }
  
   onChangeBirthdate(e) {
    this.setState({
      Birthdate: e.target.value
    });
  }
  
   onChangeEmail(e) {
    this.setState({
      Email: e.target.value
    });
  }
  
   onChangePassword(e) {
    this.setState({
      Password: e.target.value
    });
  }
  
   onChangeprofileImage(e) {
    this.setState({
      profileImage: e.target.files[0]
    });
  }

 

  saveUser() {
    var data = {
      Username: this.state.Username,
      FullName: this.state.FullName,
      Birthdate: this.state.Birthdate,
      Email: this.state.Email,
      Password: this.state.Password,
      profileImage: this.state.profileImage
    };

    UserDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          Username: response.data.Username,
          FullName: response.data.FullName,
          Birthdate: response.data.Birthdate,
          Email: response.data.Email,
          Password: response.data.Password,
          profileImage: response.data.profileImage,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newUser() {
    this.setState({
      id: null,
      Username: "",
      FullName: "", 
      Birthdate: "",
      Email: "",
      Password: "",
      profileImage : null,

      submitted: false
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newUser}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="Username">Username</label>
              <input
                type="text"
                className="form-control"
                id="Username"
                required
                value={this.state.Username}
                onChange={this.onChangeUsername}
                name="Username"
              />
            </div>

            <div className="form-group">
              <label htmlFor="FullName">FullName</label>
              <input
                type="text"
                className="form-control"
                id="FullName"
                required
                value={this.state.FullName}
                onChange={this.onChangeFullName}
                name="FullName"
              />
            </div>
            
              <div className="form-group">
              <label htmlFor="Birthdate">Birthdate</label>
              <input
                type="text"
                className="form-control"
                id="Birthdate"
                required
                value={this.state.Birthdate}
                onChange={this.onChangeBirthdate}
                name="Birthdate"
              />
            </div>
            
              <div className="form-group">
              <label htmlFor="Email">Email</label>
              <input
                type="text"
                className="form-control"
                id="Email"
                required
                value={this.state.Email}
                onChange={this.onChangeEmail}
                name="Email"
              />
            </div>
            
            
            
              <div className="form-group">
              <label htmlFor="Password">Password</label>
              <input
                type="text"
                className="form-control"
                id="Password"
                required
                value={this.state.Password}
                onChange={this.onChangePassword}
                name="Password"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="profileImage">Password</label>
              <input
                type="file"
                className="form-control"
                id="profileImage"
                required
                value={this.state.profileImage}
                onChange={this.onChangeprofileImage}
                name="profileImage"
              />
              <button className="btn btn-primary" type="submit">Upload</button>
            </div>

    		
    		
    		
            <button onClick={this.saveUser} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}