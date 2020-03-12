import React, {useState, useCallback} from 'react';
import { Form, FormGroup, Input, Label } from 'reactstrap';
import './Search.css';
import {useDispatch} from "react-redux";
import {fetchGems} from "../../store/actions/gemsActions";
import {defaultGemParams} from "../../constants";
import {cloneDeep, debounce, throttle} from "lodash";

const Search = () => {

  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState('')

  const makeDebouncedRequest = debounce((gemParams) => dispatch(fetchGems(gemParams)), 1000);

  const handleChange = useCallback(
    (e) => {
      const gemParams = cloneDeep(defaultGemParams);
      gemParams.search = e.target.value;
      console.log(e.target.value);
      setSearchText(e.target.value);

      makeDebouncedRequest(gemParams)
    },
    []
  );


  return (
    <Form className='search'>
      <FormGroup>
        <Input
          value={searchText}
          type="search"
          name="search"
          id="exampleSearch"
          placeholder="Поиск..."
          onChange={handleChange}
        />
      </FormGroup>
    </Form>
  );
};

export default Search;