import { storiesOf } from "@storybook/react";
import styled from "styled-components";

import { Select } from "./Select";

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 200px;
`;

const OPTIONS = [
  { text: "Option1", value: 0 },
  { text: "Option2", value: 1 },
  { text: "Option3", value: 2 },
];

storiesOf("Components", module).add("Select", () => {
  return (
    <Layout>
      <Select options={OPTIONS} onChange={() => null} />
      <Select
        options={OPTIONS}
        onChange={() => null}
        placeholder="Select a value"
      />
      <Select
        value={0}
        options={OPTIONS}
        onChange={() => null}
        placeholder="Select a value"
      />
      <Select options={OPTIONS} onChange={() => null} error />
    </Layout>
  );
});
