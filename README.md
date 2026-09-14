# Web Work Media — Professional Doctor Website Package (৳5,999)

A high-converting, agency-grade landing page designed specifically for **Web Work Media**'s Bangladesh doctor website service.

![Web Work Media Landing Page](assets/mockup-kahhar.jpg)

---

## ⚡ Key Features

- **2-Step Conversion Stepper**:
  - **Step 1 (Payment Confirmation)**: bKash Send Money instructions (`01302778420`), 1-click Copy button, bKash Sender Number & Transaction ID verification.
  - **Step 2 (Doctor Details Form)**: Unlocks automatically after Step 1 is confirmed. Includes summary header and edit option.
- **Hero Visual Mockup Showcase**:
  - Mac-style browser window frame with SSL padlock indicator.
  - Dynamic URL address bar updating per slide (`drmakahhar.com`, `drnabirhossain.com`, `drnajmulhasan.com`).
  - Interactive specialty tabs (`Cardiology`, `Nephrology`, `Orthopaedic`).
  - Animated glassmorphism floating badges (`.com Domain Included` & `Managed Hosting`).
- **Multi-Chamber Support (Up to 3 Chambers)**:
  - Chamber 1 (Primary) — Required.
  - Chamber 2 & Chamber 3 — Optional.
- **Domain Availability Policy**:
  - Helper notes & FAQ explanations for domain availability checks and variation proposals (e.g. `drnamebd.com` / `drname-cardio.com`).
- **Mandatory Terms & Conditions Checkbox & Modal**:
  - Unchecked mandatory checkbox before submission.
  - Interactive 15-section plain-English Terms modal covering static site architecture (Not WordPress), source files, domain transferability, hosting, and revisions.
- **Direct WhatsApp Order Submission**:
  - Submits structured order details directly to Web Work Media's WhatsApp (`+880 1302-778420`).

---

## 📂 Repository Structure

```
webworkmedia-doctor-website/
├── index.html                 # Main Landing Page & 2-Step Form
├── styles.css                 # Responsive Design System & Brand Variables
├── script.js                  # Dynamic Interactivity, Stepper, Slider & WhatsApp Integration
├── config.js                  # Central Phone, bKash & Package Configuration
├── assets/                    # Official Brand Assets & Doctor Mockups
│   ├── brand-full.svg         # Web Work Media Full Logo
│   ├── brand-mark.png         # Web Work Media Brand Mark Icon
│   ├── favicon.png            # Favicon Icon
│   ├── mockup-kahhar.jpg      # Dr. M. A. Kahhar Mockup Slide
│   ├── mockup-nabir.jpg       # Dr. Nabir Hossain Mockup Slide
│   └── mockup-najmul.jpg      # Dr. Najmul Hasan Mockup Slide
├── .github/
│   └── workflows/
│       └── deploy.yml         # Automated GitHub Pages Deployment Workflow
├── .gitignore                 # Excluded OS and Editor Files
└── README.md                  # Project Documentation
```

---

## ⚙️ Configuration (`config.js`)

All phone numbers, WhatsApp links, bKash account details, and pricing can be updated globally in `config.js`:

```javascript
window.WWM_CONFIG = {
  brandName: "Web Work Media",
  website: "https://webworkmedia.net",
  supportPhoneDisplay: "+880 1302-778420",
  supportPhoneE164: "8801302778420",
  whatsappNumber: "8801302778420",
  bkashNumber: "01302778420",
  bkashAccountType: "Personal",
  packagePrice: 5999,
  advanceAmount: 3000,
  balanceAmount: 2999,
  deliveryTime: "3–5 working days",
  includedDomain: ".com domain for 1 year",
  includedHosting: "1 year hosting",
  companyEmail: "info@webworkmedia.net"
};
```

---

## 🚀 How to Publish on GitHub & GitHub Pages

### Method 1: Using GitHub Web Interface (Easiest)

1. Go to [GitHub.com](https://github.com) and log in.
2. Click the **"+"** icon in the top right → Select **New repository**.
3. Set Repository Name (e.g. `doctor-website-package`), choose **Public**, and click **Create repository**.
4. On the new repository page, click **uploading an existing file**.
5. Drag and drop all files and folders from `C:\Users\mdhri\.gemini\antigravity\scratch\webworkmedia-doctor-website` into the browser.
6. Click **Commit changes**.

### Method 2: Using Git Command Line

```bash
cd C:\Users\mdhri\.gemini\antigravity\scratch\webworkmedia-doctor-website
git init
git add .
git commit -m "Initial commit - Web Work Media Doctor Website Package"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/doctor-website-package.git
git push -u origin main
```

---

## 🌐 Enabling GitHub Pages (Free Live Hosting)

1. Open your repository on GitHub.
2. Go to **Settings** → **Pages** (under *Code and automation* on the left sidebar).
3. Under **Build and deployment**:
   - **Source**: Select `Deploy from a branch`.
   - **Branch**: Select `main` and folder `/ (root)`.
4. Click **Save**.
5. Wait 1 minute. Your website will be live at:
   `https://YOUR_USERNAME.github.io/doctor-website-package/`

---

## ⚖️ License & Credits

© 2026 **Web Work Media**. All rights reserved.
Developed for professional medical websites in Bangladesh.
