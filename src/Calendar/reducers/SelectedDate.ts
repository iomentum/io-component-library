export enum SelectedDateType {
  UpdateStartDate,
  UpdateEndDate,
  Reset,
}

type DisplayDateAction =
  | {
      type: SelectedDateType.UpdateStartDate;
      startDate: Date;
    }
  | {
      type: SelectedDateType.UpdateEndDate;
      endDate: Date;
    }
  | {
      type: SelectedDateType.Reset;
      startDate: Date;
      endDate: Date;
    };

interface SelectedDate {
  startDate: Date;
  endDate: Date;
}

const selectedDateInitialState = (
  startDate: Date,
  endDate: Date
): SelectedDate => ({
  startDate,
  endDate,
});

export const selectedDateReducer = (
  state: SelectedDate,
  action: DisplayDateAction
): SelectedDate => {
  switch (action.type) {
    case SelectedDateType.UpdateStartDate:
      return { ...state, startDate: action.startDate };
    case SelectedDateType.UpdateEndDate:
      return { ...state, endDate: action.endDate };
    case SelectedDateType.Reset:
      return selectedDateInitialState(action.startDate, action.endDate);
  }
};