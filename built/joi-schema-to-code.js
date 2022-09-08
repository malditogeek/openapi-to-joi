"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var appendAllow = function (parts, description) {
    var values = description.allow;
    if (values !== undefined) {
        parts.push(".allow(".concat(values.map(function (value) { return JSON.stringify(value); }).join(","), ")"));
    }
};
var appendAlphanum = function (parts, description) {
    var _a;
    var rule = (_a = description.rules) === null || _a === void 0 ? void 0 : _a.find(function (it) { return it.name === "alphanum"; });
    if (rule !== undefined) {
        parts.push(".alphanum()");
    }
};
var appendAnd = function (parts, description) {
    var _a;
    var dependency = ((_a = description.dependencies) !== null && _a !== void 0 ? _a : []).find(function (it) { return it.rel === "and"; });
    if (dependency !== undefined) {
        parts.push(".and(".concat(dependency.peers.map(function (it) { return JSON.stringify(it); }).join(","), ")"));
    }
};
var appendNonStringLength = function (parts, description) {
    var _a;
    var rule = (_a = description.rules) === null || _a === void 0 ? void 0 : _a.find(function (it) { return it.name === "length"; });
    if (rule !== undefined) {
        parts.push(".length(".concat(JSON.stringify(rule.args.limit), ")"));
    }
};
var appendBase64 = function (parts, description) {
    var _a, _b;
    var rule = (_a = description.rules) === null || _a === void 0 ? void 0 : _a.find(function (it) { return it.name === "base64"; });
    if (rule !== undefined) {
        parts.push(".base64(".concat(JSON.stringify((_b = rule.args.options) !== null && _b !== void 0 ? _b : {}), ")"));
    }
};
var appendCase = function (parts, description) {
    var _a, _b, _c;
    var rule = (_a = description.rules) === null || _a === void 0 ? void 0 : _a.find(function (it) { return it.name === "case"; });
    if (((_b = rule === null || rule === void 0 ? void 0 : rule.args) === null || _b === void 0 ? void 0 : _b.direction) === "upper") {
        parts.push(".uppercase()");
    }
    else if (((_c = rule === null || rule === void 0 ? void 0 : rule.args) === null || _c === void 0 ? void 0 : _c.direction) === "lower") {
        parts.push(".lowercase()");
    }
};
var appendCreditCard = function (parts, description) {
    var _a;
    var rule = (_a = description.rules) === null || _a === void 0 ? void 0 : _a.find(function (it) { return it.name === "creditCard"; });
    if (rule !== undefined) {
        parts.push(".creditCard()");
    }
};
var appendDataUri = function (parts, description) {
    var _a, _b;
    var rule = (_a = description.rules) === null || _a === void 0 ? void 0 : _a.find(function (it) { return it.name === "dataUri"; });
    if (rule !== undefined) {
        parts.push(".dataUri(".concat(JSON.stringify((_b = rule.args.options) !== null && _b !== void 0 ? _b : {}), ")"));
    }
};
var appendDateGreater = function (parts, description) {
    var _a;
    var rule = (_a = description.rules) === null || _a === void 0 ? void 0 : _a.find(function (it) { return it.name === "greater"; });
    if (rule !== undefined) {
        parts.push(".greater(".concat(JSON.stringify(rule.args.date), ")"));
    }
};
var appendDateLess = function (parts, description) {
    var _a;
    var rule = (_a = description.rules) === null || _a === void 0 ? void 0 : _a.find(function (it) { return it.name === "less"; });
    if (rule !== undefined) {
        parts.push(".less(".concat(JSON.stringify(rule.args.date), ")"));
    }
};
var appendDateMax = function (parts, description) {
    var _a;
    var rule = (_a = description.rules) === null || _a === void 0 ? void 0 : _a.find(function (it) { return it.name === "max"; });
    if (rule !== undefined) {
        parts.push(".max(".concat(JSON.stringify(rule.args.date), ")"));
    }
};
var appendDateMin = function (parts, description) {
    var _a;
    var rule = (_a = description.rules) === null || _a === void 0 ? void 0 : _a.find(function (it) { return it.name === "min"; });
    if (rule !== undefined) {
        parts.push(".min(".concat(JSON.stringify(rule.args.date), ")"));
    }
};
var appendDefault = function (parts, description) {
    var flags = description.flags;
    if ((flags === null || flags === void 0 ? void 0 : flags.default) !== undefined) {
        parts.push(".default(".concat(JSON.stringify(flags.default), ")"));
    }
};
var appendDescription = function (parts, description) {
    var flags = description.flags;
    if ((flags === null || flags === void 0 ? void 0 : flags.description) !== undefined && (flags === null || flags === void 0 ? void 0 : flags.description) !== "") {
        parts.push(".description(".concat(JSON.stringify(flags.description), ")"));
    }
};
var appendDomain = function (parts, description) {
    var _a, _b, _c;
    var rule = (_a = description.rules) === null || _a === void 0 ? void 0 : _a.find(function (it) { return it.name === "domain"; });
    if (rule !== undefined) {
        parts.push(".domain(".concat(JSON.stringify((_c = (_b = rule.args) === null || _b === void 0 ? void 0 : _b.options) !== null && _c !== void 0 ? _c : {}), ")"));
    }
};
var appendEmail = function (parts, description) {
    var _a, _b, _c;
    var rule = (_a = description.rules) === null || _a === void 0 ? void 0 : _a.find(function (it) { return it.name === "email"; });
    if (rule !== undefined) {
        parts.push(".email(".concat(JSON.stringify((_c = (_b = rule.args) === null || _b === void 0 ? void 0 : _b.options) !== null && _c !== void 0 ? _c : {}), ")"));
    }
};
var appendEncoding = function (parts, description) {
    var flags = description.flags;
    if ((flags === null || flags === void 0 ? void 0 : flags.encoding) !== undefined) {
        parts.push(".encoding(".concat(JSON.stringify(flags.encoding), ")"));
    }
};
var appendExample = function (parts, description) {
    var values = description.examples;
    if (values !== undefined) {
        parts.push(".example(".concat(JSON.stringify(values[0]), ")"));
    }
};
var appendFalsy = function (parts, description) {
    var values = description.falsy;
    if (values !== undefined) {
        parts.push(".falsy(".concat(values.map(function (value) { return JSON.stringify(value); }).join(","), ")"));
    }
};
var appendForbidden = function (parts, description) {
    var flags = description.flags;
    if ((flags === null || flags === void 0 ? void 0 : flags.presence) === "forbidden") {
        parts.push(".forbidden()");
    }
};
var appendGuid = function (parts, description) {
    var _a, _b, _c;
    var rule = (_a = description.rules) === null || _a === void 0 ? void 0 : _a.find(function (it) { return it.name === "guid"; });
    if (rule !== undefined) {
        parts.push(".guid(".concat(JSON.stringify((_c = (_b = rule.args) === null || _b === void 0 ? void 0 : _b.options) !== null && _c !== void 0 ? _c : {}), ")"));
    }
};
var appendHex = function (parts, description) {
    var _a, _b;
    var rule = (_a = description.rules) === null || _a === void 0 ? void 0 : _a.find(function (it) { return it.name === "hex"; });
    if (rule !== undefined) {
        parts.push(".hex(".concat(JSON.stringify((_b = rule.args.options) !== null && _b !== void 0 ? _b : {}), ")"));
    }
};
var appendHostname = function (parts, description) {
    var _a;
    var rule = (_a = description.rules) === null || _a === void 0 ? void 0 : _a.find(function (it) { return it.name === "hostname"; });
    if (rule !== undefined) {
        parts.push(".hostname()");
    }
};
var appendInsensitive = function (parts, description) {
    var flags = description.flags;
    if ((flags === null || flags === void 0 ? void 0 : flags.insensitive) === true) {
        parts.push(".insensitive()");
    }
};
var appendInteger = function (parts, description) {
    var _a;
    var rule = (_a = description.rules) === null || _a === void 0 ? void 0 : _a.find(function (it) { return it.name === "integer"; });
    if (rule !== undefined) {
        parts.push(".integer()");
    }
};
var appendInvalid = function (parts, description) {
    var values = description.invalid;
    if (values !== undefined) {
        parts.push(".invalid(".concat(values.map(function (value) { return JSON.stringify(value); }).join(","), ")"));
    }
};
var appendIp = function (parts, description) {
    var _a, _b;
    var rule = (_a = description.rules) === null || _a === void 0 ? void 0 : _a.find(function (it) { return it.name === "ip"; });
    if (rule !== undefined) {
        parts.push(".ip(".concat(JSON.stringify((_b = rule.args.options) !== null && _b !== void 0 ? _b : {}), ")"));
    }
};
var appendIso = function (parts, description) {
    var flags = description.flags;
    if ((flags === null || flags === void 0 ? void 0 : flags.format) === "iso") {
        parts.push(".iso()");
    }
};
var appendIsoDate = function (parts, description) {
    var _a;
    var rule = (_a = description.rules) === null || _a === void 0 ? void 0 : _a.find(function (it) { return it.name === "isoDate"; });
    if (rule !== undefined) {
        parts.push(".isoDate()");
    }
};
var appendIsoDuration = function (parts, description) {
    var _a;
    var rule = (_a = description.rules) === null || _a === void 0 ? void 0 : _a.find(function (it) { return it.name === "isoDuration"; });
    if (rule !== undefined) {
        parts.push(".isoDuration()");
    }
};
var appendItems = function (parts, description) {
    var items = description.items;
    if (items !== undefined) {
        parts.push(".items(".concat(items.map(function (it) { return descriptionToString(it); }).join(","), ")"));
    }
};
var appendLabel = function (parts, description) {
    var flags = description.flags;
    if ((flags === null || flags === void 0 ? void 0 : flags.label) !== undefined) {
        parts.push(".label(".concat(JSON.stringify(flags.label), ")"));
    }
};
var appendMultiple = function (parts, description) {
    var _a;
    var rule = (_a = description.rules) === null || _a === void 0 ? void 0 : _a.find(function (it) { return it.name === "multiple"; });
    if (rule !== undefined) {
        parts.push(".multiple(".concat(JSON.stringify(rule.args.base), ")"));
    }
};
var appendNand = function (parts, description) {
    var _a;
    var dependency = ((_a = description.dependencies) !== null && _a !== void 0 ? _a : []).find(function (it) { return it.rel === "nand"; });
    if (dependency !== undefined) {
        parts.push(".nand(".concat(dependency.peers.map(function (it) { return JSON.stringify(it); }).join(","), ")"));
    }
};
var appendNonStringMax = function (parts, description) {
    var _a;
    var rule = (_a = description.rules) === null || _a === void 0 ? void 0 : _a.find(function (it) { return it.name === "max"; });
    if (rule !== undefined) {
        parts.push(".max(".concat(JSON.stringify(rule.args.limit), ")"));
    }
};
var appendNonStringMin = function (parts, description) {
    var _a;
    var rule = (_a = description.rules) === null || _a === void 0 ? void 0 : _a.find(function (it) { return it.name === "min"; });
    if (rule !== undefined) {
        parts.push(".min(".concat(JSON.stringify(rule.args.limit), ")"));
    }
};
var appendNote = function (parts, description) {
    var values = description.notes;
    if (values !== undefined) {
        parts.push(".note(".concat(values.map(function (value) { return JSON.stringify(value); }).join(","), ")"));
    }
};
var appendNormalize = function (parts, description) {
    var _a, _b;
    var rule = (_a = description.rules) === null || _a === void 0 ? void 0 : _a.find(function (it) { return it.name === "normalize"; });
    if (rule !== undefined) {
        parts.push(".normalize(".concat(JSON.stringify((_b = rule.args.form) !== null && _b !== void 0 ? _b : "NFC"), ")"));
    }
};
var appendNumberGreater = function (parts, description) {
    var _a;
    var rule = (_a = description.rules) === null || _a === void 0 ? void 0 : _a.find(function (it) { return it.name === "greater"; });
    if (rule !== undefined) {
        parts.push(".greater(".concat(JSON.stringify(rule.args.limit), ")"));
    }
};
var appendNumberLess = function (parts, description) {
    var _a;
    var rule = (_a = description.rules) === null || _a === void 0 ? void 0 : _a.find(function (it) { return it.name === "less"; });
    if (rule !== undefined) {
        parts.push(".less(".concat(JSON.stringify(rule.args.limit), ")"));
    }
};
var appendOnly = function (parts, description) {
    var flags = description.flags;
    if ((flags === null || flags === void 0 ? void 0 : flags.only) === true) {
        parts.push(".only()");
    }
};
var appendOr = function (parts, description) {
    var _a;
    var dependency = ((_a = description.dependencies) !== null && _a !== void 0 ? _a : []).find(function (it) { return it.rel === "or"; });
    if (dependency !== undefined) {
        parts.push(".or(".concat(dependency.peers.map(function (it) { return JSON.stringify(it); }).join(","), ")"));
    }
};
var appendOptional = function (parts, description) {
    var flags = description.flags;
    if ((flags === null || flags === void 0 ? void 0 : flags.presence) === "optional") {
        parts.push(".optional()");
    }
};
var appendOrdered = function (parts, description) {
    var items = description.ordered;
    if (items !== undefined) {
        parts.push(".ordered(".concat(items.map(function (it) { return descriptionToString(it); }).join(","), ")"));
    }
};
var appendOxor = function (parts, description) {
    var _a;
    var dependency = ((_a = description.dependencies) !== null && _a !== void 0 ? _a : []).find(function (it) { return it.rel === "oxor"; });
    if (dependency !== undefined) {
        parts.push(".oxor(".concat(dependency.peers.map(function (it) { return JSON.stringify(it); }).join(","), ")"));
    }
};
var appendPattern = function (parts, description) {
    var _a, _b;
    var rule = (_a = description.rules) === null || _a === void 0 ? void 0 : _a.find(function (it) { return it.name === "pattern"; });
    if (rule !== undefined) {
        parts.push(".pattern(".concat(rule.args.regex, ",").concat(JSON.stringify((_b = rule.args.options) !== null && _b !== void 0 ? _b : {}), ")"));
    }
};
var appendPort = function (parts, description) {
    var _a;
    var rule = (_a = description.rules) === null || _a === void 0 ? void 0 : _a.find(function (it) { return it.name === "port"; });
    if (rule !== undefined) {
        parts.push(".port()");
    }
};
var appendPrecision = function (parts, description) {
    var _a;
    var rule = (_a = description.rules) === null || _a === void 0 ? void 0 : _a.find(function (it) { return it.name === "precision"; });
    if (rule !== undefined) {
        parts.push(".precision(".concat(JSON.stringify(rule.args.limit), ")"));
    }
};
var appendRaw = function (parts, description) {
    var flags = description.flags;
    if ((flags === null || flags === void 0 ? void 0 : flags.result) === "raw") {
        parts.push(".raw()");
    }
};
var appendRegex = function (parts, description) {
    var _a;
    var rule = (_a = description.rules) === null || _a === void 0 ? void 0 : _a.find(function (it) { return it.name === "regex"; });
    if (rule !== undefined) {
        parts.push(".regex()");
    }
};
var appendReplace = function (parts, description) {
    var values = description.replacements;
    if (values !== undefined) {
        parts.push(".replace(".concat(values[0].pattern.regex, ", ").concat(JSON.stringify(values[0].replacement), ")"));
    }
};
var appendRequired = function (parts, description) {
    var flags = description.flags;
    if ((flags === null || flags === void 0 ? void 0 : flags.presence) === "required") {
        parts.push(".required()");
    }
};
var appendSensitive = function (parts, description) {
    var flags = description.flags;
    if ((flags === null || flags === void 0 ? void 0 : flags.sensitive) === true) {
        parts.push(".sensitive()");
    }
};
var appendSign = function (parts, description) {
    var _a, _b, _c;
    var rule = (_a = description.rules) === null || _a === void 0 ? void 0 : _a.find(function (it) { return it.name === "sign"; });
    if (((_b = rule === null || rule === void 0 ? void 0 : rule.args) === null || _b === void 0 ? void 0 : _b.sign) === "negative") {
        parts.push(".negative()");
    }
    else if (((_c = rule === null || rule === void 0 ? void 0 : rule.args) === null || _c === void 0 ? void 0 : _c.sign) === "positive") {
        parts.push(".positive()");
    }
};
var appendSingle = function (parts, description) {
    var flags = description.flags;
    if ((flags === null || flags === void 0 ? void 0 : flags.single) === true) {
        parts.push(".single()");
    }
};
var appendSparse = function (parts, description) {
    var flags = description.flags;
    if ((flags === null || flags === void 0 ? void 0 : flags.sparse) === true) {
        parts.push(".sparse()");
    }
};
var appendStringLength = function (parts, description) {
    var _a, _b;
    var rule = (_a = description.rules) === null || _a === void 0 ? void 0 : _a.find(function (it) { return it.name === "length"; });
    if (rule !== undefined) {
        var encoding = rule.args.encoding;
        parts.push(".length(".concat([
            JSON.stringify((_b = rule.args) === null || _b === void 0 ? void 0 : _b.limit),
            encoding !== undefined ? JSON.stringify(encoding) : undefined,
        ]
            .filter(function (it) { return !!it; })
            .join(","), ")"));
    }
};
var appendStringMax = function (parts, description) {
    var _a, _b;
    var rule = (_a = description.rules) === null || _a === void 0 ? void 0 : _a.find(function (it) { return it.name === "max"; });
    if (rule !== undefined) {
        var encoding = rule.args.encoding;
        parts.push(".max(".concat([
            JSON.stringify((_b = rule.args) === null || _b === void 0 ? void 0 : _b.limit),
            encoding !== undefined ? JSON.stringify(encoding) : undefined,
        ]
            .filter(function (it) { return !!it; })
            .join(","), ")"));
    }
};
var appendStringMin = function (parts, description) {
    var _a, _b;
    var rule = (_a = description.rules) === null || _a === void 0 ? void 0 : _a.find(function (it) { return it.name === "min"; });
    if (rule !== undefined) {
        var encoding = rule.args.encoding;
        parts.push(".min(".concat([
            JSON.stringify((_b = rule.args) === null || _b === void 0 ? void 0 : _b.limit),
            encoding !== undefined ? JSON.stringify(encoding) : undefined,
        ]
            .filter(function (it) { return !!it; })
            .join(","), ")"));
    }
};
var appendStrict = function (parts, description) {
    var preferences = description.preferences;
    if ((preferences === null || preferences === void 0 ? void 0 : preferences.convert) === false) {
        parts.push(".strict()");
    }
};
var appendTag = function (parts, description) {
    var values = description.tags;
    if (values !== undefined) {
        parts.push(".tag(".concat(values.map(function (value) { return JSON.stringify(value); }).join(","), ")"));
    }
};
var appendTimestamp = function (parts, description) {
    var flags = description.flags;
    if ((flags === null || flags === void 0 ? void 0 : flags.format) === "unix") {
        parts.push('.timestamp("unix")');
    }
    else if ((flags === null || flags === void 0 ? void 0 : flags.format) === "javascript") {
        parts.push('.timestamp("javascript")');
    }
};
var appendToken = function (parts, description) {
    var _a;
    var rule = (_a = description.rules) === null || _a === void 0 ? void 0 : _a.find(function (it) { return it.name === "token"; });
    if (rule !== undefined) {
        parts.push(".token()");
    }
};
var appendTrim = function (parts, description) {
    var _a;
    var rule = (_a = description.rules) === null || _a === void 0 ? void 0 : _a.find(function (it) { return it.name === "trim"; });
    if (rule !== undefined) {
        parts.push(".trim(".concat(JSON.stringify(rule.args.enabled !== false), ")"));
    }
};
var appendTruncate = function (parts, description) {
    var flags = description.flags;
    if ((flags === null || flags === void 0 ? void 0 : flags.truncate) === true) {
        parts.push(".truncate()");
    }
};
var appendTruthy = function (parts, description) {
    var values = description.truthy;
    if (values !== undefined) {
        parts.push(".truthy(".concat(values.map(function (value) { return JSON.stringify(value); }).join(","), ")"));
    }
};
var appendUnique = function (parts, description) {
    var _a, _b, _c;
    var rule = (_a = description.rules) === null || _a === void 0 ? void 0 : _a.find(function (it) { return it.name === "unique"; });
    if (rule !== undefined) {
        parts.push(".unique(".concat(JSON.stringify((_b = rule.args) === null || _b === void 0 ? void 0 : _b.comparator), ",").concat(JSON.stringify((_c = rule.args) === null || _c === void 0 ? void 0 : _c.options), ")"));
    }
};
var appendUnit = function (parts, description) {
    var flags = description.flags;
    if ((flags === null || flags === void 0 ? void 0 : flags.unit) !== undefined) {
        parts.push(".unit(".concat(JSON.stringify(flags.unit), ")"));
    }
};
var appendUnknown = function (parts, description) {
    var flags = description.flags;
    if ((flags === null || flags === void 0 ? void 0 : flags.unknown) === true) {
        parts.push(".unknown()");
    }
};
var appendUnsafe = function (parts, description) {
    var flags = description.flags;
    if ((flags === null || flags === void 0 ? void 0 : flags.unsafe) === true) {
        parts.push(".unsafe()");
    }
};
var appendUri = function (parts, description) {
    var _a, _b, _c;
    var rule = (_a = description.rules) === null || _a === void 0 ? void 0 : _a.find(function (it) { return it.name === "uri"; });
    if (rule !== undefined) {
        parts.push(".uri(".concat(JSON.stringify((_c = (_b = rule.args) === null || _b === void 0 ? void 0 : _b.options) !== null && _c !== void 0 ? _c : {}), ")"));
    }
};
var appendValid = function (parts, description) {
    var values = description.valid;
    if (values !== undefined) {
        parts.push(".valid(".concat(values.map(function (value) { return JSON.stringify(value); }).join(","), ")"));
    }
};
var appendXor = function (parts, description) {
    var _a;
    var dependency = ((_a = description.dependencies) !== null && _a !== void 0 ? _a : []).find(function (it) { return it.rel === "xor"; });
    if (dependency !== undefined) {
        parts.push(".xor(".concat(dependency.peers.map(function (it) { return JSON.stringify(it); }).join(","), ")"));
    }
};
var appendCommon = function (parts, description) {
    appendAllow(parts, description);
    appendDefault(parts, description);
    appendDescription(parts, description);
    appendExample(parts, description);
    appendForbidden(parts, description);
    appendInvalid(parts, description);
    appendLabel(parts, description);
    appendNote(parts, description);
    appendOnly(parts, description);
    appendOptional(parts, description);
    appendRaw(parts, description);
    appendRequired(parts, description);
    appendStrict(parts, description);
    appendTag(parts, description);
    appendUnit(parts, description);
    appendValid(parts, description);
};
var anyDescriptionToString = function (description) {
    var parts = ["Joi.any()"];
    appendCommon(parts, description);
    return parts.join("");
};
var arrayDescriptionToString = function (description) {
    var parts = ["Joi.array()"];
    appendCommon(parts, description);
    appendNonStringLength(parts, description);
    appendItems(parts, description);
    appendNonStringMax(parts, description);
    appendNonStringMin(parts, description);
    appendOrdered(parts, description);
    appendSingle(parts, description);
    appendSparse(parts, description);
    appendUnique(parts, description);
    return parts.join("");
};
var binaryDescriptionToString = function (description) {
    var parts = ["Joi.binary()"];
    appendCommon(parts, description);
    appendEncoding(parts, description);
    appendNonStringLength(parts, description);
    appendNonStringMax(parts, description);
    appendNonStringMin(parts, description);
    return parts.join("");
};
var booleanDescriptionToString = function (description) {
    var parts = ["Joi.boolean()"];
    appendCommon(parts, description);
    appendFalsy(parts, description);
    appendSensitive(parts, description);
    appendTruthy(parts, description);
    return parts.join("");
};
var dateDescriptionToString = function (description) {
    var parts = ["Joi.date()"];
    appendCommon(parts, description);
    appendDateGreater(parts, description);
    appendIso(parts, description);
    appendDateLess(parts, description);
    appendDateMax(parts, description);
    appendDateMin(parts, description);
    appendTimestamp(parts, description);
    return parts.join("");
};
var numberDescriptionToString = function (description) {
    var parts = ["Joi.number()"];
    appendCommon(parts, description);
    appendNumberGreater(parts, description);
    appendInteger(parts, description);
    appendNumberLess(parts, description);
    appendNonStringMax(parts, description);
    appendNonStringMin(parts, description);
    appendMultiple(parts, description);
    appendPort(parts, description);
    appendPrecision(parts, description);
    appendSign(parts, description);
    appendUnsafe(parts, description);
    return parts.join("");
};
var objectDescriptionToString = function (description) {
    var _a;
    var parts = ["Joi.object({"];
    var keys = ((_a = description.keys) !== null && _a !== void 0 ? _a : {});
    parts.push(Object.entries(keys)
        .map(function (_a) {
        var key = _a[0], value = _a[1];
        return "".concat(JSON.stringify(key), ": ").concat(descriptionToString(value));
    })
        .join(","));
    parts.push("})");
    appendCommon(parts, description);
    appendAnd(parts, description);
    appendNonStringLength(parts, description);
    appendNonStringMax(parts, description);
    appendNonStringMin(parts, description);
    appendNand(parts, description);
    appendOr(parts, description);
    appendOxor(parts, description);
    appendRegex(parts, description);
    appendUnknown(parts, description);
    appendXor(parts, description);
    // TODO: Object fields
    return parts.join("");
};
var stringDescriptionToString = function (description) {
    var parts = ["Joi.string()"];
    appendCommon(parts, description);
    appendAlphanum(parts, description);
    appendBase64(parts, description);
    appendCase(parts, description);
    appendCreditCard(parts, description);
    appendDataUri(parts, description);
    appendDomain(parts, description);
    appendEmail(parts, description);
    appendGuid(parts, description);
    appendHex(parts, description);
    appendHostname(parts, description);
    appendInsensitive(parts, description);
    appendIp(parts, description);
    appendIsoDate(parts, description);
    appendIsoDuration(parts, description);
    appendNormalize(parts, description);
    appendPattern(parts, description);
    appendReplace(parts, description);
    appendStringLength(parts, description);
    appendStringMax(parts, description);
    appendStringMin(parts, description);
    appendToken(parts, description);
    appendTrim(parts, description);
    appendTruncate(parts, description);
    appendUri(parts, description);
    return parts.join("");
};
var alternativesDescriptionToString = function (description) {
    var parts = ["Joi.alternatives()"];
    var flags = description.flags;
    var matchMode = (flags === null || flags === void 0 ? void 0 : flags.match) || "any";
    parts.push(".match(\"".concat(matchMode, "\")"));
    var matches = description.matches.map(function (match) {
        return descriptionToString(match.schema);
    });
    parts.push(".try(".concat(matches.join(","), ")"));
    appendCommon(parts, description);
    return parts.join("");
};
var descriptionToString = function (description) {
    switch (description.type) {
        case "any":
            return anyDescriptionToString(description);
        case "array":
            return arrayDescriptionToString(description);
        case "binary":
            return binaryDescriptionToString(description);
        case "boolean":
            return booleanDescriptionToString(description);
        case "date":
            return dateDescriptionToString(description);
        case "number":
            return numberDescriptionToString(description);
        case "object":
            return objectDescriptionToString(description);
        case "string":
            return stringDescriptionToString(description);
        case "alternatives":
            return alternativesDescriptionToString(description);
        default:
            throw new Error("Unexpected type: ".concat(description.type));
    }
};
var addPresenceToDescription = function (description, presence) {
    var _a;
    // eslint-disable-next-line no-param-reassign
    description.flags = __assign(__assign({}, ((_a = description.flags) !== null && _a !== void 0 ? _a : {})), { presence: presence });
};
exports.default = (function (schema, presence) {
    var description = schema.describe();
    if (presence !== undefined) {
        addPresenceToDescription(description, presence);
    }
    return descriptionToString(description);
});
