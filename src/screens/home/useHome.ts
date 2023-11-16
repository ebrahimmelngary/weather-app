import { useCallback, useEffect, useMemo, useState } from 'react';
import { AxiosResponse } from 'axios';
import instance from '../../utils/axios';
import { useDebounce } from 'use-debounce';
import Toast from 'react-native-toast-message';

import { SearchResponse } from '../../types';
import { Base_URL } from '../../api/api';

export const useHome = () => {
  const [searchText, setSearchText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [results, setResults] = useState<AxiosResponse<SearchResponse>>();

  const [debouncedSearchText] = useDebounce(searchText, 500);

  const getCountryResult = useCallback(
    async () =>
      await instance
        .get(`${Base_URL}&q=${searchText}`)
        .then((res: AxiosResponse<SearchResponse>) => setResults(res)),
    [searchText],
  );

  useEffect(() => {
    if (debouncedSearchText && debouncedSearchText?.length > 2) {
      setIsLoading(true);
      try {
        getCountryResult();
      } catch (error) {
        Toast.show({ text1: error?.message || '', type: 'error' });
      }
      setIsLoading(false);
    }
  }, [debouncedSearchText, getCountryResult, searchText]);

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
