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
      const isAvalable = state.userList.find(
        (item) => item?.userName === action?.payload.userName
      );

      if (!isAvalable) {
        return {
          ...state,
          count: state.count + 1,
          userList: [...state.userList, action.payload],
        };
      }
      return state;
    },
  },
});

export default user.reducer;

export const { addUser } = user.actions;
