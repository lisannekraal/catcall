import { useQuery, useMutation } from '@apollo/client';
import { GET_UNVERIFIED_CATCALLS, UPDATE_CATCALL } from '../api/queries'
import './Dashboard.css';
import DataTable from './DataTable';
import { v4 as uuidv4 } from 'uuid';


function Dashboard () {

  const { loading, error, data } = useQuery(GET_UNVERIFIED_CATCALLS);
  if(error) console.log(error);
  data && console.log(data.getUnfilteredCatcalls);
  const [updateCatcall] = useMutation(UPDATE_CATCALL);
  console.log('Obtained Data >>>>>',data);


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;
  return (
    <>
      <div className="header-footer"></div>
      <div className="moderator-container" data-testid="dashboard">
        <div className="moderator-navbar">

            <div className="moderator-navbar-item mod-nav-active">
              VALIDATE PENDING
            </div>

            <div className="moderator-navbar-item">
              TO CHALK
            </div>
            <div className="moderator-navbar-item">
              DATABASE
            </div>
            <div className="moderator-navbar-item">
              TRASH
            </div>
            <div className="moderator-navbar-item">
              MOD SETTINGS
            </div>
        </div>

        {data ? (<DataTable data={data.getUnfilteredCatcalls}/>) : ''}

        <div className="table-container">
          <div className="validation-table">
            <div className="table-title star-title">Starred</div>
            <div className="table-title quote-title">Catcall quote</div>
            <div className="table-title context-title">Context text</div>
            <div className="table-title date-title">Date catcall</div>
            <div className="table-title added-title">Date added</div>
            <div className="table-title location-title">Location</div>
            <div className="table-title buttons-title">Verification</div>
            {
              data.getUnfilteredCatcalls.map((row) => (
                <div className="table-row" id={row._id} key={uuidv4()}>

                    <div className="star"></div>
                    <div className="quote">
                      { row.properties.quote }
                    </div>
                    <div className="context">
                      {
                        row.properties.context ?
                        row.properties.context : ""
                      }
                    </div>
                    <div className="date">
                      {
                        row.properties.dateCatcall ?
                        (new Date(Number(row.properties.dateCatcall))).toDateString() :
                        "no date"
                      }
                    </div>
                    <div className="added">
                      { (new Date(Number(row.properties.dateAdded))).toDateString() }
                    </div>
                    <div className="location">
                      {
                        row.geometry.coordinates[0] + ',' +
                        row.geometry.coordinates[1]
                      }
                    </div>
                    <div className="buttons">
                      <button className="verify-button"
                        onClick={() =>
                          updateCatcall({ variables: {
                            id: row._id,
                            catcall: { propertes: {
                              verified: true
                            } } } })
                        }
                      >VERIFY</button>
                      <button className="edit-button">EDIT</button>
                      <button className="delete-button">DELETE</button>
                    </div>

                </div>
              ))
            }
          </div>
        </div>

      </div>


      <div className="header-footer"></div>
    </>
  );
}
export default Dashboard;