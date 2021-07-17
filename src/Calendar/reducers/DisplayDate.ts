export enum DisplayDateType {
  UpdateStartDate,
  UpdateEndDate,
  Reset,
}

type DisplayDateAction =
  | {
      type: DisplayDateType.UpdateStartDate;
      startDate: string;
    }
  | {
      type: DisplayDateType.UpdateEndDate;
      endDate: string;
    }
  | {
      type: DisplayDateType.Reset;
      startDate: string;
      endDate: string;
    };

export interface DisplayDate {
  startDate: string;
  endDate: string;
}

const displayDateInitialState = (
  startDate: string,
  endDate: string
): DisplayDate => ({
  startDate,
  endDate,
});

export const displayDateReducer = (
  state: DisplayDate,
  action: DisplayDateAction
): DisplayDate => {
  switch (action.type) {
    case DisplayDateType.UpdateStartDate:
      return { ...state, startDate: action.startDate };
    case DisplayDateType.UpdateEndDate:
      return { ...state, endDate: action.endDate };
    case DisplayDateType.Reset:
      return displayDateInitialState(action.startDate, action.endDate);
  }
};
