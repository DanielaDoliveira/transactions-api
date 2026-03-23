// schemas/transactions.ts

export const createATransaction = {
    summary: 'Create a new transaction',
    tags: ['Transactions'],
    response: {
        201: {
            type: 'object',
            properties: {
                transactions: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            id:         { type: 'string', format: 'uuid' },
                            title:      { type: 'string' },
                            amount:     { type: 'number' },
                            created_at: { type: 'string', format: 'date-time' },
                            session_id: { type: 'string', format: 'uuid' },
                        },
                    },
                },
            },
        },
        401: {
            type: 'object',
            properties: {
                error: { type: 'string' },
            },
        },
    },
} as const;