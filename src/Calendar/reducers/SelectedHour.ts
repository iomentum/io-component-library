export enum SelectedHourType {
  UpdateStartHour,
  UpdateEndHour,
  Reset,
}

export type SelectedHourAction =
  | {
      type: SelectedHourType.UpdateStartHour;
      startHour: string;
    }
  | {
      type: SelectedHourType.UpdateEndHour;
      endHour: string;
    }
  | {
      type: SelectedHourType.Reset;
      startHour: string;
      endHour: string;
    };

export interface SelectedHour {
  startHour: string;
  endHour: string;
}

const selectedHourInitialState = (
  startHour: string,
  endHour: string
): SelectedHour => ({
  startHour,
  endHour,
});

export const selectedHourReducer = (
  state: SelectedHour,
  action: SelectedHourAction
): SelectedHour => {
  switch (action.type) {
    case SelectedHourType.UpdateStartHour:
      return { ...state, startHour: action.startHour };
    case SelectedHourType.UpdateEndHour:
      return { ...state, endHour: action.endHour };
    case SelectedHourType.Reset:
      return selectedHourInitialState(action.startHour, action.endHour);
  }
};