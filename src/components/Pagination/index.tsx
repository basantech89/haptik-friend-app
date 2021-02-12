import React from 'react'
import { Pagination as MiPagination } from '@material-ui/lab'
import { createStyles, makeStyles } from '@material-ui/core'

const usePaginationStyles = makeStyles((theme) =>
	createStyles({
		root: {
			'& > *': {
				marginTop: theme.spacing(2)
			}
		}
	})
)

const usePagination = (rowsPerPage: number, totalItems: number) => {
	const [page, setPage] = React.useState(1)
	const totalPages = Math.ceil(totalItems / rowsPerPage)
	const firstRow = (page - 1) * rowsPerPage
	const lastRow = page * rowsPerPage
	const Pagination = () => {
		const paginationClasses = usePaginationStyles()
		const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
			setPage(value)
		}

		if (totalPages > 1) {
			return (
				<div className={paginationClasses.root}>
					<MiPagination
						count={totalPages}
						page={page}
						color='primary'
						onChange={handleChange}
					/>
				</div>
			)
		}
		return null
	}
	return { Pagination, firstRow, lastRow }
}

export default usePagination
