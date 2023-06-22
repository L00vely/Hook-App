import { HomePage } from '../../src/09-useContext/HomePage';
import { UserContext } from '../../src/09-useContext/context/UserContext';
import { render, screen } from '@testing-library/react';

describe('Pruebas en <HomePage />', () => {
    const user = {
        id: 1,
        name: 'Fernando'
    }


    test('debe de mostrar el componenete sin el usuario', () => {
        render( 
            <UserContext.Provider value={{ user: null }}>
                 <HomePage />
            </UserContext.Provider>  
        );

        const preTag = screen.getByLabelText('pre');
        expect( preTag.innerHTML ).toBe( 'null' );
    });

    test('debe de mostrar el componenete con el usuario', () => {
        render( 
            <UserContext.Provider value={{ user }}>
                 <HomePage />
            </UserContext.Provider>  
        );

        const preTag = screen.getByLabelText('pre');
        expect( preTag.innerHTML ).toContain( user.name );
        expect( preTag.innerHTML ).toContain( `${user.id}` );
       
        // expect( preTag.innerHTML ).toBeNull(preTag);
    });
})