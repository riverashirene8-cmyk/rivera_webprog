import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import { registerUser } from "../../services/UserService";

const inputClasses =
  "mt-2 w-full rounded-xl border border-zinc-300 bg-zinc-100 px-4 py-3 text-sm outline-none transition focus:border-zinc-900 focus:bg-zinc-50";

const SignUpPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const first = e.target.first.value;
    const last = e.target.last.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const confirm = e.target.confirm.value;

    if (!first || !last || !email || !password || !confirm) {
      setError("Please complete all fields.");
      setSuccess("");
      return;
    }

    if (password !== confirm) {
      setError("Passwords do not match.");
      setSuccess("");
      return;
    }

    try {
      await registerUser({ firstName: first, lastName: last, email, password });
      setError("");
      setSuccess("Account created successfully. You can now sign in.");
      setTimeout(() => {
        navigate("/auth/signin");
      }, 500);
    } catch (err) {
      setError(err.message || "Unable to create account.");
      setSuccess("");
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-zinc-900">Create Account</h1>

        {error ? (
          <p className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </p>
        ) : null}

        {success ? (
          <p className="mb-4 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
            {success}
          </p>
        ) : null}

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">First Name</label>
              <input name="first" className={inputClasses} />
            </div>

            <div>
              <label className="text-sm font-medium">Last Name</label>
              <input name="last" className={inputClasses} />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">Email</label>
            <input name="email" type="email" className={inputClasses} />
          </div>

          <div>
            <label className="text-sm font-medium">Password</label>
            <input name="password" type="password" className={inputClasses} />
          </div>

          <div>
            <label className="text-sm font-medium">Confirm Password</label>
            <input name="confirm" type="password" className={inputClasses} />
          </div>

          <Button type="submit" variant="primary" className="w-full py-3">
            Create Account
          </Button>
        </form>

        <p className="mt-6 text-sm text-center">
          Already have an account?{" "}
          <Link to="/auth/signin" className="font-semibold underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;