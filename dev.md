# Development documentation

## Version Description
- V1 TODO List
    - [X] One Button to start/stop
    - [X] Titile bar : LOGO, Pricing, Chart-AI,Account
    - [X] Play sound when timer is done
    - [X] Account login 
    - [X] Dark/light mode
    - [X] Saving data in the database
    - [X] About page
    - [X] Pricing page 
    - [X] Devloping mode isolation strategy
    - [X] Task combobox / task list
    - [ ] Agent to generate the graph of the analysis





## Development mode strategy
- task list and session stergy 
    - when the session end, update the session info with the current taskid and projectid

- firestore storage strategy
    - start session, -> update the states collection,
    - end session, -> update the states collection, add a new session record
    - signup, -> create a new user, creat a default task  




- Set the limit user email in the .env file 
    - When the user login, check the user email is in the allowed list
    - If not, prompt the user it's not public beta version
    - If yes, login success
    - set this email key in the vercel env
    - 

- Seting the development mode
    - Set the NEXT_PUBLIC_MODE_ENV=development in the vercel env
        - when in this mode , do the check the user email is in the allowed list

