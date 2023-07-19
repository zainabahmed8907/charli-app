import { SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";
import React, { useState, useEffect } from "react";
import "./ConversationSearch.scss";
import { useDispatch, useSelector } from "react-redux";
import useDebounce from "../../../pages/screen/Settings/useDebounce";
import { getUsers, searchUsers } from "../../../redux/Slice/UserSlice";
import ConversationItem, { SearchItem } from "../conversation-item/ConversationItem";


const ConversationSearch = ({ conversations, navigateToChat, searchChat }) => {
  const { users, loading, searchData } = useSelector((state) => state.user);
  // const profile_image = user[0]?.user?.profile_image;

  const [searchTerm, setSerachterm] = useState("");

  const debouncedSearch = useDebounce(searchTerm, 500);
  const dispatch = useDispatch();

  const search = (e) => {
    e.preventDefault();
    setSerachterm(e.target.value);
  };
  useEffect(() => {
    dispatch(getUsers());
    if (debouncedSearch) {
      dispatch(searchUsers(debouncedSearch));
    }
  }, [debouncedSearch, dispatch]);

  return (
    <>
      <div id="search-container">
        {(conversations && conversations.length > 0) && <Input
          size={"small"}
          type="text"
          onChange={(e) => search(e)}

          placeholder="Search"
          prefix={<SearchOutlined />}
          style={{ borderRadius: 6 }}
        />}
      </div>
      <div className="chat-list">
        <p>Chat</p>
        {searchTerm.length > 1 ? searchData[0]?.data?.map((user) => {
          return (
            <SearchItem
              onClick={() => searchChat(user)}
              key={user.id}
              user={user}
            />
          );
        }) : conversations?.map((user) => {
          return (
            <ConversationItem
              onClick={() => navigateToChat(user)}
              key={user.id}
              user={user}
            />
          );
        })
        }
      </div>

    </>
  );
};

export default ConversationSearch;
