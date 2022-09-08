import Joi from "joi";
declare type PresenceType = "optional" | "required" | "forbidden";
declare const _default: (schema: Joi.AnySchema, presence?: PresenceType) => string;
export default _default;
