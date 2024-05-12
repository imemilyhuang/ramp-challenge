import classNames from "classnames"
import { useRef } from "react"
import { InputCheckboxComponent } from "./types"

export const InputCheckbox: InputCheckboxComponent = ({ id, checked = false, disabled, onChange }) => {
  const { current: inputId } = useRef(`RampInputCheckbox-${id}`)

  return (
    <div className="RampInputCheckbox--container" data-testid={inputId}>
      <input // bug 2
        id={inputId}
        type="checkbox"
        className={classNames("RampInputCheckbox--label RampInputCheckbox--input", {
          "RampInputCheckbox--label-checked": checked,
          "RampInputCheckbox--label-unchecked": !checked,
          "RampInputCheckbox--label-disabled": disabled,
        })}
        checked={checked}
        disabled={disabled}
        onChange={() => onChange(!checked)}
      />
    </div>
  )
}
