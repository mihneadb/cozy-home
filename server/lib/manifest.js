// Generated by CoffeeScript 1.6.3
var request,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

request = require('request-json');

exports.Manifest = (function() {
  function Manifest() {
    this.getMetaData = __bind(this.getMetaData, this);
    this.getDescription = __bind(this.getDescription, this);
    this.getWidget = __bind(this.getWidget, this);
    this.getPermissions = __bind(this.getPermissions, this);
  }

  Manifest.prototype.download = function(app, callback) {
    var client, path,
      _this = this;
    path = app.git.substring(19, app.git.length - 4);
    client = request.newClient("https://raw.github.com/");
    if (app.branch != null) {
      path = path + '/' + app.branch;
    } else {
      path = path + '/master';
    }
    return client.get(path + '/package.json', function(err, res, body) {
      if (err) {
        callback(err);
      }
      _this.config = body;
      return callback(null);
    });
  };

  Manifest.prototype.getPermissions = function() {
    if (this.config["cozy-permissions"] != null) {
      return this.config["cozy-permissions"];
    } else {
      return {};
    }
  };

  Manifest.prototype.getWidget = function() {
    if (this.config['cozy-widget'] != null) {
      return this.config["cozy-widget"];
    } else {
      return null;
    }
  };

  Manifest.prototype.getDescription = function() {
    if (this.config['description'] != null) {
      return this.config["description"];
    } else {
      return null;
    }
  };

  Manifest.prototype.getMetaData = function() {
    var metaData;
    metaData = {};
    if (this.config.description != null) {
      metaData.description = this.config.description;
    }
    if (this.config.name != null) {
      metaData.name = this.config.name.replace('cozy-', '');
    }
    if (this.config['cozy-displayName'] != null) {
      metaData.displayName = this.config['cozy-displayName'];
    } else {
      metaData.displayName = this.config.name.replace('cozy-', '');
    }
    if (this.config['cozy-permissions'] != null) {
      metaData.permissions = this.config['cozy-permissions'];
    }
    return metaData;
  };

  return Manifest;

})();
