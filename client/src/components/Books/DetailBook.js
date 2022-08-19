import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import CoverBook from "../CoverBook";
import axios from "axios";

const DetailBook = () => {
  const { isbn } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const { data } = await axios.get(`/books?isbn=${isbn}`);
        setBook(data.book);
      } catch (error) {}
    };
    fetchBook();
  }, [isbn]);

  if (book) {
    return (
      <div>
        <h3 className="mb-4">Détail du livre {isbn}</h3>
        <div className="row">
          <div className="col-12 col-md-2">
            <CoverBook book={book} />
          </div>
          <div className="col-12 col-md-10">
            <h6>Titre : {book?.title}</h6>
            <h6>Autour : {book?.author}</h6>
            <h6>ISBN : {book?.ISBN}</h6>
            <h6>Date de publication : {book?.publishAt.slice(0, 10)}</h6>
            <h6>{`Disponible le ${book?.availableAt.slice(0, 10)}`}</h6>
          </div>
        </div>
        <h5 className="my-3">Resumé</h5>
        <p>{book?.summary}</p>
        <button
          onClick={() => navigate(`demande`)}
          className="btn btn-primary me-2"
        >
          Envoyer une demende
        </button>
        <button onClick={() => navigate(`/`)} className="btn btn-primary">
          Reteur
        </button>
      </div>
    );
  } else {
    return (
      <h2>
        Aucun livre trouvé avec le code ISBN {isbn} <br />
        <Link to="/" className="text-decoration-none">
          reteur
        </Link>
      </h2>
    );
  }
};

export default DetailBook;
