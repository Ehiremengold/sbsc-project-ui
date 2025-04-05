# SBSC Workspace Project

### Images
![Join community](/product-images/1.png)
![Collabrate](/product-images/2.png)

## Project Overview
This is a monorepo project using Nx workspace, featuring both Angular and React applications, used to build a collaborative real-time editing tool

## Prerequisites
- Node.js (v18 or later)
- npm (v9 or later)

## Project Structure
- `angularapp/`: Angular application
- `reactapp/`: React application
- `angularapp-e2e/`: End-to-end tests for Angular app
- `reactapp-e2e/`: End-to-end tests for React app

## Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/sbsc-workspace.git
cd sbsc-workspace
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Running Applications (All Three Should be Running)

#### Angular Application
```bash
npx nx serve angularapp  # Serve Angular app
npx nx test angularapp   # Run Angular tests
```

#### React Application
```bash
npx nx serve reactapp    # Serve React app
npx nx test reactapp     # Run React tests
```

## Socket Server
```bash
cd angularapp
node ws-server.js

## Development Tools
- Nx Workspace for monorepo management
- Angular v18
- React v18.3
- Jest for testing
- Cypress for E2E testing
- ESLint for linting
- Prettier for code formatting

## Key Dependencies
- React Router DOM
- RxJS
- Framer Motion
- Express

## Recommended IDE Extensions
- ESLint
- Prettier
- Angular Language Service
- React Developer Tools

## Build for Production
```bash
npx nx build angularapp  # Build Angular app
npx nx build reactapp    # Build React app
```

## Troubleshooting
- Ensure Node.js and npm are up to date
- Clear npm cache: `npm cache clean --force`
- Reinstall dependencies: `rm -rf node_modules && npm install`

## Contributing
1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Push to the branch
5. Create a Pull Request

## License
MIT License
