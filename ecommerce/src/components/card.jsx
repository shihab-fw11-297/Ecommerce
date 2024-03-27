import React from 'react'
import { FaPlus } from 'react-icons/fa'

const Card = ({prodId,price,name,photo,stock,handler}) => {

    return (
    <div className='card'>
        <img src={photo} alt={name}/>
        <p>{name}</p>
        <span>${price}</span>

        <div>
        <button
          onClick={() =>
            handler({ prodId, price, name, photo, stock, quantity: 1 })
          }
        ><FaPlus/></button>
        </div>
    </div>
  )
}

export default Card