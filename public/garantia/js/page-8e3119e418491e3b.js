(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [962],
    {
        794: (e, a, o) => {
            Promise.resolve().then(o.bind(o, 9690));
        },
        9690: (e, a, o) => {
            "use strict";
            o.r(a), o.d(a, { default: () => l });
            var t = o(5155),
                s = o(2115),
                i = o(5176),
                r = o(8111);
            let n = [
                {
                    q: "Porque devo pagar essa garantia?",
                    a: "A Garantia Premium protege 100% do seu investimento. Com ela, voc\xea tem direito ao reembolso total caso o app n\xe3o funcione como esperado.",
                },
                {
                    q: "Como recebo meu reembolso se algo der errado?",
                    a: "Basta entrar em contato com nosso suporte pelo WhatsApp e solicitar o reembolso. Processamos em at\xe9 5 dias \xfateis, sem burocracia.",
                },
                {
                    q: "\xc9 um pagamento \xfanico ou vital\xedcio?",
                    a: "\xc9 um pagamento \xfanico e vital\xedcio. Voc\xea paga apenas uma vez e fica protegido para sempre.",
                },
            ];
            function l() {
                let [e, a] = (0, s.useState)(!1),
                    [o, l] = (0, s.useState)(!1);
                return (
                    (0, s.useEffect)(() => {
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
                    (0, t.jsxs)(t.Fragment, {
                        children: [
                            (0, t.jsx)(i.K7, {}),
                            (0, t.jsx)("main", {
                                className: "min-h-screen px-4 py-8",
                                children: (0, t.jsxs)("div", {
                                    className: "container-dpgm animate-fadeIn",
                                    children: [
                                        (0, t.jsx)(i.gu, {}),
                                        (0, t.jsxs)("h1", {
                                            className: "title-dpgm mb-md",
                                            style: {
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                gap: "12px",
                                            },
                                            children: [
                                                (0, t.jsx)("svg", {
                                                    width: "34",
                                                    height: "34",
                                                    viewBox: "0 0 24 24",
                                                    fill: "none",
                                                    stroke: "currentColor",
                                                    strokeWidth: "2",
                                                    strokeLinecap: "round",
                                                    strokeLinejoin: "round",
                                                    style: { color: "#6F5ECE" },
                                                    children: (0, t.jsx)("path", {
                                                        d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
                                                    }),
                                                }),
                                                "Garantia ",
                                                (0, t.jsx)("span", { className: "text-gradient", children: "Premium" }),
                                            ],
                                        }),
                                        (0, t.jsxs)("div", {
                                            className: "mb-lg",
                                            style: { paddingLeft: "20px", paddingRight: "20px" },
                                            children: [
                                                (0, t.jsxs)("p", {
                                                    className: "subtitle-dpgm",
                                                    style: { marginBottom: "clamp(16px, 4vw, 20px)" },
                                                    children: [
                                                        "Voc\xea ganhou o benef\xedcio de",
                                                        " ",
                                                        (0, t.jsx)("strong", {
                                                            className: "text-white",
                                                            children:
                                                                "100% de seguran\xe7a, com direito a reembolso total",
                                                        }),
                                                        " ",
                                                        "caso o aplicativo n\xe3o funcione como esperado.",
                                                    ],
                                                }),
                                                (0, t.jsxs)("p", {
                                                    className: "subtitle-dpgm",
                                                    style: { marginBottom: "clamp(16px, 4vw, 20px)" },
                                                    children: [
                                                        "A partir de agora, voc\xea estar\xe1 pagando essa taxa para ativar seu c\xf3digo de reembolso e garantir a",
                                                        " ",
                                                        (0, t.jsx)("strong", {
                                                            className: "text-white",
                                                            children: "prote\xe7\xe3o incondicional da sua compra",
                                                        }),
                                                        ", caso o produto n\xe3o funcione como o prometido.",
                                                    ],
                                                }),
                                                (0, t.jsx)("p", {
                                                    className: "subtitle-dpgm font-bold text-white",
                                                    children:
                                                        "Finalize o pagamento da Garantia PREMIUM agora para ativar todas as fun\xe7\xf5es do aplicativo com seguran\xe7a total.",
                                                }),
                                            ],
                                        }),
                                        (0, t.jsxs)(i.Zp, {
                                            highlight: !0,
                                            className: "mb-lg",
                                            children: [
                                                (0, t.jsx)("p", {
                                                    className: "text-center uppercase text-gradient",
                                                    style: {
                                                        fontWeight: "bold",
                                                        fontSize: "calc(var(--font-sm) * 1.44)",
                                                        marginBottom: "16px",
                                                    },
                                                    children: "Oferta Especial",
                                                }),
                                                (0, t.jsx)(i.kb, {
                                                    originalPrice: "R$199,90",
                                                    currentPrice: "R$79,00",
                                                    discount: "R$120 OFF",
                                                    onClick: () =>
                                                        (0, r.m)(
                                                            "https://go.perfectpay.com.br/PPU38CQBK4G?upsell=true"
                                                        ),
                                                }),
                                                (0, t.jsx)(i.$n, {
                                                    href: "https://go.perfectpay.com.br/PPU38CQBK4G?upsell=true",
                                                    pulse: !0,
                                                    subtitle: "Prote\xe7\xe3o total do seu investimento",
                                                    children: "\uD83D\uDD10 Quero ter Garantia",
                                                }),
                                            ],
                                        }),
                                        (0, t.jsx)(i.Tw, { items: n, title: "D\xfavidas Frequentes", variant: "new" }),
                                        (0, t.jsx)(i.wi, {
                                            showLogo: !0,
                                            showLinks: !0,
                                            onTermsClick: () => a(!0),
                                            onPrivacyClick: () => l(!0),
                                        }),
                                    ],
                                }),
                            }),
                            e && (0, t.jsx)(i.Wb, { onClose: () => a(!1) }),
                            o && (0, t.jsx)(i.Ke, { onClose: () => l(!1) }),
                        ],
                    })
                );
            }
        },
    },
    (e) => {
        e.O(0, [176, 441, 255, 358], () => e((e.s = 794))), (_N_E = e.O());
    },
]);
