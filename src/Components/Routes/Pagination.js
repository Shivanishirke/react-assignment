import React from 'react'
import ReactPaginate from 'react-paginate'

function Pagination({count, perpage, setPerpage, setPageNumber,setFrom,setTo, from, to}) {
    const handleRows=(e)=>{
        setPerpage(e.target.value);
    }
    const changePage=(e)=>{
        const pageNumber = e.selected +1
        console.log('pageNumber', pageNumber)
        let toPage = pageNumber * perpage
        // setPageNumber(pageNumber);
        setTo(toPage)
        setFrom(toPage - perpage + 1)
     
    }
    

    return (
        <div className="d-flex justify-content-end">
            <div>
            <label className='selectLabel'>Rows Per Page:</label>
            <select onChange={(e)=>handleRows(e)} style={{borderRadius:'5px'}} value={perpage}>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
            </select></div>
            <div>
            <ReactPaginate
            breakLabel='....'
                previousLabel={"<"}
                nextLabel={">"}
                pageCount={count}
                onPageChange={changePage}
                marginPagesDisplayed={2}
                activeLinkClassName={"activeClass"}
                containerClassName={"paginationBtns"}
                previousLinkClassName={"previousBtn"}
                nextLinkClassName={"nextBttn"}
                disabledClassName={"paginationDisabled"}
                activeClassName={"paginationActive"}
            /></div>
        </div>
    )
}

export default Pagination