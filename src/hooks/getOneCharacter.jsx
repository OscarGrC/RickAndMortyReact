import { useState, useEffect } from "react";

const useGetOneCharacter = (id) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const BASE_URL = 'https://rickandmortyapi.com/api/character/';

    const getCharacter = async (id) => {
        setLoading(true);
        try {
            const response = await fetch(`${BASE_URL}${id}`);
            const result = await response.json();
            setData(result);
        } catch (err) {
            console.error("Error fetching character:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getCharacter(id);
    }, [id]);

    return { data, loading };
};

export default useGetOneCharacter;