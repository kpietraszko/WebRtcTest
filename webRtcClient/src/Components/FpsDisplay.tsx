import React, { FC, useContext } from "react";
import { FpsContext } from "../contexts";
import { style } from "typestyle";
import { em, px } from "csx";

const fpsStyle = style({
	fontSize: em(0.8),
	position: "absolute",
	top: px(10),
	left: px(10),
	color: "white"
});

const FpsDisplay : FC = () => {
	var fps = useContext(FpsContext);
	return (
		<div className={fpsStyle}>{fps.toFixed()} fps</div>
	)
}

export default FpsDisplay;