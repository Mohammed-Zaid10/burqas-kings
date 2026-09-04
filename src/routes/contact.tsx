import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { PageHero } from "@/components/site/Bits";
import { Button, ButtonLink } from "@/components/site/Button";
import { Reveal } from "@/components/site/Reveal";
import { CONTACT } from "@/data/content";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Burqas Kings" },
      { name: "description", content: "Write to the Burqas Kings studio about sizing, alterations, orders or wholesale." },
      { property: "og:title", content: "Contact — Burqas Kings" },
      { property: "og:description", content: "Reach the studio for sizing, alterations and order questions." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

const field =
  "mt-2 w-full border-b border-border bg-transparent py-3 text-sm outline-none focus:border-foreground";

function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "Sizing", message: "" });

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Talk to the studio."
        copy="We answer within one working day. Details below are placeholders until the real studio details are added."
        compact
      />

      <section className="section-y shell grid gap-16 lg:grid-cols-[1.4fr_1fr]">
        <Reveal>
          <form
            className="space-y-8"
            onSubmit={(e) => {
              e.preventDefault();
              if (!form.name || !form.email.includes("@") || form.message.length < 10) {
                toast.error("Add your name, a valid email and a short message.");
                return;
              }
              toast.success("Message noted. This form is a demo and does not send email yet.");
              setForm({ name: "", email: "", subject: "Sizing", message: "" });
            }}
          >
            <div className="grid gap-8 sm:grid-cols-2">
              <div>
                <label htmlFor="c-name" className="label-xs text-muted-foreground">Name</label>
                <input id="c-name" className={field} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </div>
              <div>
                <label htmlFor="c-email" className="label-xs text-muted-foreground">Email</label>
                <input id="c-email" type="email" className={field} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              </div>
            </div>
            <div>
              <label htmlFor="c-subject" className="label-xs text-muted-foreground">Subject</label>
              <select id="c-subject" className={field} value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}>
                {["Sizing", "Alterations", "An order", "Wholesale", "Something else"].map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="c-message" className="label-xs text-muted-foreground">Message</label>
              <textarea id="c-message" rows={5} className={field} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
            </div>
            <Button type="submit">Send message</Button>
          </form>
        </Reveal>

        <Reveal delay={120}>
          <dl className="space-y-6 text-sm">
            {[
              ["Email", CONTACT.email],
              ["Phone", CONTACT.phone],
              ["Hours", CONTACT.hours],
              ["Studio", CONTACT.address],
              ["Instagram", CONTACT.instagram],
            ].map(([label, value]) => (
              <div key={label} className="border-b border-border pb-4">
                <dt className="label-xs text-muted-foreground">{label}</dt>
                <dd className="mt-2 text-foreground">{value}</dd>
              </div>
            ))}
          </dl>
          <ButtonLink to="/faq" variant="outline" className="mt-10">
            Read the FAQ
          </ButtonLink>
        </Reveal>
      </section>
    </>
  );
}
