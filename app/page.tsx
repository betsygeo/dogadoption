"use client";

import { useState, useEffect } from "react";
import { fetchRandomDog, fetchDogbyBreed } from "../utils/utils";

import { createClient } from "@supabase/supabase-js";

import { useRouter } from "next/router";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const HomePage = () => {
  const [dogImages, setDogImages] = useState<string[]>([]);
  const [breedInput, setBreedInput] = useState<string>("");
  const [breedImages, setBreedImages] = useState<string[]>([]);

  useEffect(() => {
    const loadDogs = async () => {
      const images = await Promise.all(
        Array(9)
          .fill(null)
          .map(() => fetchRandomDog())
      );
      setDogImages(images.filter((image): image is string => image !== null));
    };

    loadDogs();
  }, []);

  const fetchBreed = async () => {
    if (!breedInput.trim()) return;

    const images = await Promise.all(
      Array(9)
        .fill(null)
        .map(() => fetchDogbyBreed(breedInput.toLowerCase()))
    );
    setBreedImages(images.filter((image): image is string => image !== null));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      fetchBreed();
    }
  };

  const handleAdopt = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      window.location.href = "/admin";
    } else {
      window.location.href = "/sign-in";
    }
  };

  return (
    <div className="container">
      <header className="header">
        <a href="#home" className="logo">
          Dog <span>Adoption Center</span>
        </a>
        <div className="search-section">
          <input
            type="text"
            value={breedInput}
            onChange={(e) => setBreedInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Breed name"
            className="search-input"
          />
        </div>
        {}

        <button className="gradient-btn" onClick={handleAdopt}>
          Adopt a Dog
        </button>
      </header>

      <div className="grid-section">
        {breedImages.length > 0 ? (
          <div className="dog-grid">
            {breedImages.map((image, index) => (
              <div key={index} className="dog-card">
                <img
                  src={image}
                  alt={`Dog Breed ${index}`}
                  className="dog-image"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="dog-grid">
            {dogImages.map((image, index) => (
              <div key={index} className="dog-card">
                <img
                  src={image}
                  alt={`Random Dog ${index}`}
                  className="dog-image"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
