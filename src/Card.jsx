import * as React from "react";
import _ from "lodash";
import { SIZE } from "./Square";

function makeRotationFor(i) {
	if (i % 2 == 1)
		i--;
	return `rotate(${45 * i} 0.5 0.5)`;
}

function makePathFor(i) {
	if (i % 2 == 0)
		return 'M 0.9 0.5 l 0.1 0.1 l 0 -0.2 z';
	return 'M 0.88 0 l 0.12 0.12 l 0 -0.12 z';
}

export default (props) => (
	<div style={{
		width: "100%",
		height: "100%",
		position: 'relative',
		display: 'flex',
		flexFlow: 'column nowrap',
		alignItems: 'center',
		justifyContent: 'center',
		background: props.isFriendly ? '#88a' : '#a88',
	}}>
		<div style={{
			fontSize: '160%',
		}}>
			<span style={{
				textShadow: '0px 0px 2px black',
			}}>{props.pow}</span>
				&nbsp;/&nbsp;
			<span style={{
				textShadow: '0px 0px 2px black',
			}}>{props.tuf}</span>
		</div>

		<svg style={{
			width: '100%',
			height: '100%',
			position: 'absolute',
			left: 0,
			top: 0,
		}}>
			{_.range(8).map((i) =>
				/* Hard-coded distances. */
				props.arrows[i] &&
				<g transform={`scale(${SIZE} ${SIZE})`}>
					<g transform={makeRotationFor(i)}>
						<path
							d={makePathFor(i)}
							stroke='black'
							strokeWidth='0.03'
							fill='solid'
							strokeLinejoin='round'
						/>
					</g>
				</g>
			)}
		</svg>
	</div>
);

