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
