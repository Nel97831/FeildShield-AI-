# FieldShield AI (KrishiRakshak AI) 🌾🛡️

> Comprehensive AI-powered Agricultural Flood Preparedness, Geospatial Risk Mapping, Crop Photo Loss Damage Assessment & Multi-Language Farmer Resilience Platform.

---

## 🚀 Uploading to GitHub & Setting Up a Custom Domain

Follow these 4 simple steps to upload this codebase to GitHub and connect your custom domain (e.g., `yourdomain.com` or `krishirakshak.in`).

### Step 1: Upload This Repository to GitHub

Open your terminal or command prompt in this project folder and run:

```bash
# 1. Initialize git repository
git init

# 2. Stage all project files
git add .

# 3. Create initial commit
git commit -m "Initial release: FieldShield AI with custom domain configuration"

# 4. Set branch to main
git branch -M main

# 5. Connect to your GitHub repository (replace with your repo URL)
git remote add origin https://github.com/<YOUR-GITHUB-USERNAME>/<YOUR-REPO-NAME>.git

# 6. Push to GitHub
git push -u origin main
```

---

### Step 2: Configure Your Custom Domain CNAME

The custom domain is configured in `public/CNAME`. When Vite builds the project, this file is copied directly to `dist/CNAME`.

1. Open `public/CNAME`.
2. Replace `fieldshield.org` with your own domain name (e.g. `yourdomain.com` or `app.yourdomain.com`).
3. Commit and push the change:
   ```bash
   git add public/CNAME
   git commit -m "Update custom domain CNAME"
   git push
   ```

---

### Step 3: Configure DNS Records at Your Domain Registrar

Go to your DNS manager (e.g., GoDaddy, Cloudflare, Namecheap, Google Domains, Hostinger, BigRock) and add the following records:

#### A) For Apex Domain (e.g., `yourdomain.com`)
Add 4 **A Records** pointing to GitHub's official IP addresses:

| Type | Name / Host | Value / Points To | TTL |
| :--- | :--- | :--- | :--- |
| **A** | `@` | `185.199.108.153` | 3600 (or Auto) |
| **A** | `@` | `185.199.109.153` | 3600 (or Auto) |
| **A** | `@` | `185.199.110.153` | 3600 (or Auto) |
| **A** | `@` | `185.199.111.153` | 3600 (or Auto) |

*(Optional)* Add IPv6 (AAAA) records:
- `2606:50c0:8000::153`
- `2606:50c0:8001::153`
- `2606:50c0:8002::153`
- `2606:50c0:8003::153`

#### B) For Subdomain or `www` (e.g., `www.yourdomain.com`)
Add a **CNAME Record**:

| Type | Name / Host | Value / Target |
| :--- | :--- | :--- |
| **CNAME** | `www` (or subdomain) | `<YOUR-GITHUB-USERNAME>.github.io.` |

---

### Step 4: Enable GitHub Pages & Enforce HTTPS

1. Navigate to your repository on GitHub.
2. Click **Settings** (top navigation tab).
3. In the left sidebar, click **Pages** (under Code and automation).
4. Under **Build and deployment**:
   - Source: Select **GitHub Actions** (the included `.github/workflows/deploy.yml` will automatically build and deploy whenever you push).
5. Under **Custom domain**:
   - Your custom domain will automatically appear from the `CNAME` file.
   - Click **Save** and wait 5–15 minutes for DNS propagation.
6. Check **Enforce HTTPS** to ensure free automatic SSL certificate via Let's Encrypt.

---

## 🛠️ Local Development

```bash
# Install dependencies
npm install

# Start local development server with Express backend & Vite HMR
npm run dev

# Run unit tests
npm test

# Build for production
npm run build
```

---

## 🌟 Key Platform Features

- **Crop Photo Damage AI**: Rapid sub-second visual crop loss assessment, calculating leaf loss %, root rot %, recovery score, and PMFBY insurance payouts.
- **Geospatial Farm Mapping**: Boundary polygon mapping, district coordinates, and flood vulnerability zones across Indian agricultural regions.
- **Multi-Language UI**: Full localization in English, Hindi (हिंदी), and Punjabi (ਪੰਜਾਬੀ).
- **Farm Holding Management**: Register, view, edit (land area, khata/khasra, crops, irrigation), and delete farm records.
- **Emergency Disaster Helplines**: Direct links to NDMA (1078), NDRF (011-24363260), State Disaster Management, and Kisan Call Center (1800-180-1551).
