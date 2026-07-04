# Evelyn Wharf Cycles — Website

Simple static site scaffold for the Evelyn Wharf Cycles shop.

Quick start

1. Place the provided shop image (from attachments) into `images/ewc-logo.jpg`.
2. Open `index.html` in a browser (double-click or serve with a static server).

Files created

- `index.html` — home page
- `about.html` — about page
- `services.html` — services summary
- `contact.html` — contact form (mailto)
- `css/styles.css` — site styles
- `images/` — add `ewc-logo.jpg` here (not included in repo by default)

Notes

- The contact form uses `mailto:`; replace with a server endpoint or JS handler if you want saved submissions.
- Update contact details in each page to match the real shop info.
- A content editor is available at `/admin/` once the site is deployed to Netlify (see setup below).
- Content lives in `content/site.json`, `content/services.json`, and `content/bikes.json`.
- Because the pages load JSON content with `fetch()`, open the site through a web server or deployed host, not by double-clicking the HTML files.
- The code lives on GitHub at [rowan888/evelyn-wharf-cycles-website](https://github.com/rowan888/evelyn-wharf-cycles-website).

How the client edits content

1. Open `/admin/` on the live site.
2. Click "Login with GitHub" and sign in with a GitHub account that has access to the repository.
3. Use "General site content" to edit the homepage, About, Contact, and footer text.
4. Use "Services" to update service names and descriptions.
5. Use "Bike listings" to add a new bike, upload photos, mark items sold, or remove old listings.
6. Click "Publish" to save the changes — this commits directly to the GitHub repository, and Netlify automatically rebuilds the live site.

Recommended setup steps for Netlify

1. Log in to Netlify and choose "Add new site" → "Import an existing project" → GitHub.
2. Select the `rowan888/evelyn-wharf-cycles-website` repository.
3. Keep the default build settings (no build command; publish directory `.`) and deploy.
4. Note the live site URL Netlify gives you (e.g. `https://your-site-name.netlify.app`).

How to allow the admin to log in (GitHub login via Netlify OAuth)

The content editor here uses the `github` backend, authenticated through Netlify's built-in OAuth provider. This avoids Netlify Identity/Git Gateway, which Netlify has marked deprecated for new setups. Anyone who logs in must have push access to the GitHub repository (owner or invited collaborator).

1. Create a GitHub OAuth App at [github.com/settings/developers](https://github.com/settings/developers) → "New OAuth App".
   - Homepage URL: your live Netlify URL (e.g. `https://your-site-name.netlify.app`)
   - Authorization callback URL: `https://api.netlify.com/auth/done`
2. After creating it, copy the Client ID, then generate and copy the Client Secret.
3. In Netlify, go to Project configuration → Access & security → OAuth.
4. Under Authentication Providers, select "Install provider" → GitHub, and paste in the Client ID and Client Secret. Save.
5. Visit `https://your-site-name.netlify.app/admin/` and click "Login with GitHub".
6. Authorize the app in the popup window — you'll be logged in and ready to edit.

Adding another editor (e.g. the shop owner)

- They need their own GitHub account.
- Add them as a collaborator on the repo: GitHub repo → Settings → Collaborators → Add people.
- They then log in at `/admin/` the same way, using "Login with GitHub".

If login fails

- Make sure the site is deployed on Netlify; the editor login will not work from a local file preview.
- Make sure the GitHub OAuth App's callback URL is exactly `https://api.netlify.com/auth/done`.
- Make sure the GitHub account logging in has push access to the repository.
- If the popup closes with an error, double check the Client ID/Secret saved in Netlify's OAuth settings match the GitHub OAuth App.
- If the editor opens but Publish fails, check the account still has write access to the repo (collaborator invite may still be pending).

