const fs = require('fs');

// Read the contents from multiple schema files
const userSchema = fs.readFileSync('prisma/models/user.prisma', 'utf8');
const tweetSchema = fs.readFileSync('prisma/models/tweet.prisma', 'utf8');

// Merge the schemas and update the schema.prisma file
const finalSchema = `
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

${userSchema}

${tweetSchema}
`;

// Write the merged schema into the main schema.prisma file
fs.writeFileSync('prisma/schema/schema.prisma', finalSchema);

console.log('=== Schemas merged into schema.prisma file ===');
