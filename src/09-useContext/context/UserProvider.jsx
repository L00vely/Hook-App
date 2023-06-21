import { useState } from "react"
import { UserContext } from "./UserContext"

// const user = { 
//     id: 123,
//     name: 'David Perales',
//     email: 'perales@gmail.com'
// }

export const UserProvider = ( { children }) => {
    const [ user, setUser ] = useState();
    
    return (
        <UserContext.Provider value={{ user: user, setUser }}>
            { children }
        </UserContext.Provider>
    )
}
