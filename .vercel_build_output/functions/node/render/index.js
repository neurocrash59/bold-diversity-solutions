var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};

// .svelte-kit/vercel/entry.js
__export(exports, {
  default: () => entry_default
});

// node_modules/@sveltejs/kit/dist/install-fetch.js
var import_http = __toModule(require("http"));
var import_https = __toModule(require("https"));
var import_zlib = __toModule(require("zlib"));
var import_stream = __toModule(require("stream"));
var import_util = __toModule(require("util"));
var import_crypto = __toModule(require("crypto"));
var import_url = __toModule(require("url"));
function dataUriToBuffer(uri) {
  if (!/^data:/i.test(uri)) {
    throw new TypeError('`uri` does not appear to be a Data URI (must begin with "data:")');
  }
  uri = uri.replace(/\r?\n/g, "");
  const firstComma = uri.indexOf(",");
  if (firstComma === -1 || firstComma <= 4) {
    throw new TypeError("malformed data: URI");
  }
  const meta = uri.substring(5, firstComma).split(";");
  let charset = "";
  let base64 = false;
  const type = meta[0] || "text/plain";
  let typeFull = type;
  for (let i = 1; i < meta.length; i++) {
    if (meta[i] === "base64") {
      base64 = true;
    } else {
      typeFull += `;${meta[i]}`;
      if (meta[i].indexOf("charset=") === 0) {
        charset = meta[i].substring(8);
      }
    }
  }
  if (!meta[0] && !charset.length) {
    typeFull += ";charset=US-ASCII";
    charset = "US-ASCII";
  }
  const encoding = base64 ? "base64" : "ascii";
  const data = unescape(uri.substring(firstComma + 1));
  const buffer = Buffer.from(data, encoding);
  buffer.type = type;
  buffer.typeFull = typeFull;
  buffer.charset = charset;
  return buffer;
}
var src = dataUriToBuffer;
var dataUriToBuffer$1 = src;
var { Readable } = import_stream.default;
var wm = new WeakMap();
async function* read(parts) {
  for (const part of parts) {
    if ("stream" in part) {
      yield* part.stream();
    } else {
      yield part;
    }
  }
}
var Blob = class {
  constructor(blobParts = [], options2 = {}) {
    let size = 0;
    const parts = blobParts.map((element) => {
      let buffer;
      if (element instanceof Buffer) {
        buffer = element;
      } else if (ArrayBuffer.isView(element)) {
        buffer = Buffer.from(element.buffer, element.byteOffset, element.byteLength);
      } else if (element instanceof ArrayBuffer) {
        buffer = Buffer.from(element);
      } else if (element instanceof Blob) {
        buffer = element;
      } else {
        buffer = Buffer.from(typeof element === "string" ? element : String(element));
      }
      size += buffer.length || buffer.size || 0;
      return buffer;
    });
    const type = options2.type === void 0 ? "" : String(options2.type).toLowerCase();
    wm.set(this, {
      type: /[^\u0020-\u007E]/.test(type) ? "" : type,
      size,
      parts
    });
  }
  get size() {
    return wm.get(this).size;
  }
  get type() {
    return wm.get(this).type;
  }
  async text() {
    return Buffer.from(await this.arrayBuffer()).toString();
  }
  async arrayBuffer() {
    const data = new Uint8Array(this.size);
    let offset = 0;
    for await (const chunk of this.stream()) {
      data.set(chunk, offset);
      offset += chunk.length;
    }
    return data.buffer;
  }
  stream() {
    return Readable.from(read(wm.get(this).parts));
  }
  slice(start = 0, end = this.size, type = "") {
    const { size } = this;
    let relativeStart = start < 0 ? Math.max(size + start, 0) : Math.min(start, size);
    let relativeEnd = end < 0 ? Math.max(size + end, 0) : Math.min(end, size);
    const span = Math.max(relativeEnd - relativeStart, 0);
    const parts = wm.get(this).parts.values();
    const blobParts = [];
    let added = 0;
    for (const part of parts) {
      const size2 = ArrayBuffer.isView(part) ? part.byteLength : part.size;
      if (relativeStart && size2 <= relativeStart) {
        relativeStart -= size2;
        relativeEnd -= size2;
      } else {
        const chunk = part.slice(relativeStart, Math.min(size2, relativeEnd));
        blobParts.push(chunk);
        added += ArrayBuffer.isView(chunk) ? chunk.byteLength : chunk.size;
        relativeStart = 0;
        if (added >= span) {
          break;
        }
      }
    }
    const blob = new Blob([], { type: String(type).toLowerCase() });
    Object.assign(wm.get(blob), { size: span, parts: blobParts });
    return blob;
  }
  get [Symbol.toStringTag]() {
    return "Blob";
  }
  static [Symbol.hasInstance](object) {
    return object && typeof object === "object" && typeof object.stream === "function" && object.stream.length === 0 && typeof object.constructor === "function" && /^(Blob|File)$/.test(object[Symbol.toStringTag]);
  }
};
Object.defineProperties(Blob.prototype, {
  size: { enumerable: true },
  type: { enumerable: true },
  slice: { enumerable: true }
});
var fetchBlob = Blob;
var Blob$1 = fetchBlob;
var FetchBaseError = class extends Error {
  constructor(message, type) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
    this.type = type;
  }
  get name() {
    return this.constructor.name;
  }
  get [Symbol.toStringTag]() {
    return this.constructor.name;
  }
};
var FetchError = class extends FetchBaseError {
  constructor(message, type, systemError) {
    super(message, type);
    if (systemError) {
      this.code = this.errno = systemError.code;
      this.erroredSysCall = systemError.syscall;
    }
  }
};
var NAME = Symbol.toStringTag;
var isURLSearchParameters = (object) => {
  return typeof object === "object" && typeof object.append === "function" && typeof object.delete === "function" && typeof object.get === "function" && typeof object.getAll === "function" && typeof object.has === "function" && typeof object.set === "function" && typeof object.sort === "function" && object[NAME] === "URLSearchParams";
};
var isBlob = (object) => {
  return typeof object === "object" && typeof object.arrayBuffer === "function" && typeof object.type === "string" && typeof object.stream === "function" && typeof object.constructor === "function" && /^(Blob|File)$/.test(object[NAME]);
};
function isFormData(object) {
  return typeof object === "object" && typeof object.append === "function" && typeof object.set === "function" && typeof object.get === "function" && typeof object.getAll === "function" && typeof object.delete === "function" && typeof object.keys === "function" && typeof object.values === "function" && typeof object.entries === "function" && typeof object.constructor === "function" && object[NAME] === "FormData";
}
var isAbortSignal = (object) => {
  return typeof object === "object" && object[NAME] === "AbortSignal";
};
var carriage = "\r\n";
var dashes = "-".repeat(2);
var carriageLength = Buffer.byteLength(carriage);
var getFooter = (boundary) => `${dashes}${boundary}${dashes}${carriage.repeat(2)}`;
function getHeader(boundary, name, field) {
  let header = "";
  header += `${dashes}${boundary}${carriage}`;
  header += `Content-Disposition: form-data; name="${name}"`;
  if (isBlob(field)) {
    header += `; filename="${field.name}"${carriage}`;
    header += `Content-Type: ${field.type || "application/octet-stream"}`;
  }
  return `${header}${carriage.repeat(2)}`;
}
var getBoundary = () => (0, import_crypto.randomBytes)(8).toString("hex");
async function* formDataIterator(form, boundary) {
  for (const [name, value] of form) {
    yield getHeader(boundary, name, value);
    if (isBlob(value)) {
      yield* value.stream();
    } else {
      yield value;
    }
    yield carriage;
  }
  yield getFooter(boundary);
}
function getFormDataLength(form, boundary) {
  let length = 0;
  for (const [name, value] of form) {
    length += Buffer.byteLength(getHeader(boundary, name, value));
    if (isBlob(value)) {
      length += value.size;
    } else {
      length += Buffer.byteLength(String(value));
    }
    length += carriageLength;
  }
  length += Buffer.byteLength(getFooter(boundary));
  return length;
}
var INTERNALS$2 = Symbol("Body internals");
var Body = class {
  constructor(body, {
    size = 0
  } = {}) {
    let boundary = null;
    if (body === null) {
      body = null;
    } else if (isURLSearchParameters(body)) {
      body = Buffer.from(body.toString());
    } else if (isBlob(body))
      ;
    else if (Buffer.isBuffer(body))
      ;
    else if (import_util.types.isAnyArrayBuffer(body)) {
      body = Buffer.from(body);
    } else if (ArrayBuffer.isView(body)) {
      body = Buffer.from(body.buffer, body.byteOffset, body.byteLength);
    } else if (body instanceof import_stream.default)
      ;
    else if (isFormData(body)) {
      boundary = `NodeFetchFormDataBoundary${getBoundary()}`;
      body = import_stream.default.Readable.from(formDataIterator(body, boundary));
    } else {
      body = Buffer.from(String(body));
    }
    this[INTERNALS$2] = {
      body,
      boundary,
      disturbed: false,
      error: null
    };
    this.size = size;
    if (body instanceof import_stream.default) {
      body.on("error", (err) => {
        const error2 = err instanceof FetchBaseError ? err : new FetchError(`Invalid response body while trying to fetch ${this.url}: ${err.message}`, "system", err);
        this[INTERNALS$2].error = error2;
      });
    }
  }
  get body() {
    return this[INTERNALS$2].body;
  }
  get bodyUsed() {
    return this[INTERNALS$2].disturbed;
  }
  async arrayBuffer() {
    const { buffer, byteOffset, byteLength } = await consumeBody(this);
    return buffer.slice(byteOffset, byteOffset + byteLength);
  }
  async blob() {
    const ct = this.headers && this.headers.get("content-type") || this[INTERNALS$2].body && this[INTERNALS$2].body.type || "";
    const buf = await this.buffer();
    return new Blob$1([buf], {
      type: ct
    });
  }
  async json() {
    const buffer = await consumeBody(this);
    return JSON.parse(buffer.toString());
  }
  async text() {
    const buffer = await consumeBody(this);
    return buffer.toString();
  }
  buffer() {
    return consumeBody(this);
  }
};
Object.defineProperties(Body.prototype, {
  body: { enumerable: true },
  bodyUsed: { enumerable: true },
  arrayBuffer: { enumerable: true },
  blob: { enumerable: true },
  json: { enumerable: true },
  text: { enumerable: true }
});
async function consumeBody(data) {
  if (data[INTERNALS$2].disturbed) {
    throw new TypeError(`body used already for: ${data.url}`);
  }
  data[INTERNALS$2].disturbed = true;
  if (data[INTERNALS$2].error) {
    throw data[INTERNALS$2].error;
  }
  let { body } = data;
  if (body === null) {
    return Buffer.alloc(0);
  }
  if (isBlob(body)) {
    body = body.stream();
  }
  if (Buffer.isBuffer(body)) {
    return body;
  }
  if (!(body instanceof import_stream.default)) {
    return Buffer.alloc(0);
  }
  const accum = [];
  let accumBytes = 0;
  try {
    for await (const chunk of body) {
      if (data.size > 0 && accumBytes + chunk.length > data.size) {
        const err = new FetchError(`content size at ${data.url} over limit: ${data.size}`, "max-size");
        body.destroy(err);
        throw err;
      }
      accumBytes += chunk.length;
      accum.push(chunk);
    }
  } catch (error2) {
    if (error2 instanceof FetchBaseError) {
      throw error2;
    } else {
      throw new FetchError(`Invalid response body while trying to fetch ${data.url}: ${error2.message}`, "system", error2);
    }
  }
  if (body.readableEnded === true || body._readableState.ended === true) {
    try {
      if (accum.every((c) => typeof c === "string")) {
        return Buffer.from(accum.join(""));
      }
      return Buffer.concat(accum, accumBytes);
    } catch (error2) {
      throw new FetchError(`Could not create Buffer from response body for ${data.url}: ${error2.message}`, "system", error2);
    }
  } else {
    throw new FetchError(`Premature close of server response while trying to fetch ${data.url}`);
  }
}
var clone = (instance, highWaterMark) => {
  let p1;
  let p2;
  let { body } = instance;
  if (instance.bodyUsed) {
    throw new Error("cannot clone body after it is used");
  }
  if (body instanceof import_stream.default && typeof body.getBoundary !== "function") {
    p1 = new import_stream.PassThrough({ highWaterMark });
    p2 = new import_stream.PassThrough({ highWaterMark });
    body.pipe(p1);
    body.pipe(p2);
    instance[INTERNALS$2].body = p1;
    body = p2;
  }
  return body;
};
var extractContentType = (body, request) => {
  if (body === null) {
    return null;
  }
  if (typeof body === "string") {
    return "text/plain;charset=UTF-8";
  }
  if (isURLSearchParameters(body)) {
    return "application/x-www-form-urlencoded;charset=UTF-8";
  }
  if (isBlob(body)) {
    return body.type || null;
  }
  if (Buffer.isBuffer(body) || import_util.types.isAnyArrayBuffer(body) || ArrayBuffer.isView(body)) {
    return null;
  }
  if (body && typeof body.getBoundary === "function") {
    return `multipart/form-data;boundary=${body.getBoundary()}`;
  }
  if (isFormData(body)) {
    return `multipart/form-data; boundary=${request[INTERNALS$2].boundary}`;
  }
  if (body instanceof import_stream.default) {
    return null;
  }
  return "text/plain;charset=UTF-8";
};
var getTotalBytes = (request) => {
  const { body } = request;
  if (body === null) {
    return 0;
  }
  if (isBlob(body)) {
    return body.size;
  }
  if (Buffer.isBuffer(body)) {
    return body.length;
  }
  if (body && typeof body.getLengthSync === "function") {
    return body.hasKnownLength && body.hasKnownLength() ? body.getLengthSync() : null;
  }
  if (isFormData(body)) {
    return getFormDataLength(request[INTERNALS$2].boundary);
  }
  return null;
};
var writeToStream = (dest, { body }) => {
  if (body === null) {
    dest.end();
  } else if (isBlob(body)) {
    body.stream().pipe(dest);
  } else if (Buffer.isBuffer(body)) {
    dest.write(body);
    dest.end();
  } else {
    body.pipe(dest);
  }
};
var validateHeaderName = typeof import_http.default.validateHeaderName === "function" ? import_http.default.validateHeaderName : (name) => {
  if (!/^[\^`\-\w!#$%&'*+.|~]+$/.test(name)) {
    const err = new TypeError(`Header name must be a valid HTTP token [${name}]`);
    Object.defineProperty(err, "code", { value: "ERR_INVALID_HTTP_TOKEN" });
    throw err;
  }
};
var validateHeaderValue = typeof import_http.default.validateHeaderValue === "function" ? import_http.default.validateHeaderValue : (name, value) => {
  if (/[^\t\u0020-\u007E\u0080-\u00FF]/.test(value)) {
    const err = new TypeError(`Invalid character in header content ["${name}"]`);
    Object.defineProperty(err, "code", { value: "ERR_INVALID_CHAR" });
    throw err;
  }
};
var Headers = class extends URLSearchParams {
  constructor(init2) {
    let result = [];
    if (init2 instanceof Headers) {
      const raw = init2.raw();
      for (const [name, values] of Object.entries(raw)) {
        result.push(...values.map((value) => [name, value]));
      }
    } else if (init2 == null)
      ;
    else if (typeof init2 === "object" && !import_util.types.isBoxedPrimitive(init2)) {
      const method = init2[Symbol.iterator];
      if (method == null) {
        result.push(...Object.entries(init2));
      } else {
        if (typeof method !== "function") {
          throw new TypeError("Header pairs must be iterable");
        }
        result = [...init2].map((pair) => {
          if (typeof pair !== "object" || import_util.types.isBoxedPrimitive(pair)) {
            throw new TypeError("Each header pair must be an iterable object");
          }
          return [...pair];
        }).map((pair) => {
          if (pair.length !== 2) {
            throw new TypeError("Each header pair must be a name/value tuple");
          }
          return [...pair];
        });
      }
    } else {
      throw new TypeError("Failed to construct 'Headers': The provided value is not of type '(sequence<sequence<ByteString>> or record<ByteString, ByteString>)");
    }
    result = result.length > 0 ? result.map(([name, value]) => {
      validateHeaderName(name);
      validateHeaderValue(name, String(value));
      return [String(name).toLowerCase(), String(value)];
    }) : void 0;
    super(result);
    return new Proxy(this, {
      get(target, p, receiver) {
        switch (p) {
          case "append":
          case "set":
            return (name, value) => {
              validateHeaderName(name);
              validateHeaderValue(name, String(value));
              return URLSearchParams.prototype[p].call(receiver, String(name).toLowerCase(), String(value));
            };
          case "delete":
          case "has":
          case "getAll":
            return (name) => {
              validateHeaderName(name);
              return URLSearchParams.prototype[p].call(receiver, String(name).toLowerCase());
            };
          case "keys":
            return () => {
              target.sort();
              return new Set(URLSearchParams.prototype.keys.call(target)).keys();
            };
          default:
            return Reflect.get(target, p, receiver);
        }
      }
    });
  }
  get [Symbol.toStringTag]() {
    return this.constructor.name;
  }
  toString() {
    return Object.prototype.toString.call(this);
  }
  get(name) {
    const values = this.getAll(name);
    if (values.length === 0) {
      return null;
    }
    let value = values.join(", ");
    if (/^content-encoding$/i.test(name)) {
      value = value.toLowerCase();
    }
    return value;
  }
  forEach(callback) {
    for (const name of this.keys()) {
      callback(this.get(name), name);
    }
  }
  *values() {
    for (const name of this.keys()) {
      yield this.get(name);
    }
  }
  *entries() {
    for (const name of this.keys()) {
      yield [name, this.get(name)];
    }
  }
  [Symbol.iterator]() {
    return this.entries();
  }
  raw() {
    return [...this.keys()].reduce((result, key) => {
      result[key] = this.getAll(key);
      return result;
    }, {});
  }
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return [...this.keys()].reduce((result, key) => {
      const values = this.getAll(key);
      if (key === "host") {
        result[key] = values[0];
      } else {
        result[key] = values.length > 1 ? values : values[0];
      }
      return result;
    }, {});
  }
};
Object.defineProperties(Headers.prototype, ["get", "entries", "forEach", "values"].reduce((result, property) => {
  result[property] = { enumerable: true };
  return result;
}, {}));
function fromRawHeaders(headers = []) {
  return new Headers(headers.reduce((result, value, index2, array) => {
    if (index2 % 2 === 0) {
      result.push(array.slice(index2, index2 + 2));
    }
    return result;
  }, []).filter(([name, value]) => {
    try {
      validateHeaderName(name);
      validateHeaderValue(name, String(value));
      return true;
    } catch {
      return false;
    }
  }));
}
var redirectStatus = new Set([301, 302, 303, 307, 308]);
var isRedirect = (code) => {
  return redirectStatus.has(code);
};
var INTERNALS$1 = Symbol("Response internals");
var Response = class extends Body {
  constructor(body = null, options2 = {}) {
    super(body, options2);
    const status = options2.status || 200;
    const headers = new Headers(options2.headers);
    if (body !== null && !headers.has("Content-Type")) {
      const contentType = extractContentType(body);
      if (contentType) {
        headers.append("Content-Type", contentType);
      }
    }
    this[INTERNALS$1] = {
      url: options2.url,
      status,
      statusText: options2.statusText || "",
      headers,
      counter: options2.counter,
      highWaterMark: options2.highWaterMark
    };
  }
  get url() {
    return this[INTERNALS$1].url || "";
  }
  get status() {
    return this[INTERNALS$1].status;
  }
  get ok() {
    return this[INTERNALS$1].status >= 200 && this[INTERNALS$1].status < 300;
  }
  get redirected() {
    return this[INTERNALS$1].counter > 0;
  }
  get statusText() {
    return this[INTERNALS$1].statusText;
  }
  get headers() {
    return this[INTERNALS$1].headers;
  }
  get highWaterMark() {
    return this[INTERNALS$1].highWaterMark;
  }
  clone() {
    return new Response(clone(this, this.highWaterMark), {
      url: this.url,
      status: this.status,
      statusText: this.statusText,
      headers: this.headers,
      ok: this.ok,
      redirected: this.redirected,
      size: this.size
    });
  }
  static redirect(url, status = 302) {
    if (!isRedirect(status)) {
      throw new RangeError('Failed to execute "redirect" on "response": Invalid status code');
    }
    return new Response(null, {
      headers: {
        location: new URL(url).toString()
      },
      status
    });
  }
  get [Symbol.toStringTag]() {
    return "Response";
  }
};
Object.defineProperties(Response.prototype, {
  url: { enumerable: true },
  status: { enumerable: true },
  ok: { enumerable: true },
  redirected: { enumerable: true },
  statusText: { enumerable: true },
  headers: { enumerable: true },
  clone: { enumerable: true }
});
var getSearch = (parsedURL) => {
  if (parsedURL.search) {
    return parsedURL.search;
  }
  const lastOffset = parsedURL.href.length - 1;
  const hash2 = parsedURL.hash || (parsedURL.href[lastOffset] === "#" ? "#" : "");
  return parsedURL.href[lastOffset - hash2.length] === "?" ? "?" : "";
};
var INTERNALS = Symbol("Request internals");
var isRequest = (object) => {
  return typeof object === "object" && typeof object[INTERNALS] === "object";
};
var Request = class extends Body {
  constructor(input, init2 = {}) {
    let parsedURL;
    if (isRequest(input)) {
      parsedURL = new URL(input.url);
    } else {
      parsedURL = new URL(input);
      input = {};
    }
    let method = init2.method || input.method || "GET";
    method = method.toUpperCase();
    if ((init2.body != null || isRequest(input)) && input.body !== null && (method === "GET" || method === "HEAD")) {
      throw new TypeError("Request with GET/HEAD method cannot have body");
    }
    const inputBody = init2.body ? init2.body : isRequest(input) && input.body !== null ? clone(input) : null;
    super(inputBody, {
      size: init2.size || input.size || 0
    });
    const headers = new Headers(init2.headers || input.headers || {});
    if (inputBody !== null && !headers.has("Content-Type")) {
      const contentType = extractContentType(inputBody, this);
      if (contentType) {
        headers.append("Content-Type", contentType);
      }
    }
    let signal = isRequest(input) ? input.signal : null;
    if ("signal" in init2) {
      signal = init2.signal;
    }
    if (signal !== null && !isAbortSignal(signal)) {
      throw new TypeError("Expected signal to be an instanceof AbortSignal");
    }
    this[INTERNALS] = {
      method,
      redirect: init2.redirect || input.redirect || "follow",
      headers,
      parsedURL,
      signal
    };
    this.follow = init2.follow === void 0 ? input.follow === void 0 ? 20 : input.follow : init2.follow;
    this.compress = init2.compress === void 0 ? input.compress === void 0 ? true : input.compress : init2.compress;
    this.counter = init2.counter || input.counter || 0;
    this.agent = init2.agent || input.agent;
    this.highWaterMark = init2.highWaterMark || input.highWaterMark || 16384;
    this.insecureHTTPParser = init2.insecureHTTPParser || input.insecureHTTPParser || false;
  }
  get method() {
    return this[INTERNALS].method;
  }
  get url() {
    return (0, import_url.format)(this[INTERNALS].parsedURL);
  }
  get headers() {
    return this[INTERNALS].headers;
  }
  get redirect() {
    return this[INTERNALS].redirect;
  }
  get signal() {
    return this[INTERNALS].signal;
  }
  clone() {
    return new Request(this);
  }
  get [Symbol.toStringTag]() {
    return "Request";
  }
};
Object.defineProperties(Request.prototype, {
  method: { enumerable: true },
  url: { enumerable: true },
  headers: { enumerable: true },
  redirect: { enumerable: true },
  clone: { enumerable: true },
  signal: { enumerable: true }
});
var getNodeRequestOptions = (request) => {
  const { parsedURL } = request[INTERNALS];
  const headers = new Headers(request[INTERNALS].headers);
  if (!headers.has("Accept")) {
    headers.set("Accept", "*/*");
  }
  let contentLengthValue = null;
  if (request.body === null && /^(post|put)$/i.test(request.method)) {
    contentLengthValue = "0";
  }
  if (request.body !== null) {
    const totalBytes = getTotalBytes(request);
    if (typeof totalBytes === "number" && !Number.isNaN(totalBytes)) {
      contentLengthValue = String(totalBytes);
    }
  }
  if (contentLengthValue) {
    headers.set("Content-Length", contentLengthValue);
  }
  if (!headers.has("User-Agent")) {
    headers.set("User-Agent", "node-fetch");
  }
  if (request.compress && !headers.has("Accept-Encoding")) {
    headers.set("Accept-Encoding", "gzip,deflate,br");
  }
  let { agent } = request;
  if (typeof agent === "function") {
    agent = agent(parsedURL);
  }
  if (!headers.has("Connection") && !agent) {
    headers.set("Connection", "close");
  }
  const search = getSearch(parsedURL);
  const requestOptions = {
    path: parsedURL.pathname + search,
    pathname: parsedURL.pathname,
    hostname: parsedURL.hostname,
    protocol: parsedURL.protocol,
    port: parsedURL.port,
    hash: parsedURL.hash,
    search: parsedURL.search,
    query: parsedURL.query,
    href: parsedURL.href,
    method: request.method,
    headers: headers[Symbol.for("nodejs.util.inspect.custom")](),
    insecureHTTPParser: request.insecureHTTPParser,
    agent
  };
  return requestOptions;
};
var AbortError = class extends FetchBaseError {
  constructor(message, type = "aborted") {
    super(message, type);
  }
};
var supportedSchemas = new Set(["data:", "http:", "https:"]);
async function fetch(url, options_) {
  return new Promise((resolve2, reject) => {
    const request = new Request(url, options_);
    const options2 = getNodeRequestOptions(request);
    if (!supportedSchemas.has(options2.protocol)) {
      throw new TypeError(`node-fetch cannot load ${url}. URL scheme "${options2.protocol.replace(/:$/, "")}" is not supported.`);
    }
    if (options2.protocol === "data:") {
      const data = dataUriToBuffer$1(request.url);
      const response2 = new Response(data, { headers: { "Content-Type": data.typeFull } });
      resolve2(response2);
      return;
    }
    const send = (options2.protocol === "https:" ? import_https.default : import_http.default).request;
    const { signal } = request;
    let response = null;
    const abort = () => {
      const error2 = new AbortError("The operation was aborted.");
      reject(error2);
      if (request.body && request.body instanceof import_stream.default.Readable) {
        request.body.destroy(error2);
      }
      if (!response || !response.body) {
        return;
      }
      response.body.emit("error", error2);
    };
    if (signal && signal.aborted) {
      abort();
      return;
    }
    const abortAndFinalize = () => {
      abort();
      finalize();
    };
    const request_ = send(options2);
    if (signal) {
      signal.addEventListener("abort", abortAndFinalize);
    }
    const finalize = () => {
      request_.abort();
      if (signal) {
        signal.removeEventListener("abort", abortAndFinalize);
      }
    };
    request_.on("error", (err) => {
      reject(new FetchError(`request to ${request.url} failed, reason: ${err.message}`, "system", err));
      finalize();
    });
    request_.on("response", (response_) => {
      request_.setTimeout(0);
      const headers = fromRawHeaders(response_.rawHeaders);
      if (isRedirect(response_.statusCode)) {
        const location = headers.get("Location");
        const locationURL = location === null ? null : new URL(location, request.url);
        switch (request.redirect) {
          case "error":
            reject(new FetchError(`uri requested responds with a redirect, redirect mode is set to error: ${request.url}`, "no-redirect"));
            finalize();
            return;
          case "manual":
            if (locationURL !== null) {
              try {
                headers.set("Location", locationURL);
              } catch (error2) {
                reject(error2);
              }
            }
            break;
          case "follow": {
            if (locationURL === null) {
              break;
            }
            if (request.counter >= request.follow) {
              reject(new FetchError(`maximum redirect reached at: ${request.url}`, "max-redirect"));
              finalize();
              return;
            }
            const requestOptions = {
              headers: new Headers(request.headers),
              follow: request.follow,
              counter: request.counter + 1,
              agent: request.agent,
              compress: request.compress,
              method: request.method,
              body: request.body,
              signal: request.signal,
              size: request.size
            };
            if (response_.statusCode !== 303 && request.body && options_.body instanceof import_stream.default.Readable) {
              reject(new FetchError("Cannot follow redirect with body being a readable stream", "unsupported-redirect"));
              finalize();
              return;
            }
            if (response_.statusCode === 303 || (response_.statusCode === 301 || response_.statusCode === 302) && request.method === "POST") {
              requestOptions.method = "GET";
              requestOptions.body = void 0;
              requestOptions.headers.delete("content-length");
            }
            resolve2(fetch(new Request(locationURL, requestOptions)));
            finalize();
            return;
          }
        }
      }
      response_.once("end", () => {
        if (signal) {
          signal.removeEventListener("abort", abortAndFinalize);
        }
      });
      let body = (0, import_stream.pipeline)(response_, new import_stream.PassThrough(), (error2) => {
        reject(error2);
      });
      if (process.version < "v12.10") {
        response_.on("aborted", abortAndFinalize);
      }
      const responseOptions = {
        url: request.url,
        status: response_.statusCode,
        statusText: response_.statusMessage,
        headers,
        size: request.size,
        counter: request.counter,
        highWaterMark: request.highWaterMark
      };
      const codings = headers.get("Content-Encoding");
      if (!request.compress || request.method === "HEAD" || codings === null || response_.statusCode === 204 || response_.statusCode === 304) {
        response = new Response(body, responseOptions);
        resolve2(response);
        return;
      }
      const zlibOptions = {
        flush: import_zlib.default.Z_SYNC_FLUSH,
        finishFlush: import_zlib.default.Z_SYNC_FLUSH
      };
      if (codings === "gzip" || codings === "x-gzip") {
        body = (0, import_stream.pipeline)(body, import_zlib.default.createGunzip(zlibOptions), (error2) => {
          reject(error2);
        });
        response = new Response(body, responseOptions);
        resolve2(response);
        return;
      }
      if (codings === "deflate" || codings === "x-deflate") {
        const raw = (0, import_stream.pipeline)(response_, new import_stream.PassThrough(), (error2) => {
          reject(error2);
        });
        raw.once("data", (chunk) => {
          if ((chunk[0] & 15) === 8) {
            body = (0, import_stream.pipeline)(body, import_zlib.default.createInflate(), (error2) => {
              reject(error2);
            });
          } else {
            body = (0, import_stream.pipeline)(body, import_zlib.default.createInflateRaw(), (error2) => {
              reject(error2);
            });
          }
          response = new Response(body, responseOptions);
          resolve2(response);
        });
        return;
      }
      if (codings === "br") {
        body = (0, import_stream.pipeline)(body, import_zlib.default.createBrotliDecompress(), (error2) => {
          reject(error2);
        });
        response = new Response(body, responseOptions);
        resolve2(response);
        return;
      }
      response = new Response(body, responseOptions);
      resolve2(response);
    });
    writeToStream(request_, request);
  });
}

// node_modules/@sveltejs/kit/dist/node.js
function getRawBody(req) {
  return new Promise((fulfil, reject) => {
    const h = req.headers;
    if (!h["content-type"]) {
      return fulfil(null);
    }
    req.on("error", reject);
    const length = Number(h["content-length"]);
    if (isNaN(length) && h["transfer-encoding"] == null) {
      return fulfil(null);
    }
    let data = new Uint8Array(length || 0);
    if (length > 0) {
      let offset = 0;
      req.on("data", (chunk) => {
        const new_len = offset + Buffer.byteLength(chunk);
        if (new_len > length) {
          return reject({
            status: 413,
            reason: 'Exceeded "Content-Length" limit'
          });
        }
        data.set(chunk, offset);
        offset = new_len;
      });
    } else {
      req.on("data", (chunk) => {
        const new_data = new Uint8Array(data.length + chunk.length);
        new_data.set(data, 0);
        new_data.set(chunk, data.length);
        data = new_data;
      });
    }
    req.on("end", () => {
      fulfil(data);
    });
  });
}

// .svelte-kit/output/server/app.js
var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter) => {
  __accessCheck(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet = (obj, member, value, setter) => {
  __accessCheck(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};
var _map;
function get_single_valued_header(headers, key) {
  const value = headers[key];
  if (Array.isArray(value)) {
    if (value.length === 0) {
      return void 0;
    }
    if (value.length > 1) {
      throw new Error(`Multiple headers provided for ${key}. Multiple may be provided only for set-cookie`);
    }
    return value[0];
  }
  return value;
}
function coalesce_to_error(err) {
  return err instanceof Error || err && err.name && err.message ? err : new Error(JSON.stringify(err));
}
function lowercase_keys(obj) {
  const clone2 = {};
  for (const key in obj) {
    clone2[key.toLowerCase()] = obj[key];
  }
  return clone2;
}
function error$1(body) {
  return {
    status: 500,
    body,
    headers: {}
  };
}
function is_string(s2) {
  return typeof s2 === "string" || s2 instanceof String;
}
function is_content_type_textual(content_type) {
  if (!content_type)
    return true;
  const [type] = content_type.split(";");
  return type === "text/plain" || type === "application/json" || type === "application/x-www-form-urlencoded" || type === "multipart/form-data";
}
async function render_endpoint(request, route, match) {
  const mod = await route.load();
  const handler = mod[request.method.toLowerCase().replace("delete", "del")];
  if (!handler) {
    return;
  }
  const params = route.params(match);
  const response = await handler({ ...request, params });
  const preface = `Invalid response from route ${request.path}`;
  if (!response) {
    return;
  }
  if (typeof response !== "object") {
    return error$1(`${preface}: expected an object, got ${typeof response}`);
  }
  let { status = 200, body, headers = {} } = response;
  headers = lowercase_keys(headers);
  const type = get_single_valued_header(headers, "content-type");
  const is_type_textual = is_content_type_textual(type);
  if (!is_type_textual && !(body instanceof Uint8Array || is_string(body))) {
    return error$1(`${preface}: body must be an instance of string or Uint8Array if content-type is not a supported textual content-type`);
  }
  let normalized_body;
  if ((typeof body === "object" || typeof body === "undefined") && !(body instanceof Uint8Array) && (!type || type.startsWith("application/json"))) {
    headers = { ...headers, "content-type": "application/json; charset=utf-8" };
    normalized_body = JSON.stringify(typeof body === "undefined" ? {} : body);
  } else {
    normalized_body = body;
  }
  return { status, body: normalized_body, headers };
}
var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_$";
var unsafeChars = /[<>\b\f\n\r\t\0\u2028\u2029]/g;
var reserved = /^(?:do|if|in|for|int|let|new|try|var|byte|case|char|else|enum|goto|long|this|void|with|await|break|catch|class|const|final|float|short|super|throw|while|yield|delete|double|export|import|native|return|switch|throws|typeof|boolean|default|extends|finally|package|private|abstract|continue|debugger|function|volatile|interface|protected|transient|implements|instanceof|synchronized)$/;
var escaped$1 = {
  "<": "\\u003C",
  ">": "\\u003E",
  "/": "\\u002F",
  "\\": "\\\\",
  "\b": "\\b",
  "\f": "\\f",
  "\n": "\\n",
  "\r": "\\r",
  "	": "\\t",
  "\0": "\\0",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
var objectProtoOwnPropertyNames = Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function devalue(value) {
  var counts = new Map();
  function walk(thing) {
    if (typeof thing === "function") {
      throw new Error("Cannot stringify a function");
    }
    if (counts.has(thing)) {
      counts.set(thing, counts.get(thing) + 1);
      return;
    }
    counts.set(thing, 1);
    if (!isPrimitive(thing)) {
      var type = getType(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
        case "Date":
        case "RegExp":
          return;
        case "Array":
          thing.forEach(walk);
          break;
        case "Set":
        case "Map":
          Array.from(thing).forEach(walk);
          break;
        default:
          var proto = Object.getPrototypeOf(thing);
          if (proto !== Object.prototype && proto !== null && Object.getOwnPropertyNames(proto).sort().join("\0") !== objectProtoOwnPropertyNames) {
            throw new Error("Cannot stringify arbitrary non-POJOs");
          }
          if (Object.getOwnPropertySymbols(thing).length > 0) {
            throw new Error("Cannot stringify POJOs with symbolic keys");
          }
          Object.keys(thing).forEach(function(key) {
            return walk(thing[key]);
          });
      }
    }
  }
  walk(value);
  var names = new Map();
  Array.from(counts).filter(function(entry) {
    return entry[1] > 1;
  }).sort(function(a, b) {
    return b[1] - a[1];
  }).forEach(function(entry, i) {
    names.set(entry[0], getName(i));
  });
  function stringify(thing) {
    if (names.has(thing)) {
      return names.get(thing);
    }
    if (isPrimitive(thing)) {
      return stringifyPrimitive(thing);
    }
    var type = getType(thing);
    switch (type) {
      case "Number":
      case "String":
      case "Boolean":
        return "Object(" + stringify(thing.valueOf()) + ")";
      case "RegExp":
        return "new RegExp(" + stringifyString(thing.source) + ', "' + thing.flags + '")';
      case "Date":
        return "new Date(" + thing.getTime() + ")";
      case "Array":
        var members = thing.map(function(v, i) {
          return i in thing ? stringify(v) : "";
        });
        var tail = thing.length === 0 || thing.length - 1 in thing ? "" : ",";
        return "[" + members.join(",") + tail + "]";
      case "Set":
      case "Map":
        return "new " + type + "([" + Array.from(thing).map(stringify).join(",") + "])";
      default:
        var obj = "{" + Object.keys(thing).map(function(key) {
          return safeKey(key) + ":" + stringify(thing[key]);
        }).join(",") + "}";
        var proto = Object.getPrototypeOf(thing);
        if (proto === null) {
          return Object.keys(thing).length > 0 ? "Object.assign(Object.create(null)," + obj + ")" : "Object.create(null)";
        }
        return obj;
    }
  }
  var str = stringify(value);
  if (names.size) {
    var params_1 = [];
    var statements_1 = [];
    var values_1 = [];
    names.forEach(function(name, thing) {
      params_1.push(name);
      if (isPrimitive(thing)) {
        values_1.push(stringifyPrimitive(thing));
        return;
      }
      var type = getType(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
          values_1.push("Object(" + stringify(thing.valueOf()) + ")");
          break;
        case "RegExp":
          values_1.push(thing.toString());
          break;
        case "Date":
          values_1.push("new Date(" + thing.getTime() + ")");
          break;
        case "Array":
          values_1.push("Array(" + thing.length + ")");
          thing.forEach(function(v, i) {
            statements_1.push(name + "[" + i + "]=" + stringify(v));
          });
          break;
        case "Set":
          values_1.push("new Set");
          statements_1.push(name + "." + Array.from(thing).map(function(v) {
            return "add(" + stringify(v) + ")";
          }).join("."));
          break;
        case "Map":
          values_1.push("new Map");
          statements_1.push(name + "." + Array.from(thing).map(function(_a) {
            var k = _a[0], v = _a[1];
            return "set(" + stringify(k) + ", " + stringify(v) + ")";
          }).join("."));
          break;
        default:
          values_1.push(Object.getPrototypeOf(thing) === null ? "Object.create(null)" : "{}");
          Object.keys(thing).forEach(function(key) {
            statements_1.push("" + name + safeProp(key) + "=" + stringify(thing[key]));
          });
      }
    });
    statements_1.push("return " + str);
    return "(function(" + params_1.join(",") + "){" + statements_1.join(";") + "}(" + values_1.join(",") + "))";
  } else {
    return str;
  }
}
function getName(num) {
  var name = "";
  do {
    name = chars[num % chars.length] + name;
    num = ~~(num / chars.length) - 1;
  } while (num >= 0);
  return reserved.test(name) ? name + "_" : name;
}
function isPrimitive(thing) {
  return Object(thing) !== thing;
}
function stringifyPrimitive(thing) {
  if (typeof thing === "string")
    return stringifyString(thing);
  if (thing === void 0)
    return "void 0";
  if (thing === 0 && 1 / thing < 0)
    return "-0";
  var str = String(thing);
  if (typeof thing === "number")
    return str.replace(/^(-)?0\./, "$1.");
  return str;
}
function getType(thing) {
  return Object.prototype.toString.call(thing).slice(8, -1);
}
function escapeUnsafeChar(c) {
  return escaped$1[c] || c;
}
function escapeUnsafeChars(str) {
  return str.replace(unsafeChars, escapeUnsafeChar);
}
function safeKey(key) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key) ? key : escapeUnsafeChars(JSON.stringify(key));
}
function safeProp(key) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key) ? "." + key : "[" + escapeUnsafeChars(JSON.stringify(key)) + "]";
}
function stringifyString(str) {
  var result = '"';
  for (var i = 0; i < str.length; i += 1) {
    var char = str.charAt(i);
    var code = char.charCodeAt(0);
    if (char === '"') {
      result += '\\"';
    } else if (char in escaped$1) {
      result += escaped$1[char];
    } else if (code >= 55296 && code <= 57343) {
      var next = str.charCodeAt(i + 1);
      if (code <= 56319 && (next >= 56320 && next <= 57343)) {
        result += char + str[++i];
      } else {
        result += "\\u" + code.toString(16).toUpperCase();
      }
    } else {
      result += char;
    }
  }
  result += '"';
  return result;
}
function noop() {
}
function safe_not_equal(a, b) {
  return a != a ? b == b : a !== b || (a && typeof a === "object" || typeof a === "function");
}
Promise.resolve();
var subscriber_queue = [];
function writable(value, start = noop) {
  let stop;
  const subscribers = new Set();
  function set(new_value) {
    if (safe_not_equal(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue.length;
        for (const subscriber of subscribers) {
          subscriber[1]();
          subscriber_queue.push(subscriber, value);
        }
        if (run_queue) {
          for (let i = 0; i < subscriber_queue.length; i += 2) {
            subscriber_queue[i][0](subscriber_queue[i + 1]);
          }
          subscriber_queue.length = 0;
        }
      }
    }
  }
  function update(fn) {
    set(fn(value));
  }
  function subscribe(run2, invalidate = noop) {
    const subscriber = [run2, invalidate];
    subscribers.add(subscriber);
    if (subscribers.size === 1) {
      stop = start(set) || noop;
    }
    run2(value);
    return () => {
      subscribers.delete(subscriber);
      if (subscribers.size === 0) {
        stop();
        stop = null;
      }
    };
  }
  return { set, update, subscribe };
}
function hash(value) {
  let hash2 = 5381;
  let i = value.length;
  if (typeof value === "string") {
    while (i)
      hash2 = hash2 * 33 ^ value.charCodeAt(--i);
  } else {
    while (i)
      hash2 = hash2 * 33 ^ value[--i];
  }
  return (hash2 >>> 0).toString(36);
}
var s$1 = JSON.stringify;
async function render_response({
  branch,
  options: options2,
  $session,
  page_config,
  status,
  error: error2,
  page
}) {
  const css2 = new Set(options2.entry.css);
  const js = new Set(options2.entry.js);
  const styles = new Set();
  const serialized_data = [];
  let rendered;
  let is_private = false;
  let maxage;
  if (error2) {
    error2.stack = options2.get_stack(error2);
  }
  if (page_config.ssr) {
    branch.forEach(({ node, loaded, fetched, uses_credentials }) => {
      if (node.css)
        node.css.forEach((url) => css2.add(url));
      if (node.js)
        node.js.forEach((url) => js.add(url));
      if (node.styles)
        node.styles.forEach((content) => styles.add(content));
      if (fetched && page_config.hydrate)
        serialized_data.push(...fetched);
      if (uses_credentials)
        is_private = true;
      maxage = loaded.maxage;
    });
    const session = writable($session);
    const props = {
      stores: {
        page: writable(null),
        navigating: writable(null),
        session
      },
      page,
      components: branch.map(({ node }) => node.module.default)
    };
    for (let i = 0; i < branch.length; i += 1) {
      props[`props_${i}`] = await branch[i].loaded.props;
    }
    let session_tracking_active = false;
    const unsubscribe = session.subscribe(() => {
      if (session_tracking_active)
        is_private = true;
    });
    session_tracking_active = true;
    try {
      rendered = options2.root.render(props);
    } finally {
      unsubscribe();
    }
  } else {
    rendered = { head: "", html: "", css: { code: "", map: null } };
  }
  const include_js = page_config.router || page_config.hydrate;
  if (!include_js)
    js.clear();
  const links = options2.amp ? styles.size > 0 || rendered.css.code.length > 0 ? `<style amp-custom>${Array.from(styles).concat(rendered.css.code).join("\n")}</style>` : "" : [
    ...Array.from(js).map((dep) => `<link rel="modulepreload" href="${dep}">`),
    ...Array.from(css2).map((dep) => `<link rel="stylesheet" href="${dep}">`)
  ].join("\n		");
  let init2 = "";
  if (options2.amp) {
    init2 = `
		<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style>
		<noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
		<script async src="https://cdn.ampproject.org/v0.js"><\/script>`;
  } else if (include_js) {
    init2 = `<script type="module">
			import { start } from ${s$1(options2.entry.file)};
			start({
				target: ${options2.target ? `document.querySelector(${s$1(options2.target)})` : "document.body"},
				paths: ${s$1(options2.paths)},
				session: ${try_serialize($session, (error3) => {
      throw new Error(`Failed to serialize session data: ${error3.message}`);
    })},
				host: ${page && page.host ? s$1(page.host) : "location.host"},
				route: ${!!page_config.router},
				spa: ${!page_config.ssr},
				trailing_slash: ${s$1(options2.trailing_slash)},
				hydrate: ${page_config.ssr && page_config.hydrate ? `{
					status: ${status},
					error: ${serialize_error(error2)},
					nodes: [
						${(branch || []).map(({ node }) => `import(${s$1(node.entry)})`).join(",\n						")}
					],
					page: {
						host: ${page && page.host ? s$1(page.host) : "location.host"}, // TODO this is redundant
						path: ${s$1(page && page.path)},
						query: new URLSearchParams(${page ? s$1(page.query.toString()) : ""}),
						params: ${page && s$1(page.params)}
					}
				}` : "null"}
			});
		<\/script>`;
  }
  if (options2.service_worker) {
    init2 += `<script>
			if ('serviceWorker' in navigator) {
				navigator.serviceWorker.register('${options2.service_worker}');
			}
		<\/script>`;
  }
  const head = [
    rendered.head,
    styles.size && !options2.amp ? `<style data-svelte>${Array.from(styles).join("\n")}</style>` : "",
    links,
    init2
  ].join("\n\n		");
  const body = options2.amp ? rendered.html : `${rendered.html}

			${serialized_data.map(({ url, body: body2, json }) => {
    let attributes = `type="application/json" data-type="svelte-data" data-url="${url}"`;
    if (body2)
      attributes += ` data-body="${hash(body2)}"`;
    return `<script ${attributes}>${json}<\/script>`;
  }).join("\n\n	")}
		`;
  const headers = {
    "content-type": "text/html"
  };
  if (maxage) {
    headers["cache-control"] = `${is_private ? "private" : "public"}, max-age=${maxage}`;
  }
  if (!options2.floc) {
    headers["permissions-policy"] = "interest-cohort=()";
  }
  return {
    status,
    headers,
    body: options2.template({ head, body })
  };
}
function try_serialize(data, fail) {
  try {
    return devalue(data);
  } catch (err) {
    if (fail)
      fail(coalesce_to_error(err));
    return null;
  }
}
function serialize_error(error2) {
  if (!error2)
    return null;
  let serialized = try_serialize(error2);
  if (!serialized) {
    const { name, message, stack } = error2;
    serialized = try_serialize({ ...error2, name, message, stack });
  }
  if (!serialized) {
    serialized = "{}";
  }
  return serialized;
}
function normalize(loaded) {
  const has_error_status = loaded.status && loaded.status >= 400 && loaded.status <= 599 && !loaded.redirect;
  if (loaded.error || has_error_status) {
    const status = loaded.status;
    if (!loaded.error && has_error_status) {
      return {
        status: status || 500,
        error: new Error()
      };
    }
    const error2 = typeof loaded.error === "string" ? new Error(loaded.error) : loaded.error;
    if (!(error2 instanceof Error)) {
      return {
        status: 500,
        error: new Error(`"error" property returned from load() must be a string or instance of Error, received type "${typeof error2}"`)
      };
    }
    if (!status || status < 400 || status > 599) {
      console.warn('"error" returned from load() without a valid status code \u2014 defaulting to 500');
      return { status: 500, error: error2 };
    }
    return { status, error: error2 };
  }
  if (loaded.redirect) {
    if (!loaded.status || Math.floor(loaded.status / 100) !== 3) {
      return {
        status: 500,
        error: new Error('"redirect" property returned from load() must be accompanied by a 3xx status code')
      };
    }
    if (typeof loaded.redirect !== "string") {
      return {
        status: 500,
        error: new Error('"redirect" property returned from load() must be a string')
      };
    }
  }
  return loaded;
}
var s = JSON.stringify;
async function load_node({
  request,
  options: options2,
  state,
  route,
  page,
  node,
  $session,
  context,
  prerender_enabled,
  is_leaf,
  is_error,
  status,
  error: error2
}) {
  const { module: module2 } = node;
  let uses_credentials = false;
  const fetched = [];
  let set_cookie_headers = [];
  let loaded;
  const page_proxy = new Proxy(page, {
    get: (target, prop, receiver) => {
      if (prop === "query" && prerender_enabled) {
        throw new Error("Cannot access query on a page with prerendering enabled");
      }
      return Reflect.get(target, prop, receiver);
    }
  });
  if (module2.load) {
    const load_input = {
      page: page_proxy,
      get session() {
        uses_credentials = true;
        return $session;
      },
      fetch: async (resource, opts = {}) => {
        let url;
        if (typeof resource === "string") {
          url = resource;
        } else {
          url = resource.url;
          opts = {
            method: resource.method,
            headers: resource.headers,
            body: resource.body,
            mode: resource.mode,
            credentials: resource.credentials,
            cache: resource.cache,
            redirect: resource.redirect,
            referrer: resource.referrer,
            integrity: resource.integrity,
            ...opts
          };
        }
        const resolved = resolve(request.path, url.split("?")[0]);
        let response;
        const filename = resolved.replace(options2.paths.assets, "").slice(1);
        const filename_html = `${filename}/index.html`;
        const asset = options2.manifest.assets.find((d2) => d2.file === filename || d2.file === filename_html);
        if (asset) {
          response = options2.read ? new Response(options2.read(asset.file), {
            headers: asset.type ? { "content-type": asset.type } : {}
          }) : await fetch(`http://${page.host}/${asset.file}`, opts);
        } else if (resolved.startsWith("/") && !resolved.startsWith("//")) {
          const relative = resolved;
          const headers = {
            ...opts.headers
          };
          if (opts.credentials !== "omit") {
            uses_credentials = true;
            headers.cookie = request.headers.cookie;
            if (!headers.authorization) {
              headers.authorization = request.headers.authorization;
            }
          }
          if (opts.body && typeof opts.body !== "string") {
            throw new Error("Request body must be a string");
          }
          const search = url.includes("?") ? url.slice(url.indexOf("?") + 1) : "";
          const rendered = await respond({
            host: request.host,
            method: opts.method || "GET",
            headers,
            path: relative,
            rawBody: opts.body == null ? null : new TextEncoder().encode(opts.body),
            query: new URLSearchParams(search)
          }, options2, {
            fetched: url,
            initiator: route
          });
          if (rendered) {
            if (state.prerender) {
              state.prerender.dependencies.set(relative, rendered);
            }
            response = new Response(rendered.body, {
              status: rendered.status,
              headers: rendered.headers
            });
          }
        } else {
          if (resolved.startsWith("//")) {
            throw new Error(`Cannot request protocol-relative URL (${url}) in server-side fetch`);
          }
          if (typeof request.host !== "undefined") {
            const { hostname: fetch_hostname } = new URL(url);
            const [server_hostname] = request.host.split(":");
            if (`.${fetch_hostname}`.endsWith(`.${server_hostname}`) && opts.credentials !== "omit") {
              uses_credentials = true;
              opts.headers = {
                ...opts.headers,
                cookie: request.headers.cookie
              };
            }
          }
          const external_request = new Request(url, opts);
          response = await options2.hooks.externalFetch.call(null, external_request);
        }
        if (response) {
          const proxy = new Proxy(response, {
            get(response2, key, receiver) {
              async function text() {
                const body = await response2.text();
                const headers = {};
                for (const [key2, value] of response2.headers) {
                  if (key2 === "set-cookie") {
                    set_cookie_headers = set_cookie_headers.concat(value);
                  } else if (key2 !== "etag") {
                    headers[key2] = value;
                  }
                }
                if (!opts.body || typeof opts.body === "string") {
                  fetched.push({
                    url,
                    body: opts.body,
                    json: `{"status":${response2.status},"statusText":${s(response2.statusText)},"headers":${s(headers)},"body":${escape$1(body)}}`
                  });
                }
                return body;
              }
              if (key === "text") {
                return text;
              }
              if (key === "json") {
                return async () => {
                  return JSON.parse(await text());
                };
              }
              return Reflect.get(response2, key, response2);
            }
          });
          return proxy;
        }
        return response || new Response("Not found", {
          status: 404
        });
      },
      context: { ...context }
    };
    if (is_error) {
      load_input.status = status;
      load_input.error = error2;
    }
    loaded = await module2.load.call(null, load_input);
  } else {
    loaded = {};
  }
  if (!loaded && is_leaf && !is_error)
    return;
  if (!loaded) {
    throw new Error(`${node.entry} - load must return a value except for page fall through`);
  }
  return {
    node,
    loaded: normalize(loaded),
    context: loaded.context || context,
    fetched,
    set_cookie_headers,
    uses_credentials
  };
}
var escaped$2 = {
  "<": "\\u003C",
  ">": "\\u003E",
  "/": "\\u002F",
  "\\": "\\\\",
  "\b": "\\b",
  "\f": "\\f",
  "\n": "\\n",
  "\r": "\\r",
  "	": "\\t",
  "\0": "\\0",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
function escape$1(str) {
  let result = '"';
  for (let i = 0; i < str.length; i += 1) {
    const char = str.charAt(i);
    const code = char.charCodeAt(0);
    if (char === '"') {
      result += '\\"';
    } else if (char in escaped$2) {
      result += escaped$2[char];
    } else if (code >= 55296 && code <= 57343) {
      const next = str.charCodeAt(i + 1);
      if (code <= 56319 && next >= 56320 && next <= 57343) {
        result += char + str[++i];
      } else {
        result += `\\u${code.toString(16).toUpperCase()}`;
      }
    } else {
      result += char;
    }
  }
  result += '"';
  return result;
}
var absolute = /^([a-z]+:)?\/?\//;
function resolve(base2, path) {
  const base_match = absolute.exec(base2);
  const path_match = absolute.exec(path);
  if (!base_match) {
    throw new Error(`bad base path: "${base2}"`);
  }
  const baseparts = path_match ? [] : base2.slice(base_match[0].length).split("/");
  const pathparts = path_match ? path.slice(path_match[0].length).split("/") : path.split("/");
  baseparts.pop();
  for (let i = 0; i < pathparts.length; i += 1) {
    const part = pathparts[i];
    if (part === ".")
      continue;
    else if (part === "..")
      baseparts.pop();
    else
      baseparts.push(part);
  }
  const prefix = path_match && path_match[0] || base_match && base_match[0] || "";
  return `${prefix}${baseparts.join("/")}`;
}
async function respond_with_error({ request, options: options2, state, $session, status, error: error2 }) {
  const default_layout = await options2.load_component(options2.manifest.layout);
  const default_error = await options2.load_component(options2.manifest.error);
  const page = {
    host: request.host,
    path: request.path,
    query: request.query,
    params: {}
  };
  const loaded = await load_node({
    request,
    options: options2,
    state,
    route: null,
    page,
    node: default_layout,
    $session,
    context: {},
    prerender_enabled: is_prerender_enabled(options2, default_error, state),
    is_leaf: false,
    is_error: false
  });
  const branch = [
    loaded,
    await load_node({
      request,
      options: options2,
      state,
      route: null,
      page,
      node: default_error,
      $session,
      context: loaded ? loaded.context : {},
      prerender_enabled: is_prerender_enabled(options2, default_error, state),
      is_leaf: false,
      is_error: true,
      status,
      error: error2
    })
  ];
  try {
    return await render_response({
      options: options2,
      $session,
      page_config: {
        hydrate: options2.hydrate,
        router: options2.router,
        ssr: options2.ssr
      },
      status,
      error: error2,
      branch,
      page
    });
  } catch (err) {
    const error3 = coalesce_to_error(err);
    options2.handle_error(error3, request);
    return {
      status: 500,
      headers: {},
      body: error3.stack
    };
  }
}
function is_prerender_enabled(options2, node, state) {
  return options2.prerender && (!!node.module.prerender || !!state.prerender && state.prerender.all);
}
async function respond$1(opts) {
  const { request, options: options2, state, $session, route } = opts;
  let nodes;
  try {
    nodes = await Promise.all(route.a.map((id) => id ? options2.load_component(id) : void 0));
  } catch (err) {
    const error3 = coalesce_to_error(err);
    options2.handle_error(error3, request);
    return await respond_with_error({
      request,
      options: options2,
      state,
      $session,
      status: 500,
      error: error3
    });
  }
  const leaf = nodes[nodes.length - 1].module;
  let page_config = get_page_config(leaf, options2);
  if (!leaf.prerender && state.prerender && !state.prerender.all) {
    return {
      status: 204,
      headers: {},
      body: ""
    };
  }
  let branch = [];
  let status = 200;
  let error2;
  let set_cookie_headers = [];
  ssr:
    if (page_config.ssr) {
      let context = {};
      for (let i = 0; i < nodes.length; i += 1) {
        const node = nodes[i];
        let loaded;
        if (node) {
          try {
            loaded = await load_node({
              ...opts,
              node,
              context,
              prerender_enabled: is_prerender_enabled(options2, node, state),
              is_leaf: i === nodes.length - 1,
              is_error: false
            });
            if (!loaded)
              return;
            set_cookie_headers = set_cookie_headers.concat(loaded.set_cookie_headers);
            if (loaded.loaded.redirect) {
              return with_cookies({
                status: loaded.loaded.status,
                headers: {
                  location: encodeURI(loaded.loaded.redirect)
                }
              }, set_cookie_headers);
            }
            if (loaded.loaded.error) {
              ({ status, error: error2 } = loaded.loaded);
            }
          } catch (err) {
            const e = coalesce_to_error(err);
            options2.handle_error(e, request);
            status = 500;
            error2 = e;
          }
          if (loaded && !error2) {
            branch.push(loaded);
          }
          if (error2) {
            while (i--) {
              if (route.b[i]) {
                const error_node = await options2.load_component(route.b[i]);
                let node_loaded;
                let j = i;
                while (!(node_loaded = branch[j])) {
                  j -= 1;
                }
                try {
                  const error_loaded = await load_node({
                    ...opts,
                    node: error_node,
                    context: node_loaded.context,
                    prerender_enabled: is_prerender_enabled(options2, error_node, state),
                    is_leaf: false,
                    is_error: true,
                    status,
                    error: error2
                  });
                  if (error_loaded.loaded.error) {
                    continue;
                  }
                  page_config = get_page_config(error_node.module, options2);
                  branch = branch.slice(0, j + 1).concat(error_loaded);
                  break ssr;
                } catch (err) {
                  const e = coalesce_to_error(err);
                  options2.handle_error(e, request);
                  continue;
                }
              }
            }
            return with_cookies(await respond_with_error({
              request,
              options: options2,
              state,
              $session,
              status,
              error: error2
            }), set_cookie_headers);
          }
        }
        if (loaded && loaded.loaded.context) {
          context = {
            ...context,
            ...loaded.loaded.context
          };
        }
      }
    }
  try {
    return with_cookies(await render_response({
      ...opts,
      page_config,
      status,
      error: error2,
      branch: branch.filter(Boolean)
    }), set_cookie_headers);
  } catch (err) {
    const error3 = coalesce_to_error(err);
    options2.handle_error(error3, request);
    return with_cookies(await respond_with_error({
      ...opts,
      status: 500,
      error: error3
    }), set_cookie_headers);
  }
}
function get_page_config(leaf, options2) {
  return {
    ssr: "ssr" in leaf ? !!leaf.ssr : options2.ssr,
    router: "router" in leaf ? !!leaf.router : options2.router,
    hydrate: "hydrate" in leaf ? !!leaf.hydrate : options2.hydrate
  };
}
function with_cookies(response, set_cookie_headers) {
  if (set_cookie_headers.length) {
    response.headers["set-cookie"] = set_cookie_headers;
  }
  return response;
}
async function render_page(request, route, match, options2, state) {
  if (state.initiator === route) {
    return {
      status: 404,
      headers: {},
      body: `Not found: ${request.path}`
    };
  }
  const params = route.params(match);
  const page = {
    host: request.host,
    path: request.path,
    query: request.query,
    params
  };
  const $session = await options2.hooks.getSession(request);
  const response = await respond$1({
    request,
    options: options2,
    state,
    $session,
    route,
    page
  });
  if (response) {
    return response;
  }
  if (state.fetched) {
    return {
      status: 500,
      headers: {},
      body: `Bad request in load function: failed to fetch ${state.fetched}`
    };
  }
}
function read_only_form_data() {
  const map = new Map();
  return {
    append(key, value) {
      if (map.has(key)) {
        (map.get(key) || []).push(value);
      } else {
        map.set(key, [value]);
      }
    },
    data: new ReadOnlyFormData(map)
  };
}
var ReadOnlyFormData = class {
  constructor(map) {
    __privateAdd(this, _map, void 0);
    __privateSet(this, _map, map);
  }
  get(key) {
    const value = __privateGet(this, _map).get(key);
    return value && value[0];
  }
  getAll(key) {
    return __privateGet(this, _map).get(key);
  }
  has(key) {
    return __privateGet(this, _map).has(key);
  }
  *[Symbol.iterator]() {
    for (const [key, value] of __privateGet(this, _map)) {
      for (let i = 0; i < value.length; i += 1) {
        yield [key, value[i]];
      }
    }
  }
  *entries() {
    for (const [key, value] of __privateGet(this, _map)) {
      for (let i = 0; i < value.length; i += 1) {
        yield [key, value[i]];
      }
    }
  }
  *keys() {
    for (const [key] of __privateGet(this, _map))
      yield key;
  }
  *values() {
    for (const [, value] of __privateGet(this, _map)) {
      for (let i = 0; i < value.length; i += 1) {
        yield value[i];
      }
    }
  }
};
_map = new WeakMap();
function parse_body(raw, headers) {
  if (!raw)
    return raw;
  const content_type = headers["content-type"];
  const [type, ...directives] = content_type ? content_type.split(/;\s*/) : [];
  const text = () => new TextDecoder(headers["content-encoding"] || "utf-8").decode(raw);
  switch (type) {
    case "text/plain":
      return text();
    case "application/json":
      return JSON.parse(text());
    case "application/x-www-form-urlencoded":
      return get_urlencoded(text());
    case "multipart/form-data": {
      const boundary = directives.find((directive) => directive.startsWith("boundary="));
      if (!boundary)
        throw new Error("Missing boundary");
      return get_multipart(text(), boundary.slice("boundary=".length));
    }
    default:
      return raw;
  }
}
function get_urlencoded(text) {
  const { data, append } = read_only_form_data();
  text.replace(/\+/g, " ").split("&").forEach((str) => {
    const [key, value] = str.split("=");
    append(decodeURIComponent(key), decodeURIComponent(value));
  });
  return data;
}
function get_multipart(text, boundary) {
  const parts = text.split(`--${boundary}`);
  if (parts[0] !== "" || parts[parts.length - 1].trim() !== "--") {
    throw new Error("Malformed form data");
  }
  const { data, append } = read_only_form_data();
  parts.slice(1, -1).forEach((part) => {
    const match = /\s*([\s\S]+?)\r\n\r\n([\s\S]*)\s*/.exec(part);
    if (!match) {
      throw new Error("Malformed form data");
    }
    const raw_headers = match[1];
    const body = match[2].trim();
    let key;
    const headers = {};
    raw_headers.split("\r\n").forEach((str) => {
      const [raw_header, ...raw_directives] = str.split("; ");
      let [name, value] = raw_header.split(": ");
      name = name.toLowerCase();
      headers[name] = value;
      const directives = {};
      raw_directives.forEach((raw_directive) => {
        const [name2, value2] = raw_directive.split("=");
        directives[name2] = JSON.parse(value2);
      });
      if (name === "content-disposition") {
        if (value !== "form-data")
          throw new Error("Malformed form data");
        if (directives.filename) {
          throw new Error("File upload is not yet implemented");
        }
        if (directives.name) {
          key = directives.name;
        }
      }
    });
    if (!key)
      throw new Error("Malformed form data");
    append(key, body);
  });
  return data;
}
async function respond(incoming, options2, state = {}) {
  if (incoming.path !== "/" && options2.trailing_slash !== "ignore") {
    const has_trailing_slash = incoming.path.endsWith("/");
    if (has_trailing_slash && options2.trailing_slash === "never" || !has_trailing_slash && options2.trailing_slash === "always" && !(incoming.path.split("/").pop() || "").includes(".")) {
      const path = has_trailing_slash ? incoming.path.slice(0, -1) : incoming.path + "/";
      const q = incoming.query.toString();
      return {
        status: 301,
        headers: {
          location: options2.paths.base + path + (q ? `?${q}` : "")
        }
      };
    }
  }
  const headers = lowercase_keys(incoming.headers);
  const request = {
    ...incoming,
    headers,
    body: parse_body(incoming.rawBody, headers),
    params: {},
    locals: {}
  };
  try {
    return await options2.hooks.handle({
      request,
      resolve: async (request2) => {
        if (state.prerender && state.prerender.fallback) {
          return await render_response({
            options: options2,
            $session: await options2.hooks.getSession(request2),
            page_config: { ssr: false, router: true, hydrate: true },
            status: 200,
            branch: []
          });
        }
        const decoded = decodeURI(request2.path);
        for (const route of options2.manifest.routes) {
          const match = route.pattern.exec(decoded);
          if (!match)
            continue;
          const response = route.type === "endpoint" ? await render_endpoint(request2, route, match) : await render_page(request2, route, match, options2, state);
          if (response) {
            if (response.status === 200) {
              const cache_control = get_single_valued_header(response.headers, "cache-control");
              if (!cache_control || !/(no-store|immutable)/.test(cache_control)) {
                const etag = `"${hash(response.body || "")}"`;
                if (request2.headers["if-none-match"] === etag) {
                  return {
                    status: 304,
                    headers: {},
                    body: ""
                  };
                }
                response.headers["etag"] = etag;
              }
            }
            return response;
          }
        }
        const $session = await options2.hooks.getSession(request2);
        return await respond_with_error({
          request: request2,
          options: options2,
          state,
          $session,
          status: 404,
          error: new Error(`Not found: ${request2.path}`)
        });
      }
    });
  } catch (err) {
    const e = coalesce_to_error(err);
    options2.handle_error(e, request);
    return {
      status: 500,
      headers: {},
      body: options2.dev ? e.stack : e.message
    };
  }
}
function run(fn) {
  return fn();
}
function blank_object() {
  return Object.create(null);
}
function run_all(fns) {
  fns.forEach(run);
}
var current_component;
function set_current_component(component) {
  current_component = component;
}
function get_current_component() {
  if (!current_component)
    throw new Error("Function called outside component initialization");
  return current_component;
}
function setContext(key, context) {
  get_current_component().$$.context.set(key, context);
}
Promise.resolve();
var escaped = {
  '"': "&quot;",
  "'": "&#39;",
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;"
};
function escape(html) {
  return String(html).replace(/["'&<>]/g, (match) => escaped[match]);
}
function each(items, fn) {
  let str = "";
  for (let i = 0; i < items.length; i += 1) {
    str += fn(items[i], i);
  }
  return str;
}
var missing_component = {
  $$render: () => ""
};
function validate_component(component, name) {
  if (!component || !component.$$render) {
    if (name === "svelte:component")
      name += " this={...}";
    throw new Error(`<${name}> is not a valid SSR component. You may need to review your build config to ensure that dependencies are compiled, rather than imported as pre-compiled modules`);
  }
  return component;
}
var on_destroy;
function create_ssr_component(fn) {
  function $$render(result, props, bindings, slots, context) {
    const parent_component = current_component;
    const $$ = {
      on_destroy,
      context: new Map(parent_component ? parent_component.$$.context : context || []),
      on_mount: [],
      before_update: [],
      after_update: [],
      callbacks: blank_object()
    };
    set_current_component({ $$ });
    const html = fn(result, props, bindings, slots);
    set_current_component(parent_component);
    return html;
  }
  return {
    render: (props = {}, { $$slots = {}, context = new Map() } = {}) => {
      on_destroy = [];
      const result = { title: "", head: "", css: new Set() };
      const html = $$render(result, props, {}, $$slots, context);
      run_all(on_destroy);
      return {
        html,
        css: {
          code: Array.from(result.css).map((css2) => css2.code).join("\n"),
          map: null
        },
        head: result.title + result.head
      };
    },
    $$render
  };
}
function afterUpdate() {
}
var css$1 = {
  code: "#svelte-announcer.svelte-u7bl1d{position:absolute;left:0;top:0;clip:rect(0 0 0 0);clip-path:inset(50%);overflow:hidden;white-space:nowrap;width:1px;height:1px}",
  map: `{"version":3,"file":"root.svelte","sources":["root.svelte"],"sourcesContent":["<!-- This file is generated by @sveltejs/kit \u2014 do not edit it! -->\\n<script>\\n\\timport { setContext, afterUpdate, onMount } from 'svelte';\\n\\n\\t// stores\\n\\texport let stores;\\n\\texport let page;\\n\\n\\texport let components;\\n\\texport let props_0 = null;\\n\\texport let props_1 = null;\\n\\texport let props_2 = null;\\n\\n\\tsetContext('__svelte__', stores);\\n\\n\\t$: stores.page.set(page);\\n\\tafterUpdate(stores.page.notify);\\n\\n\\tlet mounted = false;\\n\\tlet navigated = false;\\n\\tlet title = null;\\n\\n\\tonMount(() => {\\n\\t\\tconst unsubscribe = stores.page.subscribe(() => {\\n\\t\\t\\tif (mounted) {\\n\\t\\t\\t\\tnavigated = true;\\n\\t\\t\\t\\ttitle = document.title || 'untitled page';\\n\\t\\t\\t}\\n\\t\\t});\\n\\n\\t\\tmounted = true;\\n\\t\\treturn unsubscribe;\\n\\t});\\n<\/script>\\n\\n<svelte:component this={components[0]} {...(props_0 || {})}>\\n\\t{#if components[1]}\\n\\t\\t<svelte:component this={components[1]} {...(props_1 || {})}>\\n\\t\\t\\t{#if components[2]}\\n\\t\\t\\t\\t<svelte:component this={components[2]} {...(props_2 || {})}/>\\n\\t\\t\\t{/if}\\n\\t\\t</svelte:component>\\n\\t{/if}\\n</svelte:component>\\n\\n{#if mounted}\\n\\t<div id=\\"svelte-announcer\\" aria-live=\\"assertive\\" aria-atomic=\\"true\\">\\n\\t\\t{#if navigated}\\n\\t\\t\\t{title}\\n\\t\\t{/if}\\n\\t</div>\\n{/if}\\n\\n<style>#svelte-announcer {\\n  position: absolute;\\n  left: 0;\\n  top: 0;\\n  clip: rect(0 0 0 0);\\n  clip-path: inset(50%);\\n  overflow: hidden;\\n  white-space: nowrap;\\n  width: 1px;\\n  height: 1px;\\n}</style>"],"names":[],"mappings":"AAqDO,iBAAiB,cAAC,CAAC,AACxB,QAAQ,CAAE,QAAQ,CAClB,IAAI,CAAE,CAAC,CACP,GAAG,CAAE,CAAC,CACN,IAAI,CAAE,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CACnB,SAAS,CAAE,MAAM,GAAG,CAAC,CACrB,QAAQ,CAAE,MAAM,CAChB,WAAW,CAAE,MAAM,CACnB,KAAK,CAAE,GAAG,CACV,MAAM,CAAE,GAAG,AACb,CAAC"}`
};
var Root = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { stores } = $$props;
  let { page } = $$props;
  let { components } = $$props;
  let { props_0 = null } = $$props;
  let { props_1 = null } = $$props;
  let { props_2 = null } = $$props;
  setContext("__svelte__", stores);
  afterUpdate(stores.page.notify);
  if ($$props.stores === void 0 && $$bindings.stores && stores !== void 0)
    $$bindings.stores(stores);
  if ($$props.page === void 0 && $$bindings.page && page !== void 0)
    $$bindings.page(page);
  if ($$props.components === void 0 && $$bindings.components && components !== void 0)
    $$bindings.components(components);
  if ($$props.props_0 === void 0 && $$bindings.props_0 && props_0 !== void 0)
    $$bindings.props_0(props_0);
  if ($$props.props_1 === void 0 && $$bindings.props_1 && props_1 !== void 0)
    $$bindings.props_1(props_1);
  if ($$props.props_2 === void 0 && $$bindings.props_2 && props_2 !== void 0)
    $$bindings.props_2(props_2);
  $$result.css.add(css$1);
  {
    stores.page.set(page);
  }
  return `


${validate_component(components[0] || missing_component, "svelte:component").$$render($$result, Object.assign(props_0 || {}), {}, {
    default: () => `${components[1] ? `${validate_component(components[1] || missing_component, "svelte:component").$$render($$result, Object.assign(props_1 || {}), {}, {
      default: () => `${components[2] ? `${validate_component(components[2] || missing_component, "svelte:component").$$render($$result, Object.assign(props_2 || {}), {}, {})}` : ``}`
    })}` : ``}`
  })}

${``}`;
});
var base = "";
var assets = "";
function set_paths(paths) {
  base = paths.base;
  assets = paths.assets || base;
}
function set_prerendering(value) {
}
var user_hooks = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module"
});
var template = ({ head, body }) => '<!DOCTYPE html>\n<html lang="en">\n	<head>\n		<meta charset="utf-8" />\n		<link rel="icon" href="/favicon.png" />\n		<meta name="viewport" content="width=device-width, initial-scale=1" />\n		' + head + '\n	</head>\n	<body>\n		<div id="svelte">' + body + "</div>\n	</body>\n</html>\n";
var options = null;
var default_settings = { paths: { "base": "", "assets": "" } };
function init(settings = default_settings) {
  set_paths(settings.paths);
  set_prerendering(settings.prerendering || false);
  const hooks = get_hooks(user_hooks);
  options = {
    amp: false,
    dev: false,
    entry: {
      file: assets + "/_app/start-042702fa.js",
      css: [assets + "/_app/assets/start-808c0b29.css"],
      js: [assets + "/_app/start-042702fa.js", assets + "/_app/chunks/vendor-0daa0b85.js", assets + "/_app/chunks/preload-helper-ec9aa979.js"]
    },
    fetched: void 0,
    floc: false,
    get_component_path: (id) => assets + "/_app/" + entry_lookup[id],
    get_stack: (error2) => String(error2),
    handle_error: (error2, request) => {
      hooks.handleError({ error: error2, request });
      error2.stack = options.get_stack(error2);
    },
    hooks,
    hydrate: true,
    initiator: void 0,
    load_component,
    manifest,
    paths: settings.paths,
    prerender: true,
    read: settings.read,
    root: Root,
    service_worker: null,
    router: true,
    ssr: true,
    target: "#svelte",
    template,
    trailing_slash: "never"
  };
}
var d = (s2) => s2.replace(/%23/g, "#").replace(/%3[Bb]/g, ";").replace(/%2[Cc]/g, ",").replace(/%2[Ff]/g, "/").replace(/%3[Ff]/g, "?").replace(/%3[Aa]/g, ":").replace(/%40/g, "@").replace(/%26/g, "&").replace(/%3[Dd]/g, "=").replace(/%2[Bb]/g, "+").replace(/%24/g, "$");
var empty = () => ({});
var manifest = {
  assets: [{ "file": "bookshelf.jpg", "size": 2450837, "type": "image/jpeg" }, { "file": "chalkboard.jpg", "size": 160422, "type": "image/jpeg" }, { "file": "confused-prof-tiny.png", "size": 315944, "type": "image/png" }, { "file": "favicon copy.png", "size": 1571, "type": "image/png" }, { "file": "favicon.png", "size": 1571, "type": "image/png" }, { "file": "osiyo-feather.PNG", "size": 104784, "type": "image/png" }, { "file": "passion.png", "size": 2216505, "type": "image/png" }, { "file": "typewriter-sm.png", "size": 829173, "type": "image/png" }],
  layout: "src/routes/__layout.svelte",
  error: ".svelte-kit/build/components/error.svelte",
  routes: [
    {
      type: "page",
      pattern: /^\/$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/index.svelte"],
      b: [".svelte-kit/build/components/error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/coaching-packages\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/coaching-packages/index.svelte"],
      b: [".svelte-kit/build/components/error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/coaching-packages\/payment\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/coaching-packages/payment.svelte"],
      b: [".svelte-kit/build/components/error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/articles\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/articles/index.svelte"],
      b: [".svelte-kit/build/components/error.svelte"]
    },
    {
      type: "endpoint",
      pattern: /^\/articles\/getArticles\/?$/,
      params: empty,
      load: () => Promise.resolve().then(function() {
        return getArticles;
      })
    },
    {
      type: "page",
      pattern: /^\/articles\/([^/]+?)\/?$/,
      params: (m) => ({ slug: d(m[1]) }),
      a: ["src/routes/__layout.svelte", "src/routes/articles/[slug].svelte"],
      b: [".svelte-kit/build/components/error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/contact\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/contact.svelte"],
      b: [".svelte-kit/build/components/error.svelte"]
    }
  ]
};
var get_hooks = (hooks) => ({
  getSession: hooks.getSession || (() => ({})),
  handle: hooks.handle || (({ request, resolve: resolve2 }) => resolve2(request)),
  handleError: hooks.handleError || (({ error: error2 }) => console.error(error2.stack)),
  externalFetch: hooks.externalFetch || fetch
});
var module_lookup = {
  "src/routes/__layout.svelte": () => Promise.resolve().then(function() {
    return __layout;
  }),
  ".svelte-kit/build/components/error.svelte": () => Promise.resolve().then(function() {
    return error;
  }),
  "src/routes/index.svelte": () => Promise.resolve().then(function() {
    return index$2;
  }),
  "src/routes/coaching-packages/index.svelte": () => Promise.resolve().then(function() {
    return index$1;
  }),
  "src/routes/coaching-packages/payment.svelte": () => Promise.resolve().then(function() {
    return payment;
  }),
  "src/routes/articles/index.svelte": () => Promise.resolve().then(function() {
    return index;
  }),
  "src/routes/articles/[slug].svelte": () => Promise.resolve().then(function() {
    return _slug_;
  }),
  "src/routes/contact.svelte": () => Promise.resolve().then(function() {
    return contact;
  })
};
var metadata_lookup = { "src/routes/__layout.svelte": { "entry": "pages/__layout.svelte-5cb87880.js", "css": ["assets/pages/__layout.svelte-25b812cb.css"], "js": ["pages/__layout.svelte-5cb87880.js", "chunks/vendor-0daa0b85.js"], "styles": [] }, ".svelte-kit/build/components/error.svelte": { "entry": "error.svelte-2bd4ad0f.js", "css": [], "js": ["error.svelte-2bd4ad0f.js", "chunks/vendor-0daa0b85.js"], "styles": [] }, "src/routes/index.svelte": { "entry": "pages/index.svelte-51527903.js", "css": [], "js": ["pages/index.svelte-51527903.js", "chunks/vendor-0daa0b85.js"], "styles": [] }, "src/routes/coaching-packages/index.svelte": { "entry": "pages/coaching-packages/index.svelte-139a087d.js", "css": [], "js": ["pages/coaching-packages/index.svelte-139a087d.js", "chunks/vendor-0daa0b85.js"], "styles": [] }, "src/routes/coaching-packages/payment.svelte": { "entry": "pages/coaching-packages/payment.svelte-56a0cf23.js", "css": [], "js": ["pages/coaching-packages/payment.svelte-56a0cf23.js", "chunks/vendor-0daa0b85.js"], "styles": [] }, "src/routes/articles/index.svelte": { "entry": "pages/articles/index.svelte-c053624e.js", "css": ["assets/pages/articles/index.svelte-4a952316.css"], "js": ["pages/articles/index.svelte-c053624e.js", "chunks/vendor-0daa0b85.js"], "styles": [] }, "src/routes/articles/[slug].svelte": { "entry": "pages/articles/[slug].svelte-0a11d833.js", "css": [], "js": ["pages/articles/[slug].svelte-0a11d833.js", "chunks/preload-helper-ec9aa979.js", "chunks/vendor-0daa0b85.js"], "styles": [] }, "src/routes/contact.svelte": { "entry": "pages/contact.svelte-89081f5e.js", "css": [], "js": ["pages/contact.svelte-89081f5e.js", "chunks/vendor-0daa0b85.js"], "styles": [] } };
async function load_component(file) {
  const { entry, css: css2, js, styles } = metadata_lookup[file];
  return {
    module: await module_lookup[file](),
    entry: assets + "/_app/" + entry,
    css: css2.map((dep) => assets + "/_app/" + dep),
    js: js.map((dep) => assets + "/_app/" + dep),
    styles
  };
}
function render(request, {
  prerender
} = {}) {
  const host = request.headers["host"];
  return respond({ ...request, host }, options, { prerender });
}
async function get() {
  const res = await fetch("http://45.79.95.19:1337/articles");
  const articles = await res.json();
  for (let article of articles) {
    let newDate = new Date(article.created_at).toDateString();
    article.posted = newDate.slice(4);
  }
  return {
    body: articles
  };
}
var getArticles = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  get
});
var LoginModal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="${"loginModal hidden w-full h-full overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none flex flex-col justify-center items-center"}"><div class="${"relative w-auto my-6 mx-auto max-w-6xl"}">
		<div class="${"border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none"}">
			<div class="${"flex items-start justify-between p-5 border-b border-solid border-gray-200 rounded-t"}"><h3 class="${"text-3xl font-semibold"}">Login</h3>
				<button class="${"p-1 ml-auto bg-transparent border-0 text-gray-300 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"}"><span class="${"bg-transparent h-6 w-6 text-2xl text-gray-900 block outline-none focus:outline-none"}"><i class="${"fas fa-times"}"></i></span></button></div>
			
			<div class="${"relative p-6 flex-auto"}"><form action="${"/"}" enctype="${"application/x-www-form-urlencoded"}"><div class="${"mb-3"}"><input class="${"rounded border-1 shadow-sm outline-none focus:outline-none focus:ring w-full"}" type="${"text"}" placeholder="${"Please enter username"}"></div>
					<div class="${"mb-3"}"><input class="${"rounded border-1 shadow-sm outline-none focus:outline-none focus:ring w-full"}" type="${"password"}" placeholder="${"Please enter password"}"></div></form></div></div></div></div>
<div class="${"modalBackdrop hidden opacity-25 fixed inset-0 z-40 bg-black"}"></div>`;
});
var Navbar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<header class="${"font-opencon font-bold"}"><nav class="${"bg-taupe mb-4"}"><div class="${"container px-6 py-3 mx-auto md:flex md:justify-between md:items-center"}"><div class="${"flex items-center justify-between"}"><div><a class="${"text-xl font-bold text-gray-600 md:text-2xl hover:text-light-600"}" href="${"/"}">Bold Diversity Solutions</a></div>

				
				<div class="${"flex md:hidden"}"><button type="${"button"}" class="${"text-gray-600 hover:text-light-600 focus:outline-none focus:text-light-600"}" aria-label="${"toggle menu"}"><svg viewBox="${"0 0 24 24"}" class="${"w-6 h-6 fill-current"}"><path fill-rule="${"evenodd"}" d="${"M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"}"></path></svg></button></div></div>

			
			<div class="${"items-center md:flex"}"><div class="${"flex flex-col md:flex-row md:mx-6"}"><a class="${"font-bold my-1 text-gray-600 hover:text-light-600 md:mx-4 md:my-0"}" href="${"/"}">Home</a>
					<a class="${"font-bold my-1 text-gray-600 hover:text-light-600 md:mx-4 md:my-0"}" href="${"/coaching-packages"}">Coaching Packages</a>
					<a class="${"font-bold my-1 text-gray-600 hover:text-light-600 md:mx-4 md:my-0"}" href="${"/articles"}">Articles</a>
					<a class="${"font-bold my-1 text-gray-600 hover:text-light-600 md:ml-4 md:my-0"}" href="${"/about"}">About</a></div>

				<div class="${"flex justify-center md:block"}"><button class="${"font-bold text-gray-600 hover:text-light-600 md:my-0"}">Login</button></div></div></div></nav></header>

${validate_component(LoginModal, "LoginModal").$$render($$result, {}, {}, {})}

`;
});
var PrivacyPolicy = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<section class="${"modal hidden w-full h-full p-6 overflow-x-hidden overflow-y-auto fixed inset-4 z-50 flex justify-center items-center"}"><div class="${"relative w-auto h-full my-6 mx-auto max-w-6xl"}"><div class="${"rounded-lg relative w-full h-full bg-white"}"><h1>CLOSE</h1>

      <div class="${"relative p-6"}"><p><strong>Privacy Policy</strong></p>

<p>Aqua Wealth &amp; Media LLC (\u201C
  <strong>Company</strong>
  ,\u201D \u201C
  <strong>we</strong>
  ,\u201D or \u201C
  <strong>us</strong>
  \u201D) respects your privacy and is committed to protecting it through this Privacy Policy.
</p>

<p>This Privacy Policy governs your access to and use of
  <a href="${"https://bolddiversitysolutions.com"}">bolddiversitysolutions.com</a>
  , including any content, functionality and services offered on or through
  <a href="${"https://bolddiversitysolutions.com"}">bolddiversitysolutions.com</a>
  (the &quot;
  <strong>Website</strong>
  &quot;), whether as a guest or a registered user.
</p>

<p>When accessing the Website, the Company will learn certain information about you, both automatically and through voluntary actions you may take, during your visit. This policy applies to information we collect on the Website and in email, text, or other electronic messages between you and the Website.</p>

<p>Please read the Privacy Policy carefully before you start to use the Website.
  <strong>By using the Website or by clicking to accept or agree to the Terms of Use when this option is made available to you, you accept and agree to be bound and abide by the Privacy Policy.</strong>
  If you do not want to agree to the Privacy Policy, you must not access or use the Website.
</p>

<p><strong>Children Under The Age Of 13</strong></p>

<p>Our Website is not intended for children under 13 years of age. No one under age 13 may provide any information to or on the Website. We do not knowingly collect personal information from children under 13. If you are under 13, do not use or provide any information on this Website or on or through any of its features/register on the Website, make any purchases through the Website, use any of the interactive or public comment features of this Website or provide any information about yourself to us, including your name, address, telephone number, email address, or any screen name or user name you may use.</p>

<p>If we learn we have collected or received personal information from a child under 13 without verification of parental consent, we will delete that information. If you believe we might have any information from or about a child under 13, please contact us at
  <a href="${"mailto:hello@bolddiversitysolutions.com"}">hello@bolddiversitysolutions.com</a>
  .
</p>

<p><strong>Information We Collect About You</strong></p>

<p>When you access the Website, the Company will learn certain information about you during your visit.</p>

<p><em>Information You Provide To Us.</em>
  The Website provides various places for users to provide information. We collect information that users provide by filling out forms on the Website, communicating with us via contact forms, responding to surveys, search queries on our search feature, providing comments or other feedback, and providing information when ordering a product or service via the Website.
</p>

<p>We use information you provide to us to deliver the requested product and/or service, to improve our overall performance, and to provide you with offers, promotions, and information.</p>

<p><em>Information We Collect Through Automatic Data Collection Technology.</em>
  As you navigate through our Website, we may use automatic data collection technologies including Google Analytics to collect certain information about your equipment, browsing actions, and patterns. This will generally include information about your location, your traffic pattern through our website, and any communications between your computer and our Website. Among other things, we will collect data about the type of computer you use, your Internet connection, your IP address, your operating system, and your browser type.
</p>

<p>The information we collect automatically is used for statistical data and will not include personal information. We use this data to improve our Website and our service offerings. To the extent that you voluntarily provide personal information to us, our systems will associate the automatically collected information with your personal information.</p>

<p><strong>Use of Cookies And Pixels</strong></p>

<p>Similar to other commercial websites, our website utilizes a standard technology called \u201Ccookies\u201D and server logs to collect information about how our site is used. Information gathered through cookies and server logs may include the date and time of visits, the pages viewed, time spent at our site, and the websites visited just before and just after our own, as well as your IP address.</p>

<p>A cookie is a very small text document, which often includes an anonymous unique identifier. When you visit a website, that site\u2019s computer asks your computer for permission to store this file in a part of your hard drive specifically designated for cookies. Each website can send its own cookie to your browser if your browser\u2019s preferences allow it, but (to protect your privacy) your browser only permits a website to access the cookies it has already sent to you, not the cookies sent to you by other sites.</p>

<p>The Company reserves the right to use technological equivalents of cookies, including social media pixels. These pixels allow social media sites to track visitors to outside websites so as to tailor advertising messages users see while visiting that social media website. The Company reserves the right to use these pixels in compliance with the policies of the various social media sites.</p>
\u200B

<p><strong>Third Party Use Of Cookies</strong></p>

<p>Some content or applications, including advertisements, on the Website are served by third-parties, including advertisers, ad networks and servers, content providers, and application providers. These third parties may use cookies alone or in conjunction with web beacons or other tracking technologies to collect information about you when you use our website. The information they collect may be associated with your personal information or they may collect information, including personal information, about your online activities over time and across different websites and other online services. They may use this information to provide you with interest-based (behavioral) advertising or other targeted content.</p>

<p>We do not control these third parties&#39; tracking technologies or how they may be used. If you have any questions about an advertisement or other targeted content, you should contact the responsible provider directly.</p>

<p><strong>Email Information</strong></p>

<p>If you choose to correspond with us through email, we may retain the content of your email messages together with your email address and our responses. We provide the same protections for these electronic communications that we employ in the maintenance of information received online, mail, and telephone. This also applies when you register for our website, sign up through any of our forms using your email address or make a purchase on this site. For further information see the email policies below.</p>

<p><strong>Email Policies</strong></p>

<p>We are committed to keeping your e-mail address confidential. We do not sell, rent, or lease our subscription lists to third parties, and will not disclose your email address to any third parties except as allowed in the section titled Disclosure of Your Information.</p>

<p>We will maintain the information you send via e-mail in accordance with applicable federal law.</p>

<p>In compliance with the CAN-SPAM Act, all e-mails sent from our organization will clearly state who the e-mail is from and provide clear information on how to contact the sender. In addition, all e-mail messages will also contain concise information on how to remove yourself from our mailing list so that you receive no further e-mail communication from us.</p>

<p>Our emails provide users the opportunity to opt-out of receiving communications from us and our partners by reading the unsubscribe instructions located at the bottom of any e-mail they receive from us at anytime.</p>

<p>Users who no longer wish to receive our newsletter or promotional materials may opt-out of receiving these communications by clicking on the unsubscribe link in the e-mail.</p>

<p>\u200B
  <strong>How And Why We Collect Information</strong></p>

<p>The Company collects your information in order to record and support your participation in the activities you select. If you register to download a book or resources, sign up for our newsletter, and/or purchase a product from us, we collect your information. We use this information to track your preferences and to keep you informed about the products and services you have selected to receive and any related products and/or services. As a visitor to this Website, you can engage in most activities without providing any personal information. It is only when you seek to download resources and/or register for services that you are required to provide information.</p>

<p>If you are outside the European Union and opt to receive any free resources, participate in any free training programs, register for a webinar, register for a live event, register for a seminar, or purchase any products sold by the Company on this Website, we will automatically enroll \u200Byou to receive our free email newsletter. If you do not wish to receive this newsletter, you can unsubscribe anytime. We include an \u201Cunsubscribe\u201D link at the bottom of every email we send. If you ever have trouble unsubscribing, you can send an email to
  <a href="${"mailto:hello@bolddiversitysolutions.com"}">hello@bolddiversitysolutions.com</a>
  requesting to unsubscribe from future emails.
</p>

<p>If you are in the European Union and opt to receive any free resources, participate in any free training programs, register for a webinar, register for a live event, register for a seminar, or purchase any products sold by the Company on this Website, we will only enroll \u200Byou to receive our free email newsletter if you affirmatively consent to it. If you do not wish to receive this newsletter, you can unsubscribe anytime. We include an \u201Cunsubscribe\u201D link at the bottom of every email we send. If you ever have trouble unsubscribing, you can send an email to
  <a href="${"mailto:hello@bolddiversitysolutions.com"}">hello@bolddiversitysolutions.com</a>
  requesting to unsubscribe from future emails.
</p>

<p><strong>How Do We Use the Information That You Provide to Us?</strong></p>

<p>We use personal information for purposes of presenting our Website and its contents to you, providing you with information, providing you with offers for products and services, providing you with information about your subscriptions and products, carrying out any contract between you and the Company, administering our business activities, providing customer service, and making available other items and services to our customers and prospective customers.</p>

<p>From time-to-time, we may use the information you provide to us to make you offers to purchase products and services provided by third parties in exchange for a commission to be paid to us by such third parties. Should you opt to take part in such promotions, the third parties will receive your information.</p>

<p>From time-to-time, we may use the information you provide to us to display advertisements to you that are tailored to your personal characteristics, interests, and activities.</p>

<p><strong>Disclosure Of Your Information</strong></p>

<p>As a general rule, we do not sell, rent, lease or otherwise transfer any information collected whether automatically or through your voluntary action.</p>

<p>We may disclose your personal information to our subsidiaries, affiliates, and service providers for the purpose of providing our services to you.</p>

<p>We may disclose your personal information to a third party, including a lawyer or collection agency, when necessary to enforce our terms of service or any other agreement between you and the Company.</p>

<p>We may provide your information to any successor in interest in the event of a merger, divestiture, restructuring, reorganization, dissolution, or other sale or transfer of some or all of the Company\u2019s assets and/or business.</p>

<p>We may disclose information when legally compelled to do so, in other words, when we, in good faith, believe that the law requires it or for the protection of our legal rights or when compelled by a court or other governmental entity to do so.</p>

<p><strong>How Do We Protect Your Information and Secure Information Transmissions?</strong></p>

<p>We employ commercially reasonable methods to ensure the security of the information you provide to us and the information we collect automatically. This includes using standard security protocols and working only with reputable third-party vendors.</p>

<p>Email is not recognized as a secure medium of communication. For this reason, we request that you do not send private information to us by email. However, doing so is allowed, but at your own risk. Some of the information you may enter on our website may be transmitted securely via a secure medium known as Secure Sockets Layer, or SSL. Credit Card information and other sensitive information is never transmitted via email.</p>

<p>The Company may use software programs to create summary statistics, which are used for such purposes as assessing the number of visitors to the different sections of our site, what information is of most and least interest, determining technical design specifications, and identifying system performance or problem areas.</p>

<p>For site security purposes and to ensure that this service remains available to all users, the Company uses software programs to monitor network traffic to identify unauthorized attempts to upload or change information, or otherwise cause damage.</p>

<p><strong>Policy Changes</strong></p>

<p>It is our policy to post any changes we make to our privacy policy on this page. If we make material changes to how we treat our users&#39; personal information, we will notify you by email to the email address specified in your account and/or through a notice on the Website home page. The date the privacy policy was last revised is identified at the bottom of the page. You are responsible for ensuring we have an up-to-date active and deliverable email address for you, and for periodically visiting our Website and this privacy policy to check for any changes.</p>

<p><strong>Visitors\u2019 GDPR Rights</strong></p>

<p>If you are within the European Union, you are entitled to certain information and have certain rights under the General Data Protection Regulation. Those rights include:</p>

<p>We will retain the any information you choose to provide to us until the earlier of: (a) you asking us to delete the information, (b) our decision to cease using our existing data providers, or (c) the Company decides that the value in retaining the data is outweighed by the costs of retaining it.</p>

<p>You have the right to request access to your data that the Company stores and the rights to either rectify or erase your personal data.</p>

<p>You have the right to seek restrictions on the processing of your data.</p>

<p>You have the right to object to the processing of your data and the right to the portability of your data.</p>

<p>To the extent that you provided consent to the Company\u2019s processing of your personal data, you have the right to withdraw that consent at any time, without affecting the lawfulness of processing based upon consent that occurred prior to your withdrawal of consent.</p>

<p>You have the right to lodge a complaint with a supervisory authority that has jurisdiction over issues related to the General Data Protection Regulation.</p>

<p>We require only the information that is reasonably required to enter into a contract with you. We will not require you to provide consent for any unnecessary processing as a condition of entering into a contract with us.</p>

<p>[We use your personal data to make the following automated decisions: FILL IN. We use the following logic to make those automated decisions: FILL IN. These decisions can affect your rights in the following ways: FILL IN.]</p>

<p><strong>Contact Us</strong></p>

<p>The Company welcomes your questions or comments regarding the Privacy Policy:</p>

<p>Aqua Wealth &amp; Media LLC</p>
<p>Santa Fe, NM 87505</p>

<p>Email Address:
  <a href="${"mailto:hello@bolddiversitysolutions.com"}">hello@bolddiversitysolutions.com</a></p>

<p><strong>Our GDPR Representative</strong></p>

<p>The Company employs the following party as its representative for handling General Data Protection Regulation issues.</p>

<p>NAME</p>
<p>ADDRESS</p>

<p><em>Effective as of May 3, 2021</em></p></div></div></div></section>

<div class="${"modalBackdrop hidden opacity-25 fixed inset-0 z-40 bg-black"}"></div>`;
});
var Footer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${$$result.head += `<link rel="${"stylesheet"}" href="${"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"}" integrity="${"sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w=="}" crossorigin="${"anonymous"}" referrerpolicy="${"no-referrer"}" data-svelte="svelte-ys7w5z"><link rel="${"stylesheet"}" href="${"https://cdn.jsdelivr.net/gh/jpswalsh/academicons/css/academicons.min.css"}" data-svelte="svelte-ys7w5z">`, ""}

<p><a href="${"https://www.patreon.com/bolddiversitysolutions"}" target="${"_blank"}"><i class="${"fab fa-patreon fa-2x"}"></i></a>

	<a href="${"https://schooling.academia.edu/?prem_fnl_first=true"}" target="${"_blank"}"><i class="${"ai ai-academia-square ai-2x ml-4"}"></i></a>

	<a href="${"https://linkedin.com/in/diana-schooling-m-legal-studies-m-tesol-95b8565a/"}" target="${"_blank"}"><i class="${"fab fa-linkedin fa-2x ml-4"}"></i></a>

	<a href="${"https://www.instagram.com/schoolingdiana_official/"}" target="${"_blank"}"><i class="${"fab fa-instagram-square fa-2x ml-4"}"></i></a>

	<a href="${"https://twitter.com/SchoolingDiana"}" target="${"_blank"}"><i class="${"fab fa-twitter-square fa-2x ml-4"}"></i></a></p>

<p>\xA9 2017\u20132021 Bold Diversity Solutions, powered by Aqua Wealth &amp; Media LLC \xB7
	<button>Privacy</button>
	\xB7
	<a href="${"#termsModal"}" data-bs-toggle="${"modal"}">Terms</a>
	\xB7
	<a href="${"#disclaimerModal"}" data-bs-toggle="${"modal"}">Disclaimer</a></p>

${validate_component(PrivacyPolicy, "PrivacyPolicy").$$render($$result, {}, {}, {})}`;
});
var _layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="${"min-h-screen"}">${validate_component(Navbar, "Navbar").$$render($$result, {}, {}, {})}
  ${slots.default ? slots.default({}) : ``}
  ${validate_component(Footer, "Footer").$$render($$result, {}, {}, {})}</div>`;
});
var __layout = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": _layout
});
function load$2({ error: error2, status }) {
  return { props: { error: error2, status } };
}
var Error$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { status } = $$props;
  let { error: error2 } = $$props;
  if ($$props.status === void 0 && $$bindings.status && status !== void 0)
    $$bindings.status(status);
  if ($$props.error === void 0 && $$bindings.error && error2 !== void 0)
    $$bindings.error(error2);
  return `<h1>${escape(status)}</h1>

<pre>${escape(error2.message)}</pre>



${error2.frame ? `<pre>${escape(error2.frame)}</pre>` : ``}
${error2.stack ? `<pre>${escape(error2.stack)}</pre>` : ``}`;
});
var error = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Error$1,
  load: load$2
});
var Routes = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${$$result.head += `${$$result.title = `<title>Bold Diversity Solutions</title>`, ""}`, ""}

<p class="${"text-3xl"}">Placeholder!</p>`;
});
var index$2 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Routes
});
var Coaching_packages = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<main class="${"w-full min-h-screen"}"><section class="${"container px-5 py-20 mx-auto"}"><div class="${"flex flex-col text-center w-full mb-20"}"><h1 class="${"sm:text-4xl text-3xl mb-2 text-black"}">What We Offer</h1></div>

		<div class="${"flex flex-wrap -m-4"}"><div class="${"p-4 xl:w-3/4 md:w-1/2 w-full mx-auto"}"><div class="${"h-full p-6 rounded-lg border-2 bg-white border-gray-300 flex flex-col relative overflow-hidden shadow-md"}"><h2 class="${"text-sm tracking-widest mb-1"}">Single Session</h2>
					<h1 class="${"text-5xl text-black pb-4 mb-4 border-b border-gray-200 leading-none"}">$497</h1>
					<p class="${"sm:text-xl text-lg"}"><span class="${"w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0"}"><svg fill="${"none"}" stroke="${"currentColor"}" stroke-linecap="${"round"}" stroke-linejoin="${"round"}" stroke-width="${"2.5"}" class="${"w-3 h-3"}" viewBox="${"0 0 24 24"}"><path d="${"M20 6L9 17l-5-5"}"></path></svg>
						</span>One time purchase of 1 hour of 1-On-1 coaching
					</p></div></div></div>

		<div class="${"flex flex-wrap -m-4"}"><div class="${"p-4 xl:w-1/4 md:w-1/2 w-full ml-auto"}"><div class="${"h-full p-6 rounded-lg border-2 bg-white border-gray-300 flex flex-col relative overflow-hidden shadow-md"}"><h2 class="${"text-sm tracking-widest title-font mb-1"}">Immersion Package</h2>
					<h1 class="${"text-5xl text-black pb-4 mb-4 border-b border-gray-200 leading-none"}">$10,000/yr ($925/mo)
					</h1>
					<p class="${"flex items-center text-gray-600 mb-6"}"><span class="${"w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0"}"><svg fill="${"none"}" stroke="${"currentColor"}" stroke-linecap="${"round"}" stroke-linejoin="${"round"}" stroke-width="${"2.5"}" class="${"w-3 h-3"}" viewBox="${"0 0 24 24"}"><path d="${"M20 6L9 17l-5-5"}"></path></svg>
						</span>1-On-1 coaching
					</p>
					<p class="${"flex items-center mb-2"}"><span class="${"w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0"}"><svg fill="${"none"}" stroke="${"currentColor"}" stroke-linecap="${"round"}" stroke-linejoin="${"round"}" stroke-width="${"2.5"}" class="${"w-3 h-3"}" viewBox="${"0 0 24 24"}"><path d="${"M20 6L9 17l-5-5"}"></path></svg>
						</span>8 Spaces only (waitlist available)
					</p>
					<p class="${"flex items-center text-gray-600 mb-6"}"><span class="${"w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0"}"><svg fill="${"none"}" stroke="${"currentColor"}" stroke-linecap="${"round"}" stroke-linejoin="${"round"}" stroke-width="${"2.5"}" class="${"w-3 h-3"}" viewBox="${"0 0 24 24"}"><path d="${"M20 6L9 17l-5-5"}"></path></svg>
						</span>Four 30-minute specific-to-your-needs coaching sessions (total 2 hours/mo)
					</p>
					<p class="${"flex items-center text-gray-600 mb-6"}"><span class="${"w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0"}"><svg fill="${"none"}" stroke="${"currentColor"}" stroke-linecap="${"round"}" stroke-linejoin="${"round"}" stroke-width="${"2.5"}" class="${"w-3 h-3"}" viewBox="${"0 0 24 24"}"><path d="${"M20 6L9 17l-5-5"}"></path></svg>
						</span>Bonuses: digital course/reading content individually customied to your current
						needs (including AAPI, Indigenous culture and learning needs, etc.)
					</p>
					<p class="${"flex items-center text-gray-600 mb-6"}"><span class="${"w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0"}"><svg fill="${"none"}" stroke="${"currentColor"}" stroke-linecap="${"round"}" stroke-linejoin="${"round"}" stroke-width="${"2.5"}" class="${"w-3 h-3"}" viewBox="${"0 0 24 24"}"><path d="${"M20 6L9 17l-5-5"}"></path></svg>
						</span>Includes a 30-minute first strategic call
					</p>
					<a href="${"/coaching-packages/payment"}"><button class="${"flex items-center mt-auto text-white bg-cinred border-0 py-2 px-4 w-full focus:outline-none hover:bg-indigo-600 rounded"}">Purchase</button></a></div></div>

			<div class="${"p-4 xl:w-1/4 md:w-1/2 w-full"}"><div class="${"h-full p-6 rounded-lg border-2 bg-white border-gray-300 flex flex-col relative overflow-hidden shadow-md"}"><h2 class="${"text-sm tracking-widest title-font mb-1 font-medium"}">Purpose-Focused Package
					</h2>
					<h1 class="${"text-5xl text-black pb-4 mb-4 border-b border-gray-200 leading-none"}">$7,797/6mo ($1395/mo)
					</h1>
					<p class="${"flex items-center text-gray-600 mb-6"}"><span class="${"w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0"}"><svg fill="${"none"}" stroke="${"currentColor"}" stroke-linecap="${"round"}" stroke-linejoin="${"round"}" stroke-width="${"2.5"}" class="${"w-3 h-3"}" viewBox="${"0 0 24 24"}"><path d="${"M20 6L9 17l-5-5"}"></path></svg>
						</span>1-On-1 coaching
					</p>
					<p class="${"flex items-center text-gray-600 mb-2"}"><span class="${"w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0"}"><svg fill="${"none"}" stroke="${"currentColor"}" stroke-linecap="${"round"}" stroke-linejoin="${"round"}" stroke-width="${"2.5"}" class="${"w-3 h-3"}" viewBox="${"0 0 24 24"}"><path d="${"M20 6L9 17l-5-5"}"></path></svg>
						</span>8 Spaces only (waitlist available)
					</p>
					<p class="${"flex items-center text-gray-600 mb-6"}"><span class="${"w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0"}"><svg fill="${"none"}" stroke="${"currentColor"}" stroke-linecap="${"round"}" stroke-linejoin="${"round"}" stroke-width="${"2.5"}" class="${"w-3 h-3"}" viewBox="${"0 0 24 24"}"><path d="${"M20 6L9 17l-5-5"}"></path></svg>
						</span>Four 30-minute specific-to-your-needs coaching sessions (total 2 hours/mo)
					</p>
					<p class="${"flex items-center text-gray-600 mb-6"}"><span class="${"w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0"}"><svg fill="${"none"}" stroke="${"currentColor"}" stroke-linecap="${"round"}" stroke-linejoin="${"round"}" stroke-width="${"2.5"}" class="${"w-3 h-3"}" viewBox="${"0 0 24 24"}"><path d="${"M20 6L9 17l-5-5"}"></path></svg>
						</span>Bonuses: digital course/reading content individually customied to your current
						needs (including AAPI, Indigenous culture and learning needs, etc.)
					</p>
					<p class="${"flex items-center text-gray-600 mb-6"}"><span class="${"w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0"}"><svg fill="${"none"}" stroke="${"currentColor"}" stroke-linecap="${"round"}" stroke-linejoin="${"round"}" stroke-width="${"2.5"}" class="${"w-3 h-3"}" viewBox="${"0 0 24 24"}"><path d="${"M20 6L9 17l-5-5"}"></path></svg>
						</span>Includes a 30-minute first strategic call
					</p>
					<a href="${"/coaching-packages/payment"}"><button class="${"flex items-center mt-auto text-white bg-cinred border-0 py-2 px-4 w-full focus:outline-none hover:bg-indigo-600 rounded"}">Purchase</button></a></div></div>

			<div class="${"p-4 xl:w-1/4 md:w-1/2 w-full mr-auto"}"><div class="${"h-full p-6 rounded-lg border-2 bg-white border-gray-300 flex flex-col relative overflow-hidden shadow-md"}"><h2 class="${"text-sm tracking-widest title-font mb-1 font-medium"}">Mastery-Focused Package
					</h2>
					<h1 class="${"text-5xl text-black pb-4 mb-4 border-b border-gray-200 leading-none"}">$997/yr (2-payment option available)
					</h1>
					<p class="${"flex items-center text-gray-600 mb-6"}"><span class="${"w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0"}"><svg fill="${"none"}" stroke="${"currentColor"}" stroke-linecap="${"round"}" stroke-linejoin="${"round"}" stroke-width="${"2.5"}" class="${"w-3 h-3"}" viewBox="${"0 0 24 24"}"><path d="${"M20 6L9 17l-5-5"}"></path></svg>
						</span>1-On-1 coaching
					</p>
					<p class="${"flex items-center text-gray-600 mb-2"}"><span class="${"w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0"}"><svg fill="${"none"}" stroke="${"currentColor"}" stroke-linecap="${"round"}" stroke-linejoin="${"round"}" stroke-width="${"2.5"}" class="${"w-3 h-3"}" viewBox="${"0 0 24 24"}"><path d="${"M20 6L9 17l-5-5"}"></path></svg>
						</span>8 Spaces only (waitlist available)
					</p>
					<p class="${"flex items-center text-gray-600 mb-6"}"><span class="${"w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0"}"><svg fill="${"none"}" stroke="${"currentColor"}" stroke-linecap="${"round"}" stroke-linejoin="${"round"}" stroke-width="${"2.5"}" class="${"w-3 h-3"}" viewBox="${"0 0 24 24"}"><path d="${"M20 6L9 17l-5-5"}"></path></svg>
						</span>Unlimited 20-minute coaching calls
					</p>
					<p class="${"flex items-center text-gray-600 mb-6"}"><span class="${"w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0"}"><svg fill="${"none"}" stroke="${"currentColor"}" stroke-linecap="${"round"}" stroke-linejoin="${"round"}" stroke-width="${"2.5"}" class="${"w-3 h-3"}" viewBox="${"0 0 24 24"}"><path d="${"M20 6L9 17l-5-5"}"></path></svg>
						</span>Bonuses: digital course/reading content individually customized to your current
						needs
					</p>
					<p class="${"flex items-center text-gray-600 mb-6"}"><span class="${"w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0"}"><svg fill="${"none"}" stroke="${"currentColor"}" stroke-linecap="${"round"}" stroke-linejoin="${"round"}" stroke-width="${"2.5"}" class="${"w-3 h-3"}" viewBox="${"0 0 24 24"}"><path d="${"M20 6L9 17l-5-5"}"></path></svg>
						</span>Includes a first strategic call, 30 minutes (any refund needed is determined at
						this time: after this, only a payment/scheduling pause is available, **see details
						below)
					</p>
					<a href="${"/coaching-packages/payment"}"><button class="${"flex items-center mt-auto text-white bg-cinred border-0 py-2 px-4 w-full focus:outline-none hover:bg-indigo-600 rounded"}">Purchase</button></a></div></div></div></section>

	<section class="${"container px-5 py-10 mx-auto"}"><div class="${"flex flex-wrap -m-4"}"><div class="${"p-4 xl:w-1/4 md:w-1/2 w-full ml-auto"}"><div class="${"h-full p-6 rounded-lg border-2 bg-white border-gray-300 flex flex-col relative overflow-hidden shadow-md"}"><h2 class="${"text-sm tracking-widest mb-1"}">Applied Diversity Bootcamp</h2>
					<h1 class="${"text-5xl text-black pb-4 mb-4 border-b border-gray-200 leading-none"}">$497</h1>
					<p class="${"flex items-center text-gray-600 mb-6"}"><span class="${"w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0"}"><svg fill="${"none"}" stroke="${"currentColor"}" stroke-linecap="${"round"}" stroke-linejoin="${"round"}" stroke-width="${"2.5"}" class="${"w-3 h-3"}" viewBox="${"0 0 24 24"}"><path d="${"M20 6L9 17l-5-5"}"></path></svg>
						</span>Small group coaching (8 Spaces only)
					</p>
					<p class="${"flex items-center text-gray-600 mb-2"}"><span class="${"w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0"}"><svg fill="${"none"}" stroke="${"currentColor"}" stroke-linecap="${"round"}" stroke-linejoin="${"round"}" stroke-width="${"2.5"}" class="${"w-3 h-3"}" viewBox="${"0 0 24 24"}"><path d="${"M20 6L9 17l-5-5"}"></path></svg>
						</span>Enrollment opens every 8 weeks
					</p>
					<p class="${"flex items-center text-gray-600 mb-2"}"><span class="${"w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0"}"><svg fill="${"none"}" stroke="${"currentColor"}" stroke-linecap="${"round"}" stroke-linejoin="${"round"}" stroke-width="${"2.5"}" class="${"w-3 h-3"}" viewBox="${"0 0 24 24"}"><path d="${"M20 6L9 17l-5-5"}"></path></svg>
						</span>Four (x4) 40-minute sessions (one session per week)
					</p>
					<p class="${"flex items-center text-gray-600 mb-6"}"><span class="${"w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0"}"><svg fill="${"none"}" stroke="${"currentColor"}" stroke-linecap="${"round"}" stroke-linejoin="${"round"}" stroke-width="${"2.5"}" class="${"w-3 h-3"}" viewBox="${"0 0 24 24"}"><path d="${"M20 6L9 17l-5-5"}"></path></svg>
						</span>Includes assignments and digital materials
					</p>
					<a href="${"/coaching-packages/payment"}"><button class="${"flex items-center mt-auto text-white bg-cinred border-0 py-2 px-4 w-full focus:outline-none hover:bg-indigo-600 rounded"}">Purchase</button></a></div></div>

			<div class="${"p-4 xl:w-1/4 md:w-1/2 w-full"}"><div class="${"h-full p-6 rounded-lg border-2 bg-white border-gray-300 flex flex-col relative overflow-hidden shadow-md"}"><h2 class="${"text-sm tracking-widest title-font mb-1"}">Diversity Action Workshop</h2>
					<h1 class="${"text-5xl text-black pb-4 mb-4 border-b border-gray-200 leading-none"}">$247</h1>
					<p class="${"flex items-center text-gray-600 mb-6"}"><span class="${"w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0"}"><svg fill="${"none"}" stroke="${"currentColor"}" stroke-linecap="${"round"}" stroke-linejoin="${"round"}" stroke-width="${"2.5"}" class="${"w-3 h-3"}" viewBox="${"0 0 24 24"}"><path d="${"M20 6L9 17l-5-5"}"></path></svg>
						</span>Small group coaching (8 space only)
					</p>
					<p class="${"flex items-center text-gray-600 mb-2"}"><span class="${"w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0"}"><svg fill="${"none"}" stroke="${"currentColor"}" stroke-linecap="${"round"}" stroke-linejoin="${"round"}" stroke-width="${"2.5"}" class="${"w-3 h-3"}" viewBox="${"0 0 24 24"}"><path d="${"M20 6L9 17l-5-5"}"></path></svg>
						</span>Enrollment opens quarterly
					</p>
					<p class="${"flex items-center text-gray-600 mb-2"}"><span class="${"w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0"}"><svg fill="${"none"}" stroke="${"currentColor"}" stroke-linecap="${"round"}" stroke-linejoin="${"round"}" stroke-width="${"2.5"}" class="${"w-3 h-3"}" viewBox="${"0 0 24 24"}"><path d="${"M20 6L9 17l-5-5"}"></path></svg>
						</span>Focuses on mindset mapping
					</p>
					<p class="${"flex items-center text-gray-600 mb-6"}"><span class="${"w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0"}"><svg fill="${"none"}" stroke="${"currentColor"}" stroke-linecap="${"round"}" stroke-linejoin="${"round"}" stroke-width="${"2.5"}" class="${"w-3 h-3"}" viewBox="${"0 0 24 24"}"><path d="${"M20 6L9 17l-5-5"}"></path></svg>
						</span>2-Day Intensive: 90 minutes (Saturday), 60 minutes (Sunday)
					</p>
					<a href="${"/coaching-packages/payment"}"><button class="${"flex items-center mt-auto text-white bg-cinred border-0 py-2 px-4 w-full focus:outline-none hover:bg-indigo-600 rounded"}">Purchase</button></a></div></div>

			<div class="${"p-4 xl:w-1/4 md:w-1/2 w-full mr-auto"}"><div class="${"h-full p-6 rounded-lg border-2 bg-white border-gray-300 flex flex-col relative overflow-hidden shadow-md"}"><h2 class="${"text-sm tracking-widest title-font mb-1"}">Seasoned Diversity Specialist Workbook &amp; Packet
					</h2>
					<h1 class="${"text-5xl text-black pb-4 mb-4 border-b border-gray-200 leading-none"}">$197 for digital access
					</h1>
					<p class="${"flex items-center text-gray-600 mb-2"}"><span class="${"w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0"}"><svg fill="${"none"}" stroke="${"currentColor"}" stroke-linecap="${"round"}" stroke-linejoin="${"round"}" stroke-width="${"2.5"}" class="${"w-3 h-3"}" viewBox="${"0 0 24 24"}"><path d="${"M20 6L9 17l-5-5"}"></path></svg>
						</span>Seasoned Diversity Specialist Workbook and Packet:
					</p>
					<p class="${"flex items-center text-gray-600 mb-2"}"><span class="${"w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0"}"><svg fill="${"none"}" stroke="${"currentColor"}" stroke-linecap="${"round"}" stroke-linejoin="${"round"}" stroke-width="${"2.5"}" class="${"w-3 h-3"}" viewBox="${"0 0 24 24"}"><path d="${"M20 6L9 17l-5-5"}"></path></svg>
						</span>On-your-own materials for the seasoned Higher Education professional who already
						knows what a microagression, etc., looks like, and knows how to recognize which students
						are actually minorities (hint: it\u2019s not their skin color).
					</p>
					<p class="${"flex items-center text-gray-600 mb-2"}"><span class="${"w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0"}"><svg fill="${"none"}" stroke="${"currentColor"}" stroke-linecap="${"round"}" stroke-linejoin="${"round"}" stroke-width="${"2.5"}" class="${"w-3 h-3"}" viewBox="${"0 0 24 24"}"><path d="${"M20 6L9 17l-5-5"}"></path></svg>
						</span>Diana\u2019s trademarked Circle \u201Cmapping\u201D working poster for Diversity Equity and
						Inclusion action in your institution or classroom
					</p>
					<p class="${"flex items-center text-gray-600 mb-6"}"><span class="${"w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0"}"><svg fill="${"none"}" stroke="${"currentColor"}" stroke-linecap="${"round"}" stroke-linejoin="${"round"}" stroke-width="${"2.5"}" class="${"w-3 h-3"}" viewBox="${"0 0 24 24"}"><path d="${"M20 6L9 17l-5-5"}"></path></svg>
						</span>Powerpoint on teaching from the Circle, based on her chapter in the
						internationally published book, \u201CTeaching and Learning Innovations in Higher Education\u201D
					</p>
					<p class="${"flex items-center text-gray-600 mb-6"}"><span class="${"w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0"}"><svg fill="${"none"}" stroke="${"currentColor"}" stroke-linecap="${"round"}" stroke-linejoin="${"round"}" stroke-width="${"2.5"}" class="${"w-3 h-3"}" viewBox="${"0 0 24 24"}"><path d="${"M20 6L9 17l-5-5"}"></path></svg>
						</span>\u201CChanging the Indian Education Paradigm: A Foundation in Culture and Law\u201D eBook,
						that gives basic background on Native American Residential/Boarding School history
						(primarily US-focused)\u2014includes 2 educator worksheets for tracking dual-language
						instruction, designed by Diana.
					</p>
					<a href="${"/coaching-packages/payment"}"><button class="${"flex items-center mt-auto text-white bg-cinred border-0 py-2 px-4 w-full focus:outline-none hover:bg-indigo-600 rounded"}">Purchase</button></a></div></div></div></section>

	<section class="${"container px-5 py-10 mx-auto text-xs"}"><h1 class="${"text-xs"}"><strong>**Our refund policy:</strong></h1>

		<p>1-1 coaching packages are refundable at the end of the first strategic 30-minute coaching
			session. This is where we decide that we\u2019re a good fit to meet your specific needs.
			Emergencies happening after this time can initiate a pause on payments, or a 2-month extension
			if paid-in-full upfront. We do provide a statement with your beginning and end date, so you
			don\u2019t have to guess the timeframe.
		</p>

		<p>Small group coaching Bootcamps and Workshops are refundable *until 24 hours before the event
			start. If an emergency happens after that, we will work with you to get you a replay of the
			live coaching and a personal coaching phone call to answer any questions.
		</p>

		<p>Seasoned Diversity Specialist Workbook and Packet is non-refundable once it\u2019s been
			downloaded/accessed. If there is an issue with the download, please contact us at: <a class="${"text-indigo-700 underline"}" href="${"mailto:support@bolddiversitysolutions.com"}">support@bolddiversitysolutions.com</a>, and we will work with you to ensure you have access to this important content.
		</p>

		<p>To be announced: upcoming members-only area where you can collaborate, access bonus coaching
			sessions, etc., for a monthly fee (cancel at any time; full refund in the first 14-days only)
		</p></section></main>`;
});
var index$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Coaching_packages
});
var Payment = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<section class="${"flex items-center justify-center text-gray-800 p-8 font-open"}">
	<div class="${"grid lg:grid-cols-3 md:grid-cols-2 gap-8 w-full max-w-screen-lg"}"><div class="${"lg:col-span-2"}"><h2 class="${"text-sm font-medium"}">Payment Method</h2>
			<div class="${"bg-white rounded mt-4 shadow-lg"}"><div class="${"flex items-center px-8 py-5"}"><input class="${"appearance-none w-4 h-4 rounded-full border-2 border-white ring-2 ring-blue-600 ring-opacity-100"}" type="${"radio"}" name="${"paypal"}">
					<label class="${"text-sm font-medium ml-4"}" for="${"payment-method"}">PayPal</label></div>
				<div class="${"border-t"}"><div class="${"flex items-center px-8 py-5"}"><input class="${"appearance-none w-4 h-4 rounded-full border-2 border-white ring-2 ring-blue-600 ring-opacity-100"}" type="${"radio"}" name="${"payment-method"}">
						<label class="${"text-sm font-medium ml-4"}" for="${"credit-card"}">Credit Card</label></div>
					<div class="${"grid grid-cols-2 gap-4 px-8 pb-8"}"><div class="${"col-span-2"}"><label class="${"text-xs font-semibold"}" for="${"cardNumber"}">Card number</label>
							<input class="${"flex items-center h-10 border mt-1 rounded px-4 w-full text-sm"}" type="${"text"}" placeholder="${"0000 0000 0000 0000"}"></div>
						<div class="${""}"><label class="${"text-xs font-semibold"}" for="${"cardNumber"}">Expiry Date</label>
							<input class="${"flex items-center h-10 border mt-1 rounded px-4 w-full text-sm"}" type="${"text"}" placeholder="${"MM/YY"}"></div>
						<div class="${""}"><label class="${"text-xs font-semibold"}" for="${"cardNumber"}">CVC/CVV</label>
							<input class="${"flex items-center h-10 border mt-1 rounded px-4 w-full text-sm"}" type="${"password"}" placeholder="${"..."}"></div></div></div></div></div>
		<div><h2 class="${"text-sm font-medium"}">Purchase Summary</h2>
			<div class="${"bg-white rounded mt-4 shadow-lg py-6"}"><div class="${"px-8"}"><div class="${"flex items-end"}"><select class="${"text-sm font-medium focus:outline-none -ml-1"}" name="${""}" id="${""}"><option value="${""}">Product (Billed Monthly)</option><option value="${""}">Product (Billed Annually)</option></select>
						<span class="${"text-sm ml-auto font-semibold"}">$20</span>
						<span class="${"text-xs text-gray-500 mb-px"}">/mo</span></div>
					<span class="${"text-xs text-gray-500 mt-2"}">Save 20% with annual billing</span></div>
				<div class="${"px-8 mt-4"}"><div class="${"flex items-end justify-between"}"><span class="${"text-sm font-semibold"}">Tax</span>
						<span class="${"text-sm text-gray-500 mb-px"}">10%</span></div></div>
				<div class="${"px-8 mt-4 border-t pt-4"}"><div class="${"flex items-end justify-between"}"><span class="${"font-semibold"}">Today you pay (AUD)</span>
						<span class="${"font-semibold"}">$0</span></div>
					<span class="${"text-xs text-gray-500 mt-2"}">After 1 month free: $22/mo.</span></div>
				<div class="${"flex items-center px-8 mt-8"}"><input id="${"termsConditions"}" type="${"checkbox"}">
					<label class="${"text-xs text-gray-500 ml-2"}" for="${"termsConditions"}">I agree to the terms and conditions.</label></div>
				<div class="${"flex flex-col px-8 pt-4"}"><button class="${"flex items-center justify-center bg-blue-600 text-sm font-medium w-full h-10 rounded text-blue-50 hover:bg-blue-700"}">Start Subscription</button>
					<button class="${"text-xs text-blue-500 mt-3 underline"}">Have a coupon code?</button></div></div></div></div></section>`;
});
var payment = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Payment
});
var FeatureArticleCard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title } = $$props;
  let { date } = $$props;
  let { description } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.date === void 0 && $$bindings.date && date !== void 0)
    $$bindings.date(date);
  if ($$props.description === void 0 && $$bindings.description && description !== void 0)
    $$bindings.description(description);
  return `<div class="${"p-4 bg-light-400 mb-4 h-64 rounded-md shadow"}"><h5 class="${"text-sm text-indigo-600 font-bold"}">Featured Article</h5>
	<h3 class="${"font-cormorant text-2xl"}">${escape(title)}</h3>
	<h4 class="${"text-lg text-gray-400 mb-2"}">${escape(date)}</h4>
	<p class="${"text-lg"}">${escape(description)}</p></div>`;
});
var ArticlePreviewCard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title } = $$props;
  let { date } = $$props;
  let { description } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.date === void 0 && $$bindings.date && date !== void 0)
    $$bindings.date(date);
  if ($$props.description === void 0 && $$bindings.description && description !== void 0)
    $$bindings.description(description);
  return `<div class="${"h-56 p-4 bg-light-400 my-4 rounded-md shadow"}"><h3 class="${"font-cormorant text-2xl"}">${escape(title)}</h3>
	<h4 class="${"text-lg text-gray-400 mb-4"}">${escape(date)}</h4>
	<p class="${"text-lg"}">${escape(description)}</p></div>`;
});
var css = {
  code: "#blogHeader.svelte-1t7ubnj{background-image:url('/typewriter-sm.png');background-size:cover;background-repeat:no-repeat;background-position:center;margin:0 auto;width:90vw;height:87.5vh}",
  map: `{"version":3,"file":"index.svelte","sources":["index.svelte"],"sourcesContent":["<script context=\\"module\\">\\r\\n\\texport const load = async ({ fetch }) => {\\r\\n\\t\\tconst res = await fetch('articles/getArticles');\\r\\n\\t\\tconst data = await res.json();\\r\\n\\r\\n\\t\\tconst articles = data;\\r\\n\\t\\tconsole.log(articles);\\r\\n\\r\\n\\t\\treturn {\\r\\n\\t\\t\\tprops: {\\r\\n\\t\\t\\t\\tarticles\\r\\n\\t\\t\\t}\\r\\n\\t\\t};\\r\\n\\t};\\r\\n<\/script>\\r\\n\\r\\n<script>\\r\\n\\timport FeatureArticleCard from '$lib/articles/FeatureArticleCard.svelte';\\r\\n\\timport ArticlePreviewCard from '$lib/articles/ArticlePreviewCard.svelte';\\r\\n\\r\\n\\texport let articles;\\r\\n\\texport let featuredArticles = articles.filter(article => article.featured === true);\\r\\n\\r\\n\\tarticles = articles.reverse();\\r\\n<\/script>\\r\\n\\r\\n<div class=\\"w-full border rounded-lg mb-4 px-8\\" id=\\"blogHeader\\" />\\r\\n\\r\\n<section>\\r\\n\\t<div class=\\"font-opencon grid overflow-hidden grid-cols-2 gap-x-12 w-full h-full my-4 px-8\\">\\r\\n\\t\\t\\r\\n\\t{#each featuredArticles as feature}\\r\\n\\t\\t<FeatureArticleCard title={feature.title} date={feature.posted} description={feature.description} />\\r\\n\\t{/each}\\t\\r\\n\\t</div>\\r\\n</section>\\r\\n\\r\\n<section class=\\"mt-8\\">\\r\\n\\t<h2 class=\\"font-cormorant text-3xl italic my-8 ml-10\\">Most Recent Articles</h2>\\r\\n\\r\\n\\t<div class=\\"font-opencon grid overflow-hidden grid-cols-1 w-3/4 h-full my-4 px-8\\">\\r\\n\\r\\n\\t\\t{#each articles as article}\\r\\n\\t\\t\\t<a href=\\"/articles/{article.id}\\">\\r\\n\\t\\t\\t\\t<ArticlePreviewCard title={article.title} date={article.posted} description={article.description} />\\r\\n\\t\\t\\t</a>\\r\\n\\t\\t{/each}\\r\\n\\r\\n\\t</div>\\r\\n</section>\\r\\n\\r\\n<style>#blogHeader {\\n  background-image: url('/typewriter-sm.png');\\n  background-size: cover;\\n  background-repeat: no-repeat;\\n  background-position: center;\\n  margin: 0 auto;\\n  width: 90vw;\\n  height: 87.5vh;\\n}</style>"],"names":[],"mappings":"AAmDO,WAAW,eAAC,CAAC,AAClB,gBAAgB,CAAE,IAAI,oBAAoB,CAAC,CAC3C,eAAe,CAAE,KAAK,CACtB,iBAAiB,CAAE,SAAS,CAC5B,mBAAmB,CAAE,MAAM,CAC3B,MAAM,CAAE,CAAC,CAAC,IAAI,CACd,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,MAAM,AAChB,CAAC"}`
};
var load$1 = async ({ fetch: fetch2 }) => {
  const res = await fetch2("articles/getArticles");
  const data = await res.json();
  const articles = data;
  console.log(articles);
  return { props: { articles } };
};
var Articles = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { articles } = $$props;
  let { featuredArticles = articles.filter((article) => article.featured === true) } = $$props;
  articles = articles.reverse();
  if ($$props.articles === void 0 && $$bindings.articles && articles !== void 0)
    $$bindings.articles(articles);
  if ($$props.featuredArticles === void 0 && $$bindings.featuredArticles && featuredArticles !== void 0)
    $$bindings.featuredArticles(featuredArticles);
  $$result.css.add(css);
  return `<div class="${"w-full border rounded-lg mb-4 px-8 svelte-1t7ubnj"}" id="${"blogHeader"}"></div>

<section><div class="${"font-opencon grid overflow-hidden grid-cols-2 gap-x-12 w-full h-full my-4 px-8"}">${each(featuredArticles, (feature) => `${validate_component(FeatureArticleCard, "FeatureArticleCard").$$render($$result, {
    title: feature.title,
    date: feature.posted,
    description: feature.description
  }, {}, {})}`)}</div></section>

<section class="${"mt-8"}"><h2 class="${"font-cormorant text-3xl italic my-8 ml-10"}">Most Recent Articles</h2>

	<div class="${"font-opencon grid overflow-hidden grid-cols-1 w-3/4 h-full my-4 px-8"}">${each(articles, (article) => `<a href="${"/articles/" + escape(article.id)}">${validate_component(ArticlePreviewCard, "ArticlePreviewCard").$$render($$result, {
    title: article.title,
    date: article.posted,
    description: article.description
  }, {}, {})}
			</a>`)}</div>
</section>`;
});
var index = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Articles,
  load: load$1
});
var load = async ({ page: { params }, fetch: fetch2 }) => {
  const { slug } = params;
  const res = await fetch2(`http://45.79.95.19:1337/articles/${slug}`);
  if (res.status === 404) {
    const error2 = new Error("Article not found!");
    return { status: 404, error: error2 };
  } else {
    const data = await res.json();
    const article = data;
    return { props: { article } };
  }
};
var U5Bslugu5D = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { article } = $$props;
  let content = article.content;
  let newDate = new Date(article.created_at).toDateString();
  let postedDate = newDate.slice(4);
  if ($$props.article === void 0 && $$bindings.article && article !== void 0)
    $$bindings.article(article);
  return `<article class="${"w-8/12 my-4 mx-auto p-6"}" id="${"article"}"><div class="${"font-sans"}"><p class="${"text-base md:text-sm text-indigo-500 font-bold"}">&lt; <a href="${"/articles"}" class="${"font-bold no-underline hover:underline"}">Back to Article Index</a></p>
		<h1 class="${"font-bold font-sans break-normal pt-6 pb-2 text-3xl md:text-4xl"}">${escape(article.title)}</h1>
		<p class="${"text-sm md:text-base font-normal text-gray-400 mb-8"}">Published ${escape(postedDate)}</p></div>

	<section class="${"prose"}"><!-- HTML_TAG_START -->${content}<!-- HTML_TAG_END --></section></article>`;
});
var _slug_ = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": U5Bslugu5D,
  load
});
var ContactForm = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="${"lg:w-1/2 md:w-2/3 mx-auto"}"><div class="${"flex flex-wrap -m-2"}"><div class="${"p-2 w-1/2"}"><div class="${"relative"}"><label for="${"name"}" class="${"leading-7 text-sm text-gray-600"}">Name</label>
				<input type="${"text"}" id="${"name"}" name="${"name"}" class="${"w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"}"></div></div>
		<div class="${"p-2 w-1/2"}"><div class="${"relative"}"><label for="${"email"}" class="${"leading-7 text-sm text-gray-600"}">Email</label>
				<input type="${"email"}" id="${"email"}" name="${"email"}" class="${"w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"}"></div></div>
		<div class="${"p-2 w-full"}"><div class="${"relative"}"><label for="${"message"}" class="${"leading-7 text-sm text-gray-600"}">Message</label>
				<textarea id="${"message"}" name="${"message"}" class="${"w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"}"></textarea></div></div>
		<div class="${"p-2 w-full"}"><button class="${"flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"}">Submit</button></div></div></div>`;
});
var Contact = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<main class="${"w-full min-h-screen"}"><section class="${"text-gray-600 body-font relative"}"><div class="${"container px-5 py-24 mx-auto"}"><div class="${"flex flex-col text-center w-full mb-12"}"><h1 class="${"sm:text-3xl text-2xl font-medium font-cormorant title-font mb-4 text-gray-900"}">Contact Us
				</h1></div>
			${validate_component(ContactForm, "ContactForm").$$render($$result, {}, {}, {})}</div></section></main>`;
});
var contact = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Contact
});

// .svelte-kit/vercel/entry.js
init();
var entry_default = async (req, res) => {
  const { pathname, searchParams } = new URL(req.url || "", "http://localhost");
  let body;
  try {
    body = await getRawBody(req);
  } catch (err) {
    res.statusCode = err.status || 400;
    return res.end(err.reason || "Invalid request body");
  }
  const rendered = await render({
    method: req.method,
    headers: req.headers,
    path: pathname,
    query: searchParams,
    rawBody: body
  });
  if (rendered) {
    const { status, headers, body: body2 } = rendered;
    return res.writeHead(status, headers).end(body2);
  }
  return res.writeHead(404).end();
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
