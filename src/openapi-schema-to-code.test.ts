import path from "path"
import { openapiSchemaToCode } from "./openapi-schema-to-code"

describe("openapiSchemaToCode", () => {
  it("creates expected file", async () => {
    const actual = await openapiSchemaToCode({
      schemaPath: path.join(__dirname, "fixtures", "example1.json"),
    })

    expect(actual).toMatchSnapshot()
  })

  it("creates export file without description elements", async () => {
    const actual = await openapiSchemaToCode({
      schemaPath: path.join(__dirname, "fixtures", "example2.json"),
      skipDescriptions: true,
    })

    expect(actual).toMatchSnapshot()
  })
})
