import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userList: [],
  count: 0,
};

const user = createSlice({
  name: "userList",
  initialState,
  reducers: {
    addUser: (state, action) => {
      const isAvailable = state.userList.some(
        (item) => item.userName === action.payload.userName
      );

      if (isAvailable) return state;

      state.userList.push(action.payload);
      state.count += 1;
    },

    updateUser: (state, action) => {
      const { id, userName } = action.payload;

      const index = state.userList.findIndex((user) => user.id === id);
      if (index === -1) return state;

      // shu username boshqa userga tegishli bo‘lsa update yo‘q
      const isDuplicate = state.userList.some(
        (item) => item.userName === userName && item.id !== id
      );

      if (isDuplicate) return state;

      state.userList[index] = {
        ...state.userList[index],
        ...action.payload,
      };
    },

    deleteUser: (state, action) => {
      const { id } = action.payload;

      const index = state.userList.findIndex((user) => user.id === id);
      if (index === -1) return state;

      state.userList.splice(index, 1);
      state.count -= 1;
    },
  },
});

export default user.reducer;

export const { addUser, updateUser, deleteUser } = user.actions;
