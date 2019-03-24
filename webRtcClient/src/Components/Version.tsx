import React, { FC } from "react";
import preval from 'preval.macro';
import { style } from "typestyle";
import { px, em } from "csx";

const footerStyle = style({
	fontSize: em(0.8),
	position: "absolute",
	bottom: px(10),
	left: px(10),
	color: "white",
	mixBlendMode: "difference"
});
const Version: FC = () => {
	return (
		<footer className={footerStyle}>
			Build date: {preval`module.exports = new Date().toLocaleString();`}.
		</footer>
	);
}

export default React.memo(Version, () => true);