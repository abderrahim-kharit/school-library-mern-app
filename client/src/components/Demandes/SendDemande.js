import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addDemande } from "../../features/demandes/demandeSlice";
import axios from "axios";
const SendDemande = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isbn } = useParams();
  const [name, setName] = useState("");
  const [ISBN, setISBN] = useState(isbn);
  const [startDate, setStartDate] = useState("");
  const [minStartDate, setMinStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [cef, setCEF] = useState("");
  const [cin, setCIN] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");

  useEffect(() => {
    const searchBook = async () => {
      try {
        const { data } = await axios.get(`/books?isbn=${isbn}`);
        setMinStartDate(data.book?.availableAt.slice(0, 10));
      } catch (error) {}
    };
    searchBook();
  }, [isbn]);

  const handleSending = async () => {
    const body = {
      name,
      ISBN,
      startDate,
      endDate,
      cef: Number(cef),
      cin,
      email,
      tel: Number(tel),
    };
    if (Object.values(body).some((value) => value === "")) return;

    dispatch(addDemande(body));
    navigate("/");
  };

  return (
    <>
      <h3 className="my-3">Création d'une demande</h3>
      <form style={{ maxWidth: "400px" }}>
        <label>Nom complet : </label>
        <input
          className="form-control my-2"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></input>
        <label>ISBN : </label>
        <input
          className="form-control my-2"
          type="text"
          value={ISBN}
          onChange={(e) => setISBN(e.target.value)}
          disabled
        ></input>
        <label>Date début location : </label>
        <input
          min={minStartDate}
          className="form-control my-2"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        ></input>
        <label>Date fin location : </label>
        <input
          min={minStartDate}
          className="form-control my-2"
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        ></input>
        <label>CEF : </label>
        <input
          className="form-control my-2"
          type="text"
          value={cef}
          onChange={(e) => setCEF(e.target.value)}
        ></input>
        <label>CIN : </label>
        <input
          className="form-control my-2"
          type="text"
          value={cin}
          onChange={(e) => setCIN(e.target.value)}
        ></input>
        <label>Email : </label>
        <input
          className="form-control my-2"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <label>Tel : </label>
        <input
          className="form-control my-2"
          type="text"
          value={tel}
          onChange={(e) => setTel(e.target.value)}
        ></input>
      </form>
      <button onClick={handleSending} className="btn btn-primary me-2 mt-2">
        Envoyer
      </button>
      <button
        className="btn btn-primary mt-2"
        onClick={() => navigate(`/${ISBN}`)}
      >
        Annuler
      </button>
    </>
  );
};

export default SendDemande;
