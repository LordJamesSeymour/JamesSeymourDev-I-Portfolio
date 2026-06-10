import { profile } from "../../data/profile";
import SocialLinks from "../ui/SocialLinks";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <span>
          © {year} {profile.name}
        </span>
        <SocialLinks variant="footer" />
      </div>
    </footer>
  );
}
