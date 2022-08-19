import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBook } from "../../features/book/bookSlice";
import { useNavigate, Link } from "react-router-dom";

const AddBook = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLogin } = useSelector((store) => store.user);

  useEffect(() => {
    if (!isLogin) navigate("/login");
  }, [isLogin, navigate]);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [ISBN, setISBN] = useState("");
  const [summary, setSummary] = useState("");
  const [publishAt, setPublishAt] = useState("");
  const [coverName, setCoverName] = useState("");
  const [cover, setCover] = useState(undefined);

  const formHandler = async (e) => {
    e.preventDefault();

    if (!title || !author || !summary || !ISBN || !publishAt || !coverName) {
      return;
    }

    const bookBody = new FormData();
    bookBody.append("title", title);
    bookBody.append("author", author);
    bookBody.append("summary", summary);
    bookBody.append("ISBN", ISBN);
    bookBody.append("publishAt", publishAt);
    bookBody.append("cover", cover);

    dispatch(addBook(bookBody));
    navigate("/admin/books");
  };

  return (
    <>
      <h3 className="my-3">Ajouter un livre</h3>
      <form style={{ maxWidth: "400px" }}>
        <label>Titre</label>
        <input
          className="form-control my-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Autour</label>
        <input
          className="form-control my-2"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <label>ISBN</label>
        <input
          className="form-control my-2"
          value={ISBN}
          onChange={(e) => setISBN(e.target.value)}
        />
        <label>Résumé</label>
        <textarea
          className="form-control my-2"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          rows="6"
        />
        <label>Date de publication</label>
        <br />
        <input
          className="my-2"
          type="date"
          value={publishAt}
          onChange={(e) => setPublishAt(e.target.value)}
        />
        <br />
        <label>Couverture du livre</label>
        <br />
        <input
          type="file"
          accept="image/*"
          value={coverName}
          className="my-2"
          onChange={(e) => {
            setCoverName(e.target.value);
            setCover(e.target.files[0]);
          }}
        />
        <br />
        <button className="btn btn-primary my-2 me-2" onClick={formHandler}>
          Enregistrer
        </button>
        <Link to={`/admin/books`} className="btn btn-primary">
          Annuler
        </Link>
      </form>
    </>
  );
};

export default AddBook;
