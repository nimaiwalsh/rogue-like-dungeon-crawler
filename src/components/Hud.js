import React from 'react';

const Hud = ({ playerStats, gameState }) => {

  return (
    <div>
      <div className="hud__weapon">
        Weapon: { playerStats.weapon }
      </div>
      <div className="hud__attack">
        Attack: { playerStats.attack }
      </div>
      <div className="hud__health">
        Health: { playerStats.health }
      </div>
      <div className="hud__health">
        XP: { playerStats.xp }
      </div>
      <div className="hud__health">
        Level: { playerStats.level }
      </div>
      <div className="hud__health">
        Dungeon: { playerStats.dungeon }
      </div>
    </div>
  );
};

export default Hud;