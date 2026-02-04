# Directive: Develop Figma Assignment App

**Goal**: Build a full-stack MERN application replicating the provided Figma design.

## Inputs
- Figma Link: [Provided but inaccessible explicitly]
- **Required**: Screenshots or detailed description of pages and entities (User, Product, etc.)
- Tech Stack: React, Node, Express, MongoDB

## Output
- `client/`: React Frontend
- `server/`: Express Backend
- `README.md`: Setup instructions

## Procedure
1.  **Analyze Design**:
    - **WAITING**: Get details from User (Screenshots/Description).
    - Identify entities (e.g., Users, Products).
    - List required pages.
2.  **Scaffold**:
    - Frontend: Vite + React.
    - Backend: Express using a structured controller/route pattern.
3.  **Develop Backend**:
    - Connect to MongoDB.
    - Create Mongoose models.
    - Expose CRUD endpoints.
4.  **Develop Frontend**:
    - Global CSS for aesthetics (Fonts, Colors).
    - Components mimicking Figma.
    - Axios for API calls.
5.  **Verify**:
    - Ensure forms persist data.
    - Check responsiveness.

## Tools to Develop
- `execution/setup_project.py` (Optional scaffolder)
- `execution/verify_endpoints.py` (API integration test)
