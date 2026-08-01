import { AdminLoginForm } from "@/components/admin/admin-login-form";

export default function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  return <AdminLoginForm searchParams={searchParams} />;
}
