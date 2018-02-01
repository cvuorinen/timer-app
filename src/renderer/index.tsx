import { h, render } from 'preact';
import "./global.scss";

render((
	<div id="foo">
		<div>Hello, world!</div>
		<button class="btn btn-primary" onClick={ e => alert("hi!") }>Click Me</button>
	</div>
), document.body);
