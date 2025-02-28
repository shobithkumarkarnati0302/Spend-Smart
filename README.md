
# Spend Smart

Spend Smart is an expense tracker web application built with Next.js, Drizzle ORM, and Tailwind CSS. It helps users manage and track their expenses efficiently.

## Features

- User authentication (Clerk)
- Expense tracking
- Categorization of expenses
- Responsive UI with Tailwind CSS
- Database management with Drizzle ORM

## Tech Stack

- **Frontend:** Next.js, React, Tailwind CSS
- **Backend:** Next.js API routes
- **Database:** Drizzle ORM
- **Authentication:** Clerk

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/spend-smart.git
   cd spend-smart
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up environment variables:
   Create a `.env.local` file in the root directory and configure the required environment variables.
4. Run the development server:
   ```sh
   npm run dev
   ```

## Folder Structure

```
app/
 ├── _components/         # Shared components
 ├── (auth)/              # Authentication-related pages
 ├── (routes)/            # Application routes
 ├── components/          # Additional UI components
 ├── drizzle/             # Database setup and migrations
 ├── lib/                 # Helper functions and utilities
 ├── public/              # Static assets
 ├── utils/               # Utility functions
 ├── globals.css          # Global styles
 ├── layout.js            # Layout component
 ├── page.js              # Main page component
```

## Configuration Files

- `drizzle.config.js` - Database configuration
- `next.config.mjs` - Next.js configuration
- `tailwind.config.mjs` - Tailwind CSS setup

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.

