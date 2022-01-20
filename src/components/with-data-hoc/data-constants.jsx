import { gql } from "@apollo/client";

export const PRODUCTS = "PRODUCTS";

export const PRODUCT_DETAIL = "PRODUCT_DETAIL";

export const CURRENCIES = "CURRENCIES";

export const CATEGORIES = "CATEGORIES";

export const ALL = "ALL";

/*product-card-screen data */
export const PRODUCTS_DATA = gql`
	query category($category: String!) {
		category(input: { title: $category }) {
			name
			products {
				name
				brand
				id
				gallery
				inStock
				attributes {
					name
					type
					items {
						value
					}
				}
				prices {
					currency {
						label
						symbol
					}
					amount
				}
			}
		}
	}
`;

/*product-detail-screen data */
export const DETAILS_DATA = gql`
	query product($id: String!) {
		product(id: $id) {
			name
			id
			inStock
			gallery
			description
			brand
			attributes {
				name
				type
				items {
					value
				}
			}
			prices {
				currency {
					label
					symbol
				}
				amount
			}
		}
	}
`;

/*category names data */
export const CURRENCIES_DATA = gql`
	{
		currencies {
			label
			symbol
		}
	}
`;

/*category names data */
export const CATEGORIES_NAMES = gql`
	{
		categories {
			name
		}
	}
`;

export const ALL_DATA = gql`
	{
		category {
			products {
				id
				name
				inStock
				gallery
				brand
				prices {
					currency {
						label
						symbol
					}
					amount
				}
			}
		}
	}
`;

export const errorMessage = (
	<div className="loading">Error!..., please try again later</div>
);

export const loadingMessage = <div className="loading">Loading...</div>;

export const addToCartMessage = "Added to cart !";
export const quantityIncMessage = "Quantity increased !";

export const sortObject = (obj) => Object.keys(obj).sort().reduce((prev,curr) => (prev[curr] = obj[curr], prev), {});