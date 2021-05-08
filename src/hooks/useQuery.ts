import { parse, ParseOptions } from "query-string";
import { useMemo } from "react";
import { useLocation } from "react-router-dom";

export const useQuery = (options?: ParseOptions) => {
    const { search } = useLocation();

    return useMemo(() => parse(search, options), [search]);
};
