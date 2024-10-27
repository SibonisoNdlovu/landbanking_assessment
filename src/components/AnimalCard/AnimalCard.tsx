import CustomButton from 'components/CustomButton/CustomButton';
import React, { useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { Animal } from 'types/Animal';

interface AnimalCardProps {
  animal: Animal;
  rating: number;
  selectedAttributes: string[];
  isLiked: boolean;
  onRate: (name: string, stars: number) => void;
  onSelectAttributes: (name: string, attributes: string[]) => void;
  onLike: (name: string) => void;
}

const AnimalCard: React.FC<AnimalCardProps> = ({
  animal,
  rating,
  selectedAttributes,
  isLiked,
  onRate,
  onSelectAttributes,
  onLike,
}) => {
  const [selected, setSelected] = useState<string[]>(selectedAttributes);

  const handleAttributeChange = (attribute: string) => {
    const newAttributes = selected.includes(attribute)
      ? selected.filter((attr) => attr !== attribute)
      : [...selected, attribute];

    setSelected(newAttributes);
    onSelectAttributes(animal.name, newAttributes);
  };

  return (
    <div className="border border-gray-200 rounded-lg shadow-md p-4 m-2 flex flex-col bg-white hover:shadow-lg transition-shadow duration-300 ease-in-out">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">{animal.name}</h2>
        <button onClick={() => onLike(animal.name)}>
          {isLiked ? (
            <FaHeart className="text-red-500" />
          ) : (
            <FaRegHeart className="text-gray-400" />
          )}
        </button>
      </div>

      <div>
        <strong>Rating:</strong>
        <div className="flex justify-center space-x-2 my-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <CustomButton
              key={star}
              onClick={() => onRate(animal.name, star)}
              isActive={rating >= star}
            >
              ★
            </CustomButton>
          ))}
        </div>
      </div>

      <div className="mt-2 text-sm text-gray-600">
        <strong>Attributes:</strong>
        <div className="space-y-1">
          <div>
            <strong>Diet:</strong> {animal.characteristics.diet}
          </div>
          <div>
            <strong>Habitat:</strong> {animal.characteristics.habitat}
          </div>
          <div>
            <strong>Lifespan:</strong> {animal.characteristics.lifespan}
          </div>
          <div>
            <strong>Top Speed:</strong> {animal.characteristics.top_speed}
          </div>
          <div>
            <strong>Weight:</strong> {animal.characteristics.weight}
          </div>
          <div>
            <strong>Color:</strong> {animal.characteristics.color}
          </div>
        </div>
      </div>
      <div className="mt-4">
        <strong>Select Attributes:</strong>
        <div className="flex flex-wrap mt-2">
          {Object.entries(animal.characteristics)
            .slice(0, 10) 
            .map(([key, value]) => (
              <CustomButton
                key={key}
                onClick={() => handleAttributeChange(key)}
                isActive={selected.includes(key)}
                className="m-1 w-auto"
              >
                {key}: {value}
              </CustomButton>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnimalCard;
