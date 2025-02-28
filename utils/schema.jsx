import { pgTable, serial, varchar, numeric, integer, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const Budgets = pgTable('budgets', {
    id: serial('id').primaryKey(),
    name: varchar('name').notNull(),
    amount: numeric('amount', { precision: 10, scale: 2 }).notNull(),  // Defined precision & scale
    icon: varchar('icon'),
    createdBy: varchar('createdBy').notNull(),
});

export const Expenses = pgTable('expenses', {
    id: serial('id').primaryKey(),
    name: varchar('name').notNull(),
    amount: numeric('amount', { precision: 10, scale: 2 }).notNull().default(0),
    budgetId: integer('budgetId').notNull().references(() => Budgets.id),
    createdAt: timestamp('createdAt', { withTimezone: true }).notNull(),  // Corrected timestamp type
});

export const ExpensesRelations = relations(Expenses, ({ one }) => ({
    budget: one(Budgets, {
        fields: [Expenses.budgetId],
        references: [Budgets.id],
    }),
}));

export const BudgetsRelations = relations(Budgets, ({ many }) => ({
    expenses: many(Expenses),
}));