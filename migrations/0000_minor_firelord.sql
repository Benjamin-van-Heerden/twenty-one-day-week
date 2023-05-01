CREATE TABLE `twenty_one_completed_goal` (
	`id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`goal_id` varchar(255),
	`completed_date` date,
	`user_email` varchar(255)
);
--> statement-breakpoint
CREATE TABLE `twenty_one_goal` (
	`id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`user_email` varchar(255),
	`description` varchar(255),
	`schedule` varchar(255)
);
--> statement-breakpoint
CREATE TABLE `twenty_one_user` (
	`user_email` varchar(255) PRIMARY KEY NOT NULL,
	`first_name` varchar(255),
	`last_name` varchar(255),
	`password` varchar(255)
);
