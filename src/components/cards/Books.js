import React, { useState, useEffect } from "react";
import "./index.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteBooksData,
  getBookData,
  updateBook,
} from "../../redux/Slice/BookSlice";
import { UpdateBookDrawer } from "../UpdateBookDrawer";
import FullPageSpinner from "../../components/loader/FullPageSpinner";
import ListCard from "../ListCard";
import { useLocation } from "react-router-dom";

const Content = ({ id, close }) => {
  const [updateBooks, setUpdateBook] = useState(false);

  const dispatch = useDispatch();
  const onAddData = (data) => {
    try {
      const payload = { id: id, data: data };
      dispatch(updateBook(payload));
      setTimeout(() => {
        dispatch(getBookData());

      }, 1000);
      closeDrawer();
    } catch (e) {
      console.log(e);
    }
  };
  const deleteBooks = (id) => {
    dispatch(deleteBooksData(id));
    setTimeout(() => {
      dispatch(getBookData());
    }, 1100);
  };
  const openDrawer = () => {
    close();
    setUpdateBook(true);
  };
  const closeDrawer = () => {
    close();
    setUpdateBook(false);
  };

  return (
    <div>
      <div className="edit">
        <button
          onClick={() => {
            openDrawer();
            close();
          }}
        >
          Edit
          <span className="ml-2">
            <i className="fa fa-check"></i>
          </span>
        </button>
      </div>

      <div className="delete-btn">
        <button onClick={() => {
          deleteBooks(id);
          close();
        }}>
          Delete
          <span className="ml-2">
            <i className="fa fa-times"></i>
          </span>
        </button>
      </div>
      <UpdateBookDrawer
        open={updateBooks}
        onSubmit={onAddData}
        close={closeDrawer}
        id={id}
      />
    </div>
  );
};

const Books = () => {
  const dispatch = useDispatch();
  const [popupVisible, setPopupVisible] = useState(false);
  const [openIndex, setOpenIndex] = useState(false);

  const { loading, book_data } = useSelector((state) => state.books);

  const close = () => {
    setPopupVisible(false);
  };

  const open = (index) => {
    setPopupVisible(true);
    setOpenIndex(index);
  };

  const handleOpenChange = (newOpen) => {
    setPopupVisible(newOpen);
  };

  useEffect(() => {
    let wait = false;
    if (!loading && !wait) {
      dispatch(getBookData());
    }
    return () => {
      wait = true;
    };
  }, []);

  return (
    <div className="card-container mt-2">
      <div className="p-3" style={{ maxHeight: "700px", overflowY: "auto" }}>
        {book_data[0]?.length == 0 ? (
          <h4 style={{ textAlign: "center" }}>
            No book to display,Click on Create New Book to add New book
          </h4>
        ) : (
          book_data[0]?.length > 0 &&
          book_data[0]?.map((book) => {
            return (
              <ListCard
                style={{
                  backgroundColor: book?.color_code,
                  color: book?.foreground_color,

                }}
                foreground_color={book?.foreground_color}
                color_code={book?.color_code}
                id={book?.id}
                name={book?.book_name}
                description={book?.book_description}
                content={<Content id={book?.id} close={close} />}
                type={'book'}
                icon={book?.image_url}
                open={() => {
                  open(book?.id)
                }}
                openIndex={openIndex}
                popupVisible={popupVisible}
                handleOpenChange={handleOpenChange}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default Books;
