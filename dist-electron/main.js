import Cu, { ipcMain as Ot, app as Cn, BrowserWindow as yc } from "electron";
import { fileURLToPath as Du } from "node:url";
import ut from "node:path";
import tr from "path";
import $c from "util";
import Xs from "fs";
import Mu from "crypto";
import Lu from "assert";
import Fu from "events";
import Vu from "os";
import { Worker as Uu } from "node:worker_threads";
var nn = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function zu(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Os = { exports: {} }, qu = (e) => {
  const t = typeof e;
  return e !== null && (t === "object" || t === "function");
};
const qt = qu, Ku = /* @__PURE__ */ new Set([
  "__proto__",
  "prototype",
  "constructor"
]), Gu = (e) => !e.some((t) => Ku.has(t));
function sn(e) {
  const t = e.split("."), r = [];
  for (let n = 0; n < t.length; n++) {
    let s = t[n];
    for (; s[s.length - 1] === "\\" && t[n + 1] !== void 0; )
      s = s.slice(0, -1) + ".", s += t[++n];
    r.push(s);
  }
  return Gu(r) ? r : [];
}
var Hu = {
  get(e, t, r) {
    if (!qt(e) || typeof t != "string")
      return r === void 0 ? e : r;
    const n = sn(t);
    if (n.length !== 0) {
      for (let s = 0; s < n.length; s++)
        if (e = e[n[s]], e == null) {
          if (s !== n.length - 1)
            return r;
          break;
        }
      return e === void 0 ? r : e;
    }
  },
  set(e, t, r) {
    if (!qt(e) || typeof t != "string")
      return e;
    const n = e, s = sn(t);
    for (let a = 0; a < s.length; a++) {
      const i = s[a];
      qt(e[i]) || (e[i] = {}), a === s.length - 1 && (e[i] = r), e = e[i];
    }
    return n;
  },
  delete(e, t) {
    if (!qt(e) || typeof t != "string")
      return !1;
    const r = sn(t);
    for (let n = 0; n < r.length; n++) {
      const s = r[n];
      if (n === r.length - 1)
        return delete e[s], !0;
      if (e = e[s], !qt(e))
        return !1;
    }
  },
  has(e, t) {
    if (!qt(e) || typeof t != "string")
      return !1;
    const r = sn(t);
    if (r.length === 0)
      return !1;
    for (let n = 0; n < r.length; n++)
      if (qt(e)) {
        if (!(r[n] in e))
          return !1;
        e = e[r[n]];
      } else
        return !1;
    return !0;
  }
}, Ys = { exports: {} }, Qs = { exports: {} }, Zs = { exports: {} }, xs = { exports: {} };
const _c = Xs;
xs.exports = (e) => new Promise((t) => {
  _c.access(e, (r) => {
    t(!r);
  });
});
xs.exports.sync = (e) => {
  try {
    return _c.accessSync(e), !0;
  } catch {
    return !1;
  }
};
var Wu = xs.exports, ea = { exports: {} }, ta = { exports: {} };
const gc = (e, ...t) => new Promise((r) => {
  r(e(...t));
});
ta.exports = gc;
ta.exports.default = gc;
var Bu = ta.exports;
const Ju = Bu, vc = (e) => {
  if (!((Number.isInteger(e) || e === 1 / 0) && e > 0))
    return Promise.reject(new TypeError("Expected `concurrency` to be a number from 1 and up"));
  const t = [];
  let r = 0;
  const n = () => {
    r--, t.length > 0 && t.shift()();
  }, s = (u, c, ...d) => {
    r++;
    const l = Ju(u, ...d);
    c(l), l.then(n, n);
  }, a = (u, c, ...d) => {
    r < e ? s(u, c, ...d) : t.push(s.bind(null, u, c, ...d));
  }, i = (u, ...c) => new Promise((d) => a(u, d, ...c));
  return Object.defineProperties(i, {
    activeCount: {
      get: () => r
    },
    pendingCount: {
      get: () => t.length
    },
    clearQueue: {
      value: () => {
        t.length = 0;
      }
    }
  }), i;
};
ea.exports = vc;
ea.exports.default = vc;
var Xu = ea.exports;
const xo = Xu;
class Ec extends Error {
  constructor(t) {
    super(), this.value = t;
  }
}
const Yu = (e, t) => Promise.resolve(e).then(t), Qu = (e) => Promise.all(e).then((t) => t[1] === !0 && Promise.reject(new Ec(t[0])));
var Zu = (e, t, r) => {
  r = Object.assign({
    concurrency: 1 / 0,
    preserveOrder: !0
  }, r);
  const n = xo(r.concurrency), s = [...e].map((i) => [i, n(Yu, i, t)]), a = xo(r.preserveOrder ? 1 : 1 / 0);
  return Promise.all(s.map((i) => a(Qu, i))).then(() => {
  }).catch((i) => i instanceof Ec ? i.value : Promise.reject(i));
};
const wc = tr, Sc = Wu, xu = Zu;
Zs.exports = (e, t) => (t = Object.assign({
  cwd: process.cwd()
}, t), xu(e, (r) => Sc(wc.resolve(t.cwd, r)), t));
Zs.exports.sync = (e, t) => {
  t = Object.assign({
    cwd: process.cwd()
  }, t);
  for (const r of e)
    if (Sc.sync(wc.resolve(t.cwd, r)))
      return r;
};
var ed = Zs.exports;
const Et = tr, bc = ed;
Qs.exports = (e, t = {}) => {
  const r = Et.resolve(t.cwd || ""), { root: n } = Et.parse(r), s = [].concat(e);
  return new Promise((a) => {
    (function i(u) {
      bc(s, { cwd: u }).then((c) => {
        c ? a(Et.join(u, c)) : u === n ? a(null) : i(Et.dirname(u));
      });
    })(r);
  });
};
Qs.exports.sync = (e, t = {}) => {
  let r = Et.resolve(t.cwd || "");
  const { root: n } = Et.parse(r), s = [].concat(e);
  for (; ; ) {
    const a = bc.sync(s, { cwd: r });
    if (a)
      return Et.join(r, a);
    if (r === n)
      return null;
    r = Et.dirname(r);
  }
};
var td = Qs.exports;
const Pc = td;
Ys.exports = async ({ cwd: e } = {}) => Pc("package.json", { cwd: e });
Ys.exports.sync = ({ cwd: e } = {}) => Pc.sync("package.json", { cwd: e });
var rd = Ys.exports, ra = { exports: {} };
const me = tr, Nc = Vu, vt = Nc.homedir(), na = Nc.tmpdir(), { env: cr } = process, nd = (e) => {
  const t = me.join(vt, "Library");
  return {
    data: me.join(t, "Application Support", e),
    config: me.join(t, "Preferences", e),
    cache: me.join(t, "Caches", e),
    log: me.join(t, "Logs", e),
    temp: me.join(na, e)
  };
}, sd = (e) => {
  const t = cr.APPDATA || me.join(vt, "AppData", "Roaming"), r = cr.LOCALAPPDATA || me.join(vt, "AppData", "Local");
  return {
    // Data/config/cache/log are invented by me as Windows isn't opinionated about this
    data: me.join(r, e, "Data"),
    config: me.join(t, e, "Config"),
    cache: me.join(r, e, "Cache"),
    log: me.join(r, e, "Log"),
    temp: me.join(na, e)
  };
}, ad = (e) => {
  const t = me.basename(vt);
  return {
    data: me.join(cr.XDG_DATA_HOME || me.join(vt, ".local", "share"), e),
    config: me.join(cr.XDG_CONFIG_HOME || me.join(vt, ".config"), e),
    cache: me.join(cr.XDG_CACHE_HOME || me.join(vt, ".cache"), e),
    // https://wiki.debian.org/XDGBaseDirectorySpecification#state
    log: me.join(cr.XDG_STATE_HOME || me.join(vt, ".local", "state"), e),
    temp: me.join(na, t, e)
  };
}, Oc = (e, t) => {
  if (typeof e != "string")
    throw new TypeError(`Expected string, got ${typeof e}`);
  return t = Object.assign({ suffix: "nodejs" }, t), t.suffix && (e += `-${t.suffix}`), process.platform === "darwin" ? nd(e) : process.platform === "win32" ? sd(e) : ad(e);
};
ra.exports = Oc;
ra.exports.default = Oc;
var od = ra.exports, st = {}, ae = {};
Object.defineProperty(ae, "__esModule", { value: !0 });
ae.NOOP = ae.LIMIT_FILES_DESCRIPTORS = ae.LIMIT_BASENAME_LENGTH = ae.IS_USER_ROOT = ae.IS_POSIX = ae.DEFAULT_TIMEOUT_SYNC = ae.DEFAULT_TIMEOUT_ASYNC = ae.DEFAULT_WRITE_OPTIONS = ae.DEFAULT_READ_OPTIONS = ae.DEFAULT_FOLDER_MODE = ae.DEFAULT_FILE_MODE = ae.DEFAULT_ENCODING = void 0;
const id = "utf8";
ae.DEFAULT_ENCODING = id;
const cd = 438;
ae.DEFAULT_FILE_MODE = cd;
const ld = 511;
ae.DEFAULT_FOLDER_MODE = ld;
const ud = {};
ae.DEFAULT_READ_OPTIONS = ud;
const dd = {};
ae.DEFAULT_WRITE_OPTIONS = dd;
const fd = 5e3;
ae.DEFAULT_TIMEOUT_ASYNC = fd;
const hd = 100;
ae.DEFAULT_TIMEOUT_SYNC = hd;
const md = !!process.getuid;
ae.IS_POSIX = md;
const pd = process.getuid ? !process.getuid() : !1;
ae.IS_USER_ROOT = pd;
const yd = 128;
ae.LIMIT_BASENAME_LENGTH = yd;
const $d = 1e4;
ae.LIMIT_FILES_DESCRIPTORS = $d;
const _d = () => {
};
ae.NOOP = _d;
var Hn = {}, pr = {};
Object.defineProperty(pr, "__esModule", { value: !0 });
pr.attemptifySync = pr.attemptifyAsync = void 0;
const Rc = ae, gd = (e, t = Rc.NOOP) => function() {
  return e.apply(void 0, arguments).catch(t);
};
pr.attemptifyAsync = gd;
const vd = (e, t = Rc.NOOP) => function() {
  try {
    return e.apply(void 0, arguments);
  } catch (r) {
    return t(r);
  }
};
pr.attemptifySync = vd;
var sa = {};
Object.defineProperty(sa, "__esModule", { value: !0 });
const Ed = ae, Tc = {
  isChangeErrorOk: (e) => {
    const { code: t } = e;
    return t === "ENOSYS" || !Ed.IS_USER_ROOT && (t === "EINVAL" || t === "EPERM");
  },
  isRetriableError: (e) => {
    const { code: t } = e;
    return t === "EMFILE" || t === "ENFILE" || t === "EAGAIN" || t === "EBUSY" || t === "EACCESS" || t === "EACCS" || t === "EPERM";
  },
  onChangeError: (e) => {
    if (!Tc.isChangeErrorOk(e))
      throw e;
  }
};
sa.default = Tc;
var yr = {}, aa = {};
Object.defineProperty(aa, "__esModule", { value: !0 });
const wd = ae, le = {
  interval: 25,
  intervalId: void 0,
  limit: wd.LIMIT_FILES_DESCRIPTORS,
  queueActive: /* @__PURE__ */ new Set(),
  queueWaiting: /* @__PURE__ */ new Set(),
  init: () => {
    le.intervalId || (le.intervalId = setInterval(le.tick, le.interval));
  },
  reset: () => {
    le.intervalId && (clearInterval(le.intervalId), delete le.intervalId);
  },
  add: (e) => {
    le.queueWaiting.add(e), le.queueActive.size < le.limit / 2 ? le.tick() : le.init();
  },
  remove: (e) => {
    le.queueWaiting.delete(e), le.queueActive.delete(e);
  },
  schedule: () => new Promise((e) => {
    const t = () => le.remove(r), r = () => e(t);
    le.add(r);
  }),
  tick: () => {
    if (!(le.queueActive.size >= le.limit)) {
      if (!le.queueWaiting.size)
        return le.reset();
      for (const e of le.queueWaiting) {
        if (le.queueActive.size >= le.limit)
          break;
        le.queueWaiting.delete(e), le.queueActive.add(e), e();
      }
    }
  }
};
aa.default = le;
Object.defineProperty(yr, "__esModule", { value: !0 });
yr.retryifySync = yr.retryifyAsync = void 0;
const Sd = aa, bd = (e, t) => function(r) {
  return function n() {
    return Sd.default.schedule().then((s) => e.apply(void 0, arguments).then((a) => (s(), a), (a) => {
      if (s(), Date.now() >= r)
        throw a;
      if (t(a)) {
        const i = Math.round(100 + 400 * Math.random());
        return new Promise((c) => setTimeout(c, i)).then(() => n.apply(void 0, arguments));
      }
      throw a;
    }));
  };
};
yr.retryifyAsync = bd;
const Pd = (e, t) => function(r) {
  return function n() {
    try {
      return e.apply(void 0, arguments);
    } catch (s) {
      if (Date.now() > r)
        throw s;
      if (t(s))
        return n.apply(void 0, arguments);
      throw s;
    }
  };
};
yr.retryifySync = Pd;
Object.defineProperty(Hn, "__esModule", { value: !0 });
const oe = Xs, Oe = $c, Re = pr, ge = sa, Ae = yr, Nd = {
  chmodAttempt: Re.attemptifyAsync(Oe.promisify(oe.chmod), ge.default.onChangeError),
  chownAttempt: Re.attemptifyAsync(Oe.promisify(oe.chown), ge.default.onChangeError),
  closeAttempt: Re.attemptifyAsync(Oe.promisify(oe.close)),
  fsyncAttempt: Re.attemptifyAsync(Oe.promisify(oe.fsync)),
  mkdirAttempt: Re.attemptifyAsync(Oe.promisify(oe.mkdir)),
  realpathAttempt: Re.attemptifyAsync(Oe.promisify(oe.realpath)),
  statAttempt: Re.attemptifyAsync(Oe.promisify(oe.stat)),
  unlinkAttempt: Re.attemptifyAsync(Oe.promisify(oe.unlink)),
  closeRetry: Ae.retryifyAsync(Oe.promisify(oe.close), ge.default.isRetriableError),
  fsyncRetry: Ae.retryifyAsync(Oe.promisify(oe.fsync), ge.default.isRetriableError),
  openRetry: Ae.retryifyAsync(Oe.promisify(oe.open), ge.default.isRetriableError),
  readFileRetry: Ae.retryifyAsync(Oe.promisify(oe.readFile), ge.default.isRetriableError),
  renameRetry: Ae.retryifyAsync(Oe.promisify(oe.rename), ge.default.isRetriableError),
  statRetry: Ae.retryifyAsync(Oe.promisify(oe.stat), ge.default.isRetriableError),
  writeRetry: Ae.retryifyAsync(Oe.promisify(oe.write), ge.default.isRetriableError),
  chmodSyncAttempt: Re.attemptifySync(oe.chmodSync, ge.default.onChangeError),
  chownSyncAttempt: Re.attemptifySync(oe.chownSync, ge.default.onChangeError),
  closeSyncAttempt: Re.attemptifySync(oe.closeSync),
  mkdirSyncAttempt: Re.attemptifySync(oe.mkdirSync),
  realpathSyncAttempt: Re.attemptifySync(oe.realpathSync),
  statSyncAttempt: Re.attemptifySync(oe.statSync),
  unlinkSyncAttempt: Re.attemptifySync(oe.unlinkSync),
  closeSyncRetry: Ae.retryifySync(oe.closeSync, ge.default.isRetriableError),
  fsyncSyncRetry: Ae.retryifySync(oe.fsyncSync, ge.default.isRetriableError),
  openSyncRetry: Ae.retryifySync(oe.openSync, ge.default.isRetriableError),
  readFileSyncRetry: Ae.retryifySync(oe.readFileSync, ge.default.isRetriableError),
  renameSyncRetry: Ae.retryifySync(oe.renameSync, ge.default.isRetriableError),
  statSyncRetry: Ae.retryifySync(oe.statSync, ge.default.isRetriableError),
  writeSyncRetry: Ae.retryifySync(oe.writeSync, ge.default.isRetriableError)
};
Hn.default = Nd;
var oa = {};
Object.defineProperty(oa, "__esModule", { value: !0 });
const Od = {
  isFunction: (e) => typeof e == "function",
  isString: (e) => typeof e == "string",
  isUndefined: (e) => typeof e > "u"
};
oa.default = Od;
var ia = {};
Object.defineProperty(ia, "__esModule", { value: !0 });
const an = {}, Rs = {
  next: (e) => {
    const t = an[e];
    if (!t)
      return;
    t.shift();
    const r = t[0];
    r ? r(() => Rs.next(e)) : delete an[e];
  },
  schedule: (e) => new Promise((t) => {
    let r = an[e];
    r || (r = an[e] = []), r.push(t), !(r.length > 1) && t(() => Rs.next(e));
  })
};
ia.default = Rs;
var ca = {};
Object.defineProperty(ca, "__esModule", { value: !0 });
const Rd = tr, ei = ae, ti = Hn, Fe = {
  store: {},
  create: (e) => {
    const t = `000000${Math.floor(Math.random() * 16777215).toString(16)}`.slice(-6), r = Date.now().toString().slice(-10), n = "tmp-", s = `.${n}${r}${t}`;
    return `${e}${s}`;
  },
  get: (e, t, r = !0) => {
    const n = Fe.truncate(t(e));
    return n in Fe.store ? Fe.get(e, t, r) : (Fe.store[n] = r, [n, () => delete Fe.store[n]]);
  },
  purge: (e) => {
    Fe.store[e] && (delete Fe.store[e], ti.default.unlinkAttempt(e));
  },
  purgeSync: (e) => {
    Fe.store[e] && (delete Fe.store[e], ti.default.unlinkSyncAttempt(e));
  },
  purgeSyncAll: () => {
    for (const e in Fe.store)
      Fe.purgeSync(e);
  },
  truncate: (e) => {
    const t = Rd.basename(e);
    if (t.length <= ei.LIMIT_BASENAME_LENGTH)
      return e;
    const r = /^(\.?)(.*?)((?:\.[^.]+)?(?:\.tmp-\d{10}[a-f0-9]{6})?)$/.exec(t);
    if (!r)
      return e;
    const n = t.length - ei.LIMIT_BASENAME_LENGTH;
    return `${e.slice(0, -t.length)}${r[1]}${r[2].slice(0, -n)}${r[3]}`;
  }
};
process.on("exit", Fe.purgeSyncAll);
ca.default = Fe;
Object.defineProperty(st, "__esModule", { value: !0 });
st.writeFileSync = st.writeFile = st.readFileSync = st.readFile = void 0;
const Ic = tr, we = ae, se = Hn, Ue = oa, Td = ia, wt = ca;
function jc(e, t = we.DEFAULT_READ_OPTIONS) {
  var r;
  if (Ue.default.isString(t))
    return jc(e, { encoding: t });
  const n = Date.now() + ((r = t.timeout) !== null && r !== void 0 ? r : we.DEFAULT_TIMEOUT_ASYNC);
  return se.default.readFileRetry(n)(e, t);
}
st.readFile = jc;
function Ac(e, t = we.DEFAULT_READ_OPTIONS) {
  var r;
  if (Ue.default.isString(t))
    return Ac(e, { encoding: t });
  const n = Date.now() + ((r = t.timeout) !== null && r !== void 0 ? r : we.DEFAULT_TIMEOUT_SYNC);
  return se.default.readFileSyncRetry(n)(e, t);
}
st.readFileSync = Ac;
const kc = (e, t, r, n) => {
  if (Ue.default.isFunction(r))
    return kc(e, t, we.DEFAULT_WRITE_OPTIONS, r);
  const s = Cc(e, t, r);
  return n && s.then(n, n), s;
};
st.writeFile = kc;
const Cc = async (e, t, r = we.DEFAULT_WRITE_OPTIONS) => {
  var n;
  if (Ue.default.isString(r))
    return Cc(e, t, { encoding: r });
  const s = Date.now() + ((n = r.timeout) !== null && n !== void 0 ? n : we.DEFAULT_TIMEOUT_ASYNC);
  let a = null, i = null, u = null, c = null, d = null;
  try {
    r.schedule && (a = await r.schedule(e)), i = await Td.default.schedule(e), e = await se.default.realpathAttempt(e) || e, [c, u] = wt.default.get(e, r.tmpCreate || wt.default.create, r.tmpPurge !== !1);
    const l = we.IS_POSIX && Ue.default.isUndefined(r.chown), m = Ue.default.isUndefined(r.mode);
    if (l || m) {
      const _ = await se.default.statAttempt(e);
      _ && (r = { ...r }, l && (r.chown = { uid: _.uid, gid: _.gid }), m && (r.mode = _.mode));
    }
    const P = Ic.dirname(e);
    await se.default.mkdirAttempt(P, {
      mode: we.DEFAULT_FOLDER_MODE,
      recursive: !0
    }), d = await se.default.openRetry(s)(c, "w", r.mode || we.DEFAULT_FILE_MODE), r.tmpCreated && r.tmpCreated(c), Ue.default.isString(t) ? await se.default.writeRetry(s)(d, t, 0, r.encoding || we.DEFAULT_ENCODING) : Ue.default.isUndefined(t) || await se.default.writeRetry(s)(d, t, 0, t.length, 0), r.fsync !== !1 && (r.fsyncWait !== !1 ? await se.default.fsyncRetry(s)(d) : se.default.fsyncAttempt(d)), await se.default.closeRetry(s)(d), d = null, r.chown && await se.default.chownAttempt(c, r.chown.uid, r.chown.gid), r.mode && await se.default.chmodAttempt(c, r.mode);
    try {
      await se.default.renameRetry(s)(c, e);
    } catch (_) {
      if (_.code !== "ENAMETOOLONG")
        throw _;
      await se.default.renameRetry(s)(c, wt.default.truncate(e));
    }
    u(), c = null;
  } finally {
    d && await se.default.closeAttempt(d), c && wt.default.purge(c), a && a(), i && i();
  }
}, Dc = (e, t, r = we.DEFAULT_WRITE_OPTIONS) => {
  var n;
  if (Ue.default.isString(r))
    return Dc(e, t, { encoding: r });
  const s = Date.now() + ((n = r.timeout) !== null && n !== void 0 ? n : we.DEFAULT_TIMEOUT_SYNC);
  let a = null, i = null, u = null;
  try {
    e = se.default.realpathSyncAttempt(e) || e, [i, a] = wt.default.get(e, r.tmpCreate || wt.default.create, r.tmpPurge !== !1);
    const c = we.IS_POSIX && Ue.default.isUndefined(r.chown), d = Ue.default.isUndefined(r.mode);
    if (c || d) {
      const m = se.default.statSyncAttempt(e);
      m && (r = { ...r }, c && (r.chown = { uid: m.uid, gid: m.gid }), d && (r.mode = m.mode));
    }
    const l = Ic.dirname(e);
    se.default.mkdirSyncAttempt(l, {
      mode: we.DEFAULT_FOLDER_MODE,
      recursive: !0
    }), u = se.default.openSyncRetry(s)(i, "w", r.mode || we.DEFAULT_FILE_MODE), r.tmpCreated && r.tmpCreated(i), Ue.default.isString(t) ? se.default.writeSyncRetry(s)(u, t, 0, r.encoding || we.DEFAULT_ENCODING) : Ue.default.isUndefined(t) || se.default.writeSyncRetry(s)(u, t, 0, t.length, 0), r.fsync !== !1 && (r.fsyncWait !== !1 ? se.default.fsyncSyncRetry(s)(u) : se.default.fsyncAttempt(u)), se.default.closeSyncRetry(s)(u), u = null, r.chown && se.default.chownSyncAttempt(i, r.chown.uid, r.chown.gid), r.mode && se.default.chmodSyncAttempt(i, r.mode);
    try {
      se.default.renameSyncRetry(s)(i, e);
    } catch (m) {
      if (m.code !== "ENAMETOOLONG")
        throw m;
      se.default.renameSyncRetry(s)(i, wt.default.truncate(e));
    }
    a(), i = null;
  } finally {
    u && se.default.closeSyncAttempt(u), i && wt.default.purge(i);
  }
};
st.writeFileSync = Dc;
var Ts = { exports: {} }, Mc = {}, Qe = {}, $r = {}, Yr = {}, te = {}, Jr = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.regexpCode = e.getEsmExportName = e.getProperty = e.safeStringify = e.stringify = e.strConcat = e.addCodeArg = e.str = e._ = e.nil = e._Code = e.Name = e.IDENTIFIER = e._CodeOrName = void 0;
  class t {
  }
  e._CodeOrName = t, e.IDENTIFIER = /^[a-z$_][a-z$_0-9]*$/i;
  class r extends t {
    constructor(E) {
      if (super(), !e.IDENTIFIER.test(E))
        throw new Error("CodeGen: name must be a valid identifier");
      this.str = E;
    }
    toString() {
      return this.str;
    }
    emptyStr() {
      return !1;
    }
    get names() {
      return { [this.str]: 1 };
    }
  }
  e.Name = r;
  class n extends t {
    constructor(E) {
      super(), this._items = typeof E == "string" ? [E] : E;
    }
    toString() {
      return this.str;
    }
    emptyStr() {
      if (this._items.length > 1)
        return !1;
      const E = this._items[0];
      return E === "" || E === '""';
    }
    get str() {
      var E;
      return (E = this._str) !== null && E !== void 0 ? E : this._str = this._items.reduce((N, R) => `${N}${R}`, "");
    }
    get names() {
      var E;
      return (E = this._names) !== null && E !== void 0 ? E : this._names = this._items.reduce((N, R) => (R instanceof r && (N[R.str] = (N[R.str] || 0) + 1), N), {});
    }
  }
  e._Code = n, e.nil = new n("");
  function s(h, ...E) {
    const N = [h[0]];
    let R = 0;
    for (; R < E.length; )
      u(N, E[R]), N.push(h[++R]);
    return new n(N);
  }
  e._ = s;
  const a = new n("+");
  function i(h, ...E) {
    const N = [_(h[0])];
    let R = 0;
    for (; R < E.length; )
      N.push(a), u(N, E[R]), N.push(a, _(h[++R]));
    return c(N), new n(N);
  }
  e.str = i;
  function u(h, E) {
    E instanceof n ? h.push(...E._items) : E instanceof r ? h.push(E) : h.push(m(E));
  }
  e.addCodeArg = u;
  function c(h) {
    let E = 1;
    for (; E < h.length - 1; ) {
      if (h[E] === a) {
        const N = d(h[E - 1], h[E + 1]);
        if (N !== void 0) {
          h.splice(E - 1, 3, N);
          continue;
        }
        h[E++] = "+";
      }
      E++;
    }
  }
  function d(h, E) {
    if (E === '""')
      return h;
    if (h === '""')
      return E;
    if (typeof h == "string")
      return E instanceof r || h[h.length - 1] !== '"' ? void 0 : typeof E != "string" ? `${h.slice(0, -1)}${E}"` : E[0] === '"' ? h.slice(0, -1) + E.slice(1) : void 0;
    if (typeof E == "string" && E[0] === '"' && !(h instanceof r))
      return `"${h}${E.slice(1)}`;
  }
  function l(h, E) {
    return E.emptyStr() ? h : h.emptyStr() ? E : i`${h}${E}`;
  }
  e.strConcat = l;
  function m(h) {
    return typeof h == "number" || typeof h == "boolean" || h === null ? h : _(Array.isArray(h) ? h.join(",") : h);
  }
  function P(h) {
    return new n(_(h));
  }
  e.stringify = P;
  function _(h) {
    return JSON.stringify(h).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
  }
  e.safeStringify = _;
  function w(h) {
    return typeof h == "string" && e.IDENTIFIER.test(h) ? new n(`.${h}`) : s`[${h}]`;
  }
  e.getProperty = w;
  function g(h) {
    if (typeof h == "string" && e.IDENTIFIER.test(h))
      return new n(`${h}`);
    throw new Error(`CodeGen: invalid export name: ${h}, use explicit $id name mapping`);
  }
  e.getEsmExportName = g;
  function $(h) {
    return new n(h.toString());
  }
  e.regexpCode = $;
})(Jr);
var Is = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.ValueScope = e.ValueScopeName = e.Scope = e.varKinds = e.UsedValueState = void 0;
  const t = Jr;
  class r extends Error {
    constructor(d) {
      super(`CodeGen: "code" for ${d} not defined`), this.value = d.value;
    }
  }
  var n;
  (function(c) {
    c[c.Started = 0] = "Started", c[c.Completed = 1] = "Completed";
  })(n || (e.UsedValueState = n = {})), e.varKinds = {
    const: new t.Name("const"),
    let: new t.Name("let"),
    var: new t.Name("var")
  };
  class s {
    constructor({ prefixes: d, parent: l } = {}) {
      this._names = {}, this._prefixes = d, this._parent = l;
    }
    toName(d) {
      return d instanceof t.Name ? d : this.name(d);
    }
    name(d) {
      return new t.Name(this._newName(d));
    }
    _newName(d) {
      const l = this._names[d] || this._nameGroup(d);
      return `${d}${l.index++}`;
    }
    _nameGroup(d) {
      var l, m;
      if (!((m = (l = this._parent) === null || l === void 0 ? void 0 : l._prefixes) === null || m === void 0) && m.has(d) || this._prefixes && !this._prefixes.has(d))
        throw new Error(`CodeGen: prefix "${d}" is not allowed in this scope`);
      return this._names[d] = { prefix: d, index: 0 };
    }
  }
  e.Scope = s;
  class a extends t.Name {
    constructor(d, l) {
      super(l), this.prefix = d;
    }
    setValue(d, { property: l, itemIndex: m }) {
      this.value = d, this.scopePath = (0, t._)`.${new t.Name(l)}[${m}]`;
    }
  }
  e.ValueScopeName = a;
  const i = (0, t._)`\n`;
  class u extends s {
    constructor(d) {
      super(d), this._values = {}, this._scope = d.scope, this.opts = { ...d, _n: d.lines ? i : t.nil };
    }
    get() {
      return this._scope;
    }
    name(d) {
      return new a(d, this._newName(d));
    }
    value(d, l) {
      var m;
      if (l.ref === void 0)
        throw new Error("CodeGen: ref must be passed in value");
      const P = this.toName(d), { prefix: _ } = P, w = (m = l.key) !== null && m !== void 0 ? m : l.ref;
      let g = this._values[_];
      if (g) {
        const E = g.get(w);
        if (E)
          return E;
      } else
        g = this._values[_] = /* @__PURE__ */ new Map();
      g.set(w, P);
      const $ = this._scope[_] || (this._scope[_] = []), h = $.length;
      return $[h] = l.ref, P.setValue(l, { property: _, itemIndex: h }), P;
    }
    getValue(d, l) {
      const m = this._values[d];
      if (m)
        return m.get(l);
    }
    scopeRefs(d, l = this._values) {
      return this._reduceValues(l, (m) => {
        if (m.scopePath === void 0)
          throw new Error(`CodeGen: name "${m}" has no value`);
        return (0, t._)`${d}${m.scopePath}`;
      });
    }
    scopeCode(d = this._values, l, m) {
      return this._reduceValues(d, (P) => {
        if (P.value === void 0)
          throw new Error(`CodeGen: name "${P}" has no value`);
        return P.value.code;
      }, l, m);
    }
    _reduceValues(d, l, m = {}, P) {
      let _ = t.nil;
      for (const w in d) {
        const g = d[w];
        if (!g)
          continue;
        const $ = m[w] = m[w] || /* @__PURE__ */ new Map();
        g.forEach((h) => {
          if ($.has(h))
            return;
          $.set(h, n.Started);
          let E = l(h);
          if (E) {
            const N = this.opts.es5 ? e.varKinds.var : e.varKinds.const;
            _ = (0, t._)`${_}${N} ${h} = ${E};${this.opts._n}`;
          } else if (E = P == null ? void 0 : P(h))
            _ = (0, t._)`${_}${E}${this.opts._n}`;
          else
            throw new r(h);
          $.set(h, n.Completed);
        });
      }
      return _;
    }
  }
  e.ValueScope = u;
})(Is);
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.or = e.and = e.not = e.CodeGen = e.operators = e.varKinds = e.ValueScopeName = e.ValueScope = e.Scope = e.Name = e.regexpCode = e.stringify = e.getProperty = e.nil = e.strConcat = e.str = e._ = void 0;
  const t = Jr, r = Is;
  var n = Jr;
  Object.defineProperty(e, "_", { enumerable: !0, get: function() {
    return n._;
  } }), Object.defineProperty(e, "str", { enumerable: !0, get: function() {
    return n.str;
  } }), Object.defineProperty(e, "strConcat", { enumerable: !0, get: function() {
    return n.strConcat;
  } }), Object.defineProperty(e, "nil", { enumerable: !0, get: function() {
    return n.nil;
  } }), Object.defineProperty(e, "getProperty", { enumerable: !0, get: function() {
    return n.getProperty;
  } }), Object.defineProperty(e, "stringify", { enumerable: !0, get: function() {
    return n.stringify;
  } }), Object.defineProperty(e, "regexpCode", { enumerable: !0, get: function() {
    return n.regexpCode;
  } }), Object.defineProperty(e, "Name", { enumerable: !0, get: function() {
    return n.Name;
  } });
  var s = Is;
  Object.defineProperty(e, "Scope", { enumerable: !0, get: function() {
    return s.Scope;
  } }), Object.defineProperty(e, "ValueScope", { enumerable: !0, get: function() {
    return s.ValueScope;
  } }), Object.defineProperty(e, "ValueScopeName", { enumerable: !0, get: function() {
    return s.ValueScopeName;
  } }), Object.defineProperty(e, "varKinds", { enumerable: !0, get: function() {
    return s.varKinds;
  } }), e.operators = {
    GT: new t._Code(">"),
    GTE: new t._Code(">="),
    LT: new t._Code("<"),
    LTE: new t._Code("<="),
    EQ: new t._Code("==="),
    NEQ: new t._Code("!=="),
    NOT: new t._Code("!"),
    OR: new t._Code("||"),
    AND: new t._Code("&&"),
    ADD: new t._Code("+")
  };
  class a {
    optimizeNodes() {
      return this;
    }
    optimizeNames(o, f) {
      return this;
    }
  }
  class i extends a {
    constructor(o, f, b) {
      super(), this.varKind = o, this.name = f, this.rhs = b;
    }
    render({ es5: o, _n: f }) {
      const b = o ? r.varKinds.var : this.varKind, j = this.rhs === void 0 ? "" : ` = ${this.rhs}`;
      return `${b} ${this.name}${j};` + f;
    }
    optimizeNames(o, f) {
      if (o[this.name.str])
        return this.rhs && (this.rhs = C(this.rhs, o, f)), this;
    }
    get names() {
      return this.rhs instanceof t._CodeOrName ? this.rhs.names : {};
    }
  }
  class u extends a {
    constructor(o, f, b) {
      super(), this.lhs = o, this.rhs = f, this.sideEffects = b;
    }
    render({ _n: o }) {
      return `${this.lhs} = ${this.rhs};` + o;
    }
    optimizeNames(o, f) {
      if (!(this.lhs instanceof t.Name && !o[this.lhs.str] && !this.sideEffects))
        return this.rhs = C(this.rhs, o, f), this;
    }
    get names() {
      const o = this.lhs instanceof t.Name ? {} : { ...this.lhs.names };
      return de(o, this.rhs);
    }
  }
  class c extends u {
    constructor(o, f, b, j) {
      super(o, b, j), this.op = f;
    }
    render({ _n: o }) {
      return `${this.lhs} ${this.op}= ${this.rhs};` + o;
    }
  }
  class d extends a {
    constructor(o) {
      super(), this.label = o, this.names = {};
    }
    render({ _n: o }) {
      return `${this.label}:` + o;
    }
  }
  class l extends a {
    constructor(o) {
      super(), this.label = o, this.names = {};
    }
    render({ _n: o }) {
      return `break${this.label ? ` ${this.label}` : ""};` + o;
    }
  }
  class m extends a {
    constructor(o) {
      super(), this.error = o;
    }
    render({ _n: o }) {
      return `throw ${this.error};` + o;
    }
    get names() {
      return this.error.names;
    }
  }
  class P extends a {
    constructor(o) {
      super(), this.code = o;
    }
    render({ _n: o }) {
      return `${this.code};` + o;
    }
    optimizeNodes() {
      return `${this.code}` ? this : void 0;
    }
    optimizeNames(o, f) {
      return this.code = C(this.code, o, f), this;
    }
    get names() {
      return this.code instanceof t._CodeOrName ? this.code.names : {};
    }
  }
  class _ extends a {
    constructor(o = []) {
      super(), this.nodes = o;
    }
    render(o) {
      return this.nodes.reduce((f, b) => f + b.render(o), "");
    }
    optimizeNodes() {
      const { nodes: o } = this;
      let f = o.length;
      for (; f--; ) {
        const b = o[f].optimizeNodes();
        Array.isArray(b) ? o.splice(f, 1, ...b) : b ? o[f] = b : o.splice(f, 1);
      }
      return o.length > 0 ? this : void 0;
    }
    optimizeNames(o, f) {
      const { nodes: b } = this;
      let j = b.length;
      for (; j--; ) {
        const A = b[j];
        A.optimizeNames(o, f) || (k(o, A.names), b.splice(j, 1));
      }
      return b.length > 0 ? this : void 0;
    }
    get names() {
      return this.nodes.reduce((o, f) => Q(o, f.names), {});
    }
  }
  class w extends _ {
    render(o) {
      return "{" + o._n + super.render(o) + "}" + o._n;
    }
  }
  class g extends _ {
  }
  class $ extends w {
  }
  $.kind = "else";
  class h extends w {
    constructor(o, f) {
      super(f), this.condition = o;
    }
    render(o) {
      let f = `if(${this.condition})` + super.render(o);
      return this.else && (f += "else " + this.else.render(o)), f;
    }
    optimizeNodes() {
      super.optimizeNodes();
      const o = this.condition;
      if (o === !0)
        return this.nodes;
      let f = this.else;
      if (f) {
        const b = f.optimizeNodes();
        f = this.else = Array.isArray(b) ? new $(b) : b;
      }
      if (f)
        return o === !1 ? f instanceof h ? f : f.nodes : this.nodes.length ? this : new h(U(o), f instanceof h ? [f] : f.nodes);
      if (!(o === !1 || !this.nodes.length))
        return this;
    }
    optimizeNames(o, f) {
      var b;
      if (this.else = (b = this.else) === null || b === void 0 ? void 0 : b.optimizeNames(o, f), !!(super.optimizeNames(o, f) || this.else))
        return this.condition = C(this.condition, o, f), this;
    }
    get names() {
      const o = super.names;
      return de(o, this.condition), this.else && Q(o, this.else.names), o;
    }
  }
  h.kind = "if";
  class E extends w {
  }
  E.kind = "for";
  class N extends E {
    constructor(o) {
      super(), this.iteration = o;
    }
    render(o) {
      return `for(${this.iteration})` + super.render(o);
    }
    optimizeNames(o, f) {
      if (super.optimizeNames(o, f))
        return this.iteration = C(this.iteration, o, f), this;
    }
    get names() {
      return Q(super.names, this.iteration.names);
    }
  }
  class R extends E {
    constructor(o, f, b, j) {
      super(), this.varKind = o, this.name = f, this.from = b, this.to = j;
    }
    render(o) {
      const f = o.es5 ? r.varKinds.var : this.varKind, { name: b, from: j, to: A } = this;
      return `for(${f} ${b}=${j}; ${b}<${A}; ${b}++)` + super.render(o);
    }
    get names() {
      const o = de(super.names, this.from);
      return de(o, this.to);
    }
  }
  class I extends E {
    constructor(o, f, b, j) {
      super(), this.loop = o, this.varKind = f, this.name = b, this.iterable = j;
    }
    render(o) {
      return `for(${this.varKind} ${this.name} ${this.loop} ${this.iterable})` + super.render(o);
    }
    optimizeNames(o, f) {
      if (super.optimizeNames(o, f))
        return this.iterable = C(this.iterable, o, f), this;
    }
    get names() {
      return Q(super.names, this.iterable.names);
    }
  }
  class z extends w {
    constructor(o, f, b) {
      super(), this.name = o, this.args = f, this.async = b;
    }
    render(o) {
      return `${this.async ? "async " : ""}function ${this.name}(${this.args})` + super.render(o);
    }
  }
  z.kind = "func";
  class W extends _ {
    render(o) {
      return "return " + super.render(o);
    }
  }
  W.kind = "return";
  class ue extends w {
    render(o) {
      let f = "try" + super.render(o);
      return this.catch && (f += this.catch.render(o)), this.finally && (f += this.finally.render(o)), f;
    }
    optimizeNodes() {
      var o, f;
      return super.optimizeNodes(), (o = this.catch) === null || o === void 0 || o.optimizeNodes(), (f = this.finally) === null || f === void 0 || f.optimizeNodes(), this;
    }
    optimizeNames(o, f) {
      var b, j;
      return super.optimizeNames(o, f), (b = this.catch) === null || b === void 0 || b.optimizeNames(o, f), (j = this.finally) === null || j === void 0 || j.optimizeNames(o, f), this;
    }
    get names() {
      const o = super.names;
      return this.catch && Q(o, this.catch.names), this.finally && Q(o, this.finally.names), o;
    }
  }
  class V extends w {
    constructor(o) {
      super(), this.error = o;
    }
    render(o) {
      return `catch(${this.error})` + super.render(o);
    }
  }
  V.kind = "catch";
  class H extends w {
    render(o) {
      return "finally" + super.render(o);
    }
  }
  H.kind = "finally";
  class ne {
    constructor(o, f = {}) {
      this._values = {}, this._blockStarts = [], this._constants = {}, this.opts = { ...f, _n: f.lines ? `
` : "" }, this._extScope = o, this._scope = new r.Scope({ parent: o }), this._nodes = [new g()];
    }
    toString() {
      return this._root.render(this.opts);
    }
    // returns unique name in the internal scope
    name(o) {
      return this._scope.name(o);
    }
    // reserves unique name in the external scope
    scopeName(o) {
      return this._extScope.name(o);
    }
    // reserves unique name in the external scope and assigns value to it
    scopeValue(o, f) {
      const b = this._extScope.value(o, f);
      return (this._values[b.prefix] || (this._values[b.prefix] = /* @__PURE__ */ new Set())).add(b), b;
    }
    getScopeValue(o, f) {
      return this._extScope.getValue(o, f);
    }
    // return code that assigns values in the external scope to the names that are used internally
    // (same names that were returned by gen.scopeName or gen.scopeValue)
    scopeRefs(o) {
      return this._extScope.scopeRefs(o, this._values);
    }
    scopeCode() {
      return this._extScope.scopeCode(this._values);
    }
    _def(o, f, b, j) {
      const A = this._scope.toName(f);
      return b !== void 0 && j && (this._constants[A.str] = b), this._leafNode(new i(o, A, b)), A;
    }
    // `const` declaration (`var` in es5 mode)
    const(o, f, b) {
      return this._def(r.varKinds.const, o, f, b);
    }
    // `let` declaration with optional assignment (`var` in es5 mode)
    let(o, f, b) {
      return this._def(r.varKinds.let, o, f, b);
    }
    // `var` declaration with optional assignment
    var(o, f, b) {
      return this._def(r.varKinds.var, o, f, b);
    }
    // assignment code
    assign(o, f, b) {
      return this._leafNode(new u(o, f, b));
    }
    // `+=` code
    add(o, f) {
      return this._leafNode(new c(o, e.operators.ADD, f));
    }
    // appends passed SafeExpr to code or executes Block
    code(o) {
      return typeof o == "function" ? o() : o !== t.nil && this._leafNode(new P(o)), this;
    }
    // returns code for object literal for the passed argument list of key-value pairs
    object(...o) {
      const f = ["{"];
      for (const [b, j] of o)
        f.length > 1 && f.push(","), f.push(b), (b !== j || this.opts.es5) && (f.push(":"), (0, t.addCodeArg)(f, j));
      return f.push("}"), new t._Code(f);
    }
    // `if` clause (or statement if `thenBody` and, optionally, `elseBody` are passed)
    if(o, f, b) {
      if (this._blockNode(new h(o)), f && b)
        this.code(f).else().code(b).endIf();
      else if (f)
        this.code(f).endIf();
      else if (b)
        throw new Error('CodeGen: "else" body without "then" body');
      return this;
    }
    // `else if` clause - invalid without `if` or after `else` clauses
    elseIf(o) {
      return this._elseNode(new h(o));
    }
    // `else` clause - only valid after `if` or `else if` clauses
    else() {
      return this._elseNode(new $());
    }
    // end `if` statement (needed if gen.if was used only with condition)
    endIf() {
      return this._endBlockNode(h, $);
    }
    _for(o, f) {
      return this._blockNode(o), f && this.code(f).endFor(), this;
    }
    // a generic `for` clause (or statement if `forBody` is passed)
    for(o, f) {
      return this._for(new N(o), f);
    }
    // `for` statement for a range of values
    forRange(o, f, b, j, A = this.opts.es5 ? r.varKinds.var : r.varKinds.let) {
      const q = this._scope.toName(o);
      return this._for(new R(A, q, f, b), () => j(q));
    }
    // `for-of` statement (in es5 mode replace with a normal for loop)
    forOf(o, f, b, j = r.varKinds.const) {
      const A = this._scope.toName(o);
      if (this.opts.es5) {
        const q = f instanceof t.Name ? f : this.var("_arr", f);
        return this.forRange("_i", 0, (0, t._)`${q}.length`, (F) => {
          this.var(A, (0, t._)`${q}[${F}]`), b(A);
        });
      }
      return this._for(new I("of", j, A, f), () => b(A));
    }
    // `for-in` statement.
    // With option `ownProperties` replaced with a `for-of` loop for object keys
    forIn(o, f, b, j = this.opts.es5 ? r.varKinds.var : r.varKinds.const) {
      if (this.opts.ownProperties)
        return this.forOf(o, (0, t._)`Object.keys(${f})`, b);
      const A = this._scope.toName(o);
      return this._for(new I("in", j, A, f), () => b(A));
    }
    // end `for` loop
    endFor() {
      return this._endBlockNode(E);
    }
    // `label` statement
    label(o) {
      return this._leafNode(new d(o));
    }
    // `break` statement
    break(o) {
      return this._leafNode(new l(o));
    }
    // `return` statement
    return(o) {
      const f = new W();
      if (this._blockNode(f), this.code(o), f.nodes.length !== 1)
        throw new Error('CodeGen: "return" should have one node');
      return this._endBlockNode(W);
    }
    // `try` statement
    try(o, f, b) {
      if (!f && !b)
        throw new Error('CodeGen: "try" without "catch" and "finally"');
      const j = new ue();
      if (this._blockNode(j), this.code(o), f) {
        const A = this.name("e");
        this._currNode = j.catch = new V(A), f(A);
      }
      return b && (this._currNode = j.finally = new H(), this.code(b)), this._endBlockNode(V, H);
    }
    // `throw` statement
    throw(o) {
      return this._leafNode(new m(o));
    }
    // start self-balancing block
    block(o, f) {
      return this._blockStarts.push(this._nodes.length), o && this.code(o).endBlock(f), this;
    }
    // end the current self-balancing block
    endBlock(o) {
      const f = this._blockStarts.pop();
      if (f === void 0)
        throw new Error("CodeGen: not in self-balancing block");
      const b = this._nodes.length - f;
      if (b < 0 || o !== void 0 && b !== o)
        throw new Error(`CodeGen: wrong number of nodes: ${b} vs ${o} expected`);
      return this._nodes.length = f, this;
    }
    // `function` heading (or definition if funcBody is passed)
    func(o, f = t.nil, b, j) {
      return this._blockNode(new z(o, f, b)), j && this.code(j).endFunc(), this;
    }
    // end function definition
    endFunc() {
      return this._endBlockNode(z);
    }
    optimize(o = 1) {
      for (; o-- > 0; )
        this._root.optimizeNodes(), this._root.optimizeNames(this._root.names, this._constants);
    }
    _leafNode(o) {
      return this._currNode.nodes.push(o), this;
    }
    _blockNode(o) {
      this._currNode.nodes.push(o), this._nodes.push(o);
    }
    _endBlockNode(o, f) {
      const b = this._currNode;
      if (b instanceof o || f && b instanceof f)
        return this._nodes.pop(), this;
      throw new Error(`CodeGen: not in block "${f ? `${o.kind}/${f.kind}` : o.kind}"`);
    }
    _elseNode(o) {
      const f = this._currNode;
      if (!(f instanceof h))
        throw new Error('CodeGen: "else" without "if"');
      return this._currNode = f.else = o, this;
    }
    get _root() {
      return this._nodes[0];
    }
    get _currNode() {
      const o = this._nodes;
      return o[o.length - 1];
    }
    set _currNode(o) {
      const f = this._nodes;
      f[f.length - 1] = o;
    }
  }
  e.CodeGen = ne;
  function Q(y, o) {
    for (const f in o)
      y[f] = (y[f] || 0) + (o[f] || 0);
    return y;
  }
  function de(y, o) {
    return o instanceof t._CodeOrName ? Q(y, o.names) : y;
  }
  function C(y, o, f) {
    if (y instanceof t.Name)
      return b(y);
    if (!j(y))
      return y;
    return new t._Code(y._items.reduce((A, q) => (q instanceof t.Name && (q = b(q)), q instanceof t._Code ? A.push(...q._items) : A.push(q), A), []));
    function b(A) {
      const q = f[A.str];
      return q === void 0 || o[A.str] !== 1 ? A : (delete o[A.str], q);
    }
    function j(A) {
      return A instanceof t._Code && A._items.some((q) => q instanceof t.Name && o[q.str] === 1 && f[q.str] !== void 0);
    }
  }
  function k(y, o) {
    for (const f in o)
      y[f] = (y[f] || 0) - (o[f] || 0);
  }
  function U(y) {
    return typeof y == "boolean" || typeof y == "number" || y === null ? !y : (0, t._)`!${S(y)}`;
  }
  e.not = U;
  const D = p(e.operators.AND);
  function O(...y) {
    return y.reduce(D);
  }
  e.and = O;
  const T = p(e.operators.OR);
  function v(...y) {
    return y.reduce(T);
  }
  e.or = v;
  function p(y) {
    return (o, f) => o === t.nil ? f : f === t.nil ? o : (0, t._)`${S(o)} ${y} ${S(f)}`;
  }
  function S(y) {
    return y instanceof t.Name ? y : (0, t._)`(${y})`;
  }
})(te);
var M = {};
Object.defineProperty(M, "__esModule", { value: !0 });
M.checkStrictMode = M.getErrorPath = M.Type = M.useFunc = M.setEvaluated = M.evaluatedPropsToName = M.mergeEvaluated = M.eachItem = M.unescapeJsonPointer = M.escapeJsonPointer = M.escapeFragment = M.unescapeFragment = M.schemaRefOrVal = M.schemaHasRulesButRef = M.schemaHasRules = M.checkUnknownRules = M.alwaysValidSchema = M.toHash = void 0;
const ie = te, Id = Jr;
function jd(e) {
  const t = {};
  for (const r of e)
    t[r] = !0;
  return t;
}
M.toHash = jd;
function Ad(e, t) {
  return typeof t == "boolean" ? t : Object.keys(t).length === 0 ? !0 : (Lc(e, t), !Fc(t, e.self.RULES.all));
}
M.alwaysValidSchema = Ad;
function Lc(e, t = e.schema) {
  const { opts: r, self: n } = e;
  if (!r.strictSchema || typeof t == "boolean")
    return;
  const s = n.RULES.keywords;
  for (const a in t)
    s[a] || zc(e, `unknown keyword: "${a}"`);
}
M.checkUnknownRules = Lc;
function Fc(e, t) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (t[r])
      return !0;
  return !1;
}
M.schemaHasRules = Fc;
function kd(e, t) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (r !== "$ref" && t.all[r])
      return !0;
  return !1;
}
M.schemaHasRulesButRef = kd;
function Cd({ topSchemaRef: e, schemaPath: t }, r, n, s) {
  if (!s) {
    if (typeof r == "number" || typeof r == "boolean")
      return r;
    if (typeof r == "string")
      return (0, ie._)`${r}`;
  }
  return (0, ie._)`${e}${t}${(0, ie.getProperty)(n)}`;
}
M.schemaRefOrVal = Cd;
function Dd(e) {
  return Vc(decodeURIComponent(e));
}
M.unescapeFragment = Dd;
function Md(e) {
  return encodeURIComponent(la(e));
}
M.escapeFragment = Md;
function la(e) {
  return typeof e == "number" ? `${e}` : e.replace(/~/g, "~0").replace(/\//g, "~1");
}
M.escapeJsonPointer = la;
function Vc(e) {
  return e.replace(/~1/g, "/").replace(/~0/g, "~");
}
M.unescapeJsonPointer = Vc;
function Ld(e, t) {
  if (Array.isArray(e))
    for (const r of e)
      t(r);
  else
    t(e);
}
M.eachItem = Ld;
function ri({ mergeNames: e, mergeToName: t, mergeValues: r, resultToName: n }) {
  return (s, a, i, u) => {
    const c = i === void 0 ? a : i instanceof ie.Name ? (a instanceof ie.Name ? e(s, a, i) : t(s, a, i), i) : a instanceof ie.Name ? (t(s, i, a), a) : r(a, i);
    return u === ie.Name && !(c instanceof ie.Name) ? n(s, c) : c;
  };
}
M.mergeEvaluated = {
  props: ri({
    mergeNames: (e, t, r) => e.if((0, ie._)`${r} !== true && ${t} !== undefined`, () => {
      e.if((0, ie._)`${t} === true`, () => e.assign(r, !0), () => e.assign(r, (0, ie._)`${r} || {}`).code((0, ie._)`Object.assign(${r}, ${t})`));
    }),
    mergeToName: (e, t, r) => e.if((0, ie._)`${r} !== true`, () => {
      t === !0 ? e.assign(r, !0) : (e.assign(r, (0, ie._)`${r} || {}`), ua(e, r, t));
    }),
    mergeValues: (e, t) => e === !0 ? !0 : { ...e, ...t },
    resultToName: Uc
  }),
  items: ri({
    mergeNames: (e, t, r) => e.if((0, ie._)`${r} !== true && ${t} !== undefined`, () => e.assign(r, (0, ie._)`${t} === true ? true : ${r} > ${t} ? ${r} : ${t}`)),
    mergeToName: (e, t, r) => e.if((0, ie._)`${r} !== true`, () => e.assign(r, t === !0 ? !0 : (0, ie._)`${r} > ${t} ? ${r} : ${t}`)),
    mergeValues: (e, t) => e === !0 ? !0 : Math.max(e, t),
    resultToName: (e, t) => e.var("items", t)
  })
};
function Uc(e, t) {
  if (t === !0)
    return e.var("props", !0);
  const r = e.var("props", (0, ie._)`{}`);
  return t !== void 0 && ua(e, r, t), r;
}
M.evaluatedPropsToName = Uc;
function ua(e, t, r) {
  Object.keys(r).forEach((n) => e.assign((0, ie._)`${t}${(0, ie.getProperty)(n)}`, !0));
}
M.setEvaluated = ua;
const ni = {};
function Fd(e, t) {
  return e.scopeValue("func", {
    ref: t,
    code: ni[t.code] || (ni[t.code] = new Id._Code(t.code))
  });
}
M.useFunc = Fd;
var js;
(function(e) {
  e[e.Num = 0] = "Num", e[e.Str = 1] = "Str";
})(js || (M.Type = js = {}));
function Vd(e, t, r) {
  if (e instanceof ie.Name) {
    const n = t === js.Num;
    return r ? n ? (0, ie._)`"[" + ${e} + "]"` : (0, ie._)`"['" + ${e} + "']"` : n ? (0, ie._)`"/" + ${e}` : (0, ie._)`"/" + ${e}.replace(/~/g, "~0").replace(/\\//g, "~1")`;
  }
  return r ? (0, ie.getProperty)(e).toString() : "/" + la(e);
}
M.getErrorPath = Vd;
function zc(e, t, r = e.opts.strictSchema) {
  if (r) {
    if (t = `strict mode: ${t}`, r === !0)
      throw new Error(t);
    e.self.logger.warn(t);
  }
}
M.checkStrictMode = zc;
var ct = {};
Object.defineProperty(ct, "__esModule", { value: !0 });
const Pe = te, Ud = {
  // validation function arguments
  data: new Pe.Name("data"),
  // data passed to validation function
  // args passed from referencing schema
  valCxt: new Pe.Name("valCxt"),
  // validation/data context - should not be used directly, it is destructured to the names below
  instancePath: new Pe.Name("instancePath"),
  parentData: new Pe.Name("parentData"),
  parentDataProperty: new Pe.Name("parentDataProperty"),
  rootData: new Pe.Name("rootData"),
  // root data - same as the data passed to the first/top validation function
  dynamicAnchors: new Pe.Name("dynamicAnchors"),
  // used to support recursiveRef and dynamicRef
  // function scoped variables
  vErrors: new Pe.Name("vErrors"),
  // null or array of validation errors
  errors: new Pe.Name("errors"),
  // counter of validation errors
  this: new Pe.Name("this"),
  // "globals"
  self: new Pe.Name("self"),
  scope: new Pe.Name("scope"),
  // JTD serialize/parse name for JSON string and position
  json: new Pe.Name("json"),
  jsonPos: new Pe.Name("jsonPos"),
  jsonLen: new Pe.Name("jsonLen"),
  jsonPart: new Pe.Name("jsonPart")
};
ct.default = Ud;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.extendErrors = e.resetErrorsCount = e.reportExtraError = e.reportError = e.keyword$DataError = e.keywordError = void 0;
  const t = te, r = M, n = ct;
  e.keywordError = {
    message: ({ keyword: $ }) => (0, t.str)`must pass "${$}" keyword validation`
  }, e.keyword$DataError = {
    message: ({ keyword: $, schemaType: h }) => h ? (0, t.str)`"${$}" keyword must be ${h} ($data)` : (0, t.str)`"${$}" keyword is invalid ($data)`
  };
  function s($, h = e.keywordError, E, N) {
    const { it: R } = $, { gen: I, compositeRule: z, allErrors: W } = R, ue = m($, h, E);
    N ?? (z || W) ? c(I, ue) : d(R, (0, t._)`[${ue}]`);
  }
  e.reportError = s;
  function a($, h = e.keywordError, E) {
    const { it: N } = $, { gen: R, compositeRule: I, allErrors: z } = N, W = m($, h, E);
    c(R, W), I || z || d(N, n.default.vErrors);
  }
  e.reportExtraError = a;
  function i($, h) {
    $.assign(n.default.errors, h), $.if((0, t._)`${n.default.vErrors} !== null`, () => $.if(h, () => $.assign((0, t._)`${n.default.vErrors}.length`, h), () => $.assign(n.default.vErrors, null)));
  }
  e.resetErrorsCount = i;
  function u({ gen: $, keyword: h, schemaValue: E, data: N, errsCount: R, it: I }) {
    if (R === void 0)
      throw new Error("ajv implementation error");
    const z = $.name("err");
    $.forRange("i", R, n.default.errors, (W) => {
      $.const(z, (0, t._)`${n.default.vErrors}[${W}]`), $.if((0, t._)`${z}.instancePath === undefined`, () => $.assign((0, t._)`${z}.instancePath`, (0, t.strConcat)(n.default.instancePath, I.errorPath))), $.assign((0, t._)`${z}.schemaPath`, (0, t.str)`${I.errSchemaPath}/${h}`), I.opts.verbose && ($.assign((0, t._)`${z}.schema`, E), $.assign((0, t._)`${z}.data`, N));
    });
  }
  e.extendErrors = u;
  function c($, h) {
    const E = $.const("err", h);
    $.if((0, t._)`${n.default.vErrors} === null`, () => $.assign(n.default.vErrors, (0, t._)`[${E}]`), (0, t._)`${n.default.vErrors}.push(${E})`), $.code((0, t._)`${n.default.errors}++`);
  }
  function d($, h) {
    const { gen: E, validateName: N, schemaEnv: R } = $;
    R.$async ? E.throw((0, t._)`new ${$.ValidationError}(${h})`) : (E.assign((0, t._)`${N}.errors`, h), E.return(!1));
  }
  const l = {
    keyword: new t.Name("keyword"),
    schemaPath: new t.Name("schemaPath"),
    // also used in JTD errors
    params: new t.Name("params"),
    propertyName: new t.Name("propertyName"),
    message: new t.Name("message"),
    schema: new t.Name("schema"),
    parentSchema: new t.Name("parentSchema")
  };
  function m($, h, E) {
    const { createErrors: N } = $.it;
    return N === !1 ? (0, t._)`{}` : P($, h, E);
  }
  function P($, h, E = {}) {
    const { gen: N, it: R } = $, I = [
      _(R, E),
      w($, E)
    ];
    return g($, h, I), N.object(...I);
  }
  function _({ errorPath: $ }, { instancePath: h }) {
    const E = h ? (0, t.str)`${$}${(0, r.getErrorPath)(h, r.Type.Str)}` : $;
    return [n.default.instancePath, (0, t.strConcat)(n.default.instancePath, E)];
  }
  function w({ keyword: $, it: { errSchemaPath: h } }, { schemaPath: E, parentSchema: N }) {
    let R = N ? h : (0, t.str)`${h}/${$}`;
    return E && (R = (0, t.str)`${R}${(0, r.getErrorPath)(E, r.Type.Str)}`), [l.schemaPath, R];
  }
  function g($, { params: h, message: E }, N) {
    const { keyword: R, data: I, schemaValue: z, it: W } = $, { opts: ue, propertyName: V, topSchemaRef: H, schemaPath: ne } = W;
    N.push([l.keyword, R], [l.params, typeof h == "function" ? h($) : h || (0, t._)`{}`]), ue.messages && N.push([l.message, typeof E == "function" ? E($) : E]), ue.verbose && N.push([l.schema, z], [l.parentSchema, (0, t._)`${H}${ne}`], [n.default.data, I]), V && N.push([l.propertyName, V]);
  }
})(Yr);
Object.defineProperty($r, "__esModule", { value: !0 });
$r.boolOrEmptySchema = $r.topBoolOrEmptySchema = void 0;
const zd = Yr, qd = te, Kd = ct, Gd = {
  message: "boolean schema is false"
};
function Hd(e) {
  const { gen: t, schema: r, validateName: n } = e;
  r === !1 ? qc(e, !1) : typeof r == "object" && r.$async === !0 ? t.return(Kd.default.data) : (t.assign((0, qd._)`${n}.errors`, null), t.return(!0));
}
$r.topBoolOrEmptySchema = Hd;
function Wd(e, t) {
  const { gen: r, schema: n } = e;
  n === !1 ? (r.var(t, !1), qc(e)) : r.var(t, !0);
}
$r.boolOrEmptySchema = Wd;
function qc(e, t) {
  const { gen: r, data: n } = e, s = {
    gen: r,
    keyword: "false schema",
    data: n,
    schema: !1,
    schemaCode: !1,
    schemaValue: !1,
    params: {},
    it: e
  };
  (0, zd.reportError)(s, Gd, void 0, t);
}
var $e = {}, Qt = {};
Object.defineProperty(Qt, "__esModule", { value: !0 });
Qt.getRules = Qt.isJSONType = void 0;
const Bd = ["string", "number", "integer", "boolean", "null", "object", "array"], Jd = new Set(Bd);
function Xd(e) {
  return typeof e == "string" && Jd.has(e);
}
Qt.isJSONType = Xd;
function Yd() {
  const e = {
    number: { type: "number", rules: [] },
    string: { type: "string", rules: [] },
    array: { type: "array", rules: [] },
    object: { type: "object", rules: [] }
  };
  return {
    types: { ...e, integer: !0, boolean: !0, null: !0 },
    rules: [{ rules: [] }, e.number, e.string, e.array, e.object],
    post: { rules: [] },
    all: {},
    keywords: {}
  };
}
Qt.getRules = Yd;
var dt = {};
Object.defineProperty(dt, "__esModule", { value: !0 });
dt.shouldUseRule = dt.shouldUseGroup = dt.schemaHasRulesForType = void 0;
function Qd({ schema: e, self: t }, r) {
  const n = t.RULES.types[r];
  return n && n !== !0 && Kc(e, n);
}
dt.schemaHasRulesForType = Qd;
function Kc(e, t) {
  return t.rules.some((r) => Gc(e, r));
}
dt.shouldUseGroup = Kc;
function Gc(e, t) {
  var r;
  return e[t.keyword] !== void 0 || ((r = t.definition.implements) === null || r === void 0 ? void 0 : r.some((n) => e[n] !== void 0));
}
dt.shouldUseRule = Gc;
Object.defineProperty($e, "__esModule", { value: !0 });
$e.reportTypeError = $e.checkDataTypes = $e.checkDataType = $e.coerceAndCheckDataType = $e.getJSONTypes = $e.getSchemaTypes = $e.DataType = void 0;
const Zd = Qt, xd = dt, ef = Yr, X = te, Hc = M;
var dr;
(function(e) {
  e[e.Correct = 0] = "Correct", e[e.Wrong = 1] = "Wrong";
})(dr || ($e.DataType = dr = {}));
function tf(e) {
  const t = Wc(e.type);
  if (t.includes("null")) {
    if (e.nullable === !1)
      throw new Error("type: null contradicts nullable: false");
  } else {
    if (!t.length && e.nullable !== void 0)
      throw new Error('"nullable" cannot be used without "type"');
    e.nullable === !0 && t.push("null");
  }
  return t;
}
$e.getSchemaTypes = tf;
function Wc(e) {
  const t = Array.isArray(e) ? e : e ? [e] : [];
  if (t.every(Zd.isJSONType))
    return t;
  throw new Error("type must be JSONType or JSONType[]: " + t.join(","));
}
$e.getJSONTypes = Wc;
function rf(e, t) {
  const { gen: r, data: n, opts: s } = e, a = nf(t, s.coerceTypes), i = t.length > 0 && !(a.length === 0 && t.length === 1 && (0, xd.schemaHasRulesForType)(e, t[0]));
  if (i) {
    const u = da(t, n, s.strictNumbers, dr.Wrong);
    r.if(u, () => {
      a.length ? sf(e, t, a) : fa(e);
    });
  }
  return i;
}
$e.coerceAndCheckDataType = rf;
const Bc = /* @__PURE__ */ new Set(["string", "number", "integer", "boolean", "null"]);
function nf(e, t) {
  return t ? e.filter((r) => Bc.has(r) || t === "array" && r === "array") : [];
}
function sf(e, t, r) {
  const { gen: n, data: s, opts: a } = e, i = n.let("dataType", (0, X._)`typeof ${s}`), u = n.let("coerced", (0, X._)`undefined`);
  a.coerceTypes === "array" && n.if((0, X._)`${i} == 'object' && Array.isArray(${s}) && ${s}.length == 1`, () => n.assign(s, (0, X._)`${s}[0]`).assign(i, (0, X._)`typeof ${s}`).if(da(t, s, a.strictNumbers), () => n.assign(u, s))), n.if((0, X._)`${u} !== undefined`);
  for (const d of r)
    (Bc.has(d) || d === "array" && a.coerceTypes === "array") && c(d);
  n.else(), fa(e), n.endIf(), n.if((0, X._)`${u} !== undefined`, () => {
    n.assign(s, u), af(e, u);
  });
  function c(d) {
    switch (d) {
      case "string":
        n.elseIf((0, X._)`${i} == "number" || ${i} == "boolean"`).assign(u, (0, X._)`"" + ${s}`).elseIf((0, X._)`${s} === null`).assign(u, (0, X._)`""`);
        return;
      case "number":
        n.elseIf((0, X._)`${i} == "boolean" || ${s} === null
              || (${i} == "string" && ${s} && ${s} == +${s})`).assign(u, (0, X._)`+${s}`);
        return;
      case "integer":
        n.elseIf((0, X._)`${i} === "boolean" || ${s} === null
              || (${i} === "string" && ${s} && ${s} == +${s} && !(${s} % 1))`).assign(u, (0, X._)`+${s}`);
        return;
      case "boolean":
        n.elseIf((0, X._)`${s} === "false" || ${s} === 0 || ${s} === null`).assign(u, !1).elseIf((0, X._)`${s} === "true" || ${s} === 1`).assign(u, !0);
        return;
      case "null":
        n.elseIf((0, X._)`${s} === "" || ${s} === 0 || ${s} === false`), n.assign(u, null);
        return;
      case "array":
        n.elseIf((0, X._)`${i} === "string" || ${i} === "number"
              || ${i} === "boolean" || ${s} === null`).assign(u, (0, X._)`[${s}]`);
    }
  }
}
function af({ gen: e, parentData: t, parentDataProperty: r }, n) {
  e.if((0, X._)`${t} !== undefined`, () => e.assign((0, X._)`${t}[${r}]`, n));
}
function As(e, t, r, n = dr.Correct) {
  const s = n === dr.Correct ? X.operators.EQ : X.operators.NEQ;
  let a;
  switch (e) {
    case "null":
      return (0, X._)`${t} ${s} null`;
    case "array":
      a = (0, X._)`Array.isArray(${t})`;
      break;
    case "object":
      a = (0, X._)`${t} && typeof ${t} == "object" && !Array.isArray(${t})`;
      break;
    case "integer":
      a = i((0, X._)`!(${t} % 1) && !isNaN(${t})`);
      break;
    case "number":
      a = i();
      break;
    default:
      return (0, X._)`typeof ${t} ${s} ${e}`;
  }
  return n === dr.Correct ? a : (0, X.not)(a);
  function i(u = X.nil) {
    return (0, X.and)((0, X._)`typeof ${t} == "number"`, u, r ? (0, X._)`isFinite(${t})` : X.nil);
  }
}
$e.checkDataType = As;
function da(e, t, r, n) {
  if (e.length === 1)
    return As(e[0], t, r, n);
  let s;
  const a = (0, Hc.toHash)(e);
  if (a.array && a.object) {
    const i = (0, X._)`typeof ${t} != "object"`;
    s = a.null ? i : (0, X._)`!${t} || ${i}`, delete a.null, delete a.array, delete a.object;
  } else
    s = X.nil;
  a.number && delete a.integer;
  for (const i in a)
    s = (0, X.and)(s, As(i, t, r, n));
  return s;
}
$e.checkDataTypes = da;
const of = {
  message: ({ schema: e }) => `must be ${e}`,
  params: ({ schema: e, schemaValue: t }) => typeof e == "string" ? (0, X._)`{type: ${e}}` : (0, X._)`{type: ${t}}`
};
function fa(e) {
  const t = cf(e);
  (0, ef.reportError)(t, of);
}
$e.reportTypeError = fa;
function cf(e) {
  const { gen: t, data: r, schema: n } = e, s = (0, Hc.schemaRefOrVal)(e, n, "type");
  return {
    gen: t,
    keyword: "type",
    data: r,
    schema: n.type,
    schemaCode: s,
    schemaValue: s,
    parentSchema: n,
    params: {},
    it: e
  };
}
var Wn = {};
Object.defineProperty(Wn, "__esModule", { value: !0 });
Wn.assignDefaults = void 0;
const rr = te, lf = M;
function uf(e, t) {
  const { properties: r, items: n } = e.schema;
  if (t === "object" && r)
    for (const s in r)
      si(e, s, r[s].default);
  else t === "array" && Array.isArray(n) && n.forEach((s, a) => si(e, a, s.default));
}
Wn.assignDefaults = uf;
function si(e, t, r) {
  const { gen: n, compositeRule: s, data: a, opts: i } = e;
  if (r === void 0)
    return;
  const u = (0, rr._)`${a}${(0, rr.getProperty)(t)}`;
  if (s) {
    (0, lf.checkStrictMode)(e, `default is ignored for: ${u}`);
    return;
  }
  let c = (0, rr._)`${u} === undefined`;
  i.useDefaults === "empty" && (c = (0, rr._)`${c} || ${u} === null || ${u} === ""`), n.if(c, (0, rr._)`${u} = ${(0, rr.stringify)(r)}`);
}
var at = {}, x = {};
Object.defineProperty(x, "__esModule", { value: !0 });
x.validateUnion = x.validateArray = x.usePattern = x.callValidateCode = x.schemaProperties = x.allSchemaProperties = x.noPropertyInData = x.propertyInData = x.isOwnProperty = x.hasPropFunc = x.reportMissingProp = x.checkMissingProp = x.checkReportMissingProp = void 0;
const fe = te, ha = M, yt = ct, df = M;
function ff(e, t) {
  const { gen: r, data: n, it: s } = e;
  r.if(pa(r, n, t, s.opts.ownProperties), () => {
    e.setParams({ missingProperty: (0, fe._)`${t}` }, !0), e.error();
  });
}
x.checkReportMissingProp = ff;
function hf({ gen: e, data: t, it: { opts: r } }, n, s) {
  return (0, fe.or)(...n.map((a) => (0, fe.and)(pa(e, t, a, r.ownProperties), (0, fe._)`${s} = ${a}`)));
}
x.checkMissingProp = hf;
function mf(e, t) {
  e.setParams({ missingProperty: t }, !0), e.error();
}
x.reportMissingProp = mf;
function Jc(e) {
  return e.scopeValue("func", {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    ref: Object.prototype.hasOwnProperty,
    code: (0, fe._)`Object.prototype.hasOwnProperty`
  });
}
x.hasPropFunc = Jc;
function ma(e, t, r) {
  return (0, fe._)`${Jc(e)}.call(${t}, ${r})`;
}
x.isOwnProperty = ma;
function pf(e, t, r, n) {
  const s = (0, fe._)`${t}${(0, fe.getProperty)(r)} !== undefined`;
  return n ? (0, fe._)`${s} && ${ma(e, t, r)}` : s;
}
x.propertyInData = pf;
function pa(e, t, r, n) {
  const s = (0, fe._)`${t}${(0, fe.getProperty)(r)} === undefined`;
  return n ? (0, fe.or)(s, (0, fe.not)(ma(e, t, r))) : s;
}
x.noPropertyInData = pa;
function Xc(e) {
  return e ? Object.keys(e).filter((t) => t !== "__proto__") : [];
}
x.allSchemaProperties = Xc;
function yf(e, t) {
  return Xc(t).filter((r) => !(0, ha.alwaysValidSchema)(e, t[r]));
}
x.schemaProperties = yf;
function $f({ schemaCode: e, data: t, it: { gen: r, topSchemaRef: n, schemaPath: s, errorPath: a }, it: i }, u, c, d) {
  const l = d ? (0, fe._)`${e}, ${t}, ${n}${s}` : t, m = [
    [yt.default.instancePath, (0, fe.strConcat)(yt.default.instancePath, a)],
    [yt.default.parentData, i.parentData],
    [yt.default.parentDataProperty, i.parentDataProperty],
    [yt.default.rootData, yt.default.rootData]
  ];
  i.opts.dynamicRef && m.push([yt.default.dynamicAnchors, yt.default.dynamicAnchors]);
  const P = (0, fe._)`${l}, ${r.object(...m)}`;
  return c !== fe.nil ? (0, fe._)`${u}.call(${c}, ${P})` : (0, fe._)`${u}(${P})`;
}
x.callValidateCode = $f;
const _f = (0, fe._)`new RegExp`;
function gf({ gen: e, it: { opts: t } }, r) {
  const n = t.unicodeRegExp ? "u" : "", { regExp: s } = t.code, a = s(r, n);
  return e.scopeValue("pattern", {
    key: a.toString(),
    ref: a,
    code: (0, fe._)`${s.code === "new RegExp" ? _f : (0, df.useFunc)(e, s)}(${r}, ${n})`
  });
}
x.usePattern = gf;
function vf(e) {
  const { gen: t, data: r, keyword: n, it: s } = e, a = t.name("valid");
  if (s.allErrors) {
    const u = t.let("valid", !0);
    return i(() => t.assign(u, !1)), u;
  }
  return t.var(a, !0), i(() => t.break()), a;
  function i(u) {
    const c = t.const("len", (0, fe._)`${r}.length`);
    t.forRange("i", 0, c, (d) => {
      e.subschema({
        keyword: n,
        dataProp: d,
        dataPropType: ha.Type.Num
      }, a), t.if((0, fe.not)(a), u);
    });
  }
}
x.validateArray = vf;
function Ef(e) {
  const { gen: t, schema: r, keyword: n, it: s } = e;
  if (!Array.isArray(r))
    throw new Error("ajv implementation error");
  if (r.some((c) => (0, ha.alwaysValidSchema)(s, c)) && !s.opts.unevaluated)
    return;
  const i = t.let("valid", !1), u = t.name("_valid");
  t.block(() => r.forEach((c, d) => {
    const l = e.subschema({
      keyword: n,
      schemaProp: d,
      compositeRule: !0
    }, u);
    t.assign(i, (0, fe._)`${i} || ${u}`), e.mergeValidEvaluated(l, u) || t.if((0, fe.not)(i));
  })), e.result(i, () => e.reset(), () => e.error(!0));
}
x.validateUnion = Ef;
Object.defineProperty(at, "__esModule", { value: !0 });
at.validateKeywordUsage = at.validSchemaType = at.funcKeywordCode = at.macroKeywordCode = void 0;
const Te = te, Ht = ct, wf = x, Sf = Yr;
function bf(e, t) {
  const { gen: r, keyword: n, schema: s, parentSchema: a, it: i } = e, u = t.macro.call(i.self, s, a, i), c = Yc(r, n, u);
  i.opts.validateSchema !== !1 && i.self.validateSchema(u, !0);
  const d = r.name("valid");
  e.subschema({
    schema: u,
    schemaPath: Te.nil,
    errSchemaPath: `${i.errSchemaPath}/${n}`,
    topSchemaRef: c,
    compositeRule: !0
  }, d), e.pass(d, () => e.error(!0));
}
at.macroKeywordCode = bf;
function Pf(e, t) {
  var r;
  const { gen: n, keyword: s, schema: a, parentSchema: i, $data: u, it: c } = e;
  Of(c, t);
  const d = !u && t.compile ? t.compile.call(c.self, a, i, c) : t.validate, l = Yc(n, s, d), m = n.let("valid");
  e.block$data(m, P), e.ok((r = t.valid) !== null && r !== void 0 ? r : m);
  function P() {
    if (t.errors === !1)
      g(), t.modifying && ai(e), $(() => e.error());
    else {
      const h = t.async ? _() : w();
      t.modifying && ai(e), $(() => Nf(e, h));
    }
  }
  function _() {
    const h = n.let("ruleErrs", null);
    return n.try(() => g((0, Te._)`await `), (E) => n.assign(m, !1).if((0, Te._)`${E} instanceof ${c.ValidationError}`, () => n.assign(h, (0, Te._)`${E}.errors`), () => n.throw(E))), h;
  }
  function w() {
    const h = (0, Te._)`${l}.errors`;
    return n.assign(h, null), g(Te.nil), h;
  }
  function g(h = t.async ? (0, Te._)`await ` : Te.nil) {
    const E = c.opts.passContext ? Ht.default.this : Ht.default.self, N = !("compile" in t && !u || t.schema === !1);
    n.assign(m, (0, Te._)`${h}${(0, wf.callValidateCode)(e, l, E, N)}`, t.modifying);
  }
  function $(h) {
    var E;
    n.if((0, Te.not)((E = t.valid) !== null && E !== void 0 ? E : m), h);
  }
}
at.funcKeywordCode = Pf;
function ai(e) {
  const { gen: t, data: r, it: n } = e;
  t.if(n.parentData, () => t.assign(r, (0, Te._)`${n.parentData}[${n.parentDataProperty}]`));
}
function Nf(e, t) {
  const { gen: r } = e;
  r.if((0, Te._)`Array.isArray(${t})`, () => {
    r.assign(Ht.default.vErrors, (0, Te._)`${Ht.default.vErrors} === null ? ${t} : ${Ht.default.vErrors}.concat(${t})`).assign(Ht.default.errors, (0, Te._)`${Ht.default.vErrors}.length`), (0, Sf.extendErrors)(e);
  }, () => e.error());
}
function Of({ schemaEnv: e }, t) {
  if (t.async && !e.$async)
    throw new Error("async keyword in sync schema");
}
function Yc(e, t, r) {
  if (r === void 0)
    throw new Error(`keyword "${t}" failed to compile`);
  return e.scopeValue("keyword", typeof r == "function" ? { ref: r } : { ref: r, code: (0, Te.stringify)(r) });
}
function Rf(e, t, r = !1) {
  return !t.length || t.some((n) => n === "array" ? Array.isArray(e) : n === "object" ? e && typeof e == "object" && !Array.isArray(e) : typeof e == n || r && typeof e > "u");
}
at.validSchemaType = Rf;
function Tf({ schema: e, opts: t, self: r, errSchemaPath: n }, s, a) {
  if (Array.isArray(s.keyword) ? !s.keyword.includes(a) : s.keyword !== a)
    throw new Error("ajv implementation error");
  const i = s.dependencies;
  if (i != null && i.some((u) => !Object.prototype.hasOwnProperty.call(e, u)))
    throw new Error(`parent schema must have dependencies of ${a}: ${i.join(",")}`);
  if (s.validateSchema && !s.validateSchema(e[a])) {
    const c = `keyword "${a}" value is invalid at path "${n}": ` + r.errorsText(s.validateSchema.errors);
    if (t.validateSchema === "log")
      r.logger.error(c);
    else
      throw new Error(c);
  }
}
at.validateKeywordUsage = Tf;
var Pt = {};
Object.defineProperty(Pt, "__esModule", { value: !0 });
Pt.extendSubschemaMode = Pt.extendSubschemaData = Pt.getSubschema = void 0;
const rt = te, Qc = M;
function If(e, { keyword: t, schemaProp: r, schema: n, schemaPath: s, errSchemaPath: a, topSchemaRef: i }) {
  if (t !== void 0 && n !== void 0)
    throw new Error('both "keyword" and "schema" passed, only one allowed');
  if (t !== void 0) {
    const u = e.schema[t];
    return r === void 0 ? {
      schema: u,
      schemaPath: (0, rt._)`${e.schemaPath}${(0, rt.getProperty)(t)}`,
      errSchemaPath: `${e.errSchemaPath}/${t}`
    } : {
      schema: u[r],
      schemaPath: (0, rt._)`${e.schemaPath}${(0, rt.getProperty)(t)}${(0, rt.getProperty)(r)}`,
      errSchemaPath: `${e.errSchemaPath}/${t}/${(0, Qc.escapeFragment)(r)}`
    };
  }
  if (n !== void 0) {
    if (s === void 0 || a === void 0 || i === void 0)
      throw new Error('"schemaPath", "errSchemaPath" and "topSchemaRef" are required with "schema"');
    return {
      schema: n,
      schemaPath: s,
      topSchemaRef: i,
      errSchemaPath: a
    };
  }
  throw new Error('either "keyword" or "schema" must be passed');
}
Pt.getSubschema = If;
function jf(e, t, { dataProp: r, dataPropType: n, data: s, dataTypes: a, propertyName: i }) {
  if (s !== void 0 && r !== void 0)
    throw new Error('both "data" and "dataProp" passed, only one allowed');
  const { gen: u } = t;
  if (r !== void 0) {
    const { errorPath: d, dataPathArr: l, opts: m } = t, P = u.let("data", (0, rt._)`${t.data}${(0, rt.getProperty)(r)}`, !0);
    c(P), e.errorPath = (0, rt.str)`${d}${(0, Qc.getErrorPath)(r, n, m.jsPropertySyntax)}`, e.parentDataProperty = (0, rt._)`${r}`, e.dataPathArr = [...l, e.parentDataProperty];
  }
  if (s !== void 0) {
    const d = s instanceof rt.Name ? s : u.let("data", s, !0);
    c(d), i !== void 0 && (e.propertyName = i);
  }
  a && (e.dataTypes = a);
  function c(d) {
    e.data = d, e.dataLevel = t.dataLevel + 1, e.dataTypes = [], t.definedProperties = /* @__PURE__ */ new Set(), e.parentData = t.data, e.dataNames = [...t.dataNames, d];
  }
}
Pt.extendSubschemaData = jf;
function Af(e, { jtdDiscriminator: t, jtdMetadata: r, compositeRule: n, createErrors: s, allErrors: a }) {
  n !== void 0 && (e.compositeRule = n), s !== void 0 && (e.createErrors = s), a !== void 0 && (e.allErrors = a), e.jtdDiscriminator = t, e.jtdMetadata = r;
}
Pt.extendSubschemaMode = Af;
var Se = {}, Bn = function e(t, r) {
  if (t === r) return !0;
  if (t && r && typeof t == "object" && typeof r == "object") {
    if (t.constructor !== r.constructor) return !1;
    var n, s, a;
    if (Array.isArray(t)) {
      if (n = t.length, n != r.length) return !1;
      for (s = n; s-- !== 0; )
        if (!e(t[s], r[s])) return !1;
      return !0;
    }
    if (t.constructor === RegExp) return t.source === r.source && t.flags === r.flags;
    if (t.valueOf !== Object.prototype.valueOf) return t.valueOf() === r.valueOf();
    if (t.toString !== Object.prototype.toString) return t.toString() === r.toString();
    if (a = Object.keys(t), n = a.length, n !== Object.keys(r).length) return !1;
    for (s = n; s-- !== 0; )
      if (!Object.prototype.hasOwnProperty.call(r, a[s])) return !1;
    for (s = n; s-- !== 0; ) {
      var i = a[s];
      if (!e(t[i], r[i])) return !1;
    }
    return !0;
  }
  return t !== t && r !== r;
}, Zc = { exports: {} }, St = Zc.exports = function(e, t, r) {
  typeof t == "function" && (r = t, t = {}), r = t.cb || r;
  var n = typeof r == "function" ? r : r.pre || function() {
  }, s = r.post || function() {
  };
  bn(t, n, s, e, "", e);
};
St.keywords = {
  additionalItems: !0,
  items: !0,
  contains: !0,
  additionalProperties: !0,
  propertyNames: !0,
  not: !0,
  if: !0,
  then: !0,
  else: !0
};
St.arrayKeywords = {
  items: !0,
  allOf: !0,
  anyOf: !0,
  oneOf: !0
};
St.propsKeywords = {
  $defs: !0,
  definitions: !0,
  properties: !0,
  patternProperties: !0,
  dependencies: !0
};
St.skipKeywords = {
  default: !0,
  enum: !0,
  const: !0,
  required: !0,
  maximum: !0,
  minimum: !0,
  exclusiveMaximum: !0,
  exclusiveMinimum: !0,
  multipleOf: !0,
  maxLength: !0,
  minLength: !0,
  pattern: !0,
  format: !0,
  maxItems: !0,
  minItems: !0,
  uniqueItems: !0,
  maxProperties: !0,
  minProperties: !0
};
function bn(e, t, r, n, s, a, i, u, c, d) {
  if (n && typeof n == "object" && !Array.isArray(n)) {
    t(n, s, a, i, u, c, d);
    for (var l in n) {
      var m = n[l];
      if (Array.isArray(m)) {
        if (l in St.arrayKeywords)
          for (var P = 0; P < m.length; P++)
            bn(e, t, r, m[P], s + "/" + l + "/" + P, a, s, l, n, P);
      } else if (l in St.propsKeywords) {
        if (m && typeof m == "object")
          for (var _ in m)
            bn(e, t, r, m[_], s + "/" + l + "/" + kf(_), a, s, l, n, _);
      } else (l in St.keywords || e.allKeys && !(l in St.skipKeywords)) && bn(e, t, r, m, s + "/" + l, a, s, l, n);
    }
    r(n, s, a, i, u, c, d);
  }
}
function kf(e) {
  return e.replace(/~/g, "~0").replace(/\//g, "~1");
}
var Cf = Zc.exports;
Object.defineProperty(Se, "__esModule", { value: !0 });
Se.getSchemaRefs = Se.resolveUrl = Se.normalizeId = Se._getFullPath = Se.getFullPath = Se.inlineRef = void 0;
const Df = M, Mf = Bn, Lf = Cf, Ff = /* @__PURE__ */ new Set([
  "type",
  "format",
  "pattern",
  "maxLength",
  "minLength",
  "maxProperties",
  "minProperties",
  "maxItems",
  "minItems",
  "maximum",
  "minimum",
  "uniqueItems",
  "multipleOf",
  "required",
  "enum",
  "const"
]);
function Vf(e, t = !0) {
  return typeof e == "boolean" ? !0 : t === !0 ? !ks(e) : t ? xc(e) <= t : !1;
}
Se.inlineRef = Vf;
const Uf = /* @__PURE__ */ new Set([
  "$ref",
  "$recursiveRef",
  "$recursiveAnchor",
  "$dynamicRef",
  "$dynamicAnchor"
]);
function ks(e) {
  for (const t in e) {
    if (Uf.has(t))
      return !0;
    const r = e[t];
    if (Array.isArray(r) && r.some(ks) || typeof r == "object" && ks(r))
      return !0;
  }
  return !1;
}
function xc(e) {
  let t = 0;
  for (const r in e) {
    if (r === "$ref")
      return 1 / 0;
    if (t++, !Ff.has(r) && (typeof e[r] == "object" && (0, Df.eachItem)(e[r], (n) => t += xc(n)), t === 1 / 0))
      return 1 / 0;
  }
  return t;
}
function el(e, t = "", r) {
  r !== !1 && (t = fr(t));
  const n = e.parse(t);
  return tl(e, n);
}
Se.getFullPath = el;
function tl(e, t) {
  return e.serialize(t).split("#")[0] + "#";
}
Se._getFullPath = tl;
const zf = /#\/?$/;
function fr(e) {
  return e ? e.replace(zf, "") : "";
}
Se.normalizeId = fr;
function qf(e, t, r) {
  return r = fr(r), e.resolve(t, r);
}
Se.resolveUrl = qf;
const Kf = /^[a-z_][-a-z0-9._]*$/i;
function Gf(e, t) {
  if (typeof e == "boolean")
    return {};
  const { schemaId: r, uriResolver: n } = this.opts, s = fr(e[r] || t), a = { "": s }, i = el(n, s, !1), u = {}, c = /* @__PURE__ */ new Set();
  return Lf(e, { allKeys: !0 }, (m, P, _, w) => {
    if (w === void 0)
      return;
    const g = i + P;
    let $ = a[w];
    typeof m[r] == "string" && ($ = h.call(this, m[r])), E.call(this, m.$anchor), E.call(this, m.$dynamicAnchor), a[P] = $;
    function h(N) {
      const R = this.opts.uriResolver.resolve;
      if (N = fr($ ? R($, N) : N), c.has(N))
        throw l(N);
      c.add(N);
      let I = this.refs[N];
      return typeof I == "string" && (I = this.refs[I]), typeof I == "object" ? d(m, I.schema, N) : N !== fr(g) && (N[0] === "#" ? (d(m, u[N], N), u[N] = m) : this.refs[N] = g), N;
    }
    function E(N) {
      if (typeof N == "string") {
        if (!Kf.test(N))
          throw new Error(`invalid anchor "${N}"`);
        h.call(this, `#${N}`);
      }
    }
  }), u;
  function d(m, P, _) {
    if (P !== void 0 && !Mf(m, P))
      throw l(_);
  }
  function l(m) {
    return new Error(`reference "${m}" resolves to more than one schema`);
  }
}
Se.getSchemaRefs = Gf;
Object.defineProperty(Qe, "__esModule", { value: !0 });
Qe.getData = Qe.KeywordCxt = Qe.validateFunctionCode = void 0;
const rl = $r, oi = $e, ya = dt, Dn = $e, Hf = Wn, Fr = at, ds = Pt, K = te, B = ct, Wf = Se, ft = M, Ir = Yr;
function Bf(e) {
  if (al(e) && (ol(e), sl(e))) {
    Yf(e);
    return;
  }
  nl(e, () => (0, rl.topBoolOrEmptySchema)(e));
}
Qe.validateFunctionCode = Bf;
function nl({ gen: e, validateName: t, schema: r, schemaEnv: n, opts: s }, a) {
  s.code.es5 ? e.func(t, (0, K._)`${B.default.data}, ${B.default.valCxt}`, n.$async, () => {
    e.code((0, K._)`"use strict"; ${ii(r, s)}`), Xf(e, s), e.code(a);
  }) : e.func(t, (0, K._)`${B.default.data}, ${Jf(s)}`, n.$async, () => e.code(ii(r, s)).code(a));
}
function Jf(e) {
  return (0, K._)`{${B.default.instancePath}="", ${B.default.parentData}, ${B.default.parentDataProperty}, ${B.default.rootData}=${B.default.data}${e.dynamicRef ? (0, K._)`, ${B.default.dynamicAnchors}={}` : K.nil}}={}`;
}
function Xf(e, t) {
  e.if(B.default.valCxt, () => {
    e.var(B.default.instancePath, (0, K._)`${B.default.valCxt}.${B.default.instancePath}`), e.var(B.default.parentData, (0, K._)`${B.default.valCxt}.${B.default.parentData}`), e.var(B.default.parentDataProperty, (0, K._)`${B.default.valCxt}.${B.default.parentDataProperty}`), e.var(B.default.rootData, (0, K._)`${B.default.valCxt}.${B.default.rootData}`), t.dynamicRef && e.var(B.default.dynamicAnchors, (0, K._)`${B.default.valCxt}.${B.default.dynamicAnchors}`);
  }, () => {
    e.var(B.default.instancePath, (0, K._)`""`), e.var(B.default.parentData, (0, K._)`undefined`), e.var(B.default.parentDataProperty, (0, K._)`undefined`), e.var(B.default.rootData, B.default.data), t.dynamicRef && e.var(B.default.dynamicAnchors, (0, K._)`{}`);
  });
}
function Yf(e) {
  const { schema: t, opts: r, gen: n } = e;
  nl(e, () => {
    r.$comment && t.$comment && cl(e), th(e), n.let(B.default.vErrors, null), n.let(B.default.errors, 0), r.unevaluated && Qf(e), il(e), sh(e);
  });
}
function Qf(e) {
  const { gen: t, validateName: r } = e;
  e.evaluated = t.const("evaluated", (0, K._)`${r}.evaluated`), t.if((0, K._)`${e.evaluated}.dynamicProps`, () => t.assign((0, K._)`${e.evaluated}.props`, (0, K._)`undefined`)), t.if((0, K._)`${e.evaluated}.dynamicItems`, () => t.assign((0, K._)`${e.evaluated}.items`, (0, K._)`undefined`));
}
function ii(e, t) {
  const r = typeof e == "object" && e[t.schemaId];
  return r && (t.code.source || t.code.process) ? (0, K._)`/*# sourceURL=${r} */` : K.nil;
}
function Zf(e, t) {
  if (al(e) && (ol(e), sl(e))) {
    xf(e, t);
    return;
  }
  (0, rl.boolOrEmptySchema)(e, t);
}
function sl({ schema: e, self: t }) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (t.RULES.all[r])
      return !0;
  return !1;
}
function al(e) {
  return typeof e.schema != "boolean";
}
function xf(e, t) {
  const { schema: r, gen: n, opts: s } = e;
  s.$comment && r.$comment && cl(e), rh(e), nh(e);
  const a = n.const("_errs", B.default.errors);
  il(e, a), n.var(t, (0, K._)`${a} === ${B.default.errors}`);
}
function ol(e) {
  (0, ft.checkUnknownRules)(e), eh(e);
}
function il(e, t) {
  if (e.opts.jtd)
    return ci(e, [], !1, t);
  const r = (0, oi.getSchemaTypes)(e.schema), n = (0, oi.coerceAndCheckDataType)(e, r);
  ci(e, r, !n, t);
}
function eh(e) {
  const { schema: t, errSchemaPath: r, opts: n, self: s } = e;
  t.$ref && n.ignoreKeywordsWithRef && (0, ft.schemaHasRulesButRef)(t, s.RULES) && s.logger.warn(`$ref: keywords ignored in schema at path "${r}"`);
}
function th(e) {
  const { schema: t, opts: r } = e;
  t.default !== void 0 && r.useDefaults && r.strictSchema && (0, ft.checkStrictMode)(e, "default is ignored in the schema root");
}
function rh(e) {
  const t = e.schema[e.opts.schemaId];
  t && (e.baseId = (0, Wf.resolveUrl)(e.opts.uriResolver, e.baseId, t));
}
function nh(e) {
  if (e.schema.$async && !e.schemaEnv.$async)
    throw new Error("async schema in sync schema");
}
function cl({ gen: e, schemaEnv: t, schema: r, errSchemaPath: n, opts: s }) {
  const a = r.$comment;
  if (s.$comment === !0)
    e.code((0, K._)`${B.default.self}.logger.log(${a})`);
  else if (typeof s.$comment == "function") {
    const i = (0, K.str)`${n}/$comment`, u = e.scopeValue("root", { ref: t.root });
    e.code((0, K._)`${B.default.self}.opts.$comment(${a}, ${i}, ${u}.schema)`);
  }
}
function sh(e) {
  const { gen: t, schemaEnv: r, validateName: n, ValidationError: s, opts: a } = e;
  r.$async ? t.if((0, K._)`${B.default.errors} === 0`, () => t.return(B.default.data), () => t.throw((0, K._)`new ${s}(${B.default.vErrors})`)) : (t.assign((0, K._)`${n}.errors`, B.default.vErrors), a.unevaluated && ah(e), t.return((0, K._)`${B.default.errors} === 0`));
}
function ah({ gen: e, evaluated: t, props: r, items: n }) {
  r instanceof K.Name && e.assign((0, K._)`${t}.props`, r), n instanceof K.Name && e.assign((0, K._)`${t}.items`, n);
}
function ci(e, t, r, n) {
  const { gen: s, schema: a, data: i, allErrors: u, opts: c, self: d } = e, { RULES: l } = d;
  if (a.$ref && (c.ignoreKeywordsWithRef || !(0, ft.schemaHasRulesButRef)(a, l))) {
    s.block(() => dl(e, "$ref", l.all.$ref.definition));
    return;
  }
  c.jtd || oh(e, t), s.block(() => {
    for (const P of l.rules)
      m(P);
    m(l.post);
  });
  function m(P) {
    (0, ya.shouldUseGroup)(a, P) && (P.type ? (s.if((0, Dn.checkDataType)(P.type, i, c.strictNumbers)), li(e, P), t.length === 1 && t[0] === P.type && r && (s.else(), (0, Dn.reportTypeError)(e)), s.endIf()) : li(e, P), u || s.if((0, K._)`${B.default.errors} === ${n || 0}`));
  }
}
function li(e, t) {
  const { gen: r, schema: n, opts: { useDefaults: s } } = e;
  s && (0, Hf.assignDefaults)(e, t.type), r.block(() => {
    for (const a of t.rules)
      (0, ya.shouldUseRule)(n, a) && dl(e, a.keyword, a.definition, t.type);
  });
}
function oh(e, t) {
  e.schemaEnv.meta || !e.opts.strictTypes || (ih(e, t), e.opts.allowUnionTypes || ch(e, t), lh(e, e.dataTypes));
}
function ih(e, t) {
  if (t.length) {
    if (!e.dataTypes.length) {
      e.dataTypes = t;
      return;
    }
    t.forEach((r) => {
      ll(e.dataTypes, r) || $a(e, `type "${r}" not allowed by context "${e.dataTypes.join(",")}"`);
    }), dh(e, t);
  }
}
function ch(e, t) {
  t.length > 1 && !(t.length === 2 && t.includes("null")) && $a(e, "use allowUnionTypes to allow union type keyword");
}
function lh(e, t) {
  const r = e.self.RULES.all;
  for (const n in r) {
    const s = r[n];
    if (typeof s == "object" && (0, ya.shouldUseRule)(e.schema, s)) {
      const { type: a } = s.definition;
      a.length && !a.some((i) => uh(t, i)) && $a(e, `missing type "${a.join(",")}" for keyword "${n}"`);
    }
  }
}
function uh(e, t) {
  return e.includes(t) || t === "number" && e.includes("integer");
}
function ll(e, t) {
  return e.includes(t) || t === "integer" && e.includes("number");
}
function dh(e, t) {
  const r = [];
  for (const n of e.dataTypes)
    ll(t, n) ? r.push(n) : t.includes("integer") && n === "number" && r.push("integer");
  e.dataTypes = r;
}
function $a(e, t) {
  const r = e.schemaEnv.baseId + e.errSchemaPath;
  t += ` at "${r}" (strictTypes)`, (0, ft.checkStrictMode)(e, t, e.opts.strictTypes);
}
let ul = class {
  constructor(t, r, n) {
    if ((0, Fr.validateKeywordUsage)(t, r, n), this.gen = t.gen, this.allErrors = t.allErrors, this.keyword = n, this.data = t.data, this.schema = t.schema[n], this.$data = r.$data && t.opts.$data && this.schema && this.schema.$data, this.schemaValue = (0, ft.schemaRefOrVal)(t, this.schema, n, this.$data), this.schemaType = r.schemaType, this.parentSchema = t.schema, this.params = {}, this.it = t, this.def = r, this.$data)
      this.schemaCode = t.gen.const("vSchema", fl(this.$data, t));
    else if (this.schemaCode = this.schemaValue, !(0, Fr.validSchemaType)(this.schema, r.schemaType, r.allowUndefined))
      throw new Error(`${n} value must be ${JSON.stringify(r.schemaType)}`);
    ("code" in r ? r.trackErrors : r.errors !== !1) && (this.errsCount = t.gen.const("_errs", B.default.errors));
  }
  result(t, r, n) {
    this.failResult((0, K.not)(t), r, n);
  }
  failResult(t, r, n) {
    this.gen.if(t), n ? n() : this.error(), r ? (this.gen.else(), r(), this.allErrors && this.gen.endIf()) : this.allErrors ? this.gen.endIf() : this.gen.else();
  }
  pass(t, r) {
    this.failResult((0, K.not)(t), void 0, r);
  }
  fail(t) {
    if (t === void 0) {
      this.error(), this.allErrors || this.gen.if(!1);
      return;
    }
    this.gen.if(t), this.error(), this.allErrors ? this.gen.endIf() : this.gen.else();
  }
  fail$data(t) {
    if (!this.$data)
      return this.fail(t);
    const { schemaCode: r } = this;
    this.fail((0, K._)`${r} !== undefined && (${(0, K.or)(this.invalid$data(), t)})`);
  }
  error(t, r, n) {
    if (r) {
      this.setParams(r), this._error(t, n), this.setParams({});
      return;
    }
    this._error(t, n);
  }
  _error(t, r) {
    (t ? Ir.reportExtraError : Ir.reportError)(this, this.def.error, r);
  }
  $dataError() {
    (0, Ir.reportError)(this, this.def.$dataError || Ir.keyword$DataError);
  }
  reset() {
    if (this.errsCount === void 0)
      throw new Error('add "trackErrors" to keyword definition');
    (0, Ir.resetErrorsCount)(this.gen, this.errsCount);
  }
  ok(t) {
    this.allErrors || this.gen.if(t);
  }
  setParams(t, r) {
    r ? Object.assign(this.params, t) : this.params = t;
  }
  block$data(t, r, n = K.nil) {
    this.gen.block(() => {
      this.check$data(t, n), r();
    });
  }
  check$data(t = K.nil, r = K.nil) {
    if (!this.$data)
      return;
    const { gen: n, schemaCode: s, schemaType: a, def: i } = this;
    n.if((0, K.or)((0, K._)`${s} === undefined`, r)), t !== K.nil && n.assign(t, !0), (a.length || i.validateSchema) && (n.elseIf(this.invalid$data()), this.$dataError(), t !== K.nil && n.assign(t, !1)), n.else();
  }
  invalid$data() {
    const { gen: t, schemaCode: r, schemaType: n, def: s, it: a } = this;
    return (0, K.or)(i(), u());
    function i() {
      if (n.length) {
        if (!(r instanceof K.Name))
          throw new Error("ajv implementation error");
        const c = Array.isArray(n) ? n : [n];
        return (0, K._)`${(0, Dn.checkDataTypes)(c, r, a.opts.strictNumbers, Dn.DataType.Wrong)}`;
      }
      return K.nil;
    }
    function u() {
      if (s.validateSchema) {
        const c = t.scopeValue("validate$data", { ref: s.validateSchema });
        return (0, K._)`!${c}(${r})`;
      }
      return K.nil;
    }
  }
  subschema(t, r) {
    const n = (0, ds.getSubschema)(this.it, t);
    (0, ds.extendSubschemaData)(n, this.it, t), (0, ds.extendSubschemaMode)(n, t);
    const s = { ...this.it, ...n, items: void 0, props: void 0 };
    return Zf(s, r), s;
  }
  mergeEvaluated(t, r) {
    const { it: n, gen: s } = this;
    n.opts.unevaluated && (n.props !== !0 && t.props !== void 0 && (n.props = ft.mergeEvaluated.props(s, t.props, n.props, r)), n.items !== !0 && t.items !== void 0 && (n.items = ft.mergeEvaluated.items(s, t.items, n.items, r)));
  }
  mergeValidEvaluated(t, r) {
    const { it: n, gen: s } = this;
    if (n.opts.unevaluated && (n.props !== !0 || n.items !== !0))
      return s.if(r, () => this.mergeEvaluated(t, K.Name)), !0;
  }
};
Qe.KeywordCxt = ul;
function dl(e, t, r, n) {
  const s = new ul(e, r, t);
  "code" in r ? r.code(s, n) : s.$data && r.validate ? (0, Fr.funcKeywordCode)(s, r) : "macro" in r ? (0, Fr.macroKeywordCode)(s, r) : (r.compile || r.validate) && (0, Fr.funcKeywordCode)(s, r);
}
const fh = /^\/(?:[^~]|~0|~1)*$/, hh = /^([0-9]+)(#|\/(?:[^~]|~0|~1)*)?$/;
function fl(e, { dataLevel: t, dataNames: r, dataPathArr: n }) {
  let s, a;
  if (e === "")
    return B.default.rootData;
  if (e[0] === "/") {
    if (!fh.test(e))
      throw new Error(`Invalid JSON-pointer: ${e}`);
    s = e, a = B.default.rootData;
  } else {
    const d = hh.exec(e);
    if (!d)
      throw new Error(`Invalid JSON-pointer: ${e}`);
    const l = +d[1];
    if (s = d[2], s === "#") {
      if (l >= t)
        throw new Error(c("property/index", l));
      return n[t - l];
    }
    if (l > t)
      throw new Error(c("data", l));
    if (a = r[t - l], !s)
      return a;
  }
  let i = a;
  const u = s.split("/");
  for (const d of u)
    d && (a = (0, K._)`${a}${(0, K.getProperty)((0, ft.unescapeJsonPointer)(d))}`, i = (0, K._)`${i} && ${a}`);
  return i;
  function c(d, l) {
    return `Cannot access ${d} ${l} levels up, current level is ${t}`;
  }
}
Qe.getData = fl;
var Qr = {};
Object.defineProperty(Qr, "__esModule", { value: !0 });
let mh = class extends Error {
  constructor(t) {
    super("validation failed"), this.errors = t, this.ajv = this.validation = !0;
  }
};
Qr.default = mh;
var Er = {};
Object.defineProperty(Er, "__esModule", { value: !0 });
const fs = Se;
let ph = class extends Error {
  constructor(t, r, n, s) {
    super(s || `can't resolve reference ${n} from id ${r}`), this.missingRef = (0, fs.resolveUrl)(t, r, n), this.missingSchema = (0, fs.normalizeId)((0, fs.getFullPath)(t, this.missingRef));
  }
};
Er.default = ph;
var De = {};
Object.defineProperty(De, "__esModule", { value: !0 });
De.resolveSchema = De.getCompilingSchema = De.resolveRef = De.compileSchema = De.SchemaEnv = void 0;
const Ge = te, yh = Qr, Kt = ct, Xe = Se, ui = M, $h = Qe;
let Jn = class {
  constructor(t) {
    var r;
    this.refs = {}, this.dynamicAnchors = {};
    let n;
    typeof t.schema == "object" && (n = t.schema), this.schema = t.schema, this.schemaId = t.schemaId, this.root = t.root || this, this.baseId = (r = t.baseId) !== null && r !== void 0 ? r : (0, Xe.normalizeId)(n == null ? void 0 : n[t.schemaId || "$id"]), this.schemaPath = t.schemaPath, this.localRefs = t.localRefs, this.meta = t.meta, this.$async = n == null ? void 0 : n.$async, this.refs = {};
  }
};
De.SchemaEnv = Jn;
function _a(e) {
  const t = hl.call(this, e);
  if (t)
    return t;
  const r = (0, Xe.getFullPath)(this.opts.uriResolver, e.root.baseId), { es5: n, lines: s } = this.opts.code, { ownProperties: a } = this.opts, i = new Ge.CodeGen(this.scope, { es5: n, lines: s, ownProperties: a });
  let u;
  e.$async && (u = i.scopeValue("Error", {
    ref: yh.default,
    code: (0, Ge._)`require("ajv/dist/runtime/validation_error").default`
  }));
  const c = i.scopeName("validate");
  e.validateName = c;
  const d = {
    gen: i,
    allErrors: this.opts.allErrors,
    data: Kt.default.data,
    parentData: Kt.default.parentData,
    parentDataProperty: Kt.default.parentDataProperty,
    dataNames: [Kt.default.data],
    dataPathArr: [Ge.nil],
    // TODO can its length be used as dataLevel if nil is removed?
    dataLevel: 0,
    dataTypes: [],
    definedProperties: /* @__PURE__ */ new Set(),
    topSchemaRef: i.scopeValue("schema", this.opts.code.source === !0 ? { ref: e.schema, code: (0, Ge.stringify)(e.schema) } : { ref: e.schema }),
    validateName: c,
    ValidationError: u,
    schema: e.schema,
    schemaEnv: e,
    rootId: r,
    baseId: e.baseId || r,
    schemaPath: Ge.nil,
    errSchemaPath: e.schemaPath || (this.opts.jtd ? "" : "#"),
    errorPath: (0, Ge._)`""`,
    opts: this.opts,
    self: this
  };
  let l;
  try {
    this._compilations.add(e), (0, $h.validateFunctionCode)(d), i.optimize(this.opts.code.optimize);
    const m = i.toString();
    l = `${i.scopeRefs(Kt.default.scope)}return ${m}`, this.opts.code.process && (l = this.opts.code.process(l, e));
    const _ = new Function(`${Kt.default.self}`, `${Kt.default.scope}`, l)(this, this.scope.get());
    if (this.scope.value(c, { ref: _ }), _.errors = null, _.schema = e.schema, _.schemaEnv = e, e.$async && (_.$async = !0), this.opts.code.source === !0 && (_.source = { validateName: c, validateCode: m, scopeValues: i._values }), this.opts.unevaluated) {
      const { props: w, items: g } = d;
      _.evaluated = {
        props: w instanceof Ge.Name ? void 0 : w,
        items: g instanceof Ge.Name ? void 0 : g,
        dynamicProps: w instanceof Ge.Name,
        dynamicItems: g instanceof Ge.Name
      }, _.source && (_.source.evaluated = (0, Ge.stringify)(_.evaluated));
    }
    return e.validate = _, e;
  } catch (m) {
    throw delete e.validate, delete e.validateName, l && this.logger.error("Error compiling schema, function code:", l), m;
  } finally {
    this._compilations.delete(e);
  }
}
De.compileSchema = _a;
function _h(e, t, r) {
  var n;
  r = (0, Xe.resolveUrl)(this.opts.uriResolver, t, r);
  const s = e.refs[r];
  if (s)
    return s;
  let a = Eh.call(this, e, r);
  if (a === void 0) {
    const i = (n = e.localRefs) === null || n === void 0 ? void 0 : n[r], { schemaId: u } = this.opts;
    i && (a = new Jn({ schema: i, schemaId: u, root: e, baseId: t }));
  }
  if (a !== void 0)
    return e.refs[r] = gh.call(this, a);
}
De.resolveRef = _h;
function gh(e) {
  return (0, Xe.inlineRef)(e.schema, this.opts.inlineRefs) ? e.schema : e.validate ? e : _a.call(this, e);
}
function hl(e) {
  for (const t of this._compilations)
    if (vh(t, e))
      return t;
}
De.getCompilingSchema = hl;
function vh(e, t) {
  return e.schema === t.schema && e.root === t.root && e.baseId === t.baseId;
}
function Eh(e, t) {
  let r;
  for (; typeof (r = this.refs[t]) == "string"; )
    t = r;
  return r || this.schemas[t] || Xn.call(this, e, t);
}
function Xn(e, t) {
  const r = this.opts.uriResolver.parse(t), n = (0, Xe._getFullPath)(this.opts.uriResolver, r);
  let s = (0, Xe.getFullPath)(this.opts.uriResolver, e.baseId, void 0);
  if (Object.keys(e.schema).length > 0 && n === s)
    return hs.call(this, r, e);
  const a = (0, Xe.normalizeId)(n), i = this.refs[a] || this.schemas[a];
  if (typeof i == "string") {
    const u = Xn.call(this, e, i);
    return typeof (u == null ? void 0 : u.schema) != "object" ? void 0 : hs.call(this, r, u);
  }
  if (typeof (i == null ? void 0 : i.schema) == "object") {
    if (i.validate || _a.call(this, i), a === (0, Xe.normalizeId)(t)) {
      const { schema: u } = i, { schemaId: c } = this.opts, d = u[c];
      return d && (s = (0, Xe.resolveUrl)(this.opts.uriResolver, s, d)), new Jn({ schema: u, schemaId: c, root: e, baseId: s });
    }
    return hs.call(this, r, i);
  }
}
De.resolveSchema = Xn;
const wh = /* @__PURE__ */ new Set([
  "properties",
  "patternProperties",
  "enum",
  "dependencies",
  "definitions"
]);
function hs(e, { baseId: t, schema: r, root: n }) {
  var s;
  if (((s = e.fragment) === null || s === void 0 ? void 0 : s[0]) !== "/")
    return;
  for (const u of e.fragment.slice(1).split("/")) {
    if (typeof r == "boolean")
      return;
    const c = r[(0, ui.unescapeFragment)(u)];
    if (c === void 0)
      return;
    r = c;
    const d = typeof r == "object" && r[this.opts.schemaId];
    !wh.has(u) && d && (t = (0, Xe.resolveUrl)(this.opts.uriResolver, t, d));
  }
  let a;
  if (typeof r != "boolean" && r.$ref && !(0, ui.schemaHasRulesButRef)(r, this.RULES)) {
    const u = (0, Xe.resolveUrl)(this.opts.uriResolver, t, r.$ref);
    a = Xn.call(this, n, u);
  }
  const { schemaId: i } = this.opts;
  if (a = a || new Jn({ schema: r, schemaId: i, root: n, baseId: t }), a.schema !== a.root.schema)
    return a;
}
const Sh = "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#", bh = "Meta-schema for $data reference (JSON AnySchema extension proposal)", Ph = "object", Nh = [
  "$data"
], Oh = {
  $data: {
    type: "string",
    anyOf: [
      {
        format: "relative-json-pointer"
      },
      {
        format: "json-pointer"
      }
    ]
  }
}, Rh = !1, Th = {
  $id: Sh,
  description: bh,
  type: Ph,
  required: Nh,
  properties: Oh,
  additionalProperties: Rh
};
var ga = {}, Yn = { exports: {} };
const Ih = RegExp.prototype.test.bind(/^[\da-f]{8}-[\da-f]{4}-[\da-f]{4}-[\da-f]{4}-[\da-f]{12}$/iu), ml = RegExp.prototype.test.bind(/^(?:(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)$/u);
function pl(e) {
  let t = "", r = 0, n = 0;
  for (n = 0; n < e.length; n++)
    if (r = e[n].charCodeAt(0), r !== 48) {
      if (!(r >= 48 && r <= 57 || r >= 65 && r <= 70 || r >= 97 && r <= 102))
        return "";
      t += e[n];
      break;
    }
  for (n += 1; n < e.length; n++) {
    if (r = e[n].charCodeAt(0), !(r >= 48 && r <= 57 || r >= 65 && r <= 70 || r >= 97 && r <= 102))
      return "";
    t += e[n];
  }
  return t;
}
const jh = RegExp.prototype.test.bind(/[^!"$&'()*+,\-.;=_`a-z{}~]/u);
function di(e) {
  return e.length = 0, !0;
}
function Ah(e, t, r) {
  if (e.length) {
    const n = pl(e);
    if (n !== "")
      t.push(n);
    else
      return r.error = !0, !1;
    e.length = 0;
  }
  return !0;
}
function kh(e) {
  let t = 0;
  const r = { error: !1, address: "", zone: "" }, n = [], s = [];
  let a = !1, i = !1, u = Ah;
  for (let c = 0; c < e.length; c++) {
    const d = e[c];
    if (!(d === "[" || d === "]"))
      if (d === ":") {
        if (a === !0 && (i = !0), !u(s, n, r))
          break;
        if (++t > 7) {
          r.error = !0;
          break;
        }
        c > 0 && e[c - 1] === ":" && (a = !0), n.push(":");
        continue;
      } else if (d === "%") {
        if (!u(s, n, r))
          break;
        u = di;
      } else {
        s.push(d);
        continue;
      }
  }
  return s.length && (u === di ? r.zone = s.join("") : i ? n.push(s.join("")) : n.push(pl(s))), r.address = n.join(""), r;
}
function yl(e) {
  if (Ch(e, ":") < 2)
    return { host: e, isIPV6: !1 };
  const t = kh(e);
  if (t.error)
    return { host: e, isIPV6: !1 };
  {
    let r = t.address, n = t.address;
    return t.zone && (r += "%" + t.zone, n += "%25" + t.zone), { host: r, isIPV6: !0, escapedHost: n };
  }
}
function Ch(e, t) {
  let r = 0;
  for (let n = 0; n < e.length; n++)
    e[n] === t && r++;
  return r;
}
function Dh(e) {
  let t = e;
  const r = [];
  let n = -1, s = 0;
  for (; s = t.length; ) {
    if (s === 1) {
      if (t === ".")
        break;
      if (t === "/") {
        r.push("/");
        break;
      } else {
        r.push(t);
        break;
      }
    } else if (s === 2) {
      if (t[0] === ".") {
        if (t[1] === ".")
          break;
        if (t[1] === "/") {
          t = t.slice(2);
          continue;
        }
      } else if (t[0] === "/" && (t[1] === "." || t[1] === "/")) {
        r.push("/");
        break;
      }
    } else if (s === 3 && t === "/..") {
      r.length !== 0 && r.pop(), r.push("/");
      break;
    }
    if (t[0] === ".") {
      if (t[1] === ".") {
        if (t[2] === "/") {
          t = t.slice(3);
          continue;
        }
      } else if (t[1] === "/") {
        t = t.slice(2);
        continue;
      }
    } else if (t[0] === "/" && t[1] === ".") {
      if (t[2] === "/") {
        t = t.slice(2);
        continue;
      } else if (t[2] === "." && t[3] === "/") {
        t = t.slice(3), r.length !== 0 && r.pop();
        continue;
      }
    }
    if ((n = t.indexOf("/", 1)) === -1) {
      r.push(t);
      break;
    } else
      r.push(t.slice(0, n)), t = t.slice(n);
  }
  return r.join("");
}
function Mh(e, t) {
  const r = t !== !0 ? escape : unescape;
  return e.scheme !== void 0 && (e.scheme = r(e.scheme)), e.userinfo !== void 0 && (e.userinfo = r(e.userinfo)), e.host !== void 0 && (e.host = r(e.host)), e.path !== void 0 && (e.path = r(e.path)), e.query !== void 0 && (e.query = r(e.query)), e.fragment !== void 0 && (e.fragment = r(e.fragment)), e;
}
function Lh(e) {
  const t = [];
  if (e.userinfo !== void 0 && (t.push(e.userinfo), t.push("@")), e.host !== void 0) {
    let r = unescape(e.host);
    if (!ml(r)) {
      const n = yl(r);
      n.isIPV6 === !0 ? r = `[${n.escapedHost}]` : r = e.host;
    }
    t.push(r);
  }
  return (typeof e.port == "number" || typeof e.port == "string") && (t.push(":"), t.push(String(e.port))), t.length ? t.join("") : void 0;
}
var $l = {
  nonSimpleDomain: jh,
  recomposeAuthority: Lh,
  normalizeComponentEncoding: Mh,
  removeDotSegments: Dh,
  isIPv4: ml,
  isUUID: Ih,
  normalizeIPv6: yl
};
const { isUUID: Fh } = $l, Vh = /([\da-z][\d\-a-z]{0,31}):((?:[\w!$'()*+,\-.:;=@]|%[\da-f]{2})+)/iu;
function _l(e) {
  return e.secure === !0 ? !0 : e.secure === !1 ? !1 : e.scheme ? e.scheme.length === 3 && (e.scheme[0] === "w" || e.scheme[0] === "W") && (e.scheme[1] === "s" || e.scheme[1] === "S") && (e.scheme[2] === "s" || e.scheme[2] === "S") : !1;
}
function gl(e) {
  return e.host || (e.error = e.error || "HTTP URIs must have a host."), e;
}
function vl(e) {
  const t = String(e.scheme).toLowerCase() === "https";
  return (e.port === (t ? 443 : 80) || e.port === "") && (e.port = void 0), e.path || (e.path = "/"), e;
}
function Uh(e) {
  return e.secure = _l(e), e.resourceName = (e.path || "/") + (e.query ? "?" + e.query : ""), e.path = void 0, e.query = void 0, e;
}
function zh(e) {
  if ((e.port === (_l(e) ? 443 : 80) || e.port === "") && (e.port = void 0), typeof e.secure == "boolean" && (e.scheme = e.secure ? "wss" : "ws", e.secure = void 0), e.resourceName) {
    const [t, r] = e.resourceName.split("?");
    e.path = t && t !== "/" ? t : void 0, e.query = r, e.resourceName = void 0;
  }
  return e.fragment = void 0, e;
}
function qh(e, t) {
  if (!e.path)
    return e.error = "URN can not be parsed", e;
  const r = e.path.match(Vh);
  if (r) {
    const n = t.scheme || e.scheme || "urn";
    e.nid = r[1].toLowerCase(), e.nss = r[2];
    const s = `${n}:${t.nid || e.nid}`, a = va(s);
    e.path = void 0, a && (e = a.parse(e, t));
  } else
    e.error = e.error || "URN can not be parsed.";
  return e;
}
function Kh(e, t) {
  if (e.nid === void 0)
    throw new Error("URN without nid cannot be serialized");
  const r = t.scheme || e.scheme || "urn", n = e.nid.toLowerCase(), s = `${r}:${t.nid || n}`, a = va(s);
  a && (e = a.serialize(e, t));
  const i = e, u = e.nss;
  return i.path = `${n || t.nid}:${u}`, t.skipEscape = !0, i;
}
function Gh(e, t) {
  const r = e;
  return r.uuid = r.nss, r.nss = void 0, !t.tolerant && (!r.uuid || !Fh(r.uuid)) && (r.error = r.error || "UUID is not valid."), r;
}
function Hh(e) {
  const t = e;
  return t.nss = (e.uuid || "").toLowerCase(), t;
}
const El = (
  /** @type {SchemeHandler} */
  {
    scheme: "http",
    domainHost: !0,
    parse: gl,
    serialize: vl
  }
), Wh = (
  /** @type {SchemeHandler} */
  {
    scheme: "https",
    domainHost: El.domainHost,
    parse: gl,
    serialize: vl
  }
), Pn = (
  /** @type {SchemeHandler} */
  {
    scheme: "ws",
    domainHost: !0,
    parse: Uh,
    serialize: zh
  }
), Bh = (
  /** @type {SchemeHandler} */
  {
    scheme: "wss",
    domainHost: Pn.domainHost,
    parse: Pn.parse,
    serialize: Pn.serialize
  }
), Jh = (
  /** @type {SchemeHandler} */
  {
    scheme: "urn",
    parse: qh,
    serialize: Kh,
    skipNormalize: !0
  }
), Xh = (
  /** @type {SchemeHandler} */
  {
    scheme: "urn:uuid",
    parse: Gh,
    serialize: Hh,
    skipNormalize: !0
  }
), Mn = (
  /** @type {Record<SchemeName, SchemeHandler>} */
  {
    http: El,
    https: Wh,
    ws: Pn,
    wss: Bh,
    urn: Jh,
    "urn:uuid": Xh
  }
);
Object.setPrototypeOf(Mn, null);
function va(e) {
  return e && (Mn[
    /** @type {SchemeName} */
    e
  ] || Mn[
    /** @type {SchemeName} */
    e.toLowerCase()
  ]) || void 0;
}
var Yh = {
  SCHEMES: Mn,
  getSchemeHandler: va
};
const { normalizeIPv6: Qh, removeDotSegments: Dr, recomposeAuthority: Zh, normalizeComponentEncoding: on, isIPv4: xh, nonSimpleDomain: em } = $l, { SCHEMES: tm, getSchemeHandler: wl } = Yh;
function rm(e, t) {
  return typeof e == "string" ? e = /** @type {T} */
  ot(pt(e, t), t) : typeof e == "object" && (e = /** @type {T} */
  pt(ot(e, t), t)), e;
}
function nm(e, t, r) {
  const n = r ? Object.assign({ scheme: "null" }, r) : { scheme: "null" }, s = Sl(pt(e, n), pt(t, n), n, !0);
  return n.skipEscape = !0, ot(s, n);
}
function Sl(e, t, r, n) {
  const s = {};
  return n || (e = pt(ot(e, r), r), t = pt(ot(t, r), r)), r = r || {}, !r.tolerant && t.scheme ? (s.scheme = t.scheme, s.userinfo = t.userinfo, s.host = t.host, s.port = t.port, s.path = Dr(t.path || ""), s.query = t.query) : (t.userinfo !== void 0 || t.host !== void 0 || t.port !== void 0 ? (s.userinfo = t.userinfo, s.host = t.host, s.port = t.port, s.path = Dr(t.path || ""), s.query = t.query) : (t.path ? (t.path[0] === "/" ? s.path = Dr(t.path) : ((e.userinfo !== void 0 || e.host !== void 0 || e.port !== void 0) && !e.path ? s.path = "/" + t.path : e.path ? s.path = e.path.slice(0, e.path.lastIndexOf("/") + 1) + t.path : s.path = t.path, s.path = Dr(s.path)), s.query = t.query) : (s.path = e.path, t.query !== void 0 ? s.query = t.query : s.query = e.query), s.userinfo = e.userinfo, s.host = e.host, s.port = e.port), s.scheme = e.scheme), s.fragment = t.fragment, s;
}
function sm(e, t, r) {
  return typeof e == "string" ? (e = unescape(e), e = ot(on(pt(e, r), !0), { ...r, skipEscape: !0 })) : typeof e == "object" && (e = ot(on(e, !0), { ...r, skipEscape: !0 })), typeof t == "string" ? (t = unescape(t), t = ot(on(pt(t, r), !0), { ...r, skipEscape: !0 })) : typeof t == "object" && (t = ot(on(t, !0), { ...r, skipEscape: !0 })), e.toLowerCase() === t.toLowerCase();
}
function ot(e, t) {
  const r = {
    host: e.host,
    scheme: e.scheme,
    userinfo: e.userinfo,
    port: e.port,
    path: e.path,
    query: e.query,
    nid: e.nid,
    nss: e.nss,
    uuid: e.uuid,
    fragment: e.fragment,
    reference: e.reference,
    resourceName: e.resourceName,
    secure: e.secure,
    error: ""
  }, n = Object.assign({}, t), s = [], a = wl(n.scheme || r.scheme);
  a && a.serialize && a.serialize(r, n), r.path !== void 0 && (n.skipEscape ? r.path = unescape(r.path) : (r.path = escape(r.path), r.scheme !== void 0 && (r.path = r.path.split("%3A").join(":")))), n.reference !== "suffix" && r.scheme && s.push(r.scheme, ":");
  const i = Zh(r);
  if (i !== void 0 && (n.reference !== "suffix" && s.push("//"), s.push(i), r.path && r.path[0] !== "/" && s.push("/")), r.path !== void 0) {
    let u = r.path;
    !n.absolutePath && (!a || !a.absolutePath) && (u = Dr(u)), i === void 0 && u[0] === "/" && u[1] === "/" && (u = "/%2F" + u.slice(2)), s.push(u);
  }
  return r.query !== void 0 && s.push("?", r.query), r.fragment !== void 0 && s.push("#", r.fragment), s.join("");
}
const am = /^(?:([^#/:?]+):)?(?:\/\/((?:([^#/?@]*)@)?(\[[^#/?\]]+\]|[^#/:?]*)(?::(\d*))?))?([^#?]*)(?:\?([^#]*))?(?:#((?:.|[\n\r])*))?/u;
function pt(e, t) {
  const r = Object.assign({}, t), n = {
    scheme: void 0,
    userinfo: void 0,
    host: "",
    port: void 0,
    path: "",
    query: void 0,
    fragment: void 0
  };
  let s = !1;
  r.reference === "suffix" && (r.scheme ? e = r.scheme + ":" + e : e = "//" + e);
  const a = e.match(am);
  if (a) {
    if (n.scheme = a[1], n.userinfo = a[3], n.host = a[4], n.port = parseInt(a[5], 10), n.path = a[6] || "", n.query = a[7], n.fragment = a[8], isNaN(n.port) && (n.port = a[5]), n.host)
      if (xh(n.host) === !1) {
        const c = Qh(n.host);
        n.host = c.host.toLowerCase(), s = c.isIPV6;
      } else
        s = !0;
    n.scheme === void 0 && n.userinfo === void 0 && n.host === void 0 && n.port === void 0 && n.query === void 0 && !n.path ? n.reference = "same-document" : n.scheme === void 0 ? n.reference = "relative" : n.fragment === void 0 ? n.reference = "absolute" : n.reference = "uri", r.reference && r.reference !== "suffix" && r.reference !== n.reference && (n.error = n.error || "URI is not a " + r.reference + " reference.");
    const i = wl(r.scheme || n.scheme);
    if (!r.unicodeSupport && (!i || !i.unicodeSupport) && n.host && (r.domainHost || i && i.domainHost) && s === !1 && em(n.host))
      try {
        n.host = URL.domainToASCII(n.host.toLowerCase());
      } catch (u) {
        n.error = n.error || "Host's domain name can not be converted to ASCII: " + u;
      }
    (!i || i && !i.skipNormalize) && (e.indexOf("%") !== -1 && (n.scheme !== void 0 && (n.scheme = unescape(n.scheme)), n.host !== void 0 && (n.host = unescape(n.host))), n.path && (n.path = escape(unescape(n.path))), n.fragment && (n.fragment = encodeURI(decodeURIComponent(n.fragment)))), i && i.parse && i.parse(n, r);
  } else
    n.error = n.error || "URI can not be parsed.";
  return n;
}
const Ea = {
  SCHEMES: tm,
  normalize: rm,
  resolve: nm,
  resolveComponent: Sl,
  equal: sm,
  serialize: ot,
  parse: pt
};
Yn.exports = Ea;
Yn.exports.default = Ea;
Yn.exports.fastUri = Ea;
var bl = Yn.exports;
Object.defineProperty(ga, "__esModule", { value: !0 });
const Pl = bl;
Pl.code = 'require("ajv/dist/runtime/uri").default';
ga.default = Pl;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.CodeGen = e.Name = e.nil = e.stringify = e.str = e._ = e.KeywordCxt = void 0;
  var t = Qe;
  Object.defineProperty(e, "KeywordCxt", { enumerable: !0, get: function() {
    return t.KeywordCxt;
  } });
  var r = te;
  Object.defineProperty(e, "_", { enumerable: !0, get: function() {
    return r._;
  } }), Object.defineProperty(e, "str", { enumerable: !0, get: function() {
    return r.str;
  } }), Object.defineProperty(e, "stringify", { enumerable: !0, get: function() {
    return r.stringify;
  } }), Object.defineProperty(e, "nil", { enumerable: !0, get: function() {
    return r.nil;
  } }), Object.defineProperty(e, "Name", { enumerable: !0, get: function() {
    return r.Name;
  } }), Object.defineProperty(e, "CodeGen", { enumerable: !0, get: function() {
    return r.CodeGen;
  } });
  const n = Qr, s = Er, a = Qt, i = De, u = te, c = Se, d = $e, l = M, m = Th, P = ga, _ = (v, p) => new RegExp(v, p);
  _.code = "new RegExp";
  const w = ["removeAdditional", "useDefaults", "coerceTypes"], g = /* @__PURE__ */ new Set([
    "validate",
    "serialize",
    "parse",
    "wrapper",
    "root",
    "schema",
    "keyword",
    "pattern",
    "formats",
    "validate$data",
    "func",
    "obj",
    "Error"
  ]), $ = {
    errorDataPath: "",
    format: "`validateFormats: false` can be used instead.",
    nullable: '"nullable" keyword is supported by default.',
    jsonPointers: "Deprecated jsPropertySyntax can be used instead.",
    extendRefs: "Deprecated ignoreKeywordsWithRef can be used instead.",
    missingRefs: "Pass empty schema with $id that should be ignored to ajv.addSchema.",
    processCode: "Use option `code: {process: (code, schemaEnv: object) => string}`",
    sourceCode: "Use option `code: {source: true}`",
    strictDefaults: "It is default now, see option `strict`.",
    strictKeywords: "It is default now, see option `strict`.",
    uniqueItems: '"uniqueItems" keyword is always validated.',
    unknownFormats: "Disable strict mode or pass `true` to `ajv.addFormat` (or `formats` option).",
    cache: "Map is used as cache, schema object as key.",
    serialize: "Map is used as cache, schema object as key.",
    ajvErrors: "It is default now."
  }, h = {
    ignoreKeywordsWithRef: "",
    jsPropertySyntax: "",
    unicode: '"minLength"/"maxLength" account for unicode characters by default.'
  }, E = 200;
  function N(v) {
    var p, S, y, o, f, b, j, A, q, F, re, Le, Rt, Tt, It, jt, At, kt, Ct, Dt, Mt, Lt, Ft, Vt, Ut;
    const Ke = v.strict, zt = (p = v.code) === null || p === void 0 ? void 0 : p.optimize, Rr = zt === !0 || zt === void 0 ? 1 : zt || 0, Tr = (y = (S = v.code) === null || S === void 0 ? void 0 : S.regExp) !== null && y !== void 0 ? y : _, us = (o = v.uriResolver) !== null && o !== void 0 ? o : P.default;
    return {
      strictSchema: (b = (f = v.strictSchema) !== null && f !== void 0 ? f : Ke) !== null && b !== void 0 ? b : !0,
      strictNumbers: (A = (j = v.strictNumbers) !== null && j !== void 0 ? j : Ke) !== null && A !== void 0 ? A : !0,
      strictTypes: (F = (q = v.strictTypes) !== null && q !== void 0 ? q : Ke) !== null && F !== void 0 ? F : "log",
      strictTuples: (Le = (re = v.strictTuples) !== null && re !== void 0 ? re : Ke) !== null && Le !== void 0 ? Le : "log",
      strictRequired: (Tt = (Rt = v.strictRequired) !== null && Rt !== void 0 ? Rt : Ke) !== null && Tt !== void 0 ? Tt : !1,
      code: v.code ? { ...v.code, optimize: Rr, regExp: Tr } : { optimize: Rr, regExp: Tr },
      loopRequired: (It = v.loopRequired) !== null && It !== void 0 ? It : E,
      loopEnum: (jt = v.loopEnum) !== null && jt !== void 0 ? jt : E,
      meta: (At = v.meta) !== null && At !== void 0 ? At : !0,
      messages: (kt = v.messages) !== null && kt !== void 0 ? kt : !0,
      inlineRefs: (Ct = v.inlineRefs) !== null && Ct !== void 0 ? Ct : !0,
      schemaId: (Dt = v.schemaId) !== null && Dt !== void 0 ? Dt : "$id",
      addUsedSchema: (Mt = v.addUsedSchema) !== null && Mt !== void 0 ? Mt : !0,
      validateSchema: (Lt = v.validateSchema) !== null && Lt !== void 0 ? Lt : !0,
      validateFormats: (Ft = v.validateFormats) !== null && Ft !== void 0 ? Ft : !0,
      unicodeRegExp: (Vt = v.unicodeRegExp) !== null && Vt !== void 0 ? Vt : !0,
      int32range: (Ut = v.int32range) !== null && Ut !== void 0 ? Ut : !0,
      uriResolver: us
    };
  }
  class R {
    constructor(p = {}) {
      this.schemas = {}, this.refs = {}, this.formats = {}, this._compilations = /* @__PURE__ */ new Set(), this._loading = {}, this._cache = /* @__PURE__ */ new Map(), p = this.opts = { ...p, ...N(p) };
      const { es5: S, lines: y } = this.opts.code;
      this.scope = new u.ValueScope({ scope: {}, prefixes: g, es5: S, lines: y }), this.logger = Q(p.logger);
      const o = p.validateFormats;
      p.validateFormats = !1, this.RULES = (0, a.getRules)(), I.call(this, $, p, "NOT SUPPORTED"), I.call(this, h, p, "DEPRECATED", "warn"), this._metaOpts = H.call(this), p.formats && ue.call(this), this._addVocabularies(), this._addDefaultMetaSchema(), p.keywords && V.call(this, p.keywords), typeof p.meta == "object" && this.addMetaSchema(p.meta), W.call(this), p.validateFormats = o;
    }
    _addVocabularies() {
      this.addKeyword("$async");
    }
    _addDefaultMetaSchema() {
      const { $data: p, meta: S, schemaId: y } = this.opts;
      let o = m;
      y === "id" && (o = { ...m }, o.id = o.$id, delete o.$id), S && p && this.addMetaSchema(o, o[y], !1);
    }
    defaultMeta() {
      const { meta: p, schemaId: S } = this.opts;
      return this.opts.defaultMeta = typeof p == "object" ? p[S] || p : void 0;
    }
    validate(p, S) {
      let y;
      if (typeof p == "string") {
        if (y = this.getSchema(p), !y)
          throw new Error(`no schema with key or ref "${p}"`);
      } else
        y = this.compile(p);
      const o = y(S);
      return "$async" in y || (this.errors = y.errors), o;
    }
    compile(p, S) {
      const y = this._addSchema(p, S);
      return y.validate || this._compileSchemaEnv(y);
    }
    compileAsync(p, S) {
      if (typeof this.opts.loadSchema != "function")
        throw new Error("options.loadSchema should be a function");
      const { loadSchema: y } = this.opts;
      return o.call(this, p, S);
      async function o(F, re) {
        await f.call(this, F.$schema);
        const Le = this._addSchema(F, re);
        return Le.validate || b.call(this, Le);
      }
      async function f(F) {
        F && !this.getSchema(F) && await o.call(this, { $ref: F }, !0);
      }
      async function b(F) {
        try {
          return this._compileSchemaEnv(F);
        } catch (re) {
          if (!(re instanceof s.default))
            throw re;
          return j.call(this, re), await A.call(this, re.missingSchema), b.call(this, F);
        }
      }
      function j({ missingSchema: F, missingRef: re }) {
        if (this.refs[F])
          throw new Error(`AnySchema ${F} is loaded but ${re} cannot be resolved`);
      }
      async function A(F) {
        const re = await q.call(this, F);
        this.refs[F] || await f.call(this, re.$schema), this.refs[F] || this.addSchema(re, F, S);
      }
      async function q(F) {
        const re = this._loading[F];
        if (re)
          return re;
        try {
          return await (this._loading[F] = y(F));
        } finally {
          delete this._loading[F];
        }
      }
    }
    // Adds schema to the instance
    addSchema(p, S, y, o = this.opts.validateSchema) {
      if (Array.isArray(p)) {
        for (const b of p)
          this.addSchema(b, void 0, y, o);
        return this;
      }
      let f;
      if (typeof p == "object") {
        const { schemaId: b } = this.opts;
        if (f = p[b], f !== void 0 && typeof f != "string")
          throw new Error(`schema ${b} must be string`);
      }
      return S = (0, c.normalizeId)(S || f), this._checkUnique(S), this.schemas[S] = this._addSchema(p, y, S, o, !0), this;
    }
    // Add schema that will be used to validate other schemas
    // options in META_IGNORE_OPTIONS are alway set to false
    addMetaSchema(p, S, y = this.opts.validateSchema) {
      return this.addSchema(p, S, !0, y), this;
    }
    //  Validate schema against its meta-schema
    validateSchema(p, S) {
      if (typeof p == "boolean")
        return !0;
      let y;
      if (y = p.$schema, y !== void 0 && typeof y != "string")
        throw new Error("$schema must be a string");
      if (y = y || this.opts.defaultMeta || this.defaultMeta(), !y)
        return this.logger.warn("meta-schema not available"), this.errors = null, !0;
      const o = this.validate(y, p);
      if (!o && S) {
        const f = "schema is invalid: " + this.errorsText();
        if (this.opts.validateSchema === "log")
          this.logger.error(f);
        else
          throw new Error(f);
      }
      return o;
    }
    // Get compiled schema by `key` or `ref`.
    // (`key` that was passed to `addSchema` or full schema reference - `schema.$id` or resolved id)
    getSchema(p) {
      let S;
      for (; typeof (S = z.call(this, p)) == "string"; )
        p = S;
      if (S === void 0) {
        const { schemaId: y } = this.opts, o = new i.SchemaEnv({ schema: {}, schemaId: y });
        if (S = i.resolveSchema.call(this, o, p), !S)
          return;
        this.refs[p] = S;
      }
      return S.validate || this._compileSchemaEnv(S);
    }
    // Remove cached schema(s).
    // If no parameter is passed all schemas but meta-schemas are removed.
    // If RegExp is passed all schemas with key/id matching pattern but meta-schemas are removed.
    // Even if schema is referenced by other schemas it still can be removed as other schemas have local references.
    removeSchema(p) {
      if (p instanceof RegExp)
        return this._removeAllSchemas(this.schemas, p), this._removeAllSchemas(this.refs, p), this;
      switch (typeof p) {
        case "undefined":
          return this._removeAllSchemas(this.schemas), this._removeAllSchemas(this.refs), this._cache.clear(), this;
        case "string": {
          const S = z.call(this, p);
          return typeof S == "object" && this._cache.delete(S.schema), delete this.schemas[p], delete this.refs[p], this;
        }
        case "object": {
          const S = p;
          this._cache.delete(S);
          let y = p[this.opts.schemaId];
          return y && (y = (0, c.normalizeId)(y), delete this.schemas[y], delete this.refs[y]), this;
        }
        default:
          throw new Error("ajv.removeSchema: invalid parameter");
      }
    }
    // add "vocabulary" - a collection of keywords
    addVocabulary(p) {
      for (const S of p)
        this.addKeyword(S);
      return this;
    }
    addKeyword(p, S) {
      let y;
      if (typeof p == "string")
        y = p, typeof S == "object" && (this.logger.warn("these parameters are deprecated, see docs for addKeyword"), S.keyword = y);
      else if (typeof p == "object" && S === void 0) {
        if (S = p, y = S.keyword, Array.isArray(y) && !y.length)
          throw new Error("addKeywords: keyword must be string or non-empty array");
      } else
        throw new Error("invalid addKeywords parameters");
      if (C.call(this, y, S), !S)
        return (0, l.eachItem)(y, (f) => k.call(this, f)), this;
      D.call(this, S);
      const o = {
        ...S,
        type: (0, d.getJSONTypes)(S.type),
        schemaType: (0, d.getJSONTypes)(S.schemaType)
      };
      return (0, l.eachItem)(y, o.type.length === 0 ? (f) => k.call(this, f, o) : (f) => o.type.forEach((b) => k.call(this, f, o, b))), this;
    }
    getKeyword(p) {
      const S = this.RULES.all[p];
      return typeof S == "object" ? S.definition : !!S;
    }
    // Remove keyword
    removeKeyword(p) {
      const { RULES: S } = this;
      delete S.keywords[p], delete S.all[p];
      for (const y of S.rules) {
        const o = y.rules.findIndex((f) => f.keyword === p);
        o >= 0 && y.rules.splice(o, 1);
      }
      return this;
    }
    // Add format
    addFormat(p, S) {
      return typeof S == "string" && (S = new RegExp(S)), this.formats[p] = S, this;
    }
    errorsText(p = this.errors, { separator: S = ", ", dataVar: y = "data" } = {}) {
      return !p || p.length === 0 ? "No errors" : p.map((o) => `${y}${o.instancePath} ${o.message}`).reduce((o, f) => o + S + f);
    }
    $dataMetaSchema(p, S) {
      const y = this.RULES.all;
      p = JSON.parse(JSON.stringify(p));
      for (const o of S) {
        const f = o.split("/").slice(1);
        let b = p;
        for (const j of f)
          b = b[j];
        for (const j in y) {
          const A = y[j];
          if (typeof A != "object")
            continue;
          const { $data: q } = A.definition, F = b[j];
          q && F && (b[j] = T(F));
        }
      }
      return p;
    }
    _removeAllSchemas(p, S) {
      for (const y in p) {
        const o = p[y];
        (!S || S.test(y)) && (typeof o == "string" ? delete p[y] : o && !o.meta && (this._cache.delete(o.schema), delete p[y]));
      }
    }
    _addSchema(p, S, y, o = this.opts.validateSchema, f = this.opts.addUsedSchema) {
      let b;
      const { schemaId: j } = this.opts;
      if (typeof p == "object")
        b = p[j];
      else {
        if (this.opts.jtd)
          throw new Error("schema must be object");
        if (typeof p != "boolean")
          throw new Error("schema must be object or boolean");
      }
      let A = this._cache.get(p);
      if (A !== void 0)
        return A;
      y = (0, c.normalizeId)(b || y);
      const q = c.getSchemaRefs.call(this, p, y);
      return A = new i.SchemaEnv({ schema: p, schemaId: j, meta: S, baseId: y, localRefs: q }), this._cache.set(A.schema, A), f && !y.startsWith("#") && (y && this._checkUnique(y), this.refs[y] = A), o && this.validateSchema(p, !0), A;
    }
    _checkUnique(p) {
      if (this.schemas[p] || this.refs[p])
        throw new Error(`schema with key or id "${p}" already exists`);
    }
    _compileSchemaEnv(p) {
      if (p.meta ? this._compileMetaSchema(p) : i.compileSchema.call(this, p), !p.validate)
        throw new Error("ajv implementation error");
      return p.validate;
    }
    _compileMetaSchema(p) {
      const S = this.opts;
      this.opts = this._metaOpts;
      try {
        i.compileSchema.call(this, p);
      } finally {
        this.opts = S;
      }
    }
  }
  R.ValidationError = n.default, R.MissingRefError = s.default, e.default = R;
  function I(v, p, S, y = "error") {
    for (const o in v) {
      const f = o;
      f in p && this.logger[y](`${S}: option ${o}. ${v[f]}`);
    }
  }
  function z(v) {
    return v = (0, c.normalizeId)(v), this.schemas[v] || this.refs[v];
  }
  function W() {
    const v = this.opts.schemas;
    if (v)
      if (Array.isArray(v))
        this.addSchema(v);
      else
        for (const p in v)
          this.addSchema(v[p], p);
  }
  function ue() {
    for (const v in this.opts.formats) {
      const p = this.opts.formats[v];
      p && this.addFormat(v, p);
    }
  }
  function V(v) {
    if (Array.isArray(v)) {
      this.addVocabulary(v);
      return;
    }
    this.logger.warn("keywords option as map is deprecated, pass array");
    for (const p in v) {
      const S = v[p];
      S.keyword || (S.keyword = p), this.addKeyword(S);
    }
  }
  function H() {
    const v = { ...this.opts };
    for (const p of w)
      delete v[p];
    return v;
  }
  const ne = { log() {
  }, warn() {
  }, error() {
  } };
  function Q(v) {
    if (v === !1)
      return ne;
    if (v === void 0)
      return console;
    if (v.log && v.warn && v.error)
      return v;
    throw new Error("logger must implement log, warn and error methods");
  }
  const de = /^[a-z_$][a-z0-9_$:-]*$/i;
  function C(v, p) {
    const { RULES: S } = this;
    if ((0, l.eachItem)(v, (y) => {
      if (S.keywords[y])
        throw new Error(`Keyword ${y} is already defined`);
      if (!de.test(y))
        throw new Error(`Keyword ${y} has invalid name`);
    }), !!p && p.$data && !("code" in p || "validate" in p))
      throw new Error('$data keyword must have "code" or "validate" function');
  }
  function k(v, p, S) {
    var y;
    const o = p == null ? void 0 : p.post;
    if (S && o)
      throw new Error('keyword with "post" flag cannot have "type"');
    const { RULES: f } = this;
    let b = o ? f.post : f.rules.find(({ type: A }) => A === S);
    if (b || (b = { type: S, rules: [] }, f.rules.push(b)), f.keywords[v] = !0, !p)
      return;
    const j = {
      keyword: v,
      definition: {
        ...p,
        type: (0, d.getJSONTypes)(p.type),
        schemaType: (0, d.getJSONTypes)(p.schemaType)
      }
    };
    p.before ? U.call(this, b, j, p.before) : b.rules.push(j), f.all[v] = j, (y = p.implements) === null || y === void 0 || y.forEach((A) => this.addKeyword(A));
  }
  function U(v, p, S) {
    const y = v.rules.findIndex((o) => o.keyword === S);
    y >= 0 ? v.rules.splice(y, 0, p) : (v.rules.push(p), this.logger.warn(`rule ${S} is not defined`));
  }
  function D(v) {
    let { metaSchema: p } = v;
    p !== void 0 && (v.$data && this.opts.$data && (p = T(p)), v.validateSchema = this.compile(p, !0));
  }
  const O = {
    $ref: "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#"
  };
  function T(v) {
    return { anyOf: [v, O] };
  }
})(Mc);
var wa = {}, Sa = {}, ba = {};
Object.defineProperty(ba, "__esModule", { value: !0 });
const om = {
  keyword: "id",
  code() {
    throw new Error('NOT SUPPORTED: keyword "id", use "$id" for schema ID');
  }
};
ba.default = om;
var Zt = {};
Object.defineProperty(Zt, "__esModule", { value: !0 });
Zt.callRef = Zt.getValidate = void 0;
const im = Er, fi = x, ke = te, nr = ct, hi = De, cn = M, cm = {
  keyword: "$ref",
  schemaType: "string",
  code(e) {
    const { gen: t, schema: r, it: n } = e, { baseId: s, schemaEnv: a, validateName: i, opts: u, self: c } = n, { root: d } = a;
    if ((r === "#" || r === "#/") && s === d.baseId)
      return m();
    const l = hi.resolveRef.call(c, d, s, r);
    if (l === void 0)
      throw new im.default(n.opts.uriResolver, s, r);
    if (l instanceof hi.SchemaEnv)
      return P(l);
    return _(l);
    function m() {
      if (a === d)
        return Nn(e, i, a, a.$async);
      const w = t.scopeValue("root", { ref: d });
      return Nn(e, (0, ke._)`${w}.validate`, d, d.$async);
    }
    function P(w) {
      const g = Nl(e, w);
      Nn(e, g, w, w.$async);
    }
    function _(w) {
      const g = t.scopeValue("schema", u.code.source === !0 ? { ref: w, code: (0, ke.stringify)(w) } : { ref: w }), $ = t.name("valid"), h = e.subschema({
        schema: w,
        dataTypes: [],
        schemaPath: ke.nil,
        topSchemaRef: g,
        errSchemaPath: r
      }, $);
      e.mergeEvaluated(h), e.ok($);
    }
  }
};
function Nl(e, t) {
  const { gen: r } = e;
  return t.validate ? r.scopeValue("validate", { ref: t.validate }) : (0, ke._)`${r.scopeValue("wrapper", { ref: t })}.validate`;
}
Zt.getValidate = Nl;
function Nn(e, t, r, n) {
  const { gen: s, it: a } = e, { allErrors: i, schemaEnv: u, opts: c } = a, d = c.passContext ? nr.default.this : ke.nil;
  n ? l() : m();
  function l() {
    if (!u.$async)
      throw new Error("async schema referenced by sync schema");
    const w = s.let("valid");
    s.try(() => {
      s.code((0, ke._)`await ${(0, fi.callValidateCode)(e, t, d)}`), _(t), i || s.assign(w, !0);
    }, (g) => {
      s.if((0, ke._)`!(${g} instanceof ${a.ValidationError})`, () => s.throw(g)), P(g), i || s.assign(w, !1);
    }), e.ok(w);
  }
  function m() {
    e.result((0, fi.callValidateCode)(e, t, d), () => _(t), () => P(t));
  }
  function P(w) {
    const g = (0, ke._)`${w}.errors`;
    s.assign(nr.default.vErrors, (0, ke._)`${nr.default.vErrors} === null ? ${g} : ${nr.default.vErrors}.concat(${g})`), s.assign(nr.default.errors, (0, ke._)`${nr.default.vErrors}.length`);
  }
  function _(w) {
    var g;
    if (!a.opts.unevaluated)
      return;
    const $ = (g = r == null ? void 0 : r.validate) === null || g === void 0 ? void 0 : g.evaluated;
    if (a.props !== !0)
      if ($ && !$.dynamicProps)
        $.props !== void 0 && (a.props = cn.mergeEvaluated.props(s, $.props, a.props));
      else {
        const h = s.var("props", (0, ke._)`${w}.evaluated.props`);
        a.props = cn.mergeEvaluated.props(s, h, a.props, ke.Name);
      }
    if (a.items !== !0)
      if ($ && !$.dynamicItems)
        $.items !== void 0 && (a.items = cn.mergeEvaluated.items(s, $.items, a.items));
      else {
        const h = s.var("items", (0, ke._)`${w}.evaluated.items`);
        a.items = cn.mergeEvaluated.items(s, h, a.items, ke.Name);
      }
  }
}
Zt.callRef = Nn;
Zt.default = cm;
Object.defineProperty(Sa, "__esModule", { value: !0 });
const lm = ba, um = Zt, dm = [
  "$schema",
  "$id",
  "$defs",
  "$vocabulary",
  { keyword: "$comment" },
  "definitions",
  lm.default,
  um.default
];
Sa.default = dm;
var Pa = {}, Na = {};
Object.defineProperty(Na, "__esModule", { value: !0 });
const Ln = te, $t = Ln.operators, Fn = {
  maximum: { okStr: "<=", ok: $t.LTE, fail: $t.GT },
  minimum: { okStr: ">=", ok: $t.GTE, fail: $t.LT },
  exclusiveMaximum: { okStr: "<", ok: $t.LT, fail: $t.GTE },
  exclusiveMinimum: { okStr: ">", ok: $t.GT, fail: $t.LTE }
}, fm = {
  message: ({ keyword: e, schemaCode: t }) => (0, Ln.str)`must be ${Fn[e].okStr} ${t}`,
  params: ({ keyword: e, schemaCode: t }) => (0, Ln._)`{comparison: ${Fn[e].okStr}, limit: ${t}}`
}, hm = {
  keyword: Object.keys(Fn),
  type: "number",
  schemaType: "number",
  $data: !0,
  error: fm,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e;
    e.fail$data((0, Ln._)`${r} ${Fn[t].fail} ${n} || isNaN(${r})`);
  }
};
Na.default = hm;
var Oa = {};
Object.defineProperty(Oa, "__esModule", { value: !0 });
const Vr = te, mm = {
  message: ({ schemaCode: e }) => (0, Vr.str)`must be multiple of ${e}`,
  params: ({ schemaCode: e }) => (0, Vr._)`{multipleOf: ${e}}`
}, pm = {
  keyword: "multipleOf",
  type: "number",
  schemaType: "number",
  $data: !0,
  error: mm,
  code(e) {
    const { gen: t, data: r, schemaCode: n, it: s } = e, a = s.opts.multipleOfPrecision, i = t.let("res"), u = a ? (0, Vr._)`Math.abs(Math.round(${i}) - ${i}) > 1e-${a}` : (0, Vr._)`${i} !== parseInt(${i})`;
    e.fail$data((0, Vr._)`(${n} === 0 || (${i} = ${r}/${n}, ${u}))`);
  }
};
Oa.default = pm;
var Ra = {}, Ta = {};
Object.defineProperty(Ta, "__esModule", { value: !0 });
function Ol(e) {
  const t = e.length;
  let r = 0, n = 0, s;
  for (; n < t; )
    r++, s = e.charCodeAt(n++), s >= 55296 && s <= 56319 && n < t && (s = e.charCodeAt(n), (s & 64512) === 56320 && n++);
  return r;
}
Ta.default = Ol;
Ol.code = 'require("ajv/dist/runtime/ucs2length").default';
Object.defineProperty(Ra, "__esModule", { value: !0 });
const Wt = te, ym = M, $m = Ta, _m = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxLength" ? "more" : "fewer";
    return (0, Wt.str)`must NOT have ${r} than ${t} characters`;
  },
  params: ({ schemaCode: e }) => (0, Wt._)`{limit: ${e}}`
}, gm = {
  keyword: ["maxLength", "minLength"],
  type: "string",
  schemaType: "number",
  $data: !0,
  error: _m,
  code(e) {
    const { keyword: t, data: r, schemaCode: n, it: s } = e, a = t === "maxLength" ? Wt.operators.GT : Wt.operators.LT, i = s.opts.unicode === !1 ? (0, Wt._)`${r}.length` : (0, Wt._)`${(0, ym.useFunc)(e.gen, $m.default)}(${r})`;
    e.fail$data((0, Wt._)`${i} ${a} ${n}`);
  }
};
Ra.default = gm;
var Ia = {};
Object.defineProperty(Ia, "__esModule", { value: !0 });
const vm = x, Em = M, lr = te, wm = {
  message: ({ schemaCode: e }) => (0, lr.str)`must match pattern "${e}"`,
  params: ({ schemaCode: e }) => (0, lr._)`{pattern: ${e}}`
}, Sm = {
  keyword: "pattern",
  type: "string",
  schemaType: "string",
  $data: !0,
  error: wm,
  code(e) {
    const { gen: t, data: r, $data: n, schema: s, schemaCode: a, it: i } = e, u = i.opts.unicodeRegExp ? "u" : "";
    if (n) {
      const { regExp: c } = i.opts.code, d = c.code === "new RegExp" ? (0, lr._)`new RegExp` : (0, Em.useFunc)(t, c), l = t.let("valid");
      t.try(() => t.assign(l, (0, lr._)`${d}(${a}, ${u}).test(${r})`), () => t.assign(l, !1)), e.fail$data((0, lr._)`!${l}`);
    } else {
      const c = (0, vm.usePattern)(e, s);
      e.fail$data((0, lr._)`!${c}.test(${r})`);
    }
  }
};
Ia.default = Sm;
var ja = {};
Object.defineProperty(ja, "__esModule", { value: !0 });
const Ur = te, bm = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxProperties" ? "more" : "fewer";
    return (0, Ur.str)`must NOT have ${r} than ${t} properties`;
  },
  params: ({ schemaCode: e }) => (0, Ur._)`{limit: ${e}}`
}, Pm = {
  keyword: ["maxProperties", "minProperties"],
  type: "object",
  schemaType: "number",
  $data: !0,
  error: bm,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e, s = t === "maxProperties" ? Ur.operators.GT : Ur.operators.LT;
    e.fail$data((0, Ur._)`Object.keys(${r}).length ${s} ${n}`);
  }
};
ja.default = Pm;
var Aa = {};
Object.defineProperty(Aa, "__esModule", { value: !0 });
const jr = x, zr = te, Nm = M, Om = {
  message: ({ params: { missingProperty: e } }) => (0, zr.str)`must have required property '${e}'`,
  params: ({ params: { missingProperty: e } }) => (0, zr._)`{missingProperty: ${e}}`
}, Rm = {
  keyword: "required",
  type: "object",
  schemaType: "array",
  $data: !0,
  error: Om,
  code(e) {
    const { gen: t, schema: r, schemaCode: n, data: s, $data: a, it: i } = e, { opts: u } = i;
    if (!a && r.length === 0)
      return;
    const c = r.length >= u.loopRequired;
    if (i.allErrors ? d() : l(), u.strictRequired) {
      const _ = e.parentSchema.properties, { definedProperties: w } = e.it;
      for (const g of r)
        if ((_ == null ? void 0 : _[g]) === void 0 && !w.has(g)) {
          const $ = i.schemaEnv.baseId + i.errSchemaPath, h = `required property "${g}" is not defined at "${$}" (strictRequired)`;
          (0, Nm.checkStrictMode)(i, h, i.opts.strictRequired);
        }
    }
    function d() {
      if (c || a)
        e.block$data(zr.nil, m);
      else
        for (const _ of r)
          (0, jr.checkReportMissingProp)(e, _);
    }
    function l() {
      const _ = t.let("missing");
      if (c || a) {
        const w = t.let("valid", !0);
        e.block$data(w, () => P(_, w)), e.ok(w);
      } else
        t.if((0, jr.checkMissingProp)(e, r, _)), (0, jr.reportMissingProp)(e, _), t.else();
    }
    function m() {
      t.forOf("prop", n, (_) => {
        e.setParams({ missingProperty: _ }), t.if((0, jr.noPropertyInData)(t, s, _, u.ownProperties), () => e.error());
      });
    }
    function P(_, w) {
      e.setParams({ missingProperty: _ }), t.forOf(_, n, () => {
        t.assign(w, (0, jr.propertyInData)(t, s, _, u.ownProperties)), t.if((0, zr.not)(w), () => {
          e.error(), t.break();
        });
      }, zr.nil);
    }
  }
};
Aa.default = Rm;
var ka = {};
Object.defineProperty(ka, "__esModule", { value: !0 });
const qr = te, Tm = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxItems" ? "more" : "fewer";
    return (0, qr.str)`must NOT have ${r} than ${t} items`;
  },
  params: ({ schemaCode: e }) => (0, qr._)`{limit: ${e}}`
}, Im = {
  keyword: ["maxItems", "minItems"],
  type: "array",
  schemaType: "number",
  $data: !0,
  error: Tm,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e, s = t === "maxItems" ? qr.operators.GT : qr.operators.LT;
    e.fail$data((0, qr._)`${r}.length ${s} ${n}`);
  }
};
ka.default = Im;
var Ca = {}, Zr = {};
Object.defineProperty(Zr, "__esModule", { value: !0 });
const Rl = Bn;
Rl.code = 'require("ajv/dist/runtime/equal").default';
Zr.default = Rl;
Object.defineProperty(Ca, "__esModule", { value: !0 });
const ms = $e, ve = te, jm = M, Am = Zr, km = {
  message: ({ params: { i: e, j: t } }) => (0, ve.str)`must NOT have duplicate items (items ## ${t} and ${e} are identical)`,
  params: ({ params: { i: e, j: t } }) => (0, ve._)`{i: ${e}, j: ${t}}`
}, Cm = {
  keyword: "uniqueItems",
  type: "array",
  schemaType: "boolean",
  $data: !0,
  error: km,
  code(e) {
    const { gen: t, data: r, $data: n, schema: s, parentSchema: a, schemaCode: i, it: u } = e;
    if (!n && !s)
      return;
    const c = t.let("valid"), d = a.items ? (0, ms.getSchemaTypes)(a.items) : [];
    e.block$data(c, l, (0, ve._)`${i} === false`), e.ok(c);
    function l() {
      const w = t.let("i", (0, ve._)`${r}.length`), g = t.let("j");
      e.setParams({ i: w, j: g }), t.assign(c, !0), t.if((0, ve._)`${w} > 1`, () => (m() ? P : _)(w, g));
    }
    function m() {
      return d.length > 0 && !d.some((w) => w === "object" || w === "array");
    }
    function P(w, g) {
      const $ = t.name("item"), h = (0, ms.checkDataTypes)(d, $, u.opts.strictNumbers, ms.DataType.Wrong), E = t.const("indices", (0, ve._)`{}`);
      t.for((0, ve._)`;${w}--;`, () => {
        t.let($, (0, ve._)`${r}[${w}]`), t.if(h, (0, ve._)`continue`), d.length > 1 && t.if((0, ve._)`typeof ${$} == "string"`, (0, ve._)`${$} += "_"`), t.if((0, ve._)`typeof ${E}[${$}] == "number"`, () => {
          t.assign(g, (0, ve._)`${E}[${$}]`), e.error(), t.assign(c, !1).break();
        }).code((0, ve._)`${E}[${$}] = ${w}`);
      });
    }
    function _(w, g) {
      const $ = (0, jm.useFunc)(t, Am.default), h = t.name("outer");
      t.label(h).for((0, ve._)`;${w}--;`, () => t.for((0, ve._)`${g} = ${w}; ${g}--;`, () => t.if((0, ve._)`${$}(${r}[${w}], ${r}[${g}])`, () => {
        e.error(), t.assign(c, !1).break(h);
      })));
    }
  }
};
Ca.default = Cm;
var Da = {};
Object.defineProperty(Da, "__esModule", { value: !0 });
const Cs = te, Dm = M, Mm = Zr, Lm = {
  message: "must be equal to constant",
  params: ({ schemaCode: e }) => (0, Cs._)`{allowedValue: ${e}}`
}, Fm = {
  keyword: "const",
  $data: !0,
  error: Lm,
  code(e) {
    const { gen: t, data: r, $data: n, schemaCode: s, schema: a } = e;
    n || a && typeof a == "object" ? e.fail$data((0, Cs._)`!${(0, Dm.useFunc)(t, Mm.default)}(${r}, ${s})`) : e.fail((0, Cs._)`${a} !== ${r}`);
  }
};
Da.default = Fm;
var Ma = {};
Object.defineProperty(Ma, "__esModule", { value: !0 });
const Mr = te, Vm = M, Um = Zr, zm = {
  message: "must be equal to one of the allowed values",
  params: ({ schemaCode: e }) => (0, Mr._)`{allowedValues: ${e}}`
}, qm = {
  keyword: "enum",
  schemaType: "array",
  $data: !0,
  error: zm,
  code(e) {
    const { gen: t, data: r, $data: n, schema: s, schemaCode: a, it: i } = e;
    if (!n && s.length === 0)
      throw new Error("enum must have non-empty array");
    const u = s.length >= i.opts.loopEnum;
    let c;
    const d = () => c ?? (c = (0, Vm.useFunc)(t, Um.default));
    let l;
    if (u || n)
      l = t.let("valid"), e.block$data(l, m);
    else {
      if (!Array.isArray(s))
        throw new Error("ajv implementation error");
      const _ = t.const("vSchema", a);
      l = (0, Mr.or)(...s.map((w, g) => P(_, g)));
    }
    e.pass(l);
    function m() {
      t.assign(l, !1), t.forOf("v", a, (_) => t.if((0, Mr._)`${d()}(${r}, ${_})`, () => t.assign(l, !0).break()));
    }
    function P(_, w) {
      const g = s[w];
      return typeof g == "object" && g !== null ? (0, Mr._)`${d()}(${r}, ${_}[${w}])` : (0, Mr._)`${r} === ${g}`;
    }
  }
};
Ma.default = qm;
Object.defineProperty(Pa, "__esModule", { value: !0 });
const Km = Na, Gm = Oa, Hm = Ra, Wm = Ia, Bm = ja, Jm = Aa, Xm = ka, Ym = Ca, Qm = Da, Zm = Ma, xm = [
  // number
  Km.default,
  Gm.default,
  // string
  Hm.default,
  Wm.default,
  // object
  Bm.default,
  Jm.default,
  // array
  Xm.default,
  Ym.default,
  // any
  { keyword: "type", schemaType: ["string", "array"] },
  { keyword: "nullable", schemaType: "boolean" },
  Qm.default,
  Zm.default
];
Pa.default = xm;
var La = {}, wr = {};
Object.defineProperty(wr, "__esModule", { value: !0 });
wr.validateAdditionalItems = void 0;
const Bt = te, Ds = M, ep = {
  message: ({ params: { len: e } }) => (0, Bt.str)`must NOT have more than ${e} items`,
  params: ({ params: { len: e } }) => (0, Bt._)`{limit: ${e}}`
}, tp = {
  keyword: "additionalItems",
  type: "array",
  schemaType: ["boolean", "object"],
  before: "uniqueItems",
  error: ep,
  code(e) {
    const { parentSchema: t, it: r } = e, { items: n } = t;
    if (!Array.isArray(n)) {
      (0, Ds.checkStrictMode)(r, '"additionalItems" is ignored when "items" is not an array of schemas');
      return;
    }
    Tl(e, n);
  }
};
function Tl(e, t) {
  const { gen: r, schema: n, data: s, keyword: a, it: i } = e;
  i.items = !0;
  const u = r.const("len", (0, Bt._)`${s}.length`);
  if (n === !1)
    e.setParams({ len: t.length }), e.pass((0, Bt._)`${u} <= ${t.length}`);
  else if (typeof n == "object" && !(0, Ds.alwaysValidSchema)(i, n)) {
    const d = r.var("valid", (0, Bt._)`${u} <= ${t.length}`);
    r.if((0, Bt.not)(d), () => c(d)), e.ok(d);
  }
  function c(d) {
    r.forRange("i", t.length, u, (l) => {
      e.subschema({ keyword: a, dataProp: l, dataPropType: Ds.Type.Num }, d), i.allErrors || r.if((0, Bt.not)(d), () => r.break());
    });
  }
}
wr.validateAdditionalItems = Tl;
wr.default = tp;
var Fa = {}, Sr = {};
Object.defineProperty(Sr, "__esModule", { value: !0 });
Sr.validateTuple = void 0;
const mi = te, On = M, rp = x, np = {
  keyword: "items",
  type: "array",
  schemaType: ["object", "array", "boolean"],
  before: "uniqueItems",
  code(e) {
    const { schema: t, it: r } = e;
    if (Array.isArray(t))
      return Il(e, "additionalItems", t);
    r.items = !0, !(0, On.alwaysValidSchema)(r, t) && e.ok((0, rp.validateArray)(e));
  }
};
function Il(e, t, r = e.schema) {
  const { gen: n, parentSchema: s, data: a, keyword: i, it: u } = e;
  l(s), u.opts.unevaluated && r.length && u.items !== !0 && (u.items = On.mergeEvaluated.items(n, r.length, u.items));
  const c = n.name("valid"), d = n.const("len", (0, mi._)`${a}.length`);
  r.forEach((m, P) => {
    (0, On.alwaysValidSchema)(u, m) || (n.if((0, mi._)`${d} > ${P}`, () => e.subschema({
      keyword: i,
      schemaProp: P,
      dataProp: P
    }, c)), e.ok(c));
  });
  function l(m) {
    const { opts: P, errSchemaPath: _ } = u, w = r.length, g = w === m.minItems && (w === m.maxItems || m[t] === !1);
    if (P.strictTuples && !g) {
      const $ = `"${i}" is ${w}-tuple, but minItems or maxItems/${t} are not specified or different at path "${_}"`;
      (0, On.checkStrictMode)(u, $, P.strictTuples);
    }
  }
}
Sr.validateTuple = Il;
Sr.default = np;
Object.defineProperty(Fa, "__esModule", { value: !0 });
const sp = Sr, ap = {
  keyword: "prefixItems",
  type: "array",
  schemaType: ["array"],
  before: "uniqueItems",
  code: (e) => (0, sp.validateTuple)(e, "items")
};
Fa.default = ap;
var Va = {};
Object.defineProperty(Va, "__esModule", { value: !0 });
const pi = te, op = M, ip = x, cp = wr, lp = {
  message: ({ params: { len: e } }) => (0, pi.str)`must NOT have more than ${e} items`,
  params: ({ params: { len: e } }) => (0, pi._)`{limit: ${e}}`
}, up = {
  keyword: "items",
  type: "array",
  schemaType: ["object", "boolean"],
  before: "uniqueItems",
  error: lp,
  code(e) {
    const { schema: t, parentSchema: r, it: n } = e, { prefixItems: s } = r;
    n.items = !0, !(0, op.alwaysValidSchema)(n, t) && (s ? (0, cp.validateAdditionalItems)(e, s) : e.ok((0, ip.validateArray)(e)));
  }
};
Va.default = up;
var Ua = {};
Object.defineProperty(Ua, "__esModule", { value: !0 });
const ze = te, ln = M, dp = {
  message: ({ params: { min: e, max: t } }) => t === void 0 ? (0, ze.str)`must contain at least ${e} valid item(s)` : (0, ze.str)`must contain at least ${e} and no more than ${t} valid item(s)`,
  params: ({ params: { min: e, max: t } }) => t === void 0 ? (0, ze._)`{minContains: ${e}}` : (0, ze._)`{minContains: ${e}, maxContains: ${t}}`
}, fp = {
  keyword: "contains",
  type: "array",
  schemaType: ["object", "boolean"],
  before: "uniqueItems",
  trackErrors: !0,
  error: dp,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: s, it: a } = e;
    let i, u;
    const { minContains: c, maxContains: d } = n;
    a.opts.next ? (i = c === void 0 ? 1 : c, u = d) : i = 1;
    const l = t.const("len", (0, ze._)`${s}.length`);
    if (e.setParams({ min: i, max: u }), u === void 0 && i === 0) {
      (0, ln.checkStrictMode)(a, '"minContains" == 0 without "maxContains": "contains" keyword ignored');
      return;
    }
    if (u !== void 0 && i > u) {
      (0, ln.checkStrictMode)(a, '"minContains" > "maxContains" is always invalid'), e.fail();
      return;
    }
    if ((0, ln.alwaysValidSchema)(a, r)) {
      let g = (0, ze._)`${l} >= ${i}`;
      u !== void 0 && (g = (0, ze._)`${g} && ${l} <= ${u}`), e.pass(g);
      return;
    }
    a.items = !0;
    const m = t.name("valid");
    u === void 0 && i === 1 ? _(m, () => t.if(m, () => t.break())) : i === 0 ? (t.let(m, !0), u !== void 0 && t.if((0, ze._)`${s}.length > 0`, P)) : (t.let(m, !1), P()), e.result(m, () => e.reset());
    function P() {
      const g = t.name("_valid"), $ = t.let("count", 0);
      _(g, () => t.if(g, () => w($)));
    }
    function _(g, $) {
      t.forRange("i", 0, l, (h) => {
        e.subschema({
          keyword: "contains",
          dataProp: h,
          dataPropType: ln.Type.Num,
          compositeRule: !0
        }, g), $();
      });
    }
    function w(g) {
      t.code((0, ze._)`${g}++`), u === void 0 ? t.if((0, ze._)`${g} >= ${i}`, () => t.assign(m, !0).break()) : (t.if((0, ze._)`${g} > ${u}`, () => t.assign(m, !1).break()), i === 1 ? t.assign(m, !0) : t.if((0, ze._)`${g} >= ${i}`, () => t.assign(m, !0)));
    }
  }
};
Ua.default = fp;
var jl = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.validateSchemaDeps = e.validatePropertyDeps = e.error = void 0;
  const t = te, r = M, n = x;
  e.error = {
    message: ({ params: { property: c, depsCount: d, deps: l } }) => {
      const m = d === 1 ? "property" : "properties";
      return (0, t.str)`must have ${m} ${l} when property ${c} is present`;
    },
    params: ({ params: { property: c, depsCount: d, deps: l, missingProperty: m } }) => (0, t._)`{property: ${c},
    missingProperty: ${m},
    depsCount: ${d},
    deps: ${l}}`
    // TODO change to reference
  };
  const s = {
    keyword: "dependencies",
    type: "object",
    schemaType: "object",
    error: e.error,
    code(c) {
      const [d, l] = a(c);
      i(c, d), u(c, l);
    }
  };
  function a({ schema: c }) {
    const d = {}, l = {};
    for (const m in c) {
      if (m === "__proto__")
        continue;
      const P = Array.isArray(c[m]) ? d : l;
      P[m] = c[m];
    }
    return [d, l];
  }
  function i(c, d = c.schema) {
    const { gen: l, data: m, it: P } = c;
    if (Object.keys(d).length === 0)
      return;
    const _ = l.let("missing");
    for (const w in d) {
      const g = d[w];
      if (g.length === 0)
        continue;
      const $ = (0, n.propertyInData)(l, m, w, P.opts.ownProperties);
      c.setParams({
        property: w,
        depsCount: g.length,
        deps: g.join(", ")
      }), P.allErrors ? l.if($, () => {
        for (const h of g)
          (0, n.checkReportMissingProp)(c, h);
      }) : (l.if((0, t._)`${$} && (${(0, n.checkMissingProp)(c, g, _)})`), (0, n.reportMissingProp)(c, _), l.else());
    }
  }
  e.validatePropertyDeps = i;
  function u(c, d = c.schema) {
    const { gen: l, data: m, keyword: P, it: _ } = c, w = l.name("valid");
    for (const g in d)
      (0, r.alwaysValidSchema)(_, d[g]) || (l.if(
        (0, n.propertyInData)(l, m, g, _.opts.ownProperties),
        () => {
          const $ = c.subschema({ keyword: P, schemaProp: g }, w);
          c.mergeValidEvaluated($, w);
        },
        () => l.var(w, !0)
        // TODO var
      ), c.ok(w));
  }
  e.validateSchemaDeps = u, e.default = s;
})(jl);
var za = {};
Object.defineProperty(za, "__esModule", { value: !0 });
const Al = te, hp = M, mp = {
  message: "property name must be valid",
  params: ({ params: e }) => (0, Al._)`{propertyName: ${e.propertyName}}`
}, pp = {
  keyword: "propertyNames",
  type: "object",
  schemaType: ["object", "boolean"],
  error: mp,
  code(e) {
    const { gen: t, schema: r, data: n, it: s } = e;
    if ((0, hp.alwaysValidSchema)(s, r))
      return;
    const a = t.name("valid");
    t.forIn("key", n, (i) => {
      e.setParams({ propertyName: i }), e.subschema({
        keyword: "propertyNames",
        data: i,
        dataTypes: ["string"],
        propertyName: i,
        compositeRule: !0
      }, a), t.if((0, Al.not)(a), () => {
        e.error(!0), s.allErrors || t.break();
      });
    }), e.ok(a);
  }
};
za.default = pp;
var Qn = {};
Object.defineProperty(Qn, "__esModule", { value: !0 });
const un = x, We = te, yp = ct, dn = M, $p = {
  message: "must NOT have additional properties",
  params: ({ params: e }) => (0, We._)`{additionalProperty: ${e.additionalProperty}}`
}, _p = {
  keyword: "additionalProperties",
  type: ["object"],
  schemaType: ["boolean", "object"],
  allowUndefined: !0,
  trackErrors: !0,
  error: $p,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: s, errsCount: a, it: i } = e;
    if (!a)
      throw new Error("ajv implementation error");
    const { allErrors: u, opts: c } = i;
    if (i.props = !0, c.removeAdditional !== "all" && (0, dn.alwaysValidSchema)(i, r))
      return;
    const d = (0, un.allSchemaProperties)(n.properties), l = (0, un.allSchemaProperties)(n.patternProperties);
    m(), e.ok((0, We._)`${a} === ${yp.default.errors}`);
    function m() {
      t.forIn("key", s, ($) => {
        !d.length && !l.length ? w($) : t.if(P($), () => w($));
      });
    }
    function P($) {
      let h;
      if (d.length > 8) {
        const E = (0, dn.schemaRefOrVal)(i, n.properties, "properties");
        h = (0, un.isOwnProperty)(t, E, $);
      } else d.length ? h = (0, We.or)(...d.map((E) => (0, We._)`${$} === ${E}`)) : h = We.nil;
      return l.length && (h = (0, We.or)(h, ...l.map((E) => (0, We._)`${(0, un.usePattern)(e, E)}.test(${$})`))), (0, We.not)(h);
    }
    function _($) {
      t.code((0, We._)`delete ${s}[${$}]`);
    }
    function w($) {
      if (c.removeAdditional === "all" || c.removeAdditional && r === !1) {
        _($);
        return;
      }
      if (r === !1) {
        e.setParams({ additionalProperty: $ }), e.error(), u || t.break();
        return;
      }
      if (typeof r == "object" && !(0, dn.alwaysValidSchema)(i, r)) {
        const h = t.name("valid");
        c.removeAdditional === "failing" ? (g($, h, !1), t.if((0, We.not)(h), () => {
          e.reset(), _($);
        })) : (g($, h), u || t.if((0, We.not)(h), () => t.break()));
      }
    }
    function g($, h, E) {
      const N = {
        keyword: "additionalProperties",
        dataProp: $,
        dataPropType: dn.Type.Str
      };
      E === !1 && Object.assign(N, {
        compositeRule: !0,
        createErrors: !1,
        allErrors: !1
      }), e.subschema(N, h);
    }
  }
};
Qn.default = _p;
var qa = {};
Object.defineProperty(qa, "__esModule", { value: !0 });
const gp = Qe, yi = x, ps = M, $i = Qn, vp = {
  keyword: "properties",
  type: "object",
  schemaType: "object",
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: s, it: a } = e;
    a.opts.removeAdditional === "all" && n.additionalProperties === void 0 && $i.default.code(new gp.KeywordCxt(a, $i.default, "additionalProperties"));
    const i = (0, yi.allSchemaProperties)(r);
    for (const m of i)
      a.definedProperties.add(m);
    a.opts.unevaluated && i.length && a.props !== !0 && (a.props = ps.mergeEvaluated.props(t, (0, ps.toHash)(i), a.props));
    const u = i.filter((m) => !(0, ps.alwaysValidSchema)(a, r[m]));
    if (u.length === 0)
      return;
    const c = t.name("valid");
    for (const m of u)
      d(m) ? l(m) : (t.if((0, yi.propertyInData)(t, s, m, a.opts.ownProperties)), l(m), a.allErrors || t.else().var(c, !0), t.endIf()), e.it.definedProperties.add(m), e.ok(c);
    function d(m) {
      return a.opts.useDefaults && !a.compositeRule && r[m].default !== void 0;
    }
    function l(m) {
      e.subschema({
        keyword: "properties",
        schemaProp: m,
        dataProp: m
      }, c);
    }
  }
};
qa.default = vp;
var Ka = {};
Object.defineProperty(Ka, "__esModule", { value: !0 });
const _i = x, fn = te, gi = M, vi = M, Ep = {
  keyword: "patternProperties",
  type: "object",
  schemaType: "object",
  code(e) {
    const { gen: t, schema: r, data: n, parentSchema: s, it: a } = e, { opts: i } = a, u = (0, _i.allSchemaProperties)(r), c = u.filter((g) => (0, gi.alwaysValidSchema)(a, r[g]));
    if (u.length === 0 || c.length === u.length && (!a.opts.unevaluated || a.props === !0))
      return;
    const d = i.strictSchema && !i.allowMatchingProperties && s.properties, l = t.name("valid");
    a.props !== !0 && !(a.props instanceof fn.Name) && (a.props = (0, vi.evaluatedPropsToName)(t, a.props));
    const { props: m } = a;
    P();
    function P() {
      for (const g of u)
        d && _(g), a.allErrors ? w(g) : (t.var(l, !0), w(g), t.if(l));
    }
    function _(g) {
      for (const $ in d)
        new RegExp(g).test($) && (0, gi.checkStrictMode)(a, `property ${$} matches pattern ${g} (use allowMatchingProperties)`);
    }
    function w(g) {
      t.forIn("key", n, ($) => {
        t.if((0, fn._)`${(0, _i.usePattern)(e, g)}.test(${$})`, () => {
          const h = c.includes(g);
          h || e.subschema({
            keyword: "patternProperties",
            schemaProp: g,
            dataProp: $,
            dataPropType: vi.Type.Str
          }, l), a.opts.unevaluated && m !== !0 ? t.assign((0, fn._)`${m}[${$}]`, !0) : !h && !a.allErrors && t.if((0, fn.not)(l), () => t.break());
        });
      });
    }
  }
};
Ka.default = Ep;
var Ga = {};
Object.defineProperty(Ga, "__esModule", { value: !0 });
const wp = M, Sp = {
  keyword: "not",
  schemaType: ["object", "boolean"],
  trackErrors: !0,
  code(e) {
    const { gen: t, schema: r, it: n } = e;
    if ((0, wp.alwaysValidSchema)(n, r)) {
      e.fail();
      return;
    }
    const s = t.name("valid");
    e.subschema({
      keyword: "not",
      compositeRule: !0,
      createErrors: !1,
      allErrors: !1
    }, s), e.failResult(s, () => e.reset(), () => e.error());
  },
  error: { message: "must NOT be valid" }
};
Ga.default = Sp;
var Ha = {};
Object.defineProperty(Ha, "__esModule", { value: !0 });
const bp = x, Pp = {
  keyword: "anyOf",
  schemaType: "array",
  trackErrors: !0,
  code: bp.validateUnion,
  error: { message: "must match a schema in anyOf" }
};
Ha.default = Pp;
var Wa = {};
Object.defineProperty(Wa, "__esModule", { value: !0 });
const Rn = te, Np = M, Op = {
  message: "must match exactly one schema in oneOf",
  params: ({ params: e }) => (0, Rn._)`{passingSchemas: ${e.passing}}`
}, Rp = {
  keyword: "oneOf",
  schemaType: "array",
  trackErrors: !0,
  error: Op,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, it: s } = e;
    if (!Array.isArray(r))
      throw new Error("ajv implementation error");
    if (s.opts.discriminator && n.discriminator)
      return;
    const a = r, i = t.let("valid", !1), u = t.let("passing", null), c = t.name("_valid");
    e.setParams({ passing: u }), t.block(d), e.result(i, () => e.reset(), () => e.error(!0));
    function d() {
      a.forEach((l, m) => {
        let P;
        (0, Np.alwaysValidSchema)(s, l) ? t.var(c, !0) : P = e.subschema({
          keyword: "oneOf",
          schemaProp: m,
          compositeRule: !0
        }, c), m > 0 && t.if((0, Rn._)`${c} && ${i}`).assign(i, !1).assign(u, (0, Rn._)`[${u}, ${m}]`).else(), t.if(c, () => {
          t.assign(i, !0), t.assign(u, m), P && e.mergeEvaluated(P, Rn.Name);
        });
      });
    }
  }
};
Wa.default = Rp;
var Ba = {};
Object.defineProperty(Ba, "__esModule", { value: !0 });
const Tp = M, Ip = {
  keyword: "allOf",
  schemaType: "array",
  code(e) {
    const { gen: t, schema: r, it: n } = e;
    if (!Array.isArray(r))
      throw new Error("ajv implementation error");
    const s = t.name("valid");
    r.forEach((a, i) => {
      if ((0, Tp.alwaysValidSchema)(n, a))
        return;
      const u = e.subschema({ keyword: "allOf", schemaProp: i }, s);
      e.ok(s), e.mergeEvaluated(u);
    });
  }
};
Ba.default = Ip;
var Ja = {};
Object.defineProperty(Ja, "__esModule", { value: !0 });
const Vn = te, kl = M, jp = {
  message: ({ params: e }) => (0, Vn.str)`must match "${e.ifClause}" schema`,
  params: ({ params: e }) => (0, Vn._)`{failingKeyword: ${e.ifClause}}`
}, Ap = {
  keyword: "if",
  schemaType: ["object", "boolean"],
  trackErrors: !0,
  error: jp,
  code(e) {
    const { gen: t, parentSchema: r, it: n } = e;
    r.then === void 0 && r.else === void 0 && (0, kl.checkStrictMode)(n, '"if" without "then" and "else" is ignored');
    const s = Ei(n, "then"), a = Ei(n, "else");
    if (!s && !a)
      return;
    const i = t.let("valid", !0), u = t.name("_valid");
    if (c(), e.reset(), s && a) {
      const l = t.let("ifClause");
      e.setParams({ ifClause: l }), t.if(u, d("then", l), d("else", l));
    } else s ? t.if(u, d("then")) : t.if((0, Vn.not)(u), d("else"));
    e.pass(i, () => e.error(!0));
    function c() {
      const l = e.subschema({
        keyword: "if",
        compositeRule: !0,
        createErrors: !1,
        allErrors: !1
      }, u);
      e.mergeEvaluated(l);
    }
    function d(l, m) {
      return () => {
        const P = e.subschema({ keyword: l }, u);
        t.assign(i, u), e.mergeValidEvaluated(P, i), m ? t.assign(m, (0, Vn._)`${l}`) : e.setParams({ ifClause: l });
      };
    }
  }
};
function Ei(e, t) {
  const r = e.schema[t];
  return r !== void 0 && !(0, kl.alwaysValidSchema)(e, r);
}
Ja.default = Ap;
var Xa = {};
Object.defineProperty(Xa, "__esModule", { value: !0 });
const kp = M, Cp = {
  keyword: ["then", "else"],
  schemaType: ["object", "boolean"],
  code({ keyword: e, parentSchema: t, it: r }) {
    t.if === void 0 && (0, kp.checkStrictMode)(r, `"${e}" without "if" is ignored`);
  }
};
Xa.default = Cp;
Object.defineProperty(La, "__esModule", { value: !0 });
const Dp = wr, Mp = Fa, Lp = Sr, Fp = Va, Vp = Ua, Up = jl, zp = za, qp = Qn, Kp = qa, Gp = Ka, Hp = Ga, Wp = Ha, Bp = Wa, Jp = Ba, Xp = Ja, Yp = Xa;
function Qp(e = !1) {
  const t = [
    // any
    Hp.default,
    Wp.default,
    Bp.default,
    Jp.default,
    Xp.default,
    Yp.default,
    // object
    zp.default,
    qp.default,
    Up.default,
    Kp.default,
    Gp.default
  ];
  return e ? t.push(Mp.default, Fp.default) : t.push(Dp.default, Lp.default), t.push(Vp.default), t;
}
La.default = Qp;
var Ya = {}, Qa = {};
Object.defineProperty(Qa, "__esModule", { value: !0 });
const pe = te, Zp = {
  message: ({ schemaCode: e }) => (0, pe.str)`must match format "${e}"`,
  params: ({ schemaCode: e }) => (0, pe._)`{format: ${e}}`
}, xp = {
  keyword: "format",
  type: ["number", "string"],
  schemaType: "string",
  $data: !0,
  error: Zp,
  code(e, t) {
    const { gen: r, data: n, $data: s, schema: a, schemaCode: i, it: u } = e, { opts: c, errSchemaPath: d, schemaEnv: l, self: m } = u;
    if (!c.validateFormats)
      return;
    s ? P() : _();
    function P() {
      const w = r.scopeValue("formats", {
        ref: m.formats,
        code: c.code.formats
      }), g = r.const("fDef", (0, pe._)`${w}[${i}]`), $ = r.let("fType"), h = r.let("format");
      r.if((0, pe._)`typeof ${g} == "object" && !(${g} instanceof RegExp)`, () => r.assign($, (0, pe._)`${g}.type || "string"`).assign(h, (0, pe._)`${g}.validate`), () => r.assign($, (0, pe._)`"string"`).assign(h, g)), e.fail$data((0, pe.or)(E(), N()));
      function E() {
        return c.strictSchema === !1 ? pe.nil : (0, pe._)`${i} && !${h}`;
      }
      function N() {
        const R = l.$async ? (0, pe._)`(${g}.async ? await ${h}(${n}) : ${h}(${n}))` : (0, pe._)`${h}(${n})`, I = (0, pe._)`(typeof ${h} == "function" ? ${R} : ${h}.test(${n}))`;
        return (0, pe._)`${h} && ${h} !== true && ${$} === ${t} && !${I}`;
      }
    }
    function _() {
      const w = m.formats[a];
      if (!w) {
        E();
        return;
      }
      if (w === !0)
        return;
      const [g, $, h] = N(w);
      g === t && e.pass(R());
      function E() {
        if (c.strictSchema === !1) {
          m.logger.warn(I());
          return;
        }
        throw new Error(I());
        function I() {
          return `unknown format "${a}" ignored in schema at path "${d}"`;
        }
      }
      function N(I) {
        const z = I instanceof RegExp ? (0, pe.regexpCode)(I) : c.code.formats ? (0, pe._)`${c.code.formats}${(0, pe.getProperty)(a)}` : void 0, W = r.scopeValue("formats", { key: a, ref: I, code: z });
        return typeof I == "object" && !(I instanceof RegExp) ? [I.type || "string", I.validate, (0, pe._)`${W}.validate`] : ["string", I, W];
      }
      function R() {
        if (typeof w == "object" && !(w instanceof RegExp) && w.async) {
          if (!l.$async)
            throw new Error("async format in sync schema");
          return (0, pe._)`await ${h}(${n})`;
        }
        return typeof $ == "function" ? (0, pe._)`${h}(${n})` : (0, pe._)`${h}.test(${n})`;
      }
    }
  }
};
Qa.default = xp;
Object.defineProperty(Ya, "__esModule", { value: !0 });
const ey = Qa, ty = [ey.default];
Ya.default = ty;
var _r = {};
Object.defineProperty(_r, "__esModule", { value: !0 });
_r.contentVocabulary = _r.metadataVocabulary = void 0;
_r.metadataVocabulary = [
  "title",
  "description",
  "default",
  "deprecated",
  "readOnly",
  "writeOnly",
  "examples"
];
_r.contentVocabulary = [
  "contentMediaType",
  "contentEncoding",
  "contentSchema"
];
Object.defineProperty(wa, "__esModule", { value: !0 });
const ry = Sa, ny = Pa, sy = La, ay = Ya, wi = _r, oy = [
  ry.default,
  ny.default,
  (0, sy.default)(),
  ay.default,
  wi.metadataVocabulary,
  wi.contentVocabulary
];
wa.default = oy;
var Za = {}, Zn = {};
Object.defineProperty(Zn, "__esModule", { value: !0 });
Zn.DiscrError = void 0;
var Si;
(function(e) {
  e.Tag = "tag", e.Mapping = "mapping";
})(Si || (Zn.DiscrError = Si = {}));
Object.defineProperty(Za, "__esModule", { value: !0 });
const or = te, Ms = Zn, bi = De, iy = Er, cy = M, ly = {
  message: ({ params: { discrError: e, tagName: t } }) => e === Ms.DiscrError.Tag ? `tag "${t}" must be string` : `value of tag "${t}" must be in oneOf`,
  params: ({ params: { discrError: e, tag: t, tagName: r } }) => (0, or._)`{error: ${e}, tag: ${r}, tagValue: ${t}}`
}, uy = {
  keyword: "discriminator",
  type: "object",
  schemaType: "object",
  error: ly,
  code(e) {
    const { gen: t, data: r, schema: n, parentSchema: s, it: a } = e, { oneOf: i } = s;
    if (!a.opts.discriminator)
      throw new Error("discriminator: requires discriminator option");
    const u = n.propertyName;
    if (typeof u != "string")
      throw new Error("discriminator: requires propertyName");
    if (n.mapping)
      throw new Error("discriminator: mapping is not supported");
    if (!i)
      throw new Error("discriminator: requires oneOf keyword");
    const c = t.let("valid", !1), d = t.const("tag", (0, or._)`${r}${(0, or.getProperty)(u)}`);
    t.if((0, or._)`typeof ${d} == "string"`, () => l(), () => e.error(!1, { discrError: Ms.DiscrError.Tag, tag: d, tagName: u })), e.ok(c);
    function l() {
      const _ = P();
      t.if(!1);
      for (const w in _)
        t.elseIf((0, or._)`${d} === ${w}`), t.assign(c, m(_[w]));
      t.else(), e.error(!1, { discrError: Ms.DiscrError.Mapping, tag: d, tagName: u }), t.endIf();
    }
    function m(_) {
      const w = t.name("valid"), g = e.subschema({ keyword: "oneOf", schemaProp: _ }, w);
      return e.mergeEvaluated(g, or.Name), w;
    }
    function P() {
      var _;
      const w = {}, g = h(s);
      let $ = !0;
      for (let R = 0; R < i.length; R++) {
        let I = i[R];
        if (I != null && I.$ref && !(0, cy.schemaHasRulesButRef)(I, a.self.RULES)) {
          const W = I.$ref;
          if (I = bi.resolveRef.call(a.self, a.schemaEnv.root, a.baseId, W), I instanceof bi.SchemaEnv && (I = I.schema), I === void 0)
            throw new iy.default(a.opts.uriResolver, a.baseId, W);
        }
        const z = (_ = I == null ? void 0 : I.properties) === null || _ === void 0 ? void 0 : _[u];
        if (typeof z != "object")
          throw new Error(`discriminator: oneOf subschemas (or referenced schemas) must have "properties/${u}"`);
        $ = $ && (g || h(I)), E(z, R);
      }
      if (!$)
        throw new Error(`discriminator: "${u}" must be required`);
      return w;
      function h({ required: R }) {
        return Array.isArray(R) && R.includes(u);
      }
      function E(R, I) {
        if (R.const)
          N(R.const, I);
        else if (R.enum)
          for (const z of R.enum)
            N(z, I);
        else
          throw new Error(`discriminator: "properties/${u}" must have "const" or "enum"`);
      }
      function N(R, I) {
        if (typeof R != "string" || R in w)
          throw new Error(`discriminator: "${u}" values must be unique strings`);
        w[R] = I;
      }
    }
  }
};
Za.default = uy;
const dy = "http://json-schema.org/draft-07/schema#", fy = "http://json-schema.org/draft-07/schema#", hy = "Core schema meta-schema", my = {
  schemaArray: {
    type: "array",
    minItems: 1,
    items: {
      $ref: "#"
    }
  },
  nonNegativeInteger: {
    type: "integer",
    minimum: 0
  },
  nonNegativeIntegerDefault0: {
    allOf: [
      {
        $ref: "#/definitions/nonNegativeInteger"
      },
      {
        default: 0
      }
    ]
  },
  simpleTypes: {
    enum: [
      "array",
      "boolean",
      "integer",
      "null",
      "number",
      "object",
      "string"
    ]
  },
  stringArray: {
    type: "array",
    items: {
      type: "string"
    },
    uniqueItems: !0,
    default: []
  }
}, py = [
  "object",
  "boolean"
], yy = {
  $id: {
    type: "string",
    format: "uri-reference"
  },
  $schema: {
    type: "string",
    format: "uri"
  },
  $ref: {
    type: "string",
    format: "uri-reference"
  },
  $comment: {
    type: "string"
  },
  title: {
    type: "string"
  },
  description: {
    type: "string"
  },
  default: !0,
  readOnly: {
    type: "boolean",
    default: !1
  },
  examples: {
    type: "array",
    items: !0
  },
  multipleOf: {
    type: "number",
    exclusiveMinimum: 0
  },
  maximum: {
    type: "number"
  },
  exclusiveMaximum: {
    type: "number"
  },
  minimum: {
    type: "number"
  },
  exclusiveMinimum: {
    type: "number"
  },
  maxLength: {
    $ref: "#/definitions/nonNegativeInteger"
  },
  minLength: {
    $ref: "#/definitions/nonNegativeIntegerDefault0"
  },
  pattern: {
    type: "string",
    format: "regex"
  },
  additionalItems: {
    $ref: "#"
  },
  items: {
    anyOf: [
      {
        $ref: "#"
      },
      {
        $ref: "#/definitions/schemaArray"
      }
    ],
    default: !0
  },
  maxItems: {
    $ref: "#/definitions/nonNegativeInteger"
  },
  minItems: {
    $ref: "#/definitions/nonNegativeIntegerDefault0"
  },
  uniqueItems: {
    type: "boolean",
    default: !1
  },
  contains: {
    $ref: "#"
  },
  maxProperties: {
    $ref: "#/definitions/nonNegativeInteger"
  },
  minProperties: {
    $ref: "#/definitions/nonNegativeIntegerDefault0"
  },
  required: {
    $ref: "#/definitions/stringArray"
  },
  additionalProperties: {
    $ref: "#"
  },
  definitions: {
    type: "object",
    additionalProperties: {
      $ref: "#"
    },
    default: {}
  },
  properties: {
    type: "object",
    additionalProperties: {
      $ref: "#"
    },
    default: {}
  },
  patternProperties: {
    type: "object",
    additionalProperties: {
      $ref: "#"
    },
    propertyNames: {
      format: "regex"
    },
    default: {}
  },
  dependencies: {
    type: "object",
    additionalProperties: {
      anyOf: [
        {
          $ref: "#"
        },
        {
          $ref: "#/definitions/stringArray"
        }
      ]
    }
  },
  propertyNames: {
    $ref: "#"
  },
  const: !0,
  enum: {
    type: "array",
    items: !0,
    minItems: 1,
    uniqueItems: !0
  },
  type: {
    anyOf: [
      {
        $ref: "#/definitions/simpleTypes"
      },
      {
        type: "array",
        items: {
          $ref: "#/definitions/simpleTypes"
        },
        minItems: 1,
        uniqueItems: !0
      }
    ]
  },
  format: {
    type: "string"
  },
  contentMediaType: {
    type: "string"
  },
  contentEncoding: {
    type: "string"
  },
  if: {
    $ref: "#"
  },
  then: {
    $ref: "#"
  },
  else: {
    $ref: "#"
  },
  allOf: {
    $ref: "#/definitions/schemaArray"
  },
  anyOf: {
    $ref: "#/definitions/schemaArray"
  },
  oneOf: {
    $ref: "#/definitions/schemaArray"
  },
  not: {
    $ref: "#"
  }
}, $y = {
  $schema: dy,
  $id: fy,
  title: hy,
  definitions: my,
  type: py,
  properties: yy,
  default: !0
};
(function(e, t) {
  Object.defineProperty(t, "__esModule", { value: !0 }), t.MissingRefError = t.ValidationError = t.CodeGen = t.Name = t.nil = t.stringify = t.str = t._ = t.KeywordCxt = t.Ajv = void 0;
  const r = Mc, n = wa, s = Za, a = $y, i = ["/properties"], u = "http://json-schema.org/draft-07/schema";
  class c extends r.default {
    _addVocabularies() {
      super._addVocabularies(), n.default.forEach((w) => this.addVocabulary(w)), this.opts.discriminator && this.addKeyword(s.default);
    }
    _addDefaultMetaSchema() {
      if (super._addDefaultMetaSchema(), !this.opts.meta)
        return;
      const w = this.opts.$data ? this.$dataMetaSchema(a, i) : a;
      this.addMetaSchema(w, u, !1), this.refs["http://json-schema.org/schema"] = u;
    }
    defaultMeta() {
      return this.opts.defaultMeta = super.defaultMeta() || (this.getSchema(u) ? u : void 0);
    }
  }
  t.Ajv = c, e.exports = t = c, e.exports.Ajv = c, Object.defineProperty(t, "__esModule", { value: !0 }), t.default = c;
  var d = Qe;
  Object.defineProperty(t, "KeywordCxt", { enumerable: !0, get: function() {
    return d.KeywordCxt;
  } });
  var l = te;
  Object.defineProperty(t, "_", { enumerable: !0, get: function() {
    return l._;
  } }), Object.defineProperty(t, "str", { enumerable: !0, get: function() {
    return l.str;
  } }), Object.defineProperty(t, "stringify", { enumerable: !0, get: function() {
    return l.stringify;
  } }), Object.defineProperty(t, "nil", { enumerable: !0, get: function() {
    return l.nil;
  } }), Object.defineProperty(t, "Name", { enumerable: !0, get: function() {
    return l.Name;
  } }), Object.defineProperty(t, "CodeGen", { enumerable: !0, get: function() {
    return l.CodeGen;
  } });
  var m = Qr;
  Object.defineProperty(t, "ValidationError", { enumerable: !0, get: function() {
    return m.default;
  } });
  var P = Er;
  Object.defineProperty(t, "MissingRefError", { enumerable: !0, get: function() {
    return P.default;
  } });
})(Ts, Ts.exports);
var _y = Ts.exports, Ls = { exports: {} }, Cl = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.formatNames = e.fastFormats = e.fullFormats = void 0;
  function t(V, H) {
    return { validate: V, compare: H };
  }
  e.fullFormats = {
    // date: http://tools.ietf.org/html/rfc3339#section-5.6
    date: t(a, i),
    // date-time: http://tools.ietf.org/html/rfc3339#section-5.6
    time: t(c, d),
    "date-time": t(m, P),
    // duration: https://tools.ietf.org/html/rfc3339#appendix-A
    duration: /^P(?!$)((\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+S)?)?|(\d+W)?)$/,
    uri: g,
    "uri-reference": /^(?:[a-z][a-z0-9+\-.]*:)?(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'"()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?(?:\?(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i,
    // uri-template: https://tools.ietf.org/html/rfc6570
    "uri-template": /^(?:(?:[^\x00-\x20"'<>%\\^`{|}]|%[0-9a-f]{2})|\{[+#./;?&=,!@|]?(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?(?:,(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?)*\})*$/i,
    // For the source: https://gist.github.com/dperini/729294
    // For test cases: https://mathiasbynens.be/demo/url-regex
    url: /^(?:https?|ftp):\/\/(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u{00a1}-\u{ffff}]+-)*[a-z0-9\u{00a1}-\u{ffff}]+)(?:\.(?:[a-z0-9\u{00a1}-\u{ffff}]+-)*[a-z0-9\u{00a1}-\u{ffff}]+)*(?:\.(?:[a-z\u{00a1}-\u{ffff}]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/iu,
    email: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i,
    hostname: /^(?=.{1,253}\.?$)[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[-0-9a-z]{0,61}[0-9a-z])?)*\.?$/i,
    // optimized https://www.safaribooksonline.com/library/view/regular-expressions-cookbook/9780596802837/ch07s16.html
    ipv4: /^(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)$/,
    ipv6: /^((([0-9a-f]{1,4}:){7}([0-9a-f]{1,4}|:))|(([0-9a-f]{1,4}:){6}(:[0-9a-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){5}(((:[0-9a-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){4}(((:[0-9a-f]{1,4}){1,3})|((:[0-9a-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){3}(((:[0-9a-f]{1,4}){1,4})|((:[0-9a-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){2}(((:[0-9a-f]{1,4}){1,5})|((:[0-9a-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){1}(((:[0-9a-f]{1,4}){1,6})|((:[0-9a-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9a-f]{1,4}){1,7})|((:[0-9a-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))$/i,
    regex: ue,
    // uuid: http://tools.ietf.org/html/rfc4122
    uuid: /^(?:urn:uuid:)?[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i,
    // JSON-pointer: https://tools.ietf.org/html/rfc6901
    // uri fragment: https://tools.ietf.org/html/rfc3986#appendix-A
    "json-pointer": /^(?:\/(?:[^~/]|~0|~1)*)*$/,
    "json-pointer-uri-fragment": /^#(?:\/(?:[a-z0-9_\-.!$&'()*+,;:=@]|%[0-9a-f]{2}|~0|~1)*)*$/i,
    // relative JSON-pointer: http://tools.ietf.org/html/draft-luff-relative-json-pointer-00
    "relative-json-pointer": /^(?:0|[1-9][0-9]*)(?:#|(?:\/(?:[^~/]|~0|~1)*)*)$/,
    // the following formats are used by the openapi specification: https://spec.openapis.org/oas/v3.0.0#data-types
    // byte: https://github.com/miguelmota/is-base64
    byte: h,
    // signed 32 bit integer
    int32: { type: "number", validate: R },
    // signed 64 bit integer
    int64: { type: "number", validate: I },
    // C-type float
    float: { type: "number", validate: z },
    // C-type double
    double: { type: "number", validate: z },
    // hint to the UI to hide input strings
    password: !0,
    // unchecked string payload
    binary: !0
  }, e.fastFormats = {
    ...e.fullFormats,
    date: t(/^\d\d\d\d-[0-1]\d-[0-3]\d$/, i),
    time: t(/^(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)?$/i, d),
    "date-time": t(/^\d\d\d\d-[0-1]\d-[0-3]\d[t\s](?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)$/i, P),
    // uri: https://github.com/mafintosh/is-my-json-valid/blob/master/formats.js
    uri: /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/)?[^\s]*$/i,
    "uri-reference": /^(?:(?:[a-z][a-z0-9+\-.]*:)?\/?\/)?(?:[^\\\s#][^\s#]*)?(?:#[^\\\s]*)?$/i,
    // email (sources from jsen validator):
    // http://stackoverflow.com/questions/201323/using-a-regular-expression-to-validate-an-email-address#answer-8829363
    // http://www.w3.org/TR/html5/forms.html#valid-e-mail-address (search for 'wilful violation')
    email: /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)*$/i
  }, e.formatNames = Object.keys(e.fullFormats);
  function r(V) {
    return V % 4 === 0 && (V % 100 !== 0 || V % 400 === 0);
  }
  const n = /^(\d\d\d\d)-(\d\d)-(\d\d)$/, s = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  function a(V) {
    const H = n.exec(V);
    if (!H)
      return !1;
    const ne = +H[1], Q = +H[2], de = +H[3];
    return Q >= 1 && Q <= 12 && de >= 1 && de <= (Q === 2 && r(ne) ? 29 : s[Q]);
  }
  function i(V, H) {
    if (V && H)
      return V > H ? 1 : V < H ? -1 : 0;
  }
  const u = /^(\d\d):(\d\d):(\d\d)(\.\d+)?(z|[+-]\d\d(?::?\d\d)?)?$/i;
  function c(V, H) {
    const ne = u.exec(V);
    if (!ne)
      return !1;
    const Q = +ne[1], de = +ne[2], C = +ne[3], k = ne[5];
    return (Q <= 23 && de <= 59 && C <= 59 || Q === 23 && de === 59 && C === 60) && (!H || k !== "");
  }
  function d(V, H) {
    if (!(V && H))
      return;
    const ne = u.exec(V), Q = u.exec(H);
    if (ne && Q)
      return V = ne[1] + ne[2] + ne[3] + (ne[4] || ""), H = Q[1] + Q[2] + Q[3] + (Q[4] || ""), V > H ? 1 : V < H ? -1 : 0;
  }
  const l = /t|\s/i;
  function m(V) {
    const H = V.split(l);
    return H.length === 2 && a(H[0]) && c(H[1], !0);
  }
  function P(V, H) {
    if (!(V && H))
      return;
    const [ne, Q] = V.split(l), [de, C] = H.split(l), k = i(ne, de);
    if (k !== void 0)
      return k || d(Q, C);
  }
  const _ = /\/|:/, w = /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)(?:\?(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i;
  function g(V) {
    return _.test(V) && w.test(V);
  }
  const $ = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/gm;
  function h(V) {
    return $.lastIndex = 0, $.test(V);
  }
  const E = -2147483648, N = 2 ** 31 - 1;
  function R(V) {
    return Number.isInteger(V) && V <= N && V >= E;
  }
  function I(V) {
    return Number.isInteger(V);
  }
  function z() {
    return !0;
  }
  const W = /[^\\]\\Z/;
  function ue(V) {
    if (W.test(V))
      return !1;
    try {
      return new RegExp(V), !0;
    } catch {
      return !1;
    }
  }
})(Cl);
var Dl = {}, Fs = { exports: {} }, Ml = {}, Ze = {}, gr = {}, xr = {}, Z = {}, Xr = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.regexpCode = e.getEsmExportName = e.getProperty = e.safeStringify = e.stringify = e.strConcat = e.addCodeArg = e.str = e._ = e.nil = e._Code = e.Name = e.IDENTIFIER = e._CodeOrName = void 0;
  class t {
  }
  e._CodeOrName = t, e.IDENTIFIER = /^[a-z$_][a-z$_0-9]*$/i;
  class r extends t {
    constructor(E) {
      if (super(), !e.IDENTIFIER.test(E))
        throw new Error("CodeGen: name must be a valid identifier");
      this.str = E;
    }
    toString() {
      return this.str;
    }
    emptyStr() {
      return !1;
    }
    get names() {
      return { [this.str]: 1 };
    }
  }
  e.Name = r;
  class n extends t {
    constructor(E) {
      super(), this._items = typeof E == "string" ? [E] : E;
    }
    toString() {
      return this.str;
    }
    emptyStr() {
      if (this._items.length > 1)
        return !1;
      const E = this._items[0];
      return E === "" || E === '""';
    }
    get str() {
      var E;
      return (E = this._str) !== null && E !== void 0 ? E : this._str = this._items.reduce((N, R) => `${N}${R}`, "");
    }
    get names() {
      var E;
      return (E = this._names) !== null && E !== void 0 ? E : this._names = this._items.reduce((N, R) => (R instanceof r && (N[R.str] = (N[R.str] || 0) + 1), N), {});
    }
  }
  e._Code = n, e.nil = new n("");
  function s(h, ...E) {
    const N = [h[0]];
    let R = 0;
    for (; R < E.length; )
      u(N, E[R]), N.push(h[++R]);
    return new n(N);
  }
  e._ = s;
  const a = new n("+");
  function i(h, ...E) {
    const N = [_(h[0])];
    let R = 0;
    for (; R < E.length; )
      N.push(a), u(N, E[R]), N.push(a, _(h[++R]));
    return c(N), new n(N);
  }
  e.str = i;
  function u(h, E) {
    E instanceof n ? h.push(...E._items) : E instanceof r ? h.push(E) : h.push(m(E));
  }
  e.addCodeArg = u;
  function c(h) {
    let E = 1;
    for (; E < h.length - 1; ) {
      if (h[E] === a) {
        const N = d(h[E - 1], h[E + 1]);
        if (N !== void 0) {
          h.splice(E - 1, 3, N);
          continue;
        }
        h[E++] = "+";
      }
      E++;
    }
  }
  function d(h, E) {
    if (E === '""')
      return h;
    if (h === '""')
      return E;
    if (typeof h == "string")
      return E instanceof r || h[h.length - 1] !== '"' ? void 0 : typeof E != "string" ? `${h.slice(0, -1)}${E}"` : E[0] === '"' ? h.slice(0, -1) + E.slice(1) : void 0;
    if (typeof E == "string" && E[0] === '"' && !(h instanceof r))
      return `"${h}${E.slice(1)}`;
  }
  function l(h, E) {
    return E.emptyStr() ? h : h.emptyStr() ? E : i`${h}${E}`;
  }
  e.strConcat = l;
  function m(h) {
    return typeof h == "number" || typeof h == "boolean" || h === null ? h : _(Array.isArray(h) ? h.join(",") : h);
  }
  function P(h) {
    return new n(_(h));
  }
  e.stringify = P;
  function _(h) {
    return JSON.stringify(h).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
  }
  e.safeStringify = _;
  function w(h) {
    return typeof h == "string" && e.IDENTIFIER.test(h) ? new n(`.${h}`) : s`[${h}]`;
  }
  e.getProperty = w;
  function g(h) {
    if (typeof h == "string" && e.IDENTIFIER.test(h))
      return new n(`${h}`);
    throw new Error(`CodeGen: invalid export name: ${h}, use explicit $id name mapping`);
  }
  e.getEsmExportName = g;
  function $(h) {
    return new n(h.toString());
  }
  e.regexpCode = $;
})(Xr);
var Vs = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.ValueScope = e.ValueScopeName = e.Scope = e.varKinds = e.UsedValueState = void 0;
  const t = Xr;
  class r extends Error {
    constructor(d) {
      super(`CodeGen: "code" for ${d} not defined`), this.value = d.value;
    }
  }
  var n;
  (function(c) {
    c[c.Started = 0] = "Started", c[c.Completed = 1] = "Completed";
  })(n || (e.UsedValueState = n = {})), e.varKinds = {
    const: new t.Name("const"),
    let: new t.Name("let"),
    var: new t.Name("var")
  };
  class s {
    constructor({ prefixes: d, parent: l } = {}) {
      this._names = {}, this._prefixes = d, this._parent = l;
    }
    toName(d) {
      return d instanceof t.Name ? d : this.name(d);
    }
    name(d) {
      return new t.Name(this._newName(d));
    }
    _newName(d) {
      const l = this._names[d] || this._nameGroup(d);
      return `${d}${l.index++}`;
    }
    _nameGroup(d) {
      var l, m;
      if (!((m = (l = this._parent) === null || l === void 0 ? void 0 : l._prefixes) === null || m === void 0) && m.has(d) || this._prefixes && !this._prefixes.has(d))
        throw new Error(`CodeGen: prefix "${d}" is not allowed in this scope`);
      return this._names[d] = { prefix: d, index: 0 };
    }
  }
  e.Scope = s;
  class a extends t.Name {
    constructor(d, l) {
      super(l), this.prefix = d;
    }
    setValue(d, { property: l, itemIndex: m }) {
      this.value = d, this.scopePath = (0, t._)`.${new t.Name(l)}[${m}]`;
    }
  }
  e.ValueScopeName = a;
  const i = (0, t._)`\n`;
  class u extends s {
    constructor(d) {
      super(d), this._values = {}, this._scope = d.scope, this.opts = { ...d, _n: d.lines ? i : t.nil };
    }
    get() {
      return this._scope;
    }
    name(d) {
      return new a(d, this._newName(d));
    }
    value(d, l) {
      var m;
      if (l.ref === void 0)
        throw new Error("CodeGen: ref must be passed in value");
      const P = this.toName(d), { prefix: _ } = P, w = (m = l.key) !== null && m !== void 0 ? m : l.ref;
      let g = this._values[_];
      if (g) {
        const E = g.get(w);
        if (E)
          return E;
      } else
        g = this._values[_] = /* @__PURE__ */ new Map();
      g.set(w, P);
      const $ = this._scope[_] || (this._scope[_] = []), h = $.length;
      return $[h] = l.ref, P.setValue(l, { property: _, itemIndex: h }), P;
    }
    getValue(d, l) {
      const m = this._values[d];
      if (m)
        return m.get(l);
    }
    scopeRefs(d, l = this._values) {
      return this._reduceValues(l, (m) => {
        if (m.scopePath === void 0)
          throw new Error(`CodeGen: name "${m}" has no value`);
        return (0, t._)`${d}${m.scopePath}`;
      });
    }
    scopeCode(d = this._values, l, m) {
      return this._reduceValues(d, (P) => {
        if (P.value === void 0)
          throw new Error(`CodeGen: name "${P}" has no value`);
        return P.value.code;
      }, l, m);
    }
    _reduceValues(d, l, m = {}, P) {
      let _ = t.nil;
      for (const w in d) {
        const g = d[w];
        if (!g)
          continue;
        const $ = m[w] = m[w] || /* @__PURE__ */ new Map();
        g.forEach((h) => {
          if ($.has(h))
            return;
          $.set(h, n.Started);
          let E = l(h);
          if (E) {
            const N = this.opts.es5 ? e.varKinds.var : e.varKinds.const;
            _ = (0, t._)`${_}${N} ${h} = ${E};${this.opts._n}`;
          } else if (E = P == null ? void 0 : P(h))
            _ = (0, t._)`${_}${E}${this.opts._n}`;
          else
            throw new r(h);
          $.set(h, n.Completed);
        });
      }
      return _;
    }
  }
  e.ValueScope = u;
})(Vs);
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.or = e.and = e.not = e.CodeGen = e.operators = e.varKinds = e.ValueScopeName = e.ValueScope = e.Scope = e.Name = e.regexpCode = e.stringify = e.getProperty = e.nil = e.strConcat = e.str = e._ = void 0;
  const t = Xr, r = Vs;
  var n = Xr;
  Object.defineProperty(e, "_", { enumerable: !0, get: function() {
    return n._;
  } }), Object.defineProperty(e, "str", { enumerable: !0, get: function() {
    return n.str;
  } }), Object.defineProperty(e, "strConcat", { enumerable: !0, get: function() {
    return n.strConcat;
  } }), Object.defineProperty(e, "nil", { enumerable: !0, get: function() {
    return n.nil;
  } }), Object.defineProperty(e, "getProperty", { enumerable: !0, get: function() {
    return n.getProperty;
  } }), Object.defineProperty(e, "stringify", { enumerable: !0, get: function() {
    return n.stringify;
  } }), Object.defineProperty(e, "regexpCode", { enumerable: !0, get: function() {
    return n.regexpCode;
  } }), Object.defineProperty(e, "Name", { enumerable: !0, get: function() {
    return n.Name;
  } });
  var s = Vs;
  Object.defineProperty(e, "Scope", { enumerable: !0, get: function() {
    return s.Scope;
  } }), Object.defineProperty(e, "ValueScope", { enumerable: !0, get: function() {
    return s.ValueScope;
  } }), Object.defineProperty(e, "ValueScopeName", { enumerable: !0, get: function() {
    return s.ValueScopeName;
  } }), Object.defineProperty(e, "varKinds", { enumerable: !0, get: function() {
    return s.varKinds;
  } }), e.operators = {
    GT: new t._Code(">"),
    GTE: new t._Code(">="),
    LT: new t._Code("<"),
    LTE: new t._Code("<="),
    EQ: new t._Code("==="),
    NEQ: new t._Code("!=="),
    NOT: new t._Code("!"),
    OR: new t._Code("||"),
    AND: new t._Code("&&"),
    ADD: new t._Code("+")
  };
  class a {
    optimizeNodes() {
      return this;
    }
    optimizeNames(o, f) {
      return this;
    }
  }
  class i extends a {
    constructor(o, f, b) {
      super(), this.varKind = o, this.name = f, this.rhs = b;
    }
    render({ es5: o, _n: f }) {
      const b = o ? r.varKinds.var : this.varKind, j = this.rhs === void 0 ? "" : ` = ${this.rhs}`;
      return `${b} ${this.name}${j};` + f;
    }
    optimizeNames(o, f) {
      if (o[this.name.str])
        return this.rhs && (this.rhs = C(this.rhs, o, f)), this;
    }
    get names() {
      return this.rhs instanceof t._CodeOrName ? this.rhs.names : {};
    }
  }
  class u extends a {
    constructor(o, f, b) {
      super(), this.lhs = o, this.rhs = f, this.sideEffects = b;
    }
    render({ _n: o }) {
      return `${this.lhs} = ${this.rhs};` + o;
    }
    optimizeNames(o, f) {
      if (!(this.lhs instanceof t.Name && !o[this.lhs.str] && !this.sideEffects))
        return this.rhs = C(this.rhs, o, f), this;
    }
    get names() {
      const o = this.lhs instanceof t.Name ? {} : { ...this.lhs.names };
      return de(o, this.rhs);
    }
  }
  class c extends u {
    constructor(o, f, b, j) {
      super(o, b, j), this.op = f;
    }
    render({ _n: o }) {
      return `${this.lhs} ${this.op}= ${this.rhs};` + o;
    }
  }
  class d extends a {
    constructor(o) {
      super(), this.label = o, this.names = {};
    }
    render({ _n: o }) {
      return `${this.label}:` + o;
    }
  }
  class l extends a {
    constructor(o) {
      super(), this.label = o, this.names = {};
    }
    render({ _n: o }) {
      return `break${this.label ? ` ${this.label}` : ""};` + o;
    }
  }
  class m extends a {
    constructor(o) {
      super(), this.error = o;
    }
    render({ _n: o }) {
      return `throw ${this.error};` + o;
    }
    get names() {
      return this.error.names;
    }
  }
  class P extends a {
    constructor(o) {
      super(), this.code = o;
    }
    render({ _n: o }) {
      return `${this.code};` + o;
    }
    optimizeNodes() {
      return `${this.code}` ? this : void 0;
    }
    optimizeNames(o, f) {
      return this.code = C(this.code, o, f), this;
    }
    get names() {
      return this.code instanceof t._CodeOrName ? this.code.names : {};
    }
  }
  class _ extends a {
    constructor(o = []) {
      super(), this.nodes = o;
    }
    render(o) {
      return this.nodes.reduce((f, b) => f + b.render(o), "");
    }
    optimizeNodes() {
      const { nodes: o } = this;
      let f = o.length;
      for (; f--; ) {
        const b = o[f].optimizeNodes();
        Array.isArray(b) ? o.splice(f, 1, ...b) : b ? o[f] = b : o.splice(f, 1);
      }
      return o.length > 0 ? this : void 0;
    }
    optimizeNames(o, f) {
      const { nodes: b } = this;
      let j = b.length;
      for (; j--; ) {
        const A = b[j];
        A.optimizeNames(o, f) || (k(o, A.names), b.splice(j, 1));
      }
      return b.length > 0 ? this : void 0;
    }
    get names() {
      return this.nodes.reduce((o, f) => Q(o, f.names), {});
    }
  }
  class w extends _ {
    render(o) {
      return "{" + o._n + super.render(o) + "}" + o._n;
    }
  }
  class g extends _ {
  }
  class $ extends w {
  }
  $.kind = "else";
  class h extends w {
    constructor(o, f) {
      super(f), this.condition = o;
    }
    render(o) {
      let f = `if(${this.condition})` + super.render(o);
      return this.else && (f += "else " + this.else.render(o)), f;
    }
    optimizeNodes() {
      super.optimizeNodes();
      const o = this.condition;
      if (o === !0)
        return this.nodes;
      let f = this.else;
      if (f) {
        const b = f.optimizeNodes();
        f = this.else = Array.isArray(b) ? new $(b) : b;
      }
      if (f)
        return o === !1 ? f instanceof h ? f : f.nodes : this.nodes.length ? this : new h(U(o), f instanceof h ? [f] : f.nodes);
      if (!(o === !1 || !this.nodes.length))
        return this;
    }
    optimizeNames(o, f) {
      var b;
      if (this.else = (b = this.else) === null || b === void 0 ? void 0 : b.optimizeNames(o, f), !!(super.optimizeNames(o, f) || this.else))
        return this.condition = C(this.condition, o, f), this;
    }
    get names() {
      const o = super.names;
      return de(o, this.condition), this.else && Q(o, this.else.names), o;
    }
  }
  h.kind = "if";
  class E extends w {
  }
  E.kind = "for";
  class N extends E {
    constructor(o) {
      super(), this.iteration = o;
    }
    render(o) {
      return `for(${this.iteration})` + super.render(o);
    }
    optimizeNames(o, f) {
      if (super.optimizeNames(o, f))
        return this.iteration = C(this.iteration, o, f), this;
    }
    get names() {
      return Q(super.names, this.iteration.names);
    }
  }
  class R extends E {
    constructor(o, f, b, j) {
      super(), this.varKind = o, this.name = f, this.from = b, this.to = j;
    }
    render(o) {
      const f = o.es5 ? r.varKinds.var : this.varKind, { name: b, from: j, to: A } = this;
      return `for(${f} ${b}=${j}; ${b}<${A}; ${b}++)` + super.render(o);
    }
    get names() {
      const o = de(super.names, this.from);
      return de(o, this.to);
    }
  }
  class I extends E {
    constructor(o, f, b, j) {
      super(), this.loop = o, this.varKind = f, this.name = b, this.iterable = j;
    }
    render(o) {
      return `for(${this.varKind} ${this.name} ${this.loop} ${this.iterable})` + super.render(o);
    }
    optimizeNames(o, f) {
      if (super.optimizeNames(o, f))
        return this.iterable = C(this.iterable, o, f), this;
    }
    get names() {
      return Q(super.names, this.iterable.names);
    }
  }
  class z extends w {
    constructor(o, f, b) {
      super(), this.name = o, this.args = f, this.async = b;
    }
    render(o) {
      return `${this.async ? "async " : ""}function ${this.name}(${this.args})` + super.render(o);
    }
  }
  z.kind = "func";
  class W extends _ {
    render(o) {
      return "return " + super.render(o);
    }
  }
  W.kind = "return";
  class ue extends w {
    render(o) {
      let f = "try" + super.render(o);
      return this.catch && (f += this.catch.render(o)), this.finally && (f += this.finally.render(o)), f;
    }
    optimizeNodes() {
      var o, f;
      return super.optimizeNodes(), (o = this.catch) === null || o === void 0 || o.optimizeNodes(), (f = this.finally) === null || f === void 0 || f.optimizeNodes(), this;
    }
    optimizeNames(o, f) {
      var b, j;
      return super.optimizeNames(o, f), (b = this.catch) === null || b === void 0 || b.optimizeNames(o, f), (j = this.finally) === null || j === void 0 || j.optimizeNames(o, f), this;
    }
    get names() {
      const o = super.names;
      return this.catch && Q(o, this.catch.names), this.finally && Q(o, this.finally.names), o;
    }
  }
  class V extends w {
    constructor(o) {
      super(), this.error = o;
    }
    render(o) {
      return `catch(${this.error})` + super.render(o);
    }
  }
  V.kind = "catch";
  class H extends w {
    render(o) {
      return "finally" + super.render(o);
    }
  }
  H.kind = "finally";
  class ne {
    constructor(o, f = {}) {
      this._values = {}, this._blockStarts = [], this._constants = {}, this.opts = { ...f, _n: f.lines ? `
` : "" }, this._extScope = o, this._scope = new r.Scope({ parent: o }), this._nodes = [new g()];
    }
    toString() {
      return this._root.render(this.opts);
    }
    // returns unique name in the internal scope
    name(o) {
      return this._scope.name(o);
    }
    // reserves unique name in the external scope
    scopeName(o) {
      return this._extScope.name(o);
    }
    // reserves unique name in the external scope and assigns value to it
    scopeValue(o, f) {
      const b = this._extScope.value(o, f);
      return (this._values[b.prefix] || (this._values[b.prefix] = /* @__PURE__ */ new Set())).add(b), b;
    }
    getScopeValue(o, f) {
      return this._extScope.getValue(o, f);
    }
    // return code that assigns values in the external scope to the names that are used internally
    // (same names that were returned by gen.scopeName or gen.scopeValue)
    scopeRefs(o) {
      return this._extScope.scopeRefs(o, this._values);
    }
    scopeCode() {
      return this._extScope.scopeCode(this._values);
    }
    _def(o, f, b, j) {
      const A = this._scope.toName(f);
      return b !== void 0 && j && (this._constants[A.str] = b), this._leafNode(new i(o, A, b)), A;
    }
    // `const` declaration (`var` in es5 mode)
    const(o, f, b) {
      return this._def(r.varKinds.const, o, f, b);
    }
    // `let` declaration with optional assignment (`var` in es5 mode)
    let(o, f, b) {
      return this._def(r.varKinds.let, o, f, b);
    }
    // `var` declaration with optional assignment
    var(o, f, b) {
      return this._def(r.varKinds.var, o, f, b);
    }
    // assignment code
    assign(o, f, b) {
      return this._leafNode(new u(o, f, b));
    }
    // `+=` code
    add(o, f) {
      return this._leafNode(new c(o, e.operators.ADD, f));
    }
    // appends passed SafeExpr to code or executes Block
    code(o) {
      return typeof o == "function" ? o() : o !== t.nil && this._leafNode(new P(o)), this;
    }
    // returns code for object literal for the passed argument list of key-value pairs
    object(...o) {
      const f = ["{"];
      for (const [b, j] of o)
        f.length > 1 && f.push(","), f.push(b), (b !== j || this.opts.es5) && (f.push(":"), (0, t.addCodeArg)(f, j));
      return f.push("}"), new t._Code(f);
    }
    // `if` clause (or statement if `thenBody` and, optionally, `elseBody` are passed)
    if(o, f, b) {
      if (this._blockNode(new h(o)), f && b)
        this.code(f).else().code(b).endIf();
      else if (f)
        this.code(f).endIf();
      else if (b)
        throw new Error('CodeGen: "else" body without "then" body');
      return this;
    }
    // `else if` clause - invalid without `if` or after `else` clauses
    elseIf(o) {
      return this._elseNode(new h(o));
    }
    // `else` clause - only valid after `if` or `else if` clauses
    else() {
      return this._elseNode(new $());
    }
    // end `if` statement (needed if gen.if was used only with condition)
    endIf() {
      return this._endBlockNode(h, $);
    }
    _for(o, f) {
      return this._blockNode(o), f && this.code(f).endFor(), this;
    }
    // a generic `for` clause (or statement if `forBody` is passed)
    for(o, f) {
      return this._for(new N(o), f);
    }
    // `for` statement for a range of values
    forRange(o, f, b, j, A = this.opts.es5 ? r.varKinds.var : r.varKinds.let) {
      const q = this._scope.toName(o);
      return this._for(new R(A, q, f, b), () => j(q));
    }
    // `for-of` statement (in es5 mode replace with a normal for loop)
    forOf(o, f, b, j = r.varKinds.const) {
      const A = this._scope.toName(o);
      if (this.opts.es5) {
        const q = f instanceof t.Name ? f : this.var("_arr", f);
        return this.forRange("_i", 0, (0, t._)`${q}.length`, (F) => {
          this.var(A, (0, t._)`${q}[${F}]`), b(A);
        });
      }
      return this._for(new I("of", j, A, f), () => b(A));
    }
    // `for-in` statement.
    // With option `ownProperties` replaced with a `for-of` loop for object keys
    forIn(o, f, b, j = this.opts.es5 ? r.varKinds.var : r.varKinds.const) {
      if (this.opts.ownProperties)
        return this.forOf(o, (0, t._)`Object.keys(${f})`, b);
      const A = this._scope.toName(o);
      return this._for(new I("in", j, A, f), () => b(A));
    }
    // end `for` loop
    endFor() {
      return this._endBlockNode(E);
    }
    // `label` statement
    label(o) {
      return this._leafNode(new d(o));
    }
    // `break` statement
    break(o) {
      return this._leafNode(new l(o));
    }
    // `return` statement
    return(o) {
      const f = new W();
      if (this._blockNode(f), this.code(o), f.nodes.length !== 1)
        throw new Error('CodeGen: "return" should have one node');
      return this._endBlockNode(W);
    }
    // `try` statement
    try(o, f, b) {
      if (!f && !b)
        throw new Error('CodeGen: "try" without "catch" and "finally"');
      const j = new ue();
      if (this._blockNode(j), this.code(o), f) {
        const A = this.name("e");
        this._currNode = j.catch = new V(A), f(A);
      }
      return b && (this._currNode = j.finally = new H(), this.code(b)), this._endBlockNode(V, H);
    }
    // `throw` statement
    throw(o) {
      return this._leafNode(new m(o));
    }
    // start self-balancing block
    block(o, f) {
      return this._blockStarts.push(this._nodes.length), o && this.code(o).endBlock(f), this;
    }
    // end the current self-balancing block
    endBlock(o) {
      const f = this._blockStarts.pop();
      if (f === void 0)
        throw new Error("CodeGen: not in self-balancing block");
      const b = this._nodes.length - f;
      if (b < 0 || o !== void 0 && b !== o)
        throw new Error(`CodeGen: wrong number of nodes: ${b} vs ${o} expected`);
      return this._nodes.length = f, this;
    }
    // `function` heading (or definition if funcBody is passed)
    func(o, f = t.nil, b, j) {
      return this._blockNode(new z(o, f, b)), j && this.code(j).endFunc(), this;
    }
    // end function definition
    endFunc() {
      return this._endBlockNode(z);
    }
    optimize(o = 1) {
      for (; o-- > 0; )
        this._root.optimizeNodes(), this._root.optimizeNames(this._root.names, this._constants);
    }
    _leafNode(o) {
      return this._currNode.nodes.push(o), this;
    }
    _blockNode(o) {
      this._currNode.nodes.push(o), this._nodes.push(o);
    }
    _endBlockNode(o, f) {
      const b = this._currNode;
      if (b instanceof o || f && b instanceof f)
        return this._nodes.pop(), this;
      throw new Error(`CodeGen: not in block "${f ? `${o.kind}/${f.kind}` : o.kind}"`);
    }
    _elseNode(o) {
      const f = this._currNode;
      if (!(f instanceof h))
        throw new Error('CodeGen: "else" without "if"');
      return this._currNode = f.else = o, this;
    }
    get _root() {
      return this._nodes[0];
    }
    get _currNode() {
      const o = this._nodes;
      return o[o.length - 1];
    }
    set _currNode(o) {
      const f = this._nodes;
      f[f.length - 1] = o;
    }
  }
  e.CodeGen = ne;
  function Q(y, o) {
    for (const f in o)
      y[f] = (y[f] || 0) + (o[f] || 0);
    return y;
  }
  function de(y, o) {
    return o instanceof t._CodeOrName ? Q(y, o.names) : y;
  }
  function C(y, o, f) {
    if (y instanceof t.Name)
      return b(y);
    if (!j(y))
      return y;
    return new t._Code(y._items.reduce((A, q) => (q instanceof t.Name && (q = b(q)), q instanceof t._Code ? A.push(...q._items) : A.push(q), A), []));
    function b(A) {
      const q = f[A.str];
      return q === void 0 || o[A.str] !== 1 ? A : (delete o[A.str], q);
    }
    function j(A) {
      return A instanceof t._Code && A._items.some((q) => q instanceof t.Name && o[q.str] === 1 && f[q.str] !== void 0);
    }
  }
  function k(y, o) {
    for (const f in o)
      y[f] = (y[f] || 0) - (o[f] || 0);
  }
  function U(y) {
    return typeof y == "boolean" || typeof y == "number" || y === null ? !y : (0, t._)`!${S(y)}`;
  }
  e.not = U;
  const D = p(e.operators.AND);
  function O(...y) {
    return y.reduce(D);
  }
  e.and = O;
  const T = p(e.operators.OR);
  function v(...y) {
    return y.reduce(T);
  }
  e.or = v;
  function p(y) {
    return (o, f) => o === t.nil ? f : f === t.nil ? o : (0, t._)`${S(o)} ${y} ${S(f)}`;
  }
  function S(y) {
    return y instanceof t.Name ? y : (0, t._)`(${y})`;
  }
})(Z);
var L = {};
Object.defineProperty(L, "__esModule", { value: !0 });
L.checkStrictMode = L.getErrorPath = L.Type = L.useFunc = L.setEvaluated = L.evaluatedPropsToName = L.mergeEvaluated = L.eachItem = L.unescapeJsonPointer = L.escapeJsonPointer = L.escapeFragment = L.unescapeFragment = L.schemaRefOrVal = L.schemaHasRulesButRef = L.schemaHasRules = L.checkUnknownRules = L.alwaysValidSchema = L.toHash = void 0;
const ce = Z, gy = Xr;
function vy(e) {
  const t = {};
  for (const r of e)
    t[r] = !0;
  return t;
}
L.toHash = vy;
function Ey(e, t) {
  return typeof t == "boolean" ? t : Object.keys(t).length === 0 ? !0 : (Ll(e, t), !Fl(t, e.self.RULES.all));
}
L.alwaysValidSchema = Ey;
function Ll(e, t = e.schema) {
  const { opts: r, self: n } = e;
  if (!r.strictSchema || typeof t == "boolean")
    return;
  const s = n.RULES.keywords;
  for (const a in t)
    s[a] || zl(e, `unknown keyword: "${a}"`);
}
L.checkUnknownRules = Ll;
function Fl(e, t) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (t[r])
      return !0;
  return !1;
}
L.schemaHasRules = Fl;
function wy(e, t) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (r !== "$ref" && t.all[r])
      return !0;
  return !1;
}
L.schemaHasRulesButRef = wy;
function Sy({ topSchemaRef: e, schemaPath: t }, r, n, s) {
  if (!s) {
    if (typeof r == "number" || typeof r == "boolean")
      return r;
    if (typeof r == "string")
      return (0, ce._)`${r}`;
  }
  return (0, ce._)`${e}${t}${(0, ce.getProperty)(n)}`;
}
L.schemaRefOrVal = Sy;
function by(e) {
  return Vl(decodeURIComponent(e));
}
L.unescapeFragment = by;
function Py(e) {
  return encodeURIComponent(xa(e));
}
L.escapeFragment = Py;
function xa(e) {
  return typeof e == "number" ? `${e}` : e.replace(/~/g, "~0").replace(/\//g, "~1");
}
L.escapeJsonPointer = xa;
function Vl(e) {
  return e.replace(/~1/g, "/").replace(/~0/g, "~");
}
L.unescapeJsonPointer = Vl;
function Ny(e, t) {
  if (Array.isArray(e))
    for (const r of e)
      t(r);
  else
    t(e);
}
L.eachItem = Ny;
function Pi({ mergeNames: e, mergeToName: t, mergeValues: r, resultToName: n }) {
  return (s, a, i, u) => {
    const c = i === void 0 ? a : i instanceof ce.Name ? (a instanceof ce.Name ? e(s, a, i) : t(s, a, i), i) : a instanceof ce.Name ? (t(s, i, a), a) : r(a, i);
    return u === ce.Name && !(c instanceof ce.Name) ? n(s, c) : c;
  };
}
L.mergeEvaluated = {
  props: Pi({
    mergeNames: (e, t, r) => e.if((0, ce._)`${r} !== true && ${t} !== undefined`, () => {
      e.if((0, ce._)`${t} === true`, () => e.assign(r, !0), () => e.assign(r, (0, ce._)`${r} || {}`).code((0, ce._)`Object.assign(${r}, ${t})`));
    }),
    mergeToName: (e, t, r) => e.if((0, ce._)`${r} !== true`, () => {
      t === !0 ? e.assign(r, !0) : (e.assign(r, (0, ce._)`${r} || {}`), eo(e, r, t));
    }),
    mergeValues: (e, t) => e === !0 ? !0 : { ...e, ...t },
    resultToName: Ul
  }),
  items: Pi({
    mergeNames: (e, t, r) => e.if((0, ce._)`${r} !== true && ${t} !== undefined`, () => e.assign(r, (0, ce._)`${t} === true ? true : ${r} > ${t} ? ${r} : ${t}`)),
    mergeToName: (e, t, r) => e.if((0, ce._)`${r} !== true`, () => e.assign(r, t === !0 ? !0 : (0, ce._)`${r} > ${t} ? ${r} : ${t}`)),
    mergeValues: (e, t) => e === !0 ? !0 : Math.max(e, t),
    resultToName: (e, t) => e.var("items", t)
  })
};
function Ul(e, t) {
  if (t === !0)
    return e.var("props", !0);
  const r = e.var("props", (0, ce._)`{}`);
  return t !== void 0 && eo(e, r, t), r;
}
L.evaluatedPropsToName = Ul;
function eo(e, t, r) {
  Object.keys(r).forEach((n) => e.assign((0, ce._)`${t}${(0, ce.getProperty)(n)}`, !0));
}
L.setEvaluated = eo;
const Ni = {};
function Oy(e, t) {
  return e.scopeValue("func", {
    ref: t,
    code: Ni[t.code] || (Ni[t.code] = new gy._Code(t.code))
  });
}
L.useFunc = Oy;
var Us;
(function(e) {
  e[e.Num = 0] = "Num", e[e.Str = 1] = "Str";
})(Us || (L.Type = Us = {}));
function Ry(e, t, r) {
  if (e instanceof ce.Name) {
    const n = t === Us.Num;
    return r ? n ? (0, ce._)`"[" + ${e} + "]"` : (0, ce._)`"['" + ${e} + "']"` : n ? (0, ce._)`"/" + ${e}` : (0, ce._)`"/" + ${e}.replace(/~/g, "~0").replace(/\\//g, "~1")`;
  }
  return r ? (0, ce.getProperty)(e).toString() : "/" + xa(e);
}
L.getErrorPath = Ry;
function zl(e, t, r = e.opts.strictSchema) {
  if (r) {
    if (t = `strict mode: ${t}`, r === !0)
      throw new Error(t);
    e.self.logger.warn(t);
  }
}
L.checkStrictMode = zl;
var lt = {};
Object.defineProperty(lt, "__esModule", { value: !0 });
const Ne = Z, Ty = {
  // validation function arguments
  data: new Ne.Name("data"),
  // data passed to validation function
  // args passed from referencing schema
  valCxt: new Ne.Name("valCxt"),
  // validation/data context - should not be used directly, it is destructured to the names below
  instancePath: new Ne.Name("instancePath"),
  parentData: new Ne.Name("parentData"),
  parentDataProperty: new Ne.Name("parentDataProperty"),
  rootData: new Ne.Name("rootData"),
  // root data - same as the data passed to the first/top validation function
  dynamicAnchors: new Ne.Name("dynamicAnchors"),
  // used to support recursiveRef and dynamicRef
  // function scoped variables
  vErrors: new Ne.Name("vErrors"),
  // null or array of validation errors
  errors: new Ne.Name("errors"),
  // counter of validation errors
  this: new Ne.Name("this"),
  // "globals"
  self: new Ne.Name("self"),
  scope: new Ne.Name("scope"),
  // JTD serialize/parse name for JSON string and position
  json: new Ne.Name("json"),
  jsonPos: new Ne.Name("jsonPos"),
  jsonLen: new Ne.Name("jsonLen"),
  jsonPart: new Ne.Name("jsonPart")
};
lt.default = Ty;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.extendErrors = e.resetErrorsCount = e.reportExtraError = e.reportError = e.keyword$DataError = e.keywordError = void 0;
  const t = Z, r = L, n = lt;
  e.keywordError = {
    message: ({ keyword: $ }) => (0, t.str)`must pass "${$}" keyword validation`
  }, e.keyword$DataError = {
    message: ({ keyword: $, schemaType: h }) => h ? (0, t.str)`"${$}" keyword must be ${h} ($data)` : (0, t.str)`"${$}" keyword is invalid ($data)`
  };
  function s($, h = e.keywordError, E, N) {
    const { it: R } = $, { gen: I, compositeRule: z, allErrors: W } = R, ue = m($, h, E);
    N ?? (z || W) ? c(I, ue) : d(R, (0, t._)`[${ue}]`);
  }
  e.reportError = s;
  function a($, h = e.keywordError, E) {
    const { it: N } = $, { gen: R, compositeRule: I, allErrors: z } = N, W = m($, h, E);
    c(R, W), I || z || d(N, n.default.vErrors);
  }
  e.reportExtraError = a;
  function i($, h) {
    $.assign(n.default.errors, h), $.if((0, t._)`${n.default.vErrors} !== null`, () => $.if(h, () => $.assign((0, t._)`${n.default.vErrors}.length`, h), () => $.assign(n.default.vErrors, null)));
  }
  e.resetErrorsCount = i;
  function u({ gen: $, keyword: h, schemaValue: E, data: N, errsCount: R, it: I }) {
    if (R === void 0)
      throw new Error("ajv implementation error");
    const z = $.name("err");
    $.forRange("i", R, n.default.errors, (W) => {
      $.const(z, (0, t._)`${n.default.vErrors}[${W}]`), $.if((0, t._)`${z}.instancePath === undefined`, () => $.assign((0, t._)`${z}.instancePath`, (0, t.strConcat)(n.default.instancePath, I.errorPath))), $.assign((0, t._)`${z}.schemaPath`, (0, t.str)`${I.errSchemaPath}/${h}`), I.opts.verbose && ($.assign((0, t._)`${z}.schema`, E), $.assign((0, t._)`${z}.data`, N));
    });
  }
  e.extendErrors = u;
  function c($, h) {
    const E = $.const("err", h);
    $.if((0, t._)`${n.default.vErrors} === null`, () => $.assign(n.default.vErrors, (0, t._)`[${E}]`), (0, t._)`${n.default.vErrors}.push(${E})`), $.code((0, t._)`${n.default.errors}++`);
  }
  function d($, h) {
    const { gen: E, validateName: N, schemaEnv: R } = $;
    R.$async ? E.throw((0, t._)`new ${$.ValidationError}(${h})`) : (E.assign((0, t._)`${N}.errors`, h), E.return(!1));
  }
  const l = {
    keyword: new t.Name("keyword"),
    schemaPath: new t.Name("schemaPath"),
    // also used in JTD errors
    params: new t.Name("params"),
    propertyName: new t.Name("propertyName"),
    message: new t.Name("message"),
    schema: new t.Name("schema"),
    parentSchema: new t.Name("parentSchema")
  };
  function m($, h, E) {
    const { createErrors: N } = $.it;
    return N === !1 ? (0, t._)`{}` : P($, h, E);
  }
  function P($, h, E = {}) {
    const { gen: N, it: R } = $, I = [
      _(R, E),
      w($, E)
    ];
    return g($, h, I), N.object(...I);
  }
  function _({ errorPath: $ }, { instancePath: h }) {
    const E = h ? (0, t.str)`${$}${(0, r.getErrorPath)(h, r.Type.Str)}` : $;
    return [n.default.instancePath, (0, t.strConcat)(n.default.instancePath, E)];
  }
  function w({ keyword: $, it: { errSchemaPath: h } }, { schemaPath: E, parentSchema: N }) {
    let R = N ? h : (0, t.str)`${h}/${$}`;
    return E && (R = (0, t.str)`${R}${(0, r.getErrorPath)(E, r.Type.Str)}`), [l.schemaPath, R];
  }
  function g($, { params: h, message: E }, N) {
    const { keyword: R, data: I, schemaValue: z, it: W } = $, { opts: ue, propertyName: V, topSchemaRef: H, schemaPath: ne } = W;
    N.push([l.keyword, R], [l.params, typeof h == "function" ? h($) : h || (0, t._)`{}`]), ue.messages && N.push([l.message, typeof E == "function" ? E($) : E]), ue.verbose && N.push([l.schema, z], [l.parentSchema, (0, t._)`${H}${ne}`], [n.default.data, I]), V && N.push([l.propertyName, V]);
  }
})(xr);
Object.defineProperty(gr, "__esModule", { value: !0 });
gr.boolOrEmptySchema = gr.topBoolOrEmptySchema = void 0;
const Iy = xr, jy = Z, Ay = lt, ky = {
  message: "boolean schema is false"
};
function Cy(e) {
  const { gen: t, schema: r, validateName: n } = e;
  r === !1 ? ql(e, !1) : typeof r == "object" && r.$async === !0 ? t.return(Ay.default.data) : (t.assign((0, jy._)`${n}.errors`, null), t.return(!0));
}
gr.topBoolOrEmptySchema = Cy;
function Dy(e, t) {
  const { gen: r, schema: n } = e;
  n === !1 ? (r.var(t, !1), ql(e)) : r.var(t, !0);
}
gr.boolOrEmptySchema = Dy;
function ql(e, t) {
  const { gen: r, data: n } = e, s = {
    gen: r,
    keyword: "false schema",
    data: n,
    schema: !1,
    schemaCode: !1,
    schemaValue: !1,
    params: {},
    it: e
  };
  (0, Iy.reportError)(s, ky, void 0, t);
}
var _e = {}, xt = {};
Object.defineProperty(xt, "__esModule", { value: !0 });
xt.getRules = xt.isJSONType = void 0;
const My = ["string", "number", "integer", "boolean", "null", "object", "array"], Ly = new Set(My);
function Fy(e) {
  return typeof e == "string" && Ly.has(e);
}
xt.isJSONType = Fy;
function Vy() {
  const e = {
    number: { type: "number", rules: [] },
    string: { type: "string", rules: [] },
    array: { type: "array", rules: [] },
    object: { type: "object", rules: [] }
  };
  return {
    types: { ...e, integer: !0, boolean: !0, null: !0 },
    rules: [{ rules: [] }, e.number, e.string, e.array, e.object],
    post: { rules: [] },
    all: {},
    keywords: {}
  };
}
xt.getRules = Vy;
var ht = {};
Object.defineProperty(ht, "__esModule", { value: !0 });
ht.shouldUseRule = ht.shouldUseGroup = ht.schemaHasRulesForType = void 0;
function Uy({ schema: e, self: t }, r) {
  const n = t.RULES.types[r];
  return n && n !== !0 && Kl(e, n);
}
ht.schemaHasRulesForType = Uy;
function Kl(e, t) {
  return t.rules.some((r) => Gl(e, r));
}
ht.shouldUseGroup = Kl;
function Gl(e, t) {
  var r;
  return e[t.keyword] !== void 0 || ((r = t.definition.implements) === null || r === void 0 ? void 0 : r.some((n) => e[n] !== void 0));
}
ht.shouldUseRule = Gl;
Object.defineProperty(_e, "__esModule", { value: !0 });
_e.reportTypeError = _e.checkDataTypes = _e.checkDataType = _e.coerceAndCheckDataType = _e.getJSONTypes = _e.getSchemaTypes = _e.DataType = void 0;
const zy = xt, qy = ht, Ky = xr, Y = Z, Hl = L;
var hr;
(function(e) {
  e[e.Correct = 0] = "Correct", e[e.Wrong = 1] = "Wrong";
})(hr || (_e.DataType = hr = {}));
function Gy(e) {
  const t = Wl(e.type);
  if (t.includes("null")) {
    if (e.nullable === !1)
      throw new Error("type: null contradicts nullable: false");
  } else {
    if (!t.length && e.nullable !== void 0)
      throw new Error('"nullable" cannot be used without "type"');
    e.nullable === !0 && t.push("null");
  }
  return t;
}
_e.getSchemaTypes = Gy;
function Wl(e) {
  const t = Array.isArray(e) ? e : e ? [e] : [];
  if (t.every(zy.isJSONType))
    return t;
  throw new Error("type must be JSONType or JSONType[]: " + t.join(","));
}
_e.getJSONTypes = Wl;
function Hy(e, t) {
  const { gen: r, data: n, opts: s } = e, a = Wy(t, s.coerceTypes), i = t.length > 0 && !(a.length === 0 && t.length === 1 && (0, qy.schemaHasRulesForType)(e, t[0]));
  if (i) {
    const u = to(t, n, s.strictNumbers, hr.Wrong);
    r.if(u, () => {
      a.length ? By(e, t, a) : ro(e);
    });
  }
  return i;
}
_e.coerceAndCheckDataType = Hy;
const Bl = /* @__PURE__ */ new Set(["string", "number", "integer", "boolean", "null"]);
function Wy(e, t) {
  return t ? e.filter((r) => Bl.has(r) || t === "array" && r === "array") : [];
}
function By(e, t, r) {
  const { gen: n, data: s, opts: a } = e, i = n.let("dataType", (0, Y._)`typeof ${s}`), u = n.let("coerced", (0, Y._)`undefined`);
  a.coerceTypes === "array" && n.if((0, Y._)`${i} == 'object' && Array.isArray(${s}) && ${s}.length == 1`, () => n.assign(s, (0, Y._)`${s}[0]`).assign(i, (0, Y._)`typeof ${s}`).if(to(t, s, a.strictNumbers), () => n.assign(u, s))), n.if((0, Y._)`${u} !== undefined`);
  for (const d of r)
    (Bl.has(d) || d === "array" && a.coerceTypes === "array") && c(d);
  n.else(), ro(e), n.endIf(), n.if((0, Y._)`${u} !== undefined`, () => {
    n.assign(s, u), Jy(e, u);
  });
  function c(d) {
    switch (d) {
      case "string":
        n.elseIf((0, Y._)`${i} == "number" || ${i} == "boolean"`).assign(u, (0, Y._)`"" + ${s}`).elseIf((0, Y._)`${s} === null`).assign(u, (0, Y._)`""`);
        return;
      case "number":
        n.elseIf((0, Y._)`${i} == "boolean" || ${s} === null
              || (${i} == "string" && ${s} && ${s} == +${s})`).assign(u, (0, Y._)`+${s}`);
        return;
      case "integer":
        n.elseIf((0, Y._)`${i} === "boolean" || ${s} === null
              || (${i} === "string" && ${s} && ${s} == +${s} && !(${s} % 1))`).assign(u, (0, Y._)`+${s}`);
        return;
      case "boolean":
        n.elseIf((0, Y._)`${s} === "false" || ${s} === 0 || ${s} === null`).assign(u, !1).elseIf((0, Y._)`${s} === "true" || ${s} === 1`).assign(u, !0);
        return;
      case "null":
        n.elseIf((0, Y._)`${s} === "" || ${s} === 0 || ${s} === false`), n.assign(u, null);
        return;
      case "array":
        n.elseIf((0, Y._)`${i} === "string" || ${i} === "number"
              || ${i} === "boolean" || ${s} === null`).assign(u, (0, Y._)`[${s}]`);
    }
  }
}
function Jy({ gen: e, parentData: t, parentDataProperty: r }, n) {
  e.if((0, Y._)`${t} !== undefined`, () => e.assign((0, Y._)`${t}[${r}]`, n));
}
function zs(e, t, r, n = hr.Correct) {
  const s = n === hr.Correct ? Y.operators.EQ : Y.operators.NEQ;
  let a;
  switch (e) {
    case "null":
      return (0, Y._)`${t} ${s} null`;
    case "array":
      a = (0, Y._)`Array.isArray(${t})`;
      break;
    case "object":
      a = (0, Y._)`${t} && typeof ${t} == "object" && !Array.isArray(${t})`;
      break;
    case "integer":
      a = i((0, Y._)`!(${t} % 1) && !isNaN(${t})`);
      break;
    case "number":
      a = i();
      break;
    default:
      return (0, Y._)`typeof ${t} ${s} ${e}`;
  }
  return n === hr.Correct ? a : (0, Y.not)(a);
  function i(u = Y.nil) {
    return (0, Y.and)((0, Y._)`typeof ${t} == "number"`, u, r ? (0, Y._)`isFinite(${t})` : Y.nil);
  }
}
_e.checkDataType = zs;
function to(e, t, r, n) {
  if (e.length === 1)
    return zs(e[0], t, r, n);
  let s;
  const a = (0, Hl.toHash)(e);
  if (a.array && a.object) {
    const i = (0, Y._)`typeof ${t} != "object"`;
    s = a.null ? i : (0, Y._)`!${t} || ${i}`, delete a.null, delete a.array, delete a.object;
  } else
    s = Y.nil;
  a.number && delete a.integer;
  for (const i in a)
    s = (0, Y.and)(s, zs(i, t, r, n));
  return s;
}
_e.checkDataTypes = to;
const Xy = {
  message: ({ schema: e }) => `must be ${e}`,
  params: ({ schema: e, schemaValue: t }) => typeof e == "string" ? (0, Y._)`{type: ${e}}` : (0, Y._)`{type: ${t}}`
};
function ro(e) {
  const t = Yy(e);
  (0, Ky.reportError)(t, Xy);
}
_e.reportTypeError = ro;
function Yy(e) {
  const { gen: t, data: r, schema: n } = e, s = (0, Hl.schemaRefOrVal)(e, n, "type");
  return {
    gen: t,
    keyword: "type",
    data: r,
    schema: n.type,
    schemaCode: s,
    schemaValue: s,
    parentSchema: n,
    params: {},
    it: e
  };
}
var xn = {};
Object.defineProperty(xn, "__esModule", { value: !0 });
xn.assignDefaults = void 0;
const sr = Z, Qy = L;
function Zy(e, t) {
  const { properties: r, items: n } = e.schema;
  if (t === "object" && r)
    for (const s in r)
      Oi(e, s, r[s].default);
  else t === "array" && Array.isArray(n) && n.forEach((s, a) => Oi(e, a, s.default));
}
xn.assignDefaults = Zy;
function Oi(e, t, r) {
  const { gen: n, compositeRule: s, data: a, opts: i } = e;
  if (r === void 0)
    return;
  const u = (0, sr._)`${a}${(0, sr.getProperty)(t)}`;
  if (s) {
    (0, Qy.checkStrictMode)(e, `default is ignored for: ${u}`);
    return;
  }
  let c = (0, sr._)`${u} === undefined`;
  i.useDefaults === "empty" && (c = (0, sr._)`${c} || ${u} === null || ${u} === ""`), n.if(c, (0, sr._)`${u} = ${(0, sr.stringify)(r)}`);
}
var it = {}, ee = {};
Object.defineProperty(ee, "__esModule", { value: !0 });
ee.validateUnion = ee.validateArray = ee.usePattern = ee.callValidateCode = ee.schemaProperties = ee.allSchemaProperties = ee.noPropertyInData = ee.propertyInData = ee.isOwnProperty = ee.hasPropFunc = ee.reportMissingProp = ee.checkMissingProp = ee.checkReportMissingProp = void 0;
const he = Z, no = L, _t = lt, xy = L;
function e$(e, t) {
  const { gen: r, data: n, it: s } = e;
  r.if(ao(r, n, t, s.opts.ownProperties), () => {
    e.setParams({ missingProperty: (0, he._)`${t}` }, !0), e.error();
  });
}
ee.checkReportMissingProp = e$;
function t$({ gen: e, data: t, it: { opts: r } }, n, s) {
  return (0, he.or)(...n.map((a) => (0, he.and)(ao(e, t, a, r.ownProperties), (0, he._)`${s} = ${a}`)));
}
ee.checkMissingProp = t$;
function r$(e, t) {
  e.setParams({ missingProperty: t }, !0), e.error();
}
ee.reportMissingProp = r$;
function Jl(e) {
  return e.scopeValue("func", {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    ref: Object.prototype.hasOwnProperty,
    code: (0, he._)`Object.prototype.hasOwnProperty`
  });
}
ee.hasPropFunc = Jl;
function so(e, t, r) {
  return (0, he._)`${Jl(e)}.call(${t}, ${r})`;
}
ee.isOwnProperty = so;
function n$(e, t, r, n) {
  const s = (0, he._)`${t}${(0, he.getProperty)(r)} !== undefined`;
  return n ? (0, he._)`${s} && ${so(e, t, r)}` : s;
}
ee.propertyInData = n$;
function ao(e, t, r, n) {
  const s = (0, he._)`${t}${(0, he.getProperty)(r)} === undefined`;
  return n ? (0, he.or)(s, (0, he.not)(so(e, t, r))) : s;
}
ee.noPropertyInData = ao;
function Xl(e) {
  return e ? Object.keys(e).filter((t) => t !== "__proto__") : [];
}
ee.allSchemaProperties = Xl;
function s$(e, t) {
  return Xl(t).filter((r) => !(0, no.alwaysValidSchema)(e, t[r]));
}
ee.schemaProperties = s$;
function a$({ schemaCode: e, data: t, it: { gen: r, topSchemaRef: n, schemaPath: s, errorPath: a }, it: i }, u, c, d) {
  const l = d ? (0, he._)`${e}, ${t}, ${n}${s}` : t, m = [
    [_t.default.instancePath, (0, he.strConcat)(_t.default.instancePath, a)],
    [_t.default.parentData, i.parentData],
    [_t.default.parentDataProperty, i.parentDataProperty],
    [_t.default.rootData, _t.default.rootData]
  ];
  i.opts.dynamicRef && m.push([_t.default.dynamicAnchors, _t.default.dynamicAnchors]);
  const P = (0, he._)`${l}, ${r.object(...m)}`;
  return c !== he.nil ? (0, he._)`${u}.call(${c}, ${P})` : (0, he._)`${u}(${P})`;
}
ee.callValidateCode = a$;
const o$ = (0, he._)`new RegExp`;
function i$({ gen: e, it: { opts: t } }, r) {
  const n = t.unicodeRegExp ? "u" : "", { regExp: s } = t.code, a = s(r, n);
  return e.scopeValue("pattern", {
    key: a.toString(),
    ref: a,
    code: (0, he._)`${s.code === "new RegExp" ? o$ : (0, xy.useFunc)(e, s)}(${r}, ${n})`
  });
}
ee.usePattern = i$;
function c$(e) {
  const { gen: t, data: r, keyword: n, it: s } = e, a = t.name("valid");
  if (s.allErrors) {
    const u = t.let("valid", !0);
    return i(() => t.assign(u, !1)), u;
  }
  return t.var(a, !0), i(() => t.break()), a;
  function i(u) {
    const c = t.const("len", (0, he._)`${r}.length`);
    t.forRange("i", 0, c, (d) => {
      e.subschema({
        keyword: n,
        dataProp: d,
        dataPropType: no.Type.Num
      }, a), t.if((0, he.not)(a), u);
    });
  }
}
ee.validateArray = c$;
function l$(e) {
  const { gen: t, schema: r, keyword: n, it: s } = e;
  if (!Array.isArray(r))
    throw new Error("ajv implementation error");
  if (r.some((c) => (0, no.alwaysValidSchema)(s, c)) && !s.opts.unevaluated)
    return;
  const i = t.let("valid", !1), u = t.name("_valid");
  t.block(() => r.forEach((c, d) => {
    const l = e.subschema({
      keyword: n,
      schemaProp: d,
      compositeRule: !0
    }, u);
    t.assign(i, (0, he._)`${i} || ${u}`), e.mergeValidEvaluated(l, u) || t.if((0, he.not)(i));
  })), e.result(i, () => e.reset(), () => e.error(!0));
}
ee.validateUnion = l$;
Object.defineProperty(it, "__esModule", { value: !0 });
it.validateKeywordUsage = it.validSchemaType = it.funcKeywordCode = it.macroKeywordCode = void 0;
const Ie = Z, Jt = lt, u$ = ee, d$ = xr;
function f$(e, t) {
  const { gen: r, keyword: n, schema: s, parentSchema: a, it: i } = e, u = t.macro.call(i.self, s, a, i), c = Yl(r, n, u);
  i.opts.validateSchema !== !1 && i.self.validateSchema(u, !0);
  const d = r.name("valid");
  e.subschema({
    schema: u,
    schemaPath: Ie.nil,
    errSchemaPath: `${i.errSchemaPath}/${n}`,
    topSchemaRef: c,
    compositeRule: !0
  }, d), e.pass(d, () => e.error(!0));
}
it.macroKeywordCode = f$;
function h$(e, t) {
  var r;
  const { gen: n, keyword: s, schema: a, parentSchema: i, $data: u, it: c } = e;
  p$(c, t);
  const d = !u && t.compile ? t.compile.call(c.self, a, i, c) : t.validate, l = Yl(n, s, d), m = n.let("valid");
  e.block$data(m, P), e.ok((r = t.valid) !== null && r !== void 0 ? r : m);
  function P() {
    if (t.errors === !1)
      g(), t.modifying && Ri(e), $(() => e.error());
    else {
      const h = t.async ? _() : w();
      t.modifying && Ri(e), $(() => m$(e, h));
    }
  }
  function _() {
    const h = n.let("ruleErrs", null);
    return n.try(() => g((0, Ie._)`await `), (E) => n.assign(m, !1).if((0, Ie._)`${E} instanceof ${c.ValidationError}`, () => n.assign(h, (0, Ie._)`${E}.errors`), () => n.throw(E))), h;
  }
  function w() {
    const h = (0, Ie._)`${l}.errors`;
    return n.assign(h, null), g(Ie.nil), h;
  }
  function g(h = t.async ? (0, Ie._)`await ` : Ie.nil) {
    const E = c.opts.passContext ? Jt.default.this : Jt.default.self, N = !("compile" in t && !u || t.schema === !1);
    n.assign(m, (0, Ie._)`${h}${(0, u$.callValidateCode)(e, l, E, N)}`, t.modifying);
  }
  function $(h) {
    var E;
    n.if((0, Ie.not)((E = t.valid) !== null && E !== void 0 ? E : m), h);
  }
}
it.funcKeywordCode = h$;
function Ri(e) {
  const { gen: t, data: r, it: n } = e;
  t.if(n.parentData, () => t.assign(r, (0, Ie._)`${n.parentData}[${n.parentDataProperty}]`));
}
function m$(e, t) {
  const { gen: r } = e;
  r.if((0, Ie._)`Array.isArray(${t})`, () => {
    r.assign(Jt.default.vErrors, (0, Ie._)`${Jt.default.vErrors} === null ? ${t} : ${Jt.default.vErrors}.concat(${t})`).assign(Jt.default.errors, (0, Ie._)`${Jt.default.vErrors}.length`), (0, d$.extendErrors)(e);
  }, () => e.error());
}
function p$({ schemaEnv: e }, t) {
  if (t.async && !e.$async)
    throw new Error("async keyword in sync schema");
}
function Yl(e, t, r) {
  if (r === void 0)
    throw new Error(`keyword "${t}" failed to compile`);
  return e.scopeValue("keyword", typeof r == "function" ? { ref: r } : { ref: r, code: (0, Ie.stringify)(r) });
}
function y$(e, t, r = !1) {
  return !t.length || t.some((n) => n === "array" ? Array.isArray(e) : n === "object" ? e && typeof e == "object" && !Array.isArray(e) : typeof e == n || r && typeof e > "u");
}
it.validSchemaType = y$;
function $$({ schema: e, opts: t, self: r, errSchemaPath: n }, s, a) {
  if (Array.isArray(s.keyword) ? !s.keyword.includes(a) : s.keyword !== a)
    throw new Error("ajv implementation error");
  const i = s.dependencies;
  if (i != null && i.some((u) => !Object.prototype.hasOwnProperty.call(e, u)))
    throw new Error(`parent schema must have dependencies of ${a}: ${i.join(",")}`);
  if (s.validateSchema && !s.validateSchema(e[a])) {
    const c = `keyword "${a}" value is invalid at path "${n}": ` + r.errorsText(s.validateSchema.errors);
    if (t.validateSchema === "log")
      r.logger.error(c);
    else
      throw new Error(c);
  }
}
it.validateKeywordUsage = $$;
var Nt = {};
Object.defineProperty(Nt, "__esModule", { value: !0 });
Nt.extendSubschemaMode = Nt.extendSubschemaData = Nt.getSubschema = void 0;
const nt = Z, Ql = L;
function _$(e, { keyword: t, schemaProp: r, schema: n, schemaPath: s, errSchemaPath: a, topSchemaRef: i }) {
  if (t !== void 0 && n !== void 0)
    throw new Error('both "keyword" and "schema" passed, only one allowed');
  if (t !== void 0) {
    const u = e.schema[t];
    return r === void 0 ? {
      schema: u,
      schemaPath: (0, nt._)`${e.schemaPath}${(0, nt.getProperty)(t)}`,
      errSchemaPath: `${e.errSchemaPath}/${t}`
    } : {
      schema: u[r],
      schemaPath: (0, nt._)`${e.schemaPath}${(0, nt.getProperty)(t)}${(0, nt.getProperty)(r)}`,
      errSchemaPath: `${e.errSchemaPath}/${t}/${(0, Ql.escapeFragment)(r)}`
    };
  }
  if (n !== void 0) {
    if (s === void 0 || a === void 0 || i === void 0)
      throw new Error('"schemaPath", "errSchemaPath" and "topSchemaRef" are required with "schema"');
    return {
      schema: n,
      schemaPath: s,
      topSchemaRef: i,
      errSchemaPath: a
    };
  }
  throw new Error('either "keyword" or "schema" must be passed');
}
Nt.getSubschema = _$;
function g$(e, t, { dataProp: r, dataPropType: n, data: s, dataTypes: a, propertyName: i }) {
  if (s !== void 0 && r !== void 0)
    throw new Error('both "data" and "dataProp" passed, only one allowed');
  const { gen: u } = t;
  if (r !== void 0) {
    const { errorPath: d, dataPathArr: l, opts: m } = t, P = u.let("data", (0, nt._)`${t.data}${(0, nt.getProperty)(r)}`, !0);
    c(P), e.errorPath = (0, nt.str)`${d}${(0, Ql.getErrorPath)(r, n, m.jsPropertySyntax)}`, e.parentDataProperty = (0, nt._)`${r}`, e.dataPathArr = [...l, e.parentDataProperty];
  }
  if (s !== void 0) {
    const d = s instanceof nt.Name ? s : u.let("data", s, !0);
    c(d), i !== void 0 && (e.propertyName = i);
  }
  a && (e.dataTypes = a);
  function c(d) {
    e.data = d, e.dataLevel = t.dataLevel + 1, e.dataTypes = [], t.definedProperties = /* @__PURE__ */ new Set(), e.parentData = t.data, e.dataNames = [...t.dataNames, d];
  }
}
Nt.extendSubschemaData = g$;
function v$(e, { jtdDiscriminator: t, jtdMetadata: r, compositeRule: n, createErrors: s, allErrors: a }) {
  n !== void 0 && (e.compositeRule = n), s !== void 0 && (e.createErrors = s), a !== void 0 && (e.allErrors = a), e.jtdDiscriminator = t, e.jtdMetadata = r;
}
Nt.extendSubschemaMode = v$;
var be = {}, Zl = { exports: {} }, bt = Zl.exports = function(e, t, r) {
  typeof t == "function" && (r = t, t = {}), r = t.cb || r;
  var n = typeof r == "function" ? r : r.pre || function() {
  }, s = r.post || function() {
  };
  Tn(t, n, s, e, "", e);
};
bt.keywords = {
  additionalItems: !0,
  items: !0,
  contains: !0,
  additionalProperties: !0,
  propertyNames: !0,
  not: !0,
  if: !0,
  then: !0,
  else: !0
};
bt.arrayKeywords = {
  items: !0,
  allOf: !0,
  anyOf: !0,
  oneOf: !0
};
bt.propsKeywords = {
  $defs: !0,
  definitions: !0,
  properties: !0,
  patternProperties: !0,
  dependencies: !0
};
bt.skipKeywords = {
  default: !0,
  enum: !0,
  const: !0,
  required: !0,
  maximum: !0,
  minimum: !0,
  exclusiveMaximum: !0,
  exclusiveMinimum: !0,
  multipleOf: !0,
  maxLength: !0,
  minLength: !0,
  pattern: !0,
  format: !0,
  maxItems: !0,
  minItems: !0,
  uniqueItems: !0,
  maxProperties: !0,
  minProperties: !0
};
function Tn(e, t, r, n, s, a, i, u, c, d) {
  if (n && typeof n == "object" && !Array.isArray(n)) {
    t(n, s, a, i, u, c, d);
    for (var l in n) {
      var m = n[l];
      if (Array.isArray(m)) {
        if (l in bt.arrayKeywords)
          for (var P = 0; P < m.length; P++)
            Tn(e, t, r, m[P], s + "/" + l + "/" + P, a, s, l, n, P);
      } else if (l in bt.propsKeywords) {
        if (m && typeof m == "object")
          for (var _ in m)
            Tn(e, t, r, m[_], s + "/" + l + "/" + E$(_), a, s, l, n, _);
      } else (l in bt.keywords || e.allKeys && !(l in bt.skipKeywords)) && Tn(e, t, r, m, s + "/" + l, a, s, l, n);
    }
    r(n, s, a, i, u, c, d);
  }
}
function E$(e) {
  return e.replace(/~/g, "~0").replace(/\//g, "~1");
}
var w$ = Zl.exports;
Object.defineProperty(be, "__esModule", { value: !0 });
be.getSchemaRefs = be.resolveUrl = be.normalizeId = be._getFullPath = be.getFullPath = be.inlineRef = void 0;
const S$ = L, b$ = Bn, P$ = w$, N$ = /* @__PURE__ */ new Set([
  "type",
  "format",
  "pattern",
  "maxLength",
  "minLength",
  "maxProperties",
  "minProperties",
  "maxItems",
  "minItems",
  "maximum",
  "minimum",
  "uniqueItems",
  "multipleOf",
  "required",
  "enum",
  "const"
]);
function O$(e, t = !0) {
  return typeof e == "boolean" ? !0 : t === !0 ? !qs(e) : t ? xl(e) <= t : !1;
}
be.inlineRef = O$;
const R$ = /* @__PURE__ */ new Set([
  "$ref",
  "$recursiveRef",
  "$recursiveAnchor",
  "$dynamicRef",
  "$dynamicAnchor"
]);
function qs(e) {
  for (const t in e) {
    if (R$.has(t))
      return !0;
    const r = e[t];
    if (Array.isArray(r) && r.some(qs) || typeof r == "object" && qs(r))
      return !0;
  }
  return !1;
}
function xl(e) {
  let t = 0;
  for (const r in e) {
    if (r === "$ref")
      return 1 / 0;
    if (t++, !N$.has(r) && (typeof e[r] == "object" && (0, S$.eachItem)(e[r], (n) => t += xl(n)), t === 1 / 0))
      return 1 / 0;
  }
  return t;
}
function eu(e, t = "", r) {
  r !== !1 && (t = mr(t));
  const n = e.parse(t);
  return tu(e, n);
}
be.getFullPath = eu;
function tu(e, t) {
  return e.serialize(t).split("#")[0] + "#";
}
be._getFullPath = tu;
const T$ = /#\/?$/;
function mr(e) {
  return e ? e.replace(T$, "") : "";
}
be.normalizeId = mr;
function I$(e, t, r) {
  return r = mr(r), e.resolve(t, r);
}
be.resolveUrl = I$;
const j$ = /^[a-z_][-a-z0-9._]*$/i;
function A$(e, t) {
  if (typeof e == "boolean")
    return {};
  const { schemaId: r, uriResolver: n } = this.opts, s = mr(e[r] || t), a = { "": s }, i = eu(n, s, !1), u = {}, c = /* @__PURE__ */ new Set();
  return P$(e, { allKeys: !0 }, (m, P, _, w) => {
    if (w === void 0)
      return;
    const g = i + P;
    let $ = a[w];
    typeof m[r] == "string" && ($ = h.call(this, m[r])), E.call(this, m.$anchor), E.call(this, m.$dynamicAnchor), a[P] = $;
    function h(N) {
      const R = this.opts.uriResolver.resolve;
      if (N = mr($ ? R($, N) : N), c.has(N))
        throw l(N);
      c.add(N);
      let I = this.refs[N];
      return typeof I == "string" && (I = this.refs[I]), typeof I == "object" ? d(m, I.schema, N) : N !== mr(g) && (N[0] === "#" ? (d(m, u[N], N), u[N] = m) : this.refs[N] = g), N;
    }
    function E(N) {
      if (typeof N == "string") {
        if (!j$.test(N))
          throw new Error(`invalid anchor "${N}"`);
        h.call(this, `#${N}`);
      }
    }
  }), u;
  function d(m, P, _) {
    if (P !== void 0 && !b$(m, P))
      throw l(_);
  }
  function l(m) {
    return new Error(`reference "${m}" resolves to more than one schema`);
  }
}
be.getSchemaRefs = A$;
Object.defineProperty(Ze, "__esModule", { value: !0 });
Ze.getData = Ze.KeywordCxt = Ze.validateFunctionCode = void 0;
const ru = gr, Ti = _e, oo = ht, Un = _e, k$ = xn, Kr = it, ys = Nt, G = Z, J = lt, C$ = be, mt = L, Ar = xr;
function D$(e) {
  if (au(e) && (ou(e), su(e))) {
    F$(e);
    return;
  }
  nu(e, () => (0, ru.topBoolOrEmptySchema)(e));
}
Ze.validateFunctionCode = D$;
function nu({ gen: e, validateName: t, schema: r, schemaEnv: n, opts: s }, a) {
  s.code.es5 ? e.func(t, (0, G._)`${J.default.data}, ${J.default.valCxt}`, n.$async, () => {
    e.code((0, G._)`"use strict"; ${Ii(r, s)}`), L$(e, s), e.code(a);
  }) : e.func(t, (0, G._)`${J.default.data}, ${M$(s)}`, n.$async, () => e.code(Ii(r, s)).code(a));
}
function M$(e) {
  return (0, G._)`{${J.default.instancePath}="", ${J.default.parentData}, ${J.default.parentDataProperty}, ${J.default.rootData}=${J.default.data}${e.dynamicRef ? (0, G._)`, ${J.default.dynamicAnchors}={}` : G.nil}}={}`;
}
function L$(e, t) {
  e.if(J.default.valCxt, () => {
    e.var(J.default.instancePath, (0, G._)`${J.default.valCxt}.${J.default.instancePath}`), e.var(J.default.parentData, (0, G._)`${J.default.valCxt}.${J.default.parentData}`), e.var(J.default.parentDataProperty, (0, G._)`${J.default.valCxt}.${J.default.parentDataProperty}`), e.var(J.default.rootData, (0, G._)`${J.default.valCxt}.${J.default.rootData}`), t.dynamicRef && e.var(J.default.dynamicAnchors, (0, G._)`${J.default.valCxt}.${J.default.dynamicAnchors}`);
  }, () => {
    e.var(J.default.instancePath, (0, G._)`""`), e.var(J.default.parentData, (0, G._)`undefined`), e.var(J.default.parentDataProperty, (0, G._)`undefined`), e.var(J.default.rootData, J.default.data), t.dynamicRef && e.var(J.default.dynamicAnchors, (0, G._)`{}`);
  });
}
function F$(e) {
  const { schema: t, opts: r, gen: n } = e;
  nu(e, () => {
    r.$comment && t.$comment && cu(e), K$(e), n.let(J.default.vErrors, null), n.let(J.default.errors, 0), r.unevaluated && V$(e), iu(e), W$(e);
  });
}
function V$(e) {
  const { gen: t, validateName: r } = e;
  e.evaluated = t.const("evaluated", (0, G._)`${r}.evaluated`), t.if((0, G._)`${e.evaluated}.dynamicProps`, () => t.assign((0, G._)`${e.evaluated}.props`, (0, G._)`undefined`)), t.if((0, G._)`${e.evaluated}.dynamicItems`, () => t.assign((0, G._)`${e.evaluated}.items`, (0, G._)`undefined`));
}
function Ii(e, t) {
  const r = typeof e == "object" && e[t.schemaId];
  return r && (t.code.source || t.code.process) ? (0, G._)`/*# sourceURL=${r} */` : G.nil;
}
function U$(e, t) {
  if (au(e) && (ou(e), su(e))) {
    z$(e, t);
    return;
  }
  (0, ru.boolOrEmptySchema)(e, t);
}
function su({ schema: e, self: t }) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (t.RULES.all[r])
      return !0;
  return !1;
}
function au(e) {
  return typeof e.schema != "boolean";
}
function z$(e, t) {
  const { schema: r, gen: n, opts: s } = e;
  s.$comment && r.$comment && cu(e), G$(e), H$(e);
  const a = n.const("_errs", J.default.errors);
  iu(e, a), n.var(t, (0, G._)`${a} === ${J.default.errors}`);
}
function ou(e) {
  (0, mt.checkUnknownRules)(e), q$(e);
}
function iu(e, t) {
  if (e.opts.jtd)
    return ji(e, [], !1, t);
  const r = (0, Ti.getSchemaTypes)(e.schema), n = (0, Ti.coerceAndCheckDataType)(e, r);
  ji(e, r, !n, t);
}
function q$(e) {
  const { schema: t, errSchemaPath: r, opts: n, self: s } = e;
  t.$ref && n.ignoreKeywordsWithRef && (0, mt.schemaHasRulesButRef)(t, s.RULES) && s.logger.warn(`$ref: keywords ignored in schema at path "${r}"`);
}
function K$(e) {
  const { schema: t, opts: r } = e;
  t.default !== void 0 && r.useDefaults && r.strictSchema && (0, mt.checkStrictMode)(e, "default is ignored in the schema root");
}
function G$(e) {
  const t = e.schema[e.opts.schemaId];
  t && (e.baseId = (0, C$.resolveUrl)(e.opts.uriResolver, e.baseId, t));
}
function H$(e) {
  if (e.schema.$async && !e.schemaEnv.$async)
    throw new Error("async schema in sync schema");
}
function cu({ gen: e, schemaEnv: t, schema: r, errSchemaPath: n, opts: s }) {
  const a = r.$comment;
  if (s.$comment === !0)
    e.code((0, G._)`${J.default.self}.logger.log(${a})`);
  else if (typeof s.$comment == "function") {
    const i = (0, G.str)`${n}/$comment`, u = e.scopeValue("root", { ref: t.root });
    e.code((0, G._)`${J.default.self}.opts.$comment(${a}, ${i}, ${u}.schema)`);
  }
}
function W$(e) {
  const { gen: t, schemaEnv: r, validateName: n, ValidationError: s, opts: a } = e;
  r.$async ? t.if((0, G._)`${J.default.errors} === 0`, () => t.return(J.default.data), () => t.throw((0, G._)`new ${s}(${J.default.vErrors})`)) : (t.assign((0, G._)`${n}.errors`, J.default.vErrors), a.unevaluated && B$(e), t.return((0, G._)`${J.default.errors} === 0`));
}
function B$({ gen: e, evaluated: t, props: r, items: n }) {
  r instanceof G.Name && e.assign((0, G._)`${t}.props`, r), n instanceof G.Name && e.assign((0, G._)`${t}.items`, n);
}
function ji(e, t, r, n) {
  const { gen: s, schema: a, data: i, allErrors: u, opts: c, self: d } = e, { RULES: l } = d;
  if (a.$ref && (c.ignoreKeywordsWithRef || !(0, mt.schemaHasRulesButRef)(a, l))) {
    s.block(() => du(e, "$ref", l.all.$ref.definition));
    return;
  }
  c.jtd || J$(e, t), s.block(() => {
    for (const P of l.rules)
      m(P);
    m(l.post);
  });
  function m(P) {
    (0, oo.shouldUseGroup)(a, P) && (P.type ? (s.if((0, Un.checkDataType)(P.type, i, c.strictNumbers)), Ai(e, P), t.length === 1 && t[0] === P.type && r && (s.else(), (0, Un.reportTypeError)(e)), s.endIf()) : Ai(e, P), u || s.if((0, G._)`${J.default.errors} === ${n || 0}`));
  }
}
function Ai(e, t) {
  const { gen: r, schema: n, opts: { useDefaults: s } } = e;
  s && (0, k$.assignDefaults)(e, t.type), r.block(() => {
    for (const a of t.rules)
      (0, oo.shouldUseRule)(n, a) && du(e, a.keyword, a.definition, t.type);
  });
}
function J$(e, t) {
  e.schemaEnv.meta || !e.opts.strictTypes || (X$(e, t), e.opts.allowUnionTypes || Y$(e, t), Q$(e, e.dataTypes));
}
function X$(e, t) {
  if (t.length) {
    if (!e.dataTypes.length) {
      e.dataTypes = t;
      return;
    }
    t.forEach((r) => {
      lu(e.dataTypes, r) || io(e, `type "${r}" not allowed by context "${e.dataTypes.join(",")}"`);
    }), x$(e, t);
  }
}
function Y$(e, t) {
  t.length > 1 && !(t.length === 2 && t.includes("null")) && io(e, "use allowUnionTypes to allow union type keyword");
}
function Q$(e, t) {
  const r = e.self.RULES.all;
  for (const n in r) {
    const s = r[n];
    if (typeof s == "object" && (0, oo.shouldUseRule)(e.schema, s)) {
      const { type: a } = s.definition;
      a.length && !a.some((i) => Z$(t, i)) && io(e, `missing type "${a.join(",")}" for keyword "${n}"`);
    }
  }
}
function Z$(e, t) {
  return e.includes(t) || t === "number" && e.includes("integer");
}
function lu(e, t) {
  return e.includes(t) || t === "integer" && e.includes("number");
}
function x$(e, t) {
  const r = [];
  for (const n of e.dataTypes)
    lu(t, n) ? r.push(n) : t.includes("integer") && n === "number" && r.push("integer");
  e.dataTypes = r;
}
function io(e, t) {
  const r = e.schemaEnv.baseId + e.errSchemaPath;
  t += ` at "${r}" (strictTypes)`, (0, mt.checkStrictMode)(e, t, e.opts.strictTypes);
}
class uu {
  constructor(t, r, n) {
    if ((0, Kr.validateKeywordUsage)(t, r, n), this.gen = t.gen, this.allErrors = t.allErrors, this.keyword = n, this.data = t.data, this.schema = t.schema[n], this.$data = r.$data && t.opts.$data && this.schema && this.schema.$data, this.schemaValue = (0, mt.schemaRefOrVal)(t, this.schema, n, this.$data), this.schemaType = r.schemaType, this.parentSchema = t.schema, this.params = {}, this.it = t, this.def = r, this.$data)
      this.schemaCode = t.gen.const("vSchema", fu(this.$data, t));
    else if (this.schemaCode = this.schemaValue, !(0, Kr.validSchemaType)(this.schema, r.schemaType, r.allowUndefined))
      throw new Error(`${n} value must be ${JSON.stringify(r.schemaType)}`);
    ("code" in r ? r.trackErrors : r.errors !== !1) && (this.errsCount = t.gen.const("_errs", J.default.errors));
  }
  result(t, r, n) {
    this.failResult((0, G.not)(t), r, n);
  }
  failResult(t, r, n) {
    this.gen.if(t), n ? n() : this.error(), r ? (this.gen.else(), r(), this.allErrors && this.gen.endIf()) : this.allErrors ? this.gen.endIf() : this.gen.else();
  }
  pass(t, r) {
    this.failResult((0, G.not)(t), void 0, r);
  }
  fail(t) {
    if (t === void 0) {
      this.error(), this.allErrors || this.gen.if(!1);
      return;
    }
    this.gen.if(t), this.error(), this.allErrors ? this.gen.endIf() : this.gen.else();
  }
  fail$data(t) {
    if (!this.$data)
      return this.fail(t);
    const { schemaCode: r } = this;
    this.fail((0, G._)`${r} !== undefined && (${(0, G.or)(this.invalid$data(), t)})`);
  }
  error(t, r, n) {
    if (r) {
      this.setParams(r), this._error(t, n), this.setParams({});
      return;
    }
    this._error(t, n);
  }
  _error(t, r) {
    (t ? Ar.reportExtraError : Ar.reportError)(this, this.def.error, r);
  }
  $dataError() {
    (0, Ar.reportError)(this, this.def.$dataError || Ar.keyword$DataError);
  }
  reset() {
    if (this.errsCount === void 0)
      throw new Error('add "trackErrors" to keyword definition');
    (0, Ar.resetErrorsCount)(this.gen, this.errsCount);
  }
  ok(t) {
    this.allErrors || this.gen.if(t);
  }
  setParams(t, r) {
    r ? Object.assign(this.params, t) : this.params = t;
  }
  block$data(t, r, n = G.nil) {
    this.gen.block(() => {
      this.check$data(t, n), r();
    });
  }
  check$data(t = G.nil, r = G.nil) {
    if (!this.$data)
      return;
    const { gen: n, schemaCode: s, schemaType: a, def: i } = this;
    n.if((0, G.or)((0, G._)`${s} === undefined`, r)), t !== G.nil && n.assign(t, !0), (a.length || i.validateSchema) && (n.elseIf(this.invalid$data()), this.$dataError(), t !== G.nil && n.assign(t, !1)), n.else();
  }
  invalid$data() {
    const { gen: t, schemaCode: r, schemaType: n, def: s, it: a } = this;
    return (0, G.or)(i(), u());
    function i() {
      if (n.length) {
        if (!(r instanceof G.Name))
          throw new Error("ajv implementation error");
        const c = Array.isArray(n) ? n : [n];
        return (0, G._)`${(0, Un.checkDataTypes)(c, r, a.opts.strictNumbers, Un.DataType.Wrong)}`;
      }
      return G.nil;
    }
    function u() {
      if (s.validateSchema) {
        const c = t.scopeValue("validate$data", { ref: s.validateSchema });
        return (0, G._)`!${c}(${r})`;
      }
      return G.nil;
    }
  }
  subschema(t, r) {
    const n = (0, ys.getSubschema)(this.it, t);
    (0, ys.extendSubschemaData)(n, this.it, t), (0, ys.extendSubschemaMode)(n, t);
    const s = { ...this.it, ...n, items: void 0, props: void 0 };
    return U$(s, r), s;
  }
  mergeEvaluated(t, r) {
    const { it: n, gen: s } = this;
    n.opts.unevaluated && (n.props !== !0 && t.props !== void 0 && (n.props = mt.mergeEvaluated.props(s, t.props, n.props, r)), n.items !== !0 && t.items !== void 0 && (n.items = mt.mergeEvaluated.items(s, t.items, n.items, r)));
  }
  mergeValidEvaluated(t, r) {
    const { it: n, gen: s } = this;
    if (n.opts.unevaluated && (n.props !== !0 || n.items !== !0))
      return s.if(r, () => this.mergeEvaluated(t, G.Name)), !0;
  }
}
Ze.KeywordCxt = uu;
function du(e, t, r, n) {
  const s = new uu(e, r, t);
  "code" in r ? r.code(s, n) : s.$data && r.validate ? (0, Kr.funcKeywordCode)(s, r) : "macro" in r ? (0, Kr.macroKeywordCode)(s, r) : (r.compile || r.validate) && (0, Kr.funcKeywordCode)(s, r);
}
const e_ = /^\/(?:[^~]|~0|~1)*$/, t_ = /^([0-9]+)(#|\/(?:[^~]|~0|~1)*)?$/;
function fu(e, { dataLevel: t, dataNames: r, dataPathArr: n }) {
  let s, a;
  if (e === "")
    return J.default.rootData;
  if (e[0] === "/") {
    if (!e_.test(e))
      throw new Error(`Invalid JSON-pointer: ${e}`);
    s = e, a = J.default.rootData;
  } else {
    const d = t_.exec(e);
    if (!d)
      throw new Error(`Invalid JSON-pointer: ${e}`);
    const l = +d[1];
    if (s = d[2], s === "#") {
      if (l >= t)
        throw new Error(c("property/index", l));
      return n[t - l];
    }
    if (l > t)
      throw new Error(c("data", l));
    if (a = r[t - l], !s)
      return a;
  }
  let i = a;
  const u = s.split("/");
  for (const d of u)
    d && (a = (0, G._)`${a}${(0, G.getProperty)((0, mt.unescapeJsonPointer)(d))}`, i = (0, G._)`${i} && ${a}`);
  return i;
  function c(d, l) {
    return `Cannot access ${d} ${l} levels up, current level is ${t}`;
  }
}
Ze.getData = fu;
var en = {};
Object.defineProperty(en, "__esModule", { value: !0 });
class r_ extends Error {
  constructor(t) {
    super("validation failed"), this.errors = t, this.ajv = this.validation = !0;
  }
}
en.default = r_;
var br = {};
Object.defineProperty(br, "__esModule", { value: !0 });
const $s = be;
class n_ extends Error {
  constructor(t, r, n, s) {
    super(s || `can't resolve reference ${n} from id ${r}`), this.missingRef = (0, $s.resolveUrl)(t, r, n), this.missingSchema = (0, $s.normalizeId)((0, $s.getFullPath)(t, this.missingRef));
  }
}
br.default = n_;
var Me = {};
Object.defineProperty(Me, "__esModule", { value: !0 });
Me.resolveSchema = Me.getCompilingSchema = Me.resolveRef = Me.compileSchema = Me.SchemaEnv = void 0;
const He = Z, s_ = en, Gt = lt, Ye = be, ki = L, a_ = Ze;
class es {
  constructor(t) {
    var r;
    this.refs = {}, this.dynamicAnchors = {};
    let n;
    typeof t.schema == "object" && (n = t.schema), this.schema = t.schema, this.schemaId = t.schemaId, this.root = t.root || this, this.baseId = (r = t.baseId) !== null && r !== void 0 ? r : (0, Ye.normalizeId)(n == null ? void 0 : n[t.schemaId || "$id"]), this.schemaPath = t.schemaPath, this.localRefs = t.localRefs, this.meta = t.meta, this.$async = n == null ? void 0 : n.$async, this.refs = {};
  }
}
Me.SchemaEnv = es;
function co(e) {
  const t = hu.call(this, e);
  if (t)
    return t;
  const r = (0, Ye.getFullPath)(this.opts.uriResolver, e.root.baseId), { es5: n, lines: s } = this.opts.code, { ownProperties: a } = this.opts, i = new He.CodeGen(this.scope, { es5: n, lines: s, ownProperties: a });
  let u;
  e.$async && (u = i.scopeValue("Error", {
    ref: s_.default,
    code: (0, He._)`require("ajv/dist/runtime/validation_error").default`
  }));
  const c = i.scopeName("validate");
  e.validateName = c;
  const d = {
    gen: i,
    allErrors: this.opts.allErrors,
    data: Gt.default.data,
    parentData: Gt.default.parentData,
    parentDataProperty: Gt.default.parentDataProperty,
    dataNames: [Gt.default.data],
    dataPathArr: [He.nil],
    // TODO can its length be used as dataLevel if nil is removed?
    dataLevel: 0,
    dataTypes: [],
    definedProperties: /* @__PURE__ */ new Set(),
    topSchemaRef: i.scopeValue("schema", this.opts.code.source === !0 ? { ref: e.schema, code: (0, He.stringify)(e.schema) } : { ref: e.schema }),
    validateName: c,
    ValidationError: u,
    schema: e.schema,
    schemaEnv: e,
    rootId: r,
    baseId: e.baseId || r,
    schemaPath: He.nil,
    errSchemaPath: e.schemaPath || (this.opts.jtd ? "" : "#"),
    errorPath: (0, He._)`""`,
    opts: this.opts,
    self: this
  };
  let l;
  try {
    this._compilations.add(e), (0, a_.validateFunctionCode)(d), i.optimize(this.opts.code.optimize);
    const m = i.toString();
    l = `${i.scopeRefs(Gt.default.scope)}return ${m}`, this.opts.code.process && (l = this.opts.code.process(l, e));
    const _ = new Function(`${Gt.default.self}`, `${Gt.default.scope}`, l)(this, this.scope.get());
    if (this.scope.value(c, { ref: _ }), _.errors = null, _.schema = e.schema, _.schemaEnv = e, e.$async && (_.$async = !0), this.opts.code.source === !0 && (_.source = { validateName: c, validateCode: m, scopeValues: i._values }), this.opts.unevaluated) {
      const { props: w, items: g } = d;
      _.evaluated = {
        props: w instanceof He.Name ? void 0 : w,
        items: g instanceof He.Name ? void 0 : g,
        dynamicProps: w instanceof He.Name,
        dynamicItems: g instanceof He.Name
      }, _.source && (_.source.evaluated = (0, He.stringify)(_.evaluated));
    }
    return e.validate = _, e;
  } catch (m) {
    throw delete e.validate, delete e.validateName, l && this.logger.error("Error compiling schema, function code:", l), m;
  } finally {
    this._compilations.delete(e);
  }
}
Me.compileSchema = co;
function o_(e, t, r) {
  var n;
  r = (0, Ye.resolveUrl)(this.opts.uriResolver, t, r);
  const s = e.refs[r];
  if (s)
    return s;
  let a = l_.call(this, e, r);
  if (a === void 0) {
    const i = (n = e.localRefs) === null || n === void 0 ? void 0 : n[r], { schemaId: u } = this.opts;
    i && (a = new es({ schema: i, schemaId: u, root: e, baseId: t }));
  }
  if (a !== void 0)
    return e.refs[r] = i_.call(this, a);
}
Me.resolveRef = o_;
function i_(e) {
  return (0, Ye.inlineRef)(e.schema, this.opts.inlineRefs) ? e.schema : e.validate ? e : co.call(this, e);
}
function hu(e) {
  for (const t of this._compilations)
    if (c_(t, e))
      return t;
}
Me.getCompilingSchema = hu;
function c_(e, t) {
  return e.schema === t.schema && e.root === t.root && e.baseId === t.baseId;
}
function l_(e, t) {
  let r;
  for (; typeof (r = this.refs[t]) == "string"; )
    t = r;
  return r || this.schemas[t] || ts.call(this, e, t);
}
function ts(e, t) {
  const r = this.opts.uriResolver.parse(t), n = (0, Ye._getFullPath)(this.opts.uriResolver, r);
  let s = (0, Ye.getFullPath)(this.opts.uriResolver, e.baseId, void 0);
  if (Object.keys(e.schema).length > 0 && n === s)
    return _s.call(this, r, e);
  const a = (0, Ye.normalizeId)(n), i = this.refs[a] || this.schemas[a];
  if (typeof i == "string") {
    const u = ts.call(this, e, i);
    return typeof (u == null ? void 0 : u.schema) != "object" ? void 0 : _s.call(this, r, u);
  }
  if (typeof (i == null ? void 0 : i.schema) == "object") {
    if (i.validate || co.call(this, i), a === (0, Ye.normalizeId)(t)) {
      const { schema: u } = i, { schemaId: c } = this.opts, d = u[c];
      return d && (s = (0, Ye.resolveUrl)(this.opts.uriResolver, s, d)), new es({ schema: u, schemaId: c, root: e, baseId: s });
    }
    return _s.call(this, r, i);
  }
}
Me.resolveSchema = ts;
const u_ = /* @__PURE__ */ new Set([
  "properties",
  "patternProperties",
  "enum",
  "dependencies",
  "definitions"
]);
function _s(e, { baseId: t, schema: r, root: n }) {
  var s;
  if (((s = e.fragment) === null || s === void 0 ? void 0 : s[0]) !== "/")
    return;
  for (const u of e.fragment.slice(1).split("/")) {
    if (typeof r == "boolean")
      return;
    const c = r[(0, ki.unescapeFragment)(u)];
    if (c === void 0)
      return;
    r = c;
    const d = typeof r == "object" && r[this.opts.schemaId];
    !u_.has(u) && d && (t = (0, Ye.resolveUrl)(this.opts.uriResolver, t, d));
  }
  let a;
  if (typeof r != "boolean" && r.$ref && !(0, ki.schemaHasRulesButRef)(r, this.RULES)) {
    const u = (0, Ye.resolveUrl)(this.opts.uriResolver, t, r.$ref);
    a = ts.call(this, n, u);
  }
  const { schemaId: i } = this.opts;
  if (a = a || new es({ schema: r, schemaId: i, root: n, baseId: t }), a.schema !== a.root.schema)
    return a;
}
const d_ = "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#", f_ = "Meta-schema for $data reference (JSON AnySchema extension proposal)", h_ = "object", m_ = [
  "$data"
], p_ = {
  $data: {
    type: "string",
    anyOf: [
      {
        format: "relative-json-pointer"
      },
      {
        format: "json-pointer"
      }
    ]
  }
}, y_ = !1, $_ = {
  $id: d_,
  description: f_,
  type: h_,
  required: m_,
  properties: p_,
  additionalProperties: y_
};
var lo = {};
Object.defineProperty(lo, "__esModule", { value: !0 });
const mu = bl;
mu.code = 'require("ajv/dist/runtime/uri").default';
lo.default = mu;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.CodeGen = e.Name = e.nil = e.stringify = e.str = e._ = e.KeywordCxt = void 0;
  var t = Ze;
  Object.defineProperty(e, "KeywordCxt", { enumerable: !0, get: function() {
    return t.KeywordCxt;
  } });
  var r = Z;
  Object.defineProperty(e, "_", { enumerable: !0, get: function() {
    return r._;
  } }), Object.defineProperty(e, "str", { enumerable: !0, get: function() {
    return r.str;
  } }), Object.defineProperty(e, "stringify", { enumerable: !0, get: function() {
    return r.stringify;
  } }), Object.defineProperty(e, "nil", { enumerable: !0, get: function() {
    return r.nil;
  } }), Object.defineProperty(e, "Name", { enumerable: !0, get: function() {
    return r.Name;
  } }), Object.defineProperty(e, "CodeGen", { enumerable: !0, get: function() {
    return r.CodeGen;
  } });
  const n = en, s = br, a = xt, i = Me, u = Z, c = be, d = _e, l = L, m = $_, P = lo, _ = (v, p) => new RegExp(v, p);
  _.code = "new RegExp";
  const w = ["removeAdditional", "useDefaults", "coerceTypes"], g = /* @__PURE__ */ new Set([
    "validate",
    "serialize",
    "parse",
    "wrapper",
    "root",
    "schema",
    "keyword",
    "pattern",
    "formats",
    "validate$data",
    "func",
    "obj",
    "Error"
  ]), $ = {
    errorDataPath: "",
    format: "`validateFormats: false` can be used instead.",
    nullable: '"nullable" keyword is supported by default.',
    jsonPointers: "Deprecated jsPropertySyntax can be used instead.",
    extendRefs: "Deprecated ignoreKeywordsWithRef can be used instead.",
    missingRefs: "Pass empty schema with $id that should be ignored to ajv.addSchema.",
    processCode: "Use option `code: {process: (code, schemaEnv: object) => string}`",
    sourceCode: "Use option `code: {source: true}`",
    strictDefaults: "It is default now, see option `strict`.",
    strictKeywords: "It is default now, see option `strict`.",
    uniqueItems: '"uniqueItems" keyword is always validated.',
    unknownFormats: "Disable strict mode or pass `true` to `ajv.addFormat` (or `formats` option).",
    cache: "Map is used as cache, schema object as key.",
    serialize: "Map is used as cache, schema object as key.",
    ajvErrors: "It is default now."
  }, h = {
    ignoreKeywordsWithRef: "",
    jsPropertySyntax: "",
    unicode: '"minLength"/"maxLength" account for unicode characters by default.'
  }, E = 200;
  function N(v) {
    var p, S, y, o, f, b, j, A, q, F, re, Le, Rt, Tt, It, jt, At, kt, Ct, Dt, Mt, Lt, Ft, Vt, Ut;
    const Ke = v.strict, zt = (p = v.code) === null || p === void 0 ? void 0 : p.optimize, Rr = zt === !0 || zt === void 0 ? 1 : zt || 0, Tr = (y = (S = v.code) === null || S === void 0 ? void 0 : S.regExp) !== null && y !== void 0 ? y : _, us = (o = v.uriResolver) !== null && o !== void 0 ? o : P.default;
    return {
      strictSchema: (b = (f = v.strictSchema) !== null && f !== void 0 ? f : Ke) !== null && b !== void 0 ? b : !0,
      strictNumbers: (A = (j = v.strictNumbers) !== null && j !== void 0 ? j : Ke) !== null && A !== void 0 ? A : !0,
      strictTypes: (F = (q = v.strictTypes) !== null && q !== void 0 ? q : Ke) !== null && F !== void 0 ? F : "log",
      strictTuples: (Le = (re = v.strictTuples) !== null && re !== void 0 ? re : Ke) !== null && Le !== void 0 ? Le : "log",
      strictRequired: (Tt = (Rt = v.strictRequired) !== null && Rt !== void 0 ? Rt : Ke) !== null && Tt !== void 0 ? Tt : !1,
      code: v.code ? { ...v.code, optimize: Rr, regExp: Tr } : { optimize: Rr, regExp: Tr },
      loopRequired: (It = v.loopRequired) !== null && It !== void 0 ? It : E,
      loopEnum: (jt = v.loopEnum) !== null && jt !== void 0 ? jt : E,
      meta: (At = v.meta) !== null && At !== void 0 ? At : !0,
      messages: (kt = v.messages) !== null && kt !== void 0 ? kt : !0,
      inlineRefs: (Ct = v.inlineRefs) !== null && Ct !== void 0 ? Ct : !0,
      schemaId: (Dt = v.schemaId) !== null && Dt !== void 0 ? Dt : "$id",
      addUsedSchema: (Mt = v.addUsedSchema) !== null && Mt !== void 0 ? Mt : !0,
      validateSchema: (Lt = v.validateSchema) !== null && Lt !== void 0 ? Lt : !0,
      validateFormats: (Ft = v.validateFormats) !== null && Ft !== void 0 ? Ft : !0,
      unicodeRegExp: (Vt = v.unicodeRegExp) !== null && Vt !== void 0 ? Vt : !0,
      int32range: (Ut = v.int32range) !== null && Ut !== void 0 ? Ut : !0,
      uriResolver: us
    };
  }
  class R {
    constructor(p = {}) {
      this.schemas = {}, this.refs = {}, this.formats = {}, this._compilations = /* @__PURE__ */ new Set(), this._loading = {}, this._cache = /* @__PURE__ */ new Map(), p = this.opts = { ...p, ...N(p) };
      const { es5: S, lines: y } = this.opts.code;
      this.scope = new u.ValueScope({ scope: {}, prefixes: g, es5: S, lines: y }), this.logger = Q(p.logger);
      const o = p.validateFormats;
      p.validateFormats = !1, this.RULES = (0, a.getRules)(), I.call(this, $, p, "NOT SUPPORTED"), I.call(this, h, p, "DEPRECATED", "warn"), this._metaOpts = H.call(this), p.formats && ue.call(this), this._addVocabularies(), this._addDefaultMetaSchema(), p.keywords && V.call(this, p.keywords), typeof p.meta == "object" && this.addMetaSchema(p.meta), W.call(this), p.validateFormats = o;
    }
    _addVocabularies() {
      this.addKeyword("$async");
    }
    _addDefaultMetaSchema() {
      const { $data: p, meta: S, schemaId: y } = this.opts;
      let o = m;
      y === "id" && (o = { ...m }, o.id = o.$id, delete o.$id), S && p && this.addMetaSchema(o, o[y], !1);
    }
    defaultMeta() {
      const { meta: p, schemaId: S } = this.opts;
      return this.opts.defaultMeta = typeof p == "object" ? p[S] || p : void 0;
    }
    validate(p, S) {
      let y;
      if (typeof p == "string") {
        if (y = this.getSchema(p), !y)
          throw new Error(`no schema with key or ref "${p}"`);
      } else
        y = this.compile(p);
      const o = y(S);
      return "$async" in y || (this.errors = y.errors), o;
    }
    compile(p, S) {
      const y = this._addSchema(p, S);
      return y.validate || this._compileSchemaEnv(y);
    }
    compileAsync(p, S) {
      if (typeof this.opts.loadSchema != "function")
        throw new Error("options.loadSchema should be a function");
      const { loadSchema: y } = this.opts;
      return o.call(this, p, S);
      async function o(F, re) {
        await f.call(this, F.$schema);
        const Le = this._addSchema(F, re);
        return Le.validate || b.call(this, Le);
      }
      async function f(F) {
        F && !this.getSchema(F) && await o.call(this, { $ref: F }, !0);
      }
      async function b(F) {
        try {
          return this._compileSchemaEnv(F);
        } catch (re) {
          if (!(re instanceof s.default))
            throw re;
          return j.call(this, re), await A.call(this, re.missingSchema), b.call(this, F);
        }
      }
      function j({ missingSchema: F, missingRef: re }) {
        if (this.refs[F])
          throw new Error(`AnySchema ${F} is loaded but ${re} cannot be resolved`);
      }
      async function A(F) {
        const re = await q.call(this, F);
        this.refs[F] || await f.call(this, re.$schema), this.refs[F] || this.addSchema(re, F, S);
      }
      async function q(F) {
        const re = this._loading[F];
        if (re)
          return re;
        try {
          return await (this._loading[F] = y(F));
        } finally {
          delete this._loading[F];
        }
      }
    }
    // Adds schema to the instance
    addSchema(p, S, y, o = this.opts.validateSchema) {
      if (Array.isArray(p)) {
        for (const b of p)
          this.addSchema(b, void 0, y, o);
        return this;
      }
      let f;
      if (typeof p == "object") {
        const { schemaId: b } = this.opts;
        if (f = p[b], f !== void 0 && typeof f != "string")
          throw new Error(`schema ${b} must be string`);
      }
      return S = (0, c.normalizeId)(S || f), this._checkUnique(S), this.schemas[S] = this._addSchema(p, y, S, o, !0), this;
    }
    // Add schema that will be used to validate other schemas
    // options in META_IGNORE_OPTIONS are alway set to false
    addMetaSchema(p, S, y = this.opts.validateSchema) {
      return this.addSchema(p, S, !0, y), this;
    }
    //  Validate schema against its meta-schema
    validateSchema(p, S) {
      if (typeof p == "boolean")
        return !0;
      let y;
      if (y = p.$schema, y !== void 0 && typeof y != "string")
        throw new Error("$schema must be a string");
      if (y = y || this.opts.defaultMeta || this.defaultMeta(), !y)
        return this.logger.warn("meta-schema not available"), this.errors = null, !0;
      const o = this.validate(y, p);
      if (!o && S) {
        const f = "schema is invalid: " + this.errorsText();
        if (this.opts.validateSchema === "log")
          this.logger.error(f);
        else
          throw new Error(f);
      }
      return o;
    }
    // Get compiled schema by `key` or `ref`.
    // (`key` that was passed to `addSchema` or full schema reference - `schema.$id` or resolved id)
    getSchema(p) {
      let S;
      for (; typeof (S = z.call(this, p)) == "string"; )
        p = S;
      if (S === void 0) {
        const { schemaId: y } = this.opts, o = new i.SchemaEnv({ schema: {}, schemaId: y });
        if (S = i.resolveSchema.call(this, o, p), !S)
          return;
        this.refs[p] = S;
      }
      return S.validate || this._compileSchemaEnv(S);
    }
    // Remove cached schema(s).
    // If no parameter is passed all schemas but meta-schemas are removed.
    // If RegExp is passed all schemas with key/id matching pattern but meta-schemas are removed.
    // Even if schema is referenced by other schemas it still can be removed as other schemas have local references.
    removeSchema(p) {
      if (p instanceof RegExp)
        return this._removeAllSchemas(this.schemas, p), this._removeAllSchemas(this.refs, p), this;
      switch (typeof p) {
        case "undefined":
          return this._removeAllSchemas(this.schemas), this._removeAllSchemas(this.refs), this._cache.clear(), this;
        case "string": {
          const S = z.call(this, p);
          return typeof S == "object" && this._cache.delete(S.schema), delete this.schemas[p], delete this.refs[p], this;
        }
        case "object": {
          const S = p;
          this._cache.delete(S);
          let y = p[this.opts.schemaId];
          return y && (y = (0, c.normalizeId)(y), delete this.schemas[y], delete this.refs[y]), this;
        }
        default:
          throw new Error("ajv.removeSchema: invalid parameter");
      }
    }
    // add "vocabulary" - a collection of keywords
    addVocabulary(p) {
      for (const S of p)
        this.addKeyword(S);
      return this;
    }
    addKeyword(p, S) {
      let y;
      if (typeof p == "string")
        y = p, typeof S == "object" && (this.logger.warn("these parameters are deprecated, see docs for addKeyword"), S.keyword = y);
      else if (typeof p == "object" && S === void 0) {
        if (S = p, y = S.keyword, Array.isArray(y) && !y.length)
          throw new Error("addKeywords: keyword must be string or non-empty array");
      } else
        throw new Error("invalid addKeywords parameters");
      if (C.call(this, y, S), !S)
        return (0, l.eachItem)(y, (f) => k.call(this, f)), this;
      D.call(this, S);
      const o = {
        ...S,
        type: (0, d.getJSONTypes)(S.type),
        schemaType: (0, d.getJSONTypes)(S.schemaType)
      };
      return (0, l.eachItem)(y, o.type.length === 0 ? (f) => k.call(this, f, o) : (f) => o.type.forEach((b) => k.call(this, f, o, b))), this;
    }
    getKeyword(p) {
      const S = this.RULES.all[p];
      return typeof S == "object" ? S.definition : !!S;
    }
    // Remove keyword
    removeKeyword(p) {
      const { RULES: S } = this;
      delete S.keywords[p], delete S.all[p];
      for (const y of S.rules) {
        const o = y.rules.findIndex((f) => f.keyword === p);
        o >= 0 && y.rules.splice(o, 1);
      }
      return this;
    }
    // Add format
    addFormat(p, S) {
      return typeof S == "string" && (S = new RegExp(S)), this.formats[p] = S, this;
    }
    errorsText(p = this.errors, { separator: S = ", ", dataVar: y = "data" } = {}) {
      return !p || p.length === 0 ? "No errors" : p.map((o) => `${y}${o.instancePath} ${o.message}`).reduce((o, f) => o + S + f);
    }
    $dataMetaSchema(p, S) {
      const y = this.RULES.all;
      p = JSON.parse(JSON.stringify(p));
      for (const o of S) {
        const f = o.split("/").slice(1);
        let b = p;
        for (const j of f)
          b = b[j];
        for (const j in y) {
          const A = y[j];
          if (typeof A != "object")
            continue;
          const { $data: q } = A.definition, F = b[j];
          q && F && (b[j] = T(F));
        }
      }
      return p;
    }
    _removeAllSchemas(p, S) {
      for (const y in p) {
        const o = p[y];
        (!S || S.test(y)) && (typeof o == "string" ? delete p[y] : o && !o.meta && (this._cache.delete(o.schema), delete p[y]));
      }
    }
    _addSchema(p, S, y, o = this.opts.validateSchema, f = this.opts.addUsedSchema) {
      let b;
      const { schemaId: j } = this.opts;
      if (typeof p == "object")
        b = p[j];
      else {
        if (this.opts.jtd)
          throw new Error("schema must be object");
        if (typeof p != "boolean")
          throw new Error("schema must be object or boolean");
      }
      let A = this._cache.get(p);
      if (A !== void 0)
        return A;
      y = (0, c.normalizeId)(b || y);
      const q = c.getSchemaRefs.call(this, p, y);
      return A = new i.SchemaEnv({ schema: p, schemaId: j, meta: S, baseId: y, localRefs: q }), this._cache.set(A.schema, A), f && !y.startsWith("#") && (y && this._checkUnique(y), this.refs[y] = A), o && this.validateSchema(p, !0), A;
    }
    _checkUnique(p) {
      if (this.schemas[p] || this.refs[p])
        throw new Error(`schema with key or id "${p}" already exists`);
    }
    _compileSchemaEnv(p) {
      if (p.meta ? this._compileMetaSchema(p) : i.compileSchema.call(this, p), !p.validate)
        throw new Error("ajv implementation error");
      return p.validate;
    }
    _compileMetaSchema(p) {
      const S = this.opts;
      this.opts = this._metaOpts;
      try {
        i.compileSchema.call(this, p);
      } finally {
        this.opts = S;
      }
    }
  }
  R.ValidationError = n.default, R.MissingRefError = s.default, e.default = R;
  function I(v, p, S, y = "error") {
    for (const o in v) {
      const f = o;
      f in p && this.logger[y](`${S}: option ${o}. ${v[f]}`);
    }
  }
  function z(v) {
    return v = (0, c.normalizeId)(v), this.schemas[v] || this.refs[v];
  }
  function W() {
    const v = this.opts.schemas;
    if (v)
      if (Array.isArray(v))
        this.addSchema(v);
      else
        for (const p in v)
          this.addSchema(v[p], p);
  }
  function ue() {
    for (const v in this.opts.formats) {
      const p = this.opts.formats[v];
      p && this.addFormat(v, p);
    }
  }
  function V(v) {
    if (Array.isArray(v)) {
      this.addVocabulary(v);
      return;
    }
    this.logger.warn("keywords option as map is deprecated, pass array");
    for (const p in v) {
      const S = v[p];
      S.keyword || (S.keyword = p), this.addKeyword(S);
    }
  }
  function H() {
    const v = { ...this.opts };
    for (const p of w)
      delete v[p];
    return v;
  }
  const ne = { log() {
  }, warn() {
  }, error() {
  } };
  function Q(v) {
    if (v === !1)
      return ne;
    if (v === void 0)
      return console;
    if (v.log && v.warn && v.error)
      return v;
    throw new Error("logger must implement log, warn and error methods");
  }
  const de = /^[a-z_$][a-z0-9_$:-]*$/i;
  function C(v, p) {
    const { RULES: S } = this;
    if ((0, l.eachItem)(v, (y) => {
      if (S.keywords[y])
        throw new Error(`Keyword ${y} is already defined`);
      if (!de.test(y))
        throw new Error(`Keyword ${y} has invalid name`);
    }), !!p && p.$data && !("code" in p || "validate" in p))
      throw new Error('$data keyword must have "code" or "validate" function');
  }
  function k(v, p, S) {
    var y;
    const o = p == null ? void 0 : p.post;
    if (S && o)
      throw new Error('keyword with "post" flag cannot have "type"');
    const { RULES: f } = this;
    let b = o ? f.post : f.rules.find(({ type: A }) => A === S);
    if (b || (b = { type: S, rules: [] }, f.rules.push(b)), f.keywords[v] = !0, !p)
      return;
    const j = {
      keyword: v,
      definition: {
        ...p,
        type: (0, d.getJSONTypes)(p.type),
        schemaType: (0, d.getJSONTypes)(p.schemaType)
      }
    };
    p.before ? U.call(this, b, j, p.before) : b.rules.push(j), f.all[v] = j, (y = p.implements) === null || y === void 0 || y.forEach((A) => this.addKeyword(A));
  }
  function U(v, p, S) {
    const y = v.rules.findIndex((o) => o.keyword === S);
    y >= 0 ? v.rules.splice(y, 0, p) : (v.rules.push(p), this.logger.warn(`rule ${S} is not defined`));
  }
  function D(v) {
    let { metaSchema: p } = v;
    p !== void 0 && (v.$data && this.opts.$data && (p = T(p)), v.validateSchema = this.compile(p, !0));
  }
  const O = {
    $ref: "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#"
  };
  function T(v) {
    return { anyOf: [v, O] };
  }
})(Ml);
var uo = {}, fo = {}, ho = {};
Object.defineProperty(ho, "__esModule", { value: !0 });
const __ = {
  keyword: "id",
  code() {
    throw new Error('NOT SUPPORTED: keyword "id", use "$id" for schema ID');
  }
};
ho.default = __;
var er = {};
Object.defineProperty(er, "__esModule", { value: !0 });
er.callRef = er.getValidate = void 0;
const g_ = br, Ci = ee, Ce = Z, ar = lt, Di = Me, hn = L, v_ = {
  keyword: "$ref",
  schemaType: "string",
  code(e) {
    const { gen: t, schema: r, it: n } = e, { baseId: s, schemaEnv: a, validateName: i, opts: u, self: c } = n, { root: d } = a;
    if ((r === "#" || r === "#/") && s === d.baseId)
      return m();
    const l = Di.resolveRef.call(c, d, s, r);
    if (l === void 0)
      throw new g_.default(n.opts.uriResolver, s, r);
    if (l instanceof Di.SchemaEnv)
      return P(l);
    return _(l);
    function m() {
      if (a === d)
        return In(e, i, a, a.$async);
      const w = t.scopeValue("root", { ref: d });
      return In(e, (0, Ce._)`${w}.validate`, d, d.$async);
    }
    function P(w) {
      const g = pu(e, w);
      In(e, g, w, w.$async);
    }
    function _(w) {
      const g = t.scopeValue("schema", u.code.source === !0 ? { ref: w, code: (0, Ce.stringify)(w) } : { ref: w }), $ = t.name("valid"), h = e.subschema({
        schema: w,
        dataTypes: [],
        schemaPath: Ce.nil,
        topSchemaRef: g,
        errSchemaPath: r
      }, $);
      e.mergeEvaluated(h), e.ok($);
    }
  }
};
function pu(e, t) {
  const { gen: r } = e;
  return t.validate ? r.scopeValue("validate", { ref: t.validate }) : (0, Ce._)`${r.scopeValue("wrapper", { ref: t })}.validate`;
}
er.getValidate = pu;
function In(e, t, r, n) {
  const { gen: s, it: a } = e, { allErrors: i, schemaEnv: u, opts: c } = a, d = c.passContext ? ar.default.this : Ce.nil;
  n ? l() : m();
  function l() {
    if (!u.$async)
      throw new Error("async schema referenced by sync schema");
    const w = s.let("valid");
    s.try(() => {
      s.code((0, Ce._)`await ${(0, Ci.callValidateCode)(e, t, d)}`), _(t), i || s.assign(w, !0);
    }, (g) => {
      s.if((0, Ce._)`!(${g} instanceof ${a.ValidationError})`, () => s.throw(g)), P(g), i || s.assign(w, !1);
    }), e.ok(w);
  }
  function m() {
    e.result((0, Ci.callValidateCode)(e, t, d), () => _(t), () => P(t));
  }
  function P(w) {
    const g = (0, Ce._)`${w}.errors`;
    s.assign(ar.default.vErrors, (0, Ce._)`${ar.default.vErrors} === null ? ${g} : ${ar.default.vErrors}.concat(${g})`), s.assign(ar.default.errors, (0, Ce._)`${ar.default.vErrors}.length`);
  }
  function _(w) {
    var g;
    if (!a.opts.unevaluated)
      return;
    const $ = (g = r == null ? void 0 : r.validate) === null || g === void 0 ? void 0 : g.evaluated;
    if (a.props !== !0)
      if ($ && !$.dynamicProps)
        $.props !== void 0 && (a.props = hn.mergeEvaluated.props(s, $.props, a.props));
      else {
        const h = s.var("props", (0, Ce._)`${w}.evaluated.props`);
        a.props = hn.mergeEvaluated.props(s, h, a.props, Ce.Name);
      }
    if (a.items !== !0)
      if ($ && !$.dynamicItems)
        $.items !== void 0 && (a.items = hn.mergeEvaluated.items(s, $.items, a.items));
      else {
        const h = s.var("items", (0, Ce._)`${w}.evaluated.items`);
        a.items = hn.mergeEvaluated.items(s, h, a.items, Ce.Name);
      }
  }
}
er.callRef = In;
er.default = v_;
Object.defineProperty(fo, "__esModule", { value: !0 });
const E_ = ho, w_ = er, S_ = [
  "$schema",
  "$id",
  "$defs",
  "$vocabulary",
  { keyword: "$comment" },
  "definitions",
  E_.default,
  w_.default
];
fo.default = S_;
var mo = {}, po = {};
Object.defineProperty(po, "__esModule", { value: !0 });
const zn = Z, gt = zn.operators, qn = {
  maximum: { okStr: "<=", ok: gt.LTE, fail: gt.GT },
  minimum: { okStr: ">=", ok: gt.GTE, fail: gt.LT },
  exclusiveMaximum: { okStr: "<", ok: gt.LT, fail: gt.GTE },
  exclusiveMinimum: { okStr: ">", ok: gt.GT, fail: gt.LTE }
}, b_ = {
  message: ({ keyword: e, schemaCode: t }) => (0, zn.str)`must be ${qn[e].okStr} ${t}`,
  params: ({ keyword: e, schemaCode: t }) => (0, zn._)`{comparison: ${qn[e].okStr}, limit: ${t}}`
}, P_ = {
  keyword: Object.keys(qn),
  type: "number",
  schemaType: "number",
  $data: !0,
  error: b_,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e;
    e.fail$data((0, zn._)`${r} ${qn[t].fail} ${n} || isNaN(${r})`);
  }
};
po.default = P_;
var yo = {};
Object.defineProperty(yo, "__esModule", { value: !0 });
const Gr = Z, N_ = {
  message: ({ schemaCode: e }) => (0, Gr.str)`must be multiple of ${e}`,
  params: ({ schemaCode: e }) => (0, Gr._)`{multipleOf: ${e}}`
}, O_ = {
  keyword: "multipleOf",
  type: "number",
  schemaType: "number",
  $data: !0,
  error: N_,
  code(e) {
    const { gen: t, data: r, schemaCode: n, it: s } = e, a = s.opts.multipleOfPrecision, i = t.let("res"), u = a ? (0, Gr._)`Math.abs(Math.round(${i}) - ${i}) > 1e-${a}` : (0, Gr._)`${i} !== parseInt(${i})`;
    e.fail$data((0, Gr._)`(${n} === 0 || (${i} = ${r}/${n}, ${u}))`);
  }
};
yo.default = O_;
var $o = {}, _o = {};
Object.defineProperty(_o, "__esModule", { value: !0 });
function yu(e) {
  const t = e.length;
  let r = 0, n = 0, s;
  for (; n < t; )
    r++, s = e.charCodeAt(n++), s >= 55296 && s <= 56319 && n < t && (s = e.charCodeAt(n), (s & 64512) === 56320 && n++);
  return r;
}
_o.default = yu;
yu.code = 'require("ajv/dist/runtime/ucs2length").default';
Object.defineProperty($o, "__esModule", { value: !0 });
const Xt = Z, R_ = L, T_ = _o, I_ = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxLength" ? "more" : "fewer";
    return (0, Xt.str)`must NOT have ${r} than ${t} characters`;
  },
  params: ({ schemaCode: e }) => (0, Xt._)`{limit: ${e}}`
}, j_ = {
  keyword: ["maxLength", "minLength"],
  type: "string",
  schemaType: "number",
  $data: !0,
  error: I_,
  code(e) {
    const { keyword: t, data: r, schemaCode: n, it: s } = e, a = t === "maxLength" ? Xt.operators.GT : Xt.operators.LT, i = s.opts.unicode === !1 ? (0, Xt._)`${r}.length` : (0, Xt._)`${(0, R_.useFunc)(e.gen, T_.default)}(${r})`;
    e.fail$data((0, Xt._)`${i} ${a} ${n}`);
  }
};
$o.default = j_;
var go = {};
Object.defineProperty(go, "__esModule", { value: !0 });
const A_ = ee, k_ = L, ur = Z, C_ = {
  message: ({ schemaCode: e }) => (0, ur.str)`must match pattern "${e}"`,
  params: ({ schemaCode: e }) => (0, ur._)`{pattern: ${e}}`
}, D_ = {
  keyword: "pattern",
  type: "string",
  schemaType: "string",
  $data: !0,
  error: C_,
  code(e) {
    const { gen: t, data: r, $data: n, schema: s, schemaCode: a, it: i } = e, u = i.opts.unicodeRegExp ? "u" : "";
    if (n) {
      const { regExp: c } = i.opts.code, d = c.code === "new RegExp" ? (0, ur._)`new RegExp` : (0, k_.useFunc)(t, c), l = t.let("valid");
      t.try(() => t.assign(l, (0, ur._)`${d}(${a}, ${u}).test(${r})`), () => t.assign(l, !1)), e.fail$data((0, ur._)`!${l}`);
    } else {
      const c = (0, A_.usePattern)(e, s);
      e.fail$data((0, ur._)`!${c}.test(${r})`);
    }
  }
};
go.default = D_;
var vo = {};
Object.defineProperty(vo, "__esModule", { value: !0 });
const Hr = Z, M_ = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxProperties" ? "more" : "fewer";
    return (0, Hr.str)`must NOT have ${r} than ${t} properties`;
  },
  params: ({ schemaCode: e }) => (0, Hr._)`{limit: ${e}}`
}, L_ = {
  keyword: ["maxProperties", "minProperties"],
  type: "object",
  schemaType: "number",
  $data: !0,
  error: M_,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e, s = t === "maxProperties" ? Hr.operators.GT : Hr.operators.LT;
    e.fail$data((0, Hr._)`Object.keys(${r}).length ${s} ${n}`);
  }
};
vo.default = L_;
var Eo = {};
Object.defineProperty(Eo, "__esModule", { value: !0 });
const kr = ee, Wr = Z, F_ = L, V_ = {
  message: ({ params: { missingProperty: e } }) => (0, Wr.str)`must have required property '${e}'`,
  params: ({ params: { missingProperty: e } }) => (0, Wr._)`{missingProperty: ${e}}`
}, U_ = {
  keyword: "required",
  type: "object",
  schemaType: "array",
  $data: !0,
  error: V_,
  code(e) {
    const { gen: t, schema: r, schemaCode: n, data: s, $data: a, it: i } = e, { opts: u } = i;
    if (!a && r.length === 0)
      return;
    const c = r.length >= u.loopRequired;
    if (i.allErrors ? d() : l(), u.strictRequired) {
      const _ = e.parentSchema.properties, { definedProperties: w } = e.it;
      for (const g of r)
        if ((_ == null ? void 0 : _[g]) === void 0 && !w.has(g)) {
          const $ = i.schemaEnv.baseId + i.errSchemaPath, h = `required property "${g}" is not defined at "${$}" (strictRequired)`;
          (0, F_.checkStrictMode)(i, h, i.opts.strictRequired);
        }
    }
    function d() {
      if (c || a)
        e.block$data(Wr.nil, m);
      else
        for (const _ of r)
          (0, kr.checkReportMissingProp)(e, _);
    }
    function l() {
      const _ = t.let("missing");
      if (c || a) {
        const w = t.let("valid", !0);
        e.block$data(w, () => P(_, w)), e.ok(w);
      } else
        t.if((0, kr.checkMissingProp)(e, r, _)), (0, kr.reportMissingProp)(e, _), t.else();
    }
    function m() {
      t.forOf("prop", n, (_) => {
        e.setParams({ missingProperty: _ }), t.if((0, kr.noPropertyInData)(t, s, _, u.ownProperties), () => e.error());
      });
    }
    function P(_, w) {
      e.setParams({ missingProperty: _ }), t.forOf(_, n, () => {
        t.assign(w, (0, kr.propertyInData)(t, s, _, u.ownProperties)), t.if((0, Wr.not)(w), () => {
          e.error(), t.break();
        });
      }, Wr.nil);
    }
  }
};
Eo.default = U_;
var wo = {};
Object.defineProperty(wo, "__esModule", { value: !0 });
const Br = Z, z_ = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxItems" ? "more" : "fewer";
    return (0, Br.str)`must NOT have ${r} than ${t} items`;
  },
  params: ({ schemaCode: e }) => (0, Br._)`{limit: ${e}}`
}, q_ = {
  keyword: ["maxItems", "minItems"],
  type: "array",
  schemaType: "number",
  $data: !0,
  error: z_,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e, s = t === "maxItems" ? Br.operators.GT : Br.operators.LT;
    e.fail$data((0, Br._)`${r}.length ${s} ${n}`);
  }
};
wo.default = q_;
var So = {}, tn = {};
Object.defineProperty(tn, "__esModule", { value: !0 });
const $u = Bn;
$u.code = 'require("ajv/dist/runtime/equal").default';
tn.default = $u;
Object.defineProperty(So, "__esModule", { value: !0 });
const gs = _e, Ee = Z, K_ = L, G_ = tn, H_ = {
  message: ({ params: { i: e, j: t } }) => (0, Ee.str)`must NOT have duplicate items (items ## ${t} and ${e} are identical)`,
  params: ({ params: { i: e, j: t } }) => (0, Ee._)`{i: ${e}, j: ${t}}`
}, W_ = {
  keyword: "uniqueItems",
  type: "array",
  schemaType: "boolean",
  $data: !0,
  error: H_,
  code(e) {
    const { gen: t, data: r, $data: n, schema: s, parentSchema: a, schemaCode: i, it: u } = e;
    if (!n && !s)
      return;
    const c = t.let("valid"), d = a.items ? (0, gs.getSchemaTypes)(a.items) : [];
    e.block$data(c, l, (0, Ee._)`${i} === false`), e.ok(c);
    function l() {
      const w = t.let("i", (0, Ee._)`${r}.length`), g = t.let("j");
      e.setParams({ i: w, j: g }), t.assign(c, !0), t.if((0, Ee._)`${w} > 1`, () => (m() ? P : _)(w, g));
    }
    function m() {
      return d.length > 0 && !d.some((w) => w === "object" || w === "array");
    }
    function P(w, g) {
      const $ = t.name("item"), h = (0, gs.checkDataTypes)(d, $, u.opts.strictNumbers, gs.DataType.Wrong), E = t.const("indices", (0, Ee._)`{}`);
      t.for((0, Ee._)`;${w}--;`, () => {
        t.let($, (0, Ee._)`${r}[${w}]`), t.if(h, (0, Ee._)`continue`), d.length > 1 && t.if((0, Ee._)`typeof ${$} == "string"`, (0, Ee._)`${$} += "_"`), t.if((0, Ee._)`typeof ${E}[${$}] == "number"`, () => {
          t.assign(g, (0, Ee._)`${E}[${$}]`), e.error(), t.assign(c, !1).break();
        }).code((0, Ee._)`${E}[${$}] = ${w}`);
      });
    }
    function _(w, g) {
      const $ = (0, K_.useFunc)(t, G_.default), h = t.name("outer");
      t.label(h).for((0, Ee._)`;${w}--;`, () => t.for((0, Ee._)`${g} = ${w}; ${g}--;`, () => t.if((0, Ee._)`${$}(${r}[${w}], ${r}[${g}])`, () => {
        e.error(), t.assign(c, !1).break(h);
      })));
    }
  }
};
So.default = W_;
var bo = {};
Object.defineProperty(bo, "__esModule", { value: !0 });
const Ks = Z, B_ = L, J_ = tn, X_ = {
  message: "must be equal to constant",
  params: ({ schemaCode: e }) => (0, Ks._)`{allowedValue: ${e}}`
}, Y_ = {
  keyword: "const",
  $data: !0,
  error: X_,
  code(e) {
    const { gen: t, data: r, $data: n, schemaCode: s, schema: a } = e;
    n || a && typeof a == "object" ? e.fail$data((0, Ks._)`!${(0, B_.useFunc)(t, J_.default)}(${r}, ${s})`) : e.fail((0, Ks._)`${a} !== ${r}`);
  }
};
bo.default = Y_;
var Po = {};
Object.defineProperty(Po, "__esModule", { value: !0 });
const Lr = Z, Q_ = L, Z_ = tn, x_ = {
  message: "must be equal to one of the allowed values",
  params: ({ schemaCode: e }) => (0, Lr._)`{allowedValues: ${e}}`
}, eg = {
  keyword: "enum",
  schemaType: "array",
  $data: !0,
  error: x_,
  code(e) {
    const { gen: t, data: r, $data: n, schema: s, schemaCode: a, it: i } = e;
    if (!n && s.length === 0)
      throw new Error("enum must have non-empty array");
    const u = s.length >= i.opts.loopEnum;
    let c;
    const d = () => c ?? (c = (0, Q_.useFunc)(t, Z_.default));
    let l;
    if (u || n)
      l = t.let("valid"), e.block$data(l, m);
    else {
      if (!Array.isArray(s))
        throw new Error("ajv implementation error");
      const _ = t.const("vSchema", a);
      l = (0, Lr.or)(...s.map((w, g) => P(_, g)));
    }
    e.pass(l);
    function m() {
      t.assign(l, !1), t.forOf("v", a, (_) => t.if((0, Lr._)`${d()}(${r}, ${_})`, () => t.assign(l, !0).break()));
    }
    function P(_, w) {
      const g = s[w];
      return typeof g == "object" && g !== null ? (0, Lr._)`${d()}(${r}, ${_}[${w}])` : (0, Lr._)`${r} === ${g}`;
    }
  }
};
Po.default = eg;
Object.defineProperty(mo, "__esModule", { value: !0 });
const tg = po, rg = yo, ng = $o, sg = go, ag = vo, og = Eo, ig = wo, cg = So, lg = bo, ug = Po, dg = [
  // number
  tg.default,
  rg.default,
  // string
  ng.default,
  sg.default,
  // object
  ag.default,
  og.default,
  // array
  ig.default,
  cg.default,
  // any
  { keyword: "type", schemaType: ["string", "array"] },
  { keyword: "nullable", schemaType: "boolean" },
  lg.default,
  ug.default
];
mo.default = dg;
var No = {}, Pr = {};
Object.defineProperty(Pr, "__esModule", { value: !0 });
Pr.validateAdditionalItems = void 0;
const Yt = Z, Gs = L, fg = {
  message: ({ params: { len: e } }) => (0, Yt.str)`must NOT have more than ${e} items`,
  params: ({ params: { len: e } }) => (0, Yt._)`{limit: ${e}}`
}, hg = {
  keyword: "additionalItems",
  type: "array",
  schemaType: ["boolean", "object"],
  before: "uniqueItems",
  error: fg,
  code(e) {
    const { parentSchema: t, it: r } = e, { items: n } = t;
    if (!Array.isArray(n)) {
      (0, Gs.checkStrictMode)(r, '"additionalItems" is ignored when "items" is not an array of schemas');
      return;
    }
    _u(e, n);
  }
};
function _u(e, t) {
  const { gen: r, schema: n, data: s, keyword: a, it: i } = e;
  i.items = !0;
  const u = r.const("len", (0, Yt._)`${s}.length`);
  if (n === !1)
    e.setParams({ len: t.length }), e.pass((0, Yt._)`${u} <= ${t.length}`);
  else if (typeof n == "object" && !(0, Gs.alwaysValidSchema)(i, n)) {
    const d = r.var("valid", (0, Yt._)`${u} <= ${t.length}`);
    r.if((0, Yt.not)(d), () => c(d)), e.ok(d);
  }
  function c(d) {
    r.forRange("i", t.length, u, (l) => {
      e.subschema({ keyword: a, dataProp: l, dataPropType: Gs.Type.Num }, d), i.allErrors || r.if((0, Yt.not)(d), () => r.break());
    });
  }
}
Pr.validateAdditionalItems = _u;
Pr.default = hg;
var Oo = {}, Nr = {};
Object.defineProperty(Nr, "__esModule", { value: !0 });
Nr.validateTuple = void 0;
const Mi = Z, jn = L, mg = ee, pg = {
  keyword: "items",
  type: "array",
  schemaType: ["object", "array", "boolean"],
  before: "uniqueItems",
  code(e) {
    const { schema: t, it: r } = e;
    if (Array.isArray(t))
      return gu(e, "additionalItems", t);
    r.items = !0, !(0, jn.alwaysValidSchema)(r, t) && e.ok((0, mg.validateArray)(e));
  }
};
function gu(e, t, r = e.schema) {
  const { gen: n, parentSchema: s, data: a, keyword: i, it: u } = e;
  l(s), u.opts.unevaluated && r.length && u.items !== !0 && (u.items = jn.mergeEvaluated.items(n, r.length, u.items));
  const c = n.name("valid"), d = n.const("len", (0, Mi._)`${a}.length`);
  r.forEach((m, P) => {
    (0, jn.alwaysValidSchema)(u, m) || (n.if((0, Mi._)`${d} > ${P}`, () => e.subschema({
      keyword: i,
      schemaProp: P,
      dataProp: P
    }, c)), e.ok(c));
  });
  function l(m) {
    const { opts: P, errSchemaPath: _ } = u, w = r.length, g = w === m.minItems && (w === m.maxItems || m[t] === !1);
    if (P.strictTuples && !g) {
      const $ = `"${i}" is ${w}-tuple, but minItems or maxItems/${t} are not specified or different at path "${_}"`;
      (0, jn.checkStrictMode)(u, $, P.strictTuples);
    }
  }
}
Nr.validateTuple = gu;
Nr.default = pg;
Object.defineProperty(Oo, "__esModule", { value: !0 });
const yg = Nr, $g = {
  keyword: "prefixItems",
  type: "array",
  schemaType: ["array"],
  before: "uniqueItems",
  code: (e) => (0, yg.validateTuple)(e, "items")
};
Oo.default = $g;
var Ro = {};
Object.defineProperty(Ro, "__esModule", { value: !0 });
const Li = Z, _g = L, gg = ee, vg = Pr, Eg = {
  message: ({ params: { len: e } }) => (0, Li.str)`must NOT have more than ${e} items`,
  params: ({ params: { len: e } }) => (0, Li._)`{limit: ${e}}`
}, wg = {
  keyword: "items",
  type: "array",
  schemaType: ["object", "boolean"],
  before: "uniqueItems",
  error: Eg,
  code(e) {
    const { schema: t, parentSchema: r, it: n } = e, { prefixItems: s } = r;
    n.items = !0, !(0, _g.alwaysValidSchema)(n, t) && (s ? (0, vg.validateAdditionalItems)(e, s) : e.ok((0, gg.validateArray)(e)));
  }
};
Ro.default = wg;
var To = {};
Object.defineProperty(To, "__esModule", { value: !0 });
const qe = Z, mn = L, Sg = {
  message: ({ params: { min: e, max: t } }) => t === void 0 ? (0, qe.str)`must contain at least ${e} valid item(s)` : (0, qe.str)`must contain at least ${e} and no more than ${t} valid item(s)`,
  params: ({ params: { min: e, max: t } }) => t === void 0 ? (0, qe._)`{minContains: ${e}}` : (0, qe._)`{minContains: ${e}, maxContains: ${t}}`
}, bg = {
  keyword: "contains",
  type: "array",
  schemaType: ["object", "boolean"],
  before: "uniqueItems",
  trackErrors: !0,
  error: Sg,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: s, it: a } = e;
    let i, u;
    const { minContains: c, maxContains: d } = n;
    a.opts.next ? (i = c === void 0 ? 1 : c, u = d) : i = 1;
    const l = t.const("len", (0, qe._)`${s}.length`);
    if (e.setParams({ min: i, max: u }), u === void 0 && i === 0) {
      (0, mn.checkStrictMode)(a, '"minContains" == 0 without "maxContains": "contains" keyword ignored');
      return;
    }
    if (u !== void 0 && i > u) {
      (0, mn.checkStrictMode)(a, '"minContains" > "maxContains" is always invalid'), e.fail();
      return;
    }
    if ((0, mn.alwaysValidSchema)(a, r)) {
      let g = (0, qe._)`${l} >= ${i}`;
      u !== void 0 && (g = (0, qe._)`${g} && ${l} <= ${u}`), e.pass(g);
      return;
    }
    a.items = !0;
    const m = t.name("valid");
    u === void 0 && i === 1 ? _(m, () => t.if(m, () => t.break())) : i === 0 ? (t.let(m, !0), u !== void 0 && t.if((0, qe._)`${s}.length > 0`, P)) : (t.let(m, !1), P()), e.result(m, () => e.reset());
    function P() {
      const g = t.name("_valid"), $ = t.let("count", 0);
      _(g, () => t.if(g, () => w($)));
    }
    function _(g, $) {
      t.forRange("i", 0, l, (h) => {
        e.subschema({
          keyword: "contains",
          dataProp: h,
          dataPropType: mn.Type.Num,
          compositeRule: !0
        }, g), $();
      });
    }
    function w(g) {
      t.code((0, qe._)`${g}++`), u === void 0 ? t.if((0, qe._)`${g} >= ${i}`, () => t.assign(m, !0).break()) : (t.if((0, qe._)`${g} > ${u}`, () => t.assign(m, !1).break()), i === 1 ? t.assign(m, !0) : t.if((0, qe._)`${g} >= ${i}`, () => t.assign(m, !0)));
    }
  }
};
To.default = bg;
var vu = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.validateSchemaDeps = e.validatePropertyDeps = e.error = void 0;
  const t = Z, r = L, n = ee;
  e.error = {
    message: ({ params: { property: c, depsCount: d, deps: l } }) => {
      const m = d === 1 ? "property" : "properties";
      return (0, t.str)`must have ${m} ${l} when property ${c} is present`;
    },
    params: ({ params: { property: c, depsCount: d, deps: l, missingProperty: m } }) => (0, t._)`{property: ${c},
    missingProperty: ${m},
    depsCount: ${d},
    deps: ${l}}`
    // TODO change to reference
  };
  const s = {
    keyword: "dependencies",
    type: "object",
    schemaType: "object",
    error: e.error,
    code(c) {
      const [d, l] = a(c);
      i(c, d), u(c, l);
    }
  };
  function a({ schema: c }) {
    const d = {}, l = {};
    for (const m in c) {
      if (m === "__proto__")
        continue;
      const P = Array.isArray(c[m]) ? d : l;
      P[m] = c[m];
    }
    return [d, l];
  }
  function i(c, d = c.schema) {
    const { gen: l, data: m, it: P } = c;
    if (Object.keys(d).length === 0)
      return;
    const _ = l.let("missing");
    for (const w in d) {
      const g = d[w];
      if (g.length === 0)
        continue;
      const $ = (0, n.propertyInData)(l, m, w, P.opts.ownProperties);
      c.setParams({
        property: w,
        depsCount: g.length,
        deps: g.join(", ")
      }), P.allErrors ? l.if($, () => {
        for (const h of g)
          (0, n.checkReportMissingProp)(c, h);
      }) : (l.if((0, t._)`${$} && (${(0, n.checkMissingProp)(c, g, _)})`), (0, n.reportMissingProp)(c, _), l.else());
    }
  }
  e.validatePropertyDeps = i;
  function u(c, d = c.schema) {
    const { gen: l, data: m, keyword: P, it: _ } = c, w = l.name("valid");
    for (const g in d)
      (0, r.alwaysValidSchema)(_, d[g]) || (l.if(
        (0, n.propertyInData)(l, m, g, _.opts.ownProperties),
        () => {
          const $ = c.subschema({ keyword: P, schemaProp: g }, w);
          c.mergeValidEvaluated($, w);
        },
        () => l.var(w, !0)
        // TODO var
      ), c.ok(w));
  }
  e.validateSchemaDeps = u, e.default = s;
})(vu);
var Io = {};
Object.defineProperty(Io, "__esModule", { value: !0 });
const Eu = Z, Pg = L, Ng = {
  message: "property name must be valid",
  params: ({ params: e }) => (0, Eu._)`{propertyName: ${e.propertyName}}`
}, Og = {
  keyword: "propertyNames",
  type: "object",
  schemaType: ["object", "boolean"],
  error: Ng,
  code(e) {
    const { gen: t, schema: r, data: n, it: s } = e;
    if ((0, Pg.alwaysValidSchema)(s, r))
      return;
    const a = t.name("valid");
    t.forIn("key", n, (i) => {
      e.setParams({ propertyName: i }), e.subschema({
        keyword: "propertyNames",
        data: i,
        dataTypes: ["string"],
        propertyName: i,
        compositeRule: !0
      }, a), t.if((0, Eu.not)(a), () => {
        e.error(!0), s.allErrors || t.break();
      });
    }), e.ok(a);
  }
};
Io.default = Og;
var rs = {};
Object.defineProperty(rs, "__esModule", { value: !0 });
const pn = ee, Be = Z, Rg = lt, yn = L, Tg = {
  message: "must NOT have additional properties",
  params: ({ params: e }) => (0, Be._)`{additionalProperty: ${e.additionalProperty}}`
}, Ig = {
  keyword: "additionalProperties",
  type: ["object"],
  schemaType: ["boolean", "object"],
  allowUndefined: !0,
  trackErrors: !0,
  error: Tg,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: s, errsCount: a, it: i } = e;
    if (!a)
      throw new Error("ajv implementation error");
    const { allErrors: u, opts: c } = i;
    if (i.props = !0, c.removeAdditional !== "all" && (0, yn.alwaysValidSchema)(i, r))
      return;
    const d = (0, pn.allSchemaProperties)(n.properties), l = (0, pn.allSchemaProperties)(n.patternProperties);
    m(), e.ok((0, Be._)`${a} === ${Rg.default.errors}`);
    function m() {
      t.forIn("key", s, ($) => {
        !d.length && !l.length ? w($) : t.if(P($), () => w($));
      });
    }
    function P($) {
      let h;
      if (d.length > 8) {
        const E = (0, yn.schemaRefOrVal)(i, n.properties, "properties");
        h = (0, pn.isOwnProperty)(t, E, $);
      } else d.length ? h = (0, Be.or)(...d.map((E) => (0, Be._)`${$} === ${E}`)) : h = Be.nil;
      return l.length && (h = (0, Be.or)(h, ...l.map((E) => (0, Be._)`${(0, pn.usePattern)(e, E)}.test(${$})`))), (0, Be.not)(h);
    }
    function _($) {
      t.code((0, Be._)`delete ${s}[${$}]`);
    }
    function w($) {
      if (c.removeAdditional === "all" || c.removeAdditional && r === !1) {
        _($);
        return;
      }
      if (r === !1) {
        e.setParams({ additionalProperty: $ }), e.error(), u || t.break();
        return;
      }
      if (typeof r == "object" && !(0, yn.alwaysValidSchema)(i, r)) {
        const h = t.name("valid");
        c.removeAdditional === "failing" ? (g($, h, !1), t.if((0, Be.not)(h), () => {
          e.reset(), _($);
        })) : (g($, h), u || t.if((0, Be.not)(h), () => t.break()));
      }
    }
    function g($, h, E) {
      const N = {
        keyword: "additionalProperties",
        dataProp: $,
        dataPropType: yn.Type.Str
      };
      E === !1 && Object.assign(N, {
        compositeRule: !0,
        createErrors: !1,
        allErrors: !1
      }), e.subschema(N, h);
    }
  }
};
rs.default = Ig;
var jo = {};
Object.defineProperty(jo, "__esModule", { value: !0 });
const jg = Ze, Fi = ee, vs = L, Vi = rs, Ag = {
  keyword: "properties",
  type: "object",
  schemaType: "object",
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: s, it: a } = e;
    a.opts.removeAdditional === "all" && n.additionalProperties === void 0 && Vi.default.code(new jg.KeywordCxt(a, Vi.default, "additionalProperties"));
    const i = (0, Fi.allSchemaProperties)(r);
    for (const m of i)
      a.definedProperties.add(m);
    a.opts.unevaluated && i.length && a.props !== !0 && (a.props = vs.mergeEvaluated.props(t, (0, vs.toHash)(i), a.props));
    const u = i.filter((m) => !(0, vs.alwaysValidSchema)(a, r[m]));
    if (u.length === 0)
      return;
    const c = t.name("valid");
    for (const m of u)
      d(m) ? l(m) : (t.if((0, Fi.propertyInData)(t, s, m, a.opts.ownProperties)), l(m), a.allErrors || t.else().var(c, !0), t.endIf()), e.it.definedProperties.add(m), e.ok(c);
    function d(m) {
      return a.opts.useDefaults && !a.compositeRule && r[m].default !== void 0;
    }
    function l(m) {
      e.subschema({
        keyword: "properties",
        schemaProp: m,
        dataProp: m
      }, c);
    }
  }
};
jo.default = Ag;
var Ao = {};
Object.defineProperty(Ao, "__esModule", { value: !0 });
const Ui = ee, $n = Z, zi = L, qi = L, kg = {
  keyword: "patternProperties",
  type: "object",
  schemaType: "object",
  code(e) {
    const { gen: t, schema: r, data: n, parentSchema: s, it: a } = e, { opts: i } = a, u = (0, Ui.allSchemaProperties)(r), c = u.filter((g) => (0, zi.alwaysValidSchema)(a, r[g]));
    if (u.length === 0 || c.length === u.length && (!a.opts.unevaluated || a.props === !0))
      return;
    const d = i.strictSchema && !i.allowMatchingProperties && s.properties, l = t.name("valid");
    a.props !== !0 && !(a.props instanceof $n.Name) && (a.props = (0, qi.evaluatedPropsToName)(t, a.props));
    const { props: m } = a;
    P();
    function P() {
      for (const g of u)
        d && _(g), a.allErrors ? w(g) : (t.var(l, !0), w(g), t.if(l));
    }
    function _(g) {
      for (const $ in d)
        new RegExp(g).test($) && (0, zi.checkStrictMode)(a, `property ${$} matches pattern ${g} (use allowMatchingProperties)`);
    }
    function w(g) {
      t.forIn("key", n, ($) => {
        t.if((0, $n._)`${(0, Ui.usePattern)(e, g)}.test(${$})`, () => {
          const h = c.includes(g);
          h || e.subschema({
            keyword: "patternProperties",
            schemaProp: g,
            dataProp: $,
            dataPropType: qi.Type.Str
          }, l), a.opts.unevaluated && m !== !0 ? t.assign((0, $n._)`${m}[${$}]`, !0) : !h && !a.allErrors && t.if((0, $n.not)(l), () => t.break());
        });
      });
    }
  }
};
Ao.default = kg;
var ko = {};
Object.defineProperty(ko, "__esModule", { value: !0 });
const Cg = L, Dg = {
  keyword: "not",
  schemaType: ["object", "boolean"],
  trackErrors: !0,
  code(e) {
    const { gen: t, schema: r, it: n } = e;
    if ((0, Cg.alwaysValidSchema)(n, r)) {
      e.fail();
      return;
    }
    const s = t.name("valid");
    e.subschema({
      keyword: "not",
      compositeRule: !0,
      createErrors: !1,
      allErrors: !1
    }, s), e.failResult(s, () => e.reset(), () => e.error());
  },
  error: { message: "must NOT be valid" }
};
ko.default = Dg;
var Co = {};
Object.defineProperty(Co, "__esModule", { value: !0 });
const Mg = ee, Lg = {
  keyword: "anyOf",
  schemaType: "array",
  trackErrors: !0,
  code: Mg.validateUnion,
  error: { message: "must match a schema in anyOf" }
};
Co.default = Lg;
var Do = {};
Object.defineProperty(Do, "__esModule", { value: !0 });
const An = Z, Fg = L, Vg = {
  message: "must match exactly one schema in oneOf",
  params: ({ params: e }) => (0, An._)`{passingSchemas: ${e.passing}}`
}, Ug = {
  keyword: "oneOf",
  schemaType: "array",
  trackErrors: !0,
  error: Vg,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, it: s } = e;
    if (!Array.isArray(r))
      throw new Error("ajv implementation error");
    if (s.opts.discriminator && n.discriminator)
      return;
    const a = r, i = t.let("valid", !1), u = t.let("passing", null), c = t.name("_valid");
    e.setParams({ passing: u }), t.block(d), e.result(i, () => e.reset(), () => e.error(!0));
    function d() {
      a.forEach((l, m) => {
        let P;
        (0, Fg.alwaysValidSchema)(s, l) ? t.var(c, !0) : P = e.subschema({
          keyword: "oneOf",
          schemaProp: m,
          compositeRule: !0
        }, c), m > 0 && t.if((0, An._)`${c} && ${i}`).assign(i, !1).assign(u, (0, An._)`[${u}, ${m}]`).else(), t.if(c, () => {
          t.assign(i, !0), t.assign(u, m), P && e.mergeEvaluated(P, An.Name);
        });
      });
    }
  }
};
Do.default = Ug;
var Mo = {};
Object.defineProperty(Mo, "__esModule", { value: !0 });
const zg = L, qg = {
  keyword: "allOf",
  schemaType: "array",
  code(e) {
    const { gen: t, schema: r, it: n } = e;
    if (!Array.isArray(r))
      throw new Error("ajv implementation error");
    const s = t.name("valid");
    r.forEach((a, i) => {
      if ((0, zg.alwaysValidSchema)(n, a))
        return;
      const u = e.subschema({ keyword: "allOf", schemaProp: i }, s);
      e.ok(s), e.mergeEvaluated(u);
    });
  }
};
Mo.default = qg;
var Lo = {};
Object.defineProperty(Lo, "__esModule", { value: !0 });
const Kn = Z, wu = L, Kg = {
  message: ({ params: e }) => (0, Kn.str)`must match "${e.ifClause}" schema`,
  params: ({ params: e }) => (0, Kn._)`{failingKeyword: ${e.ifClause}}`
}, Gg = {
  keyword: "if",
  schemaType: ["object", "boolean"],
  trackErrors: !0,
  error: Kg,
  code(e) {
    const { gen: t, parentSchema: r, it: n } = e;
    r.then === void 0 && r.else === void 0 && (0, wu.checkStrictMode)(n, '"if" without "then" and "else" is ignored');
    const s = Ki(n, "then"), a = Ki(n, "else");
    if (!s && !a)
      return;
    const i = t.let("valid", !0), u = t.name("_valid");
    if (c(), e.reset(), s && a) {
      const l = t.let("ifClause");
      e.setParams({ ifClause: l }), t.if(u, d("then", l), d("else", l));
    } else s ? t.if(u, d("then")) : t.if((0, Kn.not)(u), d("else"));
    e.pass(i, () => e.error(!0));
    function c() {
      const l = e.subschema({
        keyword: "if",
        compositeRule: !0,
        createErrors: !1,
        allErrors: !1
      }, u);
      e.mergeEvaluated(l);
    }
    function d(l, m) {
      return () => {
        const P = e.subschema({ keyword: l }, u);
        t.assign(i, u), e.mergeValidEvaluated(P, i), m ? t.assign(m, (0, Kn._)`${l}`) : e.setParams({ ifClause: l });
      };
    }
  }
};
function Ki(e, t) {
  const r = e.schema[t];
  return r !== void 0 && !(0, wu.alwaysValidSchema)(e, r);
}
Lo.default = Gg;
var Fo = {};
Object.defineProperty(Fo, "__esModule", { value: !0 });
const Hg = L, Wg = {
  keyword: ["then", "else"],
  schemaType: ["object", "boolean"],
  code({ keyword: e, parentSchema: t, it: r }) {
    t.if === void 0 && (0, Hg.checkStrictMode)(r, `"${e}" without "if" is ignored`);
  }
};
Fo.default = Wg;
Object.defineProperty(No, "__esModule", { value: !0 });
const Bg = Pr, Jg = Oo, Xg = Nr, Yg = Ro, Qg = To, Zg = vu, xg = Io, e0 = rs, t0 = jo, r0 = Ao, n0 = ko, s0 = Co, a0 = Do, o0 = Mo, i0 = Lo, c0 = Fo;
function l0(e = !1) {
  const t = [
    // any
    n0.default,
    s0.default,
    a0.default,
    o0.default,
    i0.default,
    c0.default,
    // object
    xg.default,
    e0.default,
    Zg.default,
    t0.default,
    r0.default
  ];
  return e ? t.push(Jg.default, Yg.default) : t.push(Bg.default, Xg.default), t.push(Qg.default), t;
}
No.default = l0;
var Vo = {}, Uo = {};
Object.defineProperty(Uo, "__esModule", { value: !0 });
const ye = Z, u0 = {
  message: ({ schemaCode: e }) => (0, ye.str)`must match format "${e}"`,
  params: ({ schemaCode: e }) => (0, ye._)`{format: ${e}}`
}, d0 = {
  keyword: "format",
  type: ["number", "string"],
  schemaType: "string",
  $data: !0,
  error: u0,
  code(e, t) {
    const { gen: r, data: n, $data: s, schema: a, schemaCode: i, it: u } = e, { opts: c, errSchemaPath: d, schemaEnv: l, self: m } = u;
    if (!c.validateFormats)
      return;
    s ? P() : _();
    function P() {
      const w = r.scopeValue("formats", {
        ref: m.formats,
        code: c.code.formats
      }), g = r.const("fDef", (0, ye._)`${w}[${i}]`), $ = r.let("fType"), h = r.let("format");
      r.if((0, ye._)`typeof ${g} == "object" && !(${g} instanceof RegExp)`, () => r.assign($, (0, ye._)`${g}.type || "string"`).assign(h, (0, ye._)`${g}.validate`), () => r.assign($, (0, ye._)`"string"`).assign(h, g)), e.fail$data((0, ye.or)(E(), N()));
      function E() {
        return c.strictSchema === !1 ? ye.nil : (0, ye._)`${i} && !${h}`;
      }
      function N() {
        const R = l.$async ? (0, ye._)`(${g}.async ? await ${h}(${n}) : ${h}(${n}))` : (0, ye._)`${h}(${n})`, I = (0, ye._)`(typeof ${h} == "function" ? ${R} : ${h}.test(${n}))`;
        return (0, ye._)`${h} && ${h} !== true && ${$} === ${t} && !${I}`;
      }
    }
    function _() {
      const w = m.formats[a];
      if (!w) {
        E();
        return;
      }
      if (w === !0)
        return;
      const [g, $, h] = N(w);
      g === t && e.pass(R());
      function E() {
        if (c.strictSchema === !1) {
          m.logger.warn(I());
          return;
        }
        throw new Error(I());
        function I() {
          return `unknown format "${a}" ignored in schema at path "${d}"`;
        }
      }
      function N(I) {
        const z = I instanceof RegExp ? (0, ye.regexpCode)(I) : c.code.formats ? (0, ye._)`${c.code.formats}${(0, ye.getProperty)(a)}` : void 0, W = r.scopeValue("formats", { key: a, ref: I, code: z });
        return typeof I == "object" && !(I instanceof RegExp) ? [I.type || "string", I.validate, (0, ye._)`${W}.validate`] : ["string", I, W];
      }
      function R() {
        if (typeof w == "object" && !(w instanceof RegExp) && w.async) {
          if (!l.$async)
            throw new Error("async format in sync schema");
          return (0, ye._)`await ${h}(${n})`;
        }
        return typeof $ == "function" ? (0, ye._)`${h}(${n})` : (0, ye._)`${h}.test(${n})`;
      }
    }
  }
};
Uo.default = d0;
Object.defineProperty(Vo, "__esModule", { value: !0 });
const f0 = Uo, h0 = [f0.default];
Vo.default = h0;
var vr = {};
Object.defineProperty(vr, "__esModule", { value: !0 });
vr.contentVocabulary = vr.metadataVocabulary = void 0;
vr.metadataVocabulary = [
  "title",
  "description",
  "default",
  "deprecated",
  "readOnly",
  "writeOnly",
  "examples"
];
vr.contentVocabulary = [
  "contentMediaType",
  "contentEncoding",
  "contentSchema"
];
Object.defineProperty(uo, "__esModule", { value: !0 });
const m0 = fo, p0 = mo, y0 = No, $0 = Vo, Gi = vr, _0 = [
  m0.default,
  p0.default,
  (0, y0.default)(),
  $0.default,
  Gi.metadataVocabulary,
  Gi.contentVocabulary
];
uo.default = _0;
var zo = {}, ns = {};
Object.defineProperty(ns, "__esModule", { value: !0 });
ns.DiscrError = void 0;
var Hi;
(function(e) {
  e.Tag = "tag", e.Mapping = "mapping";
})(Hi || (ns.DiscrError = Hi = {}));
Object.defineProperty(zo, "__esModule", { value: !0 });
const ir = Z, Hs = ns, Wi = Me, g0 = br, v0 = L, E0 = {
  message: ({ params: { discrError: e, tagName: t } }) => e === Hs.DiscrError.Tag ? `tag "${t}" must be string` : `value of tag "${t}" must be in oneOf`,
  params: ({ params: { discrError: e, tag: t, tagName: r } }) => (0, ir._)`{error: ${e}, tag: ${r}, tagValue: ${t}}`
}, w0 = {
  keyword: "discriminator",
  type: "object",
  schemaType: "object",
  error: E0,
  code(e) {
    const { gen: t, data: r, schema: n, parentSchema: s, it: a } = e, { oneOf: i } = s;
    if (!a.opts.discriminator)
      throw new Error("discriminator: requires discriminator option");
    const u = n.propertyName;
    if (typeof u != "string")
      throw new Error("discriminator: requires propertyName");
    if (n.mapping)
      throw new Error("discriminator: mapping is not supported");
    if (!i)
      throw new Error("discriminator: requires oneOf keyword");
    const c = t.let("valid", !1), d = t.const("tag", (0, ir._)`${r}${(0, ir.getProperty)(u)}`);
    t.if((0, ir._)`typeof ${d} == "string"`, () => l(), () => e.error(!1, { discrError: Hs.DiscrError.Tag, tag: d, tagName: u })), e.ok(c);
    function l() {
      const _ = P();
      t.if(!1);
      for (const w in _)
        t.elseIf((0, ir._)`${d} === ${w}`), t.assign(c, m(_[w]));
      t.else(), e.error(!1, { discrError: Hs.DiscrError.Mapping, tag: d, tagName: u }), t.endIf();
    }
    function m(_) {
      const w = t.name("valid"), g = e.subschema({ keyword: "oneOf", schemaProp: _ }, w);
      return e.mergeEvaluated(g, ir.Name), w;
    }
    function P() {
      var _;
      const w = {}, g = h(s);
      let $ = !0;
      for (let R = 0; R < i.length; R++) {
        let I = i[R];
        if (I != null && I.$ref && !(0, v0.schemaHasRulesButRef)(I, a.self.RULES)) {
          const W = I.$ref;
          if (I = Wi.resolveRef.call(a.self, a.schemaEnv.root, a.baseId, W), I instanceof Wi.SchemaEnv && (I = I.schema), I === void 0)
            throw new g0.default(a.opts.uriResolver, a.baseId, W);
        }
        const z = (_ = I == null ? void 0 : I.properties) === null || _ === void 0 ? void 0 : _[u];
        if (typeof z != "object")
          throw new Error(`discriminator: oneOf subschemas (or referenced schemas) must have "properties/${u}"`);
        $ = $ && (g || h(I)), E(z, R);
      }
      if (!$)
        throw new Error(`discriminator: "${u}" must be required`);
      return w;
      function h({ required: R }) {
        return Array.isArray(R) && R.includes(u);
      }
      function E(R, I) {
        if (R.const)
          N(R.const, I);
        else if (R.enum)
          for (const z of R.enum)
            N(z, I);
        else
          throw new Error(`discriminator: "properties/${u}" must have "const" or "enum"`);
      }
      function N(R, I) {
        if (typeof R != "string" || R in w)
          throw new Error(`discriminator: "${u}" values must be unique strings`);
        w[R] = I;
      }
    }
  }
};
zo.default = w0;
const S0 = "http://json-schema.org/draft-07/schema#", b0 = "http://json-schema.org/draft-07/schema#", P0 = "Core schema meta-schema", N0 = {
  schemaArray: {
    type: "array",
    minItems: 1,
    items: {
      $ref: "#"
    }
  },
  nonNegativeInteger: {
    type: "integer",
    minimum: 0
  },
  nonNegativeIntegerDefault0: {
    allOf: [
      {
        $ref: "#/definitions/nonNegativeInteger"
      },
      {
        default: 0
      }
    ]
  },
  simpleTypes: {
    enum: [
      "array",
      "boolean",
      "integer",
      "null",
      "number",
      "object",
      "string"
    ]
  },
  stringArray: {
    type: "array",
    items: {
      type: "string"
    },
    uniqueItems: !0,
    default: []
  }
}, O0 = [
  "object",
  "boolean"
], R0 = {
  $id: {
    type: "string",
    format: "uri-reference"
  },
  $schema: {
    type: "string",
    format: "uri"
  },
  $ref: {
    type: "string",
    format: "uri-reference"
  },
  $comment: {
    type: "string"
  },
  title: {
    type: "string"
  },
  description: {
    type: "string"
  },
  default: !0,
  readOnly: {
    type: "boolean",
    default: !1
  },
  examples: {
    type: "array",
    items: !0
  },
  multipleOf: {
    type: "number",
    exclusiveMinimum: 0
  },
  maximum: {
    type: "number"
  },
  exclusiveMaximum: {
    type: "number"
  },
  minimum: {
    type: "number"
  },
  exclusiveMinimum: {
    type: "number"
  },
  maxLength: {
    $ref: "#/definitions/nonNegativeInteger"
  },
  minLength: {
    $ref: "#/definitions/nonNegativeIntegerDefault0"
  },
  pattern: {
    type: "string",
    format: "regex"
  },
  additionalItems: {
    $ref: "#"
  },
  items: {
    anyOf: [
      {
        $ref: "#"
      },
      {
        $ref: "#/definitions/schemaArray"
      }
    ],
    default: !0
  },
  maxItems: {
    $ref: "#/definitions/nonNegativeInteger"
  },
  minItems: {
    $ref: "#/definitions/nonNegativeIntegerDefault0"
  },
  uniqueItems: {
    type: "boolean",
    default: !1
  },
  contains: {
    $ref: "#"
  },
  maxProperties: {
    $ref: "#/definitions/nonNegativeInteger"
  },
  minProperties: {
    $ref: "#/definitions/nonNegativeIntegerDefault0"
  },
  required: {
    $ref: "#/definitions/stringArray"
  },
  additionalProperties: {
    $ref: "#"
  },
  definitions: {
    type: "object",
    additionalProperties: {
      $ref: "#"
    },
    default: {}
  },
  properties: {
    type: "object",
    additionalProperties: {
      $ref: "#"
    },
    default: {}
  },
  patternProperties: {
    type: "object",
    additionalProperties: {
      $ref: "#"
    },
    propertyNames: {
      format: "regex"
    },
    default: {}
  },
  dependencies: {
    type: "object",
    additionalProperties: {
      anyOf: [
        {
          $ref: "#"
        },
        {
          $ref: "#/definitions/stringArray"
        }
      ]
    }
  },
  propertyNames: {
    $ref: "#"
  },
  const: !0,
  enum: {
    type: "array",
    items: !0,
    minItems: 1,
    uniqueItems: !0
  },
  type: {
    anyOf: [
      {
        $ref: "#/definitions/simpleTypes"
      },
      {
        type: "array",
        items: {
          $ref: "#/definitions/simpleTypes"
        },
        minItems: 1,
        uniqueItems: !0
      }
    ]
  },
  format: {
    type: "string"
  },
  contentMediaType: {
    type: "string"
  },
  contentEncoding: {
    type: "string"
  },
  if: {
    $ref: "#"
  },
  then: {
    $ref: "#"
  },
  else: {
    $ref: "#"
  },
  allOf: {
    $ref: "#/definitions/schemaArray"
  },
  anyOf: {
    $ref: "#/definitions/schemaArray"
  },
  oneOf: {
    $ref: "#/definitions/schemaArray"
  },
  not: {
    $ref: "#"
  }
}, T0 = {
  $schema: S0,
  $id: b0,
  title: P0,
  definitions: N0,
  type: O0,
  properties: R0,
  default: !0
};
(function(e, t) {
  Object.defineProperty(t, "__esModule", { value: !0 }), t.MissingRefError = t.ValidationError = t.CodeGen = t.Name = t.nil = t.stringify = t.str = t._ = t.KeywordCxt = t.Ajv = void 0;
  const r = Ml, n = uo, s = zo, a = T0, i = ["/properties"], u = "http://json-schema.org/draft-07/schema";
  class c extends r.default {
    _addVocabularies() {
      super._addVocabularies(), n.default.forEach((w) => this.addVocabulary(w)), this.opts.discriminator && this.addKeyword(s.default);
    }
    _addDefaultMetaSchema() {
      if (super._addDefaultMetaSchema(), !this.opts.meta)
        return;
      const w = this.opts.$data ? this.$dataMetaSchema(a, i) : a;
      this.addMetaSchema(w, u, !1), this.refs["http://json-schema.org/schema"] = u;
    }
    defaultMeta() {
      return this.opts.defaultMeta = super.defaultMeta() || (this.getSchema(u) ? u : void 0);
    }
  }
  t.Ajv = c, e.exports = t = c, e.exports.Ajv = c, Object.defineProperty(t, "__esModule", { value: !0 }), t.default = c;
  var d = Ze;
  Object.defineProperty(t, "KeywordCxt", { enumerable: !0, get: function() {
    return d.KeywordCxt;
  } });
  var l = Z;
  Object.defineProperty(t, "_", { enumerable: !0, get: function() {
    return l._;
  } }), Object.defineProperty(t, "str", { enumerable: !0, get: function() {
    return l.str;
  } }), Object.defineProperty(t, "stringify", { enumerable: !0, get: function() {
    return l.stringify;
  } }), Object.defineProperty(t, "nil", { enumerable: !0, get: function() {
    return l.nil;
  } }), Object.defineProperty(t, "Name", { enumerable: !0, get: function() {
    return l.Name;
  } }), Object.defineProperty(t, "CodeGen", { enumerable: !0, get: function() {
    return l.CodeGen;
  } });
  var m = en;
  Object.defineProperty(t, "ValidationError", { enumerable: !0, get: function() {
    return m.default;
  } });
  var P = br;
  Object.defineProperty(t, "MissingRefError", { enumerable: !0, get: function() {
    return P.default;
  } });
})(Fs, Fs.exports);
var I0 = Fs.exports;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.formatLimitDefinition = void 0;
  const t = I0, r = Z, n = r.operators, s = {
    formatMaximum: { okStr: "<=", ok: n.LTE, fail: n.GT },
    formatMinimum: { okStr: ">=", ok: n.GTE, fail: n.LT },
    formatExclusiveMaximum: { okStr: "<", ok: n.LT, fail: n.GTE },
    formatExclusiveMinimum: { okStr: ">", ok: n.GT, fail: n.LTE }
  }, a = {
    message: ({ keyword: u, schemaCode: c }) => r.str`should be ${s[u].okStr} ${c}`,
    params: ({ keyword: u, schemaCode: c }) => r._`{comparison: ${s[u].okStr}, limit: ${c}}`
  };
  e.formatLimitDefinition = {
    keyword: Object.keys(s),
    type: "string",
    schemaType: "string",
    $data: !0,
    error: a,
    code(u) {
      const { gen: c, data: d, schemaCode: l, keyword: m, it: P } = u, { opts: _, self: w } = P;
      if (!_.validateFormats)
        return;
      const g = new t.KeywordCxt(P, w.RULES.all.format.definition, "format");
      g.$data ? $() : h();
      function $() {
        const N = c.scopeValue("formats", {
          ref: w.formats,
          code: _.code.formats
        }), R = c.const("fmt", r._`${N}[${g.schemaCode}]`);
        u.fail$data(r.or(r._`typeof ${R} != "object"`, r._`${R} instanceof RegExp`, r._`typeof ${R}.compare != "function"`, E(R)));
      }
      function h() {
        const N = g.schema, R = w.formats[N];
        if (!R || R === !0)
          return;
        if (typeof R != "object" || R instanceof RegExp || typeof R.compare != "function")
          throw new Error(`"${m}": format "${N}" does not define "compare" function`);
        const I = c.scopeValue("formats", {
          key: N,
          ref: R,
          code: _.code.formats ? r._`${_.code.formats}${r.getProperty(N)}` : void 0
        });
        u.fail$data(E(I));
      }
      function E(N) {
        return r._`${N}.compare(${d}, ${l}) ${s[m].fail} 0`;
      }
    },
    dependencies: ["format"]
  };
  const i = (u) => (u.addKeyword(e.formatLimitDefinition), u);
  e.default = i;
})(Dl);
(function(e, t) {
  Object.defineProperty(t, "__esModule", { value: !0 });
  const r = Cl, n = Dl, s = Z, a = new s.Name("fullFormats"), i = new s.Name("fastFormats"), u = (d, l = { keywords: !0 }) => {
    if (Array.isArray(l))
      return c(d, l, r.fullFormats, a), d;
    const [m, P] = l.mode === "fast" ? [r.fastFormats, i] : [r.fullFormats, a], _ = l.formats || r.formatNames;
    return c(d, _, m, P), l.keywords && n.default(d), d;
  };
  u.get = (d, l = "full") => {
    const P = (l === "fast" ? r.fastFormats : r.fullFormats)[d];
    if (!P)
      throw new Error(`Unknown format "${d}"`);
    return P;
  };
  function c(d, l, m, P) {
    var _, w;
    (_ = (w = d.opts.code).formats) !== null && _ !== void 0 || (w.formats = s._`require("ajv-formats/dist/formats").${P}`);
    for (const g of l)
      d.addFormat(g, m[g]);
  }
  e.exports = t = u, Object.defineProperty(t, "__esModule", { value: !0 }), t.default = u;
})(Ls, Ls.exports);
var j0 = Ls.exports;
const A0 = (e, t, r, n) => {
  if (r === "length" || r === "prototype" || r === "arguments" || r === "caller")
    return;
  const s = Object.getOwnPropertyDescriptor(e, r), a = Object.getOwnPropertyDescriptor(t, r);
  !k0(s, a) && n || Object.defineProperty(e, r, a);
}, k0 = function(e, t) {
  return e === void 0 || e.configurable || e.writable === t.writable && e.enumerable === t.enumerable && e.configurable === t.configurable && (e.writable || e.value === t.value);
}, C0 = (e, t) => {
  const r = Object.getPrototypeOf(t);
  r !== Object.getPrototypeOf(e) && Object.setPrototypeOf(e, r);
}, D0 = (e, t) => `/* Wrapped ${e}*/
${t}`, M0 = Object.getOwnPropertyDescriptor(Function.prototype, "toString"), L0 = Object.getOwnPropertyDescriptor(Function.prototype.toString, "name"), F0 = (e, t, r) => {
  const n = r === "" ? "" : `with ${r.trim()}() `, s = D0.bind(null, n, t.toString());
  Object.defineProperty(s, "name", L0), Object.defineProperty(e, "toString", { ...M0, value: s });
}, V0 = (e, t, { ignoreNonConfigurable: r = !1 } = {}) => {
  const { name: n } = e;
  for (const s of Reflect.ownKeys(t))
    A0(e, t, s, r);
  return C0(e, t), F0(e, t, n), e;
};
var U0 = V0;
const z0 = U0;
var q0 = (e, t = {}) => {
  if (typeof e != "function")
    throw new TypeError(`Expected the first argument to be a function, got \`${typeof e}\``);
  const {
    wait: r = 0,
    before: n = !1,
    after: s = !0
  } = t;
  if (!n && !s)
    throw new Error("Both `before` and `after` are false, function wouldn't be called.");
  let a, i;
  const u = function(...c) {
    const d = this, l = () => {
      a = void 0, s && (i = e.apply(d, c));
    }, m = n && !a;
    return clearTimeout(a), a = setTimeout(l, r), m && (i = e.apply(d, c)), i;
  };
  return z0(u, e), u.cancel = () => {
    a && (clearTimeout(a), a = void 0);
  }, u;
}, Ws = { exports: {} };
const K0 = "2.0.0", Su = 256, G0 = Number.MAX_SAFE_INTEGER || /* istanbul ignore next */
9007199254740991, H0 = 16, W0 = Su - 6, B0 = [
  "major",
  "premajor",
  "minor",
  "preminor",
  "patch",
  "prepatch",
  "prerelease"
];
var ss = {
  MAX_LENGTH: Su,
  MAX_SAFE_COMPONENT_LENGTH: H0,
  MAX_SAFE_BUILD_LENGTH: W0,
  MAX_SAFE_INTEGER: G0,
  RELEASE_TYPES: B0,
  SEMVER_SPEC_VERSION: K0,
  FLAG_INCLUDE_PRERELEASE: 1,
  FLAG_LOOSE: 2
};
const J0 = typeof process == "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? (...e) => console.error("SEMVER", ...e) : () => {
};
var as = J0;
(function(e, t) {
  const {
    MAX_SAFE_COMPONENT_LENGTH: r,
    MAX_SAFE_BUILD_LENGTH: n,
    MAX_LENGTH: s
  } = ss, a = as;
  t = e.exports = {};
  const i = t.re = [], u = t.safeRe = [], c = t.src = [], d = t.safeSrc = [], l = t.t = {};
  let m = 0;
  const P = "[a-zA-Z0-9-]", _ = [
    ["\\s", 1],
    ["\\d", s],
    [P, n]
  ], w = ($) => {
    for (const [h, E] of _)
      $ = $.split(`${h}*`).join(`${h}{0,${E}}`).split(`${h}+`).join(`${h}{1,${E}}`);
    return $;
  }, g = ($, h, E) => {
    const N = w(h), R = m++;
    a($, R, h), l[$] = R, c[R] = h, d[R] = N, i[R] = new RegExp(h, E ? "g" : void 0), u[R] = new RegExp(N, E ? "g" : void 0);
  };
  g("NUMERICIDENTIFIER", "0|[1-9]\\d*"), g("NUMERICIDENTIFIERLOOSE", "\\d+"), g("NONNUMERICIDENTIFIER", `\\d*[a-zA-Z-]${P}*`), g("MAINVERSION", `(${c[l.NUMERICIDENTIFIER]})\\.(${c[l.NUMERICIDENTIFIER]})\\.(${c[l.NUMERICIDENTIFIER]})`), g("MAINVERSIONLOOSE", `(${c[l.NUMERICIDENTIFIERLOOSE]})\\.(${c[l.NUMERICIDENTIFIERLOOSE]})\\.(${c[l.NUMERICIDENTIFIERLOOSE]})`), g("PRERELEASEIDENTIFIER", `(?:${c[l.NONNUMERICIDENTIFIER]}|${c[l.NUMERICIDENTIFIER]})`), g("PRERELEASEIDENTIFIERLOOSE", `(?:${c[l.NONNUMERICIDENTIFIER]}|${c[l.NUMERICIDENTIFIERLOOSE]})`), g("PRERELEASE", `(?:-(${c[l.PRERELEASEIDENTIFIER]}(?:\\.${c[l.PRERELEASEIDENTIFIER]})*))`), g("PRERELEASELOOSE", `(?:-?(${c[l.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${c[l.PRERELEASEIDENTIFIERLOOSE]})*))`), g("BUILDIDENTIFIER", `${P}+`), g("BUILD", `(?:\\+(${c[l.BUILDIDENTIFIER]}(?:\\.${c[l.BUILDIDENTIFIER]})*))`), g("FULLPLAIN", `v?${c[l.MAINVERSION]}${c[l.PRERELEASE]}?${c[l.BUILD]}?`), g("FULL", `^${c[l.FULLPLAIN]}$`), g("LOOSEPLAIN", `[v=\\s]*${c[l.MAINVERSIONLOOSE]}${c[l.PRERELEASELOOSE]}?${c[l.BUILD]}?`), g("LOOSE", `^${c[l.LOOSEPLAIN]}$`), g("GTLT", "((?:<|>)?=?)"), g("XRANGEIDENTIFIERLOOSE", `${c[l.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`), g("XRANGEIDENTIFIER", `${c[l.NUMERICIDENTIFIER]}|x|X|\\*`), g("XRANGEPLAIN", `[v=\\s]*(${c[l.XRANGEIDENTIFIER]})(?:\\.(${c[l.XRANGEIDENTIFIER]})(?:\\.(${c[l.XRANGEIDENTIFIER]})(?:${c[l.PRERELEASE]})?${c[l.BUILD]}?)?)?`), g("XRANGEPLAINLOOSE", `[v=\\s]*(${c[l.XRANGEIDENTIFIERLOOSE]})(?:\\.(${c[l.XRANGEIDENTIFIERLOOSE]})(?:\\.(${c[l.XRANGEIDENTIFIERLOOSE]})(?:${c[l.PRERELEASELOOSE]})?${c[l.BUILD]}?)?)?`), g("XRANGE", `^${c[l.GTLT]}\\s*${c[l.XRANGEPLAIN]}$`), g("XRANGELOOSE", `^${c[l.GTLT]}\\s*${c[l.XRANGEPLAINLOOSE]}$`), g("COERCEPLAIN", `(^|[^\\d])(\\d{1,${r}})(?:\\.(\\d{1,${r}}))?(?:\\.(\\d{1,${r}}))?`), g("COERCE", `${c[l.COERCEPLAIN]}(?:$|[^\\d])`), g("COERCEFULL", c[l.COERCEPLAIN] + `(?:${c[l.PRERELEASE]})?(?:${c[l.BUILD]})?(?:$|[^\\d])`), g("COERCERTL", c[l.COERCE], !0), g("COERCERTLFULL", c[l.COERCEFULL], !0), g("LONETILDE", "(?:~>?)"), g("TILDETRIM", `(\\s*)${c[l.LONETILDE]}\\s+`, !0), t.tildeTrimReplace = "$1~", g("TILDE", `^${c[l.LONETILDE]}${c[l.XRANGEPLAIN]}$`), g("TILDELOOSE", `^${c[l.LONETILDE]}${c[l.XRANGEPLAINLOOSE]}$`), g("LONECARET", "(?:\\^)"), g("CARETTRIM", `(\\s*)${c[l.LONECARET]}\\s+`, !0), t.caretTrimReplace = "$1^", g("CARET", `^${c[l.LONECARET]}${c[l.XRANGEPLAIN]}$`), g("CARETLOOSE", `^${c[l.LONECARET]}${c[l.XRANGEPLAINLOOSE]}$`), g("COMPARATORLOOSE", `^${c[l.GTLT]}\\s*(${c[l.LOOSEPLAIN]})$|^$`), g("COMPARATOR", `^${c[l.GTLT]}\\s*(${c[l.FULLPLAIN]})$|^$`), g("COMPARATORTRIM", `(\\s*)${c[l.GTLT]}\\s*(${c[l.LOOSEPLAIN]}|${c[l.XRANGEPLAIN]})`, !0), t.comparatorTrimReplace = "$1$2$3", g("HYPHENRANGE", `^\\s*(${c[l.XRANGEPLAIN]})\\s+-\\s+(${c[l.XRANGEPLAIN]})\\s*$`), g("HYPHENRANGELOOSE", `^\\s*(${c[l.XRANGEPLAINLOOSE]})\\s+-\\s+(${c[l.XRANGEPLAINLOOSE]})\\s*$`), g("STAR", "(<|>)?=?\\s*\\*"), g("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$"), g("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
})(Ws, Ws.exports);
var rn = Ws.exports;
const X0 = Object.freeze({ loose: !0 }), Y0 = Object.freeze({}), Q0 = (e) => e ? typeof e != "object" ? X0 : e : Y0;
var qo = Q0;
const Bi = /^[0-9]+$/, bu = (e, t) => {
  if (typeof e == "number" && typeof t == "number")
    return e === t ? 0 : e < t ? -1 : 1;
  const r = Bi.test(e), n = Bi.test(t);
  return r && n && (e = +e, t = +t), e === t ? 0 : r && !n ? -1 : n && !r ? 1 : e < t ? -1 : 1;
}, Z0 = (e, t) => bu(t, e);
var Pu = {
  compareIdentifiers: bu,
  rcompareIdentifiers: Z0
};
const _n = as, { MAX_LENGTH: Ji, MAX_SAFE_INTEGER: gn } = ss, { safeRe: vn, t: En } = rn, x0 = qo, { compareIdentifiers: Es } = Pu;
let ev = class tt {
  constructor(t, r) {
    if (r = x0(r), t instanceof tt) {
      if (t.loose === !!r.loose && t.includePrerelease === !!r.includePrerelease)
        return t;
      t = t.version;
    } else if (typeof t != "string")
      throw new TypeError(`Invalid version. Must be a string. Got type "${typeof t}".`);
    if (t.length > Ji)
      throw new TypeError(
        `version is longer than ${Ji} characters`
      );
    _n("SemVer", t, r), this.options = r, this.loose = !!r.loose, this.includePrerelease = !!r.includePrerelease;
    const n = t.trim().match(r.loose ? vn[En.LOOSE] : vn[En.FULL]);
    if (!n)
      throw new TypeError(`Invalid Version: ${t}`);
    if (this.raw = t, this.major = +n[1], this.minor = +n[2], this.patch = +n[3], this.major > gn || this.major < 0)
      throw new TypeError("Invalid major version");
    if (this.minor > gn || this.minor < 0)
      throw new TypeError("Invalid minor version");
    if (this.patch > gn || this.patch < 0)
      throw new TypeError("Invalid patch version");
    n[4] ? this.prerelease = n[4].split(".").map((s) => {
      if (/^[0-9]+$/.test(s)) {
        const a = +s;
        if (a >= 0 && a < gn)
          return a;
      }
      return s;
    }) : this.prerelease = [], this.build = n[5] ? n[5].split(".") : [], this.format();
  }
  format() {
    return this.version = `${this.major}.${this.minor}.${this.patch}`, this.prerelease.length && (this.version += `-${this.prerelease.join(".")}`), this.version;
  }
  toString() {
    return this.version;
  }
  compare(t) {
    if (_n("SemVer.compare", this.version, this.options, t), !(t instanceof tt)) {
      if (typeof t == "string" && t === this.version)
        return 0;
      t = new tt(t, this.options);
    }
    return t.version === this.version ? 0 : this.compareMain(t) || this.comparePre(t);
  }
  compareMain(t) {
    return t instanceof tt || (t = new tt(t, this.options)), this.major < t.major ? -1 : this.major > t.major ? 1 : this.minor < t.minor ? -1 : this.minor > t.minor ? 1 : this.patch < t.patch ? -1 : this.patch > t.patch ? 1 : 0;
  }
  comparePre(t) {
    if (t instanceof tt || (t = new tt(t, this.options)), this.prerelease.length && !t.prerelease.length)
      return -1;
    if (!this.prerelease.length && t.prerelease.length)
      return 1;
    if (!this.prerelease.length && !t.prerelease.length)
      return 0;
    let r = 0;
    do {
      const n = this.prerelease[r], s = t.prerelease[r];
      if (_n("prerelease compare", r, n, s), n === void 0 && s === void 0)
        return 0;
      if (s === void 0)
        return 1;
      if (n === void 0)
        return -1;
      if (n === s)
        continue;
      return Es(n, s);
    } while (++r);
  }
  compareBuild(t) {
    t instanceof tt || (t = new tt(t, this.options));
    let r = 0;
    do {
      const n = this.build[r], s = t.build[r];
      if (_n("build compare", r, n, s), n === void 0 && s === void 0)
        return 0;
      if (s === void 0)
        return 1;
      if (n === void 0)
        return -1;
      if (n === s)
        continue;
      return Es(n, s);
    } while (++r);
  }
  // preminor will bump the version up to the next minor release, and immediately
  // down to pre-release. premajor and prepatch work the same way.
  inc(t, r, n) {
    if (t.startsWith("pre")) {
      if (!r && n === !1)
        throw new Error("invalid increment argument: identifier is empty");
      if (r) {
        const s = `-${r}`.match(this.options.loose ? vn[En.PRERELEASELOOSE] : vn[En.PRERELEASE]);
        if (!s || s[1] !== r)
          throw new Error(`invalid identifier: ${r}`);
      }
    }
    switch (t) {
      case "premajor":
        this.prerelease.length = 0, this.patch = 0, this.minor = 0, this.major++, this.inc("pre", r, n);
        break;
      case "preminor":
        this.prerelease.length = 0, this.patch = 0, this.minor++, this.inc("pre", r, n);
        break;
      case "prepatch":
        this.prerelease.length = 0, this.inc("patch", r, n), this.inc("pre", r, n);
        break;
      case "prerelease":
        this.prerelease.length === 0 && this.inc("patch", r, n), this.inc("pre", r, n);
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
        const s = Number(n) ? 1 : 0;
        if (this.prerelease.length === 0)
          this.prerelease = [s];
        else {
          let a = this.prerelease.length;
          for (; --a >= 0; )
            typeof this.prerelease[a] == "number" && (this.prerelease[a]++, a = -2);
          if (a === -1) {
            if (r === this.prerelease.join(".") && n === !1)
              throw new Error("invalid increment argument: identifier already exists");
            this.prerelease.push(s);
          }
        }
        if (r) {
          let a = [r, s];
          n === !1 && (a = [r]), Es(this.prerelease[0], r) === 0 ? isNaN(this.prerelease[1]) && (this.prerelease = a) : this.prerelease = a;
        }
        break;
      }
      default:
        throw new Error(`invalid increment argument: ${t}`);
    }
    return this.raw = this.format(), this.build.length && (this.raw += `+${this.build.join(".")}`), this;
  }
};
var je = ev;
const Xi = je, tv = (e, t, r = !1) => {
  if (e instanceof Xi)
    return e;
  try {
    return new Xi(e, t);
  } catch (n) {
    if (!r)
      return null;
    throw n;
  }
};
var Or = tv;
const rv = Or, nv = (e, t) => {
  const r = rv(e, t);
  return r ? r.version : null;
};
var sv = nv;
const av = Or, ov = (e, t) => {
  const r = av(e.trim().replace(/^[=v]+/, ""), t);
  return r ? r.version : null;
};
var iv = ov;
const Yi = je, cv = (e, t, r, n, s) => {
  typeof r == "string" && (s = n, n = r, r = void 0);
  try {
    return new Yi(
      e instanceof Yi ? e.version : e,
      r
    ).inc(t, n, s).version;
  } catch {
    return null;
  }
};
var lv = cv;
const Qi = Or, uv = (e, t) => {
  const r = Qi(e, null, !0), n = Qi(t, null, !0), s = r.compare(n);
  if (s === 0)
    return null;
  const a = s > 0, i = a ? r : n, u = a ? n : r, c = !!i.prerelease.length;
  if (!!u.prerelease.length && !c) {
    if (!u.patch && !u.minor)
      return "major";
    if (u.compareMain(i) === 0)
      return u.minor && !u.patch ? "minor" : "patch";
  }
  const l = c ? "pre" : "";
  return r.major !== n.major ? l + "major" : r.minor !== n.minor ? l + "minor" : r.patch !== n.patch ? l + "patch" : "prerelease";
};
var dv = uv;
const fv = je, hv = (e, t) => new fv(e, t).major;
var mv = hv;
const pv = je, yv = (e, t) => new pv(e, t).minor;
var $v = yv;
const _v = je, gv = (e, t) => new _v(e, t).patch;
var vv = gv;
const Ev = Or, wv = (e, t) => {
  const r = Ev(e, t);
  return r && r.prerelease.length ? r.prerelease : null;
};
var Sv = wv;
const Zi = je, bv = (e, t, r) => new Zi(e, r).compare(new Zi(t, r));
var xe = bv;
const Pv = xe, Nv = (e, t, r) => Pv(t, e, r);
var Ov = Nv;
const Rv = xe, Tv = (e, t) => Rv(e, t, !0);
var Iv = Tv;
const xi = je, jv = (e, t, r) => {
  const n = new xi(e, r), s = new xi(t, r);
  return n.compare(s) || n.compareBuild(s);
};
var Ko = jv;
const Av = Ko, kv = (e, t) => e.sort((r, n) => Av(r, n, t));
var Cv = kv;
const Dv = Ko, Mv = (e, t) => e.sort((r, n) => Dv(n, r, t));
var Lv = Mv;
const Fv = xe, Vv = (e, t, r) => Fv(e, t, r) > 0;
var os = Vv;
const Uv = xe, zv = (e, t, r) => Uv(e, t, r) < 0;
var Go = zv;
const qv = xe, Kv = (e, t, r) => qv(e, t, r) === 0;
var Nu = Kv;
const Gv = xe, Hv = (e, t, r) => Gv(e, t, r) !== 0;
var Ou = Hv;
const Wv = xe, Bv = (e, t, r) => Wv(e, t, r) >= 0;
var Ho = Bv;
const Jv = xe, Xv = (e, t, r) => Jv(e, t, r) <= 0;
var Wo = Xv;
const Yv = Nu, Qv = Ou, Zv = os, xv = Ho, eE = Go, tE = Wo, rE = (e, t, r, n) => {
  switch (t) {
    case "===":
      return typeof e == "object" && (e = e.version), typeof r == "object" && (r = r.version), e === r;
    case "!==":
      return typeof e == "object" && (e = e.version), typeof r == "object" && (r = r.version), e !== r;
    case "":
    case "=":
    case "==":
      return Yv(e, r, n);
    case "!=":
      return Qv(e, r, n);
    case ">":
      return Zv(e, r, n);
    case ">=":
      return xv(e, r, n);
    case "<":
      return eE(e, r, n);
    case "<=":
      return tE(e, r, n);
    default:
      throw new TypeError(`Invalid operator: ${t}`);
  }
};
var Ru = rE;
const nE = je, sE = Or, { safeRe: wn, t: Sn } = rn, aE = (e, t) => {
  if (e instanceof nE)
    return e;
  if (typeof e == "number" && (e = String(e)), typeof e != "string")
    return null;
  t = t || {};
  let r = null;
  if (!t.rtl)
    r = e.match(t.includePrerelease ? wn[Sn.COERCEFULL] : wn[Sn.COERCE]);
  else {
    const c = t.includePrerelease ? wn[Sn.COERCERTLFULL] : wn[Sn.COERCERTL];
    let d;
    for (; (d = c.exec(e)) && (!r || r.index + r[0].length !== e.length); )
      (!r || d.index + d[0].length !== r.index + r[0].length) && (r = d), c.lastIndex = d.index + d[1].length + d[2].length;
    c.lastIndex = -1;
  }
  if (r === null)
    return null;
  const n = r[2], s = r[3] || "0", a = r[4] || "0", i = t.includePrerelease && r[5] ? `-${r[5]}` : "", u = t.includePrerelease && r[6] ? `+${r[6]}` : "";
  return sE(`${n}.${s}.${a}${i}${u}`, t);
};
var oE = aE;
class iE {
  constructor() {
    this.max = 1e3, this.map = /* @__PURE__ */ new Map();
  }
  get(t) {
    const r = this.map.get(t);
    if (r !== void 0)
      return this.map.delete(t), this.map.set(t, r), r;
  }
  delete(t) {
    return this.map.delete(t);
  }
  set(t, r) {
    if (!this.delete(t) && r !== void 0) {
      if (this.map.size >= this.max) {
        const s = this.map.keys().next().value;
        this.delete(s);
      }
      this.map.set(t, r);
    }
    return this;
  }
}
var cE = iE, ws, ec;
function et() {
  if (ec) return ws;
  ec = 1;
  const e = /\s+/g;
  class t {
    constructor(k, U) {
      if (U = s(U), k instanceof t)
        return k.loose === !!U.loose && k.includePrerelease === !!U.includePrerelease ? k : new t(k.raw, U);
      if (k instanceof a)
        return this.raw = k.value, this.set = [[k]], this.formatted = void 0, this;
      if (this.options = U, this.loose = !!U.loose, this.includePrerelease = !!U.includePrerelease, this.raw = k.trim().replace(e, " "), this.set = this.raw.split("||").map((D) => this.parseRange(D.trim())).filter((D) => D.length), !this.set.length)
        throw new TypeError(`Invalid SemVer Range: ${this.raw}`);
      if (this.set.length > 1) {
        const D = this.set[0];
        if (this.set = this.set.filter((O) => !g(O[0])), this.set.length === 0)
          this.set = [D];
        else if (this.set.length > 1) {
          for (const O of this.set)
            if (O.length === 1 && $(O[0])) {
              this.set = [O];
              break;
            }
        }
      }
      this.formatted = void 0;
    }
    get range() {
      if (this.formatted === void 0) {
        this.formatted = "";
        for (let k = 0; k < this.set.length; k++) {
          k > 0 && (this.formatted += "||");
          const U = this.set[k];
          for (let D = 0; D < U.length; D++)
            D > 0 && (this.formatted += " "), this.formatted += U[D].toString().trim();
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
    parseRange(k) {
      const D = ((this.options.includePrerelease && _) | (this.options.loose && w)) + ":" + k, O = n.get(D);
      if (O)
        return O;
      const T = this.options.loose, v = T ? c[d.HYPHENRANGELOOSE] : c[d.HYPHENRANGE];
      k = k.replace(v, Q(this.options.includePrerelease)), i("hyphen replace", k), k = k.replace(c[d.COMPARATORTRIM], l), i("comparator trim", k), k = k.replace(c[d.TILDETRIM], m), i("tilde trim", k), k = k.replace(c[d.CARETTRIM], P), i("caret trim", k);
      let p = k.split(" ").map((f) => E(f, this.options)).join(" ").split(/\s+/).map((f) => ne(f, this.options));
      T && (p = p.filter((f) => (i("loose invalid filter", f, this.options), !!f.match(c[d.COMPARATORLOOSE])))), i("range list", p);
      const S = /* @__PURE__ */ new Map(), y = p.map((f) => new a(f, this.options));
      for (const f of y) {
        if (g(f))
          return [f];
        S.set(f.value, f);
      }
      S.size > 1 && S.has("") && S.delete("");
      const o = [...S.values()];
      return n.set(D, o), o;
    }
    intersects(k, U) {
      if (!(k instanceof t))
        throw new TypeError("a Range is required");
      return this.set.some((D) => h(D, U) && k.set.some((O) => h(O, U) && D.every((T) => O.every((v) => T.intersects(v, U)))));
    }
    // if ANY of the sets match ALL of its comparators, then pass
    test(k) {
      if (!k)
        return !1;
      if (typeof k == "string")
        try {
          k = new u(k, this.options);
        } catch {
          return !1;
        }
      for (let U = 0; U < this.set.length; U++)
        if (de(this.set[U], k, this.options))
          return !0;
      return !1;
    }
  }
  ws = t;
  const r = cE, n = new r(), s = qo, a = is(), i = as, u = je, {
    safeRe: c,
    t: d,
    comparatorTrimReplace: l,
    tildeTrimReplace: m,
    caretTrimReplace: P
  } = rn, { FLAG_INCLUDE_PRERELEASE: _, FLAG_LOOSE: w } = ss, g = (C) => C.value === "<0.0.0-0", $ = (C) => C.value === "", h = (C, k) => {
    let U = !0;
    const D = C.slice();
    let O = D.pop();
    for (; U && D.length; )
      U = D.every((T) => O.intersects(T, k)), O = D.pop();
    return U;
  }, E = (C, k) => (C = C.replace(c[d.BUILD], ""), i("comp", C, k), C = z(C, k), i("caret", C), C = R(C, k), i("tildes", C), C = ue(C, k), i("xrange", C), C = H(C, k), i("stars", C), C), N = (C) => !C || C.toLowerCase() === "x" || C === "*", R = (C, k) => C.trim().split(/\s+/).map((U) => I(U, k)).join(" "), I = (C, k) => {
    const U = k.loose ? c[d.TILDELOOSE] : c[d.TILDE];
    return C.replace(U, (D, O, T, v, p) => {
      i("tilde", C, D, O, T, v, p);
      let S;
      return N(O) ? S = "" : N(T) ? S = `>=${O}.0.0 <${+O + 1}.0.0-0` : N(v) ? S = `>=${O}.${T}.0 <${O}.${+T + 1}.0-0` : p ? (i("replaceTilde pr", p), S = `>=${O}.${T}.${v}-${p} <${O}.${+T + 1}.0-0`) : S = `>=${O}.${T}.${v} <${O}.${+T + 1}.0-0`, i("tilde return", S), S;
    });
  }, z = (C, k) => C.trim().split(/\s+/).map((U) => W(U, k)).join(" "), W = (C, k) => {
    i("caret", C, k);
    const U = k.loose ? c[d.CARETLOOSE] : c[d.CARET], D = k.includePrerelease ? "-0" : "";
    return C.replace(U, (O, T, v, p, S) => {
      i("caret", C, O, T, v, p, S);
      let y;
      return N(T) ? y = "" : N(v) ? y = `>=${T}.0.0${D} <${+T + 1}.0.0-0` : N(p) ? T === "0" ? y = `>=${T}.${v}.0${D} <${T}.${+v + 1}.0-0` : y = `>=${T}.${v}.0${D} <${+T + 1}.0.0-0` : S ? (i("replaceCaret pr", S), T === "0" ? v === "0" ? y = `>=${T}.${v}.${p}-${S} <${T}.${v}.${+p + 1}-0` : y = `>=${T}.${v}.${p}-${S} <${T}.${+v + 1}.0-0` : y = `>=${T}.${v}.${p}-${S} <${+T + 1}.0.0-0`) : (i("no pr"), T === "0" ? v === "0" ? y = `>=${T}.${v}.${p}${D} <${T}.${v}.${+p + 1}-0` : y = `>=${T}.${v}.${p}${D} <${T}.${+v + 1}.0-0` : y = `>=${T}.${v}.${p} <${+T + 1}.0.0-0`), i("caret return", y), y;
    });
  }, ue = (C, k) => (i("replaceXRanges", C, k), C.split(/\s+/).map((U) => V(U, k)).join(" ")), V = (C, k) => {
    C = C.trim();
    const U = k.loose ? c[d.XRANGELOOSE] : c[d.XRANGE];
    return C.replace(U, (D, O, T, v, p, S) => {
      i("xRange", C, D, O, T, v, p, S);
      const y = N(T), o = y || N(v), f = o || N(p), b = f;
      return O === "=" && b && (O = ""), S = k.includePrerelease ? "-0" : "", y ? O === ">" || O === "<" ? D = "<0.0.0-0" : D = "*" : O && b ? (o && (v = 0), p = 0, O === ">" ? (O = ">=", o ? (T = +T + 1, v = 0, p = 0) : (v = +v + 1, p = 0)) : O === "<=" && (O = "<", o ? T = +T + 1 : v = +v + 1), O === "<" && (S = "-0"), D = `${O + T}.${v}.${p}${S}`) : o ? D = `>=${T}.0.0${S} <${+T + 1}.0.0-0` : f && (D = `>=${T}.${v}.0${S} <${T}.${+v + 1}.0-0`), i("xRange return", D), D;
    });
  }, H = (C, k) => (i("replaceStars", C, k), C.trim().replace(c[d.STAR], "")), ne = (C, k) => (i("replaceGTE0", C, k), C.trim().replace(c[k.includePrerelease ? d.GTE0PRE : d.GTE0], "")), Q = (C) => (k, U, D, O, T, v, p, S, y, o, f, b) => (N(D) ? U = "" : N(O) ? U = `>=${D}.0.0${C ? "-0" : ""}` : N(T) ? U = `>=${D}.${O}.0${C ? "-0" : ""}` : v ? U = `>=${U}` : U = `>=${U}${C ? "-0" : ""}`, N(y) ? S = "" : N(o) ? S = `<${+y + 1}.0.0-0` : N(f) ? S = `<${y}.${+o + 1}.0-0` : b ? S = `<=${y}.${o}.${f}-${b}` : C ? S = `<${y}.${o}.${+f + 1}-0` : S = `<=${S}`, `${U} ${S}`.trim()), de = (C, k, U) => {
    for (let D = 0; D < C.length; D++)
      if (!C[D].test(k))
        return !1;
    if (k.prerelease.length && !U.includePrerelease) {
      for (let D = 0; D < C.length; D++)
        if (i(C[D].semver), C[D].semver !== a.ANY && C[D].semver.prerelease.length > 0) {
          const O = C[D].semver;
          if (O.major === k.major && O.minor === k.minor && O.patch === k.patch)
            return !0;
        }
      return !1;
    }
    return !0;
  };
  return ws;
}
var Ss, tc;
function is() {
  if (tc) return Ss;
  tc = 1;
  const e = Symbol("SemVer ANY");
  class t {
    static get ANY() {
      return e;
    }
    constructor(l, m) {
      if (m = r(m), l instanceof t) {
        if (l.loose === !!m.loose)
          return l;
        l = l.value;
      }
      l = l.trim().split(/\s+/).join(" "), i("comparator", l, m), this.options = m, this.loose = !!m.loose, this.parse(l), this.semver === e ? this.value = "" : this.value = this.operator + this.semver.version, i("comp", this);
    }
    parse(l) {
      const m = this.options.loose ? n[s.COMPARATORLOOSE] : n[s.COMPARATOR], P = l.match(m);
      if (!P)
        throw new TypeError(`Invalid comparator: ${l}`);
      this.operator = P[1] !== void 0 ? P[1] : "", this.operator === "=" && (this.operator = ""), P[2] ? this.semver = new u(P[2], this.options.loose) : this.semver = e;
    }
    toString() {
      return this.value;
    }
    test(l) {
      if (i("Comparator.test", l, this.options.loose), this.semver === e || l === e)
        return !0;
      if (typeof l == "string")
        try {
          l = new u(l, this.options);
        } catch {
          return !1;
        }
      return a(l, this.operator, this.semver, this.options);
    }
    intersects(l, m) {
      if (!(l instanceof t))
        throw new TypeError("a Comparator is required");
      return this.operator === "" ? this.value === "" ? !0 : new c(l.value, m).test(this.value) : l.operator === "" ? l.value === "" ? !0 : new c(this.value, m).test(l.semver) : (m = r(m), m.includePrerelease && (this.value === "<0.0.0-0" || l.value === "<0.0.0-0") || !m.includePrerelease && (this.value.startsWith("<0.0.0") || l.value.startsWith("<0.0.0")) ? !1 : !!(this.operator.startsWith(">") && l.operator.startsWith(">") || this.operator.startsWith("<") && l.operator.startsWith("<") || this.semver.version === l.semver.version && this.operator.includes("=") && l.operator.includes("=") || a(this.semver, "<", l.semver, m) && this.operator.startsWith(">") && l.operator.startsWith("<") || a(this.semver, ">", l.semver, m) && this.operator.startsWith("<") && l.operator.startsWith(">")));
    }
  }
  Ss = t;
  const r = qo, { safeRe: n, t: s } = rn, a = Ru, i = as, u = je, c = et();
  return Ss;
}
const lE = et(), uE = (e, t, r) => {
  try {
    t = new lE(t, r);
  } catch {
    return !1;
  }
  return t.test(e);
};
var cs = uE;
const dE = et(), fE = (e, t) => new dE(e, t).set.map((r) => r.map((n) => n.value).join(" ").trim().split(" "));
var hE = fE;
const mE = je, pE = et(), yE = (e, t, r) => {
  let n = null, s = null, a = null;
  try {
    a = new pE(t, r);
  } catch {
    return null;
  }
  return e.forEach((i) => {
    a.test(i) && (!n || s.compare(i) === -1) && (n = i, s = new mE(n, r));
  }), n;
};
var $E = yE;
const _E = je, gE = et(), vE = (e, t, r) => {
  let n = null, s = null, a = null;
  try {
    a = new gE(t, r);
  } catch {
    return null;
  }
  return e.forEach((i) => {
    a.test(i) && (!n || s.compare(i) === 1) && (n = i, s = new _E(n, r));
  }), n;
};
var EE = vE;
const bs = je, wE = et(), rc = os, SE = (e, t) => {
  e = new wE(e, t);
  let r = new bs("0.0.0");
  if (e.test(r) || (r = new bs("0.0.0-0"), e.test(r)))
    return r;
  r = null;
  for (let n = 0; n < e.set.length; ++n) {
    const s = e.set[n];
    let a = null;
    s.forEach((i) => {
      const u = new bs(i.semver.version);
      switch (i.operator) {
        case ">":
          u.prerelease.length === 0 ? u.patch++ : u.prerelease.push(0), u.raw = u.format();
        case "":
        case ">=":
          (!a || rc(u, a)) && (a = u);
          break;
        case "<":
        case "<=":
          break;
        default:
          throw new Error(`Unexpected operation: ${i.operator}`);
      }
    }), a && (!r || rc(r, a)) && (r = a);
  }
  return r && e.test(r) ? r : null;
};
var bE = SE;
const PE = et(), NE = (e, t) => {
  try {
    return new PE(e, t).range || "*";
  } catch {
    return null;
  }
};
var OE = NE;
const RE = je, Tu = is(), { ANY: TE } = Tu, IE = et(), jE = cs, nc = os, sc = Go, AE = Wo, kE = Ho, CE = (e, t, r, n) => {
  e = new RE(e, n), t = new IE(t, n);
  let s, a, i, u, c;
  switch (r) {
    case ">":
      s = nc, a = AE, i = sc, u = ">", c = ">=";
      break;
    case "<":
      s = sc, a = kE, i = nc, u = "<", c = "<=";
      break;
    default:
      throw new TypeError('Must provide a hilo val of "<" or ">"');
  }
  if (jE(e, t, n))
    return !1;
  for (let d = 0; d < t.set.length; ++d) {
    const l = t.set[d];
    let m = null, P = null;
    if (l.forEach((_) => {
      _.semver === TE && (_ = new Tu(">=0.0.0")), m = m || _, P = P || _, s(_.semver, m.semver, n) ? m = _ : i(_.semver, P.semver, n) && (P = _);
    }), m.operator === u || m.operator === c || (!P.operator || P.operator === u) && a(e, P.semver))
      return !1;
    if (P.operator === c && i(e, P.semver))
      return !1;
  }
  return !0;
};
var Bo = CE;
const DE = Bo, ME = (e, t, r) => DE(e, t, ">", r);
var LE = ME;
const FE = Bo, VE = (e, t, r) => FE(e, t, "<", r);
var UE = VE;
const ac = et(), zE = (e, t, r) => (e = new ac(e, r), t = new ac(t, r), e.intersects(t, r));
var qE = zE;
const KE = cs, GE = xe;
var HE = (e, t, r) => {
  const n = [];
  let s = null, a = null;
  const i = e.sort((l, m) => GE(l, m, r));
  for (const l of i)
    KE(l, t, r) ? (a = l, s || (s = l)) : (a && n.push([s, a]), a = null, s = null);
  s && n.push([s, null]);
  const u = [];
  for (const [l, m] of n)
    l === m ? u.push(l) : !m && l === i[0] ? u.push("*") : m ? l === i[0] ? u.push(`<=${m}`) : u.push(`${l} - ${m}`) : u.push(`>=${l}`);
  const c = u.join(" || "), d = typeof t.raw == "string" ? t.raw : String(t);
  return c.length < d.length ? c : t;
};
const oc = et(), Jo = is(), { ANY: Ps } = Jo, Cr = cs, Xo = xe, WE = (e, t, r = {}) => {
  if (e === t)
    return !0;
  e = new oc(e, r), t = new oc(t, r);
  let n = !1;
  e: for (const s of e.set) {
    for (const a of t.set) {
      const i = JE(s, a, r);
      if (n = n || i !== null, i)
        continue e;
    }
    if (n)
      return !1;
  }
  return !0;
}, BE = [new Jo(">=0.0.0-0")], ic = [new Jo(">=0.0.0")], JE = (e, t, r) => {
  if (e === t)
    return !0;
  if (e.length === 1 && e[0].semver === Ps) {
    if (t.length === 1 && t[0].semver === Ps)
      return !0;
    r.includePrerelease ? e = BE : e = ic;
  }
  if (t.length === 1 && t[0].semver === Ps) {
    if (r.includePrerelease)
      return !0;
    t = ic;
  }
  const n = /* @__PURE__ */ new Set();
  let s, a;
  for (const _ of e)
    _.operator === ">" || _.operator === ">=" ? s = cc(s, _, r) : _.operator === "<" || _.operator === "<=" ? a = lc(a, _, r) : n.add(_.semver);
  if (n.size > 1)
    return null;
  let i;
  if (s && a) {
    if (i = Xo(s.semver, a.semver, r), i > 0)
      return null;
    if (i === 0 && (s.operator !== ">=" || a.operator !== "<="))
      return null;
  }
  for (const _ of n) {
    if (s && !Cr(_, String(s), r) || a && !Cr(_, String(a), r))
      return null;
    for (const w of t)
      if (!Cr(_, String(w), r))
        return !1;
    return !0;
  }
  let u, c, d, l, m = a && !r.includePrerelease && a.semver.prerelease.length ? a.semver : !1, P = s && !r.includePrerelease && s.semver.prerelease.length ? s.semver : !1;
  m && m.prerelease.length === 1 && a.operator === "<" && m.prerelease[0] === 0 && (m = !1);
  for (const _ of t) {
    if (l = l || _.operator === ">" || _.operator === ">=", d = d || _.operator === "<" || _.operator === "<=", s) {
      if (P && _.semver.prerelease && _.semver.prerelease.length && _.semver.major === P.major && _.semver.minor === P.minor && _.semver.patch === P.patch && (P = !1), _.operator === ">" || _.operator === ">=") {
        if (u = cc(s, _, r), u === _ && u !== s)
          return !1;
      } else if (s.operator === ">=" && !Cr(s.semver, String(_), r))
        return !1;
    }
    if (a) {
      if (m && _.semver.prerelease && _.semver.prerelease.length && _.semver.major === m.major && _.semver.minor === m.minor && _.semver.patch === m.patch && (m = !1), _.operator === "<" || _.operator === "<=") {
        if (c = lc(a, _, r), c === _ && c !== a)
          return !1;
      } else if (a.operator === "<=" && !Cr(a.semver, String(_), r))
        return !1;
    }
    if (!_.operator && (a || s) && i !== 0)
      return !1;
  }
  return !(s && d && !a && i !== 0 || a && l && !s && i !== 0 || P || m);
}, cc = (e, t, r) => {
  if (!e)
    return t;
  const n = Xo(e.semver, t.semver, r);
  return n > 0 ? e : n < 0 || t.operator === ">" && e.operator === ">=" ? t : e;
}, lc = (e, t, r) => {
  if (!e)
    return t;
  const n = Xo(e.semver, t.semver, r);
  return n < 0 ? e : n > 0 || t.operator === "<" && e.operator === "<=" ? t : e;
};
var XE = WE;
const Ns = rn, uc = ss, YE = je, dc = Pu, QE = Or, ZE = sv, xE = iv, ew = lv, tw = dv, rw = mv, nw = $v, sw = vv, aw = Sv, ow = xe, iw = Ov, cw = Iv, lw = Ko, uw = Cv, dw = Lv, fw = os, hw = Go, mw = Nu, pw = Ou, yw = Ho, $w = Wo, _w = Ru, gw = oE, vw = is(), Ew = et(), ww = cs, Sw = hE, bw = $E, Pw = EE, Nw = bE, Ow = OE, Rw = Bo, Tw = LE, Iw = UE, jw = qE, Aw = HE, kw = XE;
var Cw = {
  parse: QE,
  valid: ZE,
  clean: xE,
  inc: ew,
  diff: tw,
  major: rw,
  minor: nw,
  patch: sw,
  prerelease: aw,
  compare: ow,
  rcompare: iw,
  compareLoose: cw,
  compareBuild: lw,
  sort: uw,
  rsort: dw,
  gt: fw,
  lt: hw,
  eq: mw,
  neq: pw,
  gte: yw,
  lte: $w,
  cmp: _w,
  coerce: gw,
  Comparator: vw,
  Range: Ew,
  satisfies: ww,
  toComparators: Sw,
  maxSatisfying: bw,
  minSatisfying: Pw,
  minVersion: Nw,
  validRange: Ow,
  outside: Rw,
  gtr: Tw,
  ltr: Iw,
  intersects: jw,
  simplifyRange: Aw,
  subset: kw,
  SemVer: YE,
  re: Ns.re,
  src: Ns.src,
  tokens: Ns.t,
  SEMVER_SPEC_VERSION: uc.SEMVER_SPEC_VERSION,
  RELEASE_TYPES: uc.RELEASE_TYPES,
  compareIdentifiers: dc.compareIdentifiers,
  rcompareIdentifiers: dc.rcompareIdentifiers
}, ls = { exports: {} }, Yo = { exports: {} };
const Iu = (e, t) => {
  for (const r of Reflect.ownKeys(t))
    Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
  return e;
};
Yo.exports = Iu;
Yo.exports.default = Iu;
var Dw = Yo.exports;
const Mw = Dw, Gn = /* @__PURE__ */ new WeakMap(), ju = (e, t = {}) => {
  if (typeof e != "function")
    throw new TypeError("Expected a function");
  let r, n = 0;
  const s = e.displayName || e.name || "<anonymous>", a = function(...i) {
    if (Gn.set(a, ++n), n === 1)
      r = e.apply(this, i), e = null;
    else if (t.throw === !0)
      throw new Error(`Function \`${s}\` can only be called once`);
    return r;
  };
  return Mw(a, e), Gn.set(a, n), a;
};
ls.exports = ju;
ls.exports.default = ju;
ls.exports.callCount = (e) => {
  if (!Gn.has(e))
    throw new Error(`The given function \`${e.name}\` is not wrapped by the \`onetime\` package`);
  return Gn.get(e);
};
var Lw = ls.exports;
(function(e, t) {
  var r = nn && nn.__classPrivateFieldSet || function(D, O, T, v, p) {
    if (v === "m") throw new TypeError("Private method is not writable");
    if (v === "a" && !p) throw new TypeError("Private accessor was defined without a setter");
    if (typeof O == "function" ? D !== O || !p : !O.has(D)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return v === "a" ? p.call(D, T) : p ? p.value = T : O.set(D, T), T;
  }, n = nn && nn.__classPrivateFieldGet || function(D, O, T, v) {
    if (T === "a" && !v) throw new TypeError("Private accessor was defined without a getter");
    if (typeof O == "function" ? D !== O || !v : !O.has(D)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return T === "m" ? v : T === "a" ? v.call(D) : v ? v.value : O.get(D);
  }, s, a, i, u, c, d;
  Object.defineProperty(t, "__esModule", { value: !0 });
  const l = $c, m = Xs, P = tr, _ = Mu, w = Lu, g = Fu, $ = Hu, h = rd, E = od, N = st, R = _y, I = j0, z = q0, W = Cw, ue = Lw, V = "aes-256-cbc", H = () => /* @__PURE__ */ Object.create(null), ne = (D) => D != null;
  let Q = "";
  try {
    delete require.cache[__filename], Q = P.dirname((a = (s = e.parent) === null || s === void 0 ? void 0 : s.filename) !== null && a !== void 0 ? a : ".");
  } catch {
  }
  const de = (D, O) => {
    const T = /* @__PURE__ */ new Set([
      "undefined",
      "symbol",
      "function"
    ]), v = typeof O;
    if (T.has(v))
      throw new TypeError(`Setting a value of type \`${v}\` for key \`${D}\` is not allowed as it's not supported by JSON`);
  }, C = "__internal__", k = `${C}.migrations.version`;
  class U {
    constructor(O = {}) {
      var T;
      i.set(this, void 0), u.set(this, void 0), c.set(this, void 0), d.set(this, {}), this._deserialize = (f) => JSON.parse(f), this._serialize = (f) => JSON.stringify(f, void 0, "	");
      const v = {
        configName: "config",
        fileExtension: "json",
        projectSuffix: "nodejs",
        clearInvalidConfig: !1,
        accessPropertiesByDotNotation: !0,
        configFileMode: 438,
        ...O
      }, p = ue(() => {
        const f = h.sync({ cwd: Q }), b = f && JSON.parse(m.readFileSync(f, "utf8"));
        return b ?? {};
      });
      if (!v.cwd) {
        if (v.projectName || (v.projectName = p().name), !v.projectName)
          throw new Error("Project name could not be inferred. Please specify the `projectName` option.");
        v.cwd = E(v.projectName, { suffix: v.projectSuffix }).config;
      }
      if (r(this, c, v, "f"), v.schema) {
        if (typeof v.schema != "object")
          throw new TypeError("The `schema` option must be an object.");
        const f = new R.default({
          allErrors: !0,
          useDefaults: !0
        });
        (0, I.default)(f);
        const b = {
          type: "object",
          properties: v.schema
        };
        r(this, i, f.compile(b), "f");
        for (const [j, A] of Object.entries(v.schema))
          A != null && A.default && (n(this, d, "f")[j] = A.default);
      }
      v.defaults && r(this, d, {
        ...n(this, d, "f"),
        ...v.defaults
      }, "f"), v.serialize && (this._serialize = v.serialize), v.deserialize && (this._deserialize = v.deserialize), this.events = new g.EventEmitter(), r(this, u, v.encryptionKey, "f");
      const S = v.fileExtension ? `.${v.fileExtension}` : "";
      this.path = P.resolve(v.cwd, `${(T = v.configName) !== null && T !== void 0 ? T : "config"}${S}`);
      const y = this.store, o = Object.assign(H(), v.defaults, y);
      this._validate(o);
      try {
        w.deepEqual(y, o);
      } catch {
        this.store = o;
      }
      if (v.watch && this._watch(), v.migrations) {
        if (v.projectVersion || (v.projectVersion = p().version), !v.projectVersion)
          throw new Error("Project version could not be inferred. Please specify the `projectVersion` option.");
        this._migrate(v.migrations, v.projectVersion, v.beforeEachMigration);
      }
    }
    get(O, T) {
      if (n(this, c, "f").accessPropertiesByDotNotation)
        return this._get(O, T);
      const { store: v } = this;
      return O in v ? v[O] : T;
    }
    set(O, T) {
      if (typeof O != "string" && typeof O != "object")
        throw new TypeError(`Expected \`key\` to be of type \`string\` or \`object\`, got ${typeof O}`);
      if (typeof O != "object" && T === void 0)
        throw new TypeError("Use `delete()` to clear values");
      if (this._containsReservedKey(O))
        throw new TypeError(`Please don't use the ${C} key, as it's used to manage this module internal operations.`);
      const { store: v } = this, p = (S, y) => {
        de(S, y), n(this, c, "f").accessPropertiesByDotNotation ? $.set(v, S, y) : v[S] = y;
      };
      if (typeof O == "object") {
        const S = O;
        for (const [y, o] of Object.entries(S))
          p(y, o);
      } else
        p(O, T);
      this.store = v;
    }
    /**
        Check if an item exists.
    
        @param key - The key of the item to check.
        */
    has(O) {
      return n(this, c, "f").accessPropertiesByDotNotation ? $.has(this.store, O) : O in this.store;
    }
    /**
        Reset items to their default values, as defined by the `defaults` or `schema` option.
    
        @see `clear()` to reset all items.
    
        @param keys - The keys of the items to reset.
        */
    reset(...O) {
      for (const T of O)
        ne(n(this, d, "f")[T]) && this.set(T, n(this, d, "f")[T]);
    }
    /**
        Delete an item.
    
        @param key - The key of the item to delete.
        */
    delete(O) {
      const { store: T } = this;
      n(this, c, "f").accessPropertiesByDotNotation ? $.delete(T, O) : delete T[O], this.store = T;
    }
    /**
        Delete all items.
    
        This resets known items to their default values, if defined by the `defaults` or `schema` option.
        */
    clear() {
      this.store = H();
      for (const O of Object.keys(n(this, d, "f")))
        this.reset(O);
    }
    /**
        Watches the given `key`, calling `callback` on any changes.
    
        @param key - The key wo watch.
        @param callback - A callback function that is called on any changes. When a `key` is first set `oldValue` will be `undefined`, and when a key is deleted `newValue` will be `undefined`.
        @returns A function, that when called, will unsubscribe.
        */
    onDidChange(O, T) {
      if (typeof O != "string")
        throw new TypeError(`Expected \`key\` to be of type \`string\`, got ${typeof O}`);
      if (typeof T != "function")
        throw new TypeError(`Expected \`callback\` to be of type \`function\`, got ${typeof T}`);
      return this._handleChange(() => this.get(O), T);
    }
    /**
        Watches the whole config object, calling `callback` on any changes.
    
        @param callback - A callback function that is called on any changes. When a `key` is first set `oldValue` will be `undefined`, and when a key is deleted `newValue` will be `undefined`.
        @returns A function, that when called, will unsubscribe.
        */
    onDidAnyChange(O) {
      if (typeof O != "function")
        throw new TypeError(`Expected \`callback\` to be of type \`function\`, got ${typeof O}`);
      return this._handleChange(() => this.store, O);
    }
    get size() {
      return Object.keys(this.store).length;
    }
    get store() {
      try {
        const O = m.readFileSync(this.path, n(this, u, "f") ? null : "utf8"), T = this._encryptData(O), v = this._deserialize(T);
        return this._validate(v), Object.assign(H(), v);
      } catch (O) {
        if ((O == null ? void 0 : O.code) === "ENOENT")
          return this._ensureDirectory(), H();
        if (n(this, c, "f").clearInvalidConfig && O.name === "SyntaxError")
          return H();
        throw O;
      }
    }
    set store(O) {
      this._ensureDirectory(), this._validate(O), this._write(O), this.events.emit("change");
    }
    *[(i = /* @__PURE__ */ new WeakMap(), u = /* @__PURE__ */ new WeakMap(), c = /* @__PURE__ */ new WeakMap(), d = /* @__PURE__ */ new WeakMap(), Symbol.iterator)]() {
      for (const [O, T] of Object.entries(this.store))
        yield [O, T];
    }
    _encryptData(O) {
      if (!n(this, u, "f"))
        return O.toString();
      try {
        if (n(this, u, "f"))
          try {
            if (O.slice(16, 17).toString() === ":") {
              const T = O.slice(0, 16), v = _.pbkdf2Sync(n(this, u, "f"), T.toString(), 1e4, 32, "sha512"), p = _.createDecipheriv(V, v, T);
              O = Buffer.concat([p.update(Buffer.from(O.slice(17))), p.final()]).toString("utf8");
            } else {
              const T = _.createDecipher(V, n(this, u, "f"));
              O = Buffer.concat([T.update(Buffer.from(O)), T.final()]).toString("utf8");
            }
          } catch {
          }
      } catch {
      }
      return O.toString();
    }
    _handleChange(O, T) {
      let v = O();
      const p = () => {
        const S = v, y = O();
        (0, l.isDeepStrictEqual)(y, S) || (v = y, T.call(this, y, S));
      };
      return this.events.on("change", p), () => this.events.removeListener("change", p);
    }
    _validate(O) {
      if (!n(this, i, "f") || n(this, i, "f").call(this, O) || !n(this, i, "f").errors)
        return;
      const v = n(this, i, "f").errors.map(({ instancePath: p, message: S = "" }) => `\`${p.slice(1)}\` ${S}`);
      throw new Error("Config schema violation: " + v.join("; "));
    }
    _ensureDirectory() {
      m.mkdirSync(P.dirname(this.path), { recursive: !0 });
    }
    _write(O) {
      let T = this._serialize(O);
      if (n(this, u, "f")) {
        const v = _.randomBytes(16), p = _.pbkdf2Sync(n(this, u, "f"), v.toString(), 1e4, 32, "sha512"), S = _.createCipheriv(V, p, v);
        T = Buffer.concat([v, Buffer.from(":"), S.update(Buffer.from(T)), S.final()]);
      }
      if (process.env.SNAP)
        m.writeFileSync(this.path, T, { mode: n(this, c, "f").configFileMode });
      else
        try {
          N.writeFileSync(this.path, T, { mode: n(this, c, "f").configFileMode });
        } catch (v) {
          if ((v == null ? void 0 : v.code) === "EXDEV") {
            m.writeFileSync(this.path, T, { mode: n(this, c, "f").configFileMode });
            return;
          }
          throw v;
        }
    }
    _watch() {
      this._ensureDirectory(), m.existsSync(this.path) || this._write(H()), process.platform === "win32" ? m.watch(this.path, { persistent: !1 }, z(() => {
        this.events.emit("change");
      }, { wait: 100 })) : m.watchFile(this.path, { persistent: !1 }, z(() => {
        this.events.emit("change");
      }, { wait: 5e3 }));
    }
    _migrate(O, T, v) {
      let p = this._get(k, "0.0.0");
      const S = Object.keys(O).filter((o) => this._shouldPerformMigration(o, p, T));
      let y = { ...this.store };
      for (const o of S)
        try {
          v && v(this, {
            fromVersion: p,
            toVersion: o,
            finalVersion: T,
            versions: S
          });
          const f = O[o];
          f(this), this._set(k, o), p = o, y = { ...this.store };
        } catch (f) {
          throw this.store = y, new Error(`Something went wrong during the migration! Changes applied to the store until this failed migration will be restored. ${f}`);
        }
      (this._isVersionInRangeFormat(p) || !W.eq(p, T)) && this._set(k, T);
    }
    _containsReservedKey(O) {
      return typeof O == "object" && Object.keys(O)[0] === C ? !0 : typeof O != "string" ? !1 : n(this, c, "f").accessPropertiesByDotNotation ? !!O.startsWith(`${C}.`) : !1;
    }
    _isVersionInRangeFormat(O) {
      return W.clean(O) === null;
    }
    _shouldPerformMigration(O, T, v) {
      return this._isVersionInRangeFormat(O) ? T !== "0.0.0" && W.satisfies(T, O) ? !1 : W.satisfies(v, O) : !(W.lte(O, T) || W.gt(O, v));
    }
    _get(O, T) {
      return $.get(this.store, O, T);
    }
    _set(O, T) {
      const { store: v } = this;
      $.set(v, O, T), this.store = v;
    }
  }
  t.default = U, e.exports = U, e.exports.default = U;
})(Os, Os.exports);
var Fw = Os.exports;
const fc = tr, { app: kn, ipcMain: Bs, ipcRenderer: hc, shell: Vw } = Cu, Uw = Fw;
let mc = !1;
const pc = () => {
  if (!Bs || !kn)
    throw new Error("Electron Store: You need to call `.initRenderer()` from the main process.");
  const e = {
    defaultCwd: kn.getPath("userData"),
    appVersion: kn.getVersion()
  };
  return mc || (Bs.on("electron-store-get-data", (t) => {
    t.returnValue = e;
  }), mc = !0), e;
};
class zw extends Uw {
  constructor(t) {
    let r, n;
    if (hc) {
      const s = hc.sendSync("electron-store-get-data");
      if (!s)
        throw new Error("Electron Store: You need to call `.initRenderer()` from the main process.");
      ({ defaultCwd: r, appVersion: n } = s);
    } else Bs && kn && ({ defaultCwd: r, appVersion: n } = pc());
    t = {
      name: "config",
      ...t
    }, t.projectVersion || (t.projectVersion = n), t.cwd ? t.cwd = fc.isAbsolute(t.cwd) ? t.cwd : fc.join(r, t.cwd) : t.cwd = r, t.configName = t.name, delete t.name, super(t);
  }
  static initRenderer() {
    pc();
  }
  async openInEditor() {
    const t = await Vw.openPath(this.path);
    if (t)
      throw new Error(t);
  }
}
var qw = zw;
const Kw = /* @__PURE__ */ zu(qw), Qo = ut.dirname(Du(import.meta.url));
process.env.APP_ROOT = ut.join(Qo, "..");
const Js = process.env.VITE_DEV_SERVER_URL, aS = ut.join(process.env.APP_ROOT, "dist-electron"), Au = ut.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = Js ? ut.join(process.env.APP_ROOT, "public") : Au;
let Je;
const Zo = new Kw();
Ot.handle("store-save", (e, t, r) => {
  Zo.set(t, r);
});
Ot.handle("store-load", (e, t) => Zo.get(t));
Ot.handle("store-delete", (e, t) => {
  Zo.delete(t);
});
let Ve = null;
Ot.handle("worker-start", (e, t) => {
  if (Ve) {
    console.log("Worker already running");
    return;
  }
  const r = ut.join(Qo, "emailWorker.js");
  Ve = new Uu(r), Ve.postMessage(t), Ve.on("message", (n) => {
    e.sender.send("worker-message", n);
  }), Ve.on("error", (n) => {
    e.sender.send("worker-message", {
      email: null,
      message: n.message,
      status: "Not Send"
    });
  }), Ve.on("exit", (n) => {
    e.sender.send("worker-exit", { code: n }), Ve = null;
  });
});
Ot.handle("worker-stop", () => {
  Ve && (Ve.postMessage({ action: !1 }), setTimeout(() => {
    Ve == null || Ve.terminate(), Ve = null;
  }, 500));
});
Ot.handle("dialog-open", async (e, t) => {
  const { dialog: r } = await import("electron");
  return r.showOpenDialog(Je, t);
});
Ot.handle("dialog-save", async (e, t) => {
  const { dialog: r } = await import("electron");
  return r.showSaveDialog(Je, t);
});
Ot.handle("dialog-message", async (e, t) => {
  const { dialog: r } = await import("electron");
  return r.showMessageBox(Je, t);
});
function ku() {
  Je = new yc({
    icon: ut.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    webPreferences: {
      preload: ut.join(Qo, "preload.mjs")
    }
  }), Je.webContents.on("did-finish-load", () => {
    Je == null || Je.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  }), Js ? Je.loadURL(Js) : Je.loadFile(ut.join(Au, "index.html"));
}
Cn.on("window-all-closed", () => {
  process.platform !== "darwin" && (Cn.quit(), Je = null);
});
Cn.on("activate", () => {
  yc.getAllWindows().length === 0 && ku();
});
Cn.whenReady().then(ku);
export {
  aS as MAIN_DIST,
  Au as RENDERER_DIST,
  Js as VITE_DEV_SERVER_URL
};
