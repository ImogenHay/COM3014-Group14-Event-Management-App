# COM3014-Group14-Event-Management-App
## Description
Event Management Application for Advanced Challenges In Web Development Coursework. Applies cloud native software development practises.

Split into 4 micro-services and a micro-frontend.

 [Authentication Microservice Overview](./Auth-service/README.md)

 [Event Management Microservice Overview](./Event-Management-Service/README.md)

 [Ticketing Microservice Overview](./Ticketing-service/README.md)

 [Payment Microservice Overview](./Payment-service/README.md)

 [Front End Overview](./Interface-Service/README.md)
 
## .env files where left in the repository for the purpose of the project so everyone can run the services without conflicts or extra steps.

## How to run

The application has only one dependancy required for someone to be able to run it, that is docker.
Once docker is downloaded the with the run of the following command, all services along with the front end will run.

`docker compose up`

a url to the Interface for a local run will be provided through the terminal.

## How to clone the Repository locally

### Using HTTP

1. First, click the "Code" button in the top-right corner of the repository page.

2. Click the "HTTPS" tab to switch to the HTTPS URL.

3. Copy the HTTPS URL provided.

4. Open your terminal or command prompt.

5. Navigate to the directory where you want to clone the repository using the cd command.

6. Once you're in the desired directory, use the `git clone` command followed by the HTTPS URL you copied earlier. For example:

`git clone https://github.com/username/repository.git`, replace url with the one you copied.

7. Hit enter and the repository will be cloned to your local machine.

### Using SSH

1. First, you'll need to set up an SSH key with GitHub if you haven't already. You can follow [these instructions](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent) to do so.

2. Once you have your SSH key set up you are ready to clone this repository.

3. Click the "Code" button in the top-right corner of the repository page.

4. Click the "SSH" tab to switch to the SSH URL.

5. Copy the SSH URL provided.

6. Open your terminal or command prompt.

7. Navigate to the directory where you want to clone the repository using the cd command.

8. Once you're in the desired directory, use the `git clone` command followed by the SSH URL you copied earlier. For example:

`git clone git@github.com:username/repository.git`

9. Hit enter and the repository will be cloned to your local machine.
