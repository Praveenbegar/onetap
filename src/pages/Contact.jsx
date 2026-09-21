import { useState } from "react";
import { Mail, Send } from "lucide-react";
import usePageTitle from "../lib/usePageTitle";
import site from "../config/site";

export default function Contact() {
  usePageTitle("Contact");
  const [form, setForm] = useState({ name: "", subject: "Suggest a link", message: "" });
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    const body = `${form.message}\n\n- ${form.name}`;
    window.location.href = `mailto:${site.contactEmail}?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section className="page">
      <div className="container narrow">
        <div className="page-head">
          <h1>Contact</h1>
          <p>Is a link missing or wrong? Let us know.</p>
        </div>

        <div className="contact-grid">
          <div className="info-card">
            <span className="why-icon"><Mail size={22} /></span>
            <h3>Email us</h3>
            <p>Suggest a new link, report a mistake or share feedback.</p>
            <a className="link-pill" href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>
          </div>

          <form className="info-card form" onSubmit={submit}>
            <label>Your name<input required value={form.name} onChange={set("name")} placeholder="Naam" /></label>
            <label>Subject
              <select value={form.subject} onChange={set("subject")}>
                <option>Suggest a link</option>
                <option>Report a wrong / broken link</option>
                <option>Feedback</option>
                <option>Other</option>
              </select>
            </label>
            <label>Message<textarea required rows={5} value={form.message} onChange={set("message")} placeholder="Write your message..." /></label>
            <button className="btn btn-primary btn-lg" type="submit">Send <Send size={16} /></button>
          </form>
        </div>
      </div>
    </section>
  );
}
