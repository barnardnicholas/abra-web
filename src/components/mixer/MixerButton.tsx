import React from 'react';
import { useAtom } from 'jotai';
import { showMixerAtom } from '../../atoms/atoms';

function MixerButton() {
  const [showMixer, setShowMixer] = useAtom(showMixerAtom);
  return (
    <button
      className={`mixer-button ${showMixer ? 'active' : ''}`}
      aria-label="open-mixer"
      onClick={() => setShowMixer(!showMixer)}
      type="button"
    >
      <i className="fa fa-sliders-h" />
    </button>
  );
}

export default MixerButton;
