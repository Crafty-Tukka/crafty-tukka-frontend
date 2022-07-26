import React, {useState} from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

const AutoComplete = () => {
  const [value, setValue] = useState(null);

  return (
    <div>
      <GooglePlacesAutocomplete
        apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
        selectProps={{
          value,
          onChange: setValue
        }}
      />
    </div>
  );
};

export default AutoComplete;
