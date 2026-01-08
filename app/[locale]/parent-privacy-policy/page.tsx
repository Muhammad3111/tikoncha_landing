import { locales } from "@/i18n";
import PrivacyPolicyContent from "./parent-privacy-policy";

export function generateStaticParams() {
    return locales.map((locale) => ({ locale }));
}

export default function ParentPrivacyPolicyPage() {
    return <PrivacyPolicyContent />;
}
