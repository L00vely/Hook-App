import { fireEvent, render, screen } from "@testing-library/react"
import { MultipleCustomHooks } from '../../src/03-examples/MultipleCustomHooks';
import { useFetch } from "../../src/hooks/useFetch";
import { useCounter } from "../../src/hooks/useCounter";

jest.mock('../../src/hooks/useFetch');
jest.mock('../../src/hooks/useCounter');

describe('Pruebas en <MultipleCustomHooks />', () => {
    const mockIncrement = jest.fn();
    
    useCounter.mockReturnValue({
        counter: 1,
        increment: mockIncrement
    });

    beforeEach(() => {
        jest.clearAllMocks();
    })

    test('debe de mostrar el componente por defecto', () => {
        useFetch.mockReturnValue({
            data:null,
            isLoading: true,
            hasError: null
        });
        
        render(<MultipleCustomHooks />);
        expect( screen.getByText('Loading'));
        expect( screen.getByText('Breaking Bad Quotes'));
        const nexButton = screen.getByRole('button', { name: 'More quotes'});
        expect(nexButton.disabled).toBeTruthy();
    });

    test('debe de mostrar un Quote', () => {
        useFetch.mockReturnValue({
            data:[{
                author: 'David',
                quote: 'Hola mundo'
            }],
            isLoading: false,
            hasError: null
        });

        render(<MultipleCustomHooks />);
        
        expect( screen.getByText('Hola mundo') ).toBeTruthy();
        expect( screen.getByText('David') ).toBeTruthy();
        
        const nexButton = screen.getByRole('button', { name: 'More quotes'});
        expect(nexButton.disabled).toBeFalsy();
    });

    test('debe de llamar la función de incrementar', () => {
        

        useFetch.mockReturnValue({
            data:[{
                author: 'David',
                quote: 'Hola mundo'
            }],
            isLoading: false,
            hasError: null
        });

        render(<MultipleCustomHooks />);
        const nexButton = screen.getByRole('button', { name: 'More quotes'});
        fireEvent.click(nexButton);
        expect( mockIncrement ).toHaveBeenCalled();
    })
})