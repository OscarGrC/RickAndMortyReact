import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useGetOneCharacter from '../../hooks/getOneCharacter';
import './CharactersDetails.css';
const CharactersDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [page, setPage] = useState(parseInt(id) || 1);
    const { data, loading } = useGetOneCharacter(page);
    const [episodes, setEpisodes] = useState([]);
    const [loadingEpisodes, setLoadingEpisodes] = useState(true);

    const handlePrev = () => {
        if (page > 1) {
            setPage((prevPage) => prevPage - 1);
        } else {
            setPage(826);
        }
    };

    const handleNext = () => {
        if (page < 826) {
            setPage((prevPage) => prevPage + 1);
        } else {
            setPage(1);
        }
    };
    const goToEpisode = (episodeID) => {
        navigate(`/episodes/${episodeID}`);
    };
    useEffect(() => {
        const fetchEpisodes = async () => {
            if (data === null) {
                return;
            }

            setLoadingEpisodes(true);

            try {
                const episodesRequests = data.episode.map((url) =>
                    fetch(url).then((res) => res.json())
                );

                const episodesData = await Promise.all(episodesRequests);
                setEpisodes(episodesData);
            } catch (error) {
                console.error("Error fetching episodes:", error);
            } finally {
                setLoadingEpisodes(false);
            }
        };

        fetchEpisodes();
    }, [data]);


    return (
        <div className="character">
            {loading ? (
                <p>Cargando personaje...</p>
            ) : data ? (
                <>
                    <h1 className="character__name">{data.name}</h1>
                    <img src={data.image} className="character__image" alt={data.name} />
                    <p className="character__data">Estado: {data.status}</p>
                    <p className="character__data">Especie: {data.gender} -- {data.species}</p>
                    {data.type && <p className="character__data">Tipo: {data.type}</p>}
                    {data.origin && <p className="character__data">Origen: {data.origin.name}</p>}
                    {data.location && <p className="character__data">Ubicación: {data.location.name}</p>}

                    <h2 className="character__episodes__title">Episodios</h2>
                    {loadingEpisodes ? (
                        <p>Cargando Episodios...</p>
                    ) : (
                        <table className="character__table">
                            <thead>
                                <tr>
                                    <th>Episodio</th>
                                    <th>Nombre del Capítulo</th>
                                </tr>
                            </thead>
                            <tbody>
                                {episodes.map((episode) => (
                                    <tr key={episode.id} onClick={() => goToEpisode(episode.id)}>
                                        <td>{episode.episode}</td>
                                        <td>{episode.name}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}

                    {/* Navegación */}
                    <div>
                        <button className="character__button" onClick={handlePrev}>
                            Personaje anterior
                        </button>
                        <button className="character__button" onClick={handleNext}>
                            Personaje siguiente
                        </button>
                    </div>
                </>
            ) : (
                <p>No se encontraron datos del personaje.</p>
            )}
        </div>
    );


};

export default CharactersDetails;

