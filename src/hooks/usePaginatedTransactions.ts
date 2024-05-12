import { useCallback, useState } from "react"
import { PaginatedRequestParams, PaginatedResponse, Transaction } from "../utils/types"
import { PaginatedTransactionsResult } from "./types"
import { useCustomFetch } from "./useCustomFetch"

export function usePaginatedTransactions(): PaginatedTransactionsResult {
  const { fetchWithoutCache, loading } = useCustomFetch() // bug 7
  const [paginatedTransactions, setPaginatedTransactions] = useState<PaginatedResponse<
    Transaction[]
  > | null>(null)

  const [endOfTransactions, setEndOfTransactions] = useState(false) // bug 6

  const fetchAll = useCallback(async () => {
    const response = await fetchWithoutCache<PaginatedResponse<Transaction[]>, PaginatedRequestParams>(
      "paginatedTransactions",
      {
        page: paginatedTransactions === null ? 0 : paginatedTransactions.nextPage,
      }
    )

    setPaginatedTransactions((previousResponse) => {
      if (previousResponse === null) {
        setEndOfTransactions(false)
        return response
      } else if (response === null) {
        return previousResponse
      } else if (response.nextPage === null) {
        setEndOfTransactions(true)
      }

      // bug 4
      return { data: [...previousResponse.data, ...response.data], nextPage: response.nextPage }
    })
  }, [fetchWithoutCache, paginatedTransactions])

  const invalidateData = useCallback(() => {
    setPaginatedTransactions(null)
  }, [])

  return { data: paginatedTransactions, loading, fetchAll, invalidateData, endOfTransactions }
}
