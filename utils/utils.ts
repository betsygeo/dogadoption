import { redirect } from "next/navigation";

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



export const encodedRedirect = (status: string, redirectTo: string, message: string) => {
  const encodedUrl = encodeURIComponent(redirectTo);

  if (typeof window !== 'undefined') {
    // Client-side: Use window.location.href
    window.location.href = `https://example.com/redirect?to=${encodedUrl}`;
  } else {
    // Server-side: Use Next.js redirect
    throw redirect(`${encodedUrl}?status=${status}&message=${encodeURIComponent(message)}`);
  }
};