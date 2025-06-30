import rateLimit from'express-rate-limit' ;

/**
 * Rate limit middleware to prevent abuse of the API.
 */
const rateLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 10,
    message: { error: 'Too many requests, try again later.' },
    standardHeaders: 'draft-8',
    legacyHeaders: false,
});

export default rateLimiter;