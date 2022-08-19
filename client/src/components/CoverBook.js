import React from "react";

const CoverBook = ({ book }) => {
  return (
    <img
      src={`http://localhost:5000/${book.image}`}
      alt={`${book.title}`}
      className="mw-100"
    />
  );
};

export default CoverBook;
