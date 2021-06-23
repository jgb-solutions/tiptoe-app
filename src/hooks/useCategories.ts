import { useState } from "react"
import { useQuery } from "@apollo/react-hooks"

import { FETCH_CATEGORIES } from "../graphql/queries"

export default function useCategories() {
	const {
		data,
	} = useQuery(FETCH_CATEGORIES) 

	return {
		categoriesData: data,
	}
}
