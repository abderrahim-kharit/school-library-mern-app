import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";
import { deleteBook, renderBook } from "../../features/book/bookSlice";
import { removeDemande } from "../../features/demandes/demandeSlice";
import CoverBook from "../CoverBook";

const DetailBookAdmin = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { books } = useSelector((store) => store.books);
  const { demandes } = useSelector((store) => store.demandes);
  const book = books?.find((book) => book._id === id);
  const [owner, setOwner] = useState("");
  const [associatedDemandes, setAssociatedDemandes] = useState([]);

  useEffect(() => {
    if (demandes && book) {
      setOwner(demandes.find((demande) => demande._id === book?.request) || "");
    }
  }, [demandes, book]);

  useEffect(() => {
    if (demandes && owner) {
      setAssociatedDemandes(
        demandes.filter(
          (demande) =>
            owner && owner._id !== demande._id && demande.book === book._id
        )
      );
    }
  }, [demandes, owner, book]);

  if (!book) {
    return (
      <h5>
        Le livre {id} n'a pas trouvé! <Link to={"/admin/books"}>Reteur</Link>
      </h5>
    );
  }

  return (
    <>
      <Link to={"/admin/books"} className="text-decoration-none">
        <h4>Reteur à la Liste</h4>
      </Link>
      {book && <h2>{book.title}</h2>}
      {book && (
        <>
          <div className="row">
            <div className="col-12 col-md-9">
              <div className="row">
                <div className="col-12 col-md-4">
                  <CoverBook book={book} />
                </div>
                <div className="col-12 col-md-8">
                  <h6>Autour : {book.author}</h6>
                  <h6>ISBN : {book.ISBN}</h6>
                  <h6>Date de publication : {book.publishAt.slice(0, 10)}</h6>
                  <h6>Disponible le : {book.availableAt.slice(0, 10)}</h6>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-3">
              {book.status === "LOUE" && (
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    dispatch(renderBook(book._id));
                    dispatch(removeDemande(book.request));
                  }}
                >
                  Render
                </button>
              )}
              <button
                className="btn btn-primary ms-2"
                onClick={() => navigate(`/admin/books/edit/${book._id}`)}
              >
                Edit
              </button>
              {book.status !== "LOUE" && (
                <button
                  className="btn btn-danger ms-2"
                  onClick={() => {
                    dispatch(deleteBook(book._id));
                    navigate("/admin/books");
                  }}
                >
                  Delete
                </button>
              )}
            </div>
          </div>
          <h3 className="m-3 ms-0">Resumé</h3>
          <p>{book.summary}</p>
        </>
      )}
      {owner ? (
        <>
          <h5>Loué par :</h5>
          <table className="table">
            <thead>
              <tr>
                <td>Nom complet</td>
                <td>CEF</td>
                <td>Email</td>
                <td>CIN</td>
                <td>Tel</td>
                <td>Date de début</td>
                <td>Date de fin</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{owner.name}</td>
                <td>{owner.cef}</td>
                <td>{owner.email}</td>
                <td>{owner.cin}</td>
                <td>{owner.tel}</td>
                <td>{owner.startDate.slice(0, 10)}</td>
                <td>{owner.endDate.slice(0, 10)}</td>
              </tr>
            </tbody>
          </table>
        </>
      ) : (
        <h5 className="mb-3">aucun location en cours pour ce livre!</h5>
      )}
      {associatedDemandes.length ? (
        <>
          <h5>Liste des demandes associés à ce livre :</h5>
          <table className="table">
            <thead>
              <tr>
                <td>Nom complet</td>
                <td>CEF</td>
                <td>Date de début</td>
                <td>Date de fin</td>
                <td>Status</td>
              </tr>
            </thead>
            <tbody>
              {associatedDemandes.map((demande) => {
                return (
                  <tr key={demande._id}>
                    <td>{demande.name}</td>
                    <td>{demande.cef}</td>
                    <td>{demande.startDate.slice(0, 10)}</td>
                    <td>{demande.endDate.slice(0, 10)}</td>
                    <td>{demande.status}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      ) : (
        <h5>aucun autre demandes associés à ce livre!</h5>
      )}
    </>
  );
};

export default DetailBookAdmin;
