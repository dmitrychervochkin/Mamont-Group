import styled from 'styled-components';

const FooterRightSideContainer = ({ className }) => {
	return (
		<div className={className}>
			<ul className="information-list">
				<li className="title">Информация</li>
				<li className="list">
					<a href="#">О компании</a>
				</li>
			</ul>
			<ul className="information-list">
				<li className="title">Служба поддержки</li>
				<li className="list">
					<a href="#">Telegram</a>
				</li>
				<li className="list">
					<a href="#">Вконтакте</a>
				</li>
				<li className="list">
					<a href="#">Написать на почту</a>
				</li>
			</ul>
		</div>
	);
};
export const FooterRightSide = styled(FooterRightSideContainer)`
	// width: 100%;
	font-size: 14px;
	display: flex;
	padding: 30px 60px;
	justify-content: space-between;

	.information-list {
		margin: 0px 40px;
	}
	.list {
		margin-top: 3px;
		font-size: 12px;
		filter: brightness(70%);
	}
`;
