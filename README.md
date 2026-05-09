# FORGE — راهنمای ساخت APK

این پوشه همه چیزی که برای ساخت **APK واقعی native** نیاز داری رو شامل می‌شه. APK کاملاً مستقل، آفلاین، بدون Chrome.

## مراحل ساخت APK (تقریباً ۱۰ دقیقه)

### ۱. اکانت GitHub بساز (اگه نداری)

برو [https://github.com/signup](https://github.com/signup) و یه اکانت رایگان بساز. ایمیل + پسورد + یوزرنیم. ۲ دقیقه طول می‌کشه.

### ۲. یه repository جدید بساز

1. بعد از login، روی دکمه‌ی سبز **New** بزن (یا [این لینک](https://github.com/new))
2. **Repository name**: `forge-app` (یا هر اسمی)
3. **Public** انتخاب کن (Private هم می‌شه ولی Public ساده‌تره)
4. تیک **"Add a README file"** رو بزن
5. **Create repository**

### ۳. فایل‌ها رو آپلود کن

این پوشه (forge-android) رو روی کامپیوترت دانلود کن. الان:

1. توی repository که ساختی، روی **"Add file"** → **"Upload files"** کلیک کن
2. **همه‌ی محتویات پوشه‌ی forge-android** رو drag & drop کن (نه پوشه‌ی forge-android خودش، بلکه فایل‌های داخلش)
3. باید این چیزا آپلود بشه:
   - پوشه `www/` (با همه فایل‌هاش)
   - پوشه `.github/` (با workflow)
   - فایل `package.json`
   - فایل `capacitor.config.json`
   - فایل `README.md` (همین فایل)
4. پایین صفحه **Commit changes** بزن

⚠️ **مهم**: حتماً پوشه `.github` با محتویاتش آپلود بشه. اگه فقط GitHub رو باز کنی و فولدرها رو دستی بسازی، به مشکل می‌خوری. بهترین کار اینه که از zip استفاده کنی.

### ۴. Workflow رو اجرا کن

1. توی repository، tab **Actions** رو کلیک کن
2. اگه پیغام داد "Workflows aren't being run on this repository" → روی **"I understand my workflows, go ahead and enable them"** بزن
3. سمت چپ، **Build APK** رو می‌بینی → کلیک کن
4. سمت راست، دکمه‌ی **Run workflow** رو بزن
5. توی پنجره‌ی pop-up، دوباره **Run workflow** بزن

حالا GitHub داره برات APK می‌سازه! ~۵-۸ دقیقه طول می‌کشه.

### ۵. APK رو دانلود کن

1. صفحه‌ی Actions رو refresh کن
2. یه run جدید با تیک سبز ✅ ظاهر می‌شه (بعد از ~۸ دقیقه)
3. روش کلیک کن
4. پایین صفحه، یه بخش **Artifacts** هست
5. روی **forge-app-debug** کلیک کن → دانلود می‌شه (یه ZIP)
6. ZIP رو extract کن → داخلش **app-debug.apk** هست

### ۶. روی گوشی نصب کن

1. APK رو به گوشی منتقل کن (تلگرام، Drive، USB)
2. روش کلیک کن → **Install**
3. ممکنه گوشی بپرسه "Install from unknown sources" → **Allow**
4. آیکون FORGE روی صفحه می‌شینه

تموم! این APK کاملاً مستقله، آفلاین، بدون نیاز به Netlify، بدون Chrome.

---

## برای آپدیت‌های بعدی

اگه فایل HTML رو تغییر دادی:

1. توی repository، فایل `www/index.html` رو پیدا کن
2. روی آیکون قلم (✏️) بالا راست بزن → ادیت کن
3. یا فایل جدید رو drag کن (replace)
4. Commit changes بزن
5. Workflow خودکار اجرا می‌شه و APK جدید آماده می‌شه

---

## مشکلات رایج

**Q: Workflow ولی red ✗ شده، چه کار کنم؟**  
A: روی workflow کلیک کن، روی job ای که قرمز شده کلیک کن. ببین کدوم step خطا داده. عکس بفرست.

**Q: ZIP خالیه**  
A: یعنی build fail شد. Logs رو ببین.

**Q: APK نصب نمی‌شه**  
A: گوشی باید "Install from unknown sources" رو فعال کنه. توی Settings → Security یا Apps → ادیت "Special access"

**Q: می‌خوام بدون امضاء (signed) build کنم برای فروشگاه**  
A: APK فعلی **debug** هست — برای استفاده‌ی شخصی OK. برای فروشگاه‌ها (Google Play, Cafe Bazaar) باید release+signed بسازیم. این مرحله‌ی بعدیه که جداگانه راهنمایی می‌کنم.
