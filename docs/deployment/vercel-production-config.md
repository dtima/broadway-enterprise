# Vercel Production Environment Configuration

## Environment Variables to Set in Vercel Dashboard

Navigate to your Vercel project dashboard → Settings → Environment Variables and add the following:

### 🌐 Site Configuration

```
NEXT_PUBLIC_SITE_URL=https://broadway-corp.com
NEXT_PUBLIC_DEFAULT_LOCALE=en
NEXT_PUBLIC_SUPPORTED_LOCALES=en,fr
```

### 🔥 Firebase Client Configuration (Public)

```
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyB7uNlFOwD6vcEC-XLZEum98taOMj3135o
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=broadway-corporation.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=broadway-corporation
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=broadway-corporation.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=362269714661
NEXT_PUBLIC_FIREBASE_APP_ID=1:362269714661:web:a2da432beff1836af80c0c
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-23QJFTL90F
```

### 🔐 Firebase Admin SDK Configuration (Private)

```
FIREBASE_ADMIN_PROJECT_ID=broadway-corporation
FIREBASE_ADMIN_CLIENT_EMAIL=firebase-adminsdk-fbsvc@broadway-corporation.iam.gserviceaccount.com
FIREBASE_ADMIN_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----
MIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQD1EYkeLbG+Irlz
tqp2QPO/kjgpebUX4kCaraHkrbjDGEI4aQgkf8c7MjdA3jUXlh4HBXCJFYcNi2Ga
qqJhltMzjkThpgKLM9tUysVFZtFMbhnPGmuo3h0wuDVlYYpbenp5V9N9zcYhUBai
LmpYnqA4flrpi4WN2LS+BS+jdceN9KfooJBsmnVqhqfvLymy4V0FaAdp2wt1cquL
bzZUaxnS07LumeWWso+SsHWUyAIG84XD30ZA3wIzzuWiMCmiPonDhQ16Ni5FMkw2
psy3Y0pbBrtURvyaR8CaNxRmm+lVLQyGpWoehzGFIDWifjgIyB+E1fOjXUJ3NwAf
kOjLL2BpAgMBAAECggEAFJAbHEAjSNvrCa2LEg8TJMDlG33N1yox14i4K9LzzNLt
Q4R0nXNnSS1Ge5fphogfDuHC9o2q3lUSpIKqy1t3bz0BxJlEX1/DiJLXCKK+7xXR
7pG99NZmRp8+Q7pyfIiDXEklQsoQVN0+eO9CFxuAQB1CDZSaaTOEvuj6fVG1o9B4
eZffQ4HdFszU/G5T0JydepnEisSDhlKfa5fUn9aAdwUZdpyW5SRajb5qE4DLKHR0
HnJjbMfNH8wQDMIxhIOfl4oIoDYDp2iGvfIfn7mXb5FxIbJld2iSbqiQ+JgUGNp9
416BokXJFvg6d2Huxk7ImEd3Q6h4pNfHHEAY6OeH3QKBgQD7X+E5sMBxOlYdTxk7
kRfAVXNEpU+XNKNT5TUqRWYXPUr0io78hvTrgeSPNjh5Q5v1rpBummwGwprDQigs
gdZF0pC6kvs9k4YvZV0Z0gTDbjdcl6yyL8N3bmzNpRjOk80Hd2mg1soiuXZQpjfR
7XOjxiPPu+wlqfM0Ltbbyii/VwKBgQD5k/NkiurjPmRpmzq+LyzQcfs5pDvVU2DJ
7dyOhKfLiHkIVPTp0aBTeequLsGAmsPd+PrFoD83+yJbmSQ78QJCxRJMAHqtxsC6
nQObz/HFBUGshZkSm2WFZq5QkkHxgwMQSRTp4NW26cTsCIAGeUvgHLthEfU37Zmk
7UWolk3GPwKBgQCY9OCRQBH5U+vubaEG8+Sl7djz3jst4KO5evD8xbm3Tl57qowS
8PO7EhDHa9C1SQRvXEcaZfBxtJyDT5AudNqzJctXG/SwpUGzOVSLT5YCbOBXARve
WN3xoEmoYFtV5+2MK4ckjU32DzAFJv80R+5jqz9DOjAZQu5vxEiM+NgOhQKBgQDY
ZqGe5xj9iubT7uXDa/Imlv4nH7FFqjL9Q8J+zKUVRLL1N3zYlIu4dbi36RCdKxR0
DmOaIfVO2/ERjTquwq2cKXZQ8gVtUi1gYa50VpyioYktRvXP/W/MeJjigb6t41Qv
tb5tgCauoAnAQyqG8nuIykDqzQBbyyfyqk1A/XpYTwKBgQDc0e0CRFDaTY0sxfZQ
uWmjypB88RaVauF5H+DX+RmYeE/ZJeITSxq7a5qA0/HzixsnuqY5EHa9Vuifaixi
QsTM+bKy9DBgAOPM3L6GxzsjBMiYuGi2S0Jvr0BsDOuiFvJ/6QsiSebwGHfuBjTj
SuMQ7tNQDl3nq6YeHEczsQdGDQ==
-----END PRIVATE KEY-----
```

## 📋 Step-by-Step Vercel Configuration

### 1. Access Vercel Dashboard

- Go to [vercel.com](https://vercel.com)
- Navigate to your `broadwaycorp` project
- Click **Settings** → **Environment Variables**

### 2. Add Environment Variables

For each variable above:

1. Click **Add New**
2. Enter the **Name** (e.g., `NEXT_PUBLIC_SITE_URL`)
3. Enter the **Value** (e.g., `https://broadway-corp.com`)
4. Select **Production** environment
5. Click **Save**

### 3. Important Notes

#### 🔥 Firebase Auth Domain Configuration

After setting up the environment variables, you MUST update Firebase Console:

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select `broadway-corporation` project
3. Navigate to **Authentication** → **Settings** → **Authorized domains**
4. Add: `broadway-corp.com`
5. Add: `www.broadway-corp.com`

#### 🔐 Private Key Formatting

When entering `FIREBASE_ADMIN_PRIVATE_KEY` in Vercel:

- Copy the ENTIRE private key including `-----BEGIN PRIVATE KEY-----` and `-----END PRIVATE KEY-----`
- Vercel will automatically handle the newline characters
- Do NOT modify the formatting

#### 🌐 Site URL Configuration

- Update `NEXT_PUBLIC_SITE_URL` to your production domain
- This affects redirects and CORS validation

## 🚀 Deployment Checklist

- [ ] All environment variables added to Vercel
- [ ] Firebase authorized domains updated
- [ ] Production domain configured
- [ ] SSL certificate active
- [ ] DNS records pointing to Vercel

## 🔍 Troubleshooting Production Issues

### Common 500 Error Causes:

1. **Missing Environment Variables** - Check all variables are set
2. **Firebase Auth Domain** - Ensure domain is authorized
3. **Private Key Format** - Verify complete private key with headers
4. **CORS Issues** - Check Firebase project settings

### Debug Steps:

1. Check Vercel Function logs: Project → Functions → View logs
2. Verify Firebase Console settings
3. Test authentication flow in production
4. Monitor network requests in browser dev tools

## 📞 Support

If issues persist after following this guide:

1. Check Vercel deployment logs
2. Verify Firebase project configuration
3. Test with curl/Postman for API endpoints
