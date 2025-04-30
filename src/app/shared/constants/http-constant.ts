export class HttpConstants {
  static readonly connection_error = 0;
  static readonly ok = 200;
  static readonly created = 201;
  static readonly no_content = 204;
  static readonly bad_request = 400;
  static readonly unauthorized = 401;
  static readonly forbidden = 403;
  static readonly not_found = 404;
  static readonly method_not_allowed = 405;
  static readonly request_timeout = 408;
  static readonly internal_server_error = 500;
  static readonly bad_gateway = 502;
  static readonly gateway_timeout = 504;
}
