const sequelize = require('../db');
const { DataTypes, Sequelize } = require('sequelize');

const Users = sequelize.define(
	'users',
	{
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		login: { type: DataTypes.STRING, allowNull: false },
		email: { type: DataTypes.STRING, allowNull: false },
		password: { type: DataTypes.STRING, allowNull: false },
	},
	{
		timestamps: true,
		updatedAt: false,
		createdAt: 'created_at',
	},
);

const UserInfo = sequelize.define(
	'user_info',
	{
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		date: { type: DataTypes.DATE, allowNull: false },
		weight: { type: DataTypes.INTEGER },
		height: { type: DataTypes.INTEGER },
	},
	{
		timestamps: false,
	},
);

const Roles = sequelize.define(
	'roles',
	{
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		name: { type: DataTypes.STRING, unique: true, allowNull: false },
	},
	{
		timestamps: false,
	},
);

const Types = sequelize.define(
	'types',
	{
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		name: { type: DataTypes.STRING, unique: true, allowNull: false },
	},
	{
		timestamps: false,
	},
);

const Workout = sequelize.define(
	'workout',
	{
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		name: { type: DataTypes.STRING, allowNull: false },
		time: { type: DataTypes.STRING, allowNull: false },
		date: { type: DataTypes.STRING, allowNull: false },
	},
	{
		timestamps: false,
	},
);

const WorkoutExercises = sequelize.define(
	'workout_exercises',
	{
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		set: { type: DataTypes.INTEGER, allowNull: false },
		reps: { type: DataTypes.INTEGER, allowNull: false },
		weight: { type: DataTypes.INTEGER, allowNull: false },
	},
	{
		timestamps: false,
	},
);

const UserExercises = sequelize.define(
	'user_exercises',
	{
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		name: { type: DataTypes.STRING, allowNull: false },
		super_set: { type: DataTypes.STRING, allowNull: true },
	},
	{
		timestamps: false,
	},
);

const Exercises = sequelize.define(
	'exercises',
	{
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		name: { type: DataTypes.STRING, allowNull: false },
		discription: { type: DataTypes.STRING }, // allowNull: false
	},
	{
		timestamps: false,
	},
);

const ExerciseInfo = sequelize.define(
	'exercise_info',
	{
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		discription: { type: DataTypes.STRING, allowNull: false },
		type: { type: DataTypes.STRING, allowNull: false },
	},
	{
		timestamps: false,
	},
);

const Pattern = sequelize.define(
	'pattern',
	{
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		name: { type: DataTypes.STRING, allowNull: false },
		discription: { type: DataTypes.STRING, allowNull: true },
	},
	{
		timestamps: false,
	},
);
const PatternWorkoutExercises = sequelize.define(
	'pattern_workout_exercises',
	{
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		set: { type: DataTypes.INTEGER, allowNull: false },
		reps: { type: DataTypes.INTEGER, allowNull: false },
		weight: { type: DataTypes.INTEGER, allowNull: false },
	},
	{
		timestamps: false,
	},
);
const PatternExercises = sequelize.define(
	'pattern_exercises',
	{
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		name: { type: DataTypes.STRING, allowNull: false },
		super_set: { type: DataTypes.STRING, allowNull: true },
	},
	{
		timestamps: false,
	},
);

const UserPattern = sequelize.define(
	'user_pattern',
	{
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		date: { type: DataTypes.STRING, allowNull: false },
	},
	{
		timestamps: false,
	},
);

const CalendarEvents = sequelize.define(
	'calendar_events',
	{
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		name: { type: DataTypes.STRING, allowNull: true },
		date: { type: DataTypes.STRING, allowNull: false },
		complexity: { type: DataTypes.STRING, allowNull: false },
	},
	{
		timestamps: false,
	},
);

const CalendarTypeEvents = sequelize.define(
	'calendar_type_events',
	{
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	},
	{
		timestamps: false,
	},
);

Roles.hasMany(Users, {
	foreignKey: { name: 'role_id' },
});
Users.belongsTo(Roles, {
	foreignKey: { name: 'role_id' },
});

Users.hasMany(Workout, { foreignKey: { name: 'user_id' } });
Workout.belongsTo(Users, { foreignKey: { name: 'user_id' } });

Users.hasMany(UserInfo, { foreignKey: { name: 'user_id' } });
UserInfo.belongsTo(Users, { foreignKey: { name: 'user_id' } });

Users.hasMany(UserPattern, { foreignKey: { name: 'user_id' } });
UserPattern.belongsTo(Users, { foreignKey: { name: 'user_id' } });

Workout.hasMany(WorkoutExercises, { foreignKey: { name: 'workout_id' } });
WorkoutExercises.belongsTo(Workout, { foreignKey: { name: 'workout_id' } });

Workout.hasMany(UserExercises, { foreignKey: { name: 'workout_id' } });
UserExercises.belongsTo(Workout, { foreignKey: { name: 'workout_id' } });

Exercises.hasMany(WorkoutExercises, { foreignKey: { name: 'exercise_id' } });
WorkoutExercises.belongsTo(Exercises, { foreignKey: { name: 'exercise_id' } });

UserExercises.hasMany(WorkoutExercises, { foreignKey: { name: 'user_exercise_id' } });
WorkoutExercises.belongsTo(UserExercises, { foreignKey: { name: 'user_exercise_id' } });

Exercises.hasMany(UserExercises, { foreignKey: { name: 'exercise_id' } });
UserExercises.belongsTo(Exercises, { foreignKey: { name: 'exercise_id' } });

Exercises.hasMany(ExerciseInfo, { foreignKey: { name: 'exercise_id' } });
ExerciseInfo.belongsTo(Exercises, { foreignKey: { name: 'exercise_id' } });

Users.hasMany(Exercises, { foreignKey: { name: 'user_id' } });
Exercises.belongsTo(Users, { foreignKey: { name: 'user_id' } });

Types.hasMany(Exercises, { foreignKey: { name: 'type_id' } });
Exercises.belongsTo(Types, { foreignKey: { name: 'type_id' } });

Types.hasMany(CalendarTypeEvents, { foreignKey: { name: 'type_id' } });
CalendarTypeEvents.belongsTo(Types, { foreignKey: { name: 'type_id' } });

Types.hasMany(PatternExercises, { foreignKey: { name: 'type_id' } });
PatternExercises.belongsTo(Types, { foreignKey: { name: 'type_id' } });

Types.hasMany(UserExercises, { foreignKey: { name: 'type_id' } });
UserExercises.belongsTo(Types, { foreignKey: { name: 'type_id' } });

Pattern.hasMany(UserPattern, { foreignKey: { name: 'pattern_id' } });
UserPattern.belongsTo(Pattern, { foreignKey: { name: 'pattern_id' } });

Pattern.hasMany(PatternExercises, { foreignKey: { name: 'pattern_id' } });
PatternExercises.belongsTo(Pattern, { foreignKey: { name: 'pattern_id' } });

Pattern.hasMany(CalendarEvents, { foreignKey: { name: 'pattern_id' } });
CalendarEvents.belongsTo(Pattern, { foreignKey: { name: 'pattern_id' } });

PatternExercises.hasMany(PatternWorkoutExercises, { foreignKey: { name: 'pattern_exercise_id' } });
PatternWorkoutExercises.belongsTo(PatternExercises, { foreignKey: { name: 'pattern_exercise_id' } });

Pattern.hasMany(PatternWorkoutExercises, { foreignKey: { name: 'pattern_id' } });
PatternWorkoutExercises.belongsTo(Pattern, { foreignKey: { name: 'pattern_id' } });

Exercises.hasMany(PatternExercises, { foreignKey: { name: 'exercise_id' } });
PatternExercises.belongsTo(Exercises, { foreignKey: { name: 'exercise_id' } });

Exercises.hasMany(PatternWorkoutExercises, { foreignKey: { name: 'exercise_id' } });
PatternWorkoutExercises.belongsTo(Exercises, { foreignKey: { name: 'exercise_id' } });

CalendarEvents.hasMany(CalendarTypeEvents, { foreignKey: { name: 'calendar_event_id' } });
CalendarTypeEvents.belongsTo(CalendarEvents, { foreignKey: { name: 'calendar_event_id' } });

module.exports = {
	Users,
	UserInfo,
	Workout,
	WorkoutExercises,
	Types,
	Roles,
	Exercises,
	ExerciseInfo,
	Pattern,
	PatternWorkoutExercises,
	PatternExercises,
	UserPattern,
	UserExercises,
	CalendarEvents,
	CalendarTypeEvents,
};
