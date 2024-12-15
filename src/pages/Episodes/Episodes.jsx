import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useState } from "react";
import useGetAllEpisodes from '../../hooks/getAllEpisodes';
import './Episodes.css';

const Episodes = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [page, setPage] = useState(parseInt(id) || 1);
    const { data, loading } = useGetAllEpisodes(page);


    const handlePrev = () => {
        if (page > 1) {
            setPage((prevPage) => prevPage - 1);
        } else {
            setPage(data.info.pages)
        }
    };

    const handleNext = () => {
        if (data && page < data.info.pages) {
            setPage((prevPage) => prevPage + 1);
        } else {
            setPage(1)
        }
    };
    const goToDetail = (episodeId) => {
        navigate(`/episodes/${episodeId}`);
    };

    if (loading) {
        return <p>Cargando episodios...</p>;
    }


    return (
        <div className="episodes">
            <h1 className="episodes__title">Episodios</h1>
            <table className="episodes__table">
                <thead>
                    <tr>
                        <th>Episodio</th>
                        <th>Nombre del Capítulo</th>
                    </tr>
                </thead>
                <tbody>
                    {data.results.map((episode) => (
                        <tr key={episode.id} onClick={() => goToDetail(episode.id)}>
                            <td>{episode.episode}</td>
                            <td>{episode.name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>
                <button className="episodes__button" onClick={handlePrev}>
                    Página anterior
                </button>
                <button className="episodes__button" onClick={handleNext} >
                    Página siguiente
                </button>
            </div>
        </div>
    );
};

export default Episodes;
