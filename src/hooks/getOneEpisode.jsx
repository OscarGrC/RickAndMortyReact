import { useState, useEffect } from "react";

const useGetOneEpisode = (id) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const BASE_URL = 'https://rickandmortyapi.com/api/episode/';

    const getEpisode = async (id) => {
        setLoading(true);
        try {
            const response = await fetch(`${BASE_URL}${id}`);
            const result = await response.json();
            setData(result);
        } catch (err) {
            console.error("Error fetching episode:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getEpisode(id);
    }, [id]);

    return { data, loading };
};

export default useGetOneEpisode;

