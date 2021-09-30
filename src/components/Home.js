import React from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import './register.css';

const HOME_URL =
  "https://e6fy6bfesg.execute-api.ap-south-1.amazonaws.com/dev/home";

const DELETE_URL =
  "https://e6fy6bfesg.execute-api.ap-south-1.amazonaws.com/dev/delete";

const EDIT_URL =
  "https://e6fy6bfesg.execute-api.ap-south-1.amazonaws.com/dev/edit";

const API_KEY = "xDyVvll40ep4wyJWDvFn7Enf3wVsvSp3hXb0IKG6";

const requestConfig = {
  headers: { "x-api-key": API_KEY }
};

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allUsers: [],
      isOpen: false,
      name: "",
      password: "",
      currIndex: null
    };
    this.setName = this.setName.bind(this);
    this.setPassword = this.setPassword.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }

  submitHandler(event) {
    event.preventDefault();
    let allUsers = this.state.allUsers;
    let user = allUsers[this.state.currIndex];

    const requestBody = {
      email: user.email,
      name: this.state.name,
      password: this.state.password
    };

    console.log(requestBody);

    axios
      .post(EDIT_URL, requestBody, requestConfig)
      .then(response => {
        // const data = response.data.replace(/\'/g, '"');
        // const responseJson = JSON.parse(data);
        // console.log(responseJson);
        // localStorage.setItem('isLoggedIn', `true ${responseJson.name}`);
        // props.history.push('/');
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });

      user.name = this.state.name;
      user.password = this.state.password;

      allUsers[ this.state.currIndex ] = user;

    this.setState({
      isOpen: false,
      name: "",
      password: "",
      currIndex: "",
      allUsers: allUsers
    });
  }

  openModal = index => {
    this.setState({ isOpen: true, currIndex: index });
  };
  closeModal = () => {
    this.setState({ isOpen: false, name: "", password: "", currIndex: null });
  };

  componentDidMount() {
    axios.get(HOME_URL, requestConfig).then(response => {
      this.setState({
        allUsers: response.data
      });
    });
  }

  deleteHandler(userId, name) {
    const areYouSure = window.confirm(
      "Are you sure you want to delete the user " + name
    );

    if (areYouSure === true) {
      let allUsers = this.state.allUsers;
      const requestBody = {
        email: allUsers[userId].email
      };
      axios
        .post(DELETE_URL, requestBody, requestConfig)
        .then(response => {
          window.alert(response.data);
        })
        .catch(error => {
          window.alert(error.response.data);
        });

      allUsers.splice(userId, 1);
      this.setState({
        allUsers: allUsers
      });
    } else {
      return;
    }
  }

  setName(e) {
    this.setState({
      name: e.target.value
    });
  }

  setPassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  render() {
    return (
      <div className="container">
        <div>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {this.state.allUsers.map((user, index) => (
                <tr key={index}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <Button
                      variant="primary"
                      onClick={e => this.openModal(index)}
                    >
                      Edit User
                    </Button>

                    <Modal show={this.state.isOpen} onHide={this.closeModal}>
                      <Modal.Header closeButton>
                        <Modal.Title>Edit User</Modal.Title>
                      </Modal.Header>

                      <Modal.Body>
                        <form onSubmit={this.submitHandler}>
                          <label>Name</label>
                          <input
                            type="text"
                            onChange={this.setName}
                            value={this.name}
                            required="required"
                            className="form-control"
                          />
                          <br />
                          <label>Password</label>
                          <input
                            type="password"
                            onChange={this.setPassword}
                            value={this.password}
                            required="required"
                            className="form-control"
                          />
                          <br />

                          <button
                            type="submit"
                            className="btn btn-primary"
                          >
                            Update
                          </button>
                          <button
                            onClick={this.closeModal}
                            className="btn btn-secondary"
                            id="closeButton"
                          >
                            Close
                          </button>
                        </form>
                      </Modal.Body>
                    </Modal>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => this.deleteHandler(index, user.name)}
                    >
                      Delete User
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
// function Home(props) {

//     const [allUsers, setAllUsers] = useState([]);

//     // Simple GET request using axios
//     axios.get(HOME_URL, requestConfig)
//         .then(response => {
//             setAllUsers(response.data)
//         });

//     function editHandler(userId){
//         console.log(userId);
//     }

//     function deleteHandler(userId, name){
//         console.log(userId);
//     }

//     return (
//         <div className="container">
//             <h4>Go to register for registration, login for logging in</h4>
//             <div>
//             <table className="table table-striped">
//                 <thead>
//                     <td>Name</td>
//                     <td>Email</td>
//                     <td></td>
//                     <td></td>
//                 </thead>
//                 <tbody>
//                 {allUsers.map((user, index) => (
//                     <tr key={index}>
//                         <td>{user.name}</td>
//                         <td>{user.email}</td>
//                         <td><button className="btn btn-warning" onClick={() => editHandler(index)}>Edit User</button></td>
//                         <td><button className="btn btn-danger" onClick={() => deleteHandler(index, user.name)}>Delete User</button></td>
//                     </tr>
//                 ))}
//                 </tbody>
//             </table>
//             </div>
//         </div>
//     );
// }

export default Home;
