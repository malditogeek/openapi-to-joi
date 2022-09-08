"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var swagger_parser_1 = __importDefault(require("@apidevtools/swagger-parser"));
var enjoi_1 = __importDefault(require("enjoi"));
var openapi_types_1 = require("openapi-types");
var prettier_1 = __importDefault(require("prettier"));
var joi_schema_to_code_1 = __importDefault(require("./joi-schema-to-code"));
var TEMPLATE = "\n/* eslint-disable */\n/* prettier-ignore */\nimport Joi from \"joi\"\n\nexport const schemas = {\n  parameters: {\n    {OPERATION_SCHEMAS}\n  },\n  components: {\n    {COMPONENT_SCHEMAS}\n  }\n}";
var httpMethods = Object.values(openapi_types_1.OpenAPIV3.HttpMethods);
var getOperationSchemas = function (document) {
    var allOperations = Object.values(document.paths)
        .filter(function (it) { return !!it; })
        .reduce(function (arr, path) { return __spreadArray(__spreadArray([], arr, true), Object.entries(path)
        .filter(function (_a) {
        var _b;
        var key = _a[0], value = _a[1];
        return httpMethods.includes(key) &&
            !!value.operationId &&
            !!((_b = value.parameters) === null || _b === void 0 ? void 0 : _b.length);
    })
        .map(function (_a) {
        var value = _a[1];
        return value;
    }), true); }, []);
    return allOperations
        .map(function (operation) {
        var _a;
        var parameters = ((_a = operation.parameters) !== null && _a !== void 0 ? _a : []);
        function stringifyParameter(parameter) {
            var joiSchema = enjoi_1.default.schema(parameter.schema);
            var parameterKey = JSON.stringify(parameter.name);
            var code = (0, joi_schema_to_code_1.default)(joiSchema, parameter.required === true ? "required" : "optional");
            return "".concat(parameterKey, ": ").concat(code);
        }
        var parameterSchemas = ["path", "query", "header", "cookie"].map(function (parameterType) {
            var params = parameters
                .filter(function (it) { return !!it.schema; })
                .filter(function (parameter) { return parameter.in === parameterType; });
            var paramsSchema = params.map(stringifyParameter);
            return "".concat(parameterType, ": Joi.object({").concat(paramsSchema.join(","), "})");
        });
        if (!parameterSchemas.length) {
            return null;
        }
        var operationKey = JSON.stringify(operation.operationId);
        return "".concat(operationKey, ": {").concat(parameterSchemas.join(","), "}");
    })
        .filter(function (it) { return it !== null; })
        .join(",");
};
var getComponentSchemas = function (document) {
    var _a, _b;
    return Object.entries((_b = (_a = document.components) === null || _a === void 0 ? void 0 : _a.schemas) !== null && _b !== void 0 ? _b : {})
        .map(function (_a) {
        var name = _a[0], schema = _a[1];
        var joiSchema = enjoi_1.default.schema(schema, {
            refineType: function (type, format) {
                if (type === "string" && ["date", "date-time"].includes(format)) {
                    return "date";
                }
                return type;
            },
            refineSchema: function (joiDescription, jsonSchema) {
                if (jsonSchema.nullable) {
                    return joiDescription.allow(null);
                }
                return joiDescription;
            },
        });
        return "".concat(JSON.stringify(name), ": ").concat((0, joi_schema_to_code_1.default)(joiSchema));
    })
        .join(",");
};
exports.default = (function (schemaPath, prettierConfigPath) { return __awaiter(void 0, void 0, void 0, function () {
    var document, mergedTemplate, prettierOptions, _a;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4 /*yield*/, swagger_parser_1.default.validate(schemaPath, {
                    validate: { schema: false },
                })];
            case 1:
                document = (_c.sent());
                mergedTemplate = TEMPLATE.replace("{OPERATION_SCHEMAS}", getOperationSchemas(document)).replace("{COMPONENT_SCHEMAS}", getComponentSchemas(document));
                if (!prettierConfigPath) return [3 /*break*/, 3];
                return [4 /*yield*/, prettier_1.default.resolveConfig(prettierConfigPath)];
            case 2:
                _a = _c.sent();
                return [3 /*break*/, 4];
            case 3:
                _a = null;
                _c.label = 4;
            case 4:
                prettierOptions = (_b = (_a)) !== null && _b !== void 0 ? _b : { parser: "typescript" };
                return [2 /*return*/, prettier_1.default.format(mergedTemplate, prettierOptions)];
        }
    });
}); });
