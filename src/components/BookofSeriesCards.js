import React from "react";
import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getBookofSeries } from "../redux/Slice/SeriesSlice";
import { useDispatch, useSelector } from "react-redux";
import ListCard from "./ListCard";
import FullPageSpinner from "./loader/FullPageSpinner";

const BookofSeriesCards = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { booksOfSeries, loading } = useSelector((state) => state.series);
  const pathArr = useLocation().pathname.split("/");

  let pathName = "";

  if (pathArr[2] == "out-line") {
    pathName = "out-line/list";
  }
  if (pathArr[2] == "plot-line") {
    pathName = "plot-line/list";
  }
  if (pathArr[2] == "time-line") {
    pathName = "time-line/list";
  }
  if (pathArr[2] == "brain-storm") {
    pathName = "brain-storm/list";
  }
  useEffect(() => {
    dispatch(getBookofSeries(id));
    console.log("id", id);
    console.log(booksOfSeries);
  }, []);
  return (
    <div className="main-container">
      <div className="card-container mt-2">
        <div className="p-3" style={{ maxHeight: "700px", overflowY: "auto" }}>
          {booksOfSeries[0]?.length == 0 ? (
            <h4 style={{ textAlign: "center" }}>
              This Series has no books
            </h4>
          ) : (
            booksOfSeries?.length > 0 &&
            booksOfSeries[0]?.map((book) => {
              return (
                loading ? <FullPageSpinner /> :
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
                    pathname={pathName}
                    icon={book?.image_url}
                    type="series"
                  />
              )
            })
          )}
        </div>
      </div>
    </div>
  );
};


export const BookofSeriesDashboard = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { booksOfSeries, loading } = useSelector((state) => state.series);

  useEffect(() => {
    dispatch(getBookofSeries(id));
    console.log("id", id);
    console.log(booksOfSeries);
  }, []);
  return (
    <div className="main-container">
      <div className="card-container mt-2">
        <div className="p-3" style={{ maxHeight: "700px", overflowY: "auto" }}>
          {booksOfSeries[0]?.length == 0 ? (
            <h4 style={{ textAlign: "center" }}>
              This Series has no books
            </h4>
          ) : (
            booksOfSeries?.length > 0 &&
            booksOfSeries[0]?.map((book) => {
              return (
                loading ? <FullPageSpinner /> :
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
                    icon={book?.image_url}
                    type="book"
                  />
              )
            })
          )}
        </div>
      </div>
    </div>
  );
};
export default BookofSeriesCards;
