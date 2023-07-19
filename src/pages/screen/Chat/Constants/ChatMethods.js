import axios from "axios";

export const addChat = async (form) => {
    const token = localStorage.getItem("token");

    try {
      const { data } = await axios.post(
        `https://charliiapp.clickysoft.net/api/v1/chats`,
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (data) {
        return data;
      }
    } catch (error) {
      console.log("error", error);
    }
};
  
export const editMessage = async (id, msg) => {
    const token = localStorage.getItem("token");
    console.log("edit msg", id, msg);
    try {
      const { data } = await axios.put(
        `https://charliiapp.clickysoft.net/api/v1/chats/${id}`,
        msg,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (data) {
        return data;
      }
    } catch (error) {
      console.log("error", error);
    }
  };


  
