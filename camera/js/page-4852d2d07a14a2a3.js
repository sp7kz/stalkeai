(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [36],
    {
        6788: (e, s, t) => {
            Promise.resolve().then(t.bind(t, 7360));
        },
        7360: (e, s, t) => {
            "use strict";
            t.r(s), t.d(s, { default: () => d });
            var a = t(5155),
                o = t(2115),
                r = t(5176),
                n = t(8111);
            let i = ["C\xe2mera traseira (o que ele est\xe1 vendo)", "C\xe2mera frontal (o rosto dele)"],
                l = [
                    "Ver e Escutar (V\xeddeo + \xc1udio)",
                    "Apenas Ver (Somente V\xeddeo)",
                    "Apenas Escutar (Somente \xc1udio)",
                ],
                c = [
                    {
                        icon: r.bM,
                        title: "Acesso \xe0 c\xe2mera e microfone em tempo real",
                        description:
                            "Escolha entre c\xe2mera frontal (veja o rosto dele) ou traseira (veja o que ele est\xe1 vendo). Escute todas as conversas e sons ao redor em tempo real.",
                    },
                    {
                        icon: r.Jg,
                        title: "Totalmente invis\xedvel e indetect\xe1vel",
                        description:
                            "Sem notifica\xe7\xf5es, sem \xedcones, sem rastros. Ele nunca vai saber que voc\xea est\xe1 assistindo e ouvindo.",
                    },
                    {
                        icon: r.Es,
                        title: "Funciona apenas com o n\xfamero",
                        description:
                            "N\xe3o precisa tocar no celular dele ou instalar nada. Compatible com Android e iPhone, qualquer operadora.",
                    },
                ];
            function d() {
                let [e, s] = (0, o.useState)(""),
                    [t, d] = (0, o.useState)("C\xe2mera traseira (o que ele est\xe1 vendo)"),
                    [m, u] = (0, o.useState)("Ver e Escutar (V\xeddeo + \xc1udio)"),
                    [x, p] = (0, o.useState)(!1),
                    [h, g] = (0, o.useState)(!1);
                return (
                    (0, o.useEffect)(() => {
                        let e = localStorage.getItem("userPhone");
                        e && s(e);
                    }, []),
                    (0, o.useEffect)(() => {
                        window.history.pushState(null, "", window.location.href);
                        let e = () => {
                            window.history.pushState(null, "", window.location.href);
                        };
                        return (
                            window.addEventListener("popstate", e),
                            () => {
                                window.removeEventListener("popstate", e);
                            }
                        );
                    }, []),
                    (0, a.jsxs)(a.Fragment, {
                        children: [
                            (0, a.jsx)(r.K7, {}),
                            (0, a.jsx)("main", {
                                className: "min-h-screen px-4 py-8",
                                children: (0, a.jsxs)("div", {
                                    className: "container-dpgm animate-fadeIn",
                                    children: [
                                        (0, a.jsx)(r.gu, {}),
                                        (0, a.jsxs)("div", {
                                            className: "text-center mb-lg",
                                            children: [
                                                (0, a.jsxs)("h1", {
                                                    className: "title-dpgm mb-sm",
                                                    style: {
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        gap: "8px",
                                                        flexWrap: "wrap",
                                                    },
                                                    children: [
                                                        (0, a.jsxs)("svg", {
                                                            width: "20",
                                                            height: "20",
                                                            viewBox: "0 0 24 24",
                                                            fill: "none",
                                                            stroke: "currentColor",
                                                            strokeWidth: "2",
                                                            strokeLinecap: "round",
                                                            strokeLinejoin: "round",
                                                            style: { color: "#ab58f4" },
                                                            children: [
                                                                (0, a.jsx)("path", {
                                                                    d: "M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z",
                                                                }),
                                                                (0, a.jsx)("circle", { cx: "12", cy: "13", r: "4" }),
                                                            ],
                                                        }),
                                                        (0, a.jsx)("span", {
                                                            className: "text-gradient",
                                                            children: "Acesso Remoto",
                                                        }),
                                                        " \xe0 C\xe2mera + Microfone",
                                                    ],
                                                }),
                                                (0, a.jsxs)("p", {
                                                    className: "subtitle-dpgm",
                                                    style: { paddingLeft: "20px", paddingRight: "20px" },
                                                    children: [
                                                        "Veja e escute ",
                                                        (0, a.jsx)("strong", {
                                                            className: "text-white",
                                                            children: "em tempo real",
                                                        }),
                                                        " tudo que seu c\xf4njuge est\xe1 fazendo, ",
                                                        (0, a.jsx)("strong", {
                                                            className: "text-white",
                                                            children: "sem instalar nada",
                                                        }),
                                                        " e de forma ",
                                                        (0, a.jsx)("strong", {
                                                            className: "text-white",
                                                            children: "100% invis\xedvel",
                                                        }),
                                                        ".",
                                                    ],
                                                }),
                                            ],
                                        }),
                                        (0, a.jsxs)(r.Zp, {
                                            className: "mb-lg",
                                            children: [
                                                (0, a.jsx)("h3", {
                                                    className: "text-lg font-bold mb-lg text-center text-gradient",
                                                    children: "Configure o Acesso",
                                                }),
                                                (0, a.jsxs)("div", {
                                                    style: {
                                                        paddingLeft: "0",
                                                        paddingRight: "0",
                                                        maxWidth: "108%",
                                                        marginLeft: "-4%",
                                                    },
                                                    children: [
                                                        (0, a.jsx)("div", {
                                                            style: { marginBottom: "20px" },
                                                            children: (0, a.jsx)(r.LR, {
                                                                value: e,
                                                                onChange: s,
                                                                label: "N\xfamero do celular do seu c\xf4njuge:",
                                                            }),
                                                        }),
                                                        (0, a.jsx)("div", {
                                                            style: {
                                                                position: "relative",
                                                                zIndex: 20,
                                                                marginBottom: "20px",
                                                            },
                                                            children: (0, a.jsx)(r.ms, {
                                                                value: t,
                                                                options: i,
                                                                onChange: d,
                                                                label: "Qual c\xe2mera do celular voc\xea quer ver?",
                                                            }),
                                                        }),
                                                        (0, a.jsx)("div", {
                                                            style: {
                                                                position: "relative",
                                                                zIndex: 10,
                                                                marginBottom: "20px",
                                                            },
                                                            children: (0, a.jsx)(r.ms, {
                                                                value: m,
                                                                options: l,
                                                                onChange: u,
                                                                label: "O que voc\xea quer monitorar?",
                                                            }),
                                                        }),
                                                        (0, a.jsx)(r.$n, {
                                                            href: "https://go.perfectpay.com.br/PPU38CQBK4K?upsell=true",
                                                            pulse: !0,
                                                            style: { marginTop: "8px" },
                                                            children: "\uD83D\uDD13 Ativar Acesso Agora",
                                                        }),
                                                    ],
                                                }),
                                            ],
                                        }),
                                        (0, a.jsxs)(r.Zp, {
                                            small: !0,
                                            className: "mb-lg",
                                            children: [
                                                (0, a.jsx)("h3", {
                                                    className: "text-lg font-bold mb-lg text-center text-gradient",
                                                    children: "O que voc\xea consegue fazer:",
                                                }),
                                                (0, a.jsx)("div", {
                                                    style: { paddingLeft: "8px", paddingRight: "8px" },
                                                    children: c.map((e, s) =>
                                                        (0, a.jsxs)(
                                                            "div",
                                                            {
                                                                className: "flex gap-3 items-start",
                                                                style: {
                                                                    marginBottom: s < c.length - 1 ? "32px" : "0",
                                                                },
                                                                children: [
                                                                    (0, a.jsx)("div", {
                                                                        className:
                                                                            "w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-full bg-[rgba(171,88,244,0.15)] border border-[rgba(171,88,244,0.3)]",
                                                                        children: (0, a.jsx)(e.icon, {}),
                                                                    }),
                                                                    (0, a.jsxs)("div", {
                                                                        className: "flex-1",
                                                                        children: [
                                                                            (0, a.jsx)("div", {
                                                                                className:
                                                                                    "font-bold text-sm mb-sm text-white",
                                                                                children: e.title,
                                                                            }),
                                                                            (0, a.jsx)("div", {
                                                                                className:
                                                                                    "text-xs text-[var(--foreground-muted)] leading-relaxed",
                                                                                children: e.description,
                                                                            }),
                                                                        ],
                                                                    }),
                                                                ],
                                                            },
                                                            s
                                                        )
                                                    ),
                                                }),
                                            ],
                                        }),
                                        (0, a.jsxs)(r.Zp, {
                                            highlight: !0,
                                            className: "mb-lg",
                                            children: [
                                                (0, a.jsx)("p", {
                                                    className: "text-center uppercase mb-md text-gradient",
                                                    style: {
                                                        fontWeight: "bold",
                                                        fontSize: "calc(var(--font-sm) * 1.44)",
                                                    },
                                                    children: "Oferta Especial",
                                                }),
                                                (0, a.jsx)(r.kb, {
                                                    originalPrice: "R$199,90",
                                                    currentPrice: "R$69,90",
                                                    discount: "R$120 OFF",
                                                    onClick: () =>
                                                        (0, n.m)(
                                                            "https://go.perfectpay.com.br/PPU38CQBK4K?upsell=true"
                                                        ),
                                                }),
                                                (0, a.jsx)(r.$n, {
                                                    href: "https://go.perfectpay.com.br/PPU38CQBK4K?upsell=true",
                                                    pulse: !0,
                                                    children: "\uD83D\uDD10 Ativar Acesso Completo",
                                                }),
                                            ],
                                        }),
                                        (0, a.jsx)(r.wi, {
                                            showLogo: !0,
                                            showLinks: !0,
                                            onTermsClick: () => p(!0),
                                            onPrivacyClick: () => g(!0),
                                        }),
                                    ],
                                }),
                            }),
                            x && (0, a.jsx)(r.Wb, { onClose: () => p(!1) }),
                            h && (0, a.jsx)(r.Ke, { onClose: () => g(!1) }),
                        ],
                    })
                );
            }
        },
    },
    (e) => {
        e.O(0, [176, 441, 255, 358], () => e((e.s = 6788))), (_N_E = e.O());
    },
]);
