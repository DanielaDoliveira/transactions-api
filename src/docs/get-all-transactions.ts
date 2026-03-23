// schemas/transactions.ts

export const getAllTransactions = {
    summary: 'List all transactions of the same session_id',
    tags: ['Transactions'],
    response: {
        200: {
            type: 'object',
            properties: {
                transactions: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            id:         { type: 'string' },
                            title:      { type: 'string' },
                            amount:     { type: 'number' },
                            created_at: { type: 'string',},
                            session_id: { type: 'string' },
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