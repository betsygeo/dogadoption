import { redirect } from "next/navigation";

/**
 * Redirects to a specified path with an encoded message as a query parameter.
 * @param {('error' | 'success')} type - The type of message, either 'error' or 'success'.
 * @param {string} path - The path to redirect to.
 * @param {string} message - The message to be encoded and added as a query parameter.
 * @returns {never} This function doesn't return as it triggers a redirect.
 */
export function encodedRedirect(
  type: "error" | "success",
  path: string,
  message: string,
) {
  return redirect(`${path}?${type}=${encodeURIComponent(message)}`);
}

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



