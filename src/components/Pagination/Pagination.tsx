import React, {
    FunctionComponent,
    Dispatch,
    SetStateAction,
} from 'react';

import "./Pagination.scss";

const classPrefix = "mdb-pagination";

interface IPaginationProps {
    setPage: Dispatch<SetStateAction<number>>
    page: number
}

export const Pagination: FunctionComponent<IPaginationProps> = ({
    page,
    setPage,
}) => {

    return (
        <div className={classPrefix} data-testid="pagination">
            <span className={`${classPrefix}__page-num`}>{`Page: ${page}`}</span>

            <button className={`${classPrefix}__button`} onClick={() => setPage(Number(page)-1)}>
                {"<"}
            </button>

            <button className={`${classPrefix}__button`} onClick={() => setPage(Number(page)+1)}>
                {">"}
            </button>
        </div>
    );
}
