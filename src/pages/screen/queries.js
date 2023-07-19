import { useQuery } from "react-query";
import bookService from "../../services/apiServices/BookService";

const query_list = {
  get_book: ["BOOK-listing", 1],
};
export const useGetBookListing = () => {
  return useQuery(
    query_list.get_book,
    () => {
      const { ok, response, data } = bookService.getBookListing();
      console.log({ ok, response, data });
      return data;
    },
    {
      onSuccess: () => {
        console.log("SUCCESSS");
      },
      onError: () => {
        console.log("FAIL");
      },
    }
  );
};
