declare global {
    namespace NodeJS {
        interface ProcessEnv {
            hash: string;
            NODE_ENV: 'development' | 'production';
            PORT?: string;
            JWT_PRIVATE_SECRET: string;
            JWT_PUBLIC_SECRET: string;
        }
    }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export { }