export function logRequestDetails(req, res, duration) {
    console.log(`--- Request Log ---`);
    console.log(`Time          : ${new Date().toLocaleString()}`);
    console.log(`Method        : ${req.method}`);
    console.log(`URL           : ${req.originalUrl}`);
    console.log(`Status Code   : ${res.statusCode}`);
    console.log(`Duration      : ${duration}ms`);
    console.log(`IP Address    : ${req.ip}`);
    console.log(`User-Agent    : ${req.headers['user-agent']}`);
    console.log(`Content-Type  : ${req.headers['content-type']}`);
    console.log(`Query Params  : ${JSON.stringify(req.query)}`);
    console.log(`Route Params  : ${JSON.stringify(req.params)}`);
    console.log(`Body          : ${JSON.stringify(req.body)}`);
    console.log(`Referrer      : ${req.headers.referer || 'Direct'}`);
    console.log(`--------------------`);
}