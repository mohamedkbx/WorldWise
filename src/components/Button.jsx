export default function Button({ children, onClick, type }) {
  return <button onClick={onClick}>{children}</button>;
}
