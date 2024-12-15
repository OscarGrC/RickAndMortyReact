import { useState, useEffect } from "react";

const useGetAllEpisodes = (page) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const BASE_URL = 'https://rickandmortyapi.com/api/episode?page=';

    const getEpisodes = async (pageNumber) => {
        setLoading(true);
        try {
            const response = await fetch(`${BASE_URL}${pageNumber}`);
            const result = await response.json();
            setData(result);
        } catch (err) {
            console.error("Error fetching episodes:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getEpisodes(page);
    }, [page]);

    return { data, loading };
};

export default useGetAllEpisodes;

