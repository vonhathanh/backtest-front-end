import ToogleSwitch from "./ToogleSwitch";

export default function ToogleButtonWithLabel({ label, name }) {
  return (
    <section className="toogle-button-with-label">
      <span className="bold">{label}</span>
      <ToogleSwitch name={name} />
    </section>
  );
}
