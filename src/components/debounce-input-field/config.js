import { debounce } from "lodash";

const debounceInput = (onChange, debounceTime) => {
  return debounce((value) => {
    onChange(value);
    console.log("✅ search value    ", value);
  }, debounceTime);
};

export default debounceInput;
