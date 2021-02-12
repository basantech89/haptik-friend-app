import React from 'react'
import {
	Box,
	Container,
	DialogContent,
	DialogContentText,
	DialogTitle,
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
import {
	useFriendListStyles,
	useListItemStyles,
	useSearchStyles
} from './style'
import Pagination from '../../../components/Pagination'
import usePagination from '../../../components/Pagination'
import SearchIcon from '@material-ui/icons/Search'
import Popup from '../../../components/Popup'

const FriendList = () => {
	const friendListClasses = useFriendListStyles()
	const searchClasses = useSearchStyles()
	const listItemClasses = useListItemStyles()
	const [friends, setFriends] = React.useState<Friend[]>([])
	const [searchedFriends, setSearchedFriends] = React.useState<Friend[]>([])
	const [searchBy, setSearchBy] = React.useState('')
	const [sortBy, setSortBy] = React.useState('favorite')
	const [newFriend, setNewFriend] = React.useState('')

	const searchFriends = (friend: Friend, searchTerm: string) =>
		friend.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
		friend.lastName.toLowerCase().includes(searchTerm.toLowerCase())

	const rowsPerPage = 5
	const { Pagination, firstRow, lastRow } = usePagination(
		rowsPerPage,
		searchedFriends.length
	)

	const getSortedFriendsByType = (type: string, list = searchedFriends) => {
		const sortedFriends = [...list]
		if (type === 'favorite') {
			sortedFriends.sort(sortByFavorites)
		} else if (type === 'firstName') {
			sortedFriends.sort(sortByFirstName)
		} else {
			sortedFriends.sort(sortByLastName)
		}
		return sortedFriends
	}

	const addNewFriend = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		event.stopPropagation()
		if (newFriend) {
			const nameArray = newFriend.split(' ')
			const newFriends = [
				...friends,
				{
					id: nanoid(),
					firstName: nameArray[0],
					lastName: nameArray[1] || '',
					favorite: false
				}
			]
			const sortedNewFriends = getSortedFriendsByType(sortBy, newFriends)
			setFriends(sortedNewFriends)
		}
		setNewFriend('')
	}

	const removeFriend = (friendID: string) => () => {
		const matchedIdx = friends.findIndex((friend) => friend.id === friendID)
		const otherFriends = [...friends]
		otherFriends.splice(matchedIdx, 1)
		setFriends(otherFriends)
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

	const handleSortFriendList = (
		event: React.ChangeEvent<{ value: unknown }>
	) => {
		setSortBy(event.target.value as string)
		const sortedFriends = getSortedFriendsByType(event.target.value as string)
		setSearchedFriends(sortedFriends)
	}

	const toggleFavoriteFriend = (friendID: string) => () => {
		const matchedIdx = searchedFriends.findIndex(
			(friend) => friend.id === friendID
		)
		const newFavFriends = [...searchedFriends]
		newFavFriends[matchedIdx].favorite = !newFavFriends[matchedIdx].favorite
		if (sortBy === 'favorite') {
			newFavFriends.sort(sortByFavorites)
		}
		setSearchedFriends(newFavFriends)
	}

	const handleNewFriend = (event: React.ChangeEvent<HTMLInputElement>) => {
		setNewFriend(event.target.value)
	}

	const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
		const searchTerm = event.target.value
		setSearchBy(searchTerm)
		const matchedFriends = friends.filter((item) =>
			searchFriends(item, searchTerm)
		)
		setSearchedFriends(matchedFriends)
	}

	React.useEffect(() => {
		setSearchedFriends([...friends])
	}, [friends])

	return (
		<>
			<Box
				display='flex'
				flexWrap='wrap'
				justifyContent='space-between'
				className={friendListClasses.box}
				p={2}
			>
				<Box
					display='flex'
					justifyContent='space-between'
					minWidth='40%'
					className={friendListClasses.innerBox}
				>
					<Typography variant='subtitle1'> Friends List </Typography>
					<FormControl className={friendListClasses.formControl}>
						<InputLabel id='sort-friend-list'> Sort By </InputLabel>
						<Select
							labelId='sort-friend-list'
							id='sort-by'
							value={sortBy}
							onChange={handleSortFriendList}
						>
							<MenuItem value='favorite'> Favorites </MenuItem>
							<MenuItem value='firstName'> First Name </MenuItem>
							<MenuItem value='lastName'> Last Name </MenuItem>
						</Select>
					</FormControl>
				</Box>
				<div className={searchClasses.search}>
					<div className={searchClasses.searchIcon}>
						<SearchIcon />
					</div>
					<InputBase
						placeholder='Search…'
						classes={{
							root: searchClasses.inputRoot,
							input: searchClasses.inputInput
						}}
						inputProps={{ 'aria-label': 'search' }}
						value={searchBy}
						onChange={handleSearch}
					/>
				</div>
			</Box>
			<form onSubmit={addNewFriend} className={friendListClasses.form}>
				<List className={friendListClasses.list}>
					<ListItem>
						<InputBase
							fullWidth
							value={newFriend}
							onChange={handleNewFriend}
							placeholder="Enter your friend's name"
							inputProps={{ 'aria-label': 'friend-input' }}
						/>
					</ListItem>
					{searchedFriends.slice(firstRow, lastRow).map((friend) => (
						<React.Fragment key={friend.id}>
							<Divider />
							<ListItem key={friend.id} button classes={listItemClasses}>
								<ListItemText
									id={friend.id}
									primary={`${friend.firstName} ${friend.lastName}`}
								/>
								<ListItemIcon>
									{friend.favorite ? (
										<StarRateIcon
											aria-label='unfav-friend'
											onClick={toggleFavoriteFriend(friend.id)}
										/>
									) : (
										<StarOutlineIcon
											aria-label='fav-friend'
											onClick={toggleFavoriteFriend(friend.id)}
										/>
									)}
								</ListItemIcon>
								<ListItemIcon>
									<Popup
										primaryBtnAction={removeFriend(friend.id)}
										secondaryBtnLabel='Cancel'
										trigger={(toggleOpen: () => void) => (
											<DeleteOutlineIcon
												aria-label='delete-friend'
												onClick={toggleOpen}
											/>
										)}
									>
										<DialogTitle> Confirmation Dialog </DialogTitle>
										<DialogContent>
											<DialogContentText>
												Are you sure you want to Delete {friend.firstName} ?
											</DialogContentText>
										</DialogContent>
									</Popup>
								</ListItemIcon>
							</ListItem>
						</React.Fragment>
					))}
				</List>
			</form>
			<Container className={friendListClasses.pagination}>
				<Pagination />
			</Container>
		</>
	)
}

export default FriendList
