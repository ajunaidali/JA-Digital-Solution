# UMJ Digital — Asset Request List

Yeh list batati hai ke website ke liye kis type ki pictures chahiye. Har prompt ko AI image generator ya stock-image search mein use kar sakte hain. Prompts English mein hain kyun ke image generators aam tor par English prompts behtar samajhte hain.

## Brand style

- Premium, modern digital studio; deep navy, electric cyan, soft white.
- Clean composition, realistic lighting, polished but not over-decorated.
- Website images mein **koi text, watermark, fake logo, ya random letters nahi** hone chahiye. Text website khud dikhati hai.
- Photos landscape hon jab tak portrait dimensions alag na di gayi hon.
- Final images WebP, JPEG, ya PNG format mein dein. Neeche diye gaye exact filenames rakhain.
- AI-generated ya stock images ko asli founder portraits ya completed client work keh kar na dikhayen.

## Sab se pehle bhejne ke liye

### 1. Asli UMJ Digital logo

- **File:** `public/assets/branding/logo-primary.svg`
- **Format:** Transparent SVG behtareen; warna high-resolution transparent PNG.
- **Kya chahiye:** UMJ Digital ka approved logo/wordmark. Current submitted UMJ logo website par use ho raha hai. AI se logo banwana zaroori nahi—updated brand file ho to original vector bhej dein.

### 2. Founders ki asli photos

Har founder ki alag, clear portrait photo chahiye:

- `public/assets/founders/founder-junaid.webp`
- `public/assets/founders/founder-umer.webp`
- `public/assets/founders/founder-muzammil.webp`

**Size:** 700 × 820 px ke qareeb, portrait.

**Photo ke liye idea:** Saaf background, natural light, chest-up ya waist-up framing, professional lekin friendly expression, simple dark ya neutral kapray. Har photo mein milta-julta lighting/style rakhain.

**AI prompt (sirf lighting/background reference ke liye; asli shakhs ki jagah AI face na lagayen):**

> Professional founder portrait photo, friendly confident South Asian creative technology entrepreneur, chest-up framing, natural soft studio lighting, simple dark navy clothing, uncluttered deep navy background with a subtle cyan accent light, premium editorial photography, realistic skin texture, centered subject, vertical portrait composition, no text, no logo, no watermark.

### 3. Asli client project ka screenshot

- **File:** `public/assets/portfolio/portfolio-ahmed-engineering.webp`
- **Size:** 1200 × 700 px ke qareeb, landscape.
- **Kya chahiye:** Ahmed Engineering website ka asli desktop/browser screenshot ya project ki approved photo. Browser screenshot mein personal data na ho.
- **Zaroori:** Is real-project image ke liye AI-generated engineering website istemal na karein. Website screenshot lene ya publish karne ki ijazat confirm karein.

## Service aur portfolio imagery

In prompts se **concept / sample artwork** banaya ja sakta hai. AI se banne wali portfolio images ko concept work ke taur par hi label karein.

### Website development

- **Service file:** `public/assets/services/service-web-development.webp`
- **Portfolio file:** `public/assets/portfolio/portfolio-ahmed-engineering.webp` ke ilawa client work dikhane ke liye real, approved screenshot dein; AI image ko real client result na banayen.
- **Size:** 1200 × 700 px, landscape.
- **Prompt:**

> Premium website design concept displayed on a large desktop monitor in a dark modern studio, elegant responsive business website layout with clean cards, generous whitespace, subtle cyan highlights on a deep navy interface, tasteful desk setup, realistic product photography, cinematic soft lighting, crisp screen details without readable text, no brand names, no logo, no watermark, landscape 1200x700.

### Mobile app

- **File:** `public/assets/portfolio/portfolio-mobile-app.webp`
- **Service file:** `public/assets/services/service-app-development.webp`
- **Size:** 1200 × 700 px, landscape.
- **Prompt:**

> Premium mobile app UI concept shown on two modern smartphones, one screen with a clean dashboard and the other with a simple service booking flow, deep navy interface with restrained electric cyan accents, realistic device mockups, soft studio reflections, polished product design presentation, no readable text, no brand names, no logos, no watermark, landscape 1200x700.

### Graphic design aur branding

- **Files:** `public/assets/portfolio/portfolio-graphic-design.webp` and `public/assets/services/service-graphic-design.webp`
- **Size:** 1200 × 700 px, landscape.
- **Prompt:**

> High-end visual identity design concept arranged as a tasteful brand presentation: abstract geometric mark, color swatches, typography samples represented by non-readable shapes, stationery and packaging mockups, deep navy and bright cyan palette with white space, premium art direction, soft realistic studio shadows, no real company names, no readable text, no watermark, landscape 1200x700.

### Video editing aur content creation

- **Poster file:** `public/assets/portfolio/portfolio-video-editing.webp`
- **Service image:** `public/assets/services/service-video-editing.webp`
- **Video file:** `public/assets/videos/video-editing-preview.mp4`
- **Image size:** 1200 × 700 px. **Video:** MP4 (H.264), muted-friendly, 3–20 seconds, 960 × 540 px ya us se bara.
- **Prompt for poster:**

> Creative video editing workstation showing a cinematic editing timeline on a monitor, vivid but tasteful cyan and violet lighting, a small camera and headphones on a clean desk, premium digital content studio, realistic photography, no readable screen text, no logos, no watermark, landscape 1200x700.

- **Prompt for video generator:**

> Create a seamless 6-second abstract motion-design loop for a premium digital studio: luminous cyan glass shapes drift and rotate slowly against a deep navy background, soft volumetric light, subtle particles, elegant restrained movement, centered composition, no text, no logo, no watermark, 16:9.

### Digital marketing

- **Files:** `public/assets/portfolio/portfolio-digital-marketing.webp` and `public/assets/services/service-digital-marketing.webp`
- **Size:** 1200 × 700 px, landscape.
- **Prompt:**

> Premium digital marketing campaign concept on a laptop and phone, abstract analytics dashboard with simple rising chart shapes and campaign cards, deep navy interface, clean cyan highlights, realistic modern workspace, strategic and trustworthy mood, no readable text, no real platform logos, no watermark, landscape 1200x700.

### UI/UX design (optional image)

- **File:** `public/assets/services/service-ui-ux-design.webp`
- **Size:** 1200 × 700 px, landscape.
- **Prompt:**

> UI and UX design process concept, refined interface wireframes transitioning into polished mobile and desktop screens on a clean design studio wall, deep navy, white and electric cyan palette, balanced grid, realistic monitor mockups, subtle soft lighting, no readable text, no logos, no watermark, landscape 1200x700.

## Hero aur background artwork

Yeh existing abstract artwork ko aap ke brand ke mutabiq upgrade karne ke liye optional hai.

| Filename | Kis kaam ke liye | Size |
|---|---|---:|
| `public/assets/hero/hero-main.webp` | Homepage 3D scene ke peeche hero artwork | 1200 × 700 |
| `public/assets/hero/hero-object-01.webp` | Strategy visual | 1200 × 700 |
| `public/assets/hero/hero-object-02.webp` | Product / digital experience visual | 1200 × 700 |
| `public/assets/hero/hero-object-03.webp` | Launch / growth visual | 1200 × 700 |
| `public/assets/hero/hero-texture.webp` | Soft texture/light overlay | 1200 × 700 |
| `public/assets/backgrounds/site-background.webp` | Site-wide subtle background | 1200 × 700 |

**Prompt (hero image ke liye):**

> Abstract premium 3D artwork for a digital creative studio website, sculptural translucent cyan glass ribbons and a few floating geometric forms, deep midnight navy environment, cinematic rim lighting, subtle fine grid, plenty of dark negative space on the left for white headline text, sophisticated, clean, high contrast but not busy, no text, no letters, no logo, no watermark, landscape 1200x700.

**Prompt (site background ke liye):**

> Very subtle seamless dark navy website background texture, faint soft cyan light bloom near the corners, barely visible fine grain and delicate abstract grid, center kept dark and uncluttered for readable white text, understated premium technology studio aesthetic, no objects, no text, no logo, no watermark, landscape 1200x700.

## Submitted motion aur 3D files

- `public/assets/3d/models/hero-objects.json` ek 2D Lottie animation hai, 3D model nahi. Website ise Lottie player se render karti hai.
- `public/assets/3d/environments/hero-environment.webp` aur `public/assets/3d/textures/cyan-grid.webp` actual Three.js scene mein use hote hain.
- Agar future mein real custom 3D model bhejna ho to optimized `.glb` file provide karein; usay existing JSON ke upar copy/rename na karein.

## Files dene se pehle checklist

- Exact filename aur extension match karein.
- Photos aur screenshots publish karne ka haq/permission aap ke paas ho.
- Real client work ke liye asli approved project screenshot hi dein.
- Founder files ke liye har founder ki asli photo dein; AI-generated chehra nahi.
- AI-generated project visuals ko concept/sample keh kar hi use karein.
- Images ko replace karne ke baad `npm run assets:verify` chala kar files check karein.
