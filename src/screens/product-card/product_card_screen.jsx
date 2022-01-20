import React, { Component } from "react";

import "./product-card.css";

import { withGraphQLData } from "../../components/with-data-hoc/with-data";
import { PRODUCTS, errorMessage, loadingMessage } from "../../components/with-data-hoc/data-constants";
import ProductCard from "../../components/product-card/product-card";

import { connect } from "react-redux";

const mapStateToProps = (state) => {
	return {
		currentCurrency: state.setCurrentCurrency.currentCurrency,
	};
};

class ProductCardScreen extends Component {
	
	renderProducts = (products, currentCurrency) => {
		return products.map((product, index) => {
			return (
				<ProductCard
					key={index}
					id={product.id}
					name={product.name}
					url={product.gallery[0]}
					inStock={product.inStock}
					brand={product.brand}
					attributes={product.attributes}
					product={product}
					price={
						product.prices.filter(
							(item) => item.currency.symbol === currentCurrency
						)[0]
					}
				/>
			);
		});
	};

	render() {
		const {loading, error} = this.props;
		const products = loading ? [] : this.props.data.category.products;

		if (loading) return loadingMessage;

		if (error || !products) return errorMessage;

		if (products.length === 0)
			return <div className="loading"> Oops ! looks like store is empty !</div>;

		return (
			<React.Fragment>
				{this.renderProducts(products, this.props.currentCurrency)}
			</React.Fragment>
		);
	}
}
export default connect(mapStateToProps)(withGraphQLData(ProductCardScreen,PRODUCTS));
