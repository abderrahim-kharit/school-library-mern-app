import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleDemande } from "../../features/demandes/demandeSlice";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "../NavBarAdmin";

const DemandeList = () => {
  const navigate = useNavigate();
  const { demandes } = useSelector((state) => state.demandes);
  const [filterKey, setFilterKey] = useState("NEW");
  const dispatch = useDispatch();
  const { isLogin } = useSelector((store) => store.user);

  useEffect(() => {
    if (!isLogin) navigate("/login");
  }, [isLogin, navigate]);

  return (
    <>
      <NavBar />
      <h3 className="m-4 ms-0">Liste des demandes de location</h3>
      Triér par :
      <select
        className="form-select my-3"
        style={{ width: "auto" }}
        onChange={(e) => setFilterKey(e.target.value)}
      >
        <option value="NEW">Nouvelle</option>
        <option value="ACCEPTED">Acceptés</option>
        <option value="REFUSED">Refusés</option>
      </select>
      {demandes
        ?.filter((demande) => demande.status === filterKey)
        ?.map((demande) => {
          return (
            <div key={demande._id} className="mb-4">
              <table className="table">
                <thead>
                  <tr>
                    <td>Nom complet</td>
                    <td>Livre</td>
                    <td>CEF</td>
                    <td>Date de début</td>
                    <td>Date de fin</td>
                    <td>Statut</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <Link
                        className="text-decoration-none"
                        to={`${demande._id}`}
                      >
                        {demande.name}
                      </Link>
                    </td>
                    <td>{demande.book}</td>
                    <td>{demande.cef}</td>
                    <td>{demande.startDate?.slice(0, 10)}</td>
                    <td>{demande.endDate?.slice(0, 10)}</td>
                    <td>{demande.status}</td>
                  </tr>
                </tbody>
              </table>
              {demande.status === "NEW" && (
                <>
                  <button
                    className="btn btn-primary me-2"
                    onClick={() =>
                      dispatch(
                        handleDemande({ id: demande._id, accepted: true })
                      )
                    }
                  >
                    Accepter
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() =>
                      dispatch(
                        handleDemande({ id: demande._id, accepted: false })
                      )
                    }
                  >
                    Refuser
                  </button>
                </>
              )}
            </div>
          );
        })}
    </>
  );
};

export default DemandeList;
