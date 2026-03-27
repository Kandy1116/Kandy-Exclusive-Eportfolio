module.exports = [
"[project]/components/ConstellationCanvas.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ConstellationCanvas
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
function ConstellationCanvas() {
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        let animationFrameId;
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);
        let mouse = {
            x: window.innerWidth / 2,
            y: window.innerHeight / 2
        };
        window.addEventListener("mousemove", (e)=>{
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        });
        const bgStars = Array.from({
            length: 120
        }, ()=>({
                x: Math.random(),
                y: Math.random(),
                size: Math.random() * 2
            }));
        const constellations = [
            {
                name: "Virgo",
                stars: [
                    [
                        0.15,
                        0.5
                    ],
                    [
                        0.25,
                        0.45
                    ],
                    [
                        0.35,
                        0.55
                    ],
                    [
                        0.45,
                        0.5
                    ],
                    [
                        0.55,
                        0.6
                    ],
                    [
                        0.65,
                        0.55
                    ],
                    [
                        0.75,
                        0.65
                    ]
                ],
                connections: [
                    [
                        0,
                        1
                    ],
                    [
                        1,
                        2
                    ],
                    [
                        2,
                        3
                    ],
                    [
                        3,
                        4
                    ],
                    [
                        4,
                        5
                    ],
                    [
                        5,
                        6
                    ]
                ]
            },
            {
                name: "Leo",
                stars: [
                    [
                        0.2,
                        0.6
                    ],
                    [
                        0.3,
                        0.5
                    ],
                    [
                        0.4,
                        0.45
                    ],
                    [
                        0.5,
                        0.5
                    ],
                    [
                        0.6,
                        0.4
                    ],
                    [
                        0.7,
                        0.5
                    ]
                ],
                connections: [
                    [
                        0,
                        1
                    ],
                    [
                        1,
                        2
                    ],
                    [
                        2,
                        3
                    ],
                    [
                        3,
                        4
                    ],
                    [
                        4,
                        5
                    ]
                ]
            },
            {
                name: "Taurus",
                stars: [
                    [
                        0.3,
                        0.6
                    ],
                    [
                        0.4,
                        0.5
                    ],
                    [
                        0.5,
                        0.45
                    ],
                    [
                        0.6,
                        0.5
                    ],
                    [
                        0.7,
                        0.6
                    ],
                    [
                        0.5,
                        0.3
                    ]
                ],
                connections: [
                    [
                        0,
                        1
                    ],
                    [
                        1,
                        2
                    ],
                    [
                        2,
                        3
                    ],
                    [
                        3,
                        4
                    ],
                    [
                        2,
                        5
                    ]
                ]
            }
        ];
        let current = 0;
        let opacity = 0;
        let fadeIn = true;
        let lineProgress = 0;
        function toScreen([x, y]) {
            const px = x * canvas.width;
            const py = y * canvas.height;
            const dx = (mouse.x - canvas.width / 2) * 0.02;
            const dy = (mouse.y - canvas.height / 2) * 0.02;
            return [
                px + dx,
                py + dy
            ];
        }
        function drawBackground() {
            bgStars.forEach((star)=>{
                const x = star.x * canvas.width;
                const y = star.y * canvas.height;
                ctx.beginPath();
                ctx.arc(x, y, star.size, 0, Math.PI * 2);
                ctx.fillStyle = "rgba(255,255,255,0.3)";
                ctx.fill();
            });
        }
        function drawStars(stars) {
            stars.forEach(([x, y])=>{
                const [sx, sy] = toScreen([
                    x,
                    y
                ]);
                const dist = Math.hypot(mouse.x - sx, mouse.y - sy);
                const glow = Math.max(0, 1 - dist / 150);
                ctx.beginPath();
                ctx.arc(sx, sy, 2 + glow * 3, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255,255,255,${opacity})`;
                ctx.shadowBlur = 15 * glow;
                ctx.shadowColor = "white";
                ctx.fill();
                ctx.shadowBlur = 0;
            });
        }
        function drawConnections(stars, connections) {
            ctx.strokeStyle = `rgba(255,255,255,${opacity})`;
            ctx.lineWidth = 1.5;
            const total = connections.length;
            const visible = Math.floor(lineProgress * total);
            for(let i = 0; i < visible; i++){
                const [a, b] = connections[i];
                const [x1, y1] = toScreen(stars[a]);
                const [x2, y2] = toScreen(stars[b]);
                ctx.beginPath();
                ctx.moveTo(x1, y1);
                ctx.lineTo(x2, y2);
                ctx.stroke();
            }
        }
        function drawLabel(name) {
            ctx.fillStyle = `rgba(255,255,255,${opacity})`;
            ctx.font = "28px sans-serif";
            ctx.textAlign = "center";
            ctx.fillText(name, canvas.width / 2, canvas.height * 0.1);
        }
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawBackground();
            const c = constellations[current];
            drawStars(c.stars);
            drawConnections(c.stars, c.connections);
            drawLabel(c.name);
            lineProgress += 0.01;
            if (lineProgress > 1) lineProgress = 1;
            if (fadeIn) {
                opacity += 0.01;
                if (opacity >= 1) {
                    fadeIn = false;
                    setTimeout(startFadeOut, 3000);
                }
            }
            animationFrameId = requestAnimationFrame(animate);
        }
        function startFadeOut() {
            const fade = setInterval(()=>{
                opacity -= 0.02;
                if (opacity <= 0) {
                    clearInterval(fade);
                    current = (current + 1) % constellations.length;
                    fadeIn = true;
                    lineProgress = 0;
                }
            }, 30);
        }
        animate();
        return ()=>{
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener("resize", resizeCanvas);
        };
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
        ref: canvasRef,
        className: "fixed top-0 left-0 w-full h-full -z-10"
    }, void 0, false, {
        fileName: "[project]/components/ConstellationCanvas.js",
        lineNumber: 179,
        columnNumber: 6
    }, this);
}
}),
"[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].ReactJsxDevRuntime;
}),
];

//# sourceMappingURL=_07zo74k._.js.map