import { GithubLoginForm } from "@/components/github-login-form";
import { LoginForm } from "@/components/login-form";

export default function Page() {
  return (
    <div className="flex w-full items-center justify-center p-6 md:p-10">
    {/* <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10"> */}
      <div className="md:w-full flex flex-col md:flex-row justify-center gap-5 ">
        <LoginForm />
        <GithubLoginForm />
      </div>
    </div>
  );
}
