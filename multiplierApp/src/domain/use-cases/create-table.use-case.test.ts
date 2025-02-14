import { CreateTable } from "./create-table.use-case";

describe("Create Table Use Case", () => {
  test("should create table with defaul values", () => {
    const createTable = new CreateTable();

    const table = createTable.execute({ base: 5 });
    const row = table.split("\n").length;

    expect(createTable).toBeInstanceOf(CreateTable);
    expect(table).toContain("5 x 1 = 5");
    expect(table).toContain("5 x 10 = 50");
    expect(row).toBe(14);
  });

  test("should create table with custom values", () => {
    const createTable = new CreateTable();
    const options = { base: 5, limit: 20 };

    const table = createTable.execute(options);
    const row = table.split("\n").length;

    expect(table).toContain("5 x 1 = 5");
    expect(table).toContain("5 x 20 = 100");
    expect(row).toBe(24);
  });
});
