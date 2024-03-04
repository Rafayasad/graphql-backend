import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';

const init = async () => {
    const app = express();
    const PORT = process.env.port || 8000;

    app.use(express.json());

    const gqlServer = new ApolloServer({
        typeDefs: `
            type Query {
                helloServer: String
                say(name:String):String
            }
        `,
        resolvers: {
            Query: {
                helloServer: () => 'Hey, my first graphQL server.',
                say: (_, { name }: { name: string }) => `Hello ${name}, welcome to graphgl`
            }
        }
    });

    await gqlServer.start();

    app.use('/graphql', expressMiddleware(gqlServer));

    app.get('/', (req, res) => {
        res.json({ message: "server is running..." });
    })

    app.listen(PORT, () => console.log(`Server started at port:${PORT}`));
}

init();