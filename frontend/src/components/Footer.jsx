// PURPOSE: This component displays a footer at the bottom of the page.
// It shows the current year dynamically and includes basic styling.

export default function Footer() {
  return (
    <footer className="footer bg-dark-custom text-light text-center py-4 mt-auto">
      <p className="mb-0">
        ©{" "}
        <span>{new Date().getFullYear()} CrickLiv | All rights reserved.</span>
      </p>
    </footer>
  );
}
