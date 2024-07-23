import React, { useState } from "react";
import styles from "./Pagination.module.scss";

const Pagination: React.FC<{
  pageAmount: number;
  pageFlowing: number;
  setPageFlowing: any;
}> = ({ pageAmount, pageFlowing, setPageFlowing }) => {
  const mas: number[] = [],
    [buttonLast, setButtonLast] = useState(true),
    [buttonNext, setButtonNext] = useState(false);

  for (let i: number = 1; i <= pageAmount; i++) {
    mas.push(i);
  }

  return (
    <div className={styles.pagination}>
      <button
        disabled={buttonLast || pageFlowing === 1}
        onClick={() => {
          if (pageFlowing - 1 === 1) {
            setButtonLast(true);
          }
          setButtonNext(false);
          setPageFlowing(pageFlowing - 1);
        }}
        className={styles.paginationButton}
      >
        ⬅
      </button>
      {mas.map((el, id) => {
        return (
          <button
            className={
              pageFlowing === id + 1
                ? `${styles.active} ${styles.paginationButton}`
                : styles.paginationButton
            }
            onClick={() => {
              setButtonNext(false);
              setButtonLast(false);
              setPageFlowing(id + 1);
            }}
            key={id}
          >
            {el}
          </button>
        );
      })}
      <button
        disabled={buttonNext || pageFlowing === pageAmount}
        onClick={() => {
          if (pageFlowing + 1 === pageAmount) {
            setButtonNext(true);
          }
          setButtonLast(false);
          setPageFlowing(pageFlowing + 1);
        }}
        className={styles.paginationButton}
      >
        ⮕
      </button>
    </div>
  );
};

export default Pagination;
