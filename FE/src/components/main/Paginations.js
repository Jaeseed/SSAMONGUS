import React from 'react';
import { Pagination } from 'react-bootstrap';

export default function Paginations({ pageSize, totalRooms, paginate, currentPage }) {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalRooms / pageSize); i++) {
        pageNumbers.push(i);
    }

    return (
        <Pagination className="d-flex justify-content-center my-3" size="lg">
            <Pagination.First
                disabled={currentPage === 1}
                onClick={() => paginate(1)} />
            <Pagination.Prev 
                disabled={currentPage === 1}
                onClick={() => paginate(currentPage - 1)} />
            {pageNumbers.map(number => (
                <Pagination.Item
                    key={number}
                    active={number === currentPage}
                    onClick={() => paginate(number)}>
                    {number}
                </Pagination.Item>
            ))}
            <Pagination.Next
                disabled={currentPage === 1 || pageNumbers.length}
                onClick={() => paginate(currentPage + 1)} />
            <Pagination.Last
                disabled={currentPage === 1 || pageNumbers.length}
                onClick={() => paginate(pageNumbers.length)} />
        </Pagination>
    );
}
