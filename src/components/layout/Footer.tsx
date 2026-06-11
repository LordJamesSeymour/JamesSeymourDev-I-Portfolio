import { profile } from "../../data/profile";
import { useSiteText } from "../../content/content";
import SocialLinks from "../ui/SocialLinks";

export default function Footer() {
  const year = new Date().getFullYear();
  const brandName = useSiteText("hero-name", profile.name);
  const tagline = useSiteText("footer-tagline", profile.role);

  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <div className="site-footer__brand">
          <span>
            © {year} {brandName}
          </span>
          <span className="site-footer__tagline">{tagline}</span>
        </div>
        <SocialLinks variant="footer" />
      </div>
    </footer>
  );
}
