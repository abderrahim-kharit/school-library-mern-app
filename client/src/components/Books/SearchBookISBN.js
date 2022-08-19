import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBookISBN = () => {
  const [ISBN, setISBN] = useState("");
  const navigate = useNavigate();

  const handleForm = async (e) => {
    e.preventDefault();

    if (!ISBN) return;
    setISBN("");
    navigate(`${ISBN}`);
  };

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "auto",
        textAlign: "center",
        marginTop: "4rem",
      }}
    >
      <h3>chercher un livre</h3>
      <form className="d-inline-flex my-2">
        <div>
          <input
            className="form-control"
            type="text"
            value={ISBN}
            onChange={(e) => setISBN(e.target.value)}
            placeholder="Code ISBN"
          ></input>
        </div>
        <button className="btn btn-primary ms-2" onClick={handleForm}>
          Chercher
        </button>
      </form>
    </div>
  );
};

export default SearchBookISBN;
