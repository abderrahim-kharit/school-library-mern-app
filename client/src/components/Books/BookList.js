import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { deleteBook, renderBook } from "../../features/book/bookSlice";
import { removeDemande } from "../../features/demandes/demandeSlice";
import CoverBook from "../CoverBook";
import NavBar from "../NavBarAdmin";

const BookList = () => {
  const { books } = useSelector((store) => store.books);
  const { isLogin } = useSelector((store) => store.user);
  const [filterKey, setFilterKey] = useState("DISPONIBLE");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogin) navigate("/login");
  }, [isLogin, navigate]);

  return (
    <>
      <NavBar />
      <h3 className="m-4 ms-0">Liste des livres</h3>
      <div className="d-flex justify-content-between align-items-center">
        <div>
          Triér par :
          <select
            className="form-select my-3"
            style={{ width: "auto" }}
            onChange={(e) => setFilterKey(e.target.value)}
          >
            <option value="DISPONIBLE">Disponible</option>
            <option value="LOUE">Louée</option>
          </select>
        </div>
        <button className="btn btn-success" onClick={() => navigate("add")}>
          Ajouter un livre
        </button>
      </div>
      {books
        ?.filter((book) => book.status === filterKey)
        ?.map((book) => {
          return (
            <div key={book._id} className="row pt-4">
              <div className="col-12 col-md-10">
                <div className="row">
                  <div className="col-12 col-md-4 px-3 mb-2">
                    <Link to={`${book._id}`}>
                      <CoverBook book={book} />
                    </Link>
                  </div>
                  <div className="col-12 col-md-8 px-3">
                    <h6>Titre : {book.title}</h6>
                    <h6>Autour : {book.author}</h6>
                    <h6>ISBN : {book.ISBN}</h6>
                    <h6>
                      Date de publication : {book.publishAt?.slice(0, 10)}
                    </h6>
                    <h6>{`Disponible le ${book.availableAt?.slice(0, 10)}`}</h6>
                  </div>
                </div>
              </div>

              <div className="col-12 col-md-2">
                {book.status === "LOUE" && (
                  <button
                    className="btn btn-primary me-2"
                    onClick={() => {
                      dispatch(renderBook(book._id));
                      dispatch(removeDemande(book.request));
                    }}
                  >
                    Render
                  </button>
                )}
                <Link
                  to={`edit/${book._id}`}
                  className="btn btn-primary me-2 text-decoration-none"
                >
                  Edit
                </Link>
                {book.status !== "LOUE" && (
                  <button
                    className="btn btn-danger me-2"
                    onClick={() => dispatch(deleteBook(book._id))}
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          );
        })}
    </>
  );
};

export default BookList;
