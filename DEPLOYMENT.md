# CampusFind deployment guide

## 1. Push to GitHub

Create a new repository on GitHub, then run:

```bash
git remote add origin https://github.com/<your-username>/<your-repo>.git
git branch -M main
git push -u origin main
```

## 2. Deploy backend to Render

1. Go to Render and create a new Web Service.
2. Connect the GitHub repository.
3. Choose the backend folder as the project root.
4. Use these settings:
   - Build Command: `npm install`
   - Start Command: `npm start`
5. Add environment variables:

```env
PORT=5000
NODE_ENV=production
JWT_SECRET=your-secret-key
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/campusfind
```

6. Save and deploy.

## 3. Deploy frontend to Vercel

1. Go to Vercel and import the GitHub repository.
2. Set project root to the frontend folder.
3. Framework: Angular
4. Build command:

```bash
npm install && npm run build
```

5. Output directory:

```bash
dist/campusfind
```

6. Add environment variables if needed:

```env
API_BASE_URL=https://your-render-backend-url
```

## 4. Live URLs

After deployment, your app will be available at:

- Frontend: `https://<your-project>.vercel.app`
- Backend: `https://<your-service>.onrender.com`

## 5. Notes

- The backend skips MongoDB connection if `MONGODB_URI` is missing, but a real deployment needs a live MongoDB Atlas URI.
- The frontend should call the backend through the deployed Render URL.
