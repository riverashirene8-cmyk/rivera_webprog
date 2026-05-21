import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button";

const inputClasses =
  "mt-2 w-full rounded-xl border border-zinc-300 bg-zinc-100 px-4 py-3 text-sm outline-none transition placeholder:text-zinc-400 focus:border-zinc-900 focus:bg-zinc-50";

const SignInPage = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    if (!email || !password) {
      alert("Please fill in all fields");
      return;
    }

    alert("Login successful!");
    navigate("/");
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-zinc-900">Welcome Back</h1>

        <form onSubmit={handleLogin} className="mt-6 space-y-5">
          <div>
            <label className="text-sm font-medium">Email</label>
            <input name="email" type="email" className={inputClasses} />
          </div>

          <div>
            <label className="text-sm font-medium">Password</label>
            <input name="password" type="password" className={inputClasses} />
          </div>

          <Button type="submit" variant="primary" className="w-full py-3">
            Log In
          </Button>
        </form>

        <p className="mt-6 text-sm text-center">
          No account?{" "}
          <Link to="/auth/signup" className="font-semibold underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignInPage;