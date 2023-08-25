import axios from "axios";

export const useNotification = async (userId?: string) => {
  if (userId) {
    const  {data}  = await axios.get(`http://localhost:3000/api/notifications/${userId}`);
    return data;
  }
};
