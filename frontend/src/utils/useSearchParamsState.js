import { useSearchParams } from 'react-router-dom'

/**
 * Modified useSearchParams hook
 * This hook maintains multiple search parameters unlike the useSearchParams hook
 * 
 * @param {*} searchParamName 
 * @param {*} defaultValue 
 * @returns state and setState
 */
export const useSearchParamsState = (searchParamName, defaultValue) => {
    const [search, setSearch] = useSearchParams();
    const acquiredSearchParam = search.get(searchParamName)
    const searchParamsState = acquiredSearchParam ?? defaultValue

    const setSearchParamsState = (newParamState) => {
        const newState = Object.assign(
            {},
            [...search.entries()].reduce(
                (o, [key, value]) => ({...o, [key]: value}), // o is the accumulator
                {} // initial value for reduce
            ),
            {[searchParamName]: newParamState}
        );
        // delete the field if user set newParamState to null
        if (newParamState === null) {
            delete newState[searchParamName]
        }
        setSearch(newState)
    }
    return [searchParamsState, setSearchParamsState]
}