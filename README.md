# Evelyn Wharf Cycles — Website

Simple static site scaffold for the Evelyn Wharf Cycles shop.

Quick start

1. Place the provided shop image (from attachments) into `images/ewc-logo.jpg`.
2. Open `index.html` in a browser (double-click or serve with a static server).

Files created

- `index.html` — home page
- `about.html` — about page
- `services.html` — services and pricing summary
- `contact.html` — contact form (mailto)
- `css/styles.css` — site styles
- `images/` — add `ewc-logo.jpg` here (not included in repo by default)

Notes

- The contact form uses `mailto:`; replace with a server endpoint or JS handler if you want saved submissions.
- Update contact details in each page to match the real shop info.
- Decap CMS is available at `/admin/` once the site is deployed with Git Gateway enabled on Netlify.
- Content lives in `content/site.json`, `content/services.json`, and `content/bikes.json`.
- Because the pages load JSON content with `fetch()`, open the site through a web server or deployed host, not by double-clicking the HTML files.

How the client edits content

1. Open `/admin/` on the live site.
2. Log in with the Netlify Identity account you create for the shop.
3. Use "General site content" to edit the homepage, About, Contact, and footer text.
4. Use "Services and prices" to change service names, descriptions, and prices.
5. Use "Bike listings" to add a new bike, upload photos, change prices, mark items sold, or remove old listings.
6. Click "Publish" to save the changes back to the Git repository.

Recommended setup steps for Netlify

1. Deploy this folder as a new Netlify site.
2. Enable Identity in Netlify and invite the client by email.
3. Enable Git Gateway so Decap CMS can commit changes.
4. Visit `/admin/` and confirm the editor loads.

How to allow the admin to log in

1. In Netlify, open your site settings.
2. Go to Identity and click Enable Identity.
3. In Identity settings, set registration to Invite only.
4. Under Services, enable Git Gateway.
5. Invite the shop owner or staff member by email from the Identity panel.
6. They will receive an email invite with a link; they do not type the password in the email.
7. After opening the link, they create the password on the Netlify sign-up page, then sign in at `/admin/`.

If login fails

- Make sure the site is deployed on Netlify; Decap login will not work from a local file preview.
- Make sure the site URL in the browser matches the deployed Netlify domain.
- Make sure the invited email address matches the account used to log in.
- If the invite email only shows a link and no password field, that is normal — the password setup happens after clicking the link.
- If the editor opens but cannot save, Git Gateway is usually not enabled yet.
