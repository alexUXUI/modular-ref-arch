/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t = globalThis,
  e =
    t.ShadowRoot &&
    (void 0 === t.ShadyCSS || t.ShadyCSS.nativeShadow) &&
    'adoptedStyleSheets' in Document.prototype &&
    'replace' in CSSStyleSheet.prototype,
  s = Symbol(),
  i = new WeakMap();
class n {
  constructor(t, e, i) {
    if (((this._$cssResult$ = !0), i !== s))
      throw Error(
        'CSSResult is not constructable. Use `unsafeCSS` or `css` instead.',
      );
    (this.cssText = t), (this.t = e);
  }
  get styleSheet() {
    let t = this.o;
    const s = this.t;
    if (e && void 0 === t) {
      const e = void 0 !== s && 1 === s.length;
      e && (t = i.get(s)),
        void 0 === t &&
          ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText),
          e && i.set(s, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
}
const r = (s, i) => {
    if (e)
      s.adoptedStyleSheets = i.map((t) =>
        t instanceof CSSStyleSheet ? t : t.styleSheet,
      );
    else
      for (const e of i) {
        const i = document.createElement('style'),
          n = t.litNonce;
        void 0 !== n && i.setAttribute('nonce', n),
          (i.textContent = e.cssText),
          s.appendChild(i);
      }
  },
  o = e
    ? (t) => t
    : (t) =>
        t instanceof CSSStyleSheet
          ? ((t) => {
              let e = '';
              for (const s of t.cssRules) e += s.cssText;
              return ((t) =>
                new n('string' == typeof t ? t : t + '', void 0, s))(e);
            })(t)
          : t,
  /**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */ {
    is: h,
    defineProperty: l,
    getOwnPropertyDescriptor: a,
    getOwnPropertyNames: c,
    getOwnPropertySymbols: d,
    getPrototypeOf: p,
  } = Object,
  u = globalThis,
  $ = u.trustedTypes,
  _ = $ ? $.emptyScript : '',
  f = u.reactiveElementPolyfillSupport,
  A = (t, e) => t,
  m = {
    toAttribute(t, e) {
      switch (e) {
        case Boolean:
          t = t ? _ : null;
          break;
        case Object:
        case Array:
          t = null == t ? t : JSON.stringify(t);
      }
      return t;
    },
    fromAttribute(t, e) {
      let s = t;
      switch (e) {
        case Boolean:
          s = null !== t;
          break;
        case Number:
          s = null === t ? null : Number(t);
          break;
        case Object:
        case Array:
          try {
            s = JSON.parse(t);
          } catch (t) {
            s = null;
          }
      }
      return s;
    },
  },
  g = (t, e) => !h(t, e),
  y = { attribute: !0, type: String, converter: m, reflect: !1, hasChanged: g };
(Symbol.metadata ??= Symbol('metadata')),
  (u.litPropertyMetadata ??= new WeakMap());
class v extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = y) {
    if (
      (e.state && (e.attribute = !1),
      this._$Ei(),
      this.elementProperties.set(t, e),
      !e.noAccessor)
    ) {
      const s = Symbol(),
        i = this.getPropertyDescriptor(t, s, e);
      void 0 !== i && l(this.prototype, t, i);
    }
  }
  static getPropertyDescriptor(t, e, s) {
    const { get: i, set: n } = a(this.prototype, t) ?? {
      get() {
        return this[e];
      },
      set(t) {
        this[e] = t;
      },
    };
    return {
      get() {
        return i?.call(this);
      },
      set(e) {
        const r = i?.call(this);
        n.call(this, e), this.requestUpdate(t, r, s);
      },
      configurable: !0,
      enumerable: !0,
    };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? y;
  }
  static _$Ei() {
    if (this.hasOwnProperty(A('elementProperties'))) return;
    const t = p(this);
    t.finalize(),
      void 0 !== t.l && (this.l = [...t.l]),
      (this.elementProperties = new Map(t.elementProperties));
  }
  static finalize() {
    if (this.hasOwnProperty(A('finalized'))) return;
    if (
      ((this.finalized = !0), this._$Ei(), this.hasOwnProperty(A('properties')))
    ) {
      const t = this.properties,
        e = [...c(t), ...d(t)];
      for (const s of e) this.createProperty(s, t[s]);
    }
    const t = this[Symbol.metadata];
    if (null !== t) {
      const e = litPropertyMetadata.get(t);
      if (void 0 !== e)
        for (const [t, s] of e) this.elementProperties.set(t, s);
    }
    this._$Eh = new Map();
    for (const [t, e] of this.elementProperties) {
      const s = this._$Eu(t, e);
      void 0 !== s && this._$Eh.set(s, t);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const s = new Set(t.flat(1 / 0).reverse());
      for (const t of s) e.unshift(o(t));
    } else void 0 !== t && e.push(o(t));
    return e;
  }
  static _$Eu(t, e) {
    const s = e.attribute;
    return !1 === s
      ? void 0
      : 'string' == typeof s
        ? s
        : 'string' == typeof t
          ? t.toLowerCase()
          : void 0;
  }
  constructor() {
    super(),
      (this._$Ep = void 0),
      (this.isUpdatePending = !1),
      (this.hasUpdated = !1),
      (this._$Em = null),
      this._$Ev();
  }
  _$Ev() {
    (this._$ES = new Promise((t) => (this.enableUpdating = t))),
      (this._$AL = new Map()),
      this._$E_(),
      this.requestUpdate(),
      this.constructor.l?.forEach((t) => t(this));
  }
  addController(t) {
    (this._$EO ??= new Set()).add(t),
      void 0 !== this.renderRoot && this.isConnected && t.hostConnected?.();
  }
  removeController(t) {
    this._$EO?.delete(t);
  }
  _$E_() {
    const t = new Map(),
      e = this.constructor.elementProperties;
    for (const s of e.keys())
      this.hasOwnProperty(s) && (t.set(s, this[s]), delete this[s]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t =
      this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return r(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    (this.renderRoot ??= this.createRenderRoot()),
      this.enableUpdating(!0),
      this._$EO?.forEach((t) => t.hostConnected?.());
  }
  enableUpdating(t) {}
  disconnectedCallback() {
    this._$EO?.forEach((t) => t.hostDisconnected?.());
  }
  attributeChangedCallback(t, e, s) {
    this._$AK(t, s);
  }
  _$EC(t, e) {
    const s = this.constructor.elementProperties.get(t),
      i = this.constructor._$Eu(t, s);
    if (void 0 !== i && !0 === s.reflect) {
      const n = (
        void 0 !== s.converter?.toAttribute ? s.converter : m
      ).toAttribute(e, s.type);
      (this._$Em = t),
        null == n ? this.removeAttribute(i) : this.setAttribute(i, n),
        (this._$Em = null);
    }
  }
  _$AK(t, e) {
    const s = this.constructor,
      i = s._$Eh.get(t);
    if (void 0 !== i && this._$Em !== i) {
      const t = s.getPropertyOptions(i),
        n =
          'function' == typeof t.converter
            ? { fromAttribute: t.converter }
            : void 0 !== t.converter?.fromAttribute
              ? t.converter
              : m;
      (this._$Em = i),
        (this[i] = n.fromAttribute(e, t.type)),
        (this._$Em = null);
    }
  }
  requestUpdate(t, e, s) {
    if (void 0 !== t) {
      if (
        ((s ??= this.constructor.getPropertyOptions(t)),
        !(s.hasChanged ?? g)(this[t], e))
      )
        return;
      this.P(t, e, s);
    }
    !1 === this.isUpdatePending && (this._$ES = this._$ET());
  }
  P(t, e, s) {
    this._$AL.has(t) || this._$AL.set(t, e),
      !0 === s.reflect && this._$Em !== t && (this._$Ej ??= new Set()).add(t);
  }
  async _$ET() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (t) {
      Promise.reject(t);
    }
    const t = this.scheduleUpdate();
    return null != t && (await t), !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (((this.renderRoot ??= this.createRenderRoot()), this._$Ep)) {
        for (const [t, e] of this._$Ep) this[t] = e;
        this._$Ep = void 0;
      }
      const t = this.constructor.elementProperties;
      if (t.size > 0)
        for (const [e, s] of t)
          !0 !== s.wrapped ||
            this._$AL.has(e) ||
            void 0 === this[e] ||
            this.P(e, this[e], s);
    }
    let t = !1;
    const e = this._$AL;
    try {
      (t = this.shouldUpdate(e)),
        t
          ? (this.willUpdate(e),
            this._$EO?.forEach((t) => t.hostUpdate?.()),
            this.update(e))
          : this._$EU();
    } catch (e) {
      throw ((t = !1), this._$EU(), e);
    }
    t && this._$AE(e);
  }
  willUpdate(t) {}
  _$AE(t) {
    this._$EO?.forEach((t) => t.hostUpdated?.()),
      this.hasUpdated || ((this.hasUpdated = !0), this.firstUpdated(t)),
      this.updated(t);
  }
  _$EU() {
    (this._$AL = new Map()), (this.isUpdatePending = !1);
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    (this._$Ej &&= this._$Ej.forEach((t) => this._$EC(t, this[t]))),
      this._$EU();
  }
  updated(t) {}
  firstUpdated(t) {}
}
(v.elementStyles = []),
  (v.shadowRootOptions = { mode: 'open' }),
  (v[A('elementProperties')] = new Map()),
  (v[A('finalized')] = new Map()),
  f?.({ ReactiveElement: v }),
  (u.reactiveElementVersions ??= []).push('2.0.4');
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const E = globalThis,
  S = E.trustedTypes,
  b = S ? S.createPolicy('lit-html', { createHTML: (t) => t }) : void 0,
  w = '$lit$',
  P = `lit$${Math.random().toFixed(9).slice(2)}$`,
  C = '?' + P,
  U = `<${C}>`,
  x = document,
  O = () => x.createComment(''),
  H = (t) => null === t || ('object' != typeof t && 'function' != typeof t),
  T = Array.isArray,
  N = '[ \t\n\f\r]',
  R = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,
  M = /-->/g,
  k = />/g,
  z = RegExp(
    `>|${N}(?:([^\\s"'>=/]+)(${N}*=${N}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,
    'g',
  ),
  L = /'/g,
  j = /"/g,
  B = /^(?:script|style|textarea|title)$/i,
  I = (
    (t) =>
    (e, ...s) => ({ _$litType$: t, strings: e, values: s })
  )(1),
  D = Symbol.for('lit-noChange'),
  W = Symbol.for('lit-nothing'),
  V = new WeakMap(),
  q = x.createTreeWalker(x, 129);
function K(t, e) {
  if (!T(t) || !t.hasOwnProperty('raw'))
    throw Error('invalid template strings array');
  return void 0 !== b ? b.createHTML(e) : e;
}
class F {
  constructor({ strings: t, _$litType$: e }, s) {
    let i;
    this.parts = [];
    let n = 0,
      r = 0;
    const o = t.length - 1,
      h = this.parts,
      [l, a] = ((t, e) => {
        const s = t.length - 1,
          i = [];
        let n,
          r = 2 === e ? '<svg>' : 3 === e ? '<math>' : '',
          o = R;
        for (let e = 0; e < s; e++) {
          const s = t[e];
          let h,
            l,
            a = -1,
            c = 0;
          for (
            ;
            c < s.length && ((o.lastIndex = c), (l = o.exec(s)), null !== l);

          )
            (c = o.lastIndex),
              o === R
                ? '!--' === l[1]
                  ? (o = M)
                  : void 0 !== l[1]
                    ? (o = k)
                    : void 0 !== l[2]
                      ? (B.test(l[2]) && (n = RegExp('</' + l[2], 'g')),
                        (o = z))
                      : void 0 !== l[3] && (o = z)
                : o === z
                  ? '>' === l[0]
                    ? ((o = n ?? R), (a = -1))
                    : void 0 === l[1]
                      ? (a = -2)
                      : ((a = o.lastIndex - l[2].length),
                        (h = l[1]),
                        (o = void 0 === l[3] ? z : '"' === l[3] ? j : L))
                  : o === j || o === L
                    ? (o = z)
                    : o === M || o === k
                      ? (o = R)
                      : ((o = z), (n = void 0));
          const d = o === z && t[e + 1].startsWith('/>') ? ' ' : '';
          r +=
            o === R
              ? s + U
              : a >= 0
                ? (i.push(h), s.slice(0, a) + w + s.slice(a) + P + d)
                : s + P + (-2 === a ? e : d);
        }
        return [
          K(
            t,
            r +
              (t[s] || '<?>') +
              (2 === e ? '</svg>' : 3 === e ? '</math>' : ''),
          ),
          i,
        ];
      })(t, e);
    if (
      ((this.el = F.createElement(l, s)),
      (q.currentNode = this.el.content),
      2 === e || 3 === e)
    ) {
      const t = this.el.content.firstChild;
      t.replaceWith(...t.childNodes);
    }
    for (; null !== (i = q.nextNode()) && h.length < o; ) {
      if (1 === i.nodeType) {
        if (i.hasAttributes())
          for (const t of i.getAttributeNames())
            if (t.endsWith(w)) {
              const e = a[r++],
                s = i.getAttribute(t).split(P),
                o = /([.?@])?(.*)/.exec(e);
              h.push({
                type: 1,
                index: n,
                name: o[2],
                strings: s,
                ctor:
                  '.' === o[1] ? X : '?' === o[1] ? Y : '@' === o[1] ? tt : Q,
              }),
                i.removeAttribute(t);
            } else
              t.startsWith(P) &&
                (h.push({ type: 6, index: n }), i.removeAttribute(t));
        if (B.test(i.tagName)) {
          const t = i.textContent.split(P),
            e = t.length - 1;
          if (e > 0) {
            i.textContent = S ? S.emptyScript : '';
            for (let s = 0; s < e; s++)
              i.append(t[s], O()),
                q.nextNode(),
                h.push({ type: 2, index: ++n });
            i.append(t[e], O());
          }
        }
      } else if (8 === i.nodeType)
        if (i.data === C) h.push({ type: 2, index: n });
        else {
          let t = -1;
          for (; -1 !== (t = i.data.indexOf(P, t + 1)); )
            h.push({ type: 7, index: n }), (t += P.length - 1);
        }
      n++;
    }
  }
  static createElement(t, e) {
    const s = x.createElement('template');
    return (s.innerHTML = t), s;
  }
}
function J(t, e, s = t, i) {
  if (e === D) return e;
  let n = void 0 !== i ? s.o?.[i] : s.l;
  const r = H(e) ? void 0 : e._$litDirective$;
  return (
    n?.constructor !== r &&
      (n?._$AO?.(!1),
      void 0 === r ? (n = void 0) : ((n = new r(t)), n._$AT(t, s, i)),
      void 0 !== i ? ((s.o ??= [])[i] = n) : (s.l = n)),
    void 0 !== n && (e = J(t, n._$AS(t, e.values), n, i)),
    e
  );
}
class Z {
  constructor(t, e) {
    (this._$AV = []), (this._$AN = void 0), (this._$AD = t), (this._$AM = e);
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const {
        el: { content: e },
        parts: s,
      } = this._$AD,
      i = (t?.creationScope ?? x).importNode(e, !0);
    q.currentNode = i;
    let n = q.nextNode(),
      r = 0,
      o = 0,
      h = s[0];
    for (; void 0 !== h; ) {
      if (r === h.index) {
        let e;
        2 === h.type
          ? (e = new G(n, n.nextSibling, this, t))
          : 1 === h.type
            ? (e = new h.ctor(n, h.name, h.strings, this, t))
            : 6 === h.type && (e = new et(n, this, t)),
          this._$AV.push(e),
          (h = s[++o]);
      }
      r !== h?.index && ((n = q.nextNode()), r++);
    }
    return (q.currentNode = x), i;
  }
  p(t) {
    let e = 0;
    for (const s of this._$AV)
      void 0 !== s &&
        (void 0 !== s.strings
          ? (s._$AI(t, s, e), (e += s.strings.length - 2))
          : s._$AI(t[e])),
        e++;
  }
}
class G {
  get _$AU() {
    return this._$AM?._$AU ?? this.v;
  }
  constructor(t, e, s, i) {
    (this.type = 2),
      (this._$AH = W),
      (this._$AN = void 0),
      (this._$AA = t),
      (this._$AB = e),
      (this._$AM = s),
      (this.options = i),
      (this.v = i?.isConnected ?? !0);
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const e = this._$AM;
    return void 0 !== e && 11 === t?.nodeType && (t = e.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, e = this) {
    (t = J(this, t, e)),
      H(t)
        ? t === W || null == t || '' === t
          ? (this._$AH !== W && this._$AR(), (this._$AH = W))
          : t !== this._$AH && t !== D && this._(t)
        : void 0 !== t._$litType$
          ? this.$(t)
          : void 0 !== t.nodeType
            ? this.T(t)
            : ((t) => T(t) || 'function' == typeof t?.[Symbol.iterator])(t)
              ? this.k(t)
              : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), (this._$AH = this.O(t)));
  }
  _(t) {
    this._$AH !== W && H(this._$AH)
      ? (this._$AA.nextSibling.data = t)
      : this.T(x.createTextNode(t)),
      (this._$AH = t);
  }
  $(t) {
    const { values: e, _$litType$: s } = t,
      i =
        'number' == typeof s
          ? this._$AC(t)
          : (void 0 === s.el &&
              (s.el = F.createElement(K(s.h, s.h[0]), this.options)),
            s);
    if (this._$AH?._$AD === i) this._$AH.p(e);
    else {
      const t = new Z(i, this),
        s = t.u(this.options);
      t.p(e), this.T(s), (this._$AH = t);
    }
  }
  _$AC(t) {
    let e = V.get(t.strings);
    return void 0 === e && V.set(t.strings, (e = new F(t))), e;
  }
  k(t) {
    T(this._$AH) || ((this._$AH = []), this._$AR());
    const e = this._$AH;
    let s,
      i = 0;
    for (const n of t)
      i === e.length
        ? e.push((s = new G(this.O(O()), this.O(O()), this, this.options)))
        : (s = e[i]),
        s._$AI(n),
        i++;
    i < e.length && (this._$AR(s && s._$AB.nextSibling, i), (e.length = i));
  }
  _$AR(t = this._$AA.nextSibling, e) {
    for (this._$AP?.(!1, !0, e); t && t !== this._$AB; ) {
      const e = t.nextSibling;
      t.remove(), (t = e);
    }
  }
  setConnected(t) {
    void 0 === this._$AM && ((this.v = t), this._$AP?.(t));
  }
}
class Q {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, s, i, n) {
    (this.type = 1),
      (this._$AH = W),
      (this._$AN = void 0),
      (this.element = t),
      (this.name = e),
      (this._$AM = i),
      (this.options = n),
      s.length > 2 || '' !== s[0] || '' !== s[1]
        ? ((this._$AH = Array(s.length - 1).fill(new String())),
          (this.strings = s))
        : (this._$AH = W);
  }
  _$AI(t, e = this, s, i) {
    const n = this.strings;
    let r = !1;
    if (void 0 === n)
      (t = J(this, t, e, 0)),
        (r = !H(t) || (t !== this._$AH && t !== D)),
        r && (this._$AH = t);
    else {
      const i = t;
      let o, h;
      for (t = n[0], o = 0; o < n.length - 1; o++)
        (h = J(this, i[s + o], e, o)),
          h === D && (h = this._$AH[o]),
          (r ||= !H(h) || h !== this._$AH[o]),
          h === W ? (t = W) : t !== W && (t += (h ?? '') + n[o + 1]),
          (this._$AH[o] = h);
    }
    r && !i && this.j(t);
  }
  j(t) {
    t === W
      ? this.element.removeAttribute(this.name)
      : this.element.setAttribute(this.name, t ?? '');
  }
}
class X extends Q {
  constructor() {
    super(...arguments), (this.type = 3);
  }
  j(t) {
    this.element[this.name] = t === W ? void 0 : t;
  }
}
class Y extends Q {
  constructor() {
    super(...arguments), (this.type = 4);
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== W);
  }
}
class tt extends Q {
  constructor(t, e, s, i, n) {
    super(t, e, s, i, n), (this.type = 5);
  }
  _$AI(t, e = this) {
    if ((t = J(this, t, e, 0) ?? W) === D) return;
    const s = this._$AH,
      i =
        (t === W && s !== W) ||
        t.capture !== s.capture ||
        t.once !== s.once ||
        t.passive !== s.passive,
      n = t !== W && (s === W || i);
    i && this.element.removeEventListener(this.name, this, s),
      n && this.element.addEventListener(this.name, this, t),
      (this._$AH = t);
  }
  handleEvent(t) {
    'function' == typeof this._$AH
      ? this._$AH.call(this.options?.host ?? this.element, t)
      : this._$AH.handleEvent(t);
  }
}
class et {
  constructor(t, e, s) {
    (this.element = t),
      (this.type = 6),
      (this._$AN = void 0),
      (this._$AM = e),
      (this.options = s);
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    J(this, t);
  }
}
const st = E.litHtmlPolyfillSupport;
st?.(F, G), (E.litHtmlVersions ??= []).push('3.2.0');
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class it extends v {
  constructor() {
    super(...arguments),
      (this.renderOptions = { host: this }),
      (this.o = void 0);
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return (this.renderOptions.renderBefore ??= t.firstChild), t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected),
      super.update(t),
      (this.o = ((t, e, s) => {
        const i = s?.renderBefore ?? e;
        let n = i._$litPart$;
        if (void 0 === n) {
          const t = s?.renderBefore ?? null;
          i._$litPart$ = n = new G(e.insertBefore(O(), t), t, void 0, s ?? {});
        }
        return n._$AI(t), n;
      })(e, this.renderRoot, this.renderOptions));
  }
  connectedCallback() {
    super.connectedCallback(), this.o?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.o?.setConnected(!1);
  }
  render() {
    return D;
  }
}
(it._$litElement$ = !0),
  (it.finalized = !0),
  globalThis.litElementHydrateSupport?.({ LitElement: it });
const nt = globalThis.litElementPolyfillSupport;
nt?.({ LitElement: it }), (globalThis.litElementVersions ??= []).push('4.1.0');
class rt extends it {
  render() {
    return I`
      <div class="content">
        <h1>Plugi!!</h1>
      </div>
    `;
  }
}
Object.defineProperty(rt, 'styles', {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: ((t, ...e) => {
    const i =
      1 === t.length
        ? t[0]
        : e.reduce(
            (e, s, i) =>
              e +
              ((t) => {
                if (!0 === t._$cssResult$) return t.cssText;
                if ('number' == typeof t) return t;
                throw Error(
                  "Value passed to 'css' function must be a 'css' function result: " +
                    t +
                    ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.",
                );
              })(s) +
              t[i + 1],
            t[0],
          );
    return new n(i, t, s);
  })`
    .content h1 {
      font-size: 3.6rem;
      font-weight: 700;
    }
  `,
}),
  customElements.define('plugin-element', rt);
export { rt as PluginElement n};
