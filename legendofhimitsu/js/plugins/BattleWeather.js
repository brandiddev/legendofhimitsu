/*:
-------------------------------------------------------------------------
@title Battle Weather
@author Hime
@date Oct 26, 2015
@url http://himeworks.com/2015/10/battle-weather/
-------------------------------------------------------------------------
@plugindesc Allows you to display weather effects in battle
@help 
-------------------------------------------------------------------------
== Description ==

When there are weather effects on the map, these effects do not carry
over into battle.

This means that even if it's snowing heavily on your map, once you
enter the battle, it will be perfectly clean.

With this plugin, weather effects will carry over into battle, and
you can even start or stop weather effects during battle.

== Terms of Use ==

- Free for use in non-commercial projects with credits
- Contact me for commercial use
 
== Usage == 

Plug and Play.

-------------------------------------------------------------------------
 */ 
var Imported = Imported || {};
var TH = TH || {};

Imported.BattleWeather = 1
TH.BattleWeather = TH.BattleWeather || {};

(function ($) {

  var TH_BattleWeather_SpritesetBattle_createLowerLayer = Spriteset_Battle.prototype.createLowerLayer;
  Spriteset_Battle.prototype.createLowerLayer = function() {
    TH_BattleWeather_SpritesetBattle_createLowerLayer.call(this);
    this.createWeather();
  }
  
  var TH_BattleWeather_SpritesetBattle_update = Spriteset_Battle.prototype.update;
  Spriteset_Battle.prototype.update = function() {
    TH_BattleWeather_SpritesetBattle_update.call(this);
    this.updateWeather();
  };
  
  Spriteset_Battle.prototype.createWeather = function() {
    this._weather = new Weather();
    this.addChild(this._weather);
  };  
  
  Spriteset_Battle.prototype.updateWeather = function() {
    this._weather.type = $gameScreen.weatherType();
    this._weather.power = $gameScreen.weatherPower();
    this._weather.origin.x = 0
    this._weather.origin.y = 0
  };
  
  /* Overwrite */
  Game_Interpreter.prototype.command236 = function() {
    $gameScreen.changeWeather(this._params[0], this._params[1], this._params[2]);
    if (this._params[3]) {
        this.wait(this._params[2]);
    }
    return true;
  };
})(TH.BattleWeather);

  /* Battlebacks are battle-specific */
  var TH_BattleManager_initMembers = BattleManager.initMembers;
  BattleManager.initMembers = function() {
    TH_BattleManager_initMembers.call(this);
    this._battleback1Name = '';
    this._battleback2Name = '';
  };
  
  BattleManager.saveBattlebacks = function() {
    this._oldBattleback1Name = this._battleback1Name;
    this._oldBattleback2Name = this._battleback2Name;
  }
  
  BattleManager.restoreBattlebacks = function() {
    this.changeBattleback(this._oldBattleback1Name, this._oldBattleback2Name);
  };

  BattleManager.changeBattleback = function(name1, name2) {
    this._battleback1Name = name1;
    this._battleback2Name = name2;
    this._spriteset.refreshBattleback();
  }
  
  BattleManager.battleback1Name = function() {
    return this._battleback1Name;
  }
  
  BattleManager.battleback2Name = function() {
    return this._battleback2Name;
  }
  
  /***************************************************************************/
  
  Spriteset_Battle.prototype.refreshBattleback = function() {
    this._back1Sprite.bitmap = this.battleback1Bitmap();     
    this._back2Sprite.bitmap = this.battleback2Bitmap();
  };
  
  var TH_SpritesetBattle_battleback1Name = Spriteset_Battle.prototype.battleback1Name;
  Spriteset_Battle.prototype.battleback1Name = function() {
    console.log(BattleManager.battleback1Name())
    if (BattleManager.battleback1Name()) {
      return BattleManager.battleback1Name();
    }
    else {
      return TH_SpritesetBattle_battleback1Name.call(this);
    }
  };
  
  var TH_SpritesetBattle_battleback2Name = Spriteset_Battle.prototype.battleback2Name;
  Spriteset_Battle.prototype.battleback2Name = function() {
    if (BattleManager.battleback2Name()) {
      return BattleManager.battleback2Name();
    }
    else {
      return TH_SpritesetBattle_battleback2Name.call(this);
    }
  };
  
  Spriteset_Battle.prototype.update = function() {
    Spriteset_Base.prototype.update.call(this);
    this.updateActors();
    this.updateBattleback();
  };  
  
  /***************************************************************************/

  /* Default only changes the map's battleback, but does not change
   * it if we are already in battle.
   */
  var TH_GameInterpreter_command283 = Game_Interpreter.prototype.command283;
  Game_Interpreter.prototype.command283 = function() {
    if ($gameParty.inBattle()) {
      BattleManager.changeBattleback(this._params[0], this._params[1])
      return true;
    }
    else {
      return TH_GameInterpreter_command283.call(this);
    }
  };
})(TH.ChangeBattleback);