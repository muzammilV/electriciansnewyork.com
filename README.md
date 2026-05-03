# ⚡ ElectriciansNYC.com — Complete Static Website

A high-converting, SEO-optimized lead generation website for NYC electricians. Fully static HTML/CSS/JS — no backend required.

---

## 📁 File Structure

```
electriciansnewyork.com/
├── index.html                        ← Homepage (main conversion page)
├── emergency-electrician-nyc.html    ← Emergency service page
├── residential-electrician-nyc.html  ← Residential page
├── commercial-electrician-nyc.html   ← Commercial page
├── manhattan-electricians.html       ← Manhattan borough page
├── brooklyn-electricians.html        ← Brooklyn borough page
├── queens-electricians.html          ← Queens borough page
├── contact.html                      ← Contact + lead form
├── blog.html                         ← Blog index template
├── privacy.html                      ← Privacy policy
├── robots.txt
├── sitemap.xml
├── assets/
│   ├── css/custom.css               ← Animations, trust badges, service cards
│   └── js/main.js                   ← FAQ accordion, form handling, floating button
└── README.md
```

---

## 🚀 Deploy to GitHub Pages (Under 10 Minutes)

### Step 1: Create a GitHub account (if needed)
Go to https://github.com and sign up for free.

### Step 2: Create a new repository
1. Click the **+** icon → **New repository**
2. Name it: `electriciansnewyork.com` (or any name)
3. Set visibility to **Public**
4. Click **Create repository**

### Step 3: Upload the files
**Option A — GitHub Web UI (easiest):**
1. In your new repo, click **uploading an existing file**
2. Drag and drop ALL files and folders from this project
3. Click **Commit changes**

**Option B — Git CLI:**
```bash
git init
git add .
git commit -m "Initial commit - ElectriciansNYC website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/electriciansnewyork.git
git push -u origin main
```

### Step 4: Enable GitHub Pages
1. Go to your repo → **Settings** → **Pages**
2. Under **Source**, select **Deploy from a branch**
3. Select branch: **main**, folder: **/ (root)**
4. Click **Save**

### Step 5: Access your site
After 1–2 minutes, your site will be live at:
`https://YOUR_USERNAME.github.io/electriciansnewyork.com/`

### Step 6: Add custom domain (optional)
1. Go to **Settings → Pages → Custom domain**
2. Enter: `electriciansnewyork.com`
3. Update your domain's DNS with your registrar:
   - Add A records pointing to GitHub Pages IPs:
     `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - Or add a CNAME record: `www` → `YOUR_USERNAME.github.io`

---

## 🔧 Configuration Checklist

### 1. Set up Formspree (Lead Forms)
1. Go to https://formspree.io and create a free account
2. Create a new form — you'll get a form ID like `xpzgkwqr`
3. Find and replace ALL instances of `YOUR_FORM_ID` in these files:
   - `index.html` (2 forms)
   - `contact.html` (1 form)
4. The action URL format is: `https://formspree.io/f/YOUR_FORM_ID`
5. Free tier allows 50 submissions/month. Upgrade for more.

### 2. Change the Phone Number
Find and replace ALL instances of:
- `(212) 555-0198` → your real phone number
- `tel:+12125550198` → `tel:+1XXXXXXXXXX` (your number, no spaces)

Files to update: All `.html` files

### 3. Add Google Analytics (GA4)
Add this code inside the `<head>` tag of EVERY html file, replacing `G-XXXXXXXXXX` with your actual GA4 measurement ID:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

Get your ID at: https://analytics.google.com

### 4. Add Google Tag Manager (optional but recommended)
Place in `<head>` of all pages:
```html
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-XXXXXXX');</script>
```
And after `<body>`:
```html
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
```

### 5. Submit Sitemap to Google Search Console
1. Go to https://search.google.com/search-console
2. Add your property
3. Verify ownership (HTML file method is easiest)
4. Go to **Sitemaps** and submit: `https://electriciansnewyork.com/sitemap.xml`

---

## 🎯 15 High-Intent Blog Keywords for SEO

Use these for future blog posts to drive organic traffic:

1. `how much does an electrician cost in NYC`
2. `emergency electrician NYC no call out fee`
3. `200 amp panel upgrade cost New York`
4. `EV charger installation NYC apartment`
5. `licensed electrician NYC brownstone rewiring`
6. `knob and tube wiring replacement NYC cost`
7. `GFCI outlet installation New York City`
8. `electrical permit NYC DOB requirements`
9. `recessed lighting installation cost NYC`
10. `generator installation NYC home`
11. `best electricians Brooklyn NY reviews`
12. `electrical inspection NYC pre-purchase`
13. `smart home wiring installation NYC`
14. `ceiling fan installation NYC apartment`
15. `electrical code violations NYC landlord`

---

## 📞 Support

Questions? The website is fully self-contained. For Formspree support: https://help.formspree.io

---

*Built with Tailwind CSS CDN, vanilla JavaScript, and pure HTML. No build step required.*
