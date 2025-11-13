# Deployment Guide

This project can be deployed to **Render**, **Railway**, or **Fly.io** as a scheduled cron job running in a Docker container.

## Platform Comparison

### 🏆 Recommended: Render
**Pros:**
- Native cron job support (no workarounds needed)
- Simple YAML configuration
- Free tier includes cron jobs
- Automatic deployments from Git
- Built-in environment variable management
- No credit card required for free tier

**Cons:**
- Cron jobs on free tier have limitations (15 min timeout)

**Cost:** Free tier available, Starter plan $7/month for better resources

---

### Railway
**Pros:**
- Easy to use interface
- Good developer experience
- Fast deployments
- Automatic HTTPS

**Cons:**
- **No native cron support** - requires external service like cron-job.org or EasyCron
- Must use webhooks to trigger jobs
- Free tier is limited ($5 credit, then paid)

**Cost:** $5/month minimum spend after free credit

---

### Fly.io
**Pros:**
- Great for long-running services
- Excellent global distribution
- Good documentation

**Cons:**
- **No native cron support** - requires Fly Machines API or external scheduler
- More complex setup for scheduled jobs
- Requires credit card even for free tier

**Cost:** Free tier available, but requires credit card

---

## 🎯 Recommendation: Use **Render**

Render is the best choice because:
1. ✅ Native cron job support (key requirement)
2. ✅ Simple configuration via `render.yaml`
3. ✅ No external dependencies needed
4. ✅ Free tier available
5. ✅ No credit card required initially

---

## Deployment Instructions

### Option 1: Deploy to Render (Recommended)

1. **Create a Render account** at https://render.com

2. **Connect your Git repository**
   - Go to Dashboard → New → Cron Job
   - Connect your GitHub/GitLab repository

3. **Configure the cron job** (or use the `render.yaml` file):
   - Name: `backstopjs-tests`
   - Environment: `Docker`
   - Schedule: `0 1 * * *` (daily at 1 AM UTC)
   - Dockerfile Path: `./Dockerfile`

4. **Set environment variables**:
   - `NETLIFY_AUTH_TOKEN`: Your Netlify authentication token
   - `NODE_ENV`: `production` (optional, already in Dockerfile)

5. **Deploy**: Click "Create Cron Job"

### Option 2: Deploy to Railway

1. **Create a Railway account** at https://railway.app

2. **Install Railway CLI** (optional):
   ```bash
   npm install -g @railway/cli
   railway login
   ```

3. **Deploy from dashboard**:
   - New Project → Deploy from GitHub repo
   - Select your repository
   - Railway will detect the `Dockerfile`

4. **Set environment variables** in the Railway dashboard:
   - `NETLIFY_AUTH_TOKEN`

5. **Setup cron job**:
   - Railway doesn't support cron natively
   - Use external service like https://cron-job.org
   - Create a webhook trigger in Railway
   - Point cron-job.org to your Railway webhook URL

### Option 3: Deploy to Fly.io

1. **Install Fly CLI**:
   ```bash
   curl -L https://fly.io/install.sh | sh
   ```

2. **Login and create app**:
   ```bash
   fly auth login
   fly launch
   ```

3. **Set secrets**:
   ```bash
   fly secrets set NETLIFY_AUTH_TOKEN=your_token
   ```

4. **Setup scheduled runs**:
   - Fly.io doesn't support cron natively
   - Options:
     a. Use GitHub Actions to trigger Fly Machines API
     b. Use external service like cron-job.org with Fly's HTTP endpoint
     c. Deploy a separate scheduler service

5. **Deploy**:
   ```bash
   fly deploy
   ```

---

## Environment Variables Required

| Variable | Description | Where to get it |
|----------|-------------|-----------------|
| `NETLIFY_AUTH_TOKEN` | Netlify personal access token | Go to Netlify → User Settings → Applications → Personal access tokens |

---

## Testing Locally

Build and run the Docker container locally:

```bash
# Build the image
docker build -t backstopjs-tests .

# Run the tests
docker run --env NETLIFY_AUTH_TOKEN=your_token backstopjs-tests
```

---

## Monitoring

- **Render**: View logs in the Render dashboard under your cron job
- **Railway**: View logs in the Railway dashboard
- **Fly.io**: Use `fly logs` command

All platforms will show:
- Test execution output
- Netlify deployment status
- Slack notification confirmation

---

## Migration from GitHub Actions

The following GitHub Actions workflow steps have been replaced:

| GitHub Actions | New Solution |
|----------------|--------------|
| Scheduled workflow (`cron`) | Platform-native cron (Render) or external scheduler |
| `checkout@v3` | Git integration built into platform |
| `setup-node@v3` | Node included in Docker image |
| `yarn install` | Handled in Dockerfile |
| `yarn ci-test` | Run in container via `run-tests.sh` |
| Netlify deploy | Run in container via `run-tests.sh` |
| Slack notification | Run in container via `run-tests.sh` |

All functionality is preserved in the Docker container's entrypoint script.
