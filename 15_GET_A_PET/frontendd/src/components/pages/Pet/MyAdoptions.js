import styles from './Dashboard.module.css'
import api from '../../../utils/api'
import { useState, useEffect } from 'react'

import RoundedImage from '../../Layouts/RoundedImage'

function MyAdoptions() {
    const [pets, setPets] = useState([])
    const [token] = useState(localStorage.getItem('token') || '')

    useEffect(() => {
        console.log(token)
        api.get('/pets/myadoptions', {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`

            }
        }).then((res) => {
            setPets(res.data.pets)
        })
    }, [token])
    return (
        <section>
            <div className={styles.petslist_header}>
                <h1>Minhas adoções</h1>
            </div>
            <div className={styles.petslist_container}>

                {pets.length > 0 && pets.map((pet) => (
                    <div key={pet._id} className={styles.petlist_row}>

                        <RoundedImage
                            src={`http://localhost:5000/images/pets/${pet.images[0]}`}
                            alt={pet.name}
                            width="px75"
                        />
                        <span className="bold">{pet.name}</span>
                        <div className={styles.contacts}>  
                            <p>
                                <span className="bold">Ligue para: </span> {pet.user.phone}
                            </p>
                            <p>
                                <span className="bold">Fale com: </span> {pet.user.name}
                            </p>
                        </div>
                        <div className={styles.actions}>
                            {pet.available ? (
                               <p>Adoção em processo</p>
                            )
                                : (
                                    <p>Parabéns por concluir a adoçao</p>
                                )}
                        </div>


                    </div>
                ))}

                {pets.length === 0 && <p>Ainda não há adoções de Pets.</p>}

            </div>
        </section>
    )
}

export default MyAdoptions