import React, { Component } from "react";

import "./product-card.css";

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
		const { category, products } = this.props;

		let filterdProd =
			category === "all"
				? products
				: products.filter((product) => product.category === category);

		if (filterdProd.length === 0)
			return <div className="loading"> Oops ! looks like store is empty !</div>;

		return (
			<React.Fragment>
				<h1 className="category-name">{category} Category</h1>
				{this.renderProducts(filterdProd, this.props.currentCurrency)}
			</React.Fragment>
		);
	}
}
export default connect(mapStateToProps)(ProductCardScreen);
