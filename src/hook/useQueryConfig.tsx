import React from 'react'
import { ProductListConfig } from 'src/type/product.type'
import useQueryParams from 'src/hook/useQueryParams'
import { omitBy, isUndefined } from 'lodash'
export type QueryConfig = {
  [key in keyof ProductListConfig]: string
}
export function useQueryConfig() {
  const queryParams = useQueryParams()
  const queryconfig: QueryConfig = omitBy(
    {
      page: queryParams.page || '1',
      limit: queryParams.limit || 20,
      sort_by: queryParams.sort_by,
      order: queryParams.order,
      exclude: queryParams.exclude,
      rating_filter: queryParams.rating_filter,
      price_max: queryParams.price_max,
      price_min: queryParams.price_min,
      name: queryParams.name,
      category: queryParams.category
    },
    isUndefined
  )
  return queryconfig
}
