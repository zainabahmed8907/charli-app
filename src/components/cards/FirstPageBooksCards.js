import React, { useState, useEffect } from "react";
import "./index.scss";
import { useDispatch, useSelector } from "react-redux";
import {
    deleteBooksData,
    getBookData,
    updateBook,
} from "../../redux/Slice/BookSlice";
import { useLocation } from "react-router-dom";
import { UpdateBookDrawer } from "../UpdateBookDrawer";
import FullPageSpinner from "../loader/FullPageSpinner";
import ListCard from "../ListCard";

const Content = ({ id, close }) => {
    const [updateBooks, setUpdateBook] = useState(false);

    const dispatch = useDispatch();
    const onAddData = (data) => {
        try {
            const payload = { id: id, data: data };
            dispatch(updateBook(payload));
            dispatch(getBookData());

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

const FirstPageBooks = () => {
    const dispatch = useDispatch();
    const [popupVisible, setPopupVisible] = useState(false);
    const [openIndex, setOpenIndex] = useState(false);

    const { loading, book_data } = useSelector((state) => state.books);

    const path = useLocation().pathname.split('/');
    const handleOpenChange = (newOpen) => {
        setPopupVisible(newOpen);
      };
    let pathName = "";

    if (path[1] == "out-line") {
        pathName = "out-line/list";
    }
    if (path[1] == "plot-line") {
        pathName = "plot-line/list";
    }
    if (path[1] == "time-line") {
        pathName = "time-line/list";
    }
    if (path[1] == "brain-storm") {
        pathName = "brain-storm/list";
    }
    const close = () => {
        setPopupVisible(false);
    };

    const open = (index) => {
        setPopupVisible(true);
        setOpenIndex(index);
    };
    console.log(path);

    useEffect(() => {
        let wait = false;
        if (!loading && !wait) {
            dispatch(getBookData());
        }
        return () => {
            wait = true;
        };
    }, []);
    if (loading) {
        return <FullPageSpinner />;
    }

    return (
        <div className="card-container mt-2">
            <div className="p-3" style={{ maxHeight: "700px", overflowY: "auto" }}>
                {book_data[0]?.length == 0 ? (
                    <h4 style={{ textAlign: "center" }}>
                        No book to display,Click on Add book to add New book
                    </h4>
                ) : (
                    book_data[0]?.length > 0 &&
                    book_data[0]?.map((book) => {
                        return (
                            <ListCard
                                style={{
                                    backgroundColor: book?.color_code,
                                    color: book?.foreground_color,
                                    cursor: 'pointer'
                                }}
                                foreground_color={book?.foreground_color}
                                color_code={book?.color_code}
                                id={book?.id}
                                name={book?.book_name}
                                description={book?.book_description}
                                content={<Content id={book?.id} close={close} />}
                                pathname={pathName}
                                type='series'
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

export default FirstPageBooks;
