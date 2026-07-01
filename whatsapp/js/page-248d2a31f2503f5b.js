(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [941],
    {
        6021: (e, t, a) => {
            "use strict";
            a.r(t), a.d(t, { default: () => i });
            var o = a(5155),
                s = a(5239),
                r = a(2115),
                l = a(5176),
                n = a(8111);
            function i() {
                let e = (0, r.useRef)(null),
                    [t, a] = (0, r.useState)(!1),
                    [i, c] = (0, r.useState)(!1),
                    [d, m] = (0, r.useState)(!1),
                    [u, p] = (0, r.useState)(!1),
                    [h, f] = (0, r.useState)(""),
                    [g, v] = (0, r.useState)("idle"),
                    [x, b] = (0, r.useState)(0),
                    [j, S] = (0, r.useState)(""),
                    [w, T] = (0, r.useState)(""),
                    [y, D] = (0, r.useState)(!1),
                    [N, E] = (0, r.useState)(null),
                    [I, C] = (0, r.useState)(0),
                    [k, A] = (0, r.useState)(null),
                    [videoWithAudio, setVideoWithAudio] = (0, r.useState)(!1);
                return (
                    (0, r.useEffect)(() => {
                        let e = localStorage.getItem("whatsappCardShown"),
                            t = localStorage.getItem("videoStartTime");
                        if (
                            ("true" === e &&
                                (console.log("✅ Card j\xe1 foi mostrado antes - exibindo imediatamente"), c(!0)),
                            t)
                        ) {
                            let e = parseInt(t);
                            A(e),
                                console.log(
                                    "\uD83D\uDD04 Recuperado videoStartTime do localStorage:",
                                    new Date(e).toLocaleTimeString()
                                );
                            let a = (Date.now() - e) / 1e3;
                            console.log("⏱️ Tempo decorrido desde in\xedcio salvo: ".concat(Math.floor(a), "s")),
                                a >= 22 &&
                                    (console.log("⏰ Tempo j\xe1 passou - mostrando card imediatamente"),
                                    c(!0),
                                    localStorage.setItem("whatsappCardShown", "true"));
                        }
                    }, []),
                    (0, r.useEffect)(() => {
                        if (!document.getElementById("pulse-animation-style")) {
                            let e = document.createElement("style");
                            (e.id = "pulse-animation-style"),
                                (e.innerHTML = `
                                    @keyframes pulse {
                                        0%, 100% {
                                            transform: translate(-50%, -50%) scale(1);
                                            opacity: 1;
                                        }
                                        50% {
                                            transform: translate(-50%, -50%) scale(1.05);
                                            opacity: 0.9;
                                        }
                                    }
                                `),
                                document.head.appendChild(e);
                        }
                    }, []),
                    (0, r.useEffect)(() => {
                        if (!t || !y) return;
                        if (k) return void console.log("✅ videoStartTime já está definido");
                        if (videoWithAudio) {
                            let e = Date.now();
                            A(e),
                                localStorage.setItem("videoStartTime", e.toString()),
                                console.log(
                                    "\uD83C\uDFAC Vídeo iniciado (via botão) em:",
                                    new Date(e).toLocaleTimeString()
                                );
                        }
                    }, [t, y, videoWithAudio, k]),
                    (0, r.useEffect)(() => {
                        if (!k) return void console.log("⏳ Aguardando videoStartTime...");
                        console.log("✅ videoStartTime definido, iniciando monitoramento...");
                        let e = () => {
                            let e = (Date.now() - k) / 1e3,
                                t = Math.floor(e);
                            C(t),
                                t % 5 == 0 &&
                                    console.log(
                                        "⏱️ Tempo decorrido: ".concat(t, "s (card aparece em ").concat(22, "s)")
                                    ),
                                e >= 22 &&
                                    (console.log("\uD83C\uDFAF ".concat(22, "s passaram → LIBERANDO CARD!")),
                                    c(!0),
                                    localStorage.setItem("whatsappCardShown", "true"));
                        };
                        e();
                        let t = setInterval(e, 1e3),
                            a = setTimeout(() => {
                                let e = (Date.now() - k) / 1e3;
                                e >= 22 &&
                                    !i &&
                                    (console.log(
                                        "\uD83D\uDEE1️ Timeout de seguran\xe7a: liberando card aos ".concat(
                                            Math.floor(e),
                                            "s"
                                        )
                                    ),
                                    c(!0),
                                    localStorage.setItem("whatsappCardShown", "true"));
                            }, 22e3);
                        return () => {
                            clearInterval(t), clearTimeout(a);
                        };
                    }, [k]),
                    (0, r.useEffect)(() => {
                        a(!0);
                    }, []),
                    (0, r.useEffect)(() => {
                        if (!y || !e.current) return;
                        let t = e.current.querySelector("video");
                        if (!t) {
                            let a = document.createElement("video");
                            (a.src = "./Stalkea.ai.mp4"),
                                (a.autoplay = !0),
                                (a.muted = !0),
                                (a.loop = !0),
                                (a.playsInline = !0),
                                (a.style.width = "100%"),
                                (a.style.height = "100%"),
                                (a.style.objectFit = "cover"),
                                e.current.appendChild(a),
                                a.play().catch((e) => console.log("Autoplay error:", e));
                        }
                    }, [y]),
                    (0, r.useEffect)(() => {
                        if (!y || !videoWithAudio || !e.current) return;
                        let t = e.current.querySelector("video");
                        if (t) {
                            t.currentTime = 0;
                            t.muted = !1;
                            t.play().catch((e) => console.log("Play error:", e));
                        }
                    }, [videoWithAudio, y]),
                    (0, r.useEffect)(() => {
                        let e = localStorage.getItem("instagramProfilePicture");
                        e && E(e);
                    }, []),
                    (0, r.useEffect)(() => {
                        let e = "Sua investiga\xe7\xe3o est\xe1 ",
                            t = 0,
                            a = setInterval(() => {
                                t < e.length ? (S(e.slice(0, t + 1)), t++) : clearInterval(a);
                            }, 40);
                        return () => clearInterval(a);
                    }, []),
                    (0, r.useEffect)(() => {
                        if ("Sua investiga\xe7\xe3o est\xe1 " !== j) return;
                        let e = "Assista ao v\xeddeo abaixo e veja o recado que temos pra voc\xea!",
                            t = 0,
                            a = setTimeout(() => {
                                let a = setInterval(() => {
                                    t < e.length
                                        ? (T(e.slice(0, t + 1)), t++)
                                        : (clearInterval(a),
                                          setTimeout(() => {
                                              D(!0),
                                                  setTimeout(() => {
                                                      if (!k) {
                                                          let e = Date.now();
                                                          A(e),
                                                              localStorage.setItem("videoStartTime", e.toString()),
                                                              console.log(
                                                                  "⚠️ Fallback: usando momento de showContent como videoStartTime"
                                                              );
                                                      }
                                                  }, 2e3);
                                          }, 500));
                                }, 30);
                            }, 300);
                        return () => clearTimeout(a);
                    }, [j, k]),
                    (0, o.jsxs)(o.Fragment, {
                        children: [
                            (0, o.jsx)(l.K7, {}),
                            (0, o.jsx)("main", {
                                className: "min-h-screen px-4 py-8",
                                children: (0, o.jsxs)("div", {
                                    className: "container-dpgm animate-fadeIn",
                                    style: { maxWidth: "600px" },
                                    children: [
                                        (0, o.jsx)(l.gu, {}),
                                        (0, o.jsx)("div", {
                                            style: {
                                                width: "90%",
                                                maxWidth: "400px",
                                                height: "12px",
                                                background: "rgba(255, 255, 255, 0.08)",
                                                borderRadius: "999px",
                                                overflow: "hidden",
                                                margin: "0 auto clamp(20px, 5vw, 28px) auto",
                                            },
                                            children: (0, o.jsx)("div", {
                                                className: "progress-bar-fill",
                                                style: { width: "100%" },
                                            }),
                                        }),
                                        (0, o.jsxs)("h1", {
                                            className: "title-dpgm mb-md",
                                            style: { fontSize: "calc(var(--font-2xl) * 0.8)" },
                                            children: [
                                                j,
                                                "Sua investiga\xe7\xe3o est\xe1 " === j &&
                                                    (0, o.jsxs)(o.Fragment, {
                                                        children: [
                                                            (0, o.jsx)("span", {
                                                                className: "text-gradient",
                                                                children: "pronta!",
                                                            }),
                                                            " \uD83E\uDD73",
                                                        ],
                                                    }),
                                            ],
                                        }),
                                        (0, o.jsx)("p", {
                                            className: "subtitle-dpgm mb-lg",
                                            style: { paddingLeft: "30px", paddingRight: "30px" },
                                            children: w,
                                        }),
                                        (0, o.jsx)("div", {
                                            className:
                                                "w-full mx-auto mb-lg rounded-xl overflow-hidden border border-[var(--border-color)]",
                                            style: {
                                                opacity: +!!y,
                                                transition: "opacity 0.3s ease",
                                                pointerEvents: y ? "auto" : "none",
                                            },
                                            children: (0, o.jsxs)("div", {
                                                className: "relative aspect-video bg-black",
                                                children: [
                                                    (0, o.jsx)("div", {
                                                        ref: e,
                                                        id: "vsl-container",
                                                        className: "w-full rounded-xl overflow-hidden",
                                                    }),
                                                    !videoWithAudio &&
                                                        (0, o.jsx)("button", {
                                                            onClick: () => {
                                                                setVideoWithAudio(!0);
                                                            },
                                                            style: {
                                                                position: "absolute",
                                                                top: "50%",
                                                                left: "50%",
                                                                transform: "translate(-50%, -50%)",
                                                                background: "rgba(171, 88, 244, 0.9)",
                                                                color: "#fff",
                                                                border: "none",
                                                                padding: "16px 32px",
                                                                borderRadius: "50px",
                                                                fontSize: "18px",
                                                                fontWeight: "bold",
                                                                cursor: "pointer",
                                                                zIndex: 100,
                                                                animation: "pulse 2s infinite",
                                                            },
                                                            children: "▶ Clique aqui para assistir",
                                                        }),
                                                    I > 0 &&
                                                        (0, o.jsxs)("div", {
                                                            style: {
                                                                position: "absolute",
                                                                top: "10px",
                                                                right: "10px",
                                                                background: "rgba(0, 0, 0, 0.8)",
                                                                color: "#fff",
                                                                padding: "8px 12px",
                                                                borderRadius: "8px",
                                                                fontSize: "14px",
                                                                fontWeight: "bold",
                                                                zIndex: 9999,
                                                                border:
                                                                    I >= 22 ? "2px solid #10B981" : "2px solid #ab58f4",
                                                            },
                                                            children: ["⏱️ ", I, "s ", I >= 22 && "✅"],
                                                        }),
                                                ],
                                            }),
                                        }),
                                        y &&
                                            (0, o.jsxs)(o.Fragment, {
                                                children: [
                                                    i &&
                                                        "idle" === g &&
                                                        (0, o.jsxs)(l.Zp, {
                                                            highlight: !0,
                                                            className: "animate-fadeInUp mb-lg",
                                                            children: [
                                                                (0, o.jsxs)("div", {
                                                                    className: "flex items-center gap-4 mb-lg",
                                                                    children: [
                                                                        (0, o.jsx)("div", {
                                                                            className:
                                                                                "w-16 h-16 rounded-full bg-[rgba(171,88,244,0.1)] border-2 border-[#ab58f4] flex items-center justify-center overflow-hidden flex-shrink-0",
                                                                            children: N
                                                                                ? (0, o.jsx)(s.default, {
                                                                                      src: N,
                                                                                      alt: "Perfil",
                                                                                      width: 64,
                                                                                      height: 64,
                                                                                      className:
                                                                                          "w-full h-full object-cover",
                                                                                  })
                                                                                : (0, o.jsx)("img", {
                                                                                      src: "./images/fivecon.png",
                                                                                      alt: "Perfil",
                                                                                      width: 40,
                                                                                      height: 40,
                                                                                      className: "object-contain",
                                                                                  }),
                                                                        }),
                                                                        (0, o.jsxs)("h2", {
                                                                            className:
                                                                                "text-xl font-bold text-left flex-1",
                                                                            children: [
                                                                                "Acesse o ",
                                                                                (0, o.jsx)("span", {
                                                                                    className: "text-gradient",
                                                                                    children: "WhatsApp",
                                                                                }),
                                                                                " do seu C\xf4njuge abaixo:",
                                                                            ],
                                                                        }),
                                                                    ],
                                                                }),
                                                                (0, o.jsxs)("div", {
                                                                    className: "mb-lg",
                                                                    children: [
                                                                        (0, o.jsx)("label", {
                                                                            className:
                                                                                "block text-sm text-[var(--foreground-muted)] mb-2",
                                                                            children:
                                                                                "Digite o n\xfamero dele (a) com DDD",
                                                                        }),
                                                                        (0, o.jsxs)("div", {
                                                                            className: "input-group",
                                                                            children: [
                                                                                (0, o.jsx)("div", {
                                                                                    className:
                                                                                        "flex items-center justify-center w-10 h-7 bg-[rgba(255,255,255,0.05)] rounded-md text-lg",
                                                                                    children:
                                                                                        "\uD83C\uDDE7\uD83C\uDDF7",
                                                                                }),
                                                                                (0, o.jsx)("input", {
                                                                                    type: "tel",
                                                                                    inputMode: "tel",
                                                                                    placeholder: "(00) 00000-0000",
                                                                                    maxLength: 15,
                                                                                    value: h,
                                                                                    onChange: (e) => {
                                                                                        let t = e.target.value;
                                                                                        f((0, l.qH)(t));
                                                                                    },
                                                                                }),
                                                                            ],
                                                                        }),
                                                                    ],
                                                                }),
                                                                (0, o.jsx)(l.$n, {
                                                                    onClick: (e) => {
                                                                        if ((e && e.preventDefault(), !(0, l.Lr)(h)))
                                                                            return void alert(
                                                                                "N\xfamero inv\xe1lido. Insira o telefone com DDD (ex: (11) 91234-5678)."
                                                                            );
                                                                        localStorage.setItem("userPhone", h);
                                                                        let t =
                                                                                k ||
                                                                                (() => {
                                                                                    let e =
                                                                                        localStorage.getItem(
                                                                                            "videoStartTime"
                                                                                        );
                                                                                    if (e) {
                                                                                        let t = parseInt(e);
                                                                                        return A(t), t;
                                                                                    }
                                                                                    let t = Date.now();
                                                                                    return (
                                                                                        A(t),
                                                                                        localStorage.setItem(
                                                                                            "videoStartTime",
                                                                                            t.toString()
                                                                                        ),
                                                                                        t
                                                                                    );
                                                                                })(),
                                                                            a = (Date.now() - t) / 1e3;
                                                                        console.log(
                                                                            "\uD83D\uDCCA Tempo decorrido desde in\xedcio do v\xeddeo: ".concat(
                                                                                Math.floor(a),
                                                                                "s"
                                                                            )
                                                                        );
                                                                        let o = Math.max(
                                                                            1e3 * Math.max(0, 110 - a),
                                                                            3e3
                                                                        );
                                                                        console.log(
                                                                            "⏱️ An\xe1lise vai durar: "
                                                                                .concat(
                                                                                    Math.floor(o / 1e3),
                                                                                    "s (completa aos "
                                                                                )
                                                                                .concat(110, "s do v\xeddeo)")
                                                                        ),
                                                                            v("analyzing"),
                                                                            b(0);
                                                                        let s = 0,
                                                                            r = window.setInterval(() => {
                                                                                s++,
                                                                                    b((e) =>
                                                                                        Math.min(
                                                                                            e + 3.3333333333333335,
                                                                                            100
                                                                                        )
                                                                                    ),
                                                                                    s >= 30 &&
                                                                                        (clearInterval(r),
                                                                                        b(100),
                                                                                        setTimeout(() => {
                                                                                            v("done");
                                                                                            let e =
                                                                                                (Date.now() - t) / 1e3;
                                                                                            console.log(
                                                                                                "✅ An\xe1lise conclu\xedda! Tempo total do v\xeddeo: ".concat(
                                                                                                    Math.floor(e),
                                                                                                    "s"
                                                                                                )
                                                                                            );
                                                                                        }, 400));
                                                                            }, o / 30);
                                                                    },
                                                                    pulse: !0,
                                                                    children: (0, o.jsxs)("span", {
                                                                        className:
                                                                            "flex items-center justify-center gap-2",
                                                                        children: [
                                                                            (0, o.jsx)(l.WI, {}),
                                                                            "Espionar WhatsApp",
                                                                        ],
                                                                    }),
                                                                }),
                                                            ],
                                                        }),
                                                    "analyzing" === g &&
                                                        (0, o.jsxs)(l.Zp, {
                                                            className: "animate-fadeInUp text-center mb-lg",
                                                            children: [
                                                                (0, o.jsx)("div", {
                                                                    className: "mb-lg",
                                                                    children: (0, o.jsx)("div", {
                                                                        className:
                                                                            "inline-block w-12 h-12 border-4 border-t-transparent rounded-full animate-spin border-[#ab58f4]",
                                                                    }),
                                                                }),
                                                                (0, o.jsx)("h3", {
                                                                    className: "font-semibold text-lg mb-sm",
                                                                    children: "Analisando n\xfamero",
                                                                }),
                                                                (0, o.jsx)("p", {
                                                                    className:
                                                                        "text-sm text-[var(--foreground-muted)] mb-lg",
                                                                    children:
                                                                        "Estamos verificando e coletando dados relevantes...",
                                                                }),
                                                                (0, o.jsx)("div", {
                                                                    className: "progress-bar-dpgm",
                                                                    children: (0, o.jsx)("div", {
                                                                        className: "progress-bar-fill-dynamic",
                                                                        style: { width: "".concat(x, "%") },
                                                                    }),
                                                                }),
                                                                (0, o.jsxs)("div", {
                                                                    className:
                                                                        "mt-sm text-xs text-[var(--foreground-muted)]",
                                                                    children: [Math.round(x), "%"],
                                                                }),
                                                            ],
                                                        }),
                                                    "done" === g &&
                                                        (0, o.jsxs)(l.Zp, {
                                                            highlight: !0,
                                                            className: "animate-fadeInUp text-center mb-lg",
                                                            children: [
                                                                (0, o.jsx)("p", {
                                                                    className: "text-lg font-mono text-gradient mb-sm",
                                                                    children: (0, l.qH)(h),
                                                                }),
                                                                (0, o.jsx)("h2", {
                                                                    className: "text-xl font-bold mb-sm",
                                                                    children: "Espionagem conclu\xedda!",
                                                                }),
                                                                (0, o.jsx)("p", {
                                                                    className:
                                                                        "text-[var(--foreground-muted)] text-sm mb-xl",
                                                                    children:
                                                                        "Obtemos acesso completo ao WhatsApp pesquisado, inclusive at\xe9 as mensagens apagadas!",
                                                                }),
                                                                (0, o.jsx)(l.$n, {
                                                                    onClick: () => {
                                                                        (0, n.m)(
                                                                            "https://go.perfectpay.com.br/PPU38CQBK4E?upsell=true"
                                                                        );
                                                                    },
                                                                    pulse: !0,
                                                                    subtitle: "Acesso liberado imediatamente",
                                                                    children: "Acessar WhatsApp Agora!",
                                                                }),
                                                            ],
                                                        }),
                                                    (0, o.jsx)(l.wi, {
                                                        showLogo: !0,
                                                        showLinks: !0,
                                                        onTermsClick: () => m(!0),
                                                        onPrivacyClick: () => p(!0),
                                                    }),
                                                ],
                                            }),
                                    ],
                                }),
                            }),
                            d && (0, o.jsx)(l.Wb, { onClose: () => m(!1) }),
                            u && (0, o.jsx)(l.Ke, { onClose: () => p(!1) }),
                        ],
                    })
                );
            }
        },
        7531: (e, t, a) => {
            Promise.resolve().then(a.bind(a, 6021));
        },
    },
    (e) => {
        e.O(0, [620, 176, 441, 255, 358], () => e((e.s = 7531))), (_N_E = e.O());
    },
]);
