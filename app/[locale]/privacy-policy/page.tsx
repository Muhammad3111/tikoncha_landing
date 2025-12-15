import { locales } from "@/i18n";
import PrivacyPolicyContent from "./privacy-policy-content";

export function generateStaticParams() {
    return locales.map((locale) => ({ locale }));
}

export default function PrivacyPolicyPage() {
    return <PrivacyPolicyContent />;
}
