import "./styles.css";
import { useState } from "react";
import { checkboxesData } from "./constants";

const Checkboxes = ({ data, checked, setChecked }) => {
  const handleChange = (isChecked, node) => {
    setChecked((prev) => {
      const newState = { ...prev, [node.id]: isChecked };

      const updateChildren = (node) => {
        node.children?.forEach((child) => {
          newState[child.id] = isChecked;
          child.children && updateChildren(child);
        });
      };

      updateChildren(node);

      return newState;
    });
  };

  return (
    <div>
      {data.map((node) => (
        <div key={node.id} className="parent">
          <input
            type="checkbox"
            checked={checked[node.id] || false}
            onChange={(e) => handleChange(e.target.checked, node)}
          />
          <span>{node.name}</span>
          {node.children && (
            <Checkboxes
              data={node.children}
              checked={checked}
              setChecked={setChecked}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default function App() {
  const [checked, setChecked] = useState({});

  return (
    <div className="App">
      <h1>Nested Checkboxes</h1>
      <Checkboxes
        data={checkboxesData}
        checked={checked}
        setChecked={setChecked}
      />
    </div>
  );
}
