import { fireEvent, render, screen } from "@testing-library/react";
import { TodoItem } from '../../src/08-useReducer/TodoItem';

describe('Pruebas en <TodoItem />', () => {
    const todo = {
        id: 1,
        description: 'Piedra del alma',
        done: false
    }

    const onDeleteTodoMock = jest.fn();
    const onToggleTodoMock = jest.fn();

    beforeEach( () => jest.clearAllMocks() );

    test('debe de mostrar el Todo pendiente de completar', () => {
        render( <TodoItem 
                    todo={ todo }  
                    onToggleTodo={ onToggleTodoMock } 
                    onDeleteTodo={ onDeleteTodoMock }
                />
        );

        const liElement = screen.getByRole('listitem');
        expect( liElement.className ).toBe("list-group-item d-flex justify-content-between");

        const spanElement = screen.getByLabelText('span');
        expect( spanElement.className ).toBe('align-self-center ')
    });

    test('debe de mostrar el Todo completado', () => {
        todo.done = true;

        render( <TodoItem 
                    todo={ todo }  
                    onToggleTodo={ onToggleTodoMock } 
                    onDeleteTodo={ onDeleteTodoMock }
                />
        );

        const spanElement = screen.getByLabelText('span');
        expect( spanElement.className ).toContain('text-decoration-line-through');
    });

    test('span debe de llamar ToggleTodo cuando se hace click', () => {
    
        render( <TodoItem 
                    todo={ todo }  
                    onToggleTodo={ onToggleTodoMock } 
                    onDeleteTodo={ onDeleteTodoMock }
                />
        );

        const spanElement = screen.getByLabelText('span');
        fireEvent.click(spanElement);

        expect( onToggleTodoMock ).toHaveBeenCalledWith( todo.id );
    });

    test('button debe de llamar el deleteTodo', () => {
        
        render( <TodoItem 
                    todo={ todo }  
                    onToggleTodo={ onToggleTodoMock } 
                    onDeleteTodo={ onDeleteTodoMock }
                />
        );

        const buttonElement = screen.getByLabelText('delete-button');
        fireEvent.click(buttonElement);
        expect( onDeleteTodoMock ).toHaveBeenCalledWith( todo.id );
    });
});