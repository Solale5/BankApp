import React from 'react';

export default function AnimalCard({
  additional,
  diet,
  name,
  scientificName,
  size
}) {
  return (
    <div>
      <h2>{name}</h2>
      <h3>{scientificName}</h3>
      <h4>{size}kg</h4>
    </div>
  );
}
