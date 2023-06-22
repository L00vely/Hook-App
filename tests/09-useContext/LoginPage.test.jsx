import { LoginPage } from '../../src/09-useContext/LoginPage';
import { UserContext } from '../../src/09-useContext/context/UserContext';
import { render, screen, fireEvent } from '@testing-library/react';

describe('Pruebas en <LoginPage />', () => {

    test('debe de mostrar el componente sin el usuario', () => {
        render( 
            <UserContext.Provider value={{ user: null }}>
                 <LoginPage />
            </UserContext.Provider>  
        );
        const preTag = screen.getByLabelText('pre');
        expect ( preTag.innerHTML ).toBe( 'null' );
     
    });

    test('debe de mostrar el componente con el usuario', () => {
        const setUserMock = jest.fn()
        
        render( 
            <UserContext.Provider value={{ user: null, setUser: setUserMock }}>
                 <LoginPage />
            </UserContext.Provider>  
        );

        const setButton = screen.getByLabelText('set-user-button');
        fireEvent.click(setButton);
        expect( setUserMock ).toHaveBeenCalledWith({"email": "Lovely@outlook.com", "id": 123, "name": "Lovely"})
        
    });
})