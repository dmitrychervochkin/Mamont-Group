import styled from 'styled-components';

const LogoImgContainer = ({ className, name }) => {
	return (
		<div className={className}>
			<img className="img-logo" src={'/images/' + name} alt="logo" />
		</div>
	);
};

export const LogoImg = styled(LogoImgContainer)`
	display: flex;
	align-items: center;
	border-radius: 20px;
	width: 100%;
	height: 58px;
	width: 26%;
	margin-right: 33px;
	z-index: 6;
	transition: 0.3s;

	.img-logo {
		margin-top: 10px;
		height: 70px;
	}
	&:hover {
		cursor: pointer;
		transition: 0.3s;
		box-shadow: 0px 0px 50px -5px #3eb942;
	}
`;
