import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDemandes } from "../features/demandes/demandeSlice";

const NavBar = () => {
  const { books } = useSelector((store) => store.books);
  const { demandes } = useSelector((store) => store.demandes);
  const dispatch = useDispatch();
  return (
    <>
      <div className="row navbar px-2">
        <div className="col-12 col-lg-7">
          <NavLink
            to="/admin/books"
            className={({ isActive }) =>
              isActive
                ? "active col-12 col-md-6 col-lg-5"
                : "col-12 col-md-6 col-lg-5"
            }
          >
            <span>Livres</span>
            <br />
            {books.length}
          </NavLink>
          <NavLink
            to="/admin/demandes"
            className={({ isActive }) =>
              isActive
                ? "active col-12 col-md-6 col-lg-5"
                : "col-12 col-md-6 col-lg-5"
            }
            onClick={() => dispatch(getDemandes())}
          >
            <span>Demandes de location</span>
            <br />
            {demandes.length}
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default NavBar;
