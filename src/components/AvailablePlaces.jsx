import { fecthAvailablePlaces } from '../http.js';
import { sortPlacesByDistance } from '../loc.js';
import Error from './Error.jsx';
import Places from './Places.jsx';
import useFetch  from '../hooks/useFetch';

async function fetchSortedPlaces(){
  const places = await fecthAvailablePlaces();

  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition((position) => {
      const sortedPlaces = sortPlacesByDistance(places, position.coords.latitude, position.coords.longitude);
      resolve(sortedPlaces);
    });
  });
}


export default function AvailablePlaces({ onSelectPlace }) {
  
  const { isFetching, error, fetchedData: availablePlaces } = useFetch(fetchSortedPlaces, []);
  
  

    if(error){
      return <Error title="An error occured" message={error.message}/>;
    }


  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isFetching}
      loadingText="Fetching place data..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
