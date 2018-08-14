import React from 'react';
import './styles/footer.css';

export default function Footer() {
	return (
		<footer role="contentinfo" className="footer-style">
			<p>Made by the MERNtalists™</p>
			<ul>
        <li>
          <a href="https://github.com/mdargitz" title="Marina Dargitz Github">Marina Dargitz</a>
					<i className="fa fa-github" aria-hidden="true"></i>
        </li>

				<li>
          <a href="https://github.com/csprier" title="Cameron Prier Github">Cameron Prier</a>
					<i className="fa fa-github" aria-hidden="true"></i>
        </li>

				<li>
					<a href="https://github.com/valsakel" title="Marina Valiquette Github">Marina Valiquette</a>
					<i className="fa fa-github" aria-hidden="true"></i>
				</li>

        <li>
          <a href="https://github.com/patersog" title="Gianluca Paterson Github">Gianluca Paterson</a>
					<i className="fa fa-github" aria-hidden="true"></i>
        </li>
			</ul>
		</footer>
	);
}