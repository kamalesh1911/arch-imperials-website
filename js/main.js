
// =============================================
// 1. GLOBAL SELECTORS & CONFIGURATION
// =============================================

const $ = (selector) => document.querySelector(selector);

const $$ = (selector) => [
    ...document.querySelectorAll(selector)
];

const fine = matchMedia('(hover:hover)').matches;


// =============================================
// 2. PRELOADER ANIMATION
// =============================================

let p = 0;

const iv = setInterval(() => {

    p += Math.random() * 14;

    if (p >= 100) {

        p = 100;

        clearInterval(iv);

        setTimeout(() => {
            $('#pre').classList.add('off');
        }, 200);

    }

    $('#pct').textContent = Math.floor(p);

}, 90);


// =============================================
// 3. HERO 3D BUILDING WIREFRAME ANIMATION
// =============================================

const cv = $('#hero3d');
const c = cv.getContext('2d');

let W, H;
let ay = 0.6;
let ty = 0.6;
let t = 0;

// Building structures
const B = [
    [-1.2, -1.2, 2.4, 2.4, 1.2],
    [-.9, -.9, 1.8, 1.8, 2.4],
    [-.6, -.6, 1.2, 1.2, 3.6],
    [-.3, -.3, .6, .6, 4.6],
    [1.6, -.8, 1.4, 1.6, 1.8],
    [-3, -.5, 1.2, 1.2, .9],
    [-2.6, 1.4, 1.6, 1, 1.5]
];


// Canvas resize
const rs = () => {

    W = cv.width = innerWidth;
    H = cv.height = cv.offsetHeight;

};

rs();

addEventListener('resize', rs);


// 3D perspective projection
const P = (x, y, z) => {

    const co = Math.cos(ay);
    const si = Math.sin(ay);

    const X = x * co - z * si;
    const Z = x * si + z * co + 9;

    const k = Math.min(W, H * 1.3) / Z * 1.1;
    const ox = W > 860 ? W * .25 : 0;

    return [
        W / 2 + ox + X * k,
        H * .72 - y * k + Z * k * .14
    ];

};


// Draw polygon
const poly = (pts, f, s) => {

    c.beginPath();

    pts.forEach((q, i) => {

        i
            ? c.lineTo(...q)
            : c.moveTo(...q);

    });

    c.closePath();

    if (f) {
        c.fillStyle = f;
        c.fill();
    }

    c.strokeStyle = s;
    c.stroke();

};


// Main 3D animation
function draw() {

    t++;

    ay += (ty - ay) * .05 + .002;

    c.clearRect(0, 0, W, H);

    c.lineWidth = 1;


    // Ground grid
    c.strokeStyle = '#d9bf8c22';

    for (let i = -6; i <= 6; i++) {

        c.beginPath();

        c.moveTo(...P(i, 0, -6));
        c.lineTo(...P(i, 0, 6));

        c.moveTo(...P(-6, 0, i));
        c.lineTo(...P(6, 0, i));

        c.stroke();

    }


    // Scanning animation
    const L = (t % 420) / 420 * 6.4;


    // Building structures
    B.forEach(([x, z, w, d, h]) => {

        const a = Math.max(
            0,
            Math.min(1, (L - h) / 1)
        );

        const v = [
            [x, z],
            [x + w, z],
            [x + w, z + d],
            [x, z + d]
        ];


        // Building walls
        for (let i = 0; i < 4; i++) {

            const [a1, b1] = v[i];
            const [a2, b2] = v[(i + 1) % 4];

            poly(
                [
                    P(a1, 0, b1),
                    P(a2, 0, b2),
                    P(a2, h, b2),
                    P(a1, h, b1)
                ],
                `rgba(${40 + i * 20},${120 + i * 20},${90 + i * 10},${.08 + a * .4})`,
                '#d9bf8cbb'
            );


            // Building floor lines
            if (a > .3) {

                c.strokeStyle = '#f3d9a044';

                for (let y = .3; y < h; y += .35) {

                    c.beginPath();

                    c.moveTo(...P(a1, y, b1));
                    c.lineTo(...P(a2, y, b2));

                    c.stroke();

                }

            }

        }


        // Building roof
        poly(
            v.map(q => P(q[0], h, q[1])),
            `rgba(246,240,228,${a * .35})`,
            '#d9bf8c'
        );

    });


    // Scanning plane
    poly(
        [
            P(-4, L, -4),
            P(4, L, -4),
            P(4, L, 4),
            P(-4, L, 4)
        ],
        'rgba(217,191,140,.07)',
        '#f3d9a0'
    );


    requestAnimationFrame(draw);

}

draw();


// Rotate building using mouse movement
addEventListener('mousemove', (e) => {

    ty = .6 + (e.clientX / innerWidth - .5) * 2.2;

});


// =============================================
// 4. CUSTOM CURSOR & HOVER EFFECTS
// =============================================

if (fine) {

    let mx = 0;
    let my = 0;

    let rx = 0;
    let ry = 0;


    // Cursor position
    addEventListener('mousemove', (e) => {

        mx = e.clientX;
        my = e.clientY;

        $('#dot').style.transform =
            `translate(${mx}px,${my}px)`;

    });


    // Smooth cursor animation
    (function f() {

        rx += (mx - rx) * .15;
        ry += (my - ry) * .15;

        $('#cur').style.transform =
            `translate(${rx}px,${ry}px)`;

        requestAnimationFrame(f);

    })();


    // Cursor hover effects
    $$('a,button,.svc,.pc').forEach((e) => {

        e.onmouseenter = () => {
            $('#cur').classList.add('big');
        };

        e.onmouseleave = () => {
            $('#cur').classList.remove('big');
        };

    });


    // Magnetic button effect
    $$('.mag').forEach((b) => {

        b.onmousemove = (e) => {

            const r = b.getBoundingClientRect();

            b.style.transform =
                `translate(${(e.clientX - r.left - r.width / 2) * .25}px,${(e.clientY - r.top - r.height / 2) * .35}px)`;

        };

        b.onmouseleave = () => {
            b.style.transform = '';
        };

    });


    // Image tilt effect
    $$('.tilt').forEach((el) => {

        el.onmousemove = (e) => {

            const r = el.getBoundingClientRect();

            const x = (e.clientX - r.left) / r.width - .5;
            const y = (e.clientY - r.top) / r.height - .5;

            el.style.transform =
                `perspective(800px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg) scale(1.02)`;

        };

        el.onmouseleave = () => {
            el.style.transform = '';
        };

    });

}


// =============================================
// 5. SCROLL PROGRESS BAR
// =============================================

addEventListener('scroll', () => {

    $('#bar').style.width =
        scrollY / (document.body.scrollHeight - innerHeight) * 100 + '%';

});


// =============================================
// 6. MOBILE NAVIGATION
// =============================================

$('#burger').onclick = () => {

    $('#menu').classList.toggle('on');

};


// Close menu after clicking navigation links
$$('#menu a').forEach((a) => {

    a.onclick = () => {
        $('#menu').classList.remove('on');
    };

});


// =============================================
// 7. SCROLL REVEAL ANIMATION
// =============================================

const io = new IntersectionObserver((es) => {

    es.forEach((e) => {

        if (e.isIntersecting) {

            e.target.classList.add('in');

            io.unobserve(e.target);

        }

    });

});

$$('.rv').forEach((e) => {

    io.observe(e);

});


// =============================================
// 8. EXPERIENCE COUNTER ANIMATION
// =============================================

const n = $('[data-n]');

new IntersectionObserver(([e], o) => {

    if (e.isIntersecting) {

        let i = 0;

        const s = setInterval(() => {

            n.textContent = ++i + '+';

            if (i >= 8) {
                clearInterval(s);
            }

        }, 150);

        o.disconnect();

    }

}).observe(n);


// =============================================
// 9. SERVICES ACCORDION
// =============================================

$$('.svc').forEach((s) => {

    s.onmouseenter = s.onclick = () => {

        $$('.svc').forEach((x) => {
            x.classList.remove('on');
        });

        s.classList.add('on');

    };

});


// =============================================
// 10. CARD SPOTLIGHT EFFECT
// =============================================

$$('.card').forEach((k) => {

    k.onmousemove = (e) => {

        const r = k.getBoundingClientRect();

        k.style.setProperty(
            '--x',
            e.clientX - r.left + 'px'
        );

        k.style.setProperty(
            '--y',
            e.clientY - r.top + 'px'
        );

    };

});


// =============================================
// 11. VISION & MISSION SWITCHING
// =============================================

$$('.vm button').forEach((b) => {

    b.onclick = () => {

        $$('.vm button').forEach((x) => {
            x.classList.remove('on');
        });

        b.classList.add('on');

        $('#vmt').textContent = b.dataset.v;

    };

});


// =============================================
// 12. PROJECT FILTERING
// =============================================

$$('.filt button').forEach((b) => {

    b.onclick = () => {

        // Update active filter
        $$('.filt button').forEach((x) => {
            x.classList.remove('on');
        });

        b.classList.add('on');


        // Filter project gallery
        $$('.pc').forEach((p) => {

            p.classList.toggle(
                'hide',
                b.dataset.f != 'all' &&
                p.dataset.c != b.dataset.f
            );

        });

    };

});


// =============================================
// 13. PROJECT IMAGE LIGHTBOX
// =============================================

$$('.pc').forEach((p) => {

    p.onclick = () => {

        const d = $('#lb');

        d.querySelector('img').src =
            p.querySelector('img').src;

        d.querySelector('p').textContent =
            p.querySelector('figcaption').textContent +
            ': ' +
            p.dataset.d;

        d.showModal();

    };

});


// Close lightbox button
$('#lb button').onclick = () => {

    $('#lb').close();

};


// Close lightbox when clicking outside
$('#lb').onclick = (e) => {

    if (e.target.id == 'lb') {
        e.target.close();
    }

};


// =============================================
// 14. BEFORE & AFTER IMAGE COMPARISON
// =============================================

const ba = $('#ba');

const mv = (e) => {

    const r = ba.getBoundingClientRect();

    const x = Math.max(
        0,
        Math.min(1, (e.clientX - r.left) / r.width)
    );

    $('.bf').style.width = x * 100 + '%';

    $('.bf img').style.setProperty(
        '--w',
        r.width + 'px'
    );

    $('#bh').style.left = x * 100 + '%';

};


// Drag interaction
let dr = 0;

ba.onpointerdown = (e) => {

    dr = 1;

    mv(e);

};


addEventListener('pointerup', () => {

    dr = 0;

});


addEventListener('pointermove', (e) => {

    if (dr) {
        mv(e);
    }

});


// =============================================
// 15. PROJECT PROCESS SECTION
// =============================================

// Project workflow steps
const S = [

    [
        'Discover',
        'Understand requirements, lifestyle, preferences and budget.'
    ],

    [
        'Design',
        'Develop concepts, layouts, drawings and 3D visualisations.'
    ],

    [
        'Plan',
        'Finalise materials, specifications, costing and project schedules.'
    ],

    [
        'Execute',
        'Bring the approved design to life through coordinated construction and interior works.'
    ],

    [
        'Deliver',
        'Complete the project with attention to quality, detailing and finishing.'
    ]

];

let si = 0;
let tm;


// Create process navigation buttons
S.forEach((s, i) => {

    const b = document.createElement('button');

    b.textContent = s[0];

    b.onclick = () => {

        go(i);

        clearInterval(tm);

    };

    $('#steps').append(b);

});


// Update process content
function go(i) {

    si = i;

    $$('#steps button').forEach((b, j) => {

        b.classList.toggle('on', j <= i);

    });

    $('#sn').textContent = i + 1;

    $('#st').textContent = S[i][0];

    $('#sd').textContent = S[i][1];

}


// Initialize first process step
go(0);


// Automatically rotate process steps
tm = setInterval(() => {

    go((si + 1) % 5);

}, 3500);


// =============================================
// 16. CONTACT FORM INTERACTIONS
// =============================================


// Service selection buttons
$$('.chips button').forEach((b) => {

    b.onclick = () => {

        b.classList.toggle('on');

    };

});


// Project size range slider
$('#rg').oninput = (e) => {

    $('#rv').textContent = e.target.value;

};


// Contact form submission
$('#f').onsubmit = (e) => {

    e.preventDefault();

    // Show success notification
    $('#toast').classList.add('on');

    setTimeout(() => {

        $('#toast').classList.remove('on');

    }, 3500);


    // Reset form
    e.target.reset();

};
