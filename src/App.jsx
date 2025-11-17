import { useSelector, useDispatch } from "react-redux";
import { addUser, updateUser, deleteUser } from "./store/reducer/user-reducer";
import { useForm } from "react-hook-form";
import { nanoid } from "@reduxjs/toolkit";
import { useState } from "react";

function App() {
  const { count, userList } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const { handleSubmit, reset, register, setValue } = useForm();

  const [edit, setEditId] = useState(null);

  const handler = (data) => {
    if (!data.userName || data.userName.trim() == '') {
      return
    }

    if (!edit) {
      dispatch(addUser({ ...data, id: nanoid() }));
      reset();
      return;
    }

    const isDuplicate = userList.some(
      (item) => item.userName === data.userName && item.id !== edit
    );

    if (isDuplicate) {
      alert("Bu username band!");
      return;
    }

    dispatch(updateUser({ id: edit, ...data }));
    setEditId(null);
    reset();
  };

  const startEdit = (user) => {
    setEditId(user.id);
    setValue("userName", user.userName);
  };

  const removeUser = (id) => {
    dispatch(deleteUser({ id }));
  };

  return (
    <div className="container">

      <div>
        <h1 className="flex justify-center border w-5 rounded-[10px] my-3 mx-auto">{count}</h1>
        <form onSubmit={handleSubmit(handler)} className="flex gap-2 justify-center">
          <input type="text" {...register("userName")} placeholder="Username" className=" shadow-xs focus:shadow-2xl outline-none py-2 px-2 rounded-[10px] bg-blue-100" />
          <button type="submit" className="shadow-xs focus:shadow-2xs p-2 rounded-[10px] bg-green-100">{edit ? "Update" : "Send"}</button>
        </form>
      </div>

      <div className="flex flex-col justify-center items-center mt-5">
        {userList.map((item) => (
          <div key={item.id} className="border-b bg-amber-100 w-full flex flex-col justify-center text-center">
            <h1 className="mt-3">{item.userName}</h1>

            <div className="flex gap-4 justify-center items-center my-2 text-white">
              <button onClick={() => startEdit(item)} className="px-3 py-1 rounded-[10px] bg-green-300 cursor-pointer">edit</button>
              <button onClick={() => removeUser(item.id)} className="px-3 py-1 rounded-[10px] bg-red-300 cursor-pointer">delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
