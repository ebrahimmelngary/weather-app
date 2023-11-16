import { useEffect, useMemo, useState } from 'react';
import { AxiosResponse } from 'axios';
import { useDebounce } from 'use-debounce';

import instance from '../../utils/axios';
import { SearchResponse } from '../../types';
import { Base_URL } from '../../api/api';

export const useHome = () => {
  const [searchText, setSearchText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [results, setResults] = useState<AxiosResponse<SearchResponse>>();

  const [debouncedSearchText] = useDebounce(searchText, 500);

  useEffect(() => {
    if (debouncedSearchText && debouncedSearchText?.length > 2) {
      try {
        setIsLoading(true);
        (async () =>
          await instance
            .get(`${Base_URL}&q=${searchText}`)
            .then((res: AxiosResponse<SearchResponse>) => setResults(res)))();
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    }
    setIsLoading(false);
  }, [debouncedSearchText, searchText]);

  const newResultDates = useMemo(
    () =>
      results?.data?.forecast?.forecastday[0]?.hour?.filter(
        i => new Date(i.time_epoch * 1000).getHours() >= new Date().getHours(),
      ),
    [results],
  );

  return {
    searchText,
    setSearchText,
    isLoading,
    results,
    resultDates: newResultDates?.slice(0, 5),
  };
};
