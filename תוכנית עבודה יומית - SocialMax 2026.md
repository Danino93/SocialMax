# תוכנית עבודה יומית - SocialMax 2026
## חלוקה לימים עם checkboxes להשלמת הפרויקט

**תאריך עדכון:** דצמבר 2026

---

## 💡 איך המערכת עובדת? (הסבר חשוב!)

### מודל העסק - Dropshipping של שירותי SMM

**אתה לא מייצר את השירותים בעצמך - אתה מתווך!**

1. **ספק SMM חיצוני** (למשל: SMMPanel, SocialPanel, SmmStorm)
   - יש להם API
   - הם מציעים שירותים (לייקים, עוקבים, וכו')
   - יש להם מחיר ספק (למשל: $2.50 ל-1000 לייקים)

2. **אתה (SocialMax)**
   - אתה רושם אצלם חשבון
   - אתה מקבל API Key
   - אתה קונה מהם את השירותים במחיר שלהם
   - אתה מוכר הלאה ללקוחות שלך במחיר גבוה יותר

3. **הלקוח שלך**
   - רואה את השירותים שלך באתר
   - משלם לך (למשל: ₪15 ל-1000 לייקים)
   - אתה מרוויח את ההפרש (₪15 - ₪10 = ₪5 רווח)

### דוגמה מעשית:

```
ספק SMM (SMMPanel) מציע:
- Instagram Likes: $2.50 ל-1000
- Service ID: 1234

אתה ב-SocialMax מוכר:
- מחיר ללקוח: ₪15 ל-1000
- המחיר שאתה משלם לספק: ₪10 ($2.50)
- הרווח שלך: ₪5 (50% markup)
```

### מה קורה כשלקוח יוצר הזמנה?

1. הלקוח בוחר שירות ומשלם לך
2. המערכת שלך שולחת בקשה ל-API של הספק (SMMPanel)
3. הספק מבצע את ההזמנה בפועל (מוסיף לייקים/עוקבים)
4. הספק מעדכן אותך דרך Webhook כשההזמנה מסתיימת
5. הלקוח רואה את התוצאות

**אז אתה לא צריך ליצור בוטים או תוכנות - אתה רק מתווך!**

---

## ✅ מה כבר קיים במערכת

### Backend - 60% מוכן
- ✅ Server.js - Express עם כל ה-middleware
- ✅ Models - User, Service, Order, Transaction (מלאים!)
- ✅ Controllers - auth, services, orders (חלקי)
- ✅ Routes - auth, user, services, orders
- ✅ Authentication - JWT מלא

### Frontend - 75% מוכן
- ✅ React + TypeScript - כל הדפים
- ✅ Routing - כל ה-routes מוגדרים
- ✅ Components - UI components
- ✅ API Layer - api.ts מוכן

---

## 🚀 תוכנית עבודה יומית

### יום 1: תשתית וסביבת עבודה

#### חלק 1: הכנת סביבת עבודה
- [ ] בדיקת Node.js ו-npm מותקנים
- [ ] התקנת dependencies בפרונטאנד (`npm install` בתיקיית frontend)
- [ ] התקנת dependencies בבקאנד (`npm install` בתיקיית backend)
- [ ] יצירת `.env.example` עם כל המשתנים הנדרשים
- [ ] יצירת `.env` מהדוגמה (בלי פרטים רגישים)

#### חלק 2: ניקוי MongoDB (זמני)
- [ ] הסרת חיבורי MongoDB מהקוד הזמני
- [ ] הערה על המחיקה בסיכום

**מטרת היום:** סביבת עבודה מוכנה, dependencies מותקנים

---

### יום 2: בחירת ספק SMM והבנת API

#### חלק 1: מחקר ספקים
- [ ] רשימת ספקי SMM פופולריים (SMMPanel, SocialPanel, SmmStorm)
- [ ] השוואת מחירים ואיכות
- [ ] בדיקת תמיכה בעברית/ישראל
- [ ] בחירת ספק אחד להתחלה

#### חלק 2: רישום והכנה
- [ ] רישום חשבון אצל הספק הנבחר
- [ ] קבלת API Key
- [ ] קריאת Documentation של ה-API
- [ ] יצירת חשבון בדיקה (test account)

#### חלק 3: הבנת המבנה
- [ ] הבנת איך הספק מגדיר שירותים (service IDs)
- [ ] הבנת איך יוצרים הזמנה דרך ה-API
- [ ] הבנת Webhooks לעדכונים

**מטרת היום:** ספק נבחר, API Key ביד, הבנה בסיסית של ה-API

---

### יום 3: יצירת Base Service Class

#### חלק 1: תשתית Services
- [ ] יצירת קובץ `backend/src/services/BaseService.js`
- [ ] הגדרת מבנה בסיסי לכל ספק
- [ ] פונקציות משותפות: `createOrder()`, `checkStatus()`, `cancelOrder()`
- [ ] Error handling בסיסי

#### חלק 2: Provider Registry
- [ ] יצירת `backend/src/services/ProviderRegistry.js`
- [ ] מערכת רישום ספקים
- [ ] זיהוי ספק לפי `service.provider.name`
- [ ] יצירת instance של הספק הנכון

#### חלק 3: Configuration
- [ ] יצירת `backend/src/config/providers.js`
- [ ] הגדרת API keys ב-.env
- [ ] מבנה configuration לכל ספק

**מטרת היום:** תשתית Services מוכנה, מבנה בסיסי לכל הספקים

---

### יום 4-5: אינטגרציה ראשונה עם ספק SMM

#### יום 4: חיבור בסיסי לספק
- [ ] יצירת `backend/src/services/SmmPanelService.js` (או שם הספק)
- [ ] חיבור ל-API עם axios
- [ ] פונקציה `getServices()` - רשימת שירותים מהספק
- [ ] פונקציה `createOrder(order)` - יצירת הזמנה אצל הספק
- [ ] בדיקות בסיסיות עם Postman/Insomnia

#### יום 5: הוספת לוגיקה מתקדמת
- [ ] טיפול בתשובות מה-API
- [ ] שמירת `providerOrderId` ב-Order
- [ ] עדכון `order.providerStatus`
- [ ] Error handling מתקדם עם retry logic
- [ ] Logging של כל הבקשות

**מטרת ימים 4-5:** חיבור עובד לספק SMM, יכולת ליצור הזמנות

---

### יום 6: חיבור OrdersController לספקים

#### חלק 1: השלמת createOrder
- [ ] פתיחת `backend/src/controllers/ordersController.js`
- [ ] הוספת `processOrder()` לאחר יצירת Order
- [ ] קריאה ל-ProviderRegistry להשיג את הספק הנכון
- [ ] שליחת הזמנה לספק דרך ה-Service
- [ ] עדכון Order עם `providerOrderId`

#### חלק 2: עדכון Status
- [ ] עדכון Order.status ל-'processing' כשנשלח
- [ ] עדכון Order.status ל-'in_progress' כשיתחיל
- [ ] Error handling - אם הספק דוחה, עדכון ל-'failed'

**מטרת היום:** כשמשתמש יוצר הזמנה, היא נשלחת לספק בפועל

---

### יום 7: Webhooks לעדכוני סטטוס

#### חלק 1: Webhook Endpoint
- [ ] יצירת route `/api/webhooks/provider` ב-`server.js`
- [ ] Middleware לאימות webhook signature
- [ ] פונקציה לעדכון Order לפי webhook data
- [ ] עדכון `order.delivered` בזמן אמת

#### חלק 2: עדכון Orders
- [ ] עדכון `order.status` לפי `providerStatus`
- [ ] עדכון `order.delivered` כשהספק מדווח
- [ ] עדכון `order.remains` (quantity - delivered)
- [ ] עדכון ל-'completed' כשההזמנה מסתיימת

#### חלק 3: Testing
- [ ] בדיקת webhooks עם הספק (אם יש sandbox)
- [ ] בדיקת עדכונים בזמן אמת

**מטרת היום:** Orders מתעדכנים אוטומטית כשיש עדכונים מהספק

---

### יום 8: Cron Jobs לבדיקת הזמנות תקועות

#### חלק 1: Setup node-cron
- [ ] וידוא ש-node-cron מותקן (כבר ב-package.json)
- [ ] יצירת `backend/src/jobs/orderChecker.js`
- [ ] הגדרת cron job (כל 10 דקות)

#### חלק 2: לוגיקת בדיקה
- [ ] מציאת הזמנות ב-'processing' יותר מ-X שעות
- [ ] בדיקה עם הספק מה הסטטוס
- [ ] עדכון Order בהתאם
- [ ] התראות על הזמנות תקועות

#### חלק 3: Integration
- [ ] הוספת `require('./jobs/orderChecker')` ב-`server.js`
- [ ] בדיקת הרצת cron job

**מטרת היום:** המערכת בודקת בעצמה הזמנות תקועות ומעדכנת

---

### יום 9: מערכת תשלומים - תשתית

#### חלק 1: Payment Controller
- [ ] יצירת `backend/src/controllers/paymentController.js`
- [ ] פונקציה `addFunds(req, res)` - הוספת כסף ליתרה
- [ ] פונקציה `getPaymentMethods(req, res)` - רשימת אמצעי תשלום

#### חלק 2: Payment Routes
- [ ] יצירת `backend/src/routes/payments.js`
- [ ] Route `POST /api/payments/add-funds`
- [ ] Route `GET /api/payments/methods`
- [ ] הוספת routes ל-`server.js` (הסרת הערה)

#### חלק 3: Transaction Integration
- [ ] יצירת Transaction כשמשתמש מוסיף כסף
- [ ] עדכון User.balance
- [ ] ולידציה - סכום מינימלי/מקסימלי

**מטרת היום:** תשתית תשלומים מוכנה (בלי חיבור לספקים חיצוניים עדיין)

---

### יום 10-11: אינטגרציית Stripe

#### יום 10: Setup Stripe
- [ ] רישום ב-Stripe
- [ ] קבלת API Keys (Secret + Publishable)
- [ ] התקנת `stripe` package (כבר ב-package.json)
- [ ] הוספת Stripe keys ל-.env

#### יום 11: Implementation
- [ ] יצירת Payment Intent ב-`addFunds()`
- [ ] יצירת checkout session
- [ ] Webhook לעדכון תשלום (`/api/webhooks/stripe`)
- [ ] עדכון User.balance כשתשלום מצליח
- [ ] בדיקות עם Stripe test cards

**מטרת ימים 10-11:** משתמש יכול להוסיף כסף דרך Stripe

---

### יום 12-13: אינטגרציית bit (תשלומים ישראליים)

#### יום 12: Setup bit
- [ ] רישום ב-bit
- [ ] קבלת API Key
- [ ] קריאת Documentation
- [ ] הבנת flow של תשלום

#### יום 13: Implementation
- [ ] יצירת תשלום ב-bit API
- [ ] יצירת payment link
- [ ] Webhook לעדכון (`/api/webhooks/bit`)
- [ ] עדכון User.balance
- [ ] תמיכה בשקלים

**מטרת ימים 12-13:** משתמש יכול לשלם ב-bit (שקלים)

---

### יום 14: Email Service

#### חלק 1: Setup Nodemailer
- [ ] וידוא ש-nodemailer מותקן (כבר ב-package.json)
- [ ] בחירת שירות SMTP (Gmail/SendGrid/Mailgun)
- [ ] הוספת SMTP credentials ל-.env

#### חלק 2: Email Templates
- [ ] יצירת `backend/src/utils/emailTemplates.js`
- [ ] Template לאימות אימייל (עברית)
- [ ] Template לאיפוס סיסמה (עברית)
- [ ] Template לאישור הזמנה (עברית)
- [ ] Template לעדכון סטטוס הזמנה (עברית)

#### חלק 3: Integration
- [ ] פתיחת TODO ב-`authController.js:398`
- [ ] השלמת `forgotPassword()` עם שליחת אימייל
- [ ] הוספת שליחת אימייל ב-`register()`
- [ ] הוספת שליחת אימייל ב-`createOrder()`

**מטרת היום:** משתמשים מקבלים אימיילים על פעולות

---

### יום 15-17: Admin Panel Backend

#### יום 15: Admin Controller - משתמשים
- [ ] יצירת `backend/src/controllers/adminController.js`
- [ ] פונקציה `getUsers()` - רשימת כל המשתמשים
- [ ] פונקציה `getUserById()` - פרטי משתמש
- [ ] פונקציה `updateUser()` - עדכון משתמש
- [ ] פונקציה `banUser()` / `suspendUser()`

#### יום 16: Admin Controller - שירותים והזמנות
- [ ] פונקציה `createService()` - יצירת שירות חדש
- [ ] פונקציה `updateService()` - עדכון שירות
- [ ] פונקציה `deleteService()` - מחיקת שירות
- [ ] פונקציה `getAllOrders()` - כל ההזמנות
- [ ] פונקציה `getOrderById()` - פרטי הזמנה

#### יום 17: Admin Controller - דוחות
- [ ] פונקציה `getStats()` - סטטיסטיקות כלליות
- [ ] פונקציה `getAnalytics()` - אנליטיקס מתקדם
- [ ] פונקציה `getRevenueReport()` - דוח הכנסות
- [ ] יצירת `backend/src/routes/admin.js`
- [ ] הוספת routes ל-`server.js` (הסרת הערה)
- [ ] Middleware `requireAdmin()` (אם חסר)

**מטרת ימים 15-17:** Backend מלא לפאנל אדמין

---

### יום 18: בדיקות ותיקונים

#### חלק 1: בדיקות E2E
- [ ] זרימת הרשמה + התחברות
- [ ] זרימת הוספת כסף + יצירת הזמנה
- [ ] בדיקת שההזמנה נשלחת לספק
- [ ] בדיקת עדכון סטטוס דרך webhook

#### חלק 2: תיקוני באגים
- [ ] תיקון שגיאות שנמצאו
- [ ] שיפור error messages
- [ ] הוספת logging

#### חלק 3: אופטימיזציה
- [ ] בדיקת ביצועים
- [ ] שיפור queries למסד נתונים (כשיהיה)
- [ ] בדיקת memory leaks

**מטרת היום:** מערכת יציבה שעובדת מקצה לקצה

---

### יום 19-20: מעבר ל-SQL (רק בסוף!)

#### יום 19: תכנון Schema SQL
- [ ] יצירת `database/schema.sql`
- [ ] טבלת `users` - כל השדות מ-User model
- [ ] טבלת `services` - כל השדות מ-Service model
- [ ] טבלת `orders` - כל השדות מ-Order model
- [ ] טבלת `transactions` - כל השדות מ-Transaction model
- [ ] Foreign Keys ו-Relationships
- [ ] Indexes לביצועים

#### יום 20: יצירת SQL Schema
- [ ] השלמת `database/schema.sql`
- [ ] בדיקת תקינות ה-SQL
- [ ] יצירת migration script אם צריך
- [ ] תיעוד ה-Schema

**מטרת ימים 19-20:** SQL Schema מוכן וחכם (לא מיושם עדיין!)

---

### יום 21-22: Seeds עבור SQL

#### יום 21: תכנון Seeds
- [ ] רשימת שירותים ראשוניים לכל פלטפורמה
- [ ] שירותים לדוגמה עם מחירים ריאליים
- [ ] משתמש אדמין ראשוני
- [ ] קטגוריות ופלטפורמות

#### יום 22: יצירת Seeds SQL
- [ ] יצירת `database/seeds.sql`
- [ ] INSERT statements לכל השירותים
- [ ] INSERT למשתמש אדמין (להגדיר סיסמה!)
- [ ] הערות ו-Documentation

**מטרת ימים 21-22:** SQL עם נתונים ראשוניים מוכן

---

## 📋 סיכום - מה הושלם ומה נשאר

### ✅ הושלם:
- תשתית Backend (60%)
- תשתית Frontend (75%)
- Authentication מלא

### 🔄 נותר להשלים:
- [ ] אינטגרציית ספק SMM (ימים 2-7)
- [ ] מערכת תשלומים (ימים 9-13)
- [ ] Email Service (יום 14)
- [ ] Admin Backend (ימים 15-17)
- [ ] SQL Schema (ימים 19-20)

---

## ⚠️ הערות חשובות

1. **SQL בסוף** - רק בימים 19-20 ניצור את ה-Schema. עד אז נמשיך בלי מסד נתונים או עם משהו זמני.

2. **בחירת ספק SMM** - זה הצעד החשוב ביותר! צריך לבחור ספק טוב ואמין.

3. **API Keys** - כל ה-API Keys צריכים להיות ב-.env, לא בקוד!

4. **בדיקות** - חשוב לבדוק כל שלב לפני מעבר לשלב הבא.

---

**תוכנית זו מחולקת לימים - כל יום יש לו מטרה ברורה וcheckboxes לסמן.**

**עודכן:** דצמבר 2026
