import React from 'react';
import { Autocomplete } from './Autocomplete';

interface CronScheduleInputProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  error?: string;
}

const SCHEDULE_OPTIONS = [
  { value: '*/15 * * * *', label: 'Every 15 minutes' },
  { value: '0 * * * *', label: 'Every hour' },
  { value: '0 0 * * *', label: 'Daily at midnight' },
  { value: '0 0 * * 1', label: 'Weekly (Mondays)' },
];

export const CronScheduleInput: React.FC<CronScheduleInputProps> = ({
  label,
  name,
  value,
  onChange,
  error
}) => {
  return (
    <Autocomplete
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      options={SCHEDULE_OPTIONS}
      error={error}
    />
  );
};