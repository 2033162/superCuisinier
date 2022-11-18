import {useEffect, useState} from "react";
import HeaderAdd from "./HeaderAdd";
import AddRecette from "./AddRecette";
import Recettes from "./Recettes";
import UpdateRecette from "./UpdateRecette";

const PageRecette = () => {

    const [showAddRecette, setShowAddRecette] = useState(false)
    const [showUpdateRecette, setShowUpdateRecette] = useState(false)
    const [recettes, setRecettes] = useState([])
    const [recette, setRecette] = useState({})

    useEffect(() => {
        const getRecettes = async () => {
            const recettesFromServer = await fetchRecettes()
            setRecettes(recettesFromServer)
        }
        getRecettes()
    }, [])

    const fetchRecettes = async () => {
        const res = await fetch('http://localhost:8080/recette')
        const data = await res.json()
        return data
    }

    const addRecette = async (recette) => {
        const res = await fetch('http://localhost:8080/recette',
            {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(recette)
            })
        const data = await res.json()
        setRecettes([...recettes, data])
    }

    const deleteRecette = async (id) => {
        await fetch(`http://localhost:8080/recette/${id}`, {
            method: 'DELETE'
        })
        setRecettes(recettes.filter((recette) => recette.id !== id))
    }

    const updateRecette = async (recette) => {
        console.log(recette)
        const res = await fetch(`http://localhost:8080/recette/${recette.id}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(recette)
        })
        const data = await res.json()
        setRecettes(
            recettes.map(
                (r) => r.id === recette.id ?
                    {...recette,
                        titre: data.titre,
                        portion: data.portion,
                        calories: data.calories,
                        ingredientDtos: data.ingredientDtos
                    } : r
            )
        )
    }

    return (
        <div className='container'>
            <HeaderAdd title='Recette'
                     onAdd={() =>
                         setShowAddRecette(!showAddRecette)}
                     showAdd={showAddRecette}/>
            {showAddRecette && <AddRecette onAdd={addRecette} />}
            {recettes.length > 0 ?
                <Recettes recettes={recettes}
                        onDelete={deleteRecette}
                        onUpdate={(recette) => {
                            setShowUpdateRecette(!showUpdateRecette)
                            setRecette(recette)
                        }}
                        showUpdate={showUpdateRecette}
                />
                : 'No recettes'}
            {showUpdateRecette && <UpdateRecette recette={recette} onUpdate={updateRecette} />}
        </div>
    );
}

export default PageRecette