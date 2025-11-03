import ResetPassword from "@/components/Auth/ResetPassword";

export default function Page({ params }: { params: { token: string } }) {
  return <ResetPassword token={params.token} />;
}
