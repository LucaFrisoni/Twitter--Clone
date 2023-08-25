// import axios from "axios";

// export const usePostTweet = async (method: string, userId?: string) => {
//   if (method === "get") {
//     if (userId) {
//       const { data } = await axios.get(
//         `http://localhost:3000/api/posts?userId=${userId}`
//       );
//       return data;
//     }
//     const { data } = await axios.get(`http://localhost:3000/api/posts`);
//     return data;
//   }
// };

// export const usePost = async (postId: string) => {
//   const { data } = await axios.get(`http://localhost:3000/api/posts/${postId}`);
//   return data;
// };
