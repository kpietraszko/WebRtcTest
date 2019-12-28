import React, { FC, useContext } from "react";
import { style } from "typestyle";
import { em, px } from "csx";
import { useGlobal } from "reactn";
import GlobalState from "../GlobalState";

const fpsStyle = style({
	fontSize: em(0.8),
	position: "absolute",
	top: px(10),
	left: px(10),
	color: "white"
});

const FpsDisplay : FC = () => {
	const [ global, setGlobal ] = useGlobal<GlobalState>();
	var fps = global.fps;
	return (
		<div className={fpsStyle}>{fps.toFixed()} fps</div>
	)
}

export default FpsDisplay;