// pages/auth/signin.js
import { signIn } from "next-auth/react";

export default function SignIn() {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      alert("Autentificare eșuată");
    } else {
      // După succes, redirecționează utilizatorul
      window.location.href = "/dashboard";
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" required />
      </div>
      <div>
        <label htmlFor="password">Parolă</label>
        <input type="password" id="password" name="password" required />
      </div>
      <button type="submit">Autentificare</button>
    </form>
  );
}
