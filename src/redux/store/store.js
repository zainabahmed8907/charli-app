import { combineReducers, configureStore } from "@reduxjs/toolkit";
import BookReducer from "../Slice/BookSlice";
import BrainStormReducer from "../Slice/BrainStromSlice";
import ChpaterCardReducer from "../Slice/ChapterCardsSlice";
import ChpaterReducer from "../Slice/ChapterSlice";
import CharacteReducer from "../Slice/CharacterSlice";
import ColorReducer from "../Slice/ColorSlice";
import EventBlockReducer from "../Slice/EventBlockSlice";
import GalleryReducer from "../Slice/GallerySlice";
import OutlineReducer from "../Slice/OutlineSlice";
import SeriesReducer from "../Slice/SeriesSlice";
import TimeLinereducer from "../Slice/TimelineSlice";
import plotlineReducer from "../Slice/PlotlineSlice";
import CalendarReducer from "../Slice/CalendarSlice";
import AuthReducer from "../Slice/AuthSlice";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import ChatReducer from "../Slice/ChatSlice";
import UserReducer from "../Slice/UserSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const reducer = combineReducers({
  series: SeriesReducer,
  books: BookReducer,
  colors: ColorReducer,
  galleries: GalleryReducer,
  outline: OutlineReducer,
  chapters: ChpaterReducer,
  timeline: TimeLinereducer,
  brainstorm: BrainStormReducer,
  chaptercard: ChpaterCardReducer,
  character: CharacteReducer,
  eventBlock: EventBlockReducer,
  plotline: plotlineReducer,
  calendar: CalendarReducer,
  auth: AuthReducer,
  chat: ChatReducer,
  user: UserReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
