import '@testing-library/jest-dom';
import React from 'react';
import Todo from './Todo';
import { render, screen } from '@testing-library/react'

test('Todo renders', () => {
    const todo = {
        text: 'This is a test',
        done: false
    }

    render(<Todo todo={todo} deleteTodo={() => null} completeTodo={() => null}/>)

    const text = screen.getAllByText('This is a test')
    expect(text).toBeDefined()
})