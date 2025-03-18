export default function ToogleSwitch({ name }) {
  return (
    <>
      <label htmlFor={name} className="toogle-switch">
        <input type="checkbox" name={name} id={name} defaultChecked />
        <span className="slider"></span>
      </label>
    </>
  );
}
