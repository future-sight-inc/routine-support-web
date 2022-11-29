/* eslint-disable */
export default {
  displayName: "forms",
  preset: "../../jest.preset.js",
  transform: {
    "^.+\\.[tj]sx?$": ["babel-jest", { presets: ["@nrwl/react/babel"] }],
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  coverageDirectory: "../../coverage/libs/forms",
};
