"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function Page2() {
  const [loading, setLoading] = useState(true);
  const [dogs, setDogs] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
      } else {
        setLoading(false);
      }
    };

    checkUser();
  }, []);

  useEffect(() => {
    const fetchDogs = async () => {
      const { data, error } = await supabase.from("dogs").select("*");
      console.log(data);
      if (error) console.error("Error fetching dogs:", error);
      else setDogs(data);
    };

    fetchDogs();
  }, []);

  if (loading) return <p>Loading...</p>;

  const addDog = async (name: string, breed: string) => {
    const { data, error } = await supabase
      .from("dogs")
      .insert([{ Name: name, Breed: breed }]);

    if (error) {
      console.error("Error adding dog:", error);
    } else {
      // Refetch the data from the database after the insert
      const { data: allDogs, error: fetchError } = await supabase
        .from("dogs")
        .select("*");

      if (fetchError) {
        console.error("Error fetching dogs:", fetchError);
      } else {
        setDogs(allDogs);
      }
    }
  };

  const removeDog = async (id: string) => {
    const { error } = await supabase.from("dogs").delete().eq("id", id);
    if (error) {
      console.error("Error deleting dog:", error);
    } else {
      setDogs(dogs.filter((dog) => dog.id !== id));
    }
  };

  return (
    <div>
      <h1>Welcome to the Dog Adoption Center Database</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const form = e.target as HTMLFormElement;
          const name = (form.elements.namedItem("name") as HTMLInputElement)
            .value;
          const breed = (form.elements.namedItem("breed") as HTMLInputElement)
            .value;
          addDog(name, breed);
          form.reset();
        }}
      >
        <input type="text" name="name" placeholder="Dog Name" required />
        <input type="text" name="breed" placeholder="Breed" required />
        <button type="submit">Add Dog</button>
      </form>

      <div>
        {dogs.length === 0 ? (
          <p>No dogs available.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Breed</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {dogs.map((dog: any) => (
                <tr key={dog.id}>
                  <td>{dog.Name}</td>
                  <td>{dog.Breed}</td>
                  <td>
                    <button onClick={() => removeDog(dog.id)}>Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <button
        onClick={() => supabase.auth.signOut().then(() => router.push("/"))}
      >
        Logout
      </button>
    </div>
  );
}
