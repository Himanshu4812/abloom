import Link from "next/link";
import { Container } from "@/src/components/ui/Container";
import { companyInfo } from "@/src/data/contact";

export function Footer() {
  return (
    <footer className="bg-foreground text-primary-foreground py-16">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {/* About Us */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider mb-4">
              {companyInfo.aboutUs.title}
            </h3>
            <p className="text-sm text-primary-foreground/80 leading-relaxed">
              {companyInfo.aboutUs.description}
            </p>
          </div>

          {/* Company Info */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider mb-4">
              {companyInfo.companyInfo.title}
            </h3>
            <ul className="space-y-2">
              {companyInfo.companyInfo.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors duration-200 flex items-center gap-2"
                  >
                    <span className="text-xs">{">>"}</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider mb-4">
              {companyInfo.social.title}
            </h3>
            <p className="text-sm text-primary-foreground/80">
              {companyInfo.social.platforms.join(" - ")}
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/20">
          <p className="text-sm text-primary-foreground/60 text-center">
            {companyInfo.copyright}
          </p>
        </div>
      </Container>
    </footer>
  );
}
