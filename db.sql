ALTER USER postgres PASSWORD 'todoapp';

CREATE TABLE groups(
	id SERIAL PRIMARY KEY,
	name VARCHAR(50)
);

CREATE TABLE items(
	id SERIAL PRIMARY KEY,
	description VARCHAR(500),
	checked BOOLEAN,
	group_id SERIAL
);

