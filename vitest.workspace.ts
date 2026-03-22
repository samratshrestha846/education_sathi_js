import { defineWorkspace } from "vitest/config";

export default defineWorkspace([
  "apps/edu_sathi_backend/vitest.config.ts",
  "apps/edu_sathi_frontend/vitest.config.ts",
  "packages/domain/vitest.config.ts",
  "packages/shared/vitest.config.ts"
]);
