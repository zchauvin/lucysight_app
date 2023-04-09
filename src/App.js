import { useState, useEffect } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import styled from "@emotion/styled";
// import { debounce } from "@mui/material/utils";
import Chart from "./Chart";

const Container = styled.div`
  padding: 20px;
`;

const App = () => {
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState([]);
  const [value, setValue] = useState(null);

  console.log(value);

  useEffect(() => {
    const getStations = async () => {
      const response = await fetch(
        `http://localhost:3000/stations?name=${inputValue}`
      );
      const json = await response.json();

      setOptions(json);
    };

    getStations();
  }, [inputValue]);

  return (
    <Container>
      <Autocomplete
        autoComplete
        options={options}
        getOptionLabel={(option) => option.name}
        filterOptions={(x) => x}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Station Name" />}
        onInputChange={(_event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        includeInputInList
        onChange={(_event, newValue) => {
          setOptions(newValue ? [newValue, ...options] : options);
          setValue(newValue);
        }}
        isOptionEqualToValue={(option, value) =>
          (option.external_id = value.external_id)
        }
        noOptionsText="No stations"
      />
      <Chart />
    </Container>
  );
};

export default App;
