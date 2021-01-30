import React, { Component } from "react";
import UserDataService from "../service/user.service";
import { Link } from "react-router-dom";
import PasswordMask from 'react-password-mask';

export default class UsersList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchUsername = this.onChangeSearchUsername.bind(this);
    this.retrieveUsers = this.retrieveUsers.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveUser = this.setActiveUser.bind(this);
    this.removeAllUsers = this.removeAllUsers.bind(this);
    this.searchUsername = this.searchUsername.bind(this);

    this.state = {
      users: [],
      currentUser: null,
      currentIndex: -1,
      searchUsername: ""
    };
  }

  componentDidMount() {
    this.retrieveUsers();
  }

  onChangeSearchUsername(e) {
    const searchUsername = e.target.value;

    this.setState({
      searchUsername: searchUsername
    });
  }

  retrieveUsers() {
    UserDataService.getAll()
      .then(response => {
        this.setState({
          users: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveUsers();
    this.setState({
      currentUser: null,
      currentIndex: -1
    });
  }

  setActiveUser(user, index) {
    this.setState({
      currentUser: user,
      currentIndex: index
    });
  }

  removeAllUsers() {
    UserDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchUsername() {
    UserDataService.findByUsername(this.state.searchUsername)
      .then(response => {
        this.setState({
          users: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }
  render() {
    const { searchUsername, users, currentUser, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by Username"
              value={searchUsername}
              onChange={this.onChangeSearchUsername}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchUsername}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Users List</h4>

          <ul className="list-group">
            {users &&
              users.map((user, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveUser(user, index)}
                  key={index}
                >
                  {user.Username}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllUsers}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentUser ? (
            <div>
              <h4>User</h4>
              <div>
                <label>
                  <strong>Username:</strong>
                </label>{" "}
                {currentUser.Username}
              </div>
              <div>
                <label>
                  <strong>FullName:</strong>
                </label>{" "}
                {currentUser.FullName}
              </div>
              
                <div>
                <label>
                  <strong>Birthdate:</strong>
                </label>{" "}
                {currentUser.Birthdate}
              </div>
              
                <div>
                <label>
                  <strong>Email:</strong>
                </label>{" "}
                {currentUser.Email}
              </div>
              	
              	
                <div >
                <label>
                  <strong>Password:</strong>
                </label>{" "}
                {currentUser.Password}
              </div>
              
              
               <div >
                <label>
                  <strong>profileImage:</strong>
                </label>{" "}
                {currentUser.profileImage}
              </div>
              
              
              <Link
                to={"/users/" + currentUser.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a User...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}