import React, { Component } from "react";

import caretDown from "./caret-down.png";
import caretUp from "./caret-up.png";
import "./dropdownMenu.css";

import {dropdownClick, setCurrency, miniCartClick} from "../../state-management/actions";
import { withGraphQLData } from "../with-data-hoc/with-data";
import { CURRENCIES, errorMessage, loadingMessage } from "../with-data-hoc/data-constants";

import { connect } from "react-redux";

const mapDispatchToProps = (dispatch) => {
	return {
		changeCurrecy: (text) => dispatch(setCurrency(text)),
		handleMiniCart: () => dispatch(miniCartClick()),
		handleDropdown: () => dispatch(dropdownClick()),
	};
};

const mapStateToProps = (state) => {
	return {
		isMiniCartOpen: state.handleClicks.isMiniCartOpen,
		isDropdownOpen: state.handleClicks.isDropdownOpen,
	};
};

class DropdownMenu extends Component {

	renderCurrencies = (currencies) => {
		return currencies.map((currency, i) => {
			return (
				<span
					key={i}
					onClick={() => {
						this.props.changeCurrecy(currency.symbol);
						this.props.handleDropdown();
					}}
				>
					{currency.symbol + currency.label}
				</span>
			);
		});
	};

	miniCartClose = () => {
		if (this.props.isMiniCartOpen) {
			this.props.handleMiniCart();
		}
	};

	render() {
		const { loading , error, isDropdownOpen, handleDropdown } = this.props;
		const { currencies } = loading ? [] : this.props.data;

		
		if (loading) return loadingMessage;

		if (error || !currencies) return errorMessage;

		return (
			<div className="dropdown">
				<button
					onClick={() => {handleDropdown(); this.miniCartClose();}}
					className="dropbtn"
				>
					<img
						src={isDropdownOpen ? caretUp : caretDown}
						alt="cart"
						height="15px"
					/>
				</button>
				<div className={`dropdown-content ${isDropdownOpen ? "active" : null}`}>
					{this.renderCurrencies(currencies)}
				</div>
			</div>
		);
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(withGraphQLData(DropdownMenu,CURRENCIES));
