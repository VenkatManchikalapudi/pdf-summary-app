# PDF Summary App – Frontend

This is the React frontend for the PDF Summary App. It allows users to upload PDF files, view summaries, and ask questions about uploaded PDFs using the backend API.

## Features
- Upload PDF files to the backend
- List and select uploaded PDFs
- Generate and display summaries for PDFs
- Ask questions about PDF content and display answers
frontend/
├── public/           # Static assets
│   ├── main.jsx      # Entry point
│   └── ...           # (Other components as needed)
├── package.json      # NPM dependencies and scripts
├── README.md         # This file
└── ...
```

## Usage
1. Install dependencies:
	```sh
	cd frontend
	npm install
	```
2. Start the development server:
	```sh
	npm run dev
	```
3. Open [http://localhost:5173](http://localhost:5173) in your browser.

> **Note:** The backend API must be running at `http://localhost:8000` for the frontend to work.

## API Integration
- All API calls are defined in `src/api.js`.
- Endpoints used:
  - `POST /upload` – Upload PDF
  - `GET /pdfs` – List PDFs
  - `POST /summarize` – Summarize PDF
  - `POST /qa` – Q&A on PDF

## Customization

---
For full-stack architecture, see the root `architecture.md`.
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
See `../architecture.md` for diagram and flow.
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
