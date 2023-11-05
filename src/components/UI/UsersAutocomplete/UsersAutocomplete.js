import { Autocomplete, Avatar, Box, TextField } from "@mui/material";
import { useEffect, useState } from "react";

const UsersAutocomplete = ({ selectedUsers, onChange }) => {
  const [users, setUsers] = useState([]);
  const [selectedOption, setSelectedOption] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:3001/users");
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const usersChangeHandler = (event, newValue) => {
    setSelectedOption(newValue);
    onChange(newValue);
  };

  useEffect(() => {
    const _users = async () => {
      try {
        const response = await fetchUsers();
        setUsers(response);

        const x = selectedUsers.map((userId) =>
          response.find((x) => x.id === userId)
        );
        setSelectedOption(x);
      } catch (error) {
        console.log(error);
      }
    };

    _users();
  }, []);

  return (
    <Autocomplete
      style={{ marginTop: 16 }}
      multiple
      id="multiselect-autocomplete"
      options={users}
      onChange={usersChangeHandler}
      autoHighlight
      value={selectedOption}
      filterSelectedOptions
      getOptionLabel={(option) => {
        return option.firstName + " " + option.lastName;
      }}
      renderOption={(props, option) => (
        <Box
          component="li"
          sx={{ "& > img": { mr: 10, flexShrink: 0 } }}
          {...props}
        >
          <Avatar
            style={{ marginRight: 10 }}
            src={`/images/${option.logo}`}
          ></Avatar>
          {option.firstName + " " + option.lastName}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          value={selectedOption}
          label="Choose assignee"
          required
          inputProps={{
            ...params.inputProps,
            autoComplete: "new-password",
          }}
        />
      )}
    />
  );
};

export default UsersAutocomplete;
