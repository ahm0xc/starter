import { config } from "dotenv";
import { expand } from "dotenv-expand";
import { type Config } from "drizzle-kit";

expand(config());

export default {
  schema: "./src/server/db/schema/index.ts",
  out: "./src/server/db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    // eslint-disable-next-line n/no-process-env
    url: process.env.DATABASE_URL!,
  },
  tablesFilter: ["starter_*"],
} satisfies Config;
