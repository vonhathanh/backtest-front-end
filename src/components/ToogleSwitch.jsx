export default function ToogleSwitch({ name }) {
  return (
    <>
      <label className="toogle-switch">
        <input type="checkbox" name={name} defaultChecked />
        <span className="slider"></span>
      </label>
    </>
  );
}
