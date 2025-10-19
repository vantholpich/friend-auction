# Deploying to Vercel

## Quick Deploy

1. **Install Vercel CLI** (optional):
   ```bash
   npm install -g vercel
   ```

2. **Deploy via Vercel Dashboard** (recommended):
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your Git repository (GitHub, GitLab, or Bitbucket)
   - Vercel will auto-detect the settings from `vercel.json`
   - Add your environment variables:
     - `EXPO_PUBLIC_SUPABASE_URL`
     - `EXPO_PUBLIC_SUPABASE_ANON_KEY`
   - Click "Deploy"

3. **Deploy via CLI**:
   ```bash
   cd friend-auction
   vercel
   ```
   
   Follow the prompts and add environment variables when asked.

## Environment Variables

Make sure to add these in your Vercel project settings:

- `EXPO_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `EXPO_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anon/public key

## Build Settings (Auto-configured)

The `vercel.json` file configures:
- **Build Command**: `npx expo export --platform web`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

## Testing Locally

Before deploying, test the production build:

```bash
npm run web
```

## Continuous Deployment

Once connected to Git, Vercel will automatically:
- Deploy on every push to main/master branch
- Create preview deployments for pull requests
- Use the environment variables from your project settings

## Custom Domain

After deployment, you can add a custom domain in:
Vercel Dashboard → Your Project → Settings → Domains
