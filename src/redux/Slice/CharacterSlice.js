import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiServices } from "../../services/apiServices/Api";
import { message } from "antd";

//post character
export const postCharacter = createAsyncThunk(
  "character/postCharacter",
  (char) => {
    const character = apiServices
      .post(`/timeline-characters`, char.data)
      .then((response) => response)
      .catch((err) => console.log(err));
    return character;
  }
);

//get CharacterList
export const getCharacters = createAsyncThunk(
  "character/getCharacters",
  async (id) => {
    const character = await apiServices.get(`/timeline-characters-list/${id}`);

    return character;
  }
);

//update character
export const updateCharacter = createAsyncThunk(
  "character/updateCharacter",
  async ({ id, data }) => {
    const character = apiServices
      .update(`/timeline-characters/${id}`, data)
      .then((response) => {
        return response;
      });

    return character;
  }
);

//deleteCharacter

export const deleteCharacter = createAsyncThunk(
  "character/deleteCharacter",
  async (id) => {
    const character = apiServices
      .delete(`/timeline-characters/${id}`)
      .then((response) => {
        return response;
      });

    return character;
  }
);

const initialState = {
  characters: [],
  loading: false,
  error: false,
  char: [],
};

const CharacterSlice = createSlice({
  name: "character",
  initialState,
  extraReducers: {
    [getCharacters.pending]: (state) => {
      state.loading = true;
    },
    [getCharacters.fulfilled]: (state, action) => {
      state.loading = false;
      state.characters = action.payload;
    },
    [getCharacters.rejected]: (state, action) => {
      state.loading = true;
      state.error = action.payload;
    },

    [postCharacter.pending]: (state) => {
      state.loading = true;
    },
    [postCharacter.fulfilled]: (state, action) => {
      state.loading = false;
      state.characters = [action.payload];
      message.success("Character created successfully");
    },
    [postCharacter.rejected]: (state, action) => {
      state.loading = true;
      state.error = [action.payload];
      message.error("Character not created ");

    },

    [updateCharacter.pending]: (state) => {
      state.loading = true;
    },
    [updateCharacter.fulfilled]: (state, action) => {
      state.loading = false;
      state.characters = [action.payload];
      message.success("Character updated successfully");

    },
    [updateCharacter.rejected]: (state, action) => {
      state.loading = true;
      state.error = [action.payload];
      message.error("Character not updated");

    },
    [deleteCharacter.pending]: (state) => {
      state.loading = true;
    },
    [deleteCharacter.fulfilled]: (state, action) => {
      state.loading = false;
      state.character = action.payload;
      message.success("Character deleted successfully");

    },
    [deleteCharacter.rejected]: (state, action) => {
      state.loading = true;
      state.error = action.payload;
      message.error("Character not deleted");

    },
  },
});

const CharacteReducer = CharacterSlice.reducer;

export default CharacteReducer;
