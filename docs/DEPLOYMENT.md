# CipherX AI Deployment Guide 🚀

This document provides step-by-step instructions for deploying the **CipherX AI** application to production environments.

## 🔑 Prerequisites

Before deploying, ensure you have:
1. A **Google Gemini API Key** obtained from the [Google AI Studio](https://aistudio.google.com/).
2. The application code pushed to a **GitHub Repository**.
3. (Optional) A custom domain for your production environment.

---

## 1. Deployment via GitHub + Vercel (Recommended)

Vercel is the easiest way to host React-based frontend applications.

### Steps:
1. **Connect Repository**:
   - Log in to [Vercel](https://vercel.com).
   - Click **"New Project"**.
   - Import your GitHub repository.

2. **Configure Project**:
   - **Framework Preset**: If you are using a bundler like Vite, select it. If this is a static setup, select "Other".
   - **Root Directory**: `./`
   - **Build Command**: If using a bundler: `npm run build` or `vite build`. If strictly using the static `index.html` setup: (leave blank).
   - **Output Directory**: If using a bundler: `dist`. If static: `./`.

3. **Environment Variables**:
   - Under the "Environment Variables" section, add:
     - **Key**: `API_KEY`
     - **Value**: `your_gemini_api_key_here`

4. **Deploy**:
   - Click **Deploy**. Vercel will provide you with a production URL.

---

## 2. Deployment via Google Cloud Run

Cloud Run is ideal if you want to containerize your application and run it on Google's serverless infrastructure.

### A. Prepare a Dockerfile
Create a `Dockerfile` in your root directory:

```dockerfile
# Step 1: Build the app (Assuming a standard build process)
FROM node:18-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Step 2: Serve with Nginx
FROM nginx:stable-alpine
COPY --from=build-stage /app/dist /usr/share/nginx/html
# For Single Page App routing
RUN sed -i 's/index  index.html index.htm;/index  index.html index.htm; try_files $uri $uri\/ \/index.html;/g' /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### B. Deploy using Google Cloud CLI
1. **Build and Submit Image**:
   ```bash
   gcloud builds submit --tag gcr.io/[PROJECT_ID]/cipherx-ai
   ```

2. **Deploy to Cloud Run**:
   ```bash
   gcloud run deploy cipherx-ai \
     --image gcr.io/[PROJECT_ID]/cipherx-ai \
     --platform managed \
     --region [YOUR_REGION] \
     --allow-unauthenticated \
     --set-env-vars API_KEY=your_gemini_api_key_here
   ```

---

## ⚙️ Environment Variables Configuration

The application relies on the following environment variable to communicate with the Gemini API:

| Variable | Description | Source |
|----------|-------------|--------|
| `API_KEY` | Your Google GenAI API Key | [Google AI Studio](https://aistudio.google.com/) |

### Local Development
For local testing, create a `.env` file in the root directory:
```env
API_KEY=your_gemini_api_key_here
```

---

## 🛡️ Security Best Practices

1. **API Key Restriction**: In the [Google Cloud Console](https://console.cloud.google.com/), restrict your API key to only the **Generative Language API** and restrict usage to your specific production domains.
2. **Protocol Lockdown**: Ensure that `process.env.API_KEY` is not exposed in public repositories. Use Vercel Secrets or Cloud Run environment variables.
3. **HTTPS**: Both Vercel and Cloud Run provide SSL by default. Ensure your custom domain is correctly configured with HTTPS to protect user conversations.

---
*Maintained by the CipherX Engineering Team.*
