import ToogleSwitch from "./ToogleSwitch";

export default function ToogleButtonWithLabel({ label, name }) {
  return (
    <section className="toogle-button-with-label">
      <label>{label}</label>
      <ToogleSwitch name={name} />
    </section>
  );
}
