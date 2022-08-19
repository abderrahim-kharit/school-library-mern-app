import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editBook } from "../../features/book/bookSlice";
import { Link, useNavigate, useParams } from "react-router-dom";
const EditBook = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { books } = useSelector((state) => state.books);
  const book = books.find((book) => book._id === id);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [ISBN, setISBN] = useState("");
  const [summary, setSummary] = useState("");
  const [publishAt, setPublishAt] = useState("");
  const [coverName, setCoverName] = useState("");
  const [cover, setCover] = useState(null);
  const { isLogin } = useSelector((store) => store.user);

  useEffect(() => {
    if (!isLogin) navigate("/login");
  }, [isLogin, navigate]);

  useEffect(() => {
    setTitle(book?.title);
    setISBN(book?.ISBN);
    setAuthor(book?.author);
    setSummary(book?.summary);
    setPublishAt(book?.publishAt.slice(0, 10));
  }, [books, book]);

  const formHandler = async (e) => {
    e.preventDefault();

    const bookBody = new FormData();
    bookBody.append("title", title);
    bookBody.append("author", author);
    bookBody.append("summary", summary);
    bookBody.append("ISBN", ISBN);
    bookBody.append("publishAt", publishAt);
    bookBody.append("cover", cover);

    dispatch(editBook({ book: bookBody, id: id }));
    navigate("/admin/books");
  };

  return (
    <>
      <h3 className="my-3">Modifier le livre {ISBN}</h3>
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
          type="date"
          className="my-2"
          value={publishAt}
          onChange={(e) => setPublishAt(e.target.value)}
        />
        <br />
        <label>Couverture du livre</label>
        <input
          type="file"
          className="my-2"
          value={coverName}
          onChange={(e) => {
            setCoverName(e.target.value);
            setCover(e.target.files[0]);
          }}
        />
        <br />
        <button className="btn btn-primary my-2 me-2" onClick={formHandler}>
          Enregistrer
        </button>
        <Link to={`/admin/books/${id}`} className="btn btn-primary">
          Annuler
        </Link>
      </form>
    </>
  );
};

export default EditBook;
