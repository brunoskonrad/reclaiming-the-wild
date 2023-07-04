import { ReactElement, JSXElementConstructor } from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TraitInput } from "./TraitInput";

describe("src/app/characters/new/components/TraitInput", () => {
  test("select maximum trait", async () => {
    const { subject, getOption } = setup(
      <TraitInput cap={5} name="hearts" initialValue={1} />
    );

    const selector = subject.getByTestId("trait-input:hearts");
    const maximumTrait = getOption(5);

    expect(maximumTrait.selected).toBe(false);
    await userEvent.selectOptions(selector, "5");
    expect(maximumTrait.selected).toBe(true);
  });

  test("cannot select option beyond gap", async () => {
    const { subject, getOption } = setup(
      <TraitInput cap={5} name="hearts" initialValue={1} />
    );

    const selector = subject.getByTestId("trait-input:hearts");
    const beyondGapTrait = getOption(8);

    expect(beyondGapTrait.selected).toBe(false);
    await userEvent.selectOptions(selector, "8");
    expect(beyondGapTrait.selected).toBe(false);
  });

  test("can select number above cap if current value is higher", async () => {
    const { subject, getOption } = setup(
      <TraitInput cap={3} name="hearts" initialValue={5} />
    );

    const selector = subject.getByTestId("trait-input:hearts");
    const thirdTrait = getOption(3);
    const fourthTrait = getOption(4);
    const fifthTrait = getOption(5);

    // Checking for disabled state before operation
    expect(thirdTrait.disabled).toBe(false);
    expect(fourthTrait.disabled).toBe(false);
    expect(fifthTrait.disabled).toBe(false);

    // Checks current selected option and picks one lower
    expect(fifthTrait.selected).toBe(true);
    await userEvent.selectOptions(selector, "4");

    // Checks for the changes on the selected option
    expect(fifthTrait.selected).toBe(false);
    expect(fourthTrait.selected).toBe(true);

    // Check for disabled state after selecting new value
    expect(thirdTrait.disabled).toBe(false);
    expect(fourthTrait.disabled).toBe(false);
    expect(fifthTrait.disabled).toBe(true);
  });

  test("handles invalid input", async () => {
    const validateTrait = jest
      .fn()
      .mockImplementation((_value: number, nextValue: number) => {
        return nextValue <= 2;
      });
    const { subject, getOption } = setup(
      <TraitInput
        cap={5}
        name="hearts"
        initialValue={1}
        validateTrait={validateTrait}
      />
    );
    const selector = subject.getByTestId("trait-input:hearts");

    const firstTrait = getOption(1);
    const secondTrait = getOption(2);
    const thirdTrait = getOption(3);

    // Checks initial state
    expect(firstTrait.selected).toBe(true);
    expect(secondTrait.selected).toBe(false);
    expect(thirdTrait.selected).toBe(false);

    // Selects 2nd option, which is valid
    await userEvent.selectOptions(selector, "2");

    // Checks state after selecting 2nd option
    expect(firstTrait.selected).toBe(false);
    expect(secondTrait.selected).toBe(true);
    expect(thirdTrait.selected).toBe(false);

    // Selects 3rd option, which is invalid
    await userEvent.selectOptions(selector, "3");

    // The selected state should be the same
    expect(firstTrait.selected).toBe(false);
    expect(secondTrait.selected).toBe(true);
    expect(thirdTrait.selected).toBe(false);
  });

  test("does not call onChange when new input is invalid", async () => {
    const onChange = jest.fn();
    const validateTrait = jest.fn().mockReturnValue(false);

    const { subject } = setup(
      <TraitInput
        cap={5}
        name="hearts"
        initialValue={1}
        validateTrait={validateTrait}
      />
    );
    const selector = subject.getByTestId("trait-input:hearts");

    await userEvent.selectOptions(selector, "3");
    expect(onChange).not.toHaveBeenCalled();
  });

  test("calls onChange with new value when input is valid", async () => {
    const onChange = jest.fn();
    const validateTrait = jest.fn().mockReturnValue(true);

    const { subject } = setup(
      <TraitInput
        cap={5}
        name="hearts"
        initialValue={1}
        validateTrait={validateTrait}
      />
    );
    const selector = subject.getByTestId("trait-input:hearts");

    await userEvent.selectOptions(selector, "3");
    expect(onChange).not.toHaveBeenCalledWith(3);
  });
});

function setup(ui: ReactElement<any, string | JSXElementConstructor<any>>) {
  const subject = render(ui);
  const getOption = (trait: number): HTMLOptionElement => {
    return subject.getByRole("option", {
      name: trait.toString(),
    }) as HTMLOptionElement;
  };

  return { subject, getOption };
}
