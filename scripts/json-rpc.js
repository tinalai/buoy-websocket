const JSON_RPC = function() {
  "use strict";

  var id = 0;

  /**
   * Contructs a new JSON-RPC Request object
   * @param {String} method - A String containing the name of the method to be invoked.
   * @param {*}[params] - A Structured value that holds the parameter values to be used during the invocation of the method
   */
  RPC.Request = function (method, params) {
    this.jsonrpc = "2.0";
    this.method = method;
    if (typeof params !== "undefined") {
      this.params = params;
    }
    console.log("id before '+=' ::", this.id);
    this.id += id;
    console.log("id = ", this.id );
  }

  /**
   * Implement getter and setter for the result of a JSON-RPC Request.
   */
  Object.defineProperty(RPC.Request, 'result', {
    get: function() { return this._result },
    set: function (result) {
      delete this.method;
      delete this.params;
      delete this.error;
      this._result = result;
    }
  });

  /**
   * Implement getter and setter for a JSON-RPC Request error.
   */
  Object.defineProperty(RPC.Request, 'error', {
    get: function () { return this._error},
    set: function (error) {
      delete this.method;
      delete this.params;
      delete this.result;
      this._error = error;
    }
  });

  /**
   * Return a String representation of a JSON-RPC Request.
   */
  RPC.Request.prototype.toString = function () {
    var rpc = {
      jsonrpc: this.jsonrpc,
      id: this.id
    };
    if (this.method !== undefined ) rpc.method = this.method;
    if (this.params !== undefined ) rpc.params = this.params;
    if (this.result !== undefined ) rpc.result = this.result;
    if (this.error !== undefined ) rpc.result = this.error;

    return JSON.stringify(rpc);
  }

  /**
   * Constructs a new JSON-RPC Notification object
   *
   * @param {String} method - A String containing the name of the method to be invoked.
   * @param {*} [params] - A Structured value that holds the parameter values to be used during the invocation of the method.
   */
  RPC.Notification = function (method, params) {
    this.jsonrpc = "2.0";
    this.method = method;
    if (typeof params !== "undefined") {
      this.params = params;
    }
  }

  /**
   * Constructs a new JSON-RPC Error Object
   *
   * @param {number} code - A Number that indicates the type of error occurred.
   * @param {string} message - A String providing a short description of the error.
   * @param {*} [data] - A Primitive or Structured value that contains additional information about the error.
   */
  RPC.Error = function (code, message, data) {
    this.code = code;
    if ( typeof message === "string") {
      this.message = message;
    }
    if (data !== undefined ) {
      this.data = data;
    }
  }

  /**
   * Pre-defined Errors
   */

  RPC.Parse_error = new RPC.Error(-32700, "An error occurred on the server while parsing the JSON text.");

  RPC.Invalid_request = new RPC.Error(-32600, "The JSON sent is not a valid Request object.");

  RPC.Method_not_found = new RPC.Error(-32601, "The method does not exist / is not available.");

  RPC.Invalid_params = new RPC.Error(-32602, "Invalid method parameter(s).");

  RPC.Internal_error = new RPC.Error(-32603, "Internal JSON-RPC error.");


};

module.exports = JSON_RPC;
