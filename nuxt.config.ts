// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",

  devtools: { enabled: true },

  modules: [
    "@nuxt/eslint",
    "@nuxt/hints",
    "@nuxt/image",
    "@nuxt/ui",
    "@nuxthub/core",
  ],

  hub: {
    db: {
      dialect: "postgresql",
      casing: "snake_case",
      driver: "postgres-js",

      connection: {
        user: "postgres",
        password: process.env.POSTGRES_PASSWORD,
        database: "d20_warhammering",
      },

      applyMigrationsDuringDev: false,
      applyMigrationsDuringBuild: false,
    },
  },
});
