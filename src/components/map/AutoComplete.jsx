import React, {useState} from 'react';
import PlacesAutocomplete, {geocodeByAddress, getLatLng} from 'react-places-autocomplete';

const AutoComplete = () => {
  // used by get coordinates from google maps
  const [venueAddress, setVenueAddress] = useState();
  const [coordinates, setCoordinates] = useState({
    lat: null,
    lng: null
  });

  const handleAddressSelect = async (value) => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    setVenueAddress(value);
    setCoordinates(latLng);
  };

  const venueCoordinates = {lat: coordinates.lat, lng: coordinates.lng};

  return (
    <>
      <PlacesAutocomplete
        value={venueAddress}
        onChange={setVenueAddress}
        onSelect={handleAddressSelect}
        venueCoordinates={venueCoordinates}
        venueAddress={venueAddress}
      >
        {({getInputProps, suggestions, getSuggestionItemProps, loading}) => (
          <div>
            <p>Latitude: {coordinates.lat}</p>
            <p>Longitude: {coordinates.lng}</p>

            <input {...getInputProps({placeholder: 'Type address'})} />

            <div>
              {loading ? <div>...loading</div> : null}

              {suggestions.map((suggestion) => {
                const style = {
                  backgroundColor: suggestion.active ? '#41b6e6' : '#fff'
                };

                return (
                  <div key={coordinates.lat} {...getSuggestionItemProps(suggestion, {style})}>
                    {suggestion.description}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    </>
  );
};

export default AutoComplete;

// import React, {useState} from 'react';
// import usePlacesAutocomplete, {getGeocode, getLatLng} from 'use-places-autocomplete';
// import {
//   Combobox,
//   ComboboxInput,
//   ComboboxPopover,
//   ComboboxList,
//   ComboboxOption
// } from '@reach/combobox';
// import '@reach/combobox/styles.css';

// const AutoComplete = () => {
//   const {
//     ready,

//     suggestions: {status, data},
//     clearSuggestions
//   } = usePlacesAutocomplete();
//   // used by get coordinates from google maps
//   const [address, setAddress] = useState();
//   const [coordinates, setCoordinates] = useState({
//     lat: null,
//     lng: null
//   });

//   // const handleSelect = async (val: string) => {
//   //   setValue(val, false);
//   //   clearSuggestions();

//   //   const results = await getGeocode({address: val});
//   //   const {lat, lng} = await getLatLng(results[0]);
//   //   setOffice({lat, lng});
//   // };

//   const handleSelect = async (value) => {
//     const results = await getGeocode(value);
//     const latLng = await getLatLng(results[0]);
//     setAddress(value);
//     setCoordinates(latLng);
//   };

//   return (
//     <>
//     <Combobox onSelect={handleSelect}>
//       <ComboboxInput
//         value={value}
//         onChange={(e) => setAddress(e.target.value)}
//         disabled={!ready}
//         className="combobox-input"
//         placeholder="Search office address"
//       />
//       <ComboboxPopover>
//         <ComboboxList>
//           {status === "OK" &&
//             data.map(({ place_id, description }) => (
//               <ComboboxOption key={place_id} value={description} />
//             ))}
//         </ComboboxList>
//       </ComboboxPopover>
//     </Combobox>
//     </>
//   );
// };

// export default AutoComplete;
