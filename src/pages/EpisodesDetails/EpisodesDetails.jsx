import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useGetOneEpisode from '../../hooks/getOneEpisode';
import CardCharacter from '../../components/cardCharacter/CardCharacter';
import './EpisodesDetails.css';

const EpisodeDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [page, setPage] = useState(parseInt(id) || 1);
    const { data, loading } = useGetOneEpisode(page);
    const [characters, setCharacters] = useState([]);
    const [loadingCharacters, setLoadingCharacters] = useState(true);

    // Manejo de navegación de episodios
    const handlePrev = () => {
        if (page > 1) {
            setPage((prevPage) => prevPage - 1);
        } else {
            setPage(51);
        }
    };

    const handleNext = () => {
        if (page < 51) {
            setPage((prevPage) => prevPage + 1);
        } else {
            setPage(1);
        }
    };

    const goToCharacter = (characterId) => {
        navigate(`/characters/${characterId}`);
    };

    // Obtener datos de personajes en paralelo
    useEffect(() => {
        const fetchCharacters = async () => {
            if (!data) return;

            setLoadingCharacters(true);

            try {
                const characterRequests = data.characters.map((url) =>
                    fetch(url).then((res) => res.json())
                );

                const characterData = await Promise.all(characterRequests);
                setCharacters(characterData);
            } catch (error) {
                console.error("Error fetching characters:", error);
            } finally {
                setLoadingCharacters(false);
            }
        };

        fetchCharacters();
    }, [data]);

    if (loading) {
        return <p>Cargando episodio...</p>;
    }

    return (
        <div className="episode">
            <h1 className="episode__episode">{data.episode}</h1>
            <p className="episode__name">Nombre: {data.name}</p>
            <p className="episode__date">Fecha de emisión: {data.air_date}</p>

            {/* Personajes */}
            <h2 className="episode__characters-title">Personajes</h2>
            {loadingCharacters ? (
                <p>Cargando personajes...</p>
            ) : (
                <div className="episode__characters">
                    {characters.map((character) => (
                        <div
                            key={character.id}
                            onClick={() => goToCharacter(character.id)}
                            style={{ cursor: 'pointer' }}
                        >
                            <CardCharacter image={character.image} name={character.name} />
                        </div>
                    ))}
                </div>
            )}

            {/* Navegación */}
            <div>
                <button className="episode__button" onClick={handlePrev}>
                    Episodio anterior
                </button>
                <button className="episode__button" onClick={handleNext}>
                    Episodio siguiente
                </button>
            </div>
        </div>
    );
};

export default EpisodeDetails;
