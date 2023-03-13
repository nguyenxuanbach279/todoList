import React, { useEffect, useState, memo } from "react";
import { makeStyles } from "@mui/styles";
import { Typography, Stack, List, Button, TextField } from "@mui/material";
import api from "../services/api";

interface User {
  id: number;
  name: string;
  email: string;
  gender: string;
  status: string;
}

function Users() {
  const [users, setUsers] = useState<Array<User>>([]);
  const [idEdit, setIdEdit] = useState(-1);
  const [userEdit, setUserEdit] = useState("");
  const temp = [...users];
  useEffect(() => {
    getAllTodo();
  }, [temp]);

  const getAllTodo = async () => {
    try {
      let usersRes = await api.getAllUser();
      if (usersRes.status === 200) {
        setUsers(usersRes.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onClickDeleteUser = async (id: number) => {
    try {
      const deleteUserRes = await api.deleteUser(id);
    } catch (error) {
      console.log(error);
    }
  };

  const onClickEditUser = (id: number, name: string) => {
    setUserEdit(name);
    setIdEdit(id);
  };

  const onClickSave = async (id: number) => {
    const user = {
      name: userEdit,
      email: `${userEdit}@sanford.com`,
      status: "active",
    };
    try {
      const saveUser = await api.updateUser(id, user);
      setIdEdit(-1);
    } catch (error) {
      console.log(error);
    }
  };

  const onChangeInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserEdit(e.target.value);
  };

  const classes = useStyles();
  return (
    <List className={classes.todosBox}>
      {users &&
        users.map((user) => {
          return (
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              className={classes.todoItem}
              key={user.id}
            >
              {idEdit === user.id ? (
                <TextField
                  variant="outlined"
                  size="small"
                  className={classes.textField}
                  value={userEdit}
                  onChange={onChangeInputValue}
                  InputProps={{
                    className: classes.inputUser,
                  }}
                />
              ) : (
                <Typography className={classes.todoItemName}>
                  {user.name}
                </Typography>
              )}

              <Stack direction="row" spacing={1}>
                {idEdit === user.id ? (
                  <Button
                    variant="contained"
                    onClick={() => onClickSave(user.id)}
                  >
                    Save
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    onClick={() => onClickEditUser(user.id, user.name)}
                  >
                    Edit
                  </Button>
                )}

                <Button
                  variant="contained"
                  onClick={() => onClickDeleteUser(user.id)}
                >
                  Delete
                </Button>
              </Stack>
            </Stack>
          );
        })}
    </List>
  );
}

export default memo(Users);

const useStyles = makeStyles((theme) => ({
  todosBox: {
    marginTop: 20,
  },
  todoItem: {
    marginBottom: 6,
    height: 40,
  },
  todoItemName: {
    userSelect: "none",
  },
  textField: {},
  inputUser: {},
}));
