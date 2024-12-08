/*! For license information please see app.bundle.js.LICENSE.txt */
(() => {
  var n = {
      543: () => {
        function n(t) {
          return (
            (n =
              "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                ? function (n) {
                    return typeof n;
                  }
                : function (n) {
                    return n &&
                      "function" == typeof Symbol &&
                      n.constructor === Symbol &&
                      n !== Symbol.prototype
                      ? "symbol"
                      : typeof n;
                  }),
            n(t)
          );
        }
        function t() {
          "use strict";
          t = function () {
            return r;
          };
          var e,
            r = {},
            o = Object.prototype,
            i = o.hasOwnProperty,
            a =
              Object.defineProperty ||
              function (n, t, e) {
                n[t] = e.value;
              },
            c = "function" == typeof Symbol ? Symbol : {},
            s = c.iterator || "@@iterator",
            l = c.asyncIterator || "@@asyncIterator",
            u = c.toStringTag || "@@toStringTag";
          function A(n, t, e) {
            return (
              Object.defineProperty(n, t, {
                value: e,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              }),
              n[t]
            );
          }
          try {
            A({}, "");
          } catch (e) {
            A = function (n, t, e) {
              return (n[t] = e);
            };
          }
          function p(n, t, e, r) {
            var o = t && t.prototype instanceof E ? t : E,
              i = Object.create(o.prototype),
              c = new M(r || []);
            return a(i, "_invoke", { value: S(n, e, c) }), i;
          }
          function d(n, t, e) {
            try {
              return { type: "normal", arg: n.call(t, e) };
            } catch (n) {
              return { type: "throw", arg: n };
            }
          }
          r.wrap = p;
          var f = "suspendedStart",
            h = "suspendedYield",
            y = "executing",
            m = "completed",
            g = {};
          function E() {}
          function v() {}
          function b() {}
          var x = {};
          A(x, s, function () {
            return this;
          });
          var C = Object.getPrototypeOf,
            B = C && C(C(_([])));
          B && B !== o && i.call(B, s) && (x = B);
          var k = (b.prototype = E.prototype = Object.create(x));
          function w(n) {
            ["next", "throw", "return"].forEach(function (t) {
              A(n, t, function (n) {
                return this._invoke(t, n);
              });
            });
          }
          function j(t, e) {
            function r(o, a, c, s) {
              var l = d(t[o], t, a);
              if ("throw" !== l.type) {
                var u = l.arg,
                  A = u.value;
                return A && "object" == n(A) && i.call(A, "__await")
                  ? e.resolve(A.__await).then(
                      function (n) {
                        r("next", n, c, s);
                      },
                      function (n) {
                        r("throw", n, c, s);
                      }
                    )
                  : e.resolve(A).then(
                      function (n) {
                        (u.value = n), c(u);
                      },
                      function (n) {
                        return r("throw", n, c, s);
                      }
                    );
              }
              s(l.arg);
            }
            var o;
            a(this, "_invoke", {
              value: function (n, t) {
                function i() {
                  return new e(function (e, o) {
                    r(n, t, e, o);
                  });
                }
                return (o = o ? o.then(i, i) : i());
              },
            });
          }
          function S(n, t, r) {
            var o = f;
            return function (i, a) {
              if (o === y) throw Error("Generator is already running");
              if (o === m) {
                if ("throw" === i) throw a;
                return { value: e, done: !0 };
              }
              for (r.method = i, r.arg = a; ; ) {
                var c = r.delegate;
                if (c) {
                  var s = L(c, r);
                  if (s) {
                    if (s === g) continue;
                    return s;
                  }
                }
                if ("next" === r.method) r.sent = r._sent = r.arg;
                else if ("throw" === r.method) {
                  if (o === f) throw ((o = m), r.arg);
                  r.dispatchException(r.arg);
                } else "return" === r.method && r.abrupt("return", r.arg);
                o = y;
                var l = d(n, t, r);
                if ("normal" === l.type) {
                  if (((o = r.done ? m : h), l.arg === g)) continue;
                  return { value: l.arg, done: r.done };
                }
                "throw" === l.type &&
                  ((o = m), (r.method = "throw"), (r.arg = l.arg));
              }
            };
          }
          function L(n, t) {
            var r = t.method,
              o = n.iterator[r];
            if (o === e)
              return (
                (t.delegate = null),
                ("throw" === r &&
                  n.iterator.return &&
                  ((t.method = "return"),
                  (t.arg = e),
                  L(n, t),
                  "throw" === t.method)) ||
                  ("return" !== r &&
                    ((t.method = "throw"),
                    (t.arg = new TypeError(
                      "The iterator does not provide a '" + r + "' method"
                    )))),
                g
              );
            var i = d(o, n.iterator, t.arg);
            if ("throw" === i.type)
              return (
                (t.method = "throw"), (t.arg = i.arg), (t.delegate = null), g
              );
            var a = i.arg;
            return a
              ? a.done
                ? ((t[n.resultName] = a.value),
                  (t.next = n.nextLoc),
                  "return" !== t.method && ((t.method = "next"), (t.arg = e)),
                  (t.delegate = null),
                  g)
                : a
              : ((t.method = "throw"),
                (t.arg = new TypeError("iterator result is not an object")),
                (t.delegate = null),
                g);
          }
          function O(n) {
            var t = { tryLoc: n[0] };
            1 in n && (t.catchLoc = n[1]),
              2 in n && ((t.finallyLoc = n[2]), (t.afterLoc = n[3])),
              this.tryEntries.push(t);
          }
          function T(n) {
            var t = n.completion || {};
            (t.type = "normal"), delete t.arg, (n.completion = t);
          }
          function M(n) {
            (this.tryEntries = [{ tryLoc: "root" }]),
              n.forEach(O, this),
              this.reset(!0);
          }
          function _(t) {
            if (t || "" === t) {
              var r = t[s];
              if (r) return r.call(t);
              if ("function" == typeof t.next) return t;
              if (!isNaN(t.length)) {
                var o = -1,
                  a = function n() {
                    for (; ++o < t.length; )
                      if (i.call(t, o))
                        return (n.value = t[o]), (n.done = !1), n;
                    return (n.value = e), (n.done = !0), n;
                  };
                return (a.next = a);
              }
            }
            throw new TypeError(n(t) + " is not iterable");
          }
          return (
            (v.prototype = b),
            a(k, "constructor", { value: b, configurable: !0 }),
            a(b, "constructor", { value: v, configurable: !0 }),
            (v.displayName = A(b, u, "GeneratorFunction")),
            (r.isGeneratorFunction = function (n) {
              var t = "function" == typeof n && n.constructor;
              return (
                !!t &&
                (t === v || "GeneratorFunction" === (t.displayName || t.name))
              );
            }),
            (r.mark = function (n) {
              return (
                Object.setPrototypeOf
                  ? Object.setPrototypeOf(n, b)
                  : ((n.__proto__ = b), A(n, u, "GeneratorFunction")),
                (n.prototype = Object.create(k)),
                n
              );
            }),
            (r.awrap = function (n) {
              return { __await: n };
            }),
            w(j.prototype),
            A(j.prototype, l, function () {
              return this;
            }),
            (r.AsyncIterator = j),
            (r.async = function (n, t, e, o, i) {
              void 0 === i && (i = Promise);
              var a = new j(p(n, t, e, o), i);
              return r.isGeneratorFunction(t)
                ? a
                : a.next().then(function (n) {
                    return n.done ? n.value : a.next();
                  });
            }),
            w(k),
            A(k, u, "Generator"),
            A(k, s, function () {
              return this;
            }),
            A(k, "toString", function () {
              return "[object Generator]";
            }),
            (r.keys = function (n) {
              var t = Object(n),
                e = [];
              for (var r in t) e.push(r);
              return (
                e.reverse(),
                function n() {
                  for (; e.length; ) {
                    var r = e.pop();
                    if (r in t) return (n.value = r), (n.done = !1), n;
                  }
                  return (n.done = !0), n;
                }
              );
            }),
            (r.values = _),
            (M.prototype = {
              constructor: M,
              reset: function (n) {
                if (
                  ((this.prev = 0),
                  (this.next = 0),
                  (this.sent = this._sent = e),
                  (this.done = !1),
                  (this.delegate = null),
                  (this.method = "next"),
                  (this.arg = e),
                  this.tryEntries.forEach(T),
                  !n)
                )
                  for (var t in this)
                    "t" === t.charAt(0) &&
                      i.call(this, t) &&
                      !isNaN(+t.slice(1)) &&
                      (this[t] = e);
              },
              stop: function () {
                this.done = !0;
                var n = this.tryEntries[0].completion;
                if ("throw" === n.type) throw n.arg;
                return this.rval;
              },
              dispatchException: function (n) {
                if (this.done) throw n;
                var t = this;
                function r(r, o) {
                  return (
                    (c.type = "throw"),
                    (c.arg = n),
                    (t.next = r),
                    o && ((t.method = "next"), (t.arg = e)),
                    !!o
                  );
                }
                for (var o = this.tryEntries.length - 1; o >= 0; --o) {
                  var a = this.tryEntries[o],
                    c = a.completion;
                  if ("root" === a.tryLoc) return r("end");
                  if (a.tryLoc <= this.prev) {
                    var s = i.call(a, "catchLoc"),
                      l = i.call(a, "finallyLoc");
                    if (s && l) {
                      if (this.prev < a.catchLoc) return r(a.catchLoc, !0);
                      if (this.prev < a.finallyLoc) return r(a.finallyLoc);
                    } else if (s) {
                      if (this.prev < a.catchLoc) return r(a.catchLoc, !0);
                    } else {
                      if (!l)
                        throw Error("try statement without catch or finally");
                      if (this.prev < a.finallyLoc) return r(a.finallyLoc);
                    }
                  }
                }
              },
              abrupt: function (n, t) {
                for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                  var r = this.tryEntries[e];
                  if (
                    r.tryLoc <= this.prev &&
                    i.call(r, "finallyLoc") &&
                    this.prev < r.finallyLoc
                  ) {
                    var o = r;
                    break;
                  }
                }
                o &&
                  ("break" === n || "continue" === n) &&
                  o.tryLoc <= t &&
                  t <= o.finallyLoc &&
                  (o = null);
                var a = o ? o.completion : {};
                return (
                  (a.type = n),
                  (a.arg = t),
                  o
                    ? ((this.method = "next"), (this.next = o.finallyLoc), g)
                    : this.complete(a)
                );
              },
              complete: function (n, t) {
                if ("throw" === n.type) throw n.arg;
                return (
                  "break" === n.type || "continue" === n.type
                    ? (this.next = n.arg)
                    : "return" === n.type
                    ? ((this.rval = this.arg = n.arg),
                      (this.method = "return"),
                      (this.next = "end"))
                    : "normal" === n.type && t && (this.next = t),
                  g
                );
              },
              finish: function (n) {
                for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                  var e = this.tryEntries[t];
                  if (e.finallyLoc === n)
                    return this.complete(e.completion, e.afterLoc), T(e), g;
                }
              },
              catch: function (n) {
                for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                  var e = this.tryEntries[t];
                  if (e.tryLoc === n) {
                    var r = e.completion;
                    if ("throw" === r.type) {
                      var o = r.arg;
                      T(e);
                    }
                    return o;
                  }
                }
                throw Error("illegal catch attempt");
              },
              delegateYield: function (n, t, r) {
                return (
                  (this.delegate = {
                    iterator: _(n),
                    resultName: t,
                    nextLoc: r,
                  }),
                  "next" === this.method && (this.arg = e),
                  g
                );
              },
            }),
            r
          );
        }
        function e(n, t, e, r, o, i, a) {
          try {
            var c = n[i](a),
              s = c.value;
          } catch (n) {
            return void e(n);
          }
          c.done ? t(s) : Promise.resolve(s).then(r, o);
        }
        function r(n) {
          return function () {
            var t = this,
              r = arguments;
            return new Promise(function (o, i) {
              var a = n.apply(t, r);
              function c(n) {
                e(a, o, i, c, s, "next", n);
              }
              function s(n) {
                e(a, o, i, c, s, "throw", n);
              }
              c(void 0);
            });
          };
        }
        document.addEventListener(
          "DOMContentLoaded",
          r(
            t().mark(function n() {
              var e, r;
              return t().wrap(
                function (n) {
                  for (;;)
                    switch ((n.prev = n.next)) {
                      case 0:
                        return (
                          (e = document.querySelector(".restaurant-grid")),
                          (n.prev = 1),
                          (n.next = 4),
                          fetch("./data/DATA.json")
                        );
                      case 4:
                        return (r = n.sent), (n.next = 7), r.json();
                      case 7:
                        n.sent.restaurants.forEach(function (n) {
                          var t = document.createElement("restaurant-card");
                          (t.restaurant = n), e.appendChild(t);
                        }),
                          (n.next = 15);
                        break;
                      case 12:
                        (n.prev = 12),
                          (n.t0 = n.catch(1)),
                          console.error("Error loading restaurant data:", n.t0);
                      case 15:
                      case "end":
                        return n.stop();
                    }
                },
                n,
                null,
                [[1, 12]]
              );
            })
          )
        );
        var o = document.getElementById("menu-button"),
          i = document.getElementById("nav-links");
        o.addEventListener("click", function () {
          i.classList.toggle("show");
        });
      },
      220: () => {
        function n(t) {
          return (
            (n =
              "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                ? function (n) {
                    return typeof n;
                  }
                : function (n) {
                    return n &&
                      "function" == typeof Symbol &&
                      n.constructor === Symbol &&
                      n !== Symbol.prototype
                      ? "symbol"
                      : typeof n;
                  }),
            n(t)
          );
        }
        function t(n, t) {
          for (var r = 0; r < t.length; r++) {
            var o = t[r];
            (o.enumerable = o.enumerable || !1),
              (o.configurable = !0),
              "value" in o && (o.writable = !0),
              Object.defineProperty(n, e(o.key), o);
          }
        }
        function e(t) {
          var e = (function (t) {
            if ("object" != n(t) || !t) return t;
            var e = t[Symbol.toPrimitive];
            if (void 0 !== e) {
              var r = e.call(t, "string");
              if ("object" != n(r)) return r;
              throw new TypeError(
                "@@toPrimitive must return a primitive value."
              );
            }
            return String(t);
          })(t);
          return "symbol" == n(e) ? e : e + "";
        }
        function r(n) {
          var t = "function" == typeof Map ? new Map() : void 0;
          return (
            (r = function (n) {
              if (
                null === n ||
                !(function (n) {
                  try {
                    return (
                      -1 !== Function.toString.call(n).indexOf("[native code]")
                    );
                  } catch (t) {
                    return "function" == typeof n;
                  }
                })(n)
              )
                return n;
              if ("function" != typeof n)
                throw new TypeError(
                  "Super expression must either be null or a function"
                );
              if (void 0 !== t) {
                if (t.has(n)) return t.get(n);
                t.set(n, e);
              }
              function e() {
                return (function (n, t, e) {
                  if (o()) return Reflect.construct.apply(null, arguments);
                  var r = [null];
                  r.push.apply(r, t);
                  var a = new (n.bind.apply(n, r))();
                  return e && i(a, e.prototype), a;
                })(n, arguments, a(this).constructor);
              }
              return (
                (e.prototype = Object.create(n.prototype, {
                  constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0,
                  },
                })),
                i(e, n)
              );
            }),
            r(n)
          );
        }
        function o() {
          try {
            var n = !Boolean.prototype.valueOf.call(
              Reflect.construct(Boolean, [], function () {})
            );
          } catch (n) {}
          return (o = function () {
            return !!n;
          })();
        }
        function i(n, t) {
          return (
            (i = Object.setPrototypeOf
              ? Object.setPrototypeOf.bind()
              : function (n, t) {
                  return (n.__proto__ = t), n;
                }),
            i(n, t)
          );
        }
        function a(n) {
          return (
            (a = Object.setPrototypeOf
              ? Object.getPrototypeOf.bind()
              : function (n) {
                  return n.__proto__ || Object.getPrototypeOf(n);
                }),
            a(n)
          );
        }
        var c = (function (e) {
          function r() {
            var t;
            return (
              (function (n, t) {
                if (!(n instanceof t))
                  throw new TypeError("Cannot call a class as a function");
              })(this, r),
              (t = (function (t, e, r) {
                return (
                  (e = a(e)),
                  (function (t, e) {
                    if (e && ("object" == n(e) || "function" == typeof e))
                      return e;
                    if (void 0 !== e)
                      throw new TypeError(
                        "Derived constructors may only return object or undefined"
                      );
                    return (function (n) {
                      if (void 0 === n)
                        throw new ReferenceError(
                          "this hasn't been initialised - super() hasn't been called"
                        );
                      return n;
                    })(t);
                  })(
                    t,
                    o()
                      ? Reflect.construct(e, r || [], a(t).constructor)
                      : e.apply(t, r)
                  )
                );
              })(this, r)).attachShadow({ mode: "open" }),
              (t._isSelected = !1),
              t
            );
          }
          return (
            (function (n, t) {
              if ("function" != typeof t && null !== t)
                throw new TypeError(
                  "Super expression must either be null or a function"
                );
              (n.prototype = Object.create(t && t.prototype, {
                constructor: { value: n, writable: !0, configurable: !0 },
              })),
                Object.defineProperty(n, "prototype", { writable: !1 }),
                t && i(n, t);
            })(r, e),
            (c = r),
            (s = [
              {
                key: "restaurant",
                set: function (n) {
                  (this._restaurant = n), this.render();
                },
              },
              {
                key: "render",
                value: function () {
                  var n = this,
                    t = this._restaurant.altText || this._restaurant.name;
                  this.shadowRoot.innerHTML =
                    '\n      <style>\n        .card {\n          border: 1px solid #ccc;\n          border-radius: 8px;\n          overflow: hidden;\n          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);\n          display: flex;\n          flex-direction: column;\n          text-align: left;\n          background-color: white;\n          padding: 10px;\n          cursor: pointer;\n        }\n\n        .card.selected {\n          border: 2px solid #007bff; /* Highlight selected card */\n          background-color: #f0f8ff; /* Light background for selected card */\n        }\n\n        .card img {\n          width: 100%;\n          height: 200px;\n          object-fit: cover;\n        }\n\n        .card .content {\n          padding: 16px;\n        }\n\n        .card .city {\n          position: absolute;\n          background-color: rgba(0, 0, 0, 0.7);\n          color: white;\n          padding: 4px 8px;\n          top: 8px;\n          left: 8px;\n          font-size: 0.9rem;\n          border-radius: 4px;\n        }\n\n        .card h3 {\n          margin: 0;\n          font-size: 1.2rem;\n        }\n\n        .card p {\n          margin: 8px 0;\n          color: #555;\n        }\n\n        .card .rating {\n          margin-top: 8px;\n          font-size: 1rem;\n          color: #ff8800;\n        }\n\n        .alt-text {\n          display: none;\n          width: 100%;\n          height: 200px;\n          background-color: #f3f3f3;\n          display: flex;\n          align-items: center;\n          justify-content: center;\n          font-size: 1.2rem;\n          color: #999;\n          text-align: center;\n        }\n\n      </style>\n\n      <div class="card" tabindex="0">\n        <div style="position: relative;">\n          <img src="'
                      .concat(
                        this._restaurant.pictureId,
                        '" \n               alt="'
                      )
                      .concat(
                        t,
                        '" \n               onerror="this.style.display=\'none\'; this.nextElementSibling.style.display=\'flex\';"\n               onload="this.nextElementSibling.style.display=\'none\';">\n          <span class="alt-text">'
                      )
                      .concat(t, '</span>\n          <span class="city">')
                      .concat(
                        this._restaurant.city,
                        '</span>\n        </div>\n        <div class="content">\n          <h3>'
                      )
                      .concat(this._restaurant.name, "</h3>\n          <p>")
                      .concat(
                        this._restaurant.description.slice(0, 100),
                        '...</p>\n          <div class="rating">⭐ '
                      )
                      .concat(
                        this._restaurant.rating,
                        "</div>\n        </div>\n      </div>\n    "
                      );
                  var e = this.shadowRoot.querySelector(".card");
                  e.addEventListener("keydown", function (t) {
                    "Enter" === t.key && n.selectCard();
                  }),
                    e.addEventListener("focus", function () {
                      e.classList.add("selected");
                    }),
                    e.addEventListener("blur", function () {
                      e.classList.remove("selected");
                    });
                },
              },
              {
                key: "selectCard",
                value: function () {
                  this.shadowRoot
                    .querySelector(".card")
                    .classList.toggle("selected");
                },
              },
            ]),
            s && t(c.prototype, s),
            Object.defineProperty(c, "prototype", { writable: !1 }),
            c
          );
          var c, s;
        })(r(HTMLElement));
        customElements.define("restaurant-card", c);
      },
      249: (n, t, e) => {
        "use strict";
        e.d(t, { A: () => c });
        var r = e(354),
          o = e.n(r),
          i = e(314),
          a = e.n(i)()(o());
        a.push([
          n.id,
          "button, a, .card {\n  min-width: 44px; /* Minimum width */\n  min-height: 44px; /* Minimum height */\n  padding: 10px; /* Adding padding to ensure sufficient touch area */\n  display: inline-flex; /* To align content inside */\n  justify-content: center; /* Align horizontally */\n  align-items: center; /* Align vertically */\n}\n\nbutton {\n  font-size: 24px; /* To make the button easily tappable */\n  line-height: 44px; /* Ensures the button content is vertically centered */\n}\n\na {\n  font-size: 16px; /* Readable font size for links */\n  text-decoration: none;\n  color: inherit;\n}\n\n\nh2 {\n   text-align: center;\n   margin: 40px;\n}\n\nbody {\n  margin: 0;\n  font-family: Arial, sans-serif;\n}\n\nheader {\n  background-color: #333;\n  color: white;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 20px 20px;\n}\n\nnav {\n  display: flex;\n  justify-content: flex-end; /* Pindahkan item ke kanan */\n  align-items: center;\n  width: 100%; /* Mengambil seluruh lebar container */\n}\n\n#menu-button {\n  display: none;\n  background: none;\n  border: none;\n  color: white;\n  font-size: 1.5rem;\n  cursor: pointer;\n}\n\n#brand {\n  font-size: 1.2rem;\n  position: absolute; /* Membuat posisi relatif terhadap parent */\n  top: 5; /* Atur jarak dari atas */\n  left: 0; /* Atur jarak dari kiri */\n  padding: 10px;\n  margin-left: 13px;\n}\n\n#nav-links {\n  list-style: none;\n  display: flex;\n  gap: 15px;\n  margin: 0;\n  padding: 0;\n}\n\n#nav-links li {\n  cursor: pointer;\n}\n\nnav ul li a {\n  text-decoration: none;\n  color: white;\n  font-size: 1rem;\n  transition: color 0.3s;\n}\n\nnav ul li a:hover {\n  color: #007bff;\n}\n\n.hero-element img {\n  width: 100%;\n  height: 300px;\n  object-fit: cover;\n}\n\n.explore-section {\n  padding: 20px;\n}\n\n.explore-section h2 {\n  text-align: center;\n}\n\n.restaurant-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));\n  gap: 20px;\n  /* Jarak antar kartu */\n  justify-content: center;\n  /* Rata tengah secara horizontal */\n  align-items: start;\n  /* Semua item berada di atas */\n  max-width: 1200px;\n  /* Lebar maksimum grid */\n  margin: 0 auto;\n  /* Tengah secara horizontal pada halaman */\n}\n\nrestaurant-card {\n  display: block;\n  border: 1px solid #ddd;\n  border-radius: 8px;\n  padding: 10px;\n  text-align: center;\n}\n\nfooter {\n  text-align: center;\n  background-color: #333;\n  color: white;\n  padding: 10px 0;\n}\n\n.hero-element img {\n  width: 100%;\n  height: 300px;\n  object-fit: cover;\n}\n\n/* Menyembunyikan link skip secara default */\n.skip-link {\n  position: absolute;\n  top: -70px; /* Menyembunyikan link di atas layar */\n  left: 10px;\n  background-color: #000;\n  color: white;\n  padding: 10px;\n  text-decoration: none;\n  border-radius: 5px;\n}\n\n/* Menampilkan link saat fokus dengan keyboard */\n.skip-link:focus {\n  top: 10px; /* Pindahkan link ke atas saat fokus */\n  z-index: 1000; /* Pastikan berada di atas elemen lain */\n}\n\n\n@media (max-width: 1200px) {\n  .hero-element img {\n    width: 100%; /* Membuat gambar full width */\n    height: auto; /* Menyesuaikan tinggi gambar agar proporsional */\n  }\n}\n\n@media (max-width: 600px) {\n  #menu-button {\n    display: inline-block;\n  }\n\n  #brand {\n  margin-left: 10px;\n}\n\n\n\n  #nav-links {\n    display: none;\n    flex-direction: column;\n    background-color: #444;\n    position: absolute;\n    top: 50px;\n    right: 10px;\n    padding: 10px;\n    border-radius: 5px;\n  }\n\n  #nav-links.show {\n    display: flex;\n  }\n\n  header {\n    padding: 10px 20px;\n  }\n\n  nav ul li a:hover {\n    color: #007bff;\n  }\n}\n",
          "",
          {
            version: 3,
            sources: ["webpack://./src/styles/main.css"],
            names: [],
            mappings:
              "AAAA;EACE,eAAe,EAAE,kBAAkB;EACnC,gBAAgB,EAAE,mBAAmB;EACrC,aAAa,EAAE,mDAAmD;EAClE,oBAAoB,EAAE,4BAA4B;EAClD,uBAAuB,EAAE,uBAAuB;EAChD,mBAAmB,EAAE,qBAAqB;AAC5C;;AAEA;EACE,eAAe,EAAE,uCAAuC;EACxD,iBAAiB,EAAE,sDAAsD;AAC3E;;AAEA;EACE,eAAe,EAAE,iCAAiC;EAClD,qBAAqB;EACrB,cAAc;AAChB;;;AAGA;GACG,kBAAkB;GAClB,YAAY;AACf;;AAEA;EACE,SAAS;EACT,8BAA8B;AAChC;;AAEA;EACE,sBAAsB;EACtB,YAAY;EACZ,aAAa;EACb,8BAA8B;EAC9B,mBAAmB;EACnB,kBAAkB;AACpB;;AAEA;EACE,aAAa;EACb,yBAAyB,EAAE,4BAA4B;EACvD,mBAAmB;EACnB,WAAW,EAAE,sCAAsC;AACrD;;AAEA;EACE,aAAa;EACb,gBAAgB;EAChB,YAAY;EACZ,YAAY;EACZ,iBAAiB;EACjB,eAAe;AACjB;;AAEA;EACE,iBAAiB;EACjB,kBAAkB,EAAE,2CAA2C;EAC/D,MAAM,EAAE,yBAAyB;EACjC,OAAO,EAAE,yBAAyB;EAClC,aAAa;EACb,iBAAiB;AACnB;;AAEA;EACE,gBAAgB;EAChB,aAAa;EACb,SAAS;EACT,SAAS;EACT,UAAU;AACZ;;AAEA;EACE,eAAe;AACjB;;AAEA;EACE,qBAAqB;EACrB,YAAY;EACZ,eAAe;EACf,sBAAsB;AACxB;;AAEA;EACE,cAAc;AAChB;;AAEA;EACE,WAAW;EACX,aAAa;EACb,iBAAiB;AACnB;;AAEA;EACE,aAAa;AACf;;AAEA;EACE,kBAAkB;AACpB;;AAEA;EACE,aAAa;EACb,4DAA4D;EAC5D,SAAS;EACT,sBAAsB;EACtB,uBAAuB;EACvB,kCAAkC;EAClC,kBAAkB;EAClB,8BAA8B;EAC9B,iBAAiB;EACjB,wBAAwB;EACxB,cAAc;EACd,0CAA0C;AAC5C;;AAEA;EACE,cAAc;EACd,sBAAsB;EACtB,kBAAkB;EAClB,aAAa;EACb,kBAAkB;AACpB;;AAEA;EACE,kBAAkB;EAClB,sBAAsB;EACtB,YAAY;EACZ,eAAe;AACjB;;AAEA;EACE,WAAW;EACX,aAAa;EACb,iBAAiB;AACnB;;AAEA,4CAA4C;AAC5C;EACE,kBAAkB;EAClB,UAAU,EAAE,sCAAsC;EAClD,UAAU;EACV,sBAAsB;EACtB,YAAY;EACZ,aAAa;EACb,qBAAqB;EACrB,kBAAkB;AACpB;;AAEA,gDAAgD;AAChD;EACE,SAAS,EAAE,sCAAsC;EACjD,aAAa,EAAE,wCAAwC;AACzD;;;AAGA;EACE;IACE,WAAW,EAAE,8BAA8B;IAC3C,YAAY,EAAE,iDAAiD;EACjE;AACF;;AAEA;EACE;IACE,qBAAqB;EACvB;;EAEA;EACA,iBAAiB;AACnB;;;;EAIE;IACE,aAAa;IACb,sBAAsB;IACtB,sBAAsB;IACtB,kBAAkB;IAClB,SAAS;IACT,WAAW;IACX,aAAa;IACb,kBAAkB;EACpB;;EAEA;IACE,aAAa;EACf;;EAEA;IACE,kBAAkB;EACpB;;EAEA;IACE,cAAc;EAChB;AACF",
            sourcesContent: [
              "button, a, .card {\n  min-width: 44px; /* Minimum width */\n  min-height: 44px; /* Minimum height */\n  padding: 10px; /* Adding padding to ensure sufficient touch area */\n  display: inline-flex; /* To align content inside */\n  justify-content: center; /* Align horizontally */\n  align-items: center; /* Align vertically */\n}\n\nbutton {\n  font-size: 24px; /* To make the button easily tappable */\n  line-height: 44px; /* Ensures the button content is vertically centered */\n}\n\na {\n  font-size: 16px; /* Readable font size for links */\n  text-decoration: none;\n  color: inherit;\n}\n\n\nh2 {\n   text-align: center;\n   margin: 40px;\n}\n\nbody {\n  margin: 0;\n  font-family: Arial, sans-serif;\n}\n\nheader {\n  background-color: #333;\n  color: white;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 20px 20px;\n}\n\nnav {\n  display: flex;\n  justify-content: flex-end; /* Pindahkan item ke kanan */\n  align-items: center;\n  width: 100%; /* Mengambil seluruh lebar container */\n}\n\n#menu-button {\n  display: none;\n  background: none;\n  border: none;\n  color: white;\n  font-size: 1.5rem;\n  cursor: pointer;\n}\n\n#brand {\n  font-size: 1.2rem;\n  position: absolute; /* Membuat posisi relatif terhadap parent */\n  top: 5; /* Atur jarak dari atas */\n  left: 0; /* Atur jarak dari kiri */\n  padding: 10px;\n  margin-left: 13px;\n}\n\n#nav-links {\n  list-style: none;\n  display: flex;\n  gap: 15px;\n  margin: 0;\n  padding: 0;\n}\n\n#nav-links li {\n  cursor: pointer;\n}\n\nnav ul li a {\n  text-decoration: none;\n  color: white;\n  font-size: 1rem;\n  transition: color 0.3s;\n}\n\nnav ul li a:hover {\n  color: #007bff;\n}\n\n.hero-element img {\n  width: 100%;\n  height: 300px;\n  object-fit: cover;\n}\n\n.explore-section {\n  padding: 20px;\n}\n\n.explore-section h2 {\n  text-align: center;\n}\n\n.restaurant-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));\n  gap: 20px;\n  /* Jarak antar kartu */\n  justify-content: center;\n  /* Rata tengah secara horizontal */\n  align-items: start;\n  /* Semua item berada di atas */\n  max-width: 1200px;\n  /* Lebar maksimum grid */\n  margin: 0 auto;\n  /* Tengah secara horizontal pada halaman */\n}\n\nrestaurant-card {\n  display: block;\n  border: 1px solid #ddd;\n  border-radius: 8px;\n  padding: 10px;\n  text-align: center;\n}\n\nfooter {\n  text-align: center;\n  background-color: #333;\n  color: white;\n  padding: 10px 0;\n}\n\n.hero-element img {\n  width: 100%;\n  height: 300px;\n  object-fit: cover;\n}\n\n/* Menyembunyikan link skip secara default */\n.skip-link {\n  position: absolute;\n  top: -70px; /* Menyembunyikan link di atas layar */\n  left: 10px;\n  background-color: #000;\n  color: white;\n  padding: 10px;\n  text-decoration: none;\n  border-radius: 5px;\n}\n\n/* Menampilkan link saat fokus dengan keyboard */\n.skip-link:focus {\n  top: 10px; /* Pindahkan link ke atas saat fokus */\n  z-index: 1000; /* Pastikan berada di atas elemen lain */\n}\n\n\n@media (max-width: 1200px) {\n  .hero-element img {\n    width: 100%; /* Membuat gambar full width */\n    height: auto; /* Menyesuaikan tinggi gambar agar proporsional */\n  }\n}\n\n@media (max-width: 600px) {\n  #menu-button {\n    display: inline-block;\n  }\n\n  #brand {\n  margin-left: 10px;\n}\n\n\n\n  #nav-links {\n    display: none;\n    flex-direction: column;\n    background-color: #444;\n    position: absolute;\n    top: 50px;\n    right: 10px;\n    padding: 10px;\n    border-radius: 5px;\n  }\n\n  #nav-links.show {\n    display: flex;\n  }\n\n  header {\n    padding: 10px 20px;\n  }\n\n  nav ul li a:hover {\n    color: #007bff;\n  }\n}\n",
            ],
            sourceRoot: "",
          },
        ]);
        const c = a;
      },
      314: (n) => {
        "use strict";
        n.exports = function (n) {
          var t = [];
          return (
            (t.toString = function () {
              return this.map(function (t) {
                var e = "",
                  r = void 0 !== t[5];
                return (
                  t[4] && (e += "@supports (".concat(t[4], ") {")),
                  t[2] && (e += "@media ".concat(t[2], " {")),
                  r &&
                    (e += "@layer".concat(
                      t[5].length > 0 ? " ".concat(t[5]) : "",
                      " {"
                    )),
                  (e += n(t)),
                  r && (e += "}"),
                  t[2] && (e += "}"),
                  t[4] && (e += "}"),
                  e
                );
              }).join("");
            }),
            (t.i = function (n, e, r, o, i) {
              "string" == typeof n && (n = [[null, n, void 0]]);
              var a = {};
              if (r)
                for (var c = 0; c < this.length; c++) {
                  var s = this[c][0];
                  null != s && (a[s] = !0);
                }
              for (var l = 0; l < n.length; l++) {
                var u = [].concat(n[l]);
                (r && a[u[0]]) ||
                  (void 0 !== i &&
                    (void 0 === u[5] ||
                      (u[1] = "@layer"
                        .concat(u[5].length > 0 ? " ".concat(u[5]) : "", " {")
                        .concat(u[1], "}")),
                    (u[5] = i)),
                  e &&
                    (u[2]
                      ? ((u[1] = "@media "
                          .concat(u[2], " {")
                          .concat(u[1], "}")),
                        (u[2] = e))
                      : (u[2] = e)),
                  o &&
                    (u[4]
                      ? ((u[1] = "@supports ("
                          .concat(u[4], ") {")
                          .concat(u[1], "}")),
                        (u[4] = o))
                      : (u[4] = "".concat(o))),
                  t.push(u));
              }
            }),
            t
          );
        };
      },
      354: (n) => {
        "use strict";
        n.exports = function (n) {
          var t = n[1],
            e = n[3];
          if (!e) return t;
          if ("function" == typeof btoa) {
            var r = btoa(unescape(encodeURIComponent(JSON.stringify(e)))),
              o =
                "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(
                  r
                ),
              i = "/*# ".concat(o, " */");
            return [t].concat([i]).join("\n");
          }
          return [t].join("\n");
        };
      },
      72: (n) => {
        "use strict";
        var t = [];
        function e(n) {
          for (var e = -1, r = 0; r < t.length; r++)
            if (t[r].identifier === n) {
              e = r;
              break;
            }
          return e;
        }
        function r(n, r) {
          for (var i = {}, a = [], c = 0; c < n.length; c++) {
            var s = n[c],
              l = r.base ? s[0] + r.base : s[0],
              u = i[l] || 0,
              A = "".concat(l, " ").concat(u);
            i[l] = u + 1;
            var p = e(A),
              d = {
                css: s[1],
                media: s[2],
                sourceMap: s[3],
                supports: s[4],
                layer: s[5],
              };
            if (-1 !== p) t[p].references++, t[p].updater(d);
            else {
              var f = o(d, r);
              (r.byIndex = c),
                t.splice(c, 0, { identifier: A, updater: f, references: 1 });
            }
            a.push(A);
          }
          return a;
        }
        function o(n, t) {
          var e = t.domAPI(t);
          return (
            e.update(n),
            function (t) {
              if (t) {
                if (
                  t.css === n.css &&
                  t.media === n.media &&
                  t.sourceMap === n.sourceMap &&
                  t.supports === n.supports &&
                  t.layer === n.layer
                )
                  return;
                e.update((n = t));
              } else e.remove();
            }
          );
        }
        n.exports = function (n, o) {
          var i = r((n = n || []), (o = o || {}));
          return function (n) {
            n = n || [];
            for (var a = 0; a < i.length; a++) {
              var c = e(i[a]);
              t[c].references--;
            }
            for (var s = r(n, o), l = 0; l < i.length; l++) {
              var u = e(i[l]);
              0 === t[u].references && (t[u].updater(), t.splice(u, 1));
            }
            i = s;
          };
        };
      },
      659: (n) => {
        "use strict";
        var t = {};
        n.exports = function (n, e) {
          var r = (function (n) {
            if (void 0 === t[n]) {
              var e = document.querySelector(n);
              if (
                window.HTMLIFrameElement &&
                e instanceof window.HTMLIFrameElement
              )
                try {
                  e = e.contentDocument.head;
                } catch (n) {
                  e = null;
                }
              t[n] = e;
            }
            return t[n];
          })(n);
          if (!r)
            throw new Error(
              "Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid."
            );
          r.appendChild(e);
        };
      },
      540: (n) => {
        "use strict";
        n.exports = function (n) {
          var t = document.createElement("style");
          return n.setAttributes(t, n.attributes), n.insert(t, n.options), t;
        };
      },
      56: (n, t, e) => {
        "use strict";
        n.exports = function (n) {
          var t = e.nc;
          t && n.setAttribute("nonce", t);
        };
      },
      825: (n) => {
        "use strict";
        n.exports = function (n) {
          if ("undefined" == typeof document)
            return { update: function () {}, remove: function () {} };
          var t = n.insertStyleElement(n);
          return {
            update: function (e) {
              !(function (n, t, e) {
                var r = "";
                e.supports && (r += "@supports (".concat(e.supports, ") {")),
                  e.media && (r += "@media ".concat(e.media, " {"));
                var o = void 0 !== e.layer;
                o &&
                  (r += "@layer".concat(
                    e.layer.length > 0 ? " ".concat(e.layer) : "",
                    " {"
                  )),
                  (r += e.css),
                  o && (r += "}"),
                  e.media && (r += "}"),
                  e.supports && (r += "}");
                var i = e.sourceMap;
                i &&
                  "undefined" != typeof btoa &&
                  (r +=
                    "\n/*# sourceMappingURL=data:application/json;base64,".concat(
                      btoa(unescape(encodeURIComponent(JSON.stringify(i)))),
                      " */"
                    )),
                  t.styleTagTransform(r, n, t.options);
              })(t, n, e);
            },
            remove: function () {
              !(function (n) {
                if (null === n.parentNode) return !1;
                n.parentNode.removeChild(n);
              })(t);
            },
          };
        };
      },
      113: (n) => {
        "use strict";
        n.exports = function (n, t) {
          if (t.styleSheet) t.styleSheet.cssText = n;
          else {
            for (; t.firstChild; ) t.removeChild(t.firstChild);
            t.appendChild(document.createTextNode(n));
          }
        };
      },
    },
    t = {};
  function e(r) {
    var o = t[r];
    if (void 0 !== o) return o.exports;
    var i = (t[r] = { id: r, exports: {} });
    return n[r](i, i.exports, e), i.exports;
  }
  (e.n = (n) => {
    var t = n && n.__esModule ? () => n.default : () => n;
    return e.d(t, { a: t }), t;
  }),
    (e.d = (n, t) => {
      for (var r in t)
        e.o(t, r) &&
          !e.o(n, r) &&
          Object.defineProperty(n, r, { enumerable: !0, get: t[r] });
    }),
    (e.o = (n, t) => Object.prototype.hasOwnProperty.call(n, t)),
    (e.nc = void 0),
    (() => {
      "use strict";
      e(543), e(220);
      var n = e(72),
        t = e.n(n),
        r = e(825),
        o = e.n(r),
        i = e(659),
        a = e.n(i),
        c = e(56),
        s = e.n(c),
        l = e(540),
        u = e.n(l),
        A = e(113),
        p = e.n(A),
        d = e(249),
        f = {};
      (f.styleTagTransform = p()),
        (f.setAttributes = s()),
        (f.insert = a().bind(null, "head")),
        (f.domAPI = o()),
        (f.insertStyleElement = u()),
        t()(d.A, f),
        d.A && d.A.locals && d.A.locals;
    })();
})();
//# sourceMappingURL=app.bundle.js.map
