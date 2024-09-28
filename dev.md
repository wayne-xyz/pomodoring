# Development documentation

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

