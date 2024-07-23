import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import qs from "qs";
import { useNavigate } from "react-router-dom";

import Categories from "../Categories.tsx";
import Sort, { list } from "../Sort.tsx";
import PizzaBlock from "../PizzaBlock/PizzaBlock.tsx";
import Skeleton from "../PizzaBlock/Skeleton.tsx";
import Pagination from "../pagination/Pagination.tsx";
import { setCategoryid, setFilter } from "../../redux/slices/filterSlices.ts";
import { fetchPizzas } from "../../redux/slices/pizzaSlices.ts";
import { RootStateType, useAppDispatch } from "../../redux/store.ts";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { categoryId, sortType } = useSelector(
    (state: RootStateType) => state.filter
  );
  const { items, status } = useSelector((state: RootStateType) => state.pizzas);

  const { searchValue } = useSelector((state: RootStateType) => state.pizzas),
    getPizzas = async () => {
      const sortDesc = sortType.sortProperty.includes("-");
      const sortRes = sortType.sortProperty.replace("-", "");
      const resPagination: any = await axios.get(
        `https://6619207f9a41b1b3dfbef348.mockapi.io/items?${
          categoryId > 0 ? `category=${categoryId}` : ""
        }&sortBy=${sortRes}&order=${sortDesc ? "desc" : "ask"}`
      );
      setPageAmount(Math.ceil(resPagination.data.length / 4));

      dispatch(fetchPizzas({ pageFlowing, categoryId, sortRes, sortDesc }));
    },
    isSearch = useRef(false),
    isMounted = useRef(false);

  const [pageAmount, setPageAmount] = useState<number>(Number),
    [pageFlowing, setPageFlowing] = useState(1);

  useEffect(() => {
    if (window.location.search) {
      const params: any = qs.parse(window.location.search.substring(1));
      console.log(params);

      const sort = list.find(
        (obj: any) => obj.sortProperty === params.sortProperty.sortProperty
      );
      dispatch(
        setFilter({
          ...params,
          sort,
        })
      );
      isSearch.current = true;
    }
  }, []);

  React.useEffect(() => {
    if (!isSearch.current) {
      getPizzas();
    }
    isSearch.current = false;
    window.scrollTo(0, 0);
  }, [categoryId, sortType, pageFlowing]);

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sortType,
        categoryId,
        pageFlowing,
      });

      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sortType, pageFlowing]);

  const pizzas = items
      .filter((obj) => {
        if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
          return true;
        } else {
          return false;
        }
      })
      .map((obj) => {
        return <PizzaBlock key={obj.id} {...obj} />;
      }),
    skeleton = [...new Array(10)].map((_, index) => {
      return <Skeleton key={index} />;
    });

  const onChangeCategory = useCallback(
    (id) => {
      dispatch(setCategoryid(id));
    },
    [dispatch]
  );

  return (
    <>
      <div className="content__top">
        <Categories
          categoryId={categoryId}
          onClickCategoriy={onChangeCategory}
        />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {status === "loading" ? skeleton : pizzas}
      </div>
      <Pagination
        pageAmount={pageAmount}
        pageFlowing={pageFlowing}
        setPageFlowing={setPageFlowing}
      />
    </>
  );
};

export default Home;
