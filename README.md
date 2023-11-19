# etn-setup: an Express EJS Tailwind Nodemon easy project setup

A package to automate the setup of Express.js projects with Tailwind CSS, Nodemon, and EJS. The application is configured and promptly launched on localhost:3000 with Nodemon enabled.

## Installation

Make sure you have Node.js and npm installed. Then run:

```bash
npm install -g etn-setup
```

## Usage

To create a new project, run:

```bash
etn-setup project-name
```

This will install the necessary dependencies and set up a folder with the project name and default configurations.

## Issues

This package works in a Windows environment.

If you are using cmd, there should be no issues.

When using PowerShell with the command `etn-setup project-name`, if you don't have the necessary permissions as an administrator, it won't work.
To resolve this, copy and paste the following command into PowerShell:

```powershell
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser -Force
```

Now run the `etn-setup project-name` command again.

