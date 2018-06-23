import React from 'react';
import HudContainer from './Hud.css';

const Hud = ({ playerStats, gameState }) => {

  return (
    <HudContainer>
      <div className="weapon">
        Weapon: { playerStats.weapon }
      </div>
      <div className="attack">
        Attack: { playerStats.attack }
      </div>
      <div className="health">
        Health: { playerStats.health }
      </div>
      <div className="xp">
        XP: { playerStats.xp }
      </div>
      <div className="level">
        Level: { playerStats.level }
      </div>
      <div className="dungeon">
        Dungeon: { playerStats.dungeon }
      </div>
    </HudContainer>
  );
};

export default Hud;