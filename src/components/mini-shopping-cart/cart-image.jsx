import React, { Component } from "react";

class CartImage extends Component {
	state = {
		currentIndex: 0,
	};

	changePhoto = (order, galleryLength) => {
		const currentIndex = this.state.currentIndex;
		if (order === "left" && currentIndex !== 0) {
			this.setState({ currentIndex: currentIndex - 1 });
		}
		if (order === "right") {
			if (currentIndex === galleryLength - 1) {
				return;
			}
			this.setState({ currentIndex: currentIndex + 1 });
		}
	};

	photoWithArrowsOrNot = (product) => {
		if (product.gallery.length === 1) {
			return null;
		} else {
			return (
				<div className="images-route">
					<button onClick={() => this.changePhoto("left")}>{`<`}</button>
					<button
						onClick={() => this.changePhoto("right", product.gallery.length)}
					>
						{`>`}
					</button>
				</div>
			);
		}
	};

	render() {
		const { product } = this.props;
		const { isMini } = this.props;
		return (
			<div className={`${isMini ? "mini-cart-image" : "main-cart-image"}`}>
				<img
					alt="product"
					src={
						isMini
							? product.gallery[0]
							: product.gallery[this.state.currentIndex]
					}
				/>
				{!isMini ? this.photoWithArrowsOrNot(product) : null}
			</div>
		);
	}
}

export default CartImage;
