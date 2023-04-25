import { useState, useContext} from "react";
import useBreedList from "../Hook/useBreedList";
import Result from "../Components/Result";
const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];
import { useQuery } from "@tanstack/react-query";
import fetchSearch from "../Fetch/fetchSearch";
import { AdoptedPetContext } from "../Context/AdoptedPetContext";

const SearchParams = () => {
    const [requestParams, setRequestParams] = useState({
        location: "",
        animal: "",
        breed: "",
    });
    const [adoptedPet] = useContext(AdoptedPetContext);
    const [animal, setAnimal] = useState("");
    const [breeds] = useBreedList(animal);

const results = useQuery(["search", requestParams], fetchSearch);
const pets = results.data?.pets || [];



    return (
        <div className="search-params">
        <form onSubmit= {(e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const obj ={
                animal: formData.get("animal") ?? "",
                breed: formData.get("breed") ?? "",
                location: formData.get("location") ?? "",
            };
            setRequestParams(obj);
        }}>  
            {!!adoptedPet && (
               <div className="pet image-container">
                 <img src={adoptedPet.images[0]} alt={adoptedPet.name} />
               </div>)}
            <label htmlFor="location">
            Location
            <input id="location" name="location"  placeholder="Location" />
            </label>
            <label htmlFor="animal">
            Animal
            <select 
               id="animal" 
               value={animal} 
               onChange={(e)=> setAnimal(e.target.value)}
               onBlur={(e)=> setAnimal(e.target.value)}>
                <option />
                {ANIMALS.map((animal) => (
                <option value={animal} key={animal}>
                    {animal}
                </option>
                ))}
            </select>
            </label>
            <label htmlFor="breed">
          Breed
          <select
            disabled={!breeds.length}
            id="breed"
            name="breed"
          >
            <option />
            {breeds.map((breedString) => (
              <option key={breedString} value={breedString}>
                {breedString}
              </option>
            ))}
          </select>
        </label>
            <button>Submit</button>
        </form>
        <Result pets={pets} />
        </div>
    );
    };

export default SearchParams;