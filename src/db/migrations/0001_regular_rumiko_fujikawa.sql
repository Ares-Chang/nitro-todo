CREATE TABLE `user_credentials` (
	`user_id` varchar(21) NOT NULL,
	`email` varchar(255) NOT NULL,
	`password` varchar(255) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `user_credentials_user_id` PRIMARY KEY(`user_id`)
);
--> statement-breakpoint
CREATE TABLE `user_profiles` (
	`id` varchar(21) NOT NULL,
	`name` varchar(255) NOT NULL,
	`avatar` varchar(255),
	`bio` text,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `user_profiles_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
DROP TABLE `users`;--> statement-breakpoint
ALTER TABLE `todos` MODIFY COLUMN `group_id` int;--> statement-breakpoint
ALTER TABLE `todos` ADD `completed_at` timestamp;--> statement-breakpoint
ALTER TABLE `user_credentials` ADD CONSTRAINT `user_credentials_user_id_user_profiles_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user_profiles`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX `userIdIdx` ON `user_credentials` (`user_id`);--> statement-breakpoint
CREATE INDEX `id_idx` ON `user_profiles` (`id`);