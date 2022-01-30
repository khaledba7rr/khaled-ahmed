import React, { Component } from "react";
import "./App.css";

import ProductDetailScreen from "./screens/product-details/product_detail_screen";
import ProductCardScreen from "./screens/product-card/product_card_screen";
import Navigation from "./components/navigation/navigation";
import ShoppingCartScreen from "./screens/shopping-cart/shopping-cart-screen";
import { dropdownClick, miniCartClick } from "./state-management/actions";
import { withGraphQLData } from "./components/with-data-hoc/with-data";
import { ALL, errorMessage, loadingMessage } from "./components/with-data-hoc/data-constants";

import { Route, Routes, Navigate } from "react-router-dom";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
	return {
		isDropdownOpen: state.handleClicks.isDropdownOpen,
		isMiniCartOpen: state.handleClicks.isMiniCartOpen,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		handleMiniCart: () => dispatch(miniCartClick()),
		handleDropdown: () => dispatch(dropdownClick()),
	};
};

class App extends Component {
	state = {
		currenctCategory: "all",
		products : [],
	};

	handleCategory = (category) => {
		this.setState({
			currenctCategory: category,
		});
	};

	render() {
		const { currenctCategory } = this.state;
		const {
			isMiniCartOpen,
			isDropdownOpen,
			handleDropdown,
			handleMiniCart,
			data,
			loading,
			error,
		} = this.props;

		const products = loading ? null : data.category.products;

		if (loading) return loadingMessage;

		if (error || !data) return errorMessage;

		return (
			<div className="App">
				<Navigation
					onClick={this.handleCategory}
					category={currenctCategory}
					products={products}
				/>
				<div className="content-container">
					<div
						className={`cart-overlay ${isMiniCartOpen ? "active" : null}`}
						onClick={isMiniCartOpen ? handleMiniCart : null}
					></div>
					<div
						className={`dropdown-overlay ${isDropdownOpen ? "active" : null}`}
						onClick={isDropdownOpen ? handleDropdown : null}
					></div>
					<Routes>
						<Route
							exact path="/"
							element={
								<div className="products-container">
									<ProductCardScreen getProducts={this.getProducts} category={currenctCategory} products={products} />
								</div>
							}
						/>

						<Route
							exact path="/products/:productID"
							element={<ProductDetailScreen />}
						/>

						<Route
							exact path="/cart"
							element={<ShoppingCartScreen products={products} />}
						/>

						<Route exact path="/home" element={<Navigate replace to="/" />} />
					</Routes>
				</div>
			</div>
		);
	}
}
export default connect(mapStateToProps,mapDispatchToProps)(withGraphQLData(App, ALL));
