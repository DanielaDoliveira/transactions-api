import cookie from "@fastify/cookie";


export const getById = {
    schema: {
       
        summary: 'Get a transaction by ID',
        tags: ['Transactions'],
        params: {
            type: 'object',
            properties: {
                id: {
                    type: 'string',
                    format: 'uuid',
                    description: 'Transaction ID',
                },
            },
            required: ['id'],
        },
        security: [{ cookieAuth: [] }],
        
        response: {
            200: {
                type: 'object',
                properties: {
                    transaction: {
                        type: 'object',
                        properties: {
                            id:         { type: 'string' },
                            title:      { type: 'string' },
                            amount:     { type: 'number' },
                            created_at: { type: 'string' },
                            session_id: { type: 'string' },
                        },
                    },
                },
            },
        },
        401: {
            type: 'object',
            properties: {
                error: { type: 'string', example: 'Unauthorized' },
            },
        },
      
    },
} as const;