import { settings } from "./schema";

export type Setting = typeof settings.$inferSelect;
export type SettingPartial = typeof settings.$inferInsert;
