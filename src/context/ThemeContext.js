import React, { useState } from 'react'

//Create the context of our app
export const ThemeContext = React.createContext({})


//Function that allows to provide a state globally
export const ThemeContextProvider = ({children}) => {
    const [theme, setTheme] = useState(false)

    return (
        //Value prop provides access to the variables, functions or objects to the all children components
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}
