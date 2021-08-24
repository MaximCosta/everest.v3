import { gql } from "@apollo/client";

export const getAllCollections = gql`
    query SearchProducts {
        collections(options: { sort: { id: ASC } }) {
            totalItems
            items {
                id
                name
                slug
                breadcrumbs {
                    id
                    name
                }
            }
        }
    }
`;

export const getAllProducts = gql`
    query SearchProducts {
        products(options: { sort: { name: ASC } }) {
            totalItems
            items {
                id
                name
                description
                slug
                collections {
                    id
                    name
                }
                assets {
                    name
                    source
                    preview
                }
                variants {
                    id
                    name
                    price
                }
            }
        }
    }
`;