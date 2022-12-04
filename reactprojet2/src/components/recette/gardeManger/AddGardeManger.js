import {useState} from 'react'
import GetIngredients from "./../ingredient/GetIngredients";

const AddGardeManger = ({onAdd}) => {
    const [nom, setNom] = useState('')
    const [ingredientDtos, setIngredientDtos] = useState([])

    const onSubmit = (e) => {
        e.preventDefault()

        if (
            !nom &&
            !ingredientDtos
        ) {
            alert('Ajouter un garde-manger')
            return
        }

        if (
            !nom
        ) {
            alert('Ajouter un nom au garde-manger')
            return
        }

        if (
            !ingredientDtos
        ) {
            alert('Sélectionner des ingrédients pour le garde-manger')
            return
        }

        onAdd({
            nom,
            ingredientDtos
        })
        setNom('')
        setIngredientDtos([])
    }

    return (
        <form className='add-form' onSubmit={onSubmit}>
            <div className='form-control'>
                <label>Nom</label>
                <input type='text' placeholder='Nom'
                       value={nom}
                       onChange={(e) => setNom(e.target.value)}/>
            </div>
            <div className='form-control'>
                <label>Ingrédients</label>
                <GetIngredients
                    onChange={(e) => {
                        let ingredients = [e.length]
                        let n = 0
                        e.map((i) => {
                            let ingredient = {}
                            ingredient.id = i.value
                            ingredient.nom = i.label
                            ingredients[n] = ingredient
                            n++
                        })
                        setIngredientDtos(ingredients)
                    }}
                />
            </div>
            <input type='submit' value='Créer un nouveau garde-manger' className='btn btn-block bg-black text-light'/>
        </form>
    )
}

export default AddGardeManger
