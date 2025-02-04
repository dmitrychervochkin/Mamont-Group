import styled from 'styled-components';
import { Heading } from '../../../../../components';
import { findItem } from '../../../../../utils';
import { useSelector } from 'react-redux';
import { selectExercises, selectIsError } from '../../../../../reducers';

const ExercisesAdminHeaderContainer = ({
	className,
	isSearch,
	isLoading,
	currentType,
	searchingExercises,
	isAddNewExercise,
    setIsAddNewExercise,
    type,
}) => {
	const exercisesState = useSelector(selectExercises);
	const isError = useSelector(selectIsError);

	return (
		<div className={className}>
			<Heading>
				Упражнения{' '}
				{!isSearch &&
					!isLoading &&
					!currentType &&
					exercisesState.count !== 0 &&
					`(${exercisesState.count})`}
				{currentType && ` - ${type}`}
				{searchingExercises.length !== 0 && isSearch && `(${searchingExercises.length})`}
			</Heading>
			{!isAddNewExercise && !isError && (
				<div className="add-new-exercise-btn" onClick={() => setIsAddNewExercise(true)}>
					<Heading color="#3EB942">+</Heading>
					<Heading weight="400" size="20px" margin="7px 0 0 5px" color="#3EB942">
						NEW
					</Heading>
				</div>
			)}
		</div>
	);
};

export const ExercisesAdminHeader = styled(ExercisesAdminHeaderContainer)`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;
