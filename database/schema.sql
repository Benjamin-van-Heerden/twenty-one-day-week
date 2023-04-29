-- using mysql syntax
CREATE TABLE twenty_one_user (
    user_id BIGINT NOT NULL AUTO_INCREMENT,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    PRIMARY KEY (user_id)
);

CREATE TABLE twenty_one_goal (
    goal_id BIGINT NOT NULL AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    goal_type ENUM('major', 'minor') NOT NULL,
    schedule VARCHAR(255) NOT NULL,


    PRIMARY KEY (goal_id)
);

CREATE TABLE twenty_one_completed_goal (
    completed_goal_id BIGINT NOT NULL AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    goal_id BIGINT NOT NULL,
    date DATE NOT NULL,
    PRIMARY KEY (completed_goal_id)
);



