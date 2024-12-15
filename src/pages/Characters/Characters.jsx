import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useGetAllCharacters from '../../hooks/getAllCharacters';
import CardCharacter from '../../components/cardCharacter/CardCharacter';
import './Characters.css';

const Characters = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [page, setPage] = useState(parseInt(id) || 1);
    const { data, loading } = useGetAllCharacters(page);

    const handlePrev = () => {
        if (page > 1) {
            setPage((prevPage) => prevPage - 1);
        } else {
            setPage(data.info.pages);
        }
    };

    const handleNext = () => {
        if (page < data.info.pages) {
            setPage((prevPage) => prevPage + 1);
        } else {
            setPage(1);
        }
    };

    const goToCharacterDetails = (characterId) => {
        navigate(`/characters/${characterId}`);
    };



    if (loading) {
        return <p>Cargando personajes...</p>;
    }

    return (
        <div className="characters">
            <h2 className="characters__title">Personajes</h2>
            <div className="characters__characters">
                {data.results.map((character) => (
                    <div
                        key={character.id}
                        onClick={() => goToCharacterDetails(character.id)}
                        style={{ cursor: 'pointer' }}
                    >
                        <CardCharacter image={character.image} name={character.name} />
                    </div>
                ))}
            </div>


            {/* Navegación */}
            <div>
                <button className="characters__button" onClick={handlePrev}>
                    anterior
                </button>
                <button className="characters__button" onClick={handleNext}>
                    siguiente
                </button>
            </div>
        </div>
    );
};

export default Characters;
