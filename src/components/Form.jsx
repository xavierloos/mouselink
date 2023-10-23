import Link from "next/link";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Form = ({ type, data, setData, submitting, handleSubmit }) => {
  const { data: session } = useSession();

  const [providers, setProviders] = useState(null);

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);

  return (
    <section className="w-full max-w-full">
      {type === "Register" ? (
        <p className="desc text-left max-w-md">
          {type} your new account and create amazing links for your socials
        </p>
      ) : (
        <p className="desc text-left max-w-md">It's free</p>
      )}

      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-lg flex flex-col gap-7 glassmorphism"
      >
        {type === "Register" ? (
          <>
            <label>
              <input
                type="text"
                placeholder="Choose your Username"
                required
                value={data.prompt}
                onChange={(e) => setData({ ...data, username: e.target.value })}
                className="form_input"
              />
            </label>
            <label>
              <input
                type="text"
                placeholder="Full Name"
                required
                value={data.prompt}
                onChange={(e) => setData({ ...data, f_name: e.target.value })}
                className="form_input"
              />
            </label>
          </>
        ) : null}
        <label>
          {/* <span className="font-satoshi font-semibold text-base text-gray-700">
            Email
          </span> */}
          <input
            type="email"
            placeholder="Email"
            required
            value={data.prompt}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            className="form_input"
          />
        </label>
        <label>
          <input
            type="password"
            placeholder="Password"
            required
            value={data.prompt}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            className="form_input"
          />
        </label>
        <div className="flex-end mx-3 mb-5 gap-4">
          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
          >
            {submitting ? `${type}...` : type}
          </button>
        </div>
      </form>
      {providers &&
        Object.values(providers).map((provider) => (
          <button
            type="submit"
            disabled={submitting}
            onClick={() => {
              signIn(provider.id);
            }}
            className="mt-5 m-auto px-5 py-1.5 text-sm bg-blue-500  rounded-full text-white"
          >
            Or {submitting ? `${type}...` : type} With Google
          </button>
        ))}
    </section>
  );
};

export default Form;
