import { Popover } from "antd";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBookofSeries } from "../../redux/Slice/SeriesSlice";
import Share from "../../assets/icons/share.svg";
import WebIcon from "../../assets/icons/web-icon.svg";
import Book from "../../assets/icons/Onboarding/Book.svg";
import Menu from "../../assets/icons/menu.svg";
import { Link, useLocation, useParams } from "react-router-dom";

// export const BookofSeries = () => {
//   //book of series
//   const { booksOfSeries } = useSelector((state) => state.series);
//   const dispatch = useDispatch();

//   const { id } = useParams();

//   useEffect(() => {
//     dispatch(getBookofSeries(id));
//     console.log("book of series", booksOfSeries);
//   }, []);

//   return (
//     <div className="main-container">
//       {booksOfSeries?.length > 0 &&
//         booksOfSeries[0]?.map((book) => (
//           <div
//             id={book.id}
//             className="book-card-container"
//             style={{ backgroundColor: "palevioletred" }}
//           >
//             <div className="display-flex space-between">
//               <div>
//                 <img
//                   src={Share}
//                   className="mr-1 align-center"
//                   alt="Share Icon"
//                 />
//                 <span className="thin-text-13 mr-2">Shared by:</span>
//                 <img src={WebIcon} className="mr-1" alt="Web Icon" />
//                 <span className="bold-text-13">Shana Tenerths</span>
//               </div>
//               <div>
//                 <img src={Menu} className="mr-2" alt="menu Icon" />
//                 {/* <Tag className="bold-white-text-11">{comments} Comment</Tag>
//                     <Popover
//                       popupVisible={false}
//                       placement="rightBottom"
//                       content={<Content id={id} />}
//                       title="Actions"
//                       trigger="click"
//                       style={{ cursor: "pointer" }}
//                     >
//                       <img src={Menu} alt="Menu Icon" />
//                     </Popover> */}
//               </div>
//             </div>
//             <div className="display-flex mt-2">
//               <img
//                 src={Book}
//                 className="mr-3 self-start"
//                 alt="Book or Series Icon"
//                 width="70"
//                 height="70"
//               />
//               <div>
//                 <h2 className="sub-title-16 font-w-800 mb-0-3">
//                   {book.book_name}
//                 </h2>
//               </div>
//             </div>
//           </div>
//         ))}
//     </div>
//   );
// };
