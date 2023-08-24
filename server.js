import Fastify from "fastify";

const fastify = Fastify({
    logger: true,
});

fastify.post('/login', (req, res) => {
    return req.body;
});

try {
    await fastify.listen({ port: 3000 })
} catch (err) {
    fastify.log.error(err);
    process.exit();
}