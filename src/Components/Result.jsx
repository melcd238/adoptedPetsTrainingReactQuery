import Pet from "./Pet";

const Result = ({ pets }) => {
    return(
        <div className="search">
            {!pets.length ? (
                <h1>No Pets Found</h1>
            ) : (
                pets.map((pet) => (
                    <Pet
                    {...pet}
                    key={pet.id}
                    />
                ))
            )}
        </div>
    )
};


export default Result;