import { WHATSAPP_LINK } from "@/lib/whatsapp";

/**
 * Floating WhatsApp button shown on every page (desktop + mobile).
 * Fixed bottom-right so customers can ask about pricing without filling a form.
 */
export default function WhatsAppButton() {
  return (
    <a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float"
      aria-label="Chat with Brevan Softwares on WhatsApp"
      title="Chat on WhatsApp"
    >
      <i className="fab fa-whatsapp" aria-hidden="true"></i>
      <span className="whatsapp-float-label">Chat With Us</span>
    </a>
  );
}