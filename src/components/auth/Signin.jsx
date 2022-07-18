import React, {useState} from 'react';
// import {useGlobalState} from 'utils/stateContext';
import {useNavigate} from 'react-router-dom';

function Signin({activateUser}) {
  // const {dispatch} = useGlobalState(); //to be implemented with reducer
  const initialFormData = {
    email: '',
    password: ''
  };

  const navigate = useNavigate();

  const [formData, setFormData] = useState(initialFormData);
  // const [error, setError] = useState(null); //to be implemented with reducer

  const handleFormData = (event) => {
    setFormData({
      ...formData, // previous state for username or password
      [event.target.name]: event.target.value // new state for username or password
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log(formData);
    activateUser(formData.email);
    setFormData(initialFormData); // cleaning the form data displayed
    navigate('/events');
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   signIn(formData).then((user) => {
  //     // console.log(user)
  //     if (user.error) {
  //       console.log('user.error', user.error);
  //       setError(user.error);
  //     } else {
  //       setError(null);
  //       dispatch({
  //         type: 'setLoggedInUser',
  //         data: user.name
  //       });
  //       setFormData(initialFormData);
  //       navigate('/events');
  //     }
  //   });
  // };

  // const handleFormData = (e) => {
  //   setFormData({
  //     ...formData,
  //     [e.target.id]: e.target.value
  //   });
  // };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleFormData}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleFormData}
          />
        </div>
        <input type="submit" value="Login" />
      </form>
    </div>
  );
}

export default Signin;
