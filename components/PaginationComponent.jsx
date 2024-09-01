import * as React from 'react';
import Pagination from '@mui/material/Pagination';



export default function PaginationComponent({ page, handlePageChange, count }) {


  return (
    <div>
      <Pagination className='pagination-component'
        count={count}
        page={page}
        onChange={(event, value) => handlePageChange(event, value)}
        sx={{
          color: "white",
          "& .Mui-selected": {
            backgroundColor: "black !important",
            color: "white !important",
            borderColor: "black !important"
          },

          "& . MuiPaginationItem-ellipsis": {
            border: "0px solid grey !important"
          },
          "& .MuiPaginationItem-text": {
            color: "black",
            border: "1px solid grey",
          }
        }}
      />
    </div>
  );
}