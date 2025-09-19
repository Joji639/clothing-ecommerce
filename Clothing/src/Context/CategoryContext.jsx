import React, { createContext, useState } from 'react'
 export const CategoryContext=createContext()
const CategoryProvider = ({children}) => {
    const[Category,SetCategory]=useState(null)
  return (
    <>
    <CategoryContext.Provider value={{Category,SetCategory}} >
        {children}
    </CategoryContext.Provider>
    </>
  )
}

export default CategoryProvider
