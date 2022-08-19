import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBooks } from "./features/book/bookSlice";
import { getDemandes } from "./features/demandes/demandeSlice";
import AdminHeader from "./components/AdminHeader";
import NotFound from "./components/NotFound";
import Login from "./components/Login";
import UserHeader from "./components/UserHeader";
import {
  SearchBookISBN,
  AddBook,
  BookList,
  DetailBook,
  DetailBookAdmin,
  EditBook,
} from "./components/Books/";
import {
  SendDemande,
  DemandeList,
  DetailDemande,
} from "./components/Demandes/";

function App() {
  const dispatch = useDispatch();

  const { isLogin } = useSelector((store) => store.user);

  useEffect(() => {
    if (isLogin) {
      dispatch(getBooks());
      dispatch(getDemandes());
    }
  }, [isLogin, dispatch]);

  return (
    <div className="container">
      <Router>
        <Routes>
          <Route path="/" element={<UserHeader />}>
            <Route index element={<SearchBookISBN />} />
            <Route path=":isbn" element={<DetailBook />} />
            <Route path=":isbn/demande" element={<SendDemande />} />
          </Route>
          <Route path="admin" element={<AdminHeader />}>
            <Route path="books" element={<Outlet />}>
              <Route index element={<BookList />} />
              <Route path=":id" element={<DetailBookAdmin />} />
              <Route path="add" element={<AddBook />} />
              <Route path="edit/:id" element={<EditBook />} />
            </Route>
            <Route path="demandes" element={<Outlet />}>
              <Route index element={<DemandeList />} />
              <Route path=":id" element={<DetailDemande />} />
            </Route>
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
