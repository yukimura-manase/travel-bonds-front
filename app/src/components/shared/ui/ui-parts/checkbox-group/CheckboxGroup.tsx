/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import MuiCheckbox from "@mui/material/Checkbox";
import { FormGroup } from "@mui/material";

type Props<T> = {
  checkboxesState: Record<string | number, boolean>;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  options: T[];
};

const CheckboxGroup = <T extends { id: string | number; name: string }>({
  checkboxesState,
  onChange,
  options,
}: Props<T>) => {
  return (
    <FormControl component={"fieldset"}>
      <FormGroup
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        {options.map((option) => {
          return (
            <FormControlLabel
              key={option.id}
              label={option.name}
              control={
                <MuiCheckbox
                  checked={checkboxesState[option.id]}
                  onChange={onChange}
                  name={String(option.id)}
                />
              }
            />
          );
        })}
      </FormGroup>
    </FormControl>
  );
};

/** EmotionStyle */
const EmotionStyle = {
  /** header 全体の Wrapper Style */
  header: css`
    width: 100%;
    height: 120px;
    display: flex;
    justify-content: center;
    background-color: #f0f7ff;
  `,
};

export default CheckboxGroup;
