# Firebase data structure 


## User Collection
| Field                 | Type      | Description                                                    |
----------------------|-----------|----------------------------------------------------------------|
 userId               | string    | Unique identifier for the user                                  |
 email                | string    | User's email address                                           |
 displayName          | string    | User's display name                                            |
 userType             | string    | User subscription type ('unpaid', 'annual', 'lifetime')       |
 subscriptionStartDate| timestamp | Date when the subscription started                             |
 subscriptionEndDate  | timestamp | Date when the subscription ends                                |
 trialEndDate        | timestamp | End date for trial period (3 months for lifetime users)        |
 isTrial             | boolean   | Indicates if user is in trial period                           |
 createdAt           | timestamp | Date when the user account was created                         |
 updatedAt           | timestamp | Date when the user account was last updated                    |
 lastLogin           | timestamp | Date of user's last login                                      |


## Session Collection
| Field       | Type      | Description                                                    |
-------------|-----------|----------------------------------------------------------------|
 userId      | string    | ID of the user who owns the session                            |
 taskId      | string    | ID of the associated task                                      |
 taskName    | string    | Name of the associated task                                    |
 projectId   | string    | ID of the associated project                                   |
 projectName | string    | Name of the associated project                                 |
 startTime   | timestamp | Start time of the Pomodoro session                             |
 endTime     | timestamp | End time of the Pomodoro session                               |
 duration    | number    | Duration of the session in minutes (default: 25)               |
 status      | string    | Status of the session (e.g., 'completed')                      |
 createdAt   | timestamp | Date when the session record was created                       |


 ## Task Collection
| Field          | Type      | Description                                                          |
----------------|-----------|----------------------------------------------------------------------|
 taskId         | string    | Unique identifier for the task                                       |
 userId         | string    | ID of the user who owns the task                                     |
 projectId      | string    | ID of the project this task belongs to                              |
 taskName      | string    | Title/name of the task                                              |
 description    | string    | Detailed description of the task                                     |
 status         | string    | Current status ('todo', 'in-progress', 'completed', 'archived')      |
 priority       | number    | Task priority level (1: High, 2: Medium, 3: Low)                     |
 estimatedPoms  | number    | Estimated number of Pomodoros needed                                 |
 completedPoms  | number    | Number of completed Pomodoros                                        |
 dueDate        | timestamp | Due date for the task                                               |
 tags           | array     | Array of tags/labels associated with the task                       |
 createdAt      | timestamp | Date when the task was created                                      |
 updatedAt      | timestamp | Date when the task was last updated                                 |
 completedAt    | timestamp | Date when the task was completed                                    |


 ## Project Collection
| Field          | Type      | Description                                                          |
----------------|-----------|----------------------------------------------------------------------|
 projectId      | string    | Unique identifier for the project                                    |
 userId         | string    | ID of the user who owns the project                                  |
 name           | string    | Name/title of the project                                            |
 description    | string    | Detailed description of the project                                  |
 status         | string    | Current status ('active', 'completed', 'archived', 'on-hold')        |
 color          | string    | Color code for project visualization (hex or name)                   |
 isDefault      | boolean   | Indicates if this is the default project for new tasks              |
 totalTasks     | number    | Total number of tasks in the project                                 |
 completedTasks | number    | Number of completed tasks                                            |
 totalPoms      | number    | Total number of Pomodoros logged for this project                   |
 dueDate        | timestamp | Due date for the project                                            |
 tags           | array     | Array of tags/labels associated with the project                    |
 createdAt      | timestamp | Date when the project was created                                   |
 updatedAt      | timestamp | Date when the project was last updated                              |
 completedAt    | timestamp | Date when the project was completed                                 |


 