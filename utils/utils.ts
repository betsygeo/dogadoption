export const fetchRandomDog = async (): Promise<string | null> => {
  try {
    const response = await fetch("https://dog.ceo/api/breeds/image/random");
    const data = await response.json();
    return data.message;
  } catch (error) {
    console.error("Error fetching random dog:", error);
    return null;
  }
};

export const fetchDogbyBreed = async (breed: string): Promise<string | null> => {
  try {
    

    const response = await fetch(`https://dog.ceo/api/breed/${breed}/images/random`);

    const data = await response.json();
    return data.message; 
  } catch (error) {
    console.error(`Error fetching ${breed} images:`, error);
    return null;
  }
};

export const encodedRedirect = (url: string) => {
  const encodedUrl = encodeURIComponent(url);
  window.location.href = `https://example.com/redirect?to=${encodedUrl}`;
};
