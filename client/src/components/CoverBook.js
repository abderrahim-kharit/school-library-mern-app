import React from "react";

const CoverBook = ({ book }) => {
  return (
    <img
      src={`${process.env.REACT_APP_SERVER_URL}/${book.image}`}
      alt={`${book.title}`}
      className="mw-100"
    />
  );
};

export default CoverBook;
