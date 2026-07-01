(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [581],
    {
        5978: (e, t, o) => {
            "use strict";
            o.r(t), o.d(t, { default: () => p });
            var n = o(5155),
                r = o(2115),
                i = o(5176);
            function l(e) {
                let { style: t = {}, showStats: o = !0, compact: i = !1 } = e,
                    [l, a] = (0, r.useState)(null),
                    [s, d] = (0, r.useState)(!0);
                (0, r.useEffect)(() => {
                    c();
                }, []);
                let c = async () => {
                        try {
                            let e = p();
                            if (e) {
                                a(e), d(!1);
                                return;
                            }
                            let t = await x();
                            if (t) {
                                a(t), d(!1);
                                return;
                            }
                            d(!1);
                        } catch (e) {
                            console.error("Erro ao carregar perfil:", e), d(!1);
                        }
                    },
                    p = () => {
                        try {
                            let e = localStorage.getItem("instagram_profile");
                            if (e) {
                                let t = JSON.parse(e);
                                return {
                                    username: t.username || "",
                                    full_name: t.full_name || "",
                                    profile_pic_url: t.profile_pic_url || "",
                                    follower_count: t.follower_count || 0,
                                    following_count: t.following_count || 0,
                                    media_count: t.media_count || 0,
                                    is_private: t.is_private || !1,
                                };
                            }
                            let t = localStorage.getItem("username") || localStorage.getItem("espionado_username");
                            if (t)
                                return {
                                    username: t.replace(/^@+/, ""),
                                    full_name: "",
                                    profile_pic_url: "",
                                    follower_count: 0,
                                    following_count: 0,
                                    media_count: 0,
                                    is_private: !1,
                                };
                            return null;
                        } catch (e) {
                            return console.error("Erro ao ler localStorage:", e), null;
                        }
                    },
                    x = async () => {
                        try {
                            let e = window.firebase;
                            if (!e) return console.warn("Firebase n\xe3o carregado"), null;
                            let t = localStorage.getItem("stalkea_lead_id");
                            if (!t) return console.warn("Lead ID n\xe3o encontrado"), null;
                            let o = e.firestore(),
                                n = await o.collection("leads").doc(t).get();
                            if (!n.exists) return console.warn("Lead n\xe3o encontrado no Firebase"), null;
                            let r = n.data(),
                                i = r.lastSpiedProfile || r.spiedProfile;
                            if (!i) return console.warn("Perfil espionado n\xe3o encontrado nos dados do lead"), null;
                            return i;
                        } catch (e) {
                            return console.error("Erro ao buscar do Firebase:", e), null;
                        }
                    },
                    g = (e) =>
                        e >= 1e6
                            ? (e / 1e6).toFixed(1).replace(".", ",") + " mi"
                            : e >= 1e5
                              ? Math.floor(e / 1e3) + " mil"
                              : e >= 11e3
                                ? (e / 1e3).toFixed(1).replace(".", ",") + " mil"
                                : e >= 1e3
                                  ? e.toLocaleString("pt-BR")
                                  : e.toString();
                return s
                    ? (0, n.jsxs)("div", {
                          style: { textAlign: "center", padding: i ? "16px" : "24px", ...t },
                          children: [
                              (0, n.jsx)("div", {
                                  style: {
                                      width: "40px",
                                      height: "40px",
                                      margin: "0 auto",
                                      border: "3px solid rgba(171, 88, 244, 0.3)",
                                      borderTop: "3px solid #ab58f4",
                                      borderRadius: "50%",
                                      animation: "spin 0.8s linear infinite",
                                  },
                              }),
                              (0, n.jsx)("style", {
                                  children:
                                      "\n          @keyframes spin {\n            from { transform: rotate(0deg); }\n            to { transform: rotate(360deg); }\n          }\n        ",
                              }),
                          ],
                      })
                    : l && l.username
                      ? i
                          ? (0, n.jsx)("div", {
                                style: { textAlign: "center", ...t },
                                children: (0, n.jsxs)("p", {
                                    style: { color: "#F9F9F9", fontSize: "16px", margin: 0 },
                                    children: [
                                        "Acesso completo ao perfil de ",
                                        (0, n.jsxs)("strong", {
                                            style: {
                                                background: "linear-gradient(135deg, #4a37b6 0%, #ab58f4 100%)",
                                                WebkitBackgroundClip: "text",
                                                WebkitTextFillColor: "transparent",
                                                backgroundClip: "text",
                                            },
                                            children: ["@", l.username],
                                        }),
                                    ],
                                }),
                            })
                          : (0, n.jsxs)("div", {
                                style: {
                                    background: "rgba(17, 21, 23, 0.65)",
                                    borderRadius: "20px",
                                    padding: "20px",
                                    border: "1px solid rgba(171, 88, 244, 0.2)",
                                    ...t,
                                },
                                children: [
                                    (0, n.jsx)("h3", {
                                        style: {
                                            fontSize: "18px",
                                            fontWeight: 700,
                                            textAlign: "center",
                                            marginBottom: "16px",
                                            background: "linear-gradient(135deg, #4a37b6 0%, #ab58f4 100%)",
                                            WebkitBackgroundClip: "text",
                                            WebkitTextFillColor: "transparent",
                                            backgroundClip: "text",
                                        },
                                        children: "Perfil Espionado",
                                    }),
                                    (0, n.jsxs)("div", {
                                        style: {
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "16px",
                                            marginBottom: o ? "0" : "8px",
                                        },
                                        children: [
                                            (0, n.jsx)("div", {
                                                style: {
                                                    width: "80px",
                                                    height: "80px",
                                                    borderRadius: "50%",
                                                    overflow: "hidden",
                                                    background: "rgba(74, 55, 182, 0.2)",
                                                    flexShrink: 0,
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                },
                                                children: l.profile_pic_url
                                                    ? (0, n.jsx)("img", {
                                                          src: l.profile_pic_url,
                                                          alt: "Foto de ".concat(l.username),
                                                          style: { width: "100%", height: "100%", objectFit: "cover" },
                                                          onError: (e) => {
                                                              e.target.style.display = "none";
                                                          },
                                                      })
                                                    : (0, n.jsx)("svg", {
                                                          style: { width: "40px", height: "40px", color: "#6B59D8" },
                                                          fill: "none",
                                                          stroke: "currentColor",
                                                          viewBox: "0 0 24 24",
                                                          strokeWidth: "2",
                                                          children: (0, n.jsx)("path", {
                                                              strokeLinecap: "round",
                                                              strokeLinejoin: "round",
                                                              d: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
                                                          }),
                                                      }),
                                            }),
                                            (0, n.jsxs)("div", {
                                                style: { flex: 1 },
                                                children: [
                                                    (0, n.jsx)("p", {
                                                        style: {
                                                            color: "#F9F9F9",
                                                            fontSize: "16px",
                                                            fontWeight: 600,
                                                            margin: 0,
                                                            marginBottom: "4px",
                                                        },
                                                        children: l.full_name || l.username,
                                                    }),
                                                    (0, n.jsxs)("p", {
                                                        style: { color: "#9CA3AF", fontSize: "14px", margin: 0 },
                                                        children: ["@", l.username],
                                                    }),
                                                ],
                                            }),
                                        ],
                                    }),
                                    o &&
                                        (l.follower_count > 0 || l.following_count > 0 || l.media_count > 0) &&
                                        (0, n.jsxs)("div", {
                                            style: {
                                                display: "flex",
                                                justifyContent: "space-around",
                                                marginTop: "16px",
                                                paddingTop: "16px",
                                                borderTop: "1px solid rgba(128, 128, 128, 0.15)",
                                            },
                                            children: [
                                                l.media_count > 0 &&
                                                    (0, n.jsxs)("div", {
                                                        style: { textAlign: "center" },
                                                        children: [
                                                            (0, n.jsx)("p", {
                                                                style: {
                                                                    color: "#F9F9F9",
                                                                    fontSize: "16px",
                                                                    fontWeight: 600,
                                                                    margin: 0,
                                                                },
                                                                children: g(l.media_count),
                                                            }),
                                                            (0, n.jsx)("p", {
                                                                style: {
                                                                    color: "#9CA3AF",
                                                                    fontSize: "12px",
                                                                    margin: 0,
                                                                },
                                                                children: "posts",
                                                            }),
                                                        ],
                                                    }),
                                                l.follower_count > 0 &&
                                                    (0, n.jsxs)("div", {
                                                        style: { textAlign: "center" },
                                                        children: [
                                                            (0, n.jsx)("p", {
                                                                style: {
                                                                    color: "#F9F9F9",
                                                                    fontSize: "16px",
                                                                    fontWeight: 600,
                                                                    margin: 0,
                                                                },
                                                                children: g(l.follower_count),
                                                            }),
                                                            (0, n.jsx)("p", {
                                                                style: {
                                                                    color: "#9CA3AF",
                                                                    fontSize: "12px",
                                                                    margin: 0,
                                                                },
                                                                children: "seguidores",
                                                            }),
                                                        ],
                                                    }),
                                                l.following_count > 0 &&
                                                    (0, n.jsxs)("div", {
                                                        style: { textAlign: "center" },
                                                        children: [
                                                            (0, n.jsx)("p", {
                                                                style: {
                                                                    color: "#F9F9F9",
                                                                    fontSize: "16px",
                                                                    fontWeight: 600,
                                                                    margin: 0,
                                                                },
                                                                children: g(l.following_count),
                                                            }),
                                                            (0, n.jsx)("p", {
                                                                style: {
                                                                    color: "#9CA3AF",
                                                                    fontSize: "12px",
                                                                    margin: 0,
                                                                },
                                                                children: "seguindo",
                                                            }),
                                                        ],
                                                    }),
                                            ],
                                        }),
                                ],
                            })
                      : null;
            }
            let a = [
                    "Acesso Vital\xedcio a Todos os Apps",
                    "Busca de Perfis ILIMITADOS",
                    "Monitoramento Completo",
                    "Suporte 24h pelo WhatsApp",
                    "Localiza\xe7\xe3o em Tempo Real",
                    "Galeria de Fotos (incluindo fotos apagadas)",
                    "BRINDE: Espi\xe3o Completo do Facebook",
                    "BRINDE: Espi\xe3o Completo do Messenger",
                ],
                s = (e) => {
                    let {
                        planName: t,
                        badge: o,
                        oldPrice: r,
                        currentPrice: l,
                        benefits: a,
                        buttonHref: s,
                        buttonSubtitle: d,
                        buttonText: c,
                        isPremium: p = !1,
                        redBorder: x = !1,
                    } = e;
                    return (0, n.jsxs)("div", {
                        style: { marginBottom: "80px", position: "relative" },
                        children: [
                            o && (0, n.jsx)("div", { className: o.className, style: { zIndex: 20 }, children: o.text }),
                            (0, n.jsxs)("div", {
                                style: {
                                    background: x
                                        ? "#131718"
                                        : p
                                          ? "linear-gradient(135deg, #ab58f4 0%, #4a37b6 100%)"
                                          : "linear-gradient(135deg, #4a37b6 0%, #ab58f4 100%)",
                                    borderRadius: "28px",
                                    padding: "12px 24px 230px 24px",
                                    position: "relative",
                                    ...(p && { boxShadow: "0 6px 24px rgba(171, 88, 244, 0.3)" }),
                                    ...(x && "Gold" === t && { border: "1.2px solid rgba(212, 163, 69, 0.7)" }),
                                    ...("Diamond" === t && { border: "1.2px solid rgba(63, 143, 232, 0.7)" }),
                                },
                                children: [
                                    (0, n.jsx)("div", {
                                        className:
                                            "Gold" === t
                                                ? "text-gradient-gold"
                                                : "Diamond" === t
                                                  ? "text-gradient-diamond"
                                                  : "",
                                        style: {
                                            fontSize: "var(--font-2xl)",
                                            fontWeight: 700,
                                            textAlign: "center",
                                            lineHeight: 1.2,
                                            marginBottom: "0px",
                                            ...("Gold" !== t && "Diamond" !== t && { color: "#ffffff" }),
                                        },
                                        children: t,
                                    }),
                                    (0, n.jsx)("div", {
                                        style: {
                                            fontSize: "var(--font-md)",
                                            color: "#f9f9f9",
                                            textAlign: "center",
                                            lineHeight: 1.5,
                                        },
                                        children: "Plano",
                                    }),
                                ],
                            }),
                            (0, n.jsxs)("div", {
                                style: {
                                    background: p ? "#170D21" : x ? "#0C0F10" : "rgba(12, 16, 17, 0.95)",
                                    borderRadius: "28px",
                                    padding: "24px 15px 70px 15px",
                                    marginTop: "-225px",
                                    marginLeft: "auto",
                                    marginRight: "auto",
                                    width: "94%",
                                    position: "relative",
                                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                                    border:
                                        "Gold" === t
                                            ? "0.5px solid rgba(212, 163, 69, 0.25)"
                                            : "Diamond" === t
                                              ? "0.5px solid rgba(63, 143, 232, 0.25)"
                                              : p
                                                ? "0.5px solid rgba(212, 163, 69, 0.25)"
                                                : "1px solid rgba(128, 128, 128, 0.15)",
                                },
                                children: [
                                    (0, n.jsxs)("div", {
                                        style: { textAlign: "center", marginBottom: "16px" },
                                        children: [
                                            r &&
                                                (0, n.jsx)("div", {
                                                    style: {
                                                        fontSize: "13px",
                                                        color: "#9CA3AF",
                                                        textDecoration: "line-through",
                                                        marginBottom: "8px",
                                                        fontWeight: 400,
                                                    },
                                                    children: r,
                                                }),
                                            (0, n.jsx)("div", {
                                                className:
                                                    "Gold" === t
                                                        ? "text-gradient-gold"
                                                        : "Diamond" === t
                                                          ? "text-gradient-diamond"
                                                          : "text-gradient-premium",
                                                style: {
                                                    fontSize: "clamp(36px, 9vw, 48px)",
                                                    fontWeight: 800,
                                                    lineHeight: 1,
                                                },
                                                children: l,
                                            }),
                                        ],
                                    }),
                                    (0, n.jsx)("div", {
                                        children: a.map((e, o) => {
                                            let r = "string" == typeof e ? { text: e, enabled: !0 } : e;
                                            return (0, n.jsxs)(
                                                "div",
                                                {
                                                    style: {
                                                        display: "flex",
                                                        alignItems: "flex-start",
                                                        gap: "12px",
                                                        marginBottom: o === a.length - 1 ? 0 : "6px",
                                                        fontSize: "var(--font-sm)",
                                                        color: r.enabled ? "var(--foreground)" : "#6B7280",
                                                        lineHeight: 1.5,
                                                    },
                                                    children: [
                                                        r.enabled
                                                            ? (0, n.jsx)("svg", {
                                                                  style: {
                                                                      width: "18px",
                                                                      height: "18px",
                                                                      minWidth: "18px",
                                                                      color:
                                                                          "Gold" === t
                                                                              ? "#E5B84B"
                                                                              : "Diamond" === t
                                                                                ? "#3B88EC"
                                                                                : "#ab58f4",
                                                                      flexShrink: 0,
                                                                      marginTop: "2px",
                                                                  },
                                                                  fill: "none",
                                                                  stroke: "currentColor",
                                                                  viewBox: "0 0 24 24",
                                                                  strokeWidth: 2.5,
                                                                  children: (0, n.jsx)("path", {
                                                                      strokeLinecap: "round",
                                                                      strokeLinejoin: "round",
                                                                      d: "M5 13l4 4L19 7",
                                                                  }),
                                                              })
                                                            : (0, n.jsx)("svg", {
                                                                  style: {
                                                                      width: "18px",
                                                                      height: "18px",
                                                                      minWidth: "18px",
                                                                      color: "#DC2626",
                                                                      opacity: 0.5,
                                                                      flexShrink: 0,
                                                                      marginTop: "2px",
                                                                  },
                                                                  fill: "none",
                                                                  stroke: "currentColor",
                                                                  viewBox: "0 0 24 24",
                                                                  strokeWidth: 2.5,
                                                                  children: (0, n.jsx)("path", {
                                                                      strokeLinecap: "round",
                                                                      strokeLinejoin: "round",
                                                                      d: "M6 18L18 6M6 6l12 12",
                                                                  }),
                                                              }),
                                                        (0, n.jsx)("span", { children: r.text }),
                                                    ],
                                                },
                                                o
                                            );
                                        }),
                                    }),
                                ],
                            }),
                            (0, n.jsx)("div", {
                                style: {
                                    position: "absolute",
                                    bottom: "0px",
                                    left: "50%",
                                    transform: "translateX(-50%) translateY(50%)",
                                    width: "calc(100% - 80px)",
                                    zIndex: 10,
                                },
                                children: (0, n.jsx)(i.$n, {
                                    href: s,
                                    subtitle: d,
                                    pulse: p,
                                    className: "Gold" === t ? "btn-gold" : "Diamond" === t ? "btn-diamond" : "",
                                    style: {
                                        paddingTop: "12px",
                                        paddingBottom: "12px",
                                        paddingLeft: "3px",
                                        paddingRight: "3px",
                                        ...("Gold" === t && {
                                            background: "linear-gradient(135deg, #E5B84B 0%, #B8873D 100%)",
                                        }),
                                        ...("Diamond" === t && {
                                            background: "linear-gradient(135deg, #3F8FE8 0%, #50AEBF 100%)",
                                        }),
                                    },
                                    children: c,
                                }),
                            }),
                        ],
                    });
                },
                d = [
                    {
                        text: (0, n.jsxs)(n.Fragment, {
                            children: [
                                (0, n.jsx)("span", {
                                    className: "line-through opacity-60",
                                    children: "Acesso vital\xedcio",
                                }),
                                " (Acesso de 1 m\xeas)",
                            ],
                        }),
                        enabled: !0,
                    },
                    { text: "Busca de 3 perfis", enabled: !0 },
                    { text: "Monitoramento Completo", enabled: !0 },
                    { text: "Suporte 24h pelo WhatsApp", enabled: !0 },
                    { text: "Localiza\xe7\xe3o em Tempo Real", enabled: !0 },
                    { text: "Galeria de Fotos (incluindo fotos apagadas)", enabled: !0 },
                    { text: "BRINDE: Espi\xe3o Completo do Facebook", enabled: !1 },
                    { text: "BRINDE: Espi\xe3o Completo do Messenger", enabled: !1 },
                ],
                c = [
                    {
                        text: (0, n.jsxs)(n.Fragment, {
                            children: [
                                (0, n.jsx)("span", {
                                    className: "line-through opacity-60",
                                    children: "Acesso vital\xedcio",
                                }),
                                " (Acesso de 7 dias)",
                            ],
                        }),
                        enabled: !0,
                    },
                    { text: "Busca de apenas 1 perfil", enabled: !0 },
                    { text: "Monitoramento apenas do Insta", enabled: !0 },
                    { text: "Suporte em hor\xe1rio comercial pelo email", enabled: !0 },
                    { text: "Localiza\xe7\xe3o em Tempo Real", enabled: !1 },
                    { text: "Galeria de Fotos (incluindo fotos apagadas)", enabled: !1 },
                    { text: "BRINDE: Espi\xe3o Completo do Facebook", enabled: !1 },
                    { text: "BRINDE: Espi\xe3o Completo do Messenger", enabled: !1 },
                ];
            function p() {
                let [e, t] = (0, r.useState)(!1),
                    [o, p] = (0, r.useState)(!1),
                    [x, g] = (0, r.useState)(""),
                    [u, m] = (0, r.useState)(!1),
                    [h, f] = (0, r.useState)(""),
                    [b, j] = (0, r.useState)(!1);
                return (
                    (0, r.useEffect)(() => {
                        window.scrollTo(0, 0);
                    }, []),
                    (0, r.useEffect)(() => {
                        let e = "\uD83D\uDD16 Escolha seu ",
                            t = 0,
                            o = setInterval(() => {
                                t < e.length
                                    ? (g(e.slice(0, t + 1)), t++)
                                    : (clearInterval(o), setTimeout(() => m(!0), 300));
                            }, 60);
                        return () => clearInterval(o);
                    }, []),
                    (0, r.useEffect)(() => {
                        if (!u) return;
                        let e = "Agora que sua conta j\xe1 est\xe1 com o ",
                            t = 0,
                            o = setTimeout(() => {
                                let o = setInterval(() => {
                                    if (t < e.length) f(e.slice(0, t + 1)), t++;
                                    else {
                                        clearInterval(o);
                                        let t =
                                                "firewall ativo e sua identidade preservada, selecione com qual plano voc\xea deseja prosseguir:",
                                            n = 0,
                                            r = setInterval(() => {
                                                n < t.length
                                                    ? (f(e + t.slice(0, n + 1)), n++)
                                                    : (clearInterval(r), setTimeout(() => j(!0), 500));
                                            }, 40);
                                    }
                                }, 40);
                            }, 300);
                        return () => {
                            clearTimeout(o);
                        };
                    }, [u]),
                    (0, n.jsxs)(n.Fragment, {
                        children: [
                            (0, n.jsx)(i.K7, {}),
                            (0, n.jsx)(i.$z, {
                                line1: "Sua identidade est\xe1 preservada!",
                                line2: (0, n.jsxs)(n.Fragment, {
                                    children: [
                                        (0, n.jsx)("strong", { children: "Conex\xe3o Segura" }),
                                        " • Firewall ativo V4.2.1",
                                    ],
                                }),
                                style: {
                                    background: "linear-gradient(180deg, #3a9a02 0%, #2b6a02 100%)",
                                    boxShadow: "0 2px 12px rgba(58, 154, 2, 0.4)",
                                },
                            }),
                            (0, n.jsx)("main", {
                                className: "min-h-screen px-4 py-8 planos-page-custom",
                                style: { paddingTop: "calc(60px + 1.5rem)" },
                                children: (0, n.jsxs)("div", {
                                    className: "container-dpgm animate-fadeIn",
                                    children: [
                                        (0, n.jsx)(i.gu, {}),
                                        (0, n.jsx)("div", {
                                            style: {
                                                width: "90%",
                                                maxWidth: "400px",
                                                height: "12px",
                                                background: "rgba(255, 255, 255, 0.08)",
                                                borderRadius: "999px",
                                                overflow: "hidden",
                                                margin: "0 auto clamp(20px, 5vw, 28px) auto",
                                            },
                                            children: (0, n.jsx)("div", {
                                                className: "progress-bar-fill",
                                                style: { width: "79%" },
                                            }),
                                        }),
                                        (0, n.jsxs)("h1", {
                                            className: "title-dpgm mb-sm",
                                            children: [
                                                x,
                                                u &&
                                                    (0, n.jsx)("span", {
                                                        className: "text-gradient",
                                                        children: (0, n.jsx)("strong", { children: "Plano" }),
                                                    }),
                                            ],
                                        }),
                                        (0, n.jsx)("p", {
                                            className: "subtitle-dpgm mb-lg",
                                            style: { paddingLeft: "16px", paddingRight: "16px" },
                                            children: (() => {
                                                if (!h) return null;
                                                let e = [],
                                                    t = h,
                                                    o = 0;
                                                for (; t.length > 0; ) {
                                                    let r = t.indexOf("firewall ativo"),
                                                        i = [
                                                            { type: "fw", idx: r, len: 14 },
                                                            {
                                                                type: "id",
                                                                idx: t.indexOf("identidade preservada"),
                                                                len: 21,
                                                            },
                                                            { type: "pl", idx: t.indexOf("plano"), len: 5 },
                                                        ]
                                                            .filter((e) => -1 !== e.idx)
                                                            .sort((e, t) => e.idx - t.idx);
                                                    if (!i.length) {
                                                        e.push((0, n.jsx)("span", { children: t }, o++));
                                                        break;
                                                    }
                                                    let l = i[0];
                                                    l.idx > 0 &&
                                                        e.push(
                                                            (0, n.jsx)("span", { children: t.slice(0, l.idx) }, o++)
                                                        );
                                                    let a = t.slice(l.idx, l.idx + l.len);
                                                    "fw" === l.type
                                                        ? e.push(
                                                              (0, n.jsx)(
                                                                  "strong",
                                                                  { className: "text-gradient", children: a },
                                                                  o++
                                                              )
                                                          )
                                                        : "id" === l.type
                                                          ? e.push(
                                                                (0, n.jsx)(
                                                                    "strong",
                                                                    { className: "text-white", children: a },
                                                                    o++
                                                                )
                                                            )
                                                          : "pl" === l.type &&
                                                            e.push(
                                                                (0, n.jsx)(
                                                                    "strong",
                                                                    { className: "text-white", children: a },
                                                                    o++
                                                                )
                                                            ),
                                                        (t = t.slice(l.idx + l.len));
                                                }
                                                return e;
                                            })(),
                                        }),
                                        b &&
                                            (0, n.jsxs)(n.Fragment, {
                                                children: [
                                                    (0, n.jsx)(l, {
                                                        style: { marginBottom: "clamp(20px, 5vw, 28px)" },
                                                        showStats: !0,
                                                    }),
                                                    (0, n.jsx)(s, {
                                                        planName: "Gold",
                                                        currentPrice: "R$67,00",
                                                        benefits: c,
                                                        buttonHref:
                                                            "https://go.perfectpay.com.br/PPU38CQBK3G?upsell=true",
                                                        buttonSubtitle: "824 vagas • Pagamento \xfanico",
                                                        buttonText: "Selecionar Plano B\xe1sico",
                                                        redBorder: !0,
                                                    }),
                                                    (0, n.jsx)(s, {
                                                        planName: "Diamond",
                                                        badge: {
                                                            text: "Mais Vendido",
                                                            className:
                                                                "badge-dpgm badge-diamond absolute -top-3 right-4",
                                                        },
                                                        oldPrice: "R$132,00",
                                                        currentPrice: "R$97,00",
                                                        benefits: d,
                                                        buttonHref:
                                                            "https://go.perfectpay.com.br/PPU38CQBK3J?upsell=true",
                                                        buttonSubtitle: "71 vagas • Pagamento \xfanico",
                                                        buttonText: "Selecionar Mais Vendido",
                                                        redBorder: !0,
                                                    }),
                                                    (0, n.jsx)(s, {
                                                        planName: "Premium",
                                                        badge: {
                                                            text: "Melhor Custo Benef\xedcio",
                                                            className:
                                                                "badge-dpgm badge-premium absolute -top-3 right-4",
                                                        },
                                                        oldPrice: "R$254,00",
                                                        currentPrice: "R$127,00",
                                                        benefits: a,
                                                        buttonHref:
                                                            "https://go.perfectpay.com.br/PPU38CQBK48?upsell=true",
                                                        buttonSubtitle: "139 vagas • Pagamento \xfanico",
                                                        buttonText: "✨ Selecionar Custo Benef\xedcio",
                                                        isPremium: !0,
                                                    }),
                                                    (0, n.jsx)(i.wi, {
                                                        showLogo: !0,
                                                        showLinks: !0,
                                                        onTermsClick: () => t(!0),
                                                        onPrivacyClick: () => p(!0),
                                                    }),
                                                ],
                                            }),
                                    ],
                                }),
                            }),
                            e && (0, n.jsx)(i.Wb, { onClose: () => t(!1) }),
                            o && (0, n.jsx)(i.Ke, { onClose: () => p(!1) }),
                        ],
                    })
                );
            }
        },
        7666: (e, t, o) => {
            Promise.resolve().then(o.bind(o, 5978));
        },
    },
    (e) => {
        e.O(0, [176, 441, 255, 358], () => e((e.s = 7666))), (_N_E = e.O());
    },
]);
