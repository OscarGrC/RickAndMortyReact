import { useState, useEffect } from "react";

const useGetAllCharacters = (page) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const BASE_URL = 'https://rickandmortyapi.com/api/character/?page=';

    const getCharacters = async (pageNumber) => {
        setLoading(true);
        try {
            const response = await fetch(`${BASE_URL}${pageNumber}`);
            const result = await response.json();
            setData(result);
        } catch (err) {
            console.error("Error fetching characters:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getCharacters(page);
    }, [page]);

    return { data, loading };
};

export default useGetAllCharacters;

