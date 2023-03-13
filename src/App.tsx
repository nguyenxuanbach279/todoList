import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import api from "./services/api";
import Users from "./Components/Todos";
import LoadingSpinner from "./Components/LoadingSpinner";

function App() {
  const classes = useStyles();
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onClickAddTodo = async () => {
    const user = {
      name: inputValue,
      email: `${inputValue}@sanford.com`,
      gender: "male",
      status: "active",
    };

    try {
      setIsLoading(true);
      const createUserRes = await api.createUser(user);
    } catch (error) {
      console.log(error);
    }
    setInputValue("");
  };

  const onChangeInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <Box className={classes.container}>
      {/* {isLoading && <LoadingSpinner />} */}
      <Box className={classes.titleBox}>
        <Typography className={classes.title}>Todo List</Typography>
      </Box>
      <Box className={classes.inputBox}>
        <TextField
          variant="outlined"
          size="medium"
          className={classes.inputTodo}
          value={inputValue}
          onChange={onChangeInputValue}
        />
        <Button variant="contained" onClick={onClickAddTodo}>
          Add
        </Button>
      </Box>
      <Users />
    </Box>
  );
}

const useStyles = makeStyles((theme) => ({
  container: {
    width: "auto",
    height: "100vh",
    textAlign: "center",
    padding: "0 200px"
  },
  titleBox: {},
  title: {
    fontSize: "48px",
    fontWeight: 700,
  },
  inputTodo: {
    width: "100%",
    padding: "8px",
  },
  inputBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

export default App;
