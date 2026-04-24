import { useState } from 'react';

/**
 * DailyGoalSelector Component
 * Allows user to select session duration via presets or custom input
 * 
 * @param {number} currentDuration - Current selected duration in minutes
 * @param {Function} onDurationChange - Callback when duration changes (receives minutes)
 */
function DailyGoalSelector({ currentDuration, onDurationChange }) {
  // Preset options: minutes and hours
  const minutePresets = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];
  const hourPresets = [
    { label: '1h', minutes: 60 },
    { label: '2h', minutes: 120 },
    { label: '3h', minutes: 180 },
    { label: '4h', minutes: 240 },
    { label: '5h', minutes: 300 },
    { label: '6h', minutes: 360 },
  ];

  // Track if custom input is active (vs preset)
  const [customInput, setCustomInput] = useState('');
  const [isCustomActive, setIsCustomActive] = useState(false);

  // Handle preset button click
  const handlePresetClick = (minutes) => {
    onDurationChange(minutes);
    setIsCustomActive(false);
    setCustomInput('');
  };

  // Handle custom input change
  const handleCustomChange = (e) => {
    const value = e.target.value;
    setCustomInput(value);

    // Only update if it's a valid number
    if (value && !isNaN(value)) {
      const minutes = parseInt(value, 10);
      onDurationChange(minutes);
      setIsCustomActive(true);
    }
  };

  // Check if a preset is currently active
  const isPresetActive = (minutes) => {
    return !isCustomActive && currentDuration === minutes;
  };

  return (
    <div className="daily-goal-selector">
      <label className="selector-label">Session Duration</label>

      <div className="preset-buttons-container">
        {/* Minute presets */}
        <div className="preset-group">
          {minutePresets.map((minutes) => (
            <button
              key={`min-${minutes}`}
              className={`preset-button ${
                isPresetActive(minutes) ? 'active' : ''
              }`}
              onClick={() => handlePresetClick(minutes)}
            >
              {minutes}m
            </button>
          ))}
        </div>

        {/* Hour presets */}
        <div className="preset-group">
          {hourPresets.map((preset) => (
            <button
              key={`hour-${preset.minutes}`}
              className={`preset-button ${
                isPresetActive(preset.minutes) ? 'active' : ''
              }`}
              onClick={() => handlePresetClick(preset.minutes)}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Custom input */}
      <div className="custom-duration-group">
        <input
          type="number"
          className={`custom-duration-input ${isCustomActive ? 'active' : ''}`}
          placeholder="Custom (e.g., 43)"
          value={customInput}
          onChange={handleCustomChange}
          min="1"
          max="600"
        />
        <span className="custom-duration-label">minutes</span>
      </div>
    </div>
  );
}

export default DailyGoalSelector;
