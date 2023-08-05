import { PrismaClient } from "@prisma/client";


declare global {
    var dbDriver: PrismaClient | undefined;
}

let dbDriver: PrismaClient;

if (process.env.NODE_ENV === "production") {
    dbDriver = new PrismaClient();
} else {
    if (!global.dbDriver) {
        global.dbDriver = new PrismaClient();
    }
    dbDriver = global.dbDriver;
}

export default dbDriver;