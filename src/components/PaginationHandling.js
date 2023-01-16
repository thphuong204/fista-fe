import { 
    Pagination, 
    PaginationItem
  } from '@mui/material';
import { Link } from 'react-router-dom';

// Pagination Router integration
function PaginationHandling({ page = 1, totalPages = 1, toRoute = "transs" }) {
    return (
    <div className="pagination-item"
                style={{
                  minWidth: "50%",
                  minHeight: "50px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "10px",
                  marginTop: "60px",
                  backgroundColor: "#fffaf0",
                  boxShadow: "1px 1px 10px 1px rgba( 176, 176, 176, 0.87 ), -1px -1px 10px 1px rgba( 176, 176, 176, 0.87)"
                }}>
              <Pagination
                  page={page}
                  count={totalPages}
                  showFirstButton 
                  showLastButton
                  renderItem={(item) => (
                      <PaginationItem
                          style={{
                              fontSize: "14px",
                              color: "#4c4c4c"
                          }}
                          component={Link}
                          to={`/${toRoute}?page=${item.page || 1}`}
                          {...item}
                          onClick={(e) => {
                            console.log(e);}}
                      />
                  )}
              />
      </div>
    )
  }

  export default PaginationHandling