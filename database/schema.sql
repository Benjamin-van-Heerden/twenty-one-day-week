-- using mysql syntax
CREATE TABLE twenty_one_user (
    password VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    PRIMARY KEY (user_email)
);

-- insert into twenty_one_user (password, user_email, first_name, last_name) values ('password', 'email', 'first', 'last');

CREATE TABLE twenty_one_goal (
    goal_id BIGINT NOT NULL AUTO_INCREMENT,
    user_email BIGINT NOT NULL,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    goal_type ENUM('major', 'minor') NOT NULL,
    schedule VARCHAR(255) NOT NULL,


    PRIMARY KEY (goal_id)
);

CREATE TABLE twenty_one_completed_goal (
    user_email BIGINT NOT NULL,
    goal_id BIGINT NOT NULL,
    date DATE NOT NULL,
    PRIMARY KEY (user_email, goal_id, date)
);



