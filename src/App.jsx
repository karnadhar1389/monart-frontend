import { useState, useEffect, useCallback, useRef } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "firebase/auth";
import { auth } from "./firebase";

import monartLogo from "./assets/monart-logo.png";

import React from "react";
import ReactDOM from "react-dom/client";
// import App from "./App";

// import { loadStripe } from "@stripe/stripe-js";
// import { Elements } from "@stripe/react-stripe-js";
// import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
// import { PaymentElement } from "@stripe/react-stripe-js";

import { loadStripe } from "@stripe/stripe-js";
import { PaymentElement, Elements, useStripe, useElements } from "@stripe/react-stripe-js";


const stripePromise = loadStripe("pk_test_51TPgHkQl2ttgedD2vARMX0KKGeDDZjvR0hfLDH6NCNp994Ng2GfWtQe41p39IaNTA6g9um4gXwcpt6ervn3EwG4g00dFetZIRB");



// ── Fonts & Global Styles ────────────────────────────────────────────────────
// const GlobalStyle = () => (
//   <style>{`
//     // @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Jost:wght@300;400;500;600&display=swap');
//     @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=Montserrat:wght@300;400;500;600&display=swap');

//     *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

//     // :root {
//     //   --cream:    #FAF7F2;
//     //   --blush:    #F2D9CE;
//     //   --rose:     #C9897A;
//     //   --clay:     #A0614E;
//     //   --sage:     #8FAF96;
//     //   --stone:    #9B8F85;
//     //   --dark:     #2E2521;
//     //   --mid:      #6B5B54;
//     //   --light:    #E8DDD6;
//     //   --white:    #FFFDF9;
//     //   --font-display: 'Cormorant Garamond', serif;
//     //   --font-body:    'Jost', sans-serif;
//     //   --shadow-soft: 0 4px 24px rgba(46,37,33,0.08);
//     //   --shadow-card: 0 2px 12px rgba(46,37,33,0.07);
//     //   --radius: 2px;
//     //   --transition: 0.3s cubic-bezier(0.4,0,0.2,1);
//     // }

//     :root{
//   --gold:#C9A24A;
//   --gold-light:#E5C878;

//   --blush:#F8E8EC;
//   --pink:#DFA7B3;

//   --cream:#FAF7F2;
//   --ivory:#FFFDFB;

//   --dark:#2A2A2A;
//   --mid:#666;
//   --stone:#999;

//   --border:#EEE7DA;

//   --shadow:0 10px 30px rgba(0,0,0,0.05);

//   --font-display:'Cormorant Garamond', serif;
//   --font-body:'Montserrat', sans-serif;
// }

//     html { scroll-behavior: smooth; }

//     // body {
//     //   font-family: var(--font-body);
//     //   background: var(--cream);
//     //   color: var(--dark);
//     //   line-height: 1.6;
//     //   -webkit-font-smoothing: antialiased;
//     // }

//     body{
//   margin:0;
//   background:var(--ivory);
//   color:var(--dark);
//   font-family:var(--font-body);
// }

//     h1,h2,h3,h4 { font-family: var(--font-display); font-weight: 400; }

//     /* Scrollbar */
//     ::-webkit-scrollbar { width: 6px; }
//     ::-webkit-scrollbar-track { background: var(--cream); }
//     ::-webkit-scrollbar-thumb { background: var(--blush); border-radius: 3px; }

//     /* Animations */
//     @keyframes fadeUp {
//       from { opacity:0; transform:translateY(20px); }
//       to   { opacity:1; transform:translateY(0); }
//     }
//     @keyframes fadeIn { from{opacity:0} to{opacity:1} }
//     @keyframes shimmer {
//       0%   { background-position: -200% 0; }
//       100% { background-position: 200% 0; }
//     }
//     @keyframes spin { to { transform: rotate(360deg); } }
//     @keyframes heartbeat { 0%,100%{transform:scale(1)} 50%{transform:scale(1.3)} }

//     .fade-up { animation: fadeUp 0.6s ease both; }
//     .fade-up-1 { animation-delay:0.1s; }
//     .fade-up-2 { animation-delay:0.2s; }
//     .fade-up-3 { animation-delay:0.3s; }
//     .fade-up-4 { animation-delay:0.4s; }

//     /* Utility */
//     .sr-only { position:absolute; width:1px; height:1px; overflow:hidden; clip:rect(0,0,0,0); }

//     // /* Buttons */
//     // .btn-primary {
//     //   display: inline-flex; align-items:center; gap:8px;
//     //   background: var(--clay); color: var(--white);
//     //   border: none; padding: 13px 28px; cursor: pointer;
//     //   font-family: var(--font-body); font-size: 13px;
//     //   letter-spacing: 1.5px; text-transform: uppercase;
//     //   font-weight: 500; border-radius: var(--radius);
//     //   transition: var(--transition);
//     // }
//     // .btn-primary:hover { background: var(--dark); transform: translateY(-1px); }

//     .btn-primary{
//   background:linear-gradient(
//     135deg,
//     var(--gold),
//     var(--gold-light)
//   );
//   color:white;
//   border:none;
//   padding:14px 28px;
//   border-radius:999px;
//   font-weight:500;
//   letter-spacing:.5px;
//   transition:.3s;
//   box-shadow:var(--shadow);
// }

// .btn-primary:hover{
//   transform:translateY(-2px);
//   opacity:.95;
// }

//     // .btn-outline {
//     //   display: inline-flex; align-items:center; gap:8px;
//     //   background: transparent; color: var(--clay);
//     //   border: 1px solid var(--clay); padding: 12px 28px; cursor: pointer;
//     //   font-family: var(--font-body); font-size: 13px;
//     //   letter-spacing: 1.5px; text-transform: uppercase;
//     //   font-weight: 500; border-radius: var(--radius);
//     //   transition: var(--transition);
//     // }
//     .btn-outline{
//   border:1px solid var(--gold);
//   background:white;
//   color:var(--gold);
//   padding:14px 28px;
//   border-radius:999px;
// }
//     .btn-outline:hover { background: var(--clay); color: var(--white); }

//     .btn-ghost {
//       background: none; border: none; cursor: pointer;
//       font-family: var(--font-body); color: var(--dark);
//       transition: var(--transition);
//     }

//     /* Card hover */
//     .card-hover {
//       transition: var(--transition);
//     }
//     .card-hover:hover {
//       transform: translateY(-4px);
//       box-shadow: var(--shadow-soft);
//     }

//     /* Input */
//     .input {
//       width:100%; padding:12px 16px; border:1px solid var(--light);
//       background:var(--white); color:var(--dark); font-family:var(--font-body);
//       font-size:14px; border-radius:var(--radius); outline:none;
//       transition: var(--transition);
//     }
//     .input:focus { border-color:var(--rose); }

//     /* Toast */
//     .toast {
//       position:fixed; bottom:24px; right:24px; z-index:9999;
//       background:var(--dark); color:var(--white);
//       padding:14px 22px; border-radius:4px; font-size:13px;
//       font-family:var(--font-body); letter-spacing:0.5px;
//       animation: fadeUp 0.4s ease;
//       display:flex; align-items:center; gap:10px;
//       box-shadow: var(--shadow-soft);
//       max-width: 320px;
//     }
//     .toast.success { border-left: 3px solid var(--sage); }
//     .toast.error   { border-left: 3px solid #C97A7A; }

//     /* Badge */
//     .badge {
//       display:inline-flex; align-items:center; justify-content:center;
//       background:var(--clay); color:var(--white);
//       border-radius:50%; width:18px; height:18px; font-size:10px;
//       font-weight:600; font-family:var(--font-body);
//       position:absolute; top:-6px; right:-6px;
//     }

//     /* Modal overlay */
//     .overlay {
//       position:fixed; inset:0; background:rgba(46,37,33,0.5);
//       z-index:999; backdrop-filter:blur(2px);
//       animation: fadeIn 0.3s ease;
//     }

//     /* Skeleton loader */
//     .skeleton {
//       background: linear-gradient(90deg, var(--light) 25%, var(--blush) 50%, var(--light) 75%);
//       background-size: 200% 100%;
//       animation: shimmer 1.5s infinite;
//       border-radius: var(--radius);
//     }

//     /* Star rating */
//     .stars { display:inline-flex; gap:2px; }
//     .star  { color:#C9897A; font-size:14px; }
//     .star-empty { color:var(--light); }

//     /* Tag/Chip */
//     .chip {
//       display:inline-block; padding:4px 12px;
//       background:var(--blush); color:var(--clay);
//       font-size:11px; letter-spacing:1px; text-transform:uppercase;
//       font-weight:500; border-radius:20px; font-family:var(--font-body);
//     }

//     /* Section headings */
//     .section-title {
//       font-size:clamp(32px,5vw,52px); color:var(--dark); line-height:1.1;
//       font-weight:300; letter-spacing:-0.5px;
//     }
//     .section-subtitle {
//       font-size:13px; letter-spacing:3px; text-transform:uppercase;
//       color:var(--stone); font-weight:500; margin-bottom:12px;
//       font-family:var(--font-body);
//     }

//     /* Decorative line */
//     .deco-line {
//       display:inline-block; width:40px; height:1px; background:var(--rose);
//       margin:0 12px; vertical-align:middle;
//     }

//     /* Product grid */
//     .product-grid {
//       display:grid;
//       grid-template-columns:repeat(auto-fill,minmax(260px,1fr));
//       gap:24px;
//     }

//     /* Mobile nav overlay */
//     .mobile-nav {
//       position:fixed; inset:0; background:var(--white); z-index:998;
//       display:flex; flex-direction:column; padding:80px 40px 40px;
//       animation: fadeIn 0.3s ease;
//     }

//     /* Image zoom */
//     .img-zoom-container { overflow:hidden; }
//     .img-zoom-container img { transition: transform 0.5s ease; }
//     .img-zoom-container:hover img { transform: scale(1.06); }

//     /* Price display */
//     .price-orig { text-decoration:line-through; color:var(--stone); font-size:13px; }
//     .price-sale { color:var(--clay); font-weight:600; }

//     /* Responsive breakpoints */
//     @media(max-width:768px) {
//       .hide-mobile { display:none!important; }
//       .product-grid { grid-template-columns:repeat(2,1fr); gap:16px; }
//     }
//     @media(max-width:480px) {
//       .product-grid { grid-template-columns:1fr; }
//     }
//     @media(min-width:769px) {
//       .hide-desktop { display:none!important; }
//     }

//     /* Wishlist heart */
//     .wish-btn {
//       position:absolute; top:12px; right:12px; z-index:2;
//       background:rgba(255,253,249,0.85); border:none;
//       width:34px;height:34px; border-radius:50%;
//       display:flex;align-items:center;justify-content:center;
//       cursor:pointer; transition:var(--transition);
//       backdrop-filter:blur(4px);
//       box-shadow: 0 2px 8px rgba(46,37,33,0.12);
//     }
//     .wish-btn:hover { transform:scale(1.1); }
//     .wish-btn.active { animation: heartbeat 0.4s ease; }

//     /* Page transitions */
//     .page-enter { animation: fadeUp 0.5s ease both; }

//     /* Form grid */
//     .form-grid { display:grid; grid-template-columns:1fr 1fr; gap:16px; }
//     @media(max-width:600px){ .form-grid { grid-template-columns:1fr; } }

//     /* Table */
//     .data-table { width:100%; border-collapse:collapse; font-size:14px; }
//     .data-table th {
//       text-align:left; padding:12px 16px; font-weight:500;
//       font-family:var(--font-body); font-size:11px; letter-spacing:1.5px;
//       text-transform:uppercase; color:var(--stone);
//       border-bottom:1px solid var(--light); background:var(--cream);
//     }
//     .data-table td {
//       padding:14px 16px; border-bottom:1px solid var(--light);
//       vertical-align:middle;
//     }
//     .data-table tr:hover td { background:rgba(242,217,206,0.2); }

//     /* Accordion */
//     .accordion-item { border-bottom:1px solid var(--light); }
//     .accordion-btn {
//       width:100%; text-align:left; background:none; border:none;
//       padding:18px 0; font-family:var(--font-body); font-size:14px;
//       font-weight:500; color:var(--dark); cursor:pointer;
//       display:flex; justify-content:space-between; align-items:center;
//       transition:var(--transition);
//     }
//     .accordion-btn:hover { color:var(--clay); }
//     .accordion-body { padding:0 0 18px; font-size:14px; color:var(--mid); line-height:1.8; }

//     /* Slider dots */
//     .slider-dots { display:flex; gap:8px; justify-content:center; margin-top:20px; }
//     .slider-dot {
//       width:6px; height:6px; border-radius:50%; background:var(--light);
//       cursor:pointer; transition:var(--transition);
//     }
//     .slider-dot.active { background:var(--clay); transform:scale(1.3); }

//     /* Hero gradient text */
//     .gradient-text {
//       background: linear-gradient(135deg, var(--clay) 0%, var(--rose) 50%, var(--sage) 100%);
//       -webkit-background-clip: text; background-clip: text;
//       -webkit-text-fill-color: transparent;
//     }

//     /* Texture overlay */
//     .texture-bg {
//       position:relative;
//     }
//     .texture-bg::before {
//       content:''; position:absolute; inset:0;
//       background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4'%3E%3Ccircle cx='1' cy='1' r='0.5' fill='%23A0614E' opacity='0.07'/%3E%3C/svg%3E");
//       pointer-events:none; z-index:0;
//     }
//     .texture-bg > * { position:relative; z-index:1; }

//     /* Quantity control */
//     .qty-control { display:inline-flex; align-items:center; border:1px solid var(--light); border-radius:var(--radius); overflow:hidden; }
//     .qty-btn { background:none;border:none;padding:8px 14px;cursor:pointer;font-size:16px;color:var(--dark);transition:var(--transition); }
//     .qty-btn:hover { background:var(--blush); }
//     .qty-val { padding:8px 12px;font-size:14px;min-width:36px;text-align:center;font-family:var(--font-body); }

//     /* Filter pills */
//     .filter-pill {
//       padding:8px 20px; border:1px solid var(--light); background:var(--white);
//       cursor:pointer; font-family:var(--font-body); font-size:12px;
//       letter-spacing:1.5px; text-transform:uppercase; font-weight:500;
//       border-radius:30px; transition:var(--transition); color:var(--mid);
//     }
//     .filter-pill:hover, .filter-pill.active {
//       background:var(--clay); color:var(--white); border-color:var(--clay);
//     }

//     /* Search */
//     .search-wrap { position:relative; }
//     .search-wrap input { padding-left:40px; }
//     .search-icon { position:absolute;left:14px;top:50%;transform:translateY(-50%); color:var(--stone); pointer-events:none; }

//     /* Cart item */
//     .cart-item { display:flex; gap:16px; padding:20px 0; border-bottom:1px solid var(--light); }
//     .cart-item-img { width:80px;height:80px;object-fit:cover;border-radius:var(--radius); flex-shrink:0; }

//     /* Progress bar */
//     .progress-bar { height:3px; background:var(--light); border-radius:2px; overflow:hidden; }
//     .progress-fill { height:100%; background:var(--clay); transition:width 0.6s ease; }

//     /* Notification dot */
//     .notif-dot { width:8px;height:8px;background:var(--clay);border-radius:50%;display:inline-block; }

//     /* Footer */
//     footer { background:var(--dark); color:rgba(255,253,249,0.7); }
//     footer a { color:rgba(255,253,249,0.6); text-decoration:none; font-size:13px; transition:var(--transition); }
//     footer a:hover { color:var(--blush); }
//     footer h4 { color:var(--white); font-family:var(--font-display); font-size:18px; font-weight:400; margin-bottom:20px; }

//     /* Divider */
//     .divider { height:1px; background:var(--light); margin:32px 0; }
//     .divider-dark { height:1px; background:rgba(255,253,249,0.1); margin:32px 0; }

//     /* Layout containers */
//     .container { max-width:1280px; margin:0 auto; padding:0 24px; }
//     .container-sm { max-width:900px; margin:0 auto; padding:0 24px; }
//     .container-xs { max-width:680px; margin:0 auto; padding:0 24px; }

//     /* Grid layouts */
//     .two-col { display:grid; grid-template-columns:1fr 1fr; gap:48px; align-items:start; }
//     .three-col { display:grid; grid-template-columns:repeat(3,1fr); gap:32px; }
//     .four-col { display:grid; grid-template-columns:repeat(4,1fr); gap:24px; }
//     @media(max-width:900px) { .two-col,.three-col { grid-template-columns:1fr; } }
//     @media(max-width:768px) { .four-col { grid-template-columns:repeat(2,1fr); } }
//     @media(max-width:480px) { .four-col { grid-template-columns:1fr; } }

//     /* Admin sidebar */
//     .admin-layout { display:grid; grid-template-columns:220px 1fr; min-height:100vh; }
//     @media(max-width:768px) { .admin-layout { grid-template-columns:1fr; } }
//     .admin-sidebar { background:var(--dark); padding:32px 0; }
//     .admin-nav-item {
//       display:flex; align-items:center; gap:12px;
//       padding:12px 24px; cursor:pointer; font-size:13px;
//       color:rgba(255,253,249,0.6); transition:var(--transition);
//       font-family:var(--font-body); letter-spacing:0.5px;
//       border-left:2px solid transparent;
//     }
//     .admin-nav-item:hover, .admin-nav-item.active {
//       color:var(--blush); background:rgba(242,217,206,0.07);
//       border-left-color:var(--rose);
//     }

//     /* Order status */
//     .status-badge {
//       display:inline-block; padding:4px 10px; border-radius:12px;
//       font-size:11px; font-weight:500; letter-spacing:0.5px;
//       font-family:var(--font-body);
//     }
//     .status-pending   { background:#FEF3CD; color:#856404; }
//     .status-processing { background:#CCE5FF; color:#004085; }
//     .status-shipped   { background:#D4EDDA; color:#155724; }
//     .status-delivered { background:#D1ECF1; color:#0C5460; }

//     /* Checkout steps */
//     .steps { display:flex; align-items:center; gap:0; margin-bottom:40px; }
//     .step { display:flex; align-items:center; gap:10px; flex:1; }
//     .step-num {
//       width:32px;height:32px;border-radius:50%;
//       display:flex;align-items:center;justify-content:center;
//       font-size:13px;font-weight:600;font-family:var(--font-body);
//       transition:var(--transition); flex-shrink:0;
//     }
//     .step-num.active { background:var(--clay);color:var(--white); }
//     .step-num.done   { background:var(--sage);color:var(--white); }
//     .step-num.future { background:var(--light);color:var(--stone); }
//     .step-line { flex:1; height:1px; background:var(--light); }
//     .step-label { font-size:11px;letter-spacing:1px;text-transform:uppercase;font-weight:500;color:var(--stone); }

//     /* Review */
//     .review-card { background:var(--white); padding:24px; border-radius:4px; border:1px solid var(--light); }

//     /* About page */
//     .about-img { border-radius:4px; object-fit:cover; width:100%; height:500px; }

//     /* Contact */
//     .contact-info-item { display:flex; align-items:flex-start; gap:16px; }

//     /* Spinner */
//     .spinner { width:20px;height:20px;border:2px solid rgba(255,255,255,0.3);border-top-color:white;border-radius:50%;animation:spin 0.8s linear infinite; display:inline-block; }

//     /* Sidebar drawer */
//     .sidebar-drawer {
//       position:fixed; right:0; top:0; bottom:0; width:min(420px,100vw);
//       background:var(--white); z-index:1000; box-shadow:-4px 0 40px rgba(46,37,33,0.12);
//       display:flex; flex-direction:column; animation: slideLeft 0.35s ease;
//     }
//     @keyframes slideLeft { from{transform:translateX(100%)} to{transform:translateX(0)} }

//     .drawer-header { padding:24px; border-bottom:1px solid var(--light); display:flex; justify-content:space-between; align-items:center; }
//     .drawer-body { flex:1; overflow-y:auto; padding:24px; }
//     .drawer-footer { padding:24px; border-top:1px solid var(--light); background:var(--cream); }

//     /* Hero */
//     .hero { min-height:92vh; display:flex; align-items:center; position:relative; overflow:hidden; }
//     .hero-bg { position:absolute; inset:0; z-index:0; }
//     .hero-content { position:relative; z-index:1; }

//     /* Noise texture */
//     .noise::after {
//       content:''; position:fixed; inset:0; pointer-events:none; z-index:9998;
//       opacity:0.025;
//       background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
//     }
//   `}</style>
// );

// ── Fonts & Global Styles ────────────────────────────────────────────────────
const GlobalStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=Montserrat:wght@300;400;500;600&display=swap');

    *, *::before, *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    :root{
      --gold:#B8862B;
      --gold-light:#D4AF37;

      --pink:#DFA7B3;
      --blush:#F8E8EC;

      --cream:#FAF7F2;
      --ivory:#FFFDFB;

      --dark:#2A2A2A;
      --mid:#666;
      --stone:#999;

      --border:#EEE7DA;
      --light:#F4EFE7;
      --white:#FFFFFF;

      --clay:#C9A24A;
      --rose:#DFA7B3;
      --sage:#B7C9B0;

      --shadow-soft:0 10px 30px rgba(0,0,0,0.05);
      --shadow-card:0 6px 20px rgba(0,0,0,0.04);

      --radius:14px;
      --transition:0.3s ease;

      --font-display:'Cormorant Garamond', serif;
      --font-body:'Montserrat', sans-serif;
    }

    html{
      scroll-behavior:smooth;
    }

    body{
      margin:0;
      background:var(--ivory);
      color:var(--dark);
      font-family:var(--font-body);
      line-height:1.6;
      -webkit-font-smoothing:antialiased;
    }

    h1,h2,h3,h4{
      font-family:var(--font-display);
      font-weight:500;
    }

    a{
      text-decoration:none;
      color:inherit;
    }

    img{
      max-width:100%;
      display:block;
    }

    /* Scrollbar */
    ::-webkit-scrollbar{
      width:6px;
    }

    ::-webkit-scrollbar-track{
      background:var(--cream);
    }

    ::-webkit-scrollbar-thumb{
      background:var(--gold-light);
      border-radius:20px;
    }

    /* Animations */
    @keyframes fadeUp{
      from{
        opacity:0;
        transform:translateY(20px);
      }
      to{
        opacity:1;
        transform:translateY(0);
      }
    }

    @keyframes fadeIn{
      from{opacity:0}
      to{opacity:1}
    }

    @keyframes shimmer{
      0%{
        background-position:-200% 0;
      }
      100%{
        background-position:200% 0;
      }
    }

    @keyframes spin{
      to{
        transform:rotate(360deg);
      }
    }

    @keyframes heartbeat{
      0%,100%{
        transform:scale(1)
      }
      50%{
        transform:scale(1.2)
      }
    }

    .fade-up{
      animation:fadeUp .6s ease both;
    }

    .fade-up-1{
      animation-delay:.1s;
    }

    .fade-up-2{
      animation-delay:.2s;
    }

    .fade-up-3{
      animation-delay:.3s;
    }

    .fade-up-4{
      animation-delay:.4s;
    }

    /* Buttons */
    .btn-primary{
      display:inline-flex;
      align-items:center;
      justify-content:center;
      gap:8px;

      background:linear-gradient(
        135deg,
        var(--gold),
        var(--gold-light)
      );

      color:white;
      border:none;
      padding:14px 28px;
      border-radius:999px;
      cursor:pointer;

      font-family:var(--font-body);
      font-size:13px;
      letter-spacing:1px;
      font-weight:500;

      transition:all .3s ease;
      box-shadow:var(--shadow-soft);
    }

    .btn-primary:hover{
      transform:translateY(-2px);
      opacity:.95;
    }

    .btn-outline{
      display:inline-flex;
      align-items:center;
      justify-content:center;
      gap:8px;

      border:1px solid var(--gold);
      background:white;
      color:var(--gold);

      padding:14px 28px;
      border-radius:999px;
      cursor:pointer;

      font-family:var(--font-body);
      font-size:13px;
      letter-spacing:1px;
      font-weight:500;

      transition:all .3s ease;
    }

    .btn-outline:hover{
      background:var(--gold);
      color:white;
    }

    .btn-ghost{
      background:none;
      border:none;
      cursor:pointer;
      color:var(--dark);
      transition:var(--transition);
      font-family:var(--font-body);
    }

    /* Cards */
    .card-hover{
      transition:all .35s ease;
      background:white;
      border:1px solid var(--border);
      border-radius:20px;
      overflow:hidden;
      box-shadow:var(--shadow-card);
    }

    .card-hover:hover{
      transform:translateY(-6px);
      box-shadow:0 20px 40px rgba(0,0,0,0.08);
    }

    /* Inputs */
    .input{
      width:100%;
      padding:14px 16px;

      border:1px solid var(--border);
      background:#fff;

      color:var(--dark);
      font-family:var(--font-body);
      font-size:14px;

      border-radius:12px;
      outline:none;

      transition:all .3s ease;
    }

    .input:focus{
      border-color:var(--gold);
      box-shadow:0 0 0 3px rgba(201,162,74,0.1);
    }

    /* Toast */
    .toast{
      position:fixed;
      bottom:24px;
      right:24px;
      z-index:9999;

      background:var(--dark);
      color:white;

      padding:14px 22px;
      border-radius:12px;

      font-size:13px;
      letter-spacing:.5px;

      animation:fadeUp .4s ease;

      display:flex;
      align-items:center;
      gap:10px;

      box-shadow:var(--shadow-soft);
      max-width:320px;
    }

    .toast.success{
      border-left:3px solid var(--gold);
    }

    .toast.error{
      border-left:3px solid #d46b6b;
    }

    /* Badge */
    .badge{
      display:inline-flex;
      align-items:center;
      justify-content:center;

      background:var(--gold);
      color:white;

      border-radius:50%;
      width:18px;
      height:18px;

      font-size:10px;
      font-weight:600;

      position:absolute;
      top:-6px;
      right:-6px;
    }

    /* Overlay */
    .overlay{
      position:fixed;
      inset:0;
      background:rgba(0,0,0,.45);

      z-index:999;
      backdrop-filter:blur(2px);

      animation:fadeIn .3s ease;
    }

    /* Skeleton */
    .skeleton{
      background:linear-gradient(
        90deg,
        var(--light) 25%,
        var(--blush) 50%,
        var(--light) 75%
      );

      background-size:200% 100%;
      animation:shimmer 1.5s infinite;

      border-radius:var(--radius);
    }

    /* Stars */
    .stars{
      display:inline-flex;
      gap:2px;
    }

    .star{
      color:var(--gold);
      font-size:14px;
    }

    .star-empty{
      color:var(--light);
    }

    /* Chips */
    .chip{
      display:inline-block;
      padding:5px 14px;

      background:#FFF4F6;
      color:var(--gold);

      font-size:11px;
      letter-spacing:1px;
      text-transform:uppercase;

      border-radius:999px;
      font-weight:500;
    }

    /* Titles */
    .section-title{
      font-size:clamp(38px,5vw,64px);
      line-height:1.1;

      color:var(--dark);
      font-weight:500;

      font-family:var(--font-display);
      letter-spacing:-1px;
    }

    .section-subtitle{
      font-size:12px;
      letter-spacing:3px;
      text-transform:uppercase;

      color:var(--stone);
      font-weight:500;

      margin-bottom:14px;
    }

    /* Decorative line */
    .deco-line{
      display:inline-block;
      width:40px;
      height:1px;
      background:var(--gold);

      margin:0 12px;
      vertical-align:middle;
    }

    /* Product grid */
   .product-grid{
  display:grid;
  grid-template-columns:repeat(3,minmax(320px,1fr));
  gap:32px;
  width:100%;
}

@media(max-width:1200px){
  .product-grid{
    grid-template-columns:repeat(3,1fr);
  }
}

@media(max-width:900px){
  .product-grid{
    grid-template-columns:repeat(2,1fr);
  }
}

@media(max-width:600px){
  .product-grid{
    grid-template-columns:1fr;
  }
}

    /* Gradient text */
    .gradient-text{
      background:linear-gradient(
        135deg,
        var(--gold) 0%,
        var(--pink) 100%
      );

      -webkit-background-clip:text;
      background-clip:text;
      -webkit-text-fill-color:transparent;
    }

    /* Hero */
    .hero{
      min-height:84vh;
      display:flex;
      align-items:center;
      position:relative;
      overflow:hidden;

      background:
      linear-gradient(
        135deg,
        #FFFDFB 0%,
        #FAF3F5 100%
      );
    }

    .hero-bg{
      position:absolute;
      inset:0;
      z-index:0;
    }

    .hero-content{
      position:relative;
      z-index:1;
    }

    /* Wishlist */
    .wish-btn{
      position:absolute;
      top:12px;
      right:12px;

      z-index:2;

      background:rgba(255,255,255,.85);
      border:none;

      width:36px;
      height:36px;

      border-radius:50%;

      display:flex;
      align-items:center;
      justify-content:center;

      cursor:pointer;

      transition:all .3s ease;

      backdrop-filter:blur(4px);

      box-shadow:0 2px 8px rgba(0,0,0,0.1);
    }

    .wish-btn:hover{
      transform:scale(1.08);
    }

    .wish-btn.active{
      animation:heartbeat .4s ease;
    }

    /* Page transition */
    .page-enter{
      animation:fadeUp .5s ease both;
    }

    /* Forms */
    .form-grid{
      display:grid;
      grid-template-columns:1fr 1fr;
      gap:16px;
    }

    @media(max-width:600px){
      .form-grid{
        grid-template-columns:1fr;
      }
    }

    /* Divider */
    .divider{
      height:1px;
      background:var(--border);
      margin:28px 0;
    }

    /* Layout */
    .container{
  width:100%;
  max-width:1440px;
  margin:0 auto;
  padding:0 60px;
}

    .container-sm{
      max-width:900px;
      margin:0 auto;
      padding:0 24px;
    }

    .container-xs{
      max-width:680px;
      margin:0 auto;
      padding:0 24px;
    }

    /* Quantity */
    .qty-control{
      display:inline-flex;
      align-items:center;
      border:1px solid var(--border);
      border-radius:999px;
      overflow:hidden;
      background:white;
    }

    .qty-btn{
      background:none;
      border:none;
      padding:8px 14px;
      cursor:pointer;
      font-size:16px;
      color:var(--dark);
      transition:all .3s ease;
    }

    .qty-btn:hover{
      background:var(--blush);
    }

    .qty-val{
      padding:8px 12px;
      min-width:36px;
      text-align:center;
      font-size:14px;
    }

    /* Filter pills */
    .filter-pill{
      padding:10px 20px;

      border:1px solid var(--border);
      background:white;

      cursor:pointer;

      font-size:12px;
      letter-spacing:1px;
      text-transform:uppercase;
      font-weight:500;

      border-radius:999px;

      transition:all .3s ease;

      color:var(--mid);
    }

    .filter-pill:hover,
    .filter-pill.active{
      background:var(--gold);
      color:white;
      border-color:var(--gold);
    }

    /* Search */
    .search-wrap{
      position:relative;
    }

    .search-wrap input{
      padding-left:40px;
    }

    .search-icon{
      position:absolute;
      left:14px;
      top:50%;
      transform:translateY(-50%);
      color:var(--stone);
      pointer-events:none;
    }

    /* Cart item */
    .cart-item{
      display:flex;
      gap:16px;
      padding:20px 0;
      border-bottom:1px solid var(--border);
    }

    .cart-item-img{
      width:80px;
      height:80px;
      object-fit:cover;
      border-radius:14px;
      flex-shrink:0;
    }

    /* Progress */
    .progress-bar{
      height:4px;
      background:var(--light);
      border-radius:999px;
      overflow:hidden;
    }

    .progress-fill{
      height:100%;
      background:linear-gradient(
        90deg,
        var(--gold),
        var(--gold-light)
      );

      transition:width .6s ease;
    }

    /* Notification */
    .notif-dot{
      width:8px;
      height:8px;
      background:var(--gold);
      border-radius:50%;
      display:inline-block;
    }

    /* =========================
   ACCOUNT TABLE
========================= */

// .data-table{
//   width:100%;
//   border-collapse:collapse;
//   table-layout:fixed;
// }

// .data-table thead tr{
//   border-bottom:1px solid var(--border);
// }

// .data-table th{
//   text-align:center;
//   padding:18px 16px;

//   font-size:12px;
//   letter-spacing:2px;
//   text-transform:uppercase;

//   color:var(--stone);
//   font-weight:600;
// }

// .data-table td{
//   padding:20px 16px;
//   border-bottom:1px solid #f4f0ea;

//   font-size:14px;
//   color:var(--mid);

//   vertical-align:middle;
// }

// /* Column widths */

// .data-table th:nth-child(1),
// .data-table td:nth-child(1){
//   width:13%;
// }

// .data-table th:nth-child(2),
// .data-table td:nth-child(2){
//   width:14%;
// }

// .data-table th:nth-child(3),
// .data-table td:nth-child(3){
//   width:34%;
// }

// .data-table th:nth-child(4),
// .data-table td:nth-child(4){
//   width:12%;
// }

// .data-table th:nth-child(5),
// .data-table td:nth-child(5){
//   width:15%;
// }

// .data-table th:nth-child(6),
// .data-table td:nth-child(6){
//   width:12%;
// }

// .data-table td,
// .data-table th{
//   white-space:nowrap;
// }

// .data-table tbody tr{
//   transition:0.25s ease;
// }

// .data-table tbody tr:hover{
//   background:#fcfaf8;
// }

.data-table{
  width:100%;
  border-collapse:collapse;
}

.data-table thead th{
  text-align:left;
  padding:22px 18px;
  font-size:11px;
  letter-spacing:2px;
  text-transform:uppercase;
  color:var(--stone);
  font-weight:600;
  border-bottom:1px solid var(--light);
}

.data-table tbody td{
  padding:24px 18px;
  text-align:left;
  border-bottom:1px solid rgba(0,0,0,0.05);
  vertical-align:middle;
  font-size:15px;
  color:var(--charcoal);
}

.data-table tbody tr{
  transition:all 0.25s ease;
}

.data-table tbody tr:hover{
  background:rgba(216,156,122,0.04);
}

.status-badge{
  display:inline-flex;
  align-items:center;
  justify-content:center;

  padding:7px 14px;
  border-radius:999px;

  font-size:11px;
  font-weight:600;
  letter-spacing:1px;
  text-transform:uppercase;
}

.status-pending{
  background:#fff4df;
  color:#c99700;
}

.status-processing{
  background:#e7f1ff;
  color:#3273dc;
}

.status-delivered{
  background:#e7f8ec;
  color:#1f9d55;
}

    /* Footer */
    footer{
      background:#1F1F1F;
      color:rgba(255,255,255,.7);
    }

    footer a{
      color:rgba(255,255,255,.6);
      transition:all .3s ease;
      font-size:13px;
    }

    footer a:hover{
      color:var(--gold-light);
    }

    footer h4{
      color:white;
      font-size:18px;
      margin-bottom:20px;
    }

    /* Sidebar drawer */
    .sidebar-drawer{
      position:fixed;
      right:0;
      top:0;
      bottom:0;

      width:min(420px,100vw);

      background:white;

      z-index:1000;

      box-shadow:-4px 0 40px rgba(0,0,0,0.12);

      display:flex;
      flex-direction:column;

      animation:slideLeft .35s ease;
    }

    @keyframes slideLeft{
      from{
        transform:translateX(100%);
      }
      to{
        transform:translateX(0);
      }
    }

    .drawer-header{
      padding:24px;
      border-bottom:1px solid var(--border);

      display:flex;
      justify-content:space-between;
      align-items:center;
    }

    .drawer-body{
      flex:1;
      overflow-y:auto;
      padding:24px;
    }

    .drawer-footer{
      padding:24px;
      border-top:1px solid var(--border);
      background:var(--cream);
    }

    /* Spinner */
    .spinner{
      width:20px;
      height:20px;

      border:2px solid rgba(255,255,255,.3);
      border-top-color:white;

      border-radius:50%;

      animation:spin .8s linear infinite;

      display:inline-block;
    }

    /* Noise texture */
    .noise::after{
      content:'';
      position:fixed;
      inset:0;
      pointer-events:none;
      z-index:9998;

      opacity:.02;

      background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    }

    /* Responsive */
    @media(max-width:768px){

      .hide-mobile{
        display:none!important;
      }

      .product-grid{
        grid-template-columns:repeat(2,1fr);
        gap:18px;
      }

      .section-title{
        font-size:42px;
      }
    }

    @media(max-width:480px){

      .product-grid{
        grid-template-columns:1fr;
      }

      .btn-primary,
      .btn-outline{
        width:100%;
      }
    }

    @media(min-width:769px){

      .hide-desktop{
        display:none!important;
      }
    }
  /* =========================================
   LUXURY HEADER
========================================= */

.lux-header{
  position:sticky;
  top:0;
  z-index:1000;
  background:rgba(255,255,255,0.92);
  backdrop-filter:blur(12px);
  border-bottom:1px solid rgba(201,162,74,0.15);
}

/* TOP BAR */

.lux-topbar{
  height:38px;
  display:flex;
  align-items:center;
  justify-content:center;
  background:linear-gradient(
    90deg,
    #d79aa6,
    #e7bcc6
  );
  color:white;
  font-size:12px;
  letter-spacing:2px;
  font-weight:600;
}

/* MAIN HEADER */

// .lux-header-inner{
//   position:relative;
//   height:130px;

//   display:flex;
//   align-items:flex-end;
//   justify-content:space-between;

//   padding:
//     0 60px 22px;

//   max-width:1400px;
//   margin:auto;
}

/* CENTER LOGO */

.lux-logo-wrap{
  position:absolute;
  left:50%;
  top:10px;
  transform:translateX(-50%);
  cursor:pointer;
}

.lux-logo{
  height:95px;
  width:auto;
  object-fit:contain;

  filter:
    drop-shadow(0 4px 12px rgba(0,0,0,0.08));

  transition:0.3s;
}

.lux-logo:hover{
  transform:scale(1.03);
}

/* NAVIGATION */

.lux-nav-left,
.lux-nav-right{
  display:flex;
  align-items:center;
  gap:34px;
}

.lux-nav-left button,
.lux-nav-right button{
  background:none;
  border:none;

  font-family:var(--font-body);

  font-size:13px;
  letter-spacing:2px;
  font-weight:500;

  color:#555;

  cursor:pointer;
  transition:0.3s;
}

.lux-nav-left button:hover,
.lux-nav-right button:hover{
  color:var(--gold);
}

/* ICONS */

.lux-icons{
  display:flex;
  align-items:center;
  gap:18px;

  font-size:20px;
  color:#444;
}

.lux-icons span{
  cursor:pointer;
  transition:0.3s;
}

.lux-icons span:hover{
  color:var(--gold);
  transform:translateY(-2px);
}

/* MOBILE */

@media(max-width:900px){

  .lux-header-inner{
    height:auto;
    padding:20px;
    flex-direction:column;
    gap:20px;
    align-items:center;
  }

  .lux-logo-wrap{
    position:relative;
    left:auto;
    top:auto;
    transform:none;
  }

  .lux-nav-left,
  .lux-nav-right{
    gap:16px;
    flex-wrap:wrap;
    justify-content:center;
  }

  .lux-logo{
    height:70px;
  }
}    

.logo-transparent{
  mix-blend-mode:multiply;
}

.four-col{
  display:grid;
  grid-template-columns:repeat(4,minmax(0,1fr));
  gap:28px;
  width:100%;
}

@media(max-width:900px){
  .four-col{
    grid-template-columns:repeat(2,1fr);
  }
}

@media(max-width:600px){
  .four-col{
    grid-template-columns:1fr;
  }
}

body{
  letter-spacing:0.2px;
}
  `}</style>
);

// ── Mock Data ────────────────────────────────────────────────────────────────
const PRODUCTS = [
  {
    id: "p1", name: "Blushing Petal Studs", category: "studs",
    price: 18, originalPrice: null,
    images: ["https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&q=80",
             "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&q=80"],
    description: "Hand-rolled blush polymer clay studs with a soft matte finish. Each pair is unique, made with love in small batches.",
    details: "Hypoallergenic stainless steel posts. Size: 12mm diameter. Weight: Feather-light.",
    tags: ["bestseller"], rating: 4.8, reviews: 42, stock: 15,
    featured: true
  },
  {
    id: "p2", name: "Terracotta Hoop Earrings", category: "earrings",
    price: 28, originalPrice: 35,
    images: ["/images/Earring lotus.jpg", "/images/Earring small lotus.jpg"],
    description: "Bold terracotta hoops that bring the warmth of sun-baked earth to your everyday look.",
    details: "Gold-plated hooks. Hoop diameter: 4cm. Handcrafted from premium polymer clay.",
    tags: ["sale"], rating: 4.6, reviews: 28, stock: 8,
    featured: true
  },
  {
    id: "p3", name: "Sage & Cream Necklace Set", category: "necklace-sets",
    price: 54, originalPrice: null,
    images: ["https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=500&q=80",
             "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500&q=80"],
    description: "A curated set of three delicate necklaces in sage green and cream. Layer them for an effortless boho-luxe look.",
    details: "18K gold-filled chains. Lengths: 16\", 18\", 20\". Lobster clasp closure.",
    tags: ["new"], rating: 4.9, reviews: 19, stock: 5,
    featured: true
  },
  {
    id: "p4", name: "Marble Effect Ring", category: "rings",
    price: 22, originalPrice: null,
    images: ["https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500&q=80",
             "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=500&q=80"],
    description: "Swirls of white and gold capture the elegance of marble in a lightweight clay ring.",
    details: "Adjustable band fits sizes 5–9. Width: 8mm. Made with Japanese polymer clay.",
    tags: ["bestseller"], rating: 4.7, reviews: 35, stock: 12,
    featured: false
  },
  {
    id: "p5", name: "Desert Rose Drop Earrings", category: "earrings",
    price: 32, originalPrice: null,
    images: ["https://images.unsplash.com/photo-1630019925419-5a34a0c9e6ef?w=500&q=80",
             "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=500&q=80"],
    description: "Asymmetric rose-toned drops inspired by desert blooms at dusk.",
    details: "Sterling silver ear wires. Drop length: 5cm. Handmade with love.",
    tags: ["new"], rating: 4.5, reviews: 12, stock: 7,
    featured: false
  },
  {
    id: "p6", name: "Coastal Blue Studs", category: "studs",
    price: 16, originalPrice: 20,
    images: ["https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=500&q=80",
             "https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?w=500&q=80"],
    description: "Ocean-inspired studs in soft cerulean and seafoam, textured to mimic sea glass.",
    details: "Surgical steel posts. Size: 10mm. Safe for sensitive ears.",
    tags: ["sale"], rating: 4.4, reviews: 23, stock: 20,
    featured: false
  },
  {
    id: "p7", name: "Golden Hour Ring Set", category: "rings",
    price: 45, originalPrice: null,
    images: ["https://images.unsplash.com/photo-1559554498-a00e2bbbfdb9?w=500&q=80",
             "https://images.unsplash.com/photo-1601121141461-9d6647bef0a0?w=500&q=80"],
    description: "A trio of stackable rings in warm amber, burnt orange, and champagne gold.",
    details: "Set of 3. Adjustable. Clay with gold leaf accents. Waterproof seal.",
    tags: ["bestseller", "new"], rating: 5.0, reviews: 8, stock: 4,
    featured: true
  },
  {
    id: "p8", name: "Wildflower Pendant Necklace", category: "necklace-sets",
    price: 38, originalPrice: null,
    images: ["https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500&q=80",
             "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=500&q=80"],
    description: "A single delicate wildflower pendant on a fine gold chain. Wear it alone or layer it up.",
    details: "18K gold-filled chain, 18\" length. Pendant: 18mm. Comes in a gift box.",
    tags: [], rating: 4.6, reviews: 31, stock: 9,
    featured: false
  },
];

const ORDERS = [
  { id: "ORD-001", date: "2026-03-15", items: 3, total: 84, status: "delivered", products: ["Blushing Petal Studs","Sage & Cream Necklace Set"] },
  { id: "ORD-002", date: "2026-04-02", items: 2, total: 50, status: "shipped", products: ["Desert Rose Drop Earrings","Coastal Blue Studs"] },
  { id: "ORD-003", date: "2026-04-18", items: 1, total: 45, status: "processing", products: ["Golden Hour Ring Set"] },
];

const REVIEWS = {
  p1: [
    { id:1, user:"Sophie M.", rating:5, date:"Mar 12, 2026", text:"Absolutely love these! So dainty and the colour is perfect for spring. Got so many compliments." },
    { id:2, user:"Emma T.", rating:5, date:"Feb 28, 2026", text:"Great quality and arrived beautifully packaged. Will definitely buy more!" },
    { id:3, user:"Lily R.", rating:4, date:"Feb 10, 2026", text:"Gorgeous but slightly smaller than I imagined. Still lovely though." },
  ],
  p3: [
    { id:1, user:"Zara K.", rating:5, date:"Apr 10, 2026", text:"This set is everything. The layering looks so effortless and chic." },
  ],
};

const DISCOUNT_CODES = { HELLO10: 10, CLAY20: 20, ARTISAN15: 15 };

// ── Icons ────────────────────────────────────────────────────────────────────
const Icon = ({ name, size = 18, style = {} }) => {
  const icons = {
    cart: "🛍️", heart: "♡", heartFull: "♥", search: "⌕", user: "◯",
    menu: "☰", close: "✕", star: "★", starEmpty: "☆", check: "✓",
    arrow: "→", arrowLeft: "←", trash: "⌫", edit: "✎", plus: "+",
    minus: "−", eye: "◉", shipping: "📦", secure: "🔒", gift: "🎁",
    chevDown: "▾", chevUp: "▴", chevRight: "›", chevLeft: "‹",
    instagram: "📸", facebook: "📘", pinterest: "📌", tiktok: "🎵",
    mail: "✉", phone: "☎", location: "◎", sparkle: "✨", filter: "⊟",
    sort: "⇅", refresh: "↺", logout: "⇥", grid: "⊞", list: "≡",
    home: "⌂", shop: "◈", about: "◇", contact: "◎", order: "◷", admin: "⚙",
  };
  return <span style={{ fontSize: size, lineHeight: 1, ...style }} aria-hidden="true">{icons[name] || "•"}</span>;
};

// Stars
const Stars = ({ rating, size = 14 }) => (
  <span className="stars">
    {[1,2,3,4,5].map(i => (
      <span key={i} className={i <= Math.round(rating) ? "star" : "star star-empty"} style={{ fontSize: size }}>
        {i <= Math.round(rating) ? "★" : "☆"}
      </span>
    ))}
  </span>
);

// ── Toast System ─────────────────────────────────────────────────────────────
const useToast = () => {
  const [toasts, setToasts] = useState([]);
  const show = useCallback((msg, type = "success") => {
    const id = Date.now();
    setToasts(t => [...t, { id, msg, type }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3000);
  }, []);
  return { toasts, show };
};

const ToastContainer = ({ toasts }) => (
  <div style={{ position:"fixed", bottom:24, right:24, zIndex:9999, display:"flex", flexDirection:"column", gap:10 }}>
    {toasts.map(t => (
      <div key={t.id} className={`toast ${t.type}`}>
        {t.type === "success" ? "✓" : "!"} {t.msg}
      </div>
    ))}
  </div>
);

// // ── NavBar ────────────────────────────────────────────────────────────────────
// const NavBar = ({ page, setPage, cartCount, wishCount, user, onLogout, cartOpen, setCartOpen }) => {
//   const [scrolled, setScrolled] = useState(false);
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [searchOpen, setSearchOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");

//   useEffect(() => {
//     const handler = () => setScrolled(window.scrollY > 20);
//     window.addEventListener("scroll", handler);
//     return () => window.removeEventListener("scroll", handler);
//   }, []);

//   const navLinks = [
//     { label: "Home", key: "home" },
//     { label: "Shop", key: "shop" },
//     { label: "About", key: "about" },
//     { label: "Contact", key: "contact" },
//     { label: "Account", key: user ? "account" : "login" },
//   ];

//   const nav = (key) => { setPage(key); setMobileOpen(false); };

//   return (
//     <>
//       <nav style={{
//         position:"fixed", top:0, left:0, right:0, zIndex:100,
//         background: scrolled ? "rgba(250,247,242,0.96)" : "transparent",
//         backdropFilter: scrolled ? "blur(12px)" : "none",
//         borderBottom: scrolled ? "1px solid var(--light)" : "1px solid transparent",
//         transition: "all 0.4s ease",
//         padding: "0 24px",
//       }}>
//         <div style={{ maxWidth:1280, margin:"0 auto", display:"flex", alignItems:"center", justifyContent:"space-between", height:64 }}>
//           {/* Logo */}
//           <button className="btn-ghost" onClick={() => nav("home")} style={{ fontFamily:"var(--font-display)", fontSize:22, fontWeight:400, letterSpacing:1, color:"var(--dark)" }}>
//             {/* Monica's Art */}
//             <img
//   src={monartLogo}
//   alt="MonArt"
//   style={{
//     height: 60,
//     objectFit: "contain"
//   }}
// />
//           </button>

//           {/* Desktop Nav */}
//           <div className="hide-mobile" style={{ display:"flex", gap:36 }}>
//             {navLinks.map(l => (
//               <button key={l.key} className="btn-ghost" onClick={() => nav(l.key)}
//                 style={{ fontSize:12, letterSpacing:2, textTransform:"uppercase", fontWeight:500,
//                   color: page === l.key ? "var(--clay)" : "var(--mid)",
//                   borderBottom: page === l.key ? "1px solid var(--clay)" : "1px solid transparent",
//                   paddingBottom:2 }}>
//                 {l.label}
//               </button>
//             ))}
//           </div>

//           {/* Actions */}
//           <div style={{ display:"flex", alignItems:"center", gap:8 }}>
//             {/* Search */}
//             {searchOpen ? (
//               <div style={{ display:"flex", alignItems:"center", gap:8 }}>
//                 <input className="input" autoFocus style={{ width:180, padding:"8px 12px", fontSize:13 }}
//                   placeholder="Search..." value={searchQuery}
//                   onChange={e => setSearchQuery(e.target.value)}
//                   onKeyDown={e => { if(e.key==="Enter" && searchQuery.trim()) { setPage("shop"); setSearchOpen(false); setSearchQuery(""); } }}
//                 />
//                 <button className="btn-ghost" onClick={() => setSearchOpen(false)} style={{ fontSize:16 }}>✕</button>
//               </div>
//             ) : (
//               <button className="btn-ghost" onClick={() => setSearchOpen(true)} style={{ padding:8, position:"relative" }}>
//                 <Icon name="search" size={18} />
//               </button>
//             )}

//             {/* Wishlist */}
//             <button className="btn-ghost" onClick={() => nav("wishlist")} style={{ padding:8, position:"relative" }}>
//               <Icon name={wishCount > 0 ? "heartFull" : "heart"} size={18} style={{ color: wishCount > 0 ? "var(--clay)" : undefined }} />
//               {wishCount > 0 && <span className="badge" style={{ fontSize:9, width:16, height:16, top:-4, right:-4 }}>{wishCount}</span>}
//             </button>

//             {/* User */}
//             <button className="btn-ghost" onClick={() => nav(user ? "account" : "login")} style={{ padding:8 }}>
//               <Icon name="user" size={18} />
//             </button>

//             {/* Cart */}
//             <button className="btn-ghost" onClick={() => setCartOpen(true)} style={{ padding:8, position:"relative" }}>
//               <Icon name="cart" size={20} />
//               {cartCount > 0 && <span className="badge">{cartCount}</span>}
//             </button>

//             {/* Hamburger */}
//             <button className="btn-ghost hide-desktop" onClick={() => setMobileOpen(true)} style={{ padding:8 }}>
//               <Icon name="menu" size={20} />
//             </button>
//           </div>
//         </div>
//       </nav>

//       {/* Mobile Nav */}
//       {mobileOpen && (
//         <>
//           <div className="overlay" onClick={() => setMobileOpen(false)} />
//           <div className="mobile-nav">
//             <button className="btn-ghost" onClick={() => setMobileOpen(false)} style={{ position:"absolute", top:24, right:24, fontSize:20 }}>✕</button>
//             <div style={{ fontFamily:"var(--font-display)", fontSize:28, marginBottom:48, color:"var(--clay)" }}><img
//   src={monartLogo}
//   alt="MonArt"
//   style={{
//     height: 60,
//     objectFit: "contain"
//   }}
// /></div>
//             {navLinks.map(l => (
//               <button key={l.key} className="btn-ghost" onClick={() => nav(l.key)}
//                 style={{ fontSize:26, fontFamily:"var(--font-display)", fontWeight:300, color:"var(--dark)", padding:"12px 0", textAlign:"left" }}>
//                 {l.label}
//               </button>
//             ))}
//             <div style={{ marginTop:"auto", display:"flex", gap:20 }}>
//               {user && <button className="btn-ghost" onClick={() => { onLogout(); setMobileOpen(false); }} style={{ color:"var(--stone)", fontSize:13 }}>Logout</button>}
//             </div>
//           </div>
//         </>
//       )}
//     </>
//   );
// };

// ── NavBar ────────────────────────────────────────────────────────────────────
const NavBar = ({
  page,
  setPage,
  cartCount,
  wishCount,
  user,
  onLogout,
  cartOpen,
  setCartOpen
}) => {

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);

    return () => window.removeEventListener("scroll", handler);
  }, []);

  const navLinksLeft = [
    { label: "Home", key: "home" },
    { label: "Shop", key: "shop" },
    { label: "About", key: "about" },
  ];

  const navLinksRight = [
    { label: "Contact", key: "contact" },
    { label: "Account", key: user ? "account" : "login" },
  ];

  const nav = (key) => {
    setPage(key);
    setMobileOpen(false);
  };

  return (
    <>
      {/* HEADER */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,

          background: scrolled
            ? "rgba(255,255,255,0.98)"
            : "rgba(255,255,255,0.94)",

          backdropFilter: "blur(14px)",

          borderBottom:
            "1px solid rgba(201,162,74,0.12)",

          transition: "all 0.4s ease",
        }}
      >

        {/* TOP STRIP */}
        <div
          style={{
            height: 24,
            background:"linear-gradient(90deg,#e8bcc7,#dca1b1,#e8bcc7)",

            color: "#fff",

            display: "flex",
            alignItems: "center",
            justifyContent: "center",

            fontSize: 11,
            letterSpacing: 3,
            fontWeight: 600,

            textTransform: "uppercase",
          }}
        >
          ✨ FREE SHIPPING OVER €50 ✨
        </div>

        {/* MAIN HEADER */}
        {/* MAIN HEADER */}
<div
  style={{
    maxWidth: 1400,
    margin: "0 auto",

    height: 78,

    position: "relative",

    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",

    padding:  "0 56px 0 170px",

    background:
      "linear-gradient(to right,#fcfbfa,#fff7f9,#fcfbfa)",
  }}
>

  {/* LEFT NAV */}
  <div
    className="hide-mobile"
    style={{
      display: "flex",
      alignItems: "center",
      gap: 32,

      width: "33%",
    }}
  >
    {navLinksLeft.map((l) => (
      <button
        key={l.key}
        className="btn-ghost"
        onClick={() => nav(l.key)}
        style={{
          fontSize: 13,
          letterSpacing: 3,
          textTransform: "uppercase",
          fontWeight: 500,

          color:
            page === l.key
              ? "var(--gold)"
              : "#3f3a37",

          borderBottom:
            page === l.key
              ? "1px solid var(--gold)"
              : "1px solid transparent",

          paddingBottom: 10,

          transition: "0.3s",
        }}
      >
        {l.label}
      </button>
    ))}
  </div>

  {/* LEFT FLOATING LOGO */}
<div
  onClick={() => nav("home")}
  style={{
    position: "absolute",

    left: 640,
    top: 0,

    zIndex: 200,

    cursor: "pointer",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }}
>
  <img
    src={monartLogo}
    className="logo-transparent"
    alt="MonArt"
    style={{
      height: 78,
      width: "auto",

      objectFit: "contain",

      // background: "transparent",

      // mixBlendMode: "multiply",

      filter:
        "drop-shadow(0 4px 10px rgba(0,0,0,0.05))",
    }}
  />
</div>

  {/* RIGHT SIDE */}
  <div
    className="hide-mobile"
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",

      gap: 32,

      width: "33%",
    }}
  >

    {/* RIGHT NAV */}
    {navLinksRight.map((l) => (
      <button
        key={l.key}
        className="btn-ghost"
        onClick={() => nav(l.key)}
        style={{
          fontSize: 13,
          letterSpacing: 3,
          textTransform: "uppercase",
          fontWeight: 500,

          color:
            page === l.key
              ? "var(--gold)"
              : "#3f3a37",

          borderBottom:
            page === l.key
              ? "1px solid var(--gold)"
              : "1px solid transparent",

          paddingBottom: 10,
        }}
      >
        {l.label}
      </button>
    ))}

    {/* SEARCH */}
    <button
      className="btn-ghost"
      onClick={() => setSearchOpen(true)}
      style={{
        padding: 8,
      }}
    >
      <Icon name="search" size={20} />
    </button>

    {/* WISHLIST */}
    <button
      className="btn-ghost"
      onClick={() => nav("wishlist")}
      style={{
        padding: 8,
        position: "relative",
      }}
    >
      <Icon
        name={
          wishCount > 0
            ? "heartFull"
            : "heart"
        }
        size={20}
        style={{
          color:
            wishCount > 0
              ? "var(--gold)"
              : undefined,
        }}
      />

      {wishCount > 0 && (
        <span
          className="badge"
          style={{
            background: "var(--gold)",
            color: "#fff",
          }}
        >
          {wishCount}
        </span>
      )}
    </button>

    {/* USER */}
    <button
      className="btn-ghost"
      onClick={() =>
        nav(user ? "account" : "login")
      }
      style={{
        padding: 8,
      }}
    >
      <Icon name="user" size={20} />
    </button>

    {/* CART */}
    <button
      className="btn-ghost"
      onClick={() => setCartOpen(true)}
      style={{
        padding: 8,
        position: "relative",
      }}
    >
      <Icon name="cart" size={22} />

      {cartCount > 0 && (
        <span
          className="badge"
          style={{
            background: "var(--gold)",
            color: "#fff",
          }}
        >
          {cartCount}
        </span>
      )}
    </button>
  </div>
</div>
      </nav>

      {/* MOBILE NAV */}
      {mobileOpen && (
        <>
          <div
            className="overlay"
            onClick={() => setMobileOpen(false)}
          />

          <div className="mobile-nav">

            <button
              className="btn-ghost"
              onClick={() => setMobileOpen(false)}
              style={{
                position: "absolute",
                top: 24,
                right: 24,
                fontSize: 20,
              }}
            >
              ✕
            </button>

            {/* MOBILE LOGO */}
            <div
              style={{
                textAlign: "center",
                marginBottom: 40,
              }}
            >
              <img
                src={monartLogo}
                alt="MonArt"
                style={{
                  height: 80,
                  objectFit: "contain",
                }}
              />
            </div>

            {/* MOBILE LINKS */}
            {[...navLinksLeft, ...navLinksRight].map(
              (l) => (
                <button
                  key={l.key}
                  className="btn-ghost"
                  onClick={() => nav(l.key)}
                  style={{
                    fontSize: 28,
                    fontFamily:
                      "var(--font-display)",

                    fontWeight: 300,
                    color: "var(--dark)",

                    padding: "14px 0",
                    textAlign: "left",
                  }}
                >
                  {l.label}
                </button>
              )
            )}

            {/* MOBILE ACTIONS */}
            <div
              style={{
                display: "flex",
                gap: 24,
                marginTop: 30,
              }}
            >
              <button
                className="btn-ghost"
                onClick={() => nav("wishlist")}
              >
                Wishlist ({wishCount})
              </button>

              <button
                className="btn-ghost"
                onClick={() => setCartOpen(true)}
              >
                Cart ({cartCount})
              </button>
            </div>

            {/* LOGOUT */}
            <div style={{ marginTop: "auto" }}>
              {user && (
                <button
                  className="btn-ghost"
                  onClick={() => {
                    onLogout();
                    setMobileOpen(false);
                  }}
                  style={{
                    color: "var(--stone)",
                    fontSize: 13,
                  }}
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

// ── Cart Drawer ───────────────────────────────────────────────────────────────
const CartDrawer = ({ open, onClose, cart, updateQty, removeItem, setPage, discountCode, setDiscountCode, discountPct, applyDiscount }) => {
  if (!open) return null;
  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const discountAmt = subtotal * (discountPct / 100);
  const total = subtotal - discountAmt;
  const [code, setCode] = useState(discountCode || "");

  return (
    <>
      <div className="overlay" onClick={onClose} />
      <div className="sidebar-drawer">
        <div className="drawer-header">
          <h3 style={{ fontFamily:"var(--font-display)", fontSize:22 }}>Your Cart ({cart.length})</h3>
          <button className="btn-ghost" onClick={onClose} style={{ fontSize:20 }}>✕</button>
        </div>

        <div className="drawer-body">
          {cart.length === 0 ? (
            <div style={{ textAlign:"center", padding:"60px 0", color:"var(--stone)" }}>
              <div style={{ fontSize:48, marginBottom:16 }}>🛍️</div>
              <p style={{ fontSize:15, fontFamily:"var(--font-display)", fontSize:22, marginBottom:8 }}>Your cart is empty</p>
              <p style={{ fontSize:13, color:"var(--stone)", marginBottom:24 }}>Add some handmade pieces to get started</p>
              <button className="btn-primary" onClick={onClose}>Continue Shopping</button>
            </div>
          ) : (
            <>
              {cart.map(item => (
                <div key={item.id} className="cart-item" style={{ alignItems:"center" }}>
                  <img src={item.images[0]} alt={item.name} className="cart-item-img" />
                  <div style={{ flex:1 }}>
                    <p style={{ fontSize:14, fontWeight:500, marginBottom:4 }}>{item.name}</p>
                    <p style={{ fontSize:13, color:"var(--stone)", marginBottom:8 }}>€{item.price}</p>
                    <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                      <div className="qty-control">
                        <button className="qty-btn" onClick={() => updateQty(item.id, item.qty - 1)}>−</button>
                        <span className="qty-val">{item.qty}</span>
                        <button className="qty-btn" onClick={() => updateQty(item.id, item.qty + 1)}>+</button>
                      </div>
                      <button className="btn-ghost" onClick={() => removeItem(item.id)} style={{ color:"var(--stone)", fontSize:13 }}>Remove</button>
                    </div>
                  </div>
                </div>
              ))}

              {/* Discount Code */}
              <div style={{ marginTop:24, padding:16, background:"var(--cream)", borderRadius:4 }}>
                <p style={{ fontSize:12, letterSpacing:1, textTransform:"uppercase", fontWeight:500, marginBottom:10 }}>Discount Code</p>
                <div style={{ display:"flex", gap:8 }}>
                  <input className="input" style={{ flex:1 }} placeholder="Enter code" value={code} onChange={e => setCode(e.target.value.toUpperCase())} />
                  <button className="btn-outline" style={{ padding:"10px 16px", fontSize:12, whiteSpace:"nowrap" }}
                    onClick={() => applyDiscount(code)}>Apply</button>
                </div>
                {discountPct > 0 && <p style={{ fontSize:12, color:"var(--sage)", marginTop:8, fontWeight:500 }}>✓ {discountPct}% discount applied!</p>}
              </div>
            </>
          )}
        </div>

        {cart.length > 0 && (
          <div className="drawer-footer">
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
              <span style={{ fontSize:13, color:"var(--stone)" }}>Subtotal</span>
              <span style={{ fontSize:13 }}>€{subtotal.toFixed(2)}</span>
            </div>
            {discountPct > 0 && (
              <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
                <span style={{ fontSize:13, color:"var(--sage)" }}>Discount ({discountPct}%)</span>
                <span style={{ fontSize:13, color:"var(--sage)" }}>−€{discountAmt.toFixed(2)}</span>
              </div>
            )}
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:20, paddingTop:8, borderTop:"1px solid var(--light)" }}>
              <span style={{ fontWeight:600, fontSize:15 }}>Total</span>
              <span style={{ fontWeight:600, fontSize:18, fontFamily:"var(--font-display)" }}>€{total.toFixed(2)}</span>
            </div>
            <button className="btn-primary" style={{ width:"100%", justifyContent:"center", fontSize:12 }}
              onClick={() => { onClose(); setPage("checkout"); }}>
              Proceed to Checkout
            </button>
            <p style={{ fontSize:11, color:"var(--stone)", textAlign:"center", marginTop:12 }}>🔒 Secure SSL checkout • Free returns</p>
          </div>
        )}
      </div>
    </>
  );
};

// ── Product Card ──────────────────────────────────────────────────────────────
const ProductCard = ({ product, onAddCart, onWishlist, isWishlisted, setPage, setSelectedProduct }) => {
  const [hovered, setHovered] = useState(false);
  const [imgIdx, setImgIdx] = useState(0);

  useEffect(() => {
    if (hovered && product.images.length > 1) setImgIdx(1);
    else setImgIdx(0);
  }, [hovered]);

  return (
    <div className="card-hover" style={{ background:"var(--white)", borderRadius:4, overflow:"hidden", border:"1px solid var(--light)", cursor:"pointer" }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>

      {/* Image */}
      <div className="img-zoom-container" style={{ position:"relative", paddingTop:"110%", background:"var(--cream)" }}
        onClick={() => { setSelectedProduct(product); setPage("product"); }}>
        <img src={product.images[imgIdx]} alt={product.name}
          style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", transition:"all 0.5s ease" }} />

        {/* Tags */}
        <div style={{ position:"absolute", top:12, left:12, display:"flex", flexDirection:"column", gap:6 }}>
          {product.tags.includes("sale") && <span className="chip" style={{ background:"var(--clay)", color:"var(--white)" }}>Sale</span>}
          {product.tags.includes("new") && <span className="chip" style={{ background:"var(--sage)", color:"var(--white)" }}>New</span>}
          {product.tags.includes("bestseller") && <span className="chip">Best Seller</span>}
        </div>

        {/* Wishlist */}
        <button className={`wish-btn ${isWishlisted ? "active" : ""}`} onClick={e => { e.stopPropagation(); onWishlist(product); }}>
          <span style={{ color: isWishlisted ? "var(--clay)" : "var(--stone)", fontSize:16 }}>{isWishlisted ? "♥" : "♡"}</span>
        </button>

        {/* Quick add (hover) */}
        {hovered && (
          <div style={{ position:"absolute", bottom:0, left:0, right:0, padding:12,
            background:"linear-gradient(transparent, rgba(46,37,33,0.7))", animation:"fadeIn 0.2s ease" }}>
            <button className="btn-primary" style={{ width:"100%", justifyContent:"center", fontSize:11, padding:"10px 0" }}
              onClick={e => { e.stopPropagation(); onAddCart(product); }}>
              Add to Cart
            </button>
          </div>
        )}
      </div>

      {/* Info */}
      <div style={{ padding:16 }} onClick={() => { setSelectedProduct(product); setPage("product"); }}>
        <p style={{ fontSize:11, letterSpacing:1.5, textTransform:"uppercase", color:"var(--stone)", marginBottom:4, fontWeight:500 }}>
          {product.category.replace("-"," ")}
        </p>
        <h3 style={{ fontFamily:"var(--font-display)", fontSize:17, fontWeight:400, color:"var(--dark)", marginBottom:6, lineHeight:1.2 }}>
          {product.name}
        </h3>
        <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8 }}>
          <Stars rating={product.rating} size={11} />
          <span style={{ fontSize:11, color:"var(--stone)" }}>({product.reviews})</span>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          {product.originalPrice && <span className="price-orig">€{product.originalPrice}</span>}
          <span className="price-sale" style={{ fontSize:16, fontFamily:"var(--font-display)" }}>€{product.price}</span>
        </div>
      </div>
    </div>
  );
};

// ── Home Page ─────────────────────────────────────────────────────────────────
const HomePage = ({ products, onAddCart, onWishlist, wishlist, setPage, setSelectedProduct }) => {
  const featured = products.filter(p => p.featured);
  const [activeSlide, setActiveSlide] = useState(0);

  const categories = [
    { name: "Earrings", key: "earrings", emoji: "💎", desc: "Bold & Dainty" },
    { name: "Studs", key: "studs", emoji: "⭕", desc: "Everyday Essentials" },
    { name: "Rings", key: "rings", emoji: "💍", desc: "Stack & Layer" },
    { name: "Necklace Sets", key: "necklace-sets", emoji: "📿", desc: "Curated Collections" },
  ];

  return (
    <div>
      {/* Hero */}
      {/* <section className="hero texture-bg" style={{ background:"linear-gradient(135deg, var(--cream) 0%, var(--blush) 60%, var(--light) 100%)" }}> */}
      <section
  className="hero texture-bg"
  style={{
    background:
      "linear-gradient(135deg,#fdf8f9 0%,#faedf1 45%,#f8f5f0 100%)",

    width: "100%",
    overflow: "hidden", textAlign:"center",
  }}
>  
        <div
  className="container hero-content"
  style={{
    paddingTop:160,
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    textAlign:"center",
  }}
>
          <div style={{ maxWidth:720, width: "100%", }}>
            <p className="section-subtitle fade-up">✦ Handcrafted with Love ✦</p>
            <h1 className="section-title fade-up fade-up-1" style={{ fontSize:"clamp(44px,7vw,80px)", marginBottom:24, lineHeight:1.05 }}>
              Wear Something<br /><em style={{ color:"var(--clay)" }}>Made for You</em>
            </h1>
            <p
  className="fade-up fade-up-2"
  style={{
    fontSize:16,
    color:"var(--mid)",
    marginBottom:36,
    maxWidth:520,
    lineHeight:1.8,
    marginLeft:"auto",
    marginRight:"auto",
    textAlign:"center",
  }}
>
              Each piece is hand-rolled, shaped, and finished by one pair of loving hands. No two pieces are ever exactly alike.
            </p>
            <div
  className="fade-up fade-up-3"
  style={{
    display:"flex",
    gap:16,
    flexWrap:"wrap",
    justifyContent:"center",
  }}
>
              <button className="btn-primary" onClick={() => setPage("shop")}>
                Shop Collection →
              </button>
              <button className="btn-outline" onClick={() => setPage("about")}>
                Our Story
              </button>
            </div>

            {/* Stats */}
            <div
  className="fade-up fade-up-4"
  style={{
    display:"flex",
    gap:40,
    marginTop:48,
    justifyContent:"center",
    flexWrap:"wrap",
  }}
>
              {[["500+","Happy Customers"],["100%","Handcrafted"],["Free","Shipping Over €50"]].map(([num,label]) => (
                <div key={label}>
                  <div style={{ fontFamily:"var(--font-display)", fontSize:28, color:"var(--clay)", lineHeight:1 }}>{num}</div>
                  <div style={{ fontSize:11, letterSpacing:1, textTransform:"uppercase", color:"var(--stone)", fontWeight:500 }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Floating clay shapes */}
        <div style={{ position:"absolute", right:"5%", top:"15%", fontSize:80, opacity:0.15, userSelect:"none", animation:"fadeIn 1s ease 0.5s both" }}>○</div>
        <div style={{ position:"absolute", right:"18%", bottom:"20%", fontSize:120, opacity:0.08, userSelect:"none" }}>◇</div>
        <div style={{ position:"absolute", right:"30%", top:"30%", fontSize:40, opacity:0.12, userSelect:"none", color:"var(--clay)" }}>✦</div>
      </section>

      {/* Categories */}
      <section style={{ padding:"80px 0", background:"var(--white)" }}>
        <div className="container">
          <div style={{ textAlign:"center", marginBottom:48 }}>
            <p className="section-subtitle">Browse By Category</p>
            <h2 className="section-title">Find Your Style</h2>
          </div>
          <div className="four-col"> 
            {categories.map((cat, i) => (
              <button key={cat.key} className="btn-ghost card-hover"
                onClick={() => setPage("shop")}
                style={{
                  display:"flex", flexDirection:"column", alignItems:"center",
                  padding:"32px 20px", background:"var(--cream)", borderRadius:4,
                  border:"1px solid var(--light)", width:"100%",
                  animation:`fadeUp 0.6s ease ${i * 0.1}s both`,
                }}>
                <div style={{ fontSize:40, marginBottom:16 }}>{cat.emoji}</div>
                <h3 style={{ fontFamily:"var(--font-display)", fontSize:20, marginBottom:4 }}>{cat.name}</h3>
                <p style={{ fontSize:12, color:"var(--stone)", letterSpacing:1, textTransform:"uppercase", fontWeight:500 }}>{cat.desc}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section style={{ padding:"80px 0" }}>
        <div className="container">
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:48 }}>
            <div>
              <p className="section-subtitle">Handpicked For You</p>
              <h2 className="section-title">Featured Pieces</h2>
            </div>
            <button className="btn-outline" onClick={() => setPage("shop")}>View All</button>
          </div>
          <div className="product-grid">
            {featured.map(p => (
              <ProductCard key={p.id} product={p}
                onAddCart={onAddCart} onWishlist={onWishlist}
                isWishlisted={wishlist.some(w => w.id === p.id)}
                setPage={setPage} setSelectedProduct={setSelectedProduct} />
            ))}
          </div>
        </div>
      </section>

      {/* Banner */}
      {/* <section style={{ padding:"80px 0", background:"var(--dark)" }}> */}
      <section
  style={{
    padding: "120px 0",
    background:
      "linear-gradient(135deg,#111 0%,#1f1f1f 100%)",
  }}
>
        <div className="container" style={{ textAlign:"center", maxWidth:1200, }}>
          <p style={{ fontSize:13, letterSpacing:3, textTransform:"uppercase", color:"var(--blush)", fontWeight:500, marginBottom:16 }}>
            ✦ Limited Time ✦
          </p>
          <h2 style={{ fontFamily:"var(--font-display)", fontSize:"clamp(32px,5vw,60px)", color:"var(--white)", marginBottom:20, fontWeight:300, maxWidth:900,
margin:"0 auto 20px", fontStyle:"italic" }}>
            Use code HELLO10 for 10% off<br />your first order
          </h2>
          <p style={{ fontSize:14, color:"rgba(255,253,249,0.6)", marginBottom:32 }}>
            Free shipping on all orders over €50 · Gift wrapping available
          </p>
          <button className="btn-primary" onClick={() => setPage("shop")} style={{ background:"var(--blush)", color:"var(--dark)" }}>
            Shop Now →
          </button>
        </div>
      </section>

      {/* Trust Badges */}
      <section style={{ padding:"60px 0", background:"var(--cream)", borderTop:"1px solid var(--light)" }}>
        <div className="container">
          <div className="four-col" style={{ textAlign:"center" }}>
            {[
              { icon:"🎨", title:"Handcrafted", desc:"Every piece made by hand" },
              { icon:"🚚", title:"Free Shipping", desc:"On orders over €50" },
              { icon:"↩️", title:"Easy Returns", desc:"30-day return policy" },
              { icon:"📦", title:"Gift Wrapping", desc:"Beautiful packaging" },
            ].map(b => (
              <div key={b.title} style={{ padding:"24px 16px" }}>
                <div style={{ fontSize:32, marginBottom:12 }}>{b.icon}</div>
                <h4 style={{ fontFamily:"var(--font-display)", fontSize:18, marginBottom:6 }}>{b.title}</h4>
                <p style={{ fontSize:13, color:"var(--stone)" }}>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ padding:"80px 0", background:"var(--white)" }}>
        <div className="container">
          <div style={{ textAlign:"center", marginBottom:48 }}>
            <p className="section-subtitle">From Our Customers</p>
            <h2 className="section-title">Real Love Stories</h2>
          </div>
          <div className="three-col">
            {[
              { name:"Sophie M.", text:"I ordered the sage necklace set and I haven't taken it off. The quality is incredible for the price!", rating:5 },
              { name:"Emma T.", text:"The packaging alone made me cry happy tears. Such thoughtful, beautiful work. Definitely a repeat customer.", rating:5 },
              { name:"Lily R.", text:"Got the terracotta hoops for my birthday and received 10 compliments in one day. Moica's Art never misses!", rating:5 },
            ].map((r, i) => (
              <div key={i} className="review-card" style={{ animation:`fadeUp 0.6s ease ${i * 0.15}s both` }}>
                <Stars rating={r.rating} size={14} />
                <p style={{ fontSize:15, fontFamily:"var(--font-display)", fontStyle:"italic", lineHeight:1.7, margin:"16px 0", color:"var(--mid)" }}>
                  "{r.text}"
                </p>
                <p style={{ fontSize:12, letterSpacing:1, textTransform:"uppercase", fontWeight:600, color:"var(--clay)" }}>— {r.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section style={{ padding:"80px 0", background:"var(--blush)" }}>
        <div className="container-xs" style={{ textAlign:"center" }}>
          <p className="section-subtitle">Join The Clay Club</p>
          <h2 className="section-title" style={{ marginBottom:16 }}>Get First Access to New Collections</h2>
          <p style={{ fontSize:14, color:"var(--mid)", marginBottom:32 }}>Plus 10% off your first order when you sign up.</p>
          <div style={{ display:"flex", gap:12, maxWidth:440, margin:"0 auto" }}>
            <input className="input" placeholder="Your email address" style={{ flex:1 }} />
            <button className="btn-primary" style={{ whiteSpace:"nowrap" }}>Subscribe</button>
          </div>
        </div>
      </section>
    </div>
  );
};

// ── Shop Page ─────────────────────────────────────────────────────────────────
const ShopPage = ({ products, onAddCart, onWishlist, wishlist, setPage, setSelectedProduct }) => {
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("featured");
  const [priceRange, setPriceRange] = useState([0, 100]);

  const categories = ["all", "earrings", "studs", "rings", "necklace-sets"];

  const filtered = products
    .filter(p => category === "all" || p.category === category)
    .filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase()))
    .filter(p => p.price >= priceRange[0] && p.price <= priceRange[1])
    .sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      if (sort === "rating") return b.rating - a.rating;
      if (sort === "newest") return b.tags.includes("new") ? 1 : -1;
      return b.featured - a.featured;
    });

  return (
    <div style={{ paddingTop:64 }}>
      {/* Header */}
      <div style={{ background:"var(--blush)", padding:"60px 0 40px" }}>
        <div className="container">
          <p className="section-subtitle">All Collections</p>
          <h1 className="section-title">Shop Handmade Jewelry</h1>
        </div>
      </div>

      <div className="container" style={{ padding:"40px 24px" }}>
        {/* Filters Bar */}
        <div style={{ display:"flex", gap:16, flexWrap:"wrap", alignItems:"center", marginBottom:32, paddingBottom:24, borderBottom:"1px solid var(--light)" }}>
          {/* Category Filters */}
          <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
            {categories.map(cat => (
              <button key={cat} className={`filter-pill ${category === cat ? "active" : ""}`} onClick={() => setCategory(cat)}>
                {cat === "all" ? "All" : cat.replace("-", " ")}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="search-wrap" style={{ flex:1, minWidth:200 }}>
            <span className="search-icon" style={{ fontSize:16 }}>⌕</span>
            <input className="input" placeholder="Search products..." value={search} onChange={e => setSearch(e.target.value)} style={{ paddingLeft:40 }} />
          </div>

          {/* Sort */}
          <select className="input" style={{ width:"auto", minWidth:160 }} value={sort} onChange={e => setSort(e.target.value)}>
            <option value="featured">Featured</option>
            <option value="newest">Newest</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>

        {/* Results Count */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:24 }}>
          <p style={{ fontSize:13, color:"var(--stone)" }}>
            Showing <strong>{filtered.length}</strong> {filtered.length === 1 ? "piece" : "pieces"}
          </p>
        </div>

        {/* Product Grid */}
        {filtered.length > 0 ? (
          <div className="product-grid">
            {filtered.map(p => (
              <ProductCard key={p.id} product={p}
                onAddCart={onAddCart} onWishlist={onWishlist}
                isWishlisted={wishlist.some(w => w.id === p.id)}
                setPage={setPage} setSelectedProduct={setSelectedProduct} />
            ))}
          </div>
        ) : (
          <div style={{ textAlign:"center", padding:"80px 0", color:"var(--stone)" }}>
            <div style={{ fontSize:48, marginBottom:16 }}>🔍</div>
            <h3 style={{ fontFamily:"var(--font-display)", fontSize:24, marginBottom:8 }}>No pieces found</h3>
            <p style={{ fontSize:14 }}>Try adjusting your filters or search term</p>
          </div>
        )}
      </div>
    </div>
  );
};

// ── Product Detail Page ───────────────────────────────────────────────────────
const ProductPage = ({ product, onAddCart, onWishlist, wishlist, setPage, products, setSelectedProduct }) => {
  const [activeImg, setActiveImg] = useState(0);
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [submittedReview, setSubmittedReview] = useState(false);
  const [accordionOpen, setAccordionOpen] = useState(null);

  if (!product) return null;

  const reviews = REVIEWS[product.id] || [];
  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 3);
  const isWishlisted = wishlist.some(w => w.id === product.id);

  const faqs = [
    { q: "What materials are used?", a: "We use premium Japanese Fimo and Sculpey polymer clay, which is non-toxic, lightweight, and durable. All metal components are hypoallergenic stainless steel or 18K gold-filled." },
    { q: "How do I care for my jewelry?", a: "Keep away from water, perfumes, and lotions. Store in the included pouch. Wipe gently with a soft, dry cloth if needed." },
    { q: "Can I request a custom color?", a: "Yes! Send us a message via our Contact page with your color request. Custom orders take 7–10 business days." },
  ];

  return (
    <div style={{ paddingTop:80 }} className="page-enter">
      <div className="container" style={{ padding:"40px 24px" }}>
        {/* Breadcrumb */}
        <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:32, fontSize:13, color:"var(--stone)" }}>
          <button className="btn-ghost" style={{ fontSize:13, color:"var(--stone)" }} onClick={() => setPage("home")}>Home</button>
          <span>›</span>
          <button className="btn-ghost" style={{ fontSize:13, color:"var(--stone)" }} onClick={() => setPage("shop")}>Shop</button>
          <span>›</span>
          <span style={{ color:"var(--dark)" }}>{product.name}</span>
        </div>

        {/* Main Layout */}
        <div className="two-col" style={{ gap:60 }}>
          {/* Images */}
          <div>
            <div style={{ position:"relative", paddingTop:"100%", background:"var(--cream)", borderRadius:4, overflow:"hidden", marginBottom:12 }}>
              <img src={product.images[activeImg]} alt={product.name}
                style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", transition:"all 0.4s ease" }} />
              {/* Tag overlays */}
              <div style={{ position:"absolute", top:16, left:16 }}>
                {product.tags.includes("sale") && <span className="chip" style={{ background:"var(--clay)", color:"var(--white)" }}>Sale</span>}
                {product.tags.includes("new") && <span className="chip" style={{ background:"var(--sage)", color:"var(--white)", marginLeft:6 }}>New</span>}
              </div>
            </div>
            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div style={{ display:"flex", gap:8 }}>
                {product.images.map((img, i) => (
                  <button key={i} onClick={() => setActiveImg(i)}
                    style={{ flex:1, paddingTop:"25%", position:"relative", border: activeImg === i ? "2px solid var(--clay)" : "2px solid var(--light)", borderRadius:4, overflow:"hidden", cursor:"pointer", background:"none" }}>
                    <img src={img} alt="" style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover" }} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            <p style={{ fontSize:12, letterSpacing:2, textTransform:"uppercase", color:"var(--stone)", fontWeight:500, marginBottom:8 }}>
              {product.category.replace("-", " ")}
            </p>
            <h1 style={{ fontFamily:"var(--font-display)", fontSize:"clamp(28px,4vw,40px)", color:"var(--dark)", marginBottom:12, fontWeight:300, lineHeight:1.1 }}>
              {product.name}
            </h1>

            {/* Rating */}
            <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:20 }}>
              <Stars rating={product.rating} size={14} />
              <span style={{ fontSize:13, color:"var(--stone)" }}>{product.rating} ({product.reviews} reviews)</span>
            </div>

            {/* Price */}
            <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:24 }}>
              {product.originalPrice && <span className="price-orig" style={{ fontSize:16 }}>€{product.originalPrice}</span>}
              <span style={{ fontFamily:"var(--font-display)", fontSize:36, color:"var(--clay)", fontWeight:400 }}>€{product.price}</span>
              {product.originalPrice && <span className="chip">Save ${product.originalPrice - product.price}</span>}
            </div>

            {/* Description */}
            <p style={{ fontSize:15, color:"var(--mid)", lineHeight:1.8, marginBottom:24 }}>{product.description}</p>

            {/* Details */}
            <div style={{ background:"var(--cream)", padding:16, borderRadius:4, marginBottom:24, borderLeft:"3px solid var(--blush)" }}>
              <p style={{ fontSize:13, color:"var(--stone)", lineHeight:1.8 }}>{product.details}</p>
            </div>

            {/* Stock */}
            <div style={{ marginBottom:20 }}>
              {product.stock <= 5 ? (
                <p style={{ fontSize:12, color:"var(--clay)", fontWeight:600, letterSpacing:1 }}>
                  ⚠️ Only {product.stock} left in stock!
                </p>
              ) : (
                <p style={{ fontSize:12, color:"var(--sage)", fontWeight:500 }}>✓ In Stock ({product.stock} available)</p>
              )}
            </div>

            {/* Quantity + CTA */}
            <div style={{ display:"flex", gap:12, marginBottom:16, flexWrap:"wrap" }}>
              <div className="qty-control">
                <button className="qty-btn" onClick={() => setQty(q => Math.max(1, q-1))}>−</button>
                <span className="qty-val">{qty}</span>
                <button className="qty-btn" onClick={() => setQty(q => Math.min(product.stock, q+1))}>+</button>
              </div>
              <button className="btn-primary" style={{ flex:1, justifyContent:"center", minWidth:180 }}
                onClick={() => onAddCart(product, qty)}>
                Add to Cart
              </button>
              <button className={`btn-outline ${isWishlisted ? "active" : ""}`} style={{ padding:"12px 16px" }}
                onClick={() => onWishlist(product)}>
                {isWishlisted ? "♥" : "♡"}
              </button>
            </div>

            {/* Trust */}
            <div style={{ display:"flex", gap:20, flexWrap:"wrap", padding:"16px 0", borderTop:"1px solid var(--light)" }}>
              {[["🚚","Free shipping over €50"],["🎁","Gift wrapped"],["↩️","30-day returns"],["🔒","Secure checkout"]].map(([icon,txt]) => (
                <div key={txt} style={{ display:"flex", alignItems:"center", gap:6, fontSize:12, color:"var(--stone)" }}>
                  <span>{icon}</span> {txt}
                </div>
              ))}
            </div>

            {/* FAQs */}
            <div style={{ marginTop:24 }}>
              {faqs.map((faq, i) => (
                <div key={i} className="accordion-item">
                  <button className="accordion-btn" onClick={() => setAccordionOpen(accordionOpen === i ? null : i)}>
                    {faq.q}
                    <span style={{ fontSize:16, color:"var(--stone)" }}>{accordionOpen === i ? "−" : "+"}</span>
                  </button>
                  {accordionOpen === i && <div className="accordion-body">{faq.a}</div>}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs: Description / Reviews */}
        <div style={{ marginTop:60 }}>
          <div style={{ display:"flex", gap:0, borderBottom:"1px solid var(--light)", marginBottom:32 }}>
            {["description","reviews"].map(tab => (
              <button key={tab} className="btn-ghost"
                style={{ padding:"14px 24px", fontSize:12, letterSpacing:2, textTransform:"uppercase", fontWeight:500,
                  color: activeTab === tab ? "var(--clay)" : "var(--stone)",
                  borderBottom: activeTab === tab ? "2px solid var(--clay)" : "2px solid transparent",
                  marginBottom:"-1px" }}
                onClick={() => setActiveTab(tab)}>
                {tab === "reviews" ? `Reviews (${reviews.length})` : tab}
              </button>
            ))}
          </div>

          {activeTab === "description" && (
            <div style={{ maxWidth:700 }}>
              <p style={{ fontSize:15, color:"var(--mid)", lineHeight:1.9, marginBottom:24 }}>{product.description}</p>
              <p style={{ fontSize:15, color:"var(--mid)", lineHeight:1.9 }}>{product.details}</p>
            </div>
          )}

          {activeTab === "reviews" && (
            <div>
              {/* Review summary */}
              <div style={{ display:"flex", gap:40, marginBottom:40, flexWrap:"wrap" }}>
                <div style={{ textAlign:"center" }}>
                  <div style={{ fontFamily:"var(--font-display)", fontSize:56, color:"var(--clay)", lineHeight:1 }}>{product.rating}</div>
                  <Stars rating={product.rating} size={16} />
                  <p style={{ fontSize:12, color:"var(--stone)", marginTop:4 }}>{product.reviews} reviews</p>
                </div>
                <div style={{ flex:1, minWidth:200 }}>
                  {[5,4,3,2,1].map(star => {
                    const cnt = reviews.filter(r => r.rating === star).length;
                    const pct = reviews.length ? (cnt / reviews.length) * 100 : star === 5 ? 80 : star === 4 ? 15 : 5;
                    return (
                      <div key={star} style={{ display:"flex", alignItems:"center", gap:12, marginBottom:6 }}>
                        <span style={{ fontSize:12, width:12 }}>{star}</span>
                        <span style={{ fontSize:12, color:"var(--stone)" }}>★</span>
                        <div className="progress-bar" style={{ flex:1 }}>
                          <div className="progress-fill" style={{ width:`${pct}%` }} />
                        </div>
                        <span style={{ fontSize:12, color:"var(--stone)", width:24 }}>{Math.round(pct)}%</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Review list */}
              <div style={{ display:"flex", flexDirection:"column", gap:16, marginBottom:40 }}>
                {reviews.map(r => (
                  <div key={r.id} className="review-card">
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8 }}>
                      <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                        <div style={{ width:36, height:36, borderRadius:"50%", background:"var(--blush)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:14, fontWeight:600, color:"var(--clay)" }}>
                          {r.user[0]}
                        </div>
                        <div>
                          <p style={{ fontWeight:600, fontSize:14 }}>{r.user}</p>
                          <Stars rating={r.rating} size={11} />
                        </div>
                      </div>
                      <span style={{ fontSize:12, color:"var(--stone)" }}>{r.date}</span>
                    </div>
                    <p style={{ fontSize:14, color:"var(--mid)", lineHeight:1.7 }}>{r.text}</p>
                  </div>
                ))}

                {reviews.length === 0 && (
                  <p style={{ fontSize:14, color:"var(--stone)", textAlign:"center", padding:"32px 0" }}>No reviews yet. Be the first to review this product!</p>
                )}
              </div>

              {/* Write review */}
              {!submittedReview ? (
                <div style={{ background:"var(--cream)", padding:24, borderRadius:4 }}>
                  <h3 style={{ fontFamily:"var(--font-display)", fontSize:22, marginBottom:20 }}>Write a Review</h3>
                  <div style={{ marginBottom:16 }}>
                    <label style={{ fontSize:12, letterSpacing:1, textTransform:"uppercase", fontWeight:500, display:"block", marginBottom:8 }}>Your Rating</label>
                    <div style={{ display:"flex", gap:4 }}>
                      {[1,2,3,4,5].map(s => (
                        <button key={s} className="btn-ghost" style={{ fontSize:24, color: s <= reviewRating ? "var(--clay)" : "var(--light)" }}
                          onClick={() => setReviewRating(s)}>★</button>
                      ))}
                    </div>
                  </div>
                  <textarea className="input" rows={4} placeholder="Share your experience with this piece..." style={{ resize:"vertical" }}
                    value={reviewText} onChange={e => setReviewText(e.target.value)} />
                  <button className="btn-primary" style={{ marginTop:16 }}
                    onClick={() => { if(reviewText.trim()) setSubmittedReview(true); }}>
                    Submit Review
                  </button>
                </div>
              ) : (
                <div style={{ background:"#D4EDDA", padding:24, borderRadius:4, textAlign:"center" }}>
                  <p style={{ fontSize:16, color:"#155724", fontFamily:"var(--font-display)" }}>✓ Thank you for your review!</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div style={{ marginTop:80 }}>
            <h2 style={{ fontFamily:"var(--font-display)", fontSize:36, marginBottom:32 }}>You May Also Love</h2>
            <div className="product-grid">
              {related.map(p => (
                <ProductCard key={p.id} product={p} onAddCart={onAddCart} onWishlist={onWishlist}
                  isWishlisted={wishlist.some(w => w.id === p.id)}
                  setPage={setPage} setSelectedProduct={setSelectedProduct} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ── Cart Page ─────────────────────────────────────────────────────────────────
const CartPage = ({ cart, updateQty, removeItem, setPage, discountCode, setDiscountCode, discountPct, applyDiscount }) => {
  const [code, setCode] = useState(discountCode || "");
  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const discountAmt = subtotal * (discountPct / 100);
  const shipping = subtotal >= 50 ? 0 : 5.99;
  const total = subtotal - discountAmt + shipping;

  return (
    <div style={{ paddingTop:80 }} className="page-enter">
      <div style={{ background:"var(--blush)", padding:"60px 0 40px" }}>
        <div className="container">
          <h1 className="section-title">Your Cart</h1>
        </div>
      </div>

      <div className="container" style={{ padding:"48px 24px" }}>
        {cart.length === 0 ? (
          <div style={{ textAlign:"center", padding:"80px 0" }}>
            <div style={{ fontSize:64, marginBottom:24 }}>🛍️</div>
            <h2 style={{ fontFamily:"var(--font-display)", fontSize:36, marginBottom:12 }}>Your cart is empty</h2>
            <p style={{ color:"var(--stone)", marginBottom:32 }}>Start adding some beautiful handmade pieces!</p>
            <button className="btn-primary" onClick={() => setPage("shop")}>Shop Now</button>
          </div>
        ) : (
          <div style={{ display:"grid", gridTemplateColumns:"1fr 340px", gap:48, alignItems:"start" }}>
            {/* Cart Items */}
            <div>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:24, paddingBottom:16, borderBottom:"1px solid var(--light)" }}>
                <h2 style={{ fontFamily:"var(--font-display)", fontSize:24 }}>{cart.length} {cart.length === 1 ? "item" : "items"}</h2>
                <button className="btn-ghost" style={{ fontSize:13, color:"var(--stone)" }}
                  onClick={() => { if(window.confirm("Clear cart?")) cart.forEach(i => removeItem(i.id)); }}>
                  Clear All
                </button>
              </div>

              {cart.map(item => (
                <div key={item.id} className="cart-item">
                  <img src={item.images[0]} alt={item.name} className="cart-item-img" style={{ width:100, height:100 }} />
                  <div style={{ flex:1 }}>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:4 }}>
                      <h3 style={{ fontFamily:"var(--font-display)", fontSize:18, fontWeight:400 }}>{item.name}</h3>
                      <p style={{ fontFamily:"var(--font-display)", fontSize:20, color:"var(--clay)" }}>€{(item.price * item.qty).toFixed(2)}</p>
                    </div>
                    <p style={{ fontSize:13, color:"var(--stone)", marginBottom:12, textTransform:"capitalize" }}>{item.category.replace("-", " ")}</p>
                    <div style={{ display:"flex", alignItems:"center", gap:16 }}>
                      <div className="qty-control">
                        <button className="qty-btn" onClick={() => updateQty(item.id, item.qty - 1)}>−</button>
                        <span className="qty-val">{item.qty}</span>
                        <button className="qty-btn" onClick={() => updateQty(item.id, item.qty + 1)}>+</button>
                      </div>
                      <button className="btn-ghost" onClick={() => removeItem(item.id)} style={{ color:"var(--stone)", fontSize:13 }}>Remove</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div style={{ background:"var(--cream)", padding:28, borderRadius:4, border:"1px solid var(--light)", position:"sticky", top:84 }}>
              <h3 style={{ fontFamily:"var(--font-display)", fontSize:22, marginBottom:20 }}>Order Summary</h3>

              {/* Discount code */}
              <div style={{ marginBottom:20 }}>
                <label style={{ fontSize:12, letterSpacing:1, textTransform:"uppercase", fontWeight:500, display:"block", marginBottom:8, color:"var(--stone)" }}>Discount Code</label>
                <div style={{ display:"flex", gap:8 }}>
                  <input className="input" placeholder="Enter code" value={code} onChange={e => setCode(e.target.value.toUpperCase())} style={{ flex:1, fontSize:13 }} />
                  <button className="btn-outline" style={{ padding:"10px 14px", fontSize:12 }} onClick={() => applyDiscount(code)}>Apply</button>
                </div>
                {discountPct > 0 && <p style={{ fontSize:12, color:"var(--sage)", marginTop:6, fontWeight:500 }}>✓ {discountPct}% off applied!</p>}
              </div>

              <div className="divider" />

              {[
                ["Subtotal", `€${subtotal.toFixed(2)}`],
                discountPct > 0 ? [`Discount (€{discountPct}%)`, `-$€{discountAmt.toFixed(2)}`] : null,
                ["Shipping", shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`],
              ].filter(Boolean).map(([label, val]) => (
                <div key={label} style={{ display:"flex", justifyContent:"space-between", marginBottom:10, fontSize:14 }}>
                  <span style={{ color: label.startsWith("Discount") ? "var(--sage)" : "var(--stone)" }}>{label}</span>
                  <span style={{ color: label.startsWith("Discount") ? "var(--sage)" : undefined }}>{val}</span>
                </div>
              ))}

              {shipping === 0 && (
                <p style={{ fontSize:11, color:"var(--sage)", fontWeight:500, marginBottom:12 }}>🚚 You've unlocked free shipping!</p>
              )}
              {shipping > 0 && (
                <p style={{ fontSize:11, color:"var(--stone)", marginBottom:12 }}>
                  Add €{(50 - subtotal).toFixed(2)} more for free shipping
                </p>
              )}

              <div className="divider" />

              <div style={{ display:"flex", justifyContent:"space-between", marginBottom:20 }}>
                <span style={{ fontWeight:600, fontSize:15 }}>Total</span>
                <span style={{ fontFamily:"var(--font-display)", fontSize:26, color:"var(--clay)" }}>€{total.toFixed(2)}</span>
              </div>

              <button className="btn-primary" style={{ width:"100%", justifyContent:"center", fontSize:12 }} onClick={() => setPage("checkout")}>
                Proceed to Checkout →
              </button>

              <div style={{ marginTop:16, textAlign:"center" }}>
                <p style={{ fontSize:11, color:"var(--stone)", marginBottom:8 }}>🔒 Secure SSL encrypted checkout</p>
                <div style={{ display:"flex", justifyContent:"center", gap:8 }}>
                  {["VISA","MC","AMEX","PayPal"].map(c => (
                    <span key={c} style={{ fontSize:10, padding:"3px 6px", border:"1px solid var(--light)", borderRadius:2, color:"var(--stone)" }}>{c}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ── Checkout Page ─────────────────────────────────────────────────────────────
const CheckoutPage = ({ cart, setPage, user, discountPct, clearCart, showToast, setShippingData }) => {

  const stripe = useStripe();
  const elements = useElements();

  const [step, setStep] = useState(1);
  const [shipping, setShipping] = useState({ firstName:"", lastName:"", email: user?.email || "", phone:"", address:"", city:"", state:"", zip:"", country:"DE" });
  const [payment, setPayment] = useState({ cardNum:"", expiry:"", cvv:"", name:"" });
  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const discountAmt = subtotal * (discountPct / 100);
  const shippingCost = subtotal >= 50 ? 0 : 5.99;
  const total = subtotal - discountAmt + shippingCost;
  const [clientSecret, setClientSecret] = useState("");
  const orderRef = useRef(false);

  useEffect(() => {
  if (step === 2) {
    console.log("🔥 FETCHING PAYMENT INTENT...");
    fetch("https://monart-backend.onrender.com/api/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ amount: total })
    })
    .then(res => res.json())
    .then(data => {
      console.log("FULL RESPONSE:", data);
      console.log("CLIENT SECRET:", data.clientSecret);
      setClientSecret(data.clientSecret);
    })
    .catch(err => console.error(err));
  }
}, [step]);


const handlePlaceOrder = async () => {

  if (orderRef.current) return;
  orderRef.current = true;

  // 🚨 FORCE SAVE DATA BEFORE PAYMENT
const safeCart = JSON.stringify(cart);
const safeShipping = JSON.stringify(shipping);

// 🔥 DEBUG
console.log("SAVING CART:", cart);
console.log("SAVING SHIPPING:", shipping);

localStorage.setItem("checkout_cart", safeCart);
localStorage.setItem("checkout_shipping", safeShipping);

// 🚨 VERIFY IMMEDIATELY
console.log("STORED CART:", localStorage.getItem("checkout_cart"));
console.log("STORED SHIPPING:", localStorage.getItem("checkout_shipping"));

// 🛑 VALIDATION (ADD THIS HERE)
  if (!cart.length || !shipping.email) {
    showToast("Missing checkout data ❌", "error");
    orderRef.current = false;
    return;
  }

  if (!stripe || !elements || !clientSecret) {
    showToast("Payment not ready ❌", "error");
    orderRef.current = false;
    return;
  }

  setLoading(true);

  try {
    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.origin + "/success",
        payment_method_data: {
          billing_details: {
            name: payment.name,
            email: shipping.email,
            address: {
              line1: shipping.address,
              city: shipping.city,
              postal_code: shipping.zip,
              country: shipping.country,
            },
          },
        },
      },
      // redirect: "if_required",
      redirect: "always"
    });

    if (result.error) {
      showToast(result.error.message, "error");
      setLoading(false);
      orderRef.current = false;
      return;
    }

    // // ✅ ONLY for card (no redirect)
    // if (result.paymentIntent?.status === "succeeded") {

    //   const res = await fetch("https://monart-backend.onrender.com/api/orders", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({
    //       userEmail: user?.email,
    //       items: cart,
    //       total: total,
    //       shipping: shipping,
    //       paymentIntentId: result.paymentIntent.id
    //     })
    //   });

    //   const data = await res.json();

    //   if (!res.ok) {
    //     console.error("Order failed:", data);
    //     orderRef.current = false;
    //     return;
    //   }

    //   setOrderPlaced(true);
    //   clearCart();
    //   showToast("Payment successful 🎉");
    // }
    if (result.paymentIntent?.status === "succeeded") {
  clearCart();
  showToast("Payment successful 🎉");

  // optional
  window.location.href = "/success";
}
  } catch (err) {
    console.error(err);
    showToast("Payment failed ❌", "error");
    setLoading(false);
    orderRef.current = false;
  }
};

  // if (orderPlaced) {
  //   return (
  //     <div style={{ paddingTop:80, minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center" }} className="page-enter">
  //       <div style={{ textAlign:"center", maxWidth:500, padding:48 }}>
  //         <div style={{ width:80, height:80, borderRadius:"50%", background:"var(--sage)", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 24px", fontSize:36 }}>✓</div>
  //         <h1 style={{ fontFamily:"var(--font-display)", fontSize:40, marginBottom:12, color:"var(--dark)" }}>Order Confirmed!</h1>
  //         <p style={{ fontSize:15, color:"var(--mid)", lineHeight:1.8, marginBottom:8 }}>
  //           Thank you for your order! Your handmade pieces are being prepared with love. You'll receive a confirmation email shortly.
  //         </p>
  //         <p style={{ fontSize:13, color:"var(--stone)", marginBottom:32 }}>Order #ORD-{Math.floor(Math.random() * 9000) + 1000}</p>
  //         <div style={{ display:"flex", gap:12, justifyContent:"center" }}>
  //           <button className="btn-primary" onClick={() => setPage("home")}>Continue Shopping</button>
  //           <button className="btn-outline" onClick={() => setPage("account")}>View Orders</button>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    // <div style={{ paddingTop:80 }} className="page-enter">
    <div
  className="page-enter"
  style={{
    paddingTop:120,
    minHeight:"100vh",
    background:"linear-gradient(180deg,#fffaf8 0%, #f7f1eb 100%)",
    paddingBottom:80
  }}
>
      {/* <div style={{ background:"var(--blush)", padding:"48px 0 32px" }}>
        <div className="container">
          <h1 className="section-title">Checkout</h1>
        </div>
      </div> */}

<div
  style={{
    maxWidth:1180,
    margin:"0 auto 40px",
    background:"linear-gradient(135deg,#fff8f8,#f8eeea)",
    borderRadius:32,
    padding:"42px 32px",
    textAlign:"center",
    boxShadow:"0 14px 40px rgba(0,0,0,0.04)",
    border:"1px solid #f1e6dc"
  }}
>
  <div
    style={{
      fontSize:11,
      letterSpacing:4,
      textTransform:"uppercase",
      color:"#b4977b",
      marginBottom:14,
      fontWeight:600
    }}
  >
    MonArt Luxury Checkout
  </div>

  <h1
    style={{
      fontFamily:"var(--font-display)",
      fontSize:58,
      lineHeight:1,
      fontWeight:400,
      color:"#1f1f1f",
      margin:0
    }}
  >
    Checkout
  </h1>

  <p
    style={{
      marginTop:14,
      color:"#8c8075",
      fontSize:16
    }}
  >
    Secure payment for your handcrafted jewelry
  </p>
</div>

      <div className="container" style={{ padding:"48px 24px" }}>
        {/* Steps */}
        {/* <div className="steps" style={{ maxWidth:500, marginBottom:48 }}>
          {[{n:1,label:"Shipping"},{n:2,label:"Payment"},{n:3,label:"Review"}].map((s, i) => (
            <div key={s.n} className="step">
              <div className={`step-num ${step === s.n ? "active" : step > s.n ? "done" : "future"}`}>{step > s.n ? "✓" : s.n}</div>
              <div>
                <div className="step-label">{s.label}</div>
              </div>
              {i < 2 && <div className="step-line" />}
            </div>
          ))}
        </div> */}

        <div
  style={{
    display:"flex",
    justifyContent:"center",
    gap:18,
    marginBottom:30,
    marginTop:-60,
    flexWrap:"wrap"
  }}
>
  {[
    {n:1,label:"Shipping"},
    {n:2,label:"Payment"},
    {n:3,label:"Review"}
  ].map(s => (
    <div
      key={s.n}
      style={{
        padding:"16px 30px",
        borderRadius:999,
        background:
          step === s.n
            ? "linear-gradient(135deg,#c59d67,#e4c28f)"
            : "#fff",
        color:
          step === s.n
            ? "#fff"
            : "#7d746b",
        fontWeight:600,
        fontSize:13,
        letterSpacing:1,
        textTransform:"uppercase",
        border:"1px solid #eee3d6",
        boxShadow:
          step === s.n
            ? "0 10px 25px rgba(197,157,103,0.3)"
            : "0 6px 18px rgba(0,0,0,0.03)"
      }}
    >
      {s.n}. {s.label}
    </div>
  ))}
</div>

        {/* <div style={{ display:"grid", gridTemplateColumns:"1fr 340px", gap:48, alignItems:"start" }}> */}
        <div
  className="checkout-grid"
  style={{
    display:"grid",
    gridTemplateColumns:"1fr 420px",
    gap:50,
    alignItems:"start",
    maxWidth:1300,
    margin:"0 auto"
  }}
>
          {/* Form */}
          <div
  style={{
    background:"rgba(255,255,255,0.82)",
    backdropFilter:"blur(20px)",
    borderRadius:36,
    padding:50,
    border:"1px solid #f0e5da",
    boxShadow:"0 20px 60px rgba(0,0,0,0.05)"
  }}
>
            {step === 1 && (
              <div>
                <h2 style={{ fontFamily:"var(--font-display)", fontSize:42, fontWeight:400, color:"#1f1f1f", marginBottom:24 }}>Shipping Address</h2>
                <div className="form-grid" style={{ marginBottom:16 }}>
                  <div>
                    <label style={{ fontSize:12, letterSpacing:1, textTransform:"uppercase", fontWeight:500, display:"block", marginBottom:6, color:"var(--stone)" }}>First Name *</label>
                    <input className="input"
style={{
  borderRadius:18,
  border:"1px solid #eadfce",
  background:"#fffdfa",
  padding:"18px 20px",
  fontSize:15,
  boxShadow:"0 4px 12px rgba(0,0,0,0.02)"
}} value={shipping.firstName} onChange={e => setShipping({...shipping, firstName:e.target.value})} placeholder="Sophie" />
                  </div>
                  <div>
                    <label style={{ fontSize:12, letterSpacing:1, textTransform:"uppercase", fontWeight:500, display:"block", marginBottom:6, color:"var(--stone)" }}>Last Name *</label>
                    <input className="input"
style={{
  borderRadius:18,
  border:"1px solid #eadfce",
  background:"#fffdfa",
  padding:"18px 20px",
  fontSize:15,
  boxShadow:"0 4px 12px rgba(0,0,0,0.02)"
}} value={shipping.lastName} onChange={e => setShipping({...shipping, lastName:e.target.value})} placeholder="Martin" />
                  </div>
                </div>
                <div style={{ marginBottom:16 }}>
                  <label style={{ fontSize:12, letterSpacing:1, textTransform:"uppercase", fontWeight:500, display:"block", marginBottom:6, color:"var(--stone)" }}>Email *</label>
                  <input className="input"
style={{
  borderRadius:18,
  border:"1px solid #eadfce",
  background:"#fffdfa",
  padding:"18px 20px",
  fontSize:15,
  boxShadow:"0 4px 12px rgba(0,0,0,0.02)"
}} type="email" value={shipping.email} onChange={e => setShipping({...shipping, email:e.target.value})} placeholder="sophie@email.com" />
                </div>
                <div style={{ marginBottom:16 }}>
                  <label style={{ fontSize:12, letterSpacing:1, textTransform:"uppercase", fontWeight:500, display:"block", marginBottom:6, color:"var(--stone)" }}>Phone</label>
                  <input className="input"
style={{
  borderRadius:18,
  border:"1px solid #eadfce",
  background:"#fffdfa",
  padding:"18px 20px",
  fontSize:15,
  boxShadow:"0 4px 12px rgba(0,0,0,0.02)"
}} value={shipping.phone} onChange={e => setShipping({...shipping, phone:e.target.value})} placeholder="+1 (555) 000-0000" />
                </div>
                <div style={{ marginBottom:16 }}>
                  <label style={{ fontSize:12, letterSpacing:1, textTransform:"uppercase", fontWeight:500, display:"block", marginBottom:6, color:"var(--stone)" }}>Address *</label>
                  <input className="input"
style={{
  borderRadius:18,
  border:"1px solid #eadfce",
  background:"#fffdfa",
  padding:"18px 20px",
  fontSize:15,
  boxShadow:"0 4px 12px rgba(0,0,0,0.02)"
}} value={shipping.address} onChange={e => setShipping({...shipping, address:e.target.value})} placeholder="123 Clay Street, Apt 4" />
                </div>
                <div className="form-grid" style={{ marginBottom:16 }}>
                  <div>
                    <label style={{ fontSize:12, letterSpacing:1, textTransform:"uppercase", fontWeight:500, display:"block", marginBottom:6, color:"var(--stone)" }}>City *</label>
                    <input className="input"
style={{
  borderRadius:18,
  border:"1px solid #eadfce",
  background:"#fffdfa",
  padding:"18px 20px",
  fontSize:15,
  boxShadow:"0 4px 12px rgba(0,0,0,0.02)"
}} value={shipping.city} onChange={e => setShipping({...shipping, city:e.target.value})} placeholder="New York" />
                  </div>
                  <div>
                    <label style={{ fontSize:12, letterSpacing:1, textTransform:"uppercase", fontWeight:500, display:"block", marginBottom:6, color:"var(--stone)" }}>State *</label>
                    <input className="input"
style={{
  borderRadius:18,
  border:"1px solid #eadfce",
  background:"#fffdfa",
  padding:"18px 20px",
  fontSize:15,
  boxShadow:"0 4px 12px rgba(0,0,0,0.02)"
}} value={shipping.state} onChange={e => setShipping({...shipping, state:e.target.value})} placeholder="NY" />
                  </div>
                </div>
                <div className="form-grid">
                  <div>
                    <label style={{ fontSize:12, letterSpacing:1, textTransform:"uppercase", fontWeight:500, display:"block", marginBottom:6, color:"var(--stone)" }}>ZIP Code *</label>
                    <input className="input"
style={{
  borderRadius:18,
  border:"1px solid #eadfce",
  background:"#fffdfa",
  padding:"18px 20px",
  fontSize:15,
  boxShadow:"0 4px 12px rgba(0,0,0,0.02)"
}} value={shipping.zip} onChange={e => setShipping({...shipping, zip:e.target.value})} placeholder="10001" />
                  </div>
                  <div>
                    <label style={{ fontSize:12, letterSpacing:1, textTransform:"uppercase", fontWeight:500, display:"block", marginBottom:6, color:"var(--stone)" }}>Country</label>
                    <select className="input"
style={{
  borderRadius:18,
  border:"1px solid #eadfce",
  background:"#fffdfa",
  padding:"18px 20px",
  fontSize:15,
  boxShadow:"0 4px 12px rgba(0,0,0,0.02)"
}} value={shipping.country} onChange={e => setShipping({...shipping, country:e.target.value})}>
                      <option value="US">United States</option>
                      <option value="CA">Canada</option>
                      <option value="GB">United Kingdom</option>
                      <option value="AU">Australia</option>
                      <option value="DE">Germany</option>
                    </select>
                  </div>
                </div>
                <button className="btn-primary" style={{ marginTop:24 }}
                  onClick={() => { if(!shipping.firstName || !shipping.lastName || !shipping.email || !shipping.address) { showToast("Please fill all required fields", "error"); return; } setStep(2); }}>
                  Continue to Payment →
                </button>
              </div>
            )}

            {step === 2 && (
              <div>
                <h2 style={{ fontFamily:"var(--font-display)", fontSize:42, fontWeight:400, color:"#1f1f1f", marginBottom:8 }}>Payment Details</h2>
                <p style={{ fontSize:13, color:"var(--stone)", marginBottom:24 }}>🔒 Your payment info is encrypted. This is a test store — no real charges will occur.</p>

                <div style={{ background:"#EBF8EE", padding:16, borderRadius:4, marginBottom:24, border:"1px solid #A3D9B1", display:"flex", gap:10, alignItems:"center" }}>
                  <span style={{ fontSize:20 }}>💡</span>
                  <div>
                    <p style={{ fontSize:13, fontWeight:500, color:"#155724", marginBottom:2 }}>Test Mode Active</p>
                    <p style={{ fontSize:12, color:"#155724" }}>Use card 4242 4242 4242 4242, any future date, any CVV</p>
                  </div>
                </div>

                <div style={{ marginBottom:16 }}>
                  <label style={{ fontSize:12, letterSpacing:1, textTransform:"uppercase", fontWeight:500, display:"block", marginBottom:6, color:"var(--stone)" }}>Name on Card *</label>
                  <input className="input"
style={{
  borderRadius:18,
  border:"1px solid #eadfce",
  background:"#fffdfa",
  padding:"18px 20px",
  fontSize:15,
  boxShadow:"0 4px 12px rgba(0,0,0,0.02)"
}} value={payment.name} onChange={e => setPayment({...payment, name:e.target.value})} placeholder="Sophie Martin" />
                </div>
                <div style={{ marginBottom:16 }}>
  <label style={{
    fontSize:12,
    letterSpacing:1,
    textTransform:"uppercase",
    fontWeight:500,
    display:"block",
    marginBottom:6,
    color:"var(--stone)"
  }}>
    Card Details *
  </label>

  {/* <div style={{
    padding:12,
    border:"1px solid var(--light)",
    borderRadius:4,
    background:"#fff"
  }}>
 {clientSecret && <PaymentElement />}
  </div> */}
  <div
  style={{
    padding:22,
    border:"1px solid #eadfce",
    borderRadius:24,
    background:"#fffdfa",
    boxShadow:"0 6px 18px rgba(0,0,0,0.03)"
  }}
>
  {clientSecret && <PaymentElement />}
</div>
</div>
                <div style={{ display:"flex", gap:12, marginTop:24 }}>
                  {/* <button className="btn-outline" onClick={() => setStep(1)}>← Back</button> */}
                  <button 
  className="btn-outline" 
  onClick={() => setStep(1)}
  disabled={loading}
>
  ← Back
</button>
                  <button className="btn-primary" 
                  disabled={loading}
  onClick={() => { 
    if(!payment.name) {
      showToast("Please fill payment details", "error"); 
      return;
    }

    console.log("CLICKED PLACE ORDER (STEP 2)");
    handlePlaceOrder(); // ✅ MOVE PAYMENT HERE
  }}>
  {/* Pay Now → */}
  {loading ? (
  <>
    <span className="spinner" /> Processing...
  </>
) : (
  "Pay Now →"
)}
</button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h2 style={{ fontFamily:"var(--font-display)", fontSize:42, fontWeight:400, color:"#1f1f1f", marginBottom:24 }}>Review Your Order</h2>

                {/* Shipping summary */}
                <div style={{ background:"var(--cream)", padding:20, borderRadius:4, marginBottom:16, border:"1px solid var(--light)" }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8 }}>
                    <h4 style={{ fontFamily:"var(--font-display)", fontSize:18 }}>Shipping to</h4>
                    <button className="btn-ghost" style={{ fontSize:12, color:"var(--clay)" }} onClick={() => setStep(1)}>Edit</button>
                  </div>
                  <p style={{ fontSize:14, color:"var(--mid)" }}>{shipping.firstName} {shipping.lastName}</p>
                  <p style={{ fontSize:14, color:"var(--stone)" }}>{shipping.address}, {shipping.city}, {shipping.state} {shipping.zip}</p>
                </div>

                {/* Payment summary */}
                <div style={{ background:"var(--cream)", padding:20, borderRadius:4, marginBottom:24, border:"1px solid var(--light)" }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8 }}>
                    <h4 style={{ fontFamily:"var(--font-display)", fontSize:18 }}>Payment</h4>
                    <button className="btn-ghost" style={{ fontSize:12, color:"var(--clay)" }} onClick={() => setStep(2)}>Edit</button>
                  </div>
                  <p style={{ fontSize:14, color:"var(--mid)" }}>Card ending in {payment.cardNum.slice(-4) || "****"}</p>
                </div>

                {/* Items */}
                {cart.map(item => (
                  <div key={item.id} style={{ display:"flex", gap:12, marginBottom:12, alignItems:"center" }}>
                    <img src={item.images[0]} alt={item.name} style={{ width:56, height:56, objectFit:"cover", borderRadius:2 }} />
                    <div style={{ flex:1 }}>
                      <p style={{ fontSize:14, fontWeight:500 }}>{item.name}</p>
                      <p style={{ fontSize:13, color:"var(--stone)" }}>Qty: {item.qty}</p>
                    </div>
                    <p style={{ fontFamily:"var(--font-display)", fontSize:18 }}>€{(item.price * item.qty).toFixed(2)}</p>
                  </div>
                ))}

                <div style={{ display:"flex", gap:12, marginTop:24 }}>
                  <button className="btn-outline" onClick={() => setStep(2)}>← Back</button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          {/* <div style={{ background:"var(--cream)", padding:24, borderRadius:4, border:"1px solid var(--light)", position:"sticky", top:84 }}> */}
          <div
  style={{
    background:"linear-gradient(180deg,#fffdfa,#faf3ea)",
    padding:40,
    borderRadius:36,
    border:"1px solid #f1e4d7",
    position:"sticky",
    top:120,
    boxShadow:"0 20px 60px rgba(0,0,0,0.05)"
  }}
>
            <h3 style={{ fontFamily:"var(--font-display)", fontSize:36, fontWeight:400, marginBottom:28, marginBottom:16 }}>Order Summary</h3>
            {cart.map(item => (
              <div key={item.id} style={{ display:"flex", justifyContent:"space-between", marginBottom:18,paddingBottom:18,borderBottom:"1px solid #f3e8dc", fontSize:13 }}>
                <span style={{ color:"var(--mid)" }}>{item.name} × {item.qty}</span>
                <span>€{(item.price * item.qty).toFixed(2)}</span>
              </div>
            ))}
            <div className="divider" />
            {[
              ["Subtotal", `€${subtotal.toFixed(2)}`],
              discountPct > 0 ? [`Discount (${discountPct}%)`, `-$€{discountAmt.toFixed(2)}`] : null,
              ["Shipping", shippingCost === 0 ? "FREE" : `€${shippingCost.toFixed(2)}`],
            ].filter(Boolean).map(([l, v]) => (
              <div key={l} style={{ display:"flex", justifyContent:"space-between", marginBottom:18,paddingBottom:18,borderBottom:"1px solid #f3e8dc", fontSize:13 }}>
                <span style={{ color:"var(--stone)" }}>{l}</span><span>{v}</span>
              </div>
            ))}
            <div className="divider" />
            {/* <div style={{ display:"flex", justifyContent:"space-between" }}>
              <span style={{ fontWeight:600 }}>Total</span>
              <span style={{ fontFamily:"var(--font-display)", fontSize:22, color:"var(--clay)" }}>€{total.toFixed(2)}</span>
            </div> */}
            <div
  style={{
    display:"flex",
    justifyContent:"space-between",
    alignItems:"center",
    marginTop:30,
    paddingTop:25,
    borderTop:"1px solid #eadfce"
  }}
>
  <span
    style={{
      fontSize:22,
      fontWeight:600
    }}
  >
    Total
  </span>

  <span
    style={{
      fontFamily:"var(--font-display)",
      fontSize:38,
      color:"#c59d67",
      fontWeight:700
    }}
  >
    €{total.toFixed(2)}
  </span>
</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ── Auth Pages ────────────────────────────────────────────────────────────────
const AuthPage = ({ mode, setPage, onLogin, showToast }) => {
  const [form, setForm] = useState({ name:"", email:"", password:"", confirm:"" });
  const [loading, setLoading] = useState(false);
  const isLogin = mode === "login";

//  const handle = async () => {
//    if (!form.email || !form.password) { showToast("Please fill all fields", "error"); return; }
  //   if (!isLogin && form.password !== form.confirm) { showToast("Passwords don't match", "error"); return; }
  //   setLoading(true);
  //   await new Promise(r => setTimeout(r, 1200));
  //   setLoading(false);
  //   const user = { name: form.name || form.email.split("@")[0], email: form.email, isAdmin: form.email === "admin@monicasart.com" };
  //   onLogin(user);
  //   showToast(`Welcome${user.isAdmin ? " back, Admin" : ", " + user.name}! ✨`);
  //   setPage(user.isAdmin ? "admin" : "account");
  // };

  const handle = async () => {
  if (!form.email || !form.password) {
    showToast("Please fill all fields", "error");
    return;
  }

  if (!isLogin && form.password !== form.confirm) {
    showToast("Passwords don't match", "error");
    return;
  }

  setLoading(true);

  try {
    let userCredential;

    if (isLogin) {
      userCredential = await signInWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );
    } else {
      userCredential = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );
    }

    // const firebaseUser = userCredential.user;

    // const user = {
    //   name: form.name || firebaseUser.email.split("@")[0],
    //   email: firebaseUser.email,
    //   isAdmin: firebaseUser.email === "admin@monicasart.com"
    // };

    const firebaseUser = userCredential.user;

// 🔐 call backend to verify admin
const res = await fetch("https://monart-backend.onrender.com/api/admin-login", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({ email: firebaseUser.email })
});

if (!res.ok) {
  const text = await res.text();
  console.error("Backend response:", text);

  throw new Error("Server error");
}
const data = await res.json();

const user = {
  name: form.name || firebaseUser.email.split("@")[0],
  email: firebaseUser.email,
  isAdmin: data.isAdmin   // ✅ comes from backend
};

    onLogin(user);

    showToast(`Welcome ${user.name} ✨`);

    setPage(user.isAdmin ? "admin" : "account");

  } catch (error) {
    showToast(error.message, "error");
  }

  setLoading(false);
};

  return (
    <div style={{ paddingTop:64, minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", background:"linear-gradient(135deg, var(--cream) 0%, var(--blush) 100%)" }}>
      <div style={{ background:"var(--white)", padding:48, borderRadius:4, width:"min(440px,90vw)", boxShadow:"var(--shadow-soft)" }} className="page-enter">
        <div style={{ textAlign:"center", marginBottom:36 }}>
          <h1 style={{ fontFamily:"var(--font-display)", fontSize:32, marginBottom:8 }}>
            {isLogin ? "Welcome Back" : "Create Account"}
          </h1>
          <p style={{ fontSize:13, color:"var(--stone)" }}>
            {isLogin ? "Sign in to your MonArt account" : "Join the MonArt family"}
          </p>
        </div>

        {/* Hint for admin */}
        <div style={{ background:"var(--cream)", padding:12, borderRadius:4, marginBottom:20, fontSize:12, color:"var(--stone)", textAlign:"center" }}>
          💡 Use <strong>admin@monicasart.com</strong> to access the admin dashboard
        </div>

        {!isLogin && (
          <div style={{ marginBottom:16 }}>
            <label style={{ fontSize:12, letterSpacing:1, textTransform:"uppercase", fontWeight:500, display:"block", marginBottom:6, color:"var(--stone)" }}>Full Name</label>
            <input className="input" value={form.name} onChange={e => setForm({...form, name:e.target.value})} placeholder="Sophie Martin" />
          </div>
        )}
        <div style={{ marginBottom:16 }}>
          <label style={{ fontSize:12, letterSpacing:1, textTransform:"uppercase", fontWeight:500, display:"block", marginBottom:6, color:"var(--stone)" }}>Email</label>
          <input className="input" type="email" value={form.email} onChange={e => setForm({...form, email:e.target.value})} placeholder="you@email.com" />
        </div>
        <div style={{ marginBottom: isLogin ? 24 : 16 }}>
          <label style={{ fontSize:12, letterSpacing:1, textTransform:"uppercase", fontWeight:500, display:"block", marginBottom:6, color:"var(--stone)" }}>Password</label>
          <input className="input" type="password" value={form.password} onChange={e => setForm({...form, password:e.target.value})} placeholder="••••••••" />
        </div>
        {!isLogin && (
          <div style={{ marginBottom:24 }}>
            <label style={{ fontSize:12, letterSpacing:1, textTransform:"uppercase", fontWeight:500, display:"block", marginBottom:6, color:"var(--stone)" }}>Confirm Password</label>
            <input className="input" type="password" value={form.confirm} onChange={e => setForm({...form, confirm:e.target.value})} placeholder="••••••••" />
          </div>
        )}

        <button className="btn-primary" style={{ width:"100%", justifyContent:"center" }} onClick={handle} disabled={loading}>
          {loading ? <><span className="spinner" /> {isLogin ? "Signing in..." : "Creating account..."}</> : (isLogin ? "Sign In" : "Create Account")}
        </button>

        <p style={{ textAlign:"center", marginTop:20, fontSize:13, color:"var(--stone)" }}>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button className="btn-ghost" onClick={() => setPage(isLogin ? "signup" : "login")}
            style={{ color:"var(--clay)", fontWeight:500, textDecoration:"underline", fontSize:13 }}>
            {isLogin ? "Sign up" : "Sign in"}
          </button>
        </p>
      </div>
    </div>
  );
};

// ── Account Page ──────────────────────────────────────────────────────────────
const AccountPage = ({ user, onLogout, setPage, wishlist, onWishlist, setSelectedProduct, setSelectedOrder }) => {
  const [orders, setOrders] = useState([]);
//   useEffect(() => {
//   if (!user) return;

//   fetch(`https://monart-backend.onrender.com/api/orders/${user.email}`)
//     .then(res => res.json())
//     .then(data => setOrders(data))
//     .catch(err => console.error(err));
// }, [user]);
//   useEffect(() => {
//   if (!user?.email) return;

//   fetch(`https://monart-backend.onrender.com/api/orders?email=${user.email}`)
//     .then(res => res.json())
//     .then(data => setOrders(data))
//     .catch(err => console.error(err));
// }, [user]);

useEffect(() => {
  if (!user?.email) return;

  const fetchOrders = () => {
    fetch(`https://monart-backend.onrender.com/api/orders?email=${user.email}`)
      .then(res => res.json())
      .then(data => setOrders(data))
      .catch(err => console.error(err));
  };

  // first load
  fetchOrders();

  // auto refresh every 5 sec
  const interval = setInterval(fetchOrders, 5000);

  return () => clearInterval(interval);
}, [user]);

  const [currentPage, setCurrentPage] = useState(1);

const ordersPerPage = 10;

const totalPages = Math.ceil(
  orders.length / ordersPerPage
);

const startIndex =
  (currentPage - 1) * ordersPerPage;

const paginatedOrders =
  orders.slice(
    startIndex,
    startIndex + ordersPerPage
  );

  const [tab, setTab] = useState("orders");
  if (!user) { setPage("login"); return null; }

  return (
    <div style={{ paddingTop:80 }} className="page-enter">
      <div style={{ background:"var(--blush)", padding:"60px 0 40px" }}>
        <div className="container">
          <p style={{ fontSize:13, color:"var(--stone)" }}>Welcome back,</p>
          <h1 style={{ fontFamily:"var(--font-display)", fontSize:40, fontWeight:400, letterSpacing: -1 }}>{user.name} ✨</h1>
        </div>
      </div>

      <div className="container" style={{ padding:"48px 24px" }}>
        {/* Tab Nav */}
        <div style={{ display:"flex", gap:4, marginBottom:36, borderBottom:"1px solid var(--light)", flexWrap:"wrap" }}>
          {[{key:"orders",label:"Orders"},{ key:"wishlist",label:`Wishlist (${wishlist.length})`},{key:"profile",label:"Profile"}].map(t => (
            <button key={t.key} className="btn-ghost"
              style={{ padding:"12px 20px", fontSize:12, letterSpacing:1.5, textTransform:"uppercase", fontWeight:500,
                color: tab === t.key ? "var(--clay)" : "var(--stone)",
                borderBottom: tab === t.key ? "2px solid var(--clay)" : "2px solid transparent",
                marginBottom:"-1px" }}
              onClick={() => setTab(t.key)}>
              {t.label}
            </button>
          ))}
          <button className="btn-ghost" style={{ marginLeft:"auto", fontSize:12, color:"var(--stone)" }}
            onClick={() => { onLogout(); setPage("home"); }}>
            Sign Out →
          </button>
        </div>

        {tab === "orders" && (
          <div>
            <h2 style={{ fontFamily:"var(--font-display)", fontSize:28, marginBottom:24 }}>Order History</h2>
            {orders.length === 0 ? (
              <div style={{ textAlign:"center", padding:"60px 0" }}>
                <p style={{ fontSize:16, color:"var(--stone)" }}>No orders yet. Start shopping!</p>
                <button className="btn-primary" style={{ marginTop:20 }} onClick={() => setPage("shop")}>Shop Now</button>
              </div>
            ) : (
              // <div style={{ overflowX:"auto" }}>
              <div
  style={{
    overflowX: "auto",
    background: "#fff",
    borderRadius: 20,
    padding: 28,
    border: "1px solid var(--border)",
    boxShadow: "0 8px 30px rgba(0,0,0,0.04)"
  }}
>
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Order</th><th>Date</th><th>Items</th><th>Total</th><th>Status</th><th></th>
                    </tr>
                  </thead>
                  {/* <tbody>
                    {orders.map(o => (
                      <tr key={o.id}>
                        <td><strong>{o.id}</strong></td>
                        <td style={{ color:"var(--stone)" }}>{o.date}</td>
                        <td style={{ color:"var(--stone)" }}>{o.items} items</td>
                        <td><strong style={{ fontFamily:"var(--font-display)", fontSize:16 }}>${o.total}</strong></td>
                        <td>
                          <span className={`status-badge status-${o.status}`}>{o.status.charAt(0).toUpperCase() + o.status.slice(1)}</span>
                        </td>
                        <td>
                          <button className="btn-ghost" style={{ color:"var(--clay)", fontSize:12 }}>View →</button>
                        </td>
                      </tr>
                    ))}
                  </tbody> */}
                  <tbody>
  {/* {orders.map(o => ( */}
  {paginatedOrders.map(o => (
    <tr key={o._id}>
      <td><strong>{o._id.slice(-6)}</strong></td>

      <td style={{ color:"var(--stone)" }}>
        {new Date(o.createdAt).toLocaleDateString()}
      </td>

      {/* <td style={{ color:"var(--stone)" }}>
        {o.items.length} items
      </td> */}

      <td style={{ color:"var(--stone)" }}>
        {o.items.map(i => i.name).join(", ")}
      </td>

      <td>
        <strong style={{ fontFamily:"var(--font-display)", fontSize:16 }}>
          ${o.total.toFixed(2)}
        </strong>
      </td>

      <td>
        <span className={`status-badge status-${o.status || "pending"}`}>
          {o.status || "pending"}
        </span>
      </td>

      <td>
        {/* <button className="btn-ghost" style={{ color:"var(--clay)", fontSize:12 }}>
          View →
        </button> */}
        <button
  className="btn-ghost"
  style={{ color:"var(--clay)", fontSize:12 }}
  onClick={() => {
    setSelectedOrder(o);
    setPage("order-details");
  }}
>
  View →
</button>
      </td>
    </tr>
  ))}
</tbody>
                </table>
                <div
  style={{
    display: "flex",
    justifyContent: "center",
    gap: 10,
    marginTop: 32
  }}
>
  {Array.from(
    { length: totalPages },
    (_, i) => (
      <button
        key={i}
        onClick={() =>
          setCurrentPage(i + 1)
        }
        style={{
          width: 40,
          height: 40,
          borderRadius: "50%",
          border:
            currentPage === i + 1
              ? "none"
              : "1px solid var(--border)",

          background:
            currentPage === i + 1
              ? "var(--gold)"
              : "#fff",

          color:
            currentPage === i + 1
              ? "#fff"
              : "var(--dark)",

          cursor: "pointer",
          fontWeight: 600
        }}
      >
        {i + 1}
      </button>
    )
  )}
</div>
              </div>
            )}
          </div>
        )}

        {tab === "wishlist" && (
          <div>
            <h2 style={{ fontFamily:"var(--font-display)", fontSize:28, marginBottom:24 }}>Your Wishlist</h2>
            {wishlist.length === 0 ? (
              <div style={{ textAlign:"center", padding:"60px 0" }}>
                <div style={{ fontSize:48, marginBottom:16 }}>♡</div>
                <p style={{ fontSize:16, color:"var(--stone)", marginBottom:20 }}>Your wishlist is empty</p>
                <button className="btn-primary" onClick={() => setPage("shop")}>Browse Collection</button>
              </div>
            ) : (
              <div className="product-grid">
                {wishlist.map(p => (
                  <div key={p.id} style={{ background:"var(--white)", border:"1px solid var(--light)", borderRadius:4, overflow:"hidden", position:"relative", cursor:"pointer" }}
                    onClick={() => { setSelectedProduct(p); setPage("product"); }}>
                    <div style={{ paddingTop:"80%", position:"relative" }}>
                      <img src={p.images[0]} alt={p.name} style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover" }} />
                      <button className="wish-btn active" onClick={e => { e.stopPropagation(); onWishlist(p); }}>
                        <span style={{ color:"var(--clay)", fontSize:16 }}>♥</span>
                      </button>
                    </div>
                    <div style={{ padding:16 }}>
                      <h3 style={{ fontFamily:"var(--font-display)", fontSize:17 }}>{p.name}</h3>
                      <p style={{ fontFamily:"var(--font-display)", fontSize:20, color:"var(--clay)", marginTop:4 }}>${p.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {tab === "profile" && (
          <div style={{ maxWidth:500 }}>
            <h2 style={{ fontFamily:"var(--font-display)", fontSize:28, marginBottom:24 }}>Profile Settings</h2>
            <div style={{ marginBottom:16 }}>
              <label style={{ fontSize:12, letterSpacing:1, textTransform:"uppercase", fontWeight:500, display:"block", marginBottom:6, color:"var(--stone)" }}>Full Name</label>
              <input className="input" defaultValue={user.name} />
            </div>
            <div style={{ marginBottom:16 }}>
              <label style={{ fontSize:12, letterSpacing:1, textTransform:"uppercase", fontWeight:500, display:"block", marginBottom:6, color:"var(--stone)" }}>Email</label>
              <input className="input" defaultValue={user.email} />
            </div>
            <div style={{ marginBottom:24 }}>
              <label style={{ fontSize:12, letterSpacing:1, textTransform:"uppercase", fontWeight:500, display:"block", marginBottom:6, color:"var(--stone)" }}>New Password</label>
              <input className="input" type="password" placeholder="Leave blank to keep current" />
            </div>
            <button className="btn-primary">Save Changes</button>
          </div>
        )}
      </div>
    </div>
  );
}; 

// ── Admin Dashboard ───────────────────────────────────────────────────────────
const AdminPage = ({ user, setPage, products, setProducts, showToast, setSelectedOrder }) => {
  const [section, setSection] = useState("overview");
  const [showForm, setShowForm] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [form, setForm] = useState({ name:"", category:"earrings", price:"", description:"", stock:"", image:"" });
  const [orders, setOrders] = useState([]);

  useEffect(() => {
  fetch("https://monart-backend.onrender.com/api/orders")
    .then(res => res.json())
    .then(data => setOrders(data))
    .catch(err => console.error(err));
  }, []);

  if (!user?.isAdmin) {
    return (
      <div style={{ paddingTop:80, textAlign:"center", padding:"120px 24px" }}>
        <h2 style={{ fontFamily:"var(--font-display)", fontSize:32, marginBottom:16 }}>Access Denied</h2>
        <p style={{ color:"var(--stone)", marginBottom:24 }}>You need admin privileges to access this page.</p>
        <button className="btn-primary" onClick={() => setPage("login")}>Sign In as Admin</button>
      </div>
    );
  }

  const handleSave = () => {
    if (!form.name || !form.price) { showToast("Name and price required", "error"); return; }
    if (editProduct) {
      setProducts(products.map(p => p.id === editProduct.id ? {...p, ...form, price:parseFloat(form.price), stock:parseInt(form.stock||10), images:[form.image||p.images[0],...p.images.slice(1)]} : p));
      showToast("Product updated!");
    } else {
      const newP = { id:`p${Date.now()}`, name:form.name, category:form.category, price:parseFloat(form.price), originalPrice:null,
        images:[form.image || "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&q=80"],
        description:form.description, details:"Handcrafted polymer clay.", tags:[], rating:5, reviews:0, stock:parseInt(form.stock||10), featured:false };
      setProducts([...products, newP]);
      showToast("Product added! ✨");
    }
    setShowForm(false); setEditProduct(null); setForm({ name:"", category:"earrings", price:"", description:"", stock:"", image:"" });
  };

  const handleDelete = (id) => {
    if (!window.confirm("Delete this product?")) return;
    setProducts(products.filter(p => p.id !== id));
    showToast("Product deleted");
  };

  // const totalRevenue = ORDERS.reduce((s,o) => s+o.total, 0);
  const [currentPage, setCurrentPage] = useState(1);
  const [overviewPage, setOverviewPage] = useState(1);

const ordersPerPage = 10;

const indexOfLast = currentPage * ordersPerPage;
const indexOfFirst = indexOfLast - ordersPerPage;

const currentOrders = orders.slice(indexOfFirst, indexOfLast);

const totalPages = Math.ceil(orders.length / ordersPerPage);

const overviewOrdersPerPage = 10;

const overviewLastIndex = overviewPage * overviewOrdersPerPage;

const overviewFirstIndex =
  overviewLastIndex - overviewOrdersPerPage;

const overviewOrders = orders.slice(
  overviewFirstIndex,
  overviewLastIndex
);

const overviewTotalPages = Math.ceil(
  orders.length / overviewOrdersPerPage
);

  const totalRevenue = orders.reduce((s, o) => s + o.total, 0);

  return (
    <div style={{ paddingTop:104, minHeight:"100vh" }}>
      <div className="admin-layout">
        {/* Sidebar */}
        {/* <div className="admin-sidebar">
          <div style={{ padding:"16px 24px 32px", fontFamily:"var(--font-display)", fontSize:22, color:"var(--white)" }}>
            MonArt <span style={{ fontSize:13, color:"rgba(255,253,249,0.4)", fontFamily:"var(--font-body)", fontWeight:300 }}>admin</span>
          </div>
          {[
            { key:"overview", icon:"⊞", label:"Overview" },
            { key:"products", icon:"◈", label:"Products" },
            { key:"orders", icon:"◷", label:"Orders" },
          ].map(item => (
            <div key={item.key} className={`admin-nav-item ${section === item.key ? "active" : ""}`} onClick={() => setSection(item.key)}>
              <span style={{ fontSize:16 }}>{item.icon}</span> {item.label}
            </div>
          ))}
          <div style={{ marginTop:"auto", padding:"24px" }}>
            <button className="admin-nav-item" 
            // onClick={() => setPage("home")} 
            onClick={() => {
              localStorage.removeItem("clayco_user");
              window.location.reload();
              }}
            style={{ width:"100%", background:"none", border:"none", cursor:"pointer" }}>
              <span>⇥</span> Exit Admin
            </button>
          </div>
        </div> */}

        {/* PREMIUM ADMIN NAVBAR */}
<div
  style={{
    background:"var(--white)",
    border:"1px solid var(--light)",
    borderRadius:28,
    padding:"10px 18px",
    display:"flex",
    alignItems:"center",
    justifyContent:"space-between",
    gap:18,
    marginBottom:0,
    boxShadow:"0 10px 40px rgba(0,0,0,0.04)",
    flexWrap:"wrap"
  }}
>

  {/* LEFT MENU */}
  <div
    style={{
      display:"flex",
      alignItems:"center",
      gap:14,
      flexWrap:"wrap"
    }}
  >

    {[
      { key:"overview", icon:"⊞", label:"Overview" },
      { key:"products", icon:"◈", label:"Products" },
      { key:"orders", icon:"◷", label:"Orders" },
    ].map(item => (

      <button
        key={item.key}
        onClick={() => setSection(item.key)}
        style={{
          border:"none",
          background:
            section === item.key
              ? "rgba(212,165,116,0.12)"
              : "transparent",

          color:
            section === item.key
              ? "var(--gold)"
              : "var(--dark)",

          padding:"16px 26px",
          borderRadius:18,
          cursor:"pointer",

          display:"flex",
          alignItems:"center",
          gap:10,

          fontSize:13,
          letterSpacing:1.4,
          textTransform:"uppercase",
          fontWeight:600,

          transition:"0.25s ease",

          borderBottom:
            section === item.key
              ? "2px solid var(--gold)"
              : "2px solid transparent"
        }}
      >
        <span style={{ fontSize:16 }}>
          {item.icon}
        </span>

        {item.label}
      </button>

    ))}

  </div>

  {/* EXIT BUTTON */}
  <button
    onClick={() => {
      localStorage.removeItem("clayco_user");
      window.location.reload();
    }}
    style={{
      background:"transparent",
      border:"1px solid rgba(212,165,116,0.35)",
      color:"var(--gold)",

      padding:"14px 26px",
      borderRadius:999,

      cursor:"pointer",

      fontSize:13,
      fontWeight:600,
      letterSpacing:1.4,
      textTransform:"uppercase",

      display:"flex",
      alignItems:"center",
      gap:10,

      transition:"0.25s ease"
    }}
  >
    ⇥ Exit Admin
  </button>

</div>

        {/* Main */}
        {/* <div style={{ background:"var(--cream)", overflowY:"auto", padding:32 }}> */}
        <div
  style={{
    background:"var(--cream)",
    overflowY:"auto",
    padding:"0px 32px 32px"
  }}
>
          {section === "overview" && (
            <div>
              <h1 style={{ fontFamily:"var(--font-display)", fontSize:36, marginBottom:8 }}>Dashboard</h1>
              <p style={{ color:"var(--stone)", fontSize:13, marginBottom:32 }}>Welcome back, {user.name} 👋</p>

              {/* Stats */}
              {/* <div className="four-col" style={{ marginBottom:40 }}> */}
              <div
  style={{
    display:"grid",
    gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",
    gap:24,
    marginBottom:40
  }}
>
                {[
                  { label:"Total Revenue", value:`$${totalRevenue}`, icon:"💰", change:"+12%" },
                  { label:"Orders", value:orders.length, icon:"📦", change:"+3" },
                  { label:"Products", value:products.length, icon:"◈", change:"Active" },
                  { label:"Customers", value:"127", icon:"◯", change:"+8%" },
                ].map(stat => (
                  // <div key={stat.label} style={{ background:"var(--white)", padding:24, borderRadius:4, border:"1px solid var(--light)" }}>
                  <div
  key={stat.label}
  style={{
    background:"var(--white)",
    padding:28,
    borderRadius:24,
    border:"1px solid var(--light)",
    boxShadow:"0 10px 30px rgba(0,0,0,0.04)"
  }}
>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:12 }}>
                      <span style={{ fontSize:11, letterSpacing:1.5, textTransform:"uppercase", color:"var(--stone)", fontWeight:500 }}>{stat.label}</span>
                      <span style={{ fontSize:20 }}>{stat.icon}</span>
                    </div>
                    <div style={{ fontFamily:"var(--font-display)", fontSize:32, color:"var(--dark)", marginBottom:4 }}>{stat.value}</div>
                    <div style={{ fontSize:12, color:"var(--sage)", fontWeight:500 }}>{stat.change}</div>
                  </div>
                ))}
              </div>

              {/* Recent Orders */}
              {/* <div style={{ background:"var(--white)", padding:24, borderRadius:4, border:"1px solid var(--light)" }}> */}
              <div
  style={{
    background:"var(--white)",
    border:"1px solid var(--light)",
    borderRadius:24,
    padding:28,
    boxShadow:"0 10px 40px rgba(0,0,0,0.04)"
  }}
>
                <h3
  style={{
    fontFamily:"var(--font-display)",
    fontSize:34,
    textAlign:"center",
    marginBottom:28
  }}
>Recent Orders</h3>
                <table className="data-table">
                  <thead>
                    <tr><th>Order</th><th>Date</th><th>Products</th><th>Total</th><th>Status</th></tr>
                  </thead>
                  {/* <tbody>
                    {orders.map(o => (
                      <tr key={o.id}>
                        <td><strong>{o.id}</strong></td>
                        <td style={{ color:"var(--stone)" }}>{o.date}</td>
                        <td style={{ color:"var(--stone)", maxWidth:200, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{o.products.join(", ")}</td>
                        <td><strong>${o.total}</strong></td>
                        <td><span className={`status-badge status-${o.status}`}>{o.status}</span></td>
                      </tr>
                    ))}
                  </tbody> */}
                  <tbody>
  {/* {orders.map(o => ( */}
  {/* {orders.slice(0,10).map(o => ( */}
  {overviewOrders.map(o => (
    <tr key={o._id}>
      <td><strong>{o._id.slice(-6)}</strong></td>

      <td style={{ color:"var(--stone)" }}>
        {new Date(o.createdAt).toLocaleDateString()}
      </td>

      <td
        style={{
          color:"var(--stone)",
          maxWidth:200,
          overflow:"hidden",
          textOverflow:"ellipsis",
          whiteSpace:"nowrap"
        }}
      >
        {o.items.map(i => i.name).join(", ")}
      </td>

      <td><strong>${o.total.toFixed(2)}</strong></td>

      <td>
        <span className={`status-badge status-${o.status}`}>
          {o.status}
        </span>
      </td>
    </tr>
  ))}
</tbody>
                </table>
                <div
  style={{
    display:"flex",
    justifyContent:"center",
    gap:12,
    marginTop:32
  }}
>
  {Array.from(
    { length: overviewTotalPages },
    (_, i) => (
      <button
        key={i}
        onClick={() => setOverviewPage(i + 1)}
        style={{
          width:42,
          height:42,
          borderRadius:"50%",
          border:"1px solid var(--light)",
          background:
            overviewPage === i + 1
              ? "var(--gold)"
              : "var(--white)",
          color:
            overviewPage === i + 1
              ? "white"
              : "var(--dark)",
          cursor:"pointer",
          fontWeight:500
        }}
      >
        {i + 1}
      </button>
    )
  )}
</div>
              </div>
            </div>
          )}

          {section === "products" && (
            <div>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:24 }}>
                <h1 style={{ fontFamily:"var(--font-display)", fontSize:36 }}>Products</h1>
                <button className="btn-primary" onClick={() => { setEditProduct(null); setForm({ name:"", category:"earrings", price:"", description:"", stock:"", image:"" }); setShowForm(true); }}>
                  + Add Product
                </button>
              </div>

              {/* Product Form Modal */}
              {showForm && (
                <>
                  <div className="overlay" onClick={() => setShowForm(false)} />
                  <div style={{ position:"fixed", top:"50%", left:"50%", transform:"translate(-50%,-50%)", background:"var(--white)", padding:40, borderRadius:4, width:"min(540px,90vw)", maxHeight:"90vh", overflowY:"auto", zIndex:1001, boxShadow:"var(--shadow-soft)" }}>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:24 }}>
                      <h2 style={{ fontFamily:"var(--font-display)", fontSize:26 }}>{editProduct ? "Edit Product" : "Add Product"}</h2>
                      <button className="btn-ghost" onClick={() => setShowForm(false)} style={{ fontSize:20 }}>✕</button>
                    </div>
                    {[
                      { key:"name", label:"Product Name *", placeholder:"Blushing Petal Studs", type:"text" },
                      { key:"price", label:"Price ($) *", placeholder:"18.00", type:"number" },
                      { key:"stock", label:"Stock", placeholder:"15", type:"number" },
                      { key:"image", label:"Image URL", placeholder:"https://...", type:"url" },
                    ].map(field => (
                      <div key={field.key} style={{ marginBottom:16 }}>
                        <label style={{ fontSize:12, letterSpacing:1, textTransform:"uppercase", fontWeight:500, display:"block", marginBottom:6, color:"var(--stone)" }}>{field.label}</label>
                        <input className="input" type={field.type} placeholder={field.placeholder}
                          value={form[field.key]} onChange={e => setForm({...form, [field.key]:e.target.value})} />
                      </div>
                    ))}
                    <div style={{ marginBottom:16 }}>
                      <label style={{ fontSize:12, letterSpacing:1, textTransform:"uppercase", fontWeight:500, display:"block", marginBottom:6, color:"var(--stone)" }}>Category</label>
                      <select className="input" value={form.category} onChange={e => setForm({...form, category:e.target.value})}>
                        {["earrings","studs","rings","necklace-sets"].map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <div style={{ marginBottom:24 }}>
                      <label style={{ fontSize:12, letterSpacing:1, textTransform:"uppercase", fontWeight:500, display:"block", marginBottom:6, color:"var(--stone)" }}>Description</label>
                      <textarea className="input" rows={3} value={form.description} onChange={e => setForm({...form, description:e.target.value})} placeholder="Describe this piece..." style={{ resize:"vertical" }} />
                    </div>
                    <div style={{ display:"flex", gap:12 }}>
                      <button className="btn-outline" onClick={() => setShowForm(false)}>Cancel</button>
                      <button className="btn-primary" onClick={handleSave}>{editProduct ? "Save Changes" : "Add Product"}</button>
                    </div>
                  </div>
                </>
              )}

              {/* <div style={{ background:"var(--white)", borderRadius:4, border:"1px solid var(--light)", overflowX:"auto" }}> */}
              <div
  style={{
    background:"var(--white)",
    border:"1px solid var(--light)",
    borderRadius:24,
    padding:28,
    overflowX:"auto",
    boxShadow:"0 10px 40px rgba(0,0,0,0.04)"
  }}
>
                <table className="data-table">
                  <thead>
                    <tr><th>Product</th><th>Category</th><th>Price</th><th>Stock</th><th>Rating</th><th>Actions</th></tr>
                  </thead>
                  <tbody>
                    {products.map(p => (
                      <tr key={p.id}>
                        <td>
                          <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                            <img src={p.images[0]} alt={p.name} style={{ width:44, height:44, objectFit:"cover", borderRadius:2 }} />
                            <span style={{ fontWeight:500, fontSize:14 }}>{p.name}</span>
                          </div>
                        </td>
                        <td><span className="chip" style={{ fontSize:10 }}>{p.category}</span></td>
                        <td style={{ fontFamily:"var(--font-display)", fontSize:16 }}>${p.price}</td>
                        <td>
                          <span style={{ color: p.stock <= 5 ? "var(--clay)" : "var(--sage)", fontWeight:500, fontSize:13 }}>{p.stock}</span>
                        </td>
                        <td>
                          <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                            <Stars rating={p.rating} size={10} />
                            <span style={{ fontSize:12, color:"var(--stone)" }}>({p.reviews})</span>
                          </div>
                        </td>
                        <td>
                          <div style={{ display:"flex", gap:8 }}>
                            <button className="btn-ghost" style={{ fontSize:16, color:"var(--clay)" }}
                              onClick={() => { setEditProduct(p); setForm({ name:p.name, category:p.category, price:p.price, description:p.description, stock:p.stock, image:p.images[0] }); setShowForm(true); }}>✎</button>
                            <button className="btn-ghost" style={{ fontSize:16, color:"#C97A7A" }} onClick={() => handleDelete(p.id)}>🗑</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {section === "orders" && (
            <div>
              <h1 style={{ fontFamily:"var(--font-display)", fontSize:36, marginBottom:24 }}>Orders</h1>
              {/* <div style={{ background:"var(--white)", borderRadius:4, border:"1px solid var(--light)", overflowX:"auto" }}> */}
              <div
  style={{
    background:"var(--white)",
    border:"1px solid var(--light)",
    borderRadius:24,
    padding:28,
    overflowX:"auto",
    boxShadow:"0 10px 40px rgba(0,0,0,0.04)"
  }}
>
                <table className="data-table">
                  <thead>
                    <tr><th>Order</th><th>Date</th><th>Items</th><th>Total</th><th>Status</th><th>Actions</th></tr>
                  </thead>
                  {/* <tbody>
                    {orders.map(o => (
                      // <tr key={o.id}>
                      //   <td><strong>{o.id}</strong></td>
                      //   <td style={{ color:"var(--stone)" }}>{o.date}</td>
                      //   <td style={{ color:"var(--stone)" }}>{o.items}</td>
                      //   <td><strong style={{ fontFamily:"var(--font-display)", fontSize:16 }}>${o.total}</strong></td>
                      //   <td>
                      //     <select style={{ background:"none", border:"none", cursor:"pointer", fontFamily:"var(--font-body)", fontSize:12, fontWeight:500,
                      //       color: o.status === "delivered" ? "#0C5460" : o.status === "shipped" ? "#155724" : o.status === "processing" ? "#004085" : "#856404" }}
                      //       defaultValue={o.status}>
                      //       {["pending","processing","shipped","delivered"].map(s => <option key={s} value={s}>{s}</option>)}
                      //     </select>
                      //   </td>
                      //   <td>
                      //     <button className="btn-ghost" style={{ color:"var(--clay)", fontSize:12 }}>Details →</button>
                      //   </td>
                      // </tr>
                      <tr key={o._id}>
<td><strong>{o._id.slice(-6)}</strong></td>

<td style={{ color:"var(--stone)" }}>
  {new Date(o.createdAt).toLocaleDateString()}
</td>

<td style={{ color:"var(--stone)" }}>
  {o.items.map(i => `${i.name} x${i.qty}`).join(", ")}
</td>
</tr>
                    ))}
                  </tbody> */}
                  <tbody>
  {/* {orders.map(o => ( */}
  {currentOrders.map(o => (
    <tr key={o._id}>
      
      {/* Order ID */}
      <td><strong>{o._id.slice(-6)}</strong></td>

      {/* Date */}
      <td style={{ color:"var(--stone)" }}>
        {new Date(o.createdAt).toLocaleDateString()}
      </td>

      {/* Items */}
      <td style={{ color:"var(--stone)" }}>
        {o.items.map(i => `${i.name} x${i.qty}`).join(", ")}
      </td>

      {/* Total */}
      <td>
        <strong style={{ fontFamily:"var(--font-display)" }}>
          ${o.total.toFixed(2)}
        </strong>
      </td>

      {/* ✅ STATUS DROPDOWN (IMPORTANT) */}
      <td>
        <select
          value={o.status}
          style={{
    padding:"10px 14px",
    borderRadius:999,
    border:"1px solid var(--light)",
    background:"var(--cream)",
    fontSize:12,
    textTransform:"uppercase",
    letterSpacing:1,
    fontWeight:600,
    color:"var(--gold)"
  }}
          onChange={async (e) => {
            const newStatus = e.target.value;

            await fetch(`https://monart-backend.onrender.com/api/orders/${o._id}`, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ status: newStatus })
            });

            showToast("Order updated!");

            // refresh orders
            const res = await fetch("https://monart-backend.onrender.com/api/orders");
            const data = await res.json();
            setOrders(data);
          }}
        >
          {["pending","processing","shipped","delivered"].map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </td>

      {/* Actions */}
      {/* <td>
        <button className="btn-ghost">Details →</button>
      </td> */}
      <td>
  <button
    className="btn-ghost"
    style={{
      color:"var(--gold)",
      fontWeight:500,
      cursor:"pointer"
    }}
    onClick={() => {
      setSelectedOrder(o);
      setPage("order-details");
    }}
  >
    Details →
  </button>
</td>

    </tr>
  ))}
</tbody>
                </table>
                <div
  style={{
    display:"flex",
    justifyContent:"center",
    gap:12,
    marginTop:32
  }}
>
  {Array.from({ length: totalPages }, (_, i) => (
    <button
      key={i}
      onClick={() => setCurrentPage(i + 1)}
      style={{
        width:42,
        height:42,
        borderRadius:"50%",
        border:"1px solid var(--light)",
        background: currentPage === i + 1
          ? "var(--gold)"
          : "var(--white)",
        color: currentPage === i + 1
          ? "white"
          : "var(--dark)",
        cursor:"pointer",
        fontWeight:500
      }}
    >
      {i + 1}
    </button>
  ))}
</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// // ── Order Detail View Page ────────────────────────────────────────────────────────────────
// const OrderDetailsPage = ({ order, setPage }) => {
//   if (!order) {
//     return (
//       <div style={{ padding:80, textAlign:"center" }}>
//         <h2>No order found</h2>
//         <button className="btn-primary" onClick={() => setPage("account")}>
//           Back to Account
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div style={{ paddingTop:80 }}>
//       <div className="container" style={{ padding:"48px 24px", maxWidth:800 }}>

//         <button className="btn-ghost" onClick={() => setPage("account")}>
//           ← Back
//         </button>

//         <h1 style={{ fontFamily:"var(--font-display)", fontSize:32, margin:"24px 0" }}>
//           Order Details
//         </h1>

//         <p><strong>Order ID:</strong> {order._id}</p>
//         <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
//         <p><strong>Status:</strong> {order.status}</p>

//         <div style={{ marginTop:24 }}>
//           {order.items.map((item, i) => (
//             <div key={i} style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
//               <span>{item.name} × {item.qty}</span>
//               <span>${(item.price * item.qty).toFixed(2)}</span>
//             </div>
//           ))}
//         </div>

//         <h3 style={{ marginTop:24 }}>
//           Total: ${order.total.toFixed(2)}
//         </h3>

//       </div>
//     </div>
//   );
// };

const OrderDetailsPage = ({ order, setPage }) => {

  if (!order) {
    return (
      <div
        style={{
          padding: 120,
          textAlign: "center",
          minHeight: "100vh",
          background: "#faf7f3"
        }}
      >
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 42,
            marginBottom: 24
          }}
        >
          No order found
        </h2>

        <button
          className="btn-primary"
          onClick={() => setPage("account")}
        >
          Back to Account
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        paddingTop: 100,
        paddingBottom: 80,
        background:
          "linear-gradient(to bottom, #fcfaf8, #f8f4ef)",
        minHeight: "100vh"
      }}
    >

      <div
        className="container"
        style={{
          maxWidth: 980
        }}
      >

        {/* BACK BUTTON */}
        {/* <button
          className="btn-ghost"
          style={{
            marginBottom: 30,
            color: "#9b8d82",
            fontSize: 15
          }}
          onClick={() => setPage("account")}
        >
          ← Back
        </button> */}

        {/* MAIN CARD */}
        <div
          style={{
            background: "#fff",
            borderRadius: 28,
            padding: "42px 46px",
            border: "1px solid #f1e7dc",
            boxShadow: "0 10px 40px rgba(0,0,0,0.05)"
          }}
        >

          {/* HEADER */}
          <div
            style={{
              textAlign: "center",
              marginBottom: 50
            }}
          >

            <div
              style={{
                letterSpacing: 4,
                textTransform: "uppercase",
                color: "#caa46d",
                fontSize: 13,
                marginBottom: 14
              }}
            >
              MonArt Luxury Order
            </div>

            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 48,
                fontWeight: 500,
                color: "#2d2d2d",
                marginBottom: 12
              }}
            >
              Order Details
            </h1>

            <p
              style={{
                color: "#9b8d82",
                fontSize: 14
              }}
            >
              Your handcrafted jewelry is being prepared with love
            </p>

          </div>

          {/* ORDER INFO */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 20,
              marginBottom: 50
            }}
          >

            {/* ORDER ID */}
            <div
              style={{
                background: "#faf6f2",
                padding: 18,
                borderRadius: 18,
                textAlign: "center"
              }}
            >
              <div
                style={{
                  fontSize: 12,
                  letterSpacing: 2,
                  color: "#b7a79b",
                  marginBottom: 10
                }}
              >
                ORDER ID
              </div>

              <div
                style={{
                  fontWeight: 600,
                  color: "#2d2d2d"
                }}
              >
                {order._id}
              </div>
            </div>

            {/* DATE */}
            <div
              style={{
                background: "#faf6f2",
                padding: 18,
                borderRadius: 18,
                textAlign: "center"
              }}
            >
              <div
                style={{
                  fontSize: 12,
                  letterSpacing: 2,
                  color: "#b7a79b",
                  marginBottom: 10
                }}
              >
                DATE
              </div>

              <div
                style={{
                  fontWeight: 600,
                  color: "#2d2d2d"
                }}
              >
                {new Date(order.createdAt).toLocaleDateString()}
              </div>
            </div>

            {/* STATUS */}
            <div
              style={{
                background: "#faf6f2",
                padding: 26,
                borderRadius: 24,
                textAlign: "center"
              }}
            >
              <div
                style={{
                  fontSize: 12,
                  letterSpacing: 2,
                  color: "#b7a79b",
                  marginBottom: 10
                }}
              >
                STATUS
              </div>

              <div
                style={{
                  display: "inline-block",
                  padding: "10px 24px",
                  borderRadius: 999,
                  background:
                    order.status === "delivered"
                      ? "#e8f5ea"
                      : "#fff5e8",
                  color:
                    order.status === "delivered"
                      ? "#2e7d32"
                      : "#caa46d",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: 1,
                  fontSize: 13
                }}
              >
                {order.status}
              </div>

            </div>

          </div>

          {/* ITEMS */}
          <div>

            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 30,
                marginBottom: 30,
                color: "#2d2d2d"
              }}
            >
              Your Items
            </h2>

            {order.items.map((item, i) => (

              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "26px 0",
                  borderBottom: "1px solid #f3ece4"
                }}
              >

                {/* LEFT
                <div
                  style={{
                    display: "flex",
                    gap: 20,
                    alignItems: "center"
                  }}
                >

                  <img
                    src={item.images?.[0]}
                    alt={item.name}
                    style={{
                      width: 72,
                      height: 72,
                      objectFit: "cover",
                      borderRadius: 22,
                      boxShadow: "0 8px 24px rgba(0,0,0,0.08)"
                    }}
                  />

                  <div>

                    <div
                      style={{
                        fontSize: 18,
                        fontWeight: 500,
                        color: "#2d2d2d",
                        marginBottom: 8
                      }}
                    >
                      {item.name}
                    </div>

                    <div
                      style={{
                        color: "#a89b8d",
                        fontSize: 15
                      }}
                    >
                      Quantity: {item.qty}
                    </div>

                  </div>

                </div> */}

                {/* LEFT */}
<div
  style={{
    display: "flex",
    gap: 20,
    alignItems: "center",
    flex: 1
  }}
>

  <img
    src={item.images?.[0]}
    alt={item.name}
    style={{
      width: 72,
      height: 72,
      objectFit: "cover",
      borderRadius: 22,
      boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
      flexShrink: 0
    }}
  />

  {/* TEXT AREA */}
  <div
    style={{
      width: 320
    }}
  >

    <div
      style={{
        fontSize: 18,
        fontWeight: 500,
        color: "#2d2d2d",
        marginBottom: 8,
        lineHeight: 1.4
      }}
    >
      {item.name}
    </div>

    <div
      style={{
        color: "#c0ae99",
        fontSize: 14,
        letterSpacing: 0.4
      }}
    >
      Quantity: {item.qty}
    </div>

  </div>

</div>

                {/* PRICE */}
                <div
                  style={{
                    fontSize: 26,
                    color: "#caa46d",
                    fontFamily: "var(--font-display)"
                  }}
                >
                  €{(item.price * item.qty).toFixed(2)}
                </div>

              </div>

            ))}

          </div>


          {/* TOTAL */}
          <div
            style={{
              marginTop: 40,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >

            <div
              style={{
                fontSize: 24,
                fontWeight: 600,
                color: "#2d2d2d"
              }}
            >
              Total
            </div>

            <div
              style={{
                fontSize: 38,
                color: "#caa46d",
                fontFamily: "var(--font-display)"
              }}
            >
              €{order.total.toFixed(2)}
            </div>

          </div>
{/* SHIPPING + PAYMENT */}
<div
  style={{
    marginTop: 40,
    paddingTop: 36,
    borderTop: "1px solid #f3ece4"
  }}
>

  {/* TOP TWO COLUMNS */}
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 60,
      marginBottom: 40
    }}
  >

    {/* SHIPPING */}
    <div>

      <div
        style={{
          fontSize: 13,
          letterSpacing: 2,
          textTransform: "uppercase",
          color: "#c9b8a4",
          marginBottom: 14,
          fontWeight: 600
        }}
      >
        Shipping Address
      </div>

      <div
        style={{
          fontSize: 16,
          lineHeight: 1.9,
          color: "#2d2d2d"
        }}
      >
        {order.shipping?.firstName} {order.shipping?.lastName}<br />
        {order.shipping?.address}<br />
        {order.shipping?.city}, {order.shipping?.zip}<br />
        {order.shipping?.country}
      </div>

    </div>

{/* PAYMENT */}
<div>

  <div
    style={{
      fontSize: 13,
      letterSpacing: 2,
      textTransform: "uppercase",
      color: "#c9b8a4",
      marginBottom: 14,
      fontWeight: 600
    }}
  >
    Payment Method
  </div>

  <div
    style={{
      fontSize: 16,
      color: "#2d2d2d",
      lineHeight: 1.9
    }}
  >
    {order.paymentMethod || "Stripe Secure Payment"}
  </div>

</div>


  </div>

  {/* DELIVERY */}
{/* DELIVERY */}
<div
  style={{
    borderTop: "1px solid #f3ece4",
    paddingTop: 28
  }}
>

  <div
    style={{
      fontSize: 13,
      letterSpacing: 2,
      textTransform: "uppercase",
      color: "#c9b8a4",
      marginBottom: 14,
      fontWeight: 600
    }}
  >
    Estimated Delivery
  </div>

  <div
    style={{
      fontSize: 16,
      color: "#2d2d2d"
    }}
  >
    {new Date(
      new Date(order.createdAt).getTime() + 5 * 24 * 60 * 60 * 1000
    ).toDateString()}
  </div>

</div>


</div>
      
        </div>

      </div>
    <div
  style={{
    marginTop: 50,
    textAlign: "center"
  }}
>

  <button
    onClick={() => setPage("account")}
    style={{
      padding: "16px 34px",
      borderRadius: 999,
      border: "1px solid #d8c2a8",
      background:
        "linear-gradient(135deg, #d8b07a, #c79a5f)",
      color: "#fff",
      fontSize: 15,
      fontWeight: 600,
      letterSpacing: 1,
      cursor: "pointer",
      boxShadow: "0 8px 20px rgba(199,154,95,0.25)",
      transition: "0.3s"
    }}
  >
    ← Back to Orders
  </button>

</div>          
    </div>
  );
};

// ── About Page ────────────────────────────────────────────────────────────────
const AboutPage = ({ setPage }) => (
  <div style={{ paddingTop:64 }} className="page-enter">
    {/* Hero */}
    <div style={{ background:"linear-gradient(135deg, var(--blush) 0%, var(--cream) 60%)", padding:"100px 0 60px" }}>
      <div className="container">
        <p className="section-subtitle">Our Story</p>
        <h1 className="section-title" style={{ maxWidth:600 }}>
          Made with Clay,<br />
          <em style={{ color:"var(--clay)" }}>Crafted with Heart</em>
        </h1>
      </div>
    </div>

    <div className="container" style={{ padding:"80px 24px" }}>
      <div className="two-col" style={{ marginBottom:80 }}>
        <div>
          <img src="https://images.unsplash.com/photo-1608491382023-73a1a8e3c3c3?w=600&q=80" alt="Making jewelry"
            className="about-img" />
        </div>
        <div style={{ display:"flex", flexDirection:"column", justifyContent:"center" }}>
          <p className="section-subtitle">Who We Are</p>
          <h2 style={{ fontFamily:"var(--font-display)", fontSize:36, marginBottom:20, lineHeight:1.2 }}>A One-Woman Studio Built on Passion</h2>
          <p style={{ fontSize:15, color:"var(--mid)", lineHeight:1.9, marginBottom:16 }}>
            Hi, I'm Mia — the founder, designer, and maker behind Moica's Art. What started as a stress-relieving hobby in 2021 quickly became a full-blown love affair with polymer clay jewelry.
          </p>
          <p style={{ fontSize:15, color:"var(--mid)", lineHeight:1.9, marginBottom:24 }}>
            Every pair of earrings, every ring, every necklace is made in my sunny home studio in Brooklyn. I hand-roll, hand-texture, and hand-finish each piece. No two are ever exactly alike — and that's exactly the point.
          </p>
          <p style={{ fontSize:15, color:"var(--mid)", lineHeight:1.9 }}>
            I believe jewelry should feel special but not precious. Wear your Moica's Art pieces to the farmer's market, to the office, or on a date night. They're made to be lived in.
          </p>
        </div>
      </div>

      {/* Values */}
      <div style={{ textAlign:"center", marginBottom:60 }}>
        <p className="section-subtitle">What We Stand For</p>
        <h2 className="section-title">Our Values</h2>
      </div>
      <div className="three-col" style={{ marginBottom:80 }}>
        {[
          { icon:"🎨", title:"True Handcraft", desc:"Every piece is made by hand, one at a time. No molds, no machines, no shortcuts." },
          { icon:"🌿", title:"Sustainable Materials", desc:"We use non-toxic, REACH-compliant polymer clay and responsibly sourced metal findings." },
          { icon:"💌", title:"Slow Fashion", desc:"We make in small batches. When it's gone, it's gone. No mass production, ever." },
        ].map(v => (
          <div key={v.title} style={{ textAlign:"center", padding:"32px 24px", background:"var(--white)", border:"1px solid var(--light)", borderRadius:4 }}>
            <div style={{ fontSize:40, marginBottom:16 }}>{v.icon}</div>
            <h3 style={{ fontFamily:"var(--font-display)", fontSize:22, marginBottom:12 }}>{v.title}</h3>
            <p style={{ fontSize:14, color:"var(--stone)", lineHeight:1.8 }}>{v.desc}</p>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div style={{ background:"var(--dark)", padding:60, borderRadius:4, textAlign:"center" }}>
        <h2 style={{ fontFamily:"var(--font-display)", fontSize:40, color:"var(--white)", fontWeight:300, marginBottom:16 }}>
          Ready to find your piece?
        </h2>
        <p style={{ color:"rgba(255,253,249,0.6)", marginBottom:32, fontSize:15 }}>
          Browse our collection of handcrafted polymer clay jewelry.
        </p>
        <button className="btn-primary" style={{ background:"var(--blush)", color:"var(--dark)" }} onClick={() => setPage("shop")}>
          Shop Now →
        </button>
      </div>
    </div>
  </div>
);

// ── Contact Page ──────────────────────────────────────────────────────────────
const ContactPage = ({ showToast }) => {
  const [form, setForm] = useState({ name:"", email:"", subject:"", message:"" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) { showToast("Please fill all required fields", "error"); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    setLoading(false);
    setForm({ name:"", email:"", subject:"", message:"" });
    showToast("Message sent! I'll reply within 24 hours ✨");
  };

  return (
    <div style={{ paddingTop:64 }} className="page-enter">
      <div style={{ background:"var(--blush)", padding:"80px 0 60px" }}>
        <div className="container">
          <p className="section-subtitle">Get In Touch</p>
          <h1 className="section-title">Let's Chat</h1>
        </div>
      </div>

      <div className="container" style={{ padding:"80px 24px" }}>
        <div className="two-col">
          {/* Form */}
          <div>
            <h2 style={{ fontFamily:"var(--font-display)", fontSize:32, marginBottom:8 }}>Send a Message</h2>
            <p style={{ fontSize:14, color:"var(--stone)", marginBottom:32, lineHeight:1.7 }}>
              Questions about an order? Custom requests? Just want to say hi? I'd love to hear from you. I reply to all messages within 24 hours.
            </p>
            {[
              { key:"name", label:"Your Name *", placeholder:"Sophie Martin", type:"text" },
              { key:"email", label:"Email *", placeholder:"sophie@email.com", type:"email" },
              { key:"subject", label:"Subject", placeholder:"Custom order inquiry", type:"text" },
            ].map(field => (
              <div key={field.key} style={{ marginBottom:16 }}>
                <label style={{ fontSize:12, letterSpacing:1, textTransform:"uppercase", fontWeight:500, display:"block", marginBottom:6, color:"var(--stone)" }}>{field.label}</label>
                <input className="input" type={field.type} placeholder={field.placeholder}
                  value={form[field.key]} onChange={e => setForm({...form, [field.key]:e.target.value})} />
              </div>
            ))}
            <div style={{ marginBottom:24 }}>
              <label style={{ fontSize:12, letterSpacing:1, textTransform:"uppercase", fontWeight:500, display:"block", marginBottom:6, color:"var(--stone)" }}>Message *</label>
              <textarea className="input" rows={5} placeholder="Tell me what you're looking for..." style={{ resize:"vertical" }}
                value={form.message} onChange={e => setForm({...form, message:e.target.value})} />
            </div>
            <button className="btn-primary" onClick={handleSubmit} disabled={loading}>
              {loading ? <><span className="spinner" /> Sending...</> : "Send Message →"}
            </button>
          </div>

          {/* Info */}
          <div>
            <div style={{ background:"var(--cream)", padding:36, borderRadius:4, marginBottom:24 }}>
              <h3 style={{ fontFamily:"var(--font-display)", fontSize:24, marginBottom:24 }}>Contact Info</h3>
              {[
                { icon:"✉", label:"Email", value:"hello@monicasart.com" },
                { icon:"☎", label:"Phone", value:"+1 (555) 123-4567" },
                { icon:"◎", label:"Studio", value:"Brooklyn, NY (by appointment)" },
                { icon:"⏰", label:"Hours", value:"Mon–Fri: 10am–6pm EST" },
              ].map(info => (
                <div key={info.label} className="contact-info-item" style={{ marginBottom:20 }}>
                  <div style={{ width:40, height:40, background:"var(--blush)", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:16, flexShrink:0 }}>
                    {info.icon}
                  </div>
                  <div>
                    <p style={{ fontSize:11, letterSpacing:1, textTransform:"uppercase", fontWeight:500, color:"var(--stone)", marginBottom:2 }}>{info.label}</p>
                    <p style={{ fontSize:14, color:"var(--dark)" }}>{info.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Social */}
            <div style={{ background:"var(--dark)", padding:28, borderRadius:4 }}>
              <h4 style={{ fontFamily:"var(--font-display)", fontSize:20, color:"var(--white)", marginBottom:16 }}>Follow Along</h4>
              <p style={{ fontSize:13, color:"rgba(255,253,249,0.6)", marginBottom:20, lineHeight:1.7 }}>
                See behind-the-scenes content, new collection previews, and happy customers on social.
              </p>
              <div style={{ display:"flex", gap:12 }}>
                {[["📸","@monicasart"],["📘","Moica's Art"],["📌","monicasart"]].map(([icon, handle]) => (
                  <button key={handle} className="btn-ghost" style={{ background:"rgba(255,253,249,0.1)", padding:"10px 14px", borderRadius:4, display:"flex", alignItems:"center", gap:8, color:"var(--white)", fontSize:12 }}>
                    {icon} {handle}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ── Wishlist Page ─────────────────────────────────────────────────────────────
const WishlistPage = ({ wishlist, onWishlist, onAddCart, setPage, setSelectedProduct }) => (
  <div style={{ paddingTop:80 }} className="page-enter">
    <div style={{ background:"var(--blush)", padding:"60px 0 40px" }}>
      <div className="container">
        <p className="section-subtitle">Saved Pieces</p>
        <h1 className="section-title">Your Wishlist</h1>
      </div>
    </div>
    {/* <div className="container" style={{ padding:"48px 24px" }}> */}
    <div
  style={{
    maxWidth: 1400,
    margin: "0 auto",
    padding: "56px 40px"
  }}
>
      {wishlist.length === 0 ? (
        <div style={{ textAlign:"center", padding:"80px 0" }}>
          <div style={{ fontSize:64, marginBottom:24 }}>♡</div>
          <h2 style={{ fontFamily:"var(--font-display)", fontSize:36, marginBottom:12 }}>Nothing saved yet</h2>
          <p style={{ color:"var(--stone)", marginBottom:32 }}>Save pieces you love by clicking the heart icon</p>
          <button className="btn-primary" onClick={() => setPage("shop")}>Browse Collection</button>
        </div>
      ) : (
        <div className="product-grid">
          {wishlist.map(p => (
            <ProductCard key={p.id} product={p} onAddCart={onAddCart} onWishlist={onWishlist}
              isWishlisted={true} setPage={setPage} setSelectedProduct={setSelectedProduct} />
          ))}
        </div>
      )}
    </div>
  </div>
);

// ── Footer ────────────────────────────────────────────────────────────────────
const Footer = ({ setPage }) => (
  <footer>
    <div className="container" style={{ padding:"64px 24px 32px", width:"100%" }}>
      <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1fr", gap:48, marginBottom:48 }}>
        {/* Brand */}
        <div>
          <h2 style={{ fontFamily:"var(--font-display)", fontSize:28, color:"var(--white)", marginBottom:12 }}>MonArt</h2>
          <p style={{ fontSize:13, lineHeight:1.8, color:"rgba(255,253,249,0.55)", marginBottom:20, maxWidth:280 }}>
            Handcrafted polymer clay jewelry made with love in Brooklyn. Each piece is unique — just like you.
          </p>
          <div style={{ display:"flex", gap:12 }}>
            {["📸","📘","📌","🎵"].map((icon, i) => (
              <a key={i} href="#" style={{ width:36, height:36, background:"rgba(255,253,249,0.08)", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:14, transition:"all 0.3s", textDecoration:"none" }}
                onMouseEnter={e => e.target.style.background="rgba(242,217,206,0.2)"}
                onMouseLeave={e => e.target.style.background="rgba(255,253,249,0.08)"}>
                {icon}
              </a>
            ))}
          </div>
        </div>

        {/* Links */}
        {[
          { title:"Shop", links:[["All Jewelry","shop"],["Earrings","shop"],["Studs","shop"],["Rings","shop"],["Necklace Sets","shop"]] },
          { title:"Company", links:[["About Us","about"],["Contact","contact"],["Admin","admin"]] },
          { title:"Help", links:[["Shipping Info","contact"],["Returns","contact"],["Size Guide","contact"],["Care Guide","contact"]] },
        ].map(col => (
          <div key={col.title}>
            <h4>{col.title}</h4>
            <ul style={{ listStyle:"none" }}>
              {col.links.map(([label, page]) => (
                <li key={label} style={{ marginBottom:10 }}>
                  <a href="#" onClick={e => { e.preventDefault(); setPage(page); }}>{label}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="divider-dark" />

      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:16 }}>
        <p style={{ fontSize:12, color:"rgba(255,253,249,0.35)" }}>
          {/* © 2026 Monica's Art. All rights reserved. Made with ♥ in Brooklyn. */}
          <img
  src={monartLogo}
  alt="MonArt"
  style={{
    height: 70,
    marginBottom: 12
  }}
/>
        </p>
        <div style={{ display:"flex", gap:20 }}>
          {["Privacy Policy","Terms of Service","Accessibility"].map(link => (
            <a key={link} href="#" style={{ fontSize:12 }}>{link}</a>
          ))}
        </div>
      </div>
    </div>
  </footer>
);

// ── Main App ──────────────────────────────────────────────────────────────────
export default function App() {
  const [clientSecret, setClientSecret] = useState("");
  const [page, setPage] = useState("home");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [products, setProducts] = useState(PRODUCTS);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState(() => {
    try { return JSON.parse(localStorage.getItem("clayco_cart")) || []; } catch { return []; }
  });
  const [wishlist, setWishlist] = useState(() => {
    try { return JSON.parse(localStorage.getItem("clayco_wishlist")) || []; } catch { return []; }
  });
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem("clayco_user")); } catch { return null; }
  });
  const [cartOpen, setCartOpen] = useState(false);
  const [discountCode, setDiscountCode] = useState("");
  const [discountPct, setDiscountPct] = useState(0);
  const { toasts, show: showToast } = useToast();


  // Persist cart/wishlist/user
  useEffect(() => { try { localStorage.setItem("clayco_cart", JSON.stringify(cart)); } catch {} }, [cart]);
  useEffect(() => { try { localStorage.setItem("clayco_wishlist", JSON.stringify(wishlist)); } catch {} }, [wishlist]);
  useEffect(() => { try { if(user) localStorage.setItem("clayco_user", JSON.stringify(user)); else localStorage.removeItem("clayco_user"); } catch {} }, [user]);

  // Scroll to top on page change
  useEffect(() => { window.scrollTo({ top:0, behavior:"smooth" }); }, [page]);

  useEffect(() => {
  if (page === "checkout") {
    console.log("🔥 Creating payment intent...");

    const totalAmount = cart.reduce((s, i) => s + i.price * i.qty, 0);

    fetch("https://monart-backend.onrender.com/api/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ amount: totalAmount })
    })
    .then(res => res.json())
    .then(data => {
      console.log("✅ CLIENT SECRET:", data.clientSecret);
      setClientSecret(data.clientSecret);
    })
    .catch(err => console.error("Payment Intent Error:", err));
  }
}, [page, cart]);

useEffect(() => {
  const path = window.location.pathname;

  if (path === "/account") {
    setPage("account");
  }

  if (path === "/checkout") {
    setPage("checkout");
  }

  // ✅ ADD THIS (VERY IMPORTANT)
  if (path === "/success") {
    setPage("success");
  }
}, []);

// useEffect(() => {
//   const path = window.location.pathname;

//   if (path === "/success") {
//     setPage("success");

//     // ✅ CREATE ORDER AFTER PAYMENT
//     fetch("https://monart-backend.onrender.com/api/orders", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({
//         userEmail: user?.email,
//         items: cart,
//         total: cart.reduce((s, i) => s + i.price * i.qty, 0),
//       })
//     })
//     .then(res => res.json())
//     .then(order => {
//       console.log("✅ ORDER SAVED:", order);

//       // ✅ STORE ORDER
//       setSelectedOrder(order);

//       // ✅ CLEAR CART
//       setCart([]);
//     });
//   }
// }, []);

  const addToCart = (product, qty = 1) => {
    setCart(prev => {
      const exists = prev.find(i => i.id === product.id);
      if (exists) return prev.map(i => i.id === product.id ? {...i, qty: i.qty + qty} : i);
      return [...prev, {...product, qty}];
    });
    showToast(`${product.name} added to cart!`);
    setCartOpen(true);
  };

  const updateQty = (id, qty) => {
    if (qty <= 0) removeFromCart(id);
    else setCart(prev => prev.map(i => i.id === id ? {...i, qty} : i));
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(i => i.id !== id));
    showToast("Item removed from cart");
  };

  const toggleWishlist = (product) => {
    setWishlist(prev => {
      const exists = prev.find(i => i.id === product.id);
      if (exists) { showToast("Removed from wishlist"); return prev.filter(i => i.id !== product.id); }
      showToast("Added to wishlist ♥");
      return [...prev, product];
    });
  };

  const applyDiscount = (code) => {
    const pct = DISCOUNT_CODES[code.toUpperCase()];
    if (pct) { setDiscountPct(pct); setDiscountCode(code); showToast(`${pct}% discount applied! 🎉`); }
    else showToast("Invalid code", "error");
  };

  const clearCart = () => setCart([]);

  const renderPage = () => {
    const commonProps = { products, setPage, setSelectedProduct };
    switch (page) {
      case "home":     return <HomePage {...commonProps} onAddCart={addToCart} onWishlist={toggleWishlist} wishlist={wishlist} />;
      case "shop":     return <ShopPage {...commonProps} onAddCart={addToCart} onWishlist={toggleWishlist} wishlist={wishlist} />;
      case "product":  return <ProductPage product={selectedProduct} onAddCart={addToCart} onWishlist={toggleWishlist} wishlist={wishlist} setPage={setPage} products={products} setSelectedProduct={setSelectedProduct} />;
      case "cart":     return <CartPage cart={cart} updateQty={updateQty} removeItem={removeFromCart} setPage={setPage} discountCode={discountCode} setDiscountCode={setDiscountCode} discountPct={discountPct} applyDiscount={applyDiscount} />;
      case "checkout":
  if (!clientSecret) {
    return <div style={{ padding: 100 }}>Loading payment...</div>;
  }

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <CheckoutPage
        cart={cart}
        setPage={setPage}
        user={user}
        discountPct={discountPct}
        clearCart={clearCart}
        showToast={showToast}
       
      />
    </Elements>
  );
      case "login":    return <AuthPage mode="login" setPage={setPage} onLogin={setUser} showToast={showToast} />;
      case "signup":   return <AuthPage mode="signup" setPage={setPage} onLogin={setUser} showToast={showToast} />;
      // case "account":  return <AccountPage user={user} onLogout={() => setUser(null)} setPage={setPage} wishlist={wishlist} onWishlist={toggleWishlist} setSelectedProduct={setSelectedProduct} />;
      case "account":  return user?.isAdmin
                          ? <AdminPage user={user} setPage={setPage} products={products} setProducts={setProducts} showToast={showToast} setSelectedOrder={setSelectedOrder} />
                          : <AccountPage user={user} onLogout={() => setUser(null)} setPage={setPage} wishlist={wishlist} onWishlist={toggleWishlist} setSelectedProduct={setSelectedProduct} setSelectedOrder={setSelectedOrder} />;
      case "admin":    return <AdminPage user={user} setPage={setPage} products={products} setProducts={setProducts} showToast={showToast} setSelectedOrder={setSelectedOrder} />;
      case "about":    return <AboutPage setPage={setPage} />;
      case "contact":  return <ContactPage showToast={showToast} />;
      case "order-details":
        return (
          <OrderDetailsPage 
            order={selectedOrder} 
            setPage={setPage} 
            />
            );
  //     case "success":
  // return (
  //   <div style={{
  //     paddingTop:80,
  //     minHeight:"100vh",
  //     display:"flex",
  //     alignItems:"center",
  //     justifyContent:"center"
  //   }} className="page-enter">

  //     <div style={{ textAlign:"center", maxWidth:500, padding:48 }}>

  //       <div style={{
  //         width:80,
  //         height:80,
  //         borderRadius:"50%",
  //         background:"var(--sage)",
  //         display:"flex",
  //         alignItems:"center",
  //         justifyContent:"center",
  //         margin:"0 auto 24px",
  //         fontSize:36
  //       }}>
  //         ✓
  //       </div>

  //       <h1 style={{
  //         fontFamily:"var(--font-display)",
  //         fontSize:40,
  //         marginBottom:12,
  //         color:"var(--dark)"
  //       }}>
  //         Order Confirmed!
  //       </h1>

  //       <p style={{
  //         fontSize:15,
  //         color:"var(--mid)",
  //         lineHeight:1.8,
  //         marginBottom:8
  //       }}>
  //         Thank you for your order! Your handmade pieces are being prepared with love.
  //         You'll receive a confirmation email shortly.
  //       </p>

  //       <p style={{
  //         fontSize:13,
  //         color:"var(--stone)",
  //         marginBottom:32
  //       }}>
  //         Order #ORD-{Math.floor(Math.random() * 9000) + 1000}
  //       </p>

  //       <div style={{ display:"flex", gap:12, justifyContent:"center" }}>
  //         <button className="btn-primary" onClick={() => setPage("home")}>
  //           Continue Shopping
  //         </button>

  //         <button className="btn-outline" onClick={() => setPage("account")}>
  //           View Orders
  //         </button>
  //       </div>

  //     </div>
  //   </div>
  // );
      
      // case "success":
      //   return <SuccessPage order={selectedOrder} setPage={setPage} />;

      case "success":
  return <SuccessPage setPage={setPage} clearCart={clearCart} />;

      case "wishlist": return <WishlistPage wishlist={wishlist} onWishlist={toggleWishlist} onAddCart={addToCart} setPage={setPage} setSelectedProduct={setSelectedProduct} />;
      default:         return <HomePage {...commonProps} onAddCart={addToCart} onWishlist={toggleWishlist} wishlist={wishlist} />;
    }
  };

const SuccessPage = ({ setPage, clearCart }) => {
  // const [order, setOrder] = useState(null);
  const [order, setOrder] = useState(() => {
  const saved = sessionStorage.getItem("last_order");
  return saved ? JSON.parse(saved) : null;
});

  const hasCreated = useRef(false);

useEffect(() => {
  // 🚫 RUN ONLY ONCE
  if (hasCreated.current) return;
  hasCreated.current = true;

  const params = new URLSearchParams(window.location.search);
  const paymentIntentId = params.get("payment_intent");

  if (!paymentIntentId) {
    console.log("❌ No paymentIntentId");
    return;
  }

  const savedCart = JSON.parse(localStorage.getItem("checkout_cart") || "[]");
  const savedShipping = JSON.parse(localStorage.getItem("checkout_shipping") || "{}");

  console.log("🛒 CART:", savedCart);
  console.log("📦 SHIPPING:", savedShipping);

   // 🚫 HARD STOP — NO DATA = NO API CALL
   if (savedCart.length === 0 || !savedShipping.email) {
     console.log("⛔ Missing data — stopping completely");
     return;
   }

  console.log("📦 SHIPPING:", savedShipping);

  // ✅ CREATE ORDER ONLY ONCE
  fetch("https://monart-backend.onrender.com/api/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      userEmail: savedShipping.email,
      items: savedCart,
      total: savedCart.reduce((s, i) => s + i.price * i.qty, 0),
      shipping: savedShipping,
      paymentIntentId
    })
  })
    // .then(res => res.json())
    .then(async res => {

  console.log("STATUS:", res.status);

  const text = await res.text();

  console.log("RAW RESPONSE:", text);

  return JSON.parse(text);
})
    .then(data => {
      console.log("✅ ORDER CREATED:", data);

      if (!data || data.error) {
        console.log("❌ Backend rejected order");
        return;
      }

      setOrder(data);

      sessionStorage.setItem("last_order", JSON.stringify(data));

      window.history.replaceState({}, document.title, "/success");

      // ✅ CLEANUP AFTER SUCCESS
      localStorage.removeItem("checkout_cart");
      localStorage.removeItem("checkout_shipping");

      clearCart();

    })
    .catch(err => {
      console.error("❌ Fetch error:", err);
    });

}, []);

  if (!order) {
    // return <div style={{ padding: 100 }}>Loading order...</div>;
    return (
  <div style={{
    minHeight:"100vh",
    display:"flex",
    alignItems:"center",
    justifyContent:"center",
    fontSize:22
  }}>
    Loading order...
  </div>
);
  }

  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 5);

  // console.log("CART FROM STORAGE:", savedCart);
  // console.log("SHIPPING FROM STORAGE:", savedShipping);

//   return (
//     <div style={{
//       paddingTop: 80,
//       minHeight: "100vh",
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//       background: "#fafafa"
//     }}>
//       <div style={{
//         textAlign: "center",
//         maxWidth: 700,
//         width: "100%",
//         padding: 40,
//         background: "#fff",
//         borderRadius: 8,
//         border: "1px solid #eee"
//       }}>

//         <div style={{
//           width: 80,
//           height: 80,
//           borderRadius: "50%",
//           background: "var(--sage)",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           margin: "0 auto 24px",
//           fontSize: 36,
//           color: "#fff"
//         }}>
//           ✓
//         </div>

//         <h1 style={{ fontSize: 36 }}>Order Confirmed!</h1>

//         <p>📧 {order.userEmail}</p>
//         <p>Order ID: <b>{order._id}</b></p>
//         <p>Total: <b>€{order.total.toFixed(2)}</b></p>

//         <p>🚚 {deliveryDate.toDateString()}</p>

//         {/* ITEMS */}
//         <div style={{ textAlign: "left", marginTop: 20 }}>
//           {order.items.map(item => (
//             <div key={item.id} style={{ display: "flex", gap: 10 }}>
//               <img
//                 src={item.images?.[0] || "https://via.placeholder.com/60"}
//                 width={60}
//               />
//               <div>
//                 {item.name} × {item.qty}
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* SHIPPING */}
//         <div style={{ marginTop: 20 }}>
//           <p>{order.shipping?.firstName} {order.shipping?.lastName}</p>
//           <p>{order.shipping?.address}</p>
//         </div>

//         <button onClick={() => setPage("home")}>
//           Continue Shopping
//         </button>

//       </div>
//     </div>
//   );
// };

return (
  <div
    style={{
      paddingTop: 120,
      minHeight: "100vh",
      background: "linear-gradient(to bottom, #fdfbf8, #f7f3ee)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      paddingBottom: 80
    }}
  >
    <div
      style={{
        width: "min(760px, 92vw)",
        background: "rgba(255,255,255,0.9)",
        border: "1px solid rgba(212,188,152,0.25)",
        borderRadius: 32,
        padding: "60px 50px",
        backdropFilter: "blur(10px)",
        boxShadow: "0 20px 60px rgba(0,0,0,0.06)",
        textAlign: "center",
        position: "relative",
        overflow: "hidden"
      }}
    >

      {/* top glow */}
      <div
        style={{
          position: "absolute",
          top: -120,
          left: "50%",
          transform: "translateX(-50%)",
          width: 260,
          height: 260,
          background: "rgba(216,156,122,0.12)",
          borderRadius: "50%",
          filter: "blur(60px)"
        }}
      />

      {/* success icon */}
      <div
        style={{
          width: 110,
          height: 110,
          borderRadius: "50%",
          margin: "0 auto 28px",
          background: "linear-gradient(135deg,#d4af37,#f4df9b)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          fontSize: 48,
          boxShadow: "0 12px 30px rgba(212,175,55,0.3)"
        }}
      >
        ✓
      </div>

      {/* title */}
      <h1
        style={{
          fontFamily: "var(--font-display)",
          fontSize: 52,
          marginBottom: 12,
          color: "var(--dark)"
        }}
      >
        Order Confirmed!
      </h1>

      <p
        style={{
          color: "var(--stone)",
          fontSize: 17,
          marginBottom: 40,
          lineHeight: 1.7
        }}
      >
        Thank you for your purchase ✨<br />
        Your handmade jewelry is now being carefully prepared.
      </p>

      {/* order info card */}
      <div
        style={{
          background: "#fff",
          borderRadius: 24,
          border: "1px solid var(--light)",
          padding: 32,
          marginBottom: 32,
          textAlign: "left"
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
            gap: 24
          }}
        >

          <div>
            <div
              style={{
                fontSize: 12,
                letterSpacing: 2,
                textTransform: "uppercase",
                color: "var(--stone)",
                marginBottom: 8
              }}
            >
              Email
            </div>

            <div style={{ fontSize: 16 }}>
              {order.userEmail}
            </div>
          </div>

          <div>
            <div
              style={{
                fontSize: 12,
                letterSpacing: 2,
                textTransform: "uppercase",
                color: "var(--stone)",
                marginBottom: 8
              }}
            >
              Order ID
            </div>

            <div style={{ fontWeight: 600 }}>
              {order._id}
            </div>
          </div>

          <div>
            <div
              style={{
                fontSize: 12,
                letterSpacing: 2,
                textTransform: "uppercase",
                color: "var(--stone)",
                marginBottom: 8
              }}
            >
              Total
            </div>

            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 30,
                color: "var(--gold)"
              }}
            >
              €{order.total.toFixed(2)}
            </div>
          </div>

          <div>
            <div
              style={{
                fontSize: 12,
                letterSpacing: 2,
                textTransform: "uppercase",
                color: "var(--stone)",
                marginBottom: 8
              }}
            >
              Estimated Delivery
            </div>

            <div>
              🚚 {deliveryDate.toDateString()}
            </div>
          </div>

        </div>
      </div>

      {/* products */}
      <div
        style={{
          background: "#fff",
          borderRadius: 24,
          border: "1px solid var(--light)",
          padding: 32,
          marginBottom: 32
        }}
      >

        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 28,
            marginBottom: 28
          }}
        >
          Your Items
        </h3>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 20
          }}
        >
          {order.items.map(item => (
            <div
              key={item.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 20,
                paddingBottom: 20,
                borderBottom: "1px solid var(--light)"
              }}
            >

              <img
                src={item.images?.[0]}
                alt={item.name}
                style={{
                  width: 90,
                  height: 90,
                  objectFit: "cover",
                  borderRadius: 18,
                  border: "1px solid var(--light)"
                }}
              />

              <div style={{ flex: 1, textAlign: "left" }}>
                <div
                  style={{
                    fontWeight: 600,
                    marginBottom: 6,
                    fontSize: 17
                  }}
                >
                  {item.name}
                </div>

                <div style={{ color: "var(--stone)" }}>
                  Quantity: {item.qty}
                </div>
              </div>

              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 24
                }}
              >
                €{item.price}
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* shipping */}
      <div
        style={{
          background: "#fff",
          borderRadius: 24,
          border: "1px solid var(--light)",
          padding: 32,
          marginBottom: 40,
          textAlign: "left"
        }}
      >

        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 28,
            marginBottom: 20
          }}
        >
          Shipping Address
        </h3>

        <div style={{ lineHeight: 2, color: "var(--stone)" }}>
          <div>{order.shipping?.firstName} {order.shipping?.lastName}</div>
          <div>{order.shipping?.address}</div>
          <div>
            {order.shipping?.zip} {order.shipping?.city}
          </div>
          <div>{order.shipping?.country}</div>
        </div>

      </div>

      {/* buttons */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 18,
          flexWrap: "wrap"
        }}
      >

        <button
          className="btn-primary"
          onClick={() => setPage("account")}
          style={{
            padding: "16px 34px",
            borderRadius: 999
          }}
        >
          View Orders
        </button>

        <button
          className="btn-outline"
          onClick={() => setPage("home")}
          style={{
            padding: "16px 34px",
            borderRadius: 999
          }}
        >
          Continue Shopping
        </button>

      </div>

    </div>
  </div>
);
};

  const hideFooter = ["admin","checkout","login","signup"].includes(page);
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  return (
    <div className="noise">
      <GlobalStyle />
      <NavBar page={page} setPage={setPage} cartCount={cartCount} wishCount={wishlist.length}
        user={user} onLogout={() => setUser(null)} cartOpen={cartOpen} setCartOpen={setCartOpen} />

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} cart={cart}
        updateQty={updateQty} removeItem={removeFromCart} setPage={setPage}
        discountCode={discountCode} setDiscountCode={setDiscountCode}
        discountPct={discountPct} applyDiscount={applyDiscount} />

      <main>{renderPage()}</main>

      {!hideFooter && <Footer setPage={setPage} />}

      <ToastContainer toasts={toasts} />
    </div>
  );
}
