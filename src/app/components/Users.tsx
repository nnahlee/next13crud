"use client";

import axios from "axios";
import { UserSquare2 } from "lucide-react";
import { useState } from "react";
import apiBASEURL from "../../../config/apiConfig";
// components
import AddUser from "./AddUser";
import UpdateUser from "./UpdateUser";

interface User {
  id: number | undefined;
  email: string;
  name: string;
}

const Users = ({ users }: { users: User[] }) => {
  const [clientUsers, setClientUsers] = useState(users);
  const [currentMatch, setCurrentMatch] = useState<User | undefined>(undefined);
  const [isActive, setIsActive] = useState(false);
  if (!users) {
    return <div>Loading...</div>;
  }

  const handleUpdate = async (id: number | undefined) => {
    setIsActive(true);
    const userMatch = users.find((user) => user.id === id);

    setIsActive(!isActive);
    setCurrentMatch(userMatch);
  };

  const handleDelete = async (id: number | undefined) => {
    // delete user from server db
    const { data } = await axios.delete(`${apiBASEURL}/api/users/${id}`);
    console.log(data);
    // update frontEnd state to match deleted
    const updatedUsers = users.filter((user) => user.id !== id);
    setClientUsers(updatedUsers);
  };

  return (
    <>
      <AddUser clientUsers={clientUsers} setClientUsers={setClientUsers} />

      <div className="mx-auto p-10">
        <div className="flex  justify-center items-center gap-2">
          <h1 className="text-4xl font-medium">Users</h1>
          <UserSquare2 className="sm:block hidden" size={36} />
        </div>

        <div className="grid grid-cols-1  md:grid-cols-2  gap-6 py-10">
          {clientUsers.map((user: User, idx: number) => {
            return (
              <div
                key={idx}
                className="border-0
               md:border-2 
              p-4 
              flex
               flex-col
               items-center
                justify-center
              
                 md:items-start
                  md:justify-start
                  px-4
                  sm:text-center
                "
              >
                <h2 className="text-center">id - {user.id}</h2>
                <h2 className="text-center">name: {user.name}</h2>
                <h2 className="text-center">email: {user.email}</h2>

                <button
                  onClick={() => handleUpdate(user.id)}
                  className={`bg-teal-500 rounded-md p-2 mt-4 cursor-pointer  w-[140px]`}
                >
                  Update
                </button>

                {currentMatch?.id === user.id && isActive && (
                  <UpdateUser
                    clientUsers={clientUsers}
                    setClientUsers={setClientUsers}
                    currentMatch={currentMatch}
                    setCurrentMatch={setCurrentMatch}
                    setIsActive={setIsActive}
                    isActive={isActive}
                  />
                )}

                <button
                  onClick={() => handleDelete(user.id)}
                  className="bg-red-500 rounded-md p-2 my-4  cursor-pointer w-[140px] "
                >
                  Delete
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Users;
