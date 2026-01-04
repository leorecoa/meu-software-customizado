import { useState } from 'react';

export function usePagination<T>(data: T[], itemsPerPage: number) {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(data.length / itemsPerPage);

    const currentItems = data.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const nextPage = () => setCurrentPage((p) => Math.min(totalPages, p + 1));
    const prevPage = () => setCurrentPage((p) => Math.max(1, p - 1));
    const goToPage = (page: number) => setCurrentPage(Math.max(1, Math.min(page, totalPages)));

    return {
        currentPage,
        setCurrentPage,
        totalPages,
        currentItems,
        nextPage,
        prevPage,
        goToPage
    };
}