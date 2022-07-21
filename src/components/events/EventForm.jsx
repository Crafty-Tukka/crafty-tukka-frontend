import React, {useState} from 'react';
import {useGlobalState} from 'utils/stateContext';

function EventForm() {
  const initialEventData = {
    date: Date.new(),
    start: Date.new(),
    end: Date.new(),
    truck: ''
  };

  const [formData, setFormData] = useState(initialEventData);

  const {store} = useGlobalState();
  const {foodTrucks} = store;
  console.log(foodTrucks);

  return (
    <div>
      <form>EventForm</form>
    </div>
  );
}

export default EventForm;
