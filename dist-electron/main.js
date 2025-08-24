import Dt, { ipcMain as on, dialog as If, app as Rr, BrowserWindow as sl } from "electron";
import { fileURLToPath as Rf } from "node:url";
import te from "fs";
import Pf from "constants";
import Hn from "stream";
import mo from "util";
import ll from "assert";
import z from "path";
import qr, { spawn as Wt } from "child_process";
import cl from "events";
import qn from "crypto";
import ul from "tty";
import Gr from "os";
import an from "url";
import Df from "string_decoder";
import fl from "zlib";
import Nf from "http";
import ut from "node:path";
var Te = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, dl = {}, Ft = {}, $e = {};
$e.fromCallback = function(e) {
  return Object.defineProperty(function(...t) {
    if (typeof t[t.length - 1] == "function") e.apply(this, t);
    else
      return new Promise((n, r) => {
        t.push((i, o) => i != null ? r(i) : n(o)), e.apply(this, t);
      });
  }, "name", { value: e.name });
};
$e.fromPromise = function(e) {
  return Object.defineProperty(function(...t) {
    const n = t[t.length - 1];
    if (typeof n != "function") return e.apply(this, t);
    t.pop(), e.apply(this, t).then((r) => n(null, r), n);
  }, "name", { value: e.name });
};
var it = Pf, Ff = process.cwd, br = null, xf = process.env.GRACEFUL_FS_PLATFORM || process.platform;
process.cwd = function() {
  return br || (br = Ff.call(process)), br;
};
try {
  process.cwd();
} catch {
}
if (typeof process.chdir == "function") {
  var fa = process.chdir;
  process.chdir = function(e) {
    br = null, fa.call(process, e);
  }, Object.setPrototypeOf && Object.setPrototypeOf(process.chdir, fa);
}
var Lf = Uf;
function Uf(e) {
  it.hasOwnProperty("O_SYMLINK") && process.version.match(/^v0\.6\.[0-2]|^v0\.5\./) && t(e), e.lutimes || n(e), e.chown = o(e.chown), e.fchown = o(e.fchown), e.lchown = o(e.lchown), e.chmod = r(e.chmod), e.fchmod = r(e.fchmod), e.lchmod = r(e.lchmod), e.chownSync = a(e.chownSync), e.fchownSync = a(e.fchownSync), e.lchownSync = a(e.lchownSync), e.chmodSync = i(e.chmodSync), e.fchmodSync = i(e.fchmodSync), e.lchmodSync = i(e.lchmodSync), e.stat = s(e.stat), e.fstat = s(e.fstat), e.lstat = s(e.lstat), e.statSync = l(e.statSync), e.fstatSync = l(e.fstatSync), e.lstatSync = l(e.lstatSync), e.chmod && !e.lchmod && (e.lchmod = function(c, f, d) {
    d && process.nextTick(d);
  }, e.lchmodSync = function() {
  }), e.chown && !e.lchown && (e.lchown = function(c, f, d, g) {
    g && process.nextTick(g);
  }, e.lchownSync = function() {
  }), xf === "win32" && (e.rename = typeof e.rename != "function" ? e.rename : function(c) {
    function f(d, g, w) {
      var y = Date.now(), S = 0;
      c(d, g, function T(A) {
        if (A && (A.code === "EACCES" || A.code === "EPERM" || A.code === "EBUSY") && Date.now() - y < 6e4) {
          setTimeout(function() {
            e.stat(g, function(P, x) {
              P && P.code === "ENOENT" ? c(d, g, T) : w(A);
            });
          }, S), S < 100 && (S += 10);
          return;
        }
        w && w(A);
      });
    }
    return Object.setPrototypeOf && Object.setPrototypeOf(f, c), f;
  }(e.rename)), e.read = typeof e.read != "function" ? e.read : function(c) {
    function f(d, g, w, y, S, T) {
      var A;
      if (T && typeof T == "function") {
        var P = 0;
        A = function(x, X, Z) {
          if (x && x.code === "EAGAIN" && P < 10)
            return P++, c.call(e, d, g, w, y, S, A);
          T.apply(this, arguments);
        };
      }
      return c.call(e, d, g, w, y, S, A);
    }
    return Object.setPrototypeOf && Object.setPrototypeOf(f, c), f;
  }(e.read), e.readSync = typeof e.readSync != "function" ? e.readSync : /* @__PURE__ */ function(c) {
    return function(f, d, g, w, y) {
      for (var S = 0; ; )
        try {
          return c.call(e, f, d, g, w, y);
        } catch (T) {
          if (T.code === "EAGAIN" && S < 10) {
            S++;
            continue;
          }
          throw T;
        }
    };
  }(e.readSync);
  function t(c) {
    c.lchmod = function(f, d, g) {
      c.open(
        f,
        it.O_WRONLY | it.O_SYMLINK,
        d,
        function(w, y) {
          if (w) {
            g && g(w);
            return;
          }
          c.fchmod(y, d, function(S) {
            c.close(y, function(T) {
              g && g(S || T);
            });
          });
        }
      );
    }, c.lchmodSync = function(f, d) {
      var g = c.openSync(f, it.O_WRONLY | it.O_SYMLINK, d), w = !0, y;
      try {
        y = c.fchmodSync(g, d), w = !1;
      } finally {
        if (w)
          try {
            c.closeSync(g);
          } catch {
          }
        else
          c.closeSync(g);
      }
      return y;
    };
  }
  function n(c) {
    it.hasOwnProperty("O_SYMLINK") && c.futimes ? (c.lutimes = function(f, d, g, w) {
      c.open(f, it.O_SYMLINK, function(y, S) {
        if (y) {
          w && w(y);
          return;
        }
        c.futimes(S, d, g, function(T) {
          c.close(S, function(A) {
            w && w(T || A);
          });
        });
      });
    }, c.lutimesSync = function(f, d, g) {
      var w = c.openSync(f, it.O_SYMLINK), y, S = !0;
      try {
        y = c.futimesSync(w, d, g), S = !1;
      } finally {
        if (S)
          try {
            c.closeSync(w);
          } catch {
          }
        else
          c.closeSync(w);
      }
      return y;
    }) : c.futimes && (c.lutimes = function(f, d, g, w) {
      w && process.nextTick(w);
    }, c.lutimesSync = function() {
    });
  }
  function r(c) {
    return c && function(f, d, g) {
      return c.call(e, f, d, function(w) {
        m(w) && (w = null), g && g.apply(this, arguments);
      });
    };
  }
  function i(c) {
    return c && function(f, d) {
      try {
        return c.call(e, f, d);
      } catch (g) {
        if (!m(g)) throw g;
      }
    };
  }
  function o(c) {
    return c && function(f, d, g, w) {
      return c.call(e, f, d, g, function(y) {
        m(y) && (y = null), w && w.apply(this, arguments);
      });
    };
  }
  function a(c) {
    return c && function(f, d, g) {
      try {
        return c.call(e, f, d, g);
      } catch (w) {
        if (!m(w)) throw w;
      }
    };
  }
  function s(c) {
    return c && function(f, d, g) {
      typeof d == "function" && (g = d, d = null);
      function w(y, S) {
        S && (S.uid < 0 && (S.uid += 4294967296), S.gid < 0 && (S.gid += 4294967296)), g && g.apply(this, arguments);
      }
      return d ? c.call(e, f, d, w) : c.call(e, f, w);
    };
  }
  function l(c) {
    return c && function(f, d) {
      var g = d ? c.call(e, f, d) : c.call(e, f);
      return g && (g.uid < 0 && (g.uid += 4294967296), g.gid < 0 && (g.gid += 4294967296)), g;
    };
  }
  function m(c) {
    if (!c || c.code === "ENOSYS")
      return !0;
    var f = !process.getuid || process.getuid() !== 0;
    return !!(f && (c.code === "EINVAL" || c.code === "EPERM"));
  }
}
var da = Hn.Stream, kf = Mf;
function Mf(e) {
  return {
    ReadStream: t,
    WriteStream: n
  };
  function t(r, i) {
    if (!(this instanceof t)) return new t(r, i);
    da.call(this);
    var o = this;
    this.path = r, this.fd = null, this.readable = !0, this.paused = !1, this.flags = "r", this.mode = 438, this.bufferSize = 64 * 1024, i = i || {};
    for (var a = Object.keys(i), s = 0, l = a.length; s < l; s++) {
      var m = a[s];
      this[m] = i[m];
    }
    if (this.encoding && this.setEncoding(this.encoding), this.start !== void 0) {
      if (typeof this.start != "number")
        throw TypeError("start must be a Number");
      if (this.end === void 0)
        this.end = 1 / 0;
      else if (typeof this.end != "number")
        throw TypeError("end must be a Number");
      if (this.start > this.end)
        throw new Error("start must be <= end");
      this.pos = this.start;
    }
    if (this.fd !== null) {
      process.nextTick(function() {
        o._read();
      });
      return;
    }
    e.open(this.path, this.flags, this.mode, function(c, f) {
      if (c) {
        o.emit("error", c), o.readable = !1;
        return;
      }
      o.fd = f, o.emit("open", f), o._read();
    });
  }
  function n(r, i) {
    if (!(this instanceof n)) return new n(r, i);
    da.call(this), this.path = r, this.fd = null, this.writable = !0, this.flags = "w", this.encoding = "binary", this.mode = 438, this.bytesWritten = 0, i = i || {};
    for (var o = Object.keys(i), a = 0, s = o.length; a < s; a++) {
      var l = o[a];
      this[l] = i[l];
    }
    if (this.start !== void 0) {
      if (typeof this.start != "number")
        throw TypeError("start must be a Number");
      if (this.start < 0)
        throw new Error("start must be >= zero");
      this.pos = this.start;
    }
    this.busy = !1, this._queue = [], this.fd === null && (this._open = e.open, this._queue.push([this._open, this.path, this.flags, this.mode, void 0]), this.flush());
  }
}
var Bf = Hf, jf = Object.getPrototypeOf || function(e) {
  return e.__proto__;
};
function Hf(e) {
  if (e === null || typeof e != "object")
    return e;
  if (e instanceof Object)
    var t = { __proto__: jf(e) };
  else
    var t = /* @__PURE__ */ Object.create(null);
  return Object.getOwnPropertyNames(e).forEach(function(n) {
    Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(e, n));
  }), t;
}
var ie = te, qf = Lf, Gf = kf, Vf = Bf, ur = mo, Ee, Pr;
typeof Symbol == "function" && typeof Symbol.for == "function" ? (Ee = Symbol.for("graceful-fs.queue"), Pr = Symbol.for("graceful-fs.previous")) : (Ee = "___graceful-fs.queue", Pr = "___graceful-fs.previous");
function Wf() {
}
function hl(e, t) {
  Object.defineProperty(e, Ee, {
    get: function() {
      return t;
    }
  });
}
var It = Wf;
ur.debuglog ? It = ur.debuglog("gfs4") : /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") && (It = function() {
  var e = ur.format.apply(ur, arguments);
  e = "GFS4: " + e.split(/\n/).join(`
GFS4: `), console.error(e);
});
if (!ie[Ee]) {
  var Yf = Te[Ee] || [];
  hl(ie, Yf), ie.close = function(e) {
    function t(n, r) {
      return e.call(ie, n, function(i) {
        i || ha(), typeof r == "function" && r.apply(this, arguments);
      });
    }
    return Object.defineProperty(t, Pr, {
      value: e
    }), t;
  }(ie.close), ie.closeSync = function(e) {
    function t(n) {
      e.apply(ie, arguments), ha();
    }
    return Object.defineProperty(t, Pr, {
      value: e
    }), t;
  }(ie.closeSync), /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") && process.on("exit", function() {
    It(ie[Ee]), ll.equal(ie[Ee].length, 0);
  });
}
Te[Ee] || hl(Te, ie[Ee]);
var Oe = go(Vf(ie));
process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH && !ie.__patched && (Oe = go(ie), ie.__patched = !0);
function go(e) {
  qf(e), e.gracefulify = go, e.createReadStream = X, e.createWriteStream = Z;
  var t = e.readFile;
  e.readFile = n;
  function n(E, q, B) {
    return typeof q == "function" && (B = q, q = null), M(E, q, B);
    function M(K, I, $, D) {
      return t(K, I, function(b) {
        b && (b.code === "EMFILE" || b.code === "ENFILE") ? kt([M, [K, I, $], b, D || Date.now(), Date.now()]) : typeof $ == "function" && $.apply(this, arguments);
      });
    }
  }
  var r = e.writeFile;
  e.writeFile = i;
  function i(E, q, B, M) {
    return typeof B == "function" && (M = B, B = null), K(E, q, B, M);
    function K(I, $, D, b, N) {
      return r(I, $, D, function(R) {
        R && (R.code === "EMFILE" || R.code === "ENFILE") ? kt([K, [I, $, D, b], R, N || Date.now(), Date.now()]) : typeof b == "function" && b.apply(this, arguments);
      });
    }
  }
  var o = e.appendFile;
  o && (e.appendFile = a);
  function a(E, q, B, M) {
    return typeof B == "function" && (M = B, B = null), K(E, q, B, M);
    function K(I, $, D, b, N) {
      return o(I, $, D, function(R) {
        R && (R.code === "EMFILE" || R.code === "ENFILE") ? kt([K, [I, $, D, b], R, N || Date.now(), Date.now()]) : typeof b == "function" && b.apply(this, arguments);
      });
    }
  }
  var s = e.copyFile;
  s && (e.copyFile = l);
  function l(E, q, B, M) {
    return typeof B == "function" && (M = B, B = 0), K(E, q, B, M);
    function K(I, $, D, b, N) {
      return s(I, $, D, function(R) {
        R && (R.code === "EMFILE" || R.code === "ENFILE") ? kt([K, [I, $, D, b], R, N || Date.now(), Date.now()]) : typeof b == "function" && b.apply(this, arguments);
      });
    }
  }
  var m = e.readdir;
  e.readdir = f;
  var c = /^v[0-5]\./;
  function f(E, q, B) {
    typeof q == "function" && (B = q, q = null);
    var M = c.test(process.version) ? function($, D, b, N) {
      return m($, K(
        $,
        D,
        b,
        N
      ));
    } : function($, D, b, N) {
      return m($, D, K(
        $,
        D,
        b,
        N
      ));
    };
    return M(E, q, B);
    function K(I, $, D, b) {
      return function(N, R) {
        N && (N.code === "EMFILE" || N.code === "ENFILE") ? kt([
          M,
          [I, $, D],
          N,
          b || Date.now(),
          Date.now()
        ]) : (R && R.sort && R.sort(), typeof D == "function" && D.call(this, N, R));
      };
    }
  }
  if (process.version.substr(0, 4) === "v0.8") {
    var d = Gf(e);
    T = d.ReadStream, P = d.WriteStream;
  }
  var g = e.ReadStream;
  g && (T.prototype = Object.create(g.prototype), T.prototype.open = A);
  var w = e.WriteStream;
  w && (P.prototype = Object.create(w.prototype), P.prototype.open = x), Object.defineProperty(e, "ReadStream", {
    get: function() {
      return T;
    },
    set: function(E) {
      T = E;
    },
    enumerable: !0,
    configurable: !0
  }), Object.defineProperty(e, "WriteStream", {
    get: function() {
      return P;
    },
    set: function(E) {
      P = E;
    },
    enumerable: !0,
    configurable: !0
  });
  var y = T;
  Object.defineProperty(e, "FileReadStream", {
    get: function() {
      return y;
    },
    set: function(E) {
      y = E;
    },
    enumerable: !0,
    configurable: !0
  });
  var S = P;
  Object.defineProperty(e, "FileWriteStream", {
    get: function() {
      return S;
    },
    set: function(E) {
      S = E;
    },
    enumerable: !0,
    configurable: !0
  });
  function T(E, q) {
    return this instanceof T ? (g.apply(this, arguments), this) : T.apply(Object.create(T.prototype), arguments);
  }
  function A() {
    var E = this;
    le(E.path, E.flags, E.mode, function(q, B) {
      q ? (E.autoClose && E.destroy(), E.emit("error", q)) : (E.fd = B, E.emit("open", B), E.read());
    });
  }
  function P(E, q) {
    return this instanceof P ? (w.apply(this, arguments), this) : P.apply(Object.create(P.prototype), arguments);
  }
  function x() {
    var E = this;
    le(E.path, E.flags, E.mode, function(q, B) {
      q ? (E.destroy(), E.emit("error", q)) : (E.fd = B, E.emit("open", B));
    });
  }
  function X(E, q) {
    return new e.ReadStream(E, q);
  }
  function Z(E, q) {
    return new e.WriteStream(E, q);
  }
  var V = e.open;
  e.open = le;
  function le(E, q, B, M) {
    return typeof B == "function" && (M = B, B = null), K(E, q, B, M);
    function K(I, $, D, b, N) {
      return V(I, $, D, function(R, k) {
        R && (R.code === "EMFILE" || R.code === "ENFILE") ? kt([K, [I, $, D, b], R, N || Date.now(), Date.now()]) : typeof b == "function" && b.apply(this, arguments);
      });
    }
  }
  return e;
}
function kt(e) {
  It("ENQUEUE", e[0].name, e[1]), ie[Ee].push(e), Eo();
}
var fr;
function ha() {
  for (var e = Date.now(), t = 0; t < ie[Ee].length; ++t)
    ie[Ee][t].length > 2 && (ie[Ee][t][3] = e, ie[Ee][t][4] = e);
  Eo();
}
function Eo() {
  if (clearTimeout(fr), fr = void 0, ie[Ee].length !== 0) {
    var e = ie[Ee].shift(), t = e[0], n = e[1], r = e[2], i = e[3], o = e[4];
    if (i === void 0)
      It("RETRY", t.name, n), t.apply(null, n);
    else if (Date.now() - i >= 6e4) {
      It("TIMEOUT", t.name, n);
      var a = n.pop();
      typeof a == "function" && a.call(null, r);
    } else {
      var s = Date.now() - o, l = Math.max(o - i, 1), m = Math.min(l * 1.2, 100);
      s >= m ? (It("RETRY", t.name, n), t.apply(null, n.concat([i]))) : ie[Ee].push(e);
    }
    fr === void 0 && (fr = setTimeout(Eo, 0));
  }
}
(function(e) {
  const t = $e.fromCallback, n = Oe, r = [
    "access",
    "appendFile",
    "chmod",
    "chown",
    "close",
    "copyFile",
    "fchmod",
    "fchown",
    "fdatasync",
    "fstat",
    "fsync",
    "ftruncate",
    "futimes",
    "lchmod",
    "lchown",
    "link",
    "lstat",
    "mkdir",
    "mkdtemp",
    "open",
    "opendir",
    "readdir",
    "readFile",
    "readlink",
    "realpath",
    "rename",
    "rm",
    "rmdir",
    "stat",
    "symlink",
    "truncate",
    "unlink",
    "utimes",
    "writeFile"
  ].filter((i) => typeof n[i] == "function");
  Object.assign(e, n), r.forEach((i) => {
    e[i] = t(n[i]);
  }), e.exists = function(i, o) {
    return typeof o == "function" ? n.exists(i, o) : new Promise((a) => n.exists(i, a));
  }, e.read = function(i, o, a, s, l, m) {
    return typeof m == "function" ? n.read(i, o, a, s, l, m) : new Promise((c, f) => {
      n.read(i, o, a, s, l, (d, g, w) => {
        if (d) return f(d);
        c({ bytesRead: g, buffer: w });
      });
    });
  }, e.write = function(i, o, ...a) {
    return typeof a[a.length - 1] == "function" ? n.write(i, o, ...a) : new Promise((s, l) => {
      n.write(i, o, ...a, (m, c, f) => {
        if (m) return l(m);
        s({ bytesWritten: c, buffer: f });
      });
    });
  }, typeof n.writev == "function" && (e.writev = function(i, o, ...a) {
    return typeof a[a.length - 1] == "function" ? n.writev(i, o, ...a) : new Promise((s, l) => {
      n.writev(i, o, ...a, (m, c, f) => {
        if (m) return l(m);
        s({ bytesWritten: c, buffers: f });
      });
    });
  }), typeof n.realpath.native == "function" ? e.realpath.native = t(n.realpath.native) : process.emitWarning(
    "fs.realpath.native is not a function. Is fs being monkey-patched?",
    "Warning",
    "fs-extra-WARN0003"
  );
})(Ft);
var yo = {}, pl = {};
const zf = z;
pl.checkPath = function(t) {
  if (process.platform === "win32" && /[<>:"|?*]/.test(t.replace(zf.parse(t).root, ""))) {
    const r = new Error(`Path contains invalid characters: ${t}`);
    throw r.code = "EINVAL", r;
  }
};
const ml = Ft, { checkPath: gl } = pl, El = (e) => {
  const t = { mode: 511 };
  return typeof e == "number" ? e : { ...t, ...e }.mode;
};
yo.makeDir = async (e, t) => (gl(e), ml.mkdir(e, {
  mode: El(t),
  recursive: !0
}));
yo.makeDirSync = (e, t) => (gl(e), ml.mkdirSync(e, {
  mode: El(t),
  recursive: !0
}));
const Xf = $e.fromPromise, { makeDir: Kf, makeDirSync: _i } = yo, Si = Xf(Kf);
var ze = {
  mkdirs: Si,
  mkdirsSync: _i,
  // alias
  mkdirp: Si,
  mkdirpSync: _i,
  ensureDir: Si,
  ensureDirSync: _i
};
const Jf = $e.fromPromise, yl = Ft;
function Qf(e) {
  return yl.access(e).then(() => !0).catch(() => !1);
}
var xt = {
  pathExists: Jf(Qf),
  pathExistsSync: yl.existsSync
};
const Qt = Oe;
function Zf(e, t, n, r) {
  Qt.open(e, "r+", (i, o) => {
    if (i) return r(i);
    Qt.futimes(o, t, n, (a) => {
      Qt.close(o, (s) => {
        r && r(a || s);
      });
    });
  });
}
function ed(e, t, n) {
  const r = Qt.openSync(e, "r+");
  return Qt.futimesSync(r, t, n), Qt.closeSync(r);
}
var vl = {
  utimesMillis: Zf,
  utimesMillisSync: ed
};
const en = Ft, he = z, td = mo;
function nd(e, t, n) {
  const r = n.dereference ? (i) => en.stat(i, { bigint: !0 }) : (i) => en.lstat(i, { bigint: !0 });
  return Promise.all([
    r(e),
    r(t).catch((i) => {
      if (i.code === "ENOENT") return null;
      throw i;
    })
  ]).then(([i, o]) => ({ srcStat: i, destStat: o }));
}
function rd(e, t, n) {
  let r;
  const i = n.dereference ? (a) => en.statSync(a, { bigint: !0 }) : (a) => en.lstatSync(a, { bigint: !0 }), o = i(e);
  try {
    r = i(t);
  } catch (a) {
    if (a.code === "ENOENT") return { srcStat: o, destStat: null };
    throw a;
  }
  return { srcStat: o, destStat: r };
}
function id(e, t, n, r, i) {
  td.callbackify(nd)(e, t, r, (o, a) => {
    if (o) return i(o);
    const { srcStat: s, destStat: l } = a;
    if (l) {
      if (Gn(s, l)) {
        const m = he.basename(e), c = he.basename(t);
        return n === "move" && m !== c && m.toLowerCase() === c.toLowerCase() ? i(null, { srcStat: s, destStat: l, isChangingCase: !0 }) : i(new Error("Source and destination must not be the same."));
      }
      if (s.isDirectory() && !l.isDirectory())
        return i(new Error(`Cannot overwrite non-directory '${t}' with directory '${e}'.`));
      if (!s.isDirectory() && l.isDirectory())
        return i(new Error(`Cannot overwrite directory '${t}' with non-directory '${e}'.`));
    }
    return s.isDirectory() && vo(e, t) ? i(new Error(Vr(e, t, n))) : i(null, { srcStat: s, destStat: l });
  });
}
function od(e, t, n, r) {
  const { srcStat: i, destStat: o } = rd(e, t, r);
  if (o) {
    if (Gn(i, o)) {
      const a = he.basename(e), s = he.basename(t);
      if (n === "move" && a !== s && a.toLowerCase() === s.toLowerCase())
        return { srcStat: i, destStat: o, isChangingCase: !0 };
      throw new Error("Source and destination must not be the same.");
    }
    if (i.isDirectory() && !o.isDirectory())
      throw new Error(`Cannot overwrite non-directory '${t}' with directory '${e}'.`);
    if (!i.isDirectory() && o.isDirectory())
      throw new Error(`Cannot overwrite directory '${t}' with non-directory '${e}'.`);
  }
  if (i.isDirectory() && vo(e, t))
    throw new Error(Vr(e, t, n));
  return { srcStat: i, destStat: o };
}
function wl(e, t, n, r, i) {
  const o = he.resolve(he.dirname(e)), a = he.resolve(he.dirname(n));
  if (a === o || a === he.parse(a).root) return i();
  en.stat(a, { bigint: !0 }, (s, l) => s ? s.code === "ENOENT" ? i() : i(s) : Gn(t, l) ? i(new Error(Vr(e, n, r))) : wl(e, t, a, r, i));
}
function _l(e, t, n, r) {
  const i = he.resolve(he.dirname(e)), o = he.resolve(he.dirname(n));
  if (o === i || o === he.parse(o).root) return;
  let a;
  try {
    a = en.statSync(o, { bigint: !0 });
  } catch (s) {
    if (s.code === "ENOENT") return;
    throw s;
  }
  if (Gn(t, a))
    throw new Error(Vr(e, n, r));
  return _l(e, t, o, r);
}
function Gn(e, t) {
  return t.ino && t.dev && t.ino === e.ino && t.dev === e.dev;
}
function vo(e, t) {
  const n = he.resolve(e).split(he.sep).filter((i) => i), r = he.resolve(t).split(he.sep).filter((i) => i);
  return n.reduce((i, o, a) => i && r[a] === o, !0);
}
function Vr(e, t, n) {
  return `Cannot ${n} '${e}' to a subdirectory of itself, '${t}'.`;
}
var sn = {
  checkPaths: id,
  checkPathsSync: od,
  checkParentPaths: wl,
  checkParentPathsSync: _l,
  isSrcSubdir: vo,
  areIdentical: Gn
};
const Pe = Oe, $n = z, ad = ze.mkdirs, sd = xt.pathExists, ld = vl.utimesMillis, On = sn;
function cd(e, t, n, r) {
  typeof n == "function" && !r ? (r = n, n = {}) : typeof n == "function" && (n = { filter: n }), r = r || function() {
  }, n = n || {}, n.clobber = "clobber" in n ? !!n.clobber : !0, n.overwrite = "overwrite" in n ? !!n.overwrite : n.clobber, n.preserveTimestamps && process.arch === "ia32" && process.emitWarning(
    `Using the preserveTimestamps option in 32-bit node is not recommended;

	see https://github.com/jprichardson/node-fs-extra/issues/269`,
    "Warning",
    "fs-extra-WARN0001"
  ), On.checkPaths(e, t, "copy", n, (i, o) => {
    if (i) return r(i);
    const { srcStat: a, destStat: s } = o;
    On.checkParentPaths(e, a, t, "copy", (l) => l ? r(l) : n.filter ? Sl(pa, s, e, t, n, r) : pa(s, e, t, n, r));
  });
}
function pa(e, t, n, r, i) {
  const o = $n.dirname(n);
  sd(o, (a, s) => {
    if (a) return i(a);
    if (s) return Dr(e, t, n, r, i);
    ad(o, (l) => l ? i(l) : Dr(e, t, n, r, i));
  });
}
function Sl(e, t, n, r, i, o) {
  Promise.resolve(i.filter(n, r)).then((a) => a ? e(t, n, r, i, o) : o(), (a) => o(a));
}
function ud(e, t, n, r, i) {
  return r.filter ? Sl(Dr, e, t, n, r, i) : Dr(e, t, n, r, i);
}
function Dr(e, t, n, r, i) {
  (r.dereference ? Pe.stat : Pe.lstat)(t, (a, s) => a ? i(a) : s.isDirectory() ? Ed(s, e, t, n, r, i) : s.isFile() || s.isCharacterDevice() || s.isBlockDevice() ? fd(s, e, t, n, r, i) : s.isSymbolicLink() ? wd(e, t, n, r, i) : s.isSocket() ? i(new Error(`Cannot copy a socket file: ${t}`)) : s.isFIFO() ? i(new Error(`Cannot copy a FIFO pipe: ${t}`)) : i(new Error(`Unknown file: ${t}`)));
}
function fd(e, t, n, r, i, o) {
  return t ? dd(e, n, r, i, o) : Al(e, n, r, i, o);
}
function dd(e, t, n, r, i) {
  if (r.overwrite)
    Pe.unlink(n, (o) => o ? i(o) : Al(e, t, n, r, i));
  else return r.errorOnExist ? i(new Error(`'${n}' already exists`)) : i();
}
function Al(e, t, n, r, i) {
  Pe.copyFile(t, n, (o) => o ? i(o) : r.preserveTimestamps ? hd(e.mode, t, n, i) : Wr(n, e.mode, i));
}
function hd(e, t, n, r) {
  return pd(e) ? md(n, e, (i) => i ? r(i) : ma(e, t, n, r)) : ma(e, t, n, r);
}
function pd(e) {
  return (e & 128) === 0;
}
function md(e, t, n) {
  return Wr(e, t | 128, n);
}
function ma(e, t, n, r) {
  gd(t, n, (i) => i ? r(i) : Wr(n, e, r));
}
function Wr(e, t, n) {
  return Pe.chmod(e, t, n);
}
function gd(e, t, n) {
  Pe.stat(e, (r, i) => r ? n(r) : ld(t, i.atime, i.mtime, n));
}
function Ed(e, t, n, r, i, o) {
  return t ? Tl(n, r, i, o) : yd(e.mode, n, r, i, o);
}
function yd(e, t, n, r, i) {
  Pe.mkdir(n, (o) => {
    if (o) return i(o);
    Tl(t, n, r, (a) => a ? i(a) : Wr(n, e, i));
  });
}
function Tl(e, t, n, r) {
  Pe.readdir(e, (i, o) => i ? r(i) : Cl(o, e, t, n, r));
}
function Cl(e, t, n, r, i) {
  const o = e.pop();
  return o ? vd(e, o, t, n, r, i) : i();
}
function vd(e, t, n, r, i, o) {
  const a = $n.join(n, t), s = $n.join(r, t);
  On.checkPaths(a, s, "copy", i, (l, m) => {
    if (l) return o(l);
    const { destStat: c } = m;
    ud(c, a, s, i, (f) => f ? o(f) : Cl(e, n, r, i, o));
  });
}
function wd(e, t, n, r, i) {
  Pe.readlink(t, (o, a) => {
    if (o) return i(o);
    if (r.dereference && (a = $n.resolve(process.cwd(), a)), e)
      Pe.readlink(n, (s, l) => s ? s.code === "EINVAL" || s.code === "UNKNOWN" ? Pe.symlink(a, n, i) : i(s) : (r.dereference && (l = $n.resolve(process.cwd(), l)), On.isSrcSubdir(a, l) ? i(new Error(`Cannot copy '${a}' to a subdirectory of itself, '${l}'.`)) : e.isDirectory() && On.isSrcSubdir(l, a) ? i(new Error(`Cannot overwrite '${l}' with '${a}'.`)) : _d(a, n, i)));
    else
      return Pe.symlink(a, n, i);
  });
}
function _d(e, t, n) {
  Pe.unlink(t, (r) => r ? n(r) : Pe.symlink(e, t, n));
}
var Sd = cd;
const _e = Oe, In = z, Ad = ze.mkdirsSync, Td = vl.utimesMillisSync, Rn = sn;
function Cd(e, t, n) {
  typeof n == "function" && (n = { filter: n }), n = n || {}, n.clobber = "clobber" in n ? !!n.clobber : !0, n.overwrite = "overwrite" in n ? !!n.overwrite : n.clobber, n.preserveTimestamps && process.arch === "ia32" && process.emitWarning(
    `Using the preserveTimestamps option in 32-bit node is not recommended;

	see https://github.com/jprichardson/node-fs-extra/issues/269`,
    "Warning",
    "fs-extra-WARN0002"
  );
  const { srcStat: r, destStat: i } = Rn.checkPathsSync(e, t, "copy", n);
  return Rn.checkParentPathsSync(e, r, t, "copy"), bd(i, e, t, n);
}
function bd(e, t, n, r) {
  if (r.filter && !r.filter(t, n)) return;
  const i = In.dirname(n);
  return _e.existsSync(i) || Ad(i), bl(e, t, n, r);
}
function $d(e, t, n, r) {
  if (!(r.filter && !r.filter(t, n)))
    return bl(e, t, n, r);
}
function bl(e, t, n, r) {
  const o = (r.dereference ? _e.statSync : _e.lstatSync)(t);
  if (o.isDirectory()) return Fd(o, e, t, n, r);
  if (o.isFile() || o.isCharacterDevice() || o.isBlockDevice()) return Od(o, e, t, n, r);
  if (o.isSymbolicLink()) return Ud(e, t, n, r);
  throw o.isSocket() ? new Error(`Cannot copy a socket file: ${t}`) : o.isFIFO() ? new Error(`Cannot copy a FIFO pipe: ${t}`) : new Error(`Unknown file: ${t}`);
}
function Od(e, t, n, r, i) {
  return t ? Id(e, n, r, i) : $l(e, n, r, i);
}
function Id(e, t, n, r) {
  if (r.overwrite)
    return _e.unlinkSync(n), $l(e, t, n, r);
  if (r.errorOnExist)
    throw new Error(`'${n}' already exists`);
}
function $l(e, t, n, r) {
  return _e.copyFileSync(t, n), r.preserveTimestamps && Rd(e.mode, t, n), wo(n, e.mode);
}
function Rd(e, t, n) {
  return Pd(e) && Dd(n, e), Nd(t, n);
}
function Pd(e) {
  return (e & 128) === 0;
}
function Dd(e, t) {
  return wo(e, t | 128);
}
function wo(e, t) {
  return _e.chmodSync(e, t);
}
function Nd(e, t) {
  const n = _e.statSync(e);
  return Td(t, n.atime, n.mtime);
}
function Fd(e, t, n, r, i) {
  return t ? Ol(n, r, i) : xd(e.mode, n, r, i);
}
function xd(e, t, n, r) {
  return _e.mkdirSync(n), Ol(t, n, r), wo(n, e);
}
function Ol(e, t, n) {
  _e.readdirSync(e).forEach((r) => Ld(r, e, t, n));
}
function Ld(e, t, n, r) {
  const i = In.join(t, e), o = In.join(n, e), { destStat: a } = Rn.checkPathsSync(i, o, "copy", r);
  return $d(a, i, o, r);
}
function Ud(e, t, n, r) {
  let i = _e.readlinkSync(t);
  if (r.dereference && (i = In.resolve(process.cwd(), i)), e) {
    let o;
    try {
      o = _e.readlinkSync(n);
    } catch (a) {
      if (a.code === "EINVAL" || a.code === "UNKNOWN") return _e.symlinkSync(i, n);
      throw a;
    }
    if (r.dereference && (o = In.resolve(process.cwd(), o)), Rn.isSrcSubdir(i, o))
      throw new Error(`Cannot copy '${i}' to a subdirectory of itself, '${o}'.`);
    if (_e.statSync(n).isDirectory() && Rn.isSrcSubdir(o, i))
      throw new Error(`Cannot overwrite '${o}' with '${i}'.`);
    return kd(i, n);
  } else
    return _e.symlinkSync(i, n);
}
function kd(e, t) {
  return _e.unlinkSync(t), _e.symlinkSync(e, t);
}
var Md = Cd;
const Bd = $e.fromCallback;
var _o = {
  copy: Bd(Sd),
  copySync: Md
};
const ga = Oe, Il = z, Q = ll, Pn = process.platform === "win32";
function Rl(e) {
  [
    "unlink",
    "chmod",
    "stat",
    "lstat",
    "rmdir",
    "readdir"
  ].forEach((n) => {
    e[n] = e[n] || ga[n], n = n + "Sync", e[n] = e[n] || ga[n];
  }), e.maxBusyTries = e.maxBusyTries || 3;
}
function So(e, t, n) {
  let r = 0;
  typeof t == "function" && (n = t, t = {}), Q(e, "rimraf: missing path"), Q.strictEqual(typeof e, "string", "rimraf: path should be a string"), Q.strictEqual(typeof n, "function", "rimraf: callback function required"), Q(t, "rimraf: invalid options argument provided"), Q.strictEqual(typeof t, "object", "rimraf: options should be object"), Rl(t), Ea(e, t, function i(o) {
    if (o) {
      if ((o.code === "EBUSY" || o.code === "ENOTEMPTY" || o.code === "EPERM") && r < t.maxBusyTries) {
        r++;
        const a = r * 100;
        return setTimeout(() => Ea(e, t, i), a);
      }
      o.code === "ENOENT" && (o = null);
    }
    n(o);
  });
}
function Ea(e, t, n) {
  Q(e), Q(t), Q(typeof n == "function"), t.lstat(e, (r, i) => {
    if (r && r.code === "ENOENT")
      return n(null);
    if (r && r.code === "EPERM" && Pn)
      return ya(e, t, r, n);
    if (i && i.isDirectory())
      return $r(e, t, r, n);
    t.unlink(e, (o) => {
      if (o) {
        if (o.code === "ENOENT")
          return n(null);
        if (o.code === "EPERM")
          return Pn ? ya(e, t, o, n) : $r(e, t, o, n);
        if (o.code === "EISDIR")
          return $r(e, t, o, n);
      }
      return n(o);
    });
  });
}
function ya(e, t, n, r) {
  Q(e), Q(t), Q(typeof r == "function"), t.chmod(e, 438, (i) => {
    i ? r(i.code === "ENOENT" ? null : n) : t.stat(e, (o, a) => {
      o ? r(o.code === "ENOENT" ? null : n) : a.isDirectory() ? $r(e, t, n, r) : t.unlink(e, r);
    });
  });
}
function va(e, t, n) {
  let r;
  Q(e), Q(t);
  try {
    t.chmodSync(e, 438);
  } catch (i) {
    if (i.code === "ENOENT")
      return;
    throw n;
  }
  try {
    r = t.statSync(e);
  } catch (i) {
    if (i.code === "ENOENT")
      return;
    throw n;
  }
  r.isDirectory() ? Or(e, t, n) : t.unlinkSync(e);
}
function $r(e, t, n, r) {
  Q(e), Q(t), Q(typeof r == "function"), t.rmdir(e, (i) => {
    i && (i.code === "ENOTEMPTY" || i.code === "EEXIST" || i.code === "EPERM") ? jd(e, t, r) : i && i.code === "ENOTDIR" ? r(n) : r(i);
  });
}
function jd(e, t, n) {
  Q(e), Q(t), Q(typeof n == "function"), t.readdir(e, (r, i) => {
    if (r) return n(r);
    let o = i.length, a;
    if (o === 0) return t.rmdir(e, n);
    i.forEach((s) => {
      So(Il.join(e, s), t, (l) => {
        if (!a) {
          if (l) return n(a = l);
          --o === 0 && t.rmdir(e, n);
        }
      });
    });
  });
}
function Pl(e, t) {
  let n;
  t = t || {}, Rl(t), Q(e, "rimraf: missing path"), Q.strictEqual(typeof e, "string", "rimraf: path should be a string"), Q(t, "rimraf: missing options"), Q.strictEqual(typeof t, "object", "rimraf: options should be object");
  try {
    n = t.lstatSync(e);
  } catch (r) {
    if (r.code === "ENOENT")
      return;
    r.code === "EPERM" && Pn && va(e, t, r);
  }
  try {
    n && n.isDirectory() ? Or(e, t, null) : t.unlinkSync(e);
  } catch (r) {
    if (r.code === "ENOENT")
      return;
    if (r.code === "EPERM")
      return Pn ? va(e, t, r) : Or(e, t, r);
    if (r.code !== "EISDIR")
      throw r;
    Or(e, t, r);
  }
}
function Or(e, t, n) {
  Q(e), Q(t);
  try {
    t.rmdirSync(e);
  } catch (r) {
    if (r.code === "ENOTDIR")
      throw n;
    if (r.code === "ENOTEMPTY" || r.code === "EEXIST" || r.code === "EPERM")
      Hd(e, t);
    else if (r.code !== "ENOENT")
      throw r;
  }
}
function Hd(e, t) {
  if (Q(e), Q(t), t.readdirSync(e).forEach((n) => Pl(Il.join(e, n), t)), Pn) {
    const n = Date.now();
    do
      try {
        return t.rmdirSync(e, t);
      } catch {
      }
    while (Date.now() - n < 500);
  } else
    return t.rmdirSync(e, t);
}
var qd = So;
So.sync = Pl;
const Nr = Oe, Gd = $e.fromCallback, Dl = qd;
function Vd(e, t) {
  if (Nr.rm) return Nr.rm(e, { recursive: !0, force: !0 }, t);
  Dl(e, t);
}
function Wd(e) {
  if (Nr.rmSync) return Nr.rmSync(e, { recursive: !0, force: !0 });
  Dl.sync(e);
}
var Yr = {
  remove: Gd(Vd),
  removeSync: Wd
};
const Yd = $e.fromPromise, Nl = Ft, Fl = z, xl = ze, Ll = Yr, wa = Yd(async function(t) {
  let n;
  try {
    n = await Nl.readdir(t);
  } catch {
    return xl.mkdirs(t);
  }
  return Promise.all(n.map((r) => Ll.remove(Fl.join(t, r))));
});
function _a(e) {
  let t;
  try {
    t = Nl.readdirSync(e);
  } catch {
    return xl.mkdirsSync(e);
  }
  t.forEach((n) => {
    n = Fl.join(e, n), Ll.removeSync(n);
  });
}
var zd = {
  emptyDirSync: _a,
  emptydirSync: _a,
  emptyDir: wa,
  emptydir: wa
};
const Xd = $e.fromCallback, Ul = z, lt = Oe, kl = ze;
function Kd(e, t) {
  function n() {
    lt.writeFile(e, "", (r) => {
      if (r) return t(r);
      t();
    });
  }
  lt.stat(e, (r, i) => {
    if (!r && i.isFile()) return t();
    const o = Ul.dirname(e);
    lt.stat(o, (a, s) => {
      if (a)
        return a.code === "ENOENT" ? kl.mkdirs(o, (l) => {
          if (l) return t(l);
          n();
        }) : t(a);
      s.isDirectory() ? n() : lt.readdir(o, (l) => {
        if (l) return t(l);
      });
    });
  });
}
function Jd(e) {
  let t;
  try {
    t = lt.statSync(e);
  } catch {
  }
  if (t && t.isFile()) return;
  const n = Ul.dirname(e);
  try {
    lt.statSync(n).isDirectory() || lt.readdirSync(n);
  } catch (r) {
    if (r && r.code === "ENOENT") kl.mkdirsSync(n);
    else throw r;
  }
  lt.writeFileSync(e, "");
}
var Qd = {
  createFile: Xd(Kd),
  createFileSync: Jd
};
const Zd = $e.fromCallback, Ml = z, st = Oe, Bl = ze, eh = xt.pathExists, { areIdentical: jl } = sn;
function th(e, t, n) {
  function r(i, o) {
    st.link(i, o, (a) => {
      if (a) return n(a);
      n(null);
    });
  }
  st.lstat(t, (i, o) => {
    st.lstat(e, (a, s) => {
      if (a)
        return a.message = a.message.replace("lstat", "ensureLink"), n(a);
      if (o && jl(s, o)) return n(null);
      const l = Ml.dirname(t);
      eh(l, (m, c) => {
        if (m) return n(m);
        if (c) return r(e, t);
        Bl.mkdirs(l, (f) => {
          if (f) return n(f);
          r(e, t);
        });
      });
    });
  });
}
function nh(e, t) {
  let n;
  try {
    n = st.lstatSync(t);
  } catch {
  }
  try {
    const o = st.lstatSync(e);
    if (n && jl(o, n)) return;
  } catch (o) {
    throw o.message = o.message.replace("lstat", "ensureLink"), o;
  }
  const r = Ml.dirname(t);
  return st.existsSync(r) || Bl.mkdirsSync(r), st.linkSync(e, t);
}
var rh = {
  createLink: Zd(th),
  createLinkSync: nh
};
const ct = z, An = Oe, ih = xt.pathExists;
function oh(e, t, n) {
  if (ct.isAbsolute(e))
    return An.lstat(e, (r) => r ? (r.message = r.message.replace("lstat", "ensureSymlink"), n(r)) : n(null, {
      toCwd: e,
      toDst: e
    }));
  {
    const r = ct.dirname(t), i = ct.join(r, e);
    return ih(i, (o, a) => o ? n(o) : a ? n(null, {
      toCwd: i,
      toDst: e
    }) : An.lstat(e, (s) => s ? (s.message = s.message.replace("lstat", "ensureSymlink"), n(s)) : n(null, {
      toCwd: e,
      toDst: ct.relative(r, e)
    })));
  }
}
function ah(e, t) {
  let n;
  if (ct.isAbsolute(e)) {
    if (n = An.existsSync(e), !n) throw new Error("absolute srcpath does not exist");
    return {
      toCwd: e,
      toDst: e
    };
  } else {
    const r = ct.dirname(t), i = ct.join(r, e);
    if (n = An.existsSync(i), n)
      return {
        toCwd: i,
        toDst: e
      };
    if (n = An.existsSync(e), !n) throw new Error("relative srcpath does not exist");
    return {
      toCwd: e,
      toDst: ct.relative(r, e)
    };
  }
}
var sh = {
  symlinkPaths: oh,
  symlinkPathsSync: ah
};
const Hl = Oe;
function lh(e, t, n) {
  if (n = typeof t == "function" ? t : n, t = typeof t == "function" ? !1 : t, t) return n(null, t);
  Hl.lstat(e, (r, i) => {
    if (r) return n(null, "file");
    t = i && i.isDirectory() ? "dir" : "file", n(null, t);
  });
}
function ch(e, t) {
  let n;
  if (t) return t;
  try {
    n = Hl.lstatSync(e);
  } catch {
    return "file";
  }
  return n && n.isDirectory() ? "dir" : "file";
}
var uh = {
  symlinkType: lh,
  symlinkTypeSync: ch
};
const fh = $e.fromCallback, ql = z, Be = Ft, Gl = ze, dh = Gl.mkdirs, hh = Gl.mkdirsSync, Vl = sh, ph = Vl.symlinkPaths, mh = Vl.symlinkPathsSync, Wl = uh, gh = Wl.symlinkType, Eh = Wl.symlinkTypeSync, yh = xt.pathExists, { areIdentical: Yl } = sn;
function vh(e, t, n, r) {
  r = typeof n == "function" ? n : r, n = typeof n == "function" ? !1 : n, Be.lstat(t, (i, o) => {
    !i && o.isSymbolicLink() ? Promise.all([
      Be.stat(e),
      Be.stat(t)
    ]).then(([a, s]) => {
      if (Yl(a, s)) return r(null);
      Sa(e, t, n, r);
    }) : Sa(e, t, n, r);
  });
}
function Sa(e, t, n, r) {
  ph(e, t, (i, o) => {
    if (i) return r(i);
    e = o.toDst, gh(o.toCwd, n, (a, s) => {
      if (a) return r(a);
      const l = ql.dirname(t);
      yh(l, (m, c) => {
        if (m) return r(m);
        if (c) return Be.symlink(e, t, s, r);
        dh(l, (f) => {
          if (f) return r(f);
          Be.symlink(e, t, s, r);
        });
      });
    });
  });
}
function wh(e, t, n) {
  let r;
  try {
    r = Be.lstatSync(t);
  } catch {
  }
  if (r && r.isSymbolicLink()) {
    const s = Be.statSync(e), l = Be.statSync(t);
    if (Yl(s, l)) return;
  }
  const i = mh(e, t);
  e = i.toDst, n = Eh(i.toCwd, n);
  const o = ql.dirname(t);
  return Be.existsSync(o) || hh(o), Be.symlinkSync(e, t, n);
}
var _h = {
  createSymlink: fh(vh),
  createSymlinkSync: wh
};
const { createFile: Aa, createFileSync: Ta } = Qd, { createLink: Ca, createLinkSync: ba } = rh, { createSymlink: $a, createSymlinkSync: Oa } = _h;
var Sh = {
  // file
  createFile: Aa,
  createFileSync: Ta,
  ensureFile: Aa,
  ensureFileSync: Ta,
  // link
  createLink: Ca,
  createLinkSync: ba,
  ensureLink: Ca,
  ensureLinkSync: ba,
  // symlink
  createSymlink: $a,
  createSymlinkSync: Oa,
  ensureSymlink: $a,
  ensureSymlinkSync: Oa
};
function Ah(e, { EOL: t = `
`, finalEOL: n = !0, replacer: r = null, spaces: i } = {}) {
  const o = n ? t : "";
  return JSON.stringify(e, r, i).replace(/\n/g, t) + o;
}
function Th(e) {
  return Buffer.isBuffer(e) && (e = e.toString("utf8")), e.replace(/^\uFEFF/, "");
}
var Ao = { stringify: Ah, stripBom: Th };
let tn;
try {
  tn = Oe;
} catch {
  tn = te;
}
const zr = $e, { stringify: zl, stripBom: Xl } = Ao;
async function Ch(e, t = {}) {
  typeof t == "string" && (t = { encoding: t });
  const n = t.fs || tn, r = "throws" in t ? t.throws : !0;
  let i = await zr.fromCallback(n.readFile)(e, t);
  i = Xl(i);
  let o;
  try {
    o = JSON.parse(i, t ? t.reviver : null);
  } catch (a) {
    if (r)
      throw a.message = `${e}: ${a.message}`, a;
    return null;
  }
  return o;
}
const bh = zr.fromPromise(Ch);
function $h(e, t = {}) {
  typeof t == "string" && (t = { encoding: t });
  const n = t.fs || tn, r = "throws" in t ? t.throws : !0;
  try {
    let i = n.readFileSync(e, t);
    return i = Xl(i), JSON.parse(i, t.reviver);
  } catch (i) {
    if (r)
      throw i.message = `${e}: ${i.message}`, i;
    return null;
  }
}
async function Oh(e, t, n = {}) {
  const r = n.fs || tn, i = zl(t, n);
  await zr.fromCallback(r.writeFile)(e, i, n);
}
const Ih = zr.fromPromise(Oh);
function Rh(e, t, n = {}) {
  const r = n.fs || tn, i = zl(t, n);
  return r.writeFileSync(e, i, n);
}
var Ph = {
  readFile: bh,
  readFileSync: $h,
  writeFile: Ih,
  writeFileSync: Rh
};
const dr = Ph;
var Dh = {
  // jsonfile exports
  readJson: dr.readFile,
  readJsonSync: dr.readFileSync,
  writeJson: dr.writeFile,
  writeJsonSync: dr.writeFileSync
};
const Nh = $e.fromCallback, Tn = Oe, Kl = z, Jl = ze, Fh = xt.pathExists;
function xh(e, t, n, r) {
  typeof n == "function" && (r = n, n = "utf8");
  const i = Kl.dirname(e);
  Fh(i, (o, a) => {
    if (o) return r(o);
    if (a) return Tn.writeFile(e, t, n, r);
    Jl.mkdirs(i, (s) => {
      if (s) return r(s);
      Tn.writeFile(e, t, n, r);
    });
  });
}
function Lh(e, ...t) {
  const n = Kl.dirname(e);
  if (Tn.existsSync(n))
    return Tn.writeFileSync(e, ...t);
  Jl.mkdirsSync(n), Tn.writeFileSync(e, ...t);
}
var To = {
  outputFile: Nh(xh),
  outputFileSync: Lh
};
const { stringify: Uh } = Ao, { outputFile: kh } = To;
async function Mh(e, t, n = {}) {
  const r = Uh(t, n);
  await kh(e, r, n);
}
var Bh = Mh;
const { stringify: jh } = Ao, { outputFileSync: Hh } = To;
function qh(e, t, n) {
  const r = jh(t, n);
  Hh(e, r, n);
}
var Gh = qh;
const Vh = $e.fromPromise, be = Dh;
be.outputJson = Vh(Bh);
be.outputJsonSync = Gh;
be.outputJSON = be.outputJson;
be.outputJSONSync = be.outputJsonSync;
be.writeJSON = be.writeJson;
be.writeJSONSync = be.writeJsonSync;
be.readJSON = be.readJson;
be.readJSONSync = be.readJsonSync;
var Wh = be;
const Yh = Oe, Ji = z, zh = _o.copy, Ql = Yr.remove, Xh = ze.mkdirp, Kh = xt.pathExists, Ia = sn;
function Jh(e, t, n, r) {
  typeof n == "function" && (r = n, n = {}), n = n || {};
  const i = n.overwrite || n.clobber || !1;
  Ia.checkPaths(e, t, "move", n, (o, a) => {
    if (o) return r(o);
    const { srcStat: s, isChangingCase: l = !1 } = a;
    Ia.checkParentPaths(e, s, t, "move", (m) => {
      if (m) return r(m);
      if (Qh(t)) return Ra(e, t, i, l, r);
      Xh(Ji.dirname(t), (c) => c ? r(c) : Ra(e, t, i, l, r));
    });
  });
}
function Qh(e) {
  const t = Ji.dirname(e);
  return Ji.parse(t).root === t;
}
function Ra(e, t, n, r, i) {
  if (r) return Ai(e, t, n, i);
  if (n)
    return Ql(t, (o) => o ? i(o) : Ai(e, t, n, i));
  Kh(t, (o, a) => o ? i(o) : a ? i(new Error("dest already exists.")) : Ai(e, t, n, i));
}
function Ai(e, t, n, r) {
  Yh.rename(e, t, (i) => i ? i.code !== "EXDEV" ? r(i) : Zh(e, t, n, r) : r());
}
function Zh(e, t, n, r) {
  zh(e, t, {
    overwrite: n,
    errorOnExist: !0
  }, (o) => o ? r(o) : Ql(e, r));
}
var ep = Jh;
const Zl = Oe, Qi = z, tp = _o.copySync, ec = Yr.removeSync, np = ze.mkdirpSync, Pa = sn;
function rp(e, t, n) {
  n = n || {};
  const r = n.overwrite || n.clobber || !1, { srcStat: i, isChangingCase: o = !1 } = Pa.checkPathsSync(e, t, "move", n);
  return Pa.checkParentPathsSync(e, i, t, "move"), ip(t) || np(Qi.dirname(t)), op(e, t, r, o);
}
function ip(e) {
  const t = Qi.dirname(e);
  return Qi.parse(t).root === t;
}
function op(e, t, n, r) {
  if (r) return Ti(e, t, n);
  if (n)
    return ec(t), Ti(e, t, n);
  if (Zl.existsSync(t)) throw new Error("dest already exists.");
  return Ti(e, t, n);
}
function Ti(e, t, n) {
  try {
    Zl.renameSync(e, t);
  } catch (r) {
    if (r.code !== "EXDEV") throw r;
    return ap(e, t, n);
  }
}
function ap(e, t, n) {
  return tp(e, t, {
    overwrite: n,
    errorOnExist: !0
  }), ec(e);
}
var sp = rp;
const lp = $e.fromCallback;
var cp = {
  move: lp(ep),
  moveSync: sp
}, Et = {
  // Export promiseified graceful-fs:
  ...Ft,
  // Export extra methods:
  ..._o,
  ...zd,
  ...Sh,
  ...Wh,
  ...ze,
  ...cp,
  ...To,
  ...xt,
  ...Yr
}, Ze = {}, dt = {}, pe = {}, ht = {};
Object.defineProperty(ht, "__esModule", { value: !0 });
ht.CancellationError = ht.CancellationToken = void 0;
const up = cl;
class fp extends up.EventEmitter {
  get cancelled() {
    return this._cancelled || this._parent != null && this._parent.cancelled;
  }
  set parent(t) {
    this.removeParentCancelHandler(), this._parent = t, this.parentCancelHandler = () => this.cancel(), this._parent.onCancel(this.parentCancelHandler);
  }
  // babel cannot compile ... correctly for super calls
  constructor(t) {
    super(), this.parentCancelHandler = null, this._parent = null, this._cancelled = !1, t != null && (this.parent = t);
  }
  cancel() {
    this._cancelled = !0, this.emit("cancel");
  }
  onCancel(t) {
    this.cancelled ? t() : this.once("cancel", t);
  }
  createPromise(t) {
    if (this.cancelled)
      return Promise.reject(new Zi());
    const n = () => {
      if (r != null)
        try {
          this.removeListener("cancel", r), r = null;
        } catch {
        }
    };
    let r = null;
    return new Promise((i, o) => {
      let a = null;
      if (r = () => {
        try {
          a != null && (a(), a = null);
        } finally {
          o(new Zi());
        }
      }, this.cancelled) {
        r();
        return;
      }
      this.onCancel(r), t(i, o, (s) => {
        a = s;
      });
    }).then((i) => (n(), i)).catch((i) => {
      throw n(), i;
    });
  }
  removeParentCancelHandler() {
    const t = this._parent;
    t != null && this.parentCancelHandler != null && (t.removeListener("cancel", this.parentCancelHandler), this.parentCancelHandler = null);
  }
  dispose() {
    try {
      this.removeParentCancelHandler();
    } finally {
      this.removeAllListeners(), this._parent = null;
    }
  }
}
ht.CancellationToken = fp;
class Zi extends Error {
  constructor() {
    super("cancelled");
  }
}
ht.CancellationError = Zi;
var ln = {};
Object.defineProperty(ln, "__esModule", { value: !0 });
ln.newError = dp;
function dp(e, t) {
  const n = new Error(e);
  return n.code = t, n;
}
var Ce = {}, eo = { exports: {} }, hr = { exports: {} }, Ci, Da;
function hp() {
  if (Da) return Ci;
  Da = 1;
  var e = 1e3, t = e * 60, n = t * 60, r = n * 24, i = r * 7, o = r * 365.25;
  Ci = function(c, f) {
    f = f || {};
    var d = typeof c;
    if (d === "string" && c.length > 0)
      return a(c);
    if (d === "number" && isFinite(c))
      return f.long ? l(c) : s(c);
    throw new Error(
      "val is not a non-empty string or a valid number. val=" + JSON.stringify(c)
    );
  };
  function a(c) {
    if (c = String(c), !(c.length > 100)) {
      var f = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
        c
      );
      if (f) {
        var d = parseFloat(f[1]), g = (f[2] || "ms").toLowerCase();
        switch (g) {
          case "years":
          case "year":
          case "yrs":
          case "yr":
          case "y":
            return d * o;
          case "weeks":
          case "week":
          case "w":
            return d * i;
          case "days":
          case "day":
          case "d":
            return d * r;
          case "hours":
          case "hour":
          case "hrs":
          case "hr":
          case "h":
            return d * n;
          case "minutes":
          case "minute":
          case "mins":
          case "min":
          case "m":
            return d * t;
          case "seconds":
          case "second":
          case "secs":
          case "sec":
          case "s":
            return d * e;
          case "milliseconds":
          case "millisecond":
          case "msecs":
          case "msec":
          case "ms":
            return d;
          default:
            return;
        }
      }
    }
  }
  function s(c) {
    var f = Math.abs(c);
    return f >= r ? Math.round(c / r) + "d" : f >= n ? Math.round(c / n) + "h" : f >= t ? Math.round(c / t) + "m" : f >= e ? Math.round(c / e) + "s" : c + "ms";
  }
  function l(c) {
    var f = Math.abs(c);
    return f >= r ? m(c, f, r, "day") : f >= n ? m(c, f, n, "hour") : f >= t ? m(c, f, t, "minute") : f >= e ? m(c, f, e, "second") : c + " ms";
  }
  function m(c, f, d, g) {
    var w = f >= d * 1.5;
    return Math.round(c / d) + " " + g + (w ? "s" : "");
  }
  return Ci;
}
var bi, Na;
function tc() {
  if (Na) return bi;
  Na = 1;
  function e(t) {
    r.debug = r, r.default = r, r.coerce = m, r.disable = s, r.enable = o, r.enabled = l, r.humanize = hp(), r.destroy = c, Object.keys(t).forEach((f) => {
      r[f] = t[f];
    }), r.names = [], r.skips = [], r.formatters = {};
    function n(f) {
      let d = 0;
      for (let g = 0; g < f.length; g++)
        d = (d << 5) - d + f.charCodeAt(g), d |= 0;
      return r.colors[Math.abs(d) % r.colors.length];
    }
    r.selectColor = n;
    function r(f) {
      let d, g = null, w, y;
      function S(...T) {
        if (!S.enabled)
          return;
        const A = S, P = Number(/* @__PURE__ */ new Date()), x = P - (d || P);
        A.diff = x, A.prev = d, A.curr = P, d = P, T[0] = r.coerce(T[0]), typeof T[0] != "string" && T.unshift("%O");
        let X = 0;
        T[0] = T[0].replace(/%([a-zA-Z%])/g, (V, le) => {
          if (V === "%%")
            return "%";
          X++;
          const E = r.formatters[le];
          if (typeof E == "function") {
            const q = T[X];
            V = E.call(A, q), T.splice(X, 1), X--;
          }
          return V;
        }), r.formatArgs.call(A, T), (A.log || r.log).apply(A, T);
      }
      return S.namespace = f, S.useColors = r.useColors(), S.color = r.selectColor(f), S.extend = i, S.destroy = r.destroy, Object.defineProperty(S, "enabled", {
        enumerable: !0,
        configurable: !1,
        get: () => g !== null ? g : (w !== r.namespaces && (w = r.namespaces, y = r.enabled(f)), y),
        set: (T) => {
          g = T;
        }
      }), typeof r.init == "function" && r.init(S), S;
    }
    function i(f, d) {
      const g = r(this.namespace + (typeof d > "u" ? ":" : d) + f);
      return g.log = this.log, g;
    }
    function o(f) {
      r.save(f), r.namespaces = f, r.names = [], r.skips = [];
      const d = (typeof f == "string" ? f : "").trim().replace(/\s+/g, ",").split(",").filter(Boolean);
      for (const g of d)
        g[0] === "-" ? r.skips.push(g.slice(1)) : r.names.push(g);
    }
    function a(f, d) {
      let g = 0, w = 0, y = -1, S = 0;
      for (; g < f.length; )
        if (w < d.length && (d[w] === f[g] || d[w] === "*"))
          d[w] === "*" ? (y = w, S = g, w++) : (g++, w++);
        else if (y !== -1)
          w = y + 1, S++, g = S;
        else
          return !1;
      for (; w < d.length && d[w] === "*"; )
        w++;
      return w === d.length;
    }
    function s() {
      const f = [
        ...r.names,
        ...r.skips.map((d) => "-" + d)
      ].join(",");
      return r.enable(""), f;
    }
    function l(f) {
      for (const d of r.skips)
        if (a(f, d))
          return !1;
      for (const d of r.names)
        if (a(f, d))
          return !0;
      return !1;
    }
    function m(f) {
      return f instanceof Error ? f.stack || f.message : f;
    }
    function c() {
      console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
    }
    return r.enable(r.load()), r;
  }
  return bi = e, bi;
}
var Fa;
function pp() {
  return Fa || (Fa = 1, function(e, t) {
    t.formatArgs = r, t.save = i, t.load = o, t.useColors = n, t.storage = a(), t.destroy = /* @__PURE__ */ (() => {
      let l = !1;
      return () => {
        l || (l = !0, console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."));
      };
    })(), t.colors = [
      "#0000CC",
      "#0000FF",
      "#0033CC",
      "#0033FF",
      "#0066CC",
      "#0066FF",
      "#0099CC",
      "#0099FF",
      "#00CC00",
      "#00CC33",
      "#00CC66",
      "#00CC99",
      "#00CCCC",
      "#00CCFF",
      "#3300CC",
      "#3300FF",
      "#3333CC",
      "#3333FF",
      "#3366CC",
      "#3366FF",
      "#3399CC",
      "#3399FF",
      "#33CC00",
      "#33CC33",
      "#33CC66",
      "#33CC99",
      "#33CCCC",
      "#33CCFF",
      "#6600CC",
      "#6600FF",
      "#6633CC",
      "#6633FF",
      "#66CC00",
      "#66CC33",
      "#9900CC",
      "#9900FF",
      "#9933CC",
      "#9933FF",
      "#99CC00",
      "#99CC33",
      "#CC0000",
      "#CC0033",
      "#CC0066",
      "#CC0099",
      "#CC00CC",
      "#CC00FF",
      "#CC3300",
      "#CC3333",
      "#CC3366",
      "#CC3399",
      "#CC33CC",
      "#CC33FF",
      "#CC6600",
      "#CC6633",
      "#CC9900",
      "#CC9933",
      "#CCCC00",
      "#CCCC33",
      "#FF0000",
      "#FF0033",
      "#FF0066",
      "#FF0099",
      "#FF00CC",
      "#FF00FF",
      "#FF3300",
      "#FF3333",
      "#FF3366",
      "#FF3399",
      "#FF33CC",
      "#FF33FF",
      "#FF6600",
      "#FF6633",
      "#FF9900",
      "#FF9933",
      "#FFCC00",
      "#FFCC33"
    ];
    function n() {
      if (typeof window < "u" && window.process && (window.process.type === "renderer" || window.process.__nwjs))
        return !0;
      if (typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))
        return !1;
      let l;
      return typeof document < "u" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
      typeof window < "u" && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
      // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
      typeof navigator < "u" && navigator.userAgent && (l = navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)) && parseInt(l[1], 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
      typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
    }
    function r(l) {
      if (l[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + l[0] + (this.useColors ? "%c " : " ") + "+" + e.exports.humanize(this.diff), !this.useColors)
        return;
      const m = "color: " + this.color;
      l.splice(1, 0, m, "color: inherit");
      let c = 0, f = 0;
      l[0].replace(/%[a-zA-Z%]/g, (d) => {
        d !== "%%" && (c++, d === "%c" && (f = c));
      }), l.splice(f, 0, m);
    }
    t.log = console.debug || console.log || (() => {
    });
    function i(l) {
      try {
        l ? t.storage.setItem("debug", l) : t.storage.removeItem("debug");
      } catch {
      }
    }
    function o() {
      let l;
      try {
        l = t.storage.getItem("debug") || t.storage.getItem("DEBUG");
      } catch {
      }
      return !l && typeof process < "u" && "env" in process && (l = process.env.DEBUG), l;
    }
    function a() {
      try {
        return localStorage;
      } catch {
      }
    }
    e.exports = tc()(t);
    const { formatters: s } = e.exports;
    s.j = function(l) {
      try {
        return JSON.stringify(l);
      } catch (m) {
        return "[UnexpectedJSONParseError]: " + m.message;
      }
    };
  }(hr, hr.exports)), hr.exports;
}
var pr = { exports: {} }, $i, xa;
function mp() {
  return xa || (xa = 1, $i = (e, t = process.argv) => {
    const n = e.startsWith("-") ? "" : e.length === 1 ? "-" : "--", r = t.indexOf(n + e), i = t.indexOf("--");
    return r !== -1 && (i === -1 || r < i);
  }), $i;
}
var Oi, La;
function gp() {
  if (La) return Oi;
  La = 1;
  const e = Gr, t = ul, n = mp(), { env: r } = process;
  let i;
  n("no-color") || n("no-colors") || n("color=false") || n("color=never") ? i = 0 : (n("color") || n("colors") || n("color=true") || n("color=always")) && (i = 1), "FORCE_COLOR" in r && (r.FORCE_COLOR === "true" ? i = 1 : r.FORCE_COLOR === "false" ? i = 0 : i = r.FORCE_COLOR.length === 0 ? 1 : Math.min(parseInt(r.FORCE_COLOR, 10), 3));
  function o(l) {
    return l === 0 ? !1 : {
      level: l,
      hasBasic: !0,
      has256: l >= 2,
      has16m: l >= 3
    };
  }
  function a(l, m) {
    if (i === 0)
      return 0;
    if (n("color=16m") || n("color=full") || n("color=truecolor"))
      return 3;
    if (n("color=256"))
      return 2;
    if (l && !m && i === void 0)
      return 0;
    const c = i || 0;
    if (r.TERM === "dumb")
      return c;
    if (process.platform === "win32") {
      const f = e.release().split(".");
      return Number(f[0]) >= 10 && Number(f[2]) >= 10586 ? Number(f[2]) >= 14931 ? 3 : 2 : 1;
    }
    if ("CI" in r)
      return ["TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI", "GITHUB_ACTIONS", "BUILDKITE"].some((f) => f in r) || r.CI_NAME === "codeship" ? 1 : c;
    if ("TEAMCITY_VERSION" in r)
      return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(r.TEAMCITY_VERSION) ? 1 : 0;
    if (r.COLORTERM === "truecolor")
      return 3;
    if ("TERM_PROGRAM" in r) {
      const f = parseInt((r.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
      switch (r.TERM_PROGRAM) {
        case "iTerm.app":
          return f >= 3 ? 3 : 2;
        case "Apple_Terminal":
          return 2;
      }
    }
    return /-256(color)?$/i.test(r.TERM) ? 2 : /^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(r.TERM) || "COLORTERM" in r ? 1 : c;
  }
  function s(l) {
    const m = a(l, l && l.isTTY);
    return o(m);
  }
  return Oi = {
    supportsColor: s,
    stdout: o(a(!0, t.isatty(1))),
    stderr: o(a(!0, t.isatty(2)))
  }, Oi;
}
var Ua;
function Ep() {
  return Ua || (Ua = 1, function(e, t) {
    const n = ul, r = mo;
    t.init = c, t.log = s, t.formatArgs = o, t.save = l, t.load = m, t.useColors = i, t.destroy = r.deprecate(
      () => {
      },
      "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."
    ), t.colors = [6, 2, 3, 4, 5, 1];
    try {
      const d = gp();
      d && (d.stderr || d).level >= 2 && (t.colors = [
        20,
        21,
        26,
        27,
        32,
        33,
        38,
        39,
        40,
        41,
        42,
        43,
        44,
        45,
        56,
        57,
        62,
        63,
        68,
        69,
        74,
        75,
        76,
        77,
        78,
        79,
        80,
        81,
        92,
        93,
        98,
        99,
        112,
        113,
        128,
        129,
        134,
        135,
        148,
        149,
        160,
        161,
        162,
        163,
        164,
        165,
        166,
        167,
        168,
        169,
        170,
        171,
        172,
        173,
        178,
        179,
        184,
        185,
        196,
        197,
        198,
        199,
        200,
        201,
        202,
        203,
        204,
        205,
        206,
        207,
        208,
        209,
        214,
        215,
        220,
        221
      ]);
    } catch {
    }
    t.inspectOpts = Object.keys(process.env).filter((d) => /^debug_/i.test(d)).reduce((d, g) => {
      const w = g.substring(6).toLowerCase().replace(/_([a-z])/g, (S, T) => T.toUpperCase());
      let y = process.env[g];
      return /^(yes|on|true|enabled)$/i.test(y) ? y = !0 : /^(no|off|false|disabled)$/i.test(y) ? y = !1 : y === "null" ? y = null : y = Number(y), d[w] = y, d;
    }, {});
    function i() {
      return "colors" in t.inspectOpts ? !!t.inspectOpts.colors : n.isatty(process.stderr.fd);
    }
    function o(d) {
      const { namespace: g, useColors: w } = this;
      if (w) {
        const y = this.color, S = "\x1B[3" + (y < 8 ? y : "8;5;" + y), T = `  ${S};1m${g} \x1B[0m`;
        d[0] = T + d[0].split(`
`).join(`
` + T), d.push(S + "m+" + e.exports.humanize(this.diff) + "\x1B[0m");
      } else
        d[0] = a() + g + " " + d[0];
    }
    function a() {
      return t.inspectOpts.hideDate ? "" : (/* @__PURE__ */ new Date()).toISOString() + " ";
    }
    function s(...d) {
      return process.stderr.write(r.formatWithOptions(t.inspectOpts, ...d) + `
`);
    }
    function l(d) {
      d ? process.env.DEBUG = d : delete process.env.DEBUG;
    }
    function m() {
      return process.env.DEBUG;
    }
    function c(d) {
      d.inspectOpts = {};
      const g = Object.keys(t.inspectOpts);
      for (let w = 0; w < g.length; w++)
        d.inspectOpts[g[w]] = t.inspectOpts[g[w]];
    }
    e.exports = tc()(t);
    const { formatters: f } = e.exports;
    f.o = function(d) {
      return this.inspectOpts.colors = this.useColors, r.inspect(d, this.inspectOpts).split(`
`).map((g) => g.trim()).join(" ");
    }, f.O = function(d) {
      return this.inspectOpts.colors = this.useColors, r.inspect(d, this.inspectOpts);
    };
  }(pr, pr.exports)), pr.exports;
}
typeof process > "u" || process.type === "renderer" || process.browser === !0 || process.__nwjs ? eo.exports = pp() : eo.exports = Ep();
var yp = eo.exports, Vn = {};
Object.defineProperty(Vn, "__esModule", { value: !0 });
Vn.ProgressCallbackTransform = void 0;
const vp = Hn;
class wp extends vp.Transform {
  constructor(t, n, r) {
    super(), this.total = t, this.cancellationToken = n, this.onProgress = r, this.start = Date.now(), this.transferred = 0, this.delta = 0, this.nextUpdate = this.start + 1e3;
  }
  _transform(t, n, r) {
    if (this.cancellationToken.cancelled) {
      r(new Error("cancelled"), null);
      return;
    }
    this.transferred += t.length, this.delta += t.length;
    const i = Date.now();
    i >= this.nextUpdate && this.transferred !== this.total && (this.nextUpdate = i + 1e3, this.onProgress({
      total: this.total,
      delta: this.delta,
      transferred: this.transferred,
      percent: this.transferred / this.total * 100,
      bytesPerSecond: Math.round(this.transferred / ((i - this.start) / 1e3))
    }), this.delta = 0), r(null, t);
  }
  _flush(t) {
    if (this.cancellationToken.cancelled) {
      t(new Error("cancelled"));
      return;
    }
    this.onProgress({
      total: this.total,
      delta: this.delta,
      transferred: this.total,
      percent: 100,
      bytesPerSecond: Math.round(this.transferred / ((Date.now() - this.start) / 1e3))
    }), this.delta = 0, t(null);
  }
}
Vn.ProgressCallbackTransform = wp;
Object.defineProperty(Ce, "__esModule", { value: !0 });
Ce.DigestTransform = Ce.HttpExecutor = Ce.HttpError = void 0;
Ce.createHttpError = to;
Ce.parseJson = Op;
Ce.configureRequestOptionsFromUrl = rc;
Ce.configureRequestUrl = bo;
Ce.safeGetHeader = Zt;
Ce.configureRequestOptions = xr;
Ce.safeStringifyJson = Lr;
const _p = qn, Sp = yp, Ap = te, Tp = Hn, nc = an, Cp = ht, ka = ln, bp = Vn, gn = (0, Sp.default)("electron-builder");
function to(e, t = null) {
  return new Co(e.statusCode || -1, `${e.statusCode} ${e.statusMessage}` + (t == null ? "" : `
` + JSON.stringify(t, null, "  ")) + `
Headers: ` + Lr(e.headers), t);
}
const $p = /* @__PURE__ */ new Map([
  [429, "Too many requests"],
  [400, "Bad request"],
  [403, "Forbidden"],
  [404, "Not found"],
  [405, "Method not allowed"],
  [406, "Not acceptable"],
  [408, "Request timeout"],
  [413, "Request entity too large"],
  [500, "Internal server error"],
  [502, "Bad gateway"],
  [503, "Service unavailable"],
  [504, "Gateway timeout"],
  [505, "HTTP version not supported"]
]);
class Co extends Error {
  constructor(t, n = `HTTP error: ${$p.get(t) || t}`, r = null) {
    super(n), this.statusCode = t, this.description = r, this.name = "HttpError", this.code = `HTTP_ERROR_${t}`;
  }
  isServerError() {
    return this.statusCode >= 500 && this.statusCode <= 599;
  }
}
Ce.HttpError = Co;
function Op(e) {
  return e.then((t) => t == null || t.length === 0 ? null : JSON.parse(t));
}
class Fr {
  constructor() {
    this.maxRedirects = 10;
  }
  request(t, n = new Cp.CancellationToken(), r) {
    xr(t);
    const i = r == null ? void 0 : JSON.stringify(r), o = i ? Buffer.from(i) : void 0;
    if (o != null) {
      gn(i);
      const { headers: a, ...s } = t;
      t = {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": o.length,
          ...a
        },
        ...s
      };
    }
    return this.doApiRequest(t, n, (a) => a.end(o));
  }
  doApiRequest(t, n, r, i = 0) {
    return gn.enabled && gn(`Request: ${Lr(t)}`), n.createPromise((o, a, s) => {
      const l = this.createRequest(t, (m) => {
        try {
          this.handleResponse(m, t, n, o, a, i, r);
        } catch (c) {
          a(c);
        }
      });
      this.addErrorAndTimeoutHandlers(l, a, t.timeout), this.addRedirectHandlers(l, t, a, i, (m) => {
        this.doApiRequest(m, n, r, i).then(o).catch(a);
      }), r(l, a), s(() => l.abort());
    });
  }
  // noinspection JSUnusedLocalSymbols
  // eslint-disable-next-line
  addRedirectHandlers(t, n, r, i, o) {
  }
  addErrorAndTimeoutHandlers(t, n, r = 60 * 1e3) {
    this.addTimeOutHandler(t, n, r), t.on("error", n), t.on("aborted", () => {
      n(new Error("Request has been aborted by the server"));
    });
  }
  handleResponse(t, n, r, i, o, a, s) {
    var l;
    if (gn.enabled && gn(`Response: ${t.statusCode} ${t.statusMessage}, request options: ${Lr(n)}`), t.statusCode === 404) {
      o(to(t, `method: ${n.method || "GET"} url: ${n.protocol || "https:"}//${n.hostname}${n.port ? `:${n.port}` : ""}${n.path}

Please double check that your authentication token is correct. Due to security reasons, actual status maybe not reported, but 404.
`));
      return;
    } else if (t.statusCode === 204) {
      i();
      return;
    }
    const m = (l = t.statusCode) !== null && l !== void 0 ? l : 0, c = m >= 300 && m < 400, f = Zt(t, "location");
    if (c && f != null) {
      if (a > this.maxRedirects) {
        o(this.createMaxRedirectError());
        return;
      }
      this.doApiRequest(Fr.prepareRedirectUrlOptions(f, n), r, s, a).then(i).catch(o);
      return;
    }
    t.setEncoding("utf8");
    let d = "";
    t.on("error", o), t.on("data", (g) => d += g), t.on("end", () => {
      try {
        if (t.statusCode != null && t.statusCode >= 400) {
          const g = Zt(t, "content-type"), w = g != null && (Array.isArray(g) ? g.find((y) => y.includes("json")) != null : g.includes("json"));
          o(to(t, `method: ${n.method || "GET"} url: ${n.protocol || "https:"}//${n.hostname}${n.port ? `:${n.port}` : ""}${n.path}

          Data:
          ${w ? JSON.stringify(JSON.parse(d)) : d}
          `));
        } else
          i(d.length === 0 ? null : d);
      } catch (g) {
        o(g);
      }
    });
  }
  async downloadToBuffer(t, n) {
    return await n.cancellationToken.createPromise((r, i, o) => {
      const a = [], s = {
        headers: n.headers || void 0,
        // because PrivateGitHubProvider requires HttpExecutor.prepareRedirectUrlOptions logic, so, we need to redirect manually
        redirect: "manual"
      };
      bo(t, s), xr(s), this.doDownload(s, {
        destination: null,
        options: n,
        onCancel: o,
        callback: (l) => {
          l == null ? r(Buffer.concat(a)) : i(l);
        },
        responseHandler: (l, m) => {
          let c = 0;
          l.on("data", (f) => {
            if (c += f.length, c > 524288e3) {
              m(new Error("Maximum allowed size is 500 MB"));
              return;
            }
            a.push(f);
          }), l.on("end", () => {
            m(null);
          });
        }
      }, 0);
    });
  }
  doDownload(t, n, r) {
    const i = this.createRequest(t, (o) => {
      if (o.statusCode >= 400) {
        n.callback(new Error(`Cannot download "${t.protocol || "https:"}//${t.hostname}${t.path}", status ${o.statusCode}: ${o.statusMessage}`));
        return;
      }
      o.on("error", n.callback);
      const a = Zt(o, "location");
      if (a != null) {
        r < this.maxRedirects ? this.doDownload(Fr.prepareRedirectUrlOptions(a, t), n, r++) : n.callback(this.createMaxRedirectError());
        return;
      }
      n.responseHandler == null ? Rp(n, o) : n.responseHandler(o, n.callback);
    });
    this.addErrorAndTimeoutHandlers(i, n.callback, t.timeout), this.addRedirectHandlers(i, t, n.callback, r, (o) => {
      this.doDownload(o, n, r++);
    }), i.end();
  }
  createMaxRedirectError() {
    return new Error(`Too many redirects (> ${this.maxRedirects})`);
  }
  addTimeOutHandler(t, n, r) {
    t.on("socket", (i) => {
      i.setTimeout(r, () => {
        t.abort(), n(new Error("Request timed out"));
      });
    });
  }
  static prepareRedirectUrlOptions(t, n) {
    const r = rc(t, { ...n }), i = r.headers;
    if (i != null && i.authorization) {
      const o = new nc.URL(t);
      (o.hostname.endsWith(".amazonaws.com") || o.searchParams.has("X-Amz-Credential")) && delete i.authorization;
    }
    return r;
  }
  static retryOnServerError(t, n = 3) {
    for (let r = 0; ; r++)
      try {
        return t();
      } catch (i) {
        if (r < n && (i instanceof Co && i.isServerError() || i.code === "EPIPE"))
          continue;
        throw i;
      }
  }
}
Ce.HttpExecutor = Fr;
function rc(e, t) {
  const n = xr(t);
  return bo(new nc.URL(e), n), n;
}
function bo(e, t) {
  t.protocol = e.protocol, t.hostname = e.hostname, e.port ? t.port = e.port : t.port && delete t.port, t.path = e.pathname + e.search;
}
class no extends Tp.Transform {
  // noinspection JSUnusedGlobalSymbols
  get actual() {
    return this._actual;
  }
  constructor(t, n = "sha512", r = "base64") {
    super(), this.expected = t, this.algorithm = n, this.encoding = r, this._actual = null, this.isValidateOnEnd = !0, this.digester = (0, _p.createHash)(n);
  }
  // noinspection JSUnusedGlobalSymbols
  _transform(t, n, r) {
    this.digester.update(t), r(null, t);
  }
  // noinspection JSUnusedGlobalSymbols
  _flush(t) {
    if (this._actual = this.digester.digest(this.encoding), this.isValidateOnEnd)
      try {
        this.validate();
      } catch (n) {
        t(n);
        return;
      }
    t(null);
  }
  validate() {
    if (this._actual == null)
      throw (0, ka.newError)("Not finished yet", "ERR_STREAM_NOT_FINISHED");
    if (this._actual !== this.expected)
      throw (0, ka.newError)(`${this.algorithm} checksum mismatch, expected ${this.expected}, got ${this._actual}`, "ERR_CHECKSUM_MISMATCH");
    return null;
  }
}
Ce.DigestTransform = no;
function Ip(e, t, n) {
  return e != null && t != null && e !== t ? (n(new Error(`checksum mismatch: expected ${t} but got ${e} (X-Checksum-Sha2 header)`)), !1) : !0;
}
function Zt(e, t) {
  const n = e.headers[t];
  return n == null ? null : Array.isArray(n) ? n.length === 0 ? null : n[n.length - 1] : n;
}
function Rp(e, t) {
  if (!Ip(Zt(t, "X-Checksum-Sha2"), e.options.sha2, e.callback))
    return;
  const n = [];
  if (e.options.onProgress != null) {
    const a = Zt(t, "content-length");
    a != null && n.push(new bp.ProgressCallbackTransform(parseInt(a, 10), e.options.cancellationToken, e.options.onProgress));
  }
  const r = e.options.sha512;
  r != null ? n.push(new no(r, "sha512", r.length === 128 && !r.includes("+") && !r.includes("Z") && !r.includes("=") ? "hex" : "base64")) : e.options.sha2 != null && n.push(new no(e.options.sha2, "sha256", "hex"));
  const i = (0, Ap.createWriteStream)(e.destination);
  n.push(i);
  let o = t;
  for (const a of n)
    a.on("error", (s) => {
      i.close(), e.options.cancellationToken.cancelled || e.callback(s);
    }), o = o.pipe(a);
  i.on("finish", () => {
    i.close(e.callback);
  });
}
function xr(e, t, n) {
  n != null && (e.method = n), e.headers = { ...e.headers };
  const r = e.headers;
  return t != null && (r.authorization = t.startsWith("Basic") || t.startsWith("Bearer") ? t : `token ${t}`), r["User-Agent"] == null && (r["User-Agent"] = "electron-builder"), (n == null || n === "GET" || r["Cache-Control"] == null) && (r["Cache-Control"] = "no-cache"), e.protocol == null && process.versions.electron != null && (e.protocol = "https:"), e;
}
function Lr(e, t) {
  return JSON.stringify(e, (n, r) => n.endsWith("Authorization") || n.endsWith("authorization") || n.endsWith("Password") || n.endsWith("PASSWORD") || n.endsWith("Token") || n.includes("password") || n.includes("token") || t != null && t.has(n) ? "<stripped sensitive data>" : r, 2);
}
var Xr = {};
Object.defineProperty(Xr, "__esModule", { value: !0 });
Xr.MemoLazy = void 0;
class Pp {
  constructor(t, n) {
    this.selector = t, this.creator = n, this.selected = void 0, this._value = void 0;
  }
  get hasValue() {
    return this._value !== void 0;
  }
  get value() {
    const t = this.selector();
    if (this._value !== void 0 && ic(this.selected, t))
      return this._value;
    this.selected = t;
    const n = this.creator(t);
    return this.value = n, n;
  }
  set value(t) {
    this._value = t;
  }
}
Xr.MemoLazy = Pp;
function ic(e, t) {
  if (typeof e == "object" && e !== null && (typeof t == "object" && t !== null)) {
    const i = Object.keys(e), o = Object.keys(t);
    return i.length === o.length && i.every((a) => ic(e[a], t[a]));
  }
  return e === t;
}
var Kr = {};
Object.defineProperty(Kr, "__esModule", { value: !0 });
Kr.githubUrl = Dp;
Kr.getS3LikeProviderBaseUrl = Np;
function Dp(e, t = "github.com") {
  return `${e.protocol || "https"}://${e.host || t}`;
}
function Np(e) {
  const t = e.provider;
  if (t === "s3")
    return Fp(e);
  if (t === "spaces")
    return xp(e);
  throw new Error(`Not supported provider: ${t}`);
}
function Fp(e) {
  let t;
  if (e.accelerate == !0)
    t = `https://${e.bucket}.s3-accelerate.amazonaws.com`;
  else if (e.endpoint != null)
    t = `${e.endpoint}/${e.bucket}`;
  else if (e.bucket.includes(".")) {
    if (e.region == null)
      throw new Error(`Bucket name "${e.bucket}" includes a dot, but S3 region is missing`);
    e.region === "us-east-1" ? t = `https://s3.amazonaws.com/${e.bucket}` : t = `https://s3-${e.region}.amazonaws.com/${e.bucket}`;
  } else e.region === "cn-north-1" ? t = `https://${e.bucket}.s3.${e.region}.amazonaws.com.cn` : t = `https://${e.bucket}.s3.amazonaws.com`;
  return oc(t, e.path);
}
function oc(e, t) {
  return t != null && t.length > 0 && (t.startsWith("/") || (e += "/"), e += t), e;
}
function xp(e) {
  if (e.name == null)
    throw new Error("name is missing");
  if (e.region == null)
    throw new Error("region is missing");
  return oc(`https://${e.name}.${e.region}.digitaloceanspaces.com`, e.path);
}
var $o = {};
Object.defineProperty($o, "__esModule", { value: !0 });
$o.retry = ac;
const Lp = ht;
async function ac(e, t, n, r = 0, i = 0, o) {
  var a;
  const s = new Lp.CancellationToken();
  try {
    return await e();
  } catch (l) {
    if ((!((a = o == null ? void 0 : o(l)) !== null && a !== void 0) || a) && t > 0 && !s.cancelled)
      return await new Promise((m) => setTimeout(m, n + r * i)), await ac(e, t - 1, n, r, i + 1, o);
    throw l;
  }
}
var Oo = {};
Object.defineProperty(Oo, "__esModule", { value: !0 });
Oo.parseDn = Up;
function Up(e) {
  let t = !1, n = null, r = "", i = 0;
  e = e.trim();
  const o = /* @__PURE__ */ new Map();
  for (let a = 0; a <= e.length; a++) {
    if (a === e.length) {
      n !== null && o.set(n, r);
      break;
    }
    const s = e[a];
    if (t) {
      if (s === '"') {
        t = !1;
        continue;
      }
    } else {
      if (s === '"') {
        t = !0;
        continue;
      }
      if (s === "\\") {
        a++;
        const l = parseInt(e.slice(a, a + 2), 16);
        Number.isNaN(l) ? r += e[a] : (a++, r += String.fromCharCode(l));
        continue;
      }
      if (n === null && s === "=") {
        n = r, r = "";
        continue;
      }
      if (s === "," || s === ";" || s === "+") {
        n !== null && o.set(n, r), n = null, r = "";
        continue;
      }
    }
    if (s === " " && !t) {
      if (r.length === 0)
        continue;
      if (a > i) {
        let l = a;
        for (; e[l] === " "; )
          l++;
        i = l;
      }
      if (i >= e.length || e[i] === "," || e[i] === ";" || n === null && e[i] === "=" || n !== null && e[i] === "+") {
        a = i - 1;
        continue;
      }
    }
    r += s;
  }
  return o;
}
var nn = {};
Object.defineProperty(nn, "__esModule", { value: !0 });
nn.nil = nn.UUID = void 0;
const sc = qn, lc = ln, kp = "options.name must be either a string or a Buffer", Ma = (0, sc.randomBytes)(16);
Ma[0] = Ma[0] | 1;
const Ir = {}, W = [];
for (let e = 0; e < 256; e++) {
  const t = (e + 256).toString(16).substr(1);
  Ir[t] = e, W[e] = t;
}
class Nt {
  constructor(t) {
    this.ascii = null, this.binary = null;
    const n = Nt.check(t);
    if (!n)
      throw new Error("not a UUID");
    this.version = n.version, n.format === "ascii" ? this.ascii = t : this.binary = t;
  }
  static v5(t, n) {
    return Mp(t, "sha1", 80, n);
  }
  toString() {
    return this.ascii == null && (this.ascii = Bp(this.binary)), this.ascii;
  }
  inspect() {
    return `UUID v${this.version} ${this.toString()}`;
  }
  static check(t, n = 0) {
    if (typeof t == "string")
      return t = t.toLowerCase(), /^[a-f0-9]{8}(-[a-f0-9]{4}){3}-([a-f0-9]{12})$/.test(t) ? t === "00000000-0000-0000-0000-000000000000" ? { version: void 0, variant: "nil", format: "ascii" } : {
        version: (Ir[t[14] + t[15]] & 240) >> 4,
        variant: Ba((Ir[t[19] + t[20]] & 224) >> 5),
        format: "ascii"
      } : !1;
    if (Buffer.isBuffer(t)) {
      if (t.length < n + 16)
        return !1;
      let r = 0;
      for (; r < 16 && t[n + r] === 0; r++)
        ;
      return r === 16 ? { version: void 0, variant: "nil", format: "binary" } : {
        version: (t[n + 6] & 240) >> 4,
        variant: Ba((t[n + 8] & 224) >> 5),
        format: "binary"
      };
    }
    throw (0, lc.newError)("Unknown type of uuid", "ERR_UNKNOWN_UUID_TYPE");
  }
  // read stringified uuid into a Buffer
  static parse(t) {
    const n = Buffer.allocUnsafe(16);
    let r = 0;
    for (let i = 0; i < 16; i++)
      n[i] = Ir[t[r++] + t[r++]], (i === 3 || i === 5 || i === 7 || i === 9) && (r += 1);
    return n;
  }
}
nn.UUID = Nt;
Nt.OID = Nt.parse("6ba7b812-9dad-11d1-80b4-00c04fd430c8");
function Ba(e) {
  switch (e) {
    case 0:
    case 1:
    case 3:
      return "ncs";
    case 4:
    case 5:
      return "rfc4122";
    case 6:
      return "microsoft";
    default:
      return "future";
  }
}
var Cn;
(function(e) {
  e[e.ASCII = 0] = "ASCII", e[e.BINARY = 1] = "BINARY", e[e.OBJECT = 2] = "OBJECT";
})(Cn || (Cn = {}));
function Mp(e, t, n, r, i = Cn.ASCII) {
  const o = (0, sc.createHash)(t);
  if (typeof e != "string" && !Buffer.isBuffer(e))
    throw (0, lc.newError)(kp, "ERR_INVALID_UUID_NAME");
  o.update(r), o.update(e);
  const s = o.digest();
  let l;
  switch (i) {
    case Cn.BINARY:
      s[6] = s[6] & 15 | n, s[8] = s[8] & 63 | 128, l = s;
      break;
    case Cn.OBJECT:
      s[6] = s[6] & 15 | n, s[8] = s[8] & 63 | 128, l = new Nt(s);
      break;
    default:
      l = W[s[0]] + W[s[1]] + W[s[2]] + W[s[3]] + "-" + W[s[4]] + W[s[5]] + "-" + W[s[6] & 15 | n] + W[s[7]] + "-" + W[s[8] & 63 | 128] + W[s[9]] + "-" + W[s[10]] + W[s[11]] + W[s[12]] + W[s[13]] + W[s[14]] + W[s[15]];
      break;
  }
  return l;
}
function Bp(e) {
  return W[e[0]] + W[e[1]] + W[e[2]] + W[e[3]] + "-" + W[e[4]] + W[e[5]] + "-" + W[e[6]] + W[e[7]] + "-" + W[e[8]] + W[e[9]] + "-" + W[e[10]] + W[e[11]] + W[e[12]] + W[e[13]] + W[e[14]] + W[e[15]];
}
nn.nil = new Nt("00000000-0000-0000-0000-000000000000");
var Wn = {}, cc = {};
(function(e) {
  (function(t) {
    t.parser = function(h, u) {
      return new r(h, u);
    }, t.SAXParser = r, t.SAXStream = c, t.createStream = m, t.MAX_BUFFER_LENGTH = 64 * 1024;
    var n = [
      "comment",
      "sgmlDecl",
      "textNode",
      "tagName",
      "doctype",
      "procInstName",
      "procInstBody",
      "entity",
      "attribName",
      "attribValue",
      "cdata",
      "script"
    ];
    t.EVENTS = [
      "text",
      "processinginstruction",
      "sgmldeclaration",
      "doctype",
      "comment",
      "opentagstart",
      "attribute",
      "opentag",
      "closetag",
      "opencdata",
      "cdata",
      "closecdata",
      "error",
      "end",
      "ready",
      "script",
      "opennamespace",
      "closenamespace"
    ];
    function r(h, u) {
      if (!(this instanceof r))
        return new r(h, u);
      var C = this;
      o(C), C.q = C.c = "", C.bufferCheckPosition = t.MAX_BUFFER_LENGTH, C.opt = u || {}, C.opt.lowercase = C.opt.lowercase || C.opt.lowercasetags, C.looseCase = C.opt.lowercase ? "toLowerCase" : "toUpperCase", C.tags = [], C.closed = C.closedRoot = C.sawRoot = !1, C.tag = C.error = null, C.strict = !!h, C.noscript = !!(h || C.opt.noscript), C.state = E.BEGIN, C.strictEntities = C.opt.strictEntities, C.ENTITIES = C.strictEntities ? Object.create(t.XML_ENTITIES) : Object.create(t.ENTITIES), C.attribList = [], C.opt.xmlns && (C.ns = Object.create(y)), C.opt.unquotedAttributeValues === void 0 && (C.opt.unquotedAttributeValues = !h), C.trackPosition = C.opt.position !== !1, C.trackPosition && (C.position = C.line = C.column = 0), B(C, "onready");
    }
    Object.create || (Object.create = function(h) {
      function u() {
      }
      u.prototype = h;
      var C = new u();
      return C;
    }), Object.keys || (Object.keys = function(h) {
      var u = [];
      for (var C in h) h.hasOwnProperty(C) && u.push(C);
      return u;
    });
    function i(h) {
      for (var u = Math.max(t.MAX_BUFFER_LENGTH, 10), C = 0, _ = 0, Y = n.length; _ < Y; _++) {
        var ne = h[n[_]].length;
        if (ne > u)
          switch (n[_]) {
            case "textNode":
              K(h);
              break;
            case "cdata":
              M(h, "oncdata", h.cdata), h.cdata = "";
              break;
            case "script":
              M(h, "onscript", h.script), h.script = "";
              break;
            default:
              $(h, "Max buffer length exceeded: " + n[_]);
          }
        C = Math.max(C, ne);
      }
      var oe = t.MAX_BUFFER_LENGTH - C;
      h.bufferCheckPosition = oe + h.position;
    }
    function o(h) {
      for (var u = 0, C = n.length; u < C; u++)
        h[n[u]] = "";
    }
    function a(h) {
      K(h), h.cdata !== "" && (M(h, "oncdata", h.cdata), h.cdata = ""), h.script !== "" && (M(h, "onscript", h.script), h.script = "");
    }
    r.prototype = {
      end: function() {
        D(this);
      },
      write: Ge,
      resume: function() {
        return this.error = null, this;
      },
      close: function() {
        return this.write(null);
      },
      flush: function() {
        a(this);
      }
    };
    var s;
    try {
      s = require("stream").Stream;
    } catch {
      s = function() {
      };
    }
    s || (s = function() {
    });
    var l = t.EVENTS.filter(function(h) {
      return h !== "error" && h !== "end";
    });
    function m(h, u) {
      return new c(h, u);
    }
    function c(h, u) {
      if (!(this instanceof c))
        return new c(h, u);
      s.apply(this), this._parser = new r(h, u), this.writable = !0, this.readable = !0;
      var C = this;
      this._parser.onend = function() {
        C.emit("end");
      }, this._parser.onerror = function(_) {
        C.emit("error", _), C._parser.error = null;
      }, this._decoder = null, l.forEach(function(_) {
        Object.defineProperty(C, "on" + _, {
          get: function() {
            return C._parser["on" + _];
          },
          set: function(Y) {
            if (!Y)
              return C.removeAllListeners(_), C._parser["on" + _] = Y, Y;
            C.on(_, Y);
          },
          enumerable: !0,
          configurable: !1
        });
      });
    }
    c.prototype = Object.create(s.prototype, {
      constructor: {
        value: c
      }
    }), c.prototype.write = function(h) {
      if (typeof Buffer == "function" && typeof Buffer.isBuffer == "function" && Buffer.isBuffer(h)) {
        if (!this._decoder) {
          var u = Df.StringDecoder;
          this._decoder = new u("utf8");
        }
        h = this._decoder.write(h);
      }
      return this._parser.write(h.toString()), this.emit("data", h), !0;
    }, c.prototype.end = function(h) {
      return h && h.length && this.write(h), this._parser.end(), !0;
    }, c.prototype.on = function(h, u) {
      var C = this;
      return !C._parser["on" + h] && l.indexOf(h) !== -1 && (C._parser["on" + h] = function() {
        var _ = arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments);
        _.splice(0, 0, h), C.emit.apply(C, _);
      }), s.prototype.on.call(C, h, u);
    };
    var f = "[CDATA[", d = "DOCTYPE", g = "http://www.w3.org/XML/1998/namespace", w = "http://www.w3.org/2000/xmlns/", y = { xml: g, xmlns: w }, S = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/, T = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/, A = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/, P = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/;
    function x(h) {
      return h === " " || h === `
` || h === "\r" || h === "	";
    }
    function X(h) {
      return h === '"' || h === "'";
    }
    function Z(h) {
      return h === ">" || x(h);
    }
    function V(h, u) {
      return h.test(u);
    }
    function le(h, u) {
      return !V(h, u);
    }
    var E = 0;
    t.STATE = {
      BEGIN: E++,
      // leading byte order mark or whitespace
      BEGIN_WHITESPACE: E++,
      // leading whitespace
      TEXT: E++,
      // general stuff
      TEXT_ENTITY: E++,
      // &amp and such.
      OPEN_WAKA: E++,
      // <
      SGML_DECL: E++,
      // <!BLARG
      SGML_DECL_QUOTED: E++,
      // <!BLARG foo "bar
      DOCTYPE: E++,
      // <!DOCTYPE
      DOCTYPE_QUOTED: E++,
      // <!DOCTYPE "//blah
      DOCTYPE_DTD: E++,
      // <!DOCTYPE "//blah" [ ...
      DOCTYPE_DTD_QUOTED: E++,
      // <!DOCTYPE "//blah" [ "foo
      COMMENT_STARTING: E++,
      // <!-
      COMMENT: E++,
      // <!--
      COMMENT_ENDING: E++,
      // <!-- blah -
      COMMENT_ENDED: E++,
      // <!-- blah --
      CDATA: E++,
      // <![CDATA[ something
      CDATA_ENDING: E++,
      // ]
      CDATA_ENDING_2: E++,
      // ]]
      PROC_INST: E++,
      // <?hi
      PROC_INST_BODY: E++,
      // <?hi there
      PROC_INST_ENDING: E++,
      // <?hi "there" ?
      OPEN_TAG: E++,
      // <strong
      OPEN_TAG_SLASH: E++,
      // <strong /
      ATTRIB: E++,
      // <a
      ATTRIB_NAME: E++,
      // <a foo
      ATTRIB_NAME_SAW_WHITE: E++,
      // <a foo _
      ATTRIB_VALUE: E++,
      // <a foo=
      ATTRIB_VALUE_QUOTED: E++,
      // <a foo="bar
      ATTRIB_VALUE_CLOSED: E++,
      // <a foo="bar"
      ATTRIB_VALUE_UNQUOTED: E++,
      // <a foo=bar
      ATTRIB_VALUE_ENTITY_Q: E++,
      // <foo bar="&quot;"
      ATTRIB_VALUE_ENTITY_U: E++,
      // <foo bar=&quot
      CLOSE_TAG: E++,
      // </a
      CLOSE_TAG_SAW_WHITE: E++,
      // </a   >
      SCRIPT: E++,
      // <script> ...
      SCRIPT_ENDING: E++
      // <script> ... <
    }, t.XML_ENTITIES = {
      amp: "&",
      gt: ">",
      lt: "<",
      quot: '"',
      apos: "'"
    }, t.ENTITIES = {
      amp: "&",
      gt: ">",
      lt: "<",
      quot: '"',
      apos: "'",
      AElig: 198,
      Aacute: 193,
      Acirc: 194,
      Agrave: 192,
      Aring: 197,
      Atilde: 195,
      Auml: 196,
      Ccedil: 199,
      ETH: 208,
      Eacute: 201,
      Ecirc: 202,
      Egrave: 200,
      Euml: 203,
      Iacute: 205,
      Icirc: 206,
      Igrave: 204,
      Iuml: 207,
      Ntilde: 209,
      Oacute: 211,
      Ocirc: 212,
      Ograve: 210,
      Oslash: 216,
      Otilde: 213,
      Ouml: 214,
      THORN: 222,
      Uacute: 218,
      Ucirc: 219,
      Ugrave: 217,
      Uuml: 220,
      Yacute: 221,
      aacute: 225,
      acirc: 226,
      aelig: 230,
      agrave: 224,
      aring: 229,
      atilde: 227,
      auml: 228,
      ccedil: 231,
      eacute: 233,
      ecirc: 234,
      egrave: 232,
      eth: 240,
      euml: 235,
      iacute: 237,
      icirc: 238,
      igrave: 236,
      iuml: 239,
      ntilde: 241,
      oacute: 243,
      ocirc: 244,
      ograve: 242,
      oslash: 248,
      otilde: 245,
      ouml: 246,
      szlig: 223,
      thorn: 254,
      uacute: 250,
      ucirc: 251,
      ugrave: 249,
      uuml: 252,
      yacute: 253,
      yuml: 255,
      copy: 169,
      reg: 174,
      nbsp: 160,
      iexcl: 161,
      cent: 162,
      pound: 163,
      curren: 164,
      yen: 165,
      brvbar: 166,
      sect: 167,
      uml: 168,
      ordf: 170,
      laquo: 171,
      not: 172,
      shy: 173,
      macr: 175,
      deg: 176,
      plusmn: 177,
      sup1: 185,
      sup2: 178,
      sup3: 179,
      acute: 180,
      micro: 181,
      para: 182,
      middot: 183,
      cedil: 184,
      ordm: 186,
      raquo: 187,
      frac14: 188,
      frac12: 189,
      frac34: 190,
      iquest: 191,
      times: 215,
      divide: 247,
      OElig: 338,
      oelig: 339,
      Scaron: 352,
      scaron: 353,
      Yuml: 376,
      fnof: 402,
      circ: 710,
      tilde: 732,
      Alpha: 913,
      Beta: 914,
      Gamma: 915,
      Delta: 916,
      Epsilon: 917,
      Zeta: 918,
      Eta: 919,
      Theta: 920,
      Iota: 921,
      Kappa: 922,
      Lambda: 923,
      Mu: 924,
      Nu: 925,
      Xi: 926,
      Omicron: 927,
      Pi: 928,
      Rho: 929,
      Sigma: 931,
      Tau: 932,
      Upsilon: 933,
      Phi: 934,
      Chi: 935,
      Psi: 936,
      Omega: 937,
      alpha: 945,
      beta: 946,
      gamma: 947,
      delta: 948,
      epsilon: 949,
      zeta: 950,
      eta: 951,
      theta: 952,
      iota: 953,
      kappa: 954,
      lambda: 955,
      mu: 956,
      nu: 957,
      xi: 958,
      omicron: 959,
      pi: 960,
      rho: 961,
      sigmaf: 962,
      sigma: 963,
      tau: 964,
      upsilon: 965,
      phi: 966,
      chi: 967,
      psi: 968,
      omega: 969,
      thetasym: 977,
      upsih: 978,
      piv: 982,
      ensp: 8194,
      emsp: 8195,
      thinsp: 8201,
      zwnj: 8204,
      zwj: 8205,
      lrm: 8206,
      rlm: 8207,
      ndash: 8211,
      mdash: 8212,
      lsquo: 8216,
      rsquo: 8217,
      sbquo: 8218,
      ldquo: 8220,
      rdquo: 8221,
      bdquo: 8222,
      dagger: 8224,
      Dagger: 8225,
      bull: 8226,
      hellip: 8230,
      permil: 8240,
      prime: 8242,
      Prime: 8243,
      lsaquo: 8249,
      rsaquo: 8250,
      oline: 8254,
      frasl: 8260,
      euro: 8364,
      image: 8465,
      weierp: 8472,
      real: 8476,
      trade: 8482,
      alefsym: 8501,
      larr: 8592,
      uarr: 8593,
      rarr: 8594,
      darr: 8595,
      harr: 8596,
      crarr: 8629,
      lArr: 8656,
      uArr: 8657,
      rArr: 8658,
      dArr: 8659,
      hArr: 8660,
      forall: 8704,
      part: 8706,
      exist: 8707,
      empty: 8709,
      nabla: 8711,
      isin: 8712,
      notin: 8713,
      ni: 8715,
      prod: 8719,
      sum: 8721,
      minus: 8722,
      lowast: 8727,
      radic: 8730,
      prop: 8733,
      infin: 8734,
      ang: 8736,
      and: 8743,
      or: 8744,
      cap: 8745,
      cup: 8746,
      int: 8747,
      there4: 8756,
      sim: 8764,
      cong: 8773,
      asymp: 8776,
      ne: 8800,
      equiv: 8801,
      le: 8804,
      ge: 8805,
      sub: 8834,
      sup: 8835,
      nsub: 8836,
      sube: 8838,
      supe: 8839,
      oplus: 8853,
      otimes: 8855,
      perp: 8869,
      sdot: 8901,
      lceil: 8968,
      rceil: 8969,
      lfloor: 8970,
      rfloor: 8971,
      lang: 9001,
      rang: 9002,
      loz: 9674,
      spades: 9824,
      clubs: 9827,
      hearts: 9829,
      diams: 9830
    }, Object.keys(t.ENTITIES).forEach(function(h) {
      var u = t.ENTITIES[h], C = typeof u == "number" ? String.fromCharCode(u) : u;
      t.ENTITIES[h] = C;
    });
    for (var q in t.STATE)
      t.STATE[t.STATE[q]] = q;
    E = t.STATE;
    function B(h, u, C) {
      h[u] && h[u](C);
    }
    function M(h, u, C) {
      h.textNode && K(h), B(h, u, C);
    }
    function K(h) {
      h.textNode = I(h.opt, h.textNode), h.textNode && B(h, "ontext", h.textNode), h.textNode = "";
    }
    function I(h, u) {
      return h.trim && (u = u.trim()), h.normalize && (u = u.replace(/\s+/g, " ")), u;
    }
    function $(h, u) {
      return K(h), h.trackPosition && (u += `
Line: ` + h.line + `
Column: ` + h.column + `
Char: ` + h.c), u = new Error(u), h.error = u, B(h, "onerror", u), h;
    }
    function D(h) {
      return h.sawRoot && !h.closedRoot && b(h, "Unclosed root tag"), h.state !== E.BEGIN && h.state !== E.BEGIN_WHITESPACE && h.state !== E.TEXT && $(h, "Unexpected end"), K(h), h.c = "", h.closed = !0, B(h, "onend"), r.call(h, h.strict, h.opt), h;
    }
    function b(h, u) {
      if (typeof h != "object" || !(h instanceof r))
        throw new Error("bad call to strictFail");
      h.strict && $(h, u);
    }
    function N(h) {
      h.strict || (h.tagName = h.tagName[h.looseCase]());
      var u = h.tags[h.tags.length - 1] || h, C = h.tag = { name: h.tagName, attributes: {} };
      h.opt.xmlns && (C.ns = u.ns), h.attribList.length = 0, M(h, "onopentagstart", C);
    }
    function R(h, u) {
      var C = h.indexOf(":"), _ = C < 0 ? ["", h] : h.split(":"), Y = _[0], ne = _[1];
      return u && h === "xmlns" && (Y = "xmlns", ne = ""), { prefix: Y, local: ne };
    }
    function k(h) {
      if (h.strict || (h.attribName = h.attribName[h.looseCase]()), h.attribList.indexOf(h.attribName) !== -1 || h.tag.attributes.hasOwnProperty(h.attribName)) {
        h.attribName = h.attribValue = "";
        return;
      }
      if (h.opt.xmlns) {
        var u = R(h.attribName, !0), C = u.prefix, _ = u.local;
        if (C === "xmlns")
          if (_ === "xml" && h.attribValue !== g)
            b(
              h,
              "xml: prefix must be bound to " + g + `
Actual: ` + h.attribValue
            );
          else if (_ === "xmlns" && h.attribValue !== w)
            b(
              h,
              "xmlns: prefix must be bound to " + w + `
Actual: ` + h.attribValue
            );
          else {
            var Y = h.tag, ne = h.tags[h.tags.length - 1] || h;
            Y.ns === ne.ns && (Y.ns = Object.create(ne.ns)), Y.ns[_] = h.attribValue;
          }
        h.attribList.push([h.attribName, h.attribValue]);
      } else
        h.tag.attributes[h.attribName] = h.attribValue, M(h, "onattribute", {
          name: h.attribName,
          value: h.attribValue
        });
      h.attribName = h.attribValue = "";
    }
    function G(h, u) {
      if (h.opt.xmlns) {
        var C = h.tag, _ = R(h.tagName);
        C.prefix = _.prefix, C.local = _.local, C.uri = C.ns[_.prefix] || "", C.prefix && !C.uri && (b(h, "Unbound namespace prefix: " + JSON.stringify(h.tagName)), C.uri = _.prefix);
        var Y = h.tags[h.tags.length - 1] || h;
        C.ns && Y.ns !== C.ns && Object.keys(C.ns).forEach(function(tr) {
          M(h, "onopennamespace", {
            prefix: tr,
            uri: C.ns[tr]
          });
        });
        for (var ne = 0, oe = h.attribList.length; ne < oe; ne++) {
          var me = h.attribList[ne], ve = me[0], et = me[1], ce = R(ve, !0), ke = ce.prefix, hi = ce.local, er = ke === "" ? "" : C.ns[ke] || "", fn = {
            name: ve,
            value: et,
            prefix: ke,
            local: hi,
            uri: er
          };
          ke && ke !== "xmlns" && !er && (b(h, "Unbound namespace prefix: " + JSON.stringify(ke)), fn.uri = ke), h.tag.attributes[ve] = fn, M(h, "onattribute", fn);
        }
        h.attribList.length = 0;
      }
      h.tag.isSelfClosing = !!u, h.sawRoot = !0, h.tags.push(h.tag), M(h, "onopentag", h.tag), u || (!h.noscript && h.tagName.toLowerCase() === "script" ? h.state = E.SCRIPT : h.state = E.TEXT, h.tag = null, h.tagName = ""), h.attribName = h.attribValue = "", h.attribList.length = 0;
    }
    function j(h) {
      if (!h.tagName) {
        b(h, "Weird empty close tag."), h.textNode += "</>", h.state = E.TEXT;
        return;
      }
      if (h.script) {
        if (h.tagName !== "script") {
          h.script += "</" + h.tagName + ">", h.tagName = "", h.state = E.SCRIPT;
          return;
        }
        M(h, "onscript", h.script), h.script = "";
      }
      var u = h.tags.length, C = h.tagName;
      h.strict || (C = C[h.looseCase]());
      for (var _ = C; u--; ) {
        var Y = h.tags[u];
        if (Y.name !== _)
          b(h, "Unexpected close tag");
        else
          break;
      }
      if (u < 0) {
        b(h, "Unmatched closing tag: " + h.tagName), h.textNode += "</" + h.tagName + ">", h.state = E.TEXT;
        return;
      }
      h.tagName = C;
      for (var ne = h.tags.length; ne-- > u; ) {
        var oe = h.tag = h.tags.pop();
        h.tagName = h.tag.name, M(h, "onclosetag", h.tagName);
        var me = {};
        for (var ve in oe.ns)
          me[ve] = oe.ns[ve];
        var et = h.tags[h.tags.length - 1] || h;
        h.opt.xmlns && oe.ns !== et.ns && Object.keys(oe.ns).forEach(function(ce) {
          var ke = oe.ns[ce];
          M(h, "onclosenamespace", { prefix: ce, uri: ke });
        });
      }
      u === 0 && (h.closedRoot = !0), h.tagName = h.attribValue = h.attribName = "", h.attribList.length = 0, h.state = E.TEXT;
    }
    function J(h) {
      var u = h.entity, C = u.toLowerCase(), _, Y = "";
      return h.ENTITIES[u] ? h.ENTITIES[u] : h.ENTITIES[C] ? h.ENTITIES[C] : (u = C, u.charAt(0) === "#" && (u.charAt(1) === "x" ? (u = u.slice(2), _ = parseInt(u, 16), Y = _.toString(16)) : (u = u.slice(1), _ = parseInt(u, 10), Y = _.toString(10))), u = u.replace(/^0+/, ""), isNaN(_) || Y.toLowerCase() !== u ? (b(h, "Invalid character entity"), "&" + h.entity + ";") : String.fromCodePoint(_));
    }
    function fe(h, u) {
      u === "<" ? (h.state = E.OPEN_WAKA, h.startTagPosition = h.position) : x(u) || (b(h, "Non-whitespace before first tag."), h.textNode = u, h.state = E.TEXT);
    }
    function U(h, u) {
      var C = "";
      return u < h.length && (C = h.charAt(u)), C;
    }
    function Ge(h) {
      var u = this;
      if (this.error)
        throw this.error;
      if (u.closed)
        return $(
          u,
          "Cannot write after close. Assign an onready handler."
        );
      if (h === null)
        return D(u);
      typeof h == "object" && (h = h.toString());
      for (var C = 0, _ = ""; _ = U(h, C++), u.c = _, !!_; )
        switch (u.trackPosition && (u.position++, _ === `
` ? (u.line++, u.column = 0) : u.column++), u.state) {
          case E.BEGIN:
            if (u.state = E.BEGIN_WHITESPACE, _ === "\uFEFF")
              continue;
            fe(u, _);
            continue;
          case E.BEGIN_WHITESPACE:
            fe(u, _);
            continue;
          case E.TEXT:
            if (u.sawRoot && !u.closedRoot) {
              for (var Y = C - 1; _ && _ !== "<" && _ !== "&"; )
                _ = U(h, C++), _ && u.trackPosition && (u.position++, _ === `
` ? (u.line++, u.column = 0) : u.column++);
              u.textNode += h.substring(Y, C - 1);
            }
            _ === "<" && !(u.sawRoot && u.closedRoot && !u.strict) ? (u.state = E.OPEN_WAKA, u.startTagPosition = u.position) : (!x(_) && (!u.sawRoot || u.closedRoot) && b(u, "Text data outside of root node."), _ === "&" ? u.state = E.TEXT_ENTITY : u.textNode += _);
            continue;
          case E.SCRIPT:
            _ === "<" ? u.state = E.SCRIPT_ENDING : u.script += _;
            continue;
          case E.SCRIPT_ENDING:
            _ === "/" ? u.state = E.CLOSE_TAG : (u.script += "<" + _, u.state = E.SCRIPT);
            continue;
          case E.OPEN_WAKA:
            if (_ === "!")
              u.state = E.SGML_DECL, u.sgmlDecl = "";
            else if (!x(_)) if (V(S, _))
              u.state = E.OPEN_TAG, u.tagName = _;
            else if (_ === "/")
              u.state = E.CLOSE_TAG, u.tagName = "";
            else if (_ === "?")
              u.state = E.PROC_INST, u.procInstName = u.procInstBody = "";
            else {
              if (b(u, "Unencoded <"), u.startTagPosition + 1 < u.position) {
                var ne = u.position - u.startTagPosition;
                _ = new Array(ne).join(" ") + _;
              }
              u.textNode += "<" + _, u.state = E.TEXT;
            }
            continue;
          case E.SGML_DECL:
            if (u.sgmlDecl + _ === "--") {
              u.state = E.COMMENT, u.comment = "", u.sgmlDecl = "";
              continue;
            }
            u.doctype && u.doctype !== !0 && u.sgmlDecl ? (u.state = E.DOCTYPE_DTD, u.doctype += "<!" + u.sgmlDecl + _, u.sgmlDecl = "") : (u.sgmlDecl + _).toUpperCase() === f ? (M(u, "onopencdata"), u.state = E.CDATA, u.sgmlDecl = "", u.cdata = "") : (u.sgmlDecl + _).toUpperCase() === d ? (u.state = E.DOCTYPE, (u.doctype || u.sawRoot) && b(
              u,
              "Inappropriately located doctype declaration"
            ), u.doctype = "", u.sgmlDecl = "") : _ === ">" ? (M(u, "onsgmldeclaration", u.sgmlDecl), u.sgmlDecl = "", u.state = E.TEXT) : (X(_) && (u.state = E.SGML_DECL_QUOTED), u.sgmlDecl += _);
            continue;
          case E.SGML_DECL_QUOTED:
            _ === u.q && (u.state = E.SGML_DECL, u.q = ""), u.sgmlDecl += _;
            continue;
          case E.DOCTYPE:
            _ === ">" ? (u.state = E.TEXT, M(u, "ondoctype", u.doctype), u.doctype = !0) : (u.doctype += _, _ === "[" ? u.state = E.DOCTYPE_DTD : X(_) && (u.state = E.DOCTYPE_QUOTED, u.q = _));
            continue;
          case E.DOCTYPE_QUOTED:
            u.doctype += _, _ === u.q && (u.q = "", u.state = E.DOCTYPE);
            continue;
          case E.DOCTYPE_DTD:
            _ === "]" ? (u.doctype += _, u.state = E.DOCTYPE) : _ === "<" ? (u.state = E.OPEN_WAKA, u.startTagPosition = u.position) : X(_) ? (u.doctype += _, u.state = E.DOCTYPE_DTD_QUOTED, u.q = _) : u.doctype += _;
            continue;
          case E.DOCTYPE_DTD_QUOTED:
            u.doctype += _, _ === u.q && (u.state = E.DOCTYPE_DTD, u.q = "");
            continue;
          case E.COMMENT:
            _ === "-" ? u.state = E.COMMENT_ENDING : u.comment += _;
            continue;
          case E.COMMENT_ENDING:
            _ === "-" ? (u.state = E.COMMENT_ENDED, u.comment = I(u.opt, u.comment), u.comment && M(u, "oncomment", u.comment), u.comment = "") : (u.comment += "-" + _, u.state = E.COMMENT);
            continue;
          case E.COMMENT_ENDED:
            _ !== ">" ? (b(u, "Malformed comment"), u.comment += "--" + _, u.state = E.COMMENT) : u.doctype && u.doctype !== !0 ? u.state = E.DOCTYPE_DTD : u.state = E.TEXT;
            continue;
          case E.CDATA:
            _ === "]" ? u.state = E.CDATA_ENDING : u.cdata += _;
            continue;
          case E.CDATA_ENDING:
            _ === "]" ? u.state = E.CDATA_ENDING_2 : (u.cdata += "]" + _, u.state = E.CDATA);
            continue;
          case E.CDATA_ENDING_2:
            _ === ">" ? (u.cdata && M(u, "oncdata", u.cdata), M(u, "onclosecdata"), u.cdata = "", u.state = E.TEXT) : _ === "]" ? u.cdata += "]" : (u.cdata += "]]" + _, u.state = E.CDATA);
            continue;
          case E.PROC_INST:
            _ === "?" ? u.state = E.PROC_INST_ENDING : x(_) ? u.state = E.PROC_INST_BODY : u.procInstName += _;
            continue;
          case E.PROC_INST_BODY:
            if (!u.procInstBody && x(_))
              continue;
            _ === "?" ? u.state = E.PROC_INST_ENDING : u.procInstBody += _;
            continue;
          case E.PROC_INST_ENDING:
            _ === ">" ? (M(u, "onprocessinginstruction", {
              name: u.procInstName,
              body: u.procInstBody
            }), u.procInstName = u.procInstBody = "", u.state = E.TEXT) : (u.procInstBody += "?" + _, u.state = E.PROC_INST_BODY);
            continue;
          case E.OPEN_TAG:
            V(T, _) ? u.tagName += _ : (N(u), _ === ">" ? G(u) : _ === "/" ? u.state = E.OPEN_TAG_SLASH : (x(_) || b(u, "Invalid character in tag name"), u.state = E.ATTRIB));
            continue;
          case E.OPEN_TAG_SLASH:
            _ === ">" ? (G(u, !0), j(u)) : (b(u, "Forward-slash in opening tag not followed by >"), u.state = E.ATTRIB);
            continue;
          case E.ATTRIB:
            if (x(_))
              continue;
            _ === ">" ? G(u) : _ === "/" ? u.state = E.OPEN_TAG_SLASH : V(S, _) ? (u.attribName = _, u.attribValue = "", u.state = E.ATTRIB_NAME) : b(u, "Invalid attribute name");
            continue;
          case E.ATTRIB_NAME:
            _ === "=" ? u.state = E.ATTRIB_VALUE : _ === ">" ? (b(u, "Attribute without value"), u.attribValue = u.attribName, k(u), G(u)) : x(_) ? u.state = E.ATTRIB_NAME_SAW_WHITE : V(T, _) ? u.attribName += _ : b(u, "Invalid attribute name");
            continue;
          case E.ATTRIB_NAME_SAW_WHITE:
            if (_ === "=")
              u.state = E.ATTRIB_VALUE;
            else {
              if (x(_))
                continue;
              b(u, "Attribute without value"), u.tag.attributes[u.attribName] = "", u.attribValue = "", M(u, "onattribute", {
                name: u.attribName,
                value: ""
              }), u.attribName = "", _ === ">" ? G(u) : V(S, _) ? (u.attribName = _, u.state = E.ATTRIB_NAME) : (b(u, "Invalid attribute name"), u.state = E.ATTRIB);
            }
            continue;
          case E.ATTRIB_VALUE:
            if (x(_))
              continue;
            X(_) ? (u.q = _, u.state = E.ATTRIB_VALUE_QUOTED) : (u.opt.unquotedAttributeValues || $(u, "Unquoted attribute value"), u.state = E.ATTRIB_VALUE_UNQUOTED, u.attribValue = _);
            continue;
          case E.ATTRIB_VALUE_QUOTED:
            if (_ !== u.q) {
              _ === "&" ? u.state = E.ATTRIB_VALUE_ENTITY_Q : u.attribValue += _;
              continue;
            }
            k(u), u.q = "", u.state = E.ATTRIB_VALUE_CLOSED;
            continue;
          case E.ATTRIB_VALUE_CLOSED:
            x(_) ? u.state = E.ATTRIB : _ === ">" ? G(u) : _ === "/" ? u.state = E.OPEN_TAG_SLASH : V(S, _) ? (b(u, "No whitespace between attributes"), u.attribName = _, u.attribValue = "", u.state = E.ATTRIB_NAME) : b(u, "Invalid attribute name");
            continue;
          case E.ATTRIB_VALUE_UNQUOTED:
            if (!Z(_)) {
              _ === "&" ? u.state = E.ATTRIB_VALUE_ENTITY_U : u.attribValue += _;
              continue;
            }
            k(u), _ === ">" ? G(u) : u.state = E.ATTRIB;
            continue;
          case E.CLOSE_TAG:
            if (u.tagName)
              _ === ">" ? j(u) : V(T, _) ? u.tagName += _ : u.script ? (u.script += "</" + u.tagName, u.tagName = "", u.state = E.SCRIPT) : (x(_) || b(u, "Invalid tagname in closing tag"), u.state = E.CLOSE_TAG_SAW_WHITE);
            else {
              if (x(_))
                continue;
              le(S, _) ? u.script ? (u.script += "</" + _, u.state = E.SCRIPT) : b(u, "Invalid tagname in closing tag.") : u.tagName = _;
            }
            continue;
          case E.CLOSE_TAG_SAW_WHITE:
            if (x(_))
              continue;
            _ === ">" ? j(u) : b(u, "Invalid characters in closing tag");
            continue;
          case E.TEXT_ENTITY:
          case E.ATTRIB_VALUE_ENTITY_Q:
          case E.ATTRIB_VALUE_ENTITY_U:
            var oe, me;
            switch (u.state) {
              case E.TEXT_ENTITY:
                oe = E.TEXT, me = "textNode";
                break;
              case E.ATTRIB_VALUE_ENTITY_Q:
                oe = E.ATTRIB_VALUE_QUOTED, me = "attribValue";
                break;
              case E.ATTRIB_VALUE_ENTITY_U:
                oe = E.ATTRIB_VALUE_UNQUOTED, me = "attribValue";
                break;
            }
            if (_ === ";") {
              var ve = J(u);
              u.opt.unparsedEntities && !Object.values(t.XML_ENTITIES).includes(ve) ? (u.entity = "", u.state = oe, u.write(ve)) : (u[me] += ve, u.entity = "", u.state = oe);
            } else V(u.entity.length ? P : A, _) ? u.entity += _ : (b(u, "Invalid character in entity name"), u[me] += "&" + u.entity + _, u.entity = "", u.state = oe);
            continue;
          default:
            throw new Error(u, "Unknown state: " + u.state);
        }
      return u.position >= u.bufferCheckPosition && i(u), u;
    }
    /*! http://mths.be/fromcodepoint v0.1.0 by @mathias */
    String.fromCodePoint || function() {
      var h = String.fromCharCode, u = Math.floor, C = function() {
        var _ = 16384, Y = [], ne, oe, me = -1, ve = arguments.length;
        if (!ve)
          return "";
        for (var et = ""; ++me < ve; ) {
          var ce = Number(arguments[me]);
          if (!isFinite(ce) || // `NaN`, `+Infinity`, or `-Infinity`
          ce < 0 || // not a valid Unicode code point
          ce > 1114111 || // not a valid Unicode code point
          u(ce) !== ce)
            throw RangeError("Invalid code point: " + ce);
          ce <= 65535 ? Y.push(ce) : (ce -= 65536, ne = (ce >> 10) + 55296, oe = ce % 1024 + 56320, Y.push(ne, oe)), (me + 1 === ve || Y.length > _) && (et += h.apply(null, Y), Y.length = 0);
        }
        return et;
      };
      Object.defineProperty ? Object.defineProperty(String, "fromCodePoint", {
        value: C,
        configurable: !0,
        writable: !0
      }) : String.fromCodePoint = C;
    }();
  })(e);
})(cc);
Object.defineProperty(Wn, "__esModule", { value: !0 });
Wn.XElement = void 0;
Wn.parseXml = Gp;
const jp = cc, mr = ln;
class uc {
  constructor(t) {
    if (this.name = t, this.value = "", this.attributes = null, this.isCData = !1, this.elements = null, !t)
      throw (0, mr.newError)("Element name cannot be empty", "ERR_XML_ELEMENT_NAME_EMPTY");
    if (!qp(t))
      throw (0, mr.newError)(`Invalid element name: ${t}`, "ERR_XML_ELEMENT_INVALID_NAME");
  }
  attribute(t) {
    const n = this.attributes === null ? null : this.attributes[t];
    if (n == null)
      throw (0, mr.newError)(`No attribute "${t}"`, "ERR_XML_MISSED_ATTRIBUTE");
    return n;
  }
  removeAttribute(t) {
    this.attributes !== null && delete this.attributes[t];
  }
  element(t, n = !1, r = null) {
    const i = this.elementOrNull(t, n);
    if (i === null)
      throw (0, mr.newError)(r || `No element "${t}"`, "ERR_XML_MISSED_ELEMENT");
    return i;
  }
  elementOrNull(t, n = !1) {
    if (this.elements === null)
      return null;
    for (const r of this.elements)
      if (ja(r, t, n))
        return r;
    return null;
  }
  getElements(t, n = !1) {
    return this.elements === null ? [] : this.elements.filter((r) => ja(r, t, n));
  }
  elementValueOrEmpty(t, n = !1) {
    const r = this.elementOrNull(t, n);
    return r === null ? "" : r.value;
  }
}
Wn.XElement = uc;
const Hp = new RegExp(/^[A-Za-z_][:A-Za-z0-9_-]*$/i);
function qp(e) {
  return Hp.test(e);
}
function ja(e, t, n) {
  const r = e.name;
  return r === t || n === !0 && r.length === t.length && r.toLowerCase() === t.toLowerCase();
}
function Gp(e) {
  let t = null;
  const n = jp.parser(!0, {}), r = [];
  return n.onopentag = (i) => {
    const o = new uc(i.name);
    if (o.attributes = i.attributes, t === null)
      t = o;
    else {
      const a = r[r.length - 1];
      a.elements == null && (a.elements = []), a.elements.push(o);
    }
    r.push(o);
  }, n.onclosetag = () => {
    r.pop();
  }, n.ontext = (i) => {
    r.length > 0 && (r[r.length - 1].value = i);
  }, n.oncdata = (i) => {
    const o = r[r.length - 1];
    o.value = i, o.isCData = !0;
  }, n.onerror = (i) => {
    throw i;
  }, n.write(e), t;
}
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.CURRENT_APP_PACKAGE_FILE_NAME = e.CURRENT_APP_INSTALLER_FILE_NAME = e.XElement = e.parseXml = e.UUID = e.parseDn = e.retry = e.githubUrl = e.getS3LikeProviderBaseUrl = e.ProgressCallbackTransform = e.MemoLazy = e.safeStringifyJson = e.safeGetHeader = e.parseJson = e.HttpExecutor = e.HttpError = e.DigestTransform = e.createHttpError = e.configureRequestUrl = e.configureRequestOptionsFromUrl = e.configureRequestOptions = e.newError = e.CancellationToken = e.CancellationError = void 0, e.asArray = f;
  var t = ht;
  Object.defineProperty(e, "CancellationError", { enumerable: !0, get: function() {
    return t.CancellationError;
  } }), Object.defineProperty(e, "CancellationToken", { enumerable: !0, get: function() {
    return t.CancellationToken;
  } });
  var n = ln;
  Object.defineProperty(e, "newError", { enumerable: !0, get: function() {
    return n.newError;
  } });
  var r = Ce;
  Object.defineProperty(e, "configureRequestOptions", { enumerable: !0, get: function() {
    return r.configureRequestOptions;
  } }), Object.defineProperty(e, "configureRequestOptionsFromUrl", { enumerable: !0, get: function() {
    return r.configureRequestOptionsFromUrl;
  } }), Object.defineProperty(e, "configureRequestUrl", { enumerable: !0, get: function() {
    return r.configureRequestUrl;
  } }), Object.defineProperty(e, "createHttpError", { enumerable: !0, get: function() {
    return r.createHttpError;
  } }), Object.defineProperty(e, "DigestTransform", { enumerable: !0, get: function() {
    return r.DigestTransform;
  } }), Object.defineProperty(e, "HttpError", { enumerable: !0, get: function() {
    return r.HttpError;
  } }), Object.defineProperty(e, "HttpExecutor", { enumerable: !0, get: function() {
    return r.HttpExecutor;
  } }), Object.defineProperty(e, "parseJson", { enumerable: !0, get: function() {
    return r.parseJson;
  } }), Object.defineProperty(e, "safeGetHeader", { enumerable: !0, get: function() {
    return r.safeGetHeader;
  } }), Object.defineProperty(e, "safeStringifyJson", { enumerable: !0, get: function() {
    return r.safeStringifyJson;
  } });
  var i = Xr;
  Object.defineProperty(e, "MemoLazy", { enumerable: !0, get: function() {
    return i.MemoLazy;
  } });
  var o = Vn;
  Object.defineProperty(e, "ProgressCallbackTransform", { enumerable: !0, get: function() {
    return o.ProgressCallbackTransform;
  } });
  var a = Kr;
  Object.defineProperty(e, "getS3LikeProviderBaseUrl", { enumerable: !0, get: function() {
    return a.getS3LikeProviderBaseUrl;
  } }), Object.defineProperty(e, "githubUrl", { enumerable: !0, get: function() {
    return a.githubUrl;
  } });
  var s = $o;
  Object.defineProperty(e, "retry", { enumerable: !0, get: function() {
    return s.retry;
  } });
  var l = Oo;
  Object.defineProperty(e, "parseDn", { enumerable: !0, get: function() {
    return l.parseDn;
  } });
  var m = nn;
  Object.defineProperty(e, "UUID", { enumerable: !0, get: function() {
    return m.UUID;
  } });
  var c = Wn;
  Object.defineProperty(e, "parseXml", { enumerable: !0, get: function() {
    return c.parseXml;
  } }), Object.defineProperty(e, "XElement", { enumerable: !0, get: function() {
    return c.XElement;
  } }), e.CURRENT_APP_INSTALLER_FILE_NAME = "installer.exe", e.CURRENT_APP_PACKAGE_FILE_NAME = "package.7z";
  function f(d) {
    return d == null ? [] : Array.isArray(d) ? d : [d];
  }
})(pe);
var ye = {}, Io = {}, je = {};
function fc(e) {
  return typeof e > "u" || e === null;
}
function Vp(e) {
  return typeof e == "object" && e !== null;
}
function Wp(e) {
  return Array.isArray(e) ? e : fc(e) ? [] : [e];
}
function Yp(e, t) {
  var n, r, i, o;
  if (t)
    for (o = Object.keys(t), n = 0, r = o.length; n < r; n += 1)
      i = o[n], e[i] = t[i];
  return e;
}
function zp(e, t) {
  var n = "", r;
  for (r = 0; r < t; r += 1)
    n += e;
  return n;
}
function Xp(e) {
  return e === 0 && Number.NEGATIVE_INFINITY === 1 / e;
}
je.isNothing = fc;
je.isObject = Vp;
je.toArray = Wp;
je.repeat = zp;
je.isNegativeZero = Xp;
je.extend = Yp;
function dc(e, t) {
  var n = "", r = e.reason || "(unknown reason)";
  return e.mark ? (e.mark.name && (n += 'in "' + e.mark.name + '" '), n += "(" + (e.mark.line + 1) + ":" + (e.mark.column + 1) + ")", !t && e.mark.snippet && (n += `

` + e.mark.snippet), r + " " + n) : r;
}
function Dn(e, t) {
  Error.call(this), this.name = "YAMLException", this.reason = e, this.mark = t, this.message = dc(this, !1), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack || "";
}
Dn.prototype = Object.create(Error.prototype);
Dn.prototype.constructor = Dn;
Dn.prototype.toString = function(t) {
  return this.name + ": " + dc(this, t);
};
var Yn = Dn, _n = je;
function Ii(e, t, n, r, i) {
  var o = "", a = "", s = Math.floor(i / 2) - 1;
  return r - t > s && (o = " ... ", t = r - s + o.length), n - r > s && (a = " ...", n = r + s - a.length), {
    str: o + e.slice(t, n).replace(/\t/g, "→") + a,
    pos: r - t + o.length
    // relative position
  };
}
function Ri(e, t) {
  return _n.repeat(" ", t - e.length) + e;
}
function Kp(e, t) {
  if (t = Object.create(t || null), !e.buffer) return null;
  t.maxLength || (t.maxLength = 79), typeof t.indent != "number" && (t.indent = 1), typeof t.linesBefore != "number" && (t.linesBefore = 3), typeof t.linesAfter != "number" && (t.linesAfter = 2);
  for (var n = /\r?\n|\r|\0/g, r = [0], i = [], o, a = -1; o = n.exec(e.buffer); )
    i.push(o.index), r.push(o.index + o[0].length), e.position <= o.index && a < 0 && (a = r.length - 2);
  a < 0 && (a = r.length - 1);
  var s = "", l, m, c = Math.min(e.line + t.linesAfter, i.length).toString().length, f = t.maxLength - (t.indent + c + 3);
  for (l = 1; l <= t.linesBefore && !(a - l < 0); l++)
    m = Ii(
      e.buffer,
      r[a - l],
      i[a - l],
      e.position - (r[a] - r[a - l]),
      f
    ), s = _n.repeat(" ", t.indent) + Ri((e.line - l + 1).toString(), c) + " | " + m.str + `
` + s;
  for (m = Ii(e.buffer, r[a], i[a], e.position, f), s += _n.repeat(" ", t.indent) + Ri((e.line + 1).toString(), c) + " | " + m.str + `
`, s += _n.repeat("-", t.indent + c + 3 + m.pos) + `^
`, l = 1; l <= t.linesAfter && !(a + l >= i.length); l++)
    m = Ii(
      e.buffer,
      r[a + l],
      i[a + l],
      e.position - (r[a] - r[a + l]),
      f
    ), s += _n.repeat(" ", t.indent) + Ri((e.line + l + 1).toString(), c) + " | " + m.str + `
`;
  return s.replace(/\n$/, "");
}
var Jp = Kp, Ha = Yn, Qp = [
  "kind",
  "multi",
  "resolve",
  "construct",
  "instanceOf",
  "predicate",
  "represent",
  "representName",
  "defaultStyle",
  "styleAliases"
], Zp = [
  "scalar",
  "sequence",
  "mapping"
];
function em(e) {
  var t = {};
  return e !== null && Object.keys(e).forEach(function(n) {
    e[n].forEach(function(r) {
      t[String(r)] = n;
    });
  }), t;
}
function tm(e, t) {
  if (t = t || {}, Object.keys(t).forEach(function(n) {
    if (Qp.indexOf(n) === -1)
      throw new Ha('Unknown option "' + n + '" is met in definition of "' + e + '" YAML type.');
  }), this.options = t, this.tag = e, this.kind = t.kind || null, this.resolve = t.resolve || function() {
    return !0;
  }, this.construct = t.construct || function(n) {
    return n;
  }, this.instanceOf = t.instanceOf || null, this.predicate = t.predicate || null, this.represent = t.represent || null, this.representName = t.representName || null, this.defaultStyle = t.defaultStyle || null, this.multi = t.multi || !1, this.styleAliases = em(t.styleAliases || null), Zp.indexOf(this.kind) === -1)
    throw new Ha('Unknown kind "' + this.kind + '" is specified for "' + e + '" YAML type.');
}
var Ie = tm, En = Yn, Pi = Ie;
function qa(e, t) {
  var n = [];
  return e[t].forEach(function(r) {
    var i = n.length;
    n.forEach(function(o, a) {
      o.tag === r.tag && o.kind === r.kind && o.multi === r.multi && (i = a);
    }), n[i] = r;
  }), n;
}
function nm() {
  var e = {
    scalar: {},
    sequence: {},
    mapping: {},
    fallback: {},
    multi: {
      scalar: [],
      sequence: [],
      mapping: [],
      fallback: []
    }
  }, t, n;
  function r(i) {
    i.multi ? (e.multi[i.kind].push(i), e.multi.fallback.push(i)) : e[i.kind][i.tag] = e.fallback[i.tag] = i;
  }
  for (t = 0, n = arguments.length; t < n; t += 1)
    arguments[t].forEach(r);
  return e;
}
function ro(e) {
  return this.extend(e);
}
ro.prototype.extend = function(t) {
  var n = [], r = [];
  if (t instanceof Pi)
    r.push(t);
  else if (Array.isArray(t))
    r = r.concat(t);
  else if (t && (Array.isArray(t.implicit) || Array.isArray(t.explicit)))
    t.implicit && (n = n.concat(t.implicit)), t.explicit && (r = r.concat(t.explicit));
  else
    throw new En("Schema.extend argument should be a Type, [ Type ], or a schema definition ({ implicit: [...], explicit: [...] })");
  n.forEach(function(o) {
    if (!(o instanceof Pi))
      throw new En("Specified list of YAML types (or a single Type object) contains a non-Type object.");
    if (o.loadKind && o.loadKind !== "scalar")
      throw new En("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.");
    if (o.multi)
      throw new En("There is a multi type in the implicit list of a schema. Multi tags can only be listed as explicit.");
  }), r.forEach(function(o) {
    if (!(o instanceof Pi))
      throw new En("Specified list of YAML types (or a single Type object) contains a non-Type object.");
  });
  var i = Object.create(ro.prototype);
  return i.implicit = (this.implicit || []).concat(n), i.explicit = (this.explicit || []).concat(r), i.compiledImplicit = qa(i, "implicit"), i.compiledExplicit = qa(i, "explicit"), i.compiledTypeMap = nm(i.compiledImplicit, i.compiledExplicit), i;
};
var hc = ro, rm = Ie, pc = new rm("tag:yaml.org,2002:str", {
  kind: "scalar",
  construct: function(e) {
    return e !== null ? e : "";
  }
}), im = Ie, mc = new im("tag:yaml.org,2002:seq", {
  kind: "sequence",
  construct: function(e) {
    return e !== null ? e : [];
  }
}), om = Ie, gc = new om("tag:yaml.org,2002:map", {
  kind: "mapping",
  construct: function(e) {
    return e !== null ? e : {};
  }
}), am = hc, Ec = new am({
  explicit: [
    pc,
    mc,
    gc
  ]
}), sm = Ie;
function lm(e) {
  if (e === null) return !0;
  var t = e.length;
  return t === 1 && e === "~" || t === 4 && (e === "null" || e === "Null" || e === "NULL");
}
function cm() {
  return null;
}
function um(e) {
  return e === null;
}
var yc = new sm("tag:yaml.org,2002:null", {
  kind: "scalar",
  resolve: lm,
  construct: cm,
  predicate: um,
  represent: {
    canonical: function() {
      return "~";
    },
    lowercase: function() {
      return "null";
    },
    uppercase: function() {
      return "NULL";
    },
    camelcase: function() {
      return "Null";
    },
    empty: function() {
      return "";
    }
  },
  defaultStyle: "lowercase"
}), fm = Ie;
function dm(e) {
  if (e === null) return !1;
  var t = e.length;
  return t === 4 && (e === "true" || e === "True" || e === "TRUE") || t === 5 && (e === "false" || e === "False" || e === "FALSE");
}
function hm(e) {
  return e === "true" || e === "True" || e === "TRUE";
}
function pm(e) {
  return Object.prototype.toString.call(e) === "[object Boolean]";
}
var vc = new fm("tag:yaml.org,2002:bool", {
  kind: "scalar",
  resolve: dm,
  construct: hm,
  predicate: pm,
  represent: {
    lowercase: function(e) {
      return e ? "true" : "false";
    },
    uppercase: function(e) {
      return e ? "TRUE" : "FALSE";
    },
    camelcase: function(e) {
      return e ? "True" : "False";
    }
  },
  defaultStyle: "lowercase"
}), mm = je, gm = Ie;
function Em(e) {
  return 48 <= e && e <= 57 || 65 <= e && e <= 70 || 97 <= e && e <= 102;
}
function ym(e) {
  return 48 <= e && e <= 55;
}
function vm(e) {
  return 48 <= e && e <= 57;
}
function wm(e) {
  if (e === null) return !1;
  var t = e.length, n = 0, r = !1, i;
  if (!t) return !1;
  if (i = e[n], (i === "-" || i === "+") && (i = e[++n]), i === "0") {
    if (n + 1 === t) return !0;
    if (i = e[++n], i === "b") {
      for (n++; n < t; n++)
        if (i = e[n], i !== "_") {
          if (i !== "0" && i !== "1") return !1;
          r = !0;
        }
      return r && i !== "_";
    }
    if (i === "x") {
      for (n++; n < t; n++)
        if (i = e[n], i !== "_") {
          if (!Em(e.charCodeAt(n))) return !1;
          r = !0;
        }
      return r && i !== "_";
    }
    if (i === "o") {
      for (n++; n < t; n++)
        if (i = e[n], i !== "_") {
          if (!ym(e.charCodeAt(n))) return !1;
          r = !0;
        }
      return r && i !== "_";
    }
  }
  if (i === "_") return !1;
  for (; n < t; n++)
    if (i = e[n], i !== "_") {
      if (!vm(e.charCodeAt(n)))
        return !1;
      r = !0;
    }
  return !(!r || i === "_");
}
function _m(e) {
  var t = e, n = 1, r;
  if (t.indexOf("_") !== -1 && (t = t.replace(/_/g, "")), r = t[0], (r === "-" || r === "+") && (r === "-" && (n = -1), t = t.slice(1), r = t[0]), t === "0") return 0;
  if (r === "0") {
    if (t[1] === "b") return n * parseInt(t.slice(2), 2);
    if (t[1] === "x") return n * parseInt(t.slice(2), 16);
    if (t[1] === "o") return n * parseInt(t.slice(2), 8);
  }
  return n * parseInt(t, 10);
}
function Sm(e) {
  return Object.prototype.toString.call(e) === "[object Number]" && e % 1 === 0 && !mm.isNegativeZero(e);
}
var wc = new gm("tag:yaml.org,2002:int", {
  kind: "scalar",
  resolve: wm,
  construct: _m,
  predicate: Sm,
  represent: {
    binary: function(e) {
      return e >= 0 ? "0b" + e.toString(2) : "-0b" + e.toString(2).slice(1);
    },
    octal: function(e) {
      return e >= 0 ? "0o" + e.toString(8) : "-0o" + e.toString(8).slice(1);
    },
    decimal: function(e) {
      return e.toString(10);
    },
    /* eslint-disable max-len */
    hexadecimal: function(e) {
      return e >= 0 ? "0x" + e.toString(16).toUpperCase() : "-0x" + e.toString(16).toUpperCase().slice(1);
    }
  },
  defaultStyle: "decimal",
  styleAliases: {
    binary: [2, "bin"],
    octal: [8, "oct"],
    decimal: [10, "dec"],
    hexadecimal: [16, "hex"]
  }
}), _c = je, Am = Ie, Tm = new RegExp(
  // 2.5e4, 2.5 and integers
  "^(?:[-+]?(?:[0-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"
);
function Cm(e) {
  return !(e === null || !Tm.test(e) || // Quick hack to not allow integers end with `_`
  // Probably should update regexp & check speed
  e[e.length - 1] === "_");
}
function bm(e) {
  var t, n;
  return t = e.replace(/_/g, "").toLowerCase(), n = t[0] === "-" ? -1 : 1, "+-".indexOf(t[0]) >= 0 && (t = t.slice(1)), t === ".inf" ? n === 1 ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY : t === ".nan" ? NaN : n * parseFloat(t, 10);
}
var $m = /^[-+]?[0-9]+e/;
function Om(e, t) {
  var n;
  if (isNaN(e))
    switch (t) {
      case "lowercase":
        return ".nan";
      case "uppercase":
        return ".NAN";
      case "camelcase":
        return ".NaN";
    }
  else if (Number.POSITIVE_INFINITY === e)
    switch (t) {
      case "lowercase":
        return ".inf";
      case "uppercase":
        return ".INF";
      case "camelcase":
        return ".Inf";
    }
  else if (Number.NEGATIVE_INFINITY === e)
    switch (t) {
      case "lowercase":
        return "-.inf";
      case "uppercase":
        return "-.INF";
      case "camelcase":
        return "-.Inf";
    }
  else if (_c.isNegativeZero(e))
    return "-0.0";
  return n = e.toString(10), $m.test(n) ? n.replace("e", ".e") : n;
}
function Im(e) {
  return Object.prototype.toString.call(e) === "[object Number]" && (e % 1 !== 0 || _c.isNegativeZero(e));
}
var Sc = new Am("tag:yaml.org,2002:float", {
  kind: "scalar",
  resolve: Cm,
  construct: bm,
  predicate: Im,
  represent: Om,
  defaultStyle: "lowercase"
}), Ac = Ec.extend({
  implicit: [
    yc,
    vc,
    wc,
    Sc
  ]
}), Tc = Ac, Rm = Ie, Cc = new RegExp(
  "^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"
), bc = new RegExp(
  "^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$"
);
function Pm(e) {
  return e === null ? !1 : Cc.exec(e) !== null || bc.exec(e) !== null;
}
function Dm(e) {
  var t, n, r, i, o, a, s, l = 0, m = null, c, f, d;
  if (t = Cc.exec(e), t === null && (t = bc.exec(e)), t === null) throw new Error("Date resolve error");
  if (n = +t[1], r = +t[2] - 1, i = +t[3], !t[4])
    return new Date(Date.UTC(n, r, i));
  if (o = +t[4], a = +t[5], s = +t[6], t[7]) {
    for (l = t[7].slice(0, 3); l.length < 3; )
      l += "0";
    l = +l;
  }
  return t[9] && (c = +t[10], f = +(t[11] || 0), m = (c * 60 + f) * 6e4, t[9] === "-" && (m = -m)), d = new Date(Date.UTC(n, r, i, o, a, s, l)), m && d.setTime(d.getTime() - m), d;
}
function Nm(e) {
  return e.toISOString();
}
var $c = new Rm("tag:yaml.org,2002:timestamp", {
  kind: "scalar",
  resolve: Pm,
  construct: Dm,
  instanceOf: Date,
  represent: Nm
}), Fm = Ie;
function xm(e) {
  return e === "<<" || e === null;
}
var Oc = new Fm("tag:yaml.org,2002:merge", {
  kind: "scalar",
  resolve: xm
}), Lm = Ie, Ro = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=
\r`;
function Um(e) {
  if (e === null) return !1;
  var t, n, r = 0, i = e.length, o = Ro;
  for (n = 0; n < i; n++)
    if (t = o.indexOf(e.charAt(n)), !(t > 64)) {
      if (t < 0) return !1;
      r += 6;
    }
  return r % 8 === 0;
}
function km(e) {
  var t, n, r = e.replace(/[\r\n=]/g, ""), i = r.length, o = Ro, a = 0, s = [];
  for (t = 0; t < i; t++)
    t % 4 === 0 && t && (s.push(a >> 16 & 255), s.push(a >> 8 & 255), s.push(a & 255)), a = a << 6 | o.indexOf(r.charAt(t));
  return n = i % 4 * 6, n === 0 ? (s.push(a >> 16 & 255), s.push(a >> 8 & 255), s.push(a & 255)) : n === 18 ? (s.push(a >> 10 & 255), s.push(a >> 2 & 255)) : n === 12 && s.push(a >> 4 & 255), new Uint8Array(s);
}
function Mm(e) {
  var t = "", n = 0, r, i, o = e.length, a = Ro;
  for (r = 0; r < o; r++)
    r % 3 === 0 && r && (t += a[n >> 18 & 63], t += a[n >> 12 & 63], t += a[n >> 6 & 63], t += a[n & 63]), n = (n << 8) + e[r];
  return i = o % 3, i === 0 ? (t += a[n >> 18 & 63], t += a[n >> 12 & 63], t += a[n >> 6 & 63], t += a[n & 63]) : i === 2 ? (t += a[n >> 10 & 63], t += a[n >> 4 & 63], t += a[n << 2 & 63], t += a[64]) : i === 1 && (t += a[n >> 2 & 63], t += a[n << 4 & 63], t += a[64], t += a[64]), t;
}
function Bm(e) {
  return Object.prototype.toString.call(e) === "[object Uint8Array]";
}
var Ic = new Lm("tag:yaml.org,2002:binary", {
  kind: "scalar",
  resolve: Um,
  construct: km,
  predicate: Bm,
  represent: Mm
}), jm = Ie, Hm = Object.prototype.hasOwnProperty, qm = Object.prototype.toString;
function Gm(e) {
  if (e === null) return !0;
  var t = [], n, r, i, o, a, s = e;
  for (n = 0, r = s.length; n < r; n += 1) {
    if (i = s[n], a = !1, qm.call(i) !== "[object Object]") return !1;
    for (o in i)
      if (Hm.call(i, o))
        if (!a) a = !0;
        else return !1;
    if (!a) return !1;
    if (t.indexOf(o) === -1) t.push(o);
    else return !1;
  }
  return !0;
}
function Vm(e) {
  return e !== null ? e : [];
}
var Rc = new jm("tag:yaml.org,2002:omap", {
  kind: "sequence",
  resolve: Gm,
  construct: Vm
}), Wm = Ie, Ym = Object.prototype.toString;
function zm(e) {
  if (e === null) return !0;
  var t, n, r, i, o, a = e;
  for (o = new Array(a.length), t = 0, n = a.length; t < n; t += 1) {
    if (r = a[t], Ym.call(r) !== "[object Object]" || (i = Object.keys(r), i.length !== 1)) return !1;
    o[t] = [i[0], r[i[0]]];
  }
  return !0;
}
function Xm(e) {
  if (e === null) return [];
  var t, n, r, i, o, a = e;
  for (o = new Array(a.length), t = 0, n = a.length; t < n; t += 1)
    r = a[t], i = Object.keys(r), o[t] = [i[0], r[i[0]]];
  return o;
}
var Pc = new Wm("tag:yaml.org,2002:pairs", {
  kind: "sequence",
  resolve: zm,
  construct: Xm
}), Km = Ie, Jm = Object.prototype.hasOwnProperty;
function Qm(e) {
  if (e === null) return !0;
  var t, n = e;
  for (t in n)
    if (Jm.call(n, t) && n[t] !== null)
      return !1;
  return !0;
}
function Zm(e) {
  return e !== null ? e : {};
}
var Dc = new Km("tag:yaml.org,2002:set", {
  kind: "mapping",
  resolve: Qm,
  construct: Zm
}), Po = Tc.extend({
  implicit: [
    $c,
    Oc
  ],
  explicit: [
    Ic,
    Rc,
    Pc,
    Dc
  ]
}), $t = je, Nc = Yn, eg = Jp, tg = Po, pt = Object.prototype.hasOwnProperty, Ur = 1, Fc = 2, xc = 3, kr = 4, Di = 1, ng = 2, Ga = 3, rg = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/, ig = /[\x85\u2028\u2029]/, og = /[,\[\]\{\}]/, Lc = /^(?:!|!!|![a-z\-]+!)$/i, Uc = /^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;
function Va(e) {
  return Object.prototype.toString.call(e);
}
function Ye(e) {
  return e === 10 || e === 13;
}
function Rt(e) {
  return e === 9 || e === 32;
}
function De(e) {
  return e === 9 || e === 32 || e === 10 || e === 13;
}
function Yt(e) {
  return e === 44 || e === 91 || e === 93 || e === 123 || e === 125;
}
function ag(e) {
  var t;
  return 48 <= e && e <= 57 ? e - 48 : (t = e | 32, 97 <= t && t <= 102 ? t - 97 + 10 : -1);
}
function sg(e) {
  return e === 120 ? 2 : e === 117 ? 4 : e === 85 ? 8 : 0;
}
function lg(e) {
  return 48 <= e && e <= 57 ? e - 48 : -1;
}
function Wa(e) {
  return e === 48 ? "\0" : e === 97 ? "\x07" : e === 98 ? "\b" : e === 116 || e === 9 ? "	" : e === 110 ? `
` : e === 118 ? "\v" : e === 102 ? "\f" : e === 114 ? "\r" : e === 101 ? "\x1B" : e === 32 ? " " : e === 34 ? '"' : e === 47 ? "/" : e === 92 ? "\\" : e === 78 ? "" : e === 95 ? " " : e === 76 ? "\u2028" : e === 80 ? "\u2029" : "";
}
function cg(e) {
  return e <= 65535 ? String.fromCharCode(e) : String.fromCharCode(
    (e - 65536 >> 10) + 55296,
    (e - 65536 & 1023) + 56320
  );
}
var kc = new Array(256), Mc = new Array(256);
for (var Mt = 0; Mt < 256; Mt++)
  kc[Mt] = Wa(Mt) ? 1 : 0, Mc[Mt] = Wa(Mt);
function ug(e, t) {
  this.input = e, this.filename = t.filename || null, this.schema = t.schema || tg, this.onWarning = t.onWarning || null, this.legacy = t.legacy || !1, this.json = t.json || !1, this.listener = t.listener || null, this.implicitTypes = this.schema.compiledImplicit, this.typeMap = this.schema.compiledTypeMap, this.length = e.length, this.position = 0, this.line = 0, this.lineStart = 0, this.lineIndent = 0, this.firstTabInLine = -1, this.documents = [];
}
function Bc(e, t) {
  var n = {
    name: e.filename,
    buffer: e.input.slice(0, -1),
    // omit trailing \0
    position: e.position,
    line: e.line,
    column: e.position - e.lineStart
  };
  return n.snippet = eg(n), new Nc(t, n);
}
function L(e, t) {
  throw Bc(e, t);
}
function Mr(e, t) {
  e.onWarning && e.onWarning.call(null, Bc(e, t));
}
var Ya = {
  YAML: function(t, n, r) {
    var i, o, a;
    t.version !== null && L(t, "duplication of %YAML directive"), r.length !== 1 && L(t, "YAML directive accepts exactly one argument"), i = /^([0-9]+)\.([0-9]+)$/.exec(r[0]), i === null && L(t, "ill-formed argument of the YAML directive"), o = parseInt(i[1], 10), a = parseInt(i[2], 10), o !== 1 && L(t, "unacceptable YAML version of the document"), t.version = r[0], t.checkLineBreaks = a < 2, a !== 1 && a !== 2 && Mr(t, "unsupported YAML version of the document");
  },
  TAG: function(t, n, r) {
    var i, o;
    r.length !== 2 && L(t, "TAG directive accepts exactly two arguments"), i = r[0], o = r[1], Lc.test(i) || L(t, "ill-formed tag handle (first argument) of the TAG directive"), pt.call(t.tagMap, i) && L(t, 'there is a previously declared suffix for "' + i + '" tag handle'), Uc.test(o) || L(t, "ill-formed tag prefix (second argument) of the TAG directive");
    try {
      o = decodeURIComponent(o);
    } catch {
      L(t, "tag prefix is malformed: " + o);
    }
    t.tagMap[i] = o;
  }
};
function ft(e, t, n, r) {
  var i, o, a, s;
  if (t < n) {
    if (s = e.input.slice(t, n), r)
      for (i = 0, o = s.length; i < o; i += 1)
        a = s.charCodeAt(i), a === 9 || 32 <= a && a <= 1114111 || L(e, "expected valid JSON character");
    else rg.test(s) && L(e, "the stream contains non-printable characters");
    e.result += s;
  }
}
function za(e, t, n, r) {
  var i, o, a, s;
  for ($t.isObject(n) || L(e, "cannot merge mappings; the provided source object is unacceptable"), i = Object.keys(n), a = 0, s = i.length; a < s; a += 1)
    o = i[a], pt.call(t, o) || (t[o] = n[o], r[o] = !0);
}
function zt(e, t, n, r, i, o, a, s, l) {
  var m, c;
  if (Array.isArray(i))
    for (i = Array.prototype.slice.call(i), m = 0, c = i.length; m < c; m += 1)
      Array.isArray(i[m]) && L(e, "nested arrays are not supported inside keys"), typeof i == "object" && Va(i[m]) === "[object Object]" && (i[m] = "[object Object]");
  if (typeof i == "object" && Va(i) === "[object Object]" && (i = "[object Object]"), i = String(i), t === null && (t = {}), r === "tag:yaml.org,2002:merge")
    if (Array.isArray(o))
      for (m = 0, c = o.length; m < c; m += 1)
        za(e, t, o[m], n);
    else
      za(e, t, o, n);
  else
    !e.json && !pt.call(n, i) && pt.call(t, i) && (e.line = a || e.line, e.lineStart = s || e.lineStart, e.position = l || e.position, L(e, "duplicated mapping key")), i === "__proto__" ? Object.defineProperty(t, i, {
      configurable: !0,
      enumerable: !0,
      writable: !0,
      value: o
    }) : t[i] = o, delete n[i];
  return t;
}
function Do(e) {
  var t;
  t = e.input.charCodeAt(e.position), t === 10 ? e.position++ : t === 13 ? (e.position++, e.input.charCodeAt(e.position) === 10 && e.position++) : L(e, "a line break is expected"), e.line += 1, e.lineStart = e.position, e.firstTabInLine = -1;
}
function se(e, t, n) {
  for (var r = 0, i = e.input.charCodeAt(e.position); i !== 0; ) {
    for (; Rt(i); )
      i === 9 && e.firstTabInLine === -1 && (e.firstTabInLine = e.position), i = e.input.charCodeAt(++e.position);
    if (t && i === 35)
      do
        i = e.input.charCodeAt(++e.position);
      while (i !== 10 && i !== 13 && i !== 0);
    if (Ye(i))
      for (Do(e), i = e.input.charCodeAt(e.position), r++, e.lineIndent = 0; i === 32; )
        e.lineIndent++, i = e.input.charCodeAt(++e.position);
    else
      break;
  }
  return n !== -1 && r !== 0 && e.lineIndent < n && Mr(e, "deficient indentation"), r;
}
function Jr(e) {
  var t = e.position, n;
  return n = e.input.charCodeAt(t), !!((n === 45 || n === 46) && n === e.input.charCodeAt(t + 1) && n === e.input.charCodeAt(t + 2) && (t += 3, n = e.input.charCodeAt(t), n === 0 || De(n)));
}
function No(e, t) {
  t === 1 ? e.result += " " : t > 1 && (e.result += $t.repeat(`
`, t - 1));
}
function fg(e, t, n) {
  var r, i, o, a, s, l, m, c, f = e.kind, d = e.result, g;
  if (g = e.input.charCodeAt(e.position), De(g) || Yt(g) || g === 35 || g === 38 || g === 42 || g === 33 || g === 124 || g === 62 || g === 39 || g === 34 || g === 37 || g === 64 || g === 96 || (g === 63 || g === 45) && (i = e.input.charCodeAt(e.position + 1), De(i) || n && Yt(i)))
    return !1;
  for (e.kind = "scalar", e.result = "", o = a = e.position, s = !1; g !== 0; ) {
    if (g === 58) {
      if (i = e.input.charCodeAt(e.position + 1), De(i) || n && Yt(i))
        break;
    } else if (g === 35) {
      if (r = e.input.charCodeAt(e.position - 1), De(r))
        break;
    } else {
      if (e.position === e.lineStart && Jr(e) || n && Yt(g))
        break;
      if (Ye(g))
        if (l = e.line, m = e.lineStart, c = e.lineIndent, se(e, !1, -1), e.lineIndent >= t) {
          s = !0, g = e.input.charCodeAt(e.position);
          continue;
        } else {
          e.position = a, e.line = l, e.lineStart = m, e.lineIndent = c;
          break;
        }
    }
    s && (ft(e, o, a, !1), No(e, e.line - l), o = a = e.position, s = !1), Rt(g) || (a = e.position + 1), g = e.input.charCodeAt(++e.position);
  }
  return ft(e, o, a, !1), e.result ? !0 : (e.kind = f, e.result = d, !1);
}
function dg(e, t) {
  var n, r, i;
  if (n = e.input.charCodeAt(e.position), n !== 39)
    return !1;
  for (e.kind = "scalar", e.result = "", e.position++, r = i = e.position; (n = e.input.charCodeAt(e.position)) !== 0; )
    if (n === 39)
      if (ft(e, r, e.position, !0), n = e.input.charCodeAt(++e.position), n === 39)
        r = e.position, e.position++, i = e.position;
      else
        return !0;
    else Ye(n) ? (ft(e, r, i, !0), No(e, se(e, !1, t)), r = i = e.position) : e.position === e.lineStart && Jr(e) ? L(e, "unexpected end of the document within a single quoted scalar") : (e.position++, i = e.position);
  L(e, "unexpected end of the stream within a single quoted scalar");
}
function hg(e, t) {
  var n, r, i, o, a, s;
  if (s = e.input.charCodeAt(e.position), s !== 34)
    return !1;
  for (e.kind = "scalar", e.result = "", e.position++, n = r = e.position; (s = e.input.charCodeAt(e.position)) !== 0; ) {
    if (s === 34)
      return ft(e, n, e.position, !0), e.position++, !0;
    if (s === 92) {
      if (ft(e, n, e.position, !0), s = e.input.charCodeAt(++e.position), Ye(s))
        se(e, !1, t);
      else if (s < 256 && kc[s])
        e.result += Mc[s], e.position++;
      else if ((a = sg(s)) > 0) {
        for (i = a, o = 0; i > 0; i--)
          s = e.input.charCodeAt(++e.position), (a = ag(s)) >= 0 ? o = (o << 4) + a : L(e, "expected hexadecimal character");
        e.result += cg(o), e.position++;
      } else
        L(e, "unknown escape sequence");
      n = r = e.position;
    } else Ye(s) ? (ft(e, n, r, !0), No(e, se(e, !1, t)), n = r = e.position) : e.position === e.lineStart && Jr(e) ? L(e, "unexpected end of the document within a double quoted scalar") : (e.position++, r = e.position);
  }
  L(e, "unexpected end of the stream within a double quoted scalar");
}
function pg(e, t) {
  var n = !0, r, i, o, a = e.tag, s, l = e.anchor, m, c, f, d, g, w = /* @__PURE__ */ Object.create(null), y, S, T, A;
  if (A = e.input.charCodeAt(e.position), A === 91)
    c = 93, g = !1, s = [];
  else if (A === 123)
    c = 125, g = !0, s = {};
  else
    return !1;
  for (e.anchor !== null && (e.anchorMap[e.anchor] = s), A = e.input.charCodeAt(++e.position); A !== 0; ) {
    if (se(e, !0, t), A = e.input.charCodeAt(e.position), A === c)
      return e.position++, e.tag = a, e.anchor = l, e.kind = g ? "mapping" : "sequence", e.result = s, !0;
    n ? A === 44 && L(e, "expected the node content, but found ','") : L(e, "missed comma between flow collection entries"), S = y = T = null, f = d = !1, A === 63 && (m = e.input.charCodeAt(e.position + 1), De(m) && (f = d = !0, e.position++, se(e, !0, t))), r = e.line, i = e.lineStart, o = e.position, rn(e, t, Ur, !1, !0), S = e.tag, y = e.result, se(e, !0, t), A = e.input.charCodeAt(e.position), (d || e.line === r) && A === 58 && (f = !0, A = e.input.charCodeAt(++e.position), se(e, !0, t), rn(e, t, Ur, !1, !0), T = e.result), g ? zt(e, s, w, S, y, T, r, i, o) : f ? s.push(zt(e, null, w, S, y, T, r, i, o)) : s.push(y), se(e, !0, t), A = e.input.charCodeAt(e.position), A === 44 ? (n = !0, A = e.input.charCodeAt(++e.position)) : n = !1;
  }
  L(e, "unexpected end of the stream within a flow collection");
}
function mg(e, t) {
  var n, r, i = Di, o = !1, a = !1, s = t, l = 0, m = !1, c, f;
  if (f = e.input.charCodeAt(e.position), f === 124)
    r = !1;
  else if (f === 62)
    r = !0;
  else
    return !1;
  for (e.kind = "scalar", e.result = ""; f !== 0; )
    if (f = e.input.charCodeAt(++e.position), f === 43 || f === 45)
      Di === i ? i = f === 43 ? Ga : ng : L(e, "repeat of a chomping mode identifier");
    else if ((c = lg(f)) >= 0)
      c === 0 ? L(e, "bad explicit indentation width of a block scalar; it cannot be less than one") : a ? L(e, "repeat of an indentation width identifier") : (s = t + c - 1, a = !0);
    else
      break;
  if (Rt(f)) {
    do
      f = e.input.charCodeAt(++e.position);
    while (Rt(f));
    if (f === 35)
      do
        f = e.input.charCodeAt(++e.position);
      while (!Ye(f) && f !== 0);
  }
  for (; f !== 0; ) {
    for (Do(e), e.lineIndent = 0, f = e.input.charCodeAt(e.position); (!a || e.lineIndent < s) && f === 32; )
      e.lineIndent++, f = e.input.charCodeAt(++e.position);
    if (!a && e.lineIndent > s && (s = e.lineIndent), Ye(f)) {
      l++;
      continue;
    }
    if (e.lineIndent < s) {
      i === Ga ? e.result += $t.repeat(`
`, o ? 1 + l : l) : i === Di && o && (e.result += `
`);
      break;
    }
    for (r ? Rt(f) ? (m = !0, e.result += $t.repeat(`
`, o ? 1 + l : l)) : m ? (m = !1, e.result += $t.repeat(`
`, l + 1)) : l === 0 ? o && (e.result += " ") : e.result += $t.repeat(`
`, l) : e.result += $t.repeat(`
`, o ? 1 + l : l), o = !0, a = !0, l = 0, n = e.position; !Ye(f) && f !== 0; )
      f = e.input.charCodeAt(++e.position);
    ft(e, n, e.position, !1);
  }
  return !0;
}
function Xa(e, t) {
  var n, r = e.tag, i = e.anchor, o = [], a, s = !1, l;
  if (e.firstTabInLine !== -1) return !1;
  for (e.anchor !== null && (e.anchorMap[e.anchor] = o), l = e.input.charCodeAt(e.position); l !== 0 && (e.firstTabInLine !== -1 && (e.position = e.firstTabInLine, L(e, "tab characters must not be used in indentation")), !(l !== 45 || (a = e.input.charCodeAt(e.position + 1), !De(a)))); ) {
    if (s = !0, e.position++, se(e, !0, -1) && e.lineIndent <= t) {
      o.push(null), l = e.input.charCodeAt(e.position);
      continue;
    }
    if (n = e.line, rn(e, t, xc, !1, !0), o.push(e.result), se(e, !0, -1), l = e.input.charCodeAt(e.position), (e.line === n || e.lineIndent > t) && l !== 0)
      L(e, "bad indentation of a sequence entry");
    else if (e.lineIndent < t)
      break;
  }
  return s ? (e.tag = r, e.anchor = i, e.kind = "sequence", e.result = o, !0) : !1;
}
function gg(e, t, n) {
  var r, i, o, a, s, l, m = e.tag, c = e.anchor, f = {}, d = /* @__PURE__ */ Object.create(null), g = null, w = null, y = null, S = !1, T = !1, A;
  if (e.firstTabInLine !== -1) return !1;
  for (e.anchor !== null && (e.anchorMap[e.anchor] = f), A = e.input.charCodeAt(e.position); A !== 0; ) {
    if (!S && e.firstTabInLine !== -1 && (e.position = e.firstTabInLine, L(e, "tab characters must not be used in indentation")), r = e.input.charCodeAt(e.position + 1), o = e.line, (A === 63 || A === 58) && De(r))
      A === 63 ? (S && (zt(e, f, d, g, w, null, a, s, l), g = w = y = null), T = !0, S = !0, i = !0) : S ? (S = !1, i = !0) : L(e, "incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line"), e.position += 1, A = r;
    else {
      if (a = e.line, s = e.lineStart, l = e.position, !rn(e, n, Fc, !1, !0))
        break;
      if (e.line === o) {
        for (A = e.input.charCodeAt(e.position); Rt(A); )
          A = e.input.charCodeAt(++e.position);
        if (A === 58)
          A = e.input.charCodeAt(++e.position), De(A) || L(e, "a whitespace character is expected after the key-value separator within a block mapping"), S && (zt(e, f, d, g, w, null, a, s, l), g = w = y = null), T = !0, S = !1, i = !1, g = e.tag, w = e.result;
        else if (T)
          L(e, "can not read an implicit mapping pair; a colon is missed");
        else
          return e.tag = m, e.anchor = c, !0;
      } else if (T)
        L(e, "can not read a block mapping entry; a multiline key may not be an implicit key");
      else
        return e.tag = m, e.anchor = c, !0;
    }
    if ((e.line === o || e.lineIndent > t) && (S && (a = e.line, s = e.lineStart, l = e.position), rn(e, t, kr, !0, i) && (S ? w = e.result : y = e.result), S || (zt(e, f, d, g, w, y, a, s, l), g = w = y = null), se(e, !0, -1), A = e.input.charCodeAt(e.position)), (e.line === o || e.lineIndent > t) && A !== 0)
      L(e, "bad indentation of a mapping entry");
    else if (e.lineIndent < t)
      break;
  }
  return S && zt(e, f, d, g, w, null, a, s, l), T && (e.tag = m, e.anchor = c, e.kind = "mapping", e.result = f), T;
}
function Eg(e) {
  var t, n = !1, r = !1, i, o, a;
  if (a = e.input.charCodeAt(e.position), a !== 33) return !1;
  if (e.tag !== null && L(e, "duplication of a tag property"), a = e.input.charCodeAt(++e.position), a === 60 ? (n = !0, a = e.input.charCodeAt(++e.position)) : a === 33 ? (r = !0, i = "!!", a = e.input.charCodeAt(++e.position)) : i = "!", t = e.position, n) {
    do
      a = e.input.charCodeAt(++e.position);
    while (a !== 0 && a !== 62);
    e.position < e.length ? (o = e.input.slice(t, e.position), a = e.input.charCodeAt(++e.position)) : L(e, "unexpected end of the stream within a verbatim tag");
  } else {
    for (; a !== 0 && !De(a); )
      a === 33 && (r ? L(e, "tag suffix cannot contain exclamation marks") : (i = e.input.slice(t - 1, e.position + 1), Lc.test(i) || L(e, "named tag handle cannot contain such characters"), r = !0, t = e.position + 1)), a = e.input.charCodeAt(++e.position);
    o = e.input.slice(t, e.position), og.test(o) && L(e, "tag suffix cannot contain flow indicator characters");
  }
  o && !Uc.test(o) && L(e, "tag name cannot contain such characters: " + o);
  try {
    o = decodeURIComponent(o);
  } catch {
    L(e, "tag name is malformed: " + o);
  }
  return n ? e.tag = o : pt.call(e.tagMap, i) ? e.tag = e.tagMap[i] + o : i === "!" ? e.tag = "!" + o : i === "!!" ? e.tag = "tag:yaml.org,2002:" + o : L(e, 'undeclared tag handle "' + i + '"'), !0;
}
function yg(e) {
  var t, n;
  if (n = e.input.charCodeAt(e.position), n !== 38) return !1;
  for (e.anchor !== null && L(e, "duplication of an anchor property"), n = e.input.charCodeAt(++e.position), t = e.position; n !== 0 && !De(n) && !Yt(n); )
    n = e.input.charCodeAt(++e.position);
  return e.position === t && L(e, "name of an anchor node must contain at least one character"), e.anchor = e.input.slice(t, e.position), !0;
}
function vg(e) {
  var t, n, r;
  if (r = e.input.charCodeAt(e.position), r !== 42) return !1;
  for (r = e.input.charCodeAt(++e.position), t = e.position; r !== 0 && !De(r) && !Yt(r); )
    r = e.input.charCodeAt(++e.position);
  return e.position === t && L(e, "name of an alias node must contain at least one character"), n = e.input.slice(t, e.position), pt.call(e.anchorMap, n) || L(e, 'unidentified alias "' + n + '"'), e.result = e.anchorMap[n], se(e, !0, -1), !0;
}
function rn(e, t, n, r, i) {
  var o, a, s, l = 1, m = !1, c = !1, f, d, g, w, y, S;
  if (e.listener !== null && e.listener("open", e), e.tag = null, e.anchor = null, e.kind = null, e.result = null, o = a = s = kr === n || xc === n, r && se(e, !0, -1) && (m = !0, e.lineIndent > t ? l = 1 : e.lineIndent === t ? l = 0 : e.lineIndent < t && (l = -1)), l === 1)
    for (; Eg(e) || yg(e); )
      se(e, !0, -1) ? (m = !0, s = o, e.lineIndent > t ? l = 1 : e.lineIndent === t ? l = 0 : e.lineIndent < t && (l = -1)) : s = !1;
  if (s && (s = m || i), (l === 1 || kr === n) && (Ur === n || Fc === n ? y = t : y = t + 1, S = e.position - e.lineStart, l === 1 ? s && (Xa(e, S) || gg(e, S, y)) || pg(e, y) ? c = !0 : (a && mg(e, y) || dg(e, y) || hg(e, y) ? c = !0 : vg(e) ? (c = !0, (e.tag !== null || e.anchor !== null) && L(e, "alias node should not have any properties")) : fg(e, y, Ur === n) && (c = !0, e.tag === null && (e.tag = "?")), e.anchor !== null && (e.anchorMap[e.anchor] = e.result)) : l === 0 && (c = s && Xa(e, S))), e.tag === null)
    e.anchor !== null && (e.anchorMap[e.anchor] = e.result);
  else if (e.tag === "?") {
    for (e.result !== null && e.kind !== "scalar" && L(e, 'unacceptable node kind for !<?> tag; it should be "scalar", not "' + e.kind + '"'), f = 0, d = e.implicitTypes.length; f < d; f += 1)
      if (w = e.implicitTypes[f], w.resolve(e.result)) {
        e.result = w.construct(e.result), e.tag = w.tag, e.anchor !== null && (e.anchorMap[e.anchor] = e.result);
        break;
      }
  } else if (e.tag !== "!") {
    if (pt.call(e.typeMap[e.kind || "fallback"], e.tag))
      w = e.typeMap[e.kind || "fallback"][e.tag];
    else
      for (w = null, g = e.typeMap.multi[e.kind || "fallback"], f = 0, d = g.length; f < d; f += 1)
        if (e.tag.slice(0, g[f].tag.length) === g[f].tag) {
          w = g[f];
          break;
        }
    w || L(e, "unknown tag !<" + e.tag + ">"), e.result !== null && w.kind !== e.kind && L(e, "unacceptable node kind for !<" + e.tag + '> tag; it should be "' + w.kind + '", not "' + e.kind + '"'), w.resolve(e.result, e.tag) ? (e.result = w.construct(e.result, e.tag), e.anchor !== null && (e.anchorMap[e.anchor] = e.result)) : L(e, "cannot resolve a node with !<" + e.tag + "> explicit tag");
  }
  return e.listener !== null && e.listener("close", e), e.tag !== null || e.anchor !== null || c;
}
function wg(e) {
  var t = e.position, n, r, i, o = !1, a;
  for (e.version = null, e.checkLineBreaks = e.legacy, e.tagMap = /* @__PURE__ */ Object.create(null), e.anchorMap = /* @__PURE__ */ Object.create(null); (a = e.input.charCodeAt(e.position)) !== 0 && (se(e, !0, -1), a = e.input.charCodeAt(e.position), !(e.lineIndent > 0 || a !== 37)); ) {
    for (o = !0, a = e.input.charCodeAt(++e.position), n = e.position; a !== 0 && !De(a); )
      a = e.input.charCodeAt(++e.position);
    for (r = e.input.slice(n, e.position), i = [], r.length < 1 && L(e, "directive name must not be less than one character in length"); a !== 0; ) {
      for (; Rt(a); )
        a = e.input.charCodeAt(++e.position);
      if (a === 35) {
        do
          a = e.input.charCodeAt(++e.position);
        while (a !== 0 && !Ye(a));
        break;
      }
      if (Ye(a)) break;
      for (n = e.position; a !== 0 && !De(a); )
        a = e.input.charCodeAt(++e.position);
      i.push(e.input.slice(n, e.position));
    }
    a !== 0 && Do(e), pt.call(Ya, r) ? Ya[r](e, r, i) : Mr(e, 'unknown document directive "' + r + '"');
  }
  if (se(e, !0, -1), e.lineIndent === 0 && e.input.charCodeAt(e.position) === 45 && e.input.charCodeAt(e.position + 1) === 45 && e.input.charCodeAt(e.position + 2) === 45 ? (e.position += 3, se(e, !0, -1)) : o && L(e, "directives end mark is expected"), rn(e, e.lineIndent - 1, kr, !1, !0), se(e, !0, -1), e.checkLineBreaks && ig.test(e.input.slice(t, e.position)) && Mr(e, "non-ASCII line breaks are interpreted as content"), e.documents.push(e.result), e.position === e.lineStart && Jr(e)) {
    e.input.charCodeAt(e.position) === 46 && (e.position += 3, se(e, !0, -1));
    return;
  }
  if (e.position < e.length - 1)
    L(e, "end of the stream or a document separator is expected");
  else
    return;
}
function jc(e, t) {
  e = String(e), t = t || {}, e.length !== 0 && (e.charCodeAt(e.length - 1) !== 10 && e.charCodeAt(e.length - 1) !== 13 && (e += `
`), e.charCodeAt(0) === 65279 && (e = e.slice(1)));
  var n = new ug(e, t), r = e.indexOf("\0");
  for (r !== -1 && (n.position = r, L(n, "null byte is not allowed in input")), n.input += "\0"; n.input.charCodeAt(n.position) === 32; )
    n.lineIndent += 1, n.position += 1;
  for (; n.position < n.length - 1; )
    wg(n);
  return n.documents;
}
function _g(e, t, n) {
  t !== null && typeof t == "object" && typeof n > "u" && (n = t, t = null);
  var r = jc(e, n);
  if (typeof t != "function")
    return r;
  for (var i = 0, o = r.length; i < o; i += 1)
    t(r[i]);
}
function Sg(e, t) {
  var n = jc(e, t);
  if (n.length !== 0) {
    if (n.length === 1)
      return n[0];
    throw new Nc("expected a single document in the stream, but found more");
  }
}
Io.loadAll = _g;
Io.load = Sg;
var Hc = {}, Qr = je, zn = Yn, Ag = Po, qc = Object.prototype.toString, Gc = Object.prototype.hasOwnProperty, Fo = 65279, Tg = 9, Nn = 10, Cg = 13, bg = 32, $g = 33, Og = 34, io = 35, Ig = 37, Rg = 38, Pg = 39, Dg = 42, Vc = 44, Ng = 45, Br = 58, Fg = 61, xg = 62, Lg = 63, Ug = 64, Wc = 91, Yc = 93, kg = 96, zc = 123, Mg = 124, Xc = 125, Se = {};
Se[0] = "\\0";
Se[7] = "\\a";
Se[8] = "\\b";
Se[9] = "\\t";
Se[10] = "\\n";
Se[11] = "\\v";
Se[12] = "\\f";
Se[13] = "\\r";
Se[27] = "\\e";
Se[34] = '\\"';
Se[92] = "\\\\";
Se[133] = "\\N";
Se[160] = "\\_";
Se[8232] = "\\L";
Se[8233] = "\\P";
var Bg = [
  "y",
  "Y",
  "yes",
  "Yes",
  "YES",
  "on",
  "On",
  "ON",
  "n",
  "N",
  "no",
  "No",
  "NO",
  "off",
  "Off",
  "OFF"
], jg = /^[-+]?[0-9_]+(?::[0-9_]+)+(?:\.[0-9_]*)?$/;
function Hg(e, t) {
  var n, r, i, o, a, s, l;
  if (t === null) return {};
  for (n = {}, r = Object.keys(t), i = 0, o = r.length; i < o; i += 1)
    a = r[i], s = String(t[a]), a.slice(0, 2) === "!!" && (a = "tag:yaml.org,2002:" + a.slice(2)), l = e.compiledTypeMap.fallback[a], l && Gc.call(l.styleAliases, s) && (s = l.styleAliases[s]), n[a] = s;
  return n;
}
function qg(e) {
  var t, n, r;
  if (t = e.toString(16).toUpperCase(), e <= 255)
    n = "x", r = 2;
  else if (e <= 65535)
    n = "u", r = 4;
  else if (e <= 4294967295)
    n = "U", r = 8;
  else
    throw new zn("code point within a string may not be greater than 0xFFFFFFFF");
  return "\\" + n + Qr.repeat("0", r - t.length) + t;
}
var Gg = 1, Fn = 2;
function Vg(e) {
  this.schema = e.schema || Ag, this.indent = Math.max(1, e.indent || 2), this.noArrayIndent = e.noArrayIndent || !1, this.skipInvalid = e.skipInvalid || !1, this.flowLevel = Qr.isNothing(e.flowLevel) ? -1 : e.flowLevel, this.styleMap = Hg(this.schema, e.styles || null), this.sortKeys = e.sortKeys || !1, this.lineWidth = e.lineWidth || 80, this.noRefs = e.noRefs || !1, this.noCompatMode = e.noCompatMode || !1, this.condenseFlow = e.condenseFlow || !1, this.quotingType = e.quotingType === '"' ? Fn : Gg, this.forceQuotes = e.forceQuotes || !1, this.replacer = typeof e.replacer == "function" ? e.replacer : null, this.implicitTypes = this.schema.compiledImplicit, this.explicitTypes = this.schema.compiledExplicit, this.tag = null, this.result = "", this.duplicates = [], this.usedDuplicates = null;
}
function Ka(e, t) {
  for (var n = Qr.repeat(" ", t), r = 0, i = -1, o = "", a, s = e.length; r < s; )
    i = e.indexOf(`
`, r), i === -1 ? (a = e.slice(r), r = s) : (a = e.slice(r, i + 1), r = i + 1), a.length && a !== `
` && (o += n), o += a;
  return o;
}
function oo(e, t) {
  return `
` + Qr.repeat(" ", e.indent * t);
}
function Wg(e, t) {
  var n, r, i;
  for (n = 0, r = e.implicitTypes.length; n < r; n += 1)
    if (i = e.implicitTypes[n], i.resolve(t))
      return !0;
  return !1;
}
function jr(e) {
  return e === bg || e === Tg;
}
function xn(e) {
  return 32 <= e && e <= 126 || 161 <= e && e <= 55295 && e !== 8232 && e !== 8233 || 57344 <= e && e <= 65533 && e !== Fo || 65536 <= e && e <= 1114111;
}
function Ja(e) {
  return xn(e) && e !== Fo && e !== Cg && e !== Nn;
}
function Qa(e, t, n) {
  var r = Ja(e), i = r && !jr(e);
  return (
    // ns-plain-safe
    (n ? (
      // c = flow-in
      r
    ) : r && e !== Vc && e !== Wc && e !== Yc && e !== zc && e !== Xc) && e !== io && !(t === Br && !i) || Ja(t) && !jr(t) && e === io || t === Br && i
  );
}
function Yg(e) {
  return xn(e) && e !== Fo && !jr(e) && e !== Ng && e !== Lg && e !== Br && e !== Vc && e !== Wc && e !== Yc && e !== zc && e !== Xc && e !== io && e !== Rg && e !== Dg && e !== $g && e !== Mg && e !== Fg && e !== xg && e !== Pg && e !== Og && e !== Ig && e !== Ug && e !== kg;
}
function zg(e) {
  return !jr(e) && e !== Br;
}
function Sn(e, t) {
  var n = e.charCodeAt(t), r;
  return n >= 55296 && n <= 56319 && t + 1 < e.length && (r = e.charCodeAt(t + 1), r >= 56320 && r <= 57343) ? (n - 55296) * 1024 + r - 56320 + 65536 : n;
}
function Kc(e) {
  var t = /^\n* /;
  return t.test(e);
}
var Jc = 1, ao = 2, Qc = 3, Zc = 4, Vt = 5;
function Xg(e, t, n, r, i, o, a, s) {
  var l, m = 0, c = null, f = !1, d = !1, g = r !== -1, w = -1, y = Yg(Sn(e, 0)) && zg(Sn(e, e.length - 1));
  if (t || a)
    for (l = 0; l < e.length; m >= 65536 ? l += 2 : l++) {
      if (m = Sn(e, l), !xn(m))
        return Vt;
      y = y && Qa(m, c, s), c = m;
    }
  else {
    for (l = 0; l < e.length; m >= 65536 ? l += 2 : l++) {
      if (m = Sn(e, l), m === Nn)
        f = !0, g && (d = d || // Foldable line = too long, and not more-indented.
        l - w - 1 > r && e[w + 1] !== " ", w = l);
      else if (!xn(m))
        return Vt;
      y = y && Qa(m, c, s), c = m;
    }
    d = d || g && l - w - 1 > r && e[w + 1] !== " ";
  }
  return !f && !d ? y && !a && !i(e) ? Jc : o === Fn ? Vt : ao : n > 9 && Kc(e) ? Vt : a ? o === Fn ? Vt : ao : d ? Zc : Qc;
}
function Kg(e, t, n, r, i) {
  e.dump = function() {
    if (t.length === 0)
      return e.quotingType === Fn ? '""' : "''";
    if (!e.noCompatMode && (Bg.indexOf(t) !== -1 || jg.test(t)))
      return e.quotingType === Fn ? '"' + t + '"' : "'" + t + "'";
    var o = e.indent * Math.max(1, n), a = e.lineWidth === -1 ? -1 : Math.max(Math.min(e.lineWidth, 40), e.lineWidth - o), s = r || e.flowLevel > -1 && n >= e.flowLevel;
    function l(m) {
      return Wg(e, m);
    }
    switch (Xg(
      t,
      s,
      e.indent,
      a,
      l,
      e.quotingType,
      e.forceQuotes && !r,
      i
    )) {
      case Jc:
        return t;
      case ao:
        return "'" + t.replace(/'/g, "''") + "'";
      case Qc:
        return "|" + Za(t, e.indent) + es(Ka(t, o));
      case Zc:
        return ">" + Za(t, e.indent) + es(Ka(Jg(t, a), o));
      case Vt:
        return '"' + Qg(t) + '"';
      default:
        throw new zn("impossible error: invalid scalar style");
    }
  }();
}
function Za(e, t) {
  var n = Kc(e) ? String(t) : "", r = e[e.length - 1] === `
`, i = r && (e[e.length - 2] === `
` || e === `
`), o = i ? "+" : r ? "" : "-";
  return n + o + `
`;
}
function es(e) {
  return e[e.length - 1] === `
` ? e.slice(0, -1) : e;
}
function Jg(e, t) {
  for (var n = /(\n+)([^\n]*)/g, r = function() {
    var m = e.indexOf(`
`);
    return m = m !== -1 ? m : e.length, n.lastIndex = m, ts(e.slice(0, m), t);
  }(), i = e[0] === `
` || e[0] === " ", o, a; a = n.exec(e); ) {
    var s = a[1], l = a[2];
    o = l[0] === " ", r += s + (!i && !o && l !== "" ? `
` : "") + ts(l, t), i = o;
  }
  return r;
}
function ts(e, t) {
  if (e === "" || e[0] === " ") return e;
  for (var n = / [^ ]/g, r, i = 0, o, a = 0, s = 0, l = ""; r = n.exec(e); )
    s = r.index, s - i > t && (o = a > i ? a : s, l += `
` + e.slice(i, o), i = o + 1), a = s;
  return l += `
`, e.length - i > t && a > i ? l += e.slice(i, a) + `
` + e.slice(a + 1) : l += e.slice(i), l.slice(1);
}
function Qg(e) {
  for (var t = "", n = 0, r, i = 0; i < e.length; n >= 65536 ? i += 2 : i++)
    n = Sn(e, i), r = Se[n], !r && xn(n) ? (t += e[i], n >= 65536 && (t += e[i + 1])) : t += r || qg(n);
  return t;
}
function Zg(e, t, n) {
  var r = "", i = e.tag, o, a, s;
  for (o = 0, a = n.length; o < a; o += 1)
    s = n[o], e.replacer && (s = e.replacer.call(n, String(o), s)), (Qe(e, t, s, !1, !1) || typeof s > "u" && Qe(e, t, null, !1, !1)) && (r !== "" && (r += "," + (e.condenseFlow ? "" : " ")), r += e.dump);
  e.tag = i, e.dump = "[" + r + "]";
}
function ns(e, t, n, r) {
  var i = "", o = e.tag, a, s, l;
  for (a = 0, s = n.length; a < s; a += 1)
    l = n[a], e.replacer && (l = e.replacer.call(n, String(a), l)), (Qe(e, t + 1, l, !0, !0, !1, !0) || typeof l > "u" && Qe(e, t + 1, null, !0, !0, !1, !0)) && ((!r || i !== "") && (i += oo(e, t)), e.dump && Nn === e.dump.charCodeAt(0) ? i += "-" : i += "- ", i += e.dump);
  e.tag = o, e.dump = i || "[]";
}
function e0(e, t, n) {
  var r = "", i = e.tag, o = Object.keys(n), a, s, l, m, c;
  for (a = 0, s = o.length; a < s; a += 1)
    c = "", r !== "" && (c += ", "), e.condenseFlow && (c += '"'), l = o[a], m = n[l], e.replacer && (m = e.replacer.call(n, l, m)), Qe(e, t, l, !1, !1) && (e.dump.length > 1024 && (c += "? "), c += e.dump + (e.condenseFlow ? '"' : "") + ":" + (e.condenseFlow ? "" : " "), Qe(e, t, m, !1, !1) && (c += e.dump, r += c));
  e.tag = i, e.dump = "{" + r + "}";
}
function t0(e, t, n, r) {
  var i = "", o = e.tag, a = Object.keys(n), s, l, m, c, f, d;
  if (e.sortKeys === !0)
    a.sort();
  else if (typeof e.sortKeys == "function")
    a.sort(e.sortKeys);
  else if (e.sortKeys)
    throw new zn("sortKeys must be a boolean or a function");
  for (s = 0, l = a.length; s < l; s += 1)
    d = "", (!r || i !== "") && (d += oo(e, t)), m = a[s], c = n[m], e.replacer && (c = e.replacer.call(n, m, c)), Qe(e, t + 1, m, !0, !0, !0) && (f = e.tag !== null && e.tag !== "?" || e.dump && e.dump.length > 1024, f && (e.dump && Nn === e.dump.charCodeAt(0) ? d += "?" : d += "? "), d += e.dump, f && (d += oo(e, t)), Qe(e, t + 1, c, !0, f) && (e.dump && Nn === e.dump.charCodeAt(0) ? d += ":" : d += ": ", d += e.dump, i += d));
  e.tag = o, e.dump = i || "{}";
}
function rs(e, t, n) {
  var r, i, o, a, s, l;
  for (i = n ? e.explicitTypes : e.implicitTypes, o = 0, a = i.length; o < a; o += 1)
    if (s = i[o], (s.instanceOf || s.predicate) && (!s.instanceOf || typeof t == "object" && t instanceof s.instanceOf) && (!s.predicate || s.predicate(t))) {
      if (n ? s.multi && s.representName ? e.tag = s.representName(t) : e.tag = s.tag : e.tag = "?", s.represent) {
        if (l = e.styleMap[s.tag] || s.defaultStyle, qc.call(s.represent) === "[object Function]")
          r = s.represent(t, l);
        else if (Gc.call(s.represent, l))
          r = s.represent[l](t, l);
        else
          throw new zn("!<" + s.tag + '> tag resolver accepts not "' + l + '" style');
        e.dump = r;
      }
      return !0;
    }
  return !1;
}
function Qe(e, t, n, r, i, o, a) {
  e.tag = null, e.dump = n, rs(e, n, !1) || rs(e, n, !0);
  var s = qc.call(e.dump), l = r, m;
  r && (r = e.flowLevel < 0 || e.flowLevel > t);
  var c = s === "[object Object]" || s === "[object Array]", f, d;
  if (c && (f = e.duplicates.indexOf(n), d = f !== -1), (e.tag !== null && e.tag !== "?" || d || e.indent !== 2 && t > 0) && (i = !1), d && e.usedDuplicates[f])
    e.dump = "*ref_" + f;
  else {
    if (c && d && !e.usedDuplicates[f] && (e.usedDuplicates[f] = !0), s === "[object Object]")
      r && Object.keys(e.dump).length !== 0 ? (t0(e, t, e.dump, i), d && (e.dump = "&ref_" + f + e.dump)) : (e0(e, t, e.dump), d && (e.dump = "&ref_" + f + " " + e.dump));
    else if (s === "[object Array]")
      r && e.dump.length !== 0 ? (e.noArrayIndent && !a && t > 0 ? ns(e, t - 1, e.dump, i) : ns(e, t, e.dump, i), d && (e.dump = "&ref_" + f + e.dump)) : (Zg(e, t, e.dump), d && (e.dump = "&ref_" + f + " " + e.dump));
    else if (s === "[object String]")
      e.tag !== "?" && Kg(e, e.dump, t, o, l);
    else {
      if (s === "[object Undefined]")
        return !1;
      if (e.skipInvalid) return !1;
      throw new zn("unacceptable kind of an object to dump " + s);
    }
    e.tag !== null && e.tag !== "?" && (m = encodeURI(
      e.tag[0] === "!" ? e.tag.slice(1) : e.tag
    ).replace(/!/g, "%21"), e.tag[0] === "!" ? m = "!" + m : m.slice(0, 18) === "tag:yaml.org,2002:" ? m = "!!" + m.slice(18) : m = "!<" + m + ">", e.dump = m + " " + e.dump);
  }
  return !0;
}
function n0(e, t) {
  var n = [], r = [], i, o;
  for (so(e, n, r), i = 0, o = r.length; i < o; i += 1)
    t.duplicates.push(n[r[i]]);
  t.usedDuplicates = new Array(o);
}
function so(e, t, n) {
  var r, i, o;
  if (e !== null && typeof e == "object")
    if (i = t.indexOf(e), i !== -1)
      n.indexOf(i) === -1 && n.push(i);
    else if (t.push(e), Array.isArray(e))
      for (i = 0, o = e.length; i < o; i += 1)
        so(e[i], t, n);
    else
      for (r = Object.keys(e), i = 0, o = r.length; i < o; i += 1)
        so(e[r[i]], t, n);
}
function r0(e, t) {
  t = t || {};
  var n = new Vg(t);
  n.noRefs || n0(e, n);
  var r = e;
  return n.replacer && (r = n.replacer.call({ "": r }, "", r)), Qe(n, 0, r, !0, !0) ? n.dump + `
` : "";
}
Hc.dump = r0;
var eu = Io, i0 = Hc;
function xo(e, t) {
  return function() {
    throw new Error("Function yaml." + e + " is removed in js-yaml 4. Use yaml." + t + " instead, which is now safe by default.");
  };
}
ye.Type = Ie;
ye.Schema = hc;
ye.FAILSAFE_SCHEMA = Ec;
ye.JSON_SCHEMA = Ac;
ye.CORE_SCHEMA = Tc;
ye.DEFAULT_SCHEMA = Po;
ye.load = eu.load;
ye.loadAll = eu.loadAll;
ye.dump = i0.dump;
ye.YAMLException = Yn;
ye.types = {
  binary: Ic,
  float: Sc,
  map: gc,
  null: yc,
  pairs: Pc,
  set: Dc,
  timestamp: $c,
  bool: vc,
  int: wc,
  merge: Oc,
  omap: Rc,
  seq: mc,
  str: pc
};
ye.safeLoad = xo("safeLoad", "load");
ye.safeLoadAll = xo("safeLoadAll", "loadAll");
ye.safeDump = xo("safeDump", "dump");
var Zr = {};
Object.defineProperty(Zr, "__esModule", { value: !0 });
Zr.Lazy = void 0;
class o0 {
  constructor(t) {
    this._value = null, this.creator = t;
  }
  get hasValue() {
    return this.creator == null;
  }
  get value() {
    if (this.creator == null)
      return this._value;
    const t = this.creator();
    return this.value = t, t;
  }
  set value(t) {
    this._value = t, this.creator = null;
  }
}
Zr.Lazy = o0;
var lo = { exports: {} };
const a0 = "2.0.0", tu = 256, s0 = Number.MAX_SAFE_INTEGER || /* istanbul ignore next */
9007199254740991, l0 = 16, c0 = tu - 6, u0 = [
  "major",
  "premajor",
  "minor",
  "preminor",
  "patch",
  "prepatch",
  "prerelease"
];
var ei = {
  MAX_LENGTH: tu,
  MAX_SAFE_COMPONENT_LENGTH: l0,
  MAX_SAFE_BUILD_LENGTH: c0,
  MAX_SAFE_INTEGER: s0,
  RELEASE_TYPES: u0,
  SEMVER_SPEC_VERSION: a0,
  FLAG_INCLUDE_PRERELEASE: 1,
  FLAG_LOOSE: 2
};
const f0 = typeof process == "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? (...e) => console.error("SEMVER", ...e) : () => {
};
var ti = f0;
(function(e, t) {
  const {
    MAX_SAFE_COMPONENT_LENGTH: n,
    MAX_SAFE_BUILD_LENGTH: r,
    MAX_LENGTH: i
  } = ei, o = ti;
  t = e.exports = {};
  const a = t.re = [], s = t.safeRe = [], l = t.src = [], m = t.safeSrc = [], c = t.t = {};
  let f = 0;
  const d = "[a-zA-Z0-9-]", g = [
    ["\\s", 1],
    ["\\d", i],
    [d, r]
  ], w = (S) => {
    for (const [T, A] of g)
      S = S.split(`${T}*`).join(`${T}{0,${A}}`).split(`${T}+`).join(`${T}{1,${A}}`);
    return S;
  }, y = (S, T, A) => {
    const P = w(T), x = f++;
    o(S, x, T), c[S] = x, l[x] = T, m[x] = P, a[x] = new RegExp(T, A ? "g" : void 0), s[x] = new RegExp(P, A ? "g" : void 0);
  };
  y("NUMERICIDENTIFIER", "0|[1-9]\\d*"), y("NUMERICIDENTIFIERLOOSE", "\\d+"), y("NONNUMERICIDENTIFIER", `\\d*[a-zA-Z-]${d}*`), y("MAINVERSION", `(${l[c.NUMERICIDENTIFIER]})\\.(${l[c.NUMERICIDENTIFIER]})\\.(${l[c.NUMERICIDENTIFIER]})`), y("MAINVERSIONLOOSE", `(${l[c.NUMERICIDENTIFIERLOOSE]})\\.(${l[c.NUMERICIDENTIFIERLOOSE]})\\.(${l[c.NUMERICIDENTIFIERLOOSE]})`), y("PRERELEASEIDENTIFIER", `(?:${l[c.NONNUMERICIDENTIFIER]}|${l[c.NUMERICIDENTIFIER]})`), y("PRERELEASEIDENTIFIERLOOSE", `(?:${l[c.NONNUMERICIDENTIFIER]}|${l[c.NUMERICIDENTIFIERLOOSE]})`), y("PRERELEASE", `(?:-(${l[c.PRERELEASEIDENTIFIER]}(?:\\.${l[c.PRERELEASEIDENTIFIER]})*))`), y("PRERELEASELOOSE", `(?:-?(${l[c.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${l[c.PRERELEASEIDENTIFIERLOOSE]})*))`), y("BUILDIDENTIFIER", `${d}+`), y("BUILD", `(?:\\+(${l[c.BUILDIDENTIFIER]}(?:\\.${l[c.BUILDIDENTIFIER]})*))`), y("FULLPLAIN", `v?${l[c.MAINVERSION]}${l[c.PRERELEASE]}?${l[c.BUILD]}?`), y("FULL", `^${l[c.FULLPLAIN]}$`), y("LOOSEPLAIN", `[v=\\s]*${l[c.MAINVERSIONLOOSE]}${l[c.PRERELEASELOOSE]}?${l[c.BUILD]}?`), y("LOOSE", `^${l[c.LOOSEPLAIN]}$`), y("GTLT", "((?:<|>)?=?)"), y("XRANGEIDENTIFIERLOOSE", `${l[c.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`), y("XRANGEIDENTIFIER", `${l[c.NUMERICIDENTIFIER]}|x|X|\\*`), y("XRANGEPLAIN", `[v=\\s]*(${l[c.XRANGEIDENTIFIER]})(?:\\.(${l[c.XRANGEIDENTIFIER]})(?:\\.(${l[c.XRANGEIDENTIFIER]})(?:${l[c.PRERELEASE]})?${l[c.BUILD]}?)?)?`), y("XRANGEPLAINLOOSE", `[v=\\s]*(${l[c.XRANGEIDENTIFIERLOOSE]})(?:\\.(${l[c.XRANGEIDENTIFIERLOOSE]})(?:\\.(${l[c.XRANGEIDENTIFIERLOOSE]})(?:${l[c.PRERELEASELOOSE]})?${l[c.BUILD]}?)?)?`), y("XRANGE", `^${l[c.GTLT]}\\s*${l[c.XRANGEPLAIN]}$`), y("XRANGELOOSE", `^${l[c.GTLT]}\\s*${l[c.XRANGEPLAINLOOSE]}$`), y("COERCEPLAIN", `(^|[^\\d])(\\d{1,${n}})(?:\\.(\\d{1,${n}}))?(?:\\.(\\d{1,${n}}))?`), y("COERCE", `${l[c.COERCEPLAIN]}(?:$|[^\\d])`), y("COERCEFULL", l[c.COERCEPLAIN] + `(?:${l[c.PRERELEASE]})?(?:${l[c.BUILD]})?(?:$|[^\\d])`), y("COERCERTL", l[c.COERCE], !0), y("COERCERTLFULL", l[c.COERCEFULL], !0), y("LONETILDE", "(?:~>?)"), y("TILDETRIM", `(\\s*)${l[c.LONETILDE]}\\s+`, !0), t.tildeTrimReplace = "$1~", y("TILDE", `^${l[c.LONETILDE]}${l[c.XRANGEPLAIN]}$`), y("TILDELOOSE", `^${l[c.LONETILDE]}${l[c.XRANGEPLAINLOOSE]}$`), y("LONECARET", "(?:\\^)"), y("CARETTRIM", `(\\s*)${l[c.LONECARET]}\\s+`, !0), t.caretTrimReplace = "$1^", y("CARET", `^${l[c.LONECARET]}${l[c.XRANGEPLAIN]}$`), y("CARETLOOSE", `^${l[c.LONECARET]}${l[c.XRANGEPLAINLOOSE]}$`), y("COMPARATORLOOSE", `^${l[c.GTLT]}\\s*(${l[c.LOOSEPLAIN]})$|^$`), y("COMPARATOR", `^${l[c.GTLT]}\\s*(${l[c.FULLPLAIN]})$|^$`), y("COMPARATORTRIM", `(\\s*)${l[c.GTLT]}\\s*(${l[c.LOOSEPLAIN]}|${l[c.XRANGEPLAIN]})`, !0), t.comparatorTrimReplace = "$1$2$3", y("HYPHENRANGE", `^\\s*(${l[c.XRANGEPLAIN]})\\s+-\\s+(${l[c.XRANGEPLAIN]})\\s*$`), y("HYPHENRANGELOOSE", `^\\s*(${l[c.XRANGEPLAINLOOSE]})\\s+-\\s+(${l[c.XRANGEPLAINLOOSE]})\\s*$`), y("STAR", "(<|>)?=?\\s*\\*"), y("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$"), y("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
})(lo, lo.exports);
var Xn = lo.exports;
const d0 = Object.freeze({ loose: !0 }), h0 = Object.freeze({}), p0 = (e) => e ? typeof e != "object" ? d0 : e : h0;
var Lo = p0;
const is = /^[0-9]+$/, nu = (e, t) => {
  const n = is.test(e), r = is.test(t);
  return n && r && (e = +e, t = +t), e === t ? 0 : n && !r ? -1 : r && !n ? 1 : e < t ? -1 : 1;
}, m0 = (e, t) => nu(t, e);
var ru = {
  compareIdentifiers: nu,
  rcompareIdentifiers: m0
};
const gr = ti, { MAX_LENGTH: os, MAX_SAFE_INTEGER: Er } = ei, { safeRe: yr, t: vr } = Xn, g0 = Lo, { compareIdentifiers: Bt } = ru;
let E0 = class We {
  constructor(t, n) {
    if (n = g0(n), t instanceof We) {
      if (t.loose === !!n.loose && t.includePrerelease === !!n.includePrerelease)
        return t;
      t = t.version;
    } else if (typeof t != "string")
      throw new TypeError(`Invalid version. Must be a string. Got type "${typeof t}".`);
    if (t.length > os)
      throw new TypeError(
        `version is longer than ${os} characters`
      );
    gr("SemVer", t, n), this.options = n, this.loose = !!n.loose, this.includePrerelease = !!n.includePrerelease;
    const r = t.trim().match(n.loose ? yr[vr.LOOSE] : yr[vr.FULL]);
    if (!r)
      throw new TypeError(`Invalid Version: ${t}`);
    if (this.raw = t, this.major = +r[1], this.minor = +r[2], this.patch = +r[3], this.major > Er || this.major < 0)
      throw new TypeError("Invalid major version");
    if (this.minor > Er || this.minor < 0)
      throw new TypeError("Invalid minor version");
    if (this.patch > Er || this.patch < 0)
      throw new TypeError("Invalid patch version");
    r[4] ? this.prerelease = r[4].split(".").map((i) => {
      if (/^[0-9]+$/.test(i)) {
        const o = +i;
        if (o >= 0 && o < Er)
          return o;
      }
      return i;
    }) : this.prerelease = [], this.build = r[5] ? r[5].split(".") : [], this.format();
  }
  format() {
    return this.version = `${this.major}.${this.minor}.${this.patch}`, this.prerelease.length && (this.version += `-${this.prerelease.join(".")}`), this.version;
  }
  toString() {
    return this.version;
  }
  compare(t) {
    if (gr("SemVer.compare", this.version, this.options, t), !(t instanceof We)) {
      if (typeof t == "string" && t === this.version)
        return 0;
      t = new We(t, this.options);
    }
    return t.version === this.version ? 0 : this.compareMain(t) || this.comparePre(t);
  }
  compareMain(t) {
    return t instanceof We || (t = new We(t, this.options)), Bt(this.major, t.major) || Bt(this.minor, t.minor) || Bt(this.patch, t.patch);
  }
  comparePre(t) {
    if (t instanceof We || (t = new We(t, this.options)), this.prerelease.length && !t.prerelease.length)
      return -1;
    if (!this.prerelease.length && t.prerelease.length)
      return 1;
    if (!this.prerelease.length && !t.prerelease.length)
      return 0;
    let n = 0;
    do {
      const r = this.prerelease[n], i = t.prerelease[n];
      if (gr("prerelease compare", n, r, i), r === void 0 && i === void 0)
        return 0;
      if (i === void 0)
        return 1;
      if (r === void 0)
        return -1;
      if (r === i)
        continue;
      return Bt(r, i);
    } while (++n);
  }
  compareBuild(t) {
    t instanceof We || (t = new We(t, this.options));
    let n = 0;
    do {
      const r = this.build[n], i = t.build[n];
      if (gr("build compare", n, r, i), r === void 0 && i === void 0)
        return 0;
      if (i === void 0)
        return 1;
      if (r === void 0)
        return -1;
      if (r === i)
        continue;
      return Bt(r, i);
    } while (++n);
  }
  // preminor will bump the version up to the next minor release, and immediately
  // down to pre-release. premajor and prepatch work the same way.
  inc(t, n, r) {
    if (t.startsWith("pre")) {
      if (!n && r === !1)
        throw new Error("invalid increment argument: identifier is empty");
      if (n) {
        const i = `-${n}`.match(this.options.loose ? yr[vr.PRERELEASELOOSE] : yr[vr.PRERELEASE]);
        if (!i || i[1] !== n)
          throw new Error(`invalid identifier: ${n}`);
      }
    }
    switch (t) {
      case "premajor":
        this.prerelease.length = 0, this.patch = 0, this.minor = 0, this.major++, this.inc("pre", n, r);
        break;
      case "preminor":
        this.prerelease.length = 0, this.patch = 0, this.minor++, this.inc("pre", n, r);
        break;
      case "prepatch":
        this.prerelease.length = 0, this.inc("patch", n, r), this.inc("pre", n, r);
        break;
      case "prerelease":
        this.prerelease.length === 0 && this.inc("patch", n, r), this.inc("pre", n, r);
        break;
      case "release":
        if (this.prerelease.length === 0)
          throw new Error(`version ${this.raw} is not a prerelease`);
        this.prerelease.length = 0;
        break;
      case "major":
        (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) && this.major++, this.minor = 0, this.patch = 0, this.prerelease = [];
        break;
      case "minor":
        (this.patch !== 0 || this.prerelease.length === 0) && this.minor++, this.patch = 0, this.prerelease = [];
        break;
      case "patch":
        this.prerelease.length === 0 && this.patch++, this.prerelease = [];
        break;
      case "pre": {
        const i = Number(r) ? 1 : 0;
        if (this.prerelease.length === 0)
          this.prerelease = [i];
        else {
          let o = this.prerelease.length;
          for (; --o >= 0; )
            typeof this.prerelease[o] == "number" && (this.prerelease[o]++, o = -2);
          if (o === -1) {
            if (n === this.prerelease.join(".") && r === !1)
              throw new Error("invalid increment argument: identifier already exists");
            this.prerelease.push(i);
          }
        }
        if (n) {
          let o = [n, i];
          r === !1 && (o = [n]), Bt(this.prerelease[0], n) === 0 ? isNaN(this.prerelease[1]) && (this.prerelease = o) : this.prerelease = o;
        }
        break;
      }
      default:
        throw new Error(`invalid increment argument: ${t}`);
    }
    return this.raw = this.format(), this.build.length && (this.raw += `+${this.build.join(".")}`), this;
  }
};
var Re = E0;
const as = Re, y0 = (e, t, n = !1) => {
  if (e instanceof as)
    return e;
  try {
    return new as(e, t);
  } catch (r) {
    if (!n)
      return null;
    throw r;
  }
};
var cn = y0;
const v0 = cn, w0 = (e, t) => {
  const n = v0(e, t);
  return n ? n.version : null;
};
var _0 = w0;
const S0 = cn, A0 = (e, t) => {
  const n = S0(e.trim().replace(/^[=v]+/, ""), t);
  return n ? n.version : null;
};
var T0 = A0;
const ss = Re, C0 = (e, t, n, r, i) => {
  typeof n == "string" && (i = r, r = n, n = void 0);
  try {
    return new ss(
      e instanceof ss ? e.version : e,
      n
    ).inc(t, r, i).version;
  } catch {
    return null;
  }
};
var b0 = C0;
const ls = cn, $0 = (e, t) => {
  const n = ls(e, null, !0), r = ls(t, null, !0), i = n.compare(r);
  if (i === 0)
    return null;
  const o = i > 0, a = o ? n : r, s = o ? r : n, l = !!a.prerelease.length;
  if (!!s.prerelease.length && !l) {
    if (!s.patch && !s.minor)
      return "major";
    if (s.compareMain(a) === 0)
      return s.minor && !s.patch ? "minor" : "patch";
  }
  const c = l ? "pre" : "";
  return n.major !== r.major ? c + "major" : n.minor !== r.minor ? c + "minor" : n.patch !== r.patch ? c + "patch" : "prerelease";
};
var O0 = $0;
const I0 = Re, R0 = (e, t) => new I0(e, t).major;
var P0 = R0;
const D0 = Re, N0 = (e, t) => new D0(e, t).minor;
var F0 = N0;
const x0 = Re, L0 = (e, t) => new x0(e, t).patch;
var U0 = L0;
const k0 = cn, M0 = (e, t) => {
  const n = k0(e, t);
  return n && n.prerelease.length ? n.prerelease : null;
};
var B0 = M0;
const cs = Re, j0 = (e, t, n) => new cs(e, n).compare(new cs(t, n));
var He = j0;
const H0 = He, q0 = (e, t, n) => H0(t, e, n);
var G0 = q0;
const V0 = He, W0 = (e, t) => V0(e, t, !0);
var Y0 = W0;
const us = Re, z0 = (e, t, n) => {
  const r = new us(e, n), i = new us(t, n);
  return r.compare(i) || r.compareBuild(i);
};
var Uo = z0;
const X0 = Uo, K0 = (e, t) => e.sort((n, r) => X0(n, r, t));
var J0 = K0;
const Q0 = Uo, Z0 = (e, t) => e.sort((n, r) => Q0(r, n, t));
var eE = Z0;
const tE = He, nE = (e, t, n) => tE(e, t, n) > 0;
var ni = nE;
const rE = He, iE = (e, t, n) => rE(e, t, n) < 0;
var ko = iE;
const oE = He, aE = (e, t, n) => oE(e, t, n) === 0;
var iu = aE;
const sE = He, lE = (e, t, n) => sE(e, t, n) !== 0;
var ou = lE;
const cE = He, uE = (e, t, n) => cE(e, t, n) >= 0;
var Mo = uE;
const fE = He, dE = (e, t, n) => fE(e, t, n) <= 0;
var Bo = dE;
const hE = iu, pE = ou, mE = ni, gE = Mo, EE = ko, yE = Bo, vE = (e, t, n, r) => {
  switch (t) {
    case "===":
      return typeof e == "object" && (e = e.version), typeof n == "object" && (n = n.version), e === n;
    case "!==":
      return typeof e == "object" && (e = e.version), typeof n == "object" && (n = n.version), e !== n;
    case "":
    case "=":
    case "==":
      return hE(e, n, r);
    case "!=":
      return pE(e, n, r);
    case ">":
      return mE(e, n, r);
    case ">=":
      return gE(e, n, r);
    case "<":
      return EE(e, n, r);
    case "<=":
      return yE(e, n, r);
    default:
      throw new TypeError(`Invalid operator: ${t}`);
  }
};
var au = vE;
const wE = Re, _E = cn, { safeRe: wr, t: _r } = Xn, SE = (e, t) => {
  if (e instanceof wE)
    return e;
  if (typeof e == "number" && (e = String(e)), typeof e != "string")
    return null;
  t = t || {};
  let n = null;
  if (!t.rtl)
    n = e.match(t.includePrerelease ? wr[_r.COERCEFULL] : wr[_r.COERCE]);
  else {
    const l = t.includePrerelease ? wr[_r.COERCERTLFULL] : wr[_r.COERCERTL];
    let m;
    for (; (m = l.exec(e)) && (!n || n.index + n[0].length !== e.length); )
      (!n || m.index + m[0].length !== n.index + n[0].length) && (n = m), l.lastIndex = m.index + m[1].length + m[2].length;
    l.lastIndex = -1;
  }
  if (n === null)
    return null;
  const r = n[2], i = n[3] || "0", o = n[4] || "0", a = t.includePrerelease && n[5] ? `-${n[5]}` : "", s = t.includePrerelease && n[6] ? `+${n[6]}` : "";
  return _E(`${r}.${i}.${o}${a}${s}`, t);
};
var AE = SE;
class TE {
  constructor() {
    this.max = 1e3, this.map = /* @__PURE__ */ new Map();
  }
  get(t) {
    const n = this.map.get(t);
    if (n !== void 0)
      return this.map.delete(t), this.map.set(t, n), n;
  }
  delete(t) {
    return this.map.delete(t);
  }
  set(t, n) {
    if (!this.delete(t) && n !== void 0) {
      if (this.map.size >= this.max) {
        const i = this.map.keys().next().value;
        this.delete(i);
      }
      this.map.set(t, n);
    }
    return this;
  }
}
var CE = TE, Ni, fs;
function qe() {
  if (fs) return Ni;
  fs = 1;
  const e = /\s+/g;
  class t {
    constructor($, D) {
      if (D = i(D), $ instanceof t)
        return $.loose === !!D.loose && $.includePrerelease === !!D.includePrerelease ? $ : new t($.raw, D);
      if ($ instanceof o)
        return this.raw = $.value, this.set = [[$]], this.formatted = void 0, this;
      if (this.options = D, this.loose = !!D.loose, this.includePrerelease = !!D.includePrerelease, this.raw = $.trim().replace(e, " "), this.set = this.raw.split("||").map((b) => this.parseRange(b.trim())).filter((b) => b.length), !this.set.length)
        throw new TypeError(`Invalid SemVer Range: ${this.raw}`);
      if (this.set.length > 1) {
        const b = this.set[0];
        if (this.set = this.set.filter((N) => !y(N[0])), this.set.length === 0)
          this.set = [b];
        else if (this.set.length > 1) {
          for (const N of this.set)
            if (N.length === 1 && S(N[0])) {
              this.set = [N];
              break;
            }
        }
      }
      this.formatted = void 0;
    }
    get range() {
      if (this.formatted === void 0) {
        this.formatted = "";
        for (let $ = 0; $ < this.set.length; $++) {
          $ > 0 && (this.formatted += "||");
          const D = this.set[$];
          for (let b = 0; b < D.length; b++)
            b > 0 && (this.formatted += " "), this.formatted += D[b].toString().trim();
        }
      }
      return this.formatted;
    }
    format() {
      return this.range;
    }
    toString() {
      return this.range;
    }
    parseRange($) {
      const b = ((this.options.includePrerelease && g) | (this.options.loose && w)) + ":" + $, N = r.get(b);
      if (N)
        return N;
      const R = this.options.loose, k = R ? l[m.HYPHENRANGELOOSE] : l[m.HYPHENRANGE];
      $ = $.replace(k, M(this.options.includePrerelease)), a("hyphen replace", $), $ = $.replace(l[m.COMPARATORTRIM], c), a("comparator trim", $), $ = $.replace(l[m.TILDETRIM], f), a("tilde trim", $), $ = $.replace(l[m.CARETTRIM], d), a("caret trim", $);
      let G = $.split(" ").map((U) => A(U, this.options)).join(" ").split(/\s+/).map((U) => B(U, this.options));
      R && (G = G.filter((U) => (a("loose invalid filter", U, this.options), !!U.match(l[m.COMPARATORLOOSE])))), a("range list", G);
      const j = /* @__PURE__ */ new Map(), J = G.map((U) => new o(U, this.options));
      for (const U of J) {
        if (y(U))
          return [U];
        j.set(U.value, U);
      }
      j.size > 1 && j.has("") && j.delete("");
      const fe = [...j.values()];
      return r.set(b, fe), fe;
    }
    intersects($, D) {
      if (!($ instanceof t))
        throw new TypeError("a Range is required");
      return this.set.some((b) => T(b, D) && $.set.some((N) => T(N, D) && b.every((R) => N.every((k) => R.intersects(k, D)))));
    }
    // if ANY of the sets match ALL of its comparators, then pass
    test($) {
      if (!$)
        return !1;
      if (typeof $ == "string")
        try {
          $ = new s($, this.options);
        } catch {
          return !1;
        }
      for (let D = 0; D < this.set.length; D++)
        if (K(this.set[D], $, this.options))
          return !0;
      return !1;
    }
  }
  Ni = t;
  const n = CE, r = new n(), i = Lo, o = ri(), a = ti, s = Re, {
    safeRe: l,
    t: m,
    comparatorTrimReplace: c,
    tildeTrimReplace: f,
    caretTrimReplace: d
  } = Xn, { FLAG_INCLUDE_PRERELEASE: g, FLAG_LOOSE: w } = ei, y = (I) => I.value === "<0.0.0-0", S = (I) => I.value === "", T = (I, $) => {
    let D = !0;
    const b = I.slice();
    let N = b.pop();
    for (; D && b.length; )
      D = b.every((R) => N.intersects(R, $)), N = b.pop();
    return D;
  }, A = (I, $) => (a("comp", I, $), I = Z(I, $), a("caret", I), I = x(I, $), a("tildes", I), I = le(I, $), a("xrange", I), I = q(I, $), a("stars", I), I), P = (I) => !I || I.toLowerCase() === "x" || I === "*", x = (I, $) => I.trim().split(/\s+/).map((D) => X(D, $)).join(" "), X = (I, $) => {
    const D = $.loose ? l[m.TILDELOOSE] : l[m.TILDE];
    return I.replace(D, (b, N, R, k, G) => {
      a("tilde", I, b, N, R, k, G);
      let j;
      return P(N) ? j = "" : P(R) ? j = `>=${N}.0.0 <${+N + 1}.0.0-0` : P(k) ? j = `>=${N}.${R}.0 <${N}.${+R + 1}.0-0` : G ? (a("replaceTilde pr", G), j = `>=${N}.${R}.${k}-${G} <${N}.${+R + 1}.0-0`) : j = `>=${N}.${R}.${k} <${N}.${+R + 1}.0-0`, a("tilde return", j), j;
    });
  }, Z = (I, $) => I.trim().split(/\s+/).map((D) => V(D, $)).join(" "), V = (I, $) => {
    a("caret", I, $);
    const D = $.loose ? l[m.CARETLOOSE] : l[m.CARET], b = $.includePrerelease ? "-0" : "";
    return I.replace(D, (N, R, k, G, j) => {
      a("caret", I, N, R, k, G, j);
      let J;
      return P(R) ? J = "" : P(k) ? J = `>=${R}.0.0${b} <${+R + 1}.0.0-0` : P(G) ? R === "0" ? J = `>=${R}.${k}.0${b} <${R}.${+k + 1}.0-0` : J = `>=${R}.${k}.0${b} <${+R + 1}.0.0-0` : j ? (a("replaceCaret pr", j), R === "0" ? k === "0" ? J = `>=${R}.${k}.${G}-${j} <${R}.${k}.${+G + 1}-0` : J = `>=${R}.${k}.${G}-${j} <${R}.${+k + 1}.0-0` : J = `>=${R}.${k}.${G}-${j} <${+R + 1}.0.0-0`) : (a("no pr"), R === "0" ? k === "0" ? J = `>=${R}.${k}.${G}${b} <${R}.${k}.${+G + 1}-0` : J = `>=${R}.${k}.${G}${b} <${R}.${+k + 1}.0-0` : J = `>=${R}.${k}.${G} <${+R + 1}.0.0-0`), a("caret return", J), J;
    });
  }, le = (I, $) => (a("replaceXRanges", I, $), I.split(/\s+/).map((D) => E(D, $)).join(" ")), E = (I, $) => {
    I = I.trim();
    const D = $.loose ? l[m.XRANGELOOSE] : l[m.XRANGE];
    return I.replace(D, (b, N, R, k, G, j) => {
      a("xRange", I, b, N, R, k, G, j);
      const J = P(R), fe = J || P(k), U = fe || P(G), Ge = U;
      return N === "=" && Ge && (N = ""), j = $.includePrerelease ? "-0" : "", J ? N === ">" || N === "<" ? b = "<0.0.0-0" : b = "*" : N && Ge ? (fe && (k = 0), G = 0, N === ">" ? (N = ">=", fe ? (R = +R + 1, k = 0, G = 0) : (k = +k + 1, G = 0)) : N === "<=" && (N = "<", fe ? R = +R + 1 : k = +k + 1), N === "<" && (j = "-0"), b = `${N + R}.${k}.${G}${j}`) : fe ? b = `>=${R}.0.0${j} <${+R + 1}.0.0-0` : U && (b = `>=${R}.${k}.0${j} <${R}.${+k + 1}.0-0`), a("xRange return", b), b;
    });
  }, q = (I, $) => (a("replaceStars", I, $), I.trim().replace(l[m.STAR], "")), B = (I, $) => (a("replaceGTE0", I, $), I.trim().replace(l[$.includePrerelease ? m.GTE0PRE : m.GTE0], "")), M = (I) => ($, D, b, N, R, k, G, j, J, fe, U, Ge) => (P(b) ? D = "" : P(N) ? D = `>=${b}.0.0${I ? "-0" : ""}` : P(R) ? D = `>=${b}.${N}.0${I ? "-0" : ""}` : k ? D = `>=${D}` : D = `>=${D}${I ? "-0" : ""}`, P(J) ? j = "" : P(fe) ? j = `<${+J + 1}.0.0-0` : P(U) ? j = `<${J}.${+fe + 1}.0-0` : Ge ? j = `<=${J}.${fe}.${U}-${Ge}` : I ? j = `<${J}.${fe}.${+U + 1}-0` : j = `<=${j}`, `${D} ${j}`.trim()), K = (I, $, D) => {
    for (let b = 0; b < I.length; b++)
      if (!I[b].test($))
        return !1;
    if ($.prerelease.length && !D.includePrerelease) {
      for (let b = 0; b < I.length; b++)
        if (a(I[b].semver), I[b].semver !== o.ANY && I[b].semver.prerelease.length > 0) {
          const N = I[b].semver;
          if (N.major === $.major && N.minor === $.minor && N.patch === $.patch)
            return !0;
        }
      return !1;
    }
    return !0;
  };
  return Ni;
}
var Fi, ds;
function ri() {
  if (ds) return Fi;
  ds = 1;
  const e = Symbol("SemVer ANY");
  class t {
    static get ANY() {
      return e;
    }
    constructor(c, f) {
      if (f = n(f), c instanceof t) {
        if (c.loose === !!f.loose)
          return c;
        c = c.value;
      }
      c = c.trim().split(/\s+/).join(" "), a("comparator", c, f), this.options = f, this.loose = !!f.loose, this.parse(c), this.semver === e ? this.value = "" : this.value = this.operator + this.semver.version, a("comp", this);
    }
    parse(c) {
      const f = this.options.loose ? r[i.COMPARATORLOOSE] : r[i.COMPARATOR], d = c.match(f);
      if (!d)
        throw new TypeError(`Invalid comparator: ${c}`);
      this.operator = d[1] !== void 0 ? d[1] : "", this.operator === "=" && (this.operator = ""), d[2] ? this.semver = new s(d[2], this.options.loose) : this.semver = e;
    }
    toString() {
      return this.value;
    }
    test(c) {
      if (a("Comparator.test", c, this.options.loose), this.semver === e || c === e)
        return !0;
      if (typeof c == "string")
        try {
          c = new s(c, this.options);
        } catch {
          return !1;
        }
      return o(c, this.operator, this.semver, this.options);
    }
    intersects(c, f) {
      if (!(c instanceof t))
        throw new TypeError("a Comparator is required");
      return this.operator === "" ? this.value === "" ? !0 : new l(c.value, f).test(this.value) : c.operator === "" ? c.value === "" ? !0 : new l(this.value, f).test(c.semver) : (f = n(f), f.includePrerelease && (this.value === "<0.0.0-0" || c.value === "<0.0.0-0") || !f.includePrerelease && (this.value.startsWith("<0.0.0") || c.value.startsWith("<0.0.0")) ? !1 : !!(this.operator.startsWith(">") && c.operator.startsWith(">") || this.operator.startsWith("<") && c.operator.startsWith("<") || this.semver.version === c.semver.version && this.operator.includes("=") && c.operator.includes("=") || o(this.semver, "<", c.semver, f) && this.operator.startsWith(">") && c.operator.startsWith("<") || o(this.semver, ">", c.semver, f) && this.operator.startsWith("<") && c.operator.startsWith(">")));
    }
  }
  Fi = t;
  const n = Lo, { safeRe: r, t: i } = Xn, o = au, a = ti, s = Re, l = qe();
  return Fi;
}
const bE = qe(), $E = (e, t, n) => {
  try {
    t = new bE(t, n);
  } catch {
    return !1;
  }
  return t.test(e);
};
var ii = $E;
const OE = qe(), IE = (e, t) => new OE(e, t).set.map((n) => n.map((r) => r.value).join(" ").trim().split(" "));
var RE = IE;
const PE = Re, DE = qe(), NE = (e, t, n) => {
  let r = null, i = null, o = null;
  try {
    o = new DE(t, n);
  } catch {
    return null;
  }
  return e.forEach((a) => {
    o.test(a) && (!r || i.compare(a) === -1) && (r = a, i = new PE(r, n));
  }), r;
};
var FE = NE;
const xE = Re, LE = qe(), UE = (e, t, n) => {
  let r = null, i = null, o = null;
  try {
    o = new LE(t, n);
  } catch {
    return null;
  }
  return e.forEach((a) => {
    o.test(a) && (!r || i.compare(a) === 1) && (r = a, i = new xE(r, n));
  }), r;
};
var kE = UE;
const xi = Re, ME = qe(), hs = ni, BE = (e, t) => {
  e = new ME(e, t);
  let n = new xi("0.0.0");
  if (e.test(n) || (n = new xi("0.0.0-0"), e.test(n)))
    return n;
  n = null;
  for (let r = 0; r < e.set.length; ++r) {
    const i = e.set[r];
    let o = null;
    i.forEach((a) => {
      const s = new xi(a.semver.version);
      switch (a.operator) {
        case ">":
          s.prerelease.length === 0 ? s.patch++ : s.prerelease.push(0), s.raw = s.format();
        case "":
        case ">=":
          (!o || hs(s, o)) && (o = s);
          break;
        case "<":
        case "<=":
          break;
        default:
          throw new Error(`Unexpected operation: ${a.operator}`);
      }
    }), o && (!n || hs(n, o)) && (n = o);
  }
  return n && e.test(n) ? n : null;
};
var jE = BE;
const HE = qe(), qE = (e, t) => {
  try {
    return new HE(e, t).range || "*";
  } catch {
    return null;
  }
};
var GE = qE;
const VE = Re, su = ri(), { ANY: WE } = su, YE = qe(), zE = ii, ps = ni, ms = ko, XE = Bo, KE = Mo, JE = (e, t, n, r) => {
  e = new VE(e, r), t = new YE(t, r);
  let i, o, a, s, l;
  switch (n) {
    case ">":
      i = ps, o = XE, a = ms, s = ">", l = ">=";
      break;
    case "<":
      i = ms, o = KE, a = ps, s = "<", l = "<=";
      break;
    default:
      throw new TypeError('Must provide a hilo val of "<" or ">"');
  }
  if (zE(e, t, r))
    return !1;
  for (let m = 0; m < t.set.length; ++m) {
    const c = t.set[m];
    let f = null, d = null;
    if (c.forEach((g) => {
      g.semver === WE && (g = new su(">=0.0.0")), f = f || g, d = d || g, i(g.semver, f.semver, r) ? f = g : a(g.semver, d.semver, r) && (d = g);
    }), f.operator === s || f.operator === l || (!d.operator || d.operator === s) && o(e, d.semver))
      return !1;
    if (d.operator === l && a(e, d.semver))
      return !1;
  }
  return !0;
};
var jo = JE;
const QE = jo, ZE = (e, t, n) => QE(e, t, ">", n);
var ey = ZE;
const ty = jo, ny = (e, t, n) => ty(e, t, "<", n);
var ry = ny;
const gs = qe(), iy = (e, t, n) => (e = new gs(e, n), t = new gs(t, n), e.intersects(t, n));
var oy = iy;
const ay = ii, sy = He;
var ly = (e, t, n) => {
  const r = [];
  let i = null, o = null;
  const a = e.sort((c, f) => sy(c, f, n));
  for (const c of a)
    ay(c, t, n) ? (o = c, i || (i = c)) : (o && r.push([i, o]), o = null, i = null);
  i && r.push([i, null]);
  const s = [];
  for (const [c, f] of r)
    c === f ? s.push(c) : !f && c === a[0] ? s.push("*") : f ? c === a[0] ? s.push(`<=${f}`) : s.push(`${c} - ${f}`) : s.push(`>=${c}`);
  const l = s.join(" || "), m = typeof t.raw == "string" ? t.raw : String(t);
  return l.length < m.length ? l : t;
};
const Es = qe(), Ho = ri(), { ANY: Li } = Ho, yn = ii, qo = He, cy = (e, t, n = {}) => {
  if (e === t)
    return !0;
  e = new Es(e, n), t = new Es(t, n);
  let r = !1;
  e: for (const i of e.set) {
    for (const o of t.set) {
      const a = fy(i, o, n);
      if (r = r || a !== null, a)
        continue e;
    }
    if (r)
      return !1;
  }
  return !0;
}, uy = [new Ho(">=0.0.0-0")], ys = [new Ho(">=0.0.0")], fy = (e, t, n) => {
  if (e === t)
    return !0;
  if (e.length === 1 && e[0].semver === Li) {
    if (t.length === 1 && t[0].semver === Li)
      return !0;
    n.includePrerelease ? e = uy : e = ys;
  }
  if (t.length === 1 && t[0].semver === Li) {
    if (n.includePrerelease)
      return !0;
    t = ys;
  }
  const r = /* @__PURE__ */ new Set();
  let i, o;
  for (const g of e)
    g.operator === ">" || g.operator === ">=" ? i = vs(i, g, n) : g.operator === "<" || g.operator === "<=" ? o = ws(o, g, n) : r.add(g.semver);
  if (r.size > 1)
    return null;
  let a;
  if (i && o) {
    if (a = qo(i.semver, o.semver, n), a > 0)
      return null;
    if (a === 0 && (i.operator !== ">=" || o.operator !== "<="))
      return null;
  }
  for (const g of r) {
    if (i && !yn(g, String(i), n) || o && !yn(g, String(o), n))
      return null;
    for (const w of t)
      if (!yn(g, String(w), n))
        return !1;
    return !0;
  }
  let s, l, m, c, f = o && !n.includePrerelease && o.semver.prerelease.length ? o.semver : !1, d = i && !n.includePrerelease && i.semver.prerelease.length ? i.semver : !1;
  f && f.prerelease.length === 1 && o.operator === "<" && f.prerelease[0] === 0 && (f = !1);
  for (const g of t) {
    if (c = c || g.operator === ">" || g.operator === ">=", m = m || g.operator === "<" || g.operator === "<=", i) {
      if (d && g.semver.prerelease && g.semver.prerelease.length && g.semver.major === d.major && g.semver.minor === d.minor && g.semver.patch === d.patch && (d = !1), g.operator === ">" || g.operator === ">=") {
        if (s = vs(i, g, n), s === g && s !== i)
          return !1;
      } else if (i.operator === ">=" && !yn(i.semver, String(g), n))
        return !1;
    }
    if (o) {
      if (f && g.semver.prerelease && g.semver.prerelease.length && g.semver.major === f.major && g.semver.minor === f.minor && g.semver.patch === f.patch && (f = !1), g.operator === "<" || g.operator === "<=") {
        if (l = ws(o, g, n), l === g && l !== o)
          return !1;
      } else if (o.operator === "<=" && !yn(o.semver, String(g), n))
        return !1;
    }
    if (!g.operator && (o || i) && a !== 0)
      return !1;
  }
  return !(i && m && !o && a !== 0 || o && c && !i && a !== 0 || d || f);
}, vs = (e, t, n) => {
  if (!e)
    return t;
  const r = qo(e.semver, t.semver, n);
  return r > 0 ? e : r < 0 || t.operator === ">" && e.operator === ">=" ? t : e;
}, ws = (e, t, n) => {
  if (!e)
    return t;
  const r = qo(e.semver, t.semver, n);
  return r < 0 ? e : r > 0 || t.operator === "<" && e.operator === "<=" ? t : e;
};
var dy = cy;
const Ui = Xn, _s = ei, hy = Re, Ss = ru, py = cn, my = _0, gy = T0, Ey = b0, yy = O0, vy = P0, wy = F0, _y = U0, Sy = B0, Ay = He, Ty = G0, Cy = Y0, by = Uo, $y = J0, Oy = eE, Iy = ni, Ry = ko, Py = iu, Dy = ou, Ny = Mo, Fy = Bo, xy = au, Ly = AE, Uy = ri(), ky = qe(), My = ii, By = RE, jy = FE, Hy = kE, qy = jE, Gy = GE, Vy = jo, Wy = ey, Yy = ry, zy = oy, Xy = ly, Ky = dy;
var lu = {
  parse: py,
  valid: my,
  clean: gy,
  inc: Ey,
  diff: yy,
  major: vy,
  minor: wy,
  patch: _y,
  prerelease: Sy,
  compare: Ay,
  rcompare: Ty,
  compareLoose: Cy,
  compareBuild: by,
  sort: $y,
  rsort: Oy,
  gt: Iy,
  lt: Ry,
  eq: Py,
  neq: Dy,
  gte: Ny,
  lte: Fy,
  cmp: xy,
  coerce: Ly,
  Comparator: Uy,
  Range: ky,
  satisfies: My,
  toComparators: By,
  maxSatisfying: jy,
  minSatisfying: Hy,
  minVersion: qy,
  validRange: Gy,
  outside: Vy,
  gtr: Wy,
  ltr: Yy,
  intersects: zy,
  simplifyRange: Xy,
  subset: Ky,
  SemVer: hy,
  re: Ui.re,
  src: Ui.src,
  tokens: Ui.t,
  SEMVER_SPEC_VERSION: _s.SEMVER_SPEC_VERSION,
  RELEASE_TYPES: _s.RELEASE_TYPES,
  compareIdentifiers: Ss.compareIdentifiers,
  rcompareIdentifiers: Ss.rcompareIdentifiers
}, Kn = {}, Hr = { exports: {} };
Hr.exports;
(function(e, t) {
  var n = 200, r = "__lodash_hash_undefined__", i = 1, o = 2, a = 9007199254740991, s = "[object Arguments]", l = "[object Array]", m = "[object AsyncFunction]", c = "[object Boolean]", f = "[object Date]", d = "[object Error]", g = "[object Function]", w = "[object GeneratorFunction]", y = "[object Map]", S = "[object Number]", T = "[object Null]", A = "[object Object]", P = "[object Promise]", x = "[object Proxy]", X = "[object RegExp]", Z = "[object Set]", V = "[object String]", le = "[object Symbol]", E = "[object Undefined]", q = "[object WeakMap]", B = "[object ArrayBuffer]", M = "[object DataView]", K = "[object Float32Array]", I = "[object Float64Array]", $ = "[object Int8Array]", D = "[object Int16Array]", b = "[object Int32Array]", N = "[object Uint8Array]", R = "[object Uint8ClampedArray]", k = "[object Uint16Array]", G = "[object Uint32Array]", j = /[\\^$.*+?()[\]{}|]/g, J = /^\[object .+?Constructor\]$/, fe = /^(?:0|[1-9]\d*)$/, U = {};
  U[K] = U[I] = U[$] = U[D] = U[b] = U[N] = U[R] = U[k] = U[G] = !0, U[s] = U[l] = U[B] = U[c] = U[M] = U[f] = U[d] = U[g] = U[y] = U[S] = U[A] = U[X] = U[Z] = U[V] = U[q] = !1;
  var Ge = typeof Te == "object" && Te && Te.Object === Object && Te, h = typeof self == "object" && self && self.Object === Object && self, u = Ge || h || Function("return this")(), C = t && !t.nodeType && t, _ = C && !0 && e && !e.nodeType && e, Y = _ && _.exports === C, ne = Y && Ge.process, oe = function() {
    try {
      return ne && ne.binding && ne.binding("util");
    } catch {
    }
  }(), me = oe && oe.isTypedArray;
  function ve(p, v) {
    for (var O = -1, F = p == null ? 0 : p.length, ee = 0, H = []; ++O < F; ) {
      var ae = p[O];
      v(ae, O, p) && (H[ee++] = ae);
    }
    return H;
  }
  function et(p, v) {
    for (var O = -1, F = v.length, ee = p.length; ++O < F; )
      p[ee + O] = v[O];
    return p;
  }
  function ce(p, v) {
    for (var O = -1, F = p == null ? 0 : p.length; ++O < F; )
      if (v(p[O], O, p))
        return !0;
    return !1;
  }
  function ke(p, v) {
    for (var O = -1, F = Array(p); ++O < p; )
      F[O] = v(O);
    return F;
  }
  function hi(p) {
    return function(v) {
      return p(v);
    };
  }
  function er(p, v) {
    return p.has(v);
  }
  function fn(p, v) {
    return p == null ? void 0 : p[v];
  }
  function tr(p) {
    var v = -1, O = Array(p.size);
    return p.forEach(function(F, ee) {
      O[++v] = [ee, F];
    }), O;
  }
  function bu(p, v) {
    return function(O) {
      return p(v(O));
    };
  }
  function $u(p) {
    var v = -1, O = Array(p.size);
    return p.forEach(function(F) {
      O[++v] = F;
    }), O;
  }
  var Ou = Array.prototype, Iu = Function.prototype, nr = Object.prototype, pi = u["__core-js_shared__"], Yo = Iu.toString, Ve = nr.hasOwnProperty, zo = function() {
    var p = /[^.]+$/.exec(pi && pi.keys && pi.keys.IE_PROTO || "");
    return p ? "Symbol(src)_1." + p : "";
  }(), Xo = nr.toString, Ru = RegExp(
    "^" + Yo.call(Ve).replace(j, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
  ), Ko = Y ? u.Buffer : void 0, rr = u.Symbol, Jo = u.Uint8Array, Qo = nr.propertyIsEnumerable, Pu = Ou.splice, vt = rr ? rr.toStringTag : void 0, Zo = Object.getOwnPropertySymbols, Du = Ko ? Ko.isBuffer : void 0, Nu = bu(Object.keys, Object), mi = Ut(u, "DataView"), dn = Ut(u, "Map"), gi = Ut(u, "Promise"), Ei = Ut(u, "Set"), yi = Ut(u, "WeakMap"), hn = Ut(Object, "create"), Fu = St(mi), xu = St(dn), Lu = St(gi), Uu = St(Ei), ku = St(yi), ea = rr ? rr.prototype : void 0, vi = ea ? ea.valueOf : void 0;
  function wt(p) {
    var v = -1, O = p == null ? 0 : p.length;
    for (this.clear(); ++v < O; ) {
      var F = p[v];
      this.set(F[0], F[1]);
    }
  }
  function Mu() {
    this.__data__ = hn ? hn(null) : {}, this.size = 0;
  }
  function Bu(p) {
    var v = this.has(p) && delete this.__data__[p];
    return this.size -= v ? 1 : 0, v;
  }
  function ju(p) {
    var v = this.__data__;
    if (hn) {
      var O = v[p];
      return O === r ? void 0 : O;
    }
    return Ve.call(v, p) ? v[p] : void 0;
  }
  function Hu(p) {
    var v = this.__data__;
    return hn ? v[p] !== void 0 : Ve.call(v, p);
  }
  function qu(p, v) {
    var O = this.__data__;
    return this.size += this.has(p) ? 0 : 1, O[p] = hn && v === void 0 ? r : v, this;
  }
  wt.prototype.clear = Mu, wt.prototype.delete = Bu, wt.prototype.get = ju, wt.prototype.has = Hu, wt.prototype.set = qu;
  function Xe(p) {
    var v = -1, O = p == null ? 0 : p.length;
    for (this.clear(); ++v < O; ) {
      var F = p[v];
      this.set(F[0], F[1]);
    }
  }
  function Gu() {
    this.__data__ = [], this.size = 0;
  }
  function Vu(p) {
    var v = this.__data__, O = or(v, p);
    if (O < 0)
      return !1;
    var F = v.length - 1;
    return O == F ? v.pop() : Pu.call(v, O, 1), --this.size, !0;
  }
  function Wu(p) {
    var v = this.__data__, O = or(v, p);
    return O < 0 ? void 0 : v[O][1];
  }
  function Yu(p) {
    return or(this.__data__, p) > -1;
  }
  function zu(p, v) {
    var O = this.__data__, F = or(O, p);
    return F < 0 ? (++this.size, O.push([p, v])) : O[F][1] = v, this;
  }
  Xe.prototype.clear = Gu, Xe.prototype.delete = Vu, Xe.prototype.get = Wu, Xe.prototype.has = Yu, Xe.prototype.set = zu;
  function _t(p) {
    var v = -1, O = p == null ? 0 : p.length;
    for (this.clear(); ++v < O; ) {
      var F = p[v];
      this.set(F[0], F[1]);
    }
  }
  function Xu() {
    this.size = 0, this.__data__ = {
      hash: new wt(),
      map: new (dn || Xe)(),
      string: new wt()
    };
  }
  function Ku(p) {
    var v = ar(this, p).delete(p);
    return this.size -= v ? 1 : 0, v;
  }
  function Ju(p) {
    return ar(this, p).get(p);
  }
  function Qu(p) {
    return ar(this, p).has(p);
  }
  function Zu(p, v) {
    var O = ar(this, p), F = O.size;
    return O.set(p, v), this.size += O.size == F ? 0 : 1, this;
  }
  _t.prototype.clear = Xu, _t.prototype.delete = Ku, _t.prototype.get = Ju, _t.prototype.has = Qu, _t.prototype.set = Zu;
  function ir(p) {
    var v = -1, O = p == null ? 0 : p.length;
    for (this.__data__ = new _t(); ++v < O; )
      this.add(p[v]);
  }
  function ef(p) {
    return this.__data__.set(p, r), this;
  }
  function tf(p) {
    return this.__data__.has(p);
  }
  ir.prototype.add = ir.prototype.push = ef, ir.prototype.has = tf;
  function tt(p) {
    var v = this.__data__ = new Xe(p);
    this.size = v.size;
  }
  function nf() {
    this.__data__ = new Xe(), this.size = 0;
  }
  function rf(p) {
    var v = this.__data__, O = v.delete(p);
    return this.size = v.size, O;
  }
  function of(p) {
    return this.__data__.get(p);
  }
  function af(p) {
    return this.__data__.has(p);
  }
  function sf(p, v) {
    var O = this.__data__;
    if (O instanceof Xe) {
      var F = O.__data__;
      if (!dn || F.length < n - 1)
        return F.push([p, v]), this.size = ++O.size, this;
      O = this.__data__ = new _t(F);
    }
    return O.set(p, v), this.size = O.size, this;
  }
  tt.prototype.clear = nf, tt.prototype.delete = rf, tt.prototype.get = of, tt.prototype.has = af, tt.prototype.set = sf;
  function lf(p, v) {
    var O = sr(p), F = !O && Af(p), ee = !O && !F && wi(p), H = !O && !F && !ee && ca(p), ae = O || F || ee || H, de = ae ? ke(p.length, String) : [], ge = de.length;
    for (var re in p)
      Ve.call(p, re) && !(ae && // Safari 9 has enumerable `arguments.length` in strict mode.
      (re == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
      ee && (re == "offset" || re == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
      H && (re == "buffer" || re == "byteLength" || re == "byteOffset") || // Skip index properties.
      yf(re, ge))) && de.push(re);
    return de;
  }
  function or(p, v) {
    for (var O = p.length; O--; )
      if (oa(p[O][0], v))
        return O;
    return -1;
  }
  function cf(p, v, O) {
    var F = v(p);
    return sr(p) ? F : et(F, O(p));
  }
  function pn(p) {
    return p == null ? p === void 0 ? E : T : vt && vt in Object(p) ? gf(p) : Sf(p);
  }
  function ta(p) {
    return mn(p) && pn(p) == s;
  }
  function na(p, v, O, F, ee) {
    return p === v ? !0 : p == null || v == null || !mn(p) && !mn(v) ? p !== p && v !== v : uf(p, v, O, F, na, ee);
  }
  function uf(p, v, O, F, ee, H) {
    var ae = sr(p), de = sr(v), ge = ae ? l : nt(p), re = de ? l : nt(v);
    ge = ge == s ? A : ge, re = re == s ? A : re;
    var Ne = ge == A, Me = re == A, we = ge == re;
    if (we && wi(p)) {
      if (!wi(v))
        return !1;
      ae = !0, Ne = !1;
    }
    if (we && !Ne)
      return H || (H = new tt()), ae || ca(p) ? ra(p, v, O, F, ee, H) : pf(p, v, ge, O, F, ee, H);
    if (!(O & i)) {
      var xe = Ne && Ve.call(p, "__wrapped__"), Le = Me && Ve.call(v, "__wrapped__");
      if (xe || Le) {
        var rt = xe ? p.value() : p, Ke = Le ? v.value() : v;
        return H || (H = new tt()), ee(rt, Ke, O, F, H);
      }
    }
    return we ? (H || (H = new tt()), mf(p, v, O, F, ee, H)) : !1;
  }
  function ff(p) {
    if (!la(p) || wf(p))
      return !1;
    var v = aa(p) ? Ru : J;
    return v.test(St(p));
  }
  function df(p) {
    return mn(p) && sa(p.length) && !!U[pn(p)];
  }
  function hf(p) {
    if (!_f(p))
      return Nu(p);
    var v = [];
    for (var O in Object(p))
      Ve.call(p, O) && O != "constructor" && v.push(O);
    return v;
  }
  function ra(p, v, O, F, ee, H) {
    var ae = O & i, de = p.length, ge = v.length;
    if (de != ge && !(ae && ge > de))
      return !1;
    var re = H.get(p);
    if (re && H.get(v))
      return re == v;
    var Ne = -1, Me = !0, we = O & o ? new ir() : void 0;
    for (H.set(p, v), H.set(v, p); ++Ne < de; ) {
      var xe = p[Ne], Le = v[Ne];
      if (F)
        var rt = ae ? F(Le, xe, Ne, v, p, H) : F(xe, Le, Ne, p, v, H);
      if (rt !== void 0) {
        if (rt)
          continue;
        Me = !1;
        break;
      }
      if (we) {
        if (!ce(v, function(Ke, At) {
          if (!er(we, At) && (xe === Ke || ee(xe, Ke, O, F, H)))
            return we.push(At);
        })) {
          Me = !1;
          break;
        }
      } else if (!(xe === Le || ee(xe, Le, O, F, H))) {
        Me = !1;
        break;
      }
    }
    return H.delete(p), H.delete(v), Me;
  }
  function pf(p, v, O, F, ee, H, ae) {
    switch (O) {
      case M:
        if (p.byteLength != v.byteLength || p.byteOffset != v.byteOffset)
          return !1;
        p = p.buffer, v = v.buffer;
      case B:
        return !(p.byteLength != v.byteLength || !H(new Jo(p), new Jo(v)));
      case c:
      case f:
      case S:
        return oa(+p, +v);
      case d:
        return p.name == v.name && p.message == v.message;
      case X:
      case V:
        return p == v + "";
      case y:
        var de = tr;
      case Z:
        var ge = F & i;
        if (de || (de = $u), p.size != v.size && !ge)
          return !1;
        var re = ae.get(p);
        if (re)
          return re == v;
        F |= o, ae.set(p, v);
        var Ne = ra(de(p), de(v), F, ee, H, ae);
        return ae.delete(p), Ne;
      case le:
        if (vi)
          return vi.call(p) == vi.call(v);
    }
    return !1;
  }
  function mf(p, v, O, F, ee, H) {
    var ae = O & i, de = ia(p), ge = de.length, re = ia(v), Ne = re.length;
    if (ge != Ne && !ae)
      return !1;
    for (var Me = ge; Me--; ) {
      var we = de[Me];
      if (!(ae ? we in v : Ve.call(v, we)))
        return !1;
    }
    var xe = H.get(p);
    if (xe && H.get(v))
      return xe == v;
    var Le = !0;
    H.set(p, v), H.set(v, p);
    for (var rt = ae; ++Me < ge; ) {
      we = de[Me];
      var Ke = p[we], At = v[we];
      if (F)
        var ua = ae ? F(At, Ke, we, v, p, H) : F(Ke, At, we, p, v, H);
      if (!(ua === void 0 ? Ke === At || ee(Ke, At, O, F, H) : ua)) {
        Le = !1;
        break;
      }
      rt || (rt = we == "constructor");
    }
    if (Le && !rt) {
      var lr = p.constructor, cr = v.constructor;
      lr != cr && "constructor" in p && "constructor" in v && !(typeof lr == "function" && lr instanceof lr && typeof cr == "function" && cr instanceof cr) && (Le = !1);
    }
    return H.delete(p), H.delete(v), Le;
  }
  function ia(p) {
    return cf(p, bf, Ef);
  }
  function ar(p, v) {
    var O = p.__data__;
    return vf(v) ? O[typeof v == "string" ? "string" : "hash"] : O.map;
  }
  function Ut(p, v) {
    var O = fn(p, v);
    return ff(O) ? O : void 0;
  }
  function gf(p) {
    var v = Ve.call(p, vt), O = p[vt];
    try {
      p[vt] = void 0;
      var F = !0;
    } catch {
    }
    var ee = Xo.call(p);
    return F && (v ? p[vt] = O : delete p[vt]), ee;
  }
  var Ef = Zo ? function(p) {
    return p == null ? [] : (p = Object(p), ve(Zo(p), function(v) {
      return Qo.call(p, v);
    }));
  } : $f, nt = pn;
  (mi && nt(new mi(new ArrayBuffer(1))) != M || dn && nt(new dn()) != y || gi && nt(gi.resolve()) != P || Ei && nt(new Ei()) != Z || yi && nt(new yi()) != q) && (nt = function(p) {
    var v = pn(p), O = v == A ? p.constructor : void 0, F = O ? St(O) : "";
    if (F)
      switch (F) {
        case Fu:
          return M;
        case xu:
          return y;
        case Lu:
          return P;
        case Uu:
          return Z;
        case ku:
          return q;
      }
    return v;
  });
  function yf(p, v) {
    return v = v ?? a, !!v && (typeof p == "number" || fe.test(p)) && p > -1 && p % 1 == 0 && p < v;
  }
  function vf(p) {
    var v = typeof p;
    return v == "string" || v == "number" || v == "symbol" || v == "boolean" ? p !== "__proto__" : p === null;
  }
  function wf(p) {
    return !!zo && zo in p;
  }
  function _f(p) {
    var v = p && p.constructor, O = typeof v == "function" && v.prototype || nr;
    return p === O;
  }
  function Sf(p) {
    return Xo.call(p);
  }
  function St(p) {
    if (p != null) {
      try {
        return Yo.call(p);
      } catch {
      }
      try {
        return p + "";
      } catch {
      }
    }
    return "";
  }
  function oa(p, v) {
    return p === v || p !== p && v !== v;
  }
  var Af = ta(/* @__PURE__ */ function() {
    return arguments;
  }()) ? ta : function(p) {
    return mn(p) && Ve.call(p, "callee") && !Qo.call(p, "callee");
  }, sr = Array.isArray;
  function Tf(p) {
    return p != null && sa(p.length) && !aa(p);
  }
  var wi = Du || Of;
  function Cf(p, v) {
    return na(p, v);
  }
  function aa(p) {
    if (!la(p))
      return !1;
    var v = pn(p);
    return v == g || v == w || v == m || v == x;
  }
  function sa(p) {
    return typeof p == "number" && p > -1 && p % 1 == 0 && p <= a;
  }
  function la(p) {
    var v = typeof p;
    return p != null && (v == "object" || v == "function");
  }
  function mn(p) {
    return p != null && typeof p == "object";
  }
  var ca = me ? hi(me) : df;
  function bf(p) {
    return Tf(p) ? lf(p) : hf(p);
  }
  function $f() {
    return [];
  }
  function Of() {
    return !1;
  }
  e.exports = Cf;
})(Hr, Hr.exports);
var Jy = Hr.exports;
Object.defineProperty(Kn, "__esModule", { value: !0 });
Kn.DownloadedUpdateHelper = void 0;
Kn.createTempUpdateFile = nv;
const Qy = qn, Zy = te, As = Jy, Ct = Et, bn = z;
class ev {
  constructor(t) {
    this.cacheDir = t, this._file = null, this._packageFile = null, this.versionInfo = null, this.fileInfo = null, this._downloadedFileInfo = null;
  }
  get downloadedFileInfo() {
    return this._downloadedFileInfo;
  }
  get file() {
    return this._file;
  }
  get packageFile() {
    return this._packageFile;
  }
  get cacheDirForPendingUpdate() {
    return bn.join(this.cacheDir, "pending");
  }
  async validateDownloadedPath(t, n, r, i) {
    if (this.versionInfo != null && this.file === t && this.fileInfo != null)
      return As(this.versionInfo, n) && As(this.fileInfo.info, r.info) && await (0, Ct.pathExists)(t) ? t : null;
    const o = await this.getValidCachedUpdateFile(r, i);
    return o === null ? null : (i.info(`Update has already been downloaded to ${t}).`), this._file = o, o);
  }
  async setDownloadedFile(t, n, r, i, o, a) {
    this._file = t, this._packageFile = n, this.versionInfo = r, this.fileInfo = i, this._downloadedFileInfo = {
      fileName: o,
      sha512: i.info.sha512,
      isAdminRightsRequired: i.info.isAdminRightsRequired === !0
    }, a && await (0, Ct.outputJson)(this.getUpdateInfoFile(), this._downloadedFileInfo);
  }
  async clear() {
    this._file = null, this._packageFile = null, this.versionInfo = null, this.fileInfo = null, await this.cleanCacheDirForPendingUpdate();
  }
  async cleanCacheDirForPendingUpdate() {
    try {
      await (0, Ct.emptyDir)(this.cacheDirForPendingUpdate);
    } catch {
    }
  }
  /**
   * Returns "update-info.json" which is created in the update cache directory's "pending" subfolder after the first update is downloaded.  If the update file does not exist then the cache is cleared and recreated.  If the update file exists then its properties are validated.
   * @param fileInfo
   * @param logger
   */
  async getValidCachedUpdateFile(t, n) {
    const r = this.getUpdateInfoFile();
    if (!await (0, Ct.pathExists)(r))
      return null;
    let o;
    try {
      o = await (0, Ct.readJson)(r);
    } catch (m) {
      let c = "No cached update info available";
      return m.code !== "ENOENT" && (await this.cleanCacheDirForPendingUpdate(), c += ` (error on read: ${m.message})`), n.info(c), null;
    }
    if (!((o == null ? void 0 : o.fileName) !== null))
      return n.warn("Cached update info is corrupted: no fileName, directory for cached update will be cleaned"), await this.cleanCacheDirForPendingUpdate(), null;
    if (t.info.sha512 !== o.sha512)
      return n.info(`Cached update sha512 checksum doesn't match the latest available update. New update must be downloaded. Cached: ${o.sha512}, expected: ${t.info.sha512}. Directory for cached update will be cleaned`), await this.cleanCacheDirForPendingUpdate(), null;
    const s = bn.join(this.cacheDirForPendingUpdate, o.fileName);
    if (!await (0, Ct.pathExists)(s))
      return n.info("Cached update file doesn't exist"), null;
    const l = await tv(s);
    return t.info.sha512 !== l ? (n.warn(`Sha512 checksum doesn't match the latest available update. New update must be downloaded. Cached: ${l}, expected: ${t.info.sha512}`), await this.cleanCacheDirForPendingUpdate(), null) : (this._downloadedFileInfo = o, s);
  }
  getUpdateInfoFile() {
    return bn.join(this.cacheDirForPendingUpdate, "update-info.json");
  }
}
Kn.DownloadedUpdateHelper = ev;
function tv(e, t = "sha512", n = "base64", r) {
  return new Promise((i, o) => {
    const a = (0, Qy.createHash)(t);
    a.on("error", o).setEncoding(n), (0, Zy.createReadStream)(e, {
      ...r,
      highWaterMark: 1024 * 1024
      /* better to use more memory but hash faster */
    }).on("error", o).on("end", () => {
      a.end(), i(a.read());
    }).pipe(a, { end: !1 });
  });
}
async function nv(e, t, n) {
  let r = 0, i = bn.join(t, e);
  for (let o = 0; o < 3; o++)
    try {
      return await (0, Ct.unlink)(i), i;
    } catch (a) {
      if (a.code === "ENOENT")
        return i;
      n.warn(`Error on remove temp update file: ${a}`), i = bn.join(t, `${r++}-${e}`);
    }
  return i;
}
var oi = {}, Go = {};
Object.defineProperty(Go, "__esModule", { value: !0 });
Go.getAppCacheDir = iv;
const ki = z, rv = Gr;
function iv() {
  const e = (0, rv.homedir)();
  let t;
  return process.platform === "win32" ? t = process.env.LOCALAPPDATA || ki.join(e, "AppData", "Local") : process.platform === "darwin" ? t = ki.join(e, "Library", "Caches") : t = process.env.XDG_CACHE_HOME || ki.join(e, ".cache"), t;
}
Object.defineProperty(oi, "__esModule", { value: !0 });
oi.ElectronAppAdapter = void 0;
const Ts = z, ov = Go;
class av {
  constructor(t = Dt.app) {
    this.app = t;
  }
  whenReady() {
    return this.app.whenReady();
  }
  get version() {
    return this.app.getVersion();
  }
  get name() {
    return this.app.getName();
  }
  get isPackaged() {
    return this.app.isPackaged === !0;
  }
  get appUpdateConfigPath() {
    return this.isPackaged ? Ts.join(process.resourcesPath, "app-update.yml") : Ts.join(this.app.getAppPath(), "dev-app-update.yml");
  }
  get userDataPath() {
    return this.app.getPath("userData");
  }
  get baseCachePath() {
    return (0, ov.getAppCacheDir)();
  }
  quit() {
    this.app.quit();
  }
  relaunch() {
    this.app.relaunch();
  }
  onQuit(t) {
    this.app.once("quit", (n, r) => t(r));
  }
}
oi.ElectronAppAdapter = av;
var cu = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.ElectronHttpExecutor = e.NET_SESSION_NAME = void 0, e.getNetSession = n;
  const t = pe;
  e.NET_SESSION_NAME = "electron-updater";
  function n() {
    return Dt.session.fromPartition(e.NET_SESSION_NAME, {
      cache: !1
    });
  }
  class r extends t.HttpExecutor {
    constructor(o) {
      super(), this.proxyLoginCallback = o, this.cachedSession = null;
    }
    async download(o, a, s) {
      return await s.cancellationToken.createPromise((l, m, c) => {
        const f = {
          headers: s.headers || void 0,
          redirect: "manual"
        };
        (0, t.configureRequestUrl)(o, f), (0, t.configureRequestOptions)(f), this.doDownload(f, {
          destination: a,
          options: s,
          onCancel: c,
          callback: (d) => {
            d == null ? l(a) : m(d);
          },
          responseHandler: null
        }, 0);
      });
    }
    createRequest(o, a) {
      o.headers && o.headers.Host && (o.host = o.headers.Host, delete o.headers.Host), this.cachedSession == null && (this.cachedSession = n());
      const s = Dt.net.request({
        ...o,
        session: this.cachedSession
      });
      return s.on("response", a), this.proxyLoginCallback != null && s.on("login", this.proxyLoginCallback), s;
    }
    addRedirectHandlers(o, a, s, l, m) {
      o.on("redirect", (c, f, d) => {
        o.abort(), l > this.maxRedirects ? s(this.createMaxRedirectError()) : m(t.HttpExecutor.prepareRedirectUrlOptions(d, a));
      });
    }
  }
  e.ElectronHttpExecutor = r;
})(cu);
var Jn = {}, Ue = {}, sv = "[object Symbol]", uu = /[\\^$.*+?()[\]{}|]/g, lv = RegExp(uu.source), cv = typeof Te == "object" && Te && Te.Object === Object && Te, uv = typeof self == "object" && self && self.Object === Object && self, fv = cv || uv || Function("return this")(), dv = Object.prototype, hv = dv.toString, Cs = fv.Symbol, bs = Cs ? Cs.prototype : void 0, $s = bs ? bs.toString : void 0;
function pv(e) {
  if (typeof e == "string")
    return e;
  if (gv(e))
    return $s ? $s.call(e) : "";
  var t = e + "";
  return t == "0" && 1 / e == -1 / 0 ? "-0" : t;
}
function mv(e) {
  return !!e && typeof e == "object";
}
function gv(e) {
  return typeof e == "symbol" || mv(e) && hv.call(e) == sv;
}
function Ev(e) {
  return e == null ? "" : pv(e);
}
function yv(e) {
  return e = Ev(e), e && lv.test(e) ? e.replace(uu, "\\$&") : e;
}
var vv = yv;
Object.defineProperty(Ue, "__esModule", { value: !0 });
Ue.newBaseUrl = _v;
Ue.newUrlFromBase = co;
Ue.getChannelFilename = Sv;
Ue.blockmapFiles = Av;
const fu = an, wv = vv;
function _v(e) {
  const t = new fu.URL(e);
  return t.pathname.endsWith("/") || (t.pathname += "/"), t;
}
function co(e, t, n = !1) {
  const r = new fu.URL(e, t), i = t.search;
  return i != null && i.length !== 0 ? r.search = i : n && (r.search = `noCache=${Date.now().toString(32)}`), r;
}
function Sv(e) {
  return `${e}.yml`;
}
function Av(e, t, n) {
  const r = co(`${e.pathname}.blockmap`, e);
  return [co(`${e.pathname.replace(new RegExp(wv(n), "g"), t)}.blockmap`, e), r];
}
var ue = {};
Object.defineProperty(ue, "__esModule", { value: !0 });
ue.Provider = void 0;
ue.findFile = bv;
ue.parseUpdateInfo = $v;
ue.getFileList = du;
ue.resolveFiles = Ov;
const mt = pe, Tv = ye, Os = Ue;
class Cv {
  constructor(t) {
    this.runtimeOptions = t, this.requestHeaders = null, this.executor = t.executor;
  }
  get isUseMultipleRangeRequest() {
    return this.runtimeOptions.isUseMultipleRangeRequest !== !1;
  }
  getChannelFilePrefix() {
    if (this.runtimeOptions.platform === "linux") {
      const t = process.env.TEST_UPDATER_ARCH || process.arch;
      return "-linux" + (t === "x64" ? "" : `-${t}`);
    } else
      return this.runtimeOptions.platform === "darwin" ? "-mac" : "";
  }
  // due to historical reasons for windows we use channel name without platform specifier
  getDefaultChannelName() {
    return this.getCustomChannelName("latest");
  }
  getCustomChannelName(t) {
    return `${t}${this.getChannelFilePrefix()}`;
  }
  get fileExtraDownloadHeaders() {
    return null;
  }
  setRequestHeaders(t) {
    this.requestHeaders = t;
  }
  /**
   * Method to perform API request only to resolve update info, but not to download update.
   */
  httpRequest(t, n, r) {
    return this.executor.request(this.createRequestOptions(t, n), r);
  }
  createRequestOptions(t, n) {
    const r = {};
    return this.requestHeaders == null ? n != null && (r.headers = n) : r.headers = n == null ? this.requestHeaders : { ...this.requestHeaders, ...n }, (0, mt.configureRequestUrl)(t, r), r;
  }
}
ue.Provider = Cv;
function bv(e, t, n) {
  if (e.length === 0)
    throw (0, mt.newError)("No files provided", "ERR_UPDATER_NO_FILES_PROVIDED");
  const r = e.find((i) => i.url.pathname.toLowerCase().endsWith(`.${t}`));
  return r ?? (n == null ? e[0] : e.find((i) => !n.some((o) => i.url.pathname.toLowerCase().endsWith(`.${o}`))));
}
function $v(e, t, n) {
  if (e == null)
    throw (0, mt.newError)(`Cannot parse update info from ${t} in the latest release artifacts (${n}): rawData: null`, "ERR_UPDATER_INVALID_UPDATE_INFO");
  let r;
  try {
    r = (0, Tv.load)(e);
  } catch (i) {
    throw (0, mt.newError)(`Cannot parse update info from ${t} in the latest release artifacts (${n}): ${i.stack || i.message}, rawData: ${e}`, "ERR_UPDATER_INVALID_UPDATE_INFO");
  }
  return r;
}
function du(e) {
  const t = e.files;
  if (t != null && t.length > 0)
    return t;
  if (e.path != null)
    return [
      {
        url: e.path,
        sha2: e.sha2,
        sha512: e.sha512
      }
    ];
  throw (0, mt.newError)(`No files provided: ${(0, mt.safeStringifyJson)(e)}`, "ERR_UPDATER_NO_FILES_PROVIDED");
}
function Ov(e, t, n = (r) => r) {
  const i = du(e).map((s) => {
    if (s.sha2 == null && s.sha512 == null)
      throw (0, mt.newError)(`Update info doesn't contain nor sha256 neither sha512 checksum: ${(0, mt.safeStringifyJson)(s)}`, "ERR_UPDATER_NO_CHECKSUM");
    return {
      url: (0, Os.newUrlFromBase)(n(s.url), t),
      info: s
    };
  }), o = e.packages, a = o == null ? null : o[process.arch] || o.ia32;
  return a != null && (i[0].packageInfo = {
    ...a,
    path: (0, Os.newUrlFromBase)(n(a.path), t).href
  }), i;
}
Object.defineProperty(Jn, "__esModule", { value: !0 });
Jn.GenericProvider = void 0;
const Is = pe, Mi = Ue, Bi = ue;
class Iv extends Bi.Provider {
  constructor(t, n, r) {
    super(r), this.configuration = t, this.updater = n, this.baseUrl = (0, Mi.newBaseUrl)(this.configuration.url);
  }
  get channel() {
    const t = this.updater.channel || this.configuration.channel;
    return t == null ? this.getDefaultChannelName() : this.getCustomChannelName(t);
  }
  async getLatestVersion() {
    const t = (0, Mi.getChannelFilename)(this.channel), n = (0, Mi.newUrlFromBase)(t, this.baseUrl, this.updater.isAddNoCacheQuery);
    for (let r = 0; ; r++)
      try {
        return (0, Bi.parseUpdateInfo)(await this.httpRequest(n), t, n);
      } catch (i) {
        if (i instanceof Is.HttpError && i.statusCode === 404)
          throw (0, Is.newError)(`Cannot find channel "${t}" update info: ${i.stack || i.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND");
        if (i.code === "ECONNREFUSED" && r < 3) {
          await new Promise((o, a) => {
            try {
              setTimeout(o, 1e3 * r);
            } catch (s) {
              a(s);
            }
          });
          continue;
        }
        throw i;
      }
  }
  resolveFiles(t) {
    return (0, Bi.resolveFiles)(t, this.baseUrl);
  }
}
Jn.GenericProvider = Iv;
var ai = {}, si = {};
Object.defineProperty(si, "__esModule", { value: !0 });
si.BitbucketProvider = void 0;
const Rs = pe, ji = Ue, Hi = ue;
class Rv extends Hi.Provider {
  constructor(t, n, r) {
    super({
      ...r,
      isUseMultipleRangeRequest: !1
    }), this.configuration = t, this.updater = n;
    const { owner: i, slug: o } = t;
    this.baseUrl = (0, ji.newBaseUrl)(`https://api.bitbucket.org/2.0/repositories/${i}/${o}/downloads`);
  }
  get channel() {
    return this.updater.channel || this.configuration.channel || "latest";
  }
  async getLatestVersion() {
    const t = new Rs.CancellationToken(), n = (0, ji.getChannelFilename)(this.getCustomChannelName(this.channel)), r = (0, ji.newUrlFromBase)(n, this.baseUrl, this.updater.isAddNoCacheQuery);
    try {
      const i = await this.httpRequest(r, void 0, t);
      return (0, Hi.parseUpdateInfo)(i, n, r);
    } catch (i) {
      throw (0, Rs.newError)(`Unable to find latest version on ${this.toString()}, please ensure release exists: ${i.stack || i.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
    }
  }
  resolveFiles(t) {
    return (0, Hi.resolveFiles)(t, this.baseUrl);
  }
  toString() {
    const { owner: t, slug: n } = this.configuration;
    return `Bitbucket (owner: ${t}, slug: ${n}, channel: ${this.channel})`;
  }
}
si.BitbucketProvider = Rv;
var gt = {};
Object.defineProperty(gt, "__esModule", { value: !0 });
gt.GitHubProvider = gt.BaseGitHubProvider = void 0;
gt.computeReleaseNotes = pu;
const Je = pe, Xt = lu, Pv = an, Kt = Ue, uo = ue, qi = /\/tag\/([^/]+)$/;
class hu extends uo.Provider {
  constructor(t, n, r) {
    super({
      ...r,
      /* because GitHib uses S3 */
      isUseMultipleRangeRequest: !1
    }), this.options = t, this.baseUrl = (0, Kt.newBaseUrl)((0, Je.githubUrl)(t, n));
    const i = n === "github.com" ? "api.github.com" : n;
    this.baseApiUrl = (0, Kt.newBaseUrl)((0, Je.githubUrl)(t, i));
  }
  computeGithubBasePath(t) {
    const n = this.options.host;
    return n && !["github.com", "api.github.com"].includes(n) ? `/api/v3${t}` : t;
  }
}
gt.BaseGitHubProvider = hu;
class Dv extends hu {
  constructor(t, n, r) {
    super(t, "github.com", r), this.options = t, this.updater = n;
  }
  get channel() {
    const t = this.updater.channel || this.options.channel;
    return t == null ? this.getDefaultChannelName() : this.getCustomChannelName(t);
  }
  async getLatestVersion() {
    var t, n, r, i, o;
    const a = new Je.CancellationToken(), s = await this.httpRequest((0, Kt.newUrlFromBase)(`${this.basePath}.atom`, this.baseUrl), {
      accept: "application/xml, application/atom+xml, text/xml, */*"
    }, a), l = (0, Je.parseXml)(s);
    let m = l.element("entry", !1, "No published versions on GitHub"), c = null;
    try {
      if (this.updater.allowPrerelease) {
        const S = ((t = this.updater) === null || t === void 0 ? void 0 : t.channel) || ((n = Xt.prerelease(this.updater.currentVersion)) === null || n === void 0 ? void 0 : n[0]) || null;
        if (S === null)
          c = qi.exec(m.element("link").attribute("href"))[1];
        else
          for (const T of l.getElements("entry")) {
            const A = qi.exec(T.element("link").attribute("href"));
            if (A === null)
              continue;
            const P = A[1], x = ((r = Xt.prerelease(P)) === null || r === void 0 ? void 0 : r[0]) || null, X = !S || ["alpha", "beta"].includes(S), Z = x !== null && !["alpha", "beta"].includes(String(x));
            if (X && !Z && !(S === "beta" && x === "alpha")) {
              c = P;
              break;
            }
            if (x && x === S) {
              c = P;
              break;
            }
          }
      } else {
        c = await this.getLatestTagName(a);
        for (const S of l.getElements("entry"))
          if (qi.exec(S.element("link").attribute("href"))[1] === c) {
            m = S;
            break;
          }
      }
    } catch (S) {
      throw (0, Je.newError)(`Cannot parse releases feed: ${S.stack || S.message},
XML:
${s}`, "ERR_UPDATER_INVALID_RELEASE_FEED");
    }
    if (c == null)
      throw (0, Je.newError)("No published versions on GitHub", "ERR_UPDATER_NO_PUBLISHED_VERSIONS");
    let f, d = "", g = "";
    const w = async (S) => {
      d = (0, Kt.getChannelFilename)(S), g = (0, Kt.newUrlFromBase)(this.getBaseDownloadPath(String(c), d), this.baseUrl);
      const T = this.createRequestOptions(g);
      try {
        return await this.executor.request(T, a);
      } catch (A) {
        throw A instanceof Je.HttpError && A.statusCode === 404 ? (0, Je.newError)(`Cannot find ${d} in the latest release artifacts (${g}): ${A.stack || A.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND") : A;
      }
    };
    try {
      let S = this.channel;
      this.updater.allowPrerelease && (!((i = Xt.prerelease(c)) === null || i === void 0) && i[0]) && (S = this.getCustomChannelName(String((o = Xt.prerelease(c)) === null || o === void 0 ? void 0 : o[0]))), f = await w(S);
    } catch (S) {
      if (this.updater.allowPrerelease)
        f = await w(this.getDefaultChannelName());
      else
        throw S;
    }
    const y = (0, uo.parseUpdateInfo)(f, d, g);
    return y.releaseName == null && (y.releaseName = m.elementValueOrEmpty("title")), y.releaseNotes == null && (y.releaseNotes = pu(this.updater.currentVersion, this.updater.fullChangelog, l, m)), {
      tag: c,
      ...y
    };
  }
  async getLatestTagName(t) {
    const n = this.options, r = n.host == null || n.host === "github.com" ? (0, Kt.newUrlFromBase)(`${this.basePath}/latest`, this.baseUrl) : new Pv.URL(`${this.computeGithubBasePath(`/repos/${n.owner}/${n.repo}/releases`)}/latest`, this.baseApiUrl);
    try {
      const i = await this.httpRequest(r, { Accept: "application/json" }, t);
      return i == null ? null : JSON.parse(i).tag_name;
    } catch (i) {
      throw (0, Je.newError)(`Unable to find latest version on GitHub (${r}), please ensure a production release exists: ${i.stack || i.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
    }
  }
  get basePath() {
    return `/${this.options.owner}/${this.options.repo}/releases`;
  }
  resolveFiles(t) {
    return (0, uo.resolveFiles)(t, this.baseUrl, (n) => this.getBaseDownloadPath(t.tag, n.replace(/ /g, "-")));
  }
  getBaseDownloadPath(t, n) {
    return `${this.basePath}/download/${t}/${n}`;
  }
}
gt.GitHubProvider = Dv;
function Ps(e) {
  const t = e.elementValueOrEmpty("content");
  return t === "No content." ? "" : t;
}
function pu(e, t, n, r) {
  if (!t)
    return Ps(r);
  const i = [];
  for (const o of n.getElements("entry")) {
    const a = /\/tag\/v?([^/]+)$/.exec(o.element("link").attribute("href"))[1];
    Xt.lt(e, a) && i.push({
      version: a,
      note: Ps(o)
    });
  }
  return i.sort((o, a) => Xt.rcompare(o.version, a.version));
}
var li = {};
Object.defineProperty(li, "__esModule", { value: !0 });
li.KeygenProvider = void 0;
const Ds = pe, Gi = Ue, Vi = ue;
class Nv extends Vi.Provider {
  constructor(t, n, r) {
    super({
      ...r,
      isUseMultipleRangeRequest: !1
    }), this.configuration = t, this.updater = n, this.defaultHostname = "api.keygen.sh";
    const i = this.configuration.host || this.defaultHostname;
    this.baseUrl = (0, Gi.newBaseUrl)(`https://${i}/v1/accounts/${this.configuration.account}/artifacts?product=${this.configuration.product}`);
  }
  get channel() {
    return this.updater.channel || this.configuration.channel || "stable";
  }
  async getLatestVersion() {
    const t = new Ds.CancellationToken(), n = (0, Gi.getChannelFilename)(this.getCustomChannelName(this.channel)), r = (0, Gi.newUrlFromBase)(n, this.baseUrl, this.updater.isAddNoCacheQuery);
    try {
      const i = await this.httpRequest(r, {
        Accept: "application/vnd.api+json",
        "Keygen-Version": "1.1"
      }, t);
      return (0, Vi.parseUpdateInfo)(i, n, r);
    } catch (i) {
      throw (0, Ds.newError)(`Unable to find latest version on ${this.toString()}, please ensure release exists: ${i.stack || i.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
    }
  }
  resolveFiles(t) {
    return (0, Vi.resolveFiles)(t, this.baseUrl);
  }
  toString() {
    const { account: t, product: n, platform: r } = this.configuration;
    return `Keygen (account: ${t}, product: ${n}, platform: ${r}, channel: ${this.channel})`;
  }
}
li.KeygenProvider = Nv;
var ci = {};
Object.defineProperty(ci, "__esModule", { value: !0 });
ci.PrivateGitHubProvider = void 0;
const jt = pe, Fv = ye, xv = z, Ns = an, Fs = Ue, Lv = gt, Uv = ue;
class kv extends Lv.BaseGitHubProvider {
  constructor(t, n, r, i) {
    super(t, "api.github.com", i), this.updater = n, this.token = r;
  }
  createRequestOptions(t, n) {
    const r = super.createRequestOptions(t, n);
    return r.redirect = "manual", r;
  }
  async getLatestVersion() {
    const t = new jt.CancellationToken(), n = (0, Fs.getChannelFilename)(this.getDefaultChannelName()), r = await this.getLatestVersionInfo(t), i = r.assets.find((s) => s.name === n);
    if (i == null)
      throw (0, jt.newError)(`Cannot find ${n} in the release ${r.html_url || r.name}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND");
    const o = new Ns.URL(i.url);
    let a;
    try {
      a = (0, Fv.load)(await this.httpRequest(o, this.configureHeaders("application/octet-stream"), t));
    } catch (s) {
      throw s instanceof jt.HttpError && s.statusCode === 404 ? (0, jt.newError)(`Cannot find ${n} in the latest release artifacts (${o}): ${s.stack || s.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND") : s;
    }
    return a.assets = r.assets, a;
  }
  get fileExtraDownloadHeaders() {
    return this.configureHeaders("application/octet-stream");
  }
  configureHeaders(t) {
    return {
      accept: t,
      authorization: `token ${this.token}`
    };
  }
  async getLatestVersionInfo(t) {
    const n = this.updater.allowPrerelease;
    let r = this.basePath;
    n || (r = `${r}/latest`);
    const i = (0, Fs.newUrlFromBase)(r, this.baseUrl);
    try {
      const o = JSON.parse(await this.httpRequest(i, this.configureHeaders("application/vnd.github.v3+json"), t));
      return n ? o.find((a) => a.prerelease) || o[0] : o;
    } catch (o) {
      throw (0, jt.newError)(`Unable to find latest version on GitHub (${i}), please ensure a production release exists: ${o.stack || o.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
    }
  }
  get basePath() {
    return this.computeGithubBasePath(`/repos/${this.options.owner}/${this.options.repo}/releases`);
  }
  resolveFiles(t) {
    return (0, Uv.getFileList)(t).map((n) => {
      const r = xv.posix.basename(n.url).replace(/ /g, "-"), i = t.assets.find((o) => o != null && o.name === r);
      if (i == null)
        throw (0, jt.newError)(`Cannot find asset "${r}" in: ${JSON.stringify(t.assets, null, 2)}`, "ERR_UPDATER_ASSET_NOT_FOUND");
      return {
        url: new Ns.URL(i.url),
        info: n
      };
    });
  }
}
ci.PrivateGitHubProvider = kv;
Object.defineProperty(ai, "__esModule", { value: !0 });
ai.isUrlProbablySupportMultiRangeRequests = mu;
ai.createClient = qv;
const Sr = pe, Mv = si, xs = Jn, Bv = gt, jv = li, Hv = ci;
function mu(e) {
  return !e.includes("s3.amazonaws.com");
}
function qv(e, t, n) {
  if (typeof e == "string")
    throw (0, Sr.newError)("Please pass PublishConfiguration object", "ERR_UPDATER_INVALID_PROVIDER_CONFIGURATION");
  const r = e.provider;
  switch (r) {
    case "github": {
      const i = e, o = (i.private ? process.env.GH_TOKEN || process.env.GITHUB_TOKEN : null) || i.token;
      return o == null ? new Bv.GitHubProvider(i, t, n) : new Hv.PrivateGitHubProvider(i, t, o, n);
    }
    case "bitbucket":
      return new Mv.BitbucketProvider(e, t, n);
    case "keygen":
      return new jv.KeygenProvider(e, t, n);
    case "s3":
    case "spaces":
      return new xs.GenericProvider({
        provider: "generic",
        url: (0, Sr.getS3LikeProviderBaseUrl)(e),
        channel: e.channel || null
      }, t, {
        ...n,
        // https://github.com/minio/minio/issues/5285#issuecomment-350428955
        isUseMultipleRangeRequest: !1
      });
    case "generic": {
      const i = e;
      return new xs.GenericProvider(i, t, {
        ...n,
        isUseMultipleRangeRequest: i.useMultipleRangeRequest !== !1 && mu(i.url)
      });
    }
    case "custom": {
      const i = e, o = i.updateProvider;
      if (!o)
        throw (0, Sr.newError)("Custom provider not specified", "ERR_UPDATER_INVALID_PROVIDER_CONFIGURATION");
      return new o(i, t, n);
    }
    default:
      throw (0, Sr.newError)(`Unsupported provider: ${r}`, "ERR_UPDATER_UNSUPPORTED_PROVIDER");
  }
}
var ui = {}, Qn = {}, un = {}, Lt = {};
Object.defineProperty(Lt, "__esModule", { value: !0 });
Lt.OperationKind = void 0;
Lt.computeOperations = Gv;
var Ot;
(function(e) {
  e[e.COPY = 0] = "COPY", e[e.DOWNLOAD = 1] = "DOWNLOAD";
})(Ot || (Lt.OperationKind = Ot = {}));
function Gv(e, t, n) {
  const r = Us(e.files), i = Us(t.files);
  let o = null;
  const a = t.files[0], s = [], l = a.name, m = r.get(l);
  if (m == null)
    throw new Error(`no file ${l} in old blockmap`);
  const c = i.get(l);
  let f = 0;
  const { checksumToOffset: d, checksumToOldSize: g } = Wv(r.get(l), m.offset, n);
  let w = a.offset;
  for (let y = 0; y < c.checksums.length; w += c.sizes[y], y++) {
    const S = c.sizes[y], T = c.checksums[y];
    let A = d.get(T);
    A != null && g.get(T) !== S && (n.warn(`Checksum ("${T}") matches, but size differs (old: ${g.get(T)}, new: ${S})`), A = void 0), A === void 0 ? (f++, o != null && o.kind === Ot.DOWNLOAD && o.end === w ? o.end += S : (o = {
      kind: Ot.DOWNLOAD,
      start: w,
      end: w + S
      // oldBlocks: null,
    }, Ls(o, s, T, y))) : o != null && o.kind === Ot.COPY && o.end === A ? o.end += S : (o = {
      kind: Ot.COPY,
      start: A,
      end: A + S
      // oldBlocks: [checksum]
    }, Ls(o, s, T, y));
  }
  return f > 0 && n.info(`File${a.name === "file" ? "" : " " + a.name} has ${f} changed blocks`), s;
}
const Vv = process.env.DIFFERENTIAL_DOWNLOAD_PLAN_BUILDER_VALIDATE_RANGES === "true";
function Ls(e, t, n, r) {
  if (Vv && t.length !== 0) {
    const i = t[t.length - 1];
    if (i.kind === e.kind && e.start < i.end && e.start > i.start) {
      const o = [i.start, i.end, e.start, e.end].reduce((a, s) => a < s ? a : s);
      throw new Error(`operation (block index: ${r}, checksum: ${n}, kind: ${Ot[e.kind]}) overlaps previous operation (checksum: ${n}):
abs: ${i.start} until ${i.end} and ${e.start} until ${e.end}
rel: ${i.start - o} until ${i.end - o} and ${e.start - o} until ${e.end - o}`);
    }
  }
  t.push(e);
}
function Wv(e, t, n) {
  const r = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map();
  let o = t;
  for (let a = 0; a < e.checksums.length; a++) {
    const s = e.checksums[a], l = e.sizes[a], m = i.get(s);
    if (m === void 0)
      r.set(s, o), i.set(s, l);
    else if (n.debug != null) {
      const c = m === l ? "(same size)" : `(size: ${m}, this size: ${l})`;
      n.debug(`${s} duplicated in blockmap ${c}, it doesn't lead to broken differential downloader, just corresponding block will be skipped)`);
    }
    o += l;
  }
  return { checksumToOffset: r, checksumToOldSize: i };
}
function Us(e) {
  const t = /* @__PURE__ */ new Map();
  for (const n of e)
    t.set(n.name, n);
  return t;
}
Object.defineProperty(un, "__esModule", { value: !0 });
un.DataSplitter = void 0;
un.copyData = gu;
const Ar = pe, Yv = te, zv = Hn, Xv = Lt, ks = Buffer.from(`\r
\r
`);
var at;
(function(e) {
  e[e.INIT = 0] = "INIT", e[e.HEADER = 1] = "HEADER", e[e.BODY = 2] = "BODY";
})(at || (at = {}));
function gu(e, t, n, r, i) {
  const o = (0, Yv.createReadStream)("", {
    fd: n,
    autoClose: !1,
    start: e.start,
    // end is inclusive
    end: e.end - 1
  });
  o.on("error", r), o.once("end", i), o.pipe(t, {
    end: !1
  });
}
class Kv extends zv.Writable {
  constructor(t, n, r, i, o, a) {
    super(), this.out = t, this.options = n, this.partIndexToTaskIndex = r, this.partIndexToLength = o, this.finishHandler = a, this.partIndex = -1, this.headerListBuffer = null, this.readState = at.INIT, this.ignoreByteCount = 0, this.remainingPartDataCount = 0, this.actualPartLength = 0, this.boundaryLength = i.length + 4, this.ignoreByteCount = this.boundaryLength - 2;
  }
  get isFinished() {
    return this.partIndex === this.partIndexToLength.length;
  }
  // noinspection JSUnusedGlobalSymbols
  _write(t, n, r) {
    if (this.isFinished) {
      console.error(`Trailing ignored data: ${t.length} bytes`);
      return;
    }
    this.handleData(t).then(r).catch(r);
  }
  async handleData(t) {
    let n = 0;
    if (this.ignoreByteCount !== 0 && this.remainingPartDataCount !== 0)
      throw (0, Ar.newError)("Internal error", "ERR_DATA_SPLITTER_BYTE_COUNT_MISMATCH");
    if (this.ignoreByteCount > 0) {
      const r = Math.min(this.ignoreByteCount, t.length);
      this.ignoreByteCount -= r, n = r;
    } else if (this.remainingPartDataCount > 0) {
      const r = Math.min(this.remainingPartDataCount, t.length);
      this.remainingPartDataCount -= r, await this.processPartData(t, 0, r), n = r;
    }
    if (n !== t.length) {
      if (this.readState === at.HEADER) {
        const r = this.searchHeaderListEnd(t, n);
        if (r === -1)
          return;
        n = r, this.readState = at.BODY, this.headerListBuffer = null;
      }
      for (; ; ) {
        if (this.readState === at.BODY)
          this.readState = at.INIT;
        else {
          this.partIndex++;
          let a = this.partIndexToTaskIndex.get(this.partIndex);
          if (a == null)
            if (this.isFinished)
              a = this.options.end;
            else
              throw (0, Ar.newError)("taskIndex is null", "ERR_DATA_SPLITTER_TASK_INDEX_IS_NULL");
          const s = this.partIndex === 0 ? this.options.start : this.partIndexToTaskIndex.get(this.partIndex - 1) + 1;
          if (s < a)
            await this.copyExistingData(s, a);
          else if (s > a)
            throw (0, Ar.newError)("prevTaskIndex must be < taskIndex", "ERR_DATA_SPLITTER_TASK_INDEX_ASSERT_FAILED");
          if (this.isFinished) {
            this.onPartEnd(), this.finishHandler();
            return;
          }
          if (n = this.searchHeaderListEnd(t, n), n === -1) {
            this.readState = at.HEADER;
            return;
          }
        }
        const r = this.partIndexToLength[this.partIndex], i = n + r, o = Math.min(i, t.length);
        if (await this.processPartStarted(t, n, o), this.remainingPartDataCount = r - (o - n), this.remainingPartDataCount > 0)
          return;
        if (n = i + this.boundaryLength, n >= t.length) {
          this.ignoreByteCount = this.boundaryLength - (t.length - i);
          return;
        }
      }
    }
  }
  copyExistingData(t, n) {
    return new Promise((r, i) => {
      const o = () => {
        if (t === n) {
          r();
          return;
        }
        const a = this.options.tasks[t];
        if (a.kind !== Xv.OperationKind.COPY) {
          i(new Error("Task kind must be COPY"));
          return;
        }
        gu(a, this.out, this.options.oldFileFd, i, () => {
          t++, o();
        });
      };
      o();
    });
  }
  searchHeaderListEnd(t, n) {
    const r = t.indexOf(ks, n);
    if (r !== -1)
      return r + ks.length;
    const i = n === 0 ? t : t.slice(n);
    return this.headerListBuffer == null ? this.headerListBuffer = i : this.headerListBuffer = Buffer.concat([this.headerListBuffer, i]), -1;
  }
  onPartEnd() {
    const t = this.partIndexToLength[this.partIndex - 1];
    if (this.actualPartLength !== t)
      throw (0, Ar.newError)(`Expected length: ${t} differs from actual: ${this.actualPartLength}`, "ERR_DATA_SPLITTER_LENGTH_MISMATCH");
    this.actualPartLength = 0;
  }
  processPartStarted(t, n, r) {
    return this.partIndex !== 0 && this.onPartEnd(), this.processPartData(t, n, r);
  }
  processPartData(t, n, r) {
    this.actualPartLength += r - n;
    const i = this.out;
    return i.write(n === 0 && t.length === r ? t : t.slice(n, r)) ? Promise.resolve() : new Promise((o, a) => {
      i.on("error", a), i.once("drain", () => {
        i.removeListener("error", a), o();
      });
    });
  }
}
un.DataSplitter = Kv;
var fi = {};
Object.defineProperty(fi, "__esModule", { value: !0 });
fi.executeTasksUsingMultipleRangeRequests = Jv;
fi.checkIsRangesSupported = ho;
const fo = pe, Ms = un, Bs = Lt;
function Jv(e, t, n, r, i) {
  const o = (a) => {
    if (a >= t.length) {
      e.fileMetadataBuffer != null && n.write(e.fileMetadataBuffer), n.end();
      return;
    }
    const s = a + 1e3;
    Qv(e, {
      tasks: t,
      start: a,
      end: Math.min(t.length, s),
      oldFileFd: r
    }, n, () => o(s), i);
  };
  return o;
}
function Qv(e, t, n, r, i) {
  let o = "bytes=", a = 0;
  const s = /* @__PURE__ */ new Map(), l = [];
  for (let f = t.start; f < t.end; f++) {
    const d = t.tasks[f];
    d.kind === Bs.OperationKind.DOWNLOAD && (o += `${d.start}-${d.end - 1}, `, s.set(a, f), a++, l.push(d.end - d.start));
  }
  if (a <= 1) {
    const f = (d) => {
      if (d >= t.end) {
        r();
        return;
      }
      const g = t.tasks[d++];
      if (g.kind === Bs.OperationKind.COPY)
        (0, Ms.copyData)(g, n, t.oldFileFd, i, () => f(d));
      else {
        const w = e.createRequestOptions();
        w.headers.Range = `bytes=${g.start}-${g.end - 1}`;
        const y = e.httpExecutor.createRequest(w, (S) => {
          ho(S, i) && (S.pipe(n, {
            end: !1
          }), S.once("end", () => f(d)));
        });
        e.httpExecutor.addErrorAndTimeoutHandlers(y, i), y.end();
      }
    };
    f(t.start);
    return;
  }
  const m = e.createRequestOptions();
  m.headers.Range = o.substring(0, o.length - 2);
  const c = e.httpExecutor.createRequest(m, (f) => {
    if (!ho(f, i))
      return;
    const d = (0, fo.safeGetHeader)(f, "content-type"), g = /^multipart\/.+?(?:; boundary=(?:(?:"(.+)")|(?:([^\s]+))))$/i.exec(d);
    if (g == null) {
      i(new Error(`Content-Type "multipart/byteranges" is expected, but got "${d}"`));
      return;
    }
    const w = new Ms.DataSplitter(n, t, s, g[1] || g[2], l, r);
    w.on("error", i), f.pipe(w), f.on("end", () => {
      setTimeout(() => {
        c.abort(), i(new Error("Response ends without calling any handlers"));
      }, 1e4);
    });
  });
  e.httpExecutor.addErrorAndTimeoutHandlers(c, i), c.end();
}
function ho(e, t) {
  if (e.statusCode >= 400)
    return t((0, fo.createHttpError)(e)), !1;
  if (e.statusCode !== 206) {
    const n = (0, fo.safeGetHeader)(e, "accept-ranges");
    if (n == null || n === "none")
      return t(new Error(`Server doesn't support Accept-Ranges (response code ${e.statusCode})`)), !1;
  }
  return !0;
}
var di = {};
Object.defineProperty(di, "__esModule", { value: !0 });
di.ProgressDifferentialDownloadCallbackTransform = void 0;
const Zv = Hn;
var Jt;
(function(e) {
  e[e.COPY = 0] = "COPY", e[e.DOWNLOAD = 1] = "DOWNLOAD";
})(Jt || (Jt = {}));
class ew extends Zv.Transform {
  constructor(t, n, r) {
    super(), this.progressDifferentialDownloadInfo = t, this.cancellationToken = n, this.onProgress = r, this.start = Date.now(), this.transferred = 0, this.delta = 0, this.expectedBytes = 0, this.index = 0, this.operationType = Jt.COPY, this.nextUpdate = this.start + 1e3;
  }
  _transform(t, n, r) {
    if (this.cancellationToken.cancelled) {
      r(new Error("cancelled"), null);
      return;
    }
    if (this.operationType == Jt.COPY) {
      r(null, t);
      return;
    }
    this.transferred += t.length, this.delta += t.length;
    const i = Date.now();
    i >= this.nextUpdate && this.transferred !== this.expectedBytes && this.transferred !== this.progressDifferentialDownloadInfo.grandTotal && (this.nextUpdate = i + 1e3, this.onProgress({
      total: this.progressDifferentialDownloadInfo.grandTotal,
      delta: this.delta,
      transferred: this.transferred,
      percent: this.transferred / this.progressDifferentialDownloadInfo.grandTotal * 100,
      bytesPerSecond: Math.round(this.transferred / ((i - this.start) / 1e3))
    }), this.delta = 0), r(null, t);
  }
  beginFileCopy() {
    this.operationType = Jt.COPY;
  }
  beginRangeDownload() {
    this.operationType = Jt.DOWNLOAD, this.expectedBytes += this.progressDifferentialDownloadInfo.expectedByteCounts[this.index++];
  }
  endRangeDownload() {
    this.transferred !== this.progressDifferentialDownloadInfo.grandTotal && this.onProgress({
      total: this.progressDifferentialDownloadInfo.grandTotal,
      delta: this.delta,
      transferred: this.transferred,
      percent: this.transferred / this.progressDifferentialDownloadInfo.grandTotal * 100,
      bytesPerSecond: Math.round(this.transferred / ((Date.now() - this.start) / 1e3))
    });
  }
  // Called when we are 100% done with the connection/download
  _flush(t) {
    if (this.cancellationToken.cancelled) {
      t(new Error("cancelled"));
      return;
    }
    this.onProgress({
      total: this.progressDifferentialDownloadInfo.grandTotal,
      delta: this.delta,
      transferred: this.transferred,
      percent: 100,
      bytesPerSecond: Math.round(this.transferred / ((Date.now() - this.start) / 1e3))
    }), this.delta = 0, this.transferred = 0, t(null);
  }
}
di.ProgressDifferentialDownloadCallbackTransform = ew;
Object.defineProperty(Qn, "__esModule", { value: !0 });
Qn.DifferentialDownloader = void 0;
const vn = pe, Wi = Et, tw = te, nw = un, rw = an, Tr = Lt, js = fi, iw = di;
class ow {
  // noinspection TypeScriptAbstractClassConstructorCanBeMadeProtected
  constructor(t, n, r) {
    this.blockAwareFileInfo = t, this.httpExecutor = n, this.options = r, this.fileMetadataBuffer = null, this.logger = r.logger;
  }
  createRequestOptions() {
    const t = {
      headers: {
        ...this.options.requestHeaders,
        accept: "*/*"
      }
    };
    return (0, vn.configureRequestUrl)(this.options.newUrl, t), (0, vn.configureRequestOptions)(t), t;
  }
  doDownload(t, n) {
    if (t.version !== n.version)
      throw new Error(`version is different (${t.version} - ${n.version}), full download is required`);
    const r = this.logger, i = (0, Tr.computeOperations)(t, n, r);
    r.debug != null && r.debug(JSON.stringify(i, null, 2));
    let o = 0, a = 0;
    for (const l of i) {
      const m = l.end - l.start;
      l.kind === Tr.OperationKind.DOWNLOAD ? o += m : a += m;
    }
    const s = this.blockAwareFileInfo.size;
    if (o + a + (this.fileMetadataBuffer == null ? 0 : this.fileMetadataBuffer.length) !== s)
      throw new Error(`Internal error, size mismatch: downloadSize: ${o}, copySize: ${a}, newSize: ${s}`);
    return r.info(`Full: ${Hs(s)}, To download: ${Hs(o)} (${Math.round(o / (s / 100))}%)`), this.downloadFile(i);
  }
  downloadFile(t) {
    const n = [], r = () => Promise.all(n.map((i) => (0, Wi.close)(i.descriptor).catch((o) => {
      this.logger.error(`cannot close file "${i.path}": ${o}`);
    })));
    return this.doDownloadFile(t, n).then(r).catch((i) => r().catch((o) => {
      try {
        this.logger.error(`cannot close files: ${o}`);
      } catch (a) {
        try {
          console.error(a);
        } catch {
        }
      }
      throw i;
    }).then(() => {
      throw i;
    }));
  }
  async doDownloadFile(t, n) {
    const r = await (0, Wi.open)(this.options.oldFile, "r");
    n.push({ descriptor: r, path: this.options.oldFile });
    const i = await (0, Wi.open)(this.options.newFile, "w");
    n.push({ descriptor: i, path: this.options.newFile });
    const o = (0, tw.createWriteStream)(this.options.newFile, { fd: i });
    await new Promise((a, s) => {
      const l = [];
      let m;
      if (!this.options.isUseMultipleRangeRequest && this.options.onProgress) {
        const T = [];
        let A = 0;
        for (const x of t)
          x.kind === Tr.OperationKind.DOWNLOAD && (T.push(x.end - x.start), A += x.end - x.start);
        const P = {
          expectedByteCounts: T,
          grandTotal: A
        };
        m = new iw.ProgressDifferentialDownloadCallbackTransform(P, this.options.cancellationToken, this.options.onProgress), l.push(m);
      }
      const c = new vn.DigestTransform(this.blockAwareFileInfo.sha512);
      c.isValidateOnEnd = !1, l.push(c), o.on("finish", () => {
        o.close(() => {
          n.splice(1, 1);
          try {
            c.validate();
          } catch (T) {
            s(T);
            return;
          }
          a(void 0);
        });
      }), l.push(o);
      let f = null;
      for (const T of l)
        T.on("error", s), f == null ? f = T : f = f.pipe(T);
      const d = l[0];
      let g;
      if (this.options.isUseMultipleRangeRequest) {
        g = (0, js.executeTasksUsingMultipleRangeRequests)(this, t, d, r, s), g(0);
        return;
      }
      let w = 0, y = null;
      this.logger.info(`Differential download: ${this.options.newUrl}`);
      const S = this.createRequestOptions();
      S.redirect = "manual", g = (T) => {
        var A, P;
        if (T >= t.length) {
          this.fileMetadataBuffer != null && d.write(this.fileMetadataBuffer), d.end();
          return;
        }
        const x = t[T++];
        if (x.kind === Tr.OperationKind.COPY) {
          m && m.beginFileCopy(), (0, nw.copyData)(x, d, r, s, () => g(T));
          return;
        }
        const X = `bytes=${x.start}-${x.end - 1}`;
        S.headers.range = X, (P = (A = this.logger) === null || A === void 0 ? void 0 : A.debug) === null || P === void 0 || P.call(A, `download range: ${X}`), m && m.beginRangeDownload();
        const Z = this.httpExecutor.createRequest(S, (V) => {
          V.on("error", s), V.on("aborted", () => {
            s(new Error("response has been aborted by the server"));
          }), V.statusCode >= 400 && s((0, vn.createHttpError)(V)), V.pipe(d, {
            end: !1
          }), V.once("end", () => {
            m && m.endRangeDownload(), ++w === 100 ? (w = 0, setTimeout(() => g(T), 1e3)) : g(T);
          });
        });
        Z.on("redirect", (V, le, E) => {
          this.logger.info(`Redirect to ${aw(E)}`), y = E, (0, vn.configureRequestUrl)(new rw.URL(y), S), Z.followRedirect();
        }), this.httpExecutor.addErrorAndTimeoutHandlers(Z, s), Z.end();
      }, g(0);
    });
  }
  async readRemoteBytes(t, n) {
    const r = Buffer.allocUnsafe(n + 1 - t), i = this.createRequestOptions();
    i.headers.range = `bytes=${t}-${n}`;
    let o = 0;
    if (await this.request(i, (a) => {
      a.copy(r, o), o += a.length;
    }), o !== r.length)
      throw new Error(`Received data length ${o} is not equal to expected ${r.length}`);
    return r;
  }
  request(t, n) {
    return new Promise((r, i) => {
      const o = this.httpExecutor.createRequest(t, (a) => {
        (0, js.checkIsRangesSupported)(a, i) && (a.on("error", i), a.on("aborted", () => {
          i(new Error("response has been aborted by the server"));
        }), a.on("data", n), a.on("end", () => r()));
      });
      this.httpExecutor.addErrorAndTimeoutHandlers(o, i), o.end();
    });
  }
}
Qn.DifferentialDownloader = ow;
function Hs(e, t = " KB") {
  return new Intl.NumberFormat("en").format((e / 1024).toFixed(2)) + t;
}
function aw(e) {
  const t = e.indexOf("?");
  return t < 0 ? e : e.substring(0, t);
}
Object.defineProperty(ui, "__esModule", { value: !0 });
ui.GenericDifferentialDownloader = void 0;
const sw = Qn;
class lw extends sw.DifferentialDownloader {
  download(t, n) {
    return this.doDownload(t, n);
  }
}
ui.GenericDifferentialDownloader = lw;
var yt = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.UpdaterSignal = e.UPDATE_DOWNLOADED = e.DOWNLOAD_PROGRESS = e.CancellationToken = void 0, e.addHandler = r;
  const t = pe;
  Object.defineProperty(e, "CancellationToken", { enumerable: !0, get: function() {
    return t.CancellationToken;
  } }), e.DOWNLOAD_PROGRESS = "download-progress", e.UPDATE_DOWNLOADED = "update-downloaded";
  class n {
    constructor(o) {
      this.emitter = o;
    }
    /**
     * Emitted when an authenticating proxy is [asking for user credentials](https://github.com/electron/electron/blob/master/docs/api/client-request.md#event-login).
     */
    login(o) {
      r(this.emitter, "login", o);
    }
    progress(o) {
      r(this.emitter, e.DOWNLOAD_PROGRESS, o);
    }
    updateDownloaded(o) {
      r(this.emitter, e.UPDATE_DOWNLOADED, o);
    }
    updateCancelled(o) {
      r(this.emitter, "update-cancelled", o);
    }
  }
  e.UpdaterSignal = n;
  function r(i, o, a) {
    i.on(o, a);
  }
})(yt);
Object.defineProperty(dt, "__esModule", { value: !0 });
dt.NoOpLogger = dt.AppUpdater = void 0;
const Ae = pe, cw = qn, uw = Gr, fw = cl, Ht = Et, dw = ye, Yi = Zr, Tt = z, bt = lu, qs = Kn, hw = oi, Gs = cu, pw = Jn, zi = ai, mw = fl, gw = Ue, Ew = ui, qt = yt;
class Vo extends fw.EventEmitter {
  /**
   * Get the update channel. Doesn't return `channel` from the update configuration, only if was previously set.
   */
  get channel() {
    return this._channel;
  }
  /**
   * Set the update channel. Overrides `channel` in the update configuration.
   *
   * `allowDowngrade` will be automatically set to `true`. If this behavior is not suitable for you, simple set `allowDowngrade` explicitly after.
   */
  set channel(t) {
    if (this._channel != null) {
      if (typeof t != "string")
        throw (0, Ae.newError)(`Channel must be a string, but got: ${t}`, "ERR_UPDATER_INVALID_CHANNEL");
      if (t.length === 0)
        throw (0, Ae.newError)("Channel must be not an empty string", "ERR_UPDATER_INVALID_CHANNEL");
    }
    this._channel = t, this.allowDowngrade = !0;
  }
  /**
   *  Shortcut for explicitly adding auth tokens to request headers
   */
  addAuthHeader(t) {
    this.requestHeaders = Object.assign({}, this.requestHeaders, {
      authorization: t
    });
  }
  // noinspection JSMethodCanBeStatic,JSUnusedGlobalSymbols
  get netSession() {
    return (0, Gs.getNetSession)();
  }
  /**
   * The logger. You can pass [electron-log](https://github.com/megahertz/electron-log), [winston](https://github.com/winstonjs/winston) or another logger with the following interface: `{ info(), warn(), error() }`.
   * Set it to `null` if you would like to disable a logging feature.
   */
  get logger() {
    return this._logger;
  }
  set logger(t) {
    this._logger = t ?? new Eu();
  }
  // noinspection JSUnusedGlobalSymbols
  /**
   * test only
   * @private
   */
  set updateConfigPath(t) {
    this.clientPromise = null, this._appUpdateConfigPath = t, this.configOnDisk = new Yi.Lazy(() => this.loadUpdateConfig());
  }
  /**
   * Allows developer to override default logic for determining if an update is supported.
   * The default logic compares the `UpdateInfo` minimum system version against the `os.release()` with `semver` package
   */
  get isUpdateSupported() {
    return this._isUpdateSupported;
  }
  set isUpdateSupported(t) {
    t && (this._isUpdateSupported = t);
  }
  constructor(t, n) {
    super(), this.autoDownload = !0, this.autoInstallOnAppQuit = !0, this.autoRunAppAfterInstall = !0, this.allowPrerelease = !1, this.fullChangelog = !1, this.allowDowngrade = !1, this.disableWebInstaller = !1, this.disableDifferentialDownload = !1, this.forceDevUpdateConfig = !1, this._channel = null, this.downloadedUpdateHelper = null, this.requestHeaders = null, this._logger = console, this.signals = new qt.UpdaterSignal(this), this._appUpdateConfigPath = null, this._isUpdateSupported = (o) => this.checkIfUpdateSupported(o), this.clientPromise = null, this.stagingUserIdPromise = new Yi.Lazy(() => this.getOrCreateStagingUserId()), this.configOnDisk = new Yi.Lazy(() => this.loadUpdateConfig()), this.checkForUpdatesPromise = null, this.downloadPromise = null, this.updateInfoAndProvider = null, this._testOnlyOptions = null, this.on("error", (o) => {
      this._logger.error(`Error: ${o.stack || o.message}`);
    }), n == null ? (this.app = new hw.ElectronAppAdapter(), this.httpExecutor = new Gs.ElectronHttpExecutor((o, a) => this.emit("login", o, a))) : (this.app = n, this.httpExecutor = null);
    const r = this.app.version, i = (0, bt.parse)(r);
    if (i == null)
      throw (0, Ae.newError)(`App version is not a valid semver version: "${r}"`, "ERR_UPDATER_INVALID_VERSION");
    this.currentVersion = i, this.allowPrerelease = yw(i), t != null && (this.setFeedURL(t), typeof t != "string" && t.requestHeaders && (this.requestHeaders = t.requestHeaders));
  }
  //noinspection JSMethodCanBeStatic,JSUnusedGlobalSymbols
  getFeedURL() {
    return "Deprecated. Do not use it.";
  }
  /**
   * Configure update provider. If value is `string`, [GenericServerOptions](./publish.md#genericserveroptions) will be set with value as `url`.
   * @param options If you want to override configuration in the `app-update.yml`.
   */
  setFeedURL(t) {
    const n = this.createProviderRuntimeOptions();
    let r;
    typeof t == "string" ? r = new pw.GenericProvider({ provider: "generic", url: t }, this, {
      ...n,
      isUseMultipleRangeRequest: (0, zi.isUrlProbablySupportMultiRangeRequests)(t)
    }) : r = (0, zi.createClient)(t, this, n), this.clientPromise = Promise.resolve(r);
  }
  /**
   * Asks the server whether there is an update.
   * @returns null if the updater is disabled, otherwise info about the latest version
   */
  checkForUpdates() {
    if (!this.isUpdaterActive())
      return Promise.resolve(null);
    let t = this.checkForUpdatesPromise;
    if (t != null)
      return this._logger.info("Checking for update (already in progress)"), t;
    const n = () => this.checkForUpdatesPromise = null;
    return this._logger.info("Checking for update"), t = this.doCheckForUpdates().then((r) => (n(), r)).catch((r) => {
      throw n(), this.emit("error", r, `Cannot check for updates: ${(r.stack || r).toString()}`), r;
    }), this.checkForUpdatesPromise = t, t;
  }
  isUpdaterActive() {
    return this.app.isPackaged || this.forceDevUpdateConfig ? !0 : (this._logger.info("Skip checkForUpdates because application is not packed and dev update config is not forced"), !1);
  }
  // noinspection JSUnusedGlobalSymbols
  checkForUpdatesAndNotify(t) {
    return this.checkForUpdates().then((n) => n != null && n.downloadPromise ? (n.downloadPromise.then(() => {
      const r = Vo.formatDownloadNotification(n.updateInfo.version, this.app.name, t);
      new Dt.Notification(r).show();
    }), n) : (this._logger.debug != null && this._logger.debug("checkForUpdatesAndNotify called, downloadPromise is null"), n));
  }
  static formatDownloadNotification(t, n, r) {
    return r == null && (r = {
      title: "A new update is ready to install",
      body: "{appName} version {version} has been downloaded and will be automatically installed on exit"
    }), r = {
      title: r.title.replace("{appName}", n).replace("{version}", t),
      body: r.body.replace("{appName}", n).replace("{version}", t)
    }, r;
  }
  async isStagingMatch(t) {
    const n = t.stagingPercentage;
    let r = n;
    if (r == null)
      return !0;
    if (r = parseInt(r, 10), isNaN(r))
      return this._logger.warn(`Staging percentage is NaN: ${n}`), !0;
    r = r / 100;
    const i = await this.stagingUserIdPromise.value, a = Ae.UUID.parse(i).readUInt32BE(12) / 4294967295;
    return this._logger.info(`Staging percentage: ${r}, percentage: ${a}, user id: ${i}`), a < r;
  }
  computeFinalHeaders(t) {
    return this.requestHeaders != null && Object.assign(t, this.requestHeaders), t;
  }
  async isUpdateAvailable(t) {
    const n = (0, bt.parse)(t.version);
    if (n == null)
      throw (0, Ae.newError)(`This file could not be downloaded, or the latest version (from update server) does not have a valid semver version: "${t.version}"`, "ERR_UPDATER_INVALID_VERSION");
    const r = this.currentVersion;
    if ((0, bt.eq)(n, r) || !await Promise.resolve(this.isUpdateSupported(t)) || !await this.isStagingMatch(t))
      return !1;
    const o = (0, bt.gt)(n, r), a = (0, bt.lt)(n, r);
    return o ? !0 : this.allowDowngrade && a;
  }
  checkIfUpdateSupported(t) {
    const n = t == null ? void 0 : t.minimumSystemVersion, r = (0, uw.release)();
    if (n)
      try {
        if ((0, bt.lt)(r, n))
          return this._logger.info(`Current OS version ${r} is less than the minimum OS version required ${n} for version ${r}`), !1;
      } catch (i) {
        this._logger.warn(`Failed to compare current OS version(${r}) with minimum OS version(${n}): ${(i.message || i).toString()}`);
      }
    return !0;
  }
  async getUpdateInfoAndProvider() {
    await this.app.whenReady(), this.clientPromise == null && (this.clientPromise = this.configOnDisk.value.then((r) => (0, zi.createClient)(r, this, this.createProviderRuntimeOptions())));
    const t = await this.clientPromise, n = await this.stagingUserIdPromise.value;
    return t.setRequestHeaders(this.computeFinalHeaders({ "x-user-staging-id": n })), {
      info: await t.getLatestVersion(),
      provider: t
    };
  }
  createProviderRuntimeOptions() {
    return {
      isUseMultipleRangeRequest: !0,
      platform: this._testOnlyOptions == null ? process.platform : this._testOnlyOptions.platform,
      executor: this.httpExecutor
    };
  }
  async doCheckForUpdates() {
    this.emit("checking-for-update");
    const t = await this.getUpdateInfoAndProvider(), n = t.info;
    if (!await this.isUpdateAvailable(n))
      return this._logger.info(`Update for version ${this.currentVersion.format()} is not available (latest version: ${n.version}, downgrade is ${this.allowDowngrade ? "allowed" : "disallowed"}).`), this.emit("update-not-available", n), {
        isUpdateAvailable: !1,
        versionInfo: n,
        updateInfo: n
      };
    this.updateInfoAndProvider = t, this.onUpdateAvailable(n);
    const r = new Ae.CancellationToken();
    return {
      isUpdateAvailable: !0,
      versionInfo: n,
      updateInfo: n,
      cancellationToken: r,
      downloadPromise: this.autoDownload ? this.downloadUpdate(r) : null
    };
  }
  onUpdateAvailable(t) {
    this._logger.info(`Found version ${t.version} (url: ${(0, Ae.asArray)(t.files).map((n) => n.url).join(", ")})`), this.emit("update-available", t);
  }
  /**
   * Start downloading update manually. You can use this method if `autoDownload` option is set to `false`.
   * @returns {Promise<Array<string>>} Paths to downloaded files.
   */
  downloadUpdate(t = new Ae.CancellationToken()) {
    const n = this.updateInfoAndProvider;
    if (n == null) {
      const i = new Error("Please check update first");
      return this.dispatchError(i), Promise.reject(i);
    }
    if (this.downloadPromise != null)
      return this._logger.info("Downloading update (already in progress)"), this.downloadPromise;
    this._logger.info(`Downloading update from ${(0, Ae.asArray)(n.info.files).map((i) => i.url).join(", ")}`);
    const r = (i) => {
      if (!(i instanceof Ae.CancellationError))
        try {
          this.dispatchError(i);
        } catch (o) {
          this._logger.warn(`Cannot dispatch error event: ${o.stack || o}`);
        }
      return i;
    };
    return this.downloadPromise = this.doDownloadUpdate({
      updateInfoAndProvider: n,
      requestHeaders: this.computeRequestHeaders(n.provider),
      cancellationToken: t,
      disableWebInstaller: this.disableWebInstaller,
      disableDifferentialDownload: this.disableDifferentialDownload
    }).catch((i) => {
      throw r(i);
    }).finally(() => {
      this.downloadPromise = null;
    }), this.downloadPromise;
  }
  dispatchError(t) {
    this.emit("error", t, (t.stack || t).toString());
  }
  dispatchUpdateDownloaded(t) {
    this.emit(qt.UPDATE_DOWNLOADED, t);
  }
  async loadUpdateConfig() {
    return this._appUpdateConfigPath == null && (this._appUpdateConfigPath = this.app.appUpdateConfigPath), (0, dw.load)(await (0, Ht.readFile)(this._appUpdateConfigPath, "utf-8"));
  }
  computeRequestHeaders(t) {
    const n = t.fileExtraDownloadHeaders;
    if (n != null) {
      const r = this.requestHeaders;
      return r == null ? n : {
        ...n,
        ...r
      };
    }
    return this.computeFinalHeaders({ accept: "*/*" });
  }
  async getOrCreateStagingUserId() {
    const t = Tt.join(this.app.userDataPath, ".updaterId");
    try {
      const r = await (0, Ht.readFile)(t, "utf-8");
      if (Ae.UUID.check(r))
        return r;
      this._logger.warn(`Staging user id file exists, but content was invalid: ${r}`);
    } catch (r) {
      r.code !== "ENOENT" && this._logger.warn(`Couldn't read staging user ID, creating a blank one: ${r}`);
    }
    const n = Ae.UUID.v5((0, cw.randomBytes)(4096), Ae.UUID.OID);
    this._logger.info(`Generated new staging user ID: ${n}`);
    try {
      await (0, Ht.outputFile)(t, n);
    } catch (r) {
      this._logger.warn(`Couldn't write out staging user ID: ${r}`);
    }
    return n;
  }
  /** @internal */
  get isAddNoCacheQuery() {
    const t = this.requestHeaders;
    if (t == null)
      return !0;
    for (const n of Object.keys(t)) {
      const r = n.toLowerCase();
      if (r === "authorization" || r === "private-token")
        return !1;
    }
    return !0;
  }
  async getOrCreateDownloadHelper() {
    let t = this.downloadedUpdateHelper;
    if (t == null) {
      const n = (await this.configOnDisk.value).updaterCacheDirName, r = this._logger;
      n == null && r.error("updaterCacheDirName is not specified in app-update.yml Was app build using at least electron-builder 20.34.0?");
      const i = Tt.join(this.app.baseCachePath, n || this.app.name);
      r.debug != null && r.debug(`updater cache dir: ${i}`), t = new qs.DownloadedUpdateHelper(i), this.downloadedUpdateHelper = t;
    }
    return t;
  }
  async executeDownload(t) {
    const n = t.fileInfo, r = {
      headers: t.downloadUpdateOptions.requestHeaders,
      cancellationToken: t.downloadUpdateOptions.cancellationToken,
      sha2: n.info.sha2,
      sha512: n.info.sha512
    };
    this.listenerCount(qt.DOWNLOAD_PROGRESS) > 0 && (r.onProgress = (A) => this.emit(qt.DOWNLOAD_PROGRESS, A));
    const i = t.downloadUpdateOptions.updateInfoAndProvider.info, o = i.version, a = n.packageInfo;
    function s() {
      const A = decodeURIComponent(t.fileInfo.url.pathname);
      return A.endsWith(`.${t.fileExtension}`) ? Tt.basename(A) : t.fileInfo.info.url;
    }
    const l = await this.getOrCreateDownloadHelper(), m = l.cacheDirForPendingUpdate;
    await (0, Ht.mkdir)(m, { recursive: !0 });
    const c = s();
    let f = Tt.join(m, c);
    const d = a == null ? null : Tt.join(m, `package-${o}${Tt.extname(a.path) || ".7z"}`), g = async (A) => (await l.setDownloadedFile(f, d, i, n, c, A), await t.done({
      ...i,
      downloadedFile: f
    }), d == null ? [f] : [f, d]), w = this._logger, y = await l.validateDownloadedPath(f, i, n, w);
    if (y != null)
      return f = y, await g(!1);
    const S = async () => (await l.clear().catch(() => {
    }), await (0, Ht.unlink)(f).catch(() => {
    })), T = await (0, qs.createTempUpdateFile)(`temp-${c}`, m, w);
    try {
      await t.task(T, r, d, S), await (0, Ae.retry)(() => (0, Ht.rename)(T, f), 60, 500, 0, 0, (A) => A instanceof Error && /^EBUSY:/.test(A.message));
    } catch (A) {
      throw await S(), A instanceof Ae.CancellationError && (w.info("cancelled"), this.emit("update-cancelled", i)), A;
    }
    return w.info(`New version ${o} has been downloaded to ${f}`), await g(!0);
  }
  async differentialDownloadInstaller(t, n, r, i, o) {
    try {
      if (this._testOnlyOptions != null && !this._testOnlyOptions.isUseDifferentialDownload)
        return !0;
      const a = (0, gw.blockmapFiles)(t.url, this.app.version, n.updateInfoAndProvider.info.version);
      this._logger.info(`Download block maps (old: "${a[0]}", new: ${a[1]})`);
      const s = async (c) => {
        const f = await this.httpExecutor.downloadToBuffer(c, {
          headers: n.requestHeaders,
          cancellationToken: n.cancellationToken
        });
        if (f == null || f.length === 0)
          throw new Error(`Blockmap "${c.href}" is empty`);
        try {
          return JSON.parse((0, mw.gunzipSync)(f).toString());
        } catch (d) {
          throw new Error(`Cannot parse blockmap "${c.href}", error: ${d}`);
        }
      }, l = {
        newUrl: t.url,
        oldFile: Tt.join(this.downloadedUpdateHelper.cacheDir, o),
        logger: this._logger,
        newFile: r,
        isUseMultipleRangeRequest: i.isUseMultipleRangeRequest,
        requestHeaders: n.requestHeaders,
        cancellationToken: n.cancellationToken
      };
      this.listenerCount(qt.DOWNLOAD_PROGRESS) > 0 && (l.onProgress = (c) => this.emit(qt.DOWNLOAD_PROGRESS, c));
      const m = await Promise.all(a.map((c) => s(c)));
      return await new Ew.GenericDifferentialDownloader(t.info, this.httpExecutor, l).download(m[0], m[1]), !1;
    } catch (a) {
      if (this._logger.error(`Cannot download differentially, fallback to full download: ${a.stack || a}`), this._testOnlyOptions != null)
        throw a;
      return !0;
    }
  }
}
dt.AppUpdater = Vo;
function yw(e) {
  const t = (0, bt.prerelease)(e);
  return t != null && t.length > 0;
}
class Eu {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  info(t) {
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  warn(t) {
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  error(t) {
  }
}
dt.NoOpLogger = Eu;
Object.defineProperty(Ze, "__esModule", { value: !0 });
Ze.BaseUpdater = void 0;
const Vs = qr, vw = dt;
class ww extends vw.AppUpdater {
  constructor(t, n) {
    super(t, n), this.quitAndInstallCalled = !1, this.quitHandlerAdded = !1;
  }
  quitAndInstall(t = !1, n = !1) {
    this._logger.info("Install on explicit quitAndInstall"), this.install(t, t ? n : this.autoRunAppAfterInstall) ? setImmediate(() => {
      Dt.autoUpdater.emit("before-quit-for-update"), this.app.quit();
    }) : this.quitAndInstallCalled = !1;
  }
  executeDownload(t) {
    return super.executeDownload({
      ...t,
      done: (n) => (this.dispatchUpdateDownloaded(n), this.addQuitHandler(), Promise.resolve())
    });
  }
  get installerPath() {
    return this.downloadedUpdateHelper == null ? null : this.downloadedUpdateHelper.file;
  }
  // must be sync (because quit even handler is not async)
  install(t = !1, n = !1) {
    if (this.quitAndInstallCalled)
      return this._logger.warn("install call ignored: quitAndInstallCalled is set to true"), !1;
    const r = this.downloadedUpdateHelper, i = this.installerPath, o = r == null ? null : r.downloadedFileInfo;
    if (i == null || o == null)
      return this.dispatchError(new Error("No valid update available, can't quit and install")), !1;
    this.quitAndInstallCalled = !0;
    try {
      return this._logger.info(`Install: isSilent: ${t}, isForceRunAfter: ${n}`), this.doInstall({
        isSilent: t,
        isForceRunAfter: n,
        isAdminRightsRequired: o.isAdminRightsRequired
      });
    } catch (a) {
      return this.dispatchError(a), !1;
    }
  }
  addQuitHandler() {
    this.quitHandlerAdded || !this.autoInstallOnAppQuit || (this.quitHandlerAdded = !0, this.app.onQuit((t) => {
      if (this.quitAndInstallCalled) {
        this._logger.info("Update installer has already been triggered. Quitting application.");
        return;
      }
      if (!this.autoInstallOnAppQuit) {
        this._logger.info("Update will not be installed on quit because autoInstallOnAppQuit is set to false.");
        return;
      }
      if (t !== 0) {
        this._logger.info(`Update will be not installed on quit because application is quitting with exit code ${t}`);
        return;
      }
      this._logger.info("Auto install update on quit"), this.install(!0, !1);
    }));
  }
  wrapSudo() {
    const { name: t } = this.app, n = `"${t} would like to update"`, r = this.spawnSyncLog("which gksudo || which kdesudo || which pkexec || which beesu"), i = [r];
    return /kdesudo/i.test(r) ? (i.push("--comment", n), i.push("-c")) : /gksudo/i.test(r) ? i.push("--message", n) : /pkexec/i.test(r) && i.push("--disable-internal-agent"), i.join(" ");
  }
  spawnSyncLog(t, n = [], r = {}) {
    this._logger.info(`Executing: ${t} with args: ${n}`);
    const i = (0, Vs.spawnSync)(t, n, {
      env: { ...process.env, ...r },
      encoding: "utf-8",
      shell: !0
    }), { error: o, status: a, stdout: s, stderr: l } = i;
    if (o != null)
      throw this._logger.error(l), o;
    if (a != null && a !== 0)
      throw this._logger.error(l), new Error(`Command ${t} exited with code ${a}`);
    return s.trim();
  }
  /**
   * This handles both node 8 and node 10 way of emitting error when spawning a process
   *   - node 8: Throws the error
   *   - node 10: Emit the error(Need to listen with on)
   */
  // https://github.com/electron-userland/electron-builder/issues/1129
  // Node 8 sends errors: https://nodejs.org/dist/latest-v8.x/docs/api/errors.html#errors_common_system_errors
  async spawnLog(t, n = [], r = void 0, i = "ignore") {
    return this._logger.info(`Executing: ${t} with args: ${n}`), new Promise((o, a) => {
      try {
        const s = { stdio: i, env: r, detached: !0 }, l = (0, Vs.spawn)(t, n, s);
        l.on("error", (m) => {
          a(m);
        }), l.unref(), l.pid !== void 0 && o(!0);
      } catch (s) {
        a(s);
      }
    });
  }
}
Ze.BaseUpdater = ww;
var Ln = {}, Zn = {};
Object.defineProperty(Zn, "__esModule", { value: !0 });
Zn.FileWithEmbeddedBlockMapDifferentialDownloader = void 0;
const Gt = Et, _w = Qn, Sw = fl;
class Aw extends _w.DifferentialDownloader {
  async download() {
    const t = this.blockAwareFileInfo, n = t.size, r = n - (t.blockMapSize + 4);
    this.fileMetadataBuffer = await this.readRemoteBytes(r, n - 1);
    const i = yu(this.fileMetadataBuffer.slice(0, this.fileMetadataBuffer.length - 4));
    await this.doDownload(await Tw(this.options.oldFile), i);
  }
}
Zn.FileWithEmbeddedBlockMapDifferentialDownloader = Aw;
function yu(e) {
  return JSON.parse((0, Sw.inflateRawSync)(e).toString());
}
async function Tw(e) {
  const t = await (0, Gt.open)(e, "r");
  try {
    const n = (await (0, Gt.fstat)(t)).size, r = Buffer.allocUnsafe(4);
    await (0, Gt.read)(t, r, 0, r.length, n - r.length);
    const i = Buffer.allocUnsafe(r.readUInt32BE(0));
    return await (0, Gt.read)(t, i, 0, i.length, n - r.length - i.length), await (0, Gt.close)(t), yu(i);
  } catch (n) {
    throw await (0, Gt.close)(t), n;
  }
}
Object.defineProperty(Ln, "__esModule", { value: !0 });
Ln.AppImageUpdater = void 0;
const Ws = pe, Ys = qr, Cw = Et, bw = te, wn = z, $w = Ze, Ow = Zn, Iw = ue, zs = yt;
class Rw extends $w.BaseUpdater {
  constructor(t, n) {
    super(t, n);
  }
  isUpdaterActive() {
    return process.env.APPIMAGE == null ? (process.env.SNAP == null ? this._logger.warn("APPIMAGE env is not defined, current application is not an AppImage") : this._logger.info("SNAP env is defined, updater is disabled"), !1) : super.isUpdaterActive();
  }
  /*** @private */
  doDownloadUpdate(t) {
    const n = t.updateInfoAndProvider.provider, r = (0, Iw.findFile)(n.resolveFiles(t.updateInfoAndProvider.info), "AppImage", ["rpm", "deb", "pacman"]);
    return this.executeDownload({
      fileExtension: "AppImage",
      fileInfo: r,
      downloadUpdateOptions: t,
      task: async (i, o) => {
        const a = process.env.APPIMAGE;
        if (a == null)
          throw (0, Ws.newError)("APPIMAGE env is not defined", "ERR_UPDATER_OLD_FILE_NOT_FOUND");
        (t.disableDifferentialDownload || await this.downloadDifferential(r, a, i, n, t)) && await this.httpExecutor.download(r.url, i, o), await (0, Cw.chmod)(i, 493);
      }
    });
  }
  async downloadDifferential(t, n, r, i, o) {
    try {
      const a = {
        newUrl: t.url,
        oldFile: n,
        logger: this._logger,
        newFile: r,
        isUseMultipleRangeRequest: i.isUseMultipleRangeRequest,
        requestHeaders: o.requestHeaders,
        cancellationToken: o.cancellationToken
      };
      return this.listenerCount(zs.DOWNLOAD_PROGRESS) > 0 && (a.onProgress = (s) => this.emit(zs.DOWNLOAD_PROGRESS, s)), await new Ow.FileWithEmbeddedBlockMapDifferentialDownloader(t.info, this.httpExecutor, a).download(), !1;
    } catch (a) {
      return this._logger.error(`Cannot download differentially, fallback to full download: ${a.stack || a}`), process.platform === "linux";
    }
  }
  doInstall(t) {
    const n = process.env.APPIMAGE;
    if (n == null)
      throw (0, Ws.newError)("APPIMAGE env is not defined", "ERR_UPDATER_OLD_FILE_NOT_FOUND");
    (0, bw.unlinkSync)(n);
    let r;
    const i = wn.basename(n), o = this.installerPath;
    if (o == null)
      return this.dispatchError(new Error("No valid update available, can't quit and install")), !1;
    wn.basename(o) === i || !/\d+\.\d+\.\d+/.test(i) ? r = n : r = wn.join(wn.dirname(n), wn.basename(o)), (0, Ys.execFileSync)("mv", ["-f", o, r]), r !== n && this.emit("appimage-filename-updated", r);
    const a = {
      ...process.env,
      APPIMAGE_SILENT_INSTALL: "true"
    };
    return t.isForceRunAfter ? this.spawnLog(r, [], a) : (a.APPIMAGE_EXIT_AFTER_INSTALL = "true", (0, Ys.execFileSync)(r, [], { env: a })), !0;
  }
}
Ln.AppImageUpdater = Rw;
var Un = {};
Object.defineProperty(Un, "__esModule", { value: !0 });
Un.DebUpdater = void 0;
const Pw = Ze, Dw = ue, Xs = yt;
class Nw extends Pw.BaseUpdater {
  constructor(t, n) {
    super(t, n);
  }
  /*** @private */
  doDownloadUpdate(t) {
    const n = t.updateInfoAndProvider.provider, r = (0, Dw.findFile)(n.resolveFiles(t.updateInfoAndProvider.info), "deb", ["AppImage", "rpm", "pacman"]);
    return this.executeDownload({
      fileExtension: "deb",
      fileInfo: r,
      downloadUpdateOptions: t,
      task: async (i, o) => {
        this.listenerCount(Xs.DOWNLOAD_PROGRESS) > 0 && (o.onProgress = (a) => this.emit(Xs.DOWNLOAD_PROGRESS, a)), await this.httpExecutor.download(r.url, i, o);
      }
    });
  }
  get installerPath() {
    var t, n;
    return (n = (t = super.installerPath) === null || t === void 0 ? void 0 : t.replace(/ /g, "\\ ")) !== null && n !== void 0 ? n : null;
  }
  doInstall(t) {
    const n = this.wrapSudo(), r = /pkexec/i.test(n) ? "" : '"', i = this.installerPath;
    if (i == null)
      return this.dispatchError(new Error("No valid update available, can't quit and install")), !1;
    const o = ["dpkg", "-i", i, "||", "apt-get", "install", "-f", "-y"];
    return this.spawnSyncLog(n, [`${r}/bin/bash`, "-c", `'${o.join(" ")}'${r}`]), t.isForceRunAfter && this.app.relaunch(), !0;
  }
}
Un.DebUpdater = Nw;
var kn = {};
Object.defineProperty(kn, "__esModule", { value: !0 });
kn.PacmanUpdater = void 0;
const Fw = Ze, Ks = yt, xw = ue;
class Lw extends Fw.BaseUpdater {
  constructor(t, n) {
    super(t, n);
  }
  /*** @private */
  doDownloadUpdate(t) {
    const n = t.updateInfoAndProvider.provider, r = (0, xw.findFile)(n.resolveFiles(t.updateInfoAndProvider.info), "pacman", ["AppImage", "deb", "rpm"]);
    return this.executeDownload({
      fileExtension: "pacman",
      fileInfo: r,
      downloadUpdateOptions: t,
      task: async (i, o) => {
        this.listenerCount(Ks.DOWNLOAD_PROGRESS) > 0 && (o.onProgress = (a) => this.emit(Ks.DOWNLOAD_PROGRESS, a)), await this.httpExecutor.download(r.url, i, o);
      }
    });
  }
  get installerPath() {
    var t, n;
    return (n = (t = super.installerPath) === null || t === void 0 ? void 0 : t.replace(/ /g, "\\ ")) !== null && n !== void 0 ? n : null;
  }
  doInstall(t) {
    const n = this.wrapSudo(), r = /pkexec/i.test(n) ? "" : '"', i = this.installerPath;
    if (i == null)
      return this.dispatchError(new Error("No valid update available, can't quit and install")), !1;
    const o = ["pacman", "-U", "--noconfirm", i];
    return this.spawnSyncLog(n, [`${r}/bin/bash`, "-c", `'${o.join(" ")}'${r}`]), t.isForceRunAfter && this.app.relaunch(), !0;
  }
}
kn.PacmanUpdater = Lw;
var Mn = {};
Object.defineProperty(Mn, "__esModule", { value: !0 });
Mn.RpmUpdater = void 0;
const Uw = Ze, Js = yt, kw = ue;
class Mw extends Uw.BaseUpdater {
  constructor(t, n) {
    super(t, n);
  }
  /*** @private */
  doDownloadUpdate(t) {
    const n = t.updateInfoAndProvider.provider, r = (0, kw.findFile)(n.resolveFiles(t.updateInfoAndProvider.info), "rpm", ["AppImage", "deb", "pacman"]);
    return this.executeDownload({
      fileExtension: "rpm",
      fileInfo: r,
      downloadUpdateOptions: t,
      task: async (i, o) => {
        this.listenerCount(Js.DOWNLOAD_PROGRESS) > 0 && (o.onProgress = (a) => this.emit(Js.DOWNLOAD_PROGRESS, a)), await this.httpExecutor.download(r.url, i, o);
      }
    });
  }
  get installerPath() {
    var t, n;
    return (n = (t = super.installerPath) === null || t === void 0 ? void 0 : t.replace(/ /g, "\\ ")) !== null && n !== void 0 ? n : null;
  }
  doInstall(t) {
    const n = this.wrapSudo(), r = /pkexec/i.test(n) ? "" : '"', i = this.spawnSyncLog("which zypper"), o = this.installerPath;
    if (o == null)
      return this.dispatchError(new Error("No valid update available, can't quit and install")), !1;
    let a;
    return i ? a = [i, "--no-refresh", "install", "--allow-unsigned-rpm", "-y", "-f", o] : a = [this.spawnSyncLog("which dnf || which yum"), "-y", "install", o], this.spawnSyncLog(n, [`${r}/bin/bash`, "-c", `'${a.join(" ")}'${r}`]), t.isForceRunAfter && this.app.relaunch(), !0;
  }
}
Mn.RpmUpdater = Mw;
var Bn = {};
Object.defineProperty(Bn, "__esModule", { value: !0 });
Bn.MacUpdater = void 0;
const Qs = pe, Xi = Et, Bw = te, Zs = z, jw = Nf, Hw = dt, qw = ue, el = qr, tl = qn;
class Gw extends Hw.AppUpdater {
  constructor(t, n) {
    super(t, n), this.nativeUpdater = Dt.autoUpdater, this.squirrelDownloadedUpdate = !1, this.nativeUpdater.on("error", (r) => {
      this._logger.warn(r), this.emit("error", r);
    }), this.nativeUpdater.on("update-downloaded", () => {
      this.squirrelDownloadedUpdate = !0, this.debug("nativeUpdater.update-downloaded");
    });
  }
  debug(t) {
    this._logger.debug != null && this._logger.debug(t);
  }
  closeServerIfExists() {
    this.server && (this.debug("Closing proxy server"), this.server.close((t) => {
      t && this.debug("proxy server wasn't already open, probably attempted closing again as a safety check before quit");
    }));
  }
  async doDownloadUpdate(t) {
    let n = t.updateInfoAndProvider.provider.resolveFiles(t.updateInfoAndProvider.info);
    const r = this._logger, i = "sysctl.proc_translated";
    let o = !1;
    try {
      this.debug("Checking for macOS Rosetta environment"), o = (0, el.execFileSync)("sysctl", [i], { encoding: "utf8" }).includes(`${i}: 1`), r.info(`Checked for macOS Rosetta environment (isRosetta=${o})`);
    } catch (f) {
      r.warn(`sysctl shell command to check for macOS Rosetta environment failed: ${f}`);
    }
    let a = !1;
    try {
      this.debug("Checking for arm64 in uname");
      const d = (0, el.execFileSync)("uname", ["-a"], { encoding: "utf8" }).includes("ARM");
      r.info(`Checked 'uname -a': arm64=${d}`), a = a || d;
    } catch (f) {
      r.warn(`uname shell command to check for arm64 failed: ${f}`);
    }
    a = a || process.arch === "arm64" || o;
    const s = (f) => {
      var d;
      return f.url.pathname.includes("arm64") || ((d = f.info.url) === null || d === void 0 ? void 0 : d.includes("arm64"));
    };
    a && n.some(s) ? n = n.filter((f) => a === s(f)) : n = n.filter((f) => !s(f));
    const l = (0, qw.findFile)(n, "zip", ["pkg", "dmg"]);
    if (l == null)
      throw (0, Qs.newError)(`ZIP file not provided: ${(0, Qs.safeStringifyJson)(n)}`, "ERR_UPDATER_ZIP_FILE_NOT_FOUND");
    const m = t.updateInfoAndProvider.provider, c = "update.zip";
    return this.executeDownload({
      fileExtension: "zip",
      fileInfo: l,
      downloadUpdateOptions: t,
      task: async (f, d) => {
        const g = Zs.join(this.downloadedUpdateHelper.cacheDir, c), w = () => (0, Xi.pathExistsSync)(g) ? !t.disableDifferentialDownload : (r.info("Unable to locate previous update.zip for differential download (is this first install?), falling back to full download"), !1);
        let y = !0;
        w() && (y = await this.differentialDownloadInstaller(l, t, f, m, c)), y && await this.httpExecutor.download(l.url, f, d);
      },
      done: async (f) => {
        if (!t.disableDifferentialDownload)
          try {
            const d = Zs.join(this.downloadedUpdateHelper.cacheDir, c);
            await (0, Xi.copyFile)(f.downloadedFile, d);
          } catch (d) {
            this._logger.warn(`Unable to copy file for caching for future differential downloads: ${d.message}`);
          }
        return this.updateDownloaded(l, f);
      }
    });
  }
  async updateDownloaded(t, n) {
    var r;
    const i = n.downloadedFile, o = (r = t.info.size) !== null && r !== void 0 ? r : (await (0, Xi.stat)(i)).size, a = this._logger, s = `fileToProxy=${t.url.href}`;
    this.closeServerIfExists(), this.debug(`Creating proxy server for native Squirrel.Mac (${s})`), this.server = (0, jw.createServer)(), this.debug(`Proxy server for native Squirrel.Mac is created (${s})`), this.server.on("close", () => {
      a.info(`Proxy server for native Squirrel.Mac is closed (${s})`);
    });
    const l = (m) => {
      const c = m.address();
      return typeof c == "string" ? c : `http://127.0.0.1:${c == null ? void 0 : c.port}`;
    };
    return await new Promise((m, c) => {
      const f = (0, tl.randomBytes)(64).toString("base64").replace(/\//g, "_").replace(/\+/g, "-"), d = Buffer.from(`autoupdater:${f}`, "ascii"), g = `/${(0, tl.randomBytes)(64).toString("hex")}.zip`;
      this.server.on("request", (w, y) => {
        const S = w.url;
        if (a.info(`${S} requested`), S === "/") {
          if (!w.headers.authorization || w.headers.authorization.indexOf("Basic ") === -1) {
            y.statusCode = 401, y.statusMessage = "Invalid Authentication Credentials", y.end(), a.warn("No authenthication info");
            return;
          }
          const P = w.headers.authorization.split(" ")[1], x = Buffer.from(P, "base64").toString("ascii"), [X, Z] = x.split(":");
          if (X !== "autoupdater" || Z !== f) {
            y.statusCode = 401, y.statusMessage = "Invalid Authentication Credentials", y.end(), a.warn("Invalid authenthication credentials");
            return;
          }
          const V = Buffer.from(`{ "url": "${l(this.server)}${g}" }`);
          y.writeHead(200, { "Content-Type": "application/json", "Content-Length": V.length }), y.end(V);
          return;
        }
        if (!S.startsWith(g)) {
          a.warn(`${S} requested, but not supported`), y.writeHead(404), y.end();
          return;
        }
        a.info(`${g} requested by Squirrel.Mac, pipe ${i}`);
        let T = !1;
        y.on("finish", () => {
          T || (this.nativeUpdater.removeListener("error", c), m([]));
        });
        const A = (0, Bw.createReadStream)(i);
        A.on("error", (P) => {
          try {
            y.end();
          } catch (x) {
            a.warn(`cannot end response: ${x}`);
          }
          T = !0, this.nativeUpdater.removeListener("error", c), c(new Error(`Cannot pipe "${i}": ${P}`));
        }), y.writeHead(200, {
          "Content-Type": "application/zip",
          "Content-Length": o
        }), A.pipe(y);
      }), this.debug(`Proxy server for native Squirrel.Mac is starting to listen (${s})`), this.server.listen(0, "127.0.0.1", () => {
        this.debug(`Proxy server for native Squirrel.Mac is listening (address=${l(this.server)}, ${s})`), this.nativeUpdater.setFeedURL({
          url: l(this.server),
          headers: {
            "Cache-Control": "no-cache",
            Authorization: `Basic ${d.toString("base64")}`
          }
        }), this.dispatchUpdateDownloaded(n), this.autoInstallOnAppQuit ? (this.nativeUpdater.once("error", c), this.nativeUpdater.checkForUpdates()) : m([]);
      });
    });
  }
  handleUpdateDownloaded() {
    this.autoRunAppAfterInstall ? this.nativeUpdater.quitAndInstall() : this.app.quit(), this.closeServerIfExists();
  }
  quitAndInstall() {
    this.squirrelDownloadedUpdate ? this.handleUpdateDownloaded() : (this.nativeUpdater.on("update-downloaded", () => this.handleUpdateDownloaded()), this.autoInstallOnAppQuit || this.nativeUpdater.checkForUpdates());
  }
}
Bn.MacUpdater = Gw;
var jn = {}, Wo = {};
Object.defineProperty(Wo, "__esModule", { value: !0 });
Wo.verifySignature = Ww;
const nl = pe, vu = qr, Vw = Gr, rl = z;
function Ww(e, t, n) {
  return new Promise((r, i) => {
    const o = t.replace(/'/g, "''");
    n.info(`Verifying signature ${o}`), (0, vu.execFile)('set "PSModulePath=" & chcp 65001 >NUL & powershell.exe', ["-NoProfile", "-NonInteractive", "-InputFormat", "None", "-Command", `"Get-AuthenticodeSignature -LiteralPath '${o}' | ConvertTo-Json -Compress"`], {
      shell: !0,
      timeout: 20 * 1e3
    }, (a, s, l) => {
      var m;
      try {
        if (a != null || l) {
          Ki(n, a, l, i), r(null);
          return;
        }
        const c = Yw(s);
        if (c.Status === 0) {
          try {
            const w = rl.normalize(c.Path), y = rl.normalize(t);
            if (n.info(`LiteralPath: ${w}. Update Path: ${y}`), w !== y) {
              Ki(n, new Error(`LiteralPath of ${w} is different than ${y}`), l, i), r(null);
              return;
            }
          } catch (w) {
            n.warn(`Unable to verify LiteralPath of update asset due to missing data.Path. Skipping this step of validation. Message: ${(m = w.message) !== null && m !== void 0 ? m : w.stack}`);
          }
          const d = (0, nl.parseDn)(c.SignerCertificate.Subject);
          let g = !1;
          for (const w of e) {
            const y = (0, nl.parseDn)(w);
            if (y.size ? g = Array.from(y.keys()).every((T) => y.get(T) === d.get(T)) : w === d.get("CN") && (n.warn(`Signature validated using only CN ${w}. Please add your full Distinguished Name (DN) to publisherNames configuration`), g = !0), g) {
              r(null);
              return;
            }
          }
        }
        const f = `publisherNames: ${e.join(" | ")}, raw info: ` + JSON.stringify(c, (d, g) => d === "RawData" ? void 0 : g, 2);
        n.warn(`Sign verification failed, installer signed with incorrect certificate: ${f}`), r(f);
      } catch (c) {
        Ki(n, c, null, i), r(null);
        return;
      }
    });
  });
}
function Yw(e) {
  const t = JSON.parse(e);
  delete t.PrivateKey, delete t.IsOSBinary, delete t.SignatureType;
  const n = t.SignerCertificate;
  return n != null && (delete n.Archived, delete n.Extensions, delete n.Handle, delete n.HasPrivateKey, delete n.SubjectName), t;
}
function Ki(e, t, n, r) {
  if (zw()) {
    e.warn(`Cannot execute Get-AuthenticodeSignature: ${t || n}. Ignoring signature validation due to unsupported powershell version. Please upgrade to powershell 3 or higher.`);
    return;
  }
  try {
    (0, vu.execFileSync)("powershell.exe", ["-NoProfile", "-NonInteractive", "-Command", "ConvertTo-Json test"], { timeout: 10 * 1e3 });
  } catch (i) {
    e.warn(`Cannot execute ConvertTo-Json: ${i.message}. Ignoring signature validation due to unsupported powershell version. Please upgrade to powershell 3 or higher.`);
    return;
  }
  t != null && r(t), n && r(new Error(`Cannot execute Get-AuthenticodeSignature, stderr: ${n}. Failing signature validation due to unknown stderr.`));
}
function zw() {
  const e = Vw.release();
  return e.startsWith("6.") && !e.startsWith("6.3");
}
Object.defineProperty(jn, "__esModule", { value: !0 });
jn.NsisUpdater = void 0;
const Cr = pe, il = z, Xw = Ze, Kw = Zn, ol = yt, Jw = ue, Qw = Et, Zw = Wo, al = an;
class e_ extends Xw.BaseUpdater {
  constructor(t, n) {
    super(t, n), this._verifyUpdateCodeSignature = (r, i) => (0, Zw.verifySignature)(r, i, this._logger);
  }
  /**
   * The verifyUpdateCodeSignature. You can pass [win-verify-signature](https://github.com/beyondkmp/win-verify-trust) or another custom verify function: ` (publisherName: string[], path: string) => Promise<string | null>`.
   * The default verify function uses [windowsExecutableCodeSignatureVerifier](https://github.com/electron-userland/electron-builder/blob/master/packages/electron-updater/src/windowsExecutableCodeSignatureVerifier.ts)
   */
  get verifyUpdateCodeSignature() {
    return this._verifyUpdateCodeSignature;
  }
  set verifyUpdateCodeSignature(t) {
    t && (this._verifyUpdateCodeSignature = t);
  }
  /*** @private */
  doDownloadUpdate(t) {
    const n = t.updateInfoAndProvider.provider, r = (0, Jw.findFile)(n.resolveFiles(t.updateInfoAndProvider.info), "exe");
    return this.executeDownload({
      fileExtension: "exe",
      downloadUpdateOptions: t,
      fileInfo: r,
      task: async (i, o, a, s) => {
        const l = r.packageInfo, m = l != null && a != null;
        if (m && t.disableWebInstaller)
          throw (0, Cr.newError)(`Unable to download new version ${t.updateInfoAndProvider.info.version}. Web Installers are disabled`, "ERR_UPDATER_WEB_INSTALLER_DISABLED");
        !m && !t.disableWebInstaller && this._logger.warn("disableWebInstaller is set to false, you should set it to true if you do not plan on using a web installer. This will default to true in a future version."), (m || t.disableDifferentialDownload || await this.differentialDownloadInstaller(r, t, i, n, Cr.CURRENT_APP_INSTALLER_FILE_NAME)) && await this.httpExecutor.download(r.url, i, o);
        const c = await this.verifySignature(i);
        if (c != null)
          throw await s(), (0, Cr.newError)(`New version ${t.updateInfoAndProvider.info.version} is not signed by the application owner: ${c}`, "ERR_UPDATER_INVALID_SIGNATURE");
        if (m && await this.differentialDownloadWebPackage(t, l, a, n))
          try {
            await this.httpExecutor.download(new al.URL(l.path), a, {
              headers: t.requestHeaders,
              cancellationToken: t.cancellationToken,
              sha512: l.sha512
            });
          } catch (f) {
            try {
              await (0, Qw.unlink)(a);
            } catch {
            }
            throw f;
          }
      }
    });
  }
  // $certificateInfo = (Get-AuthenticodeSignature 'xxx\yyy.exe'
  // | where {$_.Status.Equals([System.Management.Automation.SignatureStatus]::Valid) -and $_.SignerCertificate.Subject.Contains("CN=siemens.com")})
  // | Out-String ; if ($certificateInfo) { exit 0 } else { exit 1 }
  async verifySignature(t) {
    let n;
    try {
      if (n = (await this.configOnDisk.value).publisherName, n == null)
        return null;
    } catch (r) {
      if (r.code === "ENOENT")
        return null;
      throw r;
    }
    return await this._verifyUpdateCodeSignature(Array.isArray(n) ? n : [n], t);
  }
  doInstall(t) {
    const n = this.installerPath;
    if (n == null)
      return this.dispatchError(new Error("No valid update available, can't quit and install")), !1;
    const r = ["--updated"];
    t.isSilent && r.push("/S"), t.isForceRunAfter && r.push("--force-run"), this.installDirectory && r.push(`/D=${this.installDirectory}`);
    const i = this.downloadedUpdateHelper == null ? null : this.downloadedUpdateHelper.packageFile;
    i != null && r.push(`--package-file=${i}`);
    const o = () => {
      this.spawnLog(il.join(process.resourcesPath, "elevate.exe"), [n].concat(r)).catch((a) => this.dispatchError(a));
    };
    return t.isAdminRightsRequired ? (this._logger.info("isAdminRightsRequired is set to true, run installer using elevate.exe"), o(), !0) : (this.spawnLog(n, r).catch((a) => {
      const s = a.code;
      this._logger.info(`Cannot run installer: error code: ${s}, error message: "${a.message}", will be executed again using elevate if EACCES, and will try to use electron.shell.openItem if ENOENT`), s === "UNKNOWN" || s === "EACCES" ? o() : s === "ENOENT" ? Dt.shell.openPath(n).catch((l) => this.dispatchError(l)) : this.dispatchError(a);
    }), !0);
  }
  async differentialDownloadWebPackage(t, n, r, i) {
    if (n.blockMapSize == null)
      return !0;
    try {
      const o = {
        newUrl: new al.URL(n.path),
        oldFile: il.join(this.downloadedUpdateHelper.cacheDir, Cr.CURRENT_APP_PACKAGE_FILE_NAME),
        logger: this._logger,
        newFile: r,
        requestHeaders: this.requestHeaders,
        isUseMultipleRangeRequest: i.isUseMultipleRangeRequest,
        cancellationToken: t.cancellationToken
      };
      this.listenerCount(ol.DOWNLOAD_PROGRESS) > 0 && (o.onProgress = (a) => this.emit(ol.DOWNLOAD_PROGRESS, a)), await new Kw.FileWithEmbeddedBlockMapDifferentialDownloader(n, this.httpExecutor, o).download();
    } catch (o) {
      return this._logger.error(`Cannot download differentially, fallback to full download: ${o.stack || o}`), process.platform === "win32";
    }
    return !1;
  }
}
jn.NsisUpdater = e_;
(function(e) {
  var t = Te && Te.__createBinding || (Object.create ? function(S, T, A, P) {
    P === void 0 && (P = A);
    var x = Object.getOwnPropertyDescriptor(T, A);
    (!x || ("get" in x ? !T.__esModule : x.writable || x.configurable)) && (x = { enumerable: !0, get: function() {
      return T[A];
    } }), Object.defineProperty(S, P, x);
  } : function(S, T, A, P) {
    P === void 0 && (P = A), S[P] = T[A];
  }), n = Te && Te.__exportStar || function(S, T) {
    for (var A in S) A !== "default" && !Object.prototype.hasOwnProperty.call(T, A) && t(T, S, A);
  };
  Object.defineProperty(e, "__esModule", { value: !0 }), e.NsisUpdater = e.MacUpdater = e.RpmUpdater = e.PacmanUpdater = e.DebUpdater = e.AppImageUpdater = e.Provider = e.NoOpLogger = e.AppUpdater = e.BaseUpdater = void 0;
  const r = Et, i = z;
  var o = Ze;
  Object.defineProperty(e, "BaseUpdater", { enumerable: !0, get: function() {
    return o.BaseUpdater;
  } });
  var a = dt;
  Object.defineProperty(e, "AppUpdater", { enumerable: !0, get: function() {
    return a.AppUpdater;
  } }), Object.defineProperty(e, "NoOpLogger", { enumerable: !0, get: function() {
    return a.NoOpLogger;
  } });
  var s = ue;
  Object.defineProperty(e, "Provider", { enumerable: !0, get: function() {
    return s.Provider;
  } });
  var l = Ln;
  Object.defineProperty(e, "AppImageUpdater", { enumerable: !0, get: function() {
    return l.AppImageUpdater;
  } });
  var m = Un;
  Object.defineProperty(e, "DebUpdater", { enumerable: !0, get: function() {
    return m.DebUpdater;
  } });
  var c = kn;
  Object.defineProperty(e, "PacmanUpdater", { enumerable: !0, get: function() {
    return c.PacmanUpdater;
  } });
  var f = Mn;
  Object.defineProperty(e, "RpmUpdater", { enumerable: !0, get: function() {
    return f.RpmUpdater;
  } });
  var d = Bn;
  Object.defineProperty(e, "MacUpdater", { enumerable: !0, get: function() {
    return d.MacUpdater;
  } });
  var g = jn;
  Object.defineProperty(e, "NsisUpdater", { enumerable: !0, get: function() {
    return g.NsisUpdater;
  } }), n(yt, e);
  let w;
  function y() {
    if (process.platform === "win32")
      w = new jn.NsisUpdater();
    else if (process.platform === "darwin")
      w = new Bn.MacUpdater();
    else {
      w = new Ln.AppImageUpdater();
      try {
        const S = i.join(process.resourcesPath, "package-type");
        if (!(0, r.existsSync)(S))
          return w;
        console.info("Checking for beta autoupdate feature for deb/rpm distributions");
        const T = (0, r.readFileSync)(S).toString().trim();
        switch (console.info("Found package-type:", T), T) {
          case "deb":
            w = new Un.DebUpdater();
            break;
          case "rpm":
            w = new Mn.RpmUpdater();
            break;
          case "pacman":
            w = new kn.PacmanUpdater();
            break;
          default:
            break;
        }
      } catch (S) {
        console.warn("Unable to detect 'package-type' for autoUpdater (beta rpm/deb support). If you'd like to expand support, please consider contributing to electron-builder", S.message);
      }
    }
    return w;
  }
  Object.defineProperty(e, "autoUpdater", {
    enumerable: !0,
    get: () => w || y()
  });
})(dl);
let Fe = {};
function Pt(...e) {
  if (process.env.NODE_ENV === "development" || process.defaultApp)
    return z.join(process.cwd(), ...e);
  const t = process.resourcesPath, n = z.join(t, "app.asar.unpacked");
  return te.existsSync(n) ? z.join(n, ...e) : z.join(t, ...e);
}
function t_() {
  if (Fe.video && Fe.video.kill("SIGKILL"), Fe.audio && Fe.audio.kill("SIGKILL"), Fe.ffmpeg && Fe.ffmpeg.kill("SIGKILL"), Fe.files)
    for (const e of Fe.files)
      try {
        te.existsSync(e) && te.unlinkSync(e);
      } catch {
      }
  Fe = {};
}
function n_(e) {
  return new Promise((t) => {
    const n = Pt("python", "python.exe"), r = Pt("python", "yt-dlp.py"), i = Wt(n, [r, "--get-title", e]);
    let o = "";
    i.stdout.on("data", (a) => {
      o += a.toString();
    }), i.on("close", (a) => {
      t(o.trim());
    });
  });
}
function r_(e, t = "./downloads", n) {
  return new Promise((r, i) => {
    const o = Pt("python", "python.exe"), a = Pt("python", "yt-dlp.py");
    te.existsSync(t) || te.mkdirSync(t, { recursive: !0 });
    const s = n ? n.replace(/[\\/:*?"<>|]/g, "_") : "thumbnail", l = z.resolve(t, s + ".jpg"), m = Wt(o, [a, "--get-thumbnail", e]);
    let c = "", f = "";
    m.stdout.on("data", (d) => {
      c += d.toString();
    }), m.stderr.on("data", (d) => {
      f += d.toString();
    }), m.on("close", async (d) => {
      if (c = c.trim(), d !== 0 || !c)
        return i(
          new Error(`Failed to get thumbnail. ${f || "No output received."}`)
        );
      try {
        const g = await import("https"), w = te.createWriteStream(l);
        g.get(c, (y) => {
          if (y.statusCode !== 200)
            return i(new Error(`Failed to download thumbnail. HTTP ${y.statusCode}`));
          y.pipe(w), w.on("finish", () => {
            w.close(), r(l);
          });
        }).on("error", (y) => {
          te.existsSync(l) && te.unlinkSync(l), i(y);
        });
      } catch (g) {
        i(g);
      }
    });
  });
}
function i_(e, t = "./downloads", n, r) {
  return new Promise(async (i, o) => {
    const a = Pt("python", "python.exe"), s = Pt("python", "yt-dlp.py"), l = Pt("ffmpeg", "bin", "ffmpeg.exe");
    te.existsSync(t) || te.mkdirSync(t, { recursive: !0 });
    let m = 0;
    try {
      m = await new Promise((y) => {
        const S = Wt(a, [s, "--get-duration", e]);
        let T = "";
        S.stdout.on("data", (A) => {
          T += A.toString();
        }), S.on("close", () => {
          const A = T.trim().split(":").map(Number);
          let P = 0;
          A.length === 3 ? P = A[0] * 3600 + A[1] * 60 + A[2] : A.length === 2 ? P = A[0] * 60 + A[1] : A.length === 1 && (P = A[0]), y(P);
        });
      });
    } catch {
      m = 0;
    }
    const c = r ? r.replace(/[\\/:*?"<>|]/g, "_") : "video", f = z.resolve(t, c + "_video.mp4"), d = z.resolve(t, c + "_audio.m4a"), g = z.resolve(t, c + ".mp4");
    Fe.files = [f, d, g], n == null || n({ phase: "video", percent: 0, message: "Downloading video stream..." });
    const w = Wt(a, [s, "-f", "bestvideo", "-o", f, e]);
    Fe.video = w, w.stdout.on("data", (y) => {
      const S = y.toString(), T = S.match(/\[download\]\s+(\d+\.\d+)%/);
      T && (n == null || n({ phase: "video", percent: parseFloat(T[1]), message: S }));
    }), w.stderr.on("data", (y) => {
    }), w.on("close", (y) => {
      if (y !== 0)
        return o(new Error(`Video download failed with code ${y}`));
      n == null || n({ phase: "audio", percent: 0, message: "Downloading audio stream..." });
      const S = Wt(a, [s, "-f", "bestaudio", "-o", d, e]);
      Fe.audio = S, S.stdout.on("data", (T) => {
        const A = T.toString(), P = A.match(/\[download\]\s+(\d+\.\d+)%/);
        P && (n == null || n({ phase: "audio", percent: parseFloat(P[1]), message: A }));
      }), S.stderr.on("data", (T) => {
      }), S.on("close", (T) => {
        if (T !== 0)
          return o(new Error(`Audio download failed with code ${T}`));
        n == null || n({ phase: "merge", percent: 0, message: "Merging video and audio...", mergeDuration: m ? String(m) : void 0 });
        const A = Wt(l, [
          "-i",
          f,
          "-i",
          d,
          "-c:v",
          "copy",
          "-c:a",
          "aac",
          "-shortest",
          "-y",
          g
        ]);
        Fe.ffmpeg = A;
        let P = 0;
        const x = Date.now();
        A.stderr.on("data", (X) => {
          const Z = X.toString(), V = Z.match(/time=([\d:.]+)/);
          let le = 0;
          if (V) {
            const E = V[1].split(":").map(Number);
            E.length === 3 ? le = E[0] * 3600 + E[1] * 60 + E[2] : E.length === 2 ? le = E[0] * 60 + E[1] : E.length === 1 && (le = E[0]), P = Math.min(m ? le / m * 100 : P + 2, 100), n == null || n({ phase: "merge", percent: P, message: Z, mergeTime: String(le), mergeDuration: String(m), mergeElapsed: Math.floor((Date.now() - x) / 1e3) });
          }
        }), A.on("close", (X) => {
          if (X === 0) {
            n == null || n({ phase: "done", percent: 100, message: "Merge complete!" });
            try {
              te.unlinkSync(f), te.unlinkSync(d);
            } catch {
            }
            i();
          } else
            o(new Error(`FFmpeg merge failed with code ${X}`));
        });
      });
    });
  });
}
const o_ = process.env.APPDATA || process.env.HOME || process.env.USERPROFILE || ".", wu = z.join(o_, "idm-clone-user-settings.json");
function _u(e) {
  te.writeFileSync(wu, JSON.stringify(e, null, 2), "utf-8");
}
function Su() {
  try {
    return JSON.parse(te.readFileSync(wu, "utf-8"));
  } catch {
    return {};
  }
}
on.handle("download-video", async (e, { url: t, outputFolder: n, fileName: r }) => (n && _u({ outputFolder: n }), new Promise((i, o) => {
  i_(
    t,
    n,
    (a) => {
      e.sender.send("download-progress", a);
    },
    r
  ).then(() => i("done")).catch((a) => o(a));
})));
on.handle("cancel-download", () => (t_(), "cancelled"));
on.handle("get-title", async (e, t) => await n_(t));
on.handle("select-folder", async () => {
  const e = await If.showOpenDialog({
    properties: ["openDirectory"]
  });
  return e.canceled || !e.filePaths[0] ? null : (_u({ outputFolder: e.filePaths[0] }), e.filePaths[0]);
});
on.handle("get-settings", async () => Su());
on.handle("get-thumb", async (e, { url: t, outputFolder: n, fileName: r }) => {
  try {
    const i = Su(), o = n || i.outputFolder || "./downloads";
    return te.existsSync(o) || te.mkdirSync(o, { recursive: !0 }), await r_(t, o, r);
  } catch (i) {
    throw console.error("Error getting thumbnail:", i), new Error("Failed to get thumbnail: " + i.message);
  }
});
const Au = ut.dirname(Rf(import.meta.url));
process.env.APP_ROOT = ut.join(Au, "..");
const po = process.env.VITE_DEV_SERVER_URL, T_ = ut.join(process.env.APP_ROOT, "dist-electron"), Tu = ut.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = po ? ut.join(process.env.APP_ROOT, "public") : Tu;
let ot;
function Cu() {
  ot = new sl({
    icon: ut.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    webPreferences: {
      preload: ut.join(Au, "preload.mjs")
    }
  }), ot.webContents.on("did-finish-load", () => {
    ot == null || ot.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  }), po ? ot.loadURL(po) : ot.loadFile(ut.join(Tu, "index.html"));
}
Rr.on("window-all-closed", () => {
  process.platform !== "darwin" && (Rr.quit(), ot = null);
});
Rr.on("activate", () => {
  sl.getAllWindows().length === 0 && Cu();
});
Rr.whenReady().then(() => {
  Cu(), dl.autoUpdater.checkForUpdatesAndNotify();
});
export {
  T_ as MAIN_DIST,
  Tu as RENDERER_DIST,
  po as VITE_DEV_SERVER_URL
};
