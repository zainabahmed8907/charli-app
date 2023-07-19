import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiServices } from "../../services/apiServices/Api";
import { message } from "antd";

//get chatss
export const getContacts = createAsyncThunk("chat/getContacts", () => {
  const chats = apiServices
    .get(`/contacts`)
    .then((response) => {
      return response;
    })
    .catch((err) => console.log("error while fetching contacts"));
  return chats;
});

//add chat
export const chatReaction = createAsyncThunk(
  "chat/chatReaction",
  (chatmsgs) => {
    const chat = apiServices.post("/chats", chatmsgs).then((response) => {
      console.log("response", response);
      return response;
    });
    return chat;
  }
);

//delete chatMsg
export const deleteMsg = createAsyncThunk("chat/deleteChat", (id) => {
  const chat = apiServices.delete(`/chats/${id}`).then((response) => {
    console.log("delete msg response", response);
    return response;
  });
  return chat;
});

//delete chatMsg
export const reactionEmoji = createAsyncThunk(
  "chat/reactionEmoji",
  (reaction) => {
    const chat = apiServices
      .post(`/chats/reaction`, reaction.data)
      .then((response) => {
        console.log("chat reaction", response);
        return response;
      });
    return chat;
  }
);
//

// export const getFeature = createAsyncThunk("chat/getFeature", () => {
//   const feature = apiServices
//     .get("/get-features")
//     .then((response) => response)
//     .catch((err) => err);
//   return feature;
// });
const initialState = {
  chats: [],
  loading: false,
  error: false,
  chatMsgs: [],
  chat_reaction: "",
  featuers:[]
};

const ChatsSlice = createSlice({
  name: "chat",
  initialState,

  extraReducers: {
    [getContacts.pending]: (state) => {
      state.loading = true;
    },
    [getContacts.fulfilled]: (state, action) => {
      state.loading = false;
      state.chats = [action.payload];
    },
    [getContacts.rejected]: (state, action) => {
      state.loading = true;
      state.error = [action.payload];
      state.chats = [];
    },
    [chatReaction.pending]: (state) => {
      state.loading = true;
    },
    [chatReaction.fulfilled]: (state, action) => {
      state.loading = false;
      state.chatMsgs = [action.payload];
    },
    [chatReaction.rejected]: (state, action) => {
      state.loading = true;
      state.chatMsgs = [];
    },
    [deleteMsg.pending]: (state) => {
      state.loading = true;
    },
    [deleteMsg.fulfilled]: (state, action) => {
      state.loading = false;
      state.chatMsgs = action.payload;
    },
    [deleteMsg.rejected]: (state, action) => {
      state.loading = true;
      message.error("not deleted");
    },

    //chat reaction
    [reactionEmoji.pending]: (state) => {
      state.loading = true;
    },
    [reactionEmoji.fulfilled]: (state, action) => {
      state.loading = false;
      state.chat_reaction = action.payload;
    },
    [reactionEmoji.rejected]: (state, action) => {
      state.loading = true;
    },
  },
});

const ChatsReducer = ChatsSlice.reducer;
export default ChatsReducer;
