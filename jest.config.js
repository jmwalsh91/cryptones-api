import { TsJestCompiler } from "ts-jest";

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
export default {
  roots: ["./src"],
  clearMocks: true,
  coverageProvider: "v8",
  moduleFileExtentions: ["js", "ts", "json", "node"],
  preset: "ts-jest",
  testEnvironment: "node",
};
