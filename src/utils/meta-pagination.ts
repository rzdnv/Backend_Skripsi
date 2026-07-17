export const metaPagination = (
	page: number,
	perPage: number,
	totalCurrentPage: number,
	total: number,
) => {
	return {
		current_page: page,
		per_page: perPage,
		total_item: totalCurrentPage,
		total_page: Math.ceil(total / perPage),
		total_data: total,
	}
}
