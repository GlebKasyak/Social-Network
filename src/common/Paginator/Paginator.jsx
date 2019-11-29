import React, { useState } from "react";
import style from "./Paginator.module.css";
import cn from "classnames";

const Paginator = ( {totalItemsCount, pageSize, currentPage, onPageChanged, portionSize} ) => {
    let pagesCount = Math.ceil(totalItemsCount / pageSize);
    let pages = [];

    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    let portionCount = Math.ceil(pagesCount / portionSize);
    let [ portionNumber, setPortionNumber ] = useState(1);
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    let rightPortionPageNumber = portionNumber * portionSize;

    return (
            <div className={style.paginator}>
                { portionNumber > 1 &&
                    <button onClick={() => setPortionNumber(portionNumber - 1)} className={style.previous}>
                        Previous
                    </button>
                }
                { pages
                    .filter(page => page >= leftPortionPageNumber && page <= rightPortionPageNumber)
                    .map((page, i) => {
                      return (
                        <span
                            className={ cn({[style.selectedPage]: currentPage === page}, style.pageNumber) }
                            key={i}
                            onClick={() => onPageChanged(page)}
                        >
                            {page}
                        </span>
                      )})}
                { portionCount > portionNumber &&
                    <button onClick={() => setPortionNumber(portionNumber + 1)} className={style.next}>
                        Next
                    </button>
                }
            </div>
    )
};

export default Paginator;