import axios from "axios";

export const useUsers = async () => {
  const { data } = await axios.get("http://localhost:3000/api/users");

  return data;
};
export const useUser = async (userId: string) => {
  const { data } = await axios.get(`http://localhost:3000/api/users/${userId}`);
  return data;
};
export const useUserEmail = async (email: string | undefined | null) => {
  const { data } = await axios.get(
    `http://localhost:3000/api/users/email/${email}`
  );
  return data;
};

export const updateUser = async (
  email: string,
  bio?: string,
  name?: string,
  username?: string,
  coverImage?: string,
  profileImage?: string
) => {};
