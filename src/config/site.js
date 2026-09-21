// Site-wide settings. Change the name, tagline and email here.
const site = {
  name: "OneTap",
  tagline: "Find It. Tap It. Done.",
  description:
    "OneTap helps you quickly find official government websites, entrance exams, jobs, universities, board results and essential services from one trusted platform.",
  contactEmail: "p.kumarbegar@gmail.com", // <-- put your real email here
  // To load data from a Google Sheet, set VITE_SHEET_URL in .env (see README)
  sheetUrl: import.meta.env.VITE_SHEET_URL || "",

  // Admin panel login (/admin). CHANGE THESE before you deploy:
  // set VITE_ADMIN_ID and VITE_ADMIN_PASSWORD in .env or in your Vercel settings.
  adminId: import.meta.env.VITE_ADMIN_ID || "Praveen",
  adminPassword: import.meta.env.VITE_ADMIN_PASSWORD || "Praveen@123",
};

export default site;
