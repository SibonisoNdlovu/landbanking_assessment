import React, { useState } from 'react';
import AnimalCard from 'components/AnimalCard/AnimalCard';
import useFetchAnimals from 'hooks/useFetchAnimals';
import useLocalStorage from 'hooks/useLocalStorage';

const AnimalListPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { animals, loading, error } = useFetchAnimals(searchTerm);
  const [rating, setRating] = useLocalStorage<{ [key: string]: number }>('animalRatings', {});
  const [selectedAttributes, setSelectedAttributes] = useLocalStorage<{ [key: string]: string[] }>('animalAttributes', {});
  
  const [likedAnimals, setLikedAnimals] = useLocalStorage<any[]>('likedAnimals', []); // Change type to any or define an appropriate interface

  const handleRate = (name: string, stars: number) => {
    setRating({ ...rating, [name]: stars });
  };

  const handleSelectAttributes = (name: string, attributes: string[]) => {
    setSelectedAttributes({ ...selectedAttributes, [name]: attributes });
  };

  const handleLike = (animal: any) => {
    setLikedAnimals((prevLiked) => {
      const isLiked = prevLiked.some((likedAnimal) => likedAnimal.name === animal.name);
      if (isLiked) {
        return prevLiked.filter((likedAnimal) => likedAnimal.name !== animal.name);
      } else {
        return [...prevLiked, animal];
      }
    });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Favorite Animals</h1>
      
      <div className="mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for animals..."
          className="border p-2 rounded w-full"
        />
      </div>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      <div className="grid grid-row-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {animals.map((animal) => (
          <AnimalCard
            key={animal.name}
            animal={animal}
            rating={rating[animal.name] || 0}
            selectedAttributes={selectedAttributes[animal.name] || []}
            isLiked={likedAnimals.some((likedAnimal) => likedAnimal.name === animal.name)}
            onRate={handleRate}
            onSelectAttributes={handleSelectAttributes}
            onLike={() => handleLike(animal)} 
          />
        ))}
      </div>

      <h2 className="text-xl font-semibold mt-6">Animals I Like</h2>
      <div className="grid grid-row-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {likedAnimals.map((animal) => (
          <AnimalCard
            key={animal.name}
            animal={animal}
            rating={rating[animal.name] || 0}
            selectedAttributes={selectedAttributes[animal.name] || []}
            isLiked={true}
            onRate={handleRate}
            onSelectAttributes={handleSelectAttributes}
            onLike={() => handleLike(animal)} 
          />
        ))}
      </div>
    </div>
  );
};

export default AnimalListPage;
