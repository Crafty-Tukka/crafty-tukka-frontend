import React, {useState} from 'react';
import {useGlobalState} from 'utils/stateContext';
import {useNavigate} from 'react-router-dom';

function EventForm({addEvent}) {
  const initialEventData = {
    start: Date.new(),
    end: Date.new(),
    truck: ''
  };

  const [formData, setFormData] = useState(initialEventData);
  const navigate = useNavigate();
  const {store} = useGlobalState();
  const {foodTrucks} = store;
  console.log(foodTrucks);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (formData.start === '' || formData.end === '' || formData.truck === '') {
      return console.log("Please don't leave an empty field");
    } else {
      addEvent(formData.start, formData.end, formData.truck);
      navigate('/events');
    }
  };

  const handleFormData = (event) => {
    setFormData({
      ...formData, // previous state
      [event.target.name]: event.target.value // new state
    });
  };

  return (
    <div>
      <form>EventForm</form>
    </div>
  );
}

export default EventForm;
