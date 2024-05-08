import { useState } from 'react';
import { Alert, Button } from "reactstrap";
import errorCases from './ErrorHandling';
import API_Urls from './APIConfig';

function SearchBar(props) {
    const [errorMessage, setErrorMessage] = useState(null);
    const [innerSearch, setInnerSearch] = useState('');

    // Fetch all listed countries from the API where there are volcanos
    // Seperate the data from the UI??
    const onSubmit = (e) => {
      e.preventDefault();
  
      fetch(API_Urls.listCountriesAPI)
          .then(response => errorCases(response))
          .then(data => {
              if (!data.includes(innerSearch)) {
                console.error('Error: Invalid Query: Bad request - 400');
                setErrorMessage('Invalid Query');
                return;
              }
              setErrorMessage(null);
              props.onSubmit(innerSearch);
          })
          .catch(error => {
              console.error('Error fetching countries:', error.message);
              setErrorMessage('Failed to fetch countries');
          });
    };
    
    // User can search for desired country's
    // Check to see if the user has inputted a vailed country listed in the API
    return (
      <div>
        <form onSubmit={onSubmit}>
          <span>Country:</span> &nbsp;
          <input
            aria-labelledby='search-button'
            name='search'
            id='search'
            type='search'
            placeholder='Search Country'
            value={innerSearch}
            onChange={(e) => {setInnerSearch(e.target.value)}}
          />&nbsp;
          <Button id='search-button' type='submit' color='primary' size="sm">
            Search
          </Button>
        </form>
        <Alert color='warning' hidden={!errorMessage}>
						{errorMessage}
				</Alert>
      </div>
    );
}
  
  export default SearchBar;