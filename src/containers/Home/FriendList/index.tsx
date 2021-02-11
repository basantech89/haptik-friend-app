import React from 'react'
import {
	Box,
	Divider,
	FormControl,
	InputBase,
	InputLabel,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	MenuItem,
	Select,
	Typography
} from '@material-ui/core'
import StarOutlineIcon from '@material-ui/icons/StarOutline'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline'
import StarRateIcon from '@material-ui/icons/StarRate'
import { Friend } from '../types'
import { nanoid } from '@reduxjs/toolkit'
import { useFriendListStyles, useListItemStyles } from './style'

const FriendList = () => {
	const friendListClasses = useFriendListStyles()
	const listItemClasses = useListItemStyles()
	const [friends, setFriends] = React.useState<Friend[]>([])
	const [sortBy, setSortBy] = React.useState('')
	const [newFriend, setNewFriend] = React.useState('')

	const addNewFriend = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		event.stopPropagation()
		if (newFriend) {
			const nameArray = newFriend.split(' ')
			setFriends([
				...friends,
				{
					id: nanoid(),
					firstName: nameArray[0],
					lastName: nameArray[1] || '',
					favorite: false
				}
			])
		}
		setNewFriend('')
	}

	const removeFriend = (friendID: string) => () => {
		const matchedIdx = friends.findIndex((friend) => friend.id === friendID)
		const duplicateFriends = [...friends]
		duplicateFriends.splice(matchedIdx, 1)
		setFriends(duplicateFriends)
	}

	const sortByName = (friend1: Friend, friend2: Friend) => {
		const name1 = `${friend1.firstName} ${friend1.lastName}`
		const name2 = `${friend2.firstName} ${friend2.lastName}`
		return name1 >= name2 ? 1 : -1
	}

	const sortByFavorites = (friend1: Friend, friend2: Friend) => {
		if (friend1.favorite && friend2.favorite) {
			return sortByName(friend1, friend2)
		} else {
			return !friend1.favorite ? 1 : -1
		}
	}

	const sortByFirstName = (friend1: Friend, friend2: Friend) =>
		friend1.firstName >= friend2.firstName ? 1 : -1

	const sortByLastName = (friend1: Friend, friend2: Friend) =>
		friend1.lastName >= friend2.lastName ? 1 : -1

	const sortFriendsList = (event: React.ChangeEvent<{ value: unknown }>) => {
		setSortBy(event.target.value as string)
		const duplicateFriends = [...friends]
		if (event.target.value === 'favorite') {
			duplicateFriends.sort(sortByFavorites)
		} else if (event.target.value === 'firstName') {
			duplicateFriends.sort(sortByFirstName)
		} else {
			duplicateFriends.sort(sortByLastName)
		}
		setFriends(duplicateFriends)
	}

	const toggleFavoriteFriend = (friendID: string) => () => {
		const matchedIdx = friends.findIndex((friend) => friend.id === friendID)
		const duplicateFriends = [...friends]
		duplicateFriends[matchedIdx].favorite = !duplicateFriends[matchedIdx]
			.favorite
		duplicateFriends.sort(sortByFavorites)
		setFriends(duplicateFriends)
	}

	const handleNewFriend = (event: React.ChangeEvent<HTMLInputElement>) => {
		setNewFriend(event.target.value)
	}

	return (
		<>
			<Box
				display='flex'
				justifyContent='space-between'
				className={friendListClasses.box}
				p={2}
			>
				<Typography variant='subtitle1'> Friends List </Typography>
				<FormControl className={friendListClasses.formControl}>
					<InputLabel id='sort-friend-list'> Sort By </InputLabel>
					<Select
						labelId='sort-friend-list'
						id='sort-by'
						value={sortBy}
						onChange={sortFriendsList}
					>
						<MenuItem value='favorite'> Favorites </MenuItem>
						<MenuItem value='firstName'> First Name </MenuItem>
						<MenuItem value='lastName'> Last Name </MenuItem>
					</Select>
				</FormControl>
			</Box>
			<form onSubmit={addNewFriend} className={friendListClasses.form}>
				<List className={friendListClasses.list}>
					<ListItem button>
						<InputBase
							fullWidth
							value={newFriend}
							onChange={handleNewFriend}
							placeholder="Enter your friend's name"
							inputProps={{ 'aria-label': 'friend-input' }}
						/>
					</ListItem>
					{friends.map((friend) => (
						<>
							<Divider />
							<ListItem key={friend.id} button classes={listItemClasses}>
								<ListItemText
									id={friend.id}
									primary={`${friend.firstName} ${friend.lastName}`}
								/>
								<ListItemIcon>
									{friend.favorite ? (
										<StarRateIcon onClick={toggleFavoriteFriend(friend.id)} />
									) : (
										<StarOutlineIcon
											onClick={toggleFavoriteFriend(friend.id)}
										/>
									)}
								</ListItemIcon>
								<ListItemIcon>
									<DeleteOutlineIcon onClick={removeFriend(friend.id)} />
								</ListItemIcon>
							</ListItem>
						</>
					))}
				</List>
			</form>
		</>
	)
}

export default FriendList
