"use client";

import React, { useState } from "react";
import { UserPlus2 } from "lucide-react";
import axios from "axios";

interface User {
  id: number | undefined;
  email: string;
  name: string;
}

interface AddUserProps {
  clientUsers: User[];
  setClientUsers: React.Dispatch<React.SetStateAction<User[]>>;
}

const AddUser: React.FC<AddUserProps> = ({ clientUsers, setClientUsers }) => {
  const [data, setData] = useState<User>({
    id: 0,
    email: "",
    name: "",
  });
  const [err, setErr] = useState<boolean>(false);

  const handleAddUser = async (newUserData: User) => {
    try {
      const { data } = await axios.post(
        `${process.env.BASE_URL}/api/users/add`,
        newUserData
      );

      const { newUser } = data;

      // update state in client for adding new user
      setClientUsers([...clientUsers, newUser]);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!data.email || !data.name) {
      return setErr(true);
    }

    handleAddUser(data);

    resetForm();
  };

  const resetForm = (): void => {
    setErr(false);
    setData({
      id: 0,
      email: "",
      name: "",
    });
  };

  return (
    <div className="flex flex-col items-center justify-center pt-10">
      <div className="flex items-center justify-center gap-2 p-2">
        <h1 className="text-lg">Add User</h1>
        <UserPlus2 size={36} />
      </div>
      {err && (
        <h2 className="text-bold text-red-500 p-3">
          Error. Please Enter user fields
        </h2>
      )}

      <form
        className="w-3/4 m-4 sm:w-[450px] flex gap-4 flex-col items-center justify-center"
        onSubmit={handleSubmit}
      >
        <input
          className="p-2 text-black outline-none  rounded-md  w-full"
          value={data.name}
          name="name"
          onChange={handleChange}
          type="text"
          placeholder="add name..."
        />
        <input
          className="p-2 text-black outline-none  rounded-md  w-full"
          value={data.email}
          name="email"
          onChange={handleChange}
          type="text"
          placeholder="add email..."
        />

        <button
          className="bg-teal-500 w-full p-2 px-8 rounded-md"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddUser;
