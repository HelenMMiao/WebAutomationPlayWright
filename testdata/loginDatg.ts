interface ValidUser {
  username: string;
  password: string;
}

interface InvalidUser {
  username: string;
  password: string;
  errorMessage: string;
}

export const loginTestData: { validUsers: ValidUser[]; invalidUsers: InvalidUser [] } = 
{
  "validUsers": [
    {
      "username": "standard_user",
      "password": "secret_sauce",
    },
    {
      "username": "problem_user",
      "password": "secret_sauce",
    },
    {
      "username": "performance_glitch_user",
      "password": "secret_sauce",
    },
    {
      "username": "error_user",
      "password": "secret_sauce",
    },
    
  ],
  "invalidUsers": [
    {
      "username": "locked_out_user",
      "password": "secret_sauce", 
      "errorMessage": "Epic sadface: Sorry, this user has been locked out."
    },
    {
      "username": "wrong_user",
      "password": "secret_sauce",
      "errorMessage": "Epic sadface: Username and password do not match any user in this service"
    },
    {
      "username": "standard_user",
      "password": "wrong_password",
      "errorMessage": "Epic sadface: Username and password do not match any user in this service"
    },
    {
      "username": "wrong_user",
      "password": "wrong_password",
      "errorMessage": "Epic sadface: Username and password do not match any user in this service"
    },
    {
      "username": "",
      "password": "secret_sauce",
      "errorMessage": "Epic sadface: Username is required"
    },
    {
      "username": "standard_user",
      "password": "",
      "errorMessage": "Epic sadface: Password is required"
    },
    {
      "username": "",
      "password": "",
      "errorMessage": "Epic sadface: Username is required"
    }
  ]
}

