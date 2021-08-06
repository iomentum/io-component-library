import React, { memo } from 'react';
import { DisplayedDateController } from './controller/DisplayedDateController';
import { DisplayModeController } from './controller/DisplayModeController';

export const CalendarHeader = memo(() => (
  <>
    <DisplayModeController />
    <DisplayedDateController />
  </>
));
