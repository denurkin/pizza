import React from "react";

const Categories: React.FC<{
  categoryId: number;
  onClickCategoriy: (index: number) => void;
}> = React.memo(({ categoryId, onClickCategoriy }) => {
  const categories = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

  return (
    <div className="categories">
      <ul>
        {categories.map((el, index) => {
          return (
            <li
              onClick={() => onClickCategoriy(index)}
              className={categoryId === index ? "active" : ""}
              key={index}
            >
              {el}
            </li>
          );
        })}
      </ul>
    </div>
  );
});

export default Categories;
