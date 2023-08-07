"use client";

import React, { useState } from "react";
import axios from "axios";

interface User {
  id: number | undefined;
  email: string;
  name: string;
}

interface UpdateUserProps {
  clientUsers: User[];
  setClientUsers: React.Dispatch<React.SetStateAction<User[]>>;
  currentMatch: User | undefined;
  setCurrentMatch: React.Dispatch<React.SetStateAction<User | undefined>>;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
  isActive: boolean | undefined;
}

interface Data {
  id: number | undefined;
  name: string;
  email: string;
}

const UpdateUser: React.FC<UpdateUserProps> = ({
  clientUsers,
  setClientUsers,
  currentMatch,
  setCurrentMatch,
  setIsActive,
  isActive,
}) => {
  const [data, setData] = useState<Data>({
    id: 0,
    email: "",
    name: "",
  });
  const [err, setErr] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value, id: currentMatch?.id });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!data.email || !data.name) {
      return setErr(true);
    }

    const updatedUserData = clientUsers.map((user) => {
      if (user.id == currentMatch?.id) {
        return data;
      }
      return user;
    });

    setClientUsers(updatedUserData);

    try {
      const { name, email } = data;
      // update in server db
      const { data: updatedUserData } = await axios.patch(
        `http://localhost:3000/api/users/update/${currentMatch?.id}`,
        {
          name,
          email,
        }
      );

      console.log(updatedUserData);
    } catch (err) {
      console.log(err);
    }

    resetForm();
  };

  const resetForm = (): void => {
    setErr(false);
    setData({
      id: 0,
      name: "",
      email: "",
    });
    setIsActive(false);
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center pt-10">
        <div className="flex items-center justify-center gap-2 ">
          <h1 className="text-lg">Update User</h1>
        </div>
        {err && (
          <h2 className="text-bold text-red-500 p-3">
            Error. Please Enter user fields
          </h2>
        )}

        <form
          className="w-3/4 m-4 mx-auto flex gap-4 flex-col items-center justify-center"
          onSubmit={handleSubmit}
        >
          <input
            className="p-2 text-black outline-none  rounded-md  w-full"
            value={data.email}
            name="email"
            onChange={handleChange}
            type="text"
            placeholder="Update email..."
          />
          <input
            className="p-2 text-black outline-none  rounded-md  w-full"
            value={data.name}
            name="name"
            onChange={handleChange}
            type="text"
            placeholder="Update name..."
          />
          <button
            className="bg-teal-500 w-full p-2 px-8 rounded-md"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateUser;
