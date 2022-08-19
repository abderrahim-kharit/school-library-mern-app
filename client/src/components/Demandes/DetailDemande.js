import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";
import { handleDemande } from "../../features/demandes/demandeSlice";
const DetailDemande = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { demandes } = useSelector((state) => state.demandes);
  const { books } = useSelector((state) => state.books);
  const [demande, setDemande] = useState("");
  const [book, setBook] = useState("");
  const { isLogin } = useSelector((store) => store.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogin) navigate("/login");
  }, [isLogin, navigate]);

  useEffect(() => {
    setDemande(demandes?.find((demande) => demande._id === id) || "");
    setBook(books?.find((book) => book._id === demande.book || ""));
  }, [id, books, demandes, demande]);

  return (
    <>
      <Link to={"/admin/demandes"} className="text-decoration-none">
        <h4> Reteur à la liste</h4>
      </Link>
      {demande && (
        <div className="mb-4">
          <h3 className="py-4">Détail de demande de {demande.name}</h3>
          <h5>Nom complet : {demande.name}</h5>
          {book ? (
            <>
              <h5>Livre : {`${book.title} - ${book.author}`}</h5>
              <h5>ISBN du livre : {book.ISBN}</h5>
            </>
          ) : (
            <></>
          )}
          <h5>Date de début : {demande.startDate.slice(0, 10)}</h5>
          <h5>Date de fin : {demande.endDate.slice(0, 10)}</h5>
          <h5>CEF : {demande.cef}</h5>
          <h5>Email : {demande.email}</h5>
          <h5>CIN : {demande.cin}</h5>
          <h5>Tel : {demande.tel}</h5>
          <h5>Status : {demande.status}</h5>
        </div>
      )}
      {demande.status === "NEW" && (
        <>
          <button
            className="btn btn-primary me-2"
            onClick={() =>
              dispatch(handleDemande({ id: demande._id, accepted: true }))
            }
          >
            Accepter
          </button>
          <button
            className="btn btn-danger"
            onClick={() =>
              dispatch(handleDemande({ id: demande._id, accepted: false }))
            }
          >
            Refuser
          </button>
        </>
      )}
    </>
  );
};

export default DetailDemande;
