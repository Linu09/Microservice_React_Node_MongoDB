import React, { Component } from "react";
import UserDataService from "../service/user.service";
import axios from 'axios';

export default class User extends Component {
  constructor(props) {
    super(props);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeFullName = this.onChangeFullName.bind(this);
	this.onChangeBirthdate = this.onChangeBirthdate.bind(this);
	this.onChangeEmail = this.onChangeEmail.bind(this);
	this.onChangePassword = this.onChangePassword.bind(this);
	this.onChangeprofileImage= this.onChangeprofileImage.bind(this);
    this.getUser = this.getUser.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);

    this.state = {
      currentUser: {
        id: null,
       	Username: "",
      	FullName: "", 
      	Birthdate: "",
      	Email: "",
      	Password: "",
      	profileImage: null,
   
      },
      message: ""
    };
      
  }

  componentDidMount() {
    this.getUser(this.props.match.params.id);
  }

  onChangeUsername(e) {
    const Username = e.target.value;

    this.setState(function(prevState) {
      return {
        currentUser: {
          ...prevState.currentUser,
          Username: Username
        }
      };
    });
  }

  onChangeFullName(e) {
    const FullName= e.target.value;
    
    this.setState(prevState => ({
      currentUser: {
        ...prevState.currentUser,
        FullName: FullName
      }
    }));
  }
  
   onChangeBirthdate(e) {
    const Birthdate= e.target.value;
    
    this.setState(prevState => ({
      currentUser: {
        ...prevState.currentUser,
        Birthdate: Birthdate
      }
    }));
  }
  
  
  onChangeEmail(e) {
    const Email= e.target.value;
    
    this.setState(prevState => ({
      currentUser: {
        ...prevState.currentUser,
        Email: Email
      }
    }));
  }
  
 
  
  onChangePassword(e) {
    const Password= e.target.value;
    
    this.setState(prevState => ({
      currentUser: {
        ...prevState.currentUser,
        Password: Password
      }
    }));
  }
  
   onChangeprofileImage(e) {
    const profileImage= e.target.value;
    
    this.setState(prevState => ({
      currentUser: {
        ...prevState.currentUser,
        profileImage: e.target.files[0]
      }
    }));
  }
  
  

  
  
  getUser(id) {
    UserDataService.get(id)
      .then(response => {
        this.setState({
          currentUser: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }


  updateUser() {
    UserDataService.update(
      this.state.currentUser.id,
      this.state.currentUser
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The User was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteUser() {    
    UserDataService.delete(this.state.currentUser.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/users')
      })
      .catch(e => {
        console.log(e);
      });
  }
render() {
    const { currentUser } = this.state;

    return (
      <div>
        {currentUser ? (
          <div className="edit-form">
            <h4>User</h4>
            <form enctype="multipart/formdata">
              <div className="form-group">
                <label htmlFor="Username">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="Username"
                  value={currentUser.Username}
                  onChange={this.onChangeUsername}
                />
                
              </div>
              <div className="form-group">
                <label htmlFor="FullName">FullName</label>
                <input
                  type="text"
                  className="form-control"
                  id="FullName"
                  value={currentUser.FullName}
                  onChange={this.onChangeFullName}
                />
              </div>
			
              <div className="form-group">
                <label htmlFor="Birthdate">Birthdate</label>
                <input
                  type="text"
                  className="form-control"
                  id="Birthdate"
                  value={currentUser.Birthdate}
                  onChange={this.onChangeBirthdate}
                />
              </div>
              

              <div className="form-group">
                <label htmlFor="Email">Email</label>
                <input
                  type="text"
                  className="form-control"
                  id="Email"
                  value={currentUser.Email}
                  onChange={this.onChangeEmail}
                />
              </div>
              
          	  
             <div className="form-group">
              <label htmlFor="Password">Password</label>
              <input
                type="password"
                className="form-control"
                id="Password"
                required
                value={this.state.Password}
                onChange={this.onChangePassword}
                name="Password"
              />
            </div>
            
            
             <div className="form-group">
              <label htmlFor="profileImage">profileImage</label>
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
				
				
				
				
            </form>


            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteUser}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateUser}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a User...</p>
          </div>
        )}
      </div>
    );
  }
}