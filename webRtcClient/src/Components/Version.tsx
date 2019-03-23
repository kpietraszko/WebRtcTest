import { FC } from "react";
import preval from 'preval.macro';

const Version: FC = () => {
	return (
		<footer>
			Build date: {preval`module.exports = new Date().toLocaleString();`}.
		</footer>
	);
}

export default Version;