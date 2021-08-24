import React from "react";

import { useQuery } from "@apollo/client";
import { getAllProducts } from "../../graphql/requests";

import CardProduct from "../cardProducts/index";
import ListProduct from "../listProducts/index";
import ListSkeleton from "../listSkeleton/index";

export default function ExchangeRates({ mode }) {
    const { loading, error, data } = useQuery(getAllProducts);

    if (loading) {
        if (mode === "list") return <ListSkeleton />;
    }
    if (error) return <p>Error :(</p>;

    if (mode === "list") {
        return data.products.items.map((item) => <ListProduct item={item} />);
    }

    return data.products.items.map((item) => <CardProduct item={item} />);
}