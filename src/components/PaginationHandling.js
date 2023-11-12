import {
  Pagination,
  PaginationItem
} from '@mui/material';
import { Link, useSearchParams } from 'react-router-dom';

// Pagination Router integration
function PaginationHandling({ handllePageChange, totalPages = 1, toRoute = "transs" }) {

  const [searchParams] = useSearchParams();

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
        page={searchParams.get('page') || 1}
        count={totalPages}
        showFirstButton
        showLastButton
        color="info"
        renderItem={(item) => (
          <PaginationItem
            style={{
              fontSize: "14px",
            }}
            component={Link}
            to={`/${toRoute}?page=${item.page || 1}&fromDate=${searchParams.get('fromDate')}&toDate=${searchParams.get('toDate')}&description=${searchParams.get('description')}`}
            {...item}
            onClick={(e) => handllePageChange(parseInt(e.target.innerText))}
          />
        )}
      />
    </div>
  )
}

export default PaginationHandling