import SwaggerParser from "@apidevtools/swagger-parser"
import enjoi from "enjoi"
import Joi from "joi"
import { OpenAPIV3 } from "openapi-types"
import prettier from "prettier"
import { joiSchemaToCode } from "./joi-schema-to-code"

interface GeneratorConfig {
  schemaPath: string
  prettierConfigPath?: string
  skipDescriptions?: boolean
}

const TEMPLATE = `
import Joi from "joi"

export const schemas = {
  parameters: {
    {OPERATION_SCHEMAS}
  },
  components: {
    {COMPONENT_SCHEMAS}
  }
}`

const httpMethods = Object.values(OpenAPIV3.HttpMethods) as string[]

const getOperationSchemas = (
  document: OpenAPIV3.Document,
  skipDescriptions?: boolean
) => {
  const allOperations = (
    Object.values(document.paths) as Record<string, OpenAPIV3.OperationObject>[]
  )
    .filter((it) => !!it)
    .reduce<OpenAPIV3.OperationObject[]>(
      (arr, path) => [
        ...arr,
        ...Object.entries(path)
          .filter(
            ([key, value]) =>
              httpMethods.includes(key) &&
              !!value.operationId &&
              !!value.parameters?.length
          )
          .map(([, value]) => value),
      ],
      []
    )

  return allOperations
    .map((operation) => {
      const parameters = (operation.parameters ??
        []) as OpenAPIV3.ParameterObject[]

      function stringifyParameter(parameter: OpenAPIV3.ParameterObject) {
        const joiSchema = enjoi.schema(
          parameter.schema! as OpenAPIV3.SchemaObject
        )
        const presence = parameter.required === true ? "required" : "optional"
        const code = joiSchemaToCode(joiSchema, { presence, skipDescriptions })
        const parameterKey = JSON.stringify(parameter.name)
        return `${parameterKey}: ${code}`
      }

      const parameterSchemas = ["path", "query", "header", "cookie"].map(
        (parameterType) => {
          const params = parameters
            .filter((it) => !!it.schema)
            .filter((parameter) => parameter.in === parameterType)
          const paramsSchema = params.map(stringifyParameter)
          return `${parameterType}: Joi.object({${paramsSchema.join(",")}})`
        }
      )

      if (!parameterSchemas.length) {
        return null
      }

      const operationKey = JSON.stringify(operation.operationId!)
      return `${operationKey}: {${parameterSchemas.join(",")}}`
    })
    .filter((it) => it !== null)
    .join(",")
}

const getComponentSchemas = (
  document: OpenAPIV3.Document,
  skipDescriptions?: boolean
) =>
  Object.entries(document.components?.schemas ?? {})
    .map(([name, schema]) => {
      const joiSchema = enjoi.schema(schema as OpenAPIV3.SchemaObject, {
        refineType(type: string, format: string) {
          if (type === "string" && ["date", "date-time"].includes(format)) {
            return "date"
          }
          return type
        },
        refineSchema(
          joiDescription: Joi.Description,
          jsonSchema: OpenAPIV3.SchemaObject
        ) {
          if (jsonSchema.nullable) {
            return joiDescription.allow(null)
          }
          return joiDescription
        },
      })
      return `${JSON.stringify(name)}: ${joiSchemaToCode(joiSchema, {
        skipDescriptions,
      })}`
    })
    .join(",")

export const openapiSchemaToCode = async (config: GeneratorConfig) => {
  const document = (await SwaggerParser.validate(config.schemaPath, {
    validate: { schema: false },
  })) as OpenAPIV3.Document

  const mergedTemplate = TEMPLATE.replace(
    "{OPERATION_SCHEMAS}",
    getOperationSchemas(document, config.skipDescriptions)
  ).replace(
    "{COMPONENT_SCHEMAS}",
    getComponentSchemas(document, config.skipDescriptions)
  )

  const prettierOptions = (config.prettierConfigPath
    ? await prettier.resolveConfig(config.prettierConfigPath)
    : null) ?? { parser: "typescript" }

  return prettier.format(mergedTemplate, prettierOptions)
}
