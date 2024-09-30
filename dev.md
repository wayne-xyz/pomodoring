# Development documentation

## Version Description
- V1 TODO List
    - [X] One Button to start/stop
    - [X] Titile bar : LOGO, Pricing, Chart-AI,Account
    - [X] Play sound when timer is done
    - [X] Account login 
    - [ ] Dark/light mode
    - [ ] Saving data in the database
    - [ ] About page
    - [ ] Pricing page 
    - [ ] Devloping mode isolation strategy
    





## Development mode strategy
- Set the limit user email in the .env file 
    - When the user login, check the user email is in the allowed list
    - If not, prompt the user it's not public beta version
    - If yes, login success
    - set this email key in the vercel env
    - 

- Seting the development mode
    - Set the NEXT_PUBLIC_MODE_ENV=development in the vercel env
        - when in this mode , do the check the user email is in the allowed list

