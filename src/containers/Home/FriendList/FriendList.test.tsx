import React from 'react'
import { render, fireEvent, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import FriendList from './index'

afterEach(cleanup)

const setup = () => {
	const utils = render(<FriendList />)
	const input = utils.getByLabelText('friend-input') as HTMLInputElement
	return { input, ...utils }
}

test('It should allow user to type in a friend name', () => {
	const { input } = setup()
	expect(input).not.toBeDisabled()
})

test('Friend list should have more than 1 list item after inputting values', () => {
	const { input, getAllByLabelText } = setup()
	userEvent.type(input, 'Test1{enter}')
	userEvent.type(input, 'Test2{enter}')
	const deleteBtns = getAllByLabelText('delete-friend')
	const favBtns = getAllByLabelText('fav-friend')
	expect(deleteBtns.length).toEqual(2)
	expect(favBtns.length).toEqual(2)
})

test('Clicking on fav/unfav buttons should toggle the fav state of list items', () => {
	const { input, getAllByLabelText } = setup()
	userEvent.type(input, 'Test1{enter}')
	userEvent.type(input, 'Test2{enter}')
	let favBtns = getAllByLabelText('fav-friend')
	userEvent.click(favBtns[0])
	favBtns = getAllByLabelText('fav-friend')
	expect(favBtns.length).toEqual(1)
	let unFavBtns = getAllByLabelText('unfav-friend')
	expect(unFavBtns.length).toEqual(1)
	userEvent.click(favBtns[0])
	unFavBtns = getAllByLabelText('unfav-friend')
	expect(unFavBtns.length).toEqual(2)
	userEvent.click(unFavBtns[0])
	userEvent.click(unFavBtns[1])
	favBtns = getAllByLabelText('fav-friend')
	expect(favBtns.length).toEqual(2)
})

test('Clicking on delete button should remove list items from the list', () => {
	const { input, getAllByLabelText, getByTestId } = setup()
	userEvent.type(input, 'Test1{enter}')
	userEvent.type(input, 'Test2{enter}')
	let deleteBtns = getAllByLabelText('delete-friend')
	expect(deleteBtns.length).toEqual(2)
	userEvent.click(deleteBtns[0])
	const confirmBtn = getByTestId('confirm')
	userEvent.click(confirmBtn)
	deleteBtns = getAllByLabelText('delete-friend')
	expect(deleteBtns.length).toEqual(1)
})
